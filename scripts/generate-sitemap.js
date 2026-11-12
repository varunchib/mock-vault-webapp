// Generate the build-time fallback from the same backend sitemap used in
// production, so it remains complete if the Worker cannot reach the API.
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const API = 'https://api.ministryofpapers.com'
const BASE = 'https://ministryofpapers.com'
const BLOG_URL = `${BASE}/blog`
const ARTICLE_URL = `${BASE}/blog/indian-rivers-and-tributaries`
const CONSTITUTION_URL = `${BASE}/constitution-of-india`
const HISTORY_URL = `${BASE}/modern-indian-history-timeline`
const RAMSAR_URL = `${BASE}/ramsar-wetlands-and-national-parks`
const STUDY_MATERIAL_URL = `${BASE}/study-material`

async function generate() {
  console.log('Generating sitemap fallback...')

  const res = await fetch(`${API}/sitemap.xml`, { signal: AbortSignal.timeout(30000) })
  if (!res.ok) throw new Error(`/sitemap.xml -> ${res.status}`)

  let xml = (await res.text()).replaceAll(
    `${BASE}/rivers-of-india`,
    `${BASE}/india-physical-geography-map`,
  )
  for (const extraUrl of [ARTICLE_URL, BLOG_URL, CONSTITUTION_URL, HISTORY_URL, RAMSAR_URL, STUDY_MATERIAL_URL]) {
    if (!xml.includes(`<loc>${extraUrl}</loc>`)) {
      if (!xml.includes('</urlset>')) throw new Error('Backend sitemap has no closing urlset')
      xml = xml.replace(
        '</urlset>',
        `  <url>\n    <loc>${extraUrl}</loc>\n  </url>\n</urlset>`,
      )
    }
  }
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const urlCount = [...xml.matchAll(/<url(?:\s|>)/g)].length

  if (!/<urlset\b[^>]*>[\s\S]*<\/urlset>/.test(xml) || locations.length === 0 || locations.length !== urlCount) {
    throw new Error('Backend response is not a complete URL-set sitemap')
  }
  if (locations.some((loc) => loc !== BASE && !loc.startsWith(`${BASE}/`))) {
    throw new Error('Backend sitemap contains a URL outside the canonical site host')
  }
  if (new Set(locations).size !== locations.length) {
    throw new Error('Backend sitemap contains duplicate URLs')
  }

  const out = join(__dirname, '../public/sitemap.xml')
  writeFileSync(out, `${xml.trimEnd()}\n`, 'utf8')
  console.log(`  Sitemap written: ${urlCount} URLs -> public/sitemap.xml`)
}

generate().catch((err) => {
  console.warn(`  Sitemap generation skipped (${err.message}) - keeping existing file`)
  process.exit(0)
})
