import { MathText } from './MathText'
import { removeRedundantAnswerLead } from '../../lib/explanationText'

/**
 * Renders a solution/explanation with a clean, point-wise structure so it
 * always reads like an uncluttered, scannable "Detailed Solution" (headings,
 * bullet points, nested points, tables, bold labels) instead of a dense wall
 * of paragraphs.
 *
 * In addition to explicit markdown (## Heading, - bullet, 1. numbered, | table |),
 * this parser automatically upgrades dense single-paragraph explanations:
 *   - Inline markers like "*Why other options fail:*" or "**Key Points:**"
 *     are split into proper section headings + bullet lists.
 *   - Multi-sentence plain paragraphs (>180 chars, 2+ sentences) are split
 *     into a concise lead sentence followed by clean bullet points.
 */

type ListItem = { text: string; sub: string[] }
type Block =
  | { t: 'p'; text: string; lead?: boolean }
  | { t: 'h'; text: string }
  | { t: 'ul'; ordered: boolean; items: ListItem[] }
  | { t: 'table'; head: string[]; rows: string[][] }

function tableCells(line: string): string[] {
  return line.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())
}
function isTableSep(line: string): boolean {
  return /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(line) && line.includes('-')
}
function isTableRow(line: string): boolean {
  return line.trim().startsWith('|') && line.includes('|', 1)
}

const HEADING_ICON: Record<string, string> = {
  'key points': '🔑',
  'important points': '🔑',
  'additional information': 'ℹ️',
  'why other options fail': '⚖️',
  'why other options are incorrect': '⚖️',
  'option analysis': '⚖️',
  'confusion points': '⚠️',
  hint: '💡',
  'exam tip': '💡',
  explanation: '📝',
}

// Inline section markers that often appear inside a single paragraph
const INLINE_SECTION_RE =
  /(?:^|\s+)(?:\*{1,2}|_)(Why\s+other\s+options\s+(?:fail|are\s+incorrect|are\s+wrong|miss)|Key\s+Points|Important\s+Points|Additional\s+Information|Exam\s+Tip|Hint)\s*:?\s*(?:\*{1,2}|_)\s*:?\s*/gi

const ABBREV_END_RE =
  /\b(?:Dr|Mr|Mrs|Ms|Prof|Rs|St|Pt|No|Art|Sec|Fig|vs|etc|i\.e|e\.g|viz|approx|Govt|Dept|Univ|Assn|Bros|Inc|Ltd|Co|Corp|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec|[A-Z]|[IVX]{1,4})\.$/

/**
 * Splits a dense paragraph into clean sentences without breaking inside
 * KaTeX math ($...$), parentheses (...), or after common abbreviations.
 */
function splitSentencesSafely(text: string): string[] {
  const results: string[] = []
  let current = ''
  let inMath = false
  let parenDepth = 0

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '$' && text[i - 1] !== '\\') {
      inMath = !inMath
    } else if (!inMath) {
      if (ch === '(' || ch === '[') parenDepth++
      else if ((ch === ')' || ch === ']') && parenDepth > 0) parenDepth--
    }
    current += ch

    if (!inMath && parenDepth === 0 && (ch === '.' || ch === '?' || ch === '!')) {
      const next = text[i + 1]
      const afterNext = text[i + 2] ?? ''
      if (next === ' ' && /[A-Z*“"'(0-9]/.test(afterNext)) {
        const trimmed = current.trim()
        if (!ABBREV_END_RE.test(trimmed)) {
          results.push(trimmed)
          current = ''
          i++ // skip space
        }
      }
    }
  }
  if (current.trim()) results.push(current.trim())
  return results
}

/**
 * Pre-normalizes raw explanation text so inline "*Why other options fail:*"
 * and semicolon-separated option breakdowns become real headings and bullets.
 */
function normalizeRawExplanation(raw: string): string {
  let text = raw.replace(/\r/g, '')
  text = text.replace(INLINE_SECTION_RE, (_m, headingRaw: string) => {
    const cleanH = headingRaw.trim()
    return `\n\n## ${cleanH}\n`
  })

  // If there is a "## Why other options..." section followed by semicolon-separated
  // clauses on a single line, turn each clause into a bullet point.
  const lines = text.split('\n')
  const out: string[] = []
  let inWhySection = false
  for (const line of lines) {
    const hMatch = line.match(/^\s*#{1,4}\s+(.*)$/)
    if (hMatch) {
      inWhySection = /why\s+other\s+options/i.test(hMatch[1])
      out.push(line)
      continue
    }
    if (inWhySection && line.trim() && !/^\s*[-*•\d]/.test(line) && line.includes(';')) {
      const parts = line
        .split(/;\s+(?=(?:and\s+)?(?:\*{1,2}|Option\s+[A-E]|\([A-E]\)|[A-Z]))/)
        .map(p => p.replace(/^and\s+/i, '').trim())
        .filter(Boolean)
      if (parts.length > 1) {
        for (const p of parts) {
          out.push(`- ${p.endsWith('.') ? p : `${p}.`}`)
        }
        continue
      }
    }
    out.push(line)
  }
  return out.join('\n')
}

function parseExplanation(raw: string): Block[] {
  const normalized = normalizeRawExplanation(raw)
  const lines = normalized.split('\n')
  const blocks: Block[] = []
  let list: ListItem[] | null = null
  let listOrdered = false

  const flush = () => {
    if (list && list.length) blocks.push({ t: 'ul', ordered: listOrdered, items: list })
    list = null
    listOrdered = false
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/\s+$/, '')
    if (!line.trim()) { flush(); continue }

    const heading = line.match(/^\s*#{1,4}\s+(.*)$/)
    if (heading) { flush(); blocks.push({ t: 'h', text: heading[1].trim() }); continue }

    // Bold standalone heading line like "**Key Points:**"
    const boldHeading = line.match(/^\s*\*{2}(Key\s+Points|Important\s+Points|Additional\s+Information|Why\s+other\s+options[^*]*|Exam\s+Tip|Hint)\s*:?\*{2}\s*:?\s*$/i)
    if (boldHeading) { flush(); blocks.push({ t: 'h', text: boldHeading[1].trim() }); continue }

    // Pipe table: a header row, a separator row, then one or more body rows.
    if (isTableRow(line) && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      flush()
      const head = tableCells(line)
      const rows: string[][] = []
      i += 2
      while (i < lines.length && isTableRow(lines[i])) { rows.push(tableCells(lines[i])); i++ }
      i--
      blocks.push({ t: 'table', head, rows })
      continue
    }

    // Nested bullet: 2+ leading spaces (or a tab) before the dash/•.
    const nested = line.match(/^(?:\s{2,}|\t+)[-*•]\s+(.*)$/)
    if (nested && list && list.length) { list[list.length - 1].sub.push(nested[1].trim()); continue }

    const bullet = line.match(/^\s*[-*•]\s+(.*)$/)
    if (bullet) {
      if (list && listOrdered) flush()
      if (!list) { list = []; listOrdered = false }
      list.push({ text: bullet[1].trim(), sub: [] })
      continue
    }

    const ordered = line.match(/^\s*\d+[.)]\s+(.*)$/)
    if (ordered) {
      if (list && !listOrdered) flush()
      if (!list) { list = []; listOrdered = true }
      list.push({ text: ordered[1].trim(), sub: [] })
      continue
    }

    flush()
    blocks.push({ t: 'p', text: line.trim() })
  }
  flush()

  // Post-process: if a paragraph block is long (>170 chars) and splits into 2+
  // clean sentences, present the first sentence as a clear lead and the rest as
  // easy-to-scan bullet points so the user never sees a dense wall of text.
  const structured: Block[] = []
  const hasAnyHeadingOrList = blocks.some(b => b.t === 'h' || b.t === 'ul' || b.t === 'table')

  for (let idx = 0; idx < blocks.length; idx++) {
    const b = blocks[idx]
    if (b.t === 'p' && b.text.length > 170) {
      const sents = splitSentencesSafely(b.text)
      if (sents.length >= 2) {
        structured.push({ t: 'p', text: sents[0], lead: idx === 0 })
        if (!hasAnyHeadingOrList && idx === 0) {
          structured.push({ t: 'h', text: 'Key Points' })
        }
        structured.push({
          t: 'ul',
          ordered: false,
          items: sents.slice(1).map(s => ({ text: s, sub: [] })),
        })
        continue
      }
    }
    structured.push(b)
  }

  return structured
}

function headingIcon(text: string): string | null {
  const key = text.trim().toLowerCase().replace(/[:：]\s*$/, '')
  if (HEADING_ICON[key]) return HEADING_ICON[key]
  if (key.startsWith('why other options')) return '⚖️'
  return '📌'
}

export function ExplanationText({ text }: { text: string }) {
  const blocks = parseExplanation(removeRedundantAnswerLead(text))
  return (
    <>
      {blocks.map((b, i) => {
        if (b.t === 'h') {
          const icon = headingIcon(b.text)
          return (
            <h4 key={i} className="expl-heading">
              {icon && <span className="expl-heading-icon" aria-hidden>{icon}</span>}
              <MathText text={b.text} />
            </h4>
          )
        }
        if (b.t === 'ul') {
          const ListTag = b.ordered ? 'ol' : 'ul'
          return (
            <ListTag key={i} className={b.ordered ? 'expl-list expl-num-list' : 'expl-list'}>
              {b.items.map((it, j) => (
                <li key={j}>
                  <MathText text={it.text} />
                  {it.sub.length > 0 && (
                    <ul className="expl-sublist">
                      {it.sub.map((s, k) => <li key={k}><MathText text={s} /></li>)}
                    </ul>
                  )}
                </li>
              ))}
            </ListTag>
          )
        }
        if (b.t === 'table') {
          return (
            <div key={i} className="expl-table-wrap">
              <table className="expl-table">
                <thead>
                  <tr>{b.head.map((h, j) => <th key={j}><MathText text={h} /></th>)}</tr>
                </thead>
                <tbody>
                  {b.rows.map((r, j) => (
                    <tr key={j}>{r.map((c, k) => <td key={k}><MathText text={c} /></td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        return (
          <p key={i} className={b.lead ? 'expl-lead' : undefined}>
            <MathText text={b.text} />
          </p>
        )
      })}
    </>
  )
}
