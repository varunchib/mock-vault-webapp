import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { AuthProvider } from './components/auth/AuthProvider'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { AppShell } from './components/layout/AppShell'
import { HaloLoader } from './components/common/HaloLoader'
import { hasSessionHint } from './components/auth/AuthProvider'
import { useAuth } from './context/useAuth'
import { AppRoutes } from './routes/AppRoutes'

// Routes that genuinely need the verified user before they can render. Only
// these wait on the session check; every public/SEO page paints immediately.
const AUTH_REQUIRED = /^\/(dashboard|admin|analytics|mock-attempt|paper-attempt)/

function AppChrome() {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()

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

  // While auth is still resolving on a public route, fall back to the session
  // hint so a returning signed-in user gets the app shell without a public->shell
  // flip. The hint only picks the layout; it never grants access.
  const authedForLayout = isAuthenticated || (isLoading && hasSessionHint())
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
