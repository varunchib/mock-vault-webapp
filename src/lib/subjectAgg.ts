import type { CombinedResult } from './mockActivity'

export type SubjectAgg = {
  subject: string
  total: number
  correct: number
  wrong: number
  skipped: number
  accuracy: number // correct / attempted (answered) questions
  attempted: number
}

/** Aggregate per-subject performance across a set of attempts. */
export function aggregateSubjects(results: CombinedResult[]): SubjectAgg[] {
  const map = new Map<string, SubjectAgg>()
  for (const r of results) {
    for (const s of r.subjects ?? []) {
      const key = s.subject || 'General'
      const agg = map.get(key) ?? { subject: key, total: 0, correct: 0, wrong: 0, skipped: 0, accuracy: 0, attempted: 0 }
      agg.total += s.total
      agg.correct += s.correct
      agg.wrong += s.wrong
      agg.skipped += s.skipped
      map.set(key, agg)
    }
  }
  const list = [...map.values()]
  for (const a of list) {
    a.attempted = a.correct + a.wrong
    a.accuracy = a.attempted > 0 ? Math.round((a.correct / a.attempted) * 100) : 0
  }
  // Strongest first — the weak tail reads naturally at the bottom
  return list.sort((a, b) => b.accuracy - a.accuracy)
}
