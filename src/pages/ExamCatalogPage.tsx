import { CheckCircle2, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import {
  fetchExamCatalog,
  fetchEnrolledSlugs,
  type Exam,
} from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'
import {
  categoryIcons,
  categoryOrder,
  normalizeExamCategory,
} from './DashboardPage'

const ALL = 'All'

export function ExamCatalogPage() {
  const [searchParams] = useSearchParams()
  const [exams, setExams] = useState<Exam[]>([])
  const [enrolledSlugs, setEnrolledSlugs] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  usePageMeta({
    title: 'Exam Catalog — Browse 240+ Competitive Exams | Ministry of Papers',
    description: 'Browse 240+ competitive exams — UPSC, SSC, Banking, Railways, State PSCs and more. Access PYQs and mock tests for every exam.',
    canonicalPath: '/exams',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Exam Catalog — Ministry of Papers',
      description: 'Browse competitive exams — UPSC, SSC, Banking, Railways, State PSCs and more. Access PYQs and mock tests for 240+ exams.',
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
    Promise.all([fetchExamCatalog(), fetchEnrolledSlugs().catch(() => ({ slugs: [] as string[] }))])
      .then(([catalog, enrolled]) => {
        setExams(catalog ?? [])
        setEnrolledSlugs(new Set(enrolled.slugs))
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '')
    setActiveCategory(ALL)
  }, [searchParams])

  const categories = useMemo(() => {
    const raw = [...new Set(exams.map((e) => normalizeExamCategory(e.category)))]
    return [ALL, ...raw.sort((a, b) => {
      const ai = categoryOrder.indexOf(a)
      const bi = categoryOrder.indexOf(b)
      if (ai === -1 && bi === -1) return a.localeCompare(b)
      if (ai === -1) return 1
      if (bi === -1) return -1
      return ai - bi
    })]
  }, [exams])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return exams.filter((e) => {
      const catMatch = activeCategory === ALL || normalizeExamCategory(e.category) === activeCategory
      if (!catMatch) return false
      if (!q) return true
      return [e.name, e.shortName, e.category, e.description, ...e.subjects]
        .join(' ').toLowerCase().includes(q)
    })
  }, [exams, activeCategory, query])

  if (loading) return <HaloLoader label="Loading exams" />

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

      {/* ── Header ───────────────────────────────────── */}
      <header className="ec-header">
        <div className="ec-header-left">
          <small>Exam catalog</small>
          <h1>Exams</h1>
          <p>Browse all exams, enroll in yours, and access mocks &amp; PYQs from your dashboard.</p>
        </div>
        <div className="ec-header-stats">
          <div className="ec-stat">
            <strong>{exams.length}</strong>
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
            placeholder="Search exams, subjects…"
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
        <span>{filtered.length} exam{filtered.length !== 1 ? 's' : ''}</span>
        {(activeCategory !== ALL || query) && (
          <button type="button" className="ec-clear-btn" onClick={() => { setActiveCategory(ALL); setQuery('') }}>
            Clear filters
          </button>
        )}
      </div>

      {/* ── Grid ────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="ec-empty">No exams matched your filters.</p>
      ) : (
        <div className="ec-grid">
          {filtered.map((exam) => {
            const enrolled = enrolledSlugs.has(exam.slug)
            return (
              <Link className={`ec-card${enrolled ? ' enrolled' : ''}`} to={`/exam/${exam.slug}`} key={exam.slug}>
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
                <span className="ec-card-cta">View exam →</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
