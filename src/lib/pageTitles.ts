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
 * IBPS PO 2025 Question Paper – 1st Shift | Ministry of Papers
 * UPSC CSE Prelims 2024 – GS Paper 1 | Ministry of Papers
 */
export function paperSeoTitle(p: PaperMeta): string {
  const exam = p.examName.trim()
  const year = p.year?.trim() ?? ''
  const shift = p.shift?.trim() ?? ''

  let core = exam
  if (year) core += ` ${year}`
  core += ' Question Paper'
  if (shift) core += ` – ${shift}`
  return `${core} | ${BRAND}`
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

  let d = `Solve ${n > 0 ? `all ${n} ` : ''}questions from ${exam}`
  if (year) d += ` ${year}`
  if (shift) d += ` (${shift})`
  if (date && !d.includes(date)) d += ` held on ${date}`
  d += ' previous year paper'
  if (subs) d += ` – ${subs}`
  d += `. Detailed answers and explanations, free on ${BRAND}.`
  return truncate(d, 160)
}

// ── Exam hub ───────────────────────────────────────────────────────────────

type ExamHubMeta = {
  shortName: string
  name?: string
  papers?: string | number
  mocks?: string | number
  description?: string
}

/** IBPS PO – Previous Year Papers & Mock Tests | Ministry of Papers */
export function examHubSeoTitle(e: ExamHubMeta): string {
  return `${e.shortName} – Previous Year Papers & Mock Tests | ${BRAND}`
}

export function examHubSeoDescription(e: ExamHubMeta): string {
  const db = e.description?.trim() ?? ''
  if (db.length > 40) return truncate(db, 160)

  const p = Number(e.papers ?? 0)
  const m = Number(e.mocks ?? 0)
  let d = `Practice ${e.shortName} with`
  if (p > 0) d += ` ${p} solved previous year papers`
  if (p > 0 && m > 0) d += ' and'
  if (m > 0) d += ` ${m} full-length mock tests`
  d += `. Detailed answers, subject analysis, and cutoff comparison – free on ${BRAND}.`
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
 * (kept under 65 chars before the brand)
 */
export function questionSeoTitle(q: QuestionMeta): string {
  const prefix = `${q.examName}${q.year ? ` ${q.year}` : ''}${q.questionNo ? ` Q.${q.questionNo}` : ''}`
  const snippet = truncate(strip(q.question), 60 - prefix.length - 2)
  return `${prefix}: ${snippet} | ${BRAND}`
}

export function questionSeoDescription(q: QuestionMeta): string {
  const clean = strip(q.question)
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
