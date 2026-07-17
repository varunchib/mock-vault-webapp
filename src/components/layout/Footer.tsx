import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'

const footerColumns = [
  {
    title: 'Exams',
    links: [
      { label: 'UPSC CSE', href: '/exam/upsc-cse' },
      { label: 'SSC CGL / CHSL', href: '/exam/ssc-cgl' },
      { label: 'IBPS PO / Clerk', href: '/exam/ibps-po' },
      { label: 'NEET UG', href: '/exam/neet-ug' },
      { label: 'JEE Main', href: '/exam/jee-main' },
      { label: 'State PSCs', href: '/exams' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'All Exams', href: '/exams' },
      { label: 'Mock Tests', href: '/exams' },
      { label: 'PYQ Papers', href: '/exams' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Contact Us', href: 'mailto:hello@ministryofpapers.com', external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-about">
          <Logo />
          <p>India&apos;s most complete previous year questions platform. Every paper, solved and explained. No paywalls on answers.</p>
          <a
            className="footer-social"
            href="https://x.com/ministryfpapers"
            target="_blank"
            rel="noopener noreferrer me"
            aria-label="Ministry of Papers on X (Twitter)"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
            <span>@ministryfpapers</span>
          </a>
        </div>
        {footerColumns.map((column) => (
          <div className="fc" key={column.title}>
            <h4>{column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  {'external' in link && link.external
                    ? <a href={link.href}>{link.label}</a>
                    : <Link to={link.href}>{link.label}</Link>
                  }
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bot">
        <p>© 2026 Ministry of Papers · Made for India&apos;s aspirants</p>
        <p>
          <Link to="/privacy">Privacy</Link>
          {' · '}
          <Link to="/terms">Terms</Link>
          {' · '}
          UPSC · SSC · IBPS · State PSCs · NEET · JEE
        </p>
      </div>
    </footer>
  )
}
