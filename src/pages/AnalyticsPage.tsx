import { BookOpen, ChevronRight, Clock3, FileText, Flame, LayoutGrid, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { SubjectStrength } from '../components/analytics/SubjectStrength'
import { ScoreTrendChart, type TrendPoint } from '../components/analytics/ScoreTrendChart'
import { fetchExamCatalog, fetchPaperCatalog, type Exam, type Paper } from '../lib/api'
import { remapToPaperExam } from '../lib/remapExam'
import { readAttemptResults, readPaperResults, type CombinedResult } from '../lib/mockActivity'

type SourceFilter = 'all' | 'mock' | 'paper'

// ── shared helpers ────────────────────────────────────────────────────────

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return `${seconds}s`
}

function relativeDate(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function scoreClass(pct: number) {
  return pct >= 70 ? 'good' : pct >= 50 ? 'mid' : 'bad'
}

/** Net marks + max marks for one attempt, honouring negative marking. */
function netMarks(r: CombinedResult) {
  const max = (r.maxMarks ?? 0) > 0 ? r.maxMarks! : r.totalQuestions
  const perQ = max / r.totalQuestions
  const net = r.rawScore ?? parseFloat((r.correct * perQ - r.wrong * (r.negativeMarking ?? 0)).toFixed(2))
  return { net, max, pct: max > 0 ? Math.max(0, Math.round((net / max) * 100)) : 0 }
}

// ── Page ──────────────────────────────────────────────────────────────────

export type AnalyticsSource = {
  results: CombinedResult[]
  linkBase: string
  header: { eyebrow: string; title: string; subtitle: string }
}

export function AnalyticsPage({ source }: { source?: AnalyticsSource } = {}) {
  usePageMeta({
    title: source ? 'User Analytics · Admin' : 'Analytics | Ministry of Papers',
    description: 'Your mock test and PYQ paper performance, score trend, and exam-wise analytics.',
    canonicalPath: source ? undefined : '/analytics',
  })

  const linkBase = source?.linkBase ?? '/analytics'
  const [filter, setFilter] = useState<SourceFilter>('all')

  // Attempts store a snapshot of the exam at attempt time — old records carry
  // the board ("JKPSC") instead of the actual exam ("JKCCE"). The catalogs are
  // the source of truth: re-attribute every paper attempt to its paper's
  // current exam and show that exam's shortName. Both Redis-cached server-side.
  const [catalogExams, setCatalogExams] = useState<Exam[]>([])
  const [catalogPapers, setCatalogPapers] = useState<Paper[]>([])
  useEffect(() => {
    let cancelled = false
    fetchExamCatalog().then(e => { if (!cancelled) setCatalogExams(e ?? []) }).catch(() => undefined)
    fetchPaperCatalog().then(p => { if (!cancelled) setCatalogPapers(p ?? []) }).catch(() => undefined)
    return () => { cancelled = true }
  }, [])

  const allResults = useMemo<CombinedResult[]>(() => {
    const base: CombinedResult[] = source
      ? source.results
      : [
          ...readAttemptResults().map((r): CombinedResult => ({
            type: 'mock', slug: r.mockSlug, examSlug: r.examSlug, examName: r.examName,
            title: r.mockTitle, totalQuestions: r.totalQuestions, attemptedAt: r.attemptedAt,
            answered: r.answered, correct: r.correct, wrong: r.wrong, skipped: r.skipped,
            rawScore: r.rawScore, timeTakenSeconds: r.timeTakenSeconds, subjects: r.subjects,
          })),
          ...readPaperResults().map((r): CombinedResult => ({
            type: 'paper', slug: r.paperSlug, examSlug: r.examSlug, examName: r.examName,
            title: r.paperTitle, totalQuestions: r.totalQuestions, attemptedAt: r.attemptedAt,
            answered: r.answered, correct: r.correct, wrong: r.wrong, skipped: r.skipped,
            rawScore: r.rawScore, timeTakenSeconds: r.timeTakenSeconds, subjects: r.subjects,
          })),
        ]
    return remapToPaperExam(base, catalogPapers, catalogExams).sort(
      (a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
    )
  }, [source, catalogPapers, catalogExams])

  // The Mocks/PYQ filter scopes everything below it — tiles, trend, subjects,
  // exams, and recents all describe the same slice.
  const results = useMemo(
    () => (filter === 'all' ? allResults : allResults.filter(r => r.type === filter)),
    [allResults, filter],
  )
  const mockCount = useMemo(() => allResults.filter(r => r.type === 'mock').length, [allResults])
  const paperCount = allResults.length - mockCount

  const examGroups = useMemo(() => {
    const map = new Map<string, { examSlug: string; examName: string; results: CombinedResult[] }>()
    for (const r of results) {
      if (!map.has(r.examSlug)) map.set(r.examSlug, { examSlug: r.examSlug, examName: r.examName, results: [] })
      map.get(r.examSlug)!.results.push(r)
    }
    return [...map.values()]
  }, [results])

  const summary = useMemo(() => {
    if (!results.length) return null
    const totalTime = results.reduce((s, r) => s + r.timeTakenSeconds, 0)
    const best = results.reduce<{ marks: ReturnType<typeof netMarks>; r: CombinedResult } | null>((acc, r) => {
      const m = netMarks(r)
      return !acc || m.pct > acc.marks.pct ? { marks: m, r } : acc
    }, null)
    return { totalTime, best, examCount: examGroups.length, attemptCount: results.length }
  }, [results, examGroups])

  const trendPoints = useMemo<TrendPoint[]>(
    () => [...results]
      .sort((x, z) => new Date(x.attemptedAt).getTime() - new Date(z.attemptedAt).getTime())
      .map(r => {
        const m = netMarks(r)
        return { pct: m.pct, net: m.net, max: m.max, title: r.title, examName: r.examName, attemptedAt: r.attemptedAt }
      }),
    [results],
  )

  return (
    <section className="an-page workspace-page">
      <header className="an-header">
        <div className="an-header-left">
          <small>{source?.header.eyebrow ?? 'Analytics'}</small>
          <h1>{source?.header.title ?? 'Performance Report'}</h1>
          <p>{source?.header.subtitle ?? 'Your score trend across every attempt. Click an exam for cutoffs and the leaderboard.'}</p>
        </div>
      </header>

      {allResults.length === 0 && (
        <div className="an-empty">
          <BookOpen size={40} strokeWidth={1.5} />
          <strong>No results yet</strong>
          <p>Attempt a mock test or a PYQ paper — your scores, cutoff comparison, and leaderboard will appear here.</p>
          <Link to="/exams" className="an-empty-btn">Browse Tests &amp; Papers</Link>
        </div>
      )}

      {/* Mocks vs PYQ scope — one control, everything below follows it */}
      {allResults.length > 0 && (
        <div className="an2-filter-row" role="tablist" aria-label="Attempt type">
          {([
            ['all', `All (${allResults.length})`],
            ['mock', `Mock Tests (${mockCount})`],
            ['paper', `PYQ Papers (${paperCount})`],
          ] as [SourceFilter, string][]).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              className={`an2-filter-btn${filter === key ? ' active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {allResults.length > 0 && !summary && (
        <div className="an2-filter-empty">
          No {filter === 'mock' ? 'mock test' : 'PYQ paper'} attempts yet.
        </div>
      )}

      {summary && (
        <>
          {/* Stat tiles — only numbers that always mean something */}
          <div className="an2-tiles">
            <div className="an2-tile">
              <span className="an2-tile-label"><FileText size={13} /> Attempts</span>
              <strong className="an2-tile-value">{summary.attemptCount}</strong>
            </div>
            <div className="an2-tile">
              <span className="an2-tile-label"><LayoutGrid size={13} /> Exams</span>
              <strong className="an2-tile-value">{summary.examCount}</strong>
            </div>
            <div className="an2-tile">
              <span className="an2-tile-label"><Clock3 size={13} /> Practice time</span>
              <strong className="an2-tile-value">{formatTime(summary.totalTime)}</strong>
            </div>
            {summary.best && (
              <div className="an2-tile">
                <span className="an2-tile-label"><Flame size={13} /> Best score</span>
                <strong className={`an2-tile-value ${scoreClass(summary.best.marks.pct)}`}>
                  {summary.best.marks.net}<em>/{summary.best.marks.max}</em>
                </strong>
                <span className="an2-tile-sub">{summary.best.r.examName}</span>
              </div>
            )}
          </div>

          {/* Exam rows */}
          <div className="an2-panel">
            <div className="an2-panel-head">
              <div>
                <h2>By exam</h2>
                <p>Cutoff position and leaderboard live inside each exam</p>
              </div>
            </div>
            <div className="an2-exam-list">
              {examGroups.map(g => {
                const marks = g.results.map(netMarks)
                const best = marks.reduce((a, b) => (b.pct > a.pct ? b : a))
                const avgPct = Math.round(marks.reduce((s, m) => s + m.pct, 0) / marks.length)
                return (
                  <Link key={g.examSlug} to={`${linkBase}/${g.examSlug}`} className="an2-exam-row">
                    <div className="an2-exam-main">
                      <strong>{g.examName}</strong>
                      <span>{g.results.length} attempt{g.results.length !== 1 ? 's' : ''} · last {relativeDate(g.results[0].attemptedAt)}</span>
                    </div>
                    <div className="an2-exam-meter" title={`Average ${avgPct}%`}>
                      <div className="an2-exam-meter-fill" style={{ width: `${avgPct}%` }} />
                    </div>
                    <span className={`an2-exam-best ${scoreClass(best.pct)}`}>{best.net}<em>/{best.max}</em></span>
                    <ChevronRight size={15} className="an2-exam-chev" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Score trend */}
          <div className="an2-panel">
            <div className="an2-panel-head">
              <div>
                <h2>Score trend</h2>
                <p>Net score as % of maximum marks, every attempt in order</p>
              </div>
            </div>
            {trendPoints.length >= 2 ? (
              <ScoreTrendChart points={trendPoints} />
            ) : (
              <div className="an2-trend-single">
                <TrendingUp size={18} />
                One attempt so far — your trend line starts at the second attempt.
              </div>
            )}
          </div>

          {/* Per-subject accuracy — where you're strong and where you lack */}
          <SubjectStrength results={results} />

          {/* Recent attempts */}
          <div className="an2-panel">
            <div className="an2-panel-head">
              <div>
                <h2>Recent attempts</h2>
              </div>
            </div>
            <div className="an2-recent-list">
              {results.slice(0, 6).map(r => {
                const m = netMarks(r)
                return (
                  <div key={`${r.type}-${r.slug}-${r.attemptedAt}`} className="an2-recent-row">
                    <span className={`an2-recent-score ${scoreClass(m.pct)}`}>{m.pct}%</span>
                    <div className="an2-recent-main">
                      <strong>{r.title}</strong>
                      <span>{r.examName} · {r.type === 'mock' ? 'Mock' : 'PYQ'} · {m.net}/{m.max}</span>
                    </div>
                    <span className="an2-recent-date">{relativeDate(r.attemptedAt)}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
