import { useState } from 'react'
import { Search } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { quickTags } from '../../data/landing'

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Hero() {
  const [query, setQuery] = useState('')

  const runSearch = () => {
    const trimmed = query.trim()
    if (trimmed) {
      window.alert(`Searching for: "${trimmed}"\n\n→ Takes you to results page`)
    }
  }

  return (
    <section className="hero" id="top">
      <div className="hero-lines" aria-hidden="true" />
      <motion.div variants={stagger} initial="hidden" animate="show" className="hero-inner">
        <motion.div variants={item} className="hero-chip">
          <span className="chip-dot" />
          New — UPSC 2024 paper just added
        </motion.div>

        <motion.h1 variants={item}>
          Every exam paper.<br />
          <span className="hl-word">Solved</span> and <span className="italic-word">free.</span>
        </motion.h1>

        <motion.p variants={item} className="hero-sub">
          Search previous year questions from UPSC, SSC, State PSCs, NEET, JEE and 200+ exams — with complete answers and explanations.
        </motion.p>

        <motion.div variants={item} className="search-outer">
          <Search className="s-icon" size={20} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') runSearch()
            }}
            placeholder="Search — JKSSB 2024, SSC CGL 2023, UPSC Prelims..."
            aria-label="Search exam papers"
          />
          <button className="s-btn" type="button" onClick={runSearch}>Search Papers</button>
        </motion.div>

        <motion.div variants={item} className="tag-row" aria-label="Quick searches">
          {quickTags.map((tag) => (
            <button className="s-tag" type="button" key={tag.label} onClick={() => setQuery(tag.query)}>
              {tag.label}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
