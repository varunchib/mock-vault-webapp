import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const plans = [
  {
    name: 'Explorer',
    amount: '0',
    period: 'Free forever · No card',
    cta: 'Get started free',
    popular: false,
    features: [
      { text: 'All PYQs with full solutions', included: true },
      { text: '5 full mocks per month', included: true },
      { text: 'Basic score & review', included: true },
      { text: 'Unlimited mocks', included: false },
      { text: 'Analytics & tracking', included: false },
      { text: 'PDF downloads', included: false },
    ],
  },
  {
    name: 'Aspirant',
    amount: '149',
    period: 'per month · cancel anytime',
    cta: 'Get Aspirant',
    popular: true,
    features: [
      { text: 'Everything in Explorer', included: true },
      { text: 'Unlimited mock tests', included: true },
      { text: 'AI weak area analysis', included: true },
      { text: 'PDF downloads', included: true },
      { text: 'State leaderboard', included: true },
      { text: 'No ads', included: true },
    ],
  },
  {
    name: 'Pro Scholar',
    amount: '299',
    period: 'per month · best for mains',
    cta: 'Get Pro Scholar',
    popular: false,
    features: [
      { text: 'Everything in Aspirant', included: true },
      { text: 'AI Doubt Solver', included: true },
      { text: 'Group mock challenges', included: true },
      { text: '30/60/90 day planner', included: true },
      { text: 'Early paper access', included: true },
    ],
  },
] as const

export function Pricing() {
  return (
    <Reveal as="section" className="pricing-section" id="pricing">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple, honest pricing"
        subtitle="Free is genuinely free. No 7-day trial tricks. No credit card to start."
      />
      <div className="price-grid">
        {plans.map((plan) => (
          <div className={`price-card ${plan.popular ? 'pop' : ''}`.trim()} key={plan.name}>
            {plan.popular ? <div className="pop-tag">MOST POPULAR</div> : null}
            <div className="p-name">{plan.name}</div>
            <div className="p-amt"><sup>₹</sup>{plan.amount}</div>
            <div className="p-per">{plan.period}</div>
            <ul className="p-feats">
              {plan.features.map((feature) => (
                <li className={`p-feat ${feature.included ? '' : 'no'}`.trim()} key={feature.text}>{feature.text}</li>
              ))}
            </ul>
            <button className={`p-btn ${plan.popular ? 'dark-btn' : 'ghost-btn'}`} type="button">{plan.cta}</button>
          </div>
        ))}
      </div>
    </Reveal>
  )
}
