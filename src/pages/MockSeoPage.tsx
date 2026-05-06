import { Clock3, FileText, Lock, Play, Search } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
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

type ExamCategoryGroup = {
  label: string
  exams: Exam[]
}

const categoryOrder = [
  'Central',
  'Banking',
  'State',
  'Railways',
  'Teaching',
  'Medical',
  'Engineering',
]

function normalizeExamCategory(category: string) {
  const normalized = category.trim().toLowerCase()

  if (normalized.includes('bank')) return 'Banking'
  if (normalized.includes('state')) return 'State'
  if (normalized.includes('rail')) return 'Railways'
  if (normalized.includes('teach')) return 'Teaching'
  if (normalized.includes('medical') || normalized.includes('neet')) return 'Medical'
  if (normalized.includes('engineering') || normalized.includes('jee')) return 'Engineering'
  if (
    normalized.includes('central') ||
    normalized.includes('ssc') ||
    normalized.includes('upsc') ||
    normalized.includes('defence') ||
    normalized.includes('defense')
  ) {
    return 'Central'
  }

  return category
}

function groupExamsByCategory(exams: Exam[]): ExamCategoryGroup[] {
  const grouped = new Map<string, Exam[]>()

  exams.forEach((exam) => {
    const label = normalizeExamCategory(exam.category)
    const current = grouped.get(label) ?? []
    current.push(exam)
    grouped.set(label, current)
  })

  return [...grouped.entries()]
    .map(([label, items]) => ({
      label,
      exams: items.sort((left, right) => left.shortName.localeCompare(right.shortName)),
    }))
    .sort((left, right) => {
      const leftRank = categoryOrder.indexOf(left.label)
      const rightRank = categoryOrder.indexOf(right.label)

      if (leftRank === -1 && rightRank === -1) return left.label.localeCompare(right.label)
      if (leftRank === -1) return 1
      if (rightRank === -1) return -1
      return leftRank - rightRank
    })
}

type MockSeriesStats = {
  count: number
  freeCount: number
  totalQuestions: number
}

function buildMockStats(mocks: MockItem[]) {
  const stats = new Map<string, MockSeriesStats>()

  mocks.forEach((mock) => {
    const current = stats.get(mock.examSlug) ?? {
      count: 0,
      freeCount: 0,
      totalQuestions: 0,
    }

    current.count += 1
    current.totalQuestions += mock.questions
    if (mock.isFree) current.freeCount += 1

    stats.set(mock.examSlug, current)
  })

  return stats
}

export function MockTestsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [mocks, setMocks] = useState<MockItem[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  usePageMeta({
    title: 'Mock Test Library | PYQVault',
    description: 'Browse mock test series by exam family and open the full mock library for each exam.',
    canonicalPath: '/mock-test',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Competitive exam mock test library',
      description: 'Grouped mock test catalog for Indian competitive exams.',
    },
  })

  useEffect(() => {
    let cancelled = false

    void Promise.all([fetchExamCatalog(), fetchMockCatalog()])
      .then(([examCatalog, mockCatalog]) => {
        if (cancelled) return
        setExams(examCatalog)
        setMocks(mockCatalog)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const mockStats = useMemo(() => buildMockStats(mocks), [mocks])
  const filteredExams = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    return exams.filter((exam) => {
      if (!mockStats.has(exam.slug)) return false
      if (!normalized) return true

      return [
        exam.name,
        exam.shortName,
        exam.category,
        exam.description,
        ...exam.subjects,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    })
  }, [exams, mockStats, query])
  const groupedExams = useMemo(() => groupExamsByCategory(filteredExams), [filteredExams])

  return (
    <section className="public-page mock-catalog-page">
      <div className="public-shell">
        <header className="utility-page-hero">
          <small>Mock Library</small>
          <h1>Choose an exam and open its full mock test library</h1>
          <p>Categories are grouped by exam family so users can move straight to the relevant mock series.</p>
        </header>

        <section className="mock-library-search">
          <label>
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search exam, subject, or category..."
            />
          </label>
        </section>

        {loading ? (
          <HaloLoader label="Loading mock tests" />
        ) : error ? (
          <p>Unable to load mock tests right now.</p>
        ) : groupedExams.length === 0 ? (
          <p>No mock test categories matched your search.</p>
        ) : (
          groupedExams.map((group) => (
            <section className="mock-library-section" key={group.label}>
              <div className="mock-library-head">
                <div>
                  <small>Category</small>
                  <h2>{group.label}</h2>
                </div>
              </div>

              <div className="mock-library-grid">
                {group.exams.map((exam) => {
                  const stats = mockStats.get(exam.slug)
                  if (!stats) return null

                  return (
                    <Link className="mock-library-card" to={`/mock-test/${exam.slug}`} key={exam.slug}>
                      <div className="mock-library-card-top">
                        <span>{exam.icon}</span>
                        <small>{group.label}</small>
                      </div>
                      <strong>{exam.shortName}</strong>
                      <p>{exam.name}</p>
                      <div className="mock-library-metrics">
                        <span>{stats.count} series</span>
                        <span>{stats.freeCount} free</span>
                        <span>{stats.totalQuestions} Qs</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          ))
        )}
      </div>
    </section>
  )
}

export function MockDetailPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()
  const [exam, setExam] = useState<Exam | null>(null)
  const [examMocks, setExamMocks] = useState<MockItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    if (!slug) return

    let cancelled = false

    void Promise.all([fetchExamCatalog(), fetchMockCatalog()])
      .then(([examCatalog, mockCatalog]) => {
        if (cancelled) return

        const directExam = examCatalog.find((item) => item.slug === slug)
        const matchedMock = mockCatalog.find((item) => item.slug === slug)
        const resolvedExamSlug = directExam?.slug ?? matchedMock?.examSlug

        if (!resolvedExamSlug) {
          setError(true)
          return
        }

        const resolvedExam = examCatalog.find((item) => item.slug === resolvedExamSlug) ?? null

        if (!resolvedExam) {
          setError(true)
          return
        }

        setExam(resolvedExam)
        setExamMocks(mockCatalog.filter((item) => item.examSlug === resolvedExamSlug))
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  const freeMocks = examMocks.filter((mock) => mock.isFree)
  const totalQuestions = examMocks.reduce((sum, mock) => sum + mock.questions, 0)
  const homeHref = isAuthenticated ? '/dashboard' : '/'

  usePageMeta({
    title: exam ? `${exam.shortName} Mock Tests | PYQVault` : 'Mock Tests | PYQVault',
    description: exam
      ? `Open the full ${exam.shortName} mock test library with free and premium practice series.`
      : 'Open mock test libraries by exam.',
    canonicalPath: exam ? `/mock-test/${exam.slug}` : '/mock-test',
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

  if (error || !exam) return <Navigate to="/mock-test" replace />

  const openMock = () => {
    if (!isAuthenticated) {
      setLoginOpen(true)
      return
    }

    navigate('/dashboard')
  }

  return (
    <section className="public-page mock-hub-page">
      <div className="public-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to={homeHref}>Home</Link>
          <span>/</span>
          <Link to="/mock-test">Mock Tests</Link>
          <span>/</span>
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
          </div>

          <div className="mock-series-grid">
            {examMocks.map((mock) => (
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
                  {mock.subjects.slice(0, 4).map((subject) => (
                    <span key={subject}>{subject}</span>
                  ))}
                </div>
                <button className="mock-series-button" type="button" onClick={openMock}>
                  <Play size={15} /> Open mock
                </button>
              </article>
            ))}
          </div>

          {examMocks.length === 0 ? <p>No mocks have been published for this exam yet.</p> : null}
        </section>

        <section className="mock-hub-footnote">
          <Lock size={16} />
          <span>Login is required for starting a mock, saving attempts, and viewing performance analytics.</span>
        </section>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
