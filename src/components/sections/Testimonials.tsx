import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { TESTIMONIALS } from '../../data'

function renderQuote(quote, highlight) {
  const parts = quote.split('{hl}')
  return (
    <>
      {parts[0]}
      <span className="highlight-word">{highlight}</span>
      {parts[1]}
    </>
  )
}

function TestiCard({ initials, name, exam, quote, highlight }) {
  return (
    <div className="bg-paper border-[1.5px] border-line rounded-2xl p-7">
      <div className="text-hl-dark text-sm tracking-widest mb-3.5">★★★★★</div>
      <p className="font-display text-base font-light italic text-ink leading-[1.6] mb-5">
        "{renderQuote(quote, highlight)}"
      </p>
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-ink text-hl font-display font-bold text-sm flex items-center justify-center shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{name}</p>
          <p className="text-xs text-ink-4">{exam}</p>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-white border-t border-b border-line px-[5%] py-[88px]">
      <FadeIn>
        <SectionHeader
          eyebrow="Student stories"
          title="What aspirants say"
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={t.name} delay={i * 0.08}>
            <TestiCard {...t} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
