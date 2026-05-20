import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Home,
  LibraryBig,
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
  { icon: Home,        label: 'Dashboard', href: '/dashboard' },
  { icon: LibraryBig,  label: 'All Exams', href: '/exams' },
  { icon: BarChart3,   label: 'Analytics', href: '/analytics' },
]

function isNavActive(href: string, pathname: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard'
  if (href === '/exams') return pathname === '/exams' || pathname.startsWith('/exam/')
  return pathname === href || pathname.startsWith(href + '/')
}

function getPageTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard'
  if (pathname.startsWith('/admin')) return 'Admin'
  if (pathname.startsWith('/mock-attempt/')) return 'Mock Attempt'
  if (pathname.startsWith('/mock-test')) return 'Tests'
  if (pathname.startsWith('/pyq/')) return 'Paper'
  if (pathname.startsWith('/analytics')) return 'Analytics'
  if (pathname.startsWith('/exams')) return 'Exams'
  if (pathname.startsWith('/exam/')) return 'Exam'
  return 'Ministry of Papers'
}

function NavGroup({
  title,
  items,
  currentPath,
  onNavigate,
}: {
  title: string
  items: NavItem[]
  currentPath: string
  onNavigate: (href: string) => void
}) {
  return (
    <div className="vault-nav-group">
      <p>{title}</p>
      {items.map((item) => (
        <button
          className={`vault-nav-item${isNavActive(item.href, currentPath) ? ' active' : ''}`}
          type="button"
          key={item.label}
          onClick={() => onNavigate(item.href)}
        >
          <item.icon size={16} />
          <span>{item.label}</span>
        </button>
      ))}
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
    await logout()
    navigate('/')
  }

  const handleNavigate = (href: string) => {
    navigate(href === '/dashboard' ? homePathForUser(user) : href)
  }

  const pageTitle = getPageTitle(location.pathname)

  return (
    <section className="vault-app vault-app-simple">
      <aside className="vault-sidebar vault-sidebar-simple">
        <Link className="vault-logo" to={homePathForUser(user)}>
          <span>
            <svg viewBox="0 0 40 40" fill="none" width="40" height="40" aria-hidden="true">
              <rect width="40" height="40" rx="11" fill="currentColor" />
              <path d="M8 30 L8 12 L16 22 L20 13 L24 22 L32 12 L32 30" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <strong>Ministry of Papers</strong>
        </Link>

        <NavGroup
          title="Menu"
          items={primaryNav}
          currentPath={location.pathname}
          onNavigate={handleNavigate}
        />

        <button className="vault-logout" type="button" onClick={() => void handleLogout()}>
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </aside>

      <div className="vault-workspace">
        <header className="vault-topbar-new">
          <div className="vault-tb-left">
            <span className="vault-tb-title">{pageTitle}</span>
          </div>

          <div className="vault-search-wrap" ref={searchRef}>
            <label className="vault-search">
              <Search size={15} />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search exams, subjects, topics..."
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
    </section>
  )
}
