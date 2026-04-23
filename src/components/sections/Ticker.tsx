import { tickerItems } from '../../data/landing'

export function Ticker() {
  const repeatedItems = [...tickerItems, ...tickerItems]

  return (
    <div className="ticker-strip" aria-label="Latest paper updates">
      <div className="ticker-inner">
        {repeatedItems.map((item, index) => (
          <span className="t-item" key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}
