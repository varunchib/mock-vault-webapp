import type { Exam } from './api'

/**
 * Single source of truth for the board/sub-exam hierarchy.
 *
 * The hierarchy is explicit in the database: vaultcore.exams.board_slug is a
 * self-referencing FK ("jkssb-patwari".board_slug = "jkssb"), with an index.
 * Prefer it. Slug-prefix matching is only a fallback for API responses served
 * before boardSlug shipped — it is a guess, and it guesses wrong: the FAA paper
 * is slugged `jkssb-finance-accounts-…`, which shares no prefix with `jkssb-faa`.
 *
 * This logic previously lived inline in ExamCatalogPage and ExamPage. Keep it
 * here — duplicated copies are exactly how the two exam searches drifted apart.
 */

/** True when the catalog carries the real hierarchy, so we needn't guess. */
function hasBoardData(all: Exam[]): boolean {
  return all.some((e) => Boolean(e.boardSlug))
}

/** True when other exams nest under this slug (i.e. it is a board, not a sat exam). */
export function isBoardSlug(slug: string, all: Exam[]): boolean {
  if (hasBoardData(all)) return all.some((e) => e.boardSlug === slug)
  return all.some((e) => e.slug !== slug && e.slug.startsWith(slug + '-'))
}

/** Boards and standalone exams — drops anything nested under another exam. */
export function topLevelBoards(all: Exam[]): Exam[] {
  if (hasBoardData(all)) return all.filter((e) => !e.boardSlug)
  const slugs = new Set(all.map((e) => e.slug))
  return all.filter(
    (e) => !all.some((o) => o.slug !== e.slug && e.slug.startsWith(o.slug + '-') && slugs.has(o.slug)),
  )
}

/** The exams sitting under a board (JKSSB -> JKSSB Patwari, JKSSB FAA, ...). */
export function subExamsOf(slug: string, all: Exam[]): Exam[] {
  if (hasBoardData(all)) return all.filter((e) => e.boardSlug === slug)
  return all.filter((e) => e.slug !== slug && e.slug.startsWith(slug + '-'))
}

/**
 * Drops boards from a list keyed by exam slug — for places that should only show
 * an exam a candidate actually sits ("JKSSB Junior Assistant", not "JKSSB").
 * Generic over the item so it works for Exam[] and for stored view records.
 */
export function withoutBoards<T extends { slug: string }>(items: T[], all: Exam[]): T[] {
  if (all.length === 0) return items // catalog not loaded yet — don't hide anything
  return items.filter((i) => !isBoardSlug(i.slug, all))
}
