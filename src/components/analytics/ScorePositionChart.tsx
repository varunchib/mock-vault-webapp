import { useState } from 'react'

export type DistributionData = {
  totalUsers: number
  buckets: number[] // 10 buckets: 0-9%, 10-19%, … 90-100%
  systemCutoffPct: number
}

type Props = {
  dist: DistributionData
  userPct: number
  /** Official cutoff as % of total marks, if the board has published one. */
  officialCutoffPct?: number
  officialCutoffLabel?: string
}

/**
 * "Score position" — a line graph of how ALL platform users scored on this
 * exam (share of users per 10% score band), with vertical markers for the
 * viewer, the system-estimated cutoff (65th percentile of best scores), and
 * the official cutoff when one exists. Renders regardless of official cutoff
 * availability — the platform distribution is always real data.
 */
export function ScorePositionChart({ dist, userPct, officialCutoffPct, officialCutoffLabel }: Props) {
  const [narrow] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches)

  const W = narrow ? 380 : 640, H = narrow ? 200 : 230
  const PAD = { left: 34, right: 16, top: 26, bottom: 30 }
  const pw = W - PAD.left - PAD.right
  const ph = H - PAD.top - PAD.bottom

  const maxCount = Math.max(1, ...dist.buckets)
  // Bucket centres: 5%, 15%, … 95%
  const x = (pct: number) => PAD.left + (Math.max(0, Math.min(100, pct)) / 100) * pw
  const y = (count: number) => PAD.top + (1 - count / maxCount) * ph

  const pts = dist.buckets.map((c, i) => ({ pct: i * 10 + 5, count: c }))
  const lineD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(p.pct).toFixed(1)} ${y(p.count).toFixed(1)}`).join(' ')
  const BOTTOM = PAD.top + ph
  const areaD = `${lineD} L ${x(95).toFixed(1)} ${BOTTOM} L ${x(5).toFixed(1)} ${BOTTOM} Z`

  // Only "You" carries an inline label — cutoff markers sit close together and
  // their labels collide, so their values live in the legend instead.
  const marker = (pct: number, color: string, label: string, dash?: boolean, showLabel?: boolean) => (
    <g key={label}>
      <line
        x1={x(pct)} y1={PAD.top - 6} x2={x(pct)} y2={BOTTOM}
        stroke={color} strokeWidth={showLabel ? 2 : 1.5}
        strokeDasharray={dash ? '4 3' : undefined}
      />
      {showLabel && (
        <text x={x(pct)} y={PAD.top - 10} textAnchor="middle" fontSize={9.5} fontWeight={700} fill={color}>
          {label} {Math.round(pct)}%
        </text>
      )}
    </g>
  )

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="an2-trend-svg" role="img"
        aria-label={`Score distribution of ${dist.totalUsers} users`}>
        {/* Y gridlines (user counts) */}
        {[0, 0.5, 1].map(f => (
          <g key={f}>
            <line x1={PAD.left} y1={y(f * maxCount)} x2={W - PAD.right} y2={y(f * maxCount)} stroke="var(--line2)" strokeWidth={1} />
            <text x={PAD.left - 6} y={y(f * maxCount) + 3} textAnchor="end" fontSize={9} fill="var(--ink4)">
              {Math.round(f * maxCount)}
            </text>
          </g>
        ))}
        {/* X ticks every 25% */}
        {[0, 25, 50, 75, 100].map(v => (
          <text key={v} x={x(v)} y={H - 8} textAnchor="middle" fontSize={9} fill="var(--ink4)">{v}%</text>
        ))}

        <path d={areaD} fill="var(--blue)" opacity={0.08} />
        <path d={lineD} fill="none" stroke="var(--blue)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

        {/* Markers: official cutoff (if any) → system cutoff → you (drawn last, on top) */}
        {officialCutoffPct != null && officialCutoffPct > 0 &&
          marker(officialCutoffPct, '#DC2626', officialCutoffLabel ?? 'Official', true)}
        {dist.systemCutoffPct > 0 && marker(dist.systemCutoffPct, '#D97706', 'Est. cutoff', true)}
        {marker(userPct, '#1D4ED8', 'You', false, true)}
      </svg>

      <div className="an2-legend-row">
        <span className="an2-legend-key"><i style={{ background: '#1D4ED8' }} /> Your best score <strong>{Math.round(userPct)}%</strong></span>
        {dist.systemCutoffPct > 0 && (
          <span className="an2-legend-key"><i style={{ background: '#D97706' }} /> Est. cutoff <strong>{dist.systemCutoffPct}%</strong> (65th percentile of {dist.totalUsers} user{dist.totalUsers !== 1 ? 's' : ''})</span>
        )}
        {officialCutoffPct != null && officialCutoffPct > 0 && (
          <span className="an2-legend-key"><i style={{ background: '#DC2626' }} /> Official {officialCutoffLabel ? `(${officialCutoffLabel}) ` : ''}cutoff <strong>{Math.round(officialCutoffPct)}%</strong></span>
        )}
      </div>

      {dist.totalUsers < 3 && (
        <p className="an2-dist-note">
          Only {dist.totalUsers} user{dist.totalUsers !== 1 ? 's have' : ' has'} attempted this exam so far — the
          distribution and estimated cutoff will get more meaningful as more people attempt it.
        </p>
      )}
    </div>
  )
}
