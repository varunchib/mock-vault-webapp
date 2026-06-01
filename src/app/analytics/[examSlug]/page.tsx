import { Suspense } from 'react'
import { ExamAnalyticsPage } from '../../../views/ExamAnalyticsPage'

export function generateStaticParams() { return [{ examSlug: '_' }] }



export default function Page() {
  return <Suspense><ExamAnalyticsPage /></Suspense>
}
