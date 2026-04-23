import { testimonials } from '../../data/landing'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function Testimonials() {
  return (
    <Reveal as="section" className="testi-section">
      <SectionHeader eyebrow="Student stories" title="What aspirants say" />
      <div className="testi-grid">
        {testimonials.map((testimonial) => (
          <article className="testi-card" key={testimonial.name}>
            <div className="testi-stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p className="testi-quote">
              &quot;{testimonial.quoteStart}<span className="testi-hl">{testimonial.highlight}</span>{testimonial.quoteEnd}&quot;
            </p>
            <div className="testi-author">
              <div className="testi-avatar">{testimonial.initials}</div>
              <div>
                <div className="testi-name">{testimonial.name}</div>
                <div className="testi-exam">{testimonial.exam}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Reveal>
  )
}
