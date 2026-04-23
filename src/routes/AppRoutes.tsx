import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { AllExamsPage, ExamPage } from '../pages/ExamPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LandingPage } from '../pages/LandingPage'
import { QuestionPage } from '../pages/QuestionPage'

function ProtectedDashboard() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <DashboardPage /> : <Navigate to="/" replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/exam" element={<AllExamsPage />} />
      <Route path="/exam/:slug" element={<ExamPage />} />
      <Route path="/question/:slug" element={<QuestionPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
