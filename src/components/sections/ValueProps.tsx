import { valueProps } from '../../data/landing'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function ValueProps() {
  return (
    <Reveal as="section" className="vp-section">
      <SectionHeader eyebrow="Why PYQVault" title={'The smartest way\nto crack any exam'} />
      <div className="vp-grid">
        {valueProps.map((card, index) => (
          <Reveal className="vp-card" delay={index * 0.08} key={card.title}>
            <div className="vp-icon">{card.icon}</div>
            <h3 className="vp-title">{card.title}</h3>
            <p className="vp-desc">{card.description}</p>
            <span className="vp-tag">{card.tag}</span>
          </Reveal>
        ))}
      </div>
    </Reveal>
  )
}
