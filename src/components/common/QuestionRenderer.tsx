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

  return (
    <div className={['qr-multiline', className].filter(Boolean).join(' ')}>
      {rawLines.map((line, i) => {
        if (i === 0 && hasInstruction) {
          return <p key={i} className="qr-instruction">{renderInline(line)}</p>
        }
        if (isErrorSentence(line)) {
          return <ErrorSentence key={i} text={line} />
        }
        // Analogy line within multi-line question
        if (ANALOGY_RE.test(line)) {
          return <AnalogyDisplay key={i} analogy={line} />
        }
        return (
          <p key={i} className="qr-text">{renderInline(line)}</p>
        )
      })}
    </div>
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
