import React from 'react'
import katex from 'katex'

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

function renderKatex(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex.trim(), {
      displayMode,
      throwOnError: false,
      strict: false,
    })
  } catch {
    return latex
  }
}

export function MathText({ text, className }: { text: string; className?: string }) {
  if (!text) return null

  const hasSpecial = text.includes('$') || text.includes('**')
  if (!hasSpecial) return <span className={className}>{text}</span>

  const tokens = tokenize(text)

  return (
    <span className={className}>
      {tokens.map((tok, i) => {
        switch (tok.kind) {
          case 'block-math':
            return (
              <span
                key={i}
                className="math-block"
                dangerouslySetInnerHTML={{ __html: renderKatex(tok.content, true) }}
              />
            )
          case 'inline-math':
            return (
              <span
                key={i}
                className="math-inline"
                dangerouslySetInnerHTML={{ __html: renderKatex(tok.content, false) }}
              />
            )
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
