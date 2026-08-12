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

  // ── SSC CGL 2025 Tier 2 (19 Jan 2026) ────────────────────────────────────
  // Q53 — paper folding and cutting. Redrawn from the question paper: the
  // export replaced every answer figure with the literal text "(figure N)",
  // so without these the question cannot be answered at all.
  'ssc-cgl-2025-tier2-q53': {
    title:
      'Three problem figures. X is a square with a horizontal dotted fold line across '
      + 'its middle and a curved arrow folding the top half down. Y is the resulting '
      + 'half-height rectangle, the folded-away top shown dotted above it, with a '
      + 'vertical dotted fold line and a curved arrow folding the left half to the '
      + 'right. Z is the folded packet, showing a shallow six-sided notch cut out of '
      + 'the strip immediately below the horizontal fold, running from the vertical '
      + 'fold line to the right-hand edge.',
    viewBox: '0 0 400 150',
    body: `
      <rect x="14" y="14" width="104" height="104"/>
      <line x1="14" y1="66" x2="118" y2="66" stroke-dasharray="5 5"/>
      <path d="M62 40 q14 12 8 30" fill="none"/>
      <path d="M64 76 l6 -8 l6 10 z" fill="currentColor" stroke="none"/>
      <rect x="148" y="66" width="104" height="52"/>
      <path d="M148 66 L148 20 L252 20 L252 66" stroke-dasharray="5 5"/>
      <line x1="200" y1="70" x2="200" y2="114" stroke-dasharray="5 5"/>
      <path d="M176 96 q22 -14 40 -2" fill="none"/>
      <path d="M210 86 l10 8 l-11 6 z" fill="currentColor" stroke="none"/>
      <rect x="282" y="14" width="104" height="104"/>
      <line x1="282" y1="66" x2="334" y2="66" stroke-dasharray="5 5"/>
      <line x1="334" y1="66" x2="334" y2="118"/>
      <path d="M334 66 L346 80 L374 80 L386 66" fill="none"/>
      <g fill="currentColor" stroke="none" font-size="15" text-anchor="middle"
         font-weight="bold">
        <text x="66" y="140">X</text><text x="200" y="140">Y</text>
        <text x="334" y="140">Z</text>
      </g>`,
  },

  // The four answer figures. Each is the same 120-square; only the arrangement
  // of the six-sided holes differs, so they must be drawn to the same scale or
  // the comparison the question asks for stops working.
  'ssc-cgl-2025-tier2-q53a': {
    title:
      'A square with four six-sided holes arranged as a pinwheel about the centre, '
      + 'each arm offset to one side of its axis.',
    viewBox: '0 0 120 120',
    size: 'sm',
    body: `
      <rect x="4" y="4" width="112" height="112"/>
      <g>
        <path d="M60 60 L70 46 L102 46 L114 57 L102 68 L70 68 Z"/>
        <path d="M60 60 L70 46 L102 46 L114 57 L102 68 L70 68 Z"
              transform="rotate(90 60 60)"/>
        <path d="M60 60 L70 46 L102 46 L114 57 L102 68 L70 68 Z"
              transform="rotate(180 60 60)"/>
        <path d="M60 60 L70 46 L102 46 L114 57 L102 68 L70 68 Z"
              transform="rotate(270 60 60)"/>
      </g>`,
  },

  'ssc-cgl-2025-tier2-q53b': {
    title:
      'A square with two six-sided holes lying side by side along the horizontal '
      + 'centre line, meeting at a pinch point at the centre and reaching the left '
      + 'and right edges.',
    viewBox: '0 0 120 120',
    size: 'sm',
    body: `
      <rect x="4" y="4" width="112" height="112"/>
      <path d="M4 60 L16 48 L48 48 L60 60 L48 72 L16 72 Z"/>
      <path d="M60 60 L72 48 L104 48 L116 60 L104 72 L72 72 Z"/>`,
  },

  'ssc-cgl-2025-tier2-q53c': {
    title:
      'A square with two six-sided holes side by side on the horizontal centre line, '
      + 'together with a third identical hole rising from the centre to the top edge.',
    viewBox: '0 0 120 120',
    size: 'sm',
    body: `
      <rect x="4" y="4" width="112" height="112"/>
      <path d="M4 60 L16 48 L48 48 L60 60 L48 72 L16 72 Z"/>
      <path d="M60 60 L72 48 L104 48 L116 60 L104 72 L72 72 Z"/>
      <path d="M60 60 L48 48 L48 16 L60 4 L72 16 L72 48 Z"/>`,
  },

  'ssc-cgl-2025-tier2-q53d': {
    title:
      'A square with two six-sided holes near the centre offset vertically from each '
      + 'other, the left one above the centre line and the right one below, together '
      + 'with a stepped notch cut into the top-right and bottom-left edges.',
    viewBox: '0 0 120 120',
    size: 'sm',
    body: `
      <path d="M4 4 L74 4 L84 14 L116 14 L116 106 L46 106 L36 116 L4 116 Z"/>
      <path d="M4 54 L16 44 L48 44 L60 54 L48 64 L16 64 Z"/>
      <path d="M60 66 L72 56 L104 56 L116 66 L104 76 L72 76 Z"/>`,
  },

  // Q36 — figure analogy. Letters are drawn as <text> (rotated 180° where the
  // paper shows them inverted) and the emblems as real geometry, so the figure
  // stays legible at any size and needs no special font to be installed.
  'ssc-cgl-2025-tier2-q36': {
    title:
      'Problem figures: A contains the symbols T, C, a pair of round brackets and S. '
      + 'B contains an inverted C, an inverted T, an inverted S and a solid five-pointed '
      + 'star. C contains a downward arrow, an inverted C, a tall open rectangle and a '
      + 'plus sign. D is a question mark. Answer figures: 1 contains C, an upward arrow, '
      + 'a plus sign and a wide open rectangle; 2 contains C, an upward arrow, a cross '
      + 'and an open square; 3 contains C, an upward arrow, a cross and a tall open '
      + 'rectangle; 4 contains C, an upward arrow, a plus sign and a solid circle; '
      + '5 contains an inverted C, a downward arrow, a plus sign and an open circle.',
    viewBox: '0 0 460 260',
    body: `
      <g font-size="22" font-family="serif" fill="currentColor" stroke="none"
         text-anchor="middle">
        <text x="14" y="14" font-size="13" text-anchor="start">Problem Figures:</text>
        <text x="14" y="150" font-size="13" text-anchor="start">Answer Figures:</text>
      </g>

      <rect x="10" y="22" width="440" height="62"/>
      <line x1="120" y1="22" x2="120" y2="84"/>
      <line x1="230" y1="22" x2="230" y2="84"/>
      <line x1="340" y1="22" x2="340" y2="84"/>

      <g font-size="22" font-family="serif" fill="currentColor" stroke="none"
         text-anchor="middle">
        <text x="30" y="61">T</text><text x="52" y="61">C</text>
        <text x="74" y="61">()</text><text x="96" y="61">S</text>

        <text x="140" y="61" transform="rotate(180 140 53)">C</text>
        <text x="162" y="61" transform="rotate(180 162 53)">T</text>
        <text x="184" y="61" transform="rotate(180 184 53)">S</text>

        <text x="272" y="61" transform="rotate(180 272 53)">C</text>
        <text x="316" y="61">+</text>
        <text x="395" y="63" font-size="26">?</text>
      </g>
      <polygon fill="currentColor" stroke="none"
        points="206,44 208.7,51.3 216.5,51.6 210.4,56.4 212.5,63.9 206,59.6
                199.5,63.9 201.6,56.4 195.5,51.6 203.3,51.3"/>
      <line x1="250" y1="41" x2="250" y2="60"/>
      <polygon points="245,58 255,58 250,67" fill="currentColor" stroke="none"/>
      <rect x="288" y="41" width="13" height="24"/>

      <rect x="10" y="156" width="440" height="62"/>
      <line x1="98" y1="156" x2="98" y2="218"/>
      <line x1="186" y1="156" x2="186" y2="218"/>
      <line x1="274" y1="156" x2="274" y2="218"/>
      <line x1="362" y1="156" x2="362" y2="218"/>

      <g font-size="22" font-family="serif" fill="currentColor" stroke="none"
         text-anchor="middle">
        <text x="26" y="195">C</text><text x="62" y="195">+</text>
        <text x="114" y="195">C</text><text x="150" y="195">&#215;</text>
        <text x="202" y="195">C</text><text x="238" y="195">&#215;</text>
        <text x="290" y="195">C</text><text x="326" y="195">+</text>
        <text x="378" y="195" transform="rotate(180 378 187)">C</text>
        <text x="414" y="195">+</text>
      </g>
      <g>
        <line x1="44" y1="197" x2="44" y2="178"/>
        <polygon points="39,180 49,180 44,171" fill="currentColor" stroke="none"/>
        <rect x="72" y="182" width="22" height="12"/>

        <line x1="132" y1="197" x2="132" y2="178"/>
        <polygon points="127,180 137,180 132,171" fill="currentColor" stroke="none"/>
        <rect x="162" y="177" width="17" height="17"/>

        <line x1="220" y1="197" x2="220" y2="178"/>
        <polygon points="215,180 225,180 220,171" fill="currentColor" stroke="none"/>
        <rect x="252" y="174" width="13" height="24"/>

        <line x1="308" y1="197" x2="308" y2="178"/>
        <polygon points="303,180 313,180 308,171" fill="currentColor" stroke="none"/>
        <circle cx="346" cy="186" r="9" fill="currentColor" stroke="none"/>

        <line x1="396" y1="175" x2="396" y2="194"/>
        <polygon points="391,192 401,192 396,201" fill="currentColor" stroke="none"/>
        <circle cx="434" cy="186" r="9"/>
      </g>

      <g font-size="13" font-family="serif" fill="currentColor" stroke="none"
         text-anchor="middle">
        <text x="65" y="100">A</text><text x="175" y="100">B</text>
        <text x="285" y="100">C</text><text x="395" y="100">D</text>
        <text x="54" y="234">1</text><text x="142" y="234">2</text>
        <text x="230" y="234">3</text><text x="318" y="234">4</text>
        <text x="406" y="234">5</text>
      </g>`,
  },

  // Q34 / Q38 / Q47 — the question figure only. The four answer figures for
  // these three were lost in the export (see the note in cgl_tier2_repairs.py),
  // so the stem is drawn and the options still need artwork.
  'ssc-cgl-2025-tier2-q34': {
    title:
      'A square transparent sheet with a vertical dotted fold line down its middle. '
      + 'A triangle stands on a horizontal base with its apex on the fold line, and a '
      + 'semicircle is drawn on the triangle’s right-hand side, bulging to the right.',
    viewBox: '0 0 200 200',
    body: `
      <rect x="6" y="6" width="188" height="188"/>
      <line x1="100" y1="6" x2="100" y2="194" stroke-dasharray="6 7"/>
      <path d="M100 48 L36 140 L152 140 Z"/>
      <path d="M100 48 A 56 56 0 0 1 152 140" fill="none"/>`,
  },

  'ssc-cgl-2025-tier2-q38': {
    title:
      'A square frame containing a clock face marked with twelve ticks, the marks at '
      + 'twelve, three, six and nine drawn longer. Two arrows radiate from a solid hub '
      + 'at the centre: a long one pointing up and to the right towards the two '
      + 'o’clock mark, and a shorter, broader one pointing down and to the left '
      + 'towards the seven o’clock mark. A hatched vertical line stands to the '
      + 'right of the square, representing the mirror.',
    viewBox: '0 0 230 190',
    body: `
      <rect x="6" y="10" width="170" height="170"/>
      <circle cx="91" cy="95" r="72"/>
      <g>
        <line x1="91" y1="23" x2="91" y2="41"/>
        <line x1="163" y1="95" x2="145" y2="95"/>
        <line x1="91" y1="167" x2="91" y2="149"/>
        <line x1="19" y1="95" x2="37" y2="95"/>
        <line x1="127" y1="33.7" x2="121.5" y2="43.2"/>
        <line x1="152.3" y1="59" x2="142.8" y2="64.5"/>
        <line x1="152.3" y1="131" x2="142.8" y2="125.5"/>
        <line x1="127" y1="156.3" x2="121.5" y2="146.8"/>
        <line x1="55" y1="156.3" x2="60.5" y2="146.8"/>
        <line x1="29.7" y1="131" x2="39.2" y2="125.5"/>
        <line x1="29.7" y1="59" x2="39.2" y2="64.5"/>
        <line x1="55" y1="33.7" x2="60.5" y2="43.2"/>
      </g>
      <circle cx="91" cy="95" r="8" fill="currentColor" stroke="none"/>
      <line x1="91" y1="95" x2="140" y2="66"/>
      <polygon points="147,62 133,62 138,76" fill="currentColor" stroke="none"/>
      <line x1="91" y1="95" x2="59" y2="132"/>
      <polygon points="50,142 51,123 68,131" fill="currentColor" stroke="none"/>
      <line x1="196" y1="4" x2="196" y2="186"/>
      <g>
        <line x1="196" y1="30" x2="224" y2="12"/>
        <line x1="196" y1="60" x2="224" y2="42"/>
        <line x1="196" y1="90" x2="224" y2="72"/>
        <line x1="196" y1="120" x2="224" y2="102"/>
        <line x1="196" y1="150" x2="224" y2="132"/>
        <line x1="196" y1="180" x2="224" y2="162"/>
      </g>`,
  },

  'ssc-cgl-2025-tier2-q47': {
    title:
      'A long horizontal line. Two vertical strokes rise from it. A diagonal falls from '
      + 'the top of the left stroke to a point on the line between them, and a second '
      + 'diagonal rises from that same point to the top of the right stroke, forming a '
      + 'V between the two uprights.',
    viewBox: '0 0 240 116',
    body: `
      <line x1="6" y1="102" x2="234" y2="102"/>
      <line x1="56" y1="102" x2="56" y2="16"/>
      <line x1="56" y1="16" x2="114" y2="102"/>
      <line x1="114" y1="102" x2="170" y2="20"/>
      <line x1="170" y1="20" x2="170" y2="102"/>`,
  },

  // Q43 — Venn relation between Fathers, Teachers and Males. Every father is
  // male, so Fathers nests wholly inside Males; a teacher may be of either sex
  // and may or may not be a father, so Teachers must cut across both and also
  // reach outside them. Only 43a draws that.
  'ssc-cgl-2025-tier2-q43a': {
    title:
      'A small circle lying entirely inside a larger circle, with a third circle '
      + 'overlapping both of them and extending outside the larger circle.',
    viewBox: '0 0 120 120',
    size: 'sm',
    body: `
      <rect x="4" y="4" width="112" height="112"/>
      <circle cx="50" cy="60" r="34"/>
      <circle cx="42" cy="60" r="17"/>
      <circle cx="76" cy="60" r="28"/>`,
  },
  'ssc-cgl-2025-tier2-q43b': {
    title: 'Three circles of equal size, each overlapping both of the others.',
    viewBox: '0 0 120 120',
    size: 'sm',
    body: `
      <rect x="4" y="4" width="112" height="112"/>
      <circle cx="46" cy="48" r="26"/>
      <circle cx="74" cy="48" r="26"/>
      <circle cx="60" cy="74" r="26"/>`,
  },
  'ssc-cgl-2025-tier2-q43c': {
    title:
      'Three circles of equal size in a horizontal row, each overlapping only the '
      + 'circle next to it, none lying inside another.',
    viewBox: '0 0 120 120',
    size: 'sm',
    body: `
      <rect x="4" y="4" width="112" height="112"/>
      <circle cx="36" cy="60" r="22"/>
      <circle cx="60" cy="60" r="22"/>
      <circle cx="84" cy="60" r="22"/>`,
  },
  'ssc-cgl-2025-tier2-q43d': {
    title:
      'One large circle containing two smaller circles that lie side by side and do '
      + 'not touch each other.',
    viewBox: '0 0 120 120',
    size: 'sm',
    body: `
      <rect x="4" y="4" width="112" height="112"/>
      <circle cx="60" cy="60" r="40"/>
      <circle cx="45" cy="60" r="13"/>
      <circle cx="77" cy="60" r="13"/>`,
  },

  // Q47 — embedded figure. Only 47c contains the question figure: its full-width
  // horizontal line is the base, the two vertical half-diagonals are the
  // uprights, and the inner edges of the two rhombi form the V between them.
  'ssc-cgl-2025-tier2-q47a': {
    title:
      'A wide hexagon crossed by long internal diagonals, with no vertical lines.',
    viewBox: '0 0 160 100',
    size: 'sm',
    body: `
      <path d="M8 50 L40 18 L120 18 L152 50 L120 82 L40 82 Z"/>
      <path d="M8 50 L120 18 L40 82 L152 50"/>
      <line x1="40" y1="18" x2="120" y2="82"/>`,
  },
  'ssc-cgl-2025-tier2-q47b': {
    title:
      'Two rhombi standing apart, each crossed by its own diagonals, joined by a pair '
      + 'of lines that cross between them. There is no continuous horizontal base.',
    viewBox: '0 0 160 100',
    size: 'sm',
    body: `
      <path d="M8 50 L38 20 L68 50 L38 80 Z"/>
      <path d="M92 50 L122 20 L152 50 L122 80 Z"/>
      <line x1="8" y1="50" x2="68" y2="50"/>
      <line x1="92" y1="50" x2="152" y2="50"/>
      <line x1="68" y1="50" x2="92" y2="50"/>
      <line x1="38" y1="20" x2="122" y2="80"/>
      <line x1="38" y1="80" x2="122" y2="20"/>`,
  },
  'ssc-cgl-2025-tier2-q47c': {
    title:
      'Two rhombi side by side sharing a vertex, each crossed by a vertical and a '
      + 'horizontal diagonal, so that one continuous horizontal line runs through both.',
    viewBox: '0 0 160 100',
    size: 'sm',
    body: `
      <path d="M8 50 L44 18 L80 50 L44 82 Z"/>
      <path d="M80 50 L116 18 L152 50 L116 82 Z"/>
      <line x1="8" y1="50" x2="152" y2="50"/>
      <line x1="44" y1="18" x2="44" y2="82"/>
      <line x1="116" y1="18" x2="116" y2="82"/>`,
  },
  'ssc-cgl-2025-tier2-q47d': {
    title:
      'Two chevrons meeting at a downward point in the middle, drawn without any '
      + 'vertical lines and without a continuous horizontal base.',
    viewBox: '0 0 160 100',
    size: 'sm',
    body: `
      <path d="M8 46 L40 18 L72 46 L40 74 Z"/>
      <path d="M88 46 L120 18 L152 46 L120 74 Z"/>
      <path d="M40 74 L80 84 L120 74"/>
      <line x1="8" y1="46" x2="72" y2="46"/>
      <line x1="88" y1="46" x2="152" y2="46"/>`,
  },

  // Q34 — the folded sheet. The solid rectangle is the half that stays put; the
  // dotted rectangle marks where the folded-away half came from. Only 34c has
  // the arc bulging away from the fold with both slanting lines kept, which is
  // what a transparent sheet gives.
  'ssc-cgl-2025-tier2-q34a': {
    title:
      'A tall rectangle with a dotted rectangle beside it. Inside: a triangle and an '
      + 'arc bulging away from the fold line, but with no second slanting line.',
    viewBox: '0 0 130 140',
    size: 'sm',
    body: `
      <rect x="14" y="14" width="56" height="112"/>
      <rect x="70" y="14" width="56" height="112" stroke-dasharray="5 5"/>
      <path d="M70 39 L27 101 L70 101 Z"/>
      <path d="M70 39 A 35 35 0 0 0 39 101" fill="none"/>`,
  },
  'ssc-cgl-2025-tier2-q34b': {
    title:
      'A tall rectangle with a dotted rectangle beside it. Inside: a triangle, a '
      + 'second slanting line, and an arc curving back towards the fold line.',
    viewBox: '0 0 130 140',
    size: 'sm',
    body: `
      <rect x="14" y="14" width="56" height="112"/>
      <rect x="70" y="14" width="56" height="112" stroke-dasharray="5 5"/>
      <path d="M70 39 L27 101 L70 101 Z"/>
      <line x1="70" y1="39" x2="39" y2="101"/>
      <path d="M70 39 A 35 35 0 0 1 39 101" fill="none"/>`,
  },
  'ssc-cgl-2025-tier2-q34c': {
    title:
      'A tall rectangle with a dotted rectangle beside it. Inside: a triangle with its '
      + 'apex on the fold line, a second slanting line within it, and an arc bulging '
      + 'away from the fold line.',
    viewBox: '0 0 130 140',
    size: 'sm',
    body: `
      <rect x="14" y="14" width="56" height="112"/>
      <rect x="70" y="14" width="56" height="112" stroke-dasharray="5 5"/>
      <path d="M70 39 L27 101 L70 101 Z"/>
      <line x1="70" y1="39" x2="39" y2="101"/>
      <path d="M70 39 A 35 35 0 0 0 39 101" fill="none"/>`,
  },
  'ssc-cgl-2025-tier2-q34d': {
    title:
      'A tall rectangle with a dotted rectangle beside it. Inside: the same triangle, '
      + 'slanting line and arc, but turned upside down so the apex sits at the bottom.',
    viewBox: '0 0 130 140',
    size: 'sm',
    body: `
      <rect x="14" y="14" width="56" height="112"/>
      <rect x="70" y="14" width="56" height="112" stroke-dasharray="5 5"/>
      <path d="M70 101 L27 39 L70 39 Z"/>
      <line x1="70" y1="101" x2="39" y2="39"/>
      <path d="M70 101 A 35 35 0 0 1 39 39" fill="none"/>`,
  },

  // Q38 — the four dials. A right-hand mirror flips left-to-right only, so 38a
  // alone keeps both arrows at the same heights while reversing their sides.
  // The other three are the original, the arms swapped, and a top-edge flip.
  'ssc-cgl-2025-tier2-q38a': {
    title:
      'A clock dial with a long arrow pointing up and to the left towards the ten, and '
      + 'a shorter, broader arrow pointing down and to the right towards the five.',
    viewBox: '0 0 120 124',
    size: 'sm',
    body: `
      <rect x="4" y="6" width="112" height="112"/>
      <circle cx="60" cy="62" r="46"/>
      <circle cx="60" cy="62" r="6" fill="currentColor" stroke="none"/>
      <line x1="60" y1="62" x2="33" y2="47"/>
      <polygon points="27,44 40,42 37,54" fill="currentColor" stroke="none"/>
      <line x1="60" y1="62" x2="77" y2="79"/>
      <polygon points="84,86 71,83 82,73" fill="currentColor" stroke="none"/>`,
  },
  'ssc-cgl-2025-tier2-q38b': {
    title:
      'A clock dial with a short, broad arrow pointing up and to the left, and a long '
      + 'arrow pointing down and to the right.',
    viewBox: '0 0 120 124',
    size: 'sm',
    body: `
      <rect x="4" y="6" width="112" height="112"/>
      <circle cx="60" cy="62" r="46"/>
      <circle cx="60" cy="62" r="6" fill="currentColor" stroke="none"/>
      <line x1="60" y1="62" x2="43" y2="45"/>
      <polygon points="36,38 49,41 38,51" fill="currentColor" stroke="none"/>
      <line x1="60" y1="62" x2="87" y2="77"/>
      <polygon points="93,80 80,82 83,70" fill="currentColor" stroke="none"/>`,
  },
  'ssc-cgl-2025-tier2-q38c': {
    title:
      'A clock dial with a long arrow pointing up and to the right towards the two, and '
      + 'a shorter, broader arrow pointing down and to the left towards the seven — the '
      + 'original figure, unreflected.',
    viewBox: '0 0 120 124',
    size: 'sm',
    body: `
      <rect x="4" y="6" width="112" height="112"/>
      <circle cx="60" cy="62" r="46"/>
      <circle cx="60" cy="62" r="6" fill="currentColor" stroke="none"/>
      <line x1="60" y1="62" x2="87" y2="47"/>
      <polygon points="93,44 80,42 83,54" fill="currentColor" stroke="none"/>
      <line x1="60" y1="62" x2="43" y2="79"/>
      <polygon points="36,86 49,83 38,73" fill="currentColor" stroke="none"/>`,
  },
  'ssc-cgl-2025-tier2-q38d': {
    title:
      'A clock dial with a long arrow pointing down and to the right, and a shorter, '
      + 'broader arrow pointing up and to the left — the figure flipped top to bottom.',
    viewBox: '0 0 120 124',
    size: 'sm',
    body: `
      <rect x="4" y="6" width="112" height="112"/>
      <circle cx="60" cy="62" r="46"/>
      <circle cx="60" cy="62" r="6" fill="currentColor" stroke="none"/>
      <line x1="60" y1="62" x2="87" y2="77"/>
      <polygon points="93,80 80,82 83,70" fill="currentColor" stroke="none"/>
      <line x1="60" y1="62" x2="43" y2="45"/>
      <polygon points="36,38 49,41 38,51" fill="currentColor" stroke="none"/>`,
  },

  // ── RRB NTPC UG, 7 May 2026 Shift 1 ──────────────────────────────────────
  // Q78 — three-set Venn diagram. The section counts exist only inside an image
  // in the source PDF, so without this drawing the question cannot be answered.
  // Drawn rather than flattened to a table, because the overlaps ARE the
  // question: the reader has to see which regions lie inside both Employees
  // and German Speakers.
  'rrb-ntpc-2026-may07-s1-q78': {
    title:
      'A Venn diagram of three overlapping ellipses labelled Employees, Male and '
      + 'German Speakers. Employees alone contains 54; Employees and Male together '
      + '25; Male alone 43; Employees and German Speakers together 28; the centre, '
      + 'common to all three, 17; Male and German Speakers together 26; and German '
      + 'Speakers alone 15.',
    viewBox: '0 0 440 320',
    body: `
      <ellipse cx="160" cy="140" rx="112" ry="76"/>
      <ellipse cx="292" cy="132" rx="100" ry="72"/>
      <ellipse cx="218" cy="208" rx="112" ry="70"/>
      <g fill="currentColor" stroke="none" font-size="17" text-anchor="middle"
         font-family="serif">
        <text x="102" y="128">54</text>
        <text x="228" y="120">25</text>
        <text x="342" y="136">43</text>
        <text x="158" y="205">28</text>
        <text x="230" y="176">17</text>
        <text x="284" y="212">26</text>
        <text x="212" y="258">15</text>
      </g>
      <g fill="currentColor" stroke="none" font-size="16" font-family="sans-serif"
         font-weight="600">
        <text x="14" y="44">Employees</text>
        <text x="284" y="28">Male</text>
        <text x="322" y="288">German</text>
        <text x="322" y="306">Speakers</text>
      </g>
      <g>
        <line x1="62" y1="54" x2="62" y2="74"/>
        <line x1="62" y1="74" x2="94" y2="84"/>
        <polygon points="92,77 106,86 90,92" fill="currentColor" stroke="none"/>
        <line x1="300" y1="38" x2="300" y2="58"/>
        <polygon points="294,56 306,56 300,68" fill="currentColor" stroke="none"/>
        <line x1="318" y1="280" x2="288" y2="264"/>
        <polygon points="294,259 281,261 288,272" fill="currentColor" stroke="none"/>
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
