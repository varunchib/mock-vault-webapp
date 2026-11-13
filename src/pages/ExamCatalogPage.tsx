import * as React from 'react'
import { CheckCircle2, ChevronDown, ChevronRight, Search, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import { searchExams } from '../lib/examSearch'
import { subExamsOf, topLevelBoards } from '../lib/examTree'
import {
  fetchExamCatalog,
  fetchEnrolledSlugs,
  type Exam,
} from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'
import { normalizeExamCategory } from './DashboardPage'

const ALL = 'All'

interface CatalogTab {
  id: string
  label: string
  icon: string
  description: string
  matches: (exam: Exam) => boolean
}

const CATALOG_TABS: CatalogTab[] = [
  {
    id: ALL,
    label: 'All Exams',
    icon: '🗂️',
    description: 'Browse every exam board and paper archive',
    matches: () => true,
  },
  {
    id: 'SSC',
    label: 'SSC Exams',
    icon: '🏛️',
    description: 'SSC CGL, CHSL, MTS, CPO & Staff Selection papers',
    matches: (e) => {
      const hay = `${e.slug} ${e.boardSlug ?? ''} ${e.shortName} ${e.name}`.toLowerCase()
      return /\bssc\b/.test(hay) || e.slug.startsWith('ssc-') || e.boardSlug === 'ssc'
    },
  },
  {
    id: 'UPSC',
    label: 'UPSC',
    icon: '⚖️',
    description: 'UPSC Civil Services (CSAT & GS) and Union PSC papers',
    matches: (e) => {
      const hay = `${e.slug} ${e.boardSlug ?? ''} ${e.shortName} ${e.name}`.toLowerCase()
      return /\bupsc\b/.test(hay) || e.slug.startsWith('upsc-') || e.boardSlug === 'upsc'
    },
  },
  {
    id: 'Banking',
    label: 'Banking',
    icon: '🏦',
    description: 'IBPS PO, Clerk, SBI & RBI recruitment exams',
    matches: (e) => normalizeExamCategory(e.category) === 'Banking',
  },
  {
    id: 'Railways',
    label: 'Railways',
    icon: '🚂',
    description: 'RRB NTPC, Group D & Indian Railways papers',
    matches: (e) => normalizeExamCategory(e.category) === 'Railways',
  },
  {
    id: 'State Govt',
    label: 'State Govt',
    icon: '📍',
    description: 'JKSSB, JKPSC, BPSC, UPPSC, RSSB, HPRCA & State PSCs',
    matches: (e) => normalizeExamCategory(e.category) === 'States',
  },
  {
    id: 'Defence & Police',
    label: 'Defence & Police',
    icon: '🛡️',
    description: 'SI, Constable, NDA, CDS, AFCAT & CAPF exams',
    matches: (e) => {
      const hay = `${e.slug} ${e.shortName} ${e.name} ${e.category}`.toLowerCase()
      return /(defence|defense|police|constable|jkpsi|\bsi\b|\bnda\b|\bcds\b|afcat|capf)/.test(hay)
    },
  },
  {
    id: 'Teaching',
    label: 'Teaching',
    icon: '📚',
    description: 'CTET, State TET, KVS, DSSSB & NVS exams',
    matches: (e) => {
      const hay = `${e.slug} ${e.shortName} ${e.name} ${e.category}`.toLowerCase()
      return normalizeExamCategory(e.category) === 'Teaching' || /(ctet|\btet\b|kvs|dsssb|nvs|teaching)/.test(hay)
    },
  },
  {
    id: 'University',
    label: 'University',
    icon: '🎓',
    description: 'CUET, UGC NET, GATE & university entrance exams',
    matches: (e) => {
      const hay = `${e.slug} ${e.shortName} ${e.name} ${e.category}`.toLowerCase()
      return normalizeExamCategory(e.category) === 'Engineering' || /(university|cuet|ugc|gate|jee|entrance)/.test(hay)
    },
  },
]

const isHiddenExam = (e: Exam) => e.slug === 'neet-ug' || /\bneet\b/i.test(e.slug) || /\bnta\b/i.test(e.name)

function requestExamCatalog() {
  return Promise.all([
    fetchExamCatalog(),
    fetchEnrolledSlugs().catch(() => ({ slugs: [] as string[] })),
  ]).then(([catalog, enrolled]) => {
    const all = (catalog ?? []).filter((e) => !isHiddenExam(e))
    return { all, boards: topLevelBoards(all), enrolled: new Set(enrolled.slugs) }
  })
}

export function ExamCatalogPage({ initialExams }: { initialExams?: Exam[] }) {
  const [searchParams] = useSearchParams()
  const searchKey = searchParams.toString()
  const searchQuery = searchParams.get('q') ?? ''
  const visibleInitial = initialExams ? initialExams.filter((e) => !isHiddenExam(e)) : undefined
  const [exams, setExams] = useState<Exam[]>(() => visibleInitial ? topLevelBoards(visibleInitial) : [])
  // Full catalog including sub-exams. The grid browses boards only, but search
  // and the hover mega-tabs span every individual exam too.
  const [allExams, setAllExams] = useState<Exam[]>(visibleInitial ?? [])
  const [enrolledSlugs, setEnrolledSlugs] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(initialExams === undefined)
  const [error, setError] = useState(false)
  const [categoryState, setCategoryState] = useState({ searchKey, value: ALL })
  const [queryState, setQueryState] = useState({ searchKey, value: searchQuery })
  const [hoveredTabId, setHoveredTabId] = useState<string | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeCategory = categoryState.searchKey === searchKey ? categoryState.value : ALL
  const setActiveCategory = (value: string) => setCategoryState({ searchKey, value })
  const query = queryState.searchKey === searchKey ? queryState.value : searchQuery
  const setQuery = (value: string) => setQueryState({ searchKey, value })

  const catalogCountLabel = allExams.length > 0 ? `${allExams.length} ` : ''

  usePageMeta({
    title: `Exam Catalog — Browse ${catalogCountLabel}Competitive Exams | Ministry of Papers`,
    description: `Browse ${catalogCountLabel}competitive exams — UPSC, SSC, Banking, Railways, State PSCs, Defence & Police and more. Access PYQs and mock tests for every exam.`,
    canonicalPath: '/exams',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Exam Catalog — Ministry of Papers',
      description: `Browse ${catalogCountLabel}competitive exams — UPSC, SSC, Banking, Railways, State PSCs, Defence & Police and more. Access PYQs and mock tests for every exam.`,
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
      .then(({ all, boards, enrolled }) => {
        setExams(boards)
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
      .then(({ all, boards, enrolled }) => {
        if (cancelled) return
        setExams(boards)
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

  // Map each tab to its concrete exam items (preferring actual sat exams / sub-exams
  // over parent boards when a board has children, while keeping standalone boards).
  const tabData = useMemo(() => {
    const boardSlugsWithChildren = new Set(
      allExams.map((e) => e.boardSlug).filter((s): s is string => Boolean(s)),
    )
    const leafExams = allExams.filter((e) => !boardSlugsWithChildren.has(e.slug))

    return CATALOG_TABS.map((tab) => {
      const items = leafExams
        .filter((e) => tab.matches(e))
        .sort((a, b) => (b.papers - a.papers) || a.shortName.localeCompare(b.shortName))
      const totalPapers = items.reduce((sum, e) => sum + (e.papers || 0), 0)
      return { ...tab, items, totalPapers }
    })
  }, [allExams])

  const activeTabObj = tabData.find((t) => t.id === activeCategory) ?? tabData[0]
  const hoveredTabObj = hoveredTabId ? tabData.find((t) => t.id === hoveredTabId) ?? null : null

  const openHover = (tabId: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setHoveredTabId(tabId === ALL ? null : tabId)
  }

  const scheduleCloseHover = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => setHoveredTabId(null), 130)
  }

  const q = query.trim()
  const hits = q ? searchExams(allExams, q) : exams
  const filtered = hits.filter((e) => {
    if (activeCategory === ALL) return true
    if (activeTabObj.matches(e)) return true
    // Also keep a parent board visible if any of its sub-exams belong to this tab
    const children = subExamsOf(e.slug, allExams)
    return children.some((c) => activeTabObj.matches(c))
  })

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
  const totalPapersCount = exams.reduce((sum, e) => sum + (e.papers || 0), 0)

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
          <h1>Explore Competitive Exams</h1>
          <p>Hover any category tab to preview exams and paper counts, or search across {allExams.length} exams &amp; {totalPapersCount} PYQ papers.</p>
        </div>
        <div className="ec-header-stats">
          <div className="ec-stat">
            <strong>{allExams.length}</strong>
            <span>Exams</span>
          </div>
          <div className="ec-stat">
            <strong>{totalPapersCount}</strong>
            <span>PYQ Papers</span>
          </div>
          <div className="ec-stat">
            <strong>{enrolledCount}</strong>
            <span>Enrolled</span>
          </div>
        </div>
      </header>

      {/* ── Category Mega-Tabs + Hover Flyout + Search ── */}
      <div
        className="ec-nav-shell"
        onMouseLeave={scheduleCloseHover}
      >
        <div className="ec-filter-bar">
          <div className="ec-category-tabs" role="tablist" aria-label="Exam categories">
            {tabData.map((tab) => {
              const isActive = activeCategory === tab.id
              const isHovered = hoveredTabId === tab.id
              const hasFlyout = tab.id !== ALL
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-expanded={hasFlyout ? isHovered : undefined}
                  className={`ec-cat-tab${isActive ? ' active' : ''}${isHovered ? ' hovered' : ''}`}
                  onMouseEnter={() => openHover(tab.id)}
                  onFocus={() => openHover(tab.id)}
                  onClick={() => {
                    setActiveCategory(tab.id)
                    setQuery('')
                    setHoveredTabId(null)
                  }}
                >
                  <span className="ec-cat-icon">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.id !== ALL && tab.items.length > 0 && (
                    <span className="ec-cat-count">{tab.items.length}</span>
                  )}
                  {hasFlyout && <ChevronDown size={13} className="ec-cat-chevron" />}
                </button>
              )
            })}
          </div>
          <label className="ec-search">
            <Search size={14} />
            <input
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              placeholder="Search SSC CGL, Patwari, UPSC…"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear">
                <X size={13} />
              </button>
            )}
          </label>
        </div>

        {/* Hover Mega-Menu Panel */}
        {hoveredTabObj && (
          <div
            className="ec-hover-flyout"
            onMouseEnter={() => openHover(hoveredTabObj.id)}
            onMouseLeave={scheduleCloseHover}
          >
            <div className="ec-flyout-head">
              <div>
                <strong>{hoveredTabObj.icon} {hoveredTabObj.label}</strong>
                <span>{hoveredTabObj.description}</span>
              </div>
              <div className="ec-flyout-actions">
                <span className="ec-flyout-summary">
                  {hoveredTabObj.items.length} exam{hoveredTabObj.items.length !== 1 ? 's' : ''}
                  {hoveredTabObj.totalPapers > 0 ? ` · ${hoveredTabObj.totalPapers} PYQs` : ''}
                </span>
                <button
                  type="button"
                  className="ec-flyout-filter-btn"
                  onClick={() => {
                    setActiveCategory(hoveredTabObj.id)
                    setQuery('')
                    setHoveredTabId(null)
                  }}
                >
                  Filter grid →
                </button>
              </div>
            </div>

            {hoveredTabObj.items.length === 0 ? (
              <div className="ec-flyout-empty">
                <Sparkles size={15} />
                <span>
                  {hoveredTabObj.label} PYQs and mock tests are coming soon.{' '}
                  <button
                    type="button"
                    className="ec-clear-btn"
                    onClick={() => { setActiveCategory(ALL); setHoveredTabId(null) }}
                  >
                    Browse all live exams
                  </button>
                </span>
              </div>
            ) : (
              <div className="ec-flyout-grid">
                {hoveredTabObj.items.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/exam/${item.slug}`}
                    className="ec-flyout-item"
                    onClick={() => setHoveredTabId(null)}
                  >
                    <span className="ec-flyout-item-icon">{item.icon}</span>
                    <div className="ec-flyout-item-body">
                      <strong>{item.shortName}</strong>
                      <small>{item.name}</small>
                    </div>
                    <div className="ec-flyout-item-badges">
                      {item.papers > 0 && (
                        <span className="ec-flyout-badge">{item.papers} {item.papers === 1 ? 'paper' : 'papers'}</span>
                      )}
                      {item.mocks > 0 && (
                        <span className="ec-flyout-badge muted">{item.mocks} {item.mocks === 1 ? 'mock' : 'mocks'}</span>
                      )}
                      {item.papers === 0 && item.mocks === 0 && (
                        <span className="ec-flyout-badge muted">Coming soon</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Results count ───────────────────────────── */}
      <div className="ec-results-bar">
        <span>
          Showing {filtered.length} {q ? 'matching exam' : 'board'}{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== ALL ? ` in ${activeCategory}` : ''}
        </span>
        {(activeCategory !== ALL || query) && (
          <button type="button" className="ec-clear-btn" onClick={() => { setActiveCategory(ALL); setQuery('') }}>
            Clear filters
          </button>
        )}
      </div>

      {/* ── Grid ────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="ec-empty-box">
          <p className="ec-empty">
            {activeCategory !== ALL && activeTabObj.items.length === 0
              ? `${activeTabObj.label} papers are being added soon.`
              : 'No exams matched your filters.'}
          </p>
          {(activeCategory !== ALL || query) && (
            <button type="button" className="ec-clear-btn" onClick={() => { setActiveCategory(ALL); setQuery('') }}>
              Show all exams
            </button>
          )}
        </div>
      ) : (
        <div className="ec-grid">
          {filtered.map((exam) => {
            const enrolled = enrolledSlugs.has(exam.slug)
            const children = subExamsOf(exam.slug, allExams)
              .filter((c) => activeCategory === ALL || activeTabObj.matches(c) || activeTabObj.matches(exam))
            const previewChildren = children.slice(0, 4)
            const extraCount = children.length - previewChildren.length

            return (
              <div className={`ec-card${enrolled ? ' enrolled' : ''}`} key={exam.slug}>
                <Link className="ec-card-main-link" to={`/exam/${exam.slug}`}>
                  <div className="ec-card-top">
                    <span className="ec-card-icon">{exam.icon}</span>
                    {enrolled && <CheckCircle2 size={15} className="ec-enrolled-check" />}
                  </div>
                  <strong className="ec-card-name">{exam.shortName}</strong>
                  <p className="ec-card-full">{exam.name}</p>
                  <div className="ec-card-meta">
                    {exam.papers > 0 && <span>{exam.papers} PYQs</span>}
                    {exam.mocks > 0 && <span>{exam.mocks} Mocks</span>}
                    {exam.totalQuestions > 0 && <span>{exam.totalQuestions} Qs</span>}
                  </div>
                </Link>

                {previewChildren.length > 0 && (
                  <div className="ec-card-subexams">
                    {previewChildren.map((sub) => (
                      <Link key={sub.slug} to={`/exam/${sub.slug}`} className="ec-sub-pill">
                        <span>{sub.shortName}</span>
                        {sub.papers > 0 && <b>{sub.papers}</b>}
                      </Link>
                    ))}
                    {extraCount > 0 && (
                      <Link to={`/exam/${exam.slug}`} className="ec-sub-pill more">
                        +{extraCount} more
                      </Link>
                    )}
                  </div>
                )}

                <Link className="ec-card-cta" to={`/exam/${exam.slug}`}>
                  View {children.length > 0 ? `${children.length} exams` : 'exam'} →
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
