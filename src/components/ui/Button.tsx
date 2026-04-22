import { cn } from '../../lib/utils'

const variants = {
  primary:  'bg-ink text-hl hover:bg-zinc-800 border-transparent',
  ghost:    'bg-white text-ink-2 border-line hover:border-ink-2',
  hl:       'bg-hl text-ink font-bold hover:bg-yellow-300 border-transparent',
  outlineLight: 'bg-transparent text-ink-4 border-zinc-600 hover:text-white hover:border-zinc-400',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-[9px]',
  lg: 'px-8 py-[15px] text-base rounded-[10px]',
}

export function Button({ children, variant = 'primary', size = 'md', className, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold font-body',
        'border transition-all duration-150 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  )
}
