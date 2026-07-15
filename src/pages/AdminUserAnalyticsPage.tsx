import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import { APIError, fetchAdminUserAnalytics, type AdminUserAnalytics } from '../lib/api'
import type { CombinedResult } from '../lib/mockActivity'
import { AnalyticsPage } from './AnalyticsPage'
import { ExamAnalyticsPage } from './ExamAnalyticsPage'

// Shared loader for a target user's server-reconstructed analytics.
function useUserAnalytics(id: string) {
  const [data, setData] = useState<AdminUserAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)
    fetchAdminUserAnalytics(id)
      .then((d) => { if (alive) setData(d) })
      .catch((e) => { if (alive) setError(e instanceof APIError ? e.message : 'Failed to load analytics') })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [id])

  return { data, loading, error }
}

function AdminBar({ backTo, backLabel, user }: {
  backTo: string
  backLabel: string
  user?: { name: string; email: string }
}) {
  return (
    <div className="admin-analytics-bar">
      <Link to={backTo} className="admin-analytics-back">
        <ArrowLeft size={15} /> <span>{backLabel}</span>
      </Link>
      {user && (
        <div className="admin-analytics-who">
          <span className="admin-analytics-avatar">{user.name.charAt(0).toUpperCase()}</span>
          <div className="admin-analytics-who-text">
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </div>
        </div>
      )}
    </div>
  )
}

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="admin-analytics-view">{children}</div>
}

// Route: /admin/users/:id/analytics  → the user's analytics overview
export function AdminUserAnalyticsOverview() {
  const { id = '' } = useParams<{ id: string }>()
  const { data, loading, error } = useUserAnalytics(id)

  if (loading) {
    return (
      <Frame>
        <AdminBar backTo="/admin" backLabel="Back to admin" />
        <div className="admin-analytics-state"><HaloLoader label="Loading analytics" /></div>
      </Frame>
    )
  }
  if (error || !data) {
    return (
      <Frame>
        <AdminBar backTo="/admin" backLabel="Back to admin" />
        <div className="admin-analytics-state">{error ?? 'Could not load analytics.'}</div>
      </Frame>
    )
  }

  return (
    <Frame>
      <AdminBar backTo="/admin" backLabel="Back to admin" user={data.user} />
      <div className="admin-analytics-body">
        <AnalyticsPage
          source={{
            results: data.results as CombinedResult[],
            linkBase: `/admin/users/${id}/analytics`,
            header: {
              eyebrow: 'Admin · User Analytics',
              title: `${data.user.name}'s Performance`,
              subtitle: 'Exactly what this user sees — tap an exam for score position, cutoff, and leaderboard.',
            },
          }}
        />
      </div>
    </Frame>
  )
}

// Route: /admin/users/:id/analytics/:examSlug  → per-exam deep dive
export function AdminUserExamAnalytics() {
  const { id = '', examSlug = '' } = useParams<{ id: string; examSlug: string }>()
  const { data, loading, error } = useUserAnalytics(id)

  const examResults = useMemo(
    () => ((data?.results ?? []) as CombinedResult[]).filter((r) => r.examSlug === examSlug),
    [data, examSlug],
  )

  if (loading) {
    return (
      <Frame>
        <AdminBar backTo={`/admin/users/${id}/analytics`} backLabel="Analytics" />
        <div className="admin-analytics-state"><HaloLoader label="Loading analytics" /></div>
      </Frame>
    )
  }
  if (error || !data) {
    return (
      <Frame>
        <AdminBar backTo={`/admin/users/${id}/analytics`} backLabel="Analytics" />
        <div className="admin-analytics-state">{error ?? 'Could not load analytics.'}</div>
      </Frame>
    )
  }

  return (
    <Frame>
      <AdminBar backTo={`/admin/users/${id}/analytics`} backLabel={`${data.user.name}'s analytics`} user={data.user} />
      <div className="admin-analytics-body">
        <ExamAnalyticsPage
          source={{
            examSlug,
            results: examResults,
            userName: data.user.name,
            backTo: `/admin/users/${id}/analytics`,
            backLabel: `${data.user.name}'s analytics`,
            asUserId: id,
          }}
        />
      </div>
    </Frame>
  )
}
