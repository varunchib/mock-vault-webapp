import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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
