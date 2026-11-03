// Generate the build-time fallback from the same backend sitemap used in
// production, so it remains complete if the Worker cannot reach the API.
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const API = 'https://api.ministryofpapers.com'
const BASE = 'https://ministryofpapers.com'

async function generate() {
  console.log('Generating sitemap fallback...')

  const res = await fetch(`${API}/sitemap.xml`, { signal: AbortSignal.timeout(30000) })
  if (!res.ok) throw new Error(`/sitemap.xml -> ${res.status}`)

  const xml = (await res.text()).replaceAll(
    `${BASE}/rivers-of-india`,
    `${BASE}/india-physical-geography-map`,
  )
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
