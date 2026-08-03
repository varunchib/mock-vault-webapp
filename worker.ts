// Cloudflare Worker: injects crawlable HTML, metadata, canonical URLs, and
// structured data for public SEO routes while keeping the user-facing SPA fast.

import { postGuides } from './src/data/postGuides'
import { apiPaperSlug, canonicalPaperSlug, paperPath, paperSeoOverride } from './src/lib/paperSeo'
import { questionPath, questionRealSlug } from './src/lib/questionUrl'
import { guidePathForExam } from './src/lib/examLinks'
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
  redirect?: string  // canonical path to 301 to (set when the URL is non-canonical)
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
  boardSlug?: string
  // Number of sub-exams under this one. 1 = a thin board (near-duplicate of its
  // lone child) → served noindex until a 2nd sub-exam makes it a real hub.
  childExamCount?: number
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
  urlCode?: string
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

// Recommended QAPage fields (Google "improve item appearance"): the platform
// authors and verifies every solution, so it is the author of both the
// question write-up and the accepted answer.
const QA_AUTHOR = { '@type': 'Organization', name: 'Ministry of Papers', url: BASE }
function qaDate(year: string | number | undefined): string {
  const m = String(year ?? '').match(/\d{4}/)
  // Full ISO 8601 datetime with an explicit UTC offset — Google's QAPage
  // validator rejects a bare date (YYYY-MM-DD) for datePublished as both an
  // "invalid datetime value" and "missing a time zone".
  return `${m ? m[0] : '2026'}-01-01T00:00:00+00:00`
}

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
  // The blog is retired in full. Every article restated what the exam's guide
  // already covers in more depth (syllabus, pattern, eligibility, dates), so
  // the two pages competed for the same queries and the thinner one diluted
  // the guide. Each article 301s to the guide for the same exam, which keeps
  // the accumulated link equity instead of dropping it on a 404.
  '/blog/jkssb-patwari-exam': '/guide/jkssb-patwari',
  '/blog/jkssb-junior-assistant-exam': '/guide/jkssb-junior-assistant',
  '/blog/ibps-po-exam': '/guide/ibps-po',
  '/blog/ssc-cgl-exam': '/guide/ssc-cgl',
  '/blog/upsc-cse-exam': '/guide/upsc-cse',
  '/blog/neet-ug-exam': '/guide/neet-ug',
  '/blog/bpsc-exam': '/guide/bpsc-cce',
  '/blog/jkpsc-jkcce-exam': '/guide/jkcce',
  '/blog/rssb-patwari-exam': '/guide/rssb-patwari',
  '/blog/jkssb-sub-inspector-exam': '/guide/jkpsi',
  // A board has no syllabus or pattern of its own - JKSSB runs 10 different
  // exams with 10 different papers - so a board-level guide could only restate
  // its children. The hub at /exam/jkssb is the page that aggregates them.
  '/guide/jkssb': '/exam/jkssb',
  // Guides describe one exam. These three held leaf-exam content (BPSC CCE,
  // RSSB Patwari, JKCCE) but sat on board slugs, so the URL claimed a board the
  // page never covered. Moved to the exam they actually describe.
  '/guide/bpsc': '/guide/bpsc-cce',
  '/guide/rssb': '/guide/rssb-patwari',
  '/guide/jkpsc': '/guide/jkcce',
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
    title: 'Browse Competitive Exams - Free PYQ Papers & Mock Tests',
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

const GREEK: Record<string, string> = {
  theta: 'θ', alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', pi: 'π',
  lambda: 'λ', mu: 'μ', sigma: 'σ', omega: 'ω', phi: 'φ', rho: 'ρ',
}
// SSR titles/H1s/descriptions are plain text, so raw LaTeX ($, \dfrac, \theta)
// reads badly in a SERP. Convert the common math to readable plain text.
function mathToText(s: string): string {
  return s
    .replace(/\\sqrt\s*{([^{}]*)}/g, '√$1')
    .replace(/\\d?frac\s*{([^{}]*)}\s*{([^{}]*)}/g, '$1/$2')
    .replace(/\\(theta|alpha|beta|gamma|delta|pi|lambda|mu|sigma|omega|phi|rho)\b/gi, (_m, g: string) => GREEK[g.toLowerCase()] ?? '')
    .replace(/\\(sin|cos|tan|cot|sec|cosec|csc|log|ln)\b/g, '$1')
    .replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\\cdot/g, '·')
    .replace(/\\pm/g, '±').replace(/\\leq/g, '≤').replace(/\\geq/g, '≥').replace(/\\neq/g, '≠').replace(/\\infty/g, '∞')
    .replace(/\\[a-zA-Z]+/g, '') // drop any other LaTeX command
    .replace(/[${}]/g, '')       // drop $ delimiters and leftover braces
}
function stripMarkdown(s: string): string {
  return mathToText(s)
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

// richText renders explanation content with a light structure — headings,
// bullet points and nested points — mirroring the app's ExplanationText so bots
// see the same "Detailed Solution" layout users do. Plain text with no markers
// still renders as paragraphs (backward compatible).
//   ## Heading   → <h4>   ·   - item → <li>   ·   (indent) - item → nested <li>
function richText(s: string | undefined | null): string {
  if (!s) return ''
  const lines = String(s).replace(/\r/g, '').split('\n')
  const out: string[] = []
  let items: { text: string; sub: string[] }[] | null = null
  const flush = () => {
    if (items && items.length) {
      out.push('<ul>' + items.map(it =>
        `<li>${inlineFmt(it.text)}${it.sub.length ? '<ul>' + it.sub.map(x => `<li>${inlineFmt(x)}</li>`).join('') + '</ul>' : ''}</li>`,
      ).join('') + '</ul>')
    }
    items = null
  }
  const cells = (l: string) => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())
  const isRow = (l: string) => l.trim().startsWith('|') && l.includes('|', 1)
  const isSep = (l: string) => /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(l) && l.includes('-')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/\s+$/, '')
    if (!line.trim()) { flush(); continue }
    const heading = line.match(/^\s*#{2,3}\s+(.*)$/)
    if (heading) { flush(); out.push(`<h4>${inlineFmt(heading[1].trim())}</h4>`); continue }
    // Pipe table: header + separator + body rows
    if (isRow(line) && i + 1 < lines.length && isSep(lines[i + 1])) {
      flush()
      const head = cells(line)
      const body: string[][] = []
      i += 2
      while (i < lines.length && isRow(lines[i])) { body.push(cells(lines[i])); i++ }
      i--
      out.push('<div class="expl-table-wrap"><table class="expl-table"><thead><tr>' +
        head.map(h => `<th>${inlineFmt(h)}</th>`).join('') + '</tr></thead><tbody>' +
        body.map(r => '<tr>' + r.map(c => `<td>${inlineFmt(c)}</td>`).join('') + '</tr>').join('') +
        '</tbody></table></div>')
      continue
    }
    const nested = line.match(/^(?:\s{2,}|\t+)[-*•]\s+(.*)$/)
    if (nested && items && items.length) { items[items.length - 1].sub.push(nested[1].trim()); continue }
    const bullet = line.match(/^\s*[-*•]\s+(.*)$/)
    if (bullet) { if (!items) items = []; items.push({ text: bullet[1].trim(), sub: [] }); continue }
    flush()
    out.push(`<p>${inlineFmt(line.trim())}</p>`)
  }
  flush()
  return out.join('')
}

// questionTopic returns the question's primary topic keyword for the title.
// It uses the curated first tag rather than parsing the question text: exam
// questions open with boilerplate stems ("Consider the following statements:")
// and the real topic sits in the body, so text extraction yields broken
// fragments. No tag => no topic, which is better than a garbled one.
function questionTopic(q: QuestionData): string {
  return (q.tags ?? []).map(t => String(t).trim()).filter(Boolean)[0] ?? ''
}

// Only 67% of questions carry a curated tag, so for the rest the topic has to
// come out of the text. It is never the trailing stem — it is the opening line
// ("Consider the following statements regarding the Blue Flag Certification:")
// or, when that is bare boilerplate ("Consider the following statements:"),
// the first numbered statement. Strip the lead-in and keep the noun phrase.
const TOPIC_LEAD_IN =
  /^(consider the following statements?(?:\s+(?:regarding|about|concerning|on))?(?:\s+the)?|with reference to(?:\s+the)?|in the context of(?:\s+the)?)\s*/i

function topicFromQuestion(lines: string[]): string {
  for (const raw of lines) {
    if (/\babove\b/i.test(raw)) continue // the boilerplate stem, never the topic
    let t = raw.replace(/^[IVXivx]+[.)]\s*/, '') // "I." / "II)" statement markers
    // "With reference to X, consider the following statements" -> drop the
    // trailing clause. Guarded: without this check the same pattern also eats
    // lines that OPEN with it, throwing away "...regarding the Blue Flag
    // Certification" — the one phrase worth putting in the title.
    if (!/^consider\s+the\s+following/i.test(t)) {
      t = t.replace(/,?\s*consider the following.*$/i, '')
    }
    t = t.replace(TOPIC_LEAD_IN, '').replace(/[:?.;,\s]+$/, '').trim()
    if (t.length < 12) continue
    // A whole statement is too long for a title; keep the subject of the
    // sentence ("The Montreux Record is maintained under..." -> "The Montreux
    // Record") so the keyword survives instead of being cut mid-phrase.
    if (t.length > 45) {
      const clause = t.split(/\s+(?:is|are|was|were|has|have|had|which|that)\s+/i)[0]
      if (clause.length >= 12) t = clause
    }
    if (t.length > 45) t = t.split(',')[0]
    return t.replace(/[:?.;,\s]+$/, '').trim()
  }
  return ''
}

// questionTitle builds a compact, keyword-first title for a question page.
// It deliberately omits the " | Ministry of Papers" suffix: 21 chars of brand
// crowd out the topic keywords that win long-tail queries, and the exam+subject
// already identify the page. Capped at 65 chars so Google shows it in full.
function questionTitle(examLabel: string, year: string, subject: string, no: string | number, topic: string): string {
  const CAP = 65
  const tail = ' - Solved Answer'
  // With a topic present the subject is redundant and only eats budget the
  // keyword needs ("JKCCE 2025 Environment & Ecology Q38: Blue Flag Certifi…").
  const base = `${examLabel}${year ? ' ' + year : ''}${topic ? '' : subject ? ' ' + subject : ''} Q${no}`
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

// Statement-list and passage items end with boilerplate that refers back to
// content the title cannot show ("Which of the statements given above is/are
// correct?"). Using that line as the <title> gave 242 question pages a title
// they shared with at least one other page — 48 of them the exact same
// sentence, and 21 titled only "Passage:" — so Google had nothing to tell them
// apart. When the trailing line is one of these, fall back to the keyword-first
// questionTitle() built from exam + year + subject + curated topic tag.
function isGenericStem(line: string, multiline: boolean): boolean {
  const t = line.replace(/\s+/g, ' ').trim()
  if (!t) return true
  // "above" always points at statements/pairs that live outside the title.
  if (/\babove\b/i.test(t)) return true
  if (/^(passage|match list|directions?)\b/i.test(t)) return true
  // Instruction-style stems shared verbatim across whole English/reasoning
  // sections ("Select the letter-cluster…", "In the passage below…").
  if (/^(select|choose|identify|pick)\b/i.test(t)) return true
  if (/^in the (passage|sentence|following)\b/i.test(t)) return true
  if (/^a sentence is provided\b/i.test(t)) return true
  // "Which of the following statements/pairs/conclusions is/are correct?" —
  // the same closing question on hundreds of statement-list items.
  if (/^(which|how many)\b.*\b(statements?|pairs?|assumptions?|conclusions?)\b/i.test(t)) return true
  // On a multi-line item the substance sits in the lines that were dropped, so
  // a short trailing line cannot identify the page on its own.
  return multiline && t.length < 45
}

// Google renders roughly 60 characters and appends the site name itself, so the
// old " | Ministry of Papers" suffix spent 21 of those on something Search shows
// anyway — it pushed the keywords that win the query out of the visible part.
// Competitors do the same (Testbook ships "SSC CGL 2026 Exam Date, 12256
// vacancies, Eligibility and Selection Process" with no brand at all).
function titleFit(core: string): string {
  const CAP = 60
  if (core.length <= CAP) return core
  const cut = core.slice(0, CAP - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 30 ? cut.slice(0, lastSpace) : cut).replace(/[,;:\-\s]+$/, '') + '…'
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
  const isDeleted = String(q.answerKey).toLowerCase() === 'deleted'
  const isPending = String(q.answerKey).toLowerCase() === 'pending'
  const optionItems = (q.options ?? [])
    .map(opt => {
      const correct = !isDeleted && !isPending && String(opt.key).toUpperCase() === String(q.answerKey).toUpperCase()
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

  const heading = stripMarkdown(q.question).replace(/\s+/g, ' ').trim()
  return renderPageShell(`${heading.length > 130 ? heading.slice(0, 129).trimEnd() + '…' : heading}`, `
    <p>${htmlText(q.subject ? q.subject + ' · ' : '')}Previously asked in <a href="/exam/${encodeURIComponent(q.examSlug)}">${htmlText(q.examName)}</a>${q.year ? ` ${htmlText(q.year)}` : ''}</p>
    ${paperLink}
    ${images ? `<figure>${images}</figure>` : ''}
    <section>
      <h2>Question</h2>
      ${paragraph(q.question)}
      ${optionItems ? `<ol type="A">${optionItems}</ol>` : ''}
    </section>
    ${isDeleted
      ? `<section><p>This question was dropped from the final answer key, so it has no correct option — marks were awarded to all candidates.</p></section>`
      : isPending
      ? `<section><h2>Correct Answer</h2><p>Official answer key awaited — solution will be updated.</p></section>`
      : `<section><h2>Correct Answer</h2><p><strong>Option ${htmlText(q.answerKey)}${q.answer ? ` — ${htmlText(q.answer)}` : ''}</strong></p></section>`}
    ${!isDeleted && solution ? `<section><h2>Detailed Solution &amp; Explanation</h2>${solution}</section>` : ''}
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
      <a href="${questionPath(q.urlCode ?? q.slug, q.question)}">Q${htmlText(q.questionNo)}: ${htmlText(q.question).slice(0, 200)}</a>
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

function renderExamContent(e: ExamData, papers: PaperData[], mocks: MockData[], subExams: ExamData[] = [], crumbs: Crumb[] = []): string {
  // Sub-exam links so a board renders as a real hub for bots — matching the
  // "Exams under this board" section the React page shows humans. Without these,
  // Google saw a board (e.g. JKSSB, 8 sub-exams) as a flat paper list and passed
  // no internal link equity down to the sub-exam pages that should actually rank.
  const subExamLinks = subExams
    .map(x => `<li><a href="/exam/${encodeURIComponent(x.slug)}">${htmlText(x.name)}</a> <small>${x.papers ?? 0} papers${x.mocks ? ` - ${x.mocks} mocks` : ''}</small></li>`)
    .join('')
  const paperLinks = papers
    .slice(0, 30)
    .map(p => `<li><a href="${paperPath(p.slug)}">${htmlText(paperSeoOverride(p.slug)?.h1 ?? p.title)}</a> <small>${p.questions ?? 0} questions</small></li>`)
    .join('')
  const mockLinks = mocks
    .slice(0, 20)
    .map(m => `<li><a href="/mock-test/${encodeURIComponent(m.slug)}">${htmlText(m.title)}</a> <small>${htmlText(m.difficulty)} - ${m.questions} questions</small></li>`)
    .join('')
  const subjects = (e.subjects ?? []).filter(Boolean).join(', ')
  // Guide cross-link — hands crawlers off to the editorial reference for this
  // exam, mirroring the card the React page shows.
  const guideHref = guidePathForExam(e.slug)
  const resourceLinks = guideHref
    ? `<li><a href="${guideHref}">${htmlText(e.shortName)} exam guide — syllabus, pattern &amp; weightage analysis</a></li>`
    : ''
  return renderPageShell(`${e.name} PYQ papers and mock tests`, `
    ${paragraph(e.description)}
    <p>${e.papers ?? papers.length} papers - ${e.totalQuestions ?? 0} questions - ${e.mocks ?? mocks.length} mocks</p>
    ${subjects ? `<p><strong>Subjects:</strong> ${htmlText(subjects)}</p>` : ''}
    ${resourceLinks ? `<section><h2>${htmlText(e.shortName)} exam guide</h2><ul>${resourceLinks}</ul></section>` : ''}
    ${subExamLinks ? `<section><h2>Exams under ${htmlText(e.shortName)}</h2><ul>${subExamLinks}</ul></section>` : ''}
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
  return /^\/exam\/[^/]+$/.test(pathname)
    || /^\/pyq\/[^/]+$/.test(pathname)
    || /^\/question\/[^/]+$/.test(pathname)
    || /^\/mock-test\/[^/]+$/.test(pathname)
    || /^\/guide\/[^/]+$/.test(pathname)
}

// A 404 on a dynamic SEO path is *inferred*: the Worker asks the API and says
// "not found" when the answer doesn't come back. That inference is wrong every
// time the API merely blips — a deploy, a container restart, a query slower
// than API_TIMEOUT_MS — and at `max-age=300` Cloudflare pinned the wrong answer
// at the edge for five minutes, serving 404 for live pages long after the API
// recovered. (Observed in production: flushing the catalog cache while the
// webservice restarted made every /pyq page 404 to crawlers, and it stayed that
// way through repeated requests because the edge had cached it.)
//
// apiFetch already caps *upstream* error caching at 5s for exactly this reason;
// 'inferred' does the same for the response we hand back, so a transient
// failure self-heals on the next crawl instead of outliving the outage. 5s
// rather than no-store still damps a bot hammering bogus URLs during an outage.
//
// 'decided' is for paths that are gone by decision rather than by inference —
// the retired /blog articles — where no API call is involved, nothing can blip,
// and there is no reason to make crawlers re-ask every time.
function notFoundResponse(certainty: 'inferred' | 'decided' = 'inferred'): Response {
  return new Response('<!doctype html><title>404 Not Found</title><h1>404 Not Found</h1>', {
    status: 404,
    headers: {
      'content-type': 'text/html; charset=UTF-8',
      'x-robots-tag': 'noindex',
      'cache-control': certainty === 'decided' ? 'public, max-age=300' : 'public, max-age=5',
    },
  })
}

async function fetchMeta(pathname: string): Promise<PageMeta | null> {
  try {
    const examMatch = pathname.match(/^\/exam\/([^/]+)$/)
    if (examMatch) {
      const slug = examMatch[1]
      const [e, papers, mocks, allExams] = await Promise.all([
        apiJson<ExamData>(`${API}/api/v1/exams/${slug}`, 3600),
        apiJson<PaperData[]>(`${API}/api/v1/exams/${slug}/papers`, 3600),
        apiJson<MockData[]>(`${API}/api/v1/mocks`, 3600),
        apiJson<ExamData[]>(`${API}/api/v1/exams`, 3600),
      ])
      if (!e) return null
      const examMocks = (mocks ?? []).filter(m => m.examSlug === slug)
      // Sub-exams for board hubs (rendered as internal links, see renderExamContent).
      const subExams = (allExams ?? []).filter(x => x.boardSlug === slug)
      // An exam with no papers and no mocks is a thin page → keep it out of the index.
      const examEmpty = (e.papers ?? 0) === 0 && (e.mocks ?? 0) === 0
      // A thin board — one with exactly ONE sub-exam — just aggregates that lone
      // child, so its page is a near-duplicate of the sub-exam's. Keep it out of
      // the index (this matches the sitemap, which also skips it) until a 2nd
      // sub-exam is added and childExamCount >= 2 turns it into a genuine hub.
      const thinBoard = (e.childExamCount ?? 0) === 1
      const examCrumbs: Crumb[] = [
        { name: 'Home', item: BASE },
        { name: 'Exams', item: `${BASE}/exams` },
        { name: e.shortName, item: `${BASE}/exam/${slug}` },
      ]
      return {
        title: titleFit(`${e.shortName} PYQ Papers & Free Mock Tests`),
        description: e.description || `Browse solved PYQ papers and mock tests for ${e.name}.`,
        robots: examEmpty || thinBoard ? 'noindex, follow' : undefined,
        contentHtml: renderExamContent(e, papers ?? [], examMocks, subExams, examCrumbs),
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
        title: titleFit(`${e.shortName} Free Mock Tests - Full-Length Practice`),
        description: `Free full-length mock tests for ${e.name}. Real exam pattern, automatic scoring, detailed solutions.`,
        // Mocks are still feature-gated ("coming soon") in the app, so the page
        // a searcher would land on cannot actually be attempted. Keep it out of
        // the index until mocks launch — indexing a "Free Practice" page that
        // shows "coming soon" is thin/misleading content. Remove this line (and
        // re-enable the mock_exam sitemap entry) when mocks go live.
        robots: 'noindex, follow',
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
      // URL is /question/<keywords>--<id>; fetch by the stable id after "--".
      const q = await apiJson<QuestionData>(`${API}/api/v1/questions/${questionRealSlug(questionMatch[1])}?v=2`, 86400)
      if (!q) return null
      // Canonical keyword URL; 301 any bare/old/mismatched URL to it.
      const canonicalPath = questionPath(q.urlCode ?? q.slug, q.question)
      if (pathname !== canonicalPath) {
        return { title: '', description: '', redirect: canonicalPath }
      }
      const qUrl = `${BASE}${canonicalPath}`
      // Built once: rendered visibly by renderQuestionContent AND declared in
      // JSON-LD, so the markup cannot claim a trail the page does not show.
      const crumbs: Crumb[] = [
        { name: 'Home', item: BASE },
        { name: q.examName, item: `${BASE}/exam/${q.examSlug}` },
        ...(q.paperSlug
          ? [
              { name: q.paper, item: `${BASE}${paperPath(q.paperSlug)}` },
              { name: `Q${q.questionNo}`, item: qUrl },
            ]
          : [{ name: `Q${q.questionNo}`, item: qUrl }]),
      ]
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
      const multiline = qLines.length > 2
      const actualQuestion =
        multiline ? ([...qLines].reverse().find((l) => l.endsWith('?')) ?? qLines[0]) : qLines.join(' ')
      // Curated tag first (67% of rows have one), else derive from the text.
      const topic = questionTopic(q) || topicFromQuestion(qLines)
      // The brand suffix is deliberately gone: 21 chars of " | Ministry of
      // Papers" pushed the topic keywords past what Google renders, and Search
      // now appends the site name itself.
      const pageTitle = isGenericStem(actualQuestion, multiline)
        ? questionTitle(examLabel, q.year, q.subject ?? '', q.questionNo, topic)
        : actualQuestion.length > 65
          ? actualQuestion.slice(0, 64).trimEnd() + '…'
          : actualQuestion
      // Descriptions lead with the FULL question text — the same source the URL
      // keywords come from — not the trailing stem, which is identical across
      // papers and gave every statement-list page one shared snippet.
      const descTail = ` Answer (${q.answerKey}) with a full solution — ${examLabel} ${q.year}${q.subject ? ' ' + q.subject : ''}${topic ? ' · ' + topic : ''}.`
      const leadRoom = Math.max(60, 158 - descTail.length)
      const flatQuestion = qLines.join(' ')
      const descLead =
        flatQuestion.length > leadRoom ? flatQuestion.slice(0, leadRoom - 1).trimEnd() + '…' : flatQuestion
      return {
        title: pageTitle,
        description: `${descLead}${descTail}`,
        contentHtml: renderQuestionContent(q, crumbs),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'QAPage',
            name: `${q.examName} ${q.year} Q${q.questionNo} - Solved Answer`,
            url: qUrl,
            inLanguage: q.translations?.hi ? ['en', 'hi'] : 'en',
            ...(q.subject ? { about: { '@type': 'Thing', name: q.subject } } : {}),
            ...((q.tags ?? []).length ? { keywords: (q.tags ?? []).filter(Boolean).join(', ') } : {}),
            mainEntity: {
              '@type': 'Question',
              name: q.question.slice(0, 300),
              text: q.question,
              answerCount: 1,
              author: QA_AUTHOR,
              datePublished: qaDate(q.year),
              ...(q.subject ? { about: { '@type': 'Thing', name: q.subject } } : {}),
              acceptedAnswer: {
                '@type': 'Answer',
                text: answerText || `Correct option: ${q.answerKey}`,
                url: qUrl,
                author: QA_AUTHOR,
                datePublished: qaDate(q.year),
                upvoteCount: 1,
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
        title: titleFit(`${guide.shortName} Syllabus & Exam Pattern`),
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

    // The blog is retired. Known articles 301 above; anything else under /blog
    // is gone for good and must say so with a real status. Falling through to
    // the SPA returned 200 with an empty shell that client-redirects to "/",
    // which Google classifies as a Soft 404 — the one blog-related error that
    // would actually show up in Search Console.
    if (path === '/blog' || path.startsWith('/blog/')) {
      return notFoundResponse('decided')
    }

    // Retired /exam/:slug/overview pages → the exam guide (or the hub if no
    // guide). Overview duplicated the guide's pattern/eligibility content, so
    // it was removed to end the cannibalization; 301 preserves any earned rank.
    const overviewRedirect = path.match(/^\/exam\/([^/]+)\/overview$/)
    if (overviewRedirect) {
      const slug = overviewRedirect[1]
      const dest = new URL(request.url)
      dest.pathname = postGuides[slug] ? `/guide/${slug}` : `/exam/${slug}`
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
        const res = await apiFetch(`${API}/sitemap.xml?sv=5`, 600)
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

    // Only bots get the prerendered contentHtml injected into #root. For humans,
    // painting SSR content into #root that React then discards on hydration is a
    // visible flash (FOUC) on load/reload — so real users fall through to the
    // plain SPA shell below and hydrate cleanly.
    const staticMeta = STATIC_META[path]
    if (staticMeta && BOT_UA.test(ua)) {
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
      // A dynamic path resolves through the API, so a miss here may just be an
      // outage; an unknown static path is simply not a route we serve.
      if (!meta) return notFoundResponse(isDynamicSeoPath(path) ? 'inferred' : 'decided')

      // Non-canonical URL (e.g. old bare /question/<id>) → 301 to the canonical
      // keyword URL so search engines transfer ranking to the new address.
      if (meta.redirect) {
        const dest = new URL(request.url)
        dest.pathname = meta.redirect
        dest.search = ''
        return Response.redirect(dest.toString(), 301)
      }

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
      // Reaching here means something threw — a failed fetch, a bad payload.
      // That is never a durable statement about the URL, whatever its shape,
      // so it must not be cached as one.
      return notFoundResponse('inferred')
    }
  },
}
