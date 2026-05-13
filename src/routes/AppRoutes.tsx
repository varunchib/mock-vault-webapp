import { Navigate, Route, Routes } from 'react-router-dom'
import type { ReactNode } from 'react'
import { homePathForUser, isAdminUser } from '../context/admin'
import { useAuth } from '../context/useAuth'
import { AdminDashboardPage } from '../pages/AdminDashboardPage'
import { HaloLoader } from '../components/common/HaloLoader'
import { AnalyticsPage } from '../pages/AnalyticsPage'
import { CategoryPage } from '../pages/CategoryPage'
import { AllExamsPage, ExamPage } from '../pages/ExamPage'
import { DashboardPage } from '../pages/DashboardPage'
import { LandingPage } from '../pages/LandingPage'
import { MockAttemptPage } from '../pages/MockAttemptPage'
import { MockDetailPage, MockTestsPage } from '../pages/MockSeoPage'
import { PdfLibraryPage } from '../pages/PdfLibraryPage'
import { PreviousYearPapersPage } from '../pages/PreviousYearPapersPage'
import { PracticePage } from '../pages/PracticePage'
import { PyqPapersLibraryPage } from '../pages/PyqPapersLibraryPage'
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
      <Route path="/pyq-papers" element={<ProtectedPage><PyqPapersLibraryPage /></ProtectedPage>} />
      <Route path="/practice" element={<ProtectedPage><PracticePage /></ProtectedPage>} />
      <Route path="/pdf-library" element={<ProtectedPage><PdfLibraryPage /></ProtectedPage>} />
      <Route path="/analytics" element={<ProtectedPage><AnalyticsPage /></ProtectedPage>} />
      <Route path="/exam" element={<AllExamsPage />} />
      <Route path="/exam/:slug" element={<ExamPage />} />
      <Route path="/exams/:category" element={<CategoryPage />} />
      <Route path="/:examPath/previous-year-papers" element={<PreviousYearPapersPage />} />
      <Route path="/question/:slug" element={<QuestionPage />} />
      <Route path="/pyq/:slug" element={<PyqPaperPage />} />
      <Route path="/mock-test" element={<MockTestsPage />} />
      <Route path="/mock-test/:slug" element={<MockDetailPage />} />
      <Route path="/mock-attempt/:slug" element={<ProtectedPage><MockAttemptPage /></ProtectedPage>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
