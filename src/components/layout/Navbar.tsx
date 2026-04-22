import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'

const NAV_LINKS = [
  { label: 'Exams',       href: '#exams' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing',     href: '#pricing' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleAnchor = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50 h-[62px]
          flex items-center justify-between px-[5%]
          bg-paper/90 backdrop-blur-md
          border-b border-line
          transition-shadow duration-200
          ${scrolled ? 'shadow-card' : ''}
        `}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-[34px] h-[34px] bg-ink rounded-lg flex items-center justify-center text-hl font-display font-bold text-[17px]">
            P
          </div>
          <span className="font-display font-bold text-[21px] text-ink tracking-tight">
            PYQVault
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 list-none">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={(e) => handleAnchor(e, href)}
                className="text-ink-3 text-sm font-medium no-underline hover:text-ink transition-colors duration-150"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm">Log in</Button>
          <Button variant="primary" size="sm">Start Free →</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-ink-3 hover:text-ink hover:bg-line-2 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-[62px] bg-paper md:hidden">
          <div className="flex flex-col gap-1 p-4">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleAnchor(e, href)}
                className="px-4 py-3 text-base font-medium text-ink-2 no-underline rounded-lg hover:bg-line-2 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4">
              <Button variant="ghost" size="lg" className="w-full justify-center">Log in</Button>
              <Button variant="primary" size="lg" className="w-full justify-center">Start Free →</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
