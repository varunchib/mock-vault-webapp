import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LoginModal } from '../auth/LoginModal'
import { Logo } from '../ui/Logo'
import { homePathForUser } from '../../context/admin'
import { useAuth } from '../../context/useAuth'

export function Navbar() {
  const router = useRouter()
  const [loginOpen, setLoginOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const goToDashboardOrLogin = () => {
    if (isAuthenticated) {
      router.push(homePathForUser(user))
      return
    }
    setLoginOpen(true)
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <>
      <nav className="site-nav">
        <Logo />
        <ul className="nav-mid" aria-label="Primary navigation">
          <li><Link href="/exams">Exams</Link></li>
          <li><a href="/#how">How it works</a></li>
          <li><a href="/#pricing">Pricing</a></li>
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
      </nav>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
