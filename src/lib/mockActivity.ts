import type { MockItem } from './api'

const mockAttemptKey = 'ministryofpapers.mock.attempts.v1'
const mockResultKey  = 'ministryofpapers.mock.results.v2'

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

// ── rich result storage ───────────────────────────────────────────────────

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
