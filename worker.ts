// Cloudflare Worker: injects crawlable HTML, metadata, canonical URLs, and
// structured data for public SEO routes while keeping the user-facing SPA fast.

import { postGuides } from './src/data/postGuides'
import { apiPaperSlug, canonicalPaperSlug, paperPath, paperSeoOverride } from './src/lib/paperSeo'

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
}

const BOT_UA = /Googlebot|Google-Extended|Bingbot|bingbot|GPTBot|OAI-SearchBot|ClaudeBot|Claude-Web|anthropic-ai|PerplexityBot|FacebookBot|Applebot|Slurp|DuckDuckBot|YandexBot|Sogou|Exabot|facebot|ia_archiver|LinkedInBot|Twitterbot|WhatsApp|Slack|TelegramBot|Discordbot/i
const API = 'https://api.ministryofpapers.com'
const BASE = 'https://ministryofpapers.com'
const API_TIMEOUT_MS = 4000

// Content-Security-Policy for the SPA shell. Shipped as Report-Only so it CANNOT
// break the site — it only logs violations to the browser console. Watch for a few
// days (Google sign-in, GA, KaTeX, framer-motion), then rename the header to
// `Content-Security-Policy` to enforce it.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://accounts.google.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.ministryofpapers.com https://assets.ministryofpapers.com https://accounts.google.com https://www.google-analytics.com https://region1.google-analytics.com",
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
    description: 'Privacy policy for Ministry of Papers - how we collect, use and protect your data.',
  },
  '/terms': {
    title: 'Terms of Service | Ministry of Papers',
    description: 'Terms of service for Ministry of Papers.',
  },
}

function apiFetch(url: string, cacheTtl: number): Promise<Response> {
  return fetch(url, {
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
    cf: { cacheEverything: true, cacheTtl },
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

function renderPageShell(title: string, children: string): string {
  return `<article class="seo-rendered">
    <h1>${htmlText(title)}</h1>
    ${children}
  </article>`
}

function renderQuestionContent(q: QuestionData): string {
  const optionItems = (q.options ?? [])
    .map(opt => `<li><strong>${htmlText(opt.key)}.</strong> ${htmlText(opt.text)}</li>`)
    .join('')
  const tags = (q.tags ?? [])
    .filter(Boolean)
    .slice(0, 8)
    .map(tag => `<span>${htmlText(tag)}</span>`)
    .join(' ')
  const paperLink = q.paperSlug
    ? `<p><a href="${paperPath(q.paperSlug)}">View full paper: ${htmlText(q.paper)}</a></p>`
    : ''
  const images = (q.images ?? [])
    .map((src, i) => `<img src="${esc(src)}" alt="Question ${htmlText(q.questionNo)} figure ${i + 1}" loading="lazy" />`)
    .join('')

  return renderPageShell(`${q.examName} ${q.year} Q${q.questionNo} solved answer`, `
    <p><a href="/exam/${encodeURIComponent(q.examSlug)}">${htmlText(q.examName)}</a>${q.subject ? ` - ${htmlText(q.subject)}` : ''}${q.year ? ` - ${htmlText(q.year)}` : ''}</p>
    ${paperLink}
    ${images ? `<figure>${images}</figure>` : ''}
    <section>
      <h2>Question</h2>
      ${paragraph(q.question)}
      ${optionItems ? `<ol type="A">${optionItems}</ol>` : ''}
    </section>
    <section>
      <h2>Answer</h2>
      <p><strong>Correct option:</strong> ${htmlText(q.answerKey)}${q.answer ? ` - ${htmlText(q.answer)}` : ''}</p>
      ${paragraph(q.explanation)}
    </section>
    ${tags ? `<p><strong>Topics:</strong> ${tags}</p>` : ''}
  `)
}

function renderPaperContent(p: PaperData, questions: QuestionData[]): string {
  const override = paperSeoOverride(p.slug)
  const subjectText = (p.subjects ?? []).filter(Boolean).join(', ')
  const questionItems = questions
    .map(q => `<li>
      <a href="/question/${encodeURIComponent(q.slug)}">Q${htmlText(q.questionNo)}: ${htmlText(q.question).slice(0, 220)}</a>
      <br /><small><strong>Answer:</strong> ${htmlText(q.answerKey)}${q.answer ? ` - ${htmlText(q.answer)}` : ''}</small>
      ${q.explanation ? `<br /><small>${htmlText(q.explanation).slice(0, 260)}</small>` : ''}
    </li>`)
    .join('')
  return renderPageShell(override?.h1 ?? `${p.title} solved PYQ`, `
    ${override ? `<p><strong>${htmlText(override.title)}</strong></p>` : ''}
    ${override ? paragraph(override.review) : ''}
    ${paragraph(p.description)}
    <p><a href="/exam/${encodeURIComponent(p.examSlug)}">${htmlText(p.examName)}</a>${p.year ? ` - ${htmlText(p.year)}` : ''}${p.shift ? ` - ${htmlText(p.shift)}` : ''}</p>
    <p>${p.questions ?? questions.length} solved questions - Answer key included${subjectText ? ` - Subjects: ${htmlText(subjectText)}` : ''}</p>
    ${questionItems ? `<section><h2>Solved questions</h2><ol>${questionItems}</ol></section>` : ''}
  `)
}

function renderExamContent(e: ExamData, papers: PaperData[], mocks: MockData[]): string {
  const paperLinks = papers
    .slice(0, 30)
    .map(p => `<li><a href="${paperPath(p.slug)}">${htmlText(paperSeoOverride(p.slug)?.title ?? p.title)}</a> <small>${p.questions ?? 0} questions</small></li>`)
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
  `)
}

function renderMockContent(exam: ExamData, mocks: MockData[], papers: PaperData[]): string {
  const mockItems = mocks
    .map(m => `<li><strong>${htmlText(m.title)}</strong><br />${htmlText(m.description)}<br /><small>${m.questions} questions - ${m.durationMinutes} minutes - ${htmlText(m.difficulty)}</small></li>`)
    .join('')
  const paperLinks = papers
    .slice(0, 10)
    .map(p => `<li><a href="${paperPath(p.slug)}">${htmlText(paperSeoOverride(p.slug)?.title ?? p.title)}</a></li>`)
    .join('')
  return renderPageShell(`${exam.shortName} mock tests`, `
    ${paragraph(exam.description)}
    ${mockItems ? `<section><h2>Available mock tests</h2><ul>${mockItems}</ul></section>` : '<p>No published mock tests are available for this exam yet.</p>'}
    ${paperLinks ? `<section><h2>Related PYQ papers</h2><ul>${paperLinks}</ul></section>` : ''}
  `)
}

function renderGuideContent(slug: string, guide: (typeof postGuides)[string]): string {
  const facts = (guide.quickFacts ?? [])
    .map(f => `<li><strong>${htmlText(f.label)}:</strong> ${htmlText(f.value)}</li>`)
    .join('')
  const about = guide.about.map(paragraph).join('')
  const papers = guide.papers
    .map(p => `<li><a href="${paperPath(p.slug)}">${htmlText(paperSeoOverride(p.slug)?.title ?? p.title)}</a> <small>${htmlText(p.year)} - ${p.questions} questions</small></li>`)
    .join('')
  const syllabus = guide.syllabus
    .slice(0, 10)
    .map(s => `<section><h2>${htmlText(s.subject)}</h2><ul>${s.topics.slice(0, 12).map(t => `<li>${htmlText(t)}</li>`).join('')}</ul></section>`)
    .join('')

  return renderPageShell(guide.title, `
    <p>${htmlText(guide.tagline)}</p>
    <p><a href="/exam/${encodeURIComponent(guide.examSlug)}">Browse ${htmlText(guide.shortName)} PYQ papers</a></p>
    ${facts ? `<section><h2>Quick facts</h2><ul>${facts}</ul></section>` : ''}
    ${about ? `<section><h2>About ${htmlText(guide.shortName)}</h2>${about}</section>` : ''}
    ${papers ? `<section><h2>Previous year papers</h2><ul>${papers}</ul></section>` : ''}
    ${syllabus}
    <p><a href="/guide/${encodeURIComponent(slug)}">Canonical guide page</a></p>
  `)
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
      return {
        title: `${e.shortName} Overview - Exam Pattern, Eligibility & PYQ | Ministry of Papers`,
        description: `${e.shortName} overview - exam pattern, eligibility criteria, selection process, salary, and free PYQ with detailed explanations on Ministry of Papers.`,
        contentHtml: renderPageShell(`${e.shortName} exam overview`, `
          ${paragraph(e.description)}
          <p><a href="/exam/${encodeURIComponent(slug)}">Browse ${htmlText(e.shortName)} PYQ papers and mock tests</a></p>
        `),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: `${e.shortName} Exam Overview`,
          description: e.description || `${e.name} exam pattern, eligibility, selection process, and free PYQ.`,
          url: `${BASE}/exam/${slug}/overview`,
          provider: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
              { '@type': 'ListItem', position: 2, name: 'Exams', item: `${BASE}/exams` },
              { '@type': 'ListItem', position: 3, name: e.shortName, item: `${BASE}/exam/${slug}` },
              { '@type': 'ListItem', position: 4, name: 'Overview', item: `${BASE}/exam/${slug}/overview` },
            ],
          },
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
      return {
        title: `${e.shortName} - Mock Tests & PYQ Papers | Ministry of Papers`,
        description: e.description || `Browse solved PYQ papers and mock tests for ${e.name}.`,
        robots: examEmpty ? 'noindex, follow' : undefined,
        contentHtml: renderExamContent(e, papers ?? [], examMocks),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${e.shortName} - Mock Tests & PYQ Papers`,
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
      return {
        title: `${e.shortName} Mock Tests - Free Full-Length Practice | Ministry of Papers`,
        description: `Free full-length mock tests for ${e.name}. Real exam pattern, automatic scoring, detailed solutions.`,
        contentHtml: renderMockContent(e, examMocks, papers ?? []),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: `${e.shortName} Mock Tests - Free Full-Length Practice`,
          description: `Free full-length mock tests for ${e.name}. Real exam pattern, automatic scoring, detailed solutions.`,
          url: `${BASE}/mock-test/${examSlug}`,
          learningResourceType: 'Practice Test',
          educationalUse: 'Practice',
          publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
              { '@type': 'ListItem', position: 2, name: 'Exams', item: `${BASE}/exams` },
              { '@type': 'ListItem', position: 3, name: e.shortName, item: `${BASE}/exam/${examSlug}` },
              { '@type': 'ListItem', position: 4, name: 'Mock Tests', item: `${BASE}/mock-test/${examSlug}` },
            ],
          },
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
      return {
        title,
        description,
        contentHtml: renderPaperContent(p, questions ?? []),
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
            author: { '@type': 'Organization', name: 'Ministry of Papers' },
            publisher: { '@type': 'Organization', name: 'Ministry of Papers', url: BASE },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
              { '@type': 'ListItem', position: 2, name: 'Exams', item: `${BASE}/exams` },
              { '@type': 'ListItem', position: 3, name: p.examName, item: `${BASE}/exam/${p.examSlug}` },
              { '@type': 'ListItem', position: 4, name: title.replace(' | Ministry of Papers', ''), item: canonical },
            ],
          },
        ],
      }
    }

    const questionMatch = pathname.match(/^\/question\/([^/]+)$/)
    if (questionMatch) {
      const slug = questionMatch[1]
      const q = await apiJson<QuestionData>(`${API}/api/v1/questions/${slug}`, 86400)
      if (!q) return null
      const breadcrumbs = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
        { '@type': 'ListItem', position: 2, name: q.examName, item: `${BASE}/exam/${q.examSlug}` },
        ...(q.paperSlug
          ? [
              { '@type': 'ListItem', position: 3, name: q.paper, item: `${BASE}${paperPath(q.paperSlug)}` },
              { '@type': 'ListItem', position: 4, name: `Q${q.questionNo}`, item: `${BASE}/question/${slug}` },
            ]
          : [{ '@type': 'ListItem', position: 3, name: `Q${q.questionNo}`, item: `${BASE}/question/${slug}` }]),
      ]
      return {
        title: titleFit(`${q.examName} ${q.year} - Q${q.questionNo} Solved`),
        description: `${stripMarkdown(q.question).slice(0, 145)}... - Solved with explanation on Ministry of Papers.`,
        contentHtml: renderQuestionContent(q),
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'QAPage',
            name: `${q.examName} ${q.year} Q${q.questionNo} - Solved Answer`,
            url: `${BASE}/question/${slug}`,
            mainEntity: {
              '@type': 'Question',
              name: q.question.slice(0, 200),
              acceptedAnswer: {
                '@type': 'Answer',
                text: [q.answer, q.explanation].filter(Boolean).join(' - ').slice(0, 500),
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

    const guideMatch = pathname.match(/^\/guide\/([^/]+)$/)
    if (guideMatch) {
      const slug = guideMatch[1]
      const guide = postGuides[slug]
      if (!guide) return null
      return {
        title: `${guide.shortName} Syllabus & Exam Pattern | Ministry of Papers`,
        description: stripMarkdown(guide.tagline).slice(0, 160),
        contentHtml: renderGuideContent(slug, guide),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.tagline,
          url: `${BASE}/guide/${slug}`,
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
        const res = await apiFetch(`${API}/sitemap.xml`, 3600)
        if (res.ok) {
          const headers = new Headers(res.headers)
          headers.set('content-type', 'application/xml; charset=UTF-8')
          headers.set('cache-control', 'public, max-age=3600')
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
      const enhanced = injectMeta(html, meta, path)
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
