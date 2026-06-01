import { HaloLoader } from '../components/common/HaloLoader'

// Shown instantly by Next.js while the page component loads.
// Eliminates the blank flash between navigations.
export default function Loading() {
  return (
    <section className="public-page">
      <div className="public-shell">
        <HaloLoader label="Loading" />
      </div>
    </section>
  )
}
