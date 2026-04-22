import { Check, X } from 'lucide-react'
import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'
import { PRICING_PLANS } from '../../data'

function PriceCard({ plan }) {
  const { name, price, period, popular, features, cta, ctaStyle } = plan

  return (
    <div className={`relative rounded-2xl p-8 border-[1.5px] ${popular ? 'bg-ink border-ink' : 'bg-paper border-line'}`}>
      {popular && (
        <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 bg-hl text-ink text-[11px] font-bold px-4 py-[3px] rounded-full tracking-wide">
          MOST POPULAR
        </div>
      )}

      <p className={`text-xs font-semibold tracking-[1.5px] uppercase mb-2.5 ${popular ? 'text-hl mt-2' : 'text-ink-4'}`}>
        {name}
      </p>

      <div className={`font-display text-[40px] font-bold leading-none mb-0.5 ${popular ? 'text-white' : 'text-ink'}`}>
        <sup className="text-xl">₹</sup>{price}
      </div>

      <p className={`text-[13px] mb-6 ${popular ? 'text-zinc-500' : 'text-ink-4'}`}>{period}</p>

      <ul className="flex flex-col gap-2.5 mb-7">
        {features.map(({ text, included }) => (
          <li key={text} className={`flex items-center gap-2 text-sm ${
            included
              ? popular ? 'text-zinc-300' : 'text-ink-2'
              : popular ? 'text-zinc-600' : 'text-ink-4'
          }`}>
            {included
              ? <Check size={14} className="text-brand-green shrink-0" />
              : <X size={14} className="shrink-0 opacity-50" />
            }
            {text}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-[10px] text-sm font-semibold font-body transition-all duration-150 border-[1.5px] ${
          ctaStyle === 'primary'
            ? 'bg-hl text-ink border-transparent hover:bg-yellow-300'
            : popular
              ? 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-white'
              : 'bg-white text-ink border-line hover:border-ink-2'
        }`}
      >
        {cta}
      </button>
    </div>
  )
}

export function Pricing() {
  return (
    <section className="bg-white border-t border-line px-[5%] py-[88px]" id="pricing">
      <FadeIn>
        <SectionHeader
          eyebrow="Pricing"
          title="Simple, honest pricing"
          sub="Free is genuinely free. No 7-day trial tricks. No credit card to start."
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 items-start">
        {PRICING_PLANS.map((plan, i) => (
          <FadeIn key={plan.id} delay={i * 0.08}>
            <PriceCard plan={plan} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
