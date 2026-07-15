import { BarChart3, BookOpen, ChevronRight, Clock3, FileText, LayoutGrid, Target, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { usePageMeta } from '../lib/usePageMeta'
import { readAttemptResults, readPaperResults, type CombinedResult } from '../lib/mockActivity'
import { estimatePercentile } from '../data/examCutoffs'

type ExamGroup = {
  examSlug: string
  examName: string
  results: CombinedResult[]
}

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

function ExamCard({ examSlug, examName, results, linkBase }: ExamGroup & { linkBase: string }) {
  const marksData = results.map(r => {
    const maxM = (r.maxMarks ?? 0) > 0 ? r.maxMarks! : r.totalQuestions
    const marksPerQ = maxM / r.totalQuestions
    const negM = r.negativeMarking ?? 0
    const net = r.rawScore ?? parseFloat((r.correct * marksPerQ - r.wrong * negM).toFixed(2))
    return { net, max: maxM }
  })
  const bestNet = parseFloat(Math.max(...marksData.map(m => m.net)).toFixed(2))
  const avgNet = parseFloat((marksData.reduce((s, m) => s + m.net, 0) / marksData.length).toFixed(2))
  const bestMax = marksData.find(m => m.net === bestNet)?.max ?? 1
  const avgMax = marksData.reduce((s, m) => s + m.max, 0) / marksData.length
  const bestPct = Math.round((Math.max(0, bestNet) / bestMax) * 100)
  const avgPct = Math.round((Math.max(0, avgNet) / avgMax) * 100)
  const totalTime = results.reduce((s, r) => s + r.timeTakenSeconds, 0)
  const mockCount = results.filter(r => r.type === 'mock').length
  const paperCount = results.filter(r => r.type === 'paper').length
  const lastAttempt = results[0].attemptedAt

  return (
    <Link to={`${linkBase}/${examSlug}`} className="an-exam-card">
      <div className="an-exam-card-top">
        <span className={`an-exam-best ${scoreClass(bestPct)}`}>{bestNet}<em>/{bestMax}</em></span>
        <span className="an-exam-date">{relativeDate(lastAttempt)}</span>
      </div>
      <strong className="an-exam-name">{examName}</strong>
      <div className="an-exam-chips">
        {mockCount > 0 && <span className="an-exam-chip">{mockCount} mock{mockCount !== 1 ? 's' : ''}</span>}
        {paperCount > 0 && <span className="an-exam-chip">{paperCount} paper{paperCount !== 1 ? 's' : ''}</span>}
        <span className="an-exam-chip"><Clock3 size={10} /> {formatTime(totalTime)}</span>
      </div>
      <div className="an-exam-progress">
        <div className="an-exam-progress-track">
          <div className="an-exam-progress-fill" style={{ width: `${avgPct}%` }} />
        </div>
        <span className="an-exam-avg">Avg {avgNet}</span>
      </div>
      <span className="an-exam-cta">View analytics <ChevronRight size={13} /></span>
    </Link>
  )
}

export type AnalyticsSource = {
  results: CombinedResult[]
  linkBase: string
  header: { eyebrow: string; title: string; subtitle: string }
}

export function AnalyticsPage({ source }: { source?: AnalyticsSource } = {}) {
  usePageMeta({
    title: source ? 'User Analytics · Admin' : 'Analytics | Ministry of Papers',
    description: 'Your mock test and PYQ paper performance, subject mastery, and exam cutoff comparisons.',
    canonicalPath: source ? undefined : '/analytics',
  })

  const linkBase = source?.linkBase ?? '/analytics'

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

  const examGroups = useMemo<ExamGroup[]>(() => {
    const map = new Map<string, ExamGroup>()
    for (const r of allResults) {
      if (!map.has(r.examSlug)) map.set(r.examSlug, { examSlug: r.examSlug, examName: r.examName, results: [] })
      map.get(r.examSlug)!.results.push(r)
    }
    return [...map.values()]
  }, [allResults])

  const summary = useMemo(() => {
    if (!allResults.length) return null
    const totalTime = allResults.reduce((s, r) => s + r.timeTakenSeconds, 0)
    const avgAcc = Math.round(
      allResults.reduce((s, r) => {
        const score = r.rawScore ?? r.correct
        return s + (r.totalQuestions > 0 ? (Math.max(0, score) / r.totalQuestions) * 100 : 0)
      }, 0) / allResults.length
    )
    const percentiles = allResults
      .map(r => estimatePercentile(r.correct, r.totalQuestions, r.examSlug))
      .filter(p => p > 0)
    const avgPercentile = percentiles.length
      ? Math.round(percentiles.reduce((s, p) => s + p, 0) / percentiles.length)
      : 0
    return { totalTime, avgAcc, avgPercentile, examCount: examGroups.length, attemptCount: allResults.length }
  }, [allResults, examGroups])

  return (
    <section className="an-page workspace-page">
      <header className="an-header">
        <div className="an-header-left">
          <small>{source?.header.eyebrow ?? 'Analytics'}</small>
          <h1>{source?.header.title ?? 'Performance Report'}</h1>
          <p>{source?.header.subtitle ?? 'Click an exam to see your score position, cutoff comparison, and leaderboard.'}</p>
        </div>
      </header>

      {summary && (
        <div className="an-summary-strip">
          <div className="an-summary-card">
            <span className="an-summary-icon"><LayoutGrid size={16} /></span>
            <strong>{summary.examCount}</strong>
            <span>Exams</span>
          </div>
          <div className="an-summary-card">
            <span className="an-summary-icon"><FileText size={16} /></span>
            <strong>{summary.attemptCount}</strong>
            <span>Attempts</span>
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

      {allResults.length === 0 && (
        <div className="an-empty">
          <BookOpen size={40} strokeWidth={1.5} />
          <strong>No results yet</strong>
          <p>Attempt a mock test or a PYQ paper — your scores, cutoff comparison, and leaderboard will appear here.</p>
          <Link to="/exams" className="an-empty-btn">Browse Tests &amp; Papers</Link>
        </div>
      )}

      {examGroups.length > 0 && (
        <>
          <p className="an-section-label"><TrendingUp size={13} /> {examGroups.length} exam{examGroups.length !== 1 ? 's' : ''} attempted</p>
          <div className="an-exam-grid">
            {examGroups.map(g => <ExamCard key={g.examSlug} {...g} linkBase={linkBase} />)}
          </div>
        </>
      )}
    </section>
  )
}
