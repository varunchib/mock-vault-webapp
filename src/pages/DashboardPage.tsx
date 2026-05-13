import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ClipboardList, FileText } from 'lucide-react'
import {
  fetchDashboardBootstrap,
  type Exam,
  type MockItem,
  type RecentAttempt,
} from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'
import { useAuth } from '../context/useAuth'
import { HaloLoader } from '../components/common/HaloLoader'

export const categoryOrder = [
  'Central',
  'Banking',
  'States',
  'Railways',
  'Teaching',
  'Medical',
  'Engineering',
]

export const categoryIcons: Record<string, string> = {
  central: '🏛️',
  banking: '🏦',
  states: '📍',
  railways: '🚂',
  teaching: '📚',
  medical: '🏥',
  engineering: '⚙️',
}

export const categoryFullLabels: Record<string, string> = {
  central: 'Central Government',
  banking: 'Banking & Finance',
  states: 'State Government',
  railways: 'Railways',
  teaching: 'Teaching',
  medical: 'Medical',
  engineering: 'Engineering',
}

export function normalizeExamCategory(category: string): string {
  const normalized = category.trim().toLowerCase()
  if (normalized.includes('bank')) return 'Banking'
  if (normalized.includes('state')) return 'States'
  if (normalized.includes('rail')) return 'Railways'
  if (normalized.includes('teach')) return 'Teaching'
  if (normalized.includes('medical') || normalized.includes('neet')) return 'Medical'
  if (normalized.includes('engineering') || normalized.includes('jee')) return 'Engineering'
  if (
    normalized.includes('central') ||
    normalized.includes('ssc') ||
    normalized.includes('upsc') ||
    normalized.includes('defence') ||
    normalized.includes('defense')
  ) return 'Central'
  return category
}

type ExamCategoryGroup = { label: string; exams: Exam[] }

export function groupExamsByCategory(exams: Exam[]): ExamCategoryGroup[] {
  const grouped = new Map<string, Exam[]>()
  exams.forEach((exam) => {
    const label = normalizeExamCategory(exam.category)
    const current = grouped.get(label) ?? []
    current.push(exam)
    grouped.set(label, current)
  })
  return [...grouped.entries()]
    .map(([label, items]) => ({
      label,
      exams: items.sort((a, b) => a.shortName.localeCompare(b.shortName)),
    }))
    .sort((a, b) => {
      const aRank = categoryOrder.indexOf(a.label)
      const bRank = categoryOrder.indexOf(b.label)
      if (aRank === -1 && bRank === -1) return a.label.localeCompare(b.label)
      if (aRank === -1) return 1
      if (bRank === -1) return -1
      return aRank - bRank
    })
}

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function DashboardPage() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  const [exams, setExams] = useState<Exam[]>([])
  const [mocks, setMocks] = useState<MockItem[]>([])
  const [enrolledExams, setEnrolledExams] = useState<Exam[]>([])
  const [recentAttempts, setRecentAttempts] = useState<RecentAttempt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  usePageMeta({
    title: 'Dashboard | PYQVault',
    description: 'Your PYQVault dashboard — browse exam categories, attempt mocks, and track your preparation.',
    canonicalPath: '/dashboard',
  })

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchDashboardBootstrap()
        if (cancelled) return
        setExams(data.exams)
        setMocks(data.mocks)
        setEnrolledExams(data.enrolledExams ?? [])
        setRecentAttempts(data.recentAttempts ?? [])
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load dashboard.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => { cancelled = true }
  }, [])

  const freeMocks = useMemo(
    () => mocks.filter((m) => m.isFree).slice(0, 6),
    [mocks],
  )

  if (loading) return <HaloLoader label="Loading dashboard" />

  if (error) {
    return (
      <div className="db-error-shell">
        <div className="db-error-card">
          <strong>Failed to load dashboard</strong>
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="db-page">

      {/* ── Welcome header ─────────────────────────── */}
      <header className="db-header">
        <div className="db-header-left">
          <h1>{getGreeting()}, {firstName}</h1>
          <p>Track your prep — attempts, enrolled exams, and available resources below.</p>
        </div>
        <div className="db-header-stats">
          <div className="db-header-stat">
            <strong>{enrolledExams.length}</strong>
            <span>Enrolled</span>
          </div>
          <div className="db-header-stat">
            <strong>{recentAttempts.length}</strong>
            <span>Attempted</span>
          </div>
          <div className="db-header-stat">
            <strong>{mocks.length}</strong>
            <span>Mocks</span>
          </div>
        </div>
      </header>

      {/* ── Enrolled exams ─────────────────────────── */}
      {enrolledExams.length > 0 && (
        <section className="db-enrolled-section">
          <div className="db-row-head">
            <div className="db-row-head-left">
              <small>Continue preparing</small>
              <h2>Enrolled exams</h2>
            </div>
            <Link className="db-row-view-all" to="/exam">View all →</Link>
          </div>
          <div className="db-enrolled-scroll">
            {enrolledExams.map((exam) => (
              <Link className="db-enrolled-chip" to={`/exam/${exam.slug}`} key={exam.slug}>
                <span>{exam.icon}</span>
                <div>
                  <strong>{exam.shortName}</strong>
                  <small>{exam.mocks} mocks · {exam.papers} papers</small>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Activity row: Recent attempts + Free mocks ── */}
      <div className="db-activity-row">
        <section className="db-panel">
          <div className="db-panel-head">
            <div>
              <small>History</small>
              <h2>Recently attempted</h2>
            </div>
          </div>
          {recentAttempts.length === 0 ? (
            <p className="db-panel-empty">No attempts yet. Start with a free mock below.</p>
          ) : (
            recentAttempts.map((attempt) => {
              const href = attempt.type === 'paper'
                ? `/pyq/${attempt.slug}`
                : `/mock-test/${attempt.examSlug}`
              return (
                <Link className="db-panel-row" to={href} key={`${attempt.type}-${attempt.slug}`}>
                  <div className={`db-attempt-badge ${attempt.type}`}>
                    {attempt.type === 'paper' ? <FileText size={13} /> : <ClipboardList size={13} />}
                  </div>
                  <div>
                    <strong>{attempt.title}</strong>
                    <small>{attempt.examName} · {attempt.type === 'paper' ? 'PYQ' : 'Mock'}</small>
                  </div>
                  <span>{attempt.questions}Q</span>
                </Link>
              )
            })
          )}
        </section>

        <section className="db-panel">
          <div className="db-panel-head">
            <div>
              <small>Free access</small>
              <h2>Free mock tests</h2>
            </div>
            <Link className="db-panel-link" to="/mock-test">See all</Link>
          </div>
          {freeMocks.length === 0 ? (
            <p className="db-panel-empty">No free mocks available right now.</p>
          ) : (
            freeMocks.map((mock) => (
              <Link className="db-panel-row" to={`/mock-test/${mock.examSlug}`} key={mock.slug}>
                <div className="db-attempt-badge mock">
                  <ClipboardList size={13} />
                </div>
                <div>
                  <strong>{mock.title}</strong>
                  <small>{mock.examName} · {mock.difficulty}</small>
                </div>
                <span>{mock.questions}Q</span>
              </Link>
            ))
          )}
        </section>
      </div>

    </div>
  )
}
