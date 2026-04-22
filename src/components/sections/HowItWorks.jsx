import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'

const STEPS = [
  {
    num: '1',
    title: 'Search or Google it',
    desc: 'Type your exam name here — or just Google "SSC CGL 2023 PYQ" and we show up first.',
  },
  {
    num: '2',
    title: 'Pick year & subject',
    desc: 'Filter to the exact paper — year, shift, topic. No scrolling through irrelevant content.',
  },
  {
    num: '3',
    title: 'Attempt & understand',
    desc: 'Select your answer. See the correct one. Read the explanation. No login required.',
  },
  {
    num: '4',
    title: 'Track & improve',
    desc: 'Take full mocks. Review mistakes. See your weak areas. Upgrade when you\'re serious.',
  },
]

export function HowItWorks() {
  return (
    <section className="px-[5%] py-[88px]" id="how">
      <FadeIn>
        <SectionHeader
          eyebrow="How it works"
          title="From search to selection in 4 steps"
          center
        />
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-14 relative">
        {/* Connecting line — desktop only */}
        <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px bg-line z-0" />

        {STEPS.map((step, i) => (
          <FadeIn key={step.num} delay={i * 0.08}>
            <div className="text-center px-5 py-2 group">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-line font-display text-xl font-bold text-ink flex items-center justify-center mx-auto mb-[18px] relative z-10 transition-all duration-200 group-hover:bg-ink group-hover:text-hl group-hover:border-ink">
                {step.num}
              </div>
              <h3 className="font-display text-[15px] font-bold text-ink mb-1.5">{step.title}</h3>
              <p className="text-[13px] text-ink-3 font-light leading-[1.6]">{step.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
