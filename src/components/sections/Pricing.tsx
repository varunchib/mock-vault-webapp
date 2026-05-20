import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function Pricing() {
  return (
    <Reveal as="section" className="pricing-section" id="pricing">
      <SectionHeader
        eyebrow="Pricing"
        title="Currently free"
        subtitle="We're in early access. Every feature is free while we build — no card, no trial."
      />
      <div className="pricing-free-banner">
        <div className="pfb-chip">FREE</div>
        <div className="pfb-body">
          <strong>All features unlocked at no cost</strong>
          <p>Full PYQ access, mock tests, practice, PDF downloads, analytics — everything. Early access means you get it all free while we grow.</p>
        </div>
        <div className="pfb-list">
          <span>✓ Unlimited PYQs with solutions</span>
          <span>✓ Mock tests — all exams</span>
          <span>✓ Subject-wise practice</span>
          <span>✓ PDF downloads</span>
          <span>✓ Attempt history</span>
          <span>✓ Analytics</span>
        </div>
      </div>
    </Reveal>
  )
}
