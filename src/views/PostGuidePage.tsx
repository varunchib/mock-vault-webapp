'use client'
import { ChevronRight, FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Redirect } from '../components/common/Redirect'
import { usePageMeta } from '../lib/usePageMeta'
import { useAuth } from '../context/useAuth'
import { postGuides } from '../data/postGuides'

export function PostGuidePage() {
  const { postSlug } = useParams<{ postSlug: string }>()
  const guide = postSlug ? postGuides[postSlug] : null

  usePageMeta({
    title: guide ? guide.title : 'Exam Guide | Ministry of Papers',
    description: guide ? guide.tagline : 'Exam syllabus, pattern, and previous year papers.',
    canonicalPath: guide ? `/guide/${postSlug}` : undefined,
    ogType: 'article',
    jsonLd: guide
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.tagline,
          url: `https://ministryofpapers.com/guide/${postSlug}`,
          keywords: `${guide.shortName}, ${guide.shortName} syllabus, ${guide.shortName} exam pattern, ${guide.conductingBody}, ${guide.shortName} previous year papers`,
          publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
              { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://ministryofpapers.com/exams' },
              { '@type': 'ListItem', position: 3, name: guide.conductingBody, item: `https://ministryofpapers.com/exam/${guide.examSlug}` },
              { '@type': 'ListItem', position: 4, name: guide.shortName, item: `https://ministryofpapers.com/guide/${postSlug}` },
            ],
          },
        }
      : undefined,
  })

  const { isAuthenticated } = useAuth()

  if (!guide) return <Redirect to="/exams" replace />

  const examHref = `/exam/${guide.examSlug}${guide.paperSearchTerm ? `?s=${encodeURIComponent(guide.paperSearchTerm)}` : ''}`

  const content = (
    <div className="pg-page">
      {/* Breadcrumb */}
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link href="/exams">Exams</Link>
        <ChevronRight size={13} />
        <Link href={`/exam/${guide.examSlug}`}>{guide.examSlug.toUpperCase()}</Link>
        <ChevronRight size={13} />
        <span>{guide.shortName}</span>
      </nav>

      <div className="pg-layout">
        {/* ── Main content ─────────────────────────────── */}
        <main className="pg-main">

          {/* Header */}
          <header className="pg-header">
            <span className="ep-category-tag">{guide.examLevel}</span>
            <h1>{guide.title}</h1>
            <p className="pg-tagline">{guide.tagline}</p>
            <div className="pg-meta-strip">
              <span className="pg-meta-item">
                <strong>Conducting Body:</strong> {guide.conductingBody}
              </span>
              <span className="pg-meta-sep" aria-hidden="true">·</span>
              <span className="pg-meta-item">
                <strong>Mode:</strong> {guide.examMode}
              </span>
            </div>
          </header>

          {/* About */}
          <section className="pg-section" aria-labelledby="about-heading">
            <h2 id="about-heading">About {guide.shortName}</h2>
            {guide.about.map((para, i) => <p key={i}>{para}</p>)}
          </section>

          {/* Previous Year Papers — main content section for SEO */}
          {guide.papers.length > 0 && (
            <section className="pg-section" aria-labelledby="papers-heading">
              <h2 id="papers-heading">{guide.shortName} Previous Year Papers</h2>
              <p className="pg-note">
                Solve previous year papers to understand the exam difficulty, topic distribution, and question patterns. Each paper below is fully solved with detailed answer explanations.
              </p>
              <div className="pg-pyq-list">
                {guide.papers.map((paper) => (
                  <Link className="pg-pyq-card" key={paper.slug} href={`/pyq/${paper.slug}`}>
                    <div className="pg-pyq-card-left">
                      <span className="pg-pyq-year">{paper.year}</span>
                      <div className="pg-pyq-info">
                        <strong>{paper.title}</strong>
                        <span>{paper.questions} questions · Solved with explanations · Free</span>
                      </div>
                    </div>
                    <div className="pg-pyq-card-right">
                      <span className="pg-pyq-btn">Solve Paper <ChevronRight size={13} /></span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Exam Pattern */}
          <section className="pg-section" aria-labelledby="pattern-heading">
            <h2 id="pattern-heading">Exam Pattern</h2>
            {guide.patternNotification && (
              <p className="pg-note pg-note-warning">{guide.patternNotification}</p>
            )}
            {guide.examPatternNote && (
              <p className="pg-note">{guide.examPatternNote}</p>
            )}
            <div className="pg-table-wrap">
              <table className="pg-table">
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Questions</th>
                    <th>Marks</th>
                    <th>Negative Marking</th>
                  </tr>
                </thead>
                <tbody>
                  {guide.examPattern.map((row, i) => (
                    <tr key={i} className={row.isTotal ? 'pg-table-total' : ''}>
                      <td>{row.section}</td>
                      <td>{row.questions}</td>
                      <td>{row.marks}</td>
                      <td>{row.note ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Syllabus */}
          <section className="pg-section" aria-labelledby="syllabus-heading">
            <h2 id="syllabus-heading">Detailed Syllabus</h2>
            <div className="pg-syllabus">
              {guide.syllabus.map((block, i) => (
                <div className="pg-syllabus-block" key={i}>
                  <h3>{block.subject}</h3>
                  <ul>
                    {block.topics.map((topic, j) => (
                      <li key={j}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Eligibility */}
          <section className="pg-section" aria-labelledby="eligibility-heading">
            <h2 id="eligibility-heading">Eligibility Criteria</h2>
            <dl className="pg-dl">
              <div className="pg-dl-row">
                <dt>Age Limit</dt>
                <dd>{guide.eligibility.age}</dd>
              </div>
              <div className="pg-dl-row">
                <dt>Education</dt>
                <dd>{guide.eligibility.education}</dd>
              </div>
              <div className="pg-dl-row">
                <dt>Domicile</dt>
                <dd>{guide.eligibility.domicile}</dd>
              </div>
              {guide.eligibility.attempts && (
                <div className="pg-dl-row">
                  <dt>Attempts</dt>
                  <dd>{guide.eligibility.attempts}</dd>
                </div>
              )}
            </dl>
          </section>

          {/* Selection Process */}
          <section className="pg-section" aria-labelledby="selection-heading">
            <h2 id="selection-heading">Selection Process</h2>
            <ol className="pg-steps">
              {guide.selectionProcess.map((step, i) => (
                <li key={i}>
                  <span className="pg-step-num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Salary */}
          {guide.salary.length > 0 && (
            <section className="pg-section" aria-labelledby="salary-heading">
              <h2 id="salary-heading">Salary & Pay Scale</h2>
              <div className="pg-table-wrap">
                <table className="pg-table">
                  <thead>
                    <tr>
                      <th>Post</th>
                      <th>Pay Level</th>
                      <th>Pay Scale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guide.salary.map((row, i) => (
                      <tr key={i}>
                        <td>{row.post}</td>
                        <td>{row.level}</td>
                        <td>{row.payScale}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Preparation Tips */}
          {guide.preparationTips.length > 0 && (
            <section className="pg-section" aria-labelledby="tips-heading">
              <h2 id="tips-heading">Preparation Tips</h2>
              <ol className="pg-tips">
                {guide.preparationTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ol>
            </section>
          )}
        </main>

        {/* ── Sidebar ──────────────────────────────────── */}
        <aside className="pg-sidebar">

          {/* Papers card */}
          <div className="pg-sidebar-card">
            <div className="pg-sidebar-card-head">
              <FileText size={15} />
              <strong>Previous Year Papers</strong>
            </div>
            <div className="pg-papers-list">
              {guide.papers.map((paper) => (
                <Link className="pg-paper-row" key={paper.slug} href={`/pyq/${paper.slug}`}>
                  <div className="pg-paper-info">
                    <span className="pg-paper-title">{paper.title}</span>
                    <span className="pg-paper-meta">{paper.questions} questions · {paper.year}</span>
                  </div>
                  <ChevronRight size={13} className="pg-paper-arrow" />
                </Link>
              ))}
            </div>
            <Link className="pg-all-papers-btn" href={examHref}>
              View all {guide.examSlug.toUpperCase()} papers
              <ChevronRight size={13} />
            </Link>
          </div>

          {/* Quick facts card */}
          <div className="pg-sidebar-card">
            <div className="pg-sidebar-card-head">
              <strong>Quick Facts</strong>
            </div>
            <dl className="pg-quick-facts">
              <div>
                <dt>Board</dt>
                <dd>{guide.conductingBody}</dd>
              </div>
              <div>
                <dt>Level</dt>
                <dd>{guide.examLevel}</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd>{guide.examMode}</dd>
              </div>
              {guide.quickFacts?.map((fact, i) => (
                <div key={i}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <a
              className="pg-official-link"
              href={guide.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Website <ExternalLink size={11} />
            </a>
          </div>
        </aside>
      </div>
    </div>
  )

  return isAuthenticated ? content : (
    <section className="public-page">
      <div className="public-shell">{content}</div>
    </section>
  )
}
