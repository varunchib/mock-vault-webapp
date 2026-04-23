import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const freeItems = [
  'Every PYQ with full answer & explanation',
  'Browse by exam, year, shift, topic',
  'Attempt any question, see result instantly',
  'Official answer keys & cutoffs',
  '5 full mock tests per month',
  'Share to WhatsApp / Telegram',
]

const paidItems = [
  'Unlimited mock tests — all exams',
  'AI weak topic analysis + study plan',
  'Performance history & accuracy charts',
  'Download papers as PDF',
  'State leaderboard — see your rank',
  'Group mock battles with friends',
  'AI doubt solver on any question',
  'No ads, ever',
]

export function AccessModel() {
  return (
    <Reveal as="section" className="access-section">
      <SectionHeader
        eyebrow="Access model"
        title={'Radically free.\nPremium when you\'re ready.'}
        subtitle="We keep everything valuable public — because that's how you find us."
      />

      <div className="access-grid">
        <div className="access-card free-card">
          <div className="ac-label">Free · No login ever</div>
          <h3 className="ac-title">Everything you need to start</h3>
          <p className="ac-sub">Public, Google-indexed, shareable. Come back any time — no account, no tracking.</p>
          <div className="ac-list">
            {freeItems.map((item) => (
              <div className="ac-item" key={item}><span className="ic yes">✓</span>{item}</div>
            ))}
          </div>
        </div>

        <div className="access-card paid-card">
          <div className="ac-label">Premium · ₹99–299/month</div>
          <h3 className="ac-title">For serious aspirants</h3>
          <p className="ac-sub">Everything above, plus analytics, offline access, and AI tools.</p>
          <div className="ac-list">
            {paidItems.map((item) => (
              <div className="ac-item" key={item}><span className="ic star">★</span>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
