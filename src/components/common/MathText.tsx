import React, { useEffect, useMemo, useState } from 'react'

// KaTeX (~270 KB JS + its CSS) is only needed when text actually contains math.
// Most questions (History, Polity, Current Affairs…) have none, so it is loaded
// on demand instead of shipping in the main bundle. Module-level singleton: the
// first component that needs it pays the cost, everyone after reuses it.
type Katex = typeof import('katex').default
let katexMod: Katex | null = null
let katexLoading: Promise<void> | null = null

function loadKatex(): Promise<void> {
  if (katexMod) return Promise.resolve()
  if (!katexLoading) {
    katexLoading = Promise.all([
      import('katex'),
      import('katex/dist/katex.min.css'),
    ]).then(([mod]) => {
      katexMod = mod.default
    })
  }
  return katexLoading
}

/**
 * Renders a string that may contain:
 *   $$...$$   — display (block) math
 *   $...$     — inline math
 *   **...**   — bold/highlighted word
 *   plain text
 *
 * Usage: <MathText text="Evaluate: $\frac{7}{4}$" />
 */

type Token =
  | { kind: 'text';         content: string }
  | { kind: 'inline-math';  content: string }
  | { kind: 'block-math';   content: string }
  | { kind: 'bold';         content: string }

function tokenize(text: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < text.length) {
    // Block math $$...$$
    if (text[i] === '$' && text[i + 1] === '$') {
      const end = text.indexOf('$$', i + 2)
      if (end !== -1) {
        tokens.push({ kind: 'block-math', content: text.slice(i + 2, end) })
        i = end + 2
        continue
      }
      // Unmatched $$ — emit as literal and advance past it
      tokens.push({ kind: 'text', content: '$$' })
      i += 2
      continue
    }

    // Inline math $...$
    if (text[i] === '$') {
      const end = text.indexOf('$', i + 1)
      if (end !== -1) {
        tokens.push({ kind: 'inline-math', content: text.slice(i + 1, end) })
        i = end + 1
        continue
      }
      // Unmatched $ — emit as literal and advance
      tokens.push({ kind: 'text', content: '$' })
      i += 1
      continue
    }

    // Bold **...**
    if (text[i] === '*' && text[i + 1] === '*') {
      const end = text.indexOf('**', i + 2)
      if (end !== -1) {
        tokens.push({ kind: 'bold', content: text.slice(i + 2, end) })
        i = end + 2
        continue
      }
      // Unmatched ** — emit as literal and advance
      tokens.push({ kind: 'text', content: '**' })
      i += 2
      continue
    }

    // Plain text — scan forward to the next special char (start from i+1)
    let next = text.length
    const d = text.indexOf('$', i + 1)
    const b = text.indexOf('**', i + 1)
    if (d !== -1 && d < next) next = d
    if (b !== -1 && b < next) next = b
    // next is always > i here, so i always advances
    tokens.push({ kind: 'text', content: text.slice(i, next) })
    i = next
  }

  return tokens
}

// Returns rendered HTML, or null when KaTeX has not loaded yet / failed —
// callers then fall back to showing the raw expression.
function renderKatex(latex: string, displayMode: boolean): string | null {
  if (!katexMod) return null
  try {
    return katexMod.renderToString(latex.trim(), {
      displayMode,
      throwOnError: false,
      strict: false,
    })
  } catch {
    return null
  }
}

export function MathText({ text, className }: { text: string; className?: string }) {
  // Hooks must run unconditionally, so all the early-exit decisions are derived
  // here rather than returning before them.
  const tokens = useMemo(() => {
    if (!text) return null
    if (!(text.includes('$') || text.includes('**'))) return null
    return tokenize(text)
  }, [text])

  const hasMath = useMemo(
    () => !!tokens?.some(t => t.kind === 'inline-math' || t.kind === 'block-math'),
    [tokens],
  )

  // Re-render once KaTeX arrives; until then math shows as its raw expression.
  const [, setKatexReady] = useState(() => katexMod !== null)
  useEffect(() => {
    if (!hasMath || katexMod) return
    let alive = true
    void loadKatex().then(() => { if (alive) setKatexReady(true) })
    return () => { alive = false }
  }, [hasMath])

  if (!text) return null
  if (!tokens) return <span className={className}>{text}</span>

  return (
    <span className={className}>
      {tokens.map((tok, i) => {
        switch (tok.kind) {
          case 'block-math': {
            const html = renderKatex(tok.content, true)
            return html
              ? <span key={i} className="math-block" dangerouslySetInnerHTML={{ __html: html }} />
              : <span key={i} className="math-block">{tok.content}</span>
          }
          case 'inline-math': {
            const html = renderKatex(tok.content, false)
            return html
              ? <span key={i} className="math-inline" dangerouslySetInnerHTML={{ __html: html }} />
              : <span key={i} className="math-inline">{tok.content}</span>
          }
          case 'bold':
            return (
              <strong key={i} className="qr-highlight">{tok.content}</strong>
            )
          case 'text':
          default:
            return <React.Fragment key={i}>{tok.content}</React.Fragment>
        }
      })}
    </span>
  )
}
