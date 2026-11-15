import { stripQuestionNumberPrefix } from './questionUrl'

/**
 * Canonical SEO title / description builders.
 *
 * Always build from structured fields (examName, year, shift, etc.) — never
 * use raw admin-entered `title` strings in <title> or meta tags.
 */

const BRAND = 'Ministry of Papers'

// ── Helpers ────────────────────────────────────────────────────────────────

function strip(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s
  return s.slice(0, max - 1).trimEnd() + '…'
}

// Format a date string (ISO or partial) to "23 Aug 2025"
function fmtDate(iso: string | undefined): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  } catch {
    return iso
  }
}

// ── Paper (PYQ) ────────────────────────────────────────────────────────────

type PaperMeta = {
  examName: string
  year?: string
  shift?: string
  heldOn?: string
  questions?: number
  subjects?: string[]
  description?: string
}

/**
 * IBPS PO 2025 PYQ Paper – 1st Shift | Ministry of Papers
 * UPSC CSE Prelims 2024 PYQ Paper – GS Paper 1 | Ministry of Papers
 */
export function paperSeoTitle(p: PaperMeta): string {
  const exam = p.examName.trim()
  const year = p.year?.trim() ?? ''
  const shift = p.shift?.trim() ?? ''
  const brand = ` | ${BRAND}`
  const budget = 70 - brand.length  // 49 chars for core

  let core = `${exam}${year ? ` ${year}` : ''} PYQ Paper`
  if (shift) {
    const withShift = `${core} – ${shift}`
    if (withShift.length <= budget) core = withShift
    // shift omitted if it would push over 70; it appears in description instead
  }
  return `${truncate(core, budget)}${brand}`
}

/**
 * ~150-char description built from structured fields.
 * Falls back to DB description if it is non-trivial (>40 chars).
 */
export function paperSeoDescription(p: PaperMeta): string {
  const db = p.description?.trim() ?? ''
  if (db.length > 40) return truncate(db, 160)

  const exam = p.examName.trim()
  const year = p.year?.trim() ?? ''
  const shift = p.shift?.trim() ?? ''
  const n = p.questions ?? 0
  const date = fmtDate(p.heldOn)
  const subs = (p.subjects ?? []).slice(0, 3).join(', ')

  let d = `${exam}`
  if (year) d += ` ${year}`
  if (shift) d += ` (${shift})`
  d += ` PYQ`
  if (date && !d.includes(date)) d += ` held on ${date}`
  if (n > 0) d += ` — ${n} questions`
  if (subs) d += `, ${subs}`
  d += `. Solved with answers and explanations, free on ${BRAND}.`
  return truncate(d, 160)
}

// ── Exam hub ───────────────────────────────────────────────────────────────

type ExamHubMeta = {
  slug?: string
  isBoard?: boolean
  shortName: string
  name?: string
  papers?: string | number
  mocks?: string | number
  totalQuestions?: number
  description?: string
}

/** JKSSB Finance Accounts Assistant (FAA) Previous Year Question Papers (PYQ) – Solved */
export function examHubSeoTitle(e: ExamHubMeta): string {
  const qCount = Number(e.totalQuestions ?? 0)
  const pCount = Number(e.papers ?? 0)
  const rawName = (e.name?.trim() || e.shortName).trim()
  const short = (e.shortName ?? '').trim()
  // Ensure the short code (e.g. "JKSSB FAA") is represented if not already in name
  const label = short && !rawName.toLowerCase().includes(short.toLowerCase()) && rawName.length + short.length < 42
    ? `${rawName} (${short})`
    : rawName

  if ((e.isBoard || e.slug === 'jkssb') && qCount > 0) {
    const formatted = qCount.toLocaleString('en-IN')
    return truncate(`${short || label} Previous Year Question Papers (PYQ) – ${formatted}+ Solved MCQs`, 68)
  }
  if (pCount > 1 && qCount > 0) {
    const candidate = `${label} Previous Year Question Papers (PYQ) – ${pCount} Solved Papers`
    if (candidate.length <= 68) return candidate
  }
  const withFull = `${label} Previous Year Question Papers (PYQ) – Solved`
  if (withFull.length <= 68) return withFull
  const withShort = `${label} Previous Year Papers (PYQ) – Solved & Answer Key`
  if (withShort.length <= 68) return withShort
  return truncate(`${label} Previous Year Question Papers (PYQ)`, 68)
}

export function examHubSeoDescription(e: ExamHubMeta): string {
  const qCount = Number(e.totalQuestions ?? 0)
  const p = Number(e.papers ?? 0)
  const db = e.description?.trim() ?? ''
  if ((e.isBoard || e.slug === 'jkssb') && qCount > 0) {
    if (db.length > 50) return truncate(db, 160)
    const formatted = qCount.toLocaleString('en-IN')
    return truncate(
      `Practice ${formatted}+ official ${e.shortName} previous year questions (PYQ) across ${p} solved question papers with official answer keys and detailed explanations on ${BRAND}.`,
      160,
    )
  }
  if (db.length > 50) return truncate(db, 160)

  const label = e.name?.trim() || e.shortName
  const m = Number(e.mocks ?? 0)
  let d = `Solved ${label} previous year question papers (PYQ)`
  if (p > 0 && qCount > 0) d += ` — ${p} official paper${p > 1 ? 's' : ''} (${qCount.toLocaleString('en-IN')} solved MCQs)`
  else if (p > 0) d += ` — ${p} solved paper${p > 1 ? 's' : ''}`
  if (m > 0) d += ` and ${m} free mock test${m > 1 ? 's' : ''}`
  d += ` with official answer keys and step-by-step explanations on ${BRAND}.`
  return truncate(d, 160)
}

// ── Mock test listing ──────────────────────────────────────────────────────

type MockListingMeta = {
  shortName: string
  totalMocks?: number
  freeMocks?: number
  description?: string
}

/** IBPS PO Mock Test Series – Free Practice Tests | Ministry of Papers */
export function mockListingSeoTitle(e: MockListingMeta): string {
  return `${e.shortName} Mock Test Series – Free Practice Tests | ${BRAND}`
}

export function mockListingSeoDescription(e: MockListingMeta): string {
  const total = e.totalMocks ?? 0
  const free = e.freeMocks ?? 0
  let d = `Attempt ${total > 0 ? `${total} ` : ''}${e.shortName} mock tests online`
  if (free > 0) d += ` – ${free} free`
  d += `. Full-length tests with answer key, timer, and subject-wise performance analysis on ${BRAND}.`
  return truncate(d, 160)
}

// ── Individual mock attempt ────────────────────────────────────────────────

type MockAttemptMeta = {
  examName: string
  title: string
  questions?: number
}

/** IBPS PO – Quantitative Aptitude Mock Test | Ministry of Papers */
export function mockAttemptSeoTitle(m: MockAttemptMeta): string {
  return `${m.examName} – ${m.title} | ${BRAND}`
}

export function mockAttemptSeoDescription(m: MockAttemptMeta): string {
  return truncate(
    `Attempt the ${m.examName} mock test online – ${m.questions ?? 0} questions with timer, answer key, and detailed explanations. Free on ${BRAND}.`,
    160,
  )
}

// ── Individual question ────────────────────────────────────────────────────

type QuestionMeta = {
  examName: string
  year?: string
  questionNo?: string
  question: string
  answer?: string
}

/**
 * IBPS PO 2025 Q.12: Which of the following… | Ministry of Papers
 * Falls back to truncated prefix when exam name is too long for a snippet.
 */
export function questionSeoTitle(q: QuestionMeta): string {
  // Lead with the question text — that is what users type into search, and it
  // is the strongest ranking signal for a Q&A page (matches Testbook et al.).
  // The exam/paper context lives in the H1, breadcrumb and on-page content.
  const brand = ` | ${BRAND}`
  const snippet = truncate(strip(stripQuestionNumberPrefix(q.question)), 70 - brand.length)
  return `${snippet}${brand}`
}

export function questionSeoDescription(q: QuestionMeta): string {
  const clean = strip(stripQuestionNumberPrefix(q.question))
  const base = truncate(clean, 120)
  const suffix = q.answer ? ` Answer with explanation on ${BRAND}.` : ` Explained on ${BRAND}.`
  return truncate(base + suffix, 160)
}

// ── Exam analytics ─────────────────────────────────────────────────────────

type AnalyticsMeta = {
  examName: string
  attempts?: number
  avgAccPct?: number
}

/** IBPS PO Analytics – Score vs Cutoff | Ministry of Papers */
export function analyticsSeoTitle(a: AnalyticsMeta): string {
  return `${a.examName} Analytics – Score vs Cutoff | ${BRAND}`
}

export function analyticsSeoDescription(a: AnalyticsMeta): string {
  let d = `Your ${a.examName} performance`
  if (a.attempts) d += ` across ${a.attempts} attempt${a.attempts !== 1 ? 's' : ''}`
  if (a.avgAccPct) d += ` – avg accuracy ${a.avgAccPct}%`
  d += `. Subject mastery, percentile estimate, and cutoff comparison on ${BRAND}.`
  return truncate(d, 160)
}

// ── Paper attempt (exam hall) ──────────────────────────────────────────────

/** IBPS PO 2025 Attempt – 1st Shift | Ministry of Papers */
export function paperAttemptSeoTitle(p: PaperMeta): string {
  const exam = p.examName.trim()
  const year = p.year?.trim() ?? ''
  const shift = p.shift?.trim() ?? ''
  let core = `${exam}${year ? ` ${year}` : ''} – Timed Attempt`
  if (shift) core += ` (${shift})`
  return `${core} | ${BRAND}`
}
