import type { Metadata } from 'next'
import { Suspense } from 'react'
import { fetchExamBySlug } from '../../../lib/api'
import { examHubSeoTitle, examHubSeoDescription } from '../../../lib/pageTitles'
import { ExamPage } from '../../../views/ExamPage'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const e = await fetchExamBySlug(slug).catch(() => null)
  if (!e) return { title: 'Exam | Ministry of Papers' }

  const title = examHubSeoTitle({
    shortName: e.shortName, name: e.name,
    papers: e.papers, mocks: e.mocks, description: e.description,
  })
  const description = examHubSeoDescription({
    shortName: e.shortName, name: e.name,
    papers: e.papers, mocks: e.mocks, description: e.description,
  })
  return {
    title,
    description,
    alternates:  { canonical: `/exam/${slug}` },
    openGraph:   { title, description, type: 'website' },
    twitter:     { card: 'summary', title, description },
  }
}

export default function Page() {
  return <Suspense><ExamPage /></Suspense>
}
