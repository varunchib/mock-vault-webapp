import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { InboxWidget } from '../common/InboxWidget'
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Home,
  LogOut,
  Search,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { homePathForUser } from '../../context/admin'
import { useAuth } from '../../context/useAuth'
import { fetchExamCatalog, type Exam } from '../../lib/api'

type NavItem = {
  icon: typeof Home
  label: string
  href: string
}

const primaryNav: NavItem[] = [
  { icon: Home,      label: 'Dashboard', href: '/dashboard' },
  { icon: BookOpen,  label: 'All Exams', href: '/exams' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
]

function isNavActive(href: string, pathname: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard'
  if (href === '/exams') return pathname === '/exams' || pathname.startsWith('/exam/')
  return pathname === href || pathname.startsWith(href + '/')
}

function getPageTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard'
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
  const searchRef = useRef<HTMLDivElement | null>(null)
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
  }, [location.pathname])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (searchRef.current && !searchRef.current.contains(target)) setSearchQuery('')
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
        <aside className="vault-sidebar vault-sidebar-simple">
          {/* Logo */}
          <Link className="vault-logo" to={homePathForUser(user)}>
            <span className="vault-logo-mark">
              <svg viewBox="0 0 40 40" fill="none" width="32" height="32" aria-hidden="true">
                <rect width="40" height="40" rx="10" fill="rgba(253,224,71,0.15)" />
                <path d="M8 30 L8 12 L16 22 L20 13 L24 22 L32 12 L32 30" stroke="#FDE047" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="vault-logo-text">
              <strong>Ministry</strong>
              <small>of Papers</small>
            </div>
          </Link>

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
          </nav>

          {/* Bottom: user + logout */}
          <div className="vault-sidebar-bottom">
            <div className="vault-sidebar-user">
              <div className="vault-sidebar-avatar">{avatarInitial}</div>
              <div className="vault-sidebar-user-info">
                <strong>{firstName}</strong>
                <small>{user?.email}</small>
              </div>
            </div>
            <button
              className="vault-logout"
              type="button"
              onClick={() => void handleLogout()}
              aria-label="Logout"
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <div className="vault-workspace">
          <header className="vault-topbar-new">
            <div className="vault-tb-left">
              <Link className="vault-tb-logo" to={homePathForUser(user)} aria-label="Home">
                <svg viewBox="0 0 40 40" fill="none" width="24" height="24" aria-hidden="true">
                  <rect width="40" height="40" rx="10" fill="rgba(253,224,71,0.15)" />
                  <path d="M8 30 L8 12 L16 22 L20 13 L24 22 L32 12 L32 30" stroke="#FDE047" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <span className="vault-tb-title">{pageTitle}</span>
            </div>

            <div className="vault-search-wrap" ref={searchRef}>
              <label className="vault-search">
                <Search size={14} />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search exams, subjects..."
                />
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
              ) : null}
            </div>

            <div className="vault-tb-right">
              <div className="vault-profile-wrap" ref={profileRef}>
                <button
                  className="vault-profile-btn"
                  type="button"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-label="Open profile menu"
                >
                  <div className="vault-tb-avatar">{avatarInitial}</div>
                  <span>{firstName}</span>
                  <ChevronDown size={13} />
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

        {/* Floating inbox widget — logged-in users only */}
        <InboxWidget
          searchTerm={searchQuery.trim() && searchResults.length === 0 ? searchQuery.trim() : undefined}
        />

        {/* Mobile bottom nav — only visible at ≤768px */}
        <nav className="vault-bottom-nav" aria-label="Main navigation">
          {primaryNav.map((item) => (
            <button
              className={`vault-bottom-nav-item${isNavActive(item.href, location.pathname) ? ' active' : ''}`}
              type="button"
              key={item.label}
              onClick={() => handleNavigate(item.href)}
              aria-label={item.label}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </section>
    </>
  )
}
