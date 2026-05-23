import { usePageMeta } from '../lib/usePageMeta'

export function AboutPage() {
  usePageMeta({
    title: 'About — Ministry of Papers',
    description: "Ministry of Papers is India's most complete free platform for previous year exam questions — mission, content policy, and contact.",
    canonicalPath: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Ministry of Papers',
      url: 'https://ministryofpapers.com/about',
      publisher: {
        '@type': 'Organization',
        name: 'Ministry of Papers',
        url: 'https://ministryofpapers.com',
        logo: 'https://ministryofpapers.com/favicon.svg',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@ministryofpapers.com',
          contactType: 'customer support',
        },
      },
    },
  })

  return (
    <section className="public-page">
      <div className="public-shell narrow">
        <div className="legal-page">
          <div className="legal-hero">
            <span className="public-kicker">About Us</span>
            <h1>Ministry of Papers</h1>
            <p>India's most complete free platform for previous year competitive exam questions.</p>
          </div>

          <div className="legal-body">
            <section>
              <h2>Our Mission</h2>
              <p>
                Every year, millions of students across India prepare for competitive exams — UPSC, SSC,
                IBPS, State PSCs, NEET, JEE, and hundreds more. Quality preparation material is either
                scattered across the internet, locked behind paywalls, or buried in PDFs that are hard
                to search and practise from.
              </p>
              <p>
                Ministry of Papers exists to fix that. We collect, solve, and explain every previous year
                question paper we can find, and make it all free — with no login required to read answers.
              </p>
            </section>

            <section>
              <h2>What We Offer</h2>
              <ul>
                <li><strong>12 lakh+ solved questions</strong> from 240+ competitive exams</li>
                <li><strong>Full previous year papers</strong> with official answer keys and detailed explanations</li>
                <li><strong>Free full-length mock tests</strong> with negative marking, automatic scoring, and cutoff analysis</li>
                <li><strong>Subject-wise question banks</strong> — filter by subject, year, or paper</li>
                <li><strong>No paywall on answers</strong> — every question and explanation is free to read without signing in</li>
              </ul>
            </section>

            <section>
              <h2>Content Policy</h2>
              <p>
                All question papers on Ministry of Papers are sourced from official examination bodies —
                UPSC, SSC CGL/CHSL, IBPS, NTA, JKPSC, JKSSB, state PSC commissions, and other authorised
                sources. Original papers are in the public domain. Answer keys follow the official keys
                released by the respective examination body. Explanations are original content created
                by the Ministry of Papers team.
              </p>
              <p>
                If you spot an error in an answer or explanation, use the <strong>Report</strong> button
                on any question page to flag it. We review and correct reported issues promptly.
              </p>
            </section>

            <section>
              <h2>Exams Covered</h2>
              <p>
                We cover central government exams (UPSC CSE, SSC CGL, CHSL, MTS, IBPS PO, IBPS Clerk,
                SBI PO, RRB NTPC, RRB Group D, CTET, NDA), state-level PSC exams across J&K, Rajasthan,
                Bihar, UP, Maharashtra and others, and national entrance tests including NEET UG and
                JEE Main. New papers are added continuously.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                For content corrections, missing papers, partnership inquiries, or API access, write to us at{' '}
                <a href="mailto:hello@ministryofpapers.com">hello@ministryofpapers.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}
