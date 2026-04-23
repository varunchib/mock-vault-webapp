import { useMemo, useState } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

type OptionKey = 'A' | 'B' | 'C' | 'D'

const options: Array<{ key: OptionKey; label: string }> = [
  { key: 'A', label: 'Beas' },
  { key: 'B', label: 'Chenab' },
  { key: 'C', label: 'Sutlej' },
  { key: 'D', label: 'Ravi' },
]

export function QuestionDemo() {
  const correctAnswer = 'B'
  const [selected, setSelected] = useState<OptionKey>('C')
  const [showExplanation, setShowExplanation] = useState(false)

  const optionState = useMemo(() => {
    return options.reduce<Record<OptionKey, 'right' | 'wrong' | ''>>((state, option) => {
      if (option.key === correctAnswer) state[option.key] = 'right'
      else if (option.key === selected) state[option.key] = 'wrong'
      else state[option.key] = ''
      return state
    }, { A: '', B: '', C: '', D: '' })
  }, [selected])

  const shareQuestion = async () => {
    const shareData = {
      title: 'UPSC 2023 Q47 — PYQVault',
      text: 'UPSC Prelims 2023 Q47. Answer: Chenab.',
      url: window.location.href,
    }

    if (navigator.share) {
      await navigator.share(shareData)
      return
    }

    window.alert('Share:\nhttps://pyqvault.in/upsc-prelims-2023/q47\nAnswer: Chenab')
  }

  return (
    <section className="demo-section" id="demo">
      <div className="demo-inner">
        <Reveal className="q-card">
          <div className="q-top">
            <span className="q-pill">UPSC Prelims 2023</span>
            <span className="q-meta">Q.47 · General Awareness</span>
          </div>
          <p className="q-text">Which of the following rivers does <em>not</em> originate within India&apos;s territory?</p>
          <div className="q-opts" role="radiogroup" aria-label="Question options">
            {options.map((option) => (
              <button
                className={`q-opt ${optionState[option.key]}`.trim()}
                type="button"
                role="radio"
                aria-checked={selected === option.key}
                key={option.key}
                onClick={() => setSelected(option.key)}
              >
                <span className="key">{option.key}</span>
                {option.label}
              </button>
            ))}
          </div>
          <div className="q-actions">
            <button className="qa-btn primary" type="button" onClick={() => setShowExplanation((value) => !value)}>📖 Explanation</button>
            <button className="qa-btn ghost" type="button" onClick={() => void shareQuestion()}>↗ Share</button>
          </div>
          {showExplanation ? (
            <div className="q-exp">
              <strong>✓ Answer: Chenab</strong> — Chenab rises from the Bara Lacha Pass in Himachal Pradesh and enters Pakistan. Sutlej originates in Tibet near Mansarovar. Beas and Ravi both originate in HP. This is a favourite UPSC trap — river origins come up every 2–3 years.
            </div>
          ) : null}
        </Reveal>

        <Reveal className="demo-right" delay={0.08}>
          <SectionHeader eyebrow="Live demo" title="Attempt. See the answer. Understand why." />
          <p className="demo-copy">
            No &quot;sign up to see the result&quot;. No paywall after question 3. Just pick an option, get the answer, read the explanation — and move on.
          </p>
          <div className="check-item">
            <div className="ci-icon">📌</div>
            <div className="ci-text">Each question has its own page URL <small>Shareable, bookmarkable, and indexed by Google</small></div>
          </div>
          <div className="check-item">
            <div className="ci-icon">💡</div>
            <div className="ci-text">Explanation for every single answer <small>Why the right option is right — and why others are wrong</small></div>
          </div>
          <div className="check-item">
            <div className="ci-icon">📲</div>
            <div className="ci-text">Share to WhatsApp in one tap <small>Question + answer + link — built-in viral loop</small></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
