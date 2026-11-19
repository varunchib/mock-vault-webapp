import {
  ArrowRight,
  BookOpen,
  Calendar,
  Map,
  Scale,
  Sparkles,
  TreePine,
  Waves,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

export function StudyMaterialPage() {
  usePageMeta({
    title: 'Study Material & Interactive Visual Learning Suites | Ministry of Papers',
    description:
      'Explore 4 interactive visual learning suites for UPSC CSE, SSC, JKSSB, and State PSCs: Constitution of India Explorer (Articles 1–395), Modern History Timeline (1757–1947), Ramsar Wetlands Registry (1981–2026), and India Physical Geography Map.',
    canonicalPath: '/study-material',
  })

  return (
    <section className="study-material-page">
      <nav className="rivers-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <span aria-hidden="true">›</span>
        <span>Study Material</span>
      </nav>

      <header className="study-material-header">
        <div>
          <p className="study-material-eyebrow">Interactive Learning Tools</p>
          <h1>Study Material</h1>
          <p className="study-material-intro">
            Curated, visual, and interactive learning suites engineered for UPSC CSE, SSC, JKSSB, and State PSC aspirants.
          </p>
        </div>
        <span className="study-material-count">4 Interactive Suites</span>
      </header>

      {/* SECTION 1: Indian Polity & Constitution */}
      <section className="study-material-section" aria-labelledby="study-material-polity" style={{ marginBottom: '36px' }}>
        <h2 id="study-material-polity" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Scale size={20} color="var(--brand, #0f766e)" />
          <span>Indian Polity &amp; Constitution</span>
        </h2>
        <Link className="study-material-card" to="/constitution-of-india">
          <span className="study-material-card-icon" style={{ background: 'var(--brand-soft, #f0fdf4)', color: 'var(--brand, #0f766e)' }}>
            <BookOpen size={24} />
            <Scale size={16} />
          </span>
          <span className="study-material-card-copy">
            <span className="study-material-card-label" style={{ color: 'var(--brand, #0f766e)' }}>Interactive Constitution Explorer</span>
            <strong>Constitution of India: Preamble, Articles 1–395 &amp; Schedules</strong>
            <span>
              Read and master every constitutional article linewise. Features authentic Preamble analysis, 25 Parts, all 12 Schedules, landmark Supreme Court doctrines, and verified exam frequency rankings.
            </span>
          </span>
          <ArrowRight className="study-material-card-arrow" size={20} aria-hidden="true" />
        </Link>
      </section>

      {/* SECTION 2: Modern Indian History */}
      <section className="study-material-section" aria-labelledby="study-material-history" style={{ marginBottom: '36px' }}>
        <h2 id="study-material-history" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={20} color="#b45309" />
          <span>Modern Indian History</span>
        </h2>
        <Link className="study-material-card" to="/modern-indian-history-timeline">
          <span className="study-material-card-icon" style={{ background: 'var(--hl-bg, #fffbeb)', color: 'var(--hl-dark, #b45309)' }}>
            <Calendar size={24} />
            <Sparkles size={16} />
          </span>
          <span className="study-material-card-copy">
            <span className="study-material-card-label" style={{ color: 'var(--hl-dark, #b45309)' }}>Chronological Timeline &amp; Spectrum Guide</span>
            <strong>Modern Indian History Chronological Timeline (1757–1947)</strong>
            <span>
              Master 190 years from the Battle of Plassey to Independence in concise Magbook-style points. Includes a complete chronological registry of 35 Governor-Generals &amp; Viceroys, landmark British Acts, and underground protest networks.
            </span>
          </span>
          <ArrowRight className="study-material-card-arrow" size={20} aria-hidden="true" />
        </Link>
      </section>

      {/* SECTION 3: Environment, Ecology & Biodiversity */}
      <section className="study-material-section" aria-labelledby="study-material-environment" style={{ marginBottom: '36px' }}>
        <h2 id="study-material-environment" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TreePine size={20} color="var(--brand, #047857)" />
          <span>Environment &amp; Ecology</span>
        </h2>
        <Link className="study-material-card" to="/ramsar-wetlands-and-national-parks">
          <span className="study-material-card-icon" style={{ background: 'var(--green-bg, #f0fdf4)', color: 'var(--green, #15803d)' }}>
            <TreePine size={24} />
            <Waves size={16} />
          </span>
          <span className="study-material-card-copy">
            <span className="study-material-card-label" style={{ color: 'var(--green, #15803d)' }}>Chronological Registry (1981–2026)</span>
            <strong>Ramsar Wetlands of India Complete Timeline</strong>
            <span>
              Explore all 103 Ramsar sites in chronological order of designation through 2026. Contains deep river basin linkages, flagship endemic fauna, active and removed Montreux Record sites, and solved UPSC questions.
            </span>
          </span>
          <ArrowRight className="study-material-card-arrow" size={20} aria-hidden="true" />
        </Link>
      </section>

      {/* SECTION 4: Physical Geography & River Systems */}
      <section className="study-material-section" aria-labelledby="study-material-geography" style={{ marginBottom: '36px' }}>
        <h2 id="study-material-geography" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Map size={20} color="var(--blue, #2563eb)" />
          <span>Physical Geography &amp; Drainage Atlas</span>
        </h2>
        <Link className="study-material-card" to="/india-physical-geography-map">
          <span className="study-material-card-icon" style={{ background: 'var(--blue-bg, #eff6ff)', color: 'var(--blue, #1d4ed8)' }}>
            <Map size={24} />
            <Waves size={16} />
          </span>
          <span className="study-material-card-copy">
            <span className="study-material-card-label" style={{ color: 'var(--blue, #1d4ed8)' }}>Interactive Visual Map</span>
            <strong>India Physical Geography &amp; Drainage Map</strong>
            <span>
              Interactive digital atlas: zoom and trace 13 major river courses, filter left and right bank tributaries, and locate major freshwater lakes and reservoirs across Indian states.
            </span>
          </span>
          <ArrowRight className="study-material-card-arrow" size={20} aria-hidden="true" />
        </Link>
      </section>

      <div
        style={{
          padding: '16px 20px',
          borderRadius: '12px',
          border: '1px solid var(--line)',
          background: 'var(--card-bg)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '15px', color: 'var(--ink2)' }}>
          Looking for written PYQ vocabulary lists (JKSSB &amp; SSC CGL) and river study articles?
        </span>
        <Link
          to="/blog"
          style={{
            fontSize: '14.5px',
            fontWeight: 700,
            color: 'var(--brand)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Explore Written Guides in Blog →
        </Link>
      </div>
    </section>
  )
}
