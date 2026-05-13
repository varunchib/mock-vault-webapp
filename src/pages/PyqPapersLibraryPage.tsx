import { FileText, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { fetchExamCatalog, fetchPaperCatalog, type Exam, type Paper } from '../lib/api'
import { examPreviousPapersPath } from '../lib/routes'
import { usePageMeta } from '../lib/usePageMeta'

export function PyqPapersLibraryPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [papers, setPapers] = useState<Paper[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  usePageMeta({
    title: 'PYQ Papers | PYQVault',
    description: 'Browse previous year papers across all exams.',
    canonicalPath: '/pyq-papers',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Previous Year Question Papers — PYQVault',
      description: 'Browse solved previous year question papers across 240+ Indian competitive exams.',
      url: 'https://pyqvault.in/pyq-papers',
    },
  })

  useEffect(() => {
    let cancelled = false

    void Promise.all([fetchExamCatalog(), fetchPaperCatalog()])
      .then(([examCatalog, paperCatalog]) => {
        if (cancelled) return
        setExams(examCatalog)
        setPapers(paperCatalog)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const filteredExams = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return exams.filter((exam) => {
      const examPapers = papers.filter((paper) => paper.examSlug === exam.slug)
      if (!examPapers.length) return false
      if (!normalized) return true

      return [
        exam.name,
        exam.shortName,
        exam.category,
        ...examPapers.map((paper) => `${paper.title} ${paper.year} ${paper.shift}`),
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    })
  }, [exams, papers, query])

  if (loading) return <HaloLoader label="Loading PYQ papers" />

  return (
    <section className="workspace-page">
      <header className="workspace-page-head">
        <div>
          <small>PYQ Papers</small>
          <h1>Previous year paper library</h1>
        </div>
        <label className="workspace-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search paper, year, exam..." />
        </label>
      </header>

      <div className="workspace-section-list">
        {filteredExams.map((exam) => {
          const examPapers = papers.filter((paper) => paper.examSlug === exam.slug).slice(0, 6)

          return (
            <section className="workspace-section" key={exam.slug}>
              <div className="workspace-section-head">
                <div>
                  <small>{exam.category}</small>
                  <h2>{exam.shortName}</h2>
                </div>
                <Link to={examPreviousPapersPath(exam.slug)}>View all</Link>
              </div>
              <div className="workspace-card-grid">
                {examPapers.map((paper) => (
                  <Link className="workspace-card" to={`/pyq/${paper.slug}`} key={paper.slug}>
                    <span><FileText size={17} /></span>
                    <strong>{paper.title}</strong>
                    <small>{paper.year} - {paper.shift}</small>
                    <p>{paper.questions} questions</p>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </section>
  )
}
