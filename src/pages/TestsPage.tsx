import { ChevronRight, ClipboardList, FileText, Search, Timer, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import { fetchExamCatalog, fetchMockCatalog, fetchPaperCatalog, type Exam, type MockItem, type Paper } from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'
import { useAuth } from '../context/useAuth'

type Tab = 'mocks' | 'papers'

const diffOrder: Record<string, number> = { Beginner: 0, Moderate: 1, Advanced: 2 }

export function TestsPage() {
  const { isAuthenticated } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialTab = (searchParams.get('tab') as Tab | null) === 'papers' ? 'papers' : 'mocks'

  const [tab, setTab] = useState<Tab>(initialTab)
  const [exams, setExams] = useState<Exam[]>([])
  const [mocks, setMocks] = useState<MockItem[]>([])
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [examFilter, setExamFilter] = useState('all')
  const [diffFilter, setDiffFilter] = useState('All')
  const [yearFilter, setYearFilter] = useState('All')
  const [query, setQuery] = useState('')

  usePageMeta({
    title: 'Tests | Ministry of Papers',
    description: 'Mock tests and previous year papers for all competitive exams.',
    canonicalPath: '/tests',
  })

  useEffect(() => {
    let cancelled = false
    Promise.all([fetchExamCatalog(), fetchMockCatalog(), fetchPaperCatalog()])
      .then(([ec, mc, pc]) => {
        if (cancelled) return
        setExams(ec ?? [])
        setMocks(mc ?? [])
        setPapers(pc ?? [])
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const switchTab = (next: Tab) => {
    setTab(next)
    setExamFilter('all')
    setDiffFilter('All')
    setYearFilter('All')
    setQuery('')
    setSearchParams(next === 'papers' ? { tab: 'papers' } : {})
  }

  const years = useMemo(
    () => ['All', ...[...new Set(papers.map((p) => p.year))].sort((a, b) => b.localeCompare(a))],
    [papers],
  )

  const filteredMocks = useMemo(() => {
    const q = query.trim().toLowerCase()
    return mocks.filter((m) => {
      if (examFilter !== 'all' && m.examSlug !== examFilter) return false
      if (diffFilter !== 'All' && m.difficulty !== diffFilter) return false
      if (q && !`${m.title} ${m.examName} ${m.subjects.join(' ')}`.toLowerCase().includes(q)) return false
      return true
    }).sort((a, b) => (diffOrder[a.difficulty] ?? 1) - (diffOrder[b.difficulty] ?? 1))
  }, [mocks, examFilter, diffFilter, query])

  const filteredPapers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return papers.filter((p) => {
      if (examFilter !== 'all' && p.examSlug !== examFilter) return false
      if (yearFilter !== 'All' && p.year !== yearFilter) return false
      if (q && !`${p.title} ${p.examName} ${p.subjects.join(' ')} ${p.year}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [papers, examFilter, yearFilter, query])

  if (loading) return <HaloLoader label="Loading tests" />

  const examOptions = exams.filter((e) =>
    tab === 'mocks'
      ? mocks.some((m) => m.examSlug === e.slug)
      : papers.some((p) => p.examSlug === e.slug),
  )

  return (
    <div className="ts-page">

      {/* ── Header ──────────────────────────────────── */}
      <header className="ts-header">
        <div>
          <small>Exam preparation</small>
          <h1>Tests</h1>
          <p>Mock tests and previous year papers — all in one place.</p>
        </div>
        <div className="ts-header-stats">
          <div className="ts-stat">
            <strong>{mocks.length}</strong>
            <span>Mock tests</span>
          </div>
          <div className="ts-stat">
            <strong>{papers.length}</strong>
            <span>PYQ papers</span>
          </div>
        </div>
      </header>

      {/* ── Tab toggle ──────────────────────────────── */}
      <div className="ts-tabs">
        <button
          type="button"
          className={`ts-tab${tab === 'mocks' ? ' active' : ''}`}
          onClick={() => switchTab('mocks')}
        >
          <ClipboardList size={15} /> Mock Tests
          <span className="ts-tab-count">{mocks.length}</span>
        </button>
        <button
          type="button"
          className={`ts-tab${tab === 'papers' ? ' active' : ''}`}
          onClick={() => switchTab('papers')}
        >
          <FileText size={15} /> PYQ Papers
          <span className="ts-tab-count">{papers.length}</span>
        </button>
      </div>

      {/* ── Filter row ──────────────────────────────── */}
      <div className="ts-filter-row">
        <select
          className="ts-select"
          value={examFilter}
          onChange={(e) => setExamFilter(e.target.value)}
        >
          <option value="all">All exams</option>
          {examOptions.map((e) => (
            <option key={e.slug} value={e.slug}>{e.shortName}</option>
          ))}
        </select>

        {tab === 'mocks' ? (
          <div className="ts-diff-pills">
            {['All', 'Beginner', 'Moderate', 'Advanced'].map((d) => (
              <button
                key={d}
                type="button"
                className={`ts-diff-pill${diffFilter === d ? ' active' : ''}`}
                onClick={() => setDiffFilter(d)}
              >
                {d}
              </button>
            ))}
          </div>
        ) : (
          <select
            className="ts-select"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y === 'All' ? 'All years' : y}</option>
            ))}
          </select>
        )}

        <label className="ts-search">
          <Search size={14} />
          <input
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
            placeholder="Search…"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear">
              <X size={13} />
            </button>
          )}
        </label>
      </div>

      {/* ── Results count ───────────────────────────── */}
      <div className="ts-results-bar">
        <span>
          {tab === 'mocks' ? filteredMocks.length : filteredPapers.length}{' '}
          {tab === 'mocks' ? 'mock' : 'paper'}{(tab === 'mocks' ? filteredMocks.length : filteredPapers.length) !== 1 ? 's' : ''}
        </span>
        {(examFilter !== 'all' || (tab === 'mocks' ? diffFilter !== 'All' : yearFilter !== 'All') || query) && (
          <button
            type="button"
            className="ts-clear-btn"
            onClick={() => { setExamFilter('all'); setDiffFilter('All'); setYearFilter('All'); setQuery('') }}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ── Mock cards ──────────────────────────────── */}
      {tab === 'mocks' && (
        filteredMocks.length === 0 ? (
          <p className="ts-empty">No mock tests matched your filters.</p>
        ) : (
          <div className="ts-mock-grid">
            {filteredMocks.map((mock) => (
              <div className={`ts-mock-card diff-${mock.difficulty.toLowerCase()}`} key={mock.slug}>
                <div className="ts-mock-top">
                  <span className={`ts-diff-badge ${mock.difficulty.toLowerCase()}`}>{mock.difficulty}</span>
                  {mock.isFree && <span className="ts-free-badge">Free</span>}
                </div>
                <strong className="ts-mock-title">{mock.title}</strong>
                <p className="ts-mock-exam">{mock.examName}</p>
                <p className="ts-mock-desc">{mock.description}</p>
                <div className="ts-mock-meta">
                  <span><Timer size={12} /> {mock.durationMinutes} min</span>
                  <span><ClipboardList size={12} /> {mock.questions} Qs</span>
                </div>
                <div className="ts-mock-footer">
                  {isAuthenticated ? (
                    <Link className="ts-start-btn" to={`/mock-attempt/${mock.slug}`}>
                      Start Mock
                    </Link>
                  ) : (
                    <Link className="ts-start-btn" to={`/mock-test/${mock.slug}`}>
                      View Mock
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── Paper list ──────────────────────────────── */}
      {tab === 'papers' && (
        filteredPapers.length === 0 ? (
          <p className="ts-empty">No papers matched your filters.</p>
        ) : (
          <div className="ts-paper-list">
            {filteredPapers.map((paper) => (
              <Link className="ts-paper-row" to={`/pyq/${paper.slug}`} key={paper.slug}>
                <div className="ts-paper-left">
                  <FileText size={15} className="ts-paper-icon" />
                  <div>
                    <strong>{paper.title}</strong>
                    <small>{paper.examName} · {paper.year}{paper.shift ? ` · ${paper.shift}` : ''}</small>
                    {paper.subjects.length > 0 && (
                      <div className="ts-paper-subjects">
                        {paper.subjects.slice(0, 4).map((s) => <span key={s}>{s}</span>)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="ts-paper-right">
                  <span className="ts-paper-count">{paper.questions} Qs</span>
                  <span className="ts-paper-arrow"><ChevronRight size={15} /></span>
                </div>
              </Link>
            ))}
          </div>
        )
      )}
    </div>
  )
}
