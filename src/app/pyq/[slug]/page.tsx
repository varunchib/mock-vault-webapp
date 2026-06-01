import type { Metadata } from 'next'
import { Suspense } from 'react'
import { fetchPaperBySlug } from '../../../lib/api'
import { paperSeoTitle, paperSeoDescription } from '../../../lib/pageTitles'
import { PyqPaperPage } from '../../../views/PyqPaperPage'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const p = await fetchPaperBySlug(slug).catch(() => null)
  if (!p) return { title: 'Question Paper | Ministry of Papers' }

  const title = paperSeoTitle({
    examName: p.examName, year: p.year, shift: p.shift,
    heldOn: p.heldOn, questions: p.questions, subjects: p.subjects,
    description: p.description,
  })
  const description = paperSeoDescription({
    examName: p.examName, year: p.year, shift: p.shift,
    heldOn: p.heldOn, questions: p.questions, subjects: p.subjects,
    description: p.description,
  })
  return {
    title,
    description,
    alternates:  { canonical: `/pyq/${slug}` },
    openGraph:   { title, description, type: 'article' },
    twitter:     { card: 'summary', title, description },
  }
}

export default function Page() {
  return <Suspense><PyqPaperPage /></Suspense>
}
