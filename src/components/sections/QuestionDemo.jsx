import { useState } from 'react'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'

const OPTIONS = [
  { key: 'A', text: 'Beas',    correct: false },
  { key: 'B', text: 'Chenab', correct: true  },
  { key: 'C', text: 'Sutlej', correct: false },
  { key: 'D', text: 'Ravi',   correct: false },
]

const CHECKS = [
  {
    icon: '📌',
    title: 'Each question has its own page URL',
    sub:   'Shareable, bookmarkable, and indexed by Google',
  },
  {
    icon: '💡',
    title: 'Explanation for every single answer',
    sub:   'Why the right option is right — and why others are wrong',
  },
  {
    icon: '📲',
    title: 'Share to WhatsApp in one tap',
    sub:   'Question + answer + link — built-in viral loop',
  },
]

function OptButton({ opt, selected, onPick }) {
  const isSelected = selected === opt.key
  const showResult = selected !== null

  let stateClass = 'bg-white border-line text-ink-2 hover:border-ink-3 hover:bg-line-2'
  if (showResult && opt.correct) {
    stateClass = 'bg-brand-green-bg border-brand-green-border text-brand-green'
  } else if (isSelected && !opt.correct) {
    stateClass = 'bg-red-50 border-red-200 text-red-600'
  }

  let keyClass = 'bg-line-2 text-ink-3'
  if (showResult && opt.correct) keyClass = 'bg-green-100 text-brand-green'
  else if (isSelected && !opt.correct) keyClass = 'bg-red-100 text-red-500'

  return (
    <button
      onClick={() => onPick(opt.key)}
      className={`flex items-center gap-2.5 w-full px-3.5 py-[11px] border-[1.5px] rounded-[10px] text-sm font-medium text-left font-body transition-all duration-150 ${stateClass}`}
    >
      <span className={`w-[26px] h-[26px] rounded-[6px] text-xs font-bold flex items-center justify-center shrink-0 transition-all duration-150 ${keyClass}`}>
        {opt.key}
      </span>
      {opt.text}
    </button>
  )
}

export function QuestionDemo() {
  const [selected, setSelected] = useState(null)
  const [showExp, setShowExp] = useState(false)

  const handlePick = (key) => {
    if (selected !== null) return
    setSelected(key)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'UPSC 2023 Q47 — PYQVault', url: window.location.href })
    } else {
      alert('Share:\nhttps://pyqvault.in/upsc-prelims-2023/q47\nAnswer: Chenab')
    }
  }

  return (
    <section className="bg-white border-t border-b border-line px-[5%] py-[88px]" id="demo">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-[1100px] mx-auto">

        {/* Card */}
        <FadeIn>
          <div className="bg-paper border-[1.5px] border-line rounded-2xl p-7 shadow-card-md">
            {/* Top */}
            <div className="flex items-center justify-between mb-[18px]">
              <span className="bg-hl-bg border border-hl-border text-hl-dark text-xs font-semibold px-2.5 py-[3px] rounded-full">
                UPSC Prelims 2023
              </span>
              <span className="text-xs text-ink-4 font-medium">Q.47 · General Awareness</span>
            </div>

            {/* Question */}
            <p className="font-display text-base font-semibold text-ink leading-[1.55] mb-5">
              Which of the following rivers does <em>not</em> originate within India's territory?
            </p>

            {/* Options */}
            <div className="flex flex-col gap-2.5">
              {OPTIONS.map((opt) => (
                <OptButton key={opt.key} opt={opt} selected={selected} onPick={handlePick} />
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3.5">
              <button
                onClick={() => setShowExp(!showExp)}
                className="flex-1 py-2.5 rounded-lg bg-ink text-hl text-sm font-semibold hover:bg-zinc-800 transition-colors duration-150 font-body"
              >
                📖 {showExp ? 'Hide' : 'See'} Explanation
              </button>
              <button
                onClick={handleShare}
                className="flex-1 py-2.5 rounded-lg bg-line-2 text-ink-2 text-sm font-semibold hover:bg-line transition-colors duration-150 font-body"
              >
                ↗ Share
              </button>
            </div>

            {/* Explanation */}
            {showExp && (
              <div className="mt-3.5 bg-brand-green-bg border-[1.5px] border-brand-green-border rounded-[10px] p-3.5 text-[13px] text-green-800 leading-[1.65]">
                <strong>✓ Answer: Chenab</strong> — Chenab rises from the Bara Lacha Pass in
                Himachal Pradesh and enters Pakistan. Sutlej originates in Tibet (near Mansarovar).
                Beas and Ravi both originate in HP. This is a favourite UPSC trap — river origins
                come up every 2–3 years. Tip: memorise the source + the first country the river flows through.
              </div>
            )}
          </div>
        </FadeIn>

        {/* Right text */}
        <FadeIn delay={0.1}>
          <p className="text-xs font-semibold tracking-[2.5px] uppercase text-ink-4 mb-3">Live demo</p>
          <h2 className="font-display text-[clamp(24px,3.2vw,38px)] font-bold text-ink leading-[1.15] tracking-tight mb-3">
            Attempt. See the answer. Understand why.
          </h2>
          <p className="text-base text-ink-3 font-light leading-[1.7] mb-6">
            No "sign up to see the result". No paywall after question 3. Just pick an option,
            get the answer, read the explanation — and move on.
          </p>

          {CHECKS.map(({ icon, title, sub }) => (
            <div key={title} className="flex gap-3 items-start mt-5">
              <div className="w-7 h-7 rounded-lg bg-hl-bg flex items-center justify-center text-sm shrink-0 mt-0.5">
                {icon}
              </div>
              <div>
                <p className="text-[15px] font-medium text-ink">{title}</p>
                <p className="text-[13px] text-ink-3 font-light mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
