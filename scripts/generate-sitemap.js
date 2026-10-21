// Generates the build-time fallback sitemap. Production normally serves the
// backend sitemap, which includes all eligible solved-question URLs.
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const API = 'https://api.ministryofpapers.com'
const BASE = 'https://ministryofpapers.com'
const TODAY = new Date().toISOString().split('T')[0]

// Keyword-rich question URL: /question/<keywords>--<id> (mirrors src/lib/questionUrl.ts).
function keywordify(text) {
  return (text || '')
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/[*_`#>~|]/g, ' ')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-').filter(Boolean).slice(0, 12).join('-')
    .slice(0, 80).replace(/-+$/g, '')
}
function questionPath(slug, questionText) {
  const kw = keywordify(questionText)
  return kw ? `/question/${kw}--${slug}` : `/question/${slug}`
}

// Exams that have a dedicated /exam/:slug/overview page. Keep in sync with examFaq.ts keys.
const EXAM_INFO_SLUGS = new Set(['jkssb', 'ssc-cgl', 'upsc-cse', 'ibps-po', 'bpsc', 'rssb', 'jkpsc', 'jkpsi'])

// Editorial /guide/:slug pages. Keep in sync with keys of src/data/postGuides.ts.
const GUIDE_SLUGS = [
  'jkpsi', 'jkpsi-telecom', 'upsc-cse', 'ssc-cgl', 'bpsc-cce', 'ibps-po', 'jkcce', 'rssb-patwari', 'neet-ug',
  'jkssb-patwari', 'jkssb-junior-assistant', 'jkssb-faa', 'jkssb-wildlife-guard', 'jkssb-veterinary-pharmacist',
  'jkssb-constable', 'jkssb-constable-telecom',
]

// Keep only the reviewed question URLs in the static fallback. The Worker does
// not restrict indexing of other eligible question URLs from the backend sitemap.
const INDEXABLE_QUESTION_PATHS = [
  '/question/with-reference-to-investments-consider-the-following-i-bonds-ii-hedge-funds--bd0394bb56',
  '/question/which-of-the-following-are-the-sources-of-income-for-the-reserve--d14a7b378b',
  '/question/consider-the-following-statements-i-india-has-joined-the-minerals-security-partn--5e628f3ca0',
  '/question/consider-the-following-statements-statement-i-circular-economy-reduces-the-emiss--1a903c8462',
  '/question/the-irrigation-device-called-araghatta-was--5847a27b82',
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

  const [exams, papers] = await Promise.all([
    fetchData('/api/v1/exams'),
    fetchData('/api/v1/papers'),
  ])

  const examSlugs = exams
    .filter(exam => exam.slug && ((exam.papers ?? 0) > 0 || (exam.mocks ?? 0) > 0 || EXAM_INFO_SLUGS.has(exam.slug)))
    .map(exam => exam.slug)

  // Skip near-empty papers (too thin to index → Soft 404).
  const indexablePapers = papers.filter(paper => (paper.questions ?? 0) >= 5)
  const paperSlugs = indexablePapers
    .map(paper => PAPER_SEO_SLUGS[paper.slug] ?? paper.slug)
    .filter(Boolean)

  // The backend sitemap includes all questions meeting its paper/explanation
  // eligibility rules. This build-time fallback lists only reviewed questions.
  console.log(`  ${examSlugs.length} exam hubs, ${paperSlugs.length} papers, ${INDEXABLE_QUESTION_PATHS.length} reviewed questions`)

  const urls = [
    url(`${BASE}/`, '1.0', 'daily'),
    url(`${BASE}/exams`, '0.9', 'daily'),
    url(`${BASE}/about`, '0.5', 'monthly'),
    url(`${BASE}/privacy`, '0.3', 'yearly'),
    url(`${BASE}/terms`, '0.3', 'yearly'),
    ...examSlugs.map(slug => url(`${BASE}/exam/${slug}`, '0.9')),
    // /exam/:slug/overview retired (301 → /guide/:slug) — no longer emitted.
    ...paperSlugs.map(slug => url(`${BASE}/pyq/${slug}`, '0.8', 'monthly')),
    ...INDEXABLE_QUESTION_PATHS.map(path => url(`${BASE}${path}`, '0.6', 'monthly')),
    ...GUIDE_SLUGS.map(slug => url(`${BASE}/guide/${slug}`, '0.7', 'monthly')),
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
