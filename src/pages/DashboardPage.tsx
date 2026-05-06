import { ClipboardList, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import {
  fetchDashboardBootstrap,
  type Exam,
  type MockItem,
  type Question,
} from '../lib/api'
import { examPreviousPapersPath } from '../lib/routes'
import { usePageMeta } from '../lib/usePageMeta'
import { HaloLoader } from '../components/common/HaloLoader'

type ExamCategoryGroup = {
  label: string
  exams: Exam[]
}

const categoryOrder = [
  'Central',
  'Banking',
  'State',
  'Railways',
  'Teaching',
  'Medical',
  'Engineering',
]

function normalizeExamCategory(category: string) {
  const normalized = category.trim().toLowerCase()

  if (normalized.includes('bank')) return 'Banking'
  if (normalized.includes('state')) return 'State'
  if (normalized.includes('rail')) return 'Railways'
  if (normalized.includes('teach')) return 'Teaching'
  if (normalized.includes('medical') || normalized.includes('neet')) return 'Medical'
  if (normalized.includes('engineering') || normalized.includes('jee')) return 'Engineering'
  if (
    normalized.includes('central') ||
    normalized.includes('ssc') ||
    normalized.includes('upsc') ||
    normalized.includes('defence') ||
    normalized.includes('defense')
  ) {
    return 'Central'
  }

  return category
}

function groupExamsByCategory(exams: Exam[]): ExamCategoryGroup[] {
  const grouped = new Map<string, Exam[]>()

  exams.forEach((exam) => {
    const label = normalizeExamCategory(exam.category)
    const current = grouped.get(label) ?? []
    current.push(exam)
    grouped.set(label, current)
  })

  return [...grouped.entries()]
    .map(([label, items]) => ({
      label,
      exams: items.sort((left, right) => left.shortName.localeCompare(right.shortName)),
    }))
    .sort((left, right) => {
      const leftRank = categoryOrder.indexOf(left.label)
      const rightRank = categoryOrder.indexOf(right.label)

      if (leftRank === -1 && rightRank === -1) return left.label.localeCompare(right.label)
      if (leftRank === -1) return 1
      if (rightRank === -1) return -1
      return leftRank - rightRank
    })
}

function getEnrolledExams(exams: Exam[], mocks: MockItem[], recentQuestions: Question[]) {
  const examMap = new Map(exams.map((exam) => [exam.slug, exam]))
  const seen = new Set<string>()
  const orderedSlugs = [
    ...recentQuestions.map((question) => question.examSlug),
    ...mocks.map((mock) => mock.examSlug),
    ...exams.map((exam) => exam.slug),
  ]

  return orderedSlugs
    .map((slug) => {
      if (seen.has(slug)) return null
      seen.add(slug)
      return examMap.get(slug) ?? null
    })
    .filter((exam): exam is Exam => Boolean(exam))
    .slice(0, 6)
}

export function DashboardPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [mocks, setMocks] = useState<MockItem[]>([])
  const [recentQuestions, setRecentQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  usePageMeta({
    title: 'Dashboard | PYQVault',
    description: 'Your PYQVault dashboard for exam categories, mock tests, and recent preparation activity.',
    canonicalPath: '/dashboard',
  })

  useEffect(() => {
    let cancelled = false

    const loadDashboard = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchDashboardBootstrap()
        if (cancelled) return

        setExams(data.exams)
        setMocks(data.mocks)
        setRecentQuestions(data.recentQuestions)
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load dashboard.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadDashboard()

    return () => {
      cancelled = true
    }
  }, [])

  const groupedExams = useMemo(() => groupExamsByCategory(exams), [exams])
  const enrolledExams = useMemo(
    () => getEnrolledExams(exams, mocks, recentQuestions),
    [exams, mocks, recentQuestions],
  )
  const attemptedQuestions = recentQuestions.slice(0, 6)

  if (loading) {
    return <HaloLoader label="Loading dashboard" />
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="dashboard-flow">
      {groupedExams.map((group) => (
        <section className="dashboard-panel dashboard-category-panel" key={group.label}>
          <div className="dashboard-panel-head">
            <div>
              <small>Category</small>
              <h2>{group.label}</h2>
            </div>
            <Link to={`/exam?q=${encodeURIComponent(group.label)}`}>More</Link>
          </div>

          <div className="dashboard-exam-grid">
            {group.exams.slice(0, 4).map((exam) => (
              <article className="dashboard-exam-card" key={exam.slug}>
                <div className="dashboard-exam-body">
                  <span className="dashboard-exam-icon">{exam.icon}</span>
                  <strong>{exam.shortName}</strong>
                  <small>{exam.name}</small>
                  <p>{exam.papers} papers - {exam.mocks} mocks</p>
                </div>
                <div className="dashboard-card-actions">
                  <Link to={examPreviousPapersPath(exam.slug)}>
                    <FileText size={14} /> Papers
                  </Link>
                  <Link to={`/mock-test/${exam.slug}`}>
                    <ClipboardList size={14} /> Mocks
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="dashboard-summary-grid">
        <article className="dashboard-panel">
          <div className="dashboard-panel-head">
            <div>
              <small>Enrolled</small>
              <h2>Enrolled exams</h2>
            </div>
          </div>

          <div className="dashboard-list">
            {enrolledExams.map((exam) => (
              <Link className="dashboard-list-row" to={`/mock-test/${exam.slug}`} key={exam.slug}>
                <div>
                  <strong>{exam.shortName}</strong>
                  <small>{exam.category}</small>
                </div>
                <span>{exam.mocks} mocks</span>
              </Link>
            ))}
            {enrolledExams.length === 0 ? <p>No enrolled exams yet.</p> : null}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="dashboard-panel-head">
            <div>
              <small>Attempted</small>
              <h2>Attempted questions</h2>
            </div>
          </div>

          <div className="dashboard-list">
            {attemptedQuestions.map((question) => (
              <Link className="dashboard-list-row" to={`/question/${question.slug}`} key={question.slug}>
                <div>
                  <strong>{question.examName} Q{question.questionNo}</strong>
                  <small>{question.subject} - {question.year}</small>
                </div>
                <span>Open</span>
              </Link>
            ))}
            {attemptedQuestions.length === 0 ? <p>No attempted questions yet.</p> : null}
          </div>
        </article>
      </section>
    </div>
  )
}
