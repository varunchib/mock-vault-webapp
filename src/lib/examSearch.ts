import type { Exam } from './api'

/**
 * Single source of truth for exam search — used by the topbar (AppShell) and
 * the /exams catalog page, so the two can never disagree about what matches.
 *
 * Matches exam NAMES only (name + shortName). Matching category/description/
 * subjects as well meant common words ("exam", "paper", "general") hit nearly
 * every exam via prose.
 *
 * Boards are held back. Searching "upsc" used to return the UPSC *board* above
 * UPSC CSE, and a board page is a hub that lists its sub-exams — so clicking
 * the top result landed on something that reads like the catalog again rather
 * than on the exam. Nobody sits a board; they sit an exam. Boards resurface
 * only when nothing else matches, so a query aimed squarely at one ("Staff
 * Selection Commission") still finds it instead of returning nothing.
 *
 * `exams` must be the FULL catalog — the board/sub-exam relationship is read
 * from it, so a pre-filtered slice would hide the children that make a board a
 * board. Filter by category after searching, not before.
 *
 * Returns [] for an empty query — callers decide what to show when idle.
 */
export function searchExams(exams: Exam[], query: string, limit?: number): Exam[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const boardSlugs = new Set(
    exams.map((e) => e.boardSlug).filter((s): s is string => Boolean(s)),
  )
  const tokens = q.split(/\s+/).filter(Boolean)
  const ranked: { exam: Exam; rank: number }[] = []
  const boardMatches: { exam: Exam; rank: number }[] = []

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
    ;(boardSlugs.has(exam.slug) ? boardMatches : ranked).push({ exam, rank })
  }

  // Best match first; shorter names win ties so "UPSC CDS" outranks a longer
  // name that merely contains the same words.
  const byRank = (a: { exam: Exam; rank: number }, b: { exam: Exam; rank: number }) =>
    a.rank - b.rank || a.exam.name.length - b.exam.name.length
  ranked.sort(byRank)

  // Only a board matched — show it rather than claiming there are no results.
  const hits = ranked.length ? ranked : boardMatches.sort(byRank)

  const out = hits.map((r) => r.exam)
  return limit ? out.slice(0, limit) : out
}
