import { Suspense } from 'react'
import { ExamInfoPage } from '../../../../views/ExamInfoPage'

export function generateStaticParams() { return [{ slug: '_' }] }



export default function Page() {
  return <Suspense><ExamInfoPage /></Suspense>
}
