import { BarChart3, BookOpen, CheckCircle2, ChevronRight, Clock3, FileText, LayoutGrid, Search, Target, TrendingUp, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { readAttemptResults, readPaperResults, type SubjectResult } from '../lib/mockActivity'
import { estimatePercentile, getCutoffComparison } from '../data/examCutoffs'

// ── Unified shape ─────────────────────────────────────────────────────────
type CombinedResult = {
  type: 'mock' | 'paper'
  slug: string
  examSlug: string
  examName: string
  title: string
  totalQuestions: number
  attemptedAt: string
  answered: number
  correct: number
  wrong: number
  skipped: number
  timeTakenSeconds: number
  subjects: SubjectResult[]
}

// ── Helpers ───────────────────────────────────────────────────────────────
function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

function relativeDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function accuracyClass(pct: number) {
  return pct >= 70 ? 'good' : pct >= 50 ? 'mid' : 'bad'
}

function barColor(pct: number) {
  return pct >= 70 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626'
}

// ── Subject bars ──────────────────────────────────────────────────────────
function SubjectBars({ subjects }: { subjects: SubjectResult[] }) {
  if (subjects.length === 0) return null
  return (
    <div className="an-subject-bars">
      {subjects.map((s) => {
        const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
        const color = barColor(pct)
        return (
          <div className="an-subject-row" key={s.subject}>
            <span className="an-subject-name" title={s.subject}>{s.subject}</span>
            <div className="an-bar-track">
              <div className="an-bar-fill" style={{ width: `${pct}%`, background: color }} />
            </div>
            <span className="an-bar-pct" style={{ color }}>{pct}%</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Single attempt card ───────────────────────────────────────────────────
function AttemptCard({ result }: { result: CombinedResult }) {
  const accuracy = result.totalQuestions > 0
    ? Math.round((result.correct / result.totalQuestions) * 100)
    : 0
  const pctClass = accuracyClass(accuracy)
  const percentile = estimatePercentile(result.correct, result.totalQuestions, result.examSlug)
  const cutoff = getCutoffComparison(result.correct, result.totalQuestions, result.examSlug)

  return (
    <div className="an-attempt-card">
      <div className="an-card-header">
        <div className={`an-card-score ${pctClass}`}>{accuracy}%</div>
        <div className="an-card-info">
          <strong>{result.title}</strong>
          <div className="an-card-meta">
            <span>
              {result.type === 'mock'
                ? <><LayoutGrid size={11} /> Mock Test</>
                : <><FileText size={11} /> PYQ Paper</>}
            </span>
            <span>{result.examName}</span>
            <span><Clock3 size={11} /> {formatTime(result.timeTakenSeconds)}</span>
            <span>{relativeDate(result.attemptedAt)}</span>
          </div>
          <div className="an-card-chips">
            <span className="an-chip green"><CheckCircle2 size={11} /> {result.correct} Correct</span>
            <span className="an-chip red"><XCircle size={11} /> {result.wrong} Wrong</span>
            <span className="an-chip yellow">{result.skipped} Skipped</span>
            {percentile > 0 && (
              <span className="an-chip purple"><TrendingUp size={11} /> ~{percentile}th pct.</span>
            )}
          </div>
        </div>
      </div>

      <div className="an-card-body">
        {result.subjects.length > 0 && <SubjectBars subjects={result.subjects} />}

        {cutoff && (
          <div className={`an-cutoff-row ${cutoff.cleared ? 'cleared' : 'missed'}`}>
            <span>
              {cutoff.cleared ? '✅' : '❌'}{' '}
              {cutoff.examName} {cutoff.stage} cutoff — your score{' '}
              <strong>{cutoff.userScore}/{cutoff.totalMarks}</strong>
              {' '}vs General <strong>{cutoff.cutoff}</strong>
            </span>
            <span className="an-cutoff-pct">
              {Math.round((cutoff.userScore / cutoff.cutoff) * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Subject mastery ───────────────────────────────────────────────────────
function MasteryPanel({ results }: { results: CombinedResult[] }) {
  const subjects = useMemo(() => {
    const map = new Map<string, { total: number; correct: number; wrong: number; skipped: number }>()
    for (const r of results) {
      for (const s of r.subjects) {
        const prev = map.get(s.subject) ?? { total: 0, correct: 0, wrong: 0, skipped: 0 }
        map.set(s.subject, {
          total:   prev.total   + s.total,
          correct: prev.correct + s.correct,
          wrong:   prev.wrong   + s.wrong,
          skipped: prev.skipped + s.skipped,
        })
      }
    }
    return Array.from(map.entries())
      .map(([name, d]) => ({ name, ...d, pct: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0 }))
      .sort((a, b) => b.pct - a.pct)
  }, [results])

  if (subjects.length === 0) return null

  return (
    <div className="an-mastery-panel">
      <h2>Subject Mastery</h2>
      <p>Aggregated across all mock tests and PYQ papers</p>
      <div className="an-mastery-grid">
        {subjects.map((s) => {
          const cls = accuracyClass(s.pct)
          const color = barColor(s.pct)
          return (
            <div className="an-mastery-card" key={s.name}>
              <div className="an-mastery-card-head">
                <span title={s.name}>{s.name}</span>
                <span className={`an-mastery-score ${cls}`}>{s.pct}%</span>
              </div>
              <div className="an-mastery-bar">
                <div className="an-mastery-bar-fill" style={{ width: `${s.pct}%`, background: color }} />
              </div>
              <span className="an-mastery-detail">
                {s.correct}✓ · {s.wrong}✗ · {s.skipped} skipped / {s.total} total
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Exam cards section ────────────────────────────────────────────────────

type ExamGroup = {
  examSlug: string
  examName: string
  count: number
  avgAcc: number
  lastAttemptedAt: string
}

function ExamCards({ allResults }: { allResults: CombinedResult[] }) {
  const [search, setSearch] = useState('')

  const groups = useMemo<ExamGroup[]>(() => {
    // allResults is newest-first; iterate to build groups
    const map = new Map<string, { name: string; count: number; totalAcc: number; last: string }>()
    for (const r of allResults) {
      const acc = r.totalQuestions > 0 ? (r.correct / r.totalQuestions) * 100 : 0
      const prev = map.get(r.examSlug)
      if (!prev) {
        map.set(r.examSlug, { name: r.examName, count: 1, totalAcc: acc, last: r.attemptedAt })
      } else {
        map.set(r.examSlug, {
          name: r.examName,
          count: prev.count + 1,
          totalAcc: prev.totalAcc + acc,
          last: r.attemptedAt > prev.last ? r.attemptedAt : prev.last,
        })
      }
    }
    return Array.from(map.entries())
      .map(([slug, d]) => ({
        examSlug: slug,
        examName: d.name,
        count: d.count,
        avgAcc: Math.round(d.totalAcc / d.count),
        lastAttemptedAt: d.last,
      }))
      .sort((a, b) => new Date(b.lastAttemptedAt).getTime() - new Date(a.lastAttemptedAt).getTime())
  }, [allResults])

  const filtered = search.trim()
    ? groups.filter(g =>
        g.examName.toLowerCase().includes(search.toLowerCase()) ||
        g.examSlug.includes(search.toLowerCase()),
      )
    : groups

  if (groups.length === 0) return null

  return (
    <div className="an-exam-section">
      <div className="an-exam-section-head">
        <div>
          <h2>Your Exams</h2>
          <p>Select an exam for a detailed analytics breakdown</p>
        </div>
        <label className="an-exam-search">
          <Search size={13} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search exams…"
          />
        </label>
      </div>
      <div className="an-exam-grid">
        {filtered.map(g => (
          <Link key={g.examSlug} to={`/analytics/${g.examSlug}`} className="an-exam-card">
            <div className="an-exam-card-icon">
              {g.examName.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase().slice(0, 3)}
            </div>
            <div className="an-exam-card-body">
              <strong>{g.examName}</strong>
              <span>{g.count} attempt{g.count !== 1 ? 's' : ''}</span>
            </div>
            <div className={`an-exam-card-score ${g.avgAcc >= 70 ? 'good' : g.avgAcc >= 50 ? 'mid' : 'bad'}`}>
              {g.avgAcc}%
            </div>
            <ChevronRight size={15} className="an-exam-card-arrow" />
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="an-exam-empty">No exams matched "{search}"</p>
        )}
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────
export function AnalyticsPage() {
  usePageMeta({
    title: 'Analytics | Ministry of Papers',
    description: 'Your mock test and PYQ paper performance, subject mastery, and exam cutoff comparisons.',
    canonicalPath: '/analytics',
  })

  const [filter, setFilter] = useState<'all' | 'mock' | 'paper'>('all')

  const allResults = useMemo<CombinedResult[]>(() => {
    const mocks: CombinedResult[] = readAttemptResults().map((r) => ({
      type: 'mock',
      slug: r.mockSlug,
      examSlug: r.examSlug,
      examName: r.examName,
      title: r.mockTitle,
      totalQuestions: r.totalQuestions,
      attemptedAt: r.attemptedAt,
      answered: r.answered,
      correct: r.correct,
      wrong: r.wrong,
      skipped: r.skipped,
      timeTakenSeconds: r.timeTakenSeconds,
      subjects: r.subjects,
    }))
    const papers: CombinedResult[] = readPaperResults().map((r) => ({
      type: 'paper',
      slug: r.paperSlug,
      examSlug: r.examSlug,
      examName: r.examName,
      title: r.paperTitle,
      totalQuestions: r.totalQuestions,
      attemptedAt: r.attemptedAt,
      answered: r.answered,
      correct: r.correct,
      wrong: r.wrong,
      skipped: r.skipped,
      timeTakenSeconds: r.timeTakenSeconds,
      subjects: r.subjects,
    }))
    return [...mocks, ...papers].sort(
      (a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
    )
  }, [])

  const visibleResults = filter === 'all' ? allResults : allResults.filter((r) => r.type === filter)

  const summary = useMemo(() => {
    if (allResults.length === 0) return null
    const totalTime = allResults.reduce((s, r) => s + r.timeTakenSeconds, 0)
    const avgAcc = Math.round(
      allResults.reduce((s, r) => s + (r.totalQuestions > 0 ? (r.correct / r.totalQuestions) * 100 : 0), 0)
      / allResults.length
    )
    const percentiles = allResults
      .map((r) => estimatePercentile(r.correct, r.totalQuestions, r.examSlug))
      .filter((p) => p > 0)
    const avgPercentile = percentiles.length > 0
      ? Math.round(percentiles.reduce((s, p) => s + p, 0) / percentiles.length)
      : 0
    const mockCount  = allResults.filter((r) => r.type === 'mock').length
    const paperCount = allResults.filter((r) => r.type === 'paper').length
    return { totalTime, avgAcc, avgPercentile, mockCount, paperCount }
  }, [allResults])

  return (
    <section className="an-page workspace-page">
      <header className="an-header">
        <div className="an-header-left">
          <small>Analytics</small>
          <h1>Performance Report</h1>
          <p>Mock tests and PYQ papers — scores, subject breakdown, and cutoff comparison.</p>
        </div>
      </header>

      {/* Summary strip */}
      {summary && (
        <div className="an-summary-strip">
          <div className="an-summary-card">
            <span className="an-summary-icon"><LayoutGrid size={16} /></span>
            <strong>{summary.mockCount}</strong>
            <span>Mock Tests</span>
          </div>
          <div className="an-summary-card">
            <span className="an-summary-icon"><FileText size={16} /></span>
            <strong>{summary.paperCount}</strong>
            <span>PYQ Papers</span>
          </div>
          <div className="an-summary-card">
            <span className="an-summary-icon"><Target size={16} /></span>
            <strong>{summary.avgAcc}%</strong>
            <span>Avg Accuracy</span>
          </div>
          <div className="an-summary-card">
            <span className="an-summary-icon"><BarChart3 size={16} /></span>
            <strong>{summary.avgPercentile > 0 ? `~${summary.avgPercentile}th` : '—'}</strong>
            <span>Avg Percentile</span>
          </div>
        </div>
      )}

      {/* Exam cards */}
      {allResults.length > 0 && <ExamCards allResults={allResults} />}

      {/* Filter tabs */}
      {allResults.length > 0 && (
        <div className="ts-tabs" style={{ width: 'fit-content' }}>
          {(['all', 'mock', 'paper'] as const).map((f) => (
            <button
              key={f}
              type="button"
              className={`ts-tab${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'mock' ? 'Mock Tests' : 'PYQ Papers'}
              <span className="ts-tab-count">
                {f === 'all' ? allResults.length
                  : f === 'mock' ? allResults.filter((r) => r.type === 'mock').length
                  : allResults.filter((r) => r.type === 'paper').length}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {allResults.length === 0 && (
        <div className="an-empty">
          <BookOpen size={40} strokeWidth={1.5} />
          <strong>No results yet</strong>
          <p>
            Attempt a mock test or a PYQ paper and your score, subject breakdown,
            and cutoff comparison will appear here.
          </p>
          <Link to="/exams" className="an-empty-btn">
            Browse Tests &amp; Papers
          </Link>
        </div>
      )}

      {/* Filtered empty */}
      {allResults.length > 0 && visibleResults.length === 0 && (
        <div className="an-empty">
          <BookOpen size={32} strokeWidth={1.5} />
          <strong>No {filter === 'mock' ? 'mock test' : 'PYQ paper'} results yet</strong>
          <p>Switch to "All" or attempt one to see results here.</p>
        </div>
      )}

      {/* Attempt cards */}
      {visibleResults.length > 0 && (
        <div className="an-attempt-list">
          {visibleResults.map((r) => (
            <AttemptCard key={`${r.type}-${r.slug}-${r.attemptedAt}`} result={r} />
          ))}
        </div>
      )}

      {/* Subject mastery — always aggregates all results regardless of filter */}
      {allResults.length > 0 && <MasteryPanel results={allResults} />}
    </section>
  )
}
