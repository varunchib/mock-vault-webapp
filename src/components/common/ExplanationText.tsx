import { MathText } from './MathText'

/**
 * Renders a solution/explanation with a light structure so it reads like a
 * proper "Detailed Solution" (headings, bullet points, nested points, bold
 * labels) instead of a wall of paragraphs. Backward compatible: plain text with
 * no markers still renders as paragraphs, exactly as before.
 *
 * Conventions (kept deliberately small, mirrored in worker.ts richText):
 *   ## Heading        → a section heading; "Key Points" / "Additional
 *                       Information" / "Important Points" / "Hint" get an icon.
 *   - item            → a top-level bullet
 *     - sub item      → a nested bullet (indent with 2+ spaces before the dash)
 *   anything else     → a paragraph
 *   **bold**, $math$  → inline, via MathText
 */

type ListItem = { text: string; sub: string[] }
type Block =
  | { t: 'p'; text: string }
  | { t: 'h'; text: string }
  | { t: 'ul'; items: ListItem[] }

const HEADING_ICON: Record<string, string> = {
  'key points': '🔑',
  'important points': '🔑',
  'additional information': 'ℹ️',
  'confusion points': '⚠️',
  hint: '💡',
  'exam tip': '💡',
  explanation: '📝',
}

export function parseExplanation(raw: string): Block[] {
  const lines = raw.replace(/\r/g, '').split('\n')
  const blocks: Block[] = []
  let list: ListItem[] | null = null

  const flush = () => {
    if (list && list.length) blocks.push({ t: 'ul', items: list })
    list = null
  }

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, '')
    if (!line.trim()) { flush(); continue }

    const heading = line.match(/^\s*#{2,3}\s+(.*)$/)
    if (heading) { flush(); blocks.push({ t: 'h', text: heading[1].trim() }); continue }

    // Nested bullet: 2+ leading spaces (or a tab) before the dash/•.
    const nested = line.match(/^(?:\s{2,}|\t+)[-*•]\s+(.*)$/)
    if (nested && list && list.length) { list[list.length - 1].sub.push(nested[1].trim()); continue }

    const bullet = line.match(/^\s*[-*•]\s+(.*)$/)
    if (bullet) { if (!list) list = []; list.push({ text: bullet[1].trim(), sub: [] }); continue }

    flush()
    blocks.push({ t: 'p', text: line.trim() })
  }
  flush()
  return blocks
}

function headingIcon(text: string): string | null {
  return HEADING_ICON[text.trim().toLowerCase().replace(/[:：]\s*$/, '')] ?? null
}

export function ExplanationText({ text }: { text: string }) {
  const blocks = parseExplanation(text)
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
          return (
            <ul key={i} className="expl-list">
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
            </ul>
          )
        }
        return <p key={i}><MathText text={b.text} /></p>
      })}
    </>
  )
}
