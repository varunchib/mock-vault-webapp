// Generates public/sitemap.xml at build time by fetching real slugs from the API.
// Keep this conservative: submit strong canonical pages, not every individual
// MCQ leaf. Google can discover question pages through paper pages once the
// parent pages earn trust.
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const API = 'https://api.ministryofpapers.com'
const BASE = 'https://ministryofpapers.com'
const TODAY = new Date().toISOString().split('T')[0]

// Exams that have a dedicated /exam/:slug/overview page. Keep in sync with examFaq.ts keys.
const EXAM_INFO_SLUGS = new Set(['jkssb', 'ssc-cgl', 'upsc-cse', 'ibps-po', 'bpsc', 'rssb', 'jkpsc', 'jkpsi'])

async function fetchData(path) {
  const res = await fetch(`${API}${path}`, { signal: AbortSignal.timeout(10000) })
  if (!res.ok) throw new Error(`${path} -> ${res.status}`)
  return res.json()
}

function url(loc, priority, freq = 'weekly') {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
}

async function generate() {
  console.log('Generating sitemap...')

  const [exams, papers, mocks] = await Promise.all([
    fetchData('/api/v1/exams'),
    fetchData('/api/v1/papers'),
    fetchData('/api/v1/mocks'),
  ])

  const examSlugs = exams
    .filter(exam => exam.slug && ((exam.papers ?? 0) > 0 || (exam.mocks ?? 0) > 0 || EXAM_INFO_SLUGS.has(exam.slug)))
    .map(exam => exam.slug)

  const mockExamSlugs = new Set(mocks.map(mock => mock.examSlug).filter(Boolean))
  const paperSlugs = papers.map(paper => paper.slug).filter(Boolean)

  console.log(`  ${examSlugs.length} exam hubs, ${mockExamSlugs.size} mock hubs, ${paperSlugs.length} papers`)

  const urls = [
    url(`${BASE}/`, '1.0', 'daily'),
    url(`${BASE}/exams`, '0.9', 'daily'),
    url(`${BASE}/about`, '0.5', 'monthly'),
    url(`${BASE}/privacy`, '0.3', 'yearly'),
    url(`${BASE}/terms`, '0.3', 'yearly'),
    ...examSlugs.map(slug => url(`${BASE}/exam/${slug}`, '0.9')),
    ...examSlugs
      .filter(slug => EXAM_INFO_SLUGS.has(slug))
      .map(slug => url(`${BASE}/exam/${slug}/overview`, '0.9', 'monthly')),
    ...[...mockExamSlugs].map(slug => url(`${BASE}/mock-test/${slug}`, '0.8')),
    ...paperSlugs.map(slug => url(`${BASE}/pyq/${slug}`, '0.8', 'monthly')),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  const out = join(__dirname, '../public/sitemap.xml')
  writeFileSync(out, xml, 'utf8')
  console.log(`  Sitemap written: ${urls.length} URLs -> public/sitemap.xml`)
}

generate().catch(err => {
  console.warn(`  Sitemap generation skipped (${err.message}) - keeping existing file`)
  process.exit(0)
})
