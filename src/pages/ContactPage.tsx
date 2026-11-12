import * as React from 'react'
import { usePageMeta } from '../lib/usePageMeta'

export function ContactPage() {
  usePageMeta({
    title: 'Contact Us — Ministry of Papers',
    description: 'Get in touch with Ministry of Papers. Email contacts for general inquiries, content errors, missing paper submissions, and statutory grievance redressal.',
    canonicalPath: '/contact',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Ministry of Papers',
      url: 'https://ministryofpapers.com/contact',
      publisher: {
        '@type': 'Organization',
        name: 'Ministry of Papers',
        url: 'https://ministryofpapers.com',
        logo: 'https://ministryofpapers.com/favicon.svg',
      },
    },
  })

  return React.createElement(React.Fragment, null,
    <section className="public-page">
      <div className="public-shell narrow">
        <div className="legal-page">
          <div className="legal-hero">
            <span className="public-kicker">Get In Touch</span>
            <h1>Contact Us</h1>
            <p>
              We are an open, student-first platform. Whether you have found a typo in an explanation, have a missing paper to share, or need administrative assistance, we respond promptly.
            </p>
          </div>

          <div className="legal-body">
            {/* Contact Channels Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', margin: '20px 0 32px' }}>
              <div style={{ padding: '20px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '17px', color: 'var(--ink, #0f172a)' }}>General Inquiries</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink2, #475569)', margin: '0 0 12px' }}>
                  Partnerships, general feedback, platform suggestions, and student queries.
                </p>
                <a href="mailto:hello@ministryofpapers.com" style={{ fontWeight: 600, color: 'var(--brand, #0f766e)' }}>
                  hello@ministryofpapers.com
                </a>
              </div>

              <div style={{ padding: '20px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '17px', color: 'var(--ink, #0f172a)' }}>Editorial & Error Review</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink2, #475569)', margin: '0 0 12px' }}>
                  Disputed answer keys, formatting issues, typos, or missing explanations.
                </p>
                <a href="mailto:editorial@ministryofpapers.com" style={{ fontWeight: 600, color: 'var(--brand, #0f766e)' }}>
                  editorial@ministryofpapers.com
                </a>
              </div>

              <div style={{ padding: '20px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '17px', color: 'var(--ink, #0f172a)' }}>Grievance Redressal</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink2, #475569)', margin: '0 0 12px' }}>
                  Statutory Grievance Officer under India’s IT Rules 2021 & DPDP Act 2023.
                </p>
                <a href="mailto:grievance@ministryofpapers.com" style={{ fontWeight: 600, color: 'var(--brand, #0f766e)' }}>
                  grievance@ministryofpapers.com
                </a>
              </div>
            </div>

            <section>
              <h2>How to Report an Error on a Question</h2>
              <p>
                If you encounter an error in an answer key or explanation while practicing:
              </p>
              <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                <li>Navigate to the specific question page on Ministry of Papers.</li>
                <li>Click the <strong>Report</strong> flag located in the question actions toolbar.</li>
                <li>Select the error category (Answer key mismatch, typographical error, or explanation clarification).</li>
                <li>Submit your note. Our academic editorial team reviews and updates flagged questions within <strong>48 business hours</strong>.</li>
              </ol>
            </section>

            <section>
              <h2>Submitting Missing Question Papers</h2>
              <p>
                Have an official question paper or answer key from an examination not yet hosted on Ministry of Papers? We welcome community contributions. Please email us at <a href="mailto:editorial@ministryofpapers.com">editorial@ministryofpapers.com</a> with:
              </p>
              <ul>
                <li>The official commission name, examination name, and examination date.</li>
                <li>The scanned PDF of the question paper booklet.</li>
                <li>The official provisional or final revised answer key notification from the commission website.</li>
              </ul>
            </section>

            <section>
              <h2>Operating Address & Jurisdiction</h2>
              <p>
                <strong>Platform:</strong> Ministry of Papers (ministryofpapers.com)<br />
                <strong>Jurisdiction:</strong> Jammu & Kashmir, India<br />
                <strong>Support Hours:</strong> Monday – Saturday, 9:30 AM to 6:30 PM IST (Online email assistance active 7 days a week).
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>,
  )
}
