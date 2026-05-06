import { Navigate, Route, Routes } from 'react-router-dom'
import { isAdminUser } from '../context/admin'
import { useAuth } from '../context/useAuth'
import { AdminDashboardPage } from '../pages/AdminDashboardPage'
import { HaloLoader } from '../components/common/HaloLoader'
import { AllExamsPage, ExamPage } from '../pages/ExamPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LandingPage } from '../pages/LandingPage'
import { MockDetailPage, MockTestsPage } from '../pages/MockSeoPage'
import { PreviousYearPapersPage } from '../pages/PreviousYearPapersPage'
import { PyqPaperPage } from '../pages/PyqPaperPage'
import { QuestionPage } from '../pages/QuestionPage'

function RootRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <section className="public-page"><div className="public-shell"><HaloLoader label="Loading session" /></div></section>
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />
}

function ProtectedDashboard() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <section className="public-page"><div className="public-shell"><HaloLoader label="Loading session" /></div></section>
  }

  return isAuthenticated ? <DashboardPage /> : <Navigate to="/" replace />
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
      <Route path="/exam" element={<AllExamsPage />} />
      <Route path="/exam/:slug" element={<ExamPage />} />
      <Route path="/:examPath/previous-year-papers" element={<PreviousYearPapersPage />} />
      <Route path="/question/:slug" element={<QuestionPage />} />
      <Route path="/pyq/:slug" element={<PyqPaperPage />} />
      <Route path="/mock-test" element={<MockTestsPage />} />
      <Route path="/mock-test/:slug" element={<MockDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
