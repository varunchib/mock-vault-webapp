import { useCountUp } from '../../hooks/useCountUp'
import { STATS } from '../../data'

function StatCell({ value, suffix, label }) {
  const { count, ref } = useCountUp(value)
  return (
    <div ref={ref} className="flex-1 min-w-[140px] text-center px-5 py-7 border-r border-line last:border-r-0">
      <div className="font-display text-[34px] font-bold text-ink leading-none">
        {count}<em className="not-italic text-hl-dark">{suffix}</em>
      </div>
      <div className="text-[13px] text-ink-3 font-medium mt-1.5">{label}</div>
    </div>
  )
}

export function StatsStrip() {
  return (
    <div className="bg-white border-t border-b border-line flex flex-wrap px-[5%]">
      {STATS.map((s) => (
        <StatCell key={s.label} {...s} />
      ))}
    </div>
  )
}
