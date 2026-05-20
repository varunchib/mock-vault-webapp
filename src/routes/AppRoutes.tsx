import { Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { homePathForUser, isAdminUser } from '../context/admin'
import { useAuth } from '../context/useAuth'
import { AdminDashboardPage } from '../pages/AdminDashboardPage'
import { HaloLoader } from '../components/common/HaloLoader'
import { AnalyticsPage } from '../pages/AnalyticsPage'
import { ExamCatalogPage } from '../pages/ExamCatalogPage'
import { ExamPage } from '../pages/ExamPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LandingPage } from '../pages/LandingPage'
import { MockAttemptPage } from '../pages/MockAttemptPage'
import { PaperAttemptPage } from '../pages/PaperAttemptPage'
import { MockDetailPage } from '../pages/MockSeoPage'
import { TestsPage } from '../pages/TestsPage'
import { PyqPaperPage } from '../pages/PyqPaperPage'
import { QuestionPage } from '../pages/QuestionPage'

function RootRoute() {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <section className="public-page"><div className="public-shell"><HaloLoader label="Loading session" /></div></section>
  }

  return isAuthenticated ? <Navigate to={homePathForUser(user)} replace /> : <LandingPage />
}

function ProtectedDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <section className="public-page"><div className="public-shell"><HaloLoader label="Loading session" /></div></section>
  }

  if (!isAuthenticated) return <Navigate to="/" replace />
  return isAdminUser(user) ? <Navigate to="/admin" replace /> : <DashboardPage />
}

function ProtectedPage({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <section className="public-page"><div className="public-shell"><HaloLoader label="Loading session" /></div></section>
  }

  return isAuthenticated ? children : <Navigate to="/" replace />
}

function ProtectedAdmin() {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <section className="public-page"><div className="public-shell"><HaloLoader label="Loading session" /></div></section>
  }

  if (!isAuthenticated) return <Navigate to="/" replace />
  return isAdminUser(user) ? <AdminDashboardPage /> : <Navigate to="/dashboard" replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="/admin" element={<ProtectedAdmin />} />
      <Route path="/exams" element={<ExamCatalogPage />} />
      <Route path="/exam/:slug" element={<ExamPage />} />
      <Route path="/tests" element={<ProtectedPage><TestsPage /></ProtectedPage>} />
      <Route path="/analytics" element={<ProtectedPage><AnalyticsPage /></ProtectedPage>} />
      <Route path="/question/:slug" element={<QuestionPage />} />
      <Route path="/pyq/:slug" element={<PyqPaperPage />} />
      <Route path="/mock-test/:slug" element={<MockDetailPage />} />
      <Route path="/mock-attempt/:slug" element={<ProtectedPage><MockAttemptPage /></ProtectedPage>} />
      <Route path="/paper-attempt/:slug" element={<ProtectedPage><PaperAttemptPage /></ProtectedPage>} />
      {/* Legacy redirects */}
      <Route path="/exam" element={<Navigate to="/exams" replace />} />
      <Route path="/mock-test" element={<Navigate to="/tests" replace />} />
      <Route path="/pyq-papers" element={<Navigate to="/tests?tab=papers" replace />} />
      <Route path="/pdf-library" element={<Navigate to="/tests?tab=papers" replace />} />
      <Route path="/practice" element={<Navigate to="/exams" replace />} />
      <Route path="/attempted" element={<Navigate to="/analytics" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
