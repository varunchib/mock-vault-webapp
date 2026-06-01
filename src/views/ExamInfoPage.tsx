'use client'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Redirect } from '../components/common/Redirect'
import { ExamOverviewPanel } from '../components/common/ExamOverviewPanel'
import { HaloLoader } from '../components/common/HaloLoader'
import { fetchExamBySlug, type Exam } from '../lib/api'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { examInfoSeoTitle, examInfoSeoDescription } from '../lib/pageTitles'
import { examInfo } from '../data/examInfo'
import { examFaqs } from '../data/examFaq'

export function ExamInfoPage() {
  const { slug } = useParams<{ slug: string }>()
  const { isAuthenticated } = useAuth()
  const [exam, setExam] = useState<Exam | null | undefined>(undefined)

  useEffect(() => {
    if (!slug) { setExam(null); return }
    let cancelled = false
    fetchExamBySlug(slug)
      .then((data) => { if (!cancelled) setExam(data) })
      .catch(() => { if (!cancelled) setExam(null) })
    return () => { cancelled = true }
  }, [slug])

  const info = slug ? (examInfo[slug] ?? null) : null
  const faqs = slug ? (examFaqs[slug] ?? null) : null

  const seoTitle = exam
    ? examInfoSeoTitle({ shortName: exam.shortName })
    : 'Exam Overview | Ministry of Papers'
  const seoDesc = exam
    ? examInfoSeoDescription({ shortName: exam.shortName })
    : 'Overview of this exam — conducting body, eligibility, exam pattern, salary, and previous year papers.'

  usePageMeta({
    title: seoTitle,
    description: seoDesc,
    canonicalPath: exam ? `/exam/${exam.slug}/overview` : undefined,
    jsonLd:
      exam && info
        ? {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: `${exam.shortName} Exam Overview`,
            description: seoDesc,
            url: `https://ministryofpapers.com/exam/${exam.slug}/overview`,
            provider: {
              '@type': 'Organization',
              name: 'Ministry of Papers',
              url: 'https://ministryofpapers.com',
            },
            ...(faqs && {
              hasPart: {
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            }),
          }
        : undefined,
  })

  if (!slug)               return <Redirect to="/"    replace />
  if (exam === undefined)  return (
    <section className="public-page"><div className="public-shell"><HaloLoader label="Loading" /></div></section>
  )
  if (!exam)               return <Redirect to="/exams" replace />
  if (!info)               return <Redirect to={`/exam/${exam.slug}`} replace />

  const homeHref  = isAuthenticated ? '/exams' : '/'
  const homeLabel = isAuthenticated ? 'Exams'  : 'Home'

  const content = (
    <div className="ep-page">
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link href={homeHref}>{homeLabel}</Link>
        <ChevronRight size={13} />
        <Link href={`/exam/${exam.slug}`}>{exam.shortName}</Link>
        <ChevronRight size={13} />
        <span>Overview</span>
      </nav>
      <ExamOverviewPanel exam={exam} info={info} faqs={faqs} />
    </div>
  )

  return isAuthenticated ? content : (
    <section className="public-page"><div className="public-shell">{content}</div></section>
  )
}
