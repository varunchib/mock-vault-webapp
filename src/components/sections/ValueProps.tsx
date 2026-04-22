import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'

const PROPS = [
  {
    icon: '📄',
    title: 'Every PYQ, fully solved',
    desc: 'Not just the question — every answer comes with a detailed explanation, common traps, and related concepts. No paywalls, ever.',
    tag: 'Free always',
  },
  {
    icon: '🔍',
    title: 'Google finds us first',
    desc: 'Each question has its own page — just Google any PYQ and we\'re the first result. Share directly to your WhatsApp study group.',
    tag: 'No login needed',
  },
  {
    icon: '🗂️',
    title: 'Organised by year, shift & subject',
    desc: 'Filter by exam → year → shift → topic. Drill into exactly the paper you want in 3 clicks. 240+ exams covered.',
    tag: '240+ exams',
  },
]

export function ValueProps() {
  return (
    <section className="px-[5%] py-[88px]">
      <FadeIn>
        <SectionHeader
          eyebrow="Why PYQVault"
          title={<>The smartest way<br />to crack any exam</>}
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
        {PROPS.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.08}>
            <div className="bg-white border border-line rounded-2xl p-8 hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="text-[28px] mb-[18px]">{p.icon}</div>
              <h3 className="font-display text-xl font-bold text-ink mb-2">{p.title}</h3>
              <p className="text-sm text-ink-3 leading-[1.7] font-light">{p.desc}</p>
              <span className="mt-4 inline-block text-xs font-semibold bg-hl-bg text-hl-dark px-2.5 py-[3px] rounded-full">
                {p.tag}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
