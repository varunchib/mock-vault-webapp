import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import { homePathForUser, isAdminUser } from '../context/admin'
import { useAuth } from '../context/useAuth'
import { hasSessionHint } from '../lib/sessionHint'
import { HaloLoader } from '../components/common/HaloLoader'

// Eager — public SEO pages must render fast on any cold URL
import { LandingPage }       from '../pages/LandingPage'
import { ExamCatalogPage }   from '../pages/ExamCatalogPage'
import { ExamPage }          from '../pages/ExamPage'
import { QuestionPage }      from '../pages/QuestionPage'
import { PyqPaperPage }      from '../pages/PyqPaperPage'
import { PrivacyPolicyPage } from '../pages/PrivacyPolicyPage'
import { TermsPage }         from '../pages/TermsPage'
import { AboutPage }         from '../pages/AboutPage'
import { PostGuidePage }     from '../pages/PostGuidePage'

// Lazy — auth-gated or heavy pages not needed on initial load
const DashboardPage       = lazy(() => import('../pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const AdminDashboardPage  = lazy(() => import('../pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })))
const AnalyticsPage       = lazy(() => import('../pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })))
const ExamAnalyticsPage   = lazy(() => import('../pages/ExamAnalyticsPage').then(m => ({ default: m.ExamAnalyticsPage })))
const PaperAttemptPage    = lazy(() => import('../pages/PaperAttemptPage').then(m => ({ default: m.PaperAttemptPage })))
const AdminUserAnalyticsOverview = lazy(() => import('../pages/AdminUserAnalyticsPage').then(m => ({ default: m.AdminUserAnalyticsOverview })))
const AdminUserExamAnalytics     = lazy(() => import('../pages/AdminUserAnalyticsPage').then(m => ({ default: m.AdminUserExamAnalytics })))

const Loader = () => (
  <section className="public-page">
    <div className="public-shell"><HaloLoader label="Loading" /></div>
  </section>
)

function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>
}


function RootRoute() {
  const { user, isAuthenticated, isLoading } = useAuth()
  // Waiting on the session check here made every anonymous visitor stare at a
  // small loader (footer visible right under it), then the landing content
  // arrived and shoved the footer off-screen — a single ~0.5 CLS and seconds
  // of LCP delay on slow connections. Anonymous visitors (no session hint)
  // are the overwhelming majority and the SEO-critical case: give them the
  // landing page immediately. Returning signed-in users keep the loader for
  // the brief moment before their dashboard redirect.
  if (isLoading && hasSessionHint()) return <Loader />
  if (isLoading) return <LandingPage />
  return isAuthenticated ? <Navigate to={homePathForUser(user)} replace /> : <LandingPage />
}

function ProtectedDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <Loader />
  if (!isAuthenticated) return <Navigate to="/" replace />
  return isAdminUser(user) ? <Navigate to="/admin" replace /> : <Lazy><DashboardPage /></Lazy>
}

function ProtectedPage({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <Loader />
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function ProtectedAdmin() {
  const { user, isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <Loader />
  if (!isAuthenticated) return <Navigate to="/" replace />
  return isAdminUser(user) ? <Lazy><AdminDashboardPage /></Lazy> : <Navigate to="/dashboard" replace />
}

function ProtectedAdminPage({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <Loader />
  if (!isAuthenticated) return <Navigate to="/" replace />
  return isAdminUser(user) ? <>{children}</> : <Navigate to="/dashboard" replace />
}

// /mock-test/<exam> used to be a page of its own. The series now lives in the
// exam page's Mock Tests tab, so send anyone arriving on the old URL straight
// there rather than leaving a dead link or a duplicate of the same content.
function MockTestRedirect() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/exam/${slug}?tab=mocks` : '/exams'} replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                   element={<RootRoute />} />
      <Route path="/dashboard"          element={<ProtectedDashboard />} />
      <Route path="/admin"              element={<ProtectedAdmin />} />
      <Route path="/admin/users/:id/analytics"           element={<ProtectedAdminPage><Lazy><AdminUserAnalyticsOverview /></Lazy></ProtectedAdminPage>} />
      <Route path="/admin/users/:id/analytics/:examSlug" element={<ProtectedAdminPage><Lazy><AdminUserExamAnalytics /></Lazy></ProtectedAdminPage>} />
      <Route path="/exams"              element={<ExamCatalogPage />} />
      <Route path="/exam/:slug"          element={<ExamPage />} />
      {/* /exam/:slug/overview retired — the Worker 301s it to /guide/:slug */}
      <Route path="/analytics"              element={<ProtectedPage><Lazy><AnalyticsPage /></Lazy></ProtectedPage>} />
      <Route path="/analytics/:examSlug"  element={<ProtectedPage><Lazy><ExamAnalyticsPage /></Lazy></ProtectedPage>} />
      <Route path="/question/:slug"     element={<QuestionPage />} />
      <Route path="/pyq/:slug"          element={<PyqPaperPage />} />
      {/* The test series moved into the exam page's Mock Tests tab; this
          route stays so existing links and bookmarks still land somewhere. */}
      <Route path="/mock-test/:slug"    element={<MockTestRedirect />} />      {/* Mocks run in the same exam environment as previous year papers —
          one intro screen, timer, palette, fullscreen rule and result screen,
          not a second implementation that drifts from it. */}
      <Route path="/mock-attempt/:slug"  element={<ProtectedPage><Lazy><PaperAttemptPage /></Lazy></ProtectedPage>} />
      <Route path="/paper-attempt/:slug" element={<ProtectedPage><Lazy><PaperAttemptPage /></Lazy></ProtectedPage>} />
      <Route path="/guide/:postSlug" element={<PostGuidePage />} />
      <Route path="/privacy"      element={<PrivacyPolicyPage />} />
      <Route path="/terms"        element={<TermsPage />} />
      <Route path="/about"        element={<AboutPage />} />
      {/* Legacy redirects */}
      <Route path="/exam"        element={<Navigate to="/exams" replace />} />
      <Route path="/mock-test"   element={<Navigate to="/exams" replace />} />
      <Route path="/pyq-papers"  element={<Navigate to="/exams" replace />} />
      <Route path="/pdf-library" element={<Navigate to="/exams" replace />} />
      <Route path="/tests"       element={<Navigate to="/exams" replace />} />
      <Route path="/practice"    element={<Navigate to="/exams" replace />} />
      <Route path="/attempted"   element={<Navigate to="/analytics" replace />} />
      <Route path="*"            element={<Navigate to="/" replace />} />
    </Routes>
  )
}
