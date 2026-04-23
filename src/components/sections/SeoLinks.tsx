import { Link } from 'react-router-dom'
import { paperCatalog } from '../../data/catalog'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function SeoLinks() {
  return (
    <Reveal as="section" className="seo-section">
      <SectionHeader
        eyebrow="Browse papers"
        title="Trending right now"
        subtitle="Paper pages are the main Google entry points. Questions stay free; mock mode and PDFs require login."
      />
      <div className="seo-grid">
        {paperCatalog.map((paper) => (
          <Link className="seo-card" to={`/pyq/${paper.slug}`} key={paper.slug}>
            <span className="seo-text">📄 {paper.title}</span>
            <span className="seo-count">{paper.questions} Qs</span>
          </Link>
        ))}
      </div>
    </Reveal>
  )
}
