import { useLayoutEffect, useRef, useState } from 'react'

export type DistributionData = {
  totalUsers: number
  buckets: number[] // 10 buckets: 0-9%, 10-19%, … 90-100%
  systemCutoffPct: number
}

type Props = {
  dist: DistributionData
  userPct: number
  /** Exam's native mark scale (e.g. 200). Defaults to 100 → axis reads in %. */
  totalMarks?: number
  /** Selected-category cutoff as % of total marks, if the board has published one. */
  officialCutoffPct?: number
  officialCutoffLabel?: string
}

/** Round a rough step up to a "nice" 1/2/5 × 10ⁿ value, for clean Y ticks. */
function niceStep(rough: number): number {
  if (rough <= 0) return 1
  const mag = Math.pow(10, Math.floor(Math.log10(rough)))
  const norm = rough / mag
  const nice = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10
  return nice * mag
}

/**
 * "Marks Distribution" — the Testbook-style curve: marks along the bottom (X)
 * axis, number of students up the left (Y) axis, drawn as a line through each
 * marks band, with the selected cut-off marked as a thin vertical line. The
 * line is drawn only between bands that actually hold students. The SVG renders
 * at the container's real pixel width (via a ResizeObserver) so label text
 * stays a constant, readable size on every screen instead of scaling with the
 * chart.
 */
export function ScorePositionChart({ dist, userPct, totalMarks, officialCutoffPct, officialCutoffLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(560)
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = (cw: number) => { if (cw > 0) setW(Math.round(cw)) }
    measure(el.getBoundingClientRect().width) // sync, before first paint
    const ro = new ResizeObserver(entries => measure(entries[0].contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const total = totalMarks && totalMarks > 0 ? totalMarks : 100
  const counts = dist.buckets
  const nB = counts.length || 1
  const bw = total / nB // marks per band

  // 1 viewBox unit = 1 CSS pixel, so font sizes are true px on every screen.
  const narrow = w < 440
  const W = w
  const H = Math.round(Math.min(320, Math.max(230, W * 0.56)))
  const FS = { num: narrow ? 10 : 11 }
  const PAD = { left: narrow ? 40 : 48, right: 16, top: 26, bottom: narrow ? 40 : 42 }
  const pw = W - PAD.left - PAD.right
  const ph = H - PAD.top - PAD.bottom

  // Clean Y axis: nice integer student-count ticks up to a rounded max
  const rawMax = Math.max(1, ...counts)
  const yStep = niceStep(rawMax / 4)
  const yMax = Math.ceil(rawMax / yStep) * yStep
  const yTicks: number[] = []
  for (let v = 0; v <= yMax; v += yStep) yTicks.push(v)

  // marks → x; count → y
  const x = (marks: number) => PAD.left + (Math.max(0, Math.min(total, marks)) / total) * pw
  const y = (count: number) => PAD.top + (1 - count / yMax) * ph
  const BOTTOM = PAD.top + ph
  const centre = (i: number) => (i + 0.5) * bw

  // Line through bands that actually hold students (no flat drag through empties)
  const pts = counts.map((c, i) => ({ marks: centre(i), count: c })).filter(p => p.count > 0)
  const hasLine = pts.length >= 2
  const lineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.marks).toFixed(1)} ${y(p.count).toFixed(1)}`).join(' ')
  const areaD = hasLine ? `${lineD} L ${x(pts[pts.length - 1].marks).toFixed(1)} ${BOTTOM} L ${x(pts[0].marks).toFixed(1)} ${BOTTOM} Z` : ''

  const hasOfficial = officialCutoffPct != null && officialCutoffPct > 0
  const cutMarks = hasOfficial ? (officialCutoffPct! / 100) * total
    : dist.systemCutoffPct > 0 ? (dist.systemCutoffPct / 100) * total : undefined
  const cutColor = hasOfficial ? 'var(--red)' : 'var(--hl-dark)'
  const cutLabel = hasOfficial ? `${officialCutoffLabel ?? 'Official'} cutoff` : 'Est. cutoff'

  const clampX = (cx: number, halfW: number) => Math.max(PAD.left + halfW, Math.min(W - PAD.right - halfW, cx))

  // Where the viewer sits on the curve. Anchored to their band's centre rather
  // than their exact marks so the marker lands ON the plotted point instead of
  // floating just off the line.
  const hasUser = Number.isFinite(userPct) && userPct >= 0
  const userBand = Math.min(nB - 1, Math.max(0, Math.floor((userPct / 100) * nB)))
  const userCount = counts[userBand] ?? 0
  const fmt = (m: number) => (total <= 100 ? `${Math.round(m)}%` : Math.round(m).toString())
  const fmtK = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : n.toLocaleString('en-IN'))

  return (
    <div ref={wrapRef}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="an2-trend-svg" role="img"
        aria-label={`Marks distribution of ${dist.totalUsers} students${hasUser ? `, with your score of ${Math.round(userPct)}% marked` : ''}`}>
        {/* Y gridlines — number of students */}
        {yTicks.map(v => (
          <g key={v}>
            <line x1={PAD.left} y1={y(v)} x2={W - PAD.right} y2={y(v)} stroke="var(--line2)" strokeWidth={1} />
            <text x={PAD.left - 6} y={y(v) + 3} textAnchor="end" fontSize={FS.num} fill="var(--ink4)">{fmtK(v)}</text>
          </g>
        ))}
        <text transform={`translate(11 ${PAD.top + ph / 2}) rotate(-90)`} textAnchor="middle" fontSize={FS.num} fontWeight={600} fill="var(--ink4)">
          No. of students
        </text>

        {/* X axis — marks bands */}
        {counts.map((_, i) => {
          if (narrow && i % 2 === 1) return null
          const lo = Math.round(i * bw), hi = Math.round((i + 1) * bw)
          return (
            <text key={i} x={x(centre(i))} y={H - 20} textAnchor="middle" fontSize={narrow ? 8.5 : 9.5} fill="var(--ink4)">
              {lo}-{hi}
            </text>
          )
        })}
        <text x={PAD.left + pw / 2} y={H - 6} textAnchor="middle" fontSize={FS.num} fontWeight={600} fill="var(--ink4)">Marks</text>

        {/* Distribution line + area */}
        {hasLine && <path d={areaD} fill="#22b8e6" opacity={0.10} />}
        {hasLine && <path d={lineD} fill="none" stroke="#22b8e6" strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />}
        {pts.map((p, i) => (
          <circle key={i} cx={x(p.marks)} cy={y(p.count)} r={narrow ? 2.8 : 3.4} fill="#22b8e6" style={{ stroke: 'var(--surface)' }} strokeWidth={1.2} />
        ))}

        {/* "You" — the viewer's own point on the curve, drawn after the line so
            it sits above it, and before the cut-off so the cut-off label wins
            if the two happen to land in the same place. */}
        {hasUser && (() => {
          const ux = x(centre(userBand))
          const uy = y(userCount)
          const lx = clampX(ux, 19)
          // Flip the pill below the dot when the point is high enough that the
          // label would otherwise collide with the cut-off row or clip the top.
          const above = uy - PAD.top > 34
          const py = above ? uy - 24 : uy + 10
          return (
            <g>
              <circle cx={ux} cy={uy} r={narrow ? 4.4 : 5.4} fill="var(--blue)"
                style={{ stroke: 'var(--surface)' }} strokeWidth={2} />
              <rect x={lx - 17} y={py - 9} width={34} height={17} rx={8.5} fill="var(--blue)" />
              <text x={lx} y={py + 3.5} textAnchor="middle" fontSize={narrow ? 9 : 10}
                fontWeight={700} fill="#fff">You</text>
            </g>
          )
        })()}

        {/* Cut-off — thin vertical marker at the cut-off marks, tiny ✕ + label at top */}
        {cutMarks != null && (() => {
          const cx = x(cutMarks)
          return (
            <g style={{ stroke: cutColor, fill: cutColor }}>
              <line x1={cx} y1={PAD.top + 8} x2={cx} y2={BOTTOM} strokeWidth={1.1} strokeDasharray="4 4" opacity={0.6} />
              <circle cx={cx} cy={PAD.top + 4} r={6.5} style={{ fill: 'var(--surface)', stroke: cutColor }} strokeWidth={1.1} />
              <g strokeWidth={1.4} strokeLinecap="round">
                <line x1={cx - 3} y1={PAD.top + 1} x2={cx + 3} y2={PAD.top + 7} />
                <line x1={cx - 3} y1={PAD.top + 7} x2={cx + 3} y2={PAD.top + 1} />
              </g>
              <text x={clampX(cx, 48)} y={PAD.top - 8} textAnchor="middle" fontSize={FS.num} fontWeight={700}>
                {cutLabel}: {fmt(cutMarks)}
              </text>
            </g>
          )
        })()}
      </svg>

      <div className="an2-legend-row">
        <span className="an2-legend-key"><i style={{ background: '#22b8e6' }} /> Students ({dist.totalUsers.toLocaleString('en-IN')})</span>
        {hasUser && (
          <span className="an2-legend-key"><i style={{ background: 'var(--blue)' }} /> You <strong>{fmt((userPct / 100) * total)}</strong></span>
        )}
        {cutMarks != null && (
          <span className="an2-legend-key"><i className="an2-legend-x" style={{ color: cutColor }}>✕</i> {cutLabel} <strong>{fmt(cutMarks)}</strong></span>
        )}
      </div>

      {dist.totalUsers < 3 && (
        <p className="an2-dist-note">
          Only {dist.totalUsers} student{dist.totalUsers !== 1 ? 's have' : ' has'} attempted this exam so far — the
          curve will get more meaningful as more people attempt it.
        </p>
      )}
    </div>
  )
}
