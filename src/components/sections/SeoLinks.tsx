import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPaperCatalog, type Paper } from '../../lib/api'
import { paperPath } from '../../lib/paperSeo'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function SeoLinks() {
  const [papers, setPapers] = useState<Paper[]>([])

  useEffect(() => {
    fetchPaperCatalog()
      .then(all => setPapers(all.slice(0, 16)))
      .catch(() => {})
  }, [])

  if (papers.length === 0) return null

  return (
    <Reveal as="section" className="seo-section">
      <SectionHeader
        eyebrow="Browse papers"
        title="Trending right now"
        subtitle="Paper pages are the main Google entry points. Questions stay free; mock mode and PDFs require login."
      />
      <div className="seo-grid">
        {papers.map((paper) => (
          <Link className="seo-card" to={paperPath(paper.slug)} key={paper.slug}>
            <span className="seo-text">📄 {paper.title}</span>
            <span className="seo-count">{paper.questions} Qs</span>
          </Link>
        ))}
      </div>
    </Reveal>
  )
}
