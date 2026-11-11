import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

const BLOG_PATH = '/blog'

export function BlogIndexPage() {
  usePageMeta({
    title: 'Blog | Ministry of Papers',
    description: 'Read the Indian rivers guide, with major river systems, tributaries, sources and routes.',
    canonicalPath: BLOG_PATH,
  })

  return (
    <section className="public-page river-article-page">
      <main className="public-shell river-article-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Blog</span>
        </nav>

        <header className="blog-index-header">
          <h1>Blogs</h1>
          <p>Explore stories and guides about India’s rivers and geography.</p>
        </header>

        <article className="blog-index-card">
          <p className="blog-index-category">Indian geography</p>
          <h2><Link to="/blog/indian-rivers-and-tributaries">Indian rivers and their tributaries</Link></h2>
          <p>
            Compare the Himalayan and Peninsular river systems, follow the courses of
            13 major rivers, and review their tributaries, sources and drainage.
          </p>
          <Link className="river-guide-map-link" to="/blog/indian-rivers-and-tributaries">
            Read the river guide <span aria-hidden="true">→</span>
          </Link>
        </article>
      </main>
    </section>
  )
}
