import { seoLinks } from '../../data/landing'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

export function SeoLinks() {
  return (
    <Reveal as="section" className="seo-section">
      <SectionHeader
        eyebrow="Browse papers"
        title="Trending right now"
        subtitle="Every link below is a fully solved, Google-indexed page. This is what gets us to rank #1."
      />
      <div className="seo-grid">
        {seoLinks.map((link) => (
          <a className="seo-card" href="#top" key={link.title}>
            <span className="seo-text">📄 {link.title}</span>
            <span className="seo-count">{link.count}</span>
          </a>
        ))}
      </div>
    </Reveal>
  )
}
