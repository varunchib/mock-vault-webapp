import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import { homePathForUser, isAdminUser } from '../context/admin'
import { useAuth } from '../context/useAuth'
import { hasSessionHint } from '../lib/sessionHint'
import { HaloLoader } from '../components/common/HaloLoader'
import { RouteErrorBoundary } from '../components/common/RouteErrorBoundary'

// Eager — only the landing page stays in the initial entry bundle for instant LCP
import { LandingPage }       from '../pages/LandingPage'

// Lazy — split every secondary route into its own chunk so visitors on /
// don't download guideIntelligence.ts, postGuides.ts, Rivers map, or paper pages.
const ExamCatalogPage   = lazy(() => import('../pages/ExamCatalogPage').then(m => ({ default: m.ExamCatalogPage })))
const ExamPage          = lazy(() => import('../pages/ExamPage').then(m => ({ default: m.ExamPage })))
const QuestionPage      = lazy(() => import('../pages/QuestionPage').then(m => ({ default: m.QuestionPage })))
const PyqPaperPage      = lazy(() => import('../pages/PyqPaperPage').then(m => ({ default: m.PyqPaperPage })))
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })))
const TermsPage         = lazy(() => import('../pages/TermsPage').then(m => ({ default: m.TermsPage })))
const AboutPage         = lazy(() => import('../pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ContactPage       = lazy(() => import('../pages/ContactPage').then(m => ({ default: m.ContactPage })))
const DisclaimerPage    = lazy(() => import('../pages/DisclaimerPage').then(m => ({ default: m.DisclaimerPage })))
const PostGuidePage     = lazy(() => import('../pages/PostGuidePage').then(m => ({ default: m.PostGuidePage })))
const RiversOfIndiaPage = lazy(() => import('../pages/RiversOfIndiaPage').then(m => ({ default: m.RiversOfIndiaPage })))
const IndianRiversBlogPage = lazy(() => import('../pages/IndianRiversBlogPage').then(m => ({ default: m.IndianRiversBlogPage })))
const JkssbVocabBlogPage   = lazy(() => import('../pages/VocabBlogPage').then(m => ({ default: m.JkssbVocabBlogPage })))
const SscCglVocabBlogPage  = lazy(() => import('../pages/VocabBlogPage').then(m => ({ default: m.SscCglVocabBlogPage })))
const BlogIndexPage     = lazy(() => import('../pages/BlogIndexPage').then(m => ({ default: m.BlogIndexPage })))

// Lazy — auth-gated or heavy pages not needed on initial load
const ConstitutionExplorerPage = lazy(() => import('../pages/ConstitutionExplorerPage').then(m => ({ default: m.ConstitutionExplorerPage })))
const HistoryTimelinePage      = lazy(() => import('../pages/HistoryTimelinePage').then(m => ({ default: m.HistoryTimelinePage })))
const RamsarWetlandsPage       = lazy(() => import('../pages/RamsarWetlandsPage').then(m => ({ default: m.RamsarWetlandsPage })))
const DashboardPage       = lazy(() => import('../pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const AdminDashboardPage  = lazy(() => import('../pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })))
const AnalyticsPage       = lazy(() => import('../pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })))
const StudyMaterialPage   = lazy(() => import('../pages/StudyMaterialPage').then(m => ({ default: m.StudyMaterialPage })))
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
  // The boundary sits OUTSIDE Suspense: the failure happens while the chunk is
  // being fetched, and a boundary inside the fallback would never see it.
  return (
    <RouteErrorBoundary>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </RouteErrorBoundary>
  )
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
      <Route path="/exams"              element={<Lazy><ExamCatalogPage /></Lazy>} />
      <Route path="/exam/:slug"          element={<Lazy><ExamPage /></Lazy>} />
      {/* /exam/:slug/overview retired — the Worker 301s it to /guide/:slug */}
      <Route path="/analytics"              element={<ProtectedPage><Lazy><AnalyticsPage /></Lazy></ProtectedPage>} />
      <Route path="/analytics/:examSlug"  element={<ProtectedPage><Lazy><ExamAnalyticsPage /></Lazy></ProtectedPage>} />
      <Route path="/study-material"       element={<Lazy><StudyMaterialPage /></Lazy>} />
      <Route path="/question/:slug"     element={<Lazy><QuestionPage /></Lazy>} />
      <Route path="/pyq/:slug"          element={<Lazy><PyqPaperPage /></Lazy>} />
      {/* The test series moved into the exam page's Mock Tests tab; this
          route stays so existing links and bookmarks still land somewhere. */}
      <Route path="/mock-test/:slug"    element={<MockTestRedirect />} />      {/* Mocks run in the same exam environment as previous year papers —
          one intro screen, timer, palette, fullscreen rule and result screen,
          not a second implementation that drifts from it. */}
      <Route path="/mock-attempt/:slug"  element={<ProtectedPage><Lazy><PaperAttemptPage /></Lazy></ProtectedPage>} />
      <Route path="/paper-attempt/:slug" element={<ProtectedPage><Lazy><PaperAttemptPage /></Lazy></ProtectedPage>} />
      <Route path="/guide/:postSlug" element={<Lazy><PostGuidePage /></Lazy>} />
      <Route path="/privacy"      element={<Lazy><PrivacyPolicyPage /></Lazy>} />
      <Route path="/terms"        element={<Lazy><TermsPage /></Lazy>} />
      <Route path="/about"        element={<Lazy><AboutPage /></Lazy>} />
      <Route path="/contact"      element={<Lazy><ContactPage /></Lazy>} />
      <Route path="/disclaimer"   element={<Lazy><DisclaimerPage /></Lazy>} />
      <Route path="/india-physical-geography-map" element={<Lazy><RiversOfIndiaPage /></Lazy>} />
      <Route path="/constitution-of-india" element={<Lazy><ConstitutionExplorerPage /></Lazy>} />
      <Route path="/modern-indian-history-timeline" element={<Lazy><HistoryTimelinePage /></Lazy>} />
      <Route path="/ramsar-wetlands-and-national-parks" element={<Lazy><RamsarWetlandsPage /></Lazy>} />
      <Route path="/blog" element={<Lazy><BlogIndexPage /></Lazy>} />
      <Route path="/blog/indian-rivers-and-tributaries" element={<Lazy><IndianRiversBlogPage /></Lazy>} />
      <Route path="/blog/jkssb-most-repeated-synonyms-antonyms" element={<Lazy><JkssbVocabBlogPage /></Lazy>} />
      <Route path="/blog/ssc-cgl-most-repeated-synonyms-antonyms" element={<Lazy><SscCglVocabBlogPage /></Lazy>} />
      <Route path="/blog/jkssb-ssc-cgl-repeated-antonyms-synonyms-idioms" element={<Navigate to="/blog/jkssb-most-repeated-synonyms-antonyms" replace />} />
      <Route path="/rivers-of-india" element={<Navigate to="/india-physical-geography-map" replace />} />
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
