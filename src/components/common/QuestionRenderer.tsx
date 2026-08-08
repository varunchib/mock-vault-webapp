import React from 'react'
import { MathText } from './MathText'

// Convenience wrapper — renders text with KaTeX math + bold support
function renderInline(text: string): React.ReactNode {
  return <MathText text={text} />
}

// ── Markdown table parser ─────────────────────────────────────────────────────
// Detects lines of the form | cell | cell | and the separator |---|---|

type TableData = { headers: string[]; rows: string[][] }

function parseRow(line: string): string[] {
  return line.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1)
}

function parseMarkdownTable(lines: string[]): { table: TableData; before: string[]; after: string[] } | null {
  // Find first table line
  const startIdx = lines.findIndex(l => l.startsWith('|') && l.endsWith('|'))
  if (startIdx === -1) return null

  // Find separator line (|---|) starting from startIdx+1
  const sepIdx = lines.findIndex((l, i) => i > startIdx && /^\|[\s\-:| ]+\|$/.test(l))
  if (sepIdx === -1 || sepIdx !== startIdx + 1) return null

  // Collect data rows after separator
  let endIdx = sepIdx + 1
  while (endIdx < lines.length && lines[endIdx].startsWith('|') && lines[endIdx].endsWith('|')) {
    endIdx++
  }

  const headers = parseRow(lines[startIdx])
  const rows = lines.slice(sepIdx + 1, endIdx).map(parseRow)
  if (headers.length < 2) return null

  return {
    table: { headers, rows },
    before: lines.slice(0, startIdx),
    after: lines.slice(endIdx),
  }
}

function MarkdownTable({ table }: { table: TableData }) {
  return (
    <div className="qr-table-wrap">
      <table className="qr-table">
        <thead>
          <tr>
            {table.headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Analogy renderer ──────────────────────────────────────────────────────────
// Detects "WORD : WORD :: WORD : ?" pattern and renders it visually

const ANALOGY_RE = /\b([A-Za-z0-9]+)\s*:\s*([A-Za-z0-9]+)\s*::\s*([A-Za-z0-9]+)\s*:\s*([A-Za-z0-9?]+)/

function AnalogyDisplay({ analogy }: { analogy: string }) {
  const m = analogy.match(ANALOGY_RE)
  if (!m) return <span className="qr-analogy-raw">{analogy}</span>
  const [, a, b, c, d] = m
  const isQuestion = d === '?'
  return (
    <span className="qr-analogy">
      <span className="qr-analogy-word">{a}</span>
      <span className="qr-analogy-colon">:</span>
      <span className="qr-analogy-word">{b}</span>
      <span className="qr-analogy-sep">::</span>
      <span className="qr-analogy-word">{c}</span>
      <span className="qr-analogy-colon">:</span>
      <span className={isQuestion ? 'qr-analogy-blank' : 'qr-analogy-word'}>{d}</span>
    </span>
  )
}

// ── Error-sentence segment renderer ──────────────────────────────────────────
// "text (1)/ text (2)/ text (3)/ text. (4)"

function ErrorSentence({ text }: { text: string }) {
  const parts = text.split(/\s*\/\s*/).filter(Boolean)
  return (
    <div className="qr-segments">
      {parts.map((part, i) => {
        const m = part.match(/^([\s\S]+?)(\s*\(\d+\))\s*$/)
        if (m) {
          return (
            <div key={i} className="qr-segment">
              <span className="qr-segment-text">{renderInline(m[1].trim())}</span>
              <span className="qr-segment-num">{m[2].trim()}</span>
            </div>
          )
        }
        return (
          <div key={i} className="qr-segment">
            <span className="qr-segment-text">{renderInline(part.trim())}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Match-the-following parsers ───────────────────────────────────────────────

type MatchData = {
  intro: string
  listILabel: string
  listIILabel: string
  listI: string[]
  listII: string[]
}

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x']

function parsePipeMatch(text: string): MatchData | null {
  const pipeIdx = text.indexOf(' | ')
  if (pipeIdx === -1) return null
  const left = text.slice(0, pipeIdx)
  const right = text.slice(pipeIdx + 3)
  if (!/\(i\)/i.test(left)) return null

  const introMatch = left.match(/^(.*?)\s*\(i\)/si)
  const intro = introMatch ? introMatch[1].trim() : ''

  const listIText = left.replace(/^.*?(?=\(i\))/si, '')
  const listI: string[] = []
  for (const m of listIText.matchAll(/\([ivx]+\)\s*(.*?)(?=\s*\([ivx]+\)|$)/gi)) {
    const item = m[1].trim().replace(/\s+/g, ' ')
    if (item) listI.push(item)
  }

  const listII: string[] = []
  for (const m of right.matchAll(/\d+\.\s*(.*?)(?=\s*\d+\.|$)/g)) {
    const item = m[1].trim().replace(/\s+/g, ' ')
    if (item) listII.push(item)
  }

  if (listI.length < 2 || listII.length < 2) return null
  return { intro, listILabel: 'List I', listIILabel: 'List II', listI, listII }
}

function parseNewlineMatch(text: string): MatchData | null {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  if (lines.length < 3) return null

  const dashLine = /^[ivx]+\.\s+(.*?)\s+—\s+[a-e]\.\s+(.*)$/i
  const matchLines = lines.filter(l => dashLine.test(l))
  if (matchLines.length < 2) return null

  const intro = lines[0]
  const listI: string[] = []
  const listII: string[] = []
  for (const line of matchLines) {
    const m = line.match(dashLine)
    if (m) { listI.push(m[1].trim()); listII.push(m[2].trim()) }
  }
  if (listI.length < 2) return null

  const labelMatch = intro.match(/List[- ]?I\s*\(([^)]+)\).*?List[- ]?II\s*\(([^)]+)\)/i)
  return {
    intro,
    listILabel: labelMatch ? `List I — ${labelMatch[1]}` : 'List I',
    listIILabel: labelMatch ? `List II — ${labelMatch[2]}` : 'List II',
    listI,
    listII,
  }
}

// ── Renderers ─────────────────────────────────────────────────────────────────

function MatchTable({ data }: { data: MatchData }) {
  return (
    <div className="qr-match">
      {data.intro && <p className="qr-match-intro">{data.intro}</p>}
      <div className="qr-match-grid">
        <div className="qr-match-col">
          <div className="qr-match-head">{data.listILabel}</div>
          {data.listI.map((item, i) => (
            <div key={i} className="qr-match-row">
              <span className="qr-match-idx">({ROMAN[i] ?? i + 1})</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="qr-match-col">
          <div className="qr-match-head">{data.listIILabel}</div>
          {data.listII.map((item, i) => (
            <div key={i} className="qr-match-row">
              <span className="qr-match-idx">{i + 1}.</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const INSTRUCTION_RE = /^(find|select|identify|choose|read|mark|arrange|rearrange|spot|convert|change|fill|what|which|who|how|where|when|complete|rewrite|pick|determine|from|in the following|using)/i

function isInstructionLine(line: string): boolean {
  return (line.endsWith(':') || INSTRUCTION_RE.test(line.trim())) && !line.includes('/')
}

// ── Structural line roles ────────────────────────────────────────────────────
// Every line of a multi-line question used to render as the same paragraph, so
// an Assertion & Reason question read as four visually identical lines and a
// statement list gave the eye nothing to latch onto. Each role below now gets
// its own treatment.

// "Assertion (A): …", "Reason (R): …", "Statement I: …"
const LABELLED_RE =
  /^((?:Assertion|Reason)\s*\([AR]\)|Statement\s*(?:[-–—]\s*)?(?:I{1,3}|IV|[1-4])|Statement\s*\([A-D]\))\s*:\s*([\s\S]+)$/i

// "1. Kathmandu", "A. Appalachian", "2) Nathu La", and the Roman-numeral
// statement lists UPSC uses ("I. There is wide occurrence of spindle-whorls…").
// Roman numerals are matched case-sensitively as whole markers so ordinary
// prose starting with a capital letter is not mistaken for a list item; the
// "two consecutive items" rule below is the real safeguard.
const ITEM_RE = /^(\d{1,2}|[A-H]|[IVX]{1,4}|[ivx]{1,4})[.)]\s+(.+)$/

// A whole line that is nothing but bold — a column header such as
// "**List-I (Coal Field)**" or "**(Pass) — (State/Union Territory)**"
const HEADER_ONLY_RE = /^\*\*(.+?)\*\*$/

// The closing rubric: "Select the correct answer from the code given below:"
const DIRECTIVE_RE = /^(select|choose|mark|identify|use|answer|code)\b/i

function isDirectiveLine(line: string): boolean {
  return line.endsWith(':') && DIRECTIVE_RE.test(line.trim())
}

// "Given below are two statements, one is labelled as Assertion (A) and the
// other as Reason (R)." — boilerplate that opens every A&R question. It read at
// the same size and weight as the two claims it introduces, which gave the
// least important line on the card equal footing with the most important ones.
function isClaimPreamble(line: string): boolean {
  return /assertion/i.test(line) && /reason/i.test(line) && !LABELLED_RE.test(line)
}

function LabelledStatement({ label, body }: { label: string; body: string }) {
  return (
    <div className="qr-claim">
      <span className="qr-claim-label">{label}</span>
      <span className="qr-claim-body">{renderInline(body)}</span>
    </div>
  )
}

function ItemList({ items }: { items: Array<{ marker: string; body: string }> }) {
  return (
    <ul className="qr-items">
      {items.map((it, i) => (
        <li key={i} className="qr-item">
          <span className="qr-item-marker">{it.marker}</span>
          <span className="qr-item-body">{renderInline(it.body)}</span>
        </li>
      ))}
    </ul>
  )
}

function isErrorSentence(line: string): boolean {
  return /\(\d+\)/.test(line) && line.includes('/')
}

// Extract analogy from a single-line text (e.g. at the end of an instruction sentence)
function extractAnalogy(text: string): { pre: string; analogy: string } | null {
  const m = text.match(ANALOGY_RE)
  if (!m) return null
  const analogyStart = text.lastIndexOf(m[0])
  const pre = text.slice(0, analogyStart).replace(/\.\s*$/, '').trim()
  return { pre, analogy: m[0] }
}

function MultilineText({ text, className }: { text: string; className?: string }) {
  const rawLines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)

  // Check for markdown table within the lines
  const tableResult = parseMarkdownTable(rawLines)
  if (tableResult) {
    return (
      <div className={['qr-multiline', className].filter(Boolean).join(' ')}>
        {tableResult.before.map((line, i) => (
          <p key={`b${i}`} className={isInstructionLine(line) ? 'qr-instruction' : 'qr-text'}>
            {renderInline(line)}
          </p>
        ))}
        <MarkdownTable table={tableResult.table} />
        {tableResult.after.map((line, i) => (
          <p key={`a${i}`} className="qr-text">{renderInline(line)}</p>
        ))}
      </div>
    )
  }

  const hasInstruction = rawLines.length > 1 && isInstructionLine(rawLines[0])

  // Parsed into blocks first (rather than emitted line by line) so that a
  // header followed by its list can be recognised as one unit — which is what
  // lets two such units sit side by side in a match-the-following question.
  type Block =
    | { k: 'lead' | 'text' | 'directive' | 'error' | 'analogy' | 'preamble'; line: string }
    | { k: 'colhead'; label: string }
    | { k: 'items'; items: Array<{ marker: string; body: string }> }
    | { k: 'claim'; label: string; body: string }

  const blocks: Block[] = []
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i]

    if (i === 0 && isClaimPreamble(line)) { blocks.push({ k: 'preamble', line }); continue }
    if (i === 0 && hasInstruction) { blocks.push({ k: 'lead', line }); continue }
    if (isErrorSentence(line)) { blocks.push({ k: 'error', line }); continue }
    if (ANALOGY_RE.test(line)) { blocks.push({ k: 'analogy', line }); continue }

    const header = line.match(HEADER_ONLY_RE)
    if (header) { blocks.push({ k: 'colhead', label: header[1] }); continue }

    const labelled = line.match(LABELLED_RE)
    if (labelled) { blocks.push({ k: 'claim', label: labelled[1], body: labelled[2] }); continue }

    // A numbered/lettered list, but only when at least two such lines run
    // together — a lone "A. P. J. Abdul Kalam was…" is prose, not a list.
    if (ITEM_RE.test(line)) {
      const items: Array<{ marker: string; body: string }> = []
      let j = i
      for (; j < rawLines.length; j++) {
        const m = rawLines[j].match(ITEM_RE)
        if (!m) break
        items.push({ marker: m[1], body: m[2] })
      }
      if (items.length >= 2) { blocks.push({ k: 'items', items }); i = j - 1; continue }
    }

    if (isDirectiveLine(line)) { blocks.push({ k: 'directive', line }); continue }
    blocks.push({ k: 'text', line })
  }

  const nodes: React.ReactNode[] = []
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]

    // Two headed lists back to back are a match-the-following pair: show them
    // as columns so the eye can run across the two lists instead of scrolling.
    if (b.k === 'colhead' && blocks[i + 1]?.k === 'items' &&
        blocks[i + 2]?.k === 'colhead' && blocks[i + 3]?.k === 'items') {
      const [h1, l1, h2, l2] = blocks.slice(i, i + 4) as
        [Extract<Block, { k: 'colhead' }>, Extract<Block, { k: 'items' }>,
         Extract<Block, { k: 'colhead' }>, Extract<Block, { k: 'items' }>]
      nodes.push(
        <div key={i} className="qr-pairgrid">
          {[[h1, l1], [h2, l2]].map(([h, l], c) => (
            <div key={c} className="qr-pairgrid-col">
              <div className="qr-colhead">
                {renderInline((h as Extract<Block, { k: 'colhead' }>).label)}
              </div>
              <ItemList items={(l as Extract<Block, { k: 'items' }>).items} />
            </div>
          ))}
        </div>,
      )
      i += 3
      continue
    }

    switch (b.k) {
      case 'lead': nodes.push(<p key={i} className="qr-lead">{renderInline(b.line)}</p>); break
      case 'preamble': nodes.push(<p key={i} className="qr-preamble">{renderInline(b.line)}</p>); break
      case 'error': nodes.push(<ErrorSentence key={i} text={b.line} />); break
      case 'analogy': nodes.push(<AnalogyDisplay key={i} analogy={b.line} />); break
      case 'colhead': nodes.push(<div key={i} className="qr-colhead">{renderInline(b.label)}</div>); break
      case 'claim': nodes.push(<LabelledStatement key={i} label={b.label} body={b.body} />); break
      case 'items': nodes.push(<ItemList key={i} items={b.items} />); break
      case 'directive': nodes.push(<p key={i} className="qr-directive">{renderInline(b.line)}</p>); break
      default: nodes.push(<p key={i} className="qr-text">{renderInline(b.line)}</p>)
    }
  }

  return (
    <div className={['qr-multiline', className].filter(Boolean).join(' ')}>{nodes}</div>
  )
}

// ── Public component ──────────────────────────────────────────────────────────

export function QuestionRenderer({ text, className }: { text: string; className?: string }) {
  // Match-the-following table formats
  const match = parsePipeMatch(text) ?? parseNewlineMatch(text)
  if (match) return <MatchTable data={match} />

  // Multi-line questions (handle table, analogy, error-sentence, bold)
  if (text.includes('\n') || text.includes('\r')) {
    return <MultilineText text={text} className={className} />
  }

  // Single-line: error sentence
  if (isErrorSentence(text)) return <ErrorSentence text={text} />

  // Single-line: analogy embedded in instruction text (e.g. Q14)
  const extracted = extractAnalogy(text)
  if (extracted) {
    return (
      <div className={['qr-multiline', className].filter(Boolean).join(' ')}>
        {extracted.pre && <p className="qr-instruction">{renderInline(extracted.pre)}</p>}
        <AnalogyDisplay analogy={extracted.analogy} />
      </div>
    )
  }

  return <p className={className}>{renderInline(text)}</p>
}
