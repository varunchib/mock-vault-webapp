type HaloLoaderProps = {
  label?: string
  fullHeight?: boolean
}

export function HaloLoader({
  label = 'Loading',
  fullHeight = true,
}: HaloLoaderProps) {
  return (
    <div
      className={`halo-loader-shell${fullHeight ? ' full' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className="halo-loader">
        <span className="halo-loader-core" />
        <span className="halo-loader-ring" />
      </span>
      <span className="sr-only">{label}</span>
    </div>
  )
}
