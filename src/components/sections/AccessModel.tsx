import { FadeIn } from '../ui/FadeIn'
import { SectionHeader } from '../ui/SectionHeader'

const FREE_ITEMS = [
  'Every PYQ with full answer & explanation',
  'Browse by exam, year, shift, topic',
  'Attempt any question, see result instantly',
  'Official answer keys & cutoffs',
  '5 full mock tests per month',
  'Share to WhatsApp / Telegram',
]

const PAID_ITEMS = [
  'Unlimited mock tests — all exams',
  'AI weak topic analysis + study plan',
  'Performance history & accuracy charts',
  'Download papers as PDF',
  'State leaderboard — see your rank',
  'Group mock battles with friends',
  'AI doubt solver on any question',
  'No ads, ever',
]

function FreeCard() {
  return (
    <div className="bg-paper border-[1.5px] border-line rounded-2xl p-9">
      <p className="text-xs font-semibold tracking-[1.5px] uppercase text-ink-4 mb-2.5">
        Free · No login ever
      </p>
      <h3 className="font-display text-[22px] font-bold text-ink mb-1.5">
        Everything you need to start
      </h3>
      <p className="text-sm text-ink-3 font-light mb-6">
        Public, Google-indexed, shareable. Come back any time — no account, no tracking.
      </p>
      <ul className="flex flex-col gap-3">
        {FREE_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-ink-2">
            <span className="w-5 h-5 rounded-full bg-brand-green-bg text-brand-green text-[11px] font-bold flex items-center justify-center shrink-0">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PaidCard() {
  return (
    <div className="bg-ink border-[1.5px] border-ink rounded-2xl p-9">
      <p className="text-xs font-semibold tracking-[1.5px] uppercase text-hl mb-2.5">
        Premium · ₹99–299 / month
      </p>
      <h3 className="font-display text-[22px] font-bold text-white mb-1.5">
        For serious aspirants
      </h3>
      <p className="text-sm text-zinc-400 font-light mb-6">
        Everything above, plus analytics, offline access, and AI tools.
      </p>
      <ul className="flex flex-col gap-3">
        {PAID_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-zinc-300">
            <span className="w-5 h-5 rounded-full bg-yellow-400/15 text-hl text-[11px] font-bold flex items-center justify-center shrink-0">
              ★
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AccessModel() {
  return (
    <section className="bg-white border-t border-b border-line px-[5%] py-[88px]">
      <FadeIn>
        <SectionHeader
          eyebrow="Access model"
          title={<>Radically free.<br />Premium when you're ready.</>}
          sub="We keep everything valuable public — because that's how you find us."
        />
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-[900px]">
        <FadeIn delay={0}>
          <FreeCard />
        </FadeIn>
        <FadeIn delay={0.1}>
          <PaidCard />
        </FadeIn>
      </div>
    </section>
  )
}
