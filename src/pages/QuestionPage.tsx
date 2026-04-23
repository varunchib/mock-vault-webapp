import { CheckCircle2, Download, Lock, Play, Share2 } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { findQuestionBySlug } from '../data/catalog'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'

export function QuestionPage() {
  const { slug } = useParams()
  const question = findQuestionBySlug(slug)
  const { isAuthenticated } = useAuth()
  const [selected, setSelected] = useState<string | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)

  const title = question ? `${question.examName} ${question.year} ${question.subject} Question ${question.questionNo} with Explanation | PYQVault` : 'Solved Exam Question with Explanation | PYQVault'
  const description = question ? `${question.question} Answer: ${question.answer}. Read the full explanation and related PYQ practice.` : 'Read solved exam questions with answers and explanations on PYQVault.'

  usePageMeta({
    title,
    description,
    canonicalPath: question ? `/question/${question.slug}` : '/question',
    jsonLd: question ? {
      '@context': 'https://schema.org',
      '@type': 'Question',
      name: question.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: question.explanation,
      },
      about: question.examName,
      educationalLevel: 'Competitive exam preparation',
    } : undefined,
  })

  if (!question) return <Navigate to="/" replace />

  const gateAction = () => {
    if (isAuthenticated) {
      window.alert('Opening logged-in feature...')
      return
    }
    setLoginOpen(true)
  }

  return (
    <section className="public-page question-public-page">
      <div className="public-shell narrow">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/exam/${question.examSlug}`}>{question.examName}</Link>
          <span>/</span>
          <span>Q{question.questionNo}</span>
        </nav>

        <article className="question-page-card">
          <div className="question-meta-row">
            <span>{question.examName} {question.year}</span>
            <span>{question.paper}</span>
            <span>{question.subject}</span>
          </div>
          <h1>Q{question.questionNo}. {question.question}</h1>

          <div className="answer-options">
            {question.options.map((option) => {
              const isCorrect = option.key === question.answerKey
              const isSelected = selected === option.key
              const className = isSelected ? (isCorrect ? 'correct' : 'incorrect') : ''

              return (
                <button className={className} type="button" key={option.key} onClick={() => setSelected(option.key)}>
                  <span>{option.key}</span>
                  {option.text}
                </button>
              )
            })}
          </div>

          <section className="explanation-box">
            <div className="answer-line"><CheckCircle2 size={18} /> Correct answer: <strong>{question.answer}</strong></div>
            <p>{question.explanation}</p>
            <div className="tag-row left">
              {question.tags.map((tag) => <span className="s-tag" key={tag}>{tag}</span>)}
            </div>
          </section>

          <div className="question-actions">
            <button className="dash-primary" type="button" onClick={gateAction}><Play size={17} /> Attempt related mock</button>
            <button className="dash-secondary" type="button" onClick={gateAction}><Download size={17} /> Download paper PDF</button>
            <button className="dash-secondary" type="button" onClick={() => void navigator.clipboard?.writeText(window.location.href)}><Share2 size={17} /> Copy link</button>
          </div>

          <div className="locked-row"><Lock size={16} /> Login is required only for saved progress, PDF downloads, analytics, and full mocks.</div>
        </article>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
