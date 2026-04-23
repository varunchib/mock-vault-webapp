import { Download, FileText, Lock, Play } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { examPreviousPapersPath } from '../lib/routes'
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
      learningResourceType: 'Previous year question paper',
    } : undefined,
  })

  if (!paper) return <Navigate to="/exam" replace />

  const gatedAction = () => {
    if (isAuthenticated) {
      window.alert('This will open the mock/PDF module after backend integration.')
      return
    }
    setLoginOpen(true)
  }

  const relatedQuestions = questionCatalog.filter((question) => question.examSlug === paper.examSlug)

  return (
    <section className="paper-simple-page">
      <div className="paper-simple-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={examPreviousPapersPath(paper.examSlug)}>{paper.examName} Papers</Link>
          <span>/</span>
          <span>{paper.year}</span>
        </nav>

        <div className="paper-simple-layout">
          <main className="paper-simple-main">
            <header className="paper-simple-header">
              <span>{paper.examName} · {paper.year}</span>
              <h1>{paper.title}</h1>
              <p>{paper.description}</p>
              <div className="paper-simple-meta">
                <small>{paper.questions} Questions</small>
                <small>{paper.shift}</small>
                <small>{paper.subjects.length} Subjects</small>
              </div>
            </header>

            <section className="paper-simple-card">
              <div className="paper-simple-head">
                <h2>Questions with solutions</h2>
                <span>{relatedQuestions.length} solved</span>
              </div>
              <div className="paper-simple-list">
                {relatedQuestions.map((question) => (
                  <Link to={`/question/${question.slug}`} key={question.slug}>
                    <span>Q{question.questionNo}</span>
                    <div>
                      <strong>{question.question}</strong>
                      <small>{question.subject} · Answer: {question.answer}</small>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          <aside className="paper-simple-side">
            <div className="paper-action-box">
              <h2>Attempt this paper</h2>
              <p>Take this PYQ as a timed mock. Score and analysis are saved after login.</p>
              <button className="primary" type="button" onClick={gatedAction}><Play size={16} /> Attempt Mock</button>
              <button type="button" onClick={gatedAction}><Download size={16} /> Download PDF</button>
              <div><Lock size={14} /> Login required for mock history and PDFs.</div>
            </div>

            <div className="paper-detail-box">
              <h3>Paper details</h3>
              <p><FileText size={14} /> {paper.questions} questions</p>
              <p>{paper.shift}</p>
              <p>{paper.subjects.join(', ')}</p>
            </div>
          </aside>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
