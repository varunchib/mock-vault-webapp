import { ChevronRight, Copy } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { NotFound } from '../components/common/NotFound'
import { QuestionRenderer } from '../components/common/QuestionRenderer'
import { MathText } from '../components/common/MathText'
import { ExplanationText } from '../components/common/ExplanationText'
import { fetchQuestionBySlug, type Question } from '../lib/api'
import { getLocalizedQuestion, hasHindi, type QuestionLanguage } from '../lib/questionLanguage'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { questionSeoTitle, questionSeoDescription } from '../lib/pageTitles'
import { env } from '../lib/env'
import { paperPath } from '../lib/paperSeo'
import { questionPath, questionRealSlug } from '../lib/questionUrl'

// Renders solution text with headings/bullets/nesting (identical to how the
// SSR/Worker renders it), falling back to paragraphs for plain text.
function SolutionText({ text }: { text: string }) {
  return (
    <div className="pyq-solution-body">
      <ExplanationText text={text} />
    </div>
  )
}

export function QuestionPage() {
  const { slug } = useParams()
  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { isAuthenticated } = useAuth()
  const [language, setLanguage] = useState<QuestionLanguage>('en')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)
    // The URL is /question/<keywords>--<id>; fetch by the stable id after "--".
    fetchQuestionBySlug(questionRealSlug(slug))
      .then(setQuestion)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  // Swap any bare/old URL for the canonical keyword URL without a reload, so the
  // address bar and shared links match what search engines are pointed at.
  useEffect(() => {
    if (!question) return
    const canonical = questionPath(question.urlCode ?? question.slug, question.question)
    if (window.location.pathname !== canonical) {
      window.history.replaceState(null, '', canonical + window.location.search)
    }
  }, [question])

  const seoTitle = question
    ? questionSeoTitle({ examName: question.examName, year: question.year, questionNo: question.questionNo, question: question.question })
    : 'Solved Exam Question | Ministry of Papers'
  const seoDesc = question
    ? questionSeoDescription({ examName: question.examName, year: question.year, questionNo: question.questionNo, question: question.question, answer: question.answer })
    : 'Read solved exam questions with answers and explanations on Ministry of Papers.'

  usePageMeta({
    title: seoTitle,
    description: seoDesc,
    canonicalPath: question ? questionPath(question.urlCode ?? question.slug, question.question) : '/question',
    ogType: 'article',
    jsonLd: question ? {
      '@context': 'https://schema.org',
      '@type': 'QAPage',
      name: seoTitle.replace(' | Ministry of Papers', ''),
      description: seoDesc,
      url: `https://ministryofpapers.com${questionPath(question.urlCode ?? question.slug, question.question)}`,
      mainEntity: {
        '@type': 'Question',
        name: question.question.replace(/\*\*/g, '').replace(/\n/g, ' ').slice(0, 200),
        text: question.question.replace(/\*\*/g, '').replace(/\n/g, ' '),
        answerCount: 1,
        educationalLevel: 'Competitive Exam Preparation',
        about: { '@type': 'Thing', name: question.subject || question.examName },
        author: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
        datePublished: `${String(question.year ?? '').match(/\d{4}/)?.[0] ?? '2026'}-01-01`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: [question.answer, question.explanation].filter(Boolean).join(' — ').replace(/\*\*/g, '').slice(0, 800) || `Correct answer: ${question.answerKey}.`,
          url: `https://ministryofpapers.com${questionPath(question.urlCode ?? question.slug, question.question)}`,
          author: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
          datePublished: `${String(question.year ?? '').match(/\d{4}/)?.[0] ?? '2026'}-01-01`,
          upvoteCount: 1,
        },
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
          { '@type': 'ListItem', position: 2, name: question.examName, item: `https://ministryofpapers.com/exam/${question.examSlug}` },
          { '@type': 'ListItem', position: 3, name: `Q.${question.questionNo}`, item: `https://ministryofpapers.com${questionPath(question.urlCode ?? question.slug, question.question)}` },
        ],
      },
    } : undefined,
  })

  if (!slug) return <Navigate to="/" replace />

  if (loading) return (
    <section className="public-page">
      <div className="public-shell narrow"><HaloLoader label="Loading question…" /></div>
    </section>
  )

  if (error || !question) return (
    <NotFound
      title="Question not found"
      message="This question isn't available — it may have been removed, or the link may be incorrect. Browse the exams to find solved papers."
    />
  )

  const isDeleted = question.answerKey === 'Deleted'
  const isPending = question.answerKey === 'Pending'
  const homeHref = isAuthenticated ? '/dashboard' : '/'
  const localized = getLocalizedQuestion(question, language)
  const hasHindiVersion = hasHindi(question)
  const answerOption = question.options.find(o => o.key === question.answerKey)

  // Topic(s) for the Testbook-style breadcrumb/heading: the tags that are not
  // the exam name, subject, paper or a bare year. The first one is the heading.
  const metaTags = new Set([question.examName, question.subject, question.paper, String(question.year)].filter(Boolean) as string[])
  const topics = question.tags.filter(t => t && !metaTags.has(t) && !/^\d{4}$/.test(t))
  // H1 = the question itself (Testbook-style). For multi-line / passage /
  // match-table items use the actual question line (last line ending in "?")
  // so the heading isn't a passage line or a table row.
  const qLines = localized.question.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('|'))
  const heading = (qLines.length > 2
    ? ([...qLines].reverse().find(l => l.replace(/[*_]/g, '').trim().endsWith('?')) ?? qLines[qLines.length - 1])
    : qLines.join(' ')) || localized.question
  const questionIsMultiline = localized.question.includes('\n')
  const subjectHref = `/exam/${question.examSlug}?tab=subjects&subject=${encodeURIComponent(question.subject ?? '')}`

  const copyLink = () => {
    void navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="public-page">
      <div className="public-shell narrow">

        {/* Breadcrumb — topic focused (Home › Subject › Topic) */}
        <nav className="ep-breadcrumb" aria-label="Breadcrumb">
          <Link to={homeHref}>Home</Link>
          {question.subject && (
            <>
              <ChevronRight size={13} />
              <Link to={subjectHref} rel="nofollow">{question.subject}</Link>
            </>
          )}
          {topics.slice(0, 2).map(t => (
            <span key={t} className="ep-crumb-plain">
              <ChevronRight size={13} />
              {t}
            </span>
          ))}
        </nav>

        {/* Page heading — topic, not exam name */}
        <div className="qpage-head">
          <div className="qpage-head-left">
            <h1 className="qpage-h1"><MathText text={heading} /></h1>
            {question.paperSlug && (
              <p className="qpage-source">
                Previously asked in{' '}
                <Link to={paperPath(question.paperSlug)}>{question.paper}</Link>
              </p>
            )}
          </div>
          <div className="qpage-head-actions">
            <button type="button" className="pyq-action-btn" onClick={copyLink}>
              <Copy size={14} /> {copied ? 'Copied!' : 'Share'}
            </button>
          </div>
        </div>

        {/* Question + full solution card */}
        <article className="pyq-question-card">

          <div className="pyq-q-header">
            {question.subject && (
              <Link
                className="pyq-q-subject pyq-q-subject-link"
                to={`/exam/${question.examSlug}?tab=subjects&subject=${encodeURIComponent(question.subject)}`}
                rel="nofollow"
                title={`All ${question.examName} ${question.subject} questions`}
              >
                {question.subject}
              </Link>
            )}
          </div>

          {hasHindiVersion && (
            <div className="pyq-language-toggle" aria-label="Question language">
              <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>English</button>
              <button type="button" className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिन्दी</button>
            </div>
          )}

          {localized.passage && (
            <div className="pyq-passage">
              <strong>{language === 'hi' ? 'अनुच्छेद' : 'Passage'}</strong>
              <QuestionRenderer text={localized.passage} />
            </div>
          )}

          {question.images && question.images.length > 0 && (
            <div className="pyq-q-images">
              {question.images.map((src, i) => (
                <img
                  key={i}
                  src={src.startsWith('http') ? src : `${env.assetsBaseUrl}/${src}`}
                  alt={`${question.examName} ${question.year} Q${question.questionNo} diagram`}
                  className="pyq-q-img"
                />
              ))}
            </div>
          )}

          {/* The H1 above already shows the question. Render the full body only
              for multi-line items (passages, match-the-following tables, etc.)
              so a simple one-line question isn't shown twice. */}
          {questionIsMultiline && <QuestionRenderer className="pyq-q-text" text={localized.question} />}

          {/* Options — correct answer highlighted (except deleted / pending) */}
          <div className="pyq-options pyq-options--solved">
            {localized.options.map(opt => {
              const isAns = !isPending && !isDeleted && opt.key === question.answerKey
              return (
                <div key={opt.key} className={`pyq-option${isAns ? ' correct' : ''}`}>
                  <span className="pyq-opt-key">{opt.key}</span>
                  <span className="pyq-opt-text"><MathText text={opt.text} /></span>
                  {isAns && <span className="pyq-opt-badge">✓ Correct</span>}
                </div>
              )
            })}
          </div>

          {/* Answer / status banner */}
          {isDeleted ? (
            <div className="pyq-status-note">
              This question was dropped from the final answer key, so it has no correct option — marks were awarded to all candidates.
            </div>
          ) : isPending ? (
            <div className="pyq-answer-banner pyq-answer-banner--pending">
              <span className="pyq-answer-value">Official answer key awaited — solution will be updated.</span>
            </div>
          ) : (
            <div className="pyq-answer-banner">
              <span className="pyq-answer-label">Correct Answer</span>
              <span className="pyq-answer-value">
                Option {question.answerKey}{answerOption?.text ? ` — ` : question.answer ? ` — ${question.answer}` : ''}
                {answerOption?.text && <MathText text={answerOption.text} />}
              </span>
            </div>
          )}

          {/* Detailed solution — hidden for deleted questions */}
          {!isDeleted && question.explanation && (
            <div className="pyq-solution">
              <h2 className="pyq-solution-title">Detailed Solution</h2>
              <SolutionText text={question.explanation} />
            </div>
          )}

          {question.tags.length > 0 && (
            <div className="pyq-q-tags">
              {question.tags.map(t => <span key={t} className="pyq-q-tag">{t}</span>)}
            </div>
          )}
        </article>

      </div>
    </section>
  )
}
