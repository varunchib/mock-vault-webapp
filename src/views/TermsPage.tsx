'use client'
import Link from 'next/link'
import { usePageMeta } from '../lib/usePageMeta'

export function TermsPage() {
  usePageMeta({
    title: 'Terms of Service — Ministry of Papers',
    description: 'Terms of Service for Ministry of Papers. Read our terms before using the platform.',
    canonicalPath: '/terms',
  })

  return (
    <section className="public-page">
      <div className="public-shell narrow">
        <div className="legal-page">
          <div className="legal-hero">
            <span className="public-kicker">Legal</span>
            <h1>Terms of Service</h1>
            <p>Effective date: 22 May 2026 &nbsp;·&nbsp; Ministry of Papers, ministryofpapers.com</p>
          </div>

          <div className="legal-body">

            <section>
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using <strong>ministryofpapers.com</strong> ("the Platform"), you agree to be bound by
                these Terms of Service ("Terms") and our <Link href="/privacy">Privacy Policy</Link>. If you do not agree
                to these Terms, you must not use the Platform.
              </p>
              <p>
                These Terms apply to all users including visitors, registered users, and administrators. Use of the
                Platform constitutes acceptance of these Terms.
              </p>
            </section>

            <section>
              <h2>2. Description of the Service</h2>
              <p>Ministry of Papers provides:</p>
              <ul>
                <li>Free access to previous year question papers (PYQs) for Indian competitive exams</li>
                <li>Solved questions with verified answers and detailed explanations</li>
                <li>Mock tests for registered users (requires Google Sign-In)</li>
                <li>Personal performance analytics and exam history for registered users</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any feature of the Platform at any time without
                prior notice. We will not be liable for any modification, suspension, or discontinuation.
              </p>
            </section>

            <section>
              <h2>3. User Accounts and Google Sign-In</h2>
              <p>
                To access mock tests, analytics, and personalised features, you must create an account using
                <strong> Google Sign-In (OAuth 2.0)</strong>. By signing in, you authorise Ministry of Papers to receive
                your name, email address, and Google account identifier as described in our{' '}
                <Link href="/privacy">Privacy Policy</Link>.
              </p>
              <p>You are responsible for:</p>
              <ul>
                <li>Maintaining the security of your Google account</li>
                <li>All activity that occurs under your account</li>
                <li>Notifying us immediately of any unauthorised use of your account</li>
              </ul>
              <p>
                You may revoke Ministry of Papers' access to your Google account at any time via{' '}
                <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
                  Google Account Permissions
                </a>
                . Revoking access will sign you out of the Platform.
              </p>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms or engage in
                abusive behaviour toward the Platform or its users.
              </p>
            </section>

            <section>
              <h2>4. Acceptable Use</h2>
              <p>You agree to use the Platform only for lawful purposes. You agree <strong>not</strong> to:</p>
              <ul>
                <li>Scrape, crawl, or systematically extract content from the Platform using automated tools</li>
                <li>Reverse-engineer, decompile, or attempt to extract source code from the Platform</li>
                <li>Reproduce, republish, or commercially exploit content from the Platform without written permission</li>
                <li>Attempt to gain unauthorised access to any part of the Platform, its servers, or databases</li>
                <li>Use the Platform to distribute spam, malware, or harmful content</li>
                <li>Impersonate any person or misrepresent your affiliation with any entity</li>
                <li>Create multiple accounts to circumvent account restrictions</li>
                <li>Interfere with or disrupt the integrity or performance of the Platform</li>
              </ul>
            </section>

            <section>
              <h2>5. Intellectual Property</h2>
              <p>
                The question papers and exam content available on Ministry of Papers originate from publicly available
                official exam papers published by examination bodies including UPSC, SSC, IBPS, NTA, JKSSB, and state
                PSCs. Ministry of Papers does not claim copyright over official exam papers.
              </p>
              <p>
                The following are owned by Ministry of Papers and protected by applicable intellectual property laws:
              </p>
              <ul>
                <li>Answer explanations, editorial content, and study notes</li>
                <li>Platform design, user interface, and source code</li>
                <li>Branding, logo, and trade names</li>
              </ul>
              <p>
                You may use Platform content for personal, non-commercial study. Any commercial use, redistribution, or
                republication requires prior written consent from Ministry of Papers.
              </p>
            </section>

            <section>
              <h2>6. Disclaimers</h2>
              <p>
                The Platform is provided on an <strong>"as is" and "as available"</strong> basis without warranties of
                any kind, express or implied. We do not warrant that:
              </p>
              <ul>
                <li>The Platform will be uninterrupted, error-free, or free of viruses</li>
                <li>All answers and explanations are 100% accurate or current</li>
                <li>The Platform will meet your specific exam preparation requirements</li>
              </ul>
              <p>
                While we strive for accuracy, <strong>official answer keys from the respective examination bodies
                should always be considered authoritative</strong>. Ministry of Papers is not affiliated with UPSC,
                SSC, IBPS, NTA, or any other official examination body. Exam names are used for identification only.
              </p>
            </section>

            <section>
              <h2>7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, Ministry of Papers and its operators shall not be
                liable for any indirect, incidental, special, consequential, or punitive damages arising from:
              </p>
              <ul>
                <li>Your use of or inability to use the Platform</li>
                <li>Reliance on any content for exam preparation outcomes</li>
                <li>Unauthorised access to or alteration of your data</li>
                <li>Any other matter relating to the Platform</li>
              </ul>
              <p>
                Our total liability to you for any claims under these Terms shall not exceed INR 0, as the Platform is
                provided free of charge.
              </p>
            </section>

            <section>
              <h2>8. Privacy</h2>
              <p>
                Your use of the Platform is also governed by our <Link href="/privacy">Privacy Policy</Link>, which
                explains how we collect, use, and protect your personal data — including data received via Google
                Sign-In. Our Privacy Policy is incorporated into these Terms by reference.
              </p>
            </section>

            <section>
              <h2>9. Third-Party Services</h2>
              <p>
                The Platform integrates with third-party services including Google (authentication and analytics) and
                Cloudflare (CDN and security). Your use of these services is subject to their respective terms and
                privacy policies. We are not responsible for third-party services.
              </p>
            </section>

            <section>
              <h2>10. Changes to These Terms</h2>
              <p>
                We may revise these Terms at any time. We will update the effective date at the top of this page. For
                material changes, we will notify registered users by email at least 14 days before the change takes
                effect. Continued use of the Platform after the effective date constitutes acceptance of the revised
                Terms.
              </p>
            </section>

            <section>
              <h2>11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of
                the Platform shall be subject to the exclusive jurisdiction of the courts of India.
              </p>
            </section>

            <section>
              <h2>12. Contact</h2>
              <p>
                For questions about these Terms:
              </p>
              <ul>
                <li>Email: <a href="mailto:legal@ministryofpapers.com">legal@ministryofpapers.com</a></li>
                <li>Website: <Link href="/">ministryofpapers.com</Link></li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </section>
  )
}
