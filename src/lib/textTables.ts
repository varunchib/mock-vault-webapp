/**
 * Detects pipe-delimited tables inside question text.
 *
 * Several papers carry real tables — a frequency distribution, a letter matrix,
 * a grid of values — that arrive from the source as plain lines of "a | b | c".
 * Rendered as text they are unreadable: the columns do not line up, and on a
 * phone they wrap mid-row into nonsense. They have to become real <table>
 * markup, in the app and in the server-rendered HTML alike.
 *
 * Kept here rather than inside a component because MathText (the app) and
 * worker.ts (the crawler's HTML) must agree exactly. A row that becomes a table
 * for readers but stays raw text for Google is a content mismatch on a page
 * whose whole purpose is being indexed.
 *
 * The detection is deliberately strict, because a stray pipe in ordinary prose
 * must never turn a paragraph into a table:
 *   • at least two consecutive lines,
 *   • every line contains at least one pipe,
 *   • every line has the SAME number of pipes.
 * A ragged run fails all three and is left as text.
 */

export type TextSegment =
  | { kind: 'text'; content: string }
  | { kind: 'table'; rows: string[][] }

const MIN_ROWS = 2

function pipeCount(line: string): number {
  let n = 0
  for (const ch of line) if (ch === '|') n++
  return n
}

function cells(line: string): string[] {
  return line.split('|').map(c => c.trim())
}

export function splitTableBlocks(text: string): TextSegment[] {
  if (!text || !text.includes('|')) return [{ kind: 'text', content: text ?? '' }]

  const lines = text.split('\n')
  const out: TextSegment[] = []
  let buffer: string[] = []

  const flushText = () => {
    if (buffer.length) {
      out.push({ kind: 'text', content: buffer.join('\n') })
      buffer = []
    }
  }

  let i = 0
  while (i < lines.length) {
    const count = pipeCount(lines[i])
    if (count === 0) {
      buffer.push(lines[i])
      i++
      continue
    }

    // Gather the run of lines carrying the same number of pipes.
    let j = i
    while (j < lines.length && pipeCount(lines[j]) === count) j++

    if (j - i >= MIN_ROWS) {
      flushText()
      out.push({ kind: 'table', rows: lines.slice(i, j).map(cells) })
    } else {
      for (let k = i; k < j; k++) buffer.push(lines[k])
    }
    i = j
  }

  flushText()
  return out
}

/**
 * Flattens a table back to a readable sentence, for the places that take plain
 * text rather than markup — a meta description, or the text a crawler reads
 * when it does not render the page. "5 | 2 | 3" reads as nothing; "5, 2, 3"
 * at least parses as a list.
 */
export function tableToText(rows: string[][]): string {
  return rows.map(r => r.filter(Boolean).join(', ')).join('; ')
}
