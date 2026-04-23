import { Clock, FileText, Lock, Play, Search, SlidersHorizontal } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { findMockBySlug, mockCatalog } from '../data/catalog'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'

export function MockTestsPage() {
  usePageMeta({
    title: 'Free Mock Tests for UPSC, SSC, JKSSB, NEET and More | PYQVault',
    description: 'Attempt free and premium mock tests for competitive exams with PYQ-style questions, instant review, and explanations.',
    canonicalPath: '/mock-test',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Competitive exam mock tests',
      description: 'Free and premium mock tests for Indian competitive exams.',
    },
  })

  return (
    <section className="public-page">
      <div className="public-shell">
        <header className="public-hero compact">
          <div>
            <span className="public-kicker">Mock tests</span>
            <h1>Practice exam-style mocks before the real paper</h1>
            <p>Public mock landing pages are indexable. Starting a mock, saving progress, and analytics require login.</p>
          </div>
        </header>

        <div className="mock-seo-toolbar">
          <label><Search size={17} /><input placeholder="Search mock tests..." /></label>
          <button type="button"><SlidersHorizontal size={16} /> Filters</button>
        </div>

        <div className="mock-seo-grid">
          {mockCatalog.map((mock) => (
            <Link className="mock-seo-card" to={`/mock-test/${mock.slug}`} key={mock.slug}>
              <div>
                <span>{mock.examName}</span>
                <h2>{mock.title}</h2>
                <p>{mock.description}</p>
              </div>
              <div className="mock-seo-meta">
                <small><FileText size={14} /> {mock.questions} Qs</small>
                <small><Clock size={14} /> {mock.durationMinutes} min</small>
                <small>{mock.isFree ? 'Free' : 'Premium'}</small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MockDetailPage() {
  const { slug } = useParams()
  const mock = findMockBySlug(slug)
  const { isAuthenticated } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)

  const title = mock ? `${mock.title} | Free Online Mock Test | PYQVault` : 'Online Mock Test | PYQVault'
  const description = mock?.description ?? 'Attempt online mock tests with PYQ-style questions and explanations.'

  usePageMeta({
    title,
    description,
    canonicalPath: mock ? `/mock-test/${mock.slug}` : '/mock-test',
    jsonLd: mock ? {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: mock.title,
      description: mock.description,
      provider: { '@type': 'Organization', name: 'PYQVault' },
    } : undefined,
  })

  if (!mock) return <Navigate to="/mock-test" replace />

  const startMock = () => {
    if (isAuthenticated) {
      window.alert('Mock engine will open here after backend integration.')
      return
    }
    setLoginOpen(true)
  }

  return (
    <section className="public-page">
      <div className="public-shell narrow">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span><Link to="/mock-test">Mock Tests</Link><span>/</span><span>{mock.examName}</span>
        </nav>
        <article className="question-page-card mock-detail-card">
          <div className="question-meta-row">
            <span>{mock.examName}</span>
            <span>{mock.difficulty}</span>
            <span>{mock.isFree ? 'Free' : 'Premium'}</span>
          </div>
          <h1>{mock.title}</h1>
          <p className="mock-detail-copy">{mock.description}</p>
          <div className="mock-detail-stats">
            <span><FileText size={17} /> {mock.questions} questions</span>
            <span><Clock size={17} /> {mock.durationMinutes} minutes</span>
            <span>{mock.subjects.join(' · ')}</span>
          </div>
          <div className="question-actions">
            <button className="dash-primary" type="button" onClick={startMock}><Play size={17} /> Start mock</button>
            <Link className="dash-secondary link-button" to={`/exam/${mock.examSlug}`}>View exam PYQs</Link>
          </div>
          <div className="locked-row"><Lock size={16} /> Login is required to save score, resume tests, and view analytics.</div>
        </article>
      </div>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </section>
  )
}
