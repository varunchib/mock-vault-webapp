import { Suspense } from 'react'
import { PostGuidePage } from '../../../views/PostGuidePage'

export function generateStaticParams() { return [{ postSlug: '_' }] }



export default function Page() {
  return <Suspense><PostGuidePage /></Suspense>
}
