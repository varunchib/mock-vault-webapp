import { Suspense } from 'react'
import { QuestionPage } from '../../../views/QuestionPage'

// generateMetadata not used in static export — worker.ts handles bot SEO injection.
export function generateStaticParams() { return [{ slug: '_' }] }

export default function Page() {
  return <Suspense><QuestionPage /></Suspense>
}
