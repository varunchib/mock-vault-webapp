import { BarChart3, Bell, BookOpenCheck, Bookmark, CalendarDays, ChevronDown, ChevronRight, CircleHelp, ClipboardList, Download, FileText, Home, LibraryBig, LogOut, Plus, Search, Settings, Target, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { examCatalog, questionCatalog } from '../data/catalog'
import { usePageMeta } from '../lib/usePageMeta'

type NavItem = {
  icon: typeof Home
  label: string
  badge?: string
  active?: boolean
}

const primaryNav: NavItem[] = [
  { icon: Home, label: 'Home', active: true },
  { icon: ClipboardList, label: 'Mock Tests' },
  { icon: FileText, label: 'PYQ Papers' },
  { icon: BookOpenCheck, label: 'Practice' },
  { icon: BarChart3, label: 'Analytics', badge: 'Soon' },
]

const libraryNav: NavItem[] = [
  { icon: LibraryBig, label: 'All Exams' },
  { icon: Bookmark, label: 'Saved Questions' },
  { icon: Download, label: 'PDF Library' },
  { icon: CircleHelp, label: 'Doubts' },
]

const planner = [
  { label: 'Solve 20 PYQs', meta: '10-15 min', done: true },
  { label: 'Attempt 1 mini mock', meta: '20 min', done: false },
  { label: 'Review mistakes', meta: '5 min', done: false },
]

const mockRows = [
  { name: 'Daily PYQ Drill', meta: '20 questions · 18 min', tag: 'Free' },
  { name: 'Diagnostic Mini Mock', meta: '50 questions · 45 min', tag: 'Recommended' },
  { name: 'Previous Year Mixed Set', meta: '100 questions · 120 min', tag: 'PDF' },
]

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="vault-nav-group">
      <p>{title}</p>
      {items.map((item) => (
        <button className={`vault-nav-item ${item.active ? 'active' : ''}`} type="button" key={item.label}>
          <item.icon size={18} />
          <span>{item.label}</span>
          {item.badge ? <em>{item.badge}</em> : null}
        </button>
      ))}
    </div>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [selectedExamSlugs, setSelectedExamSlugs] = useState(['upsc-cse', 'ssc-cgl'])
  const [activeExamSlug, setActiveExamSlug] = useState('upsc-cse')
  const [examToAdd, setExamToAdd] = useState('jkssb')
  const firstName = user?.name.split(' ')[0] ?? 'Aspirant'

  const selectedExams = useMemo(() => {
    return selectedExamSlugs
      .map((slug) => examCatalog.find((exam) => exam.slug === slug))
      .filter((exam): exam is NonNullable<typeof exam> => Boolean(exam))
  }, [selectedExamSlugs])

  const activeExam = examCatalog.find((exam) => exam.slug === activeExamSlug) ?? selectedExams[0] ?? examCatalog[0]
  const availableToAdd = examCatalog.filter((exam) => !selectedExamSlugs.includes(exam.slug))

  usePageMeta({
    title: 'Dashboard | PYQVault',
    description: 'Your PYQVault dashboard for mock tests, PYQ practice, daily goals, and exam preparation progress.',
    canonicalPath: '/dashboard',
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const addExam = () => {
    if (selectedExamSlugs.includes(examToAdd)) return
    setSelectedExamSlugs((value) => [...value, examToAdd])
    setActiveExamSlug(examToAdd)
    const next = examCatalog.find((exam) => exam.slug !== examToAdd && !selectedExamSlugs.includes(exam.slug))
    if (next) setExamToAdd(next.slug)
  }

  return (
    <section className="vault-app vault-app-simple">
      <aside className="vault-sidebar vault-sidebar-simple">
        <Link className="vault-logo" to="/">
          <span>P</span>
          <strong>PYQVault</strong>
        </Link>

        <NavGroup title="Prepare" items={primaryNav} />
        <NavGroup title="Library" items={libraryNav} />

        <button className="vault-logout" type="button" onClick={handleLogout}>
          <LogOut size={17} /> Logout
        </button>
      </aside>

      <div className="vault-workspace">
        <header className="vault-topbar vault-topbar-simple">
          <label className="vault-search">
            <Search size={18} />
            <input placeholder="Search papers, questions, topics..." />
          </label>

          <button className="vault-icon-button" type="button"><Bell size={18} /></button>
          <button className="vault-profile" type="button">
            {user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : <UserRound size={18} />}
            <span>{firstName}</span>
          </button>
        </header>

        <main className="vault-main vault-main-simple">
          <section className="simple-welcome">
            <div>
              <span>Dashboard</span>
              <h1>Welcome back, {firstName}</h1>
              <p>Select your exam and continue with PYQs, mocks, or revision. Keep the home screen focused.</p>
            </div>
            <Link to={`/exam/${activeExam.slug}`}>Open {activeExam.shortName} page <ChevronRight size={16} /></Link>
          </section>

          <section className="selected-exams-panel">
            <div className="simple-panel-head">
              <div>
                <span><Target size={15} /> My exams</span>
                <h2>Choose what you are preparing for</h2>
              </div>
              {availableToAdd.length ? (
                <div className="add-exam-control">
                  <label>
                    <select value={examToAdd} onChange={(event) => setExamToAdd(event.target.value)}>
                      {availableToAdd.map((exam) => <option value={exam.slug} key={exam.slug}>{exam.shortName}</option>)}
                    </select>
                    <ChevronDown size={14} />
                  </label>
                  <button type="button" onClick={addExam}><Plus size={15} /> Add exam</button>
                </div>
              ) : null}
            </div>

            <div className="selected-exam-grid">
              {selectedExams.map((exam) => (
                <button
                  className={exam.slug === activeExam.slug ? 'active' : ''}
                  type="button"
                  key={exam.slug}
                  onClick={() => setActiveExamSlug(exam.slug)}
                >
                  <span>{exam.icon}</span>
                  <strong>{exam.shortName}</strong>
                  <small>{exam.totalQuestions} questions · {exam.mocks} mocks</small>
                </button>
              ))}
            </div>
          </section>

          <section className="simple-dashboard-grid">
            <div className="simple-main-column">
              <article className="simple-card">
                <div className="simple-panel-head">
                  <div>
                    <span>Continue</span>
                    <h2>Pick up from PYQs</h2>
                  </div>
                  <Link to="/exam">Browse all</Link>
                </div>
                <div className="simple-question-list">
                  {questionCatalog.map((question) => (
                    <Link to={`/question/${question.slug}`} key={question.slug}>
                      <div>
                        <strong>{question.examName} {question.year} · Q{question.questionNo}</strong>
                        <small>{question.subject} · solved explanation</small>
                      </div>
                      <ChevronRight size={16} />
                    </Link>
                  ))}
                </div>
              </article>

              <article className="simple-card">
                <div className="simple-panel-head">
                  <div>
                    <span>Mocks</span>
                    <h2>Recommended for {activeExam.shortName}</h2>
                  </div>
                </div>
                <div className="simple-mock-list">
                  {mockRows.map((mock) => (
                    <div className="simple-mock-row" key={mock.name}>
                      <ClipboardList size={18} />
                      <div>
                        <strong>{mock.name}</strong>
                        <small>{mock.meta}</small>
                      </div>
                      <em>{mock.tag}</em>
                      <button type="button">Start</button>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <aside className="simple-side-column">
              <article className="simple-card today-card">
                <div className="simple-panel-head compact">
                  <div>
                    <span><CalendarDays size={15} /> Today</span>
                    <h2>3 tasks</h2>
                  </div>
                </div>
                <div className="today-task-list">
                  {planner.map((task) => (
                    <label key={task.label}>
                      <input type="checkbox" defaultChecked={task.done} />
                      <span><strong>{task.label}</strong><small>{task.meta}</small></span>
                    </label>
                  ))}
                </div>
              </article>

              <article className="simple-card compact-action-card">
                <Download size={20} />
                <h2>PDF Library</h2>
                <p>Download papers and answer keys for selected exams.</p>
                <button type="button">Open library</button>
              </article>

              <article className="simple-card compact-action-card muted">
                <Settings size={20} />
                <h2>Preferences</h2>
                <p>Change exams, language, daily goal, and notifications.</p>
                <button type="button">Edit settings</button>
              </article>
            </aside>
          </section>
        </main>
      </div>
    </section>
  )
}
