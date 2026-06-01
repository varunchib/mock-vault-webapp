// Cloudflare Worker — injects real page meta AND structured data for search/social crawlers.
// Regular users get the SPA directly; bots get HTML with correct title,
// description, canonical and JSON-LD already populated (no JS needed to crawl).

interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> }
}

type PageMeta = {
  title: string
  description: string
  jsonLd?: unknown
}

const BOT_UA = /Googlebot|Google-Extended|Bingbot|bingbot|GPTBot|OAI-SearchBot|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|FacebookBot|Applebot|Slurp|DuckDuckBot|YandexBot|Sogou|Exabot|facebot|ia_archiver|LinkedInBot|Twitterbot|WhatsApp|Slack|TelegramBot|Discordbot/i
const API    = 'https://api.ministryofpapers.com'
const BASE   = 'https://ministryofpapers.com'

const STATIC_META: Record<string, PageMeta> = {
  '/': {
    title: 'Ministry of Papers — Every Exam Paper. Solved & Free.',
    description: 'Search previous year questions from UPSC, SSC, State PSCs, NEET, JEE and 200+ exams. Every answer solved, explained, and free — no login needed.',
  },
  '/exams': {
    title: 'Exam Catalog — Browse 240+ Competitive Exams | Ministry of Papers',
    description: 'Browse 240+ competitive exams — UPSC, SSC, Banking, Railways, State PSCs and more. Access PYQs and mock tests for every exam.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Exam Catalog — Ministry of Papers',
      description: 'Browse 240+ competitive exams — UPSC, SSC, Banking, Railways, State PSCs and more.',
      url: `${BASE}/exams`,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Exams', item: `${BASE}/exams` },
        ],
      },
    },
  },
  '/about': {
    title: 'About — Ministry of Papers',
    description: "Ministry of Papers is India's most complete free platform for previous year exam questions — mission, content policy, and contact.",
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Ministry of Papers',
      url: `${BASE}/about`,
      publisher: {
        '@type': 'Organization',
        name: 'Ministry of Papers',
        url: BASE,
        logo: `${BASE}/favicon.svg`,
        contactPoint: { '@type': 'ContactPoint', email: 'hello@ministryofpapers.com', contactType: 'customer support' },
      },
    },
  },
  '/privacy': {
    title: 'Privacy Policy | Ministry of Papers',
    description: 'Privacy policy for Ministry of Papers — how we collect, use and protect your data.',
  },
  '/terms': {
    title: 'Terms of Service | Ministry of Papers',
    description: 'Terms of service for Ministry of Papers.',
  },
}

const API_TIMEOUT_MS = 4000

function apiFetch(url: string, cacheTtl: number): Promise<Response> {
  return fetch(url, {
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
    cf: { cacheEverything: true, cacheTtl },
  } as RequestInit)
}

async function fetchMeta(pathname: string): Promise<PageMeta | null> {
  try {
    const examMatch = pathname.match(/^\/exam\/([^/]+)$/)
    if (examMatch) {
      const slug = examMatch[1]
      const r = await apiFetch(`${API}/api/v1/exams/${slug}`, 3600)
      if (!r.ok) return null
      const e = await r.json() as { shortName: string; name: string; description: string }
      return {
        title: `${e.shortName} — Mock Tests & PYQ Papers | Ministry of Papers`,
        description: e.description || `Browse solved PYQ papers and mock tests for ${e.name}.`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${e.shortName} — Mock Tests & PYQ Papers`,
          description: e.description || `Browse solved PYQ papers and mock tests for ${e.name}.`,
          url: `${BASE}/exam/${slug}`,
          publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
              { '@type': 'ListItem', position: 2, name: 'Exams', item: `${BASE}/exams` },
              { '@type': 'ListItem', position: 3, name: e.shortName, item: `${BASE}/exam/${slug}` },
            ],
          },
        },
      }
    }

    const mockMatch = pathname.match(/^\/mock-test\/([^/]+)$/)
    if (mockMatch) {
      const slug = mockMatch[1]
      const r = await apiFetch(`${API}/api/v1/exams/${slug}`, 3600)
      if (!r.ok) return null
      const e = await r.json() as { shortName: string; name: string }
      return {
        title: `${e.shortName} Mock Tests — Free Full-Length Practice | Ministry of Papers`,
        description: `Free full-length mock tests for ${e.name}. Real exam pattern, automatic scoring, detailed solutions.`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: `${e.shortName} Mock Tests — Free Full-Length Practice`,
          description: `Free full-length mock tests for ${e.name}. Real exam pattern, automatic scoring, detailed solutions.`,
          url: `${BASE}/mock-test/${slug}`,
          learningResourceType: 'Practice Test',
          educationalUse: 'Practice',
          publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
              { '@type': 'ListItem', position: 2, name: 'Exams', item: `${BASE}/exams` },
              { '@type': 'ListItem', position: 3, name: e.shortName, item: `${BASE}/exam/${slug}` },
              { '@type': 'ListItem', position: 4, name: 'Mock Tests', item: `${BASE}/mock-test/${slug}` },
            ],
          },
        },
      }
    }

    const paperMatch = pathname.match(/^\/pyq\/([^/]+)$/)
    if (paperMatch) {
      const slug = paperMatch[1]
      const r = await apiFetch(`${API}/api/v1/papers/${slug}`, 3600)
      if (!r.ok) return null
      const p = await r.json() as { title: string; description: string; examSlug: string; examName: string }
      return {
        title: `${p.title} — Solved Questions & Answers | Ministry of Papers`,
        description: p.description || 'Solved previous year question paper with answers and explanations.',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: `${p.title} — Solved Questions & Answers`,
          description: p.description || 'Solved previous year question paper with answers and explanations.',
          url: `${BASE}/pyq/${slug}`,
          learningResourceType: 'Practice Test',
          educationalUse: 'Practice',
          publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
              { '@type': 'ListItem', position: 2, name: 'Exams', item: `${BASE}/exams` },
              { '@type': 'ListItem', position: 3, name: p.examName, item: `${BASE}/exam/${p.examSlug}` },
              { '@type': 'ListItem', position: 4, name: p.title, item: `${BASE}/pyq/${slug}` },
            ],
          },
        },
      }
    }

    const questionMatch = pathname.match(/^\/question\/([^/]+)$/)
    if (questionMatch) {
      const slug = questionMatch[1]
      const r = await apiFetch(`${API}/api/v1/questions/${slug}`, 86400)
      if (!r.ok) return null
      const q = await r.json() as {
        question: string; examName: string; examSlug: string; year: string
        questionNo: number; answer: string; explanation: string; paperSlug?: string; paper: string
      }
      const breadcrumbs = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: q.examName, item: `${BASE}/exam/${q.examSlug}` },
        ...(q.paperSlug
          ? [{ '@type': 'ListItem', position: 3, name: q.paper, item: `${BASE}/pyq/${q.paperSlug}` },
             { '@type': 'ListItem', position: 4, name: `Q${q.questionNo}`, item: `${BASE}/question/${slug}` }]
          : [{ '@type': 'ListItem', position: 3, name: `Q${q.questionNo}`, item: `${BASE}/question/${slug}` }]),
      ]
      return {
        title: `${q.examName} ${q.year} — Q${q.questionNo} Solved | Ministry of Papers`,
        description: `${q.question.slice(0, 145)}… — Solved with explanation on Ministry of Papers.`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'QAPage',
            name: `${q.examName} ${q.year} Q${q.questionNo} — Solved Answer`,
            url: `${BASE}/question/${slug}`,
            mainEntity: {
              '@type': 'Question',
              name: q.question.slice(0, 200),
              acceptedAnswer: {
                '@type': 'Answer',
                text: [q.answer, q.explanation].filter(Boolean).join(' — ').slice(0, 500),
              },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs,
          },
        ],
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

function safeJson(obj: unknown): string {
  return JSON.stringify(obj).replace(/<\/script>/gi, '<\\/script>')
}

function injectMeta(html: string, meta: PageMeta, pathname: string): string {
  const canonical = `${BASE}${pathname}`
  const t = esc(meta.title), d = esc(meta.description), c = esc(canonical)
  let result = html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/,  `$1${d}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/,  `$1${t}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${d}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${c}"`)
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${t}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${d}"`)
    .replace('</head>', `  <link rel="canonical" href="${c}" />\n</head>`)

  if (meta.jsonLd) {
    const lds = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd]
    const scripts = lds.map(ld => `  <script type="application/ld+json">${safeJson(ld)}</script>`).join('\n')
    result = result.replace('</head>', `${scripts}\n</head>`)
  }

  return result
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url  = new URL(request.url)
    const ua   = request.headers.get('User-Agent') ?? ''
    const path = url.pathname

    // Canonical redirect: enforce HTTPS and non-www
    if (url.protocol === 'http:' || url.hostname === 'www.ministryofpapers.com') {
      const dest = new URL(request.url)
      dest.protocol = 'https:'
      dest.hostname = 'ministryofpapers.com'
      return Response.redirect(dest.toString(), 301)
    }

    // Clone original request pointing at / for SPA fallback
    const indexRequest = new Request(`${url.origin}/`, request)

    // Static assets (.js, .css, .png, .svg, .woff2, etc.) → pass through
    const lastSeg = path.split('/').pop() ?? ''
    if (lastSeg.includes('.') && !lastSeg.endsWith('.html')) {
      try {
        const res = await env.ASSETS.fetch(request)
        if (path === '/llms.txt') {
          const headers = new Headers(res.headers)
          headers.set('content-type', 'text/plain; charset=UTF-8')
          headers.set('x-robots-tag', 'all')
          return new Response(res.body, { status: res.status, headers })
        }
        return res
      } catch {
        return new Response('Not Found', { status: 404 })
      }
    }

    // Non-bot → serve the route's own pre-rendered HTML when it exists
    // (Next.js static export generates /exams/index.html, /about/index.html, etc.)
    // Fall back to / only for dynamic routes that have no static file.
    if (!BOT_UA.test(ua)) {
      try {
        const res = await env.ASSETS.fetch(request)
        if (res.status < 400) return res
      } catch { /* fall through to index.html */ }
      return env.ASSETS.fetch(indexRequest)
    }

    // Bot → inject real meta + JSON-LD then serve
    try {
      const [baseRes, meta] = await Promise.all([
        env.ASSETS.fetch(indexRequest),
        fetchMeta(path),
      ])

      if (!meta || !baseRes.ok) return env.ASSETS.fetch(indexRequest)

      const html     = await baseRes.text()
      const enhanced = injectMeta(html, meta, path)
      const headers  = new Headers(baseRes.headers)
      headers.set('content-type', 'text/html; charset=UTF-8')
      headers.delete('content-length')

      return new Response(enhanced, { status: 200, headers })
    } catch {
      return env.ASSETS.fetch(indexRequest)  // always safe — index.html always exists
    }
  },
}
