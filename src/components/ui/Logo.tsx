import { Link } from 'react-router-dom'

function LogoMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Colours come from CSS so the mark can invert on dark surfaces:
          the square follows `color`, the glyph follows --logo-glyph. */}
      <rect className="logo-mark-bg" width="40" height="40" rx="11" />
      <path
        className="logo-mark-glyph"
        d="M8 30 L8 12 L16 22 L20 13 L24 22 L32 12 L32 30"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type LogoProps = {
  /** Route to link to. Falls back to a plain <a href="/"> when omitted. */
  to?: string
  /** Mark only, no wordmark — for tight spots like the mobile topbar. */
  markOnly?: boolean
  className?: string
}

export function Logo({ to, markOnly = false, className }: LogoProps) {
  const cls = ['logo', markOnly ? 'logo-mark-only' : '', className].filter(Boolean).join(' ')

  const inner = (
    <>
      <span className="logo-mark">
        <LogoMark />
      </span>
      {!markOnly && (
        <span className="logo-words">
          <span className="logo-words-top">MINISTRY</span>
          <span className="logo-words-sub">of papers</span>
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link className={cls} to={to} aria-label="Ministry of Papers">
        {inner}
      </Link>
    )
  }

  return (
    <a className={cls} href="/" aria-label="Ministry of Papers">
      {inner}
    </a>
  )
}
