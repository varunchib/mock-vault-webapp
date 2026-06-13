import type { MockItem } from './api'

const mockAttemptKey  = 'ministryofpapers.mock.attempts.v1'
const mockResultKey   = 'ministryofpapers.mock.results.v2'
const paperResultKey  = 'ministryofpapers.paper.results.v1'

export type MockAttemptRecord = {
  mockSlug: string
  examSlug: string
  attemptedAt: string
}

export type SubjectResult = {
  subject: string
  total: number
  correct: number
  wrong: number
  skipped: number
}

export type MockAttemptResult = {
  mockSlug: string
  examSlug: string
  examName: string
  mockTitle: string
  totalQuestions: number
  attemptedAt: string
  answered: number
  correct: number
  wrong: number
  skipped: number
  rawScore?: number
  maxMarks?: number
  negativeMarking?: number
  timeTakenSeconds: number
  subjects: SubjectResult[]
}

// ── legacy attempt tracking ───────────────────────────────────────────────

export function readMockAttempts(): MockAttemptRecord[] {
  const raw = window.localStorage.getItem(mockAttemptKey)
  if (!raw) return []
  try { return JSON.parse(raw) as MockAttemptRecord[] }
  catch { window.localStorage.removeItem(mockAttemptKey); return [] }
}

export function recordMockAttempt(mock: MockItem) {
  const next: MockAttemptRecord = { mockSlug: mock.slug, examSlug: mock.examSlug, attemptedAt: new Date().toISOString() }
  const records = readMockAttempts().filter((r) => r.mockSlug !== mock.slug)
  window.localStorage.setItem(mockAttemptKey, JSON.stringify([next, ...records].slice(0, 20)))
}

export function orderMocksByAttempt(mocks: MockItem[]) {
  const order = new Map(readMockAttempts().map((r, i) => [r.mockSlug, i]))
  return mocks.filter((m) => order.has(m.slug)).sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0))
}

// ── mock rich result storage ──────────────────────────────────────────────

export function readAttemptResults(): MockAttemptResult[] {
  const raw = window.localStorage.getItem(mockResultKey)
  if (!raw) return []
  try { return JSON.parse(raw) as MockAttemptResult[] }
  catch { window.localStorage.removeItem(mockResultKey); return [] }
}

export function saveAttemptResult(result: MockAttemptResult) {
  const existing = readAttemptResults().filter((r) => r.mockSlug !== result.mockSlug || r.attemptedAt !== result.attemptedAt)
  window.localStorage.setItem(mockResultKey, JSON.stringify([result, ...existing].slice(0, 50)))
}

// ── PYQ paper result storage ──────────────────────────────────────────────

export type PaperAttemptResult = {
  paperSlug: string
  examSlug: string
  examName: string
  paperTitle: string
  totalQuestions: number
  attemptedAt: string
  answered: number
  correct: number
  wrong: number
  skipped: number
  rawScore?: number
  maxMarks?: number
  negativeMarking?: number
  timeTakenSeconds: number
  subjects: SubjectResult[]
}

export function readPaperResults(): PaperAttemptResult[] {
  const raw = window.localStorage.getItem(paperResultKey)
  if (!raw) return []
  try { return JSON.parse(raw) as PaperAttemptResult[] }
  catch { window.localStorage.removeItem(paperResultKey); return [] }
}

export function savePaperResult(result: PaperAttemptResult) {
  const existing = readPaperResults().filter((r) => r.paperSlug !== result.paperSlug || r.attemptedAt !== result.attemptedAt)
  window.localStorage.setItem(paperResultKey, JSON.stringify([result, ...existing].slice(0, 50)))
}

// ── Unified combined type + reader ────────────────────────────────────────

export type CombinedResult = {
  type: 'mock' | 'paper'
  slug: string
  examSlug: string
  examName: string
  title: string
  totalQuestions: number
  attemptedAt: string
  answered: number
  correct: number
  wrong: number
  skipped: number
  rawScore?: number
  maxMarks?: number
  negativeMarking?: number
  timeTakenSeconds: number
  subjects: SubjectResult[]
}

export function readAllResults(examSlug?: string): CombinedResult[] {
  const mocks: CombinedResult[] = readAttemptResults()
    .filter((r) => !examSlug || r.examSlug === examSlug)
    .map((r) => ({
      type: 'mock' as const,
      slug: r.mockSlug,
      examSlug: r.examSlug,
      examName: r.examName,
      title: r.mockTitle,
      totalQuestions: r.totalQuestions,
      attemptedAt: r.attemptedAt,
      answered: r.answered,
      correct: r.correct,
      wrong: r.wrong,
      skipped: r.skipped,
      timeTakenSeconds: r.timeTakenSeconds,
      subjects: r.subjects,
    }))

  const papers: CombinedResult[] = readPaperResults()
    .filter((r) => !examSlug || r.examSlug === examSlug)
    .map((r) => ({
      type: 'paper' as const,
      slug: r.paperSlug,
      examSlug: r.examSlug,
      examName: r.examName,
      title: r.paperTitle,
      totalQuestions: r.totalQuestions,
      attemptedAt: r.attemptedAt,
      answered: r.answered,
      correct: r.correct,
      wrong: r.wrong,
      skipped: r.skipped,
      rawScore: r.rawScore,
      maxMarks: r.maxMarks,
      negativeMarking: r.negativeMarking,
      timeTakenSeconds: r.timeTakenSeconds,
      subjects: r.subjects,
    }))

  // Oldest-first so trend charts show chronological progress
  return [...mocks, ...papers].sort(
    (a, b) => new Date(a.attemptedAt).getTime() - new Date(b.attemptedAt).getTime(),
  )
}
