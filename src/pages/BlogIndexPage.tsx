import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import {
  INDIAN_RIVERS_ARTICLE_META,
  INDIAN_RIVERS_ARTICLE_PATH,
  INDIAN_RIVERS_MODIFIED,
} from './indianRiversArticleMeta'

const BLOG_PATH = '/blog'

type BlogPost = {
  href: string
  category: string
  title: string
  excerpt: string
  readTime: string
  updated: string
}

// Add a new entry here whenever a new blog post is published.
const POSTS: BlogPost[] = [
  {
    href: INDIAN_RIVERS_ARTICLE_PATH,
    category: 'Indian geography',
    title: 'Indian rivers and their tributaries',
    excerpt: INDIAN_RIVERS_ARTICLE_META.description,
    readTime: '12 min read',
    updated: INDIAN_RIVERS_MODIFIED,
  },
]

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata',
  })

export function BlogIndexPage() {
  usePageMeta({
    title: 'Blog: Study Guides and Articles | Ministry of Papers',
    description: 'Study guides and articles for UPSC, SSC and State PSC aspirants, starting with a complete guide to Indian rivers and their tributaries.',
    canonicalPath: BLOG_PATH,
  })

  return (
    <section className="public-page blog-page-root">
      <main className="public-shell blog-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Blog</span>
        </nav>

        <header className="blog-hub-hero">
          <h1>Blog</h1>
          <p className="blog-hub-sub">Study guides and articles from the Ministry of Papers team.</p>
        </header>

        <div className="blog-card-grid">
          {POSTS.map((post) => (
            <article key={post.href} className="blog-post-card">
              <p className="blog-post-meta">
                <span className="blog-post-cat">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </p>
              <h2 className="blog-post-title">
                <Link to={post.href}>{post.title}</Link>
              </h2>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <p className="blog-post-foot">
                <span>Updated <time dateTime={post.updated}>{fmtDate(post.updated)}</time></span>
                <Link className="blog-post-link" to={post.href}>
                  Read article <span aria-hidden="true">→</span>
                </Link>
              </p>
            </article>
          ))}
        </div>
      </main>
    </section>
  )
}
