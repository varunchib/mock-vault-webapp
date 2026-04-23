import { Logo } from '../ui/Logo'

export function Navbar() {
  return (
    <nav className="site-nav">
      <Logo />
      <ul className="nav-mid" aria-label="Primary navigation">
        <li><a href="#exams">Exams</a></li>
        <li><a href="#how">How it works</a></li>
        <li><a href="#pricing">Pricing</a></li>
      </ul>
      <div className="nav-end">
        <button className="n-login" type="button">Log in</button>
        <button className="n-cta" type="button">Start Free →</button>
      </div>
    </nav>
  )
}
