import { ArrowRight, ChevronRight, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchExamCatalog, type Exam } from '../../lib/api'
import { groupExamsBySection } from '../../lib/examCategories'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const ALL = 'All'
const isHiddenExam = (e: Exam) => e.slug === 'neet-ug' || /\bneet\b/i.test(e.slug) || /\bnta\b/i.test(e.name)

const SHORT_TAB_LABELS: Record<string, string> = {
  'SSC Exams': 'SSC',
  'State Exams (J&K — JKSSB & JKPSC)': 'J&K State (JKSSB/JKPSC)',
  'State PSC & State Exams': 'State PSCs',
  'UPSC & Civil Services': 'UPSC',
  'Railways (RRB)': 'Railways',
  'Banking & Insurance': 'Banking',
}

export function Exams() {
  const [exams, setExams] = useState<Exam[]>([])
  const [activeTab, setActiveTab] = useState<string>(ALL)
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    fetchExamCatalog()
      .then((all) => setExams((all ?? []).filter((e) => !isHiddenExam(e))))
      .catch(() => {})
  }, [])

  const allGroups = useMemo(() => groupExamsBySection(exams), [exams])

  const totalExams = useMemo(
    () => allGroups.reduce((acc, g) => acc + g.exams.length, 0),
    [allGroups],
  )

  const totalQuestions = useMemo(
    () => allGroups.reduce((acc, g) => acc + g.exams.reduce((s, e) => s + (e.totalQuestions ?? 0), 0), 0),
    [allGroups],
  )

  const visibleGroups = useMemo(() => {
    const q = filterText.trim().toLowerCase()
    return allGroups
      .filter((g) => activeTab === ALL || g.label === activeTab)
      .map((g) => {
        if (!q) return g
        return {
          ...g,
          exams: g.exams.filter(
            (e) =>
              e.shortName.toLowerCase().includes(q) ||
              e.name.toLowerCase().includes(q) ||
              e.slug.toLowerCase().includes(q),
          ),
        }
      })
      .filter((g) => g.exams.length > 0)
  }, [allGroups, activeTab, filterText])

  return (
    <Reveal as="section" className="exams-section" id="exams">
      <div className="lp-exams-top">
        <SectionHeader
          eyebrow="Browse by Commission & State"
          title="Find your exam"
          subtitle="Official previous year papers with verified keys and structured explanations — segregated across SSC, Jammu & Kashmir (JKSSB & JKPSC), State PSCs, UPSC, Railways, and Banking."
        />
        <Link to="/exams" className="lp-exams-all-link">
          <span>Full Exam Directory</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {allGroups.length > 0 && (
        <>
          <div className="lp-exams-toolbar">
            <div className="lp-exams-tabs" role="tablist" aria-label="Filter exams by category">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === ALL}
                className={`lp-exam-tab${activeTab === ALL ? ' active' : ''}`}
                onClick={() => setActiveTab(ALL)}
              >
                <span>All Exams</span>
                <span className="lp-exam-tab-badge">{totalExams}</span>
              </button>
              {allGroups.map((g) => (
                <button
                  key={g.label}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === g.label}
                  className={`lp-exam-tab${activeTab === g.label ? ' active' : ''}`}
                  onClick={() => setActiveTab(g.label)}
                >
                  <span aria-hidden="true">{g.icon}</span>
                  <span>{SHORT_TAB_LABELS[g.label] ?? g.label}</span>
                  <span className="lp-exam-tab-badge">{g.exams.length}</span>
                </button>
              ))}
            </div>

            <label className="lp-exams-filter" aria-label="Quick filter exams">
              <Search size={14} />
              <input
                type="search"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Quick filter (e.g. FAA, CGL, VLW, KAS)…"
              />
              {filterText && (
                <button type="button" onClick={() => setFilterText('')} aria-label="Clear filter">
                  <X size={13} />
                </button>
              )}
            </label>
          </div>

          <div className="ec-sections-stack">
            {visibleGroups.map((group) => (
              <div key={group.label} className="ec-cat-section">
                <div className="ec-cat-section-head">
                  <div className="ec-cat-section-title">
                    <span className="ec-cat-section-icon" aria-hidden="true">{group.icon}</span>
                    <div>
                      <h3>{group.label}</h3>
                      <p>{group.subtitle}</p>
                    </div>
                  </div>
                  <div className="ec-cat-section-rule" aria-hidden="true" />
                  <span className="ec-cat-section-count">
                    {group.exams.length} {group.exams.length === 1 ? 'Exam' : 'Exams'}
                  </span>
                </div>

                <div className="ec-grid">
                  {group.exams.map((exam) => (
                    <Link className="ec-card" to={`/exam/${exam.slug}`} key={exam.slug}>
                      <span className="ec-card-icon" aria-hidden="true">{exam.icon}</span>
                      <div className="ec-card-body">
                        <div className="ec-card-title-row">
                          <strong className="ec-card-name">{exam.shortName}</strong>
                        </div>
                        <p className="ec-card-full">{exam.name}</p>
                        <div className="ec-card-meta">
                          {exam.papers > 0 ? (
                            <span className="ec-meta-pyq">{exam.papers} {exam.papers === 1 ? 'Paper' : 'Papers'}</span>
                          ) : (
                            <span>Practice Hub</span>
                          )}
                          {exam.totalQuestions > 0 && <span>{exam.totalQuestions.toLocaleString()} Qs</span>}
                        </div>
                      </div>
                      <ChevronRight size={15} className="ec-card-arrow" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {totalQuestions > 0 && (
            <div className="lp-exams-footer-bar">
              <span>
                Showing <strong>{visibleGroups.reduce((s, g) => s + g.exams.length, 0)}</strong> exams with{' '}
                <strong>{totalQuestions.toLocaleString()}+</strong> solved previous year questions
              </span>
              <Link to="/exams" className="lp-exams-footer-cta">
                Browse all papers &amp; filters <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </>
      )}
    </Reveal>
  )
}
