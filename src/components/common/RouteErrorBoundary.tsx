import { Component, type ReactNode } from 'react'

/**
 * Catches failures while a lazily-loaded route is being fetched.
 *
 * Routes are code-split, so navigating fetches a hashed chunk. A deploy
 * replaces those files, which means any tab opened before it asks for a module
 * that no longer exists — the import rejects, React unmounts the whole tree,
 * and the reader is left on a blank screen that only a manual refresh clears.
 * With deploys landing several times a day, this is the most likely error a
 * signed-in reader ever sees, and it always looks like the site broke.
 *
 * One reload picks up the new manifest, so a stale chunk self-heals. Anything
 * else — or a second failure — falls through to a message with a button,
 * because silently reloading on a real bug would loop forever.
 */
const RELOAD_FLAG = 'mv.chunkReloadAttempted'

function isChunkLoadError(error: unknown): boolean {
  const msg = String((error as Error)?.message ?? error ?? '')
  const name = String((error as Error)?.name ?? '')
  return (
    name === 'ChunkLoadError'
    || /dynamically imported module/i.test(msg)
    || /Importing a module script failed/i.test(msg)
    || /error loading dynamically imported module/i.test(msg)
    || /Failed to fetch dynamically/i.test(msg)
  )
}

type Props = { children: ReactNode }
type State = { failed: boolean }

export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidMount() {
    // Reaching a rendered route means the app is healthy again, so a future
    // deploy is allowed its own single reload.
    try { window.sessionStorage.removeItem(RELOAD_FLAG) } catch { /* private mode */ }
  }

  componentDidCatch(error: unknown) {
    if (!isChunkLoadError(error)) return
    let alreadyTried = false
    try { alreadyTried = window.sessionStorage.getItem(RELOAD_FLAG) === '1' } catch { /* private mode */ }
    if (alreadyTried) return
    try { window.sessionStorage.setItem(RELOAD_FLAG, '1') } catch { /* private mode */ }
    window.location.reload()
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="route-error">
        <h1>This page didn&apos;t finish loading</h1>
        <p>
          The site was updated while your tab was open, so part of it is out of date.
          Reloading will pick up the new version.
        </p>
        <button type="button" onClick={() => window.location.reload()}>Reload the page</button>
      </div>
    )
  }
}
