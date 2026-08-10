/**
 * The one line that identifies a question — used for the page <h1> and for the
 * label on every "Related questions" link.
 *
 * Prefer the line actually being asked. Assertion & Reason items have none (no
 * line ends in "?") and their last line is the rubric shared by every such
 * question, so fall back to the Assertion, which is the substance and is unique
 * per question. Table rows are dropped so a heading is never a "|" row.
 *
 * Passage-led comprehension items ask their question as a stem ending in ":",
 * so neither rule fires and the first line — the shared passage header — used
 * to win. Prefer the last stem line instead, skipping rubric boilerplate.
 *
 * The worker keeps its own copy of this rule for the SSR heading; the two must
 * agree, or a crawler and a reader see different headings on the same page.
 */
// Trailing labels ("Conclusions:", "Statements:") end in ":" but name nothing,
// so they are excluded both by name and by a six-word floor.
// A line consisting solely of a flip/figure token, e.g. "[[waterline:MARKET]]".
const FIGURE_ONLY = /^\[\[(?:fig|waterline|water|mirror|rotate):[^\]\n]+\]\]$/

const RUBRIC_LINE =
  /^(select|choose|consider|options?|codes?|conclusions?|statements?|directions?|instructions?|read|study|answer)\b/i
const STEM_MIN_WORDS = 6

export function questionHeadingLine(question: string): string {
  const lines = question
    .split('\n')
    .map(l => l.trim())
    // A line that is only a figure token is the diagram, not the question, and
    // must never become the <h1> — "…provided below. MARKET" reads as a stray
    // word and drags the styled figure into the heading.
    .filter(l => l && !l.startsWith('|') && !FIGURE_ONLY.test(l))
  if (!lines.length) return question
  if (lines.length <= 2) return lines.join(' ')

  const asked = [...lines].reverse().find(l => l.replace(/[*_]/g, '').trim().endsWith('?'))
  if (asked) return asked

  const assertion = lines.find(l => /^\**\s*Assertion\s*\(A\)\s*:/i.test(l))
  if (assertion) return assertion.replace(/^\**\s*Assertion\s*\(A\)\s*:\s*/i, '')

  const stem = [...lines].reverse().find(l => {
    const plain = l.replace(/[*_]/g, '').trim()
    return plain.endsWith(':') && !RUBRIC_LINE.test(plain) && plain.split(/\s+/).length >= STEM_MIN_WORDS
  })
  if (stem) return stem

  return lines[0]
}
