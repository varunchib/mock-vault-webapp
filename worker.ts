// Cloudflare Worker — injects real page meta for search/social crawlers.
// Regular users get the SPA directly; bots get HTML with correct title,
// description and canonical already populated (no JS needed to crawl).

interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> }
}

const BOT_UA = /Googlebot|Bingbot|bingbot|Slurp|DuckDuckBot|YandexBot|Sogou|Exabot|facebot|ia_archiver|LinkedInBot|Twitterbot|WhatsApp|Slack|TelegramBot|Discordbot/i
const API    = 'https://api.ministryofpapers.com'

const STATIC_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Ministry of Papers — Every Exam Paper. Solved & Free.',
    description: 'Search previous year questions from UPSC, SSC, State PSCs, NEET, JEE and 200+ exams. Every answer solved, explained, and free — no login needed.',
  },
  '/exams': {
    title: 'Exam Catalog — Browse 240+ Competitive Exams | Ministry of Papers',
    description: 'Browse 240+ competitive exams — UPSC, SSC, Banking, Railways, State PSCs and more. Access PYQs and mock tests for every exam.',
  },
  '/tests': {
    title: 'Mock Tests & PYQ Papers | Ministry of Papers',
    description: 'Full-length mock tests and previous year question papers for UPSC, SSC, IBPS, NEET, JEE and 240+ exams. Free and fully solved.',
  },
}

async function fetchMeta(pathname: string): Promise<{ title: string; description: string } | null> {
  try {
    const examMatch = pathname.match(/^\/exam\/([^/]+)$/)
    if (examMatch) {
      const r = await fetch(`${API}/api/v1/exams/${examMatch[1]}`, { cf: { cacheEverything: true, cacheTtl: 3600 } } as RequestInit)
      if (!r.ok) return null
      const e = await r.json() as { shortName: string; name: string; description: string }
      return {
        title: `${e.shortName} — Mock Tests & PYQ Papers | Ministry of Papers`,
        description: e.description || `Browse solved PYQ papers and mock tests for ${e.name}.`,
      }
    }

    const mockMatch = pathname.match(/^\/mock-test\/([^/]+)$/)
    if (mockMatch) {
      const r = await fetch(`${API}/api/v1/exams/${mockMatch[1]}`, { cf: { cacheEverything: true, cacheTtl: 3600 } } as RequestInit)
      if (!r.ok) return null
      const e = await r.json() as { shortName: string; name: string }
      return {
        title: `${e.shortName} Mock Tests — Free Full-Length Practice | Ministry of Papers`,
        description: `Free full-length mock tests for ${e.name}. Real exam pattern, automatic scoring, detailed solutions.`,
      }
    }

    const paperMatch = pathname.match(/^\/pyq\/([^/]+)$/)
    if (paperMatch) {
      const r = await fetch(`${API}/api/v1/papers/${paperMatch[1]}`, { cf: { cacheEverything: true, cacheTtl: 3600 } } as RequestInit)
      if (!r.ok) return null
      const p = await r.json() as { title: string; description: string }
      return {
        title: `${p.title} — Solved Questions & Answers | Ministry of Papers`,
        description: p.description || 'Solved previous year question paper with answers and explanations.',
      }
    }

    const questionMatch = pathname.match(/^\/question\/([^/]+)$/)
    if (questionMatch) {
      const r = await fetch(`${API}/api/v1/questions/${questionMatch[1]}`, { cf: { cacheEverything: true, cacheTtl: 86400 } } as RequestInit)
      if (!r.ok) return null
      const q = await r.json() as { question: string; examName: string; year: string; questionNo: number }
      return {
        title: `${q.examName} ${q.year} — Q${q.questionNo} Solved | Ministry of Papers`,
        description: `${q.question.slice(0, 145)}… — Solved with explanation on Ministry of Papers.`,
      }
    }
  } catch {
    // silently fall back to default
  }

  return STATIC_META[pathname] ?? null
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function injectMeta(html: string, title: string, description: string, pathname: string): string {
  const canonical = `https://ministryofpapers.com${pathname}`
  const t = esc(title), d = esc(description), c = esc(canonical)
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/,  `$1${d}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/,  `$1${t}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${d}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${c}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${t}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${d}"`)
    .replace('</head>', `  <link rel="canonical" href="${c}" />\n</head>`)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url  = new URL(request.url)
    const ua   = request.headers.get('User-Agent') ?? ''
    const path = url.pathname

    // Static assets (.js, .css, .png, .svg, .woff2, etc.) → pass through
    const lastSeg = path.split('/').pop() ?? ''
    if (lastSeg.includes('.') && !lastSeg.endsWith('.html')) {
      return env.ASSETS.fetch(request)
    }

    // Non-bot → serve SPA directly
    if (!BOT_UA.test(ua)) {
      return env.ASSETS.fetch(request)
    }

    // Bot → inject real meta then serve
    const [baseRes, meta] = await Promise.all([
      env.ASSETS.fetch(new Request(`${url.origin}/`, { headers: request.headers })),
      fetchMeta(path),
    ])

    if (!meta || !baseRes.ok) return env.ASSETS.fetch(request)

    const html     = await baseRes.text()
    const enhanced = injectMeta(html, meta.title, meta.description, path)
    const headers  = new Headers(baseRes.headers)
    headers.set('content-type', 'text/html; charset=UTF-8')
    headers.delete('content-length')

    return new Response(enhanced, { status: 200, headers })
  },
}
