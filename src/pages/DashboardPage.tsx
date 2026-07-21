import { ArrowRight, ClipboardList, FileText, PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  APIError,
  fetchActiveLiveAttempts,
  fetchDashboardBootstrap,
  fetchExamCatalog,
  refreshAuthSession,
  type ActiveAttempt,
  type Exam,
  type RecentAttempt,
} from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'
import { useAuth } from '../context/useAuth'
import { HaloLoader } from '../components/common/HaloLoader'
import { readRecentlyViewed } from '../lib/examActivity'
import { withoutBoards } from '../lib/examTree'
import { paperPath } from '../lib/paperSeo'

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
  const n = category.trim().toLowerCase()
  if (n.includes('bank') || n.includes('ibps') || n.includes('rbi') || n.includes('nabard')) return 'Banking'
  if (n.includes('rail') || n.includes('rrb') || n.includes('ntpc')) return 'Railways'
  if (n.includes('teach') || n.includes('ctet') || n.includes(' tet') || n.startsWith('tet')) return 'Teaching'
  if (n.includes('medical') || n.includes('neet') || n.includes('aiims')) return 'Medical'
  if (n.includes('engineer') || n.includes('jee') || n.includes('gate')) return 'Engineering'
  if (
    n.includes('central') || n.includes('ssc') || n.includes('upsc') ||
    n.includes('defence') || n.includes('defense') || n.includes('nda') || n.includes('cds')
  ) return 'Central'
  const stateMarkers = [
    'state', 'psc', 'pcs', 'j&k', 'jammu', 'kashmir', 'jkssb', 'jkpsc',
    'kerala', 'karnataka', 'maharashtra', 'mpsc', 'tnpsc', 'appsc', 'tspsc',
    'rajasthan', 'haryana', 'punjab', 'gujarat', 'himachal', 'hp psc',
    'uttarakhand', 'bihar', 'bpsc', 'jharkhand', 'odisha', 'opsc',
    'bengal', 'wbpsc', 'assam', 'manipur', 'meghalaya', 'nagaland',
    'tripura', 'sikkim', 'goa', 'chhattisgarh', 'cgpsc', 'uppsc', 'mppsc',
    'andhra', 'telangana', 'tamilnadu', 'tamil',
  ]
  if (stateMarkers.some((m) => n.includes(m))) return 'States'
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

function formatRemainingTime(seconds: number): string {
  if (seconds <= 0) return '0:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
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

  const [enrolledExams, setEnrolledExams] = useState<Exam[]>([])
  // Needed only to tell a board (JKSSB) from an exam you actually sit
  // (JKSSB Junior Assistant). Small, and Redis-cached server-side.
  const [allExams, setAllExams] = useState<Exam[]>([])
  const [recentAttempts, setRecentAttempts] = useState<RecentAttempt[]>([])
  const [newPapersByExam, setNewPapersByExam] = useState<Record<string, number>>({})
  const [activeAttempts, setActiveAttempts] = useState<ActiveAttempt[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [, forceTimerTick] = useState(0)
  const attemptsFetchedAtMs = useRef(0)

  usePageMeta({
    title: 'Dashboard | Ministry of Papers',
    description: 'Your Ministry of Papers dashboard — enrolled exams, recent activity, and preparation tools.',
    canonicalPath: '/dashboard',
  })

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const applyData = (data: Awaited<ReturnType<typeof fetchDashboardBootstrap>>) => {
        setEnrolledExams(data.enrolledExams ?? [])
        setRecentAttempts(data.recentAttempts ?? [])
        setNewPapersByExam(data.newPapersByExam ?? {})
      }

      try {
        setLoading(true)
        setError(null)
        const [data, liveAttempts] = await Promise.all([
          fetchDashboardBootstrap(),
          fetchActiveLiveAttempts().catch(() => [] as ActiveAttempt[]),
        ])
        if (cancelled) return
        applyData(data)
        attemptsFetchedAtMs.current = Date.now()
        setActiveAttempts(liveAttempts)
      } catch (err) {
        if (cancelled) return
        if (err instanceof APIError && err.status === 401) {
          try {
            await refreshAuthSession()
            const [retried, liveAttempts] = await Promise.all([
              fetchDashboardBootstrap(),
              fetchActiveLiveAttempts().catch(() => [] as ActiveAttempt[]),
            ])
            if (!cancelled) {
              applyData(retried)
              attemptsFetchedAtMs.current = Date.now()
              setActiveAttempts(liveAttempts)
            }
            return
          } catch {
            // refresh failed — fall through to error state
          }
        }
        setError('Unable to load dashboard. Please refresh.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => { cancelled = true }
  }, [])

  // Catalog is only used to identify boards; a failure must never break the
  // dashboard, so it loads separately and falls back to an empty list.
  useEffect(() => {
    let cancelled = false
    void fetchExamCatalog()
      .then((catalog) => { if (!cancelled) setAllExams(catalog ?? []) })
      .catch(() => { if (!cancelled) setAllExams([]) })
    return () => { cancelled = true }
  }, [])

  // Boards (JKSSB) are not exams anyone sits — you enrol in JKSSB Junior
  // Assistant. Boards can no longer be enrolled, but older enrolments and
  // stored views still reference them, so filter on read too.
  const visibleEnrolled = useMemo(
    () => withoutBoards(enrolledExams, allExams),
    [enrolledExams, allExams],
  )
  const recentlyViewed = useMemo(
    () => withoutBoards(readRecentlyViewed(), allExams),
    [allExams],
  )

  useEffect(() => {
    if (!activeAttempts.length) return
    const id = window.setInterval(() => forceTimerTick((n) => n + 1), 1000)
    return () => window.clearInterval(id)
  }, [activeAttempts.length])

  const getLiveRemaining = (attempt: ActiveAttempt): number => {
    const elapsed = Math.floor((Date.now() - attemptsFetchedAtMs.current) / 1000)
    return Math.max(0, attempt.remainingSeconds - elapsed)
  }

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

      {/* ── Welcome header ──────────────────────────── */}
      <header className="db-header">
        <div className="db-header-left">
          <h1>{getGreeting()}, {firstName}</h1>
          <p>Your exam preparation hub — enrolled exams, recent activity, and more.</p>
        </div>
        <div className="db-header-stats">
          <div className="db-header-stat">
            <strong>{visibleEnrolled.length}</strong>
            <span>Enrolled</span>
          </div>
          <div className="db-header-stat">
            <strong>{recentAttempts.length}</strong>
            <span>Attempted</span>
          </div>
        </div>
      </header>

      {/* ── In-progress tests ──────────────────────── */}
      {activeAttempts.length > 0 && (
        <section className="db-section db-ip-section">
          <div className="db-section-head">
            <div className="db-ip-heading">
              <span className="db-live-dot" aria-hidden="true" />
              <span className="db-ip-heading-label">In Progress</span>
              <span className="db-ip-heading-count">
                {activeAttempts.length} active
              </span>
            </div>
          </div>
          <div className="db-ip-list">
            {activeAttempts.map((attempt) => (
              <div className="db-ip-card" key={attempt.paperSlug}>
                <div className="db-ip-accent" />
                <div className="db-ip-info">
                  <strong>{attempt.paperTitle}</strong>
                  <small>{attempt.examName}</small>
                </div>
                <div className="db-ip-stat">
                  <strong>{attempt.answeredCount}<em>/{attempt.totalQuestions}</em></strong>
                  <small>answered</small>
                </div>
                <div className="db-ip-timer">
                  <strong>{formatRemainingTime(getLiveRemaining(attempt))}</strong>
                  <small>remaining</small>
                </div>
                <Link className="db-ip-btn" to={`/paper-attempt/${attempt.paperSlug}`}>
                  Resume <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Enrolled exams ──────────────────────────── */}
      <section className="db-section">
        <div className="db-section-head">
          <div>
            <small>Your exams</small>
            <h2>Enrolled</h2>
          </div>
          <Link className="db-section-link" to="/exams">Browse all →</Link>
        </div>

        {visibleEnrolled.length === 0 ? (
          <div className="db-enroll-cta">
            <PlusCircle size={22} />
            <div>
              <strong>No exams enrolled yet</strong>
              <p>Head to the Exams catalog and enroll in yours to track them here.</p>
            </div>
            <Link className="db-enroll-btn" to="/exams">Browse Exams</Link>
          </div>
        ) : (
          <div className="db-enrolled-row">
            {visibleEnrolled.map((exam) => {
              const fresh = newPapersByExam[exam.slug] ?? 0
              return (
                <Link className="db-enrolled-chip" to={`/exam/${exam.slug}`} key={exam.slug}>
                  <span className="db-chip-icon">{exam.icon}</span>
                  <div>
                    <strong>{exam.shortName}</strong>
                    <small>
                      {exam.mocks > 0 ? `${exam.mocks} mocks` : ''}
                      {exam.mocks > 0 && exam.papers > 0 ? ' · ' : ''}
                      {exam.papers > 0 ? `${exam.papers} papers` : ''}
                    </small>
                  </div>
                  {fresh > 0 && (
                    <span className="db-chip-new" title={`${fresh} paper${fresh !== 1 ? 's' : ''} added since you enrolled`}>
                      {fresh} new
                    </span>
                  )}
                </Link>
              )
            })}
            <Link className="db-enrolled-chip db-add-chip" to="/exams">
              <span className="db-chip-icon">＋</span>
              <div><strong>Add exam</strong></div>
            </Link>
          </div>
        )}
      </section>

      {/* ── Recently viewed ─────────────────────────── */}
      {recentlyViewed.length > 0 && (
        <section className="db-section">
          <div className="db-section-head">
            <div>
              <small>Browse history</small>
              <h2>Recently viewed</h2>
            </div>
          </div>
          <div className="db-viewed-row">
            {recentlyViewed.map((rec) => (
              <Link className="db-viewed-chip" to={`/exam/${rec.slug}`} key={rec.slug}>
                <span>{rec.icon}</span>
                <strong>{rec.shortName}</strong>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Recently attempted ──────────────────────── */}
      <section className="db-section">
        <div className="db-section-head">
          <div>
            <small>Activity</small>
            <h2>Recently attempted</h2>
          </div>
          <Link className="db-section-link" to="/exams">All tests →</Link>
        </div>

        {recentAttempts.length === 0 ? (
          <div className="db-attempts-empty">
            <p>No attempts yet — start a mock test or open a PYQ paper.</p>
            <Link className="db-enroll-btn" to="/exams">Browse Tests</Link>
          </div>
        ) : (
          <div className="db-attempt-list">
            {[...new Map(recentAttempts.map((a) => [`${a.type}-${a.slug}`, a])).values()].map((attempt) => {
              const href = attempt.type === 'paper'
                ? paperPath(attempt.slug)
                : `/mock-test/${attempt.examSlug}`
              return (
                <Link className="db-attempt-row" to={href} key={`${attempt.type}-${attempt.slug}`}>
                  <div className={`db-attempt-badge ${attempt.type}`}>
                    {attempt.type === 'paper' ? <FileText size={13} /> : <ClipboardList size={13} />}
                  </div>
                  <div className="db-attempt-info">
                    <strong>{attempt.title}</strong>
                    <small>{attempt.examName} · {attempt.type === 'paper' ? 'PYQ Paper' : 'Mock Test'}</small>
                  </div>
                  <span className="db-attempt-qs">{attempt.questions}Q</span>
                </Link>
              )
            })}
          </div>
        )}
      </section>

    </div>
  )
}
