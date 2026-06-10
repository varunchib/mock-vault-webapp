import { ArrowLeft, Clock3, Medal, Target, TrendingUp } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { analyticsSeoTitle, analyticsSeoDescription } from '../lib/pageTitles'
import { readAllResults } from '../lib/mockActivity'
import { examCutoffs, estimatePercentile } from '../data/examCutoffs'
import { fetchExamCutoffs, fetchLeaderboard, type ExamCutoffSet, type LeaderboardEntry } from '../lib/api'
import { useAuth } from '../context/useAuth'

// ── Constants ─────────────────────────────────────────────────────────────

const POOL: Record<string, number> = {
  'upsc-cse': 900000, 'ssc-cgl': 3000000, 'ssc-chsl': 1500000,
  'ibps-po': 1000000, 'ibps-clerk': 1500000, 'sbi-po': 800000,
  'sbi-clerk': 700000, 'rrb-ntpc': 3000000, 'neet-ug': 2000000,
}

// ── Helpers ───────────────────────────────────────────────────────────────

function fmtTime(s: number) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return `${s}s`
}

function scoreClass(pct: number): 'good' | 'mid' | 'bad' {
  return pct >= 70 ? 'good' : pct >= 50 ? 'mid' : 'bad'
}

function normalPdf(x: number, mean: number, std: number) {
  return Math.exp(-0.5 * ((x - mean) / std) ** 2) / (std * Math.sqrt(2 * Math.PI))
}

// ── Score Distribution (bell curve) chart ─────────────────────────────────

type DistChartProps = {
  userScore: number
  totalMarks: number
  avgScore: number
  stdDev: number
  cutoff: number
  cutoffLabel: string
  topperScore?: number
}

function ScoreDistChart({ userScore, totalMarks, avgScore, stdDev, cutoff, cutoffLabel, topperScore }: DistChartProps) {
  const W = 560, H = 200
  const PAD = { left: 36, right: 16, top: 20, bottom: 36 }
  const pw = W - PAD.left - PAD.right
  const ph = H - PAD.top - PAD.bottom

  const xMin = Math.max(0, avgScore - stdDev * 3.2)
  const xMax = Math.min(totalMarks, avgScore + stdDev * 3.2)
  const STEPS = 120
  const step = (xMax - xMin) / STEPS

  const points = Array.from({ length: STEPS + 1 }, (_, i) => {
    const x = xMin + i * step
    return { x, y: normalPdf(x, avgScore, stdDev) }
  })
  const maxY = Math.max(...points.map(p => p.y))

  const toSvgX = (v: number) => PAD.left + ((v - xMin) / (xMax - xMin)) * pw
  const toSvgY = (v: number) => PAD.top + (1 - v / maxY) * ph

  const curvePts = points.map(p => `${toSvgX(p.x).toFixed(1)},${toSvgY(p.y).toFixed(1)}`).join(' L ')
  const curveD = `M ${curvePts}`
  const BOTTOM = PAD.top + ph
  const areaD = `${curveD} L ${toSvgX(xMax).toFixed(1)},${BOTTOM} L ${toSvgX(xMin).toFixed(1)},${BOTTOM} Z`

  // Above-cutoff shaded region
  const cutoffX = Math.max(xMin, Math.min(xMax, cutoff))
  const cutoffPts = points
    .filter(p => p.x >= cutoffX)
    .map(p => `${toSvgX(p.x).toFixed(1)},${toSvgY(p.y).toFixed(1)}`)
    .join(' L ')
  const shadeD = cutoffPts
    ? `M ${cutoffPts} L ${toSvgX(xMax).toFixed(1)},${BOTTOM} L ${toSvgX(cutoffX).toFixed(1)},${BOTTOM} Z`
    : ''

  const ux = toSvgX(Math.max(xMin, Math.min(xMax, userScore)))
  const ax = toSvgX(avgScore)
  const cx = toSvgX(cutoffX)
  const tx = topperScore != null ? toSvgX(Math.max(xMin, Math.min(xMax, topperScore))) : null

  const xTicks = [xMin, avgScore, cutoff, userScore, xMax]
    .filter((v, i, arr) => v >= xMin && v <= xMax && arr.indexOf(v) === i)
    .sort((a, b) => a - b)
    .filter((v, i, arr) => i === 0 || Math.abs(toSvgX(v) - toSvgX(arr[i - 1])) > 28)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ea2-dist-svg" aria-hidden="true">
      <defs>
        <linearGradient id="ea2-curve-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="ea2-shade-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Baseline */}
      <line x1={PAD.left} y1={BOTTOM} x2={W - PAD.right} y2={BOTTOM} stroke="#e2e8f0" strokeWidth={1} />

      {/* X-axis ticks */}
      {xTicks.map(v => (
        <g key={v}>
          <line x1={toSvgX(v)} y1={BOTTOM} x2={toSvgX(v)} y2={BOTTOM + 4} stroke="#cbd5e1" strokeWidth={1} />
          <text x={toSvgX(v)} y={BOTTOM + 14} textAnchor="middle" fontSize={8.5} fill="#94a3b8">
            {Math.round(v)}
          </text>
        </g>
      ))}

      {/* Bell curve area */}
      <path d={areaD} fill="url(#ea2-curve-fill)" />
      <path d={curveD} fill="none" stroke="#94a3b8" strokeWidth={1.5} />

      {/* Above-cutoff shaded zone */}
      {shadeD && <path d={shadeD} fill="url(#ea2-shade-fill)" />}

      {/* Cutoff marker */}
      <line x1={cx} y1={PAD.top - 4} x2={cx} y2={BOTTOM} stroke="#ef4444" strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={cx} y={PAD.top - 7} textAnchor="middle" fontSize={8.5} fill="#ef4444" fontWeight={700}>
        {cutoffLabel} {Math.round(cutoff)}
      </text>

      {/* Average marker */}
      <line x1={ax} y1={PAD.top - 4} x2={ax} y2={BOTTOM} stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={ax} y={PAD.top - 7} textAnchor="middle" fontSize={8.5} fill="#f59e0b" fontWeight={600}>
        Avg {Math.round(avgScore)}
      </text>

      {/* Topper marker */}
      {tx != null && topperScore != null && (
        <>
          <line x1={tx} y1={PAD.top - 4} x2={tx} y2={BOTTOM} stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 3" />
          <circle cx={tx} cy={PAD.top - 4} r={3} fill="#10b981" />
          <text x={tx} y={PAD.top - 10} textAnchor="middle" fontSize={8.5} fill="#10b981" fontWeight={700}>
            Top {Math.round(topperScore)}
          </text>
        </>
      )}

      {/* User marker */}
      <line x1={ux} y1={PAD.top - 4} x2={ux} y2={BOTTOM} stroke="#3b82f6" strokeWidth={2} />
      <circle cx={ux} cy={PAD.top - 4} r={3.5} fill="#3b82f6" />
      <text x={ux} y={PAD.top - 10} textAnchor="middle" fontSize={8.5} fill="#3b82f6" fontWeight={800}>
        You {Math.round(userScore)}
      </text>
    </svg>
  )
}

// ── Leaderboard panel ─────────────────────────────────────────────────────

const MEDALS = ['🥇', '🥈', '🥉']

function LeaderboardPanel({
  top10, userRank, userName,
}: { top10: LeaderboardEntry[]; userRank: number; userName: string }) {
  const userInTop10 = top10.some(e => e.isMe)
  const pool = 0

  return (
    <div className="ea2-lb-panel">
      <div className="ea2-lb-header">
        <Medal size={15} />
        <span>Leaderboard</span>
      </div>

      {top10.length === 0 ? (
        <div className="ea2-lb-empty">No attempts yet</div>
      ) : (
        <ol className="ea2-lb-list">
          {top10.map((entry) => (
            <li
              key={entry.userId}
              className={`ea2-lb-row${entry.isMe ? ' ea2-lb-row--me' : ''}`}
            >
              <span className="ea2-lb-rank">
                {entry.rank <= 3 ? MEDALS[entry.rank - 1] : entry.rank}
              </span>
              <span className="ea2-lb-name" title={entry.name}>{entry.name}</span>
              <span className="ea2-lb-score">{entry.scorePct}%</span>
              {entry.isMe && <span className="ea2-lb-you">You</span>}
            </li>
          ))}
        </ol>
      )}

      {!userInTop10 && userRank > 0 && (
        <>
          <div className="ea2-lb-sep" />
          <div className="ea2-lb-row ea2-lb-row--me ea2-lb-row--user">
            <span className="ea2-lb-rank">{userRank.toLocaleString('en-IN')}</span>
            <span className="ea2-lb-name" title={userName}>{userName}</span>
            <span className="ea2-lb-you">You</span>
          </div>
        </>
      )}

      {pool > 0 && userRank > 0 && (
        <p className="ea2-lb-pool">
          Rank {userRank.toLocaleString('en-IN')} of ~{(pool / 100000).toFixed(0)}L candidates
        </p>
      )}
    </div>
  )
}

// ── Attempt history row ───────────────────────────────────────────────────

function HistoryCard({ r, examSlug }: {
  r: ReturnType<typeof readAllResults>[0]
  examSlug: string
}) {
  const pct = r.totalQuestions > 0 ? Math.round((r.correct / r.totalQuestions) * 100) : 0
  const pctile = estimatePercentile(r.correct, r.totalQuestions, examSlug)
  return (
    <div className="ea2-hist-card">
      <div className="ea2-hist-card-top">
        <span className={`ea2-hist-score ${scoreClass(pct)}`}>{pct}%</span>
        {pctile > 0 && <span className="ea2-hist-pctile">~{pctile}th</span>}
      </div>
      <strong className="ea2-hist-card-title">{r.title}</strong>
      <span className="ea2-hist-card-meta">
        {r.type === 'mock' ? 'Mock Test' : 'PYQ Paper'}
        {' · '}
        {new Date(r.attemptedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </span>
      <div className="ea2-hist-card-stats">
        <span className="ea2-hist-cs ea2-hist-cs--c">{r.correct} Correct</span>
        <span className="ea2-hist-cs ea2-hist-cs--w">{r.wrong} Wrong</span>
        <span className="ea2-hist-cs ea2-hist-cs--s">{r.skipped} Skipped</span>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────

export function ExamAnalyticsPage() {
  const { examSlug = '' } = useParams<{ examSlug: string }>()
  const { user } = useAuth()

  const results = useMemo(() => examSlug ? readAllResults(examSlug) : [], [examSlug])
  const examName = results[0]?.examName ?? examSlug

  const [apiCutoffs, setApiCutoffs] = useState<ExamCutoffSet[] | null>(null)
  const [leaderboard, setLeaderboard] = useState<{ top10: LeaderboardEntry[]; userRank: number } | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('General')

  useEffect(() => {
    if (!examSlug) return
    fetchExamCutoffs(examSlug).then(setApiCutoffs).catch(() => setApiCutoffs([]))
    fetchLeaderboard(examSlug).then(setLeaderboard).catch(() => setLeaderboard({ top10: [], userRank: -1 }))
  }, [examSlug])

  const recentFirst = useMemo(
    () => [...results].sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()),
    [results],
  )

  const summary = useMemo(() => {
    if (!results.length) return null
    const totalTime = results.reduce((s, r) => s + r.timeTakenSeconds, 0)
    const avgAccPct = Math.round(results.reduce((s, r) => s + (r.totalQuestions > 0 ? (r.correct / r.totalQuestions) * 100 : 0), 0) / results.length)
    const bestPct = Math.max(...results.map(r => r.totalQuestions > 0 ? Math.round((r.correct / r.totalQuestions) * 100) : 0))
    const cut = examCutoffs[examSlug]
    const avgScaledScore = cut
      ? results.reduce((s, r) => s + (r.totalQuestions > 0 ? (r.correct / r.totalQuestions) * cut.totalMarks : 0), 0) / results.length
      : 0
    const percentiles = results.map(r => estimatePercentile(r.correct, r.totalQuestions, examSlug)).filter(p => p > 0)
    const avgPercentile = percentiles.length ? Math.round(percentiles.reduce((s, p) => s + p, 0) / percentiles.length) : 0
    return { totalTime, avgAccPct, bestPct, avgScaledScore, avgPercentile }
  }, [results, examSlug])

  // Merge API + static cutoffs
  const activeCutoff = useMemo(() => {
    if (apiCutoffs && apiCutoffs.length > 0) {
      const set = apiCutoffs[0]
      return {
        stage: set.stage,
        year: set.year,
        totalMarks: set.totalMarks,
        avgScore: set.avgScore ?? examCutoffs[examSlug]?.avgScore ?? 50,
        stdDev: set.stdDev ?? examCutoffs[examSlug]?.stdDev ?? 12,
        cutoffs: set.cutoffs,
      }
    }
    const st = examCutoffs[examSlug]
    if (!st) return null
    return { stage: st.stage, year: st.year, totalMarks: st.totalMarks, avgScore: st.avgScore, stdDev: st.stdDev, cutoffs: st.cutoffs }
  }, [apiCutoffs, examSlug])

  const categories = useMemo(() => activeCutoff?.cutoffs.map(c => c.category) ?? [], [activeCutoff])

  useEffect(() => {
    if (categories.length && !categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0])
    }
  }, [categories, selectedCategory])

  const selectedCutoffVal = activeCutoff?.cutoffs.find(c => c.category === selectedCategory)?.marks ?? 0

  usePageMeta({
    title: analyticsSeoTitle({ examName }),
    description: analyticsSeoDescription({ examName, attempts: results.length, avgAccPct: summary?.avgAccPct }),
    canonicalPath: `/analytics/${examSlug}`,
  })

  if (!examSlug) return <Navigate to="/analytics" replace />
  if (!results.length || !summary) return <Navigate to={`/exam/${examSlug}`} replace />

  const pool = POOL[examSlug] ?? 0
  const poolLabel = pool >= 1000000 ? `${(pool / 100000).toFixed(0)}L` : pool >= 1000 ? `${(pool / 1000).toFixed(0)}K` : ''

  return (
    <section className="ea2-page workspace-page">

      {/* ── Header ─────────────────────────────────── */}
      <header className="ea2-header">
        <Link to="/analytics" className="ea2-back">
          <ArrowLeft size={14} /> Analytics
        </Link>
        <div className="ea2-header-body">
          <h1>{examName}</h1>
          <p>{results.length} attempt{results.length !== 1 ? 's' : ''} · {activeCutoff?.stage ?? ''} {activeCutoff?.year ?? ''}</p>
        </div>
      </header>

      {/* ── Summary strip ──────────────────────────── */}
      <div className="ea2-strip">
        <div className="ea2-strip-card">
          <span className="ea2-strip-icon"><Target size={14} /></span>
          <strong className={scoreClass(summary.avgAccPct)}>{summary.avgAccPct}%</strong>
          <span>Avg Accuracy</span>
        </div>
        <div className="ea2-strip-card">
          <span className="ea2-strip-icon"><TrendingUp size={14} /></span>
          <strong className={scoreClass(summary.bestPct)}>{summary.bestPct}%</strong>
          <span>Best Score</span>
        </div>
        <div className="ea2-strip-card">
          <span className="ea2-strip-icon"><Medal size={14} /></span>
          <strong>{summary.avgPercentile > 0 ? `~${summary.avgPercentile}th` : '—'}</strong>
          <span>Avg Percentile</span>
        </div>
        <div className="ea2-strip-card">
          <span className="ea2-strip-icon"><Clock3 size={14} /></span>
          <strong>{fmtTime(summary.totalTime)}</strong>
          <span>Total Time</span>
        </div>
      </div>

      {/* ── Main content: chart + leaderboard ──────── */}
      <div className="ea2-main-row">

        {/* Centre: position chart */}
        <div className="ea2-chart-panel">
          <div className="ea2-chart-heading">
            <div>
              <h2>Score Position</h2>
              <p>Where you stand relative to the average and cutoff</p>
            </div>
            {activeCutoff && (
              <span className="ea2-chart-meta">{activeCutoff.stage} · {activeCutoff.year}</span>
            )}
          </div>

          {/* Category tabs */}
          {categories.length > 0 && (
            <div className="ea2-cat-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`ea2-cat-tab${selectedCategory === cat ? ' active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Bell curve */}
          {activeCutoff && summary.avgScaledScore > 0 ? (
            <ScoreDistChart
              userScore={summary.avgScaledScore}
              totalMarks={activeCutoff.totalMarks}
              avgScore={activeCutoff.avgScore}
              stdDev={activeCutoff.stdDev}
              cutoff={selectedCutoffVal}
              cutoffLabel={selectedCategory}
              topperScore={
                leaderboard?.top10?.length
                  ? (leaderboard.top10[0].scorePct / 100) * activeCutoff.totalMarks
                  : undefined
              }
            />
          ) : (
            <div className="ea2-chart-placeholder">
              No cutoff data available for this exam yet.
            </div>
          )}

          {/* Legend */}
          {activeCutoff && (
            <div className="ea2-legend">
              <span className="ea2-legend-item ea2-legend--you">
                <span className="ea2-legend-line" />
                Your avg score
              </span>
              <span className="ea2-legend-item ea2-legend--avg">
                <span className="ea2-legend-line" />
                Average score
              </span>
              <span className="ea2-legend-item ea2-legend--cut">
                <span className="ea2-legend-line ea2-legend-line--dash" />
                {selectedCategory} cutoff
              </span>
              <span className="ea2-legend-item ea2-legend--zone">
                <span className="ea2-legend-dot-fill" />
                Above cutoff zone
              </span>
              {leaderboard?.top10?.length ? (
                <span className="ea2-legend-item ea2-legend--topper">
                  <span className="ea2-legend-line" />
                  Topper score
                </span>
              ) : null}
            </div>
          )}

          {/* User vs cutoff callout */}
          {activeCutoff && summary.avgScaledScore > 0 && selectedCutoffVal > 0 && (
            <div className={`ea2-verdict ${summary.avgScaledScore >= selectedCutoffVal ? 'pass' : 'fail'}`}>
              {summary.avgScaledScore >= selectedCutoffVal ? '✓' : '✗'}
              {' '}Your avg score <strong>{Math.round(summary.avgScaledScore * 10) / 10}</strong>
              {' '}{summary.avgScaledScore >= selectedCutoffVal ? 'clears' : 'misses'} the{' '}
              <strong>{selectedCategory}</strong> cutoff of <strong>{selectedCutoffVal}</strong>
              {' '}/ {activeCutoff.totalMarks}
            </div>
          )}

          {/* Percentile + rank estimate */}
          {summary.avgPercentile > 0 && (
            <div className="ea2-rank-estimate">
              <span>~{summary.avgPercentile}th percentile</span>
              {pool > 0 && (
                <span>
                  Est. rank <strong>~{Math.max(1, Math.round(((100 - summary.avgPercentile) / 100) * pool)).toLocaleString('en-IN')}</strong>
                  {' '}/ {poolLabel}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right: leaderboard */}
        <LeaderboardPanel
          top10={leaderboard?.top10 ?? []}
          userRank={leaderboard?.userRank ?? -1}
          userName={user?.name ?? 'You'}
        />
      </div>

      {/* ── Attempt history ─────────────────────────── */}
      <div className="ea2-history">
        <h2>Attempt History</h2>
        <div className="ea2-hist-list">
          {recentFirst.map((r) => (
            <HistoryCard
              key={`${r.type}-${r.slug}-${r.attemptedAt}`}
              r={r}
              examSlug={examSlug}
            />
          ))}
        </div>
      </div>

    </section>
  )
}
