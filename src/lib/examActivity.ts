import type { Exam } from './api'

const VIEWED_KEY = 'ministryofpapers.exam.viewed.v1'
const MAX_VIEWED = 6

export type ExamViewRecord = {
  slug: string
  shortName: string
  icon: string
  category: string
  viewedAt: string
}

export function recordExamView(exam: Exam): void {
  const next: ExamViewRecord = {
    slug: exam.slug,
    shortName: exam.shortName,
    icon: exam.icon,
    category: exam.category,
    viewedAt: new Date().toISOString(),
  }
  const prev = readRecentlyViewed().filter((r) => r.slug !== exam.slug)
  window.localStorage.setItem(VIEWED_KEY, JSON.stringify([next, ...prev].slice(0, MAX_VIEWED)))
}

export function readRecentlyViewed(): ExamViewRecord[] {
  const raw = window.localStorage.getItem(VIEWED_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as ExamViewRecord[]
  } catch {
    window.localStorage.removeItem(VIEWED_KEY)
    return []
  }
}
