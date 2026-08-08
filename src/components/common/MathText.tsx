import React, { useEffect, useMemo, useState } from 'react'

import { figureSvg } from '../../data/figures'

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
 *   *...*     — italic (book titles, foreign terms)
 *   ***...*** — bold italic (scientific binomials)
 *   plain text
 *
 * Usage: <MathText text="Evaluate: $\frac{7}{4}$" />
 */

// 'waterline' is not a transform — it is the GIVEN figure: the word set larger
// and standing on the hatched surface line the paper draws to show where the
// reflection is taken from. Without it the stem is just a bare word and the
// question loses the thing it is asking you to reflect.
type FlipAxis = 'water' | 'mirror' | 'rotate' | 'waterline'

// What each one means, for the aria-label — the transform IS the content, so a
// screen reader that just read "MARKET" would lose the question entirely.
const FLIP_LABEL: Record<FlipAxis, string> = {
  water: 'shown as a water image (flipped top to bottom)',
  mirror: 'shown as a mirror image (flipped left to right)',
  rotate: 'shown rotated by 180 degrees',
  waterline: 'printed above a water surface line',
}

const FLIP_CLASS: Record<FlipAxis, string> = {
  water: 'mv-water-image', mirror: 'mv-mirror-image', rotate: 'mv-rotate-image',
  waterline: 'mv-waterline',
}

type Token =
  | { kind: 'text';         content: string }
  | { kind: 'inline-math';  content: string }
  | { kind: 'block-math';   content: string }
  | { kind: 'bold';         content: string }
  | { kind: 'italic';       content: string }
  | { kind: 'bold-italic';  content: string }
  | { kind: 'flip';         content: string; axis: FlipAxis }
  | { kind: 'figure';       content: string }

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

    // Bold-italic ***...*** — scientific binomials (***E. coli***). Must be
    // tried before bold, which would otherwise consume "**" and leave the odd
    // asterisk stranded in the output.
    if (text[i] === '*' && text[i + 1] === '*' && text[i + 2] === '*') {
      const end = text.indexOf('***', i + 3)
      if (end !== -1) {
        tokens.push({ kind: 'bold-italic', content: text.slice(i + 3, end) })
        i = end + 3
        continue
      }
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

    // [[water:MARKET]] / [[mirror:MARKET]] — reasoning papers ask for the water
    // (top-to-bottom) or mirror (left-to-right) image of a word. These are
    // geometric transforms of TEXT, not diagrams, so they are rendered as real
    // characters under a CSS transform rather than shipped as an image: the word
    // stays selectable and indexable, scales cleanly, and inherits the theme
    // colour, none of which an <img> or text-in-SVG manages.
    if (text[i] === '[' && text[i + 1] === '[') {
      // [[fig:key]] — hand-drawn line art, inlined so it inherits the theme.
      const fm = /^\[\[fig:([^\]\n]+)\]\]/.exec(text.slice(i))
      if (fm) {
        tokens.push({ kind: 'figure', content: fm[1] })
        i += fm[0].length
        continue
      }

      const m = /^\[\[(waterline|water|mirror|rotate):([^\]\n]+)\]\]/.exec(text.slice(i))
      if (m) {
        tokens.push({ kind: 'flip', content: m[2], axis: m[1] as FlipAxis })
        i += m[0].length
        continue
      }
    }

    // Italic *...* — used for book titles (*Baburnama*) and foreign terms
    // (*chauth*). Checked after bold so "**x**" is never read as italic.
    // The delimiters must hug the text (no "* " or " *") and the closer must
    // not be another asterisk, so arithmetic like "2 * 3" is left alone.
    if (text[i] === '*' && text[i + 1] !== '*' && !/\s/.test(text[i + 1] ?? '')) {
      const m = /^\*([^*\n]+?)\*(?!\*)/.exec(text.slice(i))
      if (m && !/\s$/.test(m[1])) {
        tokens.push({ kind: 'italic', content: m[1] })
        i += m[0].length
        continue
      }
    }

    // Plain text — scan forward to the next special char (start from i+1)
    let next = text.length
    const d = text.indexOf('$', i + 1)
    const b = text.indexOf('*', i + 1)
    const f = text.indexOf('[[', i + 1)
    if (d !== -1 && d < next) next = d
    if (b !== -1 && b < next) next = b
    if (f !== -1 && f < next) next = f
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

function MathTextImpl({ text, className }: { text: string; className?: string }) {
  // Hooks must run unconditionally, so all the early-exit decisions are derived
  // here rather than returning before them.
  const tokens = useMemo(() => {
    if (!text) return null
    // '[[' must be in this fast-path check too: a bare "[[water:MARKET]]" has
    // neither $ nor *, so without it the token would never be parsed and the
    // raw markup would render as literal text.
    if (!(text.includes('$') || text.includes('*') || text.includes('[['))) return null
    return tokenize(text)
  }, [text])

  const hasMath = useMemo(
    () => !!tokens?.some(t => t.kind === 'inline-math' || t.kind === 'block-math'),
    [tokens],
  )

  // Re-render once KaTeX arrives; until then math shows as its raw expression.
  const [katexReady, setKatexReady] = useState(() => katexMod !== null)
  useEffect(() => {
    if (!hasMath || katexMod) return
    let alive = true
    void loadKatex().then(() => { if (alive) setKatexReady(true) })
    return () => { alive = false }
  }, [hasMath])

  // KaTeX's renderToString is expensive (~ms per expression on mobile). It must
  // run only when the text or KaTeX-readiness actually changes — NOT on every
  // re-render. Without this memo, selecting an MCQ option re-renders the option
  // list and re-parses every math expression synchronously, causing a visible
  // tap lag on math-heavy papers (e.g. NEET). katexReady is a dep so the output
  // recomputes once when KaTeX finishes loading.
  const nodes = useMemo(() => {
    if (!tokens) return null
    void katexReady
    return tokens.map((tok, i) => {
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
          return <strong key={i} className="qr-highlight">{tok.content}</strong>
        case 'italic':
          return <em key={i}>{tok.content}</em>
        case 'bold-italic':
          return <strong key={i} className="qr-highlight"><em>{tok.content}</em></strong>
        case 'figure': {
          const svg = figureSvg(tok.content)
          // An unknown key must not vanish silently — showing it makes a bad
          // reference obvious in review instead of leaving an empty gap.
          return svg
            ? <span key={i} className="mv-figure-wrap" dangerouslySetInnerHTML={{ __html: svg }} />
            : <span key={i} className="mv-figure-missing">[missing figure: {tok.content}]</span>
        }
        case 'flip':
          // aria-label carries the meaning, since the visual flip is the whole
          // point and a screen reader would otherwise just read "MARKET".
          return (
            <span
              key={i}
              className={FLIP_CLASS[tok.axis]}
              role="img"
              aria-label={`${tok.content}, ${FLIP_LABEL[tok.axis]}`}
            >
              {tok.content}
            </span>
          )
        case 'text':
        default:
          return <React.Fragment key={i}>{tok.content}</React.Fragment>
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, katexReady])

  if (!text) return null
  if (!tokens) return <span className={className}>{text}</span>

  return <span className={className}>{nodes}</span>
}

// Memoized: a parent re-render (e.g. selecting an MCQ option) that passes the
// same text/className must not re-run this component or its KaTeX work at all.
export const MathText = React.memo(MathTextImpl)
