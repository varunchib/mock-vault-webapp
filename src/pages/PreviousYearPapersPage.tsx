import { BookOpen, ChevronRight, Download, FileText, Filter, Lock, Play, Search } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { examSlugFromPreviousPapersPath } from '../lib/routes'
import { findExamBySlug, papersForExam } from '../data/catalog'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'

export function PreviousYearPapersPage() {
  const { examPath } = useParams()
  const examSlug = examSlugFromPreviousPapersPath(examPath)
  const exam = findExamBySlug(examSlug)
  const { isAuthenticated } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [activeYear, setActiveYear] = useState('All')

  const title = exam ? `${exam.shortName} Previous Year Question Papers with Solutions | PYQVault` : 'Previous Year Question Papers | PYQVault'
  const description = exam ? `Download and attempt ${exam.shortName} previous year question papers with solutions, explanations, year-wise papers, and mock mode.` : 'Browse previous year question papers with solutions and explanations.'

  usePageMeta({
    title,
    description,
    canonicalPath: exam ? `/${exam.slug}-exam/previous-year-papers` : '/previous-year-papers',
    jsonLd: exam ? {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      about: exam.name,
    } : undefined,
  })

  if (!exam) return <Navigate to="/exam" replace />

  const papers = papersForExam(exam.slug)
  const years = ['All', ...Array.from(new Set(papers.map((paper) => paper.year)))]
  const filteredPapers = activeYear === 'All' ? papers : papers.filter((paper) => paper.year === activeYear)

  const gatedAction = () => {
    if (isAuthenticated) {
      window.alert('This will open attempt/download after backend integration.')
      return
    }
    setLoginOpen(true)
  }

  return (
    <section className="pyp-page">
      <div className="pyp-shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/exam/${exam.slug}`}>{exam.shortName}</Link>
          <span>/</span>
          <span>Previous Year Papers</span>
        </nav>

        <header className="pyp-hero">
          <div>
            <span>{exam.category} Exam</span>
            <h1>{exam.shortName} Previous Year Question Papers</h1>
            <p>{exam.description} Download papers year-wise or attempt them in timed mock mode after login.</p>
            <div className="pyp-hero-stats">
              <strong>{exam.papers} Papers</strong>
              <strong>{exam.totalQuestions} Questions</strong>
              <strong>{exam.mocks} Mocks</strong>
            </div>
          </div>
          <aside>
            <BookOpen size={22} />
            <strong>Best way to use PYQs</strong>
            <p>Open a paper, solve questions freely, then attempt the same paper as a mock when ready.</p>
          </aside>
        </header>

        <div className="pyp-layout">
          <main className="pyp-main">
            <section className="pyp-toolbar">
              <label><Search size={17} /><input placeholder={`Search ${exam.shortName} papers...`} /></label>
              <button type="button"><Filter size={16} /> Filters</button>
            </section>

            <section className="pyp-year-filter" aria-label="Filter by year">
              {years.map((year) => (
                <button className={year === activeYear ? 'active' : ''} type="button" key={year} onClick={() => setActiveYear(year)}>{year}</button>
              ))}
            </section>

            <section className="pyp-list-card">
              <div className="pyp-list-head">
                <h2>{exam.shortName} Solved Papers</h2>
                <span>{filteredPapers.length} papers</span>
              </div>
              <div className="pyp-paper-list">
                {filteredPapers.map((paper) => (
                  <article className="pyp-paper-row" key={paper.slug}>
                    <div className="pyp-paper-icon"><FileText size={19} /></div>
                    <div className="pyp-paper-copy">
                      <Link to={`/pyq/${paper.slug}`}>{paper.title}</Link>
                      <p>{paper.shift} · {paper.questions} Questions · {paper.subjects.join(', ')}</p>
                      <div>{paper.subjects.slice(0, 4).map((subject) => <span key={subject}>{subject}</span>)}</div>
                    </div>
                    <div className="pyp-paper-actions">
                      <button type="button" onClick={gatedAction}><Download size={15} /> PDF</button>
                      <button className="primary" type="button" onClick={gatedAction}><Play size={15} /> Attempt</button>
                      <Link to={`/pyq/${paper.slug}`}>Solutions <ChevronRight size={15} /></Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          <aside className="pyp-side">
            <div className="pyp-side-card highlight">
              <Lock size={18} />
              <h3>Attempt papers as mocks</h3>
              <p>Login to save score, timer, rank, and mistake history.</p>
              <button type="button" onClick={gatedAction}>Start free</button>
            </div>
            <div className="pyp-side-card">
              <h3>Popular subjects</h3>
              <div className="subject-cloud">{exam.subjects.map((subject) => <span key={subject}>{subject}</span>)}</div>
            </div>
          </aside>
        </div>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
