import { useState } from 'react'
import { Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { quickTags } from '../../data/landing'

// The hero is the LCP element — it must paint the moment React renders, not
// after framer-motion's chunk loads and animates it up from opacity 0 (that
// was ~2.7s of "element render delay" in Lighthouse). The entrance animation
// is a pure-CSS fade/rise (see .hero-enter in index.css) that starts from the
// first painted frame, so LCP sees it immediately. Below-fold sections keep
// their framer-motion Reveals — they're never the LCP.
export function Hero() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const runSearch = (value = query) => {
    const trimmed = value.trim()
    if (!trimmed) {
      navigate('/exams')
      return
    }
    navigate(`/exams?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <section className="hero" id="top">
      <div className="hero-lines" aria-hidden="true" />
      <Link className="hero-rivers-preview" to="/rivers-of-india" aria-label="Explore the interactive Rivers of India map">
        <span className="hero-rivers-preview-map" aria-hidden="true">
          <img src="/india-state-boundaries.svg" alt="" />
          <svg viewBox="0 0 612 720" focusable="false">
            <path d="M226.9 156.5 L210.1 180.8 L237.3 238.1 L254.1 263.9 L285.5 287.2 L310.6 289.5 L350.4 282.5 L392.2 289.5 L413.2 298.7 L421.5 314.9 L436.2 324" />
            <path d="M216.4 154 L191.3 178.3 L189.2 212 L206 245.1 L237.3 266.2 L285.5 287.2" />
            <path d="M530.4 195.2 L568 190.4 L565.9 221.5 L572.2 238.1 L551.3 245.1 L530.4 254.5 L499 266.2 L492.7 268.6 L467.6 268.6 L452.9 277.9 L450.8 296.4" />
            <path d="M285.5 349.1 L247.8 355.9 L216.4 355.9 L174.6 358.2 L143.2 362.7 L111.8 367.2 L92.9 371.7" />
            <path d="M111.8 412 L143.2 427.6 L185 432 L237.3 438.7 L258.3 443.1 L285.5 465.1 L296 480.4" />
          </svg>
        </span>
        <span className="hero-rivers-preview-copy">
          <strong>Rivers of India</strong>
          <span>Explore the interactive map <span aria-hidden="true">→</span></span>
        </span>
      </Link>
      <div className="hero-inner hero-enter">
        <div className="hero-chip">
          <span className="chip-dot" />
          New - UPSC 2026 paper just added
        </div>

        <h1>
          Every exam paper.<br />
          <span className="hl-word">Solved</span> and <span className="italic-word">free.</span>
        </h1>

        <p className="hero-sub">
          Search previous year questions from UPSC, SSC, State PSCs, NEET, JEE and 200+ exams - with complete answers and explanations.
        </p>

        <div className="search-outer">
          <Search className="s-icon" size={20} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') runSearch()
            }}
            placeholder="Search - JKSSB 2024, SSC CGL 2023, UPSC Prelims..."
            aria-label="Search exam papers"
          />
          <button className="s-btn" type="button" onClick={() => runSearch()}>Search Papers</button>
        </div>

        <div className="tag-row" aria-label="Quick searches">
          {quickTags.map((tag) => (
            <button className="s-tag" type="button" key={tag.label} onClick={() => runSearch(tag.query)}>
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
