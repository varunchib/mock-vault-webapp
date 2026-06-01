import React from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

// ── KaTeX math renderer ───────────────────────────────────────────────────────
//
// Supported delimiters (same as Khan Academy / JKPSC / UPSC digital papers):
//   $$...$$   display-mode math (centred block)
//   $...$     inline math
//   \[...\]   display-mode (alternate)
//   \(...\)   inline (alternate)
//
// Any delimiter that fails to parse is returned as its raw source string
// rather than throwing, so a bad LaTeX expression never breaks the UI.

type MathSegment =
  | { type: 'text';    value: string }
  | { type: 'inline';  latex: string }
  | { type: 'display'; latex: string }

const MATH_RE = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$(?!\$)[^$\n]+?\$|\\\([\s\S]*?\\\))/g

function parseMathSegments(text: string): MathSegment[] {
  const segments: MathSegment[] = []
  let last = 0

  for (const match of text.matchAll(MATH_RE)) {
    const start = match.index!
    if (start > last) segments.push({ type: 'text', value: text.slice(last, start) })

    const raw = match[0]
    if (raw.startsWith('$$') || raw.startsWith('\\[')) {
      const latex = raw.startsWith('$$')
        ? raw.slice(2, -2)
        : raw.slice(2, -2)   // \[...\]
      segments.push({ type: 'display', latex: latex.trim() })
    } else {
      const latex = raw.startsWith('$')
        ? raw.slice(1, -1)
        : raw.slice(2, -2)   // \(...\)
      segments.push({ type: 'inline', latex: latex.trim() })
    }

    last = start + raw.length
  }

  if (last < text.length) segments.push({ type: 'text', value: text.slice(last) })
  return segments
}

function renderKatex(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: false,
    })
  } catch {
    return latex   // raw fallback — never crash the UI
  }
}

function MathText({ text, className }: { text: string; className?: string }) {
  const segments = parseMathSegments(text)

  // Fast path: no math found — avoid creating React fragments unnecessarily
  if (segments.length === 1 && segments[0].type === 'text') {
    return <p className={className}>{segments[0].value}</p>
  }

  return (
    <p className={className}>
      {segments.map((seg, i) => {
        if (seg.type === 'text') return <React.Fragment key={i}>{seg.value}</React.Fragment>

        const html = renderKatex(seg.latex, seg.type === 'display')
        return (
          <span
            key={i}
            className={seg.type === 'display' ? 'math-display' : 'math-inline'}
            // Safe: KaTeX output is sanitised — it only emits its own DOM.
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
      })}
    </p>
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
  const left  = text.slice(0, pipeIdx)
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
  const lines    = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  if (lines.length < 3) return null

  const dashLine = /^[ivx]+\.\s+(.*?)\s+—\s+[a-e]\.\s+(.*)$/i
  const matchLines = lines.filter(l => dashLine.test(l))
  if (matchLines.length < 2) return null

  const intro    = lines[0]
  const listI: string[]  = []
  const listII: string[] = []
  for (const line of matchLines) {
    const m = line.match(dashLine)
    if (m) { listI.push(m[1].trim()); listII.push(m[2].trim()) }
  }
  if (listI.length < 2) return null

  const labelMatch = intro.match(/List[- ]?I\s*\(([^)]+)\).*?List[- ]?II\s*\(([^)]+)\)/i)
  return {
    intro,
    listILabel:  labelMatch ? `List I — ${labelMatch[1]}`  : 'List I',
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

function MultilineText({ text, className }: { text: string; className?: string }) {
  const lines = text.split(/\r?\n/)
  const cls = ['qr-text', className].filter(Boolean).join(' ')
  // Render each line through MathText so inline math works in multi-line questions
  return (
    <div className={cls}>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          <MathText text={line} />
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  )
}

// ── Public component ──────────────────────────────────────────────────────────

export function QuestionRenderer({ text, className }: { text: string; className?: string }) {
  const match = parsePipeMatch(text) ?? parseNewlineMatch(text)
  if (match) return <MatchTable data={match} />

  if (text.includes('\n') || text.includes('\r')) {
    return <MultilineText text={text} className={className} />
  }

  return <MathText text={text} className={className} />
}
