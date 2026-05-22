import { AlertTriangle, BarChart3, ChevronLeft, ChevronRight, Clock3, Flag, Home, RotateCcw, XCircle } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { homePathForUser } from '../context/admin'
import { useAuth } from '../context/useAuth'
import {
  fetchExamQuestions,
  fetchMockBySlug,
  fetchMockQuestions,
  recordAttempt,
  type MockItem,
  type Question,
} from '../lib/api'
import { recordMockAttempt, saveAttemptResult, type SubjectResult } from '../lib/mockActivity'
import { usePageMeta } from '../lib/usePageMeta'
import { estimatePercentile, getCutoffComparison } from '../data/examCutoffs'

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function formatMinutes(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

// ── Score Ring ────────────────────────────────────────────────────────────
function ScoreRing({ score, total }: { score: number; total: number }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const pct = total > 0 ? Math.max(0, score) / total : 0
  const filled = pct * circ
  const accuracy = total > 0 ? Math.round((Math.max(0, score) / total) * 100) : 0

  const color = accuracy >= 70 ? '#16a34a' : accuracy >= 50 ? '#d97706' : '#dc2626'

  return (
    <div className="mr-ring-wrap">
      <svg width="136" height="136" viewBox="0 0 136 136" aria-hidden="true">
        <circle cx="68" cy="68" r={r} fill="none" stroke="#f3f4f6" strokeWidth="10" />
        <circle
          cx="68" cy="68" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          strokeDashoffset={circ / 4}
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div className="mr-ring-center">
        <strong style={{ color: score < 0 ? '#dc2626' : color }}>{score}</strong>
        <span>/ {total}</span>
      </div>
    </div>
  )
}

// ── Subject bar ───────────────────────────────────────────────────────────
function SubjectBar({ subject, correct, total }: { subject: string; correct: number; total: number }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const color = pct >= 70 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626'
  return (
    <div className="mr-subject-row">
      <div className="mr-subject-label">
        <span>{subject}</span>
        <small>{correct}/{total}</small>
      </div>
      <div className="mr-bar-track">
        <div className="mr-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="mr-bar-pct" style={{ color }}>{pct}%</span>
    </div>
  )
}

// ── Result Screen ─────────────────────────────────────────────────────────
function ResultScreen({
  mock, score, answeredCount, questions, subjects, timeTaken, onDashboard, onBack,
}: {
  mock: MockItem
  score: number       // correct count
  answeredCount: number
  questions: Question[]
  subjects: SubjectResult[]
  timeTaken: number
  onDashboard: () => void
  onBack: () => void
}) {
  const wrong = answeredCount - score
  const skipped = questions.length - answeredCount
  const negMark = mock.negativeMarking ?? 0
  // rawScore accounts for negative marking; can be negative
  const rawScore = parseFloat((score - wrong * negMark).toFixed(2))
  const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0
  const percentile = estimatePercentile(score, questions.length, mock.examSlug)
  const cutoff = getCutoffComparison(score, questions.length, mock.examSlug)

  return (
    <div className="mr-screen">
      <div className="mr-top-bar">
        <div className="mr-top-exam">
          <small>{mock.examName}</small>
          <strong>{mock.title}</strong>
        </div>
        <div className="mr-top-badge">
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16" aria-hidden="true">
            <circle cx="10" cy="10" r="9" stroke="#16a34a" strokeWidth="2"/>
            <path d="M6 10l3 3 5-5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Test Complete
        </div>
      </div>

      <div className="mr-body">
        {/* ── Left: score + stats ── */}
        <div className="mr-left">
          <ScoreRing score={negMark > 0 ? rawScore : score} total={questions.length} />
          {negMark > 0 && (
            <p className="mr-negmark-note">-{negMark} per wrong · raw score: <strong>{rawScore}</strong></p>
          )}

          <div className="mr-stat-list">
            <div className="mr-stat">
              <span className="mr-stat-label">Accuracy</span>
              <strong className={`mr-stat-val ${accuracy >= 70 ? 'good' : accuracy >= 50 ? 'mid' : 'bad'}`}>
                {accuracy}%
              </strong>
            </div>
            <div className="mr-stat">
              <span className="mr-stat-label">Time used</span>
              <strong className="mr-stat-val">{formatMinutes(timeTaken)}</strong>
            </div>
            <div className="mr-stat">
              <span className="mr-stat-label">Correct</span>
              <strong className="mr-stat-val good">{score}</strong>
            </div>
            <div className="mr-stat">
              <span className="mr-stat-label">Wrong</span>
              <strong className="mr-stat-val bad">{wrong}</strong>
            </div>
            <div className="mr-stat">
              <span className="mr-stat-label">Skipped</span>
              <strong className="mr-stat-val muted">{skipped}</strong>
            </div>
            {negMark > 0 && (
              <div className="mr-stat">
                <span className="mr-stat-label">Raw Score</span>
                <strong className={`mr-stat-val ${rawScore >= 0 ? 'good' : 'bad'}`}>{rawScore}</strong>
              </div>
            )}
            {percentile > 0 && (
              <div className="mr-stat">
                <span className="mr-stat-label">Est. Percentile</span>
                <strong className="mr-stat-val">{percentile}th</strong>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: subjects + cutoff ── */}
        <div className="mr-right">
          {subjects.length > 0 && (
            <div className="mr-section">
              <h3>Subject Breakdown</h3>
              <div className="mr-subject-list">
                {subjects.map((s) => (
                  <SubjectBar key={s.subject} subject={s.subject} correct={s.correct} total={s.total} />
                ))}
              </div>
            </div>
          )}

          {cutoff && (
            <div className="mr-section">
              <h3>vs {cutoff.examName} {cutoff.stage} Cutoff <span className="mr-cutoff-year">({cutoff.year})</span></h3>
              <div className={`mr-cutoff-verdict ${cutoff.cleared ? 'cleared' : 'missed'}`}>
                {cutoff.cleared ? (
                  <>✅ Your score ({cutoff.userScore}/{cutoff.totalMarks}) clears the General cutoff ({cutoff.cutoff})</>
                ) : (
                  <>❌ Your score ({cutoff.userScore}/{cutoff.totalMarks}) is {(cutoff.cutoff - cutoff.userScore).toFixed(2)} below General cutoff ({cutoff.cutoff})</>
                )}
              </div>
              <div className="mr-cutoff-table">
                {cutoff.allCutoffs.map((c) => {
                  const userNorm = cutoff.userScore
                  const pct = Math.min(100, Math.round((userNorm / c.marks) * 100))
                  const cleared = userNorm >= c.marks
                  return (
                    <div className="mr-cutoff-row" key={c.category}>
                      <span>{c.category}</span>
                      <span className="mr-cutoff-marks">{c.marks}</span>
                      <span className={`mr-cutoff-badge ${cleared ? 'pass' : 'fail'}`}>
                        {cleared ? `${pct}% of cutoff` : `${Math.round((userNorm / c.marks) * 100)}% of cutoff`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {percentile > 0 && (
            <div className="mr-section">
              <h3>Estimated Rank Band</h3>
              <div className="mr-percentile-bar">
                <div className="mr-percentile-track">
                  <div className="mr-percentile-fill" style={{ width: `${percentile}%` }} />
                  <div className="mr-percentile-marker" style={{ left: `${percentile}%` }} />
                </div>
                <div className="mr-percentile-labels">
                  <span>Bottom</span>
                  <span className="mr-percentile-you">You — Top {100 - percentile}%</span>
                  <span>Top</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mr-actions">
        <button type="button" className="mr-btn secondary" onClick={onBack}>
          <RotateCcw size={15} /> Back to Tests
        </button>
        <Link to="/analytics" className="mr-btn primary">
          <BarChart3 size={15} /> Full Analytics
        </Link>
        <button type="button" className="mr-btn ghost" onClick={onDashboard}>
          <Home size={15} /> Dashboard
        </button>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────
export function MockAttemptPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { user } = useAuth()
  const [mock, setMock] = useState<MockItem | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [marked, setMarked] = useState<Record<string, boolean>>({})
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const recordedAttemptRef = useRef(false)
  const resultSavedRef = useRef(false)
  const remainingAtSubmitRef = useRef(0)

  usePageMeta({
    title: mock ? `${mock.title} | Ministry of Papers` : 'Mock Attempt | Ministry of Papers',
    description: mock?.description ?? 'Attempt a timed mock test.',
    canonicalPath: slug ? `/mock-attempt/${slug}` : '/mock-attempt',
  })

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true); setError(false)
        const mockData = await fetchMockBySlug(slug)
        const mockQs = (await fetchMockQuestions(mockData.slug)) ?? []
        const qs = mockQs.length
          ? mockQs
          : (await fetchExamQuestions(mockData.examSlug)).slice(0, Math.max(mockData.questions, 1))
        if (cancelled) return
        setMock(mockData)
        setQuestions(qs)
        setRemainingSeconds(mockData.durationMinutes * 60)
      } catch { if (!cancelled) setError(true) }
      finally  { if (!cancelled) setLoading(false) }
    }
    void load()
    return () => { cancelled = true }
  }, [slug])

  useEffect(() => {
    if (!mock || recordedAttemptRef.current) return
    recordMockAttempt(mock)
    void recordAttempt({ examSlug: mock.examSlug, mockSlug: mock.slug }).catch(() => undefined)
    recordedAttemptRef.current = true
  }, [mock])

  useEffect(() => {
    if (submitted || loading || remainingSeconds <= 0) return
    const timer = window.setInterval(() => {
      setRemainingSeconds((cur) => {
        if (cur <= 1) {
          window.clearInterval(timer)
          remainingAtSubmitRef.current = 0
          setSubmitted(true)
          return 0
        }
        return cur - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [loading, remainingSeconds, submitted])

  // compute subject breakdown (stable once submitted because answers/questions don't change after)
  const subjectBreakdown = useMemo((): SubjectResult[] => {
    const map = new Map<string, SubjectResult>()
    for (const q of questions) {
      const s = q.subject || 'General'
      if (!map.has(s)) map.set(s, { subject: s, total: 0, correct: 0, wrong: 0, skipped: 0 })
      const sr = map.get(s)!
      sr.total++
      const ans = answers[q.slug]
      if (ans) { ans === q.answerKey ? sr.correct++ : sr.wrong++ } else sr.skipped++
    }
    return Array.from(map.values())
  }, [questions, answers])

  const score = useMemo(() =>
    questions.reduce((n, q) => (answers[q.slug] === q.answerKey ? n + 1 : n), 0),
  [answers, questions])

  const answeredCount = Object.keys(answers).length
  const markedCount   = Object.values(marked).filter(Boolean).length

  // save result once on submit
  useEffect(() => {
    if (!submitted || !mock || resultSavedRef.current) return
    resultSavedRef.current = true
    const wrong = answeredCount - score
    const negMark = mock.negativeMarking ?? 0
    const rawScore = parseFloat((score - wrong * negMark).toFixed(2))
    saveAttemptResult({
      mockSlug: mock.slug,
      examSlug: mock.examSlug,
      examName: mock.examName,
      mockTitle: mock.title,
      totalQuestions: questions.length,
      attemptedAt: new Date().toISOString(),
      answered: answeredCount,
      correct: score,
      wrong,
      skipped: questions.length - answeredCount,
      rawScore: negMark > 0 ? rawScore : undefined,
      timeTakenSeconds: mock.durationMinutes * 60 - remainingAtSubmitRef.current,
      subjects: subjectBreakdown,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  if (!slug) return <Navigate to="/mock-test" replace />
  if (loading) return <HaloLoader label="Loading mock" />
  if (error || !mock) return <Navigate to="/mock-test" replace />

  const handleSubmit = () => {
    remainingAtSubmitRef.current = remainingSeconds
    setSubmitted(true)
  }

  const chooseOption = (key: string) => {
    if (!questions[currentIndex] || submitted) return
    setAnswers((cur) => ({ ...cur, [questions[currentIndex].slug]: key }))
  }

  const toggleMarked = () => {
    if (!questions[currentIndex] || submitted) return
    setMarked((cur) => ({ ...cur, [questions[currentIndex].slug]: !cur[questions[currentIndex].slug] }))
  }

  const goTo = (i: number) => setCurrentIndex(Math.max(0, Math.min(i, questions.length - 1)))

  const currentQuestion = questions[currentIndex]

  if (submitted) {
    return (
      <ResultScreen
        mock={mock}
        score={score}
        answeredCount={answeredCount}
        questions={questions}
        subjects={subjectBreakdown}
        timeTaken={mock.durationMinutes * 60 - remainingAtSubmitRef.current}
        onDashboard={() => navigate(homePathForUser(user))}
        onBack={() => navigate(`/mock-test/${mock.examSlug}`)}
      />
    )
  }

  return (
    <section className="mock-attempt-page">
      <header className="mock-attempt-topbar">
        <div>
          <small>{mock.examName}</small>
          <strong>{mock.title}</strong>
        </div>
        <div className="mock-attempt-timer">
          <Clock3 size={17} />
          <span>{formatTime(remainingSeconds)}</span>
        </div>
      </header>

      <main className="mock-attempt-grid">
        <section className="mock-question-panel">
          <div className="mock-question-head">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <button type="button" onClick={toggleMarked}>
              <Flag size={15} /> {marked[currentQuestion?.slug ?? ''] ? 'Marked' : 'Mark'}
            </button>
          </div>

          {currentQuestion ? (
            <>
              <h1>{currentQuestion.question}</h1>
              <div className="mock-option-list">
                {currentQuestion.options.map((option) => (
                  <button
                    className={answers[currentQuestion.slug] === option.key ? 'selected' : ''}
                    type="button"
                    key={option.key}
                    onClick={() => chooseOption(option.key)}
                  >
                    <span>{option.key}</span>
                    <strong>{option.text}</strong>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="mock-empty-question">
              <AlertTriangle size={20} />
              <p>No questions linked to this mock yet.</p>
            </div>
          )}

          <footer className="mock-question-actions">
            <button type="button" onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}>
              <ChevronLeft size={16} /> Previous
            </button>
            <button type="button" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={() => goTo(currentIndex + 1)} disabled={currentIndex >= questions.length - 1}>
              Next <ChevronRight size={16} />
            </button>
          </footer>
        </section>

        <aside className="mock-palette-panel">
          <div className="mock-palette-stats">
            <span style={{ color: '#16a34a' }}>✓ {answeredCount}</span>
            <span style={{ color: '#7c3aed' }}><Flag size={13} /> {markedCount}</span>
            <span><XCircle size={13} /> {questions.length - answeredCount} Left</span>
          </div>

          <div className="mock-question-palette">
            {questions.map((q, i) => (
              <button
                className={[
                  i === currentIndex ? 'current' : '',
                  answers[q.slug]    ? 'answered'  : '',
                  marked[q.slug]     ? 'marked'    : '',
                ].join(' ').trim()}
                type="button"
                key={q.slug}
                onClick={() => goTo(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <Link to={`/mock-test/${mock.examSlug}`}>Exit mock</Link>
        </aside>
      </main>
    </section>
  )
}
