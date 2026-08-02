import { MathText } from '../components/common/MathText'
import { ExplanationText } from '../components/common/ExplanationText'
import { env } from '../lib/env'
import { BookOpen, ChevronRight, Download, Play } from 'lucide-react'
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
import { buildPaperFaqs, formatHeldOn, paperFaqJsonLd } from '../lib/paperFaqs'

const OPTION_LABELS = ['A', 'B', 'C', 'D']

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
  const [language, setLanguage] = useState<QuestionLanguage>('en')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)

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
          title: paper.title,
          examName: paper.examName,
          year: paper.year,
          questions: paper.questions || questions.length,
          heldOn: paper.heldOn,
          negativeMarking: paper.negativeMarking,
          sourceUrl: paper.sourceUrl,
          attemptable: questions.length > 0,
        })
      : []),
    [paper, questions.length],
  )

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
            author: { '@type': 'Organization', name: 'Ministry of Papers' },
            publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            // Mirrors the trail the worker serves to crawlers. Positions 2 and 3
            // previously shared /exam/{slug} — two steps claiming the same page,
            // with position 3's name ("… Papers") visible nowhere.
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
  const visibleQuestions = questions
  const hasHindiQuestions = questions.some(hasHindi)
  // A paper with no questions is an announced-but-not-yet-conducted exam
  // (e.g. JKPSI 2026). Render a "coming soon" state instead of an empty list.
  const comingSoon = questions.length === 0

  const selectAnswer = (qSlug: string, key: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qSlug]: key }))
  }

  const revealAnswer = (qSlug: string) => {
    setRevealed((prev) => ({ ...prev, [qSlug]: true }))
  }

  const toggleExpl = (qSlug: string) => {
    setExplOpen((prev) => ({ ...prev, [qSlug]: !prev[qSlug] }))
  }

  const content = (
    <div className="pyq-page">
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link to={homeHref}>{isAuthenticated ? 'Dashboard' : 'Home'}</Link>
        <ChevronRight size={13} />
        <Link to={`/exam/${paper.examSlug}`}>{paper.examName}</Link>
        <ChevronRight size={13} />
        <span>{paper.year}</span>
      </nav>

      <header className="pyq-paper-header">
        <div className="pyq-paper-header-body">
          <span className="ep-category-tag">{paper.examName} · {paper.year}</span>
          <h1>{seoH1}</h1>
          {paper.shift && <p className="pyq-paper-shift">{paper.shift}</p>}
          <div className="pyq-paper-meta-row">
            {comingSoon ? (
              <>
                <span className="pyq-soon-pill">Coming soon</span>
                <span>Held on: coming soon</span>
                {paper.subjects.length > 0 && <span>{paper.subjects.join(' · ')}</span>}
              </>
            ) : (
              <>
                <span>{paper.questions} questions</span>
                {paper.heldOn && <span>Held on {formatHeldOn(paper.heldOn)}</span>}
                <span>Answer key included</span>
                {paper.subjects.length > 0 && <span>{paper.subjects.join(' · ')}</span>}
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

      {/* Intro copy: the page's unique descriptive text for search, and the
          same prose the worker serves bots as `override.review`. The heading and
          fact chips that used to live here only restated the <h1> and the header
          meta row above, so they were dropped rather than restyled. */}
      <section className="pyq-paper-seo-intro">
        <p>{seoOverride?.review ?? seoDesc}</p>
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
        {visibleQuestions.map((q, index) => {
          const localized = getLocalizedQuestion(q, language)
          const isDeleted = q.answerKey === 'Deleted'
          const chosen = selectedAnswers[q.slug]
          const isRevealed = revealed[q.slug]
          const isExplOpen = explOpen[q.slug]
          const isCorrect = chosen === q.answerKey

          return (
            <article className={`pyq-question-card${isDeleted ? ' deleted' : ''}`} key={q.slug}>
              <div className="pyq-q-header">
                <span className="pyq-q-num">Q{index + 1}</span>
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

              {localized.passage && (
                <div className="pyq-passage">
                  <strong>{language === 'hi' ? 'अनुच्छेद' : 'Passage'}</strong>
                  <QuestionRenderer text={localized.passage} />
                </div>
              )}

              {q.images && q.images.length > 0 && (
                <div className="pyq-q-images">
                  {q.images.map((src, i) => (
                    <img key={i} src={src.startsWith('http') ? src : `${env.assetsBaseUrl}/${src}`} alt={`Question ${index + 1} figure`} className="pyq-q-img" />
                  ))}
                </div>
              )}

              <QuestionRenderer className="pyq-q-text" text={localized.question} />

              {isDeleted ? (
                <div className="pyq-deleted-notice">
                  <strong>This question was officially deleted by {paper.examSlug.split('-')[0].toUpperCase()}</strong>
                  <p>{q.explanation}</p>
                </div>
              ) : (
                <>
                  <div className="pyq-options">
                    {localized.options.map((opt, i) => {
                      const label = OPTION_LABELS[i] ?? opt.key
                      const isChosen = chosen === opt.key
                      const isCorrectOpt = opt.key === q.answerKey

                      let cls = 'pyq-option'
                      if (isRevealed) {
                        if (isCorrectOpt) cls += ' correct'
                        else if (isChosen && !isCorrect) cls += ' wrong'
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
                        <div className={`pyq-result ${isCorrect ? 'correct' : 'wrong'}`}>
                          {isCorrect ? '✓ Correct' : `✗ Correct answer: ${q.answerKey}`}
                        </div>
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
