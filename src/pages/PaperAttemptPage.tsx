import 'katex/dist/katex.min.css'
import katex from 'katex'
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flag,
  Maximize2,
  RotateCcw,
  XCircle,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import { useAuth } from '../context/useAuth'
import {
  fetchPaperBySlug,
  fetchPaperQuestions,
  startLiveAttempt,
  syncLiveAttempt,
  submitLiveAttempt,
  type Paper,
  type Question,
} from '../lib/api'
import { savePaperResult } from '../lib/mockActivity'
import { usePageMeta } from '../lib/usePageMeta'

// ── KaTeX inline/block renderer ────────────────────────────────

function renderMath(text: string): string {
  return text
    .replace(/\$\$(.+?)\$\$/gs, (_, expr) => {
      try { return katex.renderToString(expr, { displayMode: true, throwOnError: false }) }
      catch { return expr }
    })
    .replace(/\$(.+?)\$/g, (_, expr) => {
      try { return katex.renderToString(expr, { displayMode: false, throwOnError: false }) }
      catch { return expr }
    })
    .replace(/\n/g, '<br>')
}

function MathText({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: renderMath(text) }}
    />
  )
}

// ── Timer ──────────────────────────────────────────────────────

function formatTime(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

// ── Question status ────────────────────────────────────────────

type QStatus = 'not-visited' | 'visited' | 'answered' | 'marked' | 'answered-marked'

function getStatus(
  slug: string,
  currentSlug: string,
  answers: Record<string, string>,
  marked: Record<string, boolean>,
  visited: Set<string>,
): QStatus {
  const isAnswered = Boolean(answers[slug])
  const isMarked = Boolean(marked[slug])
  if (isAnswered && isMarked) return 'answered-marked'
  if (isMarked) return 'marked'
  if (isAnswered) return 'answered'
  if (visited.has(slug) || slug === currentSlug) return 'visited'
  return 'not-visited'
}

// ── Results helpers ────────────────────────────────────────────

type SubjectScore = { subject: string; correct: number; wrong: number; skipped: number; total: number }

function computeResults(questions: Question[], answers: Record<string, string>) {
  let correct = 0, wrong = 0, skipped = 0
  const bySubject: Record<string, SubjectScore> = {}
  for (const q of questions) {
    if (q.answerKey === 'Deleted') continue
    if (!bySubject[q.subject]) bySubject[q.subject] = { subject: q.subject, correct: 0, wrong: 0, skipped: 0, total: 0 }
    bySubject[q.subject].total++
    const chosen = answers[q.slug]
    if (!chosen) { skipped++; bySubject[q.subject].skipped++ }
    else if (chosen === q.answerKey) { correct++; bySubject[q.subject].correct++ }
    else { wrong++; bySubject[q.subject].wrong++ }
  }
  return { correct, wrong, skipped, subjectScores: Object.values(bySubject) }
}

// ── Main component ─────────────────────────────────────────────

const DEFAULT_DURATION = 120 * 60

export function PaperAttemptPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()

  const [paper, setPaper] = useState<Paper | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [resumed, setResumed] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [marked, setMarked] = useState<Record<string, boolean>>({})
  const [visited, setVisited] = useState<Set<string>>(new Set())
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_DURATION)
  const [submitted, setSubmitted] = useState(false)
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false)

  const resultSavedRef = useRef(false)
  const startTimeRef   = useRef(Date.now())
  const submittedRef   = useRef(false)

  // Keep submittedRef in sync for use inside event listeners
  useEffect(() => { submittedRef.current = submitted }, [submitted])

  usePageMeta({
    title: paper ? `${paper.title} — Attempt | Ministry of Papers` : 'Paper Attempt | Ministry of Papers',
    description: paper?.description ?? 'Attempt a full-length previous year question paper.',
    canonicalPath: slug ? `/paper-attempt/${slug}` : '/paper-attempt',
  })

  // ── Load paper + questions + start live attempt ────────────────
  useEffect(() => {
    if (!slug) return
    let cancelled = false
    const load = async () => {
      try {
        const paperData = await fetchPaperBySlug(slug)
        const qs = await fetchPaperQuestions(slug)
        if (cancelled) return

        const durationSeconds = (paperData.durationMinutes > 0 ? paperData.durationMinutes : 120) * 60

        let liveState = null
        try {
          liveState = await startLiveAttempt({
            paperSlug: paperData.slug,
            examSlug: paperData.examSlug,
            paperTitle: paperData.title,
            examName: paperData.examName ?? '',
            totalQuestions: qs.length,
            durationSeconds,
          })
        } catch {
          // Redis unavailable — continue with fresh local state
        }

        if (cancelled) return
        setPaper(paperData)
        setQuestions(qs)

        if (liveState?.resumed) {
          setAnswers(liveState.answers ?? {})
          setMarked(liveState.marked ?? {})
          setCurrentIndex(liveState.currentIndex ?? 0)
          setRemainingSeconds(liveState.remainingSeconds > 0 ? liveState.remainingSeconds : durationSeconds)
          setResumed(true)
        } else {
          setRemainingSeconds(durationSeconds)
        }
        if (liveState?.attemptId) {
          setAttemptId(liveState.attemptId)
          startTimeRef.current = Date.now()
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => { cancelled = true }
  }, [slug])

  // ── Fullscreen ─────────────────────────────────────────────────
  useEffect(() => {
    const onFsChange = () => {
      const inFs = !!document.fullscreenElement
      setIsFullscreen(inFs)
    }
    document.addEventListener('fullscreenchange', onFsChange)
    document.documentElement.requestFullscreen?.()
      .then(() => setIsFullscreen(true))
      .catch(() => { /* browser denied — show warning button instead */ })
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {})
      }
    }
  }, [])

  // ── Redis sync helpers ─────────────────────────────────────────
  const syncFnRef = useRef<() => void>(() => {})
  const buildSyncFn = useCallback(() => {
    return () => {
      if (!paper || !attemptId || submittedRef.current) return
      syncLiveAttempt({
        paperSlug: paper.slug,
        answers,
        marked,
        currentIndex,
        remainingSeconds,
      }).catch(() => {})
    }
  }, [paper, attemptId, answers, marked, currentIndex, remainingSeconds])

  useEffect(() => { syncFnRef.current = buildSyncFn() }, [buildSyncFn])

  // Sync on question navigation
  const prevIndexRef = useRef(currentIndex)
  useEffect(() => {
    if (loading || submitted) return
    if (currentIndex !== prevIndexRef.current) {
      prevIndexRef.current = currentIndex
      syncFnRef.current()
    }
  }, [currentIndex, loading, submitted])

  // Heartbeat sync every 30 s
  useEffect(() => {
    if (loading || submitted) return
    const id = window.setInterval(() => syncFnRef.current(), 30_000)
    return () => window.clearInterval(id)
  }, [loading, submitted])

  // ── Timer countdown ────────────────────────────────────────────
  useEffect(() => {
    if (submitted || loading || remainingSeconds <= 0) return
    const id = window.setInterval(() => {
      setRemainingSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
          setSubmitted(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [loading, remainingSeconds, submitted])

  // ── Track visited ──────────────────────────────────────────────
  useEffect(() => {
    const q = questions[currentIndex]
    if (!q) return
    setVisited((prev) => { const next = new Set(prev); next.add(q.slug); return next })
  }, [currentIndex, questions])

  // ── Save result on submit ──────────────────────────────────────
  useEffect(() => {
    if (!submitted || !paper || resultSavedRef.current) return
    resultSavedRef.current = true

    const { correct, wrong, skipped, subjectScores } = computeResults(questions, answers)
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000)
    const negMark = paper.negativeMarking ?? 0
    const rawScore = negMark > 0 ? parseFloat((correct - wrong * negMark).toFixed(2)) : undefined

    // Persist final scores to backend
    if (attemptId) {
      submitLiveAttempt({
        attemptId,
        paperSlug: paper.slug,
        correct,
        wrong,
        skipped,
        timeTakenSeconds: timeTaken,
        answers,
      }).catch(() => {})
    }

    // Local activity log
    savePaperResult({
      paperSlug: paper.slug,
      examSlug: paper.examSlug,
      examName: paper.examName,
      paperTitle: paper.title,
      totalQuestions: questions.length,
      attemptedAt: new Date().toISOString(),
      answered: Object.keys(answers).length,
      correct,
      wrong,
      skipped,
      rawScore,
      timeTakenSeconds: timeTaken,
      subjects: subjectScores,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  const currentQuestion = questions[currentIndex]
  const activeQuestions = questions.filter(q => q.answerKey !== 'Deleted')
  const answeredCount = Object.keys(answers).length
  const markedCount = Object.values(marked).filter(Boolean).length
  const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000)

  const results = useMemo(
    () => computeResults(questions, answers),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submitted, questions, answers],
  )

  if (!slug || !isAuthenticated) return <Navigate to="/" replace />
  if (loading) return <HaloLoader label="Loading paper" />
  if (error || !paper) return <Navigate to={`/pyq/${slug}`} replace />

  const chooseOption = (key: string) => {
    if (!currentQuestion || submitted) return
    setAnswers((cur) => ({ ...cur, [currentQuestion.slug]: key }))
  }

  const toggleMarked = () => {
    if (!currentQuestion || submitted) return
    setMarked((cur) => ({ ...cur, [currentQuestion.slug]: !cur[currentQuestion.slug] }))
  }

  const goTo = (index: number) => setCurrentIndex(Math.max(0, Math.min(index, questions.length - 1)))

  const doSubmit = () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    setSubmitted(true)
    setConfirmSubmit(false)
  }

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen?.()
      .then(() => setIsFullscreen(true))
      .catch(() => {})
  }

  const timerWarning = remainingSeconds < 300
  const showFsWarning = !isFullscreen && !submitted

  // ── Submission summary ─────────────────────────────────────────
  if (submitted && !reviewMode) {
    const activeCount = activeQuestions.length
    const scorePercent = activeCount > 0 ? Math.round((results.correct / activeCount) * 100) : 0
    const negMark = paper.negativeMarking ?? 0
    const rawScore = negMark > 0 ? parseFloat((results.correct - results.wrong * negMark).toFixed(2)) : null
    const deletedCount = questions.length - activeCount
    return (
      <div className="pa-result-page">
        <header className="pa-result-header">
          <div className="pa-result-header-inner">
            <CheckCircle2 size={28} className="pa-result-icon" />
            <div>
              <small>{paper.examName}</small>
              <h1>{paper.title}</h1>
            </div>
          </div>
        </header>

        <main className="pa-result-main">
          <section className="pa-score-card">
            <div className="pa-score-ring">
              <strong>{rawScore !== null ? rawScore : results.correct}</strong>
              <span>/ {activeCount}</span>
            </div>
            <p className="pa-score-pct">{scorePercent}% correct</p>
            {deletedCount > 0 && (
              <p className="pa-negmark-note">{deletedCount} question{deletedCount !== 1 ? 's' : ''} officially deleted — not counted in score</p>
            )}
            {rawScore !== null && (
              <p className="pa-negmark-note">Negative marking: -{negMark}/wrong · Raw score: {rawScore}</p>
            )}
            <p className="pa-time-taken">Time taken: {formatTime(timeTaken)}</p>

            <div className="pa-score-legend">
              <div className="pa-legend-item answered"><CheckCircle2 size={14} />{results.correct} Correct</div>
              <div className="pa-legend-item wrong"><XCircle size={14} />{results.wrong} Wrong</div>
              <div className="pa-legend-item skipped"><AlertTriangle size={14} />{results.skipped} Skipped</div>
            </div>
          </section>

          <section className="pa-subject-table">
            <h2>Subject-wise performance</h2>
            <table>
              <thead>
                <tr><th>Subject</th><th>Total</th><th>Correct</th><th>Wrong</th><th>Skipped</th><th>Score%</th></tr>
              </thead>
              <tbody>
                {results.subjectScores.map((s) => (
                  <tr key={s.subject}>
                    <td>{s.subject}</td>
                    <td>{s.total}</td>
                    <td className="correct">{s.correct}</td>
                    <td className="wrong">{s.wrong}</td>
                    <td className="skipped">{s.skipped}</td>
                    <td>{s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className="pa-result-actions">
            <button type="button" className="pa-btn-review" onClick={() => { setReviewMode(true); setReviewIndex(0) }}>
              <BookOpen size={16} /> Review Answers
            </button>
            <button type="button" className="pa-btn-secondary" onClick={() => navigate(`/pyq/${paper.slug}`)}>
              Back to Paper
            </button>
            <button type="button" className="pa-btn-secondary" onClick={() => navigate(`/exam/${paper.examSlug}`)}>
              Back to Exam
            </button>
          </div>
        </main>
      </div>
    )
  }

  // ── Review mode ────────────────────────────────────────────────
  if (submitted && reviewMode) {
    const rq = questions[reviewIndex]
    const chosen = rq ? answers[rq.slug] : undefined
    const isCorrect = rq && chosen === rq.answerKey

    return (
      <div className="pa-attempt-page">
        <header className="pa-topbar">
          <div className="pa-topbar-left">
            <small>{paper.examName}</small>
            <strong>{paper.title} — Review</strong>
          </div>
          <div className="pa-topbar-right">
            <span className="pa-review-badge">Review mode</span>
            <button type="button" className="pa-exit-btn" onClick={() => setReviewMode(false)}>
              Back to results
            </button>
          </div>
        </header>

        <div className="pa-attempt-body">
          <section className="pa-question-panel">
            <div className="pa-q-header">
              <span className="pa-q-num">Q{reviewIndex + 1} <small>of {questions.length}</small></span>
              {rq?.subject && (
                <Link
                  className="pa-q-subject pa-q-subject-link"
                  to={`/exam/${paper.examSlug}?tab=subjects&subject=${encodeURIComponent(rq.subject)}`}
                >
                  {rq.subject}
                </Link>
              )}
            </div>

            {rq && (
              <>
                <div className="pa-q-text"><MathText text={rq.question} /></div>

                {rq.answerKey === 'Deleted' ? (
                  <div className="pa-deleted-notice">
                    <span className="pa-deleted-badge">Deleted Question</span>
                    <p>{rq.explanation}</p>
                  </div>
                ) : (
                  <>
                    <div className="pa-options">
                      {rq.options.map((opt) => {
                        const isChosen = chosen === opt.key
                        const isCorrectOpt = opt.key === rq.answerKey
                        let cls = 'pa-option'
                        if (isCorrectOpt) cls += ' correct'
                        else if (isChosen && !isCorrect) cls += ' wrong'
                        return (
                          <div key={opt.key} className={cls}>
                            <span className="pa-opt-key">{opt.key}</span>
                            <MathText text={opt.text} />
                            {isCorrectOpt && <CheckCircle2 size={14} className="pa-opt-check" />}
                          </div>
                        )
                      })}
                    </div>

                    {!chosen && (
                      <div className="pa-not-attempted">Not attempted · Correct answer: <strong>{rq.answerKey}</strong></div>
                    )}

                    {rq.explanation && (
                      <div className="pa-explanation">
                        <strong>Explanation</strong>
                        <MathText text={rq.explanation} />
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <footer className="pa-q-actions">
              <button type="button" className="pa-nav-btn" onClick={() => setReviewIndex((i) => Math.max(0, i - 1))} disabled={reviewIndex === 0}>
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="pa-q-progress">{reviewIndex + 1} / {questions.length}</span>
              <button type="button" className="pa-nav-btn" onClick={() => setReviewIndex((i) => Math.min(questions.length - 1, i + 1))} disabled={reviewIndex >= questions.length - 1}>
                Next <ChevronRight size={16} />
              </button>
            </footer>
          </section>

          <aside className="pa-palette-panel">
            <div className="pa-palette-legend">
              <span className="pa-legend-dot answered" /><span>Correct</span>
              <span className="pa-legend-dot wrong" /><span>Wrong</span>
              <span className="pa-legend-dot visited" /><span>Skipped</span>
            </div>
            <div className="pa-palette-grid">
              {questions.map((q, i) => {
                const ch = answers[q.slug]
                let cls = 'pa-palette-btn'
                if (q.answerKey === 'Deleted') cls += ' deleted'
                else if (!ch) cls += ' visited'
                else if (ch === q.answerKey) cls += ' answered'
                else cls += ' wrong'
                if (i === reviewIndex) cls += ' current'
                return (
                  <button key={q.slug} type="button" className={cls} onClick={() => setReviewIndex(i)}>
                    {i + 1}
                  </button>
                )
              })}
            </div>
            <button type="button" className="pa-back-results-btn" onClick={() => setReviewMode(false)}>
              <RotateCcw size={14} /> Back to results
            </button>
          </aside>
        </div>
      </div>
    )
  }

  // ── Exam hall ──────────────────────────────────────────────────
  const notAttempted = questions.length - answeredCount

  return (
    <div className="pa-attempt-page">
      {/* Fullscreen warning */}
      {showFsWarning && (
        <button type="button" className="pa-fullscreen-warn" onClick={enterFullscreen}>
          <Maximize2 size={14} />
          You left fullscreen — click to return
        </button>
      )}

      {/* Resumed notice */}
      {resumed && !submitted && (
        <div className="pa-resumed-notice">
          Resuming from where you left off · {answeredCount} answered · {formatTime(remainingSeconds)} remaining
        </div>
      )}

      {/* Confirm submit dialog */}
      {confirmSubmit && (
        <div className="pa-confirm-overlay">
          <div className="pa-confirm-dialog">
            <h2>Submit paper?</h2>
            <p>You have answered <strong>{answeredCount}</strong> of <strong>{questions.length}</strong> questions.</p>
            {notAttempted > 0 && <p className="pa-confirm-warn"><AlertTriangle size={14} /> {notAttempted} question{notAttempted !== 1 ? 's' : ''} not attempted.</p>}
            <div className="pa-confirm-actions">
              <button type="button" className="pa-confirm-submit" onClick={doSubmit}>Yes, submit</button>
              <button type="button" className="pa-confirm-cancel" onClick={() => setConfirmSubmit(false)}>Continue attempt</button>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <header className="pa-topbar">
        <div className="pa-topbar-left">
          <small>{paper.examName}</small>
          <strong>{paper.title}</strong>
        </div>
        <div className="pa-topbar-center">
          <div className={`pa-timer${timerWarning ? ' warning' : ''}`}>
            <Clock3 size={15} />
            <span>{formatTime(remainingSeconds)}</span>
          </div>
        </div>
        <div className="pa-topbar-right">
          {!isFullscreen && (
            <button type="button" className="pa-fs-btn" onClick={enterFullscreen} title="Enter fullscreen">
              <Maximize2 size={15} />
            </button>
          )}
          <button type="button" className="pa-submit-topbar-btn" onClick={() => setConfirmSubmit(true)}>
            Submit Paper
          </button>
        </div>
      </header>

      {/* Body: question + palette */}
      <div className="pa-attempt-body">

        {/* Question panel */}
        <section className="pa-question-panel">
          <div className="pa-q-header">
            <span className="pa-q-num">Q{currentIndex + 1} <small>of {questions.length}</small></span>
            {currentQuestion?.subject && (
              <Link
                className="pa-q-subject pa-q-subject-link"
                to={`/exam/${paper!.examSlug}?tab=subjects&subject=${encodeURIComponent(currentQuestion.subject)}`}
              >
                {currentQuestion.subject}
              </Link>
            )}
            <button type="button" className={`pa-mark-btn${marked[currentQuestion?.slug ?? ''] ? ' active' : ''}`} onClick={toggleMarked}>
              <Flag size={13} />
              {marked[currentQuestion?.slug ?? ''] ? 'Marked' : 'Mark for Review'}
            </button>
          </div>

          {currentQuestion ? (
            <>
              <div className="pa-q-text">
                <MathText text={currentQuestion.question} />
              </div>

              {currentQuestion.answerKey === 'Deleted' ? (
                <div className="pa-deleted-notice">
                  <span className="pa-deleted-badge">Deleted Question</span>
                  <p>{currentQuestion.explanation}</p>
                </div>
              ) : (
                <>
                  <div className="pa-options">
                    {currentQuestion.options.map((opt) => {
                      const chosen = answers[currentQuestion.slug] === opt.key
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          className={`pa-option${chosen ? ' selected' : ''}`}
                          onClick={() => chooseOption(opt.key)}
                        >
                          <span className="pa-opt-key">{opt.key}</span>
                          <MathText text={opt.text} />
                        </button>
                      )
                    })}
                  </div>

                  {answers[currentQuestion.slug] && (
                    <button type="button" className="pa-clear-btn" onClick={() => {
                      setAnswers((cur) => { const next = { ...cur }; delete next[currentQuestion.slug]; return next })
                    }}>
                      Clear response
                    </button>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="pa-empty-q">
              <AlertTriangle size={20} />
              <p>No questions available for this paper.</p>
            </div>
          )}

          <footer className="pa-q-actions">
            <button type="button" className="pa-nav-btn" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}>
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="pa-q-progress">{currentIndex + 1} / {questions.length}</span>
            <button type="button" className="pa-nav-btn primary" onClick={() => goTo(currentIndex + 1)} disabled={currentIndex >= questions.length - 1}>
              Save &amp; Next <ChevronRight size={16} />
            </button>
          </footer>
        </section>

        {/* Question palette */}
        <aside className="pa-palette-panel">
          <div className="pa-palette-stats">
            <div className="pa-stat-chip answered"><CheckCircle2 size={12} />{answeredCount}</div>
            <div className="pa-stat-chip marked"><Flag size={12} />{markedCount}</div>
            <div className="pa-stat-chip wrong"><XCircle size={12} />{questions.length - answeredCount}</div>
          </div>

          <div className="pa-palette-legend">
            <span className="pa-legend-dot answered" /><span>Answered</span>
            <span className="pa-legend-dot not-visited" /><span>Not visited</span>
            <span className="pa-legend-dot visited" /><span>Visited</span>
            <span className="pa-legend-dot marked" /><span>Marked</span>
            <span className="pa-legend-dot answered-marked" /><span>Ans+Marked</span>
          </div>

          <div className="pa-palette-grid">
            {questions.map((q, i) => {
              const status = getStatus(q.slug, currentQuestion?.slug ?? '', answers, marked, visited)
              return (
                <button
                  key={q.slug}
                  type="button"
                  className={`pa-palette-btn ${status}${i === currentIndex ? ' current' : ''}`}
                  onClick={() => goTo(i)}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>

          <button type="button" className="pa-submit-palette-btn" onClick={() => setConfirmSubmit(true)}>
            Submit Paper
          </button>

          <Link className="pa-exit-link" to={`/pyq/${paper.slug}`}>
            Exit Paper
          </Link>
        </aside>
      </div>
    </div>
  )
}
