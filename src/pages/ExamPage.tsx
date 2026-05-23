import {
  BarChart3,
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
  fetchEnrolledSlugs,
  fetchExamBySlug,
  fetchExamPapers,
  fetchExamQuestions,
  fetchMockCatalog,
  recordEnrollment,
  recordUnenrollment,
  type Exam,
  type MockItem,
  type Paper,
  type Question,
} from '../lib/api'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { recordExamView } from '../lib/examActivity'
import { normalizeExamCategory } from './DashboardPage'
import { readAllResults } from '../lib/mockActivity'
import { QuestionRenderer } from '../components/common/QuestionRenderer'

type Tab = 'papers' | 'mocks' | 'subjects'

const FREE_QUESTION_LIMIT = 10
const PAGE_SIZE = 15

function SubjectMCQ({ q, idx, onTagClick }: { q: Question; idx: number; onTagClick: (tag: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const answered = selected !== null

  function pick(key: string) {
    if (answered) return
    setSelected(key)
  }

  return (
    <div className="sq-card">
      <div className="sq-card-head">
        <span className="sq-q-num">Q{idx + 1}</span>
        {q.tags[0] && (
          <button type="button" className="sq-tag sq-tag-btn" onClick={() => onTagClick(q.tags[0])}>
            {q.tags[0]}
          </button>
        )}
        <span className="sq-source">{q.paper}{q.year ? ` · ${q.year}` : ' · PYQ'}</span>
      </div>
      <QuestionRenderer className="sq-question" text={q.question} />
      <div className="sq-options">
        {q.options.map((opt) => {
          const isCorrect = opt.key === q.answerKey
          const isSelected = opt.key === selected
          let cls = 'sq-option'
          if (answered) {
            if (isCorrect) cls += ' correct'
            else if (isSelected) cls += ' wrong'
          }
          return (
            <button
              key={opt.key}
              type="button"
              className={cls}
              onClick={() => pick(opt.key)}
              disabled={answered}
            >
              <span className="sq-opt-key">{opt.key}</span>
              <span className="sq-opt-text">{opt.text}</span>
            </button>
          )
        })}
      </div>
      {answered && q.explanation && (
        <p className="sq-explanation">{q.explanation}</p>
      )}
    </div>
  )
}

export function ExamPage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const { isAuthenticated } = useAuth()

  const initialTab = (searchParams.get('tab') as Tab | null) ?? 'papers'
  const initialSubject = searchParams.get('subject')

  const [exam, setExam] = useState<Exam | null>(null)
  const [papers, setPapers] = useState<Paper[]>([])
  const [allMocks, setAllMocks] = useState<MockItem[]>([])
  const [examQuestions, setExamQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)
  const [paperSearch, setPaperSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState('All')
  const [selectedSubject, setSelectedSubject] = useState<string | null>(initialSubject)
  const [topicFilter, setTopicFilter] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loginOpen, setLoginOpen] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrollBusy, setEnrollBusy] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)
    setPaperSearch('')
    setDiffFilter('All')

    const tabFromUrl = (searchParams.get('tab') as Tab | null) ?? 'papers'
    const subjectFromUrl = searchParams.get('subject')
    setActiveTab(tabFromUrl)
    setSelectedSubject(subjectFromUrl)
    setTopicFilter(null)

    Promise.all([
      fetchExamBySlug(slug),
      fetchExamPapers(slug),
      fetchMockCatalog(),
      fetchExamQuestions(slug),
      isAuthenticated ? fetchEnrolledSlugs().catch(() => null) : Promise.resolve(null),
    ])
      .then(([examData, paperData, mockData, questionData, enrollData]) => {
        setExam(examData)
        setPapers(paperData ?? [])
        setAllMocks(mockData ?? [])
        setExamQuestions(questionData ?? [])
        if (enrollData) setIsEnrolled(enrollData.slugs.includes(examData.slug))
        recordExamView(examData)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug, isAuthenticated, retryCount, searchParams])

  const handleEnrollToggle = async () => {
    if (!slug) return
    setEnrollBusy(true)
    try {
      if (isEnrolled) {
        await recordUnenrollment(slug)
        setIsEnrolled(false)
      } else {
        await recordEnrollment(slug)
        setIsEnrolled(true)
      }
    } catch { /* silent */ }
    finally { setEnrollBusy(false) }
  }

  const examMocks = useMemo(() => allMocks.filter((m) => m.examSlug === slug), [allMocks, slug])
  const hasAnalytics = useMemo(
    () => isAuthenticated && !!slug && readAllResults(slug).length > 0,
    [isAuthenticated, slug],
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

  // Only PYQ paper questions belong in the subject bank — exclude mock questions
  const paperQuestions = useMemo(
    () => examQuestions.filter((q) => q.paperSlug),
    [examQuestions],
  )

  // Subjects derived from PYQ paper questions only
  const computedSubjects = useMemo(() => {
    const map = new Map<string, number>()
    paperQuestions.forEach((q) => {
      if (q.subject) map.set(q.subject, (map.get(q.subject) ?? 0) + 1)
    })
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [paperQuestions])

  const subjectQuestions = useMemo(() => {
    setVisibleCount(PAGE_SIZE)
    if (!selectedSubject) return []
    return paperQuestions.filter((q) => q.subject.toLowerCase() === selectedSubject.toLowerCase())
  }, [paperQuestions, selectedSubject])

  // Sub-topics available for the selected subject (from tags)
  const availableTopics = useMemo(() => {
    const set = new Set<string>()
    subjectQuestions.forEach((q) => q.tags.forEach((t) => set.add(t)))
    return [...set].sort()
  }, [subjectQuestions])

  const filteredSubjectQuestions = useMemo(() => {
    setVisibleCount(PAGE_SIZE)
    if (!topicFilter) return subjectQuestions
    return subjectQuestions.filter((q) => q.tags.includes(topicFilter))
  }, [subjectQuestions, topicFilter])

  const gatedQuestions = isAuthenticated
    ? filteredSubjectQuestions
    : filteredSubjectQuestions.slice(0, FREE_QUESTION_LIMIT)

  const visibleSubjectQuestions = gatedQuestions.slice(0, visibleCount)
  const hasMore = visibleCount < gatedQuestions.length
  const isGated = !isAuthenticated && filteredSubjectQuestions.length > FREE_QUESTION_LIMIT

  const title = exam ? `${exam.shortName} — Mock Tests & PYQ Papers | Ministry of Papers` : 'Exam Hub | Ministry of Papers'

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
          url: `https://ministryofpapers.com/exam/${exam.slug}`,
          about: { '@type': 'Thing', name: exam.name },
          publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
              { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://ministryofpapers.com/exams' },
              { '@type': 'ListItem', position: 3, name: exam.shortName, item: `https://ministryofpapers.com/exam/${exam.slug}` },
            ],
          },
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

  if (error || !exam) {
    const errorContent = (
      <div className="ep-page">
        <div className="ec-error">
          <strong>Unable to load exam</strong>
          <p>Could not reach the server. Check your connection and try again.</p>
          <button type="button" onClick={() => setRetryCount((c) => c + 1)}>Retry</button>
        </div>
      </div>
    )
    return isAuthenticated ? errorContent : (
      <section className="public-page"><div className="public-shell">{errorContent}</div></section>
    )
  }

  const homeHref = isAuthenticated ? '/exams' : '/'
  const totalQuestions = parseInt(exam.totalQuestions) || examQuestions.length

  const hub = (
    <div className="ep-page">

      {/* ── Breadcrumb ─────────────────────────────── */}
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link to={homeHref}>{isAuthenticated ? 'Exams' : 'Home'}</Link>
        <ChevronRight size={13} />
        <span>{exam.shortName}</span>
      </nav>

      {/* ── Hero header ────────────────────────────── */}
      <header className="ep-hero">
        <div className="ep-hero-left">
          <div className="ep-hero-icon">{exam.icon}</div>
          <div className="ep-hero-info">
            <span className="ep-category-tag">{normalizeExamCategory(exam.category)}</span>
            <h1>{exam.name}</h1>
            <p className="ep-desc">{exam.description}</p>

            {/* Stats row */}
            <div className="ep-stats-row">
              {parseInt(exam.papers) > 0 && (
                <span className="ep-stat-chip">
                  <FileText size={12} />
                  {exam.papers} Papers
                </span>
              )}
              {examMocks.length > 0 && (
                <span className="ep-stat-chip">
                  <ClipboardList size={12} />
                  {examMocks.length} Mocks
                </span>
              )}
              {totalQuestions > 0 && (
                <span className="ep-stat-chip">
                  <BookOpen size={12} />
                  {totalQuestions} Questions
                </span>
              )}
              {exam.subjects.length > 0 && (
                <span className="ep-stat-chip">
                  {exam.subjects.length} Subjects
                </span>
              )}
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <div className="ep-hero-actions">
            {hasAnalytics && (
              <Link to={`/analytics/${slug}`} className="ep-analytics-btn">
                <BarChart3 size={13} /> Your Analytics
              </Link>
            )}
            <button
              className={`ep-enroll-btn${isEnrolled ? ' enrolled' : ''}`}
              type="button"
              disabled={enrollBusy}
              onClick={() => void handleEnrollToggle()}
            >
              {enrollBusy ? '…' : isEnrolled ? '✓ Enrolled' : '+ Enroll'}
            </button>
          </div>
        )}
      </header>

      {/* ── Tab bar ────────────────────────────────── */}
      <div className="ep-tab-bar">
        <button
          className={`ep-tab${activeTab === 'papers' ? ' active' : ''}`}
          type="button"
          onClick={() => { setActiveTab('papers'); setSelectedSubject(null) }}
        >
          <FileText size={14} />
          PYQ Papers
          {papers.length > 0 && <span className="ep-tab-count">{papers.length}</span>}
        </button>
        <button
          className={`ep-tab${activeTab === 'mocks' ? ' active' : ''}`}
          type="button"
          onClick={() => { setActiveTab('mocks'); setSelectedSubject(null) }}
        >
          <ClipboardList size={14} />
          Mock Tests
          {examMocks.length > 0 && <span className="ep-tab-count">{examMocks.length}</span>}
        </button>
        <button
          className={`ep-tab${activeTab === 'subjects' ? ' active' : ''}`}
          type="button"
          onClick={() => { setActiveTab('subjects'); setSelectedSubject(null); setTopicFilter(null) }}
        >
          <BookOpen size={14} />
          Subjects
          {computedSubjects.length > 0 && <span className="ep-tab-count">{computedSubjects.length}</span>}
        </button>
      </div>

      {/* ── PYQ Papers ─────────────────────────────── */}
      {activeTab === 'papers' && (
        <div className="ep-tab-body">
          <label className="ep-search-bar">
            <Search size={14} />
            <input
              value={paperSearch}
              onChange={(e) => setPaperSearch(e.target.value)}
              placeholder="Search by title, year, shift, subject…"
            />
            {paperSearch && (
              <button type="button" onClick={() => setPaperSearch('')} aria-label="Clear">
                <X size={13} />
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
                      <div className="ep-paper-card" key={paper.slug}>
                        <Link className="ep-paper-card-inner" to={`/pyq/${paper.slug}`}>
                          <div className="ep-paper-card-main">
                            <strong>{paper.title}</strong>
                            <div className="ep-paper-meta">
                              {paper.shift && <small>{paper.shift}</small>}
                              {paper.heldOn && <small className="ep-paper-date">{new Date(paper.heldOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small>}
                            </div>
                          </div>
                          <div className="ep-paper-card-right">
                            <span className="ep-q-count">{paper.questions} Qs</span>
                            <span className="ep-attempt-btn">Open <ChevronRight size={12} /></span>
                          </div>
                        </Link>
                        {paper.subjects.length > 0 && (
                          <div className="ep-paper-tags">
                            {paper.subjects.slice(0, 4).map((s) => (
                              <button
                                key={s}
                                type="button"
                                className="ep-paper-tag-btn"
                                onClick={() => {
                                  setActiveTab('subjects')
                                  setSelectedSubject(s)
                                  setTopicFilter(null)
                                }}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Mock Tests ─────────────────────────────── */}
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
                <div className={`ep-mock-card ep-mock-${mock.difficulty.toLowerCase()}`} key={mock.slug}>
                  <div className="ep-mock-badges">
                    <span className={`ep-diff-badge diff-${mock.difficulty.toLowerCase()}`}>
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
                      <button className="ep-start-btn" type="button" onClick={() => setLoginOpen(true)}>
                        Login to Start
                      </button>
                    )}
                    <Link className="ep-preview-btn" to={`/mock-test/${mock.slug}`}>
                      Preview
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Subjects grid ──────────────────────────── */}
      {activeTab === 'subjects' && !selectedSubject && (
        <div className="ep-tab-body">
          {computedSubjects.length === 0 ? (
            <p className="ep-empty">No questions indexed for this exam yet.</p>
          ) : (
            <>
              <p className="ep-subjects-hint">Select a subject to browse its questions.</p>
              <div className="ep-subject-grid">
                {computedSubjects.map(([subject, count]) => (
                  <button
                    className="ep-subject-card"
                    key={subject}
                    type="button"
                    onClick={() => { setSelectedSubject(subject); setTopicFilter(null) }}
                  >
                    <BookOpen size={15} />
                    <span>{subject}</span>
                    <span className="ep-subject-count">{count} Qs</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Subject drill-down ─────────────────────── */}
      {activeTab === 'subjects' && selectedSubject && (
        <div className="ep-tab-body">
          <div className="ep-subject-drill-head">
            <button className="ep-back-btn" type="button" onClick={() => { setSelectedSubject(null); setTopicFilter(null) }}>
              <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} />
              All Subjects
            </button>
            <h2>{selectedSubject}</h2>
            <span>{filteredSubjectQuestions.length}{topicFilter ? ` of ${subjectQuestions.length}` : ''} questions</span>
          </div>

          {/* Sub-topic filter chips */}
          {availableTopics.length > 0 && (
            <div className="ep-topic-chips">
              <button
                className={`ep-topic-chip${!topicFilter ? ' active' : ''}`}
                type="button"
                onClick={() => setTopicFilter(null)}
              >
                All
              </button>
              {availableTopics.map((t) => (
                <button
                  key={t}
                  className={`ep-topic-chip${topicFilter === t ? ' active' : ''}`}
                  type="button"
                  onClick={() => setTopicFilter(topicFilter === t ? null : t)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {filteredSubjectQuestions.length === 0 ? (
            <p className="ep-empty">No questions indexed for this subject yet.</p>
          ) : (
            <>
              <div className="sq-list">
                {visibleSubjectQuestions.map((q, i) => (
                  <SubjectMCQ key={q.slug} q={q} idx={i} onTagClick={setTopicFilter} />
                ))}
              </div>

              {isGated && (
                <div className="ep-gate">
                  <div className="ep-gate-inner">
                    <Lock size={20} />
                    <strong>Sign in to see all {filteredSubjectQuestions.length} questions</strong>
                    <p>{FREE_QUESTION_LIMIT} of {filteredSubjectQuestions.length} shown. Login is free.</p>
                    <button className="ep-gate-btn" type="button" onClick={() => setLoginOpen(true)}>
                      Sign in with Google
                    </button>
                  </div>
                </div>
              )}

              {hasMore && !isGated && (
                <div className="sq-load-more">
                  <button
                    className="sq-load-btn"
                    type="button"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  >
                    Load more · {Math.min(PAGE_SIZE, gatedQuestions.length - visibleCount)} more questions
                  </button>
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
        <section className="public-page"><div className="public-shell">{hub}</div></section>
      )}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}

