import { BarChart3, BookOpen, CheckCircle2, Clock3, Target, TrendingUp, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { readAttemptResults, type MockAttemptResult, type SubjectResult } from '../lib/mockActivity'
import { estimatePercentile, getCutoffComparison } from '../data/examCutoffs'

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

// ── Subject bars component ────────────────────────────────────────────────
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
function AttemptCard({ result }: { result: MockAttemptResult }) {
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
          <strong>{result.mockTitle}</strong>
          <div className="an-card-meta">
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
              {cutoff.examName} {cutoff.stage} cutoff:{' '}
              Your score <strong>{cutoff.userScore}/{cutoff.totalMarks}</strong>
              {' '}vs General <strong>{cutoff.cutoff}</strong>
            </span>
            <span className="an-cutoff-pct">
              {Math.round((cutoff.userScore / cutoff.cutoff) * 100)}% of cutoff
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Subject mastery aggregation ───────────────────────────────────────────
function MasteryPanel({ results }: { results: MockAttemptResult[] }) {
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
      <p>Aggregated across all your attempts</p>
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

// ── Main page ─────────────────────────────────────────────────────────────
export function AnalyticsPage() {
  usePageMeta({
    title: 'Analytics | Ministry of Papers',
    description: 'Your mock test performance, subject mastery, and exam cutoff comparisons.',
    canonicalPath: '/analytics',
  })

  const results = useMemo(() => {
    const all = readAttemptResults()
    return [...all].sort((a, b) => new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime())
  }, [])

  const summary = useMemo(() => {
    if (results.length === 0) return null
    const totalTime = results.reduce((s, r) => s + r.timeTakenSeconds, 0)
    const avgAcc = Math.round(
      results.reduce((s, r) => s + (r.totalQuestions > 0 ? (r.correct / r.totalQuestions) * 100 : 0), 0)
      / results.length
    )
    const percentiles = results
      .map((r) => estimatePercentile(r.correct, r.totalQuestions, r.examSlug))
      .filter((p) => p > 0)
    const avgPercentile = percentiles.length > 0
      ? Math.round(percentiles.reduce((s, p) => s + p, 0) / percentiles.length)
      : 0
    return { totalTime, avgAcc, avgPercentile, count: results.length }
  }, [results])

  return (
    <section className="an-page workspace-page">
      <header className="an-header">
        <div className="an-header-left">
          <small>Analytics</small>
          <h1>Performance Report</h1>
          <p>Compare your scores against official cutoffs and track subject mastery.</p>
        </div>
      </header>

      {/* Summary strip */}
      {summary && (
        <div className="an-summary-strip">
          <div className="an-summary-card">
            <span className="an-summary-icon"><BookOpen size={16} /></span>
            <strong>{summary.count}</strong>
            <span>Tests Attempted</span>
          </div>
          <div className="an-summary-card">
            <span className="an-summary-icon"><Target size={16} /></span>
            <strong>{summary.avgAcc}%</strong>
            <span>Avg Accuracy</span>
          </div>
          <div className="an-summary-card">
            <span className="an-summary-icon"><Clock3 size={16} /></span>
            <strong>{formatTime(summary.totalTime)}</strong>
            <span>Total Time</span>
          </div>
          <div className="an-summary-card">
            <span className="an-summary-icon"><BarChart3 size={16} /></span>
            <strong>{summary.avgPercentile > 0 ? `~${summary.avgPercentile}th` : '—'}</strong>
            <span>Avg Percentile</span>
          </div>
        </div>
      )}

      {/* Empty state */}
      {results.length === 0 && (
        <div className="an-empty">
          <BarChart3 size={40} strokeWidth={1.5} />
          <strong>No test results yet</strong>
          <p>
            Submit a mock test and your score, subject breakdown, and cutoff comparison
            will appear here.
          </p>
          <Link to="/mock-test" className="an-empty-btn">
            Browse Mock Tests
          </Link>
        </div>
      )}

      {/* Attempt cards */}
      {results.length > 0 && (
        <div className="an-attempt-list">
          {results.map((r) => (
            <AttemptCard key={`${r.mockSlug}-${r.attemptedAt}`} result={r} />
          ))}
        </div>
      )}

      {/* Subject mastery */}
      {results.length > 0 && <MasteryPanel results={results} />}
    </section>
  )
}
