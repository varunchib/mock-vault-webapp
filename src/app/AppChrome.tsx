'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Navbar }          from '../components/layout/Navbar'
import { Footer }          from '../components/layout/Footer'
import { AppShell }        from '../components/layout/AppShell'
import { HaloLoader }      from '../components/common/HaloLoader'
import { useAuth }         from '../context/useAuth'
import { homePathForUser } from '../context/admin'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

// Protected routes require authentication. Unauthenticated visitors are
// redirected to '/' before the page component mounts — preventing the flash
// of an error state from a failed authenticated API call.
const PROTECTED_PREFIXES = ['/dashboard', '/analytics', '/admin']

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname      = usePathname()
  const router        = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

  // ── Google Analytics page-view tracking ─────────────────────────────────
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    if (!id || typeof window.gtag !== 'function') return
    window.gtag('config', id, { page_path: pathname })
  }, [pathname])

  // ── Auth-driven redirects ────────────────────────────────────────────────
  const isLandingRoute   = pathname === '/' || pathname === ''
  const isProtectedRoute = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))

  // Authenticated user lands on the public landing page (e.g. just logged in,
  // or manually navigated to '/'). Send them to their home screen.
  useEffect(() => {
    if (!isLoading && isAuthenticated && isLandingRoute) {
      router.replace(homePathForUser(user))
    }
  }, [isLoading, isAuthenticated, isLandingRoute, user, router])

  // Unauthenticated user on a protected page (e.g. just logged out while on
  // /dashboard, or direct URL visit without a session). Send them home.
  useEffect(() => {
    if (!isLoading && !isAuthenticated && isProtectedRoute) {
      router.replace('/')
    }
  }, [isLoading, isAuthenticated, isProtectedRoute, router])

  // ── Layout decisions ─────────────────────────────────────────────────────
  const isAdminRoute   = pathname.startsWith('/admin')
  const isAttemptRoute = pathname.startsWith('/mock-attempt') || pathname.startsWith('/paper-attempt')
  const useUserShell   = isAuthenticated && !isAdminRoute && !isAttemptRoute

  // Initial session check
  if (isLoading) {
    return (
      <main>
        <section className="public-page">
          <div className="public-shell"><HaloLoader label="Loading session" /></div>
        </section>
      </main>
    )
  }

  // Suppress the flash that would occur while the redirect effects above are
  // queued but not yet executed. Both redirect conditions show a loader so
  // the user never sees the wrong layout for even one frame.
  if (isAuthenticated && isLandingRoute)   return <main><section className="public-page"><div className="public-shell"><HaloLoader /></div></section></main>
  if (!isAuthenticated && isProtectedRoute) return <main><section className="public-page"><div className="public-shell"><HaloLoader /></div></section></main>

  if (useUserShell)                         return <AppShell>{children}</AppShell>
  if (isAdminRoute || isAttemptRoute)       return <main>{children}</main>

  return (
    <div className={isLandingRoute ? 'landing-layout' : 'subpage-layout'}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
