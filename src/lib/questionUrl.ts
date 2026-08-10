// Keyword-rich, Testbook-style question URLs: /question/<keywords>--<id>
//
// The segment after the final "--" is the original question slug (a stable,
// unique id), so every URL still resolves by that id and the old bare
// /question/<id> links can be 301-redirected to the canonical keyword URL —
// no backend or database change needed.

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
  const words = (text || '')
    .replace(/\$[^$]*\$/g, ' ')   // drop inline LaTeX math
    .replace(/[*_`#>~|]/g, ' ')   // drop markdown marks
    .toLowerCase()
    .replace(/&/g, ' and ')
    // Devanagari (U+0900–U+097F) is kept alongside a-z0-9 so Hindi questions get
    // real keywords instead of collapsing to the bare id.
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
