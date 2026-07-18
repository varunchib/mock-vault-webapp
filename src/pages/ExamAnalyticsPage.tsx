import { ArrowLeft, Clock3, Medal, Target, TrendingUp } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { analyticsSeoTitle, analyticsSeoDescription } from '../lib/pageTitles'
import { readAllResults, type CombinedResult } from '../lib/mockActivity'
import { examCutoffs, estimatePercentile } from '../data/examCutoffs'
import { fetchExamCutoffs, fetchLeaderboard, fetchScoreDistribution, type ExamCutoffSet, type LeaderboardEntry, type ScoreDistribution } from '../lib/api'
import { useAuth } from '../context/useAuth'
import { SubjectStrength } from '../components/analytics/SubjectStrength'
import { ScoreTrendChart, type TrendPoint } from '../components/analytics/ScoreTrendChart'
import { ScorePositionChart } from '../components/analytics/ScorePositionChart'
import { AnswerDonut } from '../components/analytics/AnswerDonut'

// ── Constants ─────────────────────────────────────────────────────────────

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

// ── Leaderboard panel ─────────────────────────────────────────────────────

const MEDALS = ['🥇', '🥈', '🥉']

function LeaderboardPanel({
  top10, userRank, userName, viewerBestPct,
}: { top10: LeaderboardEntry[]; userRank: number; userName: string; viewerBestPct: number }) {
  // The server board can lag behind (or miss a 0-correct attempt) — if the
  // viewer has local attempts but isn't on the board, show them anyway so the
  // panel never says "No attempts yet" to someone who just attempted.
  const rows: LeaderboardEntry[] = top10.length === 0 && viewerBestPct >= 0
    ? [{ userId: 'me', name: userName, scorePct: viewerBestPct, rank: 1, isMe: true }]
    : top10
  const userInTop10 = rows.some(e => e.isMe)
  const soloViewer = rows.length === 1 && rows[0].isMe
  const pool = 0

  return (
    <div className="ea2-lb-panel">
      <div className="ea2-lb-header">
        <Medal size={15} />
        <span>Leaderboard</span>
      </div>

      <ol className="ea2-lb-list">
        {rows.map((entry) => (
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

      {soloViewer && (
        <p className="ea2-lb-solo">You&apos;re the first to attempt this exam — the board is yours.</p>
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

// ── Main page ─────────────────────────────────────────────────────────────

export type ExamAnalyticsSource = {
  examSlug: string
  results: CombinedResult[]
  userName: string
  backTo: string
  backLabel: string
  asUserId: string
}

export function ExamAnalyticsPage({ source }: { source?: ExamAnalyticsSource } = {}) {
  const params = useParams<{ examSlug: string }>()
  const { user } = useAuth()
  const examSlug = source?.examSlug ?? params.examSlug ?? ''
  const asUserId = source?.asUserId

  const results = useMemo(
    () => (source ? source.results : (examSlug ? readAllResults(examSlug) : [])),
    [source, examSlug],
  )
  const examName = results[0]?.examName ?? examSlug
  const userName = source?.userName ?? user?.name ?? 'You'
  const backTo = source?.backTo ?? '/analytics'
  const backLabel = source?.backLabel ?? 'Analytics'

  const [apiCutoffs, setApiCutoffs] = useState<ExamCutoffSet[] | null>(null)
  const [leaderboard, setLeaderboard] = useState<{ top10: LeaderboardEntry[]; userRank: number } | null>(null)
  const [dist, setDist] = useState<ScoreDistribution | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('General')

  useEffect(() => {
    if (!examSlug) return
    fetchExamCutoffs(examSlug).then(setApiCutoffs).catch(() => setApiCutoffs([]))
    fetchLeaderboard(examSlug, asUserId).then(setLeaderboard).catch(() => setLeaderboard({ top10: [], userRank: -1 }))
    fetchScoreDistribution(examSlug).then(setDist).catch(() => setDist(null))
  }, [examSlug, asUserId])

  // Attempts oldest-first for the per-exam trend line
  const trendPoints = useMemo<TrendPoint[]>(
    () => [...results]
      .sort((a, b) => new Date(a.attemptedAt).getTime() - new Date(b.attemptedAt).getTime())
      .map(r => {
        const max = (r.maxMarks ?? 0) > 0 ? r.maxMarks! : r.totalQuestions
        const perQ = max / r.totalQuestions
        const net = r.rawScore ?? parseFloat((r.correct * perQ - r.wrong * (r.negativeMarking ?? 0)).toFixed(2))
        const pct = max > 0 ? Math.max(0, Math.round((net / max) * 100)) : 0
        return { pct, net, max, title: r.title, examName: r.examName, attemptedAt: r.attemptedAt }
      }),
    [results],
  )

  const summary = useMemo(() => {
    if (!results.length) return null
    const totalTime = results.reduce((s, r) => s + r.timeTakenSeconds, 0)
    const marksData = results.map(r => {
      const maxM = (r.maxMarks ?? 0) > 0 ? r.maxMarks! : r.totalQuestions
      const marksPerQ = maxM / r.totalQuestions
      const negM = r.negativeMarking ?? 0
      const net = r.rawScore ?? parseFloat((r.correct * marksPerQ - r.wrong * negM).toFixed(2))
      return { net, max: maxM }
    })
    const bestScore = parseFloat(Math.max(...marksData.map(m => m.net)).toFixed(2))
    const avgScore = parseFloat((marksData.reduce((s, m) => s + m.net, 0) / marksData.length).toFixed(2))
    const bestMax = marksData.find(m => m.net === bestScore)?.max ?? 1
    const avgMax = marksData.reduce((s, m) => s + m.max, 0) / marksData.length
    const bestPct = Math.round((Math.max(0, bestScore) / bestMax) * 100)
    const avgAccPct = Math.round((Math.max(0, avgScore) / avgMax) * 100)
    const percentiles = results.map(r => estimatePercentile(r.correct, r.totalQuestions, examSlug)).filter(p => p > 0)
    const avgPercentile = percentiles.length ? Math.round(percentiles.reduce((s, p) => s + p, 0) / percentiles.length) : 0
    return { totalTime, avgScore, bestScore, avgAccPct, bestPct, avgPercentile }
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

  if (!examSlug) return source ? null : <Navigate to="/analytics" replace />
  if (!results.length || !summary) {
    if (source) {
      return (
        <section className="ea2-page workspace-page">
          <header className="ea2-header">
            <Link to={backTo} className="ea2-back"><ArrowLeft size={14} /> {backLabel}</Link>
            <div className="ea2-header-body">
              <h1>{examName}</h1>
              <p>No attempts recorded for this exam.</p>
            </div>
          </header>
        </section>
      )
    }
    return <Navigate to={`/exam/${examSlug}`} replace />
  }

  return (
    <section className="ea2-page workspace-page">

      {/* ── Header ─────────────────────────────────── */}
      <header className="ea2-header">
        <Link to={backTo} className="ea2-back">
          <ArrowLeft size={14} /> {backLabel}
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
          <strong className={scoreClass(summary.avgAccPct)}>{summary.avgScore}</strong>
          <span>Avg Score</span>
        </div>
        <div className="ea2-strip-card">
          <span className="ea2-strip-icon"><TrendingUp size={14} /></span>
          <strong className={scoreClass(summary.bestPct)}>{summary.bestScore}</strong>
          <span>Best Score</span>
        </div>
        {/* Percentile only exists where we have cutoff data — a "—" tile is noise */}
        {summary.avgPercentile > 0 ? (
          <div className="ea2-strip-card">
            <span className="ea2-strip-icon"><Medal size={14} /></span>
            <strong>~{summary.avgPercentile}th</strong>
            <span>Avg Percentile</span>
          </div>
        ) : (
          <div className="ea2-strip-card">
            <span className="ea2-strip-icon"><Medal size={14} /></span>
            <strong>{results.length}</strong>
            <span>Attempts</span>
          </div>
        )}
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
              <p>How everyone on the platform scored on this exam — and where you sit</p>
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

          {/* Real platform-user distribution — always renders. If the API is
              unavailable, fall back to just the viewer so the chart never
              disappears behind a "no cutoff data" wall. */}
          <ScorePositionChart
            dist={dist ?? {
              totalUsers: 1,
              buckets: Array.from({ length: 10 }, (_, i) =>
                i === Math.min(9, Math.floor(summary.bestPct / 10)) ? 1 : 0),
              systemCutoffPct: 0,
            }}
            userPct={summary.bestPct}
            officialCutoffPct={
              activeCutoff && selectedCutoffVal > 0 && activeCutoff.totalMarks > 0
                ? (selectedCutoffVal / activeCutoff.totalMarks) * 100
                : undefined
            }
            officialCutoffLabel={selectedCategory}
          />

          {/* User vs official cutoff — compared in percent space, same as the
              chart, so different papers' mark scales can't skew it */}
          {activeCutoff && selectedCutoffVal > 0 && activeCutoff.totalMarks > 0 && (() => {
            const cutoffPct = (selectedCutoffVal / activeCutoff.totalMarks) * 100
            const clears = summary.bestPct >= cutoffPct
            return (
              <div className={`ea2-verdict ${clears ? 'pass' : 'fail'}`}>
                {clears ? '✓' : '✗'}
                {' '}Your best score <strong>{summary.bestPct}%</strong>
                {' '}{clears ? 'clears' : 'misses'} the{' '}
                <strong>{selectedCategory}</strong> cutoff of <strong>{Math.round(cutoffPct)}%</strong>
                {' '}({selectedCutoffVal} / {activeCutoff.totalMarks})
              </div>
            )
          })()}
        </div>

        {/* Right: leaderboard */}
        <LeaderboardPanel
          top10={leaderboard?.top10 ?? []}
          userRank={leaderboard?.userRank ?? -1}
          userName={userName}
          viewerBestPct={summary.bestPct}
        />
      </div>

      {/* ── Subject strength: where you lack in THIS exam ── */}
      <SubjectStrength results={results} />

      {/* ── Score trend + answer breakdown for THIS exam ── */}
      <div className="ea2-charts-row">
        <div className="an2-panel">
          <div className="an2-panel-head">
            <div>
              <h2>Score trend</h2>
              <p>Net score as % of maximum, every attempt on this exam</p>
            </div>
          </div>
          {trendPoints.length >= 2 ? (
            <ScoreTrendChart points={trendPoints} />
          ) : (
            <div className="an2-trend-single">
              One attempt so far — the trend line starts at the second attempt.
            </div>
          )}
        </div>
        <div className="an2-panel">
          <div className="an2-panel-head">
            <div>
              <h2>Answer breakdown</h2>
              <p>All questions across your {results.length} attempt{results.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <AnswerDonut
            correct={results.reduce((n, r) => n + r.correct, 0)}
            wrong={results.reduce((n, r) => n + r.wrong, 0)}
            skipped={results.reduce((n, r) => n + r.skipped, 0)}
          />
        </div>
      </div>

    </section>
  )
}
