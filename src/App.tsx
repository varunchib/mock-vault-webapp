import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { AuthProvider } from './components/auth/AuthProvider'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { AppShell } from './components/layout/AppShell'
import { HaloLoader } from './components/common/HaloLoader'
import { hasSessionHint } from './lib/sessionHint'
import { useAuth } from './context/useAuth'
import { resolveTheme, useThemePref } from './lib/useTheme'
import { AppRoutes } from './routes/AppRoutes'

// Routes that genuinely need the verified user before they can render. Only
// these wait on the session check; every public/SEO page paints immediately.
const AUTH_REQUIRED = /^\/(dashboard|admin|analytics|mock-attempt|paper-attempt)/

function AppChrome() {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()
  const themePref = useThemePref()

  // Dark mode is a logged-in experience only. It applies inside the app shell
  // (dashboard, analytics, admin, attempts, and content pages while signed in)
  // — never on the public landing / marketing / SEO pages. `authedForLayout`
  // already gates the app shell; the landing route is excluded explicitly.
  const authedForLayout = isAuthenticated || (isLoading && hasSessionHint())
  const darkEligible = authedForLayout && location.pathname !== '/'
  useEffect(() => {
    const resolved = darkEligible ? resolveTheme(themePref) : 'light'
    document.documentElement.setAttribute('data-theme', resolved)
    const mc = document.querySelector('meta[name="theme-color"]')
    if (mc) mc.setAttribute('content', resolved === 'dark' ? '#1E1E1E' : '#FAFAF7')
  }, [darkEligible, themePref])
  // Follow the OS live while the preference is "system" (and dark is eligible).
  useEffect(() => {
    if (!(darkEligible && themePref === 'system')) return
    const m = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const t = m.matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', t)
      const mc = document.querySelector('meta[name="theme-color"]')
      if (mc) mc.setAttribute('content', t === 'dark' ? '#1E1E1E' : '#FAFAF7')
    }
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [darkEligible, themePref])

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
    if (!id || typeof window.gtag !== 'function') return
    window.gtag('config', id, { page_path: location.pathname + location.search })
  }, [location.pathname, location.search])
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isAttemptRoute = location.pathname.startsWith('/mock-attempt') || location.pathname.startsWith('/paper-attempt')
  const isLandingRoute = location.pathname === '/'

  // Block ONLY the routes that need the verified user. Public/SEO pages render
  // immediately instead of every visitor waiting on a session network round-trip
  // — the single biggest LCP/CLS win for anonymous search traffic.
  if (isLoading && AUTH_REQUIRED.test(location.pathname)) {
    return <main><section className="public-page"><div className="public-shell"><HaloLoader label="Loading session" /></div></section></main>
  }

  const useUserShell = authedForLayout && !isAdminRoute && !isAttemptRoute

  if (useUserShell) {
    return <AppShell><AppRoutes /></AppShell>
  }

  if (isAdminRoute) {
    return <main><AppRoutes /></main>
  }

  if (isAttemptRoute) {
    return <main><AppRoutes /></main>
  }

  return (
    <div className={isLandingRoute ? 'landing-layout' : 'subpage-layout'}>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  // GoogleOAuthProvider is intentionally NOT mounted here — it now lives inside
  // LoginModal, so Google's gsi/client script loads only when someone opens the
  // login dialog instead of on every anonymous page view.
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppChrome />
      </BrowserRouter>
    </AuthProvider>
  )
}
