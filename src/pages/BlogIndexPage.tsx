import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import {
  INDIAN_RIVERS_ARTICLE_META,
  INDIAN_RIVERS_ARTICLE_PATH,
  INDIAN_RIVERS_MODIFIED,
} from './indianRiversArticleMeta'
import {
  JKSSB_VOCAB_CONFIG,
  SSC_CGL_VOCAB_CONFIG,
  VOCAB_BLOG_MODIFIED,
} from './vocabBlogArticleMeta'

const BLOG_PATH = '/blog'

type BlogCategory = 'All' | 'English Vocabulary' | 'Geography'

type BlogPost = {
  href: string
  category: Exclude<BlogCategory, 'All'>
  tag: string
  title: string
  excerpt: string
  readTime: string
  updated: string
}

const POSTS: BlogPost[] = [
  {
    href: JKSSB_VOCAB_CONFIG.path,
    category: 'English Vocabulary',
    tag: 'JKSSB · 62 PYQs (2016–2026)',
    title: 'JKSSB Most Repeated Synonyms, Antonyms & Idioms',
    excerpt: JKSSB_VOCAB_CONFIG.description,
    readTime: '12 min read',
    updated: VOCAB_BLOG_MODIFIED,
  },
  {
    href: SSC_CGL_VOCAB_CONFIG.path,
    category: 'English Vocabulary',
    tag: 'SSC CGL · 52 PYQs (2024–2026)',
    title: 'SSC CGL Most Repeated Synonyms, Antonyms & One-Word Substitutions',
    excerpt: SSC_CGL_VOCAB_CONFIG.description,
    readTime: '12 min read',
    updated: VOCAB_BLOG_MODIFIED,
  },
  {
    href: INDIAN_RIVERS_ARTICLE_PATH,
    category: 'Geography',
    tag: '13 River Basins · Tributaries',
    title: 'Indian Rivers and Their Tributaries',
    excerpt: INDIAN_RIVERS_ARTICLE_META.description,
    readTime: '12 min read',
    updated: INDIAN_RIVERS_MODIFIED,
  },
]

const CATEGORIES: BlogCategory[] = ['All', 'English Vocabulary', 'Geography']

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata',
  })

export function BlogIndexPage() {
  usePageMeta({
    title: 'Blog: Written Study Guides & PYQ Articles | Ministry of Papers',
    description:
      'Evergreen written study guides and PYQ vocabulary archives for JKSSB, SSC CGL, UPSC, and State PSC aspirants.',
    canonicalPath: BLOG_PATH,
  })

  const [selectedCat, setSelectedCat] = useState<BlogCategory>('All')

  const filteredPosts = useMemo(
    () => (selectedCat === 'All' ? POSTS : POSTS.filter((p) => p.category === selectedCat)),
    [selectedCat],
  )

  return (
    <section className="public-page blog-page-root">
      <main className="public-shell blog-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <span>Blog</span>
        </nav>

        <header className="blog-hub-hero" style={{ marginBottom: '20px' }}>
          <h1>Blog &amp; Written Guides</h1>
          <p className="blog-hub-sub">
            Evergreen PYQ vocabulary banks and in-depth exam study articles from the Ministry of Papers editorial team.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Filter blog articles by topic"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 16px',
            borderBottom: '1px solid var(--line)',
            paddingBottom: '12px',
            marginBottom: '24px',
          }}
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCat === cat
            const count = cat === 'All' ? POSTS.length : POSTS.filter((p) => p.category === cat).length
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCat(cat)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: active ? '2px solid var(--brand)' : '2px solid transparent',
                  padding: '4px 2px',
                  fontSize: '14px',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--brand)' : 'var(--ink2)',
                  cursor: 'pointer',
                }}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>

        <div className="blog-card-grid" style={{ marginBottom: '28px' }}>
          {filteredPosts.map((post) => (
            <article key={post.href} className="blog-post-card">
              <p className="blog-post-meta">
                <span className="blog-post-cat">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.tag}</span>
              </p>
              <h2 className="blog-post-title">
                <Link to={post.href}>{post.title}</Link>
              </h2>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <p className="blog-post-foot">
                <span>
                  Updated <time dateTime={post.updated}>{fmtDate(post.updated)}</time> · {post.readTime}
                </span>
                <Link className="blog-post-link" to={post.href}>
                  Read article <span aria-hidden="true">→</span>
                </Link>
              </p>
            </article>
          ))}
        </div>

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
            Want interactive maps, timelines, and the Constitution Article Explorer?
          </span>
          <Link
            to="/study-material"
            style={{
              fontSize: '14.5px',
              fontWeight: 700,
              color: 'var(--brand)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Open Study Material Tools →
          </Link>
        </div>
      </main>
    </section>
  )
}
