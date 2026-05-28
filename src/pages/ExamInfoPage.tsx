import { ChevronRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { ExamOverviewPanel } from '../components/common/ExamOverviewPanel'
import { fetchExamBySlug, type Exam } from '../lib/api'
import { useAuth } from '../context/useAuth'
import { usePageMeta } from '../lib/usePageMeta'
import { examInfoSeoTitle, examInfoSeoDescription } from '../lib/pageTitles'
import { examInfo } from '../data/examInfo'
import { examFaqs } from '../data/examFaq'

export function ExamInfoPage() {
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()
  const [exam, setExam] = useState<Exam | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(false)
    fetchExamBySlug(slug)
      .then(setExam)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
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
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
                { '@type': 'ListItem', position: 2, name: 'Exams', item: 'https://ministryofpapers.com/exams' },
                { '@type': 'ListItem', position: 3, name: exam.shortName, item: `https://ministryofpapers.com/exam/${exam.slug}` },
                { '@type': 'ListItem', position: 4, name: 'Overview', item: `https://ministryofpapers.com/exam/${exam.slug}/overview` },
              ],
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

  if (!slug) return <Navigate to="/" replace />

  if (loading) {
    const loader = <HaloLoader label="Loading" />
    return isAuthenticated ? loader : (
      <section className="public-page"><div className="public-shell">{loader}</div></section>
    )
  }

  if (error || !exam) return <Navigate to="/exams" replace />
  if (!info) return <Navigate to={`/exam/${exam.slug}`} replace />

  const homeHref = isAuthenticated ? '/exams' : '/'
  const homeLabel = isAuthenticated ? 'Exams' : 'Home'

  const content = (
    <div className="ep-page">
      <nav className="ep-breadcrumb" aria-label="Breadcrumb">
        <Link to={homeHref}>{homeLabel}</Link>
        <ChevronRight size={13} />
        <Link to={`/exam/${exam.slug}`}>{exam.shortName}</Link>
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
