import { ChevronRight, Clock3, FileText, Lock, Play } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { HaloLoader } from '../components/common/HaloLoader'
import {
  fetchExamCatalog,
  fetchMockCatalog,
  type Exam,
  type MockItem,
} from '../lib/api'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { normalizeExamCategory } from './DashboardPage'

export function MockDetailPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()
  const [exam, setExam] = useState<Exam | null>(null)
  const [examMocks, setExamMocks] = useState<MockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [diffFilter, setDiffFilter] = useState('All')

  useEffect(() => {
    if (!slug) return
    let cancelled = false

    void Promise.all([fetchExamCatalog(), fetchMockCatalog()])
      .then(([examCatalog, mockCatalog]) => {
        if (cancelled) return
        const exams = examCatalog ?? []
        const mocks = mockCatalog ?? []

        const directExam = exams.find((e) => e.slug === slug)
        const matchedMock = mocks.find((m) => m.slug === slug)
        const resolvedExamSlug = directExam?.slug ?? matchedMock?.examSlug

        if (!resolvedExamSlug) { setError(true); return }

        const resolvedExam = exams.find((e) => e.slug === resolvedExamSlug) ?? null
        if (!resolvedExam) { setError(true); return }

        setExam(resolvedExam)
        setExamMocks(mocks.filter((m) => m.examSlug === resolvedExamSlug))
      })
      .catch(() => { if (!cancelled) setError(true) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [slug])

  const freeMocks = examMocks.filter((m) => m.isFree)
  const totalQuestions = examMocks.reduce((sum, m) => sum + m.questions, 0)
  const visibleMocks = diffFilter === 'All' ? examMocks : examMocks.filter((m) => m.difficulty === diffFilter)
  const homeHref = isAuthenticated ? '/dashboard' : '/'

  const title = exam ? `${exam.shortName} Mock Tests | Ministry of Papers` : 'Mock Tests | Ministry of Papers'
  const desc = exam
    ? `Open the full ${exam.shortName} mock test library with free and premium practice series.`
    : 'Open mock test libraries by exam.'

  usePageMeta({
    title,
    description: desc,
    canonicalPath: exam ? `/mock-test/${exam.slug}` : '/mock-test',
    jsonLd: exam
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: title,
          description: desc,
          numberOfItems: examMocks.length,
          itemListElement: freeMocks.slice(0, 5).map((mock, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: mock.title,
            description: mock.description,
          })),
        }
      : undefined,
  })

  if (loading) {
    return (
      <section className="public-page mock-hub-page">
        <div className="public-shell">
          <HaloLoader label="Loading mock library" />
        </div>
      </section>
    )
  }

  if (error || !exam) return <Navigate to="/tests" replace />

  const openMock = (mock: MockItem) => {
    if (!isAuthenticated) { setLoginOpen(true); return }
    navigate(`/mock-attempt/${mock.slug}`)
  }

  return (
    <section className="public-page mock-hub-page">
      <div className="public-shell">
        <nav className="ep-breadcrumb" aria-label="Breadcrumb">
          <Link to={homeHref}>{isAuthenticated ? 'Dashboard' : 'Home'}</Link>
          <ChevronRight size={13} />
          <Link to="/tests">Tests</Link>
          <ChevronRight size={13} />
          <span>{exam.shortName}</span>
        </nav>

        <header className="mock-hub-header">
          <div>
            <small>{normalizeExamCategory(exam.category)} library</small>
            <h1>{exam.shortName} mock test series</h1>
            <p>{exam.description}</p>
          </div>
          <div className="mock-hub-metrics">
            <span>{examMocks.length} series</span>
            <span>{freeMocks.length} free</span>
            <span>{totalQuestions} questions</span>
          </div>
        </header>

        <section className="mock-series-panel">
          <div className="mock-library-head">
            <div>
              <small>Series</small>
              <h2>Available mocks</h2>
            </div>
            <div className="mock-diff-filter">
              {['All', 'Beginner', 'Moderate', 'Advanced'].map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`ep-filter-btn${diffFilter === d ? ' active' : ''}`}
                  onClick={() => setDiffFilter(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="mock-series-grid">
            {visibleMocks.map((mock) => (
              <article className="mock-series-card" key={mock.slug}>
                <div className="mock-series-top">
                  <span>{mock.isFree ? 'Free' : 'Premium'}</span>
                  <small>{mock.difficulty}</small>
                </div>
                <strong>{mock.title}</strong>
                <p>{mock.description}</p>
                <div className="mock-series-meta">
                  <small><FileText size={14} /> {mock.questions} questions</small>
                  <small><Clock3 size={14} /> {mock.durationMinutes} min</small>
                </div>
                <div className="mock-series-tags">
                  {mock.subjects.slice(0, 4).map((s) => <span key={s}>{s}</span>)}
                </div>
                <button className="mock-series-button" type="button" onClick={() => openMock(mock)}>
                  <Play size={15} /> Open mock
                </button>
              </article>
            ))}
          </div>

          {visibleMocks.length === 0 && (
            <p>{diffFilter === 'All' ? 'No mocks published yet.' : `No ${diffFilter} mocks found.`}</p>
          )}
        </section>

        <section className="mock-hub-footnote">
          <Lock size={16} />
          <span>Login is required to start a mock, save attempts, and view performance analytics.</span>
        </section>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
