// Cloudflare Worker: injects crawlable HTML, metadata, canonical URLs, and
// structured data for public SEO routes while keeping the user-facing SPA fast.

import { postGuides } from './src/data/postGuides'
import { apiPaperSlug, canonicalPaperSlug, paperPath, paperSeoOverride } from './src/lib/paperSeo'
import { buildPaperFaqs, paperFaqJsonLd } from './src/lib/paperFaqs'

interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> }
}

type PageMeta = {
  title: string
  description: string
  jsonLd?: unknown
  contentHtml?: string
  robots?: string
}

type ExamData = {
  slug: string
  shortName: string
  name: string
  description: string
  totalQuestions?: number
  papers?: number
  mocks?: number
  subjects?: string[]
}

type PaperData = {
  slug: string
  title: string
  description: string
  examSlug: string
  examName: string
  year?: string
  shift?: string
  questions?: number
  subjects?: string[]
  heldOn?: string
  sourceUrl?: string
  negativeMarking?: number
  durationMinutes?: number
  maxMarks?: number
}

type MockData = {
  slug: string
  examSlug: string
  examName: string
  title: string
  description: string
  questions: number
  durationMinutes: number
  difficulty: string
  isFree: boolean
  subjects?: string[]
}

type QuestionData = {
  slug: string
  question: string
  examName: string
  examSlug: string
  year: string
  questionNo: string | number
  answerKey: string
  answer: string
  explanation: string
  paperSlug?: string
  paper: string
  subject?: string
  options?: Array<{ key: string; text: string }>
  tags?: string[]
  images?: string[]
  translations?: Partial<Record<'en' | 'hi', { passage?: string; question?: string; options?: string[] }>>
}

// Google-InspectionTool is what Search Console's URL Inspection and the Rich
// Results Test crawl with (NOT "Googlebot") — without it those tools see the
// empty SPA shell and report "No items detected" even though real Googlebot
// gets the prerendered page. GoogleOther/Storebot cover Google's other fetchers.
const BOT_UA = /Googlebot|Google-InspectionTool|GoogleOther|Storebot-Google|Google-Extended|Bingbot|bingbot|GPTBot|OAI-SearchBot|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|FacebookBot|Applebot|Slurp|DuckDuckBot|YandexBot|Sogou|Exabot|facebot|ia_archiver|LinkedInBot|Twitterbot|WhatsApp|Slack|TelegramBot|Discordbot/i
const API = 'https://api.ministryofpapers.com'
const BASE = 'https://ministryofpapers.com'
const API_TIMEOUT_MS = 4000

// Content-Security-Policy for the SPA shell. Shipped as Report-Only so it CANNOT
// break the site — it only logs violations to the browser console. Watch for a few
// days (Google sign-in, GA, KaTeX, framer-motion), then rename the header to
// `Content-Security-Policy` to enforce it.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://accounts.google.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://api.ministryofpapers.com https://assets.ministryofpapers.com https://accounts.google.com https://www.google-analytics.com https://region1.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
  "frame-src https://accounts.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

// withSecurityHeaders adds hardening headers to an HTML response. These are all
// safe (no behavioural change); CSP is Report-Only (see above).
function withSecurityHeaders(headers: Headers): Headers {
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  headers.set('Content-Security-Policy-Report-Only', CSP)
  return headers
}

const LEGACY_REDIRECTS: Record<string, string> = {
  '/exam': '/exams',
  '/mock-test': '/exams',
  '/pyq-papers': '/exams',
  '/pdf-library': '/exams',
  '/tests': '/exams',
  '/practice': '/exams',
  '/attempted': '/analytics',
}

const STATIC_META: Record<string, PageMeta> = {
  '/': {
    title: 'Ministry of Papers - Every Exam Paper. Solved & Free.',
    description: 'Search previous year questions from UPSC, SSC, State PSCs, NEET, JEE and 200+ exams. Every answer solved, explained, and free - no login needed.',
    // The homepage is served through the Worker now (assets run_worker_first),
    // so give bots a real <h1> and crawlable intro instead of the empty SPA
    // shell. Keeps the homepage from being flagged for a missing <h1>.
    contentHtml: `<article class="seo-rendered">
      <h1>Ministry of Papers — Free Previous Year Question Papers, Solved &amp; Explained</h1>
      <p>Ministry of Papers is India's free platform for <strong>previous year question papers (PYQs)</strong> and <strong>mock tests</strong>. Every question is <strong>fully solved</strong> with the official answer key and a detailed explanation — no login, no paywall.</p>
      <p>Practise solved papers for <strong>UPSC Civil Services, SSC CGL, State PSCs (BPSC, JKSSB, JKPSC, RSSB), Banking (IBPS PO), NEET UG</strong> and 200+ competitive exams, in both <strong>English and Hindi</strong>.</p>
      <nav aria-label="Browse exams">
        <a href="/exams">Browse all exams</a>
        <a href="/exam/upsc-cse">UPSC CSE</a>
        <a href="/exam/ssc-cgl">SSC CGL</a>
        <a href="/exam/bpsc">BPSC</a>
        <a href="/exam/jkssb">JKSSB</a>
      </nav>
    </article>`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ministry of Papers',
      alternateName: 'MinistryOfPapers',
      url: BASE,
      description: 'Free previous year question papers and mock tests for UPSC, SSC, State PSCs, NEET and 200+ exams — every answer solved and explained.',
      publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE, logo: `${BASE}/favicon.svg` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/exams?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  },
  '/exams': {
    title: 'Exam Catalog - Browse Competitive Exams | Ministry of Papers',
    description: 'Browse competitive exams - UPSC, SSC, Banking, Railways, State PSCs and more. Access PYQs and mock tests for every exam.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Exam Catalog - Ministry of Papers',
      description: 'Browse competitive exams - UPSC, SSC, Banking, Railways, State PSCs and more.',
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
    title: 'About - Ministry of Papers',
    description: "Ministry of Papers is India's free platform for previous year exam questions - mission, content policy, and contact.",
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
    description: 'Privacy Policy for Ministry of Papers: what data we collect when you use our free previous-year-question and mock-test platform, how it is used and protected, cookies, third-party analytics, and your rights.',
  },
  '/terms': {
    title: 'Terms of Service | Ministry of Papers',
    description: 'Terms of Service for Ministry of Papers: the rules for using our free previous-year-question and mock-test platform, acceptable use, intellectual-property and content policy, disclaimers, and account terms for aspirants.',
  },
}

// Bump to invalidate ALL edge-cached API responses at once (the query param
// changes the Cloudflare cache key, forcing a fresh origin fetch). Needed once
// to flush ~500 stale cached 404s; the API ignores unknown query params.
const API_CACHE_VERSION = '2'

function apiFetch(url: string, cacheTtl: number): Promise<Response> {
  const versioned = url + (url.includes('?') ? '&' : '?') + '_cv=' + API_CACHE_VERSION
  return fetch(versioned, {
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
    cf: {
      cacheEverything: true,
      // Cache 2xx for the full TTL, but NEVER pin a 404/5xx for hours. A single
      // transient 404 (e.g. during a slug migration or deploy) used to get
      // cached for 24h, so valid question pages returned 404 to crawlers — every
      // such page shared the "404 Not Found" title and an empty description,
      // which Bing flags as duplicate/short metadata. Short error TTLs let a
      // stale 404 self-heal on the next crawl instead.
      cacheTtlByStatus: { '200-299': cacheTtl, '300-399': 60, '400-499': 5, '500-599': 0 },
    },
  } as RequestInit)
}

async function apiJson<T>(url: string, cacheTtl: number): Promise<T | null> {
  const res = await apiFetch(url, cacheTtl)
  if (!res.ok) return null
  return res.json() as Promise<T>
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function stripMarkdown(s: string): string {
  return s
    .replace(/!\[[^\]]*]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function htmlText(s: string | number | undefined | null): string {
  return esc(stripMarkdown(String(s ?? '')))
}

function paragraph(s: string | undefined | null): string {
  const clean = htmlText(s)
  return clean ? `<p>${clean}</p>` : ''
}

// inlineFmt escapes text then applies **bold**, matching how the React app
// (MathText) renders it, so explanations look identical to users and to Google.
function inlineFmt(s: string): string {
  return esc(String(s)).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

// richText renders explanation content: each non-empty line becomes a paragraph
// (same as the app's MultilineText), with **bold** section labels preserved.
function richText(s: string | undefined | null): string {
  if (!s) return ''
  return String(s)
    .replace(/\r/g, '')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => `<p>${inlineFmt(l)}</p>`)
    .join('')
}

// questionTopic returns the question's primary topic keyword for the title.
// It uses the curated first tag rather than parsing the question text: exam
// questions open with boilerplate stems ("Consider the following statements:")
// and the real topic sits in the body, so text extraction yields broken
// fragments. No tag => no topic, which is better than a garbled one.
function questionTopic(q: QuestionData): string {
  return (q.tags ?? []).map(t => String(t).trim()).filter(Boolean)[0] ?? ''
}

// questionTitle builds a compact, keyword-first title for a question page.
// It deliberately omits the " | Ministry of Papers" suffix: 21 chars of brand
// crowd out the topic keywords that win long-tail queries, and the exam+subject
// already identify the page. Capped at 65 chars so Google shows it in full.
function questionTitle(examLabel: string, year: string, subject: string, no: string | number, topic: string): string {
  const CAP = 65
  const tail = ' - Solved Answer'
  const base = `${examLabel}${year ? ' ' + year : ''}${subject ? ' ' + subject : ''} Q${no}`
  if (!topic) return `${base}${tail}`.slice(0, CAP)

  const full = `${base}: ${topic}${tail}`
  if (full.length <= CAP) return full

  // Trim the topic on a word boundary so the tail ("- Solved Answer") survives.
  const room = CAP - base.length - 2 - tail.length
  if (room < 8) return `${base}${tail}`.slice(0, CAP)
  let t = topic.slice(0, room)
  const lastSpace = t.lastIndexOf(' ')
  if (lastSpace > 8) t = t.slice(0, lastSpace)
  t = t.replace(/[,;:\-\s]+$/, '')
  return t ? `${base}: ${t}${tail}` : `${base}${tail}`
}

function titleFit(core: string): string {
  const brand = ' | Ministry of Papers'
  const full = `${core}${brand}`
  if (full.length <= 70) return full
  const budget = 70 - brand.length
  return `${core.slice(0, budget - 1).trimEnd()}...${brand}`
}

function h1Text(title: string): string {
  return title.replace(/ \| Ministry of Papers$/, '')
}

function safeJson(obj: unknown): string {
  return JSON.stringify(obj).replace(/<\/script>/gi, '<\\/script>')
}

/** One breadcrumb step. The same array feeds the JSON-LD and the visible nav. */
type Crumb = { name: string; item: string }

/**
 * Google requires structured data to represent content that is actually visible
 * on the page — the same rule that made a FAQPage without a visible FAQ a
 * violation. Build the trail ONCE and pass it to both breadcrumbJsonLd() and
 * renderPageShell(), so the markup can never claim a trail the page doesn't show.
 */
function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.item,
    })),
  }
}

function renderBreadcrumb(crumbs: Crumb[]): string {
  if (crumbs.length === 0) return ''
  const last = crumbs.length - 1
  const items = crumbs
    .map((c, i) =>
      i === last
        ? `<span aria-current="page">${htmlText(c.name)}</span>`
        : `<a href="${esc(c.item)}">${htmlText(c.name)}</a>`,
    )
    .join(' <span aria-hidden="true">&rsaquo;</span> ')
  return `<nav class="seo-breadcrumb" aria-label="Breadcrumb">${items}</nav>`
}

function renderPageShell(title: string, children: string, crumbs: Crumb[] = []): string {
  return `<article class="seo-rendered">
    ${renderBreadcrumb(crumbs)}
    <h1>${htmlText(title)}</h1>
    ${children}
  </article>`
}

function renderQuestionContent(q: QuestionData, crumbs: Crumb[] = []): string {
  const optionItems = (q.options ?? [])
    .map(opt => {
      const correct = String(opt.key).toUpperCase() === String(q.answerKey).toUpperCase()
      return `<li${correct ? ' class="correct"' : ''}><strong>${htmlText(opt.key)}.</strong> ${htmlText(opt.text)}${correct ? ' <strong>(Correct answer)</strong>' : ''}</li>`
    })
    .join('')
  const tags = (q.tags ?? [])
    .filter(Boolean)
    .slice(0, 8)
    .map(tag => `<span>${htmlText(tag)}</span>`)
    .join(' ')
  const paperLink = q.paperSlug
    ? `<p><a href="${paperPath(q.paperSlug)}">View the full solved paper: ${htmlText(q.paper)}</a></p>`
    : ''
  const images = (q.images ?? [])
    .map((src, i) => `<img src="${esc(src)}" alt="${htmlText(q.examName)} ${htmlText(q.year)} Q${htmlText(q.questionNo)} figure ${i + 1}" loading="lazy" />`)
    .join('')

  // Hindi rendering (P0 #3) — index the bilingual content on the same page.
  const hi = q.translations?.hi
  const hiOptions = (hi?.options ?? [])
    .map((t, i) => `<li><strong>${String.fromCharCode(65 + i)}.</strong> ${htmlText(t)}</li>`)
    .join('')
  const hindiSection = hi?.question
    ? `<section lang="hi">
      <h2>प्रश्न (हिन्दी में)</h2>
      ${hi.passage ? paragraph(hi.passage) : ''}
      ${paragraph(hi.question)}
      ${hiOptions ? `<ol type="A">${hiOptions}</ol>` : ''}
    </section>`
    : ''

  const solution = richText(q.explanation)

  return renderPageShell(`${q.examName} ${q.year} — Q${q.questionNo} Solved Answer with Explanation`, `
    <p><a href="/exam/${encodeURIComponent(q.examSlug)}">${htmlText(q.examName)}</a>${q.subject ? ` — ${htmlText(q.subject)}` : ''}${q.year ? ` — ${htmlText(q.year)}` : ''}</p>
    ${paperLink}
    ${images ? `<figure>${images}</figure>` : ''}
    <section>
      <h2>Question</h2>
      ${paragraph(q.question)}
      ${optionItems ? `<ol type="A">${optionItems}</ol>` : ''}
    </section>
    <section>
      <h2>Correct Answer</h2>
      <p><strong>Option ${htmlText(q.answerKey)}${q.answer ? ` — ${htmlText(q.answer)}` : ''}</strong></p>
    </section>
    ${solution ? `<section><h2>Detailed Solution &amp; Explanation</h2>${solution}</section>` : ''}
    ${hindiSection}
    ${tags ? `<p><strong>Topics covered:</strong> ${tags}</p>` : ''}
  `, crumbs)
}

function renderPaperContent(p: PaperData, questions: QuestionData[], crumbs: Crumb[] = []): string {
  const override = paperSeoOverride(p.slug)
  const subjectText = (p.subjects ?? []).filter(Boolean).join(', ')

  // Group questions into an H2 section per subject (P1 #5)
  const bySubject = new Map<string, QuestionData[]>()
  for (const q of questions) {
    const s = (q.subject && q.subject.trim()) || 'General'
    if (!bySubject.has(s)) bySubject.set(s, [])
    bySubject.get(s)!.push(q)
  }
  const questionLi = (q: QuestionData) => `<li>
      <a href="/question/${encodeURIComponent(q.slug)}">Q${htmlText(q.questionNo)}: ${htmlText(q.question).slice(0, 200)}</a>
      <br /><small><strong>Answer:</strong> ${htmlText(q.answerKey)}${q.answer ? ` — ${htmlText(q.answer)}` : ''}</small>
      ${q.explanation ? `<br /><small>${htmlText(q.explanation).slice(0, 240)}</small>` : ''}
    </li>`
  const sections = [...bySubject.entries()]
    .map(([subject, qs]) => `<section><h2>${htmlText(subject)} — Solved Questions</h2><ol>${qs.map(questionLi).join('')}</ol></section>`)
    .join('')

  const source = p.sourceUrl
    ? `<p><strong>Official source:</strong> <a href="${esc(p.sourceUrl)}" rel="nofollow noopener" target="_blank">official question paper &amp; answer key (PDF)</a></p>`
    : ''

  // Rendered visibly because the page also emits FAQPage structured data, and
  // Google requires that data to match content the user can actually see.
  const faqs = buildPaperFaqs({ ...p, attemptable: questions.length > 0 })
  const faqSection = faqs.length
    ? `<section><h2>Frequently Asked Questions</h2><dl>${faqs
        .map(f => `<dt><strong>${htmlText(f.q)}</strong></dt><dd>${htmlText(f.a)}</dd>`)
        .join('')}</dl></section>`
    : ''

  return renderPageShell(override?.h1 ?? `${p.title} — Solved PYQ with Answer Key`, `
    ${override ? `<p><strong>${htmlText(override.title)}</strong></p>` : ''}
    ${override ? paragraph(override.review) : ''}
    ${paragraph(p.description)}
    <p><a href="/exam/${encodeURIComponent(p.examSlug)}">${htmlText(p.examName)}</a>${p.year ? ` — ${htmlText(p.year)}` : ''}${p.shift ? ` — ${htmlText(p.shift)}` : ''}</p>
    <p>${p.questions ?? questions.length} solved questions with answer key and detailed explanations${subjectText ? ` — Subjects: ${htmlText(subjectText)}` : ''}${(p.negativeMarking ?? 0) > 0 ? ` — Negative marking: ${p.negativeMarking}` : ''}</p>
    ${source}
    ${sections}
    ${faqSection}
  `, crumbs)
}

function renderExamContent(e: ExamData, papers: PaperData[], mocks: MockData[], crumbs: Crumb[] = []): string {
  const paperLinks = papers
    .slice(0, 30)
    .map(p => `<li><a href="${paperPath(p.slug)}">${htmlText(paperSeoOverride(p.slug)?.h1 ?? p.title)}</a> <small>${p.questions ?? 0} questions</small></li>`)
    .join('')
  const mockLinks = mocks
    .slice(0, 20)
    .map(m => `<li><a href="/mock-test/${encodeURIComponent(m.slug)}">${htmlText(m.title)}</a> <small>${htmlText(m.difficulty)} - ${m.questions} questions</small></li>`)
    .join('')
  const subjects = (e.subjects ?? []).filter(Boolean).join(', ')
  return renderPageShell(`${e.name} PYQ papers and mock tests`, `
    ${paragraph(e.description)}
    <p>${e.papers ?? papers.length} papers - ${e.totalQuestions ?? 0} questions - ${e.mocks ?? mocks.length} mocks</p>
    ${subjects ? `<p><strong>Subjects:</strong> ${htmlText(subjects)}</p>` : ''}
    ${paperLinks ? `<section><h2>Previous year papers</h2><ul>${paperLinks}</ul></section>` : ''}
    ${mockLinks ? `<section><h2>Mock tests</h2><ul>${mockLinks}</ul></section>` : ''}
  `, crumbs)
}

function renderMockContent(exam: ExamData, mocks: MockData[], papers: PaperData[], crumbs: Crumb[] = []): string {
  const mockItems = mocks
    .map(m => `<li><strong>${htmlText(m.title)}</strong><br />${htmlText(m.description)}<br /><small>${m.questions} questions - ${m.durationMinutes} minutes - ${htmlText(m.difficulty)}</small></li>`)
    .join('')
  const paperLinks = papers
    .slice(0, 10)
    .map(p => `<li><a href="${paperPath(p.slug)}">${htmlText(paperSeoOverride(p.slug)?.h1 ?? p.title)}</a></li>`)
    .join('')
  return renderPageShell(`${exam.shortName} mock tests`, `
    ${paragraph(exam.description)}
    ${mockItems ? `<section><h2>Available mock tests</h2><ul>${mockItems}</ul></section>` : '<p>No published mock tests are available for this exam yet.</p>'}
    ${paperLinks ? `<section><h2>Related PYQ papers</h2><ul>${paperLinks}</ul></section>` : ''}
  `, crumbs)
}

function renderGuideContent(slug: string, guide: (typeof postGuides)[string], crumbs: Crumb[] = []): string {
  const facts = (guide.quickFacts ?? [])
    .map(f => `<li><strong>${htmlText(f.label)}:</strong> ${htmlText(f.value)}</li>`)
    .join('')
  const about = guide.about.map(paragraph).join('')
  const papers = guide.papers
    .map(p => `<li><a href="${paperPath(p.slug)}">${htmlText(paperSeoOverride(p.slug)?.h1 ?? p.title)}</a> <small>${htmlText(p.year)} - ${p.questions} questions</small></li>`)
    .join('')
  const syllabus = guide.syllabus
    .slice(0, 10)
    .map(s => `<section><h2>${htmlText(s.subject)}</h2><ul>${s.topics.slice(0, 12).map(t => `<li>${htmlText(t)}</li>`).join('')}</ul></section>`)
    .join('')

  return renderPageShell(guide.title, `
    <p>${htmlText(guide.tagline)}</p>
    <!-- Visible counterpart of Article.dateModified — the markup must reflect
         something on the page, the same rule that made a FAQPage without a
         visible FAQ a violation. -->
    <p><small>Last updated: <time datetime="${esc(guide.lastUpdated)}">${htmlText(guide.lastUpdated)}</time></small></p>
    <p><a href="/exam/${encodeURIComponent(guide.examSlug)}">Browse ${htmlText(guide.shortName)} PYQ papers</a></p>
    ${facts ? `<section><h2>Quick facts</h2><ul>${facts}</ul></section>` : ''}
    ${about ? `<section><h2>About ${htmlText(guide.shortName)}</h2>${about}</section>` : ''}
    ${papers ? `<section><h2>Previous year papers</h2><ul>${papers}</ul></section>` : ''}
    ${syllabus}
    <p><a href="/guide/${encodeURIComponent(slug)}">Canonical guide page</a></p>
  `, crumbs)
}

function isDynamicSeoPath(pathname: string): boolean {
  return /^\/exam\/[^/]+(?:\/overview)?$/.test(pathname)
    || /^\/pyq\/[^/]+$/.test(pathname)
    || /^\/question\/[^/]+$/.test(pathname)
    || /^\/mock-test\/[^/]+$/.test(pathname)
    || /^\/guide\/[^/]+$/.test(pathname)
}

function notFoundResponse(): Response {
  return new Response('<!doctype html><title>404 Not Found</title><h1>404 Not Found</h1>', {
    status: 404,
    headers: {
      'content-type': 'text/html; charset=UTF-8',
      'x-robots-tag': 'noindex',
      'cache-control': 'public, max-age=300',
    },
  })
}

async function fetchMeta(pathname: string): Promise<PageMeta | null> {
  try {
    const overviewMatch = pathname.match(/^\/exam\/([^/]+)\/overview$/)
    if (overviewMatch) {
      const slug = overviewMatch[1]
      const e = await apiJson<ExamData>(`${API}/api/v1/exams/${slug}`, 3600)
      if (!e) return null
      const overviewCrumbs: Crumb[] = [
        { name: 'Home', item: BASE },
        { name: 'Exams', item: `${BASE}/exams` },
        { name: e.shortName, item: `${BASE}/exam/${slug}` },
        { name: 'Overview', item: `${BASE}/exam/${slug}/overview` },
      ]
      return {
        title: `${e.shortName} Overview - Exam Pattern, Eligibility & PYQ | Ministry of Papers`,
        description: `${e.shortName} overview - exam pattern, eligibility criteria, selection process, salary, and free PYQ with detailed explanations on Ministry of Papers.`,
        contentHtml: renderPageShell(`${e.shortName} exam overview`, `
          ${paragraph(e.description)}
          <p><a href="/exam/${encodeURIComponent(slug)}">Browse ${htmlText(e.shortName)} PYQ papers and mock tests</a></p>
        `, overviewCrumbs),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: `${e.shortName} Exam Overview`,
          description: e.description || `${e.name} exam pattern, eligibility, selection process, and free PYQ.`,
          url: `${BASE}/exam/${slug}/overview`,
          provider: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          breadcrumb: breadcrumbJsonLd(overviewCrumbs),
        },
      }
    }

    const examMatch = pathname.match(/^\/exam\/([^/]+)$/)
    if (examMatch) {
      const slug = examMatch[1]
      const [e, papers, mocks] = await Promise.all([
        apiJson<ExamData>(`${API}/api/v1/exams/${slug}`, 3600),
        apiJson<PaperData[]>(`${API}/api/v1/exams/${slug}/papers`, 3600),
        apiJson<MockData[]>(`${API}/api/v1/mocks`, 3600),
      ])
      if (!e) return null
      const examMocks = (mocks ?? []).filter(m => m.examSlug === slug)
      // An exam with no papers and no mocks is a thin page → keep it out of the index.
      const examEmpty = (e.papers ?? 0) === 0 && (e.mocks ?? 0) === 0
      const examCrumbs: Crumb[] = [
        { name: 'Home', item: BASE },
        { name: 'Exams', item: `${BASE}/exams` },
        { name: e.shortName, item: `${BASE}/exam/${slug}` },
      ]
      return {
        title: `${e.shortName} - Mock Tests & PYQ Papers | Ministry of Papers`,
        description: e.description || `Browse solved PYQ papers and mock tests for ${e.name}.`,
        robots: examEmpty ? 'noindex, follow' : undefined,
        contentHtml: renderExamContent(e, papers ?? [], examMocks, examCrumbs),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${e.shortName} - Mock Tests & PYQ Papers`,
          description: e.description || `Browse solved PYQ papers and mock tests for ${e.name}.`,
          url: `${BASE}/exam/${slug}`,
          publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          breadcrumb: breadcrumbJsonLd(examCrumbs),
        },
      }
    }

    const mockMatch = pathname.match(/^\/mock-test\/([^/]+)$/)
    if (mockMatch) {
      const slug = mockMatch[1]
      let examSlug = slug
      let e = await apiJson<ExamData>(`${API}/api/v1/exams/${slug}`, 3600)
      if (!e) {
        const m = await apiJson<MockData>(`${API}/api/v1/mocks/${slug}`, 3600)
        if (!m) return null
        examSlug = m.examSlug
        e = await apiJson<ExamData>(`${API}/api/v1/exams/${examSlug}`, 3600)
        if (!e) return null
      }
      const [allMocks, papers] = await Promise.all([
        apiJson<MockData[]>(`${API}/api/v1/mocks`, 3600),
        apiJson<PaperData[]>(`${API}/api/v1/exams/${examSlug}/papers`, 3600),
      ])
      const examMocks = (allMocks ?? []).filter(m => m.examSlug === examSlug)
      const mockCrumbs: Crumb[] = [
        { name: 'Home', item: BASE },
        { name: 'Exams', item: `${BASE}/exams` },
        { name: e.shortName, item: `${BASE}/exam/${examSlug}` },
        { name: 'Mock Tests', item: `${BASE}/mock-test/${examSlug}` },
      ]
      return {
        title: `${e.shortName} Mock Tests - Free Full-Length Practice | Ministry of Papers`,
        description: `Free full-length mock tests for ${e.name}. Real exam pattern, automatic scoring, detailed solutions.`,
        contentHtml: renderMockContent(e, examMocks, papers ?? [], mockCrumbs),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: `${e.shortName} Mock Tests - Free Full-Length Practice`,
          description: `Free full-length mock tests for ${e.name}. Real exam pattern, automatic scoring, detailed solutions.`,
          url: `${BASE}/mock-test/${examSlug}`,
          learningResourceType: 'Practice Test',
          educationalUse: 'Practice',
          publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          breadcrumb: breadcrumbJsonLd(mockCrumbs),
        },
      }
    }

    const paperMatch = pathname.match(/^\/pyq\/([^/]+)$/)
    if (paperMatch) {
      const requestSlug = paperMatch[1]
      const slug = apiPaperSlug(requestSlug)
      const [p, questions] = await Promise.all([
        apiJson<PaperData>(`${API}/api/v1/papers/${slug}`, 3600),
        apiJson<QuestionData[]>(`${API}/api/v1/papers/${slug}/questions`, 3600),
      ])
      if (!p) return null
      const override = paperSeoOverride(p.slug)
      const canonical = `${BASE}${paperPath(p.slug)}`
      const title = override?.title ?? titleFit(`${p.title} PYQ - Solved Questions & Answers`)
      const description = override?.description ?? (p.description || `${p.examName} PYQ - solved previous year question paper with answers and detailed explanations, free on Ministry of Papers.`)
      // Built once, rendered visibly AND declared in JSON-LD.
      const crumbs: Crumb[] = [
        { name: 'Home', item: BASE },
        { name: 'Exams', item: `${BASE}/exams` },
        { name: p.examName, item: `${BASE}/exam/${p.examSlug}` },
        { name: override?.h1 ?? p.title, item: canonical },
      ]
      return {
        title,
        description,
        contentHtml: renderPaperContent(p, questions ?? [], crumbs),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            name: title.replace(' | Ministry of Papers', ''),
            description,
            url: canonical,
            learningResourceType: 'Previous Year Question Paper',
            educationalUse: 'Practice',
            numberOfQuestions: p.questions ?? questions?.length,
            teaches: (p.subjects ?? []).join(', '),
            publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title.replace(' | Ministry of Papers', ''),
            description,
            url: canonical,
            ...(p.heldOn ? { datePublished: p.heldOn, dateModified: p.heldOn } : {}),
            author: { '@type': 'Organization', name: 'Ministry of Papers' },
            publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          },
          paperFaqJsonLd(buildPaperFaqs({ ...p, attemptable: (questions ?? []).length > 0 })),
          breadcrumbJsonLd(crumbs),
        ],
      }
    }

    const questionMatch = pathname.match(/^\/question\/([^/]+)$/)
    if (questionMatch) {
      const slug = questionMatch[1]
      const q = await apiJson<QuestionData>(`${API}/api/v1/questions/${slug}`, 86400)
      if (!q) return null
      // Built once: rendered visibly by renderQuestionContent AND declared in
      // JSON-LD, so the markup cannot claim a trail the page does not show.
      const crumbs: Crumb[] = [
        { name: 'Home', item: BASE },
        { name: q.examName, item: `${BASE}/exam/${q.examSlug}` },
        ...(q.paperSlug
          ? [
              { name: q.paper, item: `${BASE}${paperPath(q.paperSlug)}` },
              { name: `Q${q.questionNo}`, item: `${BASE}/question/${slug}` },
            ]
          : [{ name: `Q${q.questionNo}`, item: `${BASE}/question/${slug}` }]),
      ]
      const topic = questionTopic(q)
      // questions.exam_name holds the long official name ("UPSC Civil Services
      // Examination"); the exam record has a compact shortName ("UPSC CSE") that
      // leaves room for the topic keywords in the title.
      const exam = await apiJson<ExamData>(`${API}/api/v1/exams/${q.examSlug}`, 86400)
      const examLabel = exam?.shortName || q.examName
      const answerText = [
        q.answer ? `Correct answer: ${q.answer}.` : `Correct option: ${q.answerKey}.`,
        stripMarkdown(q.explanation ?? ''),
      ].filter(Boolean).join(' ').slice(0, 1000)
      // For reading-passage questions the stored text begins with the shared
      // passage, so slicing its first chars gives every Q in the set the SAME
      // description (Bing flags duplicates). The actual question is the last
      // line ending in '?', so prefer that when the text is multi-line.
      const qLines = q.question.split('\n').map((l) => stripMarkdown(l).trim()).filter(Boolean)
      const actualQuestion =
        qLines.length > 2 ? ([...qLines].reverse().find((l) => l.endsWith('?')) ?? qLines[qLines.length - 1]) : qLines.join(' ')
      return {
        title: questionTitle(examLabel, q.year, q.subject ?? '', q.questionNo, topic),
        description: `${q.examName} ${q.year}${q.subject ? ' ' + q.subject : ''} Q${q.questionNo}: ${actualQuestion.slice(0, 140)} — correct answer (${q.answerKey}) with detailed explanation.`,
        contentHtml: renderQuestionContent(q, crumbs),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'QAPage',
            name: `${q.examName} ${q.year} Q${q.questionNo} - Solved Answer`,
            url: `${BASE}/question/${slug}`,
            inLanguage: q.translations?.hi ? ['en', 'hi'] : 'en',
            ...(q.subject ? { about: { '@type': 'Thing', name: q.subject } } : {}),
            ...((q.tags ?? []).length ? { keywords: (q.tags ?? []).filter(Boolean).join(', ') } : {}),
            mainEntity: {
              '@type': 'Question',
              name: q.question.slice(0, 300),
              answerCount: 1,
              ...(q.subject ? { about: { '@type': 'Thing', name: q.subject } } : {}),
              acceptedAnswer: {
                '@type': 'Answer',
                text: answerText || `Correct option: ${q.answerKey}`,
                url: `${BASE}/question/${slug}`,
              },
            },
          },
          breadcrumbJsonLd(crumbs),
        ],
      }
    }

    const guideMatch = pathname.match(/^\/guide\/([^/]+)$/)
    if (guideMatch) {
      const slug = guideMatch[1]
      const guide = postGuides[slug]
      if (!guide) return null
      const guideCrumbs: Crumb[] = [
        { name: 'Home', item: BASE },
        { name: 'Exams', item: `${BASE}/exams` },
        { name: guide.shortName, item: `${BASE}/guide/${slug}` },
      ]
      return {
        title: `${guide.shortName} Syllabus & Exam Pattern | Ministry of Papers`,
        description: stripMarkdown(guide.tagline).slice(0, 160),
        contentHtml: renderGuideContent(slug, guide, guideCrumbs),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.tagline,
          url: `${BASE}/guide/${slug}`,
          // Mirrors the visible "Last updated" rendered by renderGuideContent.
          datePublished: guide.lastUpdated,
          dateModified: guide.lastUpdated,
          author: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
        },
      }
    }
  } catch {
    return null
  }

  return STATIC_META[pathname] ?? null
}

function injectMeta(html: string, meta: PageMeta, pathname: string): string {
  const canonical = `${BASE}${pathname}`
  const t = esc(meta.title)
  const d = esc(meta.description)
  const c = esc(canonical)
  let result = html
    .replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${d}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${t}"`)
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

  if (meta.robots) {
    result = result.replace('</head>', `  <meta name="robots" content="${esc(meta.robots)}" />\n</head>`)
  }

  const content = meta.contentHtml ?? `<h1>${esc(h1Text(meta.title))}</h1>`
  return result.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const ua = request.headers.get('User-Agent') ?? ''
    const path = url.pathname

    if (url.protocol === 'http:' || url.hostname === 'www.ministryofpapers.com') {
      const dest = new URL(request.url)
      dest.protocol = 'https:'
      dest.hostname = 'ministryofpapers.com'
      return Response.redirect(dest.toString(), 301)
    }

    if (LEGACY_REDIRECTS[path]) {
      const dest = new URL(request.url)
      dest.pathname = LEGACY_REDIRECTS[path]
      dest.search = ''
      return Response.redirect(dest.toString(), 301)
    }

    if (path === '/exams' && url.searchParams.get('q')?.includes('{search_term_string}')) {
      const dest = new URL(request.url)
      dest.pathname = '/exams'
      dest.search = ''
      return Response.redirect(dest.toString(), 301)
    }

    const pyqMatch = path.match(/^\/pyq\/([^/]+)$/)
    if (pyqMatch) {
      const apiSlug = apiPaperSlug(pyqMatch[1])
      const canonicalSlug = canonicalPaperSlug(apiSlug)
      if (pyqMatch[1] !== canonicalSlug) {
        const dest = new URL(request.url)
        dest.pathname = `/pyq/${canonicalSlug}`
        dest.search = ''
        return Response.redirect(dest.toString(), 301)
      }
    }

    if (path !== '/' && path.endsWith('/')) {
      const dest = new URL(request.url)
      dest.pathname = path.slice(0, -1)
      return Response.redirect(dest.toString(), 301)
    }

    const indexRequest = new Request(`${url.origin}/`, request)

    if (path === '/sitemap.xml') {
      try {
        // ?sv bumps the edge cache key so a stale sitemap (e.g. the old
        // 57-URL version cached before /question pages were added) is dropped
        // immediately on deploy. Short 10-min TTL keeps it close to the DB —
        // the sitemap changes whenever a paper/question is added, and a whole
        // day of staleness (the old 3600s) held new pages back from crawlers.
        const res = await apiFetch(`${API}/sitemap.xml?sv=3`, 600)
        if (res.ok) {
          const headers = new Headers(res.headers)
          headers.set('content-type', 'application/xml; charset=UTF-8')
          headers.set('cache-control', 'public, max-age=600')
          return new Response(res.body, { status: 200, headers })
        }
      } catch {
        // Fall through to the static sitemap bundled with the app.
      }
    }

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

    const staticMeta = STATIC_META[path]
    if (staticMeta) {
      try {
        const baseRes = await env.ASSETS.fetch(indexRequest)
        if (!baseRes.ok) return env.ASSETS.fetch(indexRequest)
        const html = await baseRes.text()
        const enhanced = injectMeta(html, staticMeta, path)
        const headers = withSecurityHeaders(new Headers(baseRes.headers))
        headers.set('content-type', 'text/html; charset=UTF-8')
        headers.delete('content-length')
        return new Response(enhanced, { status: 200, headers })
      } catch {
        return env.ASSETS.fetch(indexRequest)
      }
    }

    if (!BOT_UA.test(ua)) {
      const res = await env.ASSETS.fetch(indexRequest)
      return new Response(res.body, { status: res.status, headers: withSecurityHeaders(new Headers(res.headers)) })
    }

    try {
      const [baseRes, meta] = await Promise.all([
        env.ASSETS.fetch(indexRequest),
        fetchMeta(path),
      ])

      if (!baseRes.ok) return env.ASSETS.fetch(indexRequest)
      if (!meta) return isDynamicSeoPath(path) ? notFoundResponse() : notFoundResponse()

      // Client-side tab/filter URLs (?tab=…, ?subject=…) are duplicates of the
      // clean canonical page → keep them out of the index.
      if (/[?&](tab|subject)=/i.test(url.search)) {
        meta.robots = 'noindex, follow'
      }

      const html = await baseRes.text()
      let enhanced = injectMeta(html, meta, path)
      // When the page carries full prerendered content, drop the SPA bundle for
      // bots. Otherwise Googlebot's renderer executes the app, React's createRoot
      // discards this server content and re-renders from the API — so what gets
      // indexed depends on that fetch succeeding inside Google's renderer. With
      // the scripts gone, the rendered snapshot IS the prerendered page. Pages
      // without contentHtml (static shell metas) keep the app so bots can still
      // render them client-side.
      if (meta.contentHtml) {
        enhanced = enhanced
          .replace(/<script type="module"[^>]*><\/script>\s*/g, '')
          .replace(/<link rel="modulepreload"[^>]*>\s*/g, '')
      }
      const headers = withSecurityHeaders(new Headers(baseRes.headers))
      headers.set('content-type', 'text/html; charset=UTF-8')
      headers.delete('content-length')
      if (meta.robots) headers.set('X-Robots-Tag', meta.robots)
      return new Response(enhanced, { status: 200, headers })
    } catch {
      return isDynamicSeoPath(path) ? notFoundResponse() : notFoundResponse()
    }
  },
}
