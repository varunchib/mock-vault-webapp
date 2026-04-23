import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { stats } from '../../data/landing'

function CountStat({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let frame = 0
    const totalFrames = 55
    const timer = window.setInterval(() => {
      frame += 1
      const progress = Math.min(frame / totalFrames, 1)
      setCount(Math.round(target * progress))
      if (progress === 1) window.clearInterval(timer)
    }, 25)

    return () => window.clearInterval(timer)
  }, [isInView, target])

  return (
    <div className="stat-cell" ref={ref}>
      <div className="stat-n">{count}<em>{suffix}</em></div>
      <div className="stat-l">{label}</div>
    </div>
  )
}

export function StatsStrip() {
  return (
    <section className="stats-strip" aria-label="PYQVault platform stats">
      {stats.map((stat) => (
        <CountStat key={stat.label} {...stat} />
      ))}
    </section>
  )
}
