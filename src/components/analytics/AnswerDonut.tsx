const COLORS = { correct: '#22C55E', wrong: '#EF4444', skipped: '#A1A1AA' } as const

type Props = { correct: number; wrong: number; skipped: number }

function arc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  const [x0, y0] = p(a0)
  const [x1, y1] = p(a1)
  const large = a1 - a0 > Math.PI ? 1 : 0
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`
}

/** Donut of correct / wrong / skipped across the selected attempts. */
export function AnswerDonut({ correct, wrong, skipped }: Props) {
  const total = correct + wrong + skipped
  if (total === 0) return null

  const slices = [
    { key: 'correct' as const, label: 'Correct', value: correct },
    { key: 'wrong' as const, label: 'Wrong', value: wrong },
    { key: 'skipped' as const, label: 'Skipped', value: skipped },
  ].filter(s => s.value > 0)

  const R = 56, CX = 70, CY = 70, STROKE = 20
  // 2px surface gap between slices, expressed as an angle at radius R
  const gap = slices.length > 1 ? 2 / R : 0
  let angle = -Math.PI / 2

  return (
    <div className="an2-donut-wrap">
      <svg viewBox="0 0 140 140" className="an2-donut-svg" role="img"
        aria-label={`${correct} correct, ${wrong} wrong, ${skipped} skipped of ${total} questions`}>
        {slices.map(s => {
          const sweep = (s.value / total) * Math.PI * 2
          const a0 = angle + gap / 2
          const a1 = angle + sweep - gap / 2
          angle += sweep
          if (a1 <= a0) return null
          return (
            <path key={s.key} d={arc(CX, CY, R, a0, a1)} fill="none"
              stroke={COLORS[s.key]} strokeWidth={STROKE} strokeLinecap="butt" />
          )
        })}
        <text x={CX} y={CY - 3} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink)">
          {Math.round((correct / total) * 100)}%
        </text>
        <text x={CX} y={CY + 15} textAnchor="middle" fontSize={9} fill="var(--ink3)">correct</text>
      </svg>

      <div className="an2-donut-legend">
        {[
          { key: 'correct' as const, label: 'Correct', value: correct },
          { key: 'wrong' as const, label: 'Wrong', value: wrong },
          { key: 'skipped' as const, label: 'Skipped', value: skipped },
        ].map(s => (
          <span key={s.key} className="an2-legend-key">
            <i style={{ background: COLORS[s.key] }} />
            {s.label} <strong>{s.value}</strong>
          </span>
        ))}
      </div>
    </div>
  )
}
