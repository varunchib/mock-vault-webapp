import { Download, FileText, Lock, Play } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { findPaperBySlug, questionCatalog } from '../data/catalog'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'

export function PyqPaperPage() {
  const { slug } = useParams()
  const paper = findPaperBySlug(slug)
  const { isAuthenticated } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)

  const title = paper ? `${paper.title} PDF, Questions and Answers | PYQVault` : 'Solved PYQ Paper | PYQVault'
  const description = paper?.description ?? 'Read solved previous year question papers with answers and explanations.'

  usePageMeta({
    title,
    description,
    canonicalPath: paper ? `/pyq/${paper.slug}` : '/pyq',
    jsonLd: paper ? {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: paper.title,
      description: paper.description,
      educationalLevel: 'Competitive exam preparation',
    } : undefined,
  })

  if (!paper) return <Navigate to="/exam" replace />

  const gatedAction = () => {
    if (isAuthenticated) {
      window.alert('PDF/mock action will open after backend integration.')
      return
    }
    setLoginOpen(true)
  }

  const relatedQuestions = questionCatalog.filter((question) => question.examSlug === paper.examSlug)

  return (
    <section className="public-page">
      <div className="public-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><Link to={`/exam/${paper.examSlug}`}>{paper.examName}</Link><span>/</span><span>{paper.year}</span>
        </nav>
        <header className="public-hero compact">
          <div>
            <span className="public-kicker">PYQ Paper · {paper.year}</span>
            <h1>{paper.title}</h1>
            <p>{paper.description}</p>
            <div className="public-actions">
              <button className="dash-primary" type="button" onClick={gatedAction}><Play size={17} /> Attempt as mock</button>
              <button className="dash-secondary" type="button" onClick={gatedAction}><Download size={17} /> Download PDF</button>
            </div>
          </div>
          <div className="exam-score-card">
            <div><strong>{paper.questions}</strong><span>Questions</span></div>
            <div><strong>{paper.year}</strong><span>Year</span></div>
            <div><strong>{paper.subjects.length}</strong><span>Subjects</span></div>
          </div>
        </header>

        <section className="public-grid two-col">
          <div className="public-card">
            <div className="public-card-head"><h2>Question-wise solutions</h2><FileText size={18} /></div>
            <div className="link-list">
              {relatedQuestions.map((question) => (
                <Link to={`/question/${question.slug}`} key={question.slug}>
                  <span>Q{question.questionNo}. {question.subject}</span>
                  <span>Solved</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="public-card">
            <h2>Subjects covered</h2>
            <div className="subject-cloud">
              {paper.subjects.map((subject) => <span key={subject}>{subject}</span>)}
            </div>
            <div className="locked-row"><Lock size={16} /> PDF download and attempt history require login.</div>
          </div>
        </section>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
