import { ChevronRight, FileText, Flame, Award, Layers, BarChart3 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { useAuth } from '../context/useAuth'
import { postGuides } from '../data/postGuides'
import { GUIDE_INTELLIGENCE } from '../data/guideIntelligence'
import { paperPath, paperSeoOverride } from '../lib/paperSeo'
import { buildGuideFaqs } from '../lib/guideFaqs'

function formatUpdated(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function PostGuidePage() {
  const { postSlug } = useParams<{ postSlug: string }>()
  const guide = postSlug ? postGuides[postSlug] : null
  const intel = postSlug ? GUIDE_INTELLIGENCE[postSlug] : undefined
  const faqs = guide ? buildGuideFaqs(guide) : []
  const [topicSubjectFilter, setTopicSubjectFilter] = useState<string>('ALL')
  const [activePaperIdx, setActivePaperIdx] = useState<number>(0)

  useEffect(() => {
    setTopicSubjectFilter('ALL')
    setActivePaperIdx(0)
  }, [postSlug])

  const seoTitle = guide
    ? intel && (intel.masterTopics.length > 0 || intel.cutoffSets.length > 0)
      ? `${guide.shortName} High-Yield Topics, Cutoff & Paper Analysis (Syllabus)`
      : guide.title
    : 'Exam Guide | Ministry of Papers'

  usePageMeta({
    title: seoTitle,
    description: guide ? guide.tagline : 'Exam syllabus, pattern, and previous year papers.',
    canonicalPath: guide ? `/guide/${postSlug}` : undefined,
    ogType: 'article',
    jsonLd: guide
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: seoTitle,
            description: guide.tagline,
            datePublished: guide.lastUpdated,
            dateModified: guide.lastUpdated,
            url: `https://ministryofpapers.com/guide/${postSlug}`,
            keywords: `${guide.shortName}, ${guide.shortName} important topics, ${guide.shortName} high yield topics, ${guide.shortName} cutoff category wise, ${guide.shortName} paper analysis, ${guide.shortName} syllabus, ${guide.shortName} exam pattern, ${guide.conductingBody}, ${guide.shortName} previous year papers`,
            author: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
            publisher: {
              '@type': 'Organization',
              name: 'Ministry of Papers',
              url: 'https://ministryofpapers.com',
              logo: 'https://ministryofpapers.com/favicon.svg',
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
                { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://ministryofpapers.com/exams' },
                { '@type': 'ListItem', position: 3, name: guide.conductingBody, item: `https://ministryofpapers.com/exam/${guide.examSlug}` },
                { '@type': 'ListItem', position: 4, name: guide.shortName, item: `https://ministryofpapers.com/guide/${postSlug}` },
              ],
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.a,
              },
            })),
          },
        ]
      : undefined,
  })

  const { isAuthenticated } = useAuth()

  if (!guide) return <Navigate to="/exams" replace />

  const examHref = `/exam/${guide.examSlug}${guide.paperSearchTerm ? `?s=${encodeURIComponent(guide.paperSearchTerm)}` : ''}`

  const topicSubjects = intel
    ? intel.masterSections.map(s => s.subject)
    : []
  const visibleSections = intel
    ? (topicSubjectFilter === 'ALL'
        ? intel.masterSections
        : intel.masterSections.filter(s => s.subject === topicSubjectFilter))
    : []
  const activeDist = intel?.scoreDistributions?.[0]
  const activePaper = intel?.paperXrays[activePaperIdx] ?? intel?.paperXrays[0]

  const hasIntel = Boolean(intel && (intel.masterSections.length > 0 || intel.cutoffSets.length > 0 || intel.scoreDistributions?.length > 0))
  const pageH1 = hasIntel
    ? `${guide.shortName} — Subject & Topic-Wise Weightage, Cutoff & Paper Analysis`
    : guide.title
  const seoSummaryLine = hasIntel && intel
    ? `Complete ${guide.shortName} subject-wise weightage, topic-wise question frequency, ${intel.cutoffSets.length > 0 ? 'official category-wise cutoffs, ' : ''}${intel.scoreDistributions?.length ? 'official score distribution, ' : ''}and year-wise PYQ paper analysis across ${intel.totalQuestionsAnalyzed} solved questions.`
    : guide.tagline

  const content = (
    <div className="pg-page">
      {/* Breadcrumb */}
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link to="/exams">Exams</Link>
        <ChevronRight size={13} />
        <Link to={`/exam/${guide.examSlug}`}>{guide.examSlug.toUpperCase()}</Link>
        <ChevronRight size={13} />
        <span>{guide.shortName}</span>
      </nav>

      <div className="pg-layout">
        {/* ── Main content ─────────────────────────────── */}
        <main className="pg-main">

          {/* Header */}
          <header className="pg-header">
            <span className="ep-category-tag">{guide.examLevel}</span>
            <h1>{pageH1}</h1>
            <p className="pg-tagline">{seoSummaryLine}</p>
            <div className="pg-meta-pills">
              <span className="pg-meta-pill">
                <strong>Board:</strong> {guide.conductingBody}
              </span>
              <span className="pg-meta-pill">
                <strong>Mode:</strong> {guide.examMode}
              </span>
              {intel && intel.totalQuestionsAnalyzed > 0 && (
                <span className="pg-meta-pill">
                  <strong>Analyzed:</strong> {intel.totalPapersAnalyzed} {intel.totalPapersAnalyzed === 1 ? 'Paper' : 'Papers'} ({intel.totalQuestionsAnalyzed} PYQs)
                </span>
              )}
              <span className="pg-meta-pill pg-meta-pill-updated">
                <strong>Updated:</strong> <time dateTime={guide.lastUpdated}>{formatUpdated(guide.lastUpdated)}</time>
              </span>
            </div>
          </header>

          {/* ── 1. SUBJECT & TOPIC-WISE WEIGHTAGE (Master Frequency Table) ── */}
          {intel && intel.masterSections.length > 0 && (
            <section className="pg-section pg-intel-section" aria-labelledby="master-topics-heading">
              <div className="pg-intel-head">
                <div>
                  <h2 id="master-topics-heading" className="pg-intel-title">
                    <Flame size={17} /> Subject &amp; Topic-Wise Weightage — Most Repeated Topics
                  </h2>
                  <p className="pg-intel-sub">
                    All topics asked across <strong>{intel.totalQuestionsAnalyzed} official questions</strong> ({intel.totalPapersAnalyzed} solved {guide.shortName} {intel.totalPapersAnalyzed === 1 ? 'paper' : 'papers'}), grouped by subject and shaded by frequency (<span className="pg-legend-dot pg-tier-high">High</span> · <span className="pg-legend-dot pg-tier-mid">Medium</span> · <span className="pg-legend-dot pg-tier-low">Low</span>).
                  </p>
                </div>
              </div>

              {topicSubjects.length > 1 && (
                <div className="pg-filter-pills" role="tablist" aria-label="Filter topics by subject">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={topicSubjectFilter === 'ALL'}
                    className={`pg-filter-pill${topicSubjectFilter === 'ALL' ? ' active' : ''}`}
                    onClick={() => setTopicSubjectFilter('ALL')}
                  >
                    All Subjects ({intel.masterSections.length})
                  </button>
                  {topicSubjects.map(subj => (
                    <button
                      key={subj}
                      type="button"
                      role="tab"
                      aria-selected={topicSubjectFilter === subj}
                      className={`pg-filter-pill${topicSubjectFilter === subj ? ' active' : ''}`}
                      onClick={() => setTopicSubjectFilter(subj)}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              )}

              <div className="pg-table-wrap">
                <table className="pg-table pg-compact-table">
                  <thead>
                    <tr>
                      <th>Subject / Section</th>
                      <th>Qs</th>
                      <th>All Topics Asked (Sorted by Frequency)</th>
                      <th>Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleSections.map((sec) => (
                      <tr key={sec.subject}>
                        <td><strong>{sec.subject}</strong></td>
                        <td className="pg-num-cell"><strong>{sec.totalQuestions} Qs</strong></td>
                        <td>
                          <ul className="pg-xray-topic-list">
                            {sec.topics.map(tp => (
                              <li key={tp.name} className={`pg-topic-pill pg-tier-${tp.tier ?? 'low'}`}>
                                <span>{tp.name}</span>
                                <strong>{tp.count}</strong>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <Link
                            className="pg-topic-practice-link"
                            to={`/exam/${guide.examSlug}?tab=subjects&subject=${encodeURIComponent(sec.subject)}`}
                          >
                            Practise →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── 2. YEAR-WISE PAPER X-RAY (Detailed Subject & Topic Breakdown) ── */}
          {intel && intel.paperXrays.length > 0 && activePaper && (
            <section className="pg-section pg-intel-section" aria-labelledby="xray-heading">
              <div className="pg-intel-head">
                <div>
                  <h2 id="xray-heading" className="pg-intel-title">
                    <Layers size={17} /> Year-Wise Paper X-Ray: Subject &amp; Topic-Wise Breakdown
                  </h2>
                  <p className="pg-intel-sub">
                    Comprehensive section-by-section and topic-by-topic breakdown of every solved {guide.shortName} question paper.
                  </p>
                </div>
              </div>

              {intel.paperXrays.length > 1 && (
                <div className="pg-filter-pills" role="tablist" aria-label="Select question paper year">
                  {intel.paperXrays.map((px, idx) => (
                    <button
                      key={px.paperSlug}
                      type="button"
                      role="tab"
                      aria-selected={activePaperIdx === idx}
                      className={`pg-filter-pill${activePaperIdx === idx ? ' active' : ''}`}
                      onClick={() => setActivePaperIdx(idx)}
                    >
                      {px.year || px.paperTitle} ({px.totalQuestions} Qs)
                    </button>
                  ))}
                </div>
              )}

              <div className="pg-xray-paper-bar">
                <div>
                  <strong>{paperSeoOverride(activePaper.paperSlug)?.h1 ?? activePaper.paperTitle}</strong>
                  <span> · {activePaper.totalQuestions} Questions · {activePaper.maxMarks} Marks</span>
                </div>
                <Link className="pg-xray-open-btn" to={paperPath(activePaper.paperSlug)}>
                  Open Solved Paper →
                </Link>
              </div>

              <div className="pg-table-wrap">
                <table className="pg-table pg-compact-table">
                  <thead>
                    <tr>
                      <th>Subject / Section</th>
                      <th>Qs</th>
                      <th>Exact Topics Asked (with Question Count)</th>
                      <th>Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePaper.sections.map(sec => (
                      <tr key={sec.subject}>
                        <td><strong>{sec.subject}</strong></td>
                        <td className="pg-num-cell"><strong>{sec.questionCount} Qs</strong></td>
                        <td>
                          <ul className="pg-xray-topic-list">
                            {sec.topics.map(tp => (
                              <li key={tp.name} className={`pg-topic-pill pg-tier-${tp.tier ?? 'low'}`}>
                                <span>{tp.name}</span>
                                <strong>{tp.count}</strong>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <Link
                            className="pg-topic-practice-link"
                            to={`/exam/${guide.examSlug}?tab=subjects&subject=${encodeURIComponent(sec.subject)}`}
                          >
                            Practise →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── 3. OFFICIAL SCORE DISTRIBUTION GRAPH ── */}
          {activeDist && (
            <section className="pg-section pg-intel-section" aria-labelledby="dist-heading">
              <div className="pg-intel-head">
                <div>
                  <h2 id="dist-heading" className="pg-intel-title">
                    <BarChart3 size={17} /> {guide.shortName} Official Score Distribution Graph
                  </h2>
                  <p className="pg-intel-sub">
                    {activeDist.label} — Appeared: <strong>{activeDist.appeared.toLocaleString('en-IN')}</strong> · Top Score: <strong>{activeDist.topScore}</strong> · Mean: <strong>{activeDist.meanScore}</strong> · Median: <strong>{activeDist.medianScore}</strong>
                  </p>
                </div>
              </div>

              <div className="pg-dist-chart" role="img" aria-label={`Score distribution bar chart for ${guide.shortName}`}>
                {activeDist.bars.map((b) => {
                  const maxCand = Math.max(...activeDist.bars.map(x => x.candidates), 1)
                  const widthPct = Math.max(2, Math.round((b.candidates / maxCand) * 100))
                  return (
                    <div className="pg-dist-row" key={b.range}>
                      <span className="pg-dist-range">{b.range}</span>
                      <div className="pg-dist-track">
                        <div className="pg-dist-fill" style={{ width: `${widthPct}%` }} />
                      </div>
                      <span className="pg-dist-val">
                        <strong>{b.candidates.toLocaleString('en-IN')}</strong> ({b.pct}%)
                      </span>
                    </div>
                  )
                })}
              </div>

              <p className="pg-note" style={{ marginTop: '12px', marginBottom: 0 }}>
                {activeDist.sourceNote}
              </p>
            </section>
          )}

          {/* ── 4. CATEGORY-WISE CUTOFFS ── */}
          {intel && intel.cutoffSets.length > 0 && (
            <section className="pg-section pg-intel-section" aria-labelledby="cutoffs-heading">
              <div className="pg-intel-head">
                <div>
                  <h2 id="cutoffs-heading" className="pg-intel-title">
                    <Award size={17} /> {guide.shortName} Category-Wise Cutoffs
                  </h2>
                  <p className="pg-intel-sub">
                    Official category-wise cutoff marks for {guide.shortName}.
                  </p>
                </div>
              </div>

              {intel.cutoffSets.length > 1 && (
                <nav className="pg-filter-pills" aria-label="Jump to cutoff year">
                  {intel.cutoffSets.map((cs, idx) => (
                    <a
                      key={cs.year}
                      href={`#cutoff-${cs.year.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
                      className={`pg-filter-pill${idx === 0 ? ' active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document
                          .getElementById(`cutoff-${cs.year.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                    >
                      {cs.year}
                    </a>
                  ))}
                </nav>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {intel.cutoffSets.map((cs) => {
                  const anchorId = `cutoff-${cs.year.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`
                  return (
                    <div key={cs.year} id={anchorId} style={{ scrollMarginTop: '76px' }}>
                      <div className="pg-cutoff-label">{cs.label}</div>

                      <div className="pg-table-wrap">
                        <table className="pg-table pg-cutoff-table">
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th>Cutoff Marks</th>
                              <th>Score %</th>
                              <th>Shortlisted / Seats</th>
                              <th>Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cs.rows.map((row, idx) => (
                              <tr key={idx}>
                                <td><strong>{row.category}</strong></td>
                                <td className="pg-cutoff-marks">{row.marks}</td>
                                <td>
                                  <div className="pg-cutoff-bar-cell">
                                    <span>{row.pct}%</span>
                                    <div className="pg-cutoff-bar">
                                      <div className="pg-cutoff-bar-fill" style={{ width: `${Math.min(100, row.pct)}%` }} />
                                    </div>
                                  </div>
                                </td>
                                <td><span className="pg-safe-pill">{row.safeTarget ?? '—'}</span></td>
                                <td className="pg-cutoff-note">{row.note ?? '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="pg-note" style={{ marginTop: '10px', marginBottom: 0 }}>
                        {cs.sourceNote}
                      </p>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Frequently Asked Questions */}
          {faqs.length > 0 && (
            <section className="pg-section" aria-labelledby="faqs-heading">
              <h2 id="faqs-heading">Frequently Asked Questions</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    open={i === 0}
                    style={{
                      background: 'var(--card-bg, #ffffff)',
                      border: '1px solid var(--line, #e2e8f0)',
                      borderRadius: '8px',
                      padding: '14px 16px',
                      cursor: 'pointer',
                    }}
                  >
                    <summary style={{ fontWeight: 600, fontSize: '15px', color: 'var(--ink, #0f172a)' }}>
                      {faq.q}
                    </summary>
                    <p style={{ margin: '10px 0 0', fontSize: '14px', lineHeight: '1.6', color: 'var(--ink2, #475569)' }}>
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
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
                <Link className="pg-paper-row" key={paper.slug} to={paperPath(paper.slug)}>
                  <div className="pg-paper-info">
                    <span className="pg-paper-title">{paperSeoOverride(paper.slug)?.h1 ?? paper.title}</span>
                    <span className="pg-paper-meta">{paper.questions} questions · {paper.year}</span>
                  </div>
                  <ChevronRight size={13} className="pg-paper-arrow" />
                </Link>
              ))}
            </div>
            <Link className="pg-all-papers-btn" to={examHref}>
              <span>View all {guide.shortName} papers</span>
              <ChevronRight size={14} />
            </Link>
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
