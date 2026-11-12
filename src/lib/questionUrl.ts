// Keyword-rich, Testbook-style question URLs: /question/<keywords>--<id>
//
// The segment after the final "--" is the original question slug (a stable,
// unique id), so every URL still resolves by that id and the old bare
// /question/<id> links can be 301-redirected to the canonical keyword URL —
// without changing question IDs in the database.

export function stripQuestionNumberPrefix(text: string): string {
  return text.replace(/^(\s*)(?:(?:question)\s*#?\s*|q\s*\.?\s*)\d+\s*(?:[.):-]|–|—)\s*/i, '$1')
}

/**
 * Strip paper-level passage range headers such as "**Passage for Questions (96-100)**"
 * or "Directions (Q. 91-95): Read the following passage..." so standalone question pages
 * render the passage cleanly without question-range numbers.
 */
export function cleanPassageText(text: string | undefined | null): string {
  if (!text) return ''
  return text
    .replace(/^\s*(?:\*\*?)?(?:passage|directions?)\s*(?:for\s+questions?)?\s*\(?q?\.?\s*\d+\s*[-–—to]+\s*\d+\)?\s*:?(?:\*\*?)?\s*(?:read\s+the\s+following\s+passage[^\n]*\n+)?\s*/i, '')
    .replace(/^\s*read\s+the\s+following\s+passage\s+and\s+answer[^\n]*\n+\s*/i, '')
    .trim()
}

/**
 * Build a concise, non-repetitive exam/paper appearance badge for a standalone question page
 * (e.g., "JKCCE Prelims 2025 - GS Paper II (Set B)" or "UPSC CSE 2025 · GS Paper I").
 */
export function formatQuestionExamTag(q: { examName?: string; year?: string | number; paper?: string }): string {
  const exam = (q.examName ?? '').trim()
  const year = String(q.year ?? '').trim()
  const paper = (q.paper ?? '').trim()
  if (!paper) return year && !exam.includes(year) ? `${exam} (${year})` : exam

  // Extract acronym inside parentheses if present, e.g. "JKPSC Combined Competitive Examination (JKCCE)" -> "JKCCE"
  const parenAcronym = exam.match(/\(([A-Z0-9\s-]{3,})\)/)?.[1]?.trim()
  const firstWord = exam.split(/\s+/)[0] ?? ''
  const paperHasExam =
    paper.toLowerCase().includes(exam.toLowerCase()) ||
    (parenAcronym && paper.toLowerCase().includes(parenAcronym.toLowerCase())) ||
    (firstWord.length >= 3 && paper.toLowerCase().startsWith(firstWord.toLowerCase()))

  if (paperHasExam) {
    if (year && !paper.includes(year)) return `${paper} (${year})`
    return paper
  }
  const baseExam = parenAcronym ? exam.replace(/\s*\([^)]+\)/, ` (${parenAcronym})`) : exam
  return `${baseExam}${year && !baseExam.includes(year) ? ` ${year}` : ''} · ${paper}`
}

/**
 * Turn question text into a short, hyphenated keyword slug for the URL.
 *
 * MUST stay byte-identical to keywordify() in
 * mock-vault-webservice/internal/httpapi/server.go — Go builds the sitemap URL
 * and this builds the canonical link, so any divergence makes the sitemap
 * advertise a URL the page itself disowns ("Page with redirect" in Search
 * Console). Both sides are pinned by the same fixtures: score_test.go's
 * TestKeywordify and scripts/check-keywordify.mjs.
 */
export function keywordify(text: string): string {
  const words = stripQuestionNumberPrefix(text || '')
    .replace(/\$[^$]*\$/g, ' ')   // drop inline LaTeX math
    .replace(/[*_`#>~|]/g, ' ')   // drop markdown marks
    .toLowerCase()
    .replace(/&/g, ' and ')
    // Devanagari (U+0900–U+097F) is kept alongside a-z0-9 so Hindi questions get
    // real keywords instead of collapsing to the bare id.
    // eslint-disable-next-line no-misleading-character-class -- Preserve the exact Devanagari range mirrored by the Go sitemap generator.
    .replace(/[^a-z0-9ऀ-ॿ]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .split('-')
    .filter(Boolean)
    .slice(0, 12)                 // cap the number of words
    .join('-')
  // Cap by CODE POINTS, not UTF-16 units, to match Go's rune cap. For pure-ASCII
  // text this is identical to the previous .slice(0, 80), so English URLs are
  // unchanged.
  return Array.from(words).slice(0, 80).join('').replace(/-+$/g, '')
}

/** Canonical path for a question: /question/<keywords>--<id> (falls back to /question/<id>). */
export function questionPath(slug: string, questionText: string): string {
  const kw = keywordify(questionText)
  return kw ? `/question/${kw}--${slug}` : `/question/${slug}`
}

/** Recover the stable question id from a URL param, whether keyword-prefixed or bare. */
export function questionRealSlug(param: string): string {
  const i = param.lastIndexOf('--')
  return i >= 0 ? param.slice(i + 2) : param
}
