'use client'
import { BarChart3, BookOpen, Clock3, FileText, LayoutGrid, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { readAttemptResults, readPaperResults, type SubjectResult } from '../lib/mockActivity'
import { estimatePercentile } from '../data/examCutoffs'

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
  rawScore?: number
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

// ── Single attempt card (square) ─────────────────────────────────────────
function AttemptCard({ result }: { result: CombinedResult }) {
  const displayScore = result.rawScore ?? result.correct
  const accuracy = result.totalQuestions > 0
    ? Math.round((Math.max(0, displayScore) / result.totalQuestions) * 100)
    : 0
  const pctClass = accuracyClass(accuracy)
  const percentile = estimatePercentile(result.correct, result.totalQuestions, result.examSlug)

  return (
    <div className="an-attempt-card">
      <div className="an-card-top">
        <span className={`an-card-score ${displayScore < 0 ? 'bad' : pctClass}`}>
          {displayScore < 0 ? displayScore : `${accuracy}%`}
        </span>
        {percentile > 0 && <span className="an-card-pctile"><TrendingUp size={10} /> ~{percentile}th</span>}
      </div>
      <strong className="an-card-title">{result.title}</strong>
      <span className="an-card-meta">
        {result.type === 'mock' ? 'Mock Test' : 'PYQ Paper'}
        {' · '}
        {result.examName}
      </span>
      <span className="an-card-date">
        <Clock3 size={10} /> {formatTime(result.timeTakenSeconds)}
        {' · '}
        {relativeDate(result.attemptedAt)}
      </span>
      <div className="an-card-chips">
        <span className="an-chip an-chip--c">{result.correct} Correct</span>
        <span className="an-chip an-chip--w">{result.wrong} Wrong</span>
        <span className="an-chip an-chip--s">{result.skipped} Skipped</span>
        {result.rawScore !== undefined && result.rawScore >= 0 && (
          <span className="an-chip an-chip--c">Raw: {result.rawScore}</span>
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
      rawScore: r.rawScore,
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
      rawScore: r.rawScore,
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
      allResults.reduce((s, r) => {
        const score = r.rawScore ?? r.correct
        return s + (r.totalQuestions > 0 ? (Math.max(0, score) / r.totalQuestions) * 100 : 0)
      }, 0)
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
          <Link href="/exams" className="an-empty-btn">
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
        <div className="an-attempt-grid">
          {visibleResults.map((r) => (
            <AttemptCard key={`${r.type}-${r.slug}-${r.attemptedAt}`} result={r} />
          ))}
        </div>
      )}
    </section>
  )
}
