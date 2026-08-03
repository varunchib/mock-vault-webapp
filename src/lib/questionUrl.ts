// Keyword-rich, Testbook-style question URLs: /question/<keywords>--<id>
//
// The segment after the final "--" is the original question slug (a stable,
// unique id), so every URL still resolves by that id and the old bare
// /question/<id> links can be 301-redirected to the canonical keyword URL —
// no backend or database change needed.

/** Turn question text into a short, hyphenated keyword slug for the URL. */
export function keywordify(text: string): string {
  return (text || '')
    .replace(/\$[^$]*\$/g, ' ')   // drop inline LaTeX math
    .replace(/[*_`#>~|]/g, ' ')   // drop markdown marks
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')  // non-alphanumerics → hyphen
    .replace(/^-+|-+$/g, '')
    .split('-')
    .filter(Boolean)
    .slice(0, 12)                 // cap the number of words
    .join('-')
    .slice(0, 80)
    .replace(/-+$/g, '')
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
