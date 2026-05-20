import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// ── Google Analytics 4 — lazy loaded after page is idle ─────────
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function loadGA() {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
  if (!id || !import.meta.env.PROD) return

  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  script.async = true
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]) => { window.dataLayer.push(args) }
  window.gtag('js', new Date())
  window.gtag('config', id, { send_page_view: true })
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(loadGA, { timeout: 3000 })
} else {
  setTimeout(loadGA, 2000)
}
// ────────────────────────────────────────────────────────────────

createRoot(document.getElementById('root')!).render(
  <App />,
)
