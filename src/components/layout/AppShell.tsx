import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { InboxWidget } from '../common/InboxWidget'
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Home,
  Inbox,
  LogOut,
  Menu,
  Search,
  X,
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { homePathForUser } from '../../context/admin'
import { useAuth } from '../../context/useAuth'
import { fetchExamCatalog, type Exam } from '../../lib/api'
import { Logo } from '../ui/Logo'

type NavItem = {
  icon: typeof Home
  label: string
  href: string
}

const primaryNav: NavItem[] = [
  { icon: Home,      label: 'Home',      href: '/dashboard' },
  { icon: BookOpen,  label: 'All Exams', href: '/exams' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
]

function isNavActive(href: string, pathname: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard'
  if (href === '/exams') return pathname === '/exams' || pathname.startsWith('/exam/')
  return pathname === href || pathname.startsWith(href + '/')
}

function getPageTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Home'
  if (pathname.startsWith('/admin')) return 'Admin'
  if (pathname.startsWith('/mock-attempt/')) return 'Mock Test'
  if (pathname.startsWith('/mock-test')) return 'Tests'
  if (pathname.startsWith('/pyq/')) return 'Paper'
  if (pathname.startsWith('/analytics')) return 'Analytics'
  if (pathname.startsWith('/exams')) return 'Exams'
  if (pathname.startsWith('/exam/')) return 'Exam'
  return 'Ministry of Papers'
}

function LogoutOverlay() {
  return (
    <div className="logout-overlay">
      <div className="logout-overlay-inner">
        <svg className="logout-spinner" viewBox="0 0 50 50" aria-hidden="true">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span>Logging out</span>
      </div>
    </div>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const firstName = user?.name.split(' ')[0] ?? 'Aspirant'
  const avatarInitial = firstName.charAt(0).toUpperCase()
  const [searchQuery, setSearchQuery] = useState('')
  const [allExams, setAllExams] = useState<Exam[]>([])
  const [profileOpen, setProfileOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  // Mobile nav drawer (replaces the old bottom bar at <=768px)
  const [navOpen, setNavOpen] = useState(false)
  // Search is an overlay now, opened from the magnifier in the topbar
  const [searchOpen, setSearchOpen] = useState(false)
  const [inboxOpen, setInboxOpen] = useState(false)
  const [inboxUnread, setInboxUnread] = useState(false)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const profileRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let cancelled = false
    void fetchExamCatalog()
      .then((catalog) => { if (!cancelled) setAllExams(catalog) })
      .catch(() => { if (!cancelled) setAllExams([]) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    setSearchQuery('')
    setProfileOpen(false)
    setNavOpen(false)
    setSearchOpen(false)
    setInboxOpen(false)
  }, [location.pathname])

  // Search overlay: focus the field on open, Escape to close, lock scroll.
  // Ctrl/Cmd+K opens it from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!searchOpen) return
    searchInputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [searchOpen])

  // Close the drawer on Escape, and lock body scroll while it is open so the
  // page behind does not scroll under the overlay on touch devices.
  useEffect(() => {
    if (!navOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setNavOpen(false) }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [navOpen])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const searchResults = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase()
    if (!normalized) return []
    return allExams
      .filter((exam) =>
        [exam.name, exam.shortName, exam.category, exam.description, ...exam.subjects]
          .join(' ')
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 7)
  }, [allExams, searchQuery])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      navigate('/')
    } catch {
      setIsLoggingOut(false)
    }
  }

  const handleNavigate = (href: string) => {
    navigate(href === '/dashboard' ? homePathForUser(user) : href)
  }

  const pageTitle = getPageTitle(location.pathname)

  return (
    <>
      {isLoggingOut && <LogoutOverlay />}
      <section className="vault-app vault-app-simple">
        {/* Backdrop for the mobile drawer — desktop keeps the sidebar docked */}
        {navOpen && (
          <div className="vault-nav-overlay" onClick={() => setNavOpen(false)} aria-hidden="true" />
        )}

        <aside
          className={`vault-sidebar vault-sidebar-simple${navOpen ? ' open' : ''}`}
          id="vault-nav"
        >
          {/* Logo and the drawer close button share one row so they sit level.
              The close button is mobile-only; on desktop this row is just the logo. */}
          <div className="vault-sidebar-head">
            <Logo to={homePathForUser(user)} className="vault-logo" />
            <button
              type="button"
              className="vault-nav-close"
              onClick={() => setNavOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav */}
          <nav className="vault-nav">
            <p className="vault-nav-label">Menu</p>
            {primaryNav.map((item) => (
              <button
                className={`vault-nav-item${isNavActive(item.href, location.pathname) ? ' active' : ''}`}
                type="button"
                key={item.label}
                onClick={() => handleNavigate(item.href)}
              >
                <span className="vault-nav-icon"><item.icon size={16} /></span>
                <span>{item.label}</span>
              </button>
            ))}

            {/* Suggestions inbox — opens a panel rather than routing */}
            <button
              className={`vault-nav-item${inboxOpen ? ' active' : ''}`}
              type="button"
              onClick={() => { setInboxOpen(true); setNavOpen(false) }}
            >
              <span className="vault-nav-icon"><Inbox size={16} /></span>
              <span>Inbox</span>
              {inboxUnread && <span className="vault-nav-dot" aria-label="Unread reply" />}
            </button>
          </nav>

        </aside>

        <div className="vault-workspace">
          <header className="vault-topbar-new">
            <div className="vault-tb-left">
              <button
                type="button"
                className="vault-nav-toggle"
                onClick={() => setNavOpen(true)}
                aria-label="Open menu"
                aria-expanded={navOpen}
                aria-controls="vault-nav"
              >
                <Menu size={20} />
              </button>
              <Logo to={homePathForUser(user)} markOnly className="vault-tb-logo" />
              <span className="vault-tb-title">{pageTitle}</span>
            </div>

            <div className="vault-tb-right">
              <button
                type="button"
                className="vault-tb-icon-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Search exams"
              >
                <Search size={18} />
              </button>

              <div className="vault-profile-wrap" ref={profileRef}>
                <button
                  className="vault-profile-btn"
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-label="Open profile menu"
                >
                  <div className="vault-tb-avatar">{avatarInitial}</div>
                </button>

                {profileOpen ? (
                  <div className="vault-profile-menu">
                    <strong>{user?.name}</strong>
                    <small>{user?.email}</small>
                    <button type="button" onClick={() => void handleLogout()}>
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <main className="vault-main-new">
            {children}
          </main>
        </div>

        {/* Search overlay — replaces the old always-on topbar input */}
        {searchOpen && (
          <div className="vault-search-overlay" onClick={() => setSearchOpen(false)}>
            <div
              className="vault-search-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Search exams"
              onClick={(e) => e.stopPropagation()}
            >
              <label className="vault-search">
                <Search size={16} />
                <input
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search exams, subjects..."
                />
                <button
                  type="button"
                  className="vault-search-close"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </label>

              {searchQuery.trim() ? (
                <div className="vault-search-results">
                  {searchResults.length ? (
                    searchResults.map((exam) => (
                      <button
                        className="vault-search-result"
                        type="button"
                        key={exam.slug}
                        onClick={() => navigate(`/exam/${exam.slug}`)}
                      >
                        <span>{exam.icon}</span>
                        <div>
                          <strong>{exam.shortName}</strong>
                          <small>{exam.name}</small>
                        </div>
                        <ChevronRight size={14} />
                      </button>
                    ))
                  ) : (
                    <div className="vault-search-empty">
                      <strong>No matching exams</strong>
                      <small>Try exam name, category, or subject.</small>
                    </div>
                  )}
                </div>
              ) : (
                <p className="vault-search-hint">Start typing to find an exam.</p>
              )}
            </div>
          </div>
        )}

        {/* Suggestions inbox — opened from the sidebar, logged-in users only */}
        <InboxWidget
          open={inboxOpen}
          onClose={() => setInboxOpen(false)}
          onUnreadChange={setInboxUnread}
          searchTerm={searchQuery.trim() && searchResults.length === 0 ? searchQuery.trim() : undefined}
        />

      </section>
    </>
  )
}
