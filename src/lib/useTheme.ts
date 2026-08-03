import { useSyncExternalStore } from 'react'

export type ThemePref = 'light' | 'dark' | 'system'

const KEY = 'theme'
const mq = () => window.matchMedia('(prefers-color-scheme: dark)')

// A tiny external store so every ThemeToggle instance stays in sync. This
// module only owns the *preference*; whether dark is actually applied is
// decided by the app shell (dark is a logged-in experience — never on public
// / landing pages), so DOM application lives in App.tsx, not here.
const listeners = new Set<() => void>()
function subscribe(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb) } }

// Default is LIGHT: an unset preference means light (not "follow system").
export function getThemePref(): ThemePref {
  try { const v = localStorage.getItem(KEY); return v === 'dark' || v === 'system' ? v : 'light' } catch { return 'light' }
}

export function resolveTheme(pref: ThemePref): 'light' | 'dark' {
  return pref === 'system' ? (mq().matches ? 'dark' : 'light') : pref
}

export function setThemePref(next: ThemePref) {
  try { localStorage.setItem(KEY, next) } catch { /* private mode — session only */ }
  listeners.forEach(l => l())
}

/** The current theme preference, kept in sync across all consumers. */
export function useThemePref(): ThemePref {
  return useSyncExternalStore(subscribe, getThemePref, () => 'light' as ThemePref)
}
