// Generates public/sitemap.xml at build time by fetching real slugs from the API.
// If the API is unreachable, logs a warning and exits cleanly (keeps existing sitemap).
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const API   = 'https://api.ministryofpapers.com'
const BASE  = 'https://ministryofpapers.com'
const TODAY = new Date().toISOString().split('T')[0]

// Exams that have a dedicated /exam/:slug/info page (add slug here when data is added to examInfo.ts)
const EXAM_INFO_SLUGS = new Set(['jkssb'])

async function fetchSlugs(path) {
  const res = await fetch(`${API}${path}`, { signal: AbortSignal.timeout(10000) })
  if (!res.ok) throw new Error(`${path} → ${res.status}`)
  const data = await res.json()
  return data.map(item => item.slug).filter(Boolean)
}

async function fetchQuestionSlugsForPaper(paperSlug) {
  try {
    const res = await fetch(`${API}/api/v1/papers/${encodeURIComponent(paperSlug)}/questions`, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) return []
    const data = await res.json()
    return data.map(item => item.slug).filter(Boolean)
  } catch {
    return []
  }
}

function url(loc, priority, freq = 'weekly') {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

async function generate() {
  console.log('Generating sitemap...')

  const [examSlugs, paperSlugs] = await Promise.all([
    fetchSlugs('/api/v1/exams'),
    fetchSlugs('/api/v1/papers'),
  ])

  const questionSlugArrays = await Promise.all(paperSlugs.map(fetchQuestionSlugsForPaper))
  const questionSlugs = questionSlugArrays.flat()

  console.log(`  ${examSlugs.length} exams, ${paperSlugs.length} papers, ${questionSlugs.length} questions`)

  const urls = [
    url(`${BASE}/`,         '1.0', 'daily'),
    url(`${BASE}/exams`,    '0.9', 'daily'),
    url(`${BASE}/about`,    '0.5', 'monthly'),
    url(`${BASE}/privacy`,  '0.3', 'yearly'),
    url(`${BASE}/terms`,    '0.3', 'yearly'),
    ...examSlugs.flatMap(slug => [
      url(`${BASE}/exam/${slug}`,      '0.9'),
      url(`${BASE}/mock-test/${slug}`, '0.8'),
      ...(EXAM_INFO_SLUGS.has(slug) ? [url(`${BASE}/exam/${slug}/overview`, '0.9', 'monthly')] : []),
    ]),
    ...paperSlugs.map(slug => url(`${BASE}/pyq/${slug}`, '0.8', 'monthly')),
    ...questionSlugs.map(slug => url(`${BASE}/question/${slug}`, '0.7', 'monthly')),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  const out = join(__dirname, '../public/sitemap.xml')
  writeFileSync(out, xml, 'utf8')
  console.log(`  Sitemap written: ${urls.length} URLs → public/sitemap.xml`)
}

generate().catch(err => {
  console.warn(`  Sitemap generation skipped (${err.message}) — keeping existing file`)
  process.exit(0)
})
