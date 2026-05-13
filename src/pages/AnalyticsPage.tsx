import { BarChart3, ClipboardList, LibraryBig, Timer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { fetchDashboardBootstrap, type Exam, type MockItem } from '../lib/api'
import { orderMocksByAttempt, readMockAttempts } from '../lib/mockActivity'
import { usePageMeta } from '../lib/usePageMeta'

export function AnalyticsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [mocks, setMocks] = useState<MockItem[]>([])
  const [loading, setLoading] = useState(true)

  usePageMeta({
    title: 'Analytics | PYQVault',
    description: 'Preparation activity and mock test analytics.',
    canonicalPath: '/analytics',
  })

  useEffect(() => {
    let cancelled = false

    void fetchDashboardBootstrap()
      .then((data) => {
        if (cancelled) return
        setExams(data.exams)
        setMocks(data.mocks)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const attemptedMocks = useMemo(() => orderMocksByAttempt(mocks), [mocks])
  const attempts = readMockAttempts()
  const enrolledExamCount = new Set(attemptedMocks.map((mock) => mock.examSlug)).size
  const totalMinutes = attemptedMocks.reduce((sum, mock) => sum + mock.durationMinutes, 0)

  if (loading) return <HaloLoader label="Loading analytics" />

  return (
    <section className="workspace-page">
      <header className="workspace-page-head">
        <div>
          <small>Analytics</small>
          <h1>Preparation activity</h1>
        </div>
      </header>

      <section className="analytics-stat-grid">
        <article>
          <span className="analytics-stat-icon"><ClipboardList size={16} /></span>
          <strong>{attempts.length}</strong>
          <span>Mock attempts</span>
        </article>
        <article>
          <span className="analytics-stat-icon"><LibraryBig size={16} /></span>
          <strong>{enrolledExamCount}</strong>
          <span>Enrolled exams</span>
        </article>
        <article>
          <span className="analytics-stat-icon"><Timer size={16} /></span>
          <strong>{totalMinutes}</strong>
          <span>Practice minutes</span>
        </article>
        <article>
          <span className="analytics-stat-icon"><BarChart3 size={16} /></span>
          <strong>{exams.length}</strong>
          <span>Available exams</span>
        </article>
      </section>

      <section className="workspace-section">
        <div className="workspace-section-head">
          <div>
            <small>Recent</small>
            <h2>Last attempted mocks</h2>
          </div>
        </div>
        <div className="workspace-list">
          {attemptedMocks.map((mock) => (
            <Link className="workspace-list-row" to={`/mock-test/${mock.examSlug}`} key={mock.slug}>
              <div>
                <strong>{mock.title}</strong>
                <small>{mock.examName} - {mock.durationMinutes} min</small>
              </div>
              <span>{mock.questions} Qs</span>
            </Link>
          ))}
          {attemptedMocks.length === 0 ? <p>No mock attempts recorded yet.</p> : null}
        </div>
      </section>
    </section>
  )
}
