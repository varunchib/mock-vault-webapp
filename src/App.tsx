import { BrowserRouter, useLocation } from 'react-router-dom'
import { GoogleProvider } from './components/auth/GoogleProvider'
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
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isLandingRoute = location.pathname === '/'
  const useUserShell = isAuthenticated && !isAdminRoute

  if (isLoading) {
    return <main><section className="public-page"><div className="public-shell"><HaloLoader label="Loading session" /></div></section></main>
  }

  if (useUserShell) {
    return <AppShell><AppRoutes /></AppShell>
  }

  if (isAdminRoute) {
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
  return (
    <GoogleProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppChrome />
        </BrowserRouter>
      </AuthProvider>
    </GoogleProvider>
  )
}
