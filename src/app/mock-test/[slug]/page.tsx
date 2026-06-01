import { Suspense } from 'react'
import { MockDetailPage } from '../../../views/MockSeoPage'

export function generateStaticParams() { return [{ slug: '_' }] }



export default function Page() {
  return <Suspense><MockDetailPage /></Suspense>
}
