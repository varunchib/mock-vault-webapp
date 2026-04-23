import { howSteps } from '../../data/landing'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function HowItWorks() {
  return (
    <Reveal as="section" className="how-section" id="how">
      <SectionHeader eyebrow="How it works" title="From search to selection in 4 steps" center />
      <div className="how-steps">
        {howSteps.map((step, index) => (
          <div className="how-step" key={step.title}>
            <div className="hs-num">{index + 1}</div>
            <h3 className="hs-title">{step.title}</h3>
            <p className="hs-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </Reveal>
  )
}
