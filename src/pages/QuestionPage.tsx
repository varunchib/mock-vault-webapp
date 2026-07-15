import { BookOpen, ChevronRight, Copy, Play } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { HaloLoader } from '../components/common/HaloLoader'
import { QuestionRenderer } from '../components/common/QuestionRenderer'
import { fetchQuestionBySlug, type Question } from '../lib/api'
import { getLocalizedQuestion, hasHindi, type QuestionLanguage } from '../lib/questionLanguage'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { questionSeoTitle, questionSeoDescription } from '../lib/pageTitles'
import { env } from '../lib/env'
import { paperPath } from '../lib/paperSeo'

export function QuestionPage() {
  const { slug } = useParams()
  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { isAuthenticated } = useAuth()
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [explOpen, setExplOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [language, setLanguage] = useState<QuestionLanguage>('en')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)
    setSelected(null)
    setSubmitted(false)
    setExplOpen(false)
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
        about: { '@type': 'Thing', name: question.examName },
        ...(question.year ? { datePublished: question.year } : {}),
        acceptedAnswer: {
          '@type': 'Answer',
          text: [question.answer, question.explanation].filter(Boolean).join(' — ').slice(0, 500) || `Correct answer: ${question.answerKey}.`,
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

  const isCorrect = useMemo(() => submitted && selected === question?.answerKey, [submitted, selected, question])

  if (!slug) return <Navigate to="/" replace />

  if (loading) return (
    <section className="public-page">
      <div className="public-shell narrow"><HaloLoader label="Loading question…" /></div>
    </section>
  )

  if (error || !question) return <Navigate to="/" replace />

  const isDeleted = question.answerKey === 'Deleted'
  const homeHref = isAuthenticated ? '/dashboard' : '/'
  const localized = getLocalizedQuestion(question, language)
  const hasHindiVersion = hasHindi(question)

  const copyLink = () => {
    void navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <>
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

          {/* Page heading — category tag + H1 + actions, no repeated chips */}
          <div className="qpage-head">
            <div className="qpage-head-left">
              <span className="ep-category-tag">{question.examName} · {question.year}</span>
              <h1 className="qpage-h1">{question.examName} {question.year} — Q.{question.questionNo}</h1>
            </div>
            <div className="qpage-head-actions">
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

          {/* Question card — mirrors pyq-question-card from paper page */}
          <article className="pyq-question-card">

            {/* Q.N · Subject row — identical to paper page header row */}
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
                    alt={`Question ${question.questionNo} diagram`}
                    className="pyq-q-img"
                  />
                ))}
              </div>
            )}

            <QuestionRenderer className="pyq-q-text" text={localized.question} />

            {isDeleted ? (
              <div className="pyq-deleted-notice">
                <strong>This question was officially deleted</strong>
                {question.explanation && <p>{question.explanation}</p>}
              </div>
            ) : (
              <>
                <div className="pyq-options">
                  {localized.options.map(opt => {
                    let cls = 'pyq-option'
                    if (submitted) {
                      if (opt.key === question.answerKey) cls += ' correct'
                      else if (opt.key === selected) cls += ' wrong'
                    } else if (selected === opt.key) {
                      cls += ' chosen'
                    }
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        className={cls}
                        onClick={() => !submitted && setSelected(opt.key)}
                        disabled={submitted}
                      >
                        <span className="pyq-opt-key">{opt.key}</span>
                        <span>{opt.text}</span>
                      </button>
                    )
                  })}
                </div>

                {question.tags.length > 0 && (
                  <div className="pyq-q-tags">
                    {question.tags.map(t => <span key={t} className="pyq-q-tag">{t}</span>)}
                  </div>
                )}

                <div className="pyq-q-actions">
                  {!submitted ? (
                    <button
                      type="button"
                      className="pyq-reveal-btn"
                      onClick={() => selected && setSubmitted(true)}
                      disabled={!selected}
                    >
                      Check Answer
                    </button>
                  ) : (
                    <>
                      <div className={`pyq-result ${isCorrect ? 'correct' : 'wrong'}`}>
                        {isCorrect ? '✓ Correct' : `✗ Correct answer: ${question.answerKey}`}
                      </div>
                      {question.explanation && (
                        <button
                          type="button"
                          className={`pyq-expl-btn${explOpen ? ' open' : ''}`}
                          onClick={() => setExplOpen(v => !v)}
                        >
                          📖 {explOpen ? 'Hide' : 'Explanation'}
                        </button>
                      )}
                      <button type="button" className="pyq-expl-btn" onClick={copyLink}>
                        <Copy size={12} /> {copied ? 'Copied!' : 'Share'}
                      </button>
                    </>
                  )}
                </div>

                {submitted && explOpen && question.explanation && (
                  <div className="pyq-explanation">
                    <strong>Explanation</strong>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </>
            )}
          </article>

        </div>
      </section>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
