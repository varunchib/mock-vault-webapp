import { ArrowRight, Map, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'

export function StudyMaterialPage() {
  return (
    <section className="study-material-page">
      <header className="study-material-header">
        <div>
          <p className="study-material-eyebrow">Your learning library</p>
          <h1>Study Material</h1>
          <p className="study-material-intro">
            Browse the visual learning resources available to you.
          </p>
        </div>
        <span className="study-material-count">1 resource</span>
      </header>

      <section className="study-material-section" aria-labelledby="study-material-geography">
        <h2 id="study-material-geography">Geography</h2>
        <Link className="study-material-card" to="/rivers-of-india">
          <span className="study-material-card-icon" aria-hidden="true">
            <Map size={24} />
            <Waves size={16} />
          </span>
          <span className="study-material-card-copy">
            <span className="study-material-card-label">Interactive map</span>
            <strong>Rivers of India</strong>
            <span>
              Explore major rivers, tributaries, states, and river systems on an interactive map.
            </span>
          </span>
          <ArrowRight className="study-material-card-arrow" size={20} aria-hidden="true" />
        </Link>
      </section>
    </section>
  )
}
