import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchPaperCatalog, type Paper } from '../../lib/api'
import { paperPath } from '../../lib/paperSeo'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

// Prioritized for homepage internal linking: new UPSC 2026 paper,
// weekly most-clicked papers, and the latest papers added to the catalog.
const FEATURED_TRENDING_SLUGS = [
  'upsc-cse-prelims-2026-gs1',
  'kashmir-university-jaa-2026-set-a',
  'jkssb-accounts-assistant-finance-2026',
  'jkssb-wildlife-guard-2026-may-10',
  'jkssb-junior-assistant-pyq',
  'jkssb-field-assistant-2026-may-20',
  'jkssb-inspector-forest-2026-mar-15',
  'jkssb-social-forestry-worker-2026',
  'ssc-cgl-2026-sep30-shift2',
  'jkssb-lab-attendant-2026',
  'jkssb-veterinary-pharmacist-2025',
  'ibps-po-pre-2025-aug-23-shift-1',
  'ssc-cgl-2025-sep17-shift1',
  'jkpsc-jkcce-prelims-2025-gs1-set-b',
  'upsc-cse-prelims-2025-gs1',
  'jkssb-patwari-2024-sep1-set-a',
]

export function SeoLinks() {
  const [papers, setPapers] = useState<Paper[]>([])

  useEffect(() => {
    fetchPaperCatalog()
      .then((all) => {
        const bySlug = new Map(all.map((p) => [p.slug, p]))
        const featured: Paper[] = []
        const seen = new Set<string>()
        for (const slug of FEATURED_TRENDING_SLUGS) {
          const p = bySlug.get(slug)
          if (p) {
            featured.push(p)
            seen.add(slug)
          }
        }
        const rest = all
          .filter((p) => !seen.has(p.slug))
          .sort((a, b) => (b.heldOn || b.year || '').localeCompare(a.heldOn || a.year || ''))
        setPapers([...featured, ...rest].slice(0, 16))
      })
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
