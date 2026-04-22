import { cn } from '../../lib/utils'

export function SectionHeader({ eyebrow, title, sub, center = false, className }) {
  return (
    <div className={cn(center && 'text-center', className)}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[2.5px] uppercase text-ink-4 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[clamp(28px,3.8vw,44px)] font-bold text-ink leading-[1.15] tracking-tight mb-3">
        {title}
      </h2>
      {sub && (
        <p className={cn('text-base text-ink-3 font-light', center ? 'max-w-md mx-auto' : 'max-w-lg')}>
          {sub}
        </p>
      )}
    </div>
  )
}
