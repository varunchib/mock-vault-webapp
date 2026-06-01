import type { Metadata } from 'next'
import { Suspense } from 'react'
import { fetchQuestionBySlug } from '../../../lib/api'
import { questionSeoTitle, questionSeoDescription } from '../../../lib/pageTitles'
import { QuestionPage } from '../../../views/QuestionPage'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const q = await fetchQuestionBySlug(slug).catch(() => null)
  if (!q) return { title: 'Question | Ministry of Papers' }

  const title = questionSeoTitle({
    examName: q.examName, year: q.year, questionNo: q.questionNo,
    question: q.question, answer: q.answerKey,
  })
  const description = questionSeoDescription({
    examName: q.examName, year: q.year, questionNo: q.questionNo,
    question: q.question, answer: q.answerKey,
  })
  return {
    title,
    description,
    alternates:  { canonical: `/question/${slug}` },
    openGraph:   { title, description, type: 'article' },
    twitter:     { card: 'summary', title, description },
  }
}

export default function Page() {
  return <Suspense><QuestionPage /></Suspense>
}
