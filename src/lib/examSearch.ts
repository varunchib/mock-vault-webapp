import type { Exam } from './api'

/**
 * Single source of truth for exam search — used by the topbar (AppShell) and
 * the /exams catalog page, so the two can never disagree about what matches.
 *
 * Matches exam NAMES only (name + shortName). Matching category/description/
 * subjects as well meant common words ("exam", "paper", "general") hit nearly
 * every exam via prose.
 *
 * Returns [] for an empty query — callers decide what to show when idle.
 */
export function searchExams(exams: Exam[], query: string, limit?: number): Exam[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const tokens = q.split(/\s+/).filter(Boolean)
  const ranked: { exam: Exam; rank: number }[] = []

  for (const exam of exams) {
    const short = exam.shortName.toLowerCase()
    const name = exam.name.toLowerCase()
    // Every word must appear somewhere rather than the query matching as one
    // contiguous string, so "upsc cds" still finds "UPSC Combined Defence
    // Services (CDS)" where the words are far apart.
    const haystack = `${short} ${name}`
    if (!tokens.every((t) => haystack.includes(t))) continue

    const rank =
      short === q || name === q ? 0
        : short.startsWith(q) || name.startsWith(q) ? 1
          : 2
    ranked.push({ exam, rank })
  }

  // Best match first; shorter names win ties so "UPSC CDS" outranks a longer
  // name that merely contains the same words.
  ranked.sort((a, b) => a.rank - b.rank || a.exam.name.length - b.exam.name.length)

  const out = ranked.map((r) => r.exam)
  return limit ? out.slice(0, limit) : out
}
