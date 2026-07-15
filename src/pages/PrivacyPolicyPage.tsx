import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

export function PrivacyPolicyPage() {
  usePageMeta({
    title: 'Privacy Policy — Ministry of Papers',
    description: 'Privacy Policy for Ministry of Papers. Explains how we collect, use, and protect your personal information, including data received via Google Sign-In.',
    canonicalPath: '/privacy',
  })

  return (
    <section className="public-page">
      <div className="public-shell narrow">
        <div className="legal-page">
          <div className="legal-hero">
            <span className="public-kicker">Legal</span>
            <h1>Privacy Policy</h1>
            <p>Effective date: 22 May 2026 &nbsp;·&nbsp; Ministry of Papers, ministryofpapers.com</p>
          </div>

          <div className="legal-body">

            {/* ── CRITICAL: Limited Use Statement — required by Google ── */}
            <div className="legal-limited-use">
              <strong>Google API Limited Use Disclosure</strong>
              <p>
                Ministry of Papers' use of information received from Google APIs will adhere to the{' '}
                <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements.
              </p>
            </div>

            <section>
              <h2>1. About This Policy</h2>
              <p>
                This Privacy Policy describes how <strong>Ministry of Papers</strong> ("we," "us," or "our") collects,
                uses, and protects personal information when you use <strong>ministryofpapers.com</strong> — a free
                platform for previous year question papers and mock tests for Indian competitive exams.
              </p>
              <p>
                By using the platform, you agree to the collection and use of information as described in this policy.
              </p>
            </section>

            <section>
              <h2>2. Information We Collect from Google</h2>
              <p>
                We use <strong>Google Sign-In (OAuth 2.0)</strong> for authentication. When you sign in with Google,
                we request the following OAuth scopes:
              </p>
              <ul>
                <li><code>openid</code> — to verify your identity</li>
                <li><code>email</code> — your Google account email address</li>
                <li><code>profile</code> — your display name and profile picture URL</li>
              </ul>
              <p>
                From these scopes, we store only: your <strong>name</strong>, <strong>email address</strong>, and a
                hashed reference to your Google account ID. We do <strong>not</strong> store your profile picture or
                any other Google user data beyond these three fields.
              </p>
              <p>
                We do <strong>not</strong> access your Google Drive, Gmail, Contacts, Calendar, or any other Google
                service. We do not access any data beyond the three scopes listed above.
              </p>
            </section>

            <section>
              <h2>3. How We Use Google User Data</h2>
              <p>Data received from Google APIs is used exclusively for the following user-facing features:</p>
              <ul>
                <li>Authenticating you and maintaining your login session on Ministry of Papers</li>
                <li>Displaying your name in the dashboard and personalising your experience</li>
                <li>Associating your exam enrollments, mock test attempts, and performance analytics with your account</li>
              </ul>
              <p>
                We do <strong>not</strong> use Google user data for advertising, marketing, or to build advertising
                profiles. We do not use it for AI or machine learning model training. We do not sell, rent, or broker
                your data to any third party. We do not use it for any purpose other than providing and improving the
                Ministry of Papers service to you directly.
              </p>
            </section>

            <section>
              <h2>4. Data We Collect Independently</h2>
              <h3>Platform activity</h3>
              <ul>
                <li>Exams you enrol in, mock tests you attempt, questions you answer, and your scores</li>
                <li>These are stored to power your personal dashboard and performance analytics</li>
              </ul>
              <h3>Usage analytics</h3>
              <ul>
                <li>
                  We use <strong>Google Analytics 4</strong> to understand aggregate usage patterns (pages visited,
                  session duration, device type). GA4 data is anonymised and not linked to your Google account data.
                </li>
                <li>
                  We use <strong>Microsoft Clarity</strong> to understand how the site is actually used, so we can
                  improve it. Clarity captures behavioural metrics and may record a <strong>session replay</strong> of
                  your interactions — pages viewed, clicks, scrolling and mouse movement. Clarity automatically
                  masks text input, so what you type (including anything you enter in forms) is not recorded. This
                  data is aggregated, is not linked to your Google account data, and is never used for advertising or
                  sold. It is processed by Microsoft under the{' '}
                  <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer">
                    Microsoft Privacy Statement
                  </a>. You can opt out by enabling{' '}
                  <strong>Do Not Track</strong> in your browser or by blocking <code>clarity.ms</code>.
                </li>
              </ul>
              <h3>Infrastructure logs</h3>
              <ul>
                <li>
                  Our CDN (<strong>Cloudflare</strong>) and hosting (<strong>Oracle Cloud</strong>) automatically log
                  standard web server data (IP addresses, request timestamps) for security and performance. These logs
                  are retained for a maximum of 30 days and are not linked to your identity.
                </li>
              </ul>
            </section>

            <section>
              <h2>5. Data Sharing and Disclosure</h2>
              <p>We do <strong>not</strong> sell or rent your personal data. We share data only in these limited circumstances:</p>
              <ul>
                <li>
                  <strong>Service providers:</strong> We use Cloudflare (CDN/security), Oracle Cloud (hosting),
                  Google (Sign-In and Analytics) and Microsoft (Clarity product analytics). These providers process
                  data solely on our behalf and are bound by data processing agreements.
                </li>
                <li>
                  <strong>Legal requirements:</strong> We may disclose data if required by law, court order, or to
                  protect the rights and safety of users or the public.
                </li>
                <li>
                  <strong>Business transfer:</strong> If Ministry of Papers is acquired or merges, user data may be
                  transferred as part of that transaction. We will notify you before your data is subject to a different
                  privacy policy.
                </li>
              </ul>
              <p>In all other cases, your data stays with us and is not shared with any third party.</p>
            </section>

            <section>
              <h2>6. Data Retention</h2>
              <p>We retain your personal data for as long as your account is active:</p>
              <ul>
                <li>
                  <strong>Account data</strong> (name, email, Google account reference): retained until you delete your
                  account or request deletion.
                </li>
                <li>
                  <strong>Exam activity</strong> (enrollments, attempts, scores): retained until you delete your account.
                </li>
                <li>
                  <strong>Infrastructure logs:</strong> automatically deleted after 30 days.
                </li>
                <li>
                  <strong>After account deletion:</strong> all personal data is permanently deleted within 30 days of
                  your deletion request. Aggregate, anonymised analytics data (which cannot identify you) may be retained.
                </li>
              </ul>
            </section>

            <section>
              <h2>7. Data Security</h2>
              <p>
                We implement the following security measures to protect your data:
              </p>
              <ul>
                <li>All data in transit is encrypted via HTTPS/TLS</li>
                <li>Database access is restricted to authorised personnel only, via private network</li>
                <li>Authentication tokens are short-lived JWTs; refresh tokens are stored securely</li>
                <li>We do not store Google passwords or OAuth refresh tokens beyond session management</li>
                <li>Infrastructure is protected by Cloudflare DDoS mitigation and firewall rules</li>
              </ul>
              <p>
                No system is completely secure. If you believe your account has been compromised, contact us immediately
                at <a href="mailto:security@ministryofpapers.com">security@ministryofpapers.com</a>.
              </p>
            </section>

            <section>
              <h2>8. Your Rights and Choices</h2>
              <p>You have the right to:</p>
              <ul>
                <li>
                  <strong>Access:</strong> Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate personal data.
                </li>
                <li>
                  <strong>Deletion:</strong> Request permanent deletion of your account and all associated personal data.
                  We will complete deletion within 30 days and confirm by email.
                </li>
                <li>
                  <strong>Revoke Google access:</strong> You can revoke Ministry of Papers' access to your Google account
                  at any time via{' '}
                  <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
                    Google Account Permissions
                  </a>
                  . This will sign you out of the platform.
                </li>
                <li>
                  <strong>Opt out of analytics:</strong> You can opt out of Google Analytics tracking via the{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </li>
              </ul>
              <p>
                To exercise your rights, email <a href="mailto:privacy@ministryofpapers.com">privacy@ministryofpapers.com</a>.
                We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2>9. Cookies</h2>
              <p>
                We use the following cookies:
              </p>
              <ul>
                <li>
                  <strong>Authentication cookie:</strong> A session cookie that keeps you signed in. Cleared when you log
                  out or when it expires.
                </li>
                <li>
                  <strong>Google Analytics cookies:</strong> Set by GA4 to measure usage. These are analytics cookies and
                  do not identify you personally to us.
                </li>
              </ul>
              <p>We do not use advertising cookies or tracking pixels from any ad network.</p>
            </section>

            <section>
              <h2>10. Children's Privacy</h2>
              <p>
                Ministry of Papers is not directed at children under 13. We do not knowingly collect personal data from
                children under 13. If you believe a child has created an account, contact us at{' '}
                <a href="mailto:privacy@ministryofpapers.com">privacy@ministryofpapers.com</a> and we will delete the
                account promptly.
              </p>
            </section>

            <section>
              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy. When we do, we will update the effective date at the top of this page.
                For significant changes, we will notify you by email (using the address associated with your account) at
                least 14 days before the change takes effect. Continued use of the platform after the effective date
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2>12. Contact Us</h2>
              <p>
                For privacy-related questions, data requests, or account deletion:
              </p>
              <ul>
                <li>Email: <a href="mailto:privacy@ministryofpapers.com">privacy@ministryofpapers.com</a></li>
                <li>Website: <Link to="/">ministryofpapers.com</Link></li>
              </ul>
              <p>
                We respond to all privacy requests within 30 days.
              </p>
            </section>

          </div>
        </div>
      </div>
    </section>
  )
}
