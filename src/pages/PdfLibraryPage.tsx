import { Download, FileText, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { fetchPaperCatalog, type Paper } from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'

export function PdfLibraryPage() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  usePageMeta({
    title: 'PDF Library | PYQVault',
    description: 'Open printable paper pages from the PDF library.',
    canonicalPath: '/pdf-library',
  })

  useEffect(() => {
    let cancelled = false

    void fetchPaperCatalog()
      .then((paperCatalog) => {
        if (!cancelled) setPapers(paperCatalog)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const filteredPapers = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return papers

    return papers.filter((paper) =>
      [
        paper.examName,
        paper.title,
        paper.year,
        paper.shift,
        ...paper.subjects,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    )
  }, [papers, query])

  if (loading) return <HaloLoader label="Loading PDF library" />

  return (
    <section className="workspace-page">
      <header className="workspace-page-head">
        <div>
          <small>PDF Library</small>
          <h1>Paper documents</h1>
        </div>
        <label className="workspace-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search document..." />
        </label>
      </header>

      <div className="workspace-card-grid">
        {filteredPapers.map((paper) => (
          <article className="workspace-card" key={paper.slug}>
            <span><FileText size={17} /></span>
            <strong>{paper.title}</strong>
            <small>{paper.examName} - {paper.year}</small>
            <p>{paper.questions} questions</p>
            <Link className="workspace-card-action" to={`/pyq/${paper.slug}`}>
              <Download size={15} /> View &amp; Print
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
