import { ChevronRight, Download, Lock, Play } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { HaloLoader } from '../components/common/HaloLoader'
import { QuestionRenderer } from '../components/common/QuestionRenderer'
import {
  fetchPaperBySlug,
  fetchPaperQuestions,
  type Paper,
  type Question,
} from '../lib/api'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { getLocalizedQuestion, hasHindi, type QuestionLanguage } from '../lib/questionLanguage'

const FREE_LIMIT = 10

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
  const [loginOpen, setLoginOpen] = useState(false)
  const [language, setLanguage] = useState<QuestionLanguage>('en')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)

    fetchPaperBySlug(slug)
      .then((paperData) => {
        setPaper(paperData)
        return fetchPaperQuestions(paperData.slug)
      })
      .then(setQuestions)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug, retryCount])

  const title = paper
    ? `${paper.title} — Questions & Answers | Ministry of Papers`
    : 'Solved PYQ Paper | Ministry of Papers'

  usePageMeta({
    title,
    description: paper?.description ?? 'Solved previous year question paper with answers and explanations.',
    canonicalPath: paper ? `/pyq/${paper.slug}` : '/pyq',
    jsonLd: paper
      ? {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: paper.title,
          description: paper.description,
          url: `https://ministryofpapers.com/pyq/${paper.slug}`,
          educationalLevel: 'Competitive exam preparation',
          learningResourceType: 'Previous year question paper',
          teaches: paper.subjects?.join(', '),
          provider: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
              { '@type': 'ListItem', position: 2, name: paper.examName ?? 'Exam', item: `https://ministryofpapers.com/exam/${paper.examSlug ?? ''}` },
              { '@type': 'ListItem', position: 3, name: paper.title, item: `https://ministryofpapers.com/pyq/${paper.slug}` },
            ],
          },
        }
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
  const visibleQuestions = isAuthenticated ? questions : questions.slice(0, FREE_LIMIT)
  const isGated = !isAuthenticated && questions.length > FREE_LIMIT
  const hasHindiQuestions = questions.some(hasHindi)

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
          <h1>{paper.title}</h1>
          {paper.shift && <p className="pyq-paper-shift">{paper.shift}</p>}
          <div className="pyq-paper-meta-row">
            <span>{paper.questions} questions</span>
            {paper.subjects.length > 0 && <span>{paper.subjects.join(' · ')}</span>}
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
              onClick={() => {
                if (!isAuthenticated) { setLoginOpen(true); return }
                navigate(`/paper-attempt/${paper.slug}`)
              }}
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
        </div>
      </header>

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

              <QuestionRenderer className="pyq-q-text" text={localized.question} />

              {isDeleted ? (
                <div className="pyq-deleted-notice">
                  <strong>This question was officially deleted by BPSC</strong>
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
                          <span>{opt.text}</span>
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
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </>
              )}
            </article>
          )
        })}
      </div>

      {isGated && (
        <div className="ep-gate">
          <div className="ep-gate-inner">
            <Lock size={20} />
            <strong>Sign in to see all {questions.length} questions</strong>
            <p>You've seen {FREE_LIMIT} of {questions.length} questions. Sign in free to unlock the full paper.</p>
            <button
              className="ep-gate-btn"
              type="button"
              onClick={() => setLoginOpen(true)}
            >
              Sign in with Google
            </button>
          </div>
        </div>
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
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
