import {
  ArrowLeft, BarChart3, CheckCircle2, Clock3, Target, TrendingUp, XCircle,
} from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { readAllResults } from '../lib/mockActivity'
import { examCutoffs, estimatePercentile } from '../data/examCutoffs'
import { fetchExamCutoffs, type ExamCutoffSet } from '../lib/api'

// ── Constants ─────────────────────────────────────────────────────────────

const POOL: Record<string, number> = {
  'upsc-cse': 900000, 'ssc-cgl': 3000000, 'ssc-chsl': 1500000,
  'ibps-po': 1000000, 'ibps-clerk': 1500000, 'sbi-po': 800000,
  'sbi-clerk': 700000, 'rrb-ntpc': 3000000, 'neet-ug': 2000000,
}

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1',
]

// ── Helpers ───────────────────────────────────────────────────────────────

function fmtTime(s: number) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m`
  return `${s}s`
}

function scoreColor(pct: number) {
  return pct >= 70 ? '#16a34a' : pct >= 50 ? '#d97706' : '#dc2626'
}

function scoreClass(pct: number): 'good' | 'mid' | 'bad' {
  return pct >= 70 ? 'good' : pct >= 50 ? 'mid' : 'bad'
}

// ── SVG: Score trend line chart ───────────────────────────────────────────

function ScoreTrendChart({ results }: { results: ReturnType<typeof readAllResults> }) {
  if (results.length === 0) return null

  const W = 400, H = 190
  const pad = { left: 38, right: 16, top: 22, bottom: 36 }
  const pw = W - pad.left - pad.right
  const ph = H - pad.top - pad.bottom

  const scores = results.map(r =>
    r.totalQuestions > 0 ? Math.round((r.correct / r.totalQuestions) * 100) : 0
  )
  const n = scores.length

  const ptX = (i: number) => pad.left + (n === 1 ? pw / 2 : (i / (n - 1)) * pw)
  const ptY = (s: number) => pad.top + (1 - s / 100) * ph

  const pts = scores.map((s, i) => `${ptX(i).toFixed(1)},${ptY(s).toFixed(1)}`)
  const linePath = `M ${pts.join(' L ')}`
  const BOTTOM = pad.top + ph
  const areaPath = `${linePath} L ${ptX(n - 1).toFixed(1)},${BOTTOM} L ${ptX(0).toFixed(1)},${BOTTOM} Z`

  const labelStep = Math.max(1, Math.ceil(n / 8))
  const trend = n > 1 ? scores[n - 1] - scores[0] : 0

  return (
    <div className="ea-chart-wrap">
      <div className="ea-chart-title">
        Score Trend
        {trend !== 0 && (
          <span className={`ea-trend-badge ${trend > 0 ? 'up' : 'down'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="ea-svg" aria-hidden="true">
        <defs>
          <linearGradient id="ea-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
          </linearGradient>
          <linearGradient id="ea-line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Y-axis grid + labels */}
        {[25, 50, 75, 100].map(y => (
          <g key={y}>
            <line
              x1={pad.left} y1={ptY(y)} x2={W - pad.right} y2={ptY(y)}
              stroke="#f1f5f9" strokeWidth={1}
            />
            <text x={pad.left - 5} y={ptY(y) + 4} textAnchor="end" fontSize={9} fill="#94a3b8">
              {y}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {scores.map((_, i) => {
          if (i % labelStep !== 0 && i !== n - 1) return null
          return (
            <text key={i} x={ptX(i)} y={H - 6} textAnchor="middle" fontSize={9} fill="#94a3b8">
              #{i + 1}
            </text>
          )
        })}

        {/* Area fill (only when multiple points) */}
        {n > 1 && <path d={areaPath} fill="url(#ea-area-grad)" />}

        {/* Line */}
        {n > 1 && (
          <path
            d={linePath} fill="none"
            stroke="url(#ea-line-grad)" strokeWidth={2.5}
            strokeLinecap="round" strokeLinejoin="round"
          />
        )}

        {/* Dots */}
        {scores.map((s, i) => (
          <circle
            key={i}
            cx={ptX(i)} cy={ptY(s)}
            r={n > 12 ? 2.5 : 4}
            fill="#3b82f6" stroke="#fff" strokeWidth={1.5}
          />
        ))}
      </svg>
    </div>
  )
}

// ── SVG: Subject donut chart ──────────────────────────────────────────────

type SubjectStat = { name: string; total: number; correct: number }

function DonutChart({ subjects }: { subjects: SubjectStat[] }) {
  if (subjects.length === 0) return null

  const R = 62, SW = 18, CX = 90, CY = 90
  const circ = 2 * Math.PI * R

  const grand = subjects.reduce((s, sub) => s + sub.total, 0)
  const grandCorrect = subjects.reduce((s, sub) => s + sub.correct, 0)
  const overall = grand > 0 ? Math.round((grandCorrect / grand) * 100) : 0

  // Build segments with cumulative dashoffset
  let cumLen = 0
  const segments = subjects.map((sub, i) => {
    const len = grand > 0 ? (sub.total / grand) * circ : 0
    const seg = {
      len,
      dashOffset: -cumLen,
      color: COLORS[i % COLORS.length],
      name: sub.name,
    }
    cumLen += len
    return seg
  })

  const legendItems = subjects.slice(0, 6)
  const hasMore = subjects.length > 6

  return (
    <div className="ea-chart-wrap">
      <div className="ea-chart-title">Subject Breakdown</div>
      <div className="ea-donut-body">
        <svg viewBox="0 0 180 180" className="ea-donut-svg" aria-hidden="true">
          {/* Background ring */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f1f5f9" strokeWidth={SW} />
          {/* Segments */}
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth={SW}
              strokeDasharray={`${seg.len.toFixed(2)} ${(circ - seg.len).toFixed(2)}`}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="butt"
              style={{ transform: 'rotate(-90deg)', transformOrigin: `${CX}px ${CY}px` }}
            />
          ))}
          {/* Center text */}
          <text x={CX} y={CY - 6} textAnchor="middle" fontSize={22} fontWeight={800} fill="#111827">
            {overall}%
          </text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize={10} fill="#9ca3af">
            Overall
          </text>
        </svg>

        <div className="ea-donut-legend">
          {legendItems.map((sub, i) => {
            const pct = sub.total > 0 ? Math.round((sub.correct / sub.total) * 100) : 0
            return (
              <div className="ea-legend-row" key={sub.name}>
                <span className="ea-legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="ea-legend-name" title={sub.name}>{sub.name}</span>
                <span className="ea-legend-pct" style={{ color: scoreColor(pct) }}>{pct}%</span>
              </div>
            )
          })}
          {hasMore && (
            <div className="ea-legend-row ea-legend-more">
              <span className="ea-legend-dot" style={{ background: '#d1d5db' }} />
              <span className="ea-legend-name">+{subjects.length - 6} more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── SVG: Percentile gauge bar ─────────────────────────────────────────────

function PercentileGauge({ percentile, examSlug }: { percentile: number; examSlug: string }) {
  if (percentile <= 0) return null

  const W = 400, H = 90
  const BAR = { x: 40, y: 34, w: 320, h: 18 }
  const markerX = BAR.x + (percentile / 100) * BAR.w
  // Clamp text anchor so label doesn't overflow
  const textAnchor = markerX > BAR.x + BAR.w * 0.8 ? 'end' : markerX < BAR.x + BAR.w * 0.2 ? 'start' : 'middle'

  const pool = POOL[examSlug] ?? 100000
  const rank = Math.max(1, Math.round(((100 - percentile) / 100) * pool))
  const poolLabel = pool >= 1000000
    ? `${(pool / 100000).toFixed(0)}L`
    : `${(pool / 1000).toFixed(0)}K`

  return (
    <div className="ea-chart-wrap">
      <div className="ea-chart-title">Estimated Percentile</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="ea-svg" aria-hidden="true">
        <defs>
          <linearGradient id="ea-gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="45%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>

        {/* Track */}
        <rect
          x={BAR.x} y={BAR.y} width={BAR.w} height={BAR.h}
          rx={BAR.h / 2} fill="#f1f5f9"
        />
        {/* Gradient fill to percentile */}
        <rect
          x={BAR.x} y={BAR.y}
          width={(percentile / 100) * BAR.w} height={BAR.h}
          rx={BAR.h / 2} fill="url(#ea-gauge-grad)"
        />
        {/* Marker */}
        <line
          x1={markerX} y1={BAR.y - 6} x2={markerX} y2={BAR.y + BAR.h + 6}
          stroke="#111827" strokeWidth={2.5} strokeLinecap="round"
        />
        {/* Percentile label */}
        <text
          x={markerX} y={BAR.y - 11}
          textAnchor={textAnchor} fontSize={12} fontWeight={800} fill="#111827"
        >
          ~{percentile}th
        </text>
        {/* Scale labels */}
        <text x={BAR.x} y={BAR.y + BAR.h + 16} textAnchor="start" fontSize={9} fill="#94a3b8">0</text>
        <text x={BAR.x + BAR.w / 2} y={BAR.y + BAR.h + 16} textAnchor="middle" fontSize={9} fill="#94a3b8">50th</text>
        <text x={BAR.x + BAR.w} y={BAR.y + BAR.h + 16} textAnchor="end" fontSize={9} fill="#94a3b8">99th</text>
      </svg>
      <div className="ea-gauge-stats">
        <span>~{percentile}th percentile</span>
        <span>Est. rank <strong>~{rank.toLocaleString('en-IN')}</strong> / {poolLabel} candidates</span>
      </div>
    </div>
  )
}

// ── Cutoff comparison bars ────────────────────────────────────────────────

function CutoffBars({
  apiCutoffs, examSlug, userScore,
}: { apiCutoffs: ExamCutoffSet[] | null; examSlug: string; userScore: number }) {
  // Prefer API data (most recent set); fall back to static bundle
  const cut: { stage: string; year: string; totalMarks: number; cutoffs: Array<{ category: string; marks: number }> } | null =
    apiCutoffs && apiCutoffs.length > 0
      ? apiCutoffs[0]
      : examCutoffs[examSlug]
        ? {
            stage: examCutoffs[examSlug].stage,
            year: examCutoffs[examSlug].year,
            totalMarks: examCutoffs[examSlug].totalMarks,
            cutoffs: examCutoffs[examSlug].cutoffs,
          }
        : null

  if (!cut) return null

  const maxVal = cut.totalMarks
  const userPct = Math.min(100, (userScore / maxVal) * 100)
  const isFromApi = apiCutoffs && apiCutoffs.length > 0

  return (
    <div className="ea-chart-wrap">
      <div className="ea-chart-title">
        Cutoff Comparison
        <span className="ea-chart-sub">{cut.stage} · {cut.year}</span>
        {isFromApi && <span className="ea-chart-sub" style={{ background: '#dcfce7', color: '#15803d' }}>Official</span>}
      </div>

      {/* User avg row */}
      <div className="ea-cutoff-row ea-cutoff-row--user">
        <span className="ea-cutoff-cat">Your Avg</span>
        <div className="ea-cutoff-track-wrap">
          <div className="ea-cutoff-track">
            <div className="ea-cutoff-fill user" style={{ width: `${userPct}%` }} />
          </div>
        </div>
        <span className="ea-cutoff-val user">{Math.round(userScore * 10) / 10}</span>
      </div>

      {/* Category rows */}
      {cut.cutoffs.map((c) => {
        const cleared = userScore >= c.marks
        const catPct = (c.marks / maxVal) * 100
        return (
          <div className="ea-cutoff-row" key={c.category}>
            <span className="ea-cutoff-cat">{c.category}</span>
            <div className="ea-cutoff-track-wrap">
              <div className="ea-cutoff-track">
                <div
                  className={`ea-cutoff-fill ${cleared ? 'cleared' : 'missed'}`}
                  style={{ width: `${catPct}%` }}
                />
              </div>
              {userScore > 0 && (
                <div
                  className="ea-cutoff-marker"
                  style={{ left: `${userPct}%` }}
                  title={`Your avg: ${Math.round(userScore * 10) / 10}`}
                />
              )}
            </div>
            <span className={`ea-cutoff-val ${cleared ? 'pass' : 'fail'}`}>
              {cleared ? '✓' : '✗'} {c.marks}
            </span>
          </div>
        )
      })}

      <p className="ea-cutoff-note">
        Your average scaled score: {Math.round(userScore * 10) / 10} / {maxVal}
      </p>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────

export function ExamAnalyticsPage() {
  const { examSlug = '' } = useParams<{ examSlug: string }>()

  // All hooks must run before any conditional returns
  const results = useMemo(
    () => examSlug ? readAllResults(examSlug) : [],
    [examSlug],
  )

  const [apiCutoffs, setApiCutoffs] = useState<ExamCutoffSet[] | null>(null)
  useEffect(() => {
    if (!examSlug) return
    fetchExamCutoffs(examSlug)
      .then(setApiCutoffs)
      .catch(() => setApiCutoffs([]))
  }, [examSlug])

  const examName = results[0]?.examName ?? examSlug

  const recentFirst = useMemo(
    () => [...results].sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()),
    [results],
  )

  const subjects = useMemo<SubjectStat[]>(() => {
    const map = new Map<string, SubjectStat>()
    for (const r of results) {
      for (const s of r.subjects) {
        const prev = map.get(s.subject) ?? { name: s.subject, total: 0, correct: 0 }
        map.set(s.subject, {
          name: s.subject,
          total: prev.total + s.total,
          correct: prev.correct + s.correct,
        })
      }
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total)
  }, [results])

  const summary = useMemo(() => {
    if (results.length === 0) return null
    const totalTime = results.reduce((s, r) => s + r.timeTakenSeconds, 0)
    const avgAccPct = Math.round(
      results.reduce((s, r) => s + (r.totalQuestions > 0 ? (r.correct / r.totalQuestions) * 100 : 0), 0)
      / results.length,
    )
    const bestPct = Math.max(...results.map(r =>
      r.totalQuestions > 0 ? Math.round((r.correct / r.totalQuestions) * 100) : 0
    ))
    const cut = examCutoffs[examSlug]
    const avgScaledScore = cut
      ? results.reduce((s, r) =>
          s + (r.totalQuestions > 0 ? (r.correct / r.totalQuestions) * cut.totalMarks : 0), 0
        ) / results.length
      : 0
    const percentiles = results
      .map(r => estimatePercentile(r.correct, r.totalQuestions, examSlug))
      .filter(p => p > 0)
    const avgPercentile = percentiles.length > 0
      ? Math.round(percentiles.reduce((s, p) => s + p, 0) / percentiles.length)
      : 0
    return { totalTime, avgAccPct, bestPct, avgScaledScore, avgPercentile }
  }, [results, examSlug])

  usePageMeta({
    title: `${examName} Analytics | Ministry of Papers`,
    description: `Your ${examName} performance — scores, subject mastery, percentile, and cutoff comparison.`,
    canonicalPath: `/analytics/${examSlug}`,
  })

  // Guards after all hooks
  if (!examSlug) return <Navigate to="/analytics" replace />
  if (results.length === 0 || !summary) return <Navigate to={`/exam/${examSlug}`} replace />

  return (
    <section className="ea-page workspace-page">

      {/* ── Header ──────────────────────────────── */}
      <header className="ea-header">
        <Link to={`/exam/${examSlug}`} className="ea-back-btn">
          <ArrowLeft size={14} /> {examName}
        </Link>
        <div>
          <small>Exam Analytics</small>
          <h1>{examName}</h1>
          <p>{results.length} attempt{results.length !== 1 ? 's' : ''} recorded</p>
        </div>
      </header>

      {/* ── Summary strip ───────────────────────── */}
      <div className="ea-summary-strip">
        <div className="ea-summary-card">
          <span className="ea-summary-icon"><Target size={15} /></span>
          <strong>{summary.avgAccPct}%</strong>
          <span>Avg Accuracy</span>
        </div>
        <div className="ea-summary-card">
          <span className="ea-summary-icon"><TrendingUp size={15} /></span>
          <strong>{summary.bestPct}%</strong>
          <span>Best Score</span>
        </div>
        <div className="ea-summary-card">
          <span className="ea-summary-icon"><BarChart3 size={15} /></span>
          <strong>{summary.avgPercentile > 0 ? `~${summary.avgPercentile}th` : '—'}</strong>
          <span>Avg Percentile</span>
        </div>
        <div className="ea-summary-card">
          <span className="ea-summary-icon"><Clock3 size={15} /></span>
          <strong>{fmtTime(summary.totalTime)}</strong>
          <span>Total Time</span>
        </div>
      </div>

      {/* ── Chart row 1: Trend + Donut ───────────── */}
      <div className="ea-charts-row ea-charts-2-1">
        <ScoreTrendChart results={results} />
        {subjects.length > 0 && <DonutChart subjects={subjects} />}
      </div>

      {/* ── Chart row 2: Gauge + Cutoff ──────────── */}
      {(summary.avgPercentile > 0 || ((apiCutoffs?.length || examCutoffs[examSlug]) && summary.avgScaledScore > 0)) && (
        <div className="ea-charts-row ea-charts-even">
          {summary.avgPercentile > 0 && (
            <PercentileGauge percentile={summary.avgPercentile} examSlug={examSlug} />
          )}
          {(apiCutoffs?.length || examCutoffs[examSlug]) && summary.avgScaledScore > 0 && (
            <CutoffBars apiCutoffs={apiCutoffs} examSlug={examSlug} userScore={summary.avgScaledScore} />
          )}
        </div>
      )}

      {/* ── Attempt history ─────────────────────── */}
      <div className="ea-history-panel">
        <h2>Attempt History</h2>
        <div className="ea-history-list">
          {recentFirst.map((r, i) => {
            const pct = r.totalQuestions > 0 ? Math.round((r.correct / r.totalQuestions) * 100) : 0
            const pctile = estimatePercentile(r.correct, r.totalQuestions, examSlug)
            return (
              <div
                className="ea-history-row"
                key={`${r.type}-${r.slug}-${r.attemptedAt}`}
              >
                <span className="ea-hist-num">#{recentFirst.length - i}</span>
                <div className="ea-hist-info">
                  <strong>{r.title}</strong>
                  <span>
                    {r.type === 'mock' ? 'Mock Test' : 'PYQ Paper'}
                    {' · '}
                    {new Date(r.attemptedAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="ea-hist-stats">
                  <span className={`ea-hist-score ${scoreClass(pct)}`}>{pct}%</span>
                  <span className="ea-hist-detail">
                    <CheckCircle2 size={10} /> {r.correct}
                    <XCircle size={10} style={{ marginLeft: 6 }} /> {r.wrong}
                  </span>
                  {pctile > 0 && (
                    <span className="ea-hist-pctile">~{pctile}th pct.</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Subject mastery ─────────────────────── */}
      {subjects.length > 0 && (
        <div className="ea-mastery-panel">
          <h2>Subject Mastery</h2>
          <p>Aggregated across all {results.length} attempt{results.length !== 1 ? 's' : ''}</p>
          <div className="ea-mastery-grid">
            {subjects.map((s, i) => {
              const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0
              const color = COLORS[i % COLORS.length]
              return (
                <div className="ea-mastery-card" key={s.name}>
                  <div className="ea-mastery-head">
                    <span className="ea-mastery-dot" style={{ background: color }} />
                    <span className="ea-mastery-name" title={s.name}>{s.name}</span>
                    <span className={`ea-mastery-pct ${scoreClass(pct)}`}>{pct}%</span>
                  </div>
                  <div className="ea-mastery-bar">
                    <div className="ea-mastery-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <span className="ea-mastery-detail">
                    {s.correct}✓ · {s.total - s.correct - 0}✗ / {s.total} total
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

    </section>
  )
}
