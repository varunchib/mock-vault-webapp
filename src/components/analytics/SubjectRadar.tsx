import type { SubjectAgg } from '../../lib/subjectAgg'

/**
 * Spider chart of per-subject accuracy. Meaningful from 3 axes up — the
 * caller should fall back to bars alone below that.
 */
export function SubjectRadar({ subjects }: { subjects: SubjectAgg[] }) {
  const axes = subjects.slice(0, 8)
  const n = axes.length
  if (n < 3) return null

  const SIZE = 370, CX = SIZE / 2, CY = SIZE / 2, R = 92
  const angle = (i: number) => -Math.PI / 2 + (i / n) * Math.PI * 2
  const pt = (i: number, r: number): [number, number] =>
    [CX + r * Math.cos(angle(i)), CY + r * Math.sin(angle(i))]

  const ring = (frac: number) =>
    axes.map((_, i) => pt(i, R * frac).map(v => v.toFixed(1)).join(',')).join(' ')

  const dataPts = axes.map((s, i) => pt(i, R * (s.accuracy / 100)))
  const dataPoly = dataPts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="an2-radar-svg"
      role="img"
      aria-label={`Subject accuracy radar: ${axes.map(s => `${s.subject} ${s.accuracy}%`).join(', ')}`}
    >
      {/* Grid rings at 25/50/75/100% */}
      {[0.25, 0.5, 0.75, 1].map(f => (
        <polygon key={f} points={ring(f)} fill="none" stroke="var(--line2)" strokeWidth={1} />
      ))}
      {/* Axes */}
      {axes.map((_, i) => {
        const [x2, y2] = pt(i, R)
        return <line key={i} x1={CX} y1={CY} x2={x2} y2={y2} stroke="var(--line2)" strokeWidth={1} />
      })}

      {/* Data polygon */}
      <polygon points={dataPoly} fill="var(--blue)" opacity={0.14} />
      <polygon points={dataPoly} fill="none" stroke="var(--blue)" strokeWidth={2} strokeLinejoin="round" />
      {dataPts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill="var(--blue)" stroke="var(--white)" strokeWidth={2}>
          <title>{axes[i].subject}: {axes[i].accuracy}%</title>
        </circle>
      ))}

      {/* Labels: subject + value, kept inside the viewBox */}
      {axes.map((s, i) => {
        const [x, y] = pt(i, R + 16)
        const anchor = Math.abs(x - CX) < 12 ? 'middle' : x > CX ? 'start' : 'end'
        return (
          <text key={s.subject} x={x} y={y + 3} textAnchor={anchor} fontSize={10} fill="var(--ink3)">
            {s.subject.length > 14 ? `${s.subject.slice(0, 13)}…` : s.subject}
            <tspan fontWeight={700} fill="var(--ink)"> {s.accuracy}%</tspan>
          </text>
        )
      })}
    </svg>
  )
}
