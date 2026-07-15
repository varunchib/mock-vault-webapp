import { BrowserRouter, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { AuthProvider } from './components/auth/AuthProvider'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { AppShell } from './components/layout/AppShell'
import { HaloLoader } from './components/common/HaloLoader'
import { useAuth } from './context/useAuth'
import { AppRoutes } from './routes/AppRoutes'

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
  const useUserShell = isAuthenticated && !isAdminRoute && !isAttemptRoute

  if (isLoading) {
    return <main><section className="public-page"><div className="public-shell"><HaloLoader label="Loading session" /></div></section></main>
  }

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
