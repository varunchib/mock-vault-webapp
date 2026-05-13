import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  FileText,
  Lock,
  Search,
  Timer,
  X,
} from 'lucide-react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { HaloLoader } from '../components/common/HaloLoader'
import {
  fetchExamBySlug,
  fetchExamCatalog,
  fetchExamPapers,
  fetchExamQuestions,
  fetchMockCatalog,
  recordEnrollment,
  type Exam,
  type MockItem,
  type Paper,
  type Question,
} from '../lib/api'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import {
  categoryIcons,
  categoryFullLabels,
  categoryOrder,
  normalizeExamCategory,
} from './DashboardPage'

type Tab = 'papers' | 'mocks' | 'subjects'

const FREE_QUESTION_LIMIT = 10

const difficultyMap: Record<string, { cls: string }> = {
  Beginner: { cls: 'diff-beginner' },
  Moderate: { cls: 'diff-moderate' },
  Advanced: { cls: 'diff-advanced' },
}

export function ExamPage() {
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()

  const [exam, setExam] = useState<Exam | null>(null)
  const [papers, setPapers] = useState<Paper[]>([])
  const [allMocks, setAllMocks] = useState<MockItem[]>([])
  const [examQuestions, setExamQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('papers')
  const [paperSearch, setPaperSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState('All')
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)
    setPaperSearch('')
    setSelectedSubject(null)

    Promise.all([
      fetchExamBySlug(slug),
      fetchExamPapers(slug),
      fetchMockCatalog(),
      fetchExamQuestions(slug),
    ])
      .then(([examData, paperData, mockData, questionData]) => {
        setExam(examData)
        setPapers(paperData)
        setAllMocks(mockData)
        setExamQuestions(questionData)
        if (isAuthenticated) {
          void recordEnrollment(examData.slug).catch(() => undefined)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  const examMocks = useMemo(
    () => allMocks.filter((m) => m.examSlug === slug),
    [allMocks, slug],
  )

  const filteredMocks = useMemo(
    () => (diffFilter === 'All' ? examMocks : examMocks.filter((m) => m.difficulty === diffFilter)),
    [examMocks, diffFilter],
  )

  const filteredPapers = useMemo(() => {
    const q = paperSearch.trim().toLowerCase()
    if (!q) return papers
    return papers.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.year.includes(q) ||
        p.shift.toLowerCase().includes(q) ||
        p.subjects.some((s) => s.toLowerCase().includes(q)),
    )
  }, [papers, paperSearch])

  const papersByYear = useMemo(() => {
    const map = new Map<string, Paper[]>()
    filteredPapers.forEach((p) => {
      const yr = p.year || 'Other'
      map.set(yr, [...(map.get(yr) ?? []), p])
    })
    return [...map.entries()].sort(([a], [b]) => b.localeCompare(a))
  }, [filteredPapers])

  const subjectQuestions = useMemo(() => {
    if (!selectedSubject) return []
    return examQuestions.filter(
      (q) => q.subject.toLowerCase() === selectedSubject.toLowerCase(),
    )
  }, [examQuestions, selectedSubject])

  const visibleSubjectQuestions = isAuthenticated
    ? subjectQuestions
    : subjectQuestions.slice(0, FREE_QUESTION_LIMIT)

  const isGated = !isAuthenticated && subjectQuestions.length > FREE_QUESTION_LIMIT

  const title = exam
    ? `${exam.shortName} — Mock Tests & PYQ Papers | PYQVault`
    : 'Exam Hub | PYQVault'

  usePageMeta({
    title,
    description: exam?.description ?? 'Browse solved papers, mock tests, and subjects.',
    canonicalPath: exam ? `/exam/${exam.slug}` : '/exam',
    jsonLd: exam
      ? {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: title,
          description: exam.description,
          about: exam.name,
        }
      : undefined,
  })

  if (!slug) return <Navigate to="/" replace />

  if (loading) {
    const loader = <HaloLoader label="Loading exam" />
    return isAuthenticated ? loader : (
      <section className="public-page"><div className="public-shell">{loader}</div></section>
    )
  }

  if (error || !exam) return <Navigate to="/" replace />

  const homeHref = isAuthenticated ? '/dashboard' : '/'

  const hub = (
    <div className="ep-page">
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link to={homeHref}>{isAuthenticated ? 'Dashboard' : 'Home'}</Link>
        <ChevronRight size={13} />
        <span>{exam.shortName}</span>
      </nav>

      <header className="ep-header">
        <div className="ep-header-left">
          <div className="ep-icon">{exam.icon}</div>
          <div>
            <span className="ep-category-tag">{normalizeExamCategory(exam.category)}</span>
            <h1>{exam.name}</h1>
            <p className="ep-desc">{exam.description}</p>
          </div>
        </div>
      </header>

      <nav className="ep-tabs" aria-label="Exam sections">
        <button
          className={`ep-tab${activeTab === 'papers' ? ' active' : ''}`}
          type="button"
          onClick={() => { setActiveTab('papers'); setSelectedSubject(null) }}
        >
          <FileText size={15} />
          PYQ Papers
          {papers.length > 0 && <span className="ep-tab-count">{papers.length}</span>}
        </button>
        <button
          className={`ep-tab${activeTab === 'mocks' ? ' active' : ''}`}
          type="button"
          onClick={() => { setActiveTab('mocks'); setSelectedSubject(null) }}
        >
          <ClipboardList size={15} />
          Mock Tests
          {examMocks.length > 0 && <span className="ep-tab-count">{examMocks.length}</span>}
        </button>
        <button
          className={`ep-tab${activeTab === 'subjects' ? ' active' : ''}`}
          type="button"
          onClick={() => { setActiveTab('subjects'); setSelectedSubject(null) }}
        >
          <BookOpen size={15} />
          Subjects
        </button>
      </nav>

      {/* ── Papers tab ──────────────────────────────────── */}
      {activeTab === 'papers' && (
        <div className="ep-tab-body">
          <label className="ep-search-bar">
            <Search size={15} />
            <input
              value={paperSearch}
              onChange={(e) => setPaperSearch(e.target.value)}
              placeholder="Search papers by title, year, subject…"
            />
            {paperSearch && (
              <button type="button" onClick={() => setPaperSearch('')} aria-label="Clear">
                <X size={14} />
              </button>
            )}
          </label>

          {filteredPapers.length === 0 ? (
            <p className="ep-empty">
              {paperSearch ? 'No papers matched your search.' : 'No papers available yet.'}
            </p>
          ) : (
            <div className="ep-papers-list">
              {papersByYear.map(([year, yearPapers]) => (
                <div className="ep-year-group" key={year}>
                  <div className="ep-year-label">{year}</div>
                  <div className="ep-paper-grid">
                    {yearPapers.map((paper) => (
                      <Link className="ep-paper-card" to={`/pyq/${paper.slug}`} key={paper.slug}>
                        <div className="ep-paper-card-main">
                          <strong>{paper.title}</strong>
                          {paper.shift ? <small>{paper.shift}</small> : null}
                          <div className="ep-paper-tags">
                            {paper.subjects.slice(0, 4).map((s) => (
                              <span key={s}>{s}</span>
                            ))}
                          </div>
                        </div>
                        <div className="ep-paper-card-right">
                          <span className="ep-q-count">{paper.questions} Qs</span>
                          <span className="ep-attempt-btn">
                            Attempt <ChevronRight size={12} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Mocks tab ──────────────────────────────────── */}
      {activeTab === 'mocks' && (
        <div className="ep-tab-body">
          <div className="ep-filter-bar">
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
          {filteredMocks.length === 0 ? (
            <p className="ep-empty">
              {diffFilter === 'All' ? 'No mock tests available yet.' : `No ${diffFilter} mocks found.`}
            </p>
          ) : (
            <div className="ep-mock-grid">
              {filteredMocks.map((mock) => (
                <div className="ep-mock-card" key={mock.slug}>
                  <div className="ep-mock-badges">
                    <span className={`ep-diff-badge ${difficultyMap[mock.difficulty]?.cls ?? ''}`}>
                      {mock.difficulty}
                    </span>
                    {mock.isFree && <span className="ep-free-badge">Free</span>}
                  </div>
                  <strong className="ep-mock-title">{mock.title}</strong>
                  <p className="ep-mock-desc">{mock.description}</p>
                  <div className="ep-mock-meta">
                    <span><Timer size={12} /> {mock.durationMinutes} min</span>
                    <span><ClipboardList size={12} /> {mock.questions} Qs</span>
                  </div>
                  <div className="ep-mock-footer">
                    {isAuthenticated ? (
                      <Link className="ep-start-btn" to={`/mock-attempt/${mock.slug}`}>
                        Start Mock
                      </Link>
                    ) : (
                      <button
                        className="ep-start-btn"
                        type="button"
                        onClick={() => setLoginOpen(true)}
                      >
                        Login to Start
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Subjects tab ──────────────────────────────── */}
      {activeTab === 'subjects' && !selectedSubject && (
        <div className="ep-tab-body">
          <p className="ep-subjects-hint">Click a subject to browse its questions.</p>
          <div className="ep-subject-grid">
            {exam.subjects.map((subject) => {
              const count = examQuestions.filter(
                (q) => q.subject.toLowerCase() === subject.toLowerCase(),
              ).length
              return (
                <button
                  className="ep-subject-card"
                  key={subject}
                  type="button"
                  onClick={() => setSelectedSubject(subject)}
                >
                  <BookOpen size={15} />
                  <span>{subject}</span>
                  {count > 0 && <span className="ep-subject-count">{count} Qs</span>}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Subject questions drill-down ──────────────── */}
      {activeTab === 'subjects' && selectedSubject && (
        <div className="ep-tab-body">
          <div className="ep-subject-drill-head">
            <button
              className="ep-back-btn"
              type="button"
              onClick={() => setSelectedSubject(null)}
            >
              <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
              All Subjects
            </button>
            <h2>{selectedSubject}</h2>
            <span>{subjectQuestions.length} questions</span>
          </div>

          {subjectQuestions.length === 0 ? (
            <p className="ep-empty">No questions indexed for this subject yet.</p>
          ) : (
            <>
              <div className="ep-question-list">
                {visibleSubjectQuestions.map((q, i) => (
                  <Link className="ep-question-row" to={`/question/${q.slug}`} key={q.slug}>
                    <span className="ep-q-num">Q{i + 1}</span>
                    <div className="ep-q-body">
                      <span>{q.question}</span>
                      <small>{q.paper} · {q.year}</small>
                    </div>
                    <ChevronRight size={14} className="ep-q-arrow" />
                  </Link>
                ))}
              </div>

              {isGated && (
                <div className="ep-gate">
                  <div className="ep-gate-inner">
                    <Lock size={20} />
                    <strong>Sign in to see all {subjectQuestions.length} questions</strong>
                    <p>You've seen {FREE_QUESTION_LIMIT} of {subjectQuestions.length} questions. Login is free.</p>
                    <button
                      className="ep-gate-btn"
                      type="button"
                      onClick={() => setLoginOpen(true)}
                    >
                      Sign in with Google
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )

  return (
    <>
      {isAuthenticated ? hub : (
        <section className="public-page">
          <div className="public-shell">{hub}</div>
        </section>
      )}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}

export function AllExamsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const query = searchParams.get('q') ?? ''

  usePageMeta({
    title: 'All Competitive Exam PYQs and Mock Tests | PYQVault',
    description:
      'Browse UPSC, SSC, JKSSB, NEET, banking, railway, state PSC and other exam PYQs with solved answers and explanations.',
    canonicalPath: '/exam',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Competitive Exam Library — PYQVault',
      description:
        'Browse solved previous year questions and mock tests for 240+ Indian competitive exams including UPSC, SSC, NEET, and more.',
      url: 'https://pyqvault.in/exam',
    },
  })

  useEffect(() => {
    queueMicrotask(() => { setLoading(true); setError(false) })
    fetchExamCatalog()
      .then(setExams)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const setQuery = (q: string) => {
    const next: Record<string, string> = {}
    if (q.trim()) next.q = q
    setSearchParams(next)
  }

  const groupedExams = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const filtered = normalized
      ? exams.filter((e) =>
          [e.name, e.shortName, e.category, e.description, ...e.subjects]
            .join(' ')
            .toLowerCase()
            .includes(normalized),
        )
      : exams

    const grouped = new Map<string, Exam[]>()
    filtered.forEach((exam) => {
      const label = normalizeExamCategory(exam.category)
      grouped.set(label, [...(grouped.get(label) ?? []), exam])
    })

    return [...grouped.entries()]
      .map(([label, items]) => ({
        label,
        exams: items.sort((a, b) => a.shortName.localeCompare(b.shortName)),
      }))
      .sort((a, b) => {
        const aRank = categoryOrder.indexOf(a.label)
        const bRank = categoryOrder.indexOf(b.label)
        if (aRank === -1 && bRank === -1) return a.label.localeCompare(b.label)
        if (aRank === -1) return 1
        if (bRank === -1) return -1
        return aRank - bRank
      })
  }, [exams, query])

  return (
    <section className="public-page">
      <div className="public-shell ae-page">
        <header className="ae-header">
          <div>
            <small>Browse all exams</small>
            <h1>Exam library</h1>
            <p>Find your exam — browse solved PYQs and attempt mock tests.</p>
          </div>
          <label className="ae-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search exam, subject, category…"
              autoComplete="off"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear">
                <X size={13} />
              </button>
            )}
          </label>
        </header>

        {loading ? (
          <HaloLoader label="Loading exams" fullHeight={false} />
        ) : error ? (
          <p className="ae-empty">Unable to load exams. Please try again.</p>
        ) : groupedExams.length === 0 ? (
          <p className="ae-empty">No exams matched your search.</p>
        ) : (
          groupedExams.map((group) => (
            <section className="ae-category-section" key={group.label}>
              <div className="ae-cat-head">
                <div className="ae-cat-head-left">
                  <small>Category</small>
                  <h2>
                    <span>{categoryIcons[group.label.toLowerCase()] ?? '📋'}</span>
                    {categoryFullLabels[group.label.toLowerCase()] ?? group.label}
                  </h2>
                </div>
                <Link
                  className="ae-cat-view-all"
                  to={`/exams/${group.label.toLowerCase()}`}
                >
                  View all →
                </Link>
              </div>

              <div className="ae-exam-row">
                {group.exams.map((exam) => (
                  <Link className="ae-exam-card" to={`/exam/${exam.slug}`} key={exam.slug}>
                    <span className="ae-exam-icon">{exam.icon}</span>
                    <strong className="ae-exam-name">{exam.shortName}</strong>
                    <p className="ae-exam-full">{exam.name}</p>
                    <div className="ae-exam-meta">
                      {parseInt(exam.papers) > 0 && <span>{exam.papers} PYQs</span>}
                      {parseInt(exam.mocks) > 0 && <span>{exam.mocks} Mocks</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </section>
  )
}
