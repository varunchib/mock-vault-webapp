import { BookOpen, ChevronRight, Clock3, FileText, Flame, LayoutGrid, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo, useRef, useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { SubjectStrength } from '../components/analytics/SubjectStrength'
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

function shortDate(iso: string) {
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

// ── Score trend chart ─────────────────────────────────────────────────────
// Single series → no legend; the heading names it. 2px line, 10% area wash,
// crosshair + tooltip listing the attempt under the pointer, focusable points.

type TrendPoint = {
  pct: number
  net: number
  max: number
  title: string
  examName: string
  attemptedAt: string
}

function ScoreTrendChart({ points }: { points: TrendPoint[] }) {
  const [active, setActive] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Narrow screens get a narrower viewBox so axis text renders at a readable
  // size instead of scaling down with the SVG.
  const [narrow] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches)

  const W = narrow ? 380 : 720, H = narrow ? 190 : 220
  const PAD = { left: 34, right: 18, top: 16, bottom: 26 }
  const pw = W - PAD.left - PAD.right
  const ph = H - PAD.top - PAD.bottom
  const n = points.length

  const x = (i: number) => PAD.left + (n === 1 ? pw / 2 : (i / (n - 1)) * pw)
  const y = (pct: number) => PAD.top + (1 - pct / 100) * ph

  const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.pct).toFixed(1)}`).join(' ')
  const areaD = n > 1
    ? `${lineD} L ${x(n - 1).toFixed(1)} ${(PAD.top + ph).toFixed(1)} L ${x(0).toFixed(1)} ${(PAD.top + ph).toFixed(1)} Z`
    : ''

  // Date ticks: first, last, and up to 3 evenly spaced between
  const tickIdx = n <= 5
    ? points.map((_, i) => i)
    : [0, Math.round((n - 1) * 0.25), Math.round((n - 1) * 0.5), Math.round((n - 1) * 0.75), n - 1]
  const uniqueTicks = [...new Set(tickIdx)]

  const onMove = (e: React.PointerEvent) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    const i = n === 1 ? 0 : Math.round(((px - PAD.left) / pw) * (n - 1))
    setActive(Math.max(0, Math.min(n - 1, i)))
  }

  const a = active != null ? points[active] : null

  return (
    <div className="an2-trend-wrap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="an2-trend-svg"
        role="img"
        aria-label={`Score trend across ${n} attempts`}
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
      >
        {/* Y gridlines at clean percents */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={PAD.left} y1={y(v)} x2={W - PAD.right} y2={y(v)} stroke="var(--line2)" strokeWidth={1} />
            <text x={PAD.left - 6} y={y(v) + 3} textAnchor="end" fontSize={9} fill="var(--ink4)">{v}%</text>
          </g>
        ))}

        {/* X date ticks */}
        {uniqueTicks.map(i => (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize={9} fill="var(--ink4)">
            {shortDate(points[i].attemptedAt)}
          </text>
        ))}

        {/* Area wash + line */}
        {areaD && <path d={areaD} fill="var(--blue)" opacity={0.08} />}
        <path d={lineD} fill="none" stroke="var(--blue)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {/* Crosshair */}
        {a && active != null && (
          <line x1={x(active)} y1={PAD.top} x2={x(active)} y2={PAD.top + ph} stroke="var(--ink4)" strokeWidth={1} />
        )}

        {/* Points: visible end-dot always; others appear on hover/focus. Each has
            a generous transparent hit/focus target so keyboard gets the tooltip too. */}
        {points.map((p, i) => {
          const isEnd = i === n - 1
          const isActive = active === i
          return (
            <g key={i}>
              {(isEnd || isActive) && (
                <circle cx={x(i)} cy={y(p.pct)} r={4.5} fill="var(--blue)" stroke="var(--white)" strokeWidth={2} />
              )}
              <circle
                cx={x(i)} cy={y(p.pct)} r={14}
                fill="transparent"
                tabIndex={0}
                aria-label={`${p.net}/${p.max} (${p.pct}%) — ${p.title}, ${shortDate(p.attemptedAt)}`}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                style={{ outline: 'none', cursor: 'pointer' }}
              />
            </g>
          )
        })}

        {/* Direct label on the latest attempt */}
        {n > 0 && active == null && (
          <text
            x={Math.min(x(n - 1), W - PAD.right - 4)}
            y={Math.max(y(points[n - 1].pct) - 10, 11)}
            textAnchor="end" fontSize={11} fontWeight={700} fill="var(--ink)"
          >
            {points[n - 1].pct}%
          </text>
        )}
      </svg>

      {a && (
        <div className="an2-trend-tip" style={{ left: `${(x(active!) / W) * 100}%` }}>
          <strong>{a.net}/{a.max} · {a.pct}%</strong>
          <span>{a.title}</span>
          <span className="an2-trend-tip-meta">{a.examName} · {shortDate(a.attemptedAt)}</span>
        </div>
      )}
    </div>
  )
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
    return [...base].sort(
      (a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
    )
  }, [source])

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
