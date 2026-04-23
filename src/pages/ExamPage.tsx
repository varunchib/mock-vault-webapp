import { ArrowRight, BookOpen, FileText, Lock, Play, Search } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LoginModal } from '../components/auth/LoginModal'
import { useState } from 'react'
import { examPreviousPapersPath } from '../lib/routes'
import { examCatalog, findExamBySlug, papersForExam, questionsForExam } from '../data/catalog'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'

export function ExamPage() {
  const { slug } = useParams()
  const exam = findExamBySlug(slug)
  const { isAuthenticated } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)

  const title = exam ? `${exam.shortName} Previous Year Question Papers with Solutions | PYQVault` : 'Exam PYQs and Mock Tests | PYQVault'
  const description = exam?.description ?? 'Browse solved previous year questions, mock tests, answer keys, and explanations on PYQVault.'

  usePageMeta({
    title,
    description,
    canonicalPath: exam ? `/exam/${exam.slug}` : '/exam',
    jsonLd: exam ? {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      about: exam.name,
    } : undefined,
  })

  if (!exam) return <Navigate to="/" replace />

  const questions = questionsForExam(exam.slug)
  const papers = papersForExam(exam.slug)

  const requireLogin = () => {
    if (isAuthenticated) {
      window.alert('Opening your mock test dashboard...')
      return
    }
    setLoginOpen(true)
  }

  return (
    <section className="public-page exam-public-page">
      <div className="public-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{exam.shortName}</span>
        </nav>

        <header className="public-hero compact sober-hero">
          <div>
            <span className="public-kicker">{exam.icon} {exam.category} Exam</span>
            <h1>{exam.name} previous year question papers</h1>
            <p>{exam.description}</p>
            <div className="public-actions">
              <Link className="dash-primary link-button" to={examPreviousPapersPath(exam.slug)}><FileText size={17} /> View all papers</Link>
              <button className="dash-secondary" type="button" onClick={requireLogin}><Play size={17} /> Attempt latest</button>
            </div>
          </div>
          <div className="exam-score-card">
            <div><strong>{exam.totalQuestions}</strong><span>Solved questions</span></div>
            <div><strong>{exam.papers}</strong><span>PYQ papers</span></div>
            <div><strong>{exam.mocks}</strong><span>Mock tests</span></div>
          </div>
        </header>

        <section className="public-grid two-col">
          <div className="public-card">
            <div className="public-card-head">
              <h2>Solved question papers</h2>
              <Search size={18} />
            </div>
            <div className="link-list">
              {papers.map((paper) => (
                <Link to={`/pyq/${paper.slug}`} key={paper.slug}>
                  <span><FileText size={16} /> {paper.title}</span>
                  <ArrowRight size={16} />
                </Link>
              ))}
              {papers.length === 0 ? <p className="muted-copy">Solved paper pages for this exam are being added.</p> : null}
            </div>
          </div>

          <div className="public-card">
            <div className="public-card-head">
              <h2>Browse by subject</h2>
              <BookOpen size={18} />
            </div>
            <div className="subject-cloud">
              {exam.subjects.map((subject) => <span key={subject}>{subject}</span>)}
            </div>
            <div className="year-row">
              {exam.popularYears.map((year) => <button type="button" key={year}>{year}</button>)}
            </div>
          </div>
        </section>

        <section className="public-card seo-copy-card">
          <h2>Question-wise explanations are public.</h2>
          <p>Students from Google land on exact paper pages first. They can read solved questions freely. Attempt mode, saved score, PDF download, and analytics are available after login.</p>
          <div className="locked-row"><Lock size={16} /> Mock history, PDFs, and analytics are saved after login.</div>
        </section>

        {questions.length ? (
          <section className="public-card seo-copy-card">
            <h2>Recently solved questions</h2>
            <div className="link-list">
              {questions.slice(0, 3).map((question) => (
                <Link to={`/question/${question.slug}`} key={question.slug}>
                  <span>Q{question.questionNo}. {question.subject} · {question.year}</span>
                  <span>Solved</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}

export function AllExamsPage() {
  usePageMeta({
    title: 'All Competitive Exam PYQs and Mock Tests | PYQVault',
    description: 'Browse UPSC, SSC, JKSSB, NEET, banking, railway, state PSC and other exam PYQs with solved answers and explanations.',
    canonicalPath: '/exam',
  })

  return (
    <section className="public-page">
      <div className="public-shell">
        <header className="public-hero compact sober-hero">
          <div>
            <span className="public-kicker">Browse exams</span>
            <h1>Find solved PYQ papers for your target exam</h1>
            <p>Start with a public paper page, read explanations freely, then login when you want to attempt the paper as a mock or download PDFs.</p>
          </div>
        </header>
        <div className="catalog-grid">
          {examCatalog.map((examItem) => (
            <Link className="catalog-card" to={examPreviousPapersPath(examItem.slug)} key={examItem.slug}>
              <span>{examItem.icon}</span>
              <strong>{examItem.shortName}</strong>
              <small>{examItem.papers} papers</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

