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

// Editorial /guide/:slug pages. Keep in sync with keys of src/data/postGuides.ts.
const GUIDE_SLUGS = [
  'jkpsi', 'jkpsi-telecom', 'upsc-cse', 'ssc-cgl', 'bpsc', 'ibps-po', 'jkpsc', 'rssb', 'jkssb', 'neet-ug',
  'jkssb-patwari', 'jkssb-junior-assistant', 'jkssb-faa', 'jkssb-wildlife-guard', 'jkssb-veterinary-pharmacist',
]

// Editorial /blog/:slug articles. Keep in sync with keys of src/data/blogPosts.ts.
const BLOG_SLUGS = [
  'ibps-po-exam',
]

const PAPER_SEO_SLUGS = {
  'jkssb-junior-assistant-pyq': 'jkssb-junior-assistant-question-paper-2026',
  'jkssb-lab-attendant-2026-may-10': 'jkssb-laboratory-attendant-question-paper-2026',
  'jkssb-wildlife-guard-2026-may-10': 'jkssb-wildlife-guard-question-paper-2026',
  'jkssb-patwari-2024-sep1-set-a': 'jkssb-patwari-question-paper-2024',
  'jkssb-veterinary-pharmacist-2025': 'jkssb-veterinary-pharmacist-question-paper-2025',
  'jkssb-finance-accounts-2024-paper': 'jkssb-finance-accounts-assistant-question-paper-2024',
}

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
  // Skip near-empty papers (too thin to index → Soft 404).
  const indexablePapers = papers.filter(paper => (paper.questions ?? 0) >= 5)
  const paperSlugs = indexablePapers
    .map(paper => PAPER_SEO_SLUGS[paper.slug] ?? paper.slug)
    .filter(Boolean)

  // Individual question pages — only the ones with a real explanation. This is
  // the same >=300-char gate the IndexNow submit-all endpoint uses: a fully
  // solved question deserves its own indexed URL, but a bare stub would be thin
  // content and waste crawl budget. Fetch per paper (indexable papers only).
  const MIN_EXPLANATION = 100
  const questionArrays = await Promise.all(
    indexablePapers.map(paper =>
      fetchData(`/api/v1/papers/${encodeURIComponent(paper.slug)}/questions`).catch(() => []),
    ),
  )
  const questionSlugs = questionArrays
    .flat()
    .filter(q => q && q.slug && (q.explanation ?? '').trim().length >= MIN_EXPLANATION)
    .map(q => q.slug)

  console.log(`  ${examSlugs.length} exam hubs, ${mockExamSlugs.size} mock hubs, ${paperSlugs.length} papers, ${questionSlugs.length} solved questions`)

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
    ...GUIDE_SLUGS.map(slug => url(`${BASE}/guide/${slug}`, '0.7', 'monthly')),
    ...BLOG_SLUGS.map(slug => url(`${BASE}/blog/${slug}`, '0.7', 'weekly')),
    ...questionSlugs.map(slug => url(`${BASE}/question/${slug}`, '0.6', 'monthly')),
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
