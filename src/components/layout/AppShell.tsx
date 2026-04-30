import type { ReactNode } from 'react'
import { BookOpenCheck, Bookmark, CircleHelp, ClipboardList, Download, FileText, Home, LibraryBig, LogOut, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

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
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const firstName = user?.name.split(' ')[0] ?? 'Aspirant'
  const avatarInitial = firstName.charAt(0).toUpperCase()

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

        <button className="vault-logout" type="button" onClick={() => void handleLogout()}>
          <LogOut size={17} /> Logout
        </button>
      </aside>

      <div className="vault-workspace">
        <header className="vault-topbar vault-topbar-simple dashboard-topbar">
          <label className="vault-search">
            <Search size={18} />
            <input
              placeholder="Search exam, paper, subject..."
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  const value = (event.currentTarget.value ?? '').trim()
                  navigate(value ? `/exam?q=${encodeURIComponent(value)}` : '/exam')
                }
              }}
            />
          </label>

          <button className="vault-profile dashboard-profile" type="button">
            <span className="dashboard-avatar">{avatarInitial}</span>
            <span>{firstName}</span>
          </button>
        </header>

        <main className="vault-main vault-main-simple dashboard-main">
          {children}
        </main>
      </div>
    </section>
  )
}
