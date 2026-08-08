/**
 * Hand-drawn line-art figures, referenced from question text as [[fig:<key>]].
 *
 * These are geometry, not pictures: rectangles, diagonals, triangles. They are
 * inlined into the DOM rather than served as <img>, because an <img> is a
 * separate document that page CSS cannot reach — `currentColor` never arrives
 * and the figure stays black-on-white in dark mode. Inline, they are drawn in
 * whatever colour the surrounding text uses.
 *
 * Rules for anything added here:
 *   • stroke="currentColor", fill="none" — never a hard-coded colour
 *   • a real <title>, which is what a screen reader announces and what a
 *     crawler reads; it is the only textual description of the figure
 *   • viewBox only, no width/height — the page sizes it with CSS
 *
 * Scans and photographs do NOT belong here. They stay as files on the assets
 * host (see `assetsBaseUrl`) and render as <img>: there is no colour to inherit,
 * and inlining a 45 KB bitmap into every render would be pure waste.
 *
 * Kept in code rather than the database because these are rare and tiny, and a
 * new database column would mean a Go rebuild and container redeploy for no
 * practical gain. Revisit if this ever passes a couple of hundred entries.
 */

export type Figure = {
  /** Announced to screen readers and read by crawlers — describe the geometry. */
  title: string
  viewBox: string
  /** Inner markup only; the <svg> wrapper and <title> are added by the renderer. */
  body: string
  /**
   * 'sm' for figures that sit inside an option row, where a full-size diagram
   * would tower over the letter beside it.
   */
  size?: 'sm'
}

export const figures: Record<string, Figure> = {
  // JKCCE Prelims 2025 GS-II (Set B) Q31 — "How many triangles?"
  // Two stacked squares. The UPPER square carries both diagonals AND both
  // medians (16 triangles); the LOWER square carries only its diagonals (8).
  // Nothing crosses the shared edge, so the counts simply add to 24.
  'jkcce-2025-gs2-q31': {
    title:
      'A tall rectangle made of two stacked squares. The upper square carries both '
      + 'diagonals together with a vertical and a horizontal median, all four meeting '
      + 'at its centre. The lower square carries only its two diagonals.',
    viewBox: '0 0 104 204',
    body: `
      <rect x="2" y="2" width="100" height="200"/>
      <line x1="2" y1="102" x2="102" y2="102"/>
      <line x1="2" y1="2"   x2="102" y2="102"/>
      <line x1="102" y1="2" x2="2"   y2="102"/>
      <line x1="52" y1="2"  x2="52"  y2="102"/>
      <line x1="2" y1="52"  x2="102" y2="52"/>
      <line x1="2" y1="102" x2="102" y2="202"/>
      <line x1="102" y1="102" x2="2" y2="202"/>`,
  },

  // JKCCE Prelims 2025 GS-II (Set B) Q32 — number logic in three triangles.
  // Each triangle: a number on top, and two numbers in a divided band at the
  // base. The rule is the digit sums written side by side (1+2=3, 2+4=6 -> 36).
  'jkcce-2025-gs2-q32': {
    title:
      'Three triangles. Each has a number at the apex and two numbers in a divided '
      + 'band across its base: 36 above 12 and 24; 69 above 42 and 63; and a question '
      + 'mark above 11 and 25.',
    viewBox: '0 0 360 112',
    body: `
      <g>
        <polygon points="58,8 112,100 4,100"/>
        <line x1="25" y1="70" x2="91" y2="70"/>
        <line x1="58" y1="70" x2="58" y2="100"/>
      </g>
      <g transform="translate(120,0)">
        <polygon points="58,8 112,100 4,100"/>
        <line x1="25" y1="70" x2="91" y2="70"/>
        <line x1="58" y1="70" x2="58" y2="100"/>
      </g>
      <g transform="translate(240,0)">
        <polygon points="58,8 112,100 4,100"/>
        <line x1="25" y1="70" x2="91" y2="70"/>
        <line x1="58" y1="70" x2="58" y2="100"/>
      </g>
      <g fill="currentColor" stroke="none" font-size="17" text-anchor="middle">
        <text x="58" y="58">36</text><text x="41" y="92">12</text><text x="75" y="92">24</text>
        <text x="178" y="58">69</text><text x="161" y="92">42</text><text x="195" y="92">63</text>
        <text x="298" y="58">?</text><text x="281" y="92">11</text><text x="315" y="92">25</text>
      </g>`,
  },

  // ── JKCCE Prelims 2025 GS-II (Set B) Q35 — Venn diagram options ──────────
  // The OPTIONS are the figures here, so each is its own entry. Teachers/Men/
  // Women needs Men and Women disjoint with Teachers overlapping both, which is
  // the chain in option C.
  'jkcce-2025-gs2-q35a': {
    title: 'Three circles overlapping one another, every pair intersecting.',
    viewBox: '0 0 124 116', size: 'sm',
    body: `<circle cx="46" cy="44" r="30"/><circle cx="78" cy="44" r="30"/><circle cx="62" cy="72" r="30"/>`,
  },
  'jkcce-2025-gs2-q35b': {
    title: 'Three concentric circles, each one inside the next.',
    viewBox: '0 0 124 116', size: 'sm',
    body: `<circle cx="62" cy="58" r="54"/><circle cx="62" cy="58" r="36"/><circle cx="62" cy="58" r="18"/>`,
  },
  'jkcce-2025-gs2-q35c': {
    title:
      'Three circles in a row, the middle one overlapping each of the outer two, '
      + 'while the outer two do not touch each other.',
    viewBox: '0 0 170 78', size: 'sm',
    body: `<circle cx="38" cy="39" r="31"/><circle cx="85" cy="39" r="31"/><circle cx="132" cy="39" r="31"/>`,
  },
  'jkcce-2025-gs2-q35d': {
    title: 'Two separate circles enclosed within one larger ellipse.',
    viewBox: '0 0 170 96', size: 'sm',
    body: `<ellipse cx="85" cy="48" rx="82" ry="44"/><circle cx="55" cy="48" r="24"/><circle cx="115" cy="48" r="24"/>`,
  },

  // ── Q36 — two views of one die ───────────────────────────────────────────
  // 5 sits beside 2 and 3 in the first view and beside 4 and 1 in the second,
  // so 5 touches four different faces and must be opposite 6.
  'jkcce-2025-gs2-q36': {
    title:
      'Two views of the same die. The first shows 2 on the top face, 5 on the front '
      + 'and 3 on the right. The second shows 5 on the top face, 4 on the front and 1 '
      + 'on the right.',
    viewBox: '0 0 216 96',
    body: `
      <g>
        <rect x="8" y="34" width="52" height="52"/>
        <polygon points="8,34 26,16 78,16 60,34"/>
        <polygon points="60,34 78,16 78,68 60,86"/>
      </g>
      <g transform="translate(110,0)">
        <rect x="8" y="34" width="52" height="52"/>
        <polygon points="8,34 26,16 78,16 60,34"/>
        <polygon points="60,34 78,16 78,68 60,86"/>
      </g>
      <g fill="currentColor" stroke="none" font-size="16" text-anchor="middle">
        <text x="34" y="66">5</text><text x="43" y="30">2</text><text x="69" y="56">3</text>
        <text x="144" y="66">4</text><text x="153" y="30">5</text><text x="179" y="56">1</text>
      </g>`,
  },

  // ── Q37 — six-sector wheel ───────────────────────────────────────────────
  // Sectors pair across the centre and each pair follows n x (n+1):
  // 5-30, 8-72, and 11 opposite the missing sector, so 11 x 12 = 132.
  'jkcce-2025-gs2-q37': {
    title:
      'A circle divided into six equal sectors by three diameters. Reading clockwise '
      + 'from the upper left the sectors contain 5, 8, 11, 30, 72 and a question mark.',
    viewBox: '0 0 134 134',
    body: `
      <circle cx="67" cy="67" r="60"/>
      <line x1="67" y1="7" x2="67" y2="127"/>
      <line x1="119" y1="37" x2="15" y2="97"/>
      <line x1="15" y1="37" x2="119" y2="97"/>
      <g fill="currentColor" stroke="none" font-size="15" text-anchor="middle">
        <text x="48" y="41">5</text><text x="86" y="41">8</text>
        <text x="103" y="72">11</text><text x="86" y="103">30</text>
        <text x="48" y="103">72</text><text x="31" y="72">?</text>
      </g>`,
  },
}

/** Inline <svg> markup for a figure key, or null when the key is unknown. */
export function figureSvg(key: string): string | null {
  const f = figures[key]
  if (!f) return null
  const cls = f.size === 'sm' ? 'mv-figure mv-figure-sm' : 'mv-figure'
  return (
    `<svg class="${cls}" viewBox="${f.viewBox}" role="img" aria-label="${f.title.replace(/"/g, '&quot;')}"`
    + ` fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square">`
    + `<title>${f.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>`
    + f.body
    + `</svg>`
  )
}
