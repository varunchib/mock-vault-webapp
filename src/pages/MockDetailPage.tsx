import { ChevronRight, Clock3, FileText, Lock, Play } from 'lucide-react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { HaloLoader } from '../components/common/HaloLoader'
import {
  fetchExamCatalog,
  fetchMockCatalog,
  fetchPaperCatalog,
  type Exam,
  type MockItem,
  type Paper,
} from '../lib/api'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { mockListingSeoTitle, mockListingSeoDescription } from '../lib/pageTitles'
import { paperPath, paperSeoOverride } from '../lib/paperSeo'
import { normalizeExamCategory } from './DashboardPage'

export function MockDetailPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()
  const [exam, setExam] = useState<Exam | null>(null)
  const [examMocks, setExamMocks] = useState<MockItem[]>([])
  const [examPapers, setExamPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [diffFilter, setDiffFilter] = useState('All')

  useEffect(() => {
    if (!slug) return
    let cancelled = false

    void Promise.all([fetchExamCatalog(), fetchMockCatalog(), fetchPaperCatalog()])
      .then(([examCatalog, mockCatalog, paperCatalog]) => {
        if (cancelled) return
        const exams = examCatalog ?? []
        const mocks = mockCatalog ?? []
        const papers = paperCatalog ?? []

        const directExam = exams.find((e) => e.slug === slug)
        const matchedMock = mocks.find((m) => m.slug === slug)
        const resolvedExamSlug = directExam?.slug ?? matchedMock?.examSlug

        if (!resolvedExamSlug) { setError(true); return }

        const resolvedExam = exams.find((e) => e.slug === resolvedExamSlug) ?? null
        if (!resolvedExam) { setError(true); return }

        setExam(resolvedExam)
        setExamMocks(mocks.filter((m) => m.examSlug === resolvedExamSlug))
        setExamPapers(papers.filter((p) => p.examSlug === resolvedExamSlug))
      })
      .catch(() => { if (!cancelled) setError(true) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [slug])

  const freeMocks = examMocks.filter((m) => m.isFree)
  const totalQuestions = examMocks.reduce((sum, m) => sum + m.questions, 0)
  const visibleMocks = diffFilter === 'All' ? examMocks : examMocks.filter((m) => m.difficulty === diffFilter)
  const homeHref = isAuthenticated ? '/dashboard' : '/'

  const seoTitle = exam
    ? mockListingSeoTitle({ shortName: exam.shortName })
    : 'Mock Tests | Ministry of Papers'
  const seoDesc = exam
    ? mockListingSeoDescription({ shortName: exam.shortName, totalMocks: examMocks.length, freeMocks: freeMocks.length })
    : 'Open mock test libraries by exam.'

  const faqItems = exam ? [
    {
      q: `How many questions are in the ${exam.shortName} mock test?`,
      a: examMocks.length > 0
        ? `Each ${exam.shortName} mock test contains ${examMocks[0].questions} questions mirroring the real exam pattern. Duration is ${examMocks[0].durationMinutes} minutes.`
        : `${exam.shortName} mock tests are designed to mirror the official exam pattern with the same number of questions and duration.`,
    },
    {
      q: `Are ${exam.shortName} mock tests free?`,
      a: freeMocks.length > 0
        ? `Yes — ${freeMocks.length} out of ${examMocks.length || 'all'} mock test${examMocks.length !== 1 ? 's' : ''} on Ministry of Papers are completely free. Log in with Google to start.`
        : `Yes, ${exam.shortName} mock tests on Ministry of Papers are free to attempt. Simply log in with Google to start.`,
    },
    {
      q: `What subjects are covered in the ${exam.shortName} mock test?`,
      a: exam.subjects.length > 0
        ? `${exam.shortName} mock tests cover ${exam.subjects.slice(0, -1).join(', ')}${exam.subjects.length > 1 ? ` and ${exam.subjects[exam.subjects.length - 1]}` : exam.subjects[0]} — the same subjects tested in the actual exam.`
        : `${exam.shortName} mock tests cover all subjects as per the official syllabus.`,
    },
    {
      q: `How is the ${exam.shortName} mock test scored?`,
      a: `After submitting, you instantly see your score, accuracy %, subject-wise breakdown, and a comparison against ${exam.shortName} cutoff marks. Wrong answers carry the same negative marking as the real exam.`,
    },
  ] : []

  usePageMeta({
    title: seoTitle,
    description: seoDesc,
    canonicalPath: exam ? `/mock-test/${exam.slug}` : '/mock-test',
    jsonLd: exam
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: seoTitle.replace(' | Ministry of Papers', ''),
            description: seoDesc,
            numberOfItems: examMocks.length,
            itemListElement: freeMocks.slice(0, 5).map((mock, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: mock.title,
              description: mock.description,
            })),
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
                { '@type': 'ListItem', position: 2, name: exam.shortName, item: `https://ministryofpapers.com/exam/${exam.slug}` },
                { '@type': 'ListItem', position: 3, name: 'Mock Tests', item: `https://ministryofpapers.com/mock-test/${exam.slug}` },
              ],
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
        ]
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

  if (error || !exam) return <Navigate to="/exams" replace />

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
          <Link to="/exams">Exams</Link>
          <ChevronRight size={13} />
          <span>{exam.shortName}</span>
        </nav>

        <header className="mock-hub-header">
          <div>
            <small>{normalizeExamCategory(exam.category)} library</small>
            <h1>Free {exam.shortName} Mock Tests {new Date().getFullYear()} — Full-Length Practice Online</h1>
            <p>{exam.description}</p>
          </div>
          <div className="mock-hub-metrics">
            <span>{examMocks.length} series</span>
            <span>{freeMocks.length} free</span>
            <span>{totalQuestions} questions</span>
          </div>
        </header>

        {/* SEO content block */}
        <section className="mock-hub-about">
          <p>
            Practice for <strong>{exam.name}</strong> with full-length mock tests designed to match
            the real exam pattern. Each mock is timed, auto-scored, and includes a subject-wise
            performance breakdown so you know exactly where to improve.
            {exam.subjects.length > 0 && (
              <> Subjects covered: <strong>{exam.subjects.join(', ')}</strong>.</>
            )}
          </p>
          {examPapers.length > 0 && (
            <p>
              Also explore{' '}
              {examPapers.slice(0, 3).map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && ', '}
                  <Link to={paperPath(p.slug)}>{paperSeoOverride(p.slug)?.title ?? p.title}</Link>
                </span>
              ))}
              {examPapers.length > 3
                ? <> and <Link to={`/exam/${exam.slug}`}>{examPapers.length - 3} more previous year papers</Link>.</>
                : <> — <Link to={`/exam/${exam.slug}`}>all {exam.shortName} papers</Link>.</>
              }
            </p>
          )}
        </section>

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
                  <Play size={15} /> Start mock
                </button>
              </article>
            ))}
          </div>

          {visibleMocks.length === 0 && (
            <p>{diffFilter === 'All' ? 'No mocks published yet.' : `No ${diffFilter} mocks found.`}</p>
          )}
        </section>

        {/* FAQ section — also emits FAQPage JSON-LD for rich results */}
        {faqItems.length > 0 && (
          <section className="mock-hub-faq">
            <h2>Frequently asked questions</h2>
            <dl>
              {faqItems.map(({ q, a }) => (
                <div key={q} className="mock-faq-item">
                  <dt>{q}</dt>
                  <dd>{a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section className="mock-hub-footnote">
          <Lock size={16} />
          <span>Login is required to start a mock, save attempts, and view performance analytics.</span>
        </section>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
