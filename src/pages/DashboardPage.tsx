import { Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { fetchDashboardBootstrap, fetchExamPapers, fetchExamQuestions, type Exam, type MockItem, type Paper, type Question } from '../lib/api'
import { examPreviousPapersPath } from '../lib/routes'
import { usePageMeta } from '../lib/usePageMeta'

export function DashboardPage() {
  const navigate = useNavigate()
  const [exams, setExams] = useState<Exam[]>([])
  const [mocks, setMocks] = useState<MockItem[]>([])
  const [recentQuestions, setRecentQuestions] = useState<Question[]>([])
  const [activeExamSlug, setActiveExamSlug] = useState('')
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([])
  const [activePapers, setActivePapers] = useState<Paper[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  usePageMeta({
    title: 'Dashboard | PYQVault',
    description: 'Your PYQVault dashboard for mock tests, PYQ practice, daily goals, and exam preparation progress.',
    canonicalPath: '/dashboard',
  })

  useEffect(() => {
    let cancelled = false

    const loadDashboard = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchDashboardBootstrap()
        if (cancelled) return

        setExams(data.exams)
        setMocks(data.mocks)
        setRecentQuestions(data.recentQuestions)
        setActiveExamSlug(data.exams[0]?.slug ?? '')
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load dashboard.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadDashboard()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!activeExamSlug) return

    let cancelled = false

    void Promise.all([
      fetchExamQuestions(activeExamSlug),
      fetchExamPapers(activeExamSlug),
    ])
      .then(([questions, papers]) => {
        if (cancelled) return
        setActiveQuestions(questions)
        setActivePapers(papers)
      })
      .catch(() => {
        if (cancelled) return
        setActiveQuestions([])
        setActivePapers([])
      })

    return () => {
      cancelled = true
    }
  }, [activeExamSlug])

  const activeExam = exams.find((exam) => exam.slug === activeExamSlug) ?? exams[0]
  const visibleQuestions = activeQuestions.length ? activeQuestions.slice(0, 5) : recentQuestions
  const recommendedMocks = mocks.filter((mock) => mock.examSlug === activeExam?.slug)
  const popularPapers = activePapers.slice(0, 6)

  const filteredExams = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return exams

    return exams.filter((exam) =>
      [
        exam.name,
        exam.shortName,
        exam.category,
        exam.description,
        ...exam.subjects,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    )
  }, [exams, query])

  const handleSearch = () => {
    const trimmed = query.trim()
    navigate(trimmed ? `/exam?q=${encodeURIComponent(trimmed)}` : '/exam')
  }

  if (loading) {
    return <p>Loading dashboard...</p>
  }

  if (error || !activeExam) {
    return <p>{error ?? 'Dashboard is unavailable right now.'}</p>
  }

  return (
    <>
      <section className="dashboard-strip">
        <div>
          <small>Active exam</small>
          <strong>{activeExam.shortName}</strong>
        </div>
        <div>
          <small>Papers</small>
          <strong>{activeExam.papers}</strong>
        </div>
        <div>
          <small>Questions</small>
          <strong>{activeExam.totalQuestions}</strong>
        </div>
        <div className="dashboard-strip-actions">
          <button type="button" onClick={() => navigate('/mock-test')}>Mock Tests</button>
          <button type="button" onClick={() => navigate(examPreviousPapersPath(activeExam.slug))}>PYQ Papers</button>
          <button type="button" onClick={() => navigate(visibleQuestions[0] ? `/question/${visibleQuestions[0].slug}` : `/exam/${activeExam.slug}`)}>Practice</button>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <small>Exams</small>
            <h2>All exams</h2>
          </div>
          <Link to="/exam">Browse all</Link>
        </div>
        <section className="pyp-sober-toolbar dashboard-inline-search">
          <label>
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleSearch()
              }}
              placeholder="Search your exam..."
            />
          </label>
        </section>
        <div className="dashboard-exam-grid">
          {filteredExams.map((exam) => (
            <article
              className={`dashboard-exam-card ${exam.slug === activeExam.slug ? 'active' : ''}`}
              key={exam.slug}
            >
              <button type="button" onClick={() => setActiveExamSlug(exam.slug)}>
                <span className="dashboard-exam-icon">{exam.icon}</span>
                <strong>{exam.shortName}</strong>
                <small>{exam.category}</small>
                <p>{exam.totalQuestions} questions</p>
              </button>
              <div className="dashboard-card-actions">
                <Link to={examPreviousPapersPath(exam.slug)}>Papers</Link>
                <Link to={`/exam/${exam.slug}`}>Open</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-content-grid">
        <article className="dashboard-panel">
          <div className="dashboard-panel-head">
            <div>
              <small>Popular papers</small>
              <h2>{activeExam.shortName} papers</h2>
            </div>
            <Link to={examPreviousPapersPath(activeExam.slug)}>View all</Link>
          </div>
          <div className="dashboard-list">
            {popularPapers.map((paper) => (
              <Link className="dashboard-list-row" to={`/pyq/${paper.slug}`} key={paper.slug}>
                <div>
                  <strong>{paper.title}</strong>
                  <small>{paper.year} · {paper.shift}</small>
                </div>
                <span>{paper.questions} Qs</span>
              </Link>
            ))}
            {popularPapers.length === 0 ? <p>No papers published yet.</p> : null}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-head">
            <div>
              <small>Mock tests</small>
              <h2>Recommended mocks</h2>
            </div>
            <Link to="/mock-test">View all</Link>
          </div>
          <div className="dashboard-card-grid">
            {recommendedMocks.map((mock) => (
              <Link className="dashboard-feature-card" to={`/mock-test/${mock.slug}`} key={mock.slug}>
                <strong>{mock.title}</strong>
                <small>{mock.questions} questions · {mock.durationMinutes} min</small>
                <span>{mock.isFree ? 'Free' : 'Premium'}</span>
              </Link>
            ))}
            {recommendedMocks.length === 0 ? <p>No mocks published for this exam yet.</p> : null}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-head">
            <div>
              <small>Recently viewed</small>
              <h2>Recent questions</h2>
            </div>
          </div>
          <div className="dashboard-list">
            {visibleQuestions.map((question) => (
              <Link className="dashboard-list-row" to={`/question/${question.slug}`} key={question.slug}>
                <div>
                  <strong>{question.examName} Q{question.questionNo}</strong>
                  <small>{question.subject} · {question.year}</small>
                </div>
                <span>Open</span>
              </Link>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-head">
            <div>
              <small>Quick access</small>
              <h2>Tools</h2>
            </div>
          </div>
          <div className="dashboard-card-grid">
            <button className="dashboard-feature-card dashboard-feature-button" type="button" onClick={() => navigate('/mock-test')}>
              <strong>Mock Tests</strong>
              <small>Start timed practice sets</small>
              <span>Open</span>
            </button>
            <button className="dashboard-feature-card dashboard-feature-button" type="button" onClick={() => navigate(examPreviousPapersPath(activeExam.slug))}>
              <strong>PYQ Papers</strong>
              <small>Browse year-wise public papers</small>
              <span>Open</span>
            </button>
            <button className="dashboard-feature-card dashboard-feature-button" type="button" onClick={() => navigate(visibleQuestions[0] ? `/question/${visibleQuestions[0].slug}` : `/exam/${activeExam.slug}`)}>
              <strong>Practice</strong>
              <small>Open solved questions directly</small>
              <span>Open</span>
            </button>
          </div>
        </article>
      </section>
    </>
  )
}
