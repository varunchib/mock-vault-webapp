import * as React from 'react'
import { CheckCircle2, ChevronRight, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import { searchExams } from '../lib/examSearch'
import {
  fetchExamCatalog,
  fetchEnrolledSlugs,
  type Exam,
} from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'
import {
  categoryIcons,
  groupExamsBySection,
} from '../lib/examCategories'

const ALL = 'All'

const isHiddenExam = (e: Exam) => e.slug === 'neet-ug' || /\bneet\b/i.test(e.slug) || /\bnta\b/i.test(e.name)

function requestExamCatalog() {
  return Promise.all([
    fetchExamCatalog(),
    fetchEnrolledSlugs().catch(() => ({ slugs: [] as string[] })),
  ]).then(([catalog, enrolled]) => {
    const all = (catalog ?? []).filter((e) => !isHiddenExam(e))
    return { all, enrolled: new Set(enrolled.slugs) }
  })
}

export function ExamCatalogPage({ initialExams }: { initialExams?: Exam[] }) {
  const [searchParams] = useSearchParams()
  const searchKey = searchParams.toString()
  const searchQuery = searchParams.get('q') ?? ''
  const visibleInitial = initialExams ? initialExams.filter((e) => !isHiddenExam(e)) : undefined
  const [allExams, setAllExams] = useState<Exam[]>(visibleInitial ?? [])
  const [enrolledSlugs, setEnrolledSlugs] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(initialExams === undefined)
  const [error, setError] = useState(false)
  const [categoryState, setCategoryState] = useState({ searchKey, value: ALL })
  const [queryState, setQueryState] = useState({ searchKey, value: searchQuery })
  const activeCategory = categoryState.searchKey === searchKey ? categoryState.value : ALL
  const setActiveCategory = (value: string) => setCategoryState({ searchKey, value })
  const query = queryState.searchKey === searchKey ? queryState.value : searchQuery
  const setQuery = (value: string) => setQueryState({ searchKey, value })

  const allGroups = useMemo(() => groupExamsBySection(allExams), [allExams])
  const totalVisibleExams = useMemo(
    () => allGroups.reduce((sum, g) => sum + g.exams.length, 0),
    [allGroups],
  )

  const catalogCountLabel = totalVisibleExams > 0 ? `${totalVisibleExams} ` : ''

  usePageMeta({
    title: `Exam Catalog — Browse ${catalogCountLabel}Competitive Exams | Ministry of Papers`,
    description: `Browse ${catalogCountLabel}competitive exams segregated by category — SSC, State Exams (JKSSB, JKPSC, BPSC, UPPCS, RSSB, HP), UPSC, Railways (RRB), and Banking (IBPS).`,
    canonicalPath: '/exams',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Exam Catalog — Ministry of Papers',
      description: `Browse ${catalogCountLabel}competitive exams — SSC, State PSCs, JKSSB, UPSC, Railways, Banking and more.`,
      url: 'https://ministryofpapers.com/exams',
      publisher: {
        '@type': 'Organization',
        name: 'Ministry of Papers',
        url: 'https://ministryofpapers.com',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
          { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://ministryofpapers.com/exams' },
        ],
      },
    },
  })

  const load = () => {
    setLoading(true)
    setError(false)
    void requestExamCatalog()
      .then(({ all, enrolled }) => {
        setAllExams(all)
        setEnrolledSlugs(enrolled)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (initialExams !== undefined) return
    let cancelled = false
    void requestExamCatalog()
      .then(({ all, enrolled }) => {
        if (cancelled) return
        setAllExams(all)
        setEnrolledSlugs(enrolled)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [initialExams])

  const categories = useMemo(
    () => [ALL, ...allGroups.map((g) => g.label)],
    [allGroups],
  )

  const q = query.trim()
  const baseList = useMemo(
    () => (q ? searchExams(allExams, q) : allExams),
    [allExams, q],
  )

  const filteredGroups = useMemo(() => {
    const groups = groupExamsBySection(baseList)
    if (activeCategory === ALL) return groups
    return groups.filter((g) => g.label === activeCategory)
  }, [baseList, activeCategory])

  const filteredCount = useMemo(
    () => filteredGroups.reduce((sum, g) => sum + g.exams.length, 0),
    [filteredGroups],
  )

  if (loading) return React.createElement(HaloLoader, { label: 'Loading exams' })

  if (error) {
    return (
      <div className="ec-page">
        <div className="ec-error">
          <strong>Unable to load exams</strong>
          <p>Could not reach the server. Check your connection and try again.</p>
          <button type="button" onClick={load}>Retry</button>
        </div>
      </div>
    )
  }

  const enrolledCount = enrolledSlugs.size

  return (
    <div className="ec-page">
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={13} />
        <span aria-current="page">Exams</span>
      </nav>

      {/* ── Header ───────────────────────────────────── */}
      <header className="ec-header">
        <div className="ec-header-left">
          <small>Exam catalog</small>
          <h1>All Competitive Exams</h1>
          <p>Browse exams segregated by category — SSC, State Exams, UPSC, Railways &amp; Banking.</p>
        </div>
        <div className="ec-header-stats">
          <div className="ec-stat">
            <strong>{totalVisibleExams}</strong>
            <span>Exams</span>
          </div>
          <div className="ec-stat">
            <strong>{enrolledCount}</strong>
            <span>Enrolled</span>
          </div>
        </div>
      </header>

      {/* ── Filter bar ──────────────────────────────── */}
      <div className="ec-filter-bar">
        <div className="ec-category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`ec-cat-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => { setActiveCategory(cat); setQuery('') }}
            >
              {cat !== ALL && (categoryIcons[cat.toLowerCase()] ?? '')} {cat}
            </button>
          ))}
        </div>
        <label className="ec-search">
          <Search size={14} />
          <input
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
            placeholder="Search exams, posts, subjects…"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear">
              <X size={13} />
            </button>
          )}
        </label>
      </div>

      {/* ── Results count ───────────────────────────── */}
      <div className="ec-results-bar">
        <span>{filteredCount} exam{filteredCount !== 1 ? 's' : ''} across {filteredGroups.length} categor{filteredGroups.length !== 1 ? 'ies' : 'y'}</span>
        {(activeCategory !== ALL || query) && (
          <button type="button" className="ec-clear-btn" onClick={() => { setActiveCategory(ALL); setQuery('') }}>
            Clear filters
          </button>
        )}
      </div>

      {/* ── Segregated Category Sections (ExamSide style) ── */}
      {filteredGroups.length === 0 ? (
        <p className="ec-empty">No exams matched your filters.</p>
      ) : (
        <div className="ec-sections-stack">
          {filteredGroups.map((group) => (
            <section key={group.label} className="ec-cat-section">
              <div className="ec-cat-section-head">
                <div className="ec-cat-section-title">
                  <span className="ec-cat-section-icon" aria-hidden="true">{group.icon}</span>
                  <div>
                    <h2>{group.label}</h2>
                    <p>{group.subtitle}</p>
                  </div>
                </div>
                <div className="ec-cat-section-rule" aria-hidden="true" />
                <span className="ec-cat-section-count">
                  {group.exams.length} {group.exams.length === 1 ? 'Exam' : 'Exams'}
                </span>
              </div>

              <div className="ec-grid">
                {group.exams.map((exam) => {
                  const enrolled = enrolledSlugs.has(exam.slug)
                  return (
                    <Link className={`ec-card${enrolled ? ' enrolled' : ''}`} to={`/exam/${exam.slug}`} key={exam.slug}>
                      <span className="ec-card-icon" aria-hidden="true">{exam.icon}</span>
                      <div className="ec-card-body">
                        <div className="ec-card-title-row">
                          <strong className="ec-card-name">{exam.shortName}</strong>
                          {enrolled && <CheckCircle2 size={14} className="ec-enrolled-check" />}
                        </div>
                        <p className="ec-card-full">{exam.name}</p>
                        <div className="ec-card-meta">
                          {exam.papers > 0 ? (
                            <span className="ec-meta-pyq">{exam.papers} {exam.papers === 1 ? 'Paper' : 'Papers'}</span>
                          ) : (
                            <span>Practice Hub</span>
                          )}
                          {exam.mocks > 0 && <span>{exam.mocks} Mocks</span>}
                          {exam.totalQuestions > 0 && <span>{exam.totalQuestions.toLocaleString()} Qs</span>}
                        </div>
                      </div>
                      <ChevronRight size={15} className="ec-card-arrow" aria-hidden="true" />
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
