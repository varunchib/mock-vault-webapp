import { useRef, useState } from 'react'

export type TrendPoint = {
  pct: number
  net: number
  max: number
  title: string
  examName: string
  attemptedAt: string
}

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

// Single series → no legend; the heading names it. 2px line, 10% area wash,
// crosshair + tooltip listing the attempt under the pointer, focusable points.
export function ScoreTrendChart({ points }: { points: TrendPoint[] }) {
  const [active, setActive] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Narrow screens get a narrower viewBox so axis text renders at a readable
  // size instead of scaling down with the SVG.
  const [narrow] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches)

  const W = narrow ? 380 : 720, H = narrow ? 190 : 220
  const PAD = { left: 34, right: 18, top: 16, bottom: 26 }
  const pw = W - PAD.left - PAD.right
  const ph = H - PAD.top - PAD.bottom
  const n = points.length

  const x = (i: number) => PAD.left + (n === 1 ? pw / 2 : (i / (n - 1)) * pw)
  const y = (pct: number) => PAD.top + (1 - pct / 100) * ph

  const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.pct).toFixed(1)}`).join(' ')
  const areaD = n > 1
    ? `${lineD} L ${x(n - 1).toFixed(1)} ${(PAD.top + ph).toFixed(1)} L ${x(0).toFixed(1)} ${(PAD.top + ph).toFixed(1)} Z`
    : ''

  // Date ticks: first, last, and up to 3 evenly spaced between
  const tickIdx = n <= 5
    ? points.map((_, i) => i)
    : [0, Math.round((n - 1) * 0.25), Math.round((n - 1) * 0.5), Math.round((n - 1) * 0.75), n - 1]
  const uniqueTicks = [...new Set(tickIdx)]

  const onMove = (e: React.PointerEvent) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const px = ((e.clientX - rect.left) / rect.width) * W
    const i = n === 1 ? 0 : Math.round(((px - PAD.left) / pw) * (n - 1))
    setActive(Math.max(0, Math.min(n - 1, i)))
  }

  const a = active != null ? points[active] : null

  return (
    <div className="an2-trend-wrap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="an2-trend-svg"
        role="img"
        aria-label={`Score trend across ${n} attempts`}
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
      >
        {/* Y gridlines at clean percents */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={PAD.left} y1={y(v)} x2={W - PAD.right} y2={y(v)} stroke="var(--line2)" strokeWidth={1} />
            <text x={PAD.left - 6} y={y(v) + 3} textAnchor="end" fontSize={9} fill="var(--ink4)">{v}%</text>
          </g>
        ))}

        {/* X date ticks */}
        {uniqueTicks.map(i => (
          <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize={9} fill="var(--ink4)">
            {shortDate(points[i].attemptedAt)}
          </text>
        ))}

        {/* Area wash + line */}
        {areaD && <path d={areaD} fill="var(--blue)" opacity={0.08} />}
        <path d={lineD} fill="none" stroke="var(--blue)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {/* Crosshair */}
        {a && active != null && (
          <line x1={x(active)} y1={PAD.top} x2={x(active)} y2={PAD.top + ph} stroke="var(--ink4)" strokeWidth={1} />
        )}

        {/* Points: visible end-dot always; others appear on hover/focus. Each has
            a generous transparent hit/focus target so keyboard gets the tooltip too. */}
        {points.map((p, i) => {
          const isEnd = i === n - 1
          const isActive = active === i
          return (
            <g key={i}>
              {(isEnd || isActive) && (
                <circle cx={x(i)} cy={y(p.pct)} r={4.5} fill="var(--blue)" stroke="var(--white)" strokeWidth={2} />
              )}
              <circle
                cx={x(i)} cy={y(p.pct)} r={14}
                fill="transparent"
                tabIndex={0}
                aria-label={`${p.net}/${p.max} (${p.pct}%) — ${p.title}, ${shortDate(p.attemptedAt)}`}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                style={{ outline: 'none', cursor: 'pointer' }}
              />
            </g>
          )
        })}

        {/* Direct label on the latest attempt */}
        {n > 0 && active == null && (
          <text
            x={Math.min(x(n - 1), W - PAD.right - 4)}
            y={Math.max(y(points[n - 1].pct) - 10, 11)}
            textAnchor="end" fontSize={11} fontWeight={700} fill="var(--ink)"
          >
            {points[n - 1].pct}%
          </text>
        )}
      </svg>

      {a && (
        <div className="an2-trend-tip" style={{ left: `${(x(active!) / W) * 100}%` }}>
          <strong>{a.net}/{a.max} · {a.pct}%</strong>
          <span>{a.title}</span>
          <span className="an2-trend-tip-meta">{a.examName} · {shortDate(a.attemptedAt)}</span>
        </div>
      )}
    </div>
  )
}
