import { ArrowRight, BookOpen, Download, FileText, Lock, Play, Search } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LoginModal } from '../components/auth/LoginModal'
import { useState } from 'react'
import { examCatalog, findExamBySlug, questionsForExam } from '../data/catalog'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'

export function ExamPage() {
  const { slug } = useParams()
  const exam = findExamBySlug(slug)
  const { isAuthenticated } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)

  const title = exam ? `${exam.shortName} Previous Year Questions, Mock Tests & Solved Papers | PYQVault` : 'Exam PYQs and Mock Tests | PYQVault'
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

        <header className="public-hero compact">
          <div>
            <span className="public-kicker">{exam.icon} {exam.category} Exam</span>
            <h1>{exam.name} PYQs, mocks and solved papers</h1>
            <p>{exam.description}</p>
            <div className="public-actions">
              <button className="dash-primary" type="button" onClick={requireLogin}><Play size={17} /> Attempt mock</button>
              <button className="dash-secondary" type="button" onClick={requireLogin}><Download size={17} /> Download PDF</button>
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
              <h2>Popular PYQ pages</h2>
              <Search size={18} />
            </div>
            <div className="link-list">
              {questions.map((question) => (
                <Link to={`/question/${question.slug}`} key={question.slug}>
                  <span><FileText size={16} /> {question.year} · {question.paper} · Q{question.questionNo}</span>
                  <ArrowRight size={16} />
                </Link>
              ))}
              {questions.length === 0 ? <p className="muted-copy">Question pages for this exam are being added.</p> : null}
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
          <h2>Free to read. Login only when you take action.</h2>
          <p>Every question explanation is public so students can find it from Google. Login is required only for mock attempts, saved progress, PDF downloads, analytics, and personalized plans.</p>
          <div className="locked-row"><Lock size={16} /> Mock history, PDF downloads and analytics are saved after login.</div>
        </section>
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
        <header className="public-hero compact">
          <div>
            <span className="public-kicker">Browse exams</span>
            <h1>Find solved PYQs for your target exam</h1>
            <p>Start with a public exam page, read explanations freely, then login when you want to attempt mocks or save progress.</p>
          </div>
        </header>
        <div className="catalog-grid">
          {examCatalog.map((examItem) => (
            <Link className="catalog-card" to={`/exam/${examItem.slug}`} key={examItem.slug}>
              <span>{examItem.icon}</span>
              <strong>{examItem.shortName}</strong>
              <small>{examItem.totalQuestions} questions</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
