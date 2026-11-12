import * as React from 'react'
import { usePageMeta } from '../lib/usePageMeta'

export function DisclaimerPage() {
  usePageMeta({
    title: 'Disclaimer & Non-Affiliation Statement — Ministry of Papers',
    description: 'Disclaimer of government affiliation, nominative trademark fair use, and content policy for Ministry of Papers.',
    canonicalPath: '/disclaimer',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Disclaimer — Ministry of Papers',
      url: 'https://ministryofpapers.com/disclaimer',
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
            <span className="public-kicker">Legal</span>
            <h1>Disclaimer</h1>
            <p>Non-affiliation declaration, trademark ownership, and educational fair dealing.</p>
          </div>

          <div className="legal-body">
            <div className="legal-limited-use" style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderLeft: '4px solid #ef4444' }}>
              <strong style={{ color: '#991b1b' }}>Official Government Non-Affiliation Notice</strong>
              <p style={{ color: '#7f1d1d' }}>
                Ministry of Papers (ministryofpapers.com) is an independent, privately run educational resource. It is <strong>not affiliated with, associated with, authorized by, endorsed by, or in any way officially connected</strong> with any government department, ministry, statutory commission, recruitment board, or examination authority.
              </p>
            </div>

            <section>
              <h2>1. Trademarks and Nominative Fair Use</h2>
              <p>
                All examination names, department titles, commission acronyms, and institutional emblems — including but not limited to <strong>UPSC, SSC, JKSSB, JKPSC, BPSC, IBPS, NTA, NEET, JEE, CTET, and RRB</strong> — are registered or unregistered trademarks of their respective statutory bodies or government organizations.
              </p>
              <p>
                Reference to any specific examination or recruiting body on Ministry of Papers is made strictly for identification purposes (nominative fair use) to inform aspirants of the origin and syllabus of a given question paper. Such use does not imply any partnership, sponsorship, or endorsement.
              </p>
            </section>

            <section>
              <h2>2. Nature of Content & Educational Purpose</h2>
              <p>
                All past question papers presented on this platform are public domain examination papers originally released by public authorities for candidate assessment. Ministry of Papers organizes and reproduces these historical papers under the fair dealing provisions of the Indian Copyright Act, 1957, strictly for non-commercial educational study, practice, and scholarship.
              </p>
              <p>
                Original explanations, analytical breakdowns, and thematic subject categorizations are authored independently by the Ministry of Papers team.
              </p>
            </section>

            <section>
              <h2>3. Answer Keys and Representations</h2>
              <p>
                While we make every effort to ensure questions and answer keys conform to the official final revised keys published by the respective examination authorities, notifications and keys issued by official commissions may be subject to ongoing litigation, high court orders, or subsequent revisions.
              </p>
              <p>
                Aspirants are strongly encouraged to cross-reference final results, recruitment eligibility, and merit lists with the official gazettes of the respective conducting authorities:
              </p>
              <ul>
                <li>UPSC: <a href="https://upsc.gov.in" target="_blank" rel="noopener noreferrer">upsc.gov.in</a></li>
                <li>SSC: <a href="https://ssc.gov.in" target="_blank" rel="noopener noreferrer">ssc.gov.in</a></li>
                <li>JKSSB: <a href="https://jkssb.nic.in" target="_blank" rel="noopener noreferrer">jkssb.nic.in</a></li>
                <li>JKPSC: <a href="https://jkpsc.nic.in" target="_blank" rel="noopener noreferrer">jkpsc.nic.in</a></li>
                <li>BPSC: <a href="https://bpsc.bih.nic.in" target="_blank" rel="noopener noreferrer">bpsc.bih.nic.in</a></li>
                <li>IBPS: <a href="https://ibps.in" target="_blank" rel="noopener noreferrer">ibps.in</a></li>
              </ul>
            </section>

            <section>
              <h2>4. Limitation of Liability</h2>
              <p>
                Ministry of Papers, its contributors, and developers shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, materials provided on this platform. Preparing candidates must refer to official recruitment notifications for statutory rules, cutoffs, and appointment conditions.
              </p>
            </section>

            <section>
              <h2>5. Contact & Questions</h2>
              <p>
                If you are a representative of an official examination authority with queries or feedback regarding content attribution, please reach out directly to our legal and administrative desk at <a href="mailto:hello@ministryofpapers.com">hello@ministryofpapers.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>,
  )
}
