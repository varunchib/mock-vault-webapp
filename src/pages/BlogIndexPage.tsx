import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { postGuides } from '../data/postGuides'

const BLOG_PATH = '/blog'

const FEATURED_GUIDES = [
  { slug: 'upsc-cse', tag: 'Civil Services' },
  { slug: 'ssc-cgl', tag: 'Staff Selection' },
  { slug: 'jkcce', tag: 'State PSC' },
  { slug: 'bpsc-cce', tag: 'State PSC' },
  { slug: 'jkpsi', tag: 'Police SI' },
  { slug: 'ibps-po', tag: 'Banking' },
]

export function BlogIndexPage() {
  usePageMeta({
    title: 'Study Guides & Geography Articles | Ministry of Papers',
    description: 'Explore comprehensive study guides, interactive physical geography maps, and solved paper breakdowns for UPSC, SSC, and State PSC exams.',
    canonicalPath: BLOG_PATH,
  })

  return (
    <section className="public-page blog-page-root">
      <main className="public-shell blog-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Articles & Guides</span>
        </nav>

        {/* Hero Section */}
        <header className="blog-hub-hero">
          <div className="blog-hub-badge">Editorial &amp; Knowledge Base</div>
          <h1>Articles &amp; Exam Strategy Guides</h1>
          <p className="blog-hub-sub">
            In-depth academic resources, interactive physical geography maps, and official previous-year question breakdowns curated for serious civil services and government exam aspirants.
          </p>
        </header>

        {/* Featured Flagship Article Card */}
        <section className="blog-featured-section" aria-labelledby="featured-article-heading">
          <div className="blog-section-header">
            <h2 id="featured-article-heading">Featured Geography Guide</h2>
            <span className="blog-section-meta">Interactive • Complete Revision</span>
          </div>

          <article className="blog-flagship-card">
            <div className="blog-flagship-body">
              <div className="blog-card-meta-row">
                <span className="blog-pill-cat">Indian Geography</span>
                <span className="blog-meta-dot">·</span>
                <span className="blog-read-time">12 min read</span>
                <span className="blog-meta-dot">·</span>
                <span className="blog-updated-date">Updated 12 Nov 2026</span>
              </div>
              <h3 className="blog-flagship-title">
                <Link to="/blog/indian-rivers-and-tributaries">
                  Indian Rivers and Their Tributaries: Himalayan vs Peninsular Systems, Maps &amp; Exam Facts
                </Link>
              </h3>
              <p className="blog-flagship-desc">
                Master 13 major river basins of India with source elevations, left-bank vs right-bank tributary breakdowns, Panch Prayag sequences, and direct links to solved PYQs from UPSC CSE, SSC CGL, and State PSCs.
              </p>

              <div className="blog-flagship-highlights">
                <div className="blog-highlight-item">
                  <strong>Himalayan vs Peninsular</strong>
                  <span>Comparative drainage, origin, and flow analysis</span>
                </div>
                <div className="blog-highlight-item">
                  <strong>Bank-by-Bank Pills</strong>
                  <span>Discrete left &amp; right bank tributary classifications</span>
                </div>
                <div className="blog-highlight-item">
                  <strong>Interactive Map Linked</strong>
                  <span>One-click deep links to zoom into any river route</span>
                </div>
              </div>

              <div className="blog-flagship-actions">
                <Link className="blog-btn-primary" to="/blog/indian-rivers-and-tributaries">
                  Read River Guide <span aria-hidden="true">→</span>
                </Link>
                <Link className="blog-btn-secondary" to="/india-physical-geography-map">
                  Explore Interactive Map <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>
        </section>

        {/* Interactive Map Showcase Card */}
        <section className="blog-tool-showcase" aria-labelledby="interactive-tool-heading">
          <div className="blog-tool-card">
            <div className="blog-tool-content">
              <span className="blog-tool-badge">Free Interactive Learning Tool</span>
              <h2 id="interactive-tool-heading">India Physical Geography Map: Rivers, Lakes &amp; Reservoirs</h2>
              <p>
                An interactive vector map built to visualize Indian drainage patterns. Trace individual river courses, examine tributary confluences, and test your knowledge of major Ramsar sites and freshwater lakes.
              </p>
              <Link to="/india-physical-geography-map" className="blog-tool-link">
                Launch Physical Geography Map <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Exam Preparation & Syllabus Guides Grid */}
        <section className="blog-guides-section" aria-labelledby="exam-guides-heading">
          <div className="blog-section-header">
            <h2 id="exam-guides-heading">Competitive Exam Guides &amp; Patterns</h2>
            <Link to="/exams" className="blog-see-all-link">Browse All Exams →</Link>
          </div>

          <div className="blog-guides-grid">
            {FEATURED_GUIDES.map(({ slug, tag }) => {
              const guide = postGuides[slug]
              if (!guide) return null
              return (
                <article key={slug} className="blog-guide-card">
                  <div className="blog-card-meta-row">
                    <span className="blog-guide-tag">{tag}</span>
                    <span className="blog-read-time">{guide.shortName}</span>
                  </div>
                  <h3 className="blog-guide-title">
                    <Link to={`/guide/${slug}`}>{guide.title}</Link>
                  </h3>
                  <p className="blog-guide-desc">
                    Official syllabus, stage-wise marking scheme, age criteria, and previous year question paper analysis.
                  </p>
                  <Link to={`/guide/${slug}`} className="blog-card-link">
                    View Exam Guide <span aria-hidden="true">→</span>
                  </Link>
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </section>
  )
}
