import { splitTableBlocks } from './textTables'

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

/**
 * The rows of any data table in the question, normalised for comparison.
 *
 * Matching on a leading "|" is not enough: these papers write rows as
 * "6 | 4 | 2 | 12 | ?" with no outer pipes, so the last row of a "find the
 * missing value" table ends in "?" and wins the "line that is asked" rule
 * outright — the heading becomes "6 | 4 | 2 | 12 | ?".
 *
 * splitTableBlocks is the same detector the renderers use, so a line is
 * discarded here exactly when it is drawn as a table row there.
 */
function tableRowKeys(question: string): Set<string> {
  const keys = new Set<string>()
  for (const seg of splitTableBlocks(question)) {
    if (seg.kind !== 'table') continue
    for (const row of seg.rows) keys.add(row.join(' '))
  }
  return keys
}

const rowKey = (line: string) => line.split('|').map(c => c.trim()).join(' ')

/**
 * Mirror of worker.ts isGenericStem(): an instruction-shaped line that names no
 * subject matter of its own ("Select the correct statements about…", "Which of
 * the following pairs are correctly matched?"). Dozens of papers share these,
 * so as an <h1> they make distinct pages look like duplicates.
 */
const GENERIC_STEM: RegExp[] = [
  /\babove\b/i,
  /^(passage|match list|directions?)\b/i,
  /^(select|choose|identify|pick)\b/i,
  /^in the (passage|sentence|following)\b/i,
  /^a sentence is provided\b/i,
  /^(which|how many)\b.*\b(statements?|pairs?|assumptions?|conclusions?)\b/i,
]

function isGenericStem(line: string): boolean {
  const t = line.replace(/\s+/g, ' ').trim()
  if (!t) return true
  if (GENERIC_STEM.some(re => re.test(t))) return true
  return t.length < 45
}

const HEADING_JOIN_CAP = 150

/**
 * Statement-list items have no line ending in "?", so the rule below falls back
 * to the opening instruction. Append the question's own next content line so the
 * heading names the actual topic. Must stay in step with worker.ts.
 *
 * URLs are unaffected — keywordify() reads the question text, not the heading.
 */
function expandGenericHeading(lines: string[], heading: string): string {
  if (lines.length <= 2 || !isGenericStem(heading)) return heading
  // The asked line was boilerplate; the opening line may carry the topic.
  const base = lines[0]
  if (!isGenericStem(base)) return base
  const next = lines.find(l => l !== base && l !== heading
    && l.length >= 12 && !isGenericStem(l))
  if (!next) return heading
  const joined = `${base.replace(/[\s:;,]+$/, '')} ${next}`
  return joined.length > HEADING_JOIN_CAP
    ? joined.slice(0, HEADING_JOIN_CAP - 1).trimEnd() + '…'
    : joined
}

export function questionHeadingLine(question: string): string {
  // Every rule below can return a line that identifies nothing, so the rescue
  // is applied to the result rather than inside one branch. worker.ts wraps
  // substantiveQuestionLine() the same way; if only some paths were rescued
  // here, a crawler and a reader would see different headings on the same page.
  const lines = headingLines(question)
  return expandGenericHeading(lines, pickHeadingLine(question))
}

function headingLines(question: string): string[] {
  const inTable = tableRowKeys(question)
  return question
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('|') && !FIGURE_ONLY.test(l) && !inTable.has(rowKey(l)))
}

function pickHeadingLine(question: string): string {
  const inTable = tableRowKeys(question)
  const lines = question
    .split('\n')
    .map(l => l.trim())
    // A line that is only a figure token is the diagram, not the question, and
    // must never become the <h1> — "…provided below. MARKET" reads as a stray
    // word and drags the styled figure into the heading.
    .filter(l => l && !l.startsWith('|') && !FIGURE_ONLY.test(l) && !inTable.has(rowKey(l)))
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
