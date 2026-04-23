import { Navigate, Route, Routes } from 'react-router-dom'
import { isAdminUser } from '../context/admin'
import { useAuth } from '../context/useAuth'
import { AdminDashboardPage } from '../pages/AdminDashboardPage'
import { AllExamsPage, ExamPage } from '../pages/ExamPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LandingPage } from '../pages/LandingPage'
import { MockDetailPage, MockTestsPage } from '../pages/MockSeoPage'
import { PyqPaperPage } from '../pages/PyqPaperPage'
import { QuestionPage } from '../pages/QuestionPage'

function ProtectedDashboard() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <DashboardPage /> : <Navigate to="/" replace />
}

function ProtectedAdmin() {
  const { user, isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/" replace />
  return isAdminUser(user) ? <AdminDashboardPage /> : <Navigate to="/dashboard" replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="/admin" element={<ProtectedAdmin />} />
      <Route path="/exam" element={<AllExamsPage />} />
      <Route path="/exam/:slug" element={<ExamPage />} />
      <Route path="/question/:slug" element={<QuestionPage />} />
      <Route path="/mock-test" element={<MockTestsPage />} />
      <Route path="/mock-test/:slug" element={<MockDetailPage />} />
      <Route path="/pyq/:slug" element={<PyqPaperPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
