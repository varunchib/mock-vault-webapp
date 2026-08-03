import { useEffect } from 'react'
import { Link } from 'react-router-dom'

/**
 * A proper "not found" state for missing content (a question, paper or article
 * that doesn't exist). It stays on the requested URL instead of redirecting to
 * the home page — a client-side redirect-to-home reads to Google as "Page with
 * redirect" and is poor UX. Bots never reach this: the Worker already returns a
 * real 404 for unknown dynamic URLs. For JS-rendering crawlers we also emit
 * `noindex` and set no canonical, so the URL is never indexed.
 */
export function NotFound({ title = 'Page not found', message }: { title?: string; message?: string }) {
  useEffect(() => {
    document.title = `${title} | Ministry of Papers`
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    const existed = !!robots
    const prev = robots?.getAttribute('content') ?? null
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, follow')
    return () => {
      if (existed && prev) robots!.setAttribute('content', prev)
      else robots?.remove()
    }
  }, [title])

  return (
    <section className="public-page">
      <div className="public-shell narrow">
        <div className="nf-block">
          <h1>{title}</h1>
          <p>{message ?? 'The page you are looking for does not exist or may have moved.'}</p>
          <div className="nf-actions">
            <Link to="/exams" className="nf-btn">Browse all exams</Link>
            <Link to="/" className="nf-btn nf-btn--ghost">Go home</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
