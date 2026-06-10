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
  Play,
  RotateCcw,
  XCircle,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import { QuestionRenderer } from '../components/common/QuestionRenderer'
import { useAuth } from '../context/useAuth'
import {
  APIError,
  fetchActiveLiveAttempts,
  fetchPaperBySlug,
  fetchPaperQuestions,
  refreshAuthSession,
  startLiveAttempt,
  syncLiveAttempt,
  submitLiveAttempt,
  type ActiveAttempt,
  type Paper,
  type Question,
} from '../lib/api'
import { savePaperResult } from '../lib/mockActivity'
import { getLocalizedQuestion, hasHindi, type QuestionLanguage } from '../lib/questionLanguage'
import { usePageMeta } from '../lib/usePageMeta'
import { paperAttemptSeoTitle } from '../lib/pageTitles'

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

  const [examStarted, setExamStarted] = useState(false)
  const [startingExam, setStartingExam] = useState(false)

  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [resumeDetected, setResumeDetected] = useState(false)
  const [existingAttempt, setExistingAttempt] = useState<ActiveAttempt | null>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [marked, setMarked] = useState<Record<string, boolean>>({})
  const [visited, setVisited] = useState<Set<string>>(new Set())
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_DURATION)
  const [submitted, setSubmitted] = useState(false)
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [language, setLanguage] = useState<QuestionLanguage>('en')
  const [activeSubject, setActiveSubject] = useState<string | null>(null)

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [exiting, setExiting] = useState(false)

  const resultSavedRef      = useRef(false)
  const startTimeRef        = useRef(Date.now())
  const submittedRef        = useRef(false)
  const resumeFetchedAtMs   = useRef(0)
  const [, forceResumeTick] = useState(0)

  useEffect(() => { submittedRef.current = submitted }, [submitted])

  useEffect(() => {
    if (!resumeDetected || examStarted) return
    const id = window.setInterval(() => forceResumeTick((n) => n + 1), 1000)
    return () => window.clearInterval(id)
  }, [resumeDetected, examStarted])

  usePageMeta({
    title: paper
      ? paperAttemptSeoTitle({ examName: paper.examName, year: paper.year, shift: paper.shift })
      : 'Paper Attempt | Ministry of Papers',
    description: paper
      ? `Attempting ${paper.examName}${paper.year ? ` ${paper.year}` : ''} previous year paper. ${paper.questions} questions with timer on Ministry of Papers.`
      : 'Attempt a full-length previous year question paper.',
    canonicalPath: slug ? `/paper-attempt/${slug}` : '/paper-attempt',
  })

  // ── Load paper + questions; detect active live attempt ───────────
  useEffect(() => {
    if (!slug) return
    let cancelled = false
    const load = async () => {
      try {
        const [paperData, qs, liveAttempts] = await Promise.all([
          fetchPaperBySlug(slug),
          fetchPaperQuestions(slug),
          fetchActiveLiveAttempts().catch(() => [] as ActiveAttempt[]),
        ])
        if (cancelled) return
        setPaper(paperData)
        setQuestions(qs)
        const existing = liveAttempts.find((a) => a.paperSlug === slug)
        if (existing) {
          resumeFetchedAtMs.current = Date.now()
          setExistingAttempt(existing)
          setResumeDetected(true)
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

  // ── Fullscreen change listener (no auto-request on mount) ─────
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    }
  }, [])

  // ── Start exam handler ────────────────────────────────────────
  const handleStartExam = useCallback(async () => {
    if (!paper || !questions.length || startingExam) return
    setStartingExam(true)
    const durationSeconds = (paper.durationMinutes > 0 ? paper.durationMinutes : 120) * 60
    let startIdx = 0
    try {
      const liveState = await startLiveAttempt({
        paperSlug: paper.slug,
        examSlug: paper.examSlug,
        paperTitle: paper.title,
        examName: paper.examName ?? '',
        totalQuestions: questions.length,
        durationSeconds,
      })
      if (liveState?.resumed) {
        setAnswers(liveState.answers ?? {})
        setMarked(liveState.marked ?? {})
        startIdx = liveState.currentIndex ?? 0
        setCurrentIndex(startIdx)
        if (liveState?.attemptId) setAttemptId(liveState.attemptId)
        // Timer already expired while user was away — auto-submit immediately
        if (liveState.remainingSeconds <= 0) {
          startTimeRef.current = Date.now()
          setExamStarted(true)
          setSubmitted(true)
          setStartingExam(false)
          return
        }
        setRemainingSeconds(liveState.remainingSeconds)
      } else {
        setRemainingSeconds(durationSeconds)
      }
      if (liveState?.attemptId) setAttemptId(liveState.attemptId)
    } catch {
      setRemainingSeconds(durationSeconds)
    }
    // Auto-select the subject of the starting question for multi-subject exams
    const distinctSubjects = new Set(questions.map((q) => q.subject))
    if (distinctSubjects.size > 1) {
      setActiveSubject(questions[startIdx]?.subject ?? null)
    }
    startTimeRef.current = Date.now()
    document.documentElement.requestFullscreen?.()
      .then(() => setIsFullscreen(true))
      .catch(() => {})
    setExamStarted(true)
    setStartingExam(false)
  }, [paper, questions, startingExam])

  // ── Resume handler — calls startLiveAttempt to restore full state ──
  const handleResumeExam = useCallback(async () => {
    if (!paper || !questions.length || startingExam) return
    setStartingExam(true)
    const durationSeconds = (paper.durationMinutes > 0 ? paper.durationMinutes : 120) * 60
    let startIdx = 0
    try {
      const liveState = await startLiveAttempt({
        paperSlug: paper.slug,
        examSlug: paper.examSlug,
        paperTitle: paper.title,
        examName: paper.examName ?? '',
        totalQuestions: questions.length,
        durationSeconds,
      })
      if (liveState?.resumed) {
        setAnswers(liveState.answers ?? {})
        setMarked(liveState.marked ?? {})
        startIdx = liveState.currentIndex ?? 0
        setCurrentIndex(startIdx)
        if (liveState.attemptId) setAttemptId(liveState.attemptId)
        if (liveState.remainingSeconds <= 0) {
          startTimeRef.current = Date.now()
          setExamStarted(true)
          setSubmitted(true)
          setStartingExam(false)
          return
        }
        setRemainingSeconds(liveState.remainingSeconds)
      } else {
        setRemainingSeconds(durationSeconds)
      }
      if (liveState?.attemptId) setAttemptId(liveState.attemptId)
    } catch {
      setRemainingSeconds(durationSeconds)
    }
    const distinctSubjects = new Set(questions.map((q) => q.subject))
    if (distinctSubjects.size > 1) {
      setActiveSubject(questions[startIdx]?.subject ?? null)
    }
    startTimeRef.current = Date.now()
    document.documentElement.requestFullscreen?.()
      .then(() => setIsFullscreen(true))
      .catch(() => {})
    setExamStarted(true)
    setStartingExam(false)
  }, [paper, questions, startingExam])

  // ── Redis sync helpers ─────────────────────────────────────────
  const syncFnRef = useRef<() => void>(() => {})
  const buildSyncFn = useCallback(() => {
    return () => {
      if (!paper || !attemptId || submittedRef.current) return
      const payload = { paperSlug: paper.slug, answers, marked, currentIndex, remainingSeconds }
      syncLiveAttempt(payload).catch(async (err) => {
        if (err instanceof APIError && err.status === 401) {
          try {
            await refreshAuthSession()
            await syncLiveAttempt(payload)
          } catch {
            // refresh failed — state will be retried on next sync cycle
          }
        }
      })
    }
  }, [paper, attemptId, answers, marked, currentIndex, remainingSeconds])

  useEffect(() => { syncFnRef.current = buildSyncFn() }, [buildSyncFn])

  const prevIndexRef = useRef(currentIndex)
  useEffect(() => {
    if (loading || submitted || !examStarted) return
    if (currentIndex !== prevIndexRef.current) {
      prevIndexRef.current = currentIndex
      syncFnRef.current()
    }
  }, [currentIndex, loading, submitted, examStarted])

  useEffect(() => {
    if (loading || submitted || !examStarted) return
    const id = window.setInterval(() => syncFnRef.current(), 10_000)
    return () => window.clearInterval(id)
  }, [loading, submitted, examStarted])

  // ── Exit handler: sync first, then navigate ────────────────────
  const handleExit = useCallback(async () => {
    if (!paper) return
    setExiting(true)
    if (attemptId && !submittedRef.current) {
      const payload = { paperSlug: paper.slug, answers, marked, currentIndex, remainingSeconds }
      try {
        await syncLiveAttempt(payload)
      } catch (err) {
        if (err instanceof APIError && err.status === 401) {
          try { await refreshAuthSession(); await syncLiveAttempt(payload) } catch { /* silent */ }
        }
      }
    }
    navigate(`/pyq/${paper.slug}`)
  }, [paper, attemptId, answers, marked, currentIndex, remainingSeconds, navigate])

  // ── Timer countdown ────────────────────────────────────────────
  useEffect(() => {
    if (submitted || loading || !examStarted || remainingSeconds <= 0) return
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
  }, [loading, examStarted, remainingSeconds, submitted])

  // ── Sync on unmount + browser close (catches "Exit Paper" navigation) ──
  useEffect(() => {
    return () => { syncFnRef.current() }
  }, [])

  useEffect(() => {
    const onUnload = () => syncFnRef.current()
    window.addEventListener('beforeunload', onUnload)
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [])

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

    if (attemptId) {
      const submitPayload = { attemptId, paperSlug: paper.slug, correct, wrong, skipped, timeTakenSeconds: timeTaken, answers }
      submitLiveAttempt(submitPayload).catch(async (err) => {
        if (err instanceof APIError && err.status === 401) {
          try { await refreshAuthSession(); await submitLiveAttempt(submitPayload) } catch { /* silent */ }
        }
      })
    }

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

  // ── Subject grouping memos ─────────────────────────────────────
  const subjectList = useMemo(() => {
    const map = new Map<string, { count: number; answered: number }>()
    for (const q of questions) {
      if (q.answerKey === 'Deleted') continue
      if (!map.has(q.subject)) map.set(q.subject, { count: 0, answered: 0 })
      const e = map.get(q.subject)!
      e.count++
      if (answers[q.slug]) e.answered++
    }
    return [...map.entries()].map(([name, { count, answered }]) => ({ name, count, answered }))
  }, [questions, answers])

  const filteredQuestions = useMemo(
    () => activeSubject ? questions.filter((q) => q.subject === activeSubject) : questions,
    [questions, activeSubject],
  )

  const switchSubject = useCallback((subject: string) => {
    setActiveSubject(subject)
    const first = questions.findIndex((q) => q.subject === subject)
    if (first !== -1) setCurrentIndex(first)
  }, [questions])

  const currentQuestion = questions[currentIndex]
  const localizedCurrent = currentQuestion ? getLocalizedQuestion(currentQuestion, language) : null
  const hasHindiQuestions = questions.some(hasHindi)
  const activeQuestions = questions.filter((q) => q.answerKey !== 'Deleted')
  const answeredCount = Object.keys(answers).length
  const markedCount = Object.values(marked).filter(Boolean).length
  const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000)

  const filteredIndex = useMemo(
    () => currentQuestion ? filteredQuestions.findIndex((q) => q.slug === currentQuestion.slug) : -1,
    [filteredQuestions, currentQuestion],
  )

  const results = useMemo(
    () => computeResults(questions, answers),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [submitted, questions, answers],
  )

  if (!slug || !isAuthenticated) return <Navigate to="/" replace />
  if (loading) return <HaloLoader label="Loading paper" />
  if (error || !paper) return <Navigate to={`/pyq/${slug}`} replace />

  // ── Pre-exam screen (intro for new, compact resume card for ongoing) ──
  if (!examStarted) {
    const durationMins = paper.durationMinutes > 0 ? paper.durationMinutes : 120
    const hasNeg = (paper.negativeMarking ?? 0) > 0

    if (resumeDetected && existingAttempt) {
      const elapsed = Math.floor((Date.now() - resumeFetchedAtMs.current) / 1000)
      const liveRemaining = Math.max(0, existingAttempt.remainingSeconds - elapsed)
      return (
        <div className="pa-intro-page">
          <div className="pa-intro-card pa-resume-card">
            <span className="pa-intro-exam-badge">{paper.examName}</span>
            <h1 className="pa-intro-title">{paper.title}</h1>

            <div className="pa-resume-progress">
              <div className="pa-resume-stat">
                <strong>{existingAttempt.answeredCount}</strong>
                <span>of {questions.length} answered</span>
              </div>
              <div className="pa-resume-divider" />
              <div className="pa-resume-stat">
                <strong>{formatTime(liveRemaining)}</strong>
                <span>remaining</span>
              </div>
            </div>

            <div className="pa-intro-fs-warn">
              <Maximize2 size={16} />
              <div>
                <strong>Continue in fullscreen</strong>
                <p>The exam will resume from where you left off.</p>
              </div>
            </div>

            <button
              type="button"
              className="pa-intro-start-btn"
              onClick={handleResumeExam}
              disabled={startingExam}
            >
              {startingExam ? 'Resuming…' : <><Play size={16} /> Continue Exam →</>}
            </button>

            <Link className="pa-intro-back-link" to={`/pyq/${paper.slug}`}>
              ← Exit to paper
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="pa-intro-page">
        <div className="pa-intro-card">
          <span className="pa-intro-exam-badge">{paper.examName}</span>
          <h1 className="pa-intro-title">{paper.title}</h1>

          <div className="pa-intro-stats">
            <div className="pa-intro-stat">
              <strong>{questions.length}</strong>
              <span>Questions</span>
            </div>
            <div className="pa-intro-stat">
              <strong>{durationMins}</strong>
              <span>Minutes</span>
            </div>
            {paper.maxMarks > 0 && (
              <div className="pa-intro-stat">
                <strong>{paper.maxMarks}</strong>
                <span>Max Marks</span>
              </div>
            )}
            {hasNeg && (
              <div className="pa-intro-stat pa-intro-stat-neg">
                <strong>-{paper.negativeMarking}</strong>
                <span>Negative</span>
              </div>
            )}
            {subjectList.length > 1 && (
              <div className="pa-intro-stat">
                <strong>{subjectList.length}</strong>
                <span>Subjects</span>
              </div>
            )}
          </div>

          <div className="pa-intro-instructions">
            <h3>Before you begin</h3>
            <ul>
              <li>The timer starts the moment you click <strong>Start Exam</strong>.</li>
              <li>Each question has four options — select the best answer.</li>
              {hasNeg && (
                <li><strong>{paper.negativeMarking} mark{paper.negativeMarking !== 1 ? 's' : ''}</strong> will be deducted for each wrong answer. Skipped questions carry no penalty.</li>
              )}
              {subjectList.length > 1 && (
                <li>Questions are grouped by subject. Use the subject tabs to jump to any section.</li>
              )}
              <li>You can <strong>Mark for Review</strong> and come back to any question before submitting.</li>
              <li>Your progress is saved to the cloud. If you close the tab, resume from your Dashboard.</li>
            </ul>
          </div>

          <div className="pa-intro-fs-warn">
            <Maximize2 size={16} />
            <div>
              <strong>Fullscreen mode</strong>
              <p>The exam will open in fullscreen for a distraction-free experience.</p>
            </div>
          </div>

          <button
            type="button"
            className="pa-intro-start-btn"
            onClick={handleStartExam}
            disabled={startingExam || questions.length === 0}
          >
            {startingExam ? 'Starting…' : 'Start Exam →'}
          </button>

          <Link className="pa-intro-back-link" to={`/pyq/${paper.slug}`}>
            ← Back to paper
          </Link>
        </div>
      </div>
    )
  }

  // ── Action helpers (only needed once exam started) ─────────────
  const chooseOption = (key: string) => {
    if (!currentQuestion || submitted) return
    setAnswers((cur) => ({ ...cur, [currentQuestion.slug]: key }))
  }

  const toggleMarked = () => {
    if (!currentQuestion || submitted) return
    setMarked((cur) => ({ ...cur, [currentQuestion.slug]: !cur[currentQuestion.slug] }))
  }

  const goTo = (index: number) => setCurrentIndex(Math.max(0, Math.min(index, questions.length - 1)))

  const goPrev = () => {
    if (filteredIndex <= 0) return
    const prevQ = filteredQuestions[filteredIndex - 1]
    const gi = questions.findIndex((q) => q.slug === prevQ.slug)
    if (gi !== -1) setCurrentIndex(gi)
  }

  const goNext = () => {
    if (filteredIndex >= filteredQuestions.length - 1) return
    const nextQ = filteredQuestions[filteredIndex + 1]
    const gi = questions.findIndex((q) => q.slug === nextQ.slug)
    if (gi !== -1) setCurrentIndex(gi)
  }

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
  const hasSubjectTabs = subjectList.length > 1

  // ── Submission summary ─────────────────────────────────────────
  if (submitted && !reviewMode) {
    const activeCount = activeQuestions.length
    const negMark = paper.negativeMarking ?? 0
    const maxMarks = paper.maxMarks > 0 ? paper.maxMarks : activeCount
    const marksPerQ = parseFloat((maxMarks / activeCount).toFixed(4))
    const earnedMarks = parseFloat((results.correct * marksPerQ).toFixed(2))
    const lostMarks = parseFloat((results.wrong * negMark).toFixed(2))
    const netMarks = parseFloat((earnedMarks - lostMarks).toFixed(2))
    const deletedCount = questions.length - activeCount
    const subjectMarks = (s: { correct: number; wrong: number }) =>
      parseFloat((s.correct * marksPerQ - s.wrong * negMark).toFixed(2))
    return (
      <div className="pa-result-page">
        <header className="pa-result-header">
          <CheckCircle2 size={20} className="pa-result-icon" />
          <div className="pa-result-header-text">
            <small>{paper.examName}</small>
            <h1>{paper.title}</h1>
          </div>
        </header>

        <div className="pa-result-body">
          <section className="pa-score-panel">
            <div className="pa-score-ring">
              <strong className={netMarks < 0 ? 'pa-score-neg' : ''}>{netMarks}</strong>
              <span>/ {maxMarks}</span>
            </div>
            <p className="pa-score-label">marks scored</p>

            <div className="pa-score-stats">
              <div className="pa-stat pa-stat--c">
                <span>+{earnedMarks}</span>
                <small>Earned</small>
                <em>{results.correct} correct</em>
              </div>
              <div className="pa-stat pa-stat--w">
                <span>{lostMarks > 0 ? `−${lostMarks}` : '0'}</span>
                <small>Deducted</small>
                <em>{results.wrong} wrong</em>
              </div>
              <div className="pa-stat pa-stat--s">
                <span>{results.skipped}</span>
                <small>Skipped</small>
                <em>&nbsp;</em>
              </div>
            </div>

            <div className="pa-score-meta">
              <p className="pa-time-taken">Time: {formatTime(timeTaken)}</p>
              <p className="pa-negmark-note">+{marksPerQ}/correct{negMark > 0 ? ` · −${negMark}/wrong` : ''}</p>
              {deletedCount > 0 && (
                <p className="pa-negmark-note">{deletedCount} Q deleted (excluded)</p>
              )}
            </div>
          </section>

          <section className="pa-subject-panel">
            {results.subjectScores.length > 0 ? (
              <table className="pa-subject-table">
                <thead>
                  <tr><th>Subject</th><th>Qs</th><th>✓</th><th>✗</th><th>—</th><th>Marks</th></tr>
                </thead>
                <tbody>
                  {results.subjectScores.map((s) => {
                    const sm = subjectMarks(s)
                    return (
                      <tr key={s.subject}>
                        <td>{s.subject}</td>
                        <td>{s.total}</td>
                        <td className="correct">{s.correct}</td>
                        <td className="wrong">{s.wrong}</td>
                        <td className="skipped">{s.skipped}</td>
                        <td className={sm < 0 ? 'wrong' : sm > 0 ? 'correct' : ''}>{sm}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <div className="pa-subject-empty">No subject breakdown available</div>
            )}
          </section>
        </div>

        <footer className="pa-result-footer">
          <button type="button" className="pa-btn-review" onClick={() => { setReviewMode(true); setReviewIndex(0) }}>
            <BookOpen size={15} /> Review Answers
          </button>
          <button type="button" className="pa-btn-secondary" onClick={() => navigate(`/pyq/${paper.slug}`)}>
            Back to Paper
          </button>
          <button type="button" className="pa-btn-secondary" onClick={() => navigate(`/exam/${paper.examSlug}`)}>
            Back to Exam
          </button>
        </footer>
      </div>
    )
  }

  // ── Review mode ────────────────────────────────────────────────
  if (submitted && reviewMode) {
    const rq = questions[reviewIndex]
    const localizedReview = rq ? getLocalizedQuestion(rq, language) : null
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
            {hasHindiQuestions && (
              <div className="pyq-language-toggle compact" aria-label="Question language">
                <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>English</button>
                <button type="button" className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिन्दी</button>
              </div>
            )}
            <span className="pa-review-badge">Review mode</span>
            <button type="button" className="pa-exit-btn" onClick={() => setReviewMode(false)}>
              Back to results
            </button>
          </div>
        </header>

        <div className="pa-attempt-body">
          <section className="pa-question-panel">
            <div className="pa-question-scroll">
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
                  {localizedReview?.passage && (
                    <div className="pyq-passage">
                      <strong>{language === 'hi' ? 'अनुच्छेद' : 'Passage'}</strong>
                      <QuestionRenderer text={localizedReview.passage} />
                    </div>
                  )}
                  <div className="pa-q-text"><MathText text={localizedReview?.question ?? rq.question} /></div>

                  {rq.answerKey === 'Deleted' ? (
                    <div className="pa-deleted-notice">
                      <span className="pa-deleted-badge">Deleted Question</span>
                      <p>{rq.explanation}</p>
                    </div>
                  ) : (
                    <>
                      <div className="pa-options">
                        {(localizedReview?.options ?? rq.options).map((opt) => {
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
            </div>

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

  // Questions visible in palette (filtered by active subject)
  const paletteEntries = activeSubject
    ? questions.map((q, i) => ({ q, i })).filter(({ q }) => q.subject === activeSubject)
    : questions.map((q, i) => ({ q, i }))

  return (
    <div className={`pa-attempt-page${hasSubjectTabs ? ' has-subjects' : ''}`}>
      {/* Fullscreen warning */}
      {showFsWarning && (
        <button type="button" className="pa-fullscreen-warn" onClick={enterFullscreen}>
          <Maximize2 size={14} />
          You left fullscreen — click to return
        </button>
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
          {hasHindiQuestions && (
            <div className="pyq-language-toggle compact" aria-label="Question language">
              <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>English</button>
              <button type="button" className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिन्दी</button>
            </div>
          )}
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

      {/* Subject tabs bar */}
      {hasSubjectTabs && (
        <nav className="pa-subject-tabs" aria-label="Question subjects">
          {subjectList.map((s) => (
            <button
              key={s.name}
              type="button"
              className={`pa-subject-tab${activeSubject === s.name ? ' active' : ''}`}
              onClick={() => switchSubject(s.name)}
            >
              {s.name}
              <span className="pa-subject-tab-count">{s.answered}/{s.count}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Body: question + palette */}
      <div className="pa-attempt-body">

        {/* Question panel */}
        <section className="pa-question-panel">
          <div className="pa-question-scroll">
            <div className="pa-q-header">
              <span className="pa-q-num">
                Q{currentIndex + 1} <small>of {questions.length}</small>
              </span>
              {currentQuestion?.subject && (
                <span className="pa-q-subject">{currentQuestion.subject}</span>
              )}
              <button type="button" className={`pa-mark-btn${marked[currentQuestion?.slug ?? ''] ? ' active' : ''}`} onClick={toggleMarked}>
                <Flag size={13} />
                {marked[currentQuestion?.slug ?? ''] ? 'Marked' : 'Mark for Review'}
              </button>
            </div>

            {currentQuestion ? (
              <>
                {localizedCurrent?.passage && (
                  <div className="pyq-passage">
                    <strong>{language === 'hi' ? 'अनुच्छेद' : 'Passage'}</strong>
                    <QuestionRenderer text={localizedCurrent.passage} />
                  </div>
                )}
                <div className="pa-q-text">
                  <MathText text={localizedCurrent?.question ?? currentQuestion.question} />
                </div>

                {currentQuestion.answerKey === 'Deleted' ? (
                  <div className="pa-deleted-notice">
                    <span className="pa-deleted-badge">Deleted Question</span>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                ) : (
                  <>
                    <div className="pa-options">
                      {(localizedCurrent?.options ?? currentQuestion.options).map((opt) => {
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
          </div>

          <footer className="pa-q-actions">
            <button type="button" className="pa-nav-btn" onClick={goPrev} disabled={filteredIndex <= 0}>
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="pa-q-progress">
              {filteredIndex + 1} / {filteredQuestions.length}
              {activeSubject && hasSubjectTabs && <small> in {activeSubject}</small>}
            </span>
            <button type="button" className="pa-nav-btn primary" onClick={goNext} disabled={filteredIndex >= filteredQuestions.length - 1}>
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
            {paletteEntries.map(({ q, i }) => {
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

          <button type="button" className="pa-exit-link" onClick={handleExit} disabled={exiting}>
            {exiting ? 'Saving…' : 'Exit Paper'}
          </button>
        </aside>
      </div>
    </div>
  )
}
