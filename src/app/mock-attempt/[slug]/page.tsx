import { Suspense } from 'react'
import { MockAttemptPage } from '../../../views/MockAttemptPage'

export function generateStaticParams() { return [{ slug: '_' }] }



export default function Page() {
  return <Suspense><MockAttemptPage /></Suspense>
}
