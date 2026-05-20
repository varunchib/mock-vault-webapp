import type { MockItem } from './api'

const mockAttemptKey = 'ministryofpapers.mock.attempts.v1'

export type MockAttemptRecord = {
  mockSlug: string
  examSlug: string
  attemptedAt: string
}

export function readMockAttempts(): MockAttemptRecord[] {
  const raw = window.localStorage.getItem(mockAttemptKey)
  if (!raw) return []

  try {
    return JSON.parse(raw) as MockAttemptRecord[]
  } catch {
    window.localStorage.removeItem(mockAttemptKey)
    return []
  }
}

export function recordMockAttempt(mock: MockItem) {
  const nextRecord: MockAttemptRecord = {
    mockSlug: mock.slug,
    examSlug: mock.examSlug,
    attemptedAt: new Date().toISOString(),
  }
  const records = readMockAttempts().filter((record) => record.mockSlug !== mock.slug)
  window.localStorage.setItem(mockAttemptKey, JSON.stringify([nextRecord, ...records].slice(0, 20)))
}

export function orderMocksByAttempt(mocks: MockItem[]) {
  const attemptOrder = new Map(readMockAttempts().map((record, index) => [record.mockSlug, index]))

  return mocks
    .filter((mock) => attemptOrder.has(mock.slug))
    .sort((left, right) => (attemptOrder.get(left.slug) ?? 0) - (attemptOrder.get(right.slug) ?? 0))
}
