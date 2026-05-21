import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// ── Google Analytics 4 — lazy loaded after page is idle ─────────
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void // signature only — impl uses `arguments`
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
  // Must be a regular function — arrow functions don't have `arguments`, and GA4
  // checks for the Arguments object type to identify gtag commands in the dataLayer.
  window.gtag = function() { window.dataLayer.push(arguments) } // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date())
  window.gtag('config', id)
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
