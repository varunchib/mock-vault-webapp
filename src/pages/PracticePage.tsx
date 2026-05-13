import { BookOpenCheck, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { fetchExamCatalog, fetchQuestionCatalog, type Exam, type Question } from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'

export function PracticePage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  usePageMeta({
    title: 'Practice | PYQVault',
    description: 'Practice solved questions by exam, subject, and year.',
    canonicalPath: '/practice',
  })

  useEffect(() => {
    let cancelled = false

    void Promise.all([fetchExamCatalog(), fetchQuestionCatalog()])
      .then(([examCatalog, questionCatalog]) => {
        if (cancelled) return
        setExams(examCatalog)
        setQuestions(questionCatalog)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const filteredQuestions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return questions.slice(0, 18)

    return questions
      .filter((question) =>
        [
          question.examName,
          question.subject,
          question.year,
          question.paper,
          question.question,
          ...question.tags,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalized),
      )
  }, [questions, query])

  if (loading) return <HaloLoader label="Loading practice" />

  return (
    <section className="workspace-page">
      <header className="workspace-page-head">
        <div>
          <small>Practice</small>
          <h1>Question practice</h1>
        </div>
        <label className="workspace-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search subject, exam, keyword..." />
        </label>
      </header>

      <section className="workspace-section">
        <div className="workspace-section-head">
          <div>
            <small>Start by exam</small>
            <h2>Practice sets</h2>
          </div>
        </div>
        <div className="workspace-card-grid">
          {exams.map((exam) => (
            <Link className="workspace-card" to={`/exam/${exam.slug}`} key={exam.slug}>
              <span><BookOpenCheck size={17} /></span>
              <strong>{exam.shortName}</strong>
              <small>{exam.category}</small>
              <p>{exam.totalQuestions} questions</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="workspace-section">
        <div className="workspace-section-head">
          <div>
            <small>Questions</small>
            <h2>Question feed</h2>
          </div>
        </div>
        <div className="workspace-list">
          {filteredQuestions.map((question) => (
            <Link className="workspace-list-row" to={`/question/${question.slug}`} key={question.slug}>
              <div>
                <strong>{question.examName} Q{question.questionNo}</strong>
                <small>{question.subject} - {question.year}</small>
              </div>
              <span>Practice</span>
            </Link>
          ))}
        </div>
      </section>
    </section>
  )
}
