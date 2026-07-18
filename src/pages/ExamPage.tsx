import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Lock,
  Search,
  X,
} from 'lucide-react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { MocksComingSoon } from '../components/common/MocksComingSoon'
import { HaloLoader } from '../components/common/HaloLoader'
import {
  fetchEnrolledSlugs,
  fetchExamBySlug,
  fetchExamCatalog,
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
import { examHubSeoTitle, examHubSeoDescription } from '../lib/pageTitles'
import { paperPath, paperSeoOverride } from '../lib/paperSeo'
import { recordExamView } from '../lib/examActivity'
import { subExamsOf } from '../lib/examTree'
import { normalizeExamCategory } from './DashboardPage'
import { QuestionRenderer } from '../components/common/QuestionRenderer'
import { examFaqs, type FaqItem } from '../data/examFaq'
import { postGuides } from '../data/postGuides'

type Tab = 'papers' | 'mocks' | 'subjects'

// Return only a meaningful shift label (e.g. "Set A", "Shift 1"), stripping any date fragments.
// Returns null when the shift string is purely a date like "10 May 2026" or "Jan 2024".
function extractShiftLabel(shift: string): string | null {
  if (!shift) return null
  const cleaned = shift
    .replace(/\d{1,2}\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}/gi, '')
    .replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}/gi, '')
    .replace(/\b\d{4}\b/g, '')
    .replace(/\s*[-–]\s*/g, ' ')
    .replace(/[()]/g, '')
    .trim()
  return cleaned || null
}

function fmtHeldOn(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Best available display date: heldOn → date extracted from shift → year
function getDisplayDate(paper: { heldOn?: string; shift: string; year: string }): string | null {
  if (paper.heldOn) return fmtHeldOn(paper.heldOn)
  if (paper.shift) {
    const m = paper.shift.match(/(\d{1,2}\s+)?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}/i)
    if (m) return m[0].replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*/gi, (s) => s.slice(0, 3))
  }
  return paper.year || null
}

const FREE_QUESTION_LIMIT = 10
const PAGE_SIZE = 15
// Collapse the sub-exam grid past this many. The grid is 4-up on desktop, so 8
// is exactly two full rows. Pagination would be wrong here: the largest board
// has 7 sub-exams, so page 2 would hold a single chip.
const SUBEXAM_COLLAPSE_AT = 8

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

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="ep-faq" aria-label="Frequently Asked Questions">
      <h2 className="ep-faq-title">Frequently Asked Questions</h2>
      <dl className="ep-faq-list">
        {items.map((item, i) => (
          <div className={`ep-faq-item${open === i ? ' open' : ''}`} key={i}>
            <dt>
              <button
                type="button"
                className="ep-faq-q"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <ChevronDown size={15} className="ep-faq-chevron" />
              </button>
            </dt>
            {open === i && <dd className="ep-faq-a">{item.a}</dd>}
          </div>
        ))}
      </dl>
    </section>
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
  const [paperSearch, setPaperSearch] = useState(() => searchParams.get('s') ?? '')
  const [selectedSubject, setSelectedSubject] = useState<string | null>(initialSubject)
  const [topicFilter, setTopicFilter] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [loginOpen, setLoginOpen] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrollBusy, setEnrollBusy] = useState(false)
  // Sibling exams under this board (e.g. JKSSB -> JKSSB Patwari). Without this
  // they are unreachable by browsing, so nobody can view or enrol in them.
  const [subExams, setSubExams] = useState<Exam[]>([])
  // Derived, not hardcoded: an exam is a "board" precisely when others nest
  // under its slug. Adding a sub-exam reclassifies its parent automatically.
  const isBoard = subExams.length > 0
  const [showAllSubExams, setShowAllSubExams] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)
    setPaperSearch('')

    const tabFromUrl = (searchParams.get('tab') as Tab | null) ?? 'papers'
    const subjectFromUrl = searchParams.get('subject')
    setActiveTab(tabFromUrl)
    setSelectedSubject(subjectFromUrl)
    setTopicFilter(null)

    Promise.all([
      fetchExamBySlug(slug),
      fetchExamPapers(slug),
      fetchMockCatalog(),
      fetchExamQuestions(slug).catch(() => []),
      isAuthenticated ? fetchEnrolledSlugs().catch(() => null) : Promise.resolve(null),
      fetchExamCatalog().catch(() => [] as Exam[]),
    ]).then(([examData, paperData, mockData, questionData, enrollData, catalog]) => {
      setExam(examData)
      setPapers(paperData ?? [])
      setAllMocks(mockData ?? [])
      setExamQuestions(questionData ?? [])
      const kids = subExamsOf(examData.slug, catalog ?? [])
      setSubExams(kids)
      if (enrollData) setIsEnrolled(enrollData.slugs.includes(examData.slug))
      // Only record exams a candidate actually sits. A board (JKSSB) is a
      // navigation hub, so recording it would put "JKSSB" in Recently viewed
      // instead of "JKSSB Junior Assistant".
      if (kids.length === 0) recordExamView(examData)
    })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug, isAuthenticated, retryCount, searchParams])

  const handleEnrollToggle = async () => {
    if (!slug) return
    // Logged-out visitors see the button too — enrolling starts with signing in.
    if (!isAuthenticated) {
      setLoginOpen(true)
      return
    }
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

  // Mocks are a separate entity and deliberately do NOT roll up to a board the
  // way papers and questions do: a mock belongs to the exam it was written for.
  // (The Mocks tab currently renders a coming-soon panel; the count still
  // feeds the tab label.)
  const examMocks = useMemo(() => allMocks.filter((m) => m.examSlug === slug), [allMocks, slug])

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

  const seoTitle = exam
    ? examHubSeoTitle({ shortName: exam.shortName, name: exam.name })
    : 'Exam Hub | Ministry of Papers'
  const seoDesc = exam
    ? examHubSeoDescription({ shortName: exam.shortName, name: exam.name, papers: exam.papers, mocks: exam.mocks, description: exam.description })
    : 'Browse solved papers, mock tests, and subjects.'

  const faqs = exam ? (examFaqs[exam.slug] ?? null) : null

  usePageMeta({
    title: seoTitle,
    description: seoDesc,
    canonicalPath: exam ? `/exam/${exam.slug}` : '/exam',
    jsonLd: exam
      ? {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: seoTitle.replace(' | Ministry of Papers', ''),
          description: seoDesc,
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
          ...(faqs && {
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          }),
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
  const totalQuestions = exam.totalQuestions || examQuestions.length

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
              {exam.papers > 0 && (
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

        {/* You enrol in an exam you actually sit, not a board — so a board (an
            exam with sub-exams) offers no Enroll button. The `|| isEnrolled`
            keeps it visible for anyone already enrolled in a board from before
            this rule, otherwise their enrolment would be impossible to undo.
            Logged-out visitors see the button too; clicking it opens login. */}
        {(!isBoard || isEnrolled) && (
          <div className="ep-hero-actions">
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

      {/* ── Exams under this board ─────────────────────
          Without this, sub-exams (JKSSB Patwari, Junior Assistant, …) are
          unreachable by browsing: the /exams grid lists boards only, so nobody
          could view or enrol in the specific exam they actually sit. */}
      {subExams.length > 0 && (
        <section className="ep-subexams">
          <div className="ep-subexams-head">
            <h2>Exams under {exam.shortName}</h2>
            <span>{subExams.length}</span>
          </div>
          {/* Every chip is rendered into the DOM even when collapsed — only the
              overflow is clipped in CSS. Appending links on click would keep
              them out of the initial HTML, and uncrawled sub-exams are exactly
              the problem this section exists to fix. */}
          <div className={`ep-subexam-row${!showAllSubExams && subExams.length > SUBEXAM_COLLAPSE_AT ? ' collapsed' : ''}`}>
            {subExams.map((sub, i) => (
              <Link
                className="ep-subexam-chip"
                to={`/exam/${sub.slug}`}
                key={sub.slug}
                hidden={!showAllSubExams && i >= SUBEXAM_COLLAPSE_AT ? true : undefined}
              >
                <span className="ep-subexam-icon">{sub.icon}</span>
                <span className="ep-subexam-copy">
                  <strong>{sub.shortName}</strong>
                  <small>
                    {sub.papers} paper{sub.papers === 1 ? '' : 's'} · {sub.totalQuestions} Qs
                  </small>
                </span>
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>

          {subExams.length > SUBEXAM_COLLAPSE_AT && (
            <button
              type="button"
              className="ep-subexam-more"
              onClick={() => setShowAllSubExams((v) => !v)}
              aria-expanded={showAllSubExams}
            >
              {showAllSubExams
                ? 'Show less'
                : `Show all ${subExams.length} exams`}
              <ChevronDown size={14} className={showAllSubExams ? 'flip' : undefined} />
            </button>
          )}
        </section>
      )}

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
          {/* On a board this list is aggregated from every exam beneath it, so
              say so — otherwise it reads as if the board owns them directly. */}
          <div className="ep-papers-head">
            <h2>All papers{isBoard ? ` under ${exam.shortName}` : ''}</h2>
            <span>{papers.length}</span>
          </div>

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
                        <Link className="ep-paper-card-inner" to={paperPath(paper.slug)}>
                          <div className="ep-paper-card-main">
                            <strong>{paperSeoOverride(paper.slug)?.h1 ?? paper.title}</strong>
                            <div className="ep-paper-meta">
                              {(() => {
                                const label = extractShiftLabel(paper.shift)
                                const date = getDisplayDate(paper)
                                return (<>
                                  {label && <small>{label}</small>}
                                  {date && <small className="ep-paper-date">{date}</small>}
                                </>)
                              })()}
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

          {faqs && <FaqAccordion items={faqs} />}

          {/* Exam Guides — links to post-specific guide pages.
              Skipped on a board: you sit JKSSB Patwari, not "JKSSB", and every
              sub-exam now carries its own guide on its own page. */}
          {(() => {
            if (isBoard) return null
            const guides = Object.entries(postGuides).filter(([, g]) => g.examSlug === exam.slug)
            if (guides.length === 0) return null
            return (
              <div className="ep-guides-strip">
                <span className="ep-guides-label">Exam Guides</span>
                {guides.map(([slug, g]) => (
                  <Link key={slug} className="ep-guide-chip" to={`/guide/${slug}`}>
                    {g.shortName} — Syllabus &amp; Pattern
                    <ChevronRight size={12} />
                  </Link>
                ))}
              </div>
            )
          })()}
        </div>
      )}

      {/* ── Mock Tests — under development, gated for everyone ── */}
      {activeTab === 'mocks' && (
        <div className="ep-tab-body">
          <div className="ep-papers-head">
            <h2>Mock tests</h2>
          </div>

          <MocksComingSoon />
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
