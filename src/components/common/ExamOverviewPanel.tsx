import {
  AlertCircle,
  Banknote,
  BookOpen,
  Briefcase,
  ChevronDown,
  ExternalLink,
  FileText,
  Globe,
  Link2,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Exam } from '../../lib/api'
import type { ExamInfoData } from '../../data/examInfo'
import type { FaqItem } from '../../data/examFaq'

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="ov-section" aria-labelledby="faq-heading">
      <div className="ov-section-head">
        <h2 className="ov-section-title" id="faq-heading">Frequently Asked Questions</h2>
      </div>
      <div className="ov-section-body">
        <dl className="ep-faq-list">
          {items.map((item, i) => (
            <div className={`ep-faq-item${open === i ? ' open' : ''}`} key={i}>
              <dt>
                <button
                  type="button"
                  className="ep-faq-q"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {item.q}
                  <ChevronDown size={15} className="ep-faq-chevron" />
                </button>
              </dt>
              {open === i && <dd className="ep-faq-a">{item.a}</dd>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

type Props = {
  exam: Exam
  info: ExamInfoData
  faqs: FaqItem[] | null
  onViewPapers?: () => void
}

export function ExamOverviewPanel({ exam, info, faqs, onViewPapers }: Props) {
  return (
    <>
      {/* Quick facts header card */}
      <section className="eo-card">
        <div className="eo-header">
          <div className="ep-hero-icon">{exam.icon}</div>
          <div className="eo-header-text">
            <h1 className="eo-title">{exam.name}</h1>
            <div className="eo-facts">
              <div className="eo-fact">
                <span className="eo-fact-label">Conducting Body</span>
                <span className="eo-fact-value">{info.conductingBody}</span>
              </div>
              <div className="eo-fact">
                <span className="eo-fact-label">Exam Level</span>
                <span className="eo-fact-value">{info.examLevel}</span>
              </div>
              <div className="eo-fact">
                <span className="eo-fact-label">Exam Mode</span>
                <span className="eo-fact-value">{info.examMode}</span>
              </div>
              <div className="eo-fact">
                <span className="eo-fact-label">Official Website</span>
                <a
                  className="eo-fact-link"
                  href={info.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe size={12} />
                  {info.officialWebsite.replace('https://', '')}
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="eo-about">{info.about}</p>
      </section>

      {/* Two-column layout */}
      <div className="ov-layout">
        <div className="ov-main">

          {info.latestUpdates && info.latestUpdates.length > 0 && (
            <section className="ov-section" aria-labelledby="ov-updates-h">
              <div className="ov-section-head">
                <AlertCircle size={14} className="ov-section-icon" />
                <h2 className="ov-section-title" id="ov-updates-h">Latest Updates</h2>
              </div>
              <div className="ov-section-body">
                <div className="ov-updates">
                  {info.latestUpdates.map((u, i) => (
                    <div className="ov-update" key={i}>
                      <span className="ov-update-date">{u.date}</span>
                      <div>
                        <p className="ov-update-text">{u.text}</p>
                        {u.link && (
                          <a className="ov-update-link" href={u.link} target="_blank" rel="noopener noreferrer">
                            View &rarr;
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {info.recruitmentOverview && info.recruitmentOverview.length > 0 && (
            <section className="ov-section" aria-labelledby="ov-recruit-h">
              <div className="ov-section-head">
                <FileText size={14} className="ov-section-icon" />
                <h2 className="ov-section-title" id="ov-recruit-h">Recruitment Overview</h2>
              </div>
              <div className="ov-table-wrap">
                <table className="ov-table">
                  <thead>
                    <tr><th>Post</th><th>Vacancies</th><th>Pay Scale</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {info.recruitmentOverview.map((row, i) => (
                      <tr key={i}>
                        <td>{row.post}</td>
                        <td>{row.vacancies}</td>
                        <td>{row.payScale}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {info.examPattern && info.examPattern.length > 0 && (
            <section className="ov-section" aria-labelledby="ov-pattern-h">
              <div className="ov-section-head">
                <BookOpen size={14} className="ov-section-icon" />
                <h2 className="ov-section-title" id="ov-pattern-h">Exam Pattern</h2>
              </div>
              <div className="ov-table-wrap">
                <table className="ov-table">
                  <thead>
                    <tr><th>Subject / Section</th><th>Questions</th><th>Marks</th><th>Neg. Marking</th></tr>
                  </thead>
                  <tbody>
                    {info.examPattern.map((s, i) => (
                      <tr key={i} className={s.isTotal ? 'ov-table-total' : ''}>
                        <td>{s.subject}</td>
                        <td>{s.questions}</td>
                        <td>{s.marks}</td>
                        <td>{s.negativeMarking ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {info.examPatternNote && (
                <div className="ov-section-note">{info.examPatternNote}</div>
              )}
            </section>
          )}

          {info.eligibility && (
            <section className="ov-section" aria-labelledby="ov-elig-h">
              <div className="ov-section-head">
                <Users size={14} className="ov-section-icon" />
                <h2 className="ov-section-title" id="ov-elig-h">Eligibility Criteria</h2>
              </div>
              <div className="ov-section-body">
                <div className="ov-eligibility">
                  {info.eligibility.age && (
                    <div className="ov-elig-item">
                      <span className="ov-elig-label">Age Limit</span>
                      <span className="ov-elig-value">{info.eligibility.age}</span>
                    </div>
                  )}
                  {info.eligibility.education && (
                    <div className="ov-elig-item">
                      <span className="ov-elig-label">Educational Qualification</span>
                      <span className="ov-elig-value">{info.eligibility.education}</span>
                    </div>
                  )}
                  {info.eligibility.nationality && (
                    <div className="ov-elig-item">
                      <span className="ov-elig-label">Nationality / Domicile</span>
                      <span className="ov-elig-value">{info.eligibility.nationality}</span>
                    </div>
                  )}
                  {info.eligibility.other?.map((o, i) => (
                    <div className="ov-elig-item" key={i}>
                      <span className="ov-elig-label">{o.label}</span>
                      <span className="ov-elig-value">{o.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {info.selectionProcess && info.selectionProcess.length > 0 && (
            <section className="ov-section" aria-labelledby="ov-select-h">
              <div className="ov-section-head">
                <Briefcase size={14} className="ov-section-icon" />
                <h2 className="ov-section-title" id="ov-select-h">Selection Process</h2>
              </div>
              <div className="ov-section-body">
                <ol className="ov-steps">
                  {info.selectionProcess.map((step, i) => (
                    <li className="ov-step" key={i}>
                      <span className="ov-step-text">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          {info.salary && info.salary.length > 0 && (
            <section className="ov-section" aria-labelledby="ov-salary-h">
              <div className="ov-section-head">
                <Banknote size={14} className="ov-section-icon" />
                <h2 className="ov-section-title" id="ov-salary-h">Salary &amp; Pay Scale</h2>
              </div>
              <div className="ov-table-wrap">
                <table className="ov-table">
                  <thead>
                    <tr><th>Post / Group</th><th>Pay Level</th><th>Pay Scale (₹)</th></tr>
                  </thead>
                  <tbody>
                    {info.salary.map((s, i) => (
                      <tr key={i}>
                        <td>{s.post}</td>
                        <td>{s.payLevel}</td>
                        <td>{s.payScale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {faqs && faqs.length > 0 && <FaqAccordion items={faqs} />}
        </div>

        <aside className="ov-sidebar">
          {info.importantLinks && info.importantLinks.length > 0 && (
            <div className="ov-section">
              <div className="ov-section-head">
                <Link2 size={14} className="ov-section-icon" />
                <h2 className="ov-section-title">Important Links</h2>
              </div>
              <div className="ov-section-body ov-section-body--tight">
                <nav className="ov-links" aria-label="Important links">
                  {info.importantLinks.map((l, i) =>
                    l.internal ? (
                      <Link key={i} to={l.url} className="ov-link">
                        {l.label}
                        <ExternalLink size={11} className="ov-link-ext" />
                      </Link>
                    ) : (
                      <a key={i} href={l.url} className="ov-link" target="_blank" rel="noopener noreferrer">
                        {l.label}
                        <ExternalLink size={11} className="ov-link-ext" />
                      </a>
                    )
                  )}
                </nav>
              </div>
            </div>
          )}

          <div className="ov-sidebar-cta">
            <p className="ov-sidebar-cta-text">
              Practice {exam.shortName} with free previous year papers and detailed answers
            </p>
            {onViewPapers ? (
              <button type="button" className="ov-sidebar-cta-btn" onClick={onViewPapers}>
                View Papers
              </button>
            ) : (
              <Link to={`/exam/${exam.slug}`} className="ov-sidebar-cta-btn">
                View Papers
              </Link>
            )}
          </div>
        </aside>
      </div>
    </>
  )
}
