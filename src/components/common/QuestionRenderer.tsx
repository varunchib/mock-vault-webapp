import React from 'react'

// ── Match-the-following parsers ───────────────────────────────────────────────

type MatchData = {
  intro: string
  listILabel: string
  listIILabel: string
  listI: string[]
  listII: string[]
}

const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x']

// Format 1: "Match ...: (i) A  (ii) B | 1. X  2. Y"
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

// Format 2: "Match ...\ni. X — a. Y\nii. ..."
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

  // Extract List I / List II labels from intro if present
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

function MultilineText({ text }: { text: string }) {
  const lines = text.split(/\r?\n/)
  return (
    <p className="qr-text">
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </p>
  )
}

// ── Public component ──────────────────────────────────────────────────────────

export function QuestionRenderer({ text, className }: { text: string; className?: string }) {
  const match = parsePipeMatch(text) ?? parseNewlineMatch(text)
  if (match) return <MatchTable data={match} />

  if (text.includes('\n') || text.includes('\r')) {
    return <div className={className}><MultilineText text={text} /></div>
  }

  return <p className={className}>{text}</p>
}
