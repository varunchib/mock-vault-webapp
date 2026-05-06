import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import {
  BookOpenCheck,
  Bookmark,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Download,
  FileText,
  Home,
  LibraryBig,
  LogOut,
  Search,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { fetchExamCatalog, type Exam } from '../../lib/api'

type NavItem = {
  icon: typeof Home
  label: string
  href: string
}

const primaryNav: NavItem[] = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: ClipboardList, label: 'Mock Tests', href: '/mock-test' },
  { icon: FileText, label: 'PYQ Papers', href: '/exam' },
  { icon: BookOpenCheck, label: 'Practice', href: '/exam' },
]

const libraryNav: NavItem[] = [
  { icon: LibraryBig, label: 'All Exams', href: '/exam' },
  { icon: Bookmark, label: 'Saved Questions', href: '/dashboard' },
  { icon: Download, label: 'PDF Library', href: '/exam' },
  { icon: CircleHelp, label: 'Doubts', href: '/dashboard' },
]

function NavGroup({
  title,
  items,
  onNavigate,
}: {
  title: string
  items: NavItem[]
  onNavigate: (href: string) => void
}) {
  return (
    <div className="vault-nav-group">
      <p>{title}</p>
      {items.map((item) => (
        <button className="vault-nav-item" type="button" key={item.label} onClick={() => onNavigate(item.href)}>
          <item.icon size={18} />
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
      .then((catalog) => {
        if (!cancelled) {
          setAllExams(catalog)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAllExams([])
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    setSearchQuery('')
    setProfileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node

      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchQuery('')
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  const searchResults = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase()
    if (!normalized) return []

    return allExams
      .filter((exam) =>
        [
          exam.name,
          exam.shortName,
          exam.category,
          exam.description,
          ...exam.subjects,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 6)
  }, [allExams, searchQuery])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <section className="vault-app vault-app-simple">
      <aside className="vault-sidebar vault-sidebar-simple">
        <Link className="vault-logo" to="/dashboard">
          <span>P</span>
          <strong>PYQVault</strong>
        </Link>

        <NavGroup title="Prepare" items={primaryNav} onNavigate={navigate} />
        <NavGroup title="Library" items={libraryNav} onNavigate={navigate} />
      </aside>

      <div className="vault-workspace">
        <header className="vault-topbar vault-topbar-simple dashboard-topbar">
          <div className="vault-search-wrap" ref={searchRef}>
            <label className="vault-search">
              <Search size={18} />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search exams..."
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
                        <small>{exam.category} exam</small>
                      </div>
                      <ChevronRight size={16} />
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

          <div className="vault-profile-wrap" ref={profileRef}>
            <button
              className="vault-profile dashboard-profile dashboard-profile-trigger"
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
            >
              <span className="dashboard-avatar">{avatarInitial}</span>
            </button>

            {profileOpen ? (
              <div className="vault-profile-menu">
                <strong>{firstName}</strong>
                <small>{user?.email}</small>
                <button type="button" onClick={() => void handleLogout()}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : null}
          </div>
        </header>

        <main className="vault-main vault-main-simple dashboard-main">
          {children}
        </main>
      </div>
    </section>
  )
}
