import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchExamCatalog, type Exam } from '../../lib/api'
import { groupExamsBySection } from '../../lib/examCategories'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const isHiddenExam = (e: Exam) => e.slug === 'neet-ug' || /\bneet\b/i.test(e.slug) || /\bnta\b/i.test(e.name)

export function Exams() {
  const [exams, setExams] = useState<Exam[]>([])

  useEffect(() => {
    fetchExamCatalog()
      .then((all) => setExams((all ?? []).filter((e) => !isHiddenExam(e))))
      .catch(() => {})
  }, [])

  const groups = useMemo(() => groupExamsBySection(exams), [exams])

  return (
    <Reveal as="section" className="exams-section" id="exams">
      <SectionHeader
        eyebrow="Browse by Category"
        title="Find your exam"
        subtitle="Segregated by commission and state — SSC, Jammu & Kashmir (JKSSB & JKPSC), State PSCs, UPSC, Railways, and Banking."
      />

      {groups.length > 0 && (
        <div className="ec-sections-stack" style={{ marginTop: '24px' }}>
          {groups.map((group) => (
            <div key={group.label} className="ec-cat-section">
              <div className="ec-cat-section-head">
                <div className="ec-cat-section-title">
                  <span className="ec-cat-section-icon" aria-hidden="true">{group.icon}</span>
                  <div>
                    <h3>{group.label}</h3>
                    <p>{group.subtitle}</p>
                  </div>
                </div>
                <span className="ec-cat-section-count">
                  {group.exams.length} {group.exams.length === 1 ? 'Exam' : 'Exams'}
                </span>
              </div>

              <div className="exam-grid">
                {group.exams.map((exam) => (
                  <Link className="exam-card" to={`/exam/${exam.slug}`} key={exam.slug}>
                    <div className="ec-icon">{exam.icon}</div>
                    <h4 className="ec-name">{exam.shortName}</h4>
                    <div className="ec-sub">
                      {exam.papers > 0 ? `${exam.papers} PYQ Papers · ` : ''}
                      {exam.totalQuestions} questions
                    </div>
                    <div className="ec-badge">{group.label.replace(/\s*\(.*\)/, '')}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Reveal>
  )
}
