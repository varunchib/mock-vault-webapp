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

type BlogCategory = 'All' | 'English Vocabulary' | 'Polity & History' | 'Geography & Environment'

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
    category: 'Geography & Environment',
    tag: 'Study Guide · 13 River Basins',
    title: 'Indian Rivers and Their Tributaries',
    excerpt: INDIAN_RIVERS_ARTICLE_META.description,
    readTime: '12 min read',
    updated: INDIAN_RIVERS_MODIFIED,
  },
  {
    href: '/constitution-of-india',
    category: 'Polity & History',
    tag: 'Interactive Explorer · Articles 1–395',
    title: 'Constitution of India: Preamble, Articles 1–395 & Schedules',
    excerpt:
      'Read every constitutional article linewise with Preamble analysis, 25 Parts, all 12 Schedules, landmark Supreme Court doctrines, and exam frequency rankings.',
    readTime: 'Interactive Suite',
    updated: '2026-11-16',
  },
  {
    href: '/modern-indian-history-timeline',
    category: 'Polity & History',
    tag: 'Chronology · 1757–1947',
    title: 'Modern Indian History Chronological Timeline (1757–1947)',
    excerpt:
      '190 years from the Battle of Plassey to Independence in concise revision points, including 35 Governor-Generals & Viceroys, British Acts, and freedom movements.',
    readTime: 'Interactive Suite',
    updated: '2026-11-16',
  },
  {
    href: '/ramsar-wetlands-and-national-parks',
    category: 'Geography & Environment',
    tag: 'Registry · 103 Sites (1981–2026)',
    title: 'Ramsar Wetlands of India Complete Timeline',
    excerpt:
      'All 103 Ramsar wetland sites in chronological order through 2026 with river basin linkages, endemic fauna, Montreux Record status, and solved UPSC questions.',
    readTime: 'Interactive Suite',
    updated: '2026-11-16',
  },
  {
    href: '/india-physical-geography-map',
    category: 'Geography & Environment',
    tag: 'Interactive Map · 13 Rivers',
    title: 'India Physical Geography & Drainage Map',
    excerpt:
      'Interactive digital atlas to trace 13 major river courses, filter left- and right-bank tributaries, and locate major freshwater lakes and reservoirs.',
    readTime: 'Interactive Map',
    updated: '2026-11-16',
  },
]

const CATEGORIES: BlogCategory[] = [
  'All',
  'English Vocabulary',
  'Polity & History',
  'Geography & Environment',
]

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata',
  })

export function BlogIndexPage() {
  usePageMeta({
    title: 'Blog & Study Guides | Ministry of Papers',
    description:
      'Evergreen study guides, PYQ vocabulary banks, and interactive learning suites for JKSSB, SSC CGL, UPSC, and State PSC aspirants.',
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
          <h1>Study Guides &amp; Blog</h1>
          <p className="blog-hub-sub">
            Evergreen PYQ vocabulary lists, exam-ready study guides, and interactive visual learning suites for JKSSB, SSC CGL, UPSC, and State PSC aspirants.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Filter blog guides by topic"
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

        <div className="blog-card-grid">
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
                  Open guide <span aria-hidden="true">→</span>
                </Link>
              </p>
            </article>
          ))}
        </div>
      </main>
    </section>
  )
}
