import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LoginModal } from '../auth/LoginModal'
import { Logo } from '../ui/Logo'
import { homePathForUser } from '../../context/admin'
import { useAuth } from '../../context/useAuth'

const NAV_LINKS = [
  { label: 'Exams', to: '/exams', hash: false },
  { label: 'How it works', to: '/#how', hash: true },
  { label: 'Pricing', to: '/#pricing', hash: true },
]

export function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loginOpen, setLoginOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  // Close the drawer on navigation
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Escape to close + lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const goToDashboardOrLogin = () => {
    setMenuOpen(false)
    if (isAuthenticated) {
      navigate(homePathForUser(user))
      return
    }
    setLoginOpen(true)
  }

  const handleLogout = async () => {
    setMenuOpen(false)
    await logout()
    navigate('/')
  }

  return (
    <>
      <nav className="site-nav">
        <Logo />

        <ul className="nav-mid" aria-label="Primary navigation">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              {l.hash ? <a href={l.to}>{l.label}</a> : <Link to={l.to}>{l.label}</Link>}
            </li>
          ))}
        </ul>

        <div className="nav-end">
          {isAuthenticated && user ? (
            <div className="nav-user">
              {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : <span>{user.name.slice(0, 1)}</span>}
              <div className="nav-user-copy">
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </div>
              <button className="n-login" type="button" onClick={() => void handleLogout()}>Log out</button>
            </div>
          ) : (
            <button className="n-login" type="button" onClick={() => setLoginOpen(true)}>Log in</button>
          )}
          <button className="n-cta" type="button" onClick={goToDashboardOrLogin}>{isAuthenticated ? 'Dashboard' : 'Start Free'}</button>
        </div>

        {/* Mobile: the nav links above are hidden under 960px, so they live in a
            drawer instead of disappearing entirely. */}
        <button
          type="button"
          className="site-nav-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="site-nav-drawer"
        >
          <Menu size={22} />
        </button>
      </nav>

      {menuOpen && <div className="site-nav-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

      <aside id="site-nav-drawer" className={`site-nav-drawer${menuOpen ? ' open' : ''}`}>
        <div className="site-nav-drawer-head">
          <Logo />
          <button type="button" className="site-nav-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="site-nav-drawer-links" aria-label="Mobile navigation">
          {NAV_LINKS.map((l) => (
            l.hash
              ? <a key={l.label} href={l.to} onClick={() => setMenuOpen(false)}>{l.label}</a>
              : <Link key={l.label} to={l.to}>{l.label}</Link>
          ))}
        </nav>

        <div className="site-nav-drawer-foot">
          {isAuthenticated && user ? (
            <>
              <div className="site-nav-drawer-user">
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </div>
              <button className="n-cta" type="button" onClick={goToDashboardOrLogin}>Dashboard</button>
              <button className="n-login" type="button" onClick={() => void handleLogout()}>Log out</button>
            </>
          ) : (
            <>
              <button className="n-cta" type="button" onClick={goToDashboardOrLogin}>Start Free</button>
              <button className="n-login" type="button" onClick={() => { setMenuOpen(false); setLoginOpen(true) }}>Log in</button>
            </>
          )}
        </div>
      </aside>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
