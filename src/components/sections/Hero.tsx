import { useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

const QUICK_TAGS = [
  { label: 'UPSC 2023',   query: 'UPSC Prelims 2023 solved' },
  { label: 'SSC CGL',     query: 'SSC CGL 2023 all shifts' },
  { label: 'JKSSB',       query: 'JKSSB Finance 2024' },
  { label: 'NEET',        query: 'NEET 2023 biology' },
  { label: 'RRB NTPC',   query: 'RRB NTPC 2022 GK' },
  { label: 'Raj. Patwari',query: 'Rajasthan Patwari 2023' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) alert(`Searching: "${query}"\n\n→ Opens results page`)
  }

  return (
    <section className="relative overflow-hidden pt-20 pb-0 flex flex-col items-center text-center px-[5%]">
      {/* Notebook lines */}
      <div className="pointer-events-none absolute inset-0 bg-ruled opacity-35" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full flex flex-col items-center"
      >
        {/* Chip */}
        <motion.div variants={item} className="inline-flex items-center gap-2 bg-hl-bg border border-hl-border text-hl-dark text-[13px] font-semibold px-4 py-[5px] rounded-full mb-7">
          <span className="w-[7px] h-[7px] rounded-full bg-hl-dark animate-blink" />
          New — UPSC 2024 paper just added
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={item}
          className="font-display font-bold text-[clamp(40px,6.5vw,76px)] leading-[1.08] tracking-tight text-ink max-w-[780px] mb-5"
        >
          Every exam paper.{' '}
          <span className="highlight-word">Solved</span>{' '}
          and{' '}
          <span className="italic font-light text-ink-2">free.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p variants={item} className="text-lg text-ink-3 font-light max-w-[500px] leading-[1.65] mb-10">
          Search previous year questions from UPSC, SSC, State PSCs, NEET, JEE and 200+ exams — with complete answers and explanations.
        </motion.p>

        {/* Search bar */}
        <motion.div
          variants={item}
          className="w-full max-w-[600px] flex items-center bg-white border-2 border-line rounded-2xl px-1.5 py-1.5 pl-4 shadow-card-lg focus-within:border-ink transition-colors duration-200 mb-3.5"
        >
          <Search size={18} className="text-ink-4 mr-2 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search — JKSSB 2024, SSC CGL 2023, UPSC Prelims..."
            className="flex-1 border-none outline-none bg-transparent text-[15px] text-ink placeholder:text-ink-4 font-body min-w-0"
          />
          <button
            onClick={handleSearch}
            className="bg-ink text-hl font-semibold text-sm px-5 py-[11px] rounded-[10px] hover:bg-zinc-800 transition-colors duration-150 shrink-0 font-body"
          >
            Search Papers
          </button>
        </motion.div>

        {/* Tags */}
        <motion.div variants={item} className="flex flex-wrap gap-2 justify-center">
          {QUICK_TAGS.map(({ label, query: q }) => (
            <button
              key={label}
              onClick={() => setQuery(q)}
              className="bg-white border-[1.5px] border-line text-ink-3 text-[13px] font-medium px-3.5 py-[5px] rounded-full hover:border-ink hover:text-ink hover:bg-line-2 transition-all duration-150 font-body"
            >
              {label}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
