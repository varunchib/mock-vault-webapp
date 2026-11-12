import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

export function AboutPage() {
  usePageMeta({
    title: 'About Us — Ministry of Papers | Editorial Policy & Mission',
    description: "Ministry of Papers is India's independent, free platform for previous year competitive exam questions. Discover our mission, 4-step question verification pipeline, and editorial standards.",
    canonicalPath: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Ministry of Papers',
      url: 'https://ministryofpapers.com/about',
      description: "Ministry of Papers provides 100% free, human-verified previous year competitive examination questions, official answer keys, and pedagogical explanations for Indian aspirants.",
      publisher: {
        '@type': 'Organization',
        name: 'Ministry of Papers',
        url: 'https://ministryofpapers.com',
        logo: 'https://ministryofpapers.com/favicon.svg',
        foundingDate: '2024',
        knowsAbout: [
          'UPSC Civil Services Examination',
          'Staff Selection Commission (SSC)',
          'J&K Services Selection Board (JKSSB)',
          'J&K Public Service Commission (JKPSC)',
          'Banking Exams (IBPS, SBI)',
          'State Public Service Commissions',
          'Previous Year Exam Questions & Explanations',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            email: 'hello@ministryofpapers.com',
            contactType: 'general inquiries',
            availableLanguage: ['English', 'Hindi'],
          },
          {
            '@type': 'ContactPoint',
            email: 'editorial@ministryofpapers.com',
            contactType: 'editorial and content corrections',
            availableLanguage: ['English', 'Hindi'],
          },
          {
            '@type': 'ContactPoint',
            email: 'grievance@ministryofpapers.com',
            contactType: 'grievance officer',
            availableLanguage: ['English', 'Hindi'],
          },
        ],
      },
    },
  })

  return React.createElement(React.Fragment, null,
    <section className="public-page">
      <div className="public-shell narrow">
        <div className="legal-page">
          <div className="legal-hero">
            <span className="public-kicker">About Us</span>
            <h1>Ministry of Papers</h1>
            <p>
              India’s independent, public-domain repository of verified competitive exam papers, official answer keys, and pedagogical explanations.
            </p>
          </div>

          <div className="legal-body">
            {/* Mission */}
            <section>
              <h2>Our Mission</h2>
              <p>
                Every year, tens of millions of Indian aspirants prepare for competitive examinations — UPSC, SSC, IBPS, State PSCs, JKSSB, JKPSC, NEET, and JEE. For decades, access to genuine, unmanipulated past papers has been restricted behind expensive commercial paywalls, proprietary subscriptions, or fragmented across poorly scanned PDFs riddled with errors.
              </p>
              <p>
                <strong>Ministry of Papers exists to eliminate this friction entirely.</strong> We believe that previous year exam papers are public records that belong to the student community. We curate, verify, digitize, and explain every question paper released by constitutional and statutory commissions — completely free, with no mandatory sign-in required to read questions and solutions.
              </p>
            </section>

            {/* Platform Stats Grid */}
            <section>
              <h2>Platform at a Glance</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px', margin: '20px 0 28px' }}>
                <div style={{ padding: '16px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brand, #0f766e)' }}>4,000+</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink2, #475569)', marginTop: '4px' }}>Curated & Solved Questions</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brand, #0f766e)' }}>240+</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink2, #475569)', marginTop: '4px' }}>Full Examination Papers</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brand, #0f766e)' }}>100% Free</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink2, #475569)', marginTop: '4px' }}>Zero Paywalls on Solutions</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--brand, #0f766e)' }}>Official Keys</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink2, #475569)', marginTop: '4px' }}>Reconciled with Final Keys</div>
                </div>
              </div>
            </section>

            {/* Editorial Policy */}
            <section id="editorial-policy">
              <h2>Editorial & Question Verification Standards</h2>
              <p>
                To maintain the highest tier of academic reliability, every single question published on Ministry of Papers goes through a strict 4-stage quality assurance protocol before indexing:
              </p>
              <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Authoritative Source Retrieval:</strong> Question papers are collected directly from official gazettes, commission download portals, or archived candidate response sheets released by statutory examination bodies (e.g. UPSC, SSC, JKSSB, JKPSC, BPSC, NTA, IBPS). We never aggregate third-party unofficial memory-based dumps without explicit attribution and verification.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Final Revised Key Reconciliation:</strong> Provisional answer keys frequently contain disputed items. We monitor subsequent commission corrigenda and reconcile every single question with the <em>Final Revised Answer Key</em> issued after candidate objection windows close. If a commission cancels or awards bonus marks for a question, we explicitly annotate the official decision.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Pedagogical Explanations:</strong> Our academic explanations are written to teach, not just confirm. Explanations cite authoritative primary references (NCERT, Government of India portals, constitutional articles, statutory acts, and standard university textbooks), breaking down why the accepted option is correct and why common distractor options fail.
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <strong>Crowdsourced Candidate Reporting & 48-Hour SLA:</strong> Every question page includes an instantaneous "Report" flag. When an aspirant flags an ambiguous statement, translation discrepancy, or typo, our editorial desk reviews the submission against the original paper within 48 business hours.
                </li>
              </ol>
            </section>

            {/* Content Ownership & Fair Use */}
            <section>
              <h2>Public Domain Content & Fair Use Policy</h2>
              <p>
                Question papers set by statutory examination bodies are public records intended for open evaluation of candidates. Ministry of Papers reproduces these historical examination questions strictly for non-commercial educational study, research, and self-evaluation under the fair dealing doctrines of the Indian Copyright Act, 1957.
              </p>
              <p>
                All trademarks, logos, commission names (such as UPSC, SSC, JKSSB, JKPSC, NTA, IBPS), and acronyms belong to their respective statutory authorities. Their usage on Ministry of Papers constitutes nominative fair use solely to identify the origin and examination context of each paper.
              </p>
            </section>

            {/* Key Platform Resources */}
            <section>
              <h2>Core Resources for Aspirants</h2>
              <p>Explore our free research and preparation modules:</p>
              <ul>
                <li>
                  <Link to="/exams"><strong>Exam Hubs & Catalogs:</strong></Link> Filter question banks by commission, year, and subject.
                </li>
                <li>
                  <Link to="/india-physical-geography-map"><strong>Interactive India Physical Geography Map:</strong></Link> High-yield interactive river systems, left/right bank tributaries, and mountain ranges tailored for UPSC & State PSC prelims.
                </li>
                <li>
                  <Link to="/blog/indian-rivers-and-tributaries"><strong>Indian Rivers & Tributaries Guide:</strong></Link> Comprehensive deep dive into Indus, Ganga, Brahmaputra, and Peninsular river basins with direct PYQ practice links.
                </li>
                <li>
                  <Link to="/about"><strong>Detailed Post Guides:</strong></Link> Exhaustive syllabus weightage, eligibility, and pay scales for JKSSB Patwari, JKPSI, JKCCE, SSC CGL, and BPSC.
                </li>
              </ul>
            </section>

            {/* Governance & Contact */}
            <section id="contact">
              <h2>Contact & Grievance Redressal</h2>
              <p>
                Ministry of Papers operates with full administrative transparency. For inquiries, corrections, or grievances, reach out to the appropriate desk:
              </p>
              <ul>
                <li><strong>General Inquiries & Feedback:</strong> <a href="mailto:hello@ministryofpapers.com">hello@ministryofpapers.com</a></li>
                <li><strong>Content & Answer Key Corrections:</strong> <a href="mailto:editorial@ministryofpapers.com">editorial@ministryofpapers.com</a></li>
                <li><strong>Statutory Grievance Redressal Officer:</strong> <a href="mailto:grievance@ministryofpapers.com">grievance@ministryofpapers.com</a></li>
                <li><strong>Headquarters & Operating Jurisdiction:</strong> Jammu & Kashmir, India</li>
              </ul>
              <p style={{ marginTop: '16px' }}>
                You can also consult our dedicated <Link to="/contact">Contact Page</Link>, <Link to="/privacy">Privacy Policy</Link>, and <Link to="/terms">Terms of Service</Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>,
  )
}
