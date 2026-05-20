import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Clock3, Flag, XCircle } from 'lucide-react'
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
import { recordMockAttempt } from '../lib/mockActivity'
import { usePageMeta } from '../lib/usePageMeta'

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

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
  const recordedAttempt = useRef(false)

  usePageMeta({
    title: mock ? `${mock.title} Attempt | Ministry of Papers` : 'Mock Attempt | Ministry of Papers',
    description: mock?.description ?? 'Attempt a timed mock test.',
    canonicalPath: slug ? `/mock-attempt/${slug}` : '/mock-attempt',
  })

  useEffect(() => {
    if (!slug) return

    let cancelled = false

    const loadAttempt = async () => {
      try {
        setLoading(true)
        setError(false)
        const mockData = await fetchMockBySlug(slug)
        const mockQuestions = (await fetchMockQuestions(mockData.slug)) ?? []
        const fallbackQuestions = mockQuestions.length
          ? mockQuestions
          : (await fetchExamQuestions(mockData.examSlug)).slice(0, Math.max(mockData.questions, 1))

        if (cancelled) return
        setMock(mockData)
        setQuestions(fallbackQuestions)
        setRemainingSeconds(mockData.durationMinutes * 60)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadAttempt()

    return () => {
      cancelled = true
    }
  }, [slug])

  useEffect(() => {
    if (!mock || recordedAttempt.current) return
    recordMockAttempt(mock)
    void recordAttempt({ examSlug: mock.examSlug, mockSlug: mock.slug }).catch(() => undefined)
    recordedAttempt.current = true
  }, [mock])

  useEffect(() => {
    if (submitted || loading || remainingSeconds <= 0) return

    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          setSubmitted(true)
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [loading, remainingSeconds, submitted])

  const currentQuestion = questions[currentIndex]
  const answeredCount = Object.keys(answers).length
  const markedCount = Object.values(marked).filter(Boolean).length
  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      return answers[question.slug] === question.answerKey ? total + 1 : total
    }, 0)
  }, [answers, questions])

  if (!slug) return <Navigate to="/mock-test" replace />
  if (loading) return <HaloLoader label="Loading mock attempt" />
  if (error || !mock) return <Navigate to="/mock-test" replace />

  const chooseOption = (key: string) => {
    if (!currentQuestion || submitted) return
    setAnswers((current) => ({ ...current, [currentQuestion.slug]: key }))
  }

  const toggleMarked = () => {
    if (!currentQuestion || submitted) return
    setMarked((current) => ({ ...current, [currentQuestion.slug]: !current[currentQuestion.slug] }))
  }

  const goToQuestion = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, questions.length - 1)))
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

      {submitted ? (
        <main className="mock-result-screen">
          <section className="mock-result-card">
            <CheckCircle2 size={28} />
            <h1>Mock submitted</h1>
            <div className="mock-result-score">
              <strong>{score}</strong>
              <span>/ {questions.length}</span>
            </div>
            <p>{answeredCount} attempted, {questions.length - answeredCount} not attempted.</p>
            <div className="mock-result-actions">
              <button type="button" onClick={() => navigate(`/mock-test/${mock.examSlug}`)}>Back to mock library</button>
              <button type="button" onClick={() => navigate(homePathForUser(user))}>Dashboard</button>
            </div>
          </section>
        </main>
      ) : (
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
                  {currentQuestion.options.map((option) => {
                    const selected = answers[currentQuestion.slug] === option.key

                    return (
                      <button
                        className={selected ? 'selected' : ''}
                        type="button"
                        key={option.key}
                        onClick={() => chooseOption(option.key)}
                      >
                        <span>{option.key}</span>
                        <strong>{option.text}</strong>
                      </button>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="mock-empty-question">
                <AlertTriangle size={20} />
                <p>No questions are linked to this mock yet.</p>
              </div>
            )}

            <footer className="mock-question-actions">
              <button type="button" onClick={() => goToQuestion(currentIndex - 1)} disabled={currentIndex === 0}>
                <ChevronLeft size={16} /> Previous
              </button>
              <button type="button" onClick={() => setSubmitted(true)}>
                Submit
              </button>
              <button type="button" onClick={() => goToQuestion(currentIndex + 1)} disabled={currentIndex >= questions.length - 1}>
                Next <ChevronRight size={16} />
              </button>
            </footer>
          </section>

          <aside className="mock-palette-panel">
            <div className="mock-palette-stats">
              <span><CheckCircle2 size={14} /> {answeredCount} Answered</span>
              <span><Flag size={14} /> {markedCount} Marked</span>
              <span><XCircle size={14} /> {questions.length - answeredCount} Left</span>
            </div>

            <div className="mock-question-palette">
              {questions.map((question, index) => (
                <button
                  className={[
                    index === currentIndex ? 'current' : '',
                    answers[question.slug] ? 'answered' : '',
                    marked[question.slug] ? 'marked' : '',
                  ].join(' ').trim()}
                  type="button"
                  key={question.slug}
                  onClick={() => goToQuestion(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <Link to={`/mock-test/${mock.examSlug}`}>Exit mock</Link>
          </aside>
        </main>
      )}
    </section>
  )
}
