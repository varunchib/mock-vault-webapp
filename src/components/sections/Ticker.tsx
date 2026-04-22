import { TICKER_ITEMS } from '../../data'

export function Ticker() {
  // Duplicate for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="mt-16 bg-hl overflow-hidden py-2.5">
      <div className="flex gap-12 animate-ticker whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="text-[13px] font-bold text-ink flex items-center gap-1.5 shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
