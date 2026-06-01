import { Suspense } from 'react'
import { PaperAttemptPage } from '../../../views/PaperAttemptPage'

export function generateStaticParams() { return [{ slug: '_' }] }



export default function Page() {
  return <Suspense><PaperAttemptPage /></Suspense>
}
