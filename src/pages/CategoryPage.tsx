import { ChevronRight, ClipboardList, FileText, Search } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { HaloLoader } from '../components/common/HaloLoader'
import { fetchExamCatalog, fetchMockCatalog, type Exam, type MockItem } from '../lib/api'
import { examPreviousPapersPath } from '../lib/routes'
import { usePageMeta } from '../lib/usePageMeta'
import {
  categoryFullLabels,
  categoryIcons,
  categoryOrder,
  normalizeExamCategory,
} from './DashboardPage'

export function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const [exams, setExams] = useState<Exam[]>([])
  const [mocks, setMocks] = useState<MockItem[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const catKey = category?.toLowerCase() ?? ''
  const catLabel = categoryFullLabels[catKey] ?? (category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Exams')
  const catIcon = categoryIcons[catKey] ?? '📋'
  const isValid = Boolean(category && categoryOrder.some((c) => c.toLowerCase() === catKey))

  usePageMeta({
    title: `${catLabel} Exams & Mock Tests | PYQVault`,
    description: `Browse ${catLabel} competitive exam PYQs, mock tests, and previous year papers on PYQVault.`,
    canonicalPath: `/exams/${catKey}`,
  })

  useEffect(() => {
    if (!isValid) return

    let cancelled = false

    void Promise.all([fetchExamCatalog(), fetchMockCatalog()])
      .then(([examCatalog, mockCatalog]) => {
        if (cancelled) return
        setExams(
          examCatalog.filter(
            (exam) => normalizeExamCategory(exam.category).toLowerCase() === catKey,
          ),
        )
        setMocks(mockCatalog)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [catKey, isValid])

  const mockCountByExam = useMemo(() => {
    const map = new Map<string, number>()
    mocks.forEach((mock) => map.set(mock.examSlug, (map.get(mock.examSlug) ?? 0) + 1))
    return map
  }, [mocks])

  const filteredExams = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return exams
    return exams.filter((exam) =>
      [exam.name, exam.shortName, exam.description, ...exam.subjects]
        .join(' ')
        .toLowerCase()
        .includes(q),
    )
  }, [exams, query])

  if (!isValid) return <Navigate to="/dashboard" replace />
  if (loading) return <HaloLoader label={`Loading ${catLabel} exams`} />

  return (
    <div className="cat-page">
      <header className="cat-header">
        <nav className="cat-breadcrumb">
          <Link to="/dashboard">Dashboard</Link>
          <ChevronRight size={13} />
          <span>{catLabel}</span>
        </nav>
        <div className="cat-header-body">
          <span className="cat-header-icon" data-cat={catKey}>{catIcon}</span>
          <div>
            <h1>{catLabel}</h1>
            <p>
              {exams.length} exam{exams.length !== 1 ? 's' : ''} &mdash; PYQ papers, mock tests &amp; practice
            </p>
          </div>
        </div>
      </header>

      <div className="cat-toolbar">
        <label className="cat-search">
          <Search size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${catLabel} exams...`}
          />
        </label>
        <span className="cat-count">
          {filteredExams.length} result{filteredExams.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filteredExams.length === 0 ? (
        <p className="cat-empty">No exams matched your search.</p>
      ) : (
        <div className="cat-exam-grid">
          {filteredExams.map((exam) => {
            const mockCount = mockCountByExam.get(exam.slug) ?? exam.mocks
            return (
              <article className="cat-exam-card" key={exam.slug}>
                <div className="cat-exam-card-body">
                  <div className="cat-exam-card-top">
                    <span className="cat-exam-icon">{exam.icon}</span>
                    <span className="cat-exam-tag">{exam.shortName}</span>
                  </div>
                  <h2>{exam.name}</h2>
                  <p>{exam.description}</p>
                  <div className="cat-exam-stats">
                    <span>{exam.papers} papers</span>
                    <span>{mockCount} mocks</span>
                    <span>{exam.totalQuestions} questions</span>
                  </div>
                </div>
                <div className="cat-exam-card-actions">
                  <Link className="cat-exam-action-primary" to={`/exam/${exam.slug}`}>
                    <span>Open exam</span>
                    <ChevronRight size={15} />
                  </Link>
                  <div className="cat-exam-secondary-row">
                    <Link className="cat-exam-action-sec" to={examPreviousPapersPath(exam.slug)}>
                      <FileText size={13} /> PYQ Papers
                    </Link>
                    <Link className="cat-exam-action-sec" to={`/mock-test/${exam.slug}`}>
                      <ClipboardList size={13} /> Mock Tests
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}
