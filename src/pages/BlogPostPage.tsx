import { ChevronRight, Clock3, Calendar } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { blogPosts, blogToc, renderBlogHtml } from '../data/blogPosts'

const BASE = 'https://ministryofpapers.com'

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BlogPostPage() {
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()
  const post = slug ? blogPosts[slug] : undefined

  usePageMeta({
    title: post ? `${post.title} | Ministry of Papers` : 'Blog | Ministry of Papers',
    description: post?.description ?? 'Exam preparation articles, notifications and strategy from Ministry of Papers.',
    canonicalPath: post ? `/blog/${post.slug}` : '/blog',
    ogType: 'article',
    jsonLd: post
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.h1,
            description: post.description,
            url: `${BASE}/blog/${post.slug}`,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: { '@type': 'Organization', name: post.author, url: BASE },
            publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE, logo: `${BASE}/favicon.svg` },
            articleSection: post.category,
            keywords: post.tags.join(', '),
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${post.slug}` },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE}/blog/${post.slug}` },
            ],
          },
        ]
      : undefined,
  })

  if (!slug) return <Navigate to="/" replace />
  if (!post) return <Navigate to="/" replace />

  const toc = blogToc(post)
  const homeHref = isAuthenticated ? '/exams' : '/'

  const article = (
    <div className="blog-page">
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link to={homeHref}>{isAuthenticated ? 'Exams' : 'Home'}</Link>
        <ChevronRight size={13} />
        <span>Blog</span>
      </nav>

      <header className="blog-hero">
        <span className="blog-category">{post.category}</span>
        <h1>{post.h1}</h1>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-meta">
          <span><Calendar size={13} /> Updated {fmtDate(post.updatedAt)}</span>
          <span><Clock3 size={13} /> {post.readMinutes} min read</span>
        </div>
      </header>

      {toc.length > 2 && (
        <nav className="blog-toc" aria-label="Table of contents">
          <strong>In this article</strong>
          <ol>
            {toc.map((t) => (
              <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>
            ))}
          </ol>
        </nav>
      )}

      {/* Content is generated from structured data (not user input), so the same
          HTML feeds both this page and the bot SSR — no hydration mismatch. */}
      <article
        className="blog-body seo-rendered"
        dangerouslySetInnerHTML={{ __html: renderBlogHtml(post) }}
      />

      {post.faqs.length > 0 && (
        <section className="blog-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="blog-faq-list">
            {post.faqs.map((f, i) => (
              <details key={i} className="blog-faq-item" open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {post.related.length > 0 && (
        <section className="blog-related">
          <h2>Related on Ministry of Papers</h2>
          <div className="blog-related-list">
            {post.related.map((r) => (
              <Link key={r.href} to={r.href} className="blog-related-link">
                {r.label}
                <ChevronRight size={14} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )

  return isAuthenticated ? article : (
    <section className="public-page"><div className="public-shell">{article}</div></section>
  )
}
