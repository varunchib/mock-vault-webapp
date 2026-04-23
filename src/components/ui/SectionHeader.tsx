type SectionHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string
  center?: boolean
}

export function SectionHeader({ eyebrow, title, subtitle, center = false }: SectionHeaderProps) {
  return (
    <div className={center ? 'section-copy center' : 'section-copy'}>
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-h2">{title}</h2>
      {subtitle ? <p className="section-sub">{subtitle}</p> : null}
    </div>
  )
}
