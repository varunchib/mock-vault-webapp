import { BookOpen, ChevronRight, Copy, Play } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { QuestionRenderer } from '../components/common/QuestionRenderer'
import { MathText } from '../components/common/MathText'
import { fetchQuestionBySlug, type Question } from '../lib/api'
import { getLocalizedQuestion, hasHindi, type QuestionLanguage } from '../lib/questionLanguage'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { questionSeoTitle, questionSeoDescription } from '../lib/pageTitles'
import { env } from '../lib/env'
import { paperPath } from '../lib/paperSeo'

// Renders solution text: each non-empty line becomes a paragraph, with **bold**
// and $math$ handled by MathText (identical to how the SSR/Worker renders it).
function SolutionText({ text }: { text: string }) {
  const lines = text.replace(/\r/g, '').split('\n').map(l => l.trim()).filter(Boolean)
  return (
    <div className="pyq-solution-body">
      {lines.map((line, i) => (
        <p key={i}><MathText text={line} /></p>
      ))}
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
    fetchQuestionBySlug(slug)
      .then(setQuestion)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  const seoTitle = question
    ? questionSeoTitle({ examName: question.examName, year: question.year, questionNo: question.questionNo, question: question.question })
    : 'Solved Exam Question | Ministry of Papers'
  const seoDesc = question
    ? questionSeoDescription({ examName: question.examName, year: question.year, questionNo: question.questionNo, question: question.question, answer: question.answer })
    : 'Read solved exam questions with answers and explanations on Ministry of Papers.'

  usePageMeta({
    title: seoTitle,
    description: seoDesc,
    canonicalPath: question ? `/question/${question.slug}` : '/question',
    ogType: 'article',
    jsonLd: question ? {
      '@context': 'https://schema.org',
      '@type': 'QAPage',
      name: seoTitle.replace(' | Ministry of Papers', ''),
      description: seoDesc,
      url: `https://ministryofpapers.com/question/${question.slug}`,
      mainEntity: {
        '@type': 'Question',
        name: question.question.replace(/\*\*/g, '').replace(/\n/g, ' ').slice(0, 200),
        text: question.question.replace(/\*\*/g, '').replace(/\n/g, ' '),
        answerCount: 1,
        educationalLevel: 'Competitive Exam Preparation',
        about: { '@type': 'Thing', name: question.subject || question.examName },
        ...(question.year ? { datePublished: question.year } : {}),
        acceptedAnswer: {
          '@type': 'Answer',
          text: [question.answer, question.explanation].filter(Boolean).join(' — ').replace(/\*\*/g, '').slice(0, 800) || `Correct answer: ${question.answerKey}.`,
          url: `https://ministryofpapers.com/question/${question.slug}`,
          author: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
        },
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
          { '@type': 'ListItem', position: 2, name: question.examName, item: `https://ministryofpapers.com/exam/${question.examSlug}` },
          { '@type': 'ListItem', position: 3, name: `Q.${question.questionNo}`, item: `https://ministryofpapers.com/question/${question.slug}` },
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

  if (error || !question) return <Navigate to="/" replace />

  const isDeleted = question.answerKey === 'Deleted'
  const isPending = question.answerKey === 'Pending'
  const homeHref = isAuthenticated ? '/dashboard' : '/'
  const localized = getLocalizedQuestion(question, language)
  const hasHindiVersion = hasHindi(question)
  const answerOption = question.options.find(o => o.key === question.answerKey)

  const copyLink = () => {
    void navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="public-page">
      <div className="public-shell narrow">

        {/* Breadcrumb */}
        <nav className="ep-breadcrumb" aria-label="Breadcrumb">
          <Link to={homeHref}>Home</Link>
          <ChevronRight size={13} />
          <Link to={`/exam/${question.examSlug}`}>{question.examName}</Link>
          {question.paperSlug && (
            <>
              <ChevronRight size={13} />
              <Link to={paperPath(question.paperSlug)}>{question.paper}</Link>
            </>
          )}
          <ChevronRight size={13} />
          <span>Q.{question.questionNo}</span>
        </nav>

        {/* Page heading */}
        <div className="qpage-head">
          <div className="qpage-head-left">
            <span className="ep-category-tag">{question.examName} · {question.year}</span>
            <h1 className="qpage-h1">{question.examName} {question.year} — Q.{question.questionNo}{question.subject ? ` (${question.subject})` : ''}</h1>
          </div>
          <div className="qpage-head-actions">
            <button type="button" className="pyq-action-btn" onClick={copyLink}>
              <Copy size={14} /> {copied ? 'Copied!' : 'Share'}
            </button>
            {question.paperSlug && (
              <Link to={paperPath(question.paperSlug)} className="pyq-action-btn">
                <BookOpen size={14} /> Full Paper
              </Link>
            )}
            <Link to={`/exam/${question.examSlug}`} className="pyq-action-btn">
              <Play size={14} /> Exam Hub
            </Link>
          </div>
        </div>

        {/* Question + full solution card */}
        <article className="pyq-question-card">

          <div className="pyq-q-header">
            <span className="pyq-q-num">Q.{question.questionNo}</span>
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

          <QuestionRenderer className="pyq-q-text" text={localized.question} />

          {isDeleted ? (
            <div className="pyq-deleted-notice">
              <strong>This question was officially deleted / cancelled.</strong>
              {question.explanation && <p>{question.explanation}</p>}
            </div>
          ) : (
            <>
              {/* Options — correct answer highlighted immediately */}
              <div className="pyq-options pyq-options--solved">
                {localized.options.map(opt => {
                  const isAns = !isPending && opt.key === question.answerKey
                  return (
                    <div key={opt.key} className={`pyq-option${isAns ? ' correct' : ''}`}>
                      <span className="pyq-opt-key">{opt.key}</span>
                      <span className="pyq-opt-text"><MathText text={opt.text} /></span>
                      {isAns && <span className="pyq-opt-badge">✓ Correct</span>}
                    </div>
                  )
                })}
              </div>

              {/* Answer banner */}
              {!isPending && (
                <div className="pyq-answer-banner">
                  <span className="pyq-answer-label">Correct Answer</span>
                  <span className="pyq-answer-value">
                    Option {question.answerKey}{answerOption?.text ? ` — ` : question.answer ? ` — ${question.answer}` : ''}
                    {answerOption?.text && <MathText text={answerOption.text} />}
                  </span>
                </div>
              )}
              {isPending && (
                <div className="pyq-answer-banner pyq-answer-banner--pending">
                  <span className="pyq-answer-value">Official answer key awaited — solution will be updated.</span>
                </div>
              )}

              {/* Full detailed solution — always visible */}
              {question.explanation && (
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
            </>
          )}
        </article>

      </div>
    </section>
  )
}
