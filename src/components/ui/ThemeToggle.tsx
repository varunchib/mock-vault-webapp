import { Monitor, Moon, Sun } from 'lucide-react'
import { setThemePref, useThemePref, type ThemePref } from '../../lib/useTheme'

const ORDER: ThemePref[] = ['light', 'dark', 'system']
const ICON = { light: Sun, dark: Moon, system: Monitor }
const LABEL = { light: 'Light', dark: 'Dark', system: 'System' }

/** Cycles Light → Dark → System. Icon reflects the current preference. */
export function ThemeToggle({ className = '', size = 18 }: { className?: string; size?: number }) {
  const pref = useThemePref()
  const Icon = ICON[pref]
  const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length]
  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={() => setThemePref(next)}
      aria-label={`Theme: ${LABEL[pref]}. Switch to ${LABEL[next]}.`}
      title={`Theme: ${LABEL[pref]} — click for ${LABEL[next]}`}
    >
      <Icon size={size} strokeWidth={2} />
    </button>
  )
}
