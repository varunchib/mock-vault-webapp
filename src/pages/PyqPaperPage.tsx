import { MathText } from '../components/common/MathText'
import { ExplanationText } from '../components/common/ExplanationText'
import { env } from '../lib/env'
import { BookOpen, ChevronRight, Download, Eye, EyeOff, Play } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { QuestionRenderer } from '../components/common/QuestionRenderer'
import {
  fetchPaperBySlug,
  fetchPaperQuestions,
  type Paper,
  type Question,
} from '../lib/api'
import { useAuth } from '../context/useAuth'
import { recordContentVisit } from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'
import { paperSeoTitle, paperSeoDescription } from '../lib/pageTitles'
import { getLocalizedQuestion, hasHindi, type QuestionLanguage } from '../lib/questionLanguage'
import { paperGuideMap } from '../data/postGuides'
import { apiPaperSlug, paperPath, paperSeoOverride } from '../lib/paperSeo'
import { cleanPassageText, questionPath } from '../lib/questionUrl'
import { buildPaperFaqs, formatHeldOn, paperFaqJsonLd } from '../lib/paperFaqs'

const OPTION_LABELS = ['A', 'B', 'C', 'D']

function cleanShiftLabel(shift?: string): string | null {
  if (!shift) return null
  const cleaned = shift
    .replace(/\b\d{1,2}\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}\b/gi, '')
    .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}\b/gi, '')
    .replace(/^[\s,–-]+|[\s,–-]+$/g, '')
    .replace(/^\((.+)\)$/, '$1')
    .trim()
  return cleaned || null
}

export function PyqPaperPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [paper, setPaper] = useState<Paper | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [explOpen, setExplOpen] = useState<Record<string, boolean>>({})
  const [allSolutionsOpen, setAllSolutionsOpen] = useState(false)
  const [activeSubject, setActiveSubject] = useState<string>('ALL')
  const [language, setLanguage] = useState<QuestionLanguage>('en')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)
    setActiveSubject('ALL')
    setAllSolutionsOpen(false)

    fetchPaperBySlug(apiPaperSlug(slug))
      .then((paperData) => {
        setPaper(paperData)
        // Feeds "Recently visited" (24h) and the admin top-visited chart.
        // Fire-and-forget — a failed beacon must never affect the page.
        if (isAuthenticated) void recordContentVisit('paper', paperData.slug).catch(() => undefined)
        return fetchPaperQuestions(paperData.slug)
      })
      .then(setQuestions)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
    // isAuthenticated intentionally not a dep: re-running this fetch on login
    // would reload the whole paper just to send the visit beacon.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, retryCount])

  const seoOverride = paperSeoOverride(paper?.slug ?? slug)
  const canonicalPath = paper ? paperPath(paper.slug) : '/pyq'
  const seoTitle = paper
    ? seoOverride?.title ?? paperSeoTitle({ examName: paper.examName, year: paper.year, shift: paper.shift })
    : 'Solved PYQ Paper | Ministry of Papers'
  const seoDesc = paper
    ? seoOverride?.description ?? paperSeoDescription({ examName: paper.examName, year: paper.year, shift: paper.shift, heldOn: paper.heldOn, questions: paper.questions, subjects: paper.subjects, description: paper.description })
    : 'Solved previous year question paper with answers and explanations.'
  const seoH1 = seoOverride?.h1 ?? paper?.title

  // Built from the shared helper so the visible FAQ below and the FAQPage
  // structured data always say exactly the same thing.
  // NOTE: pass paper.title (not the SEO h1) — worker.ts builds the FAQPage schema
  // from the same field, and the visible FAQ must match the structured data
  // word for word.
  const faqs = useMemo(
    () => (paper
      ? buildPaperFaqs({
          slug: paper.slug,
          title: paper.title,
          examName: paper.examName,
          year: paper.year,
          questions: paper.questions || questions.length,
          heldOn: paper.heldOn,
          negativeMarking: paper.negativeMarking,
          sourceUrl: paper.sourceUrl,
          subjects: paper.subjects,
          attemptable: questions.length > 0,
        })
      : []),
    [paper, questions.length],
  )

  const subjectCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const q of questions) {
      const s = (q.subject && q.subject.trim()) || 'General'
      map.set(s, (map.get(s) ?? 0) + 1)
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1])
  }, [questions])

  usePageMeta({
    title: seoTitle,
    description: seoDesc,
    canonicalPath,
    ogType: 'article',
    jsonLd: paper
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            name: seoTitle.replace(' | Ministry of Papers', ''),
            description: seoDesc,
            url: `https://ministryofpapers.com${canonicalPath}`,
            educationalLevel: 'Competitive Exam Preparation',
            learningResourceType: 'Previous Year Question Paper',
            numberOfQuestions: paper.questions,
            teaches: paper.subjects?.join(', '),
            about: { '@type': 'Thing', name: paper.examName },
            ...(paper.heldOn ? { datePublished: paper.heldOn } : {}),
            provider: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: seoTitle.replace(' | Ministry of Papers', ''),
            description: seoDesc,
            url: `https://ministryofpapers.com${canonicalPath}`,
            ...(paper.heldOn ? { datePublished: paper.heldOn, dateModified: paper.heldOn } : {}),
            author: { '@type': 'Organization', name: 'Ministry of Papers' },
            publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            // Mirrors the trail the worker serves to crawlers.
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
              { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://ministryofpapers.com/exams' },
              { '@type': 'ListItem', position: 3, name: paper.examName, item: `https://ministryofpapers.com/exam/${paper.examSlug}` },
              { '@type': 'ListItem', position: 4, name: seoOverride?.h1 ?? paper.title, item: `https://ministryofpapers.com${canonicalPath}` },
            ],
          },
          // Matches the visible FAQ rendered at the bottom of this page.
          ...(faqs.length ? [paperFaqJsonLd(faqs)] : []),
        ]
      : undefined,
  })

  const homeHref = isAuthenticated ? '/dashboard' : '/'

  const loader = <HaloLoader label="Loading paper" />

  if (loading) {
    return isAuthenticated ? loader : (
      <section className="public-page pyq-paper-page">
        <div className="public-shell">{loader}</div>
      </section>
    )
  }

  if (error || !paper) {
    const errorContent = (
      <div className="pyq-page">
        <div className="ec-error">
          <strong>Unable to load paper</strong>
          <p>Could not reach the server. Check your connection and try again.</p>
          <button type="button" onClick={() => setRetryCount((c) => c + 1)}>Retry</button>
        </div>
      </div>
    )
    return isAuthenticated ? errorContent : (
      <section className="public-page pyq-paper-page">
        <div className="public-shell">{errorContent}</div>
      </section>
    )
  }

  const firstQuestion = questions[0]
  const indexedQuestions = questions.map((q, idx) => ({ q, originalIndex: idx }))
  const visibleQuestions = activeSubject === 'ALL'
    ? indexedQuestions
    : indexedQuestions.filter(({ q }) => ((q.subject && q.subject.trim()) || 'General') === activeSubject)
  const hasHindiQuestions = questions.some(hasHindi)
  const comingSoon = questions.length === 0
  const shiftBadge = paper.heldOn ? cleanShiftLabel(paper.shift) : paper.shift

  const selectAnswer = (qSlug: string, key: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qSlug]: key }))
  }

  const revealAnswer = (qSlug: string) => {
    setRevealed((prev) => ({ ...prev, [qSlug]: true }))
  }

  const toggleExpl = (qSlug: string) => {
    setExplOpen((prev) => ({ ...prev, [qSlug]: !prev[qSlug] }))
  }

  const toggleAllSolutions = () => {
    if (allSolutionsOpen) {
      setRevealed({})
      setExplOpen({})
      setAllSolutionsOpen(false)
    } else {
      const nextRev: Record<string, boolean> = {}
      const nextExpl: Record<string, boolean> = {}
      for (const q of questions) {
        nextRev[q.slug] = true
        nextExpl[q.slug] = true
      }
      setRevealed(nextRev)
      setExplOpen(nextExpl)
      setAllSolutionsOpen(true)
    }
  }

  const content = (
    <div className="pyq-page">
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link to={homeHref}>{isAuthenticated ? 'Dashboard' : 'Home'}</Link>
        <ChevronRight size={13} />
        <Link to="/exams">Exams</Link>
        <ChevronRight size={13} />
        <Link to={`/exam/${paper.examSlug}`}>{paper.examName}</Link>
        <ChevronRight size={13} />
        <span>{paper.year}</span>
      </nav>

      <header className="pyq-paper-header">
        <div className="pyq-paper-header-body">
          <span className="ep-category-tag">{paper.examName} · {paper.year}</span>
          <h1>{seoH1}</h1>
          <div className="pyq-paper-meta-row">
            {comingSoon ? (
              <>
                <span className="pyq-soon-pill">Coming soon</span>
                <span>Held on: coming soon</span>
                {paper.subjects.length > 0 && <span>{paper.subjects.join(' · ')}</span>}
              </>
            ) : (
              <>
                <span>
                  {paper.questions || questions.length} Questions
                  {paper.maxMarks && paper.maxMarks > 0 ? ` · ${paper.maxMarks} Marks` : ''}
                </span>
                {paper.heldOn && <span>Held on {formatHeldOn(paper.heldOn)}</span>}
                {shiftBadge && <span>{shiftBadge}</span>}
                {paper.durationMinutes && paper.durationMinutes > 0 ? (
                  <span>Duration: {paper.durationMinutes} Mins</span>
                ) : null}
                {paper.negativeMarking && paper.negativeMarking > 0 ? (
                  <span>Negative Marking: −{paper.negativeMarking}</span>
                ) : null}
                <span>Official Answer Key &amp; Solutions</span>
              </>
            )}
          </div>
        </div>
        <div className="pyq-paper-actions">
          {hasHindiQuestions && (
            <div className="pyq-language-toggle" aria-label="Question language">
              <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>
                English
              </button>
              <button type="button" className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>
                हिन्दी
              </button>
            </div>
          )}
          {firstQuestion && (
            <button
              className="pyq-action-btn primary"
              type="button"
              onClick={() => navigate(`/paper-attempt/${paper.slug}`)}
            >
              <Play size={14} /> Attempt Online
            </button>
          )}
          {paper?.sourceUrl && (
            <a
              className="pyq-action-btn"
              href={paper.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={14} /> Download PDF
            </a>
          )}
          {paper && paperGuideMap[paper.slug] && (
            <Link
              className="pyq-action-btn"
              to={`/guide/${paperGuideMap[paper.slug]}`}
            >
              <BookOpen size={14} /> Exam Guide
            </Link>
          )}
        </div>
      </header>

      <section className="pyq-paper-seo-intro" aria-label="Exam Paper Analysis and Section Breakdown">
        <p className="pyq-paper-review-text">{seoOverride?.review ?? seoDesc}</p>

        {!comingSoon && subjectCounts.length > 0 && (
          <div className="pyq-paper-controls">
            <div className="pyq-subject-pills" role="tablist" aria-label="Filter questions by subject">
              <button
                type="button"
                role="tab"
                aria-selected={activeSubject === 'ALL'}
                className={`pyq-subj-pill${activeSubject === 'ALL' ? ' active' : ''}`}
                onClick={() => setActiveSubject('ALL')}
              >
                All Sections <span>{questions.length}</span>
              </button>
              {subjectCounts.map(([subj, count]) => (
                <button
                  key={subj}
                  type="button"
                  role="tab"
                  aria-selected={activeSubject === subj}
                  className={`pyq-subj-pill${activeSubject === subj ? ' active' : ''}`}
                  onClick={() => setActiveSubject(subj)}
                >
                  {subj} <span>{count}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`pyq-solution-toggle-btn${allSolutionsOpen ? ' active' : ''}`}
              onClick={toggleAllSolutions}
            >
              {allSolutionsOpen ? <EyeOff size={14} /> : <Eye size={14} />}
              {allSolutionsOpen ? 'Hide All Solutions' : 'Show All Answers & Explanations'}
            </button>
          </div>
        )}

        {!comingSoon && (
          <div className="pyq-overview-panels">
            {subjectCounts.length > 1 && (
              <details className="pyq-overview-panel">
                <summary>
                  <span>Section-Wise Question &amp; Weightage Breakdown ({subjectCounts.length} Sections · {questions.length} Questions)</span>
                </summary>
                <div className="pyq-overview-table-wrap">
                  <table className="pyq-overview-table">
                    <thead>
                      <tr>
                        <th scope="col">Subject / Syllabus Section</th>
                        <th scope="col">Questions Asked</th>
                        <th scope="col">Weightage</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectCounts.map(([subj, count]) => {
                        const pct = Math.round((count / Math.max(questions.length, 1)) * 100)
                        return (
                          <tr key={subj}>
                            <td><strong>{subj}</strong></td>
                            <td>{count} Qs</td>
                            <td>{pct}%</td>
                            <td>
                              <button
                                type="button"
                                className="pyq-table-filter-btn"
                                onClick={() => setActiveSubject(subj === activeSubject ? 'ALL' : subj)}
                              >
                                {activeSubject === subj ? 'Showing (Reset)' : `Filter ${count} Qs →`}
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </details>
            )}

            {seoOverride?.provisionalKeyAllSeries && seoOverride.provisionalKeyAllSeries.length > 0 ? (
              <details className="pyq-overview-panel">
                <summary>
                  <span>{seoOverride.provisionalKeyTitle ?? 'Official Provisional Answer Key (Series A, Series B, Series C & Series D)'}</span>
                </summary>
                <div className="pyq-overview-table-wrap">
                  <p className="pyq-key-note">
                    Official Provisional Answer Key (Annexure-A) across all four text booklet series. Click any question number to jump directly to its solved explanation below (Set C).
                  </p>
                  <table className="pyq-overview-table pyq-series-key-table">
                    <thead>
                      <tr>
                        <th scope="col">Q.No</th>
                        <th scope="col">Series A</th>
                        <th scope="col">Series B</th>
                        <th scope="col">Series C (Solved Below)</th>
                        <th scope="col">Series D</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seoOverride.provisionalKeyAllSeries.map((row) => (
                        <tr key={row.q}>
                          <td>
                            <a href={`#q-${row.q}`} onClick={() => setActiveSubject('ALL')}>
                              <strong>Q{row.q}</strong>
                            </a>
                          </td>
                          <td>{row.a}</td>
                          <td>{row.b}</td>
                          <td><strong>{row.c}</strong></td>
                          <td>{row.d}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            ) : (
              questions.length > 0 && (
                <details className="pyq-overview-panel">
                  <summary>
                    <span>Official Answer Key Quick-Reference Grid (Q1–Q{questions.length})</span>
                  </summary>
                  <div className="pyq-key-grid">
                    {questions.map((q, idx) => {
                      const qNo = q.questionNo || idx + 1
                      return (
                        <a
                          key={q.slug}
                          href={`#q-${qNo}`}
                          className="pyq-key-cell"
                          onClick={() => setActiveSubject('ALL')}
                          title={`Jump to Question ${qNo}`}
                        >
                          <span className="pyq-key-q">Q{qNo}</span>
                          <strong className="pyq-key-a">{q.answerKey}</strong>
                        </a>
                      )
                    })}
                  </div>
                </details>
              )
            )}
          </div>
        )}
      </section>

      {comingSoon && (
        <section className="pyq-coming-soon">
          <strong>This exam hasn&apos;t been conducted yet</strong>
          <p>
            The {paper.examName} {paper.year} exam has not taken place yet, so the question paper is
            not available. As soon as the exam is held, the fully solved paper — every question with
            the official answer key and detailed explanations — will be published on this page.
          </p>
          <div className="pyq-coming-soon-actions">
            {paper && paperGuideMap[paper.slug] && (
              <Link className="pyq-action-btn primary" to={`/guide/${paperGuideMap[paper.slug]}`}>
                <BookOpen size={14} /> View syllabus &amp; exam pattern
              </Link>
            )}
            <Link className="pyq-action-btn" to={`/exam/${paper.examSlug}`}>
              Practise previous year papers
            </Link>
          </div>
        </section>
      )}

      <div className="pyq-question-list">
        {visibleQuestions.map(({ q, originalIndex }, listIdx) => {
          const localized = getLocalizedQuestion(q, language)
          const cleanedPassage = cleanPassageText(localized.passage)
          const prevPassage = listIdx > 0
            ? cleanPassageText(getLocalizedQuestion(visibleQuestions[listIdx - 1].q, language).passage)
            : ''
          const isRepeatedPassage = Boolean(cleanedPassage && cleanedPassage === prevPassage)
          let groupStart = originalIndex + 1
          let groupEnd = originalIndex + 1
          if (cleanedPassage) {
            while (
              groupStart > 1 &&
              cleanPassageText(getLocalizedQuestion(questions[groupStart - 2], language).passage) === cleanedPassage
            ) {
              groupStart--
            }
            while (
              groupEnd < questions.length &&
              cleanPassageText(getLocalizedQuestion(questions[groupEnd], language).passage) === cleanedPassage
            ) {
              groupEnd++
            }
          }
          const passageLabel = language === 'hi'
            ? 'अनुच्छेद'
            : groupEnd > groupStart
            ? `Passage (Q${groupStart}–Q${groupEnd})`
            : 'Passage'
          const isDeleted = q.answerKey === 'Deleted'
          const chosen = selectedAnswers[q.slug]
          const isRevealed = revealed[q.slug]
          const isExplOpen = explOpen[q.slug]
          const isCorrect = chosen === q.answerKey
          const qNum = q.questionNo || originalIndex + 1
          const canonicalQPath = questionPath(q.urlCode ?? q.slug, q.question)

          return (
            <article
              id={`q-${qNum}`}
              className={`pyq-question-card${isDeleted ? ' deleted' : ''}`}
              key={q.slug}
            >
              <div className="pyq-q-header">
                <Link
                  to={canonicalQPath}
                  className="pyq-q-num"
                  title={`Open Q${qNum} standalone solution page`}
                >
                  Q{qNum}
                </Link>
                <Link
                  className="pyq-q-subject pyq-q-subject-link"
                  to={`/exam/${paper.examSlug}?tab=subjects&subject=${encodeURIComponent(q.subject)}`}
                  rel="nofollow"
                  title={`All ${paper.examName} ${q.subject} questions`}
                >
                  {q.subject}
                </Link>
                {isDeleted && <span className="pyq-deleted-badge">Deleted</span>}
              </div>

              {cleanedPassage && (
                isRepeatedPassage ? (
                  <details className="pyq-passage pyq-passage--repeat">
                    <summary>
                      <strong>{passageLabel}</strong>
                      <span>{language === 'hi' ? 'अनुच्छेद दिखाएँ' : 'Show passage'}</span>
                    </summary>
                    <QuestionRenderer text={cleanedPassage} />
                  </details>
                ) : (
                  <div className="pyq-passage">
                    <strong>{passageLabel}</strong>
                    <QuestionRenderer text={cleanedPassage} />
                  </div>
                )
              )}

              {q.images && q.images.length > 0 && (
                <div className="pyq-q-images">
                  {q.images.map((src, i) => (
                    <img key={i} src={src.startsWith('http') ? src : `${env.assetsBaseUrl}/${src}`} alt={`Question ${qNum} figure`} className="pyq-q-img" />
                  ))}
                </div>
              )}

              <QuestionRenderer className="pyq-q-text" text={localized.question} />

              {(
                <>
                  <div className="pyq-options">
                    {localized.options.map((opt, i) => {
                      const label = OPTION_LABELS[i] ?? opt.key
                      const isChosen = chosen === opt.key
                      const isCorrectOpt = !isDeleted && opt.key === q.answerKey

                      let cls = 'pyq-option'
                      if (isRevealed) {
                        if (isCorrectOpt) cls += ' correct'
                        else if (isChosen && !isCorrect && !isDeleted) cls += ' wrong'
                      } else if (isChosen) {
                        cls += ' chosen'
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          className={cls}
                          onClick={() => selectAnswer(q.slug, opt.key)}
                          disabled={isRevealed}
                        >
                          <span className="pyq-opt-key">{label}</span>
                          <MathText text={opt.text} />
                        </button>
                      )
                    })}
                  </div>

                  {q.tags.length > 0 && (
                    <div className="pyq-q-tags">
                      {q.tags.map((tag) => (
                        <span key={tag} className="pyq-q-tag">{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="pyq-q-actions">
                    {!isRevealed ? (
                      <button
                        type="button"
                        className="pyq-reveal-btn"
                        onClick={() => revealAnswer(q.slug)}
                        disabled={!chosen}
                        title={chosen ? undefined : 'Select an option first'}
                      >
                        Check Answer
                      </button>
                    ) : (
                      <>
                        {isDeleted ? (
                          <div className="pyq-result deleted">
                            Dropped from the final answer key — marks were awarded to all candidates
                          </div>
                        ) : (
                          <div className={`pyq-result ${isCorrect ? 'correct' : 'wrong'}`}>
                            {chosen ? (isCorrect ? '✓ Correct' : `✗ Correct answer: ${q.answerKey}`) : `✓ Official Answer: Option ${q.answerKey}`}
                          </div>
                        )}
                        {q.explanation && (
                          <button
                            type="button"
                            className={`pyq-expl-btn${isExplOpen ? ' open' : ''}`}
                            onClick={() => toggleExpl(q.slug)}
                          >
                            📖 {isExplOpen ? 'Hide' : 'Explanation'}
                          </button>
                        )}
                      </>
                    )}
                  </div>

                  {isRevealed && isExplOpen && q.explanation && (
                    <div className="pyq-explanation">
                      <strong>Explanation</strong>
                      <div className="pyq-solution-body">
                        <ExplanationText text={q.explanation} />
                      </div>
                    </div>
                  )}
                </>
              )}
            </article>
          )
        })}
      </div>

      {faqs.length > 0 && (
        <section className="pyq-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="pyq-faq-list">
            {faqs.map((f, i) => (
              <details key={i} className="pyq-faq-item" open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  )

  return (
    <>
      {isAuthenticated ? content : (
        <section className="public-page pyq-paper-page">
          <div className="public-shell">{content}</div>
        </section>
      )}
    </>
  )
}
