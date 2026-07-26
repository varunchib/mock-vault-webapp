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

// Collapse the many granular question subjects (Geography, Economy, Agriculture,
// Current Affairs, J&K Studies, Wildlife, …) into a handful of syllabus-level
// buckets, so "Subject strength" reads as Mathematics / Reasoning / English /
// Polity / General Studies rather than a long, noisy list. First matching rule
// wins; edit the rules to re-bucket. Anything unmatched falls under General Studies.
const SUBJECT_RULES: Array<[RegExp, string]> = [
  [/quant|math|numeric|arithmetic/i, 'Mathematics'],
  [/reason|mental ability|logical|intelligence/i, 'Reasoning'],
  [/english|comprehension|verbal|\blanguage\b/i, 'English'],
  [/polity|governance|constitution|civics/i, 'Polity'],
]

export function normalizeSubject(raw: string): string {
  const s = (raw || '').trim()
  if (!s) return 'General Studies'
  for (const [re, canon] of SUBJECT_RULES) if (re.test(s)) return canon
  return 'General Studies'
}

/** Aggregate per-subject performance across a set of attempts. */
export function aggregateSubjects(results: CombinedResult[]): SubjectAgg[] {
  const map = new Map<string, SubjectAgg>()
  for (const r of results) {
    for (const s of r.subjects ?? []) {
      const key = normalizeSubject(s.subject)
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
