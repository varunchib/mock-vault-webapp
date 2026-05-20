function LogoMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="currentColor" />
      <path
        d="M8 30 L8 12 L16 22 L20 13 L24 22 L32 12 L32 30"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo() {
  return (
    <a className="logo" href="/" aria-label="Ministry of Papers">
      <span className="logo-mark">
        <LogoMark />
      </span>
      <span className="logo-words">
        <span className="logo-words-top">MINISTRY</span>
        <span className="logo-words-sub">of papers</span>
      </span>
    </a>
  )
}
