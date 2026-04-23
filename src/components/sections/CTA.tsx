import { Reveal } from '../ui/Reveal'

export function CTA() {
  return (
    <Reveal as="section" className="cta-section">
      <h2 className="cta-h2">Start preparing.<br /><span className="hl-word-inv">No signup needed.</span></h2>
      <p className="cta-sub">12 lakh questions. 240 exams. Free, forever.</p>
      <div className="cta-btns">
        <button className="cta-primary" type="button">🚀 Search Your Exam — It&apos;s Free</button>
        <button className="cta-secondary" type="button">Browse all 240+ exams →</button>
      </div>
    </Reveal>
  )
}
