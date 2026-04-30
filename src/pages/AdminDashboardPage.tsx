import { BarChart3, Bell, CheckCircle2, ClipboardList, Eye, Globe2, Home, Import, LayoutDashboard, Link2, ListChecks, LogOut, Plus, Save, Search, Settings, Trash2, UploadCloud } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { fetchAdminSummary, type AdminSummary } from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'

type AdminQuestionDraft = {
  id: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  answerKey: string
  explanation: string
  subject: string
}

type AdminMockDraft = {
  id: string
  title: string
  slug: string
  examSlug: string
  durationMinutes: string
  difficulty: string
  description: string
  questions: AdminQuestionDraft[]
  createdAt: string
}

type AdminNavItem = {
  icon: typeof Home
  label: string
  href: string
  active?: boolean
}

const storageKey = 'pyqvault.admin.mock.drafts.v2'

const adminNav: AdminNavItem[] = [
  { icon: LayoutDashboard, label: 'Overview', href: '#overview', active: true },
  { icon: ClipboardList, label: 'Mock Builder', href: '#builder' },
  { icon: ListChecks, label: 'Questions', href: '#questions' },
  { icon: Globe2, label: 'SEO Tools', href: '#seo' },
  { icon: UploadCloud, label: 'Draft Queue', href: '#drafts' },
  { icon: Settings, label: 'Settings', href: '#settings' },
]

const emptyQuestion = (): AdminQuestionDraft => ({
  id: crypto.randomUUID(),
  question: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  answerKey: 'A',
  explanation: '',
  subject: '',
})

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function readDrafts(): AdminMockDraft[] {
  const raw = window.localStorage.getItem(storageKey)
  if (!raw) return []
  try {
    return JSON.parse(raw) as AdminMockDraft[]
  } catch {
    window.localStorage.removeItem(storageKey)
    return []
  }
}

function makeInitialDraft(examSlug = ''): AdminMockDraft {
  return {
    id: crypto.randomUUID(),
    title: '',
    slug: '',
    examSlug,
    durationMinutes: '30',
    difficulty: 'Moderate',
    description: '',
    questions: [],
    createdAt: new Date().toISOString(),
  }
}

function parseBulkQuestions(raw: string, subject: string): AdminQuestionDraft[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, optionA, optionB, optionC, optionD, answerKey, explanation] = line.split('|').map((part) => part?.trim() ?? '')
      return {
        id: crypto.randomUUID(),
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answerKey: ['A', 'B', 'C', 'D'].includes(answerKey.toUpperCase()) ? answerKey.toUpperCase() : 'A',
        explanation,
        subject,
      }
    })
    .filter((item) => item.question && item.optionA && item.optionB)
}

function seoScoreFor(draft: AdminMockDraft) {
  let score = 0
  if (draft.title.length >= 35) score += 20
  if (draft.slug.length >= 12) score += 15
  if (draft.description.length >= 120) score += 25
  if (draft.questions.length >= 10) score += 20
  if (Number(draft.durationMinutes) > 0) score += 10
  if (draft.questions.every((question) => question.explanation.length >= 30)) score += 10
  return Math.min(score, 100)
}

function AdminNav() {
  return (
    <div className="vault-nav-group">
      <p>Admin</p>
      {adminNav.map((item) => (
        <a className={`vault-nav-item ${item.active ? 'active' : ''}`} href={item.href} key={item.label}>
          <item.icon size={18} />
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  )
}

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [summary, setSummary] = useState<AdminSummary | null>(null)
  const [draft, setDraft] = useState<AdminMockDraft>(makeInitialDraft())
  const [questionDraft, setQuestionDraft] = useState<AdminQuestionDraft>(emptyQuestion)
  const [bulkText, setBulkText] = useState('')
  const [drafts, setDrafts] = useState<AdminMockDraft[]>(readDrafts)
  const [loading, setLoading] = useState(true)
  const exams = summary?.exams ?? []
  const selectedExam = exams.find((exam) => exam.slug === draft.examSlug) ?? exams[0]
  const seoScore = useMemo(() => seoScoreFor(draft), [draft])
  const publicUrl = `/mock-test/${draft.slug || 'mock-slug'}`

  usePageMeta({
    title: 'Admin Dashboard | PYQVault',
    description: 'Admin tools for creating mock tests, PYQ paper pages, question drafts, and SEO content for PYQVault.',
    canonicalPath: '/admin',
  })

  useEffect(() => {
    let cancelled = false

    void fetchAdminSummary()
      .then((data) => {
        if (cancelled) return
        setSummary(data)
        setDraft((current) => current.examSlug ? current : makeInitialDraft(data.exams[0]?.slug ?? ''))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const updateDraft = (key: keyof AdminMockDraft, value: string) => {
    setDraft((current) => ({
      ...current,
      [key]: value,
      slug: key === 'title' && !current.slug ? slugify(value) : current.slug,
    }))
  }

  const updateQuestion = (key: keyof AdminQuestionDraft, value: string) => {
    setQuestionDraft((current) => ({ ...current, [key]: value }))
  }

  const addQuestion = () => {
    if (!questionDraft.question.trim()) return
    setDraft((current) => ({ ...current, questions: [...current.questions, questionDraft] }))
    setQuestionDraft(emptyQuestion())
  }

  const removeQuestion = (id: string) => {
    setDraft((current) => ({ ...current, questions: current.questions.filter((question) => question.id !== id) }))
  }

  const importBulk = () => {
    const imported = parseBulkQuestions(bulkText, questionDraft.subject || (selectedExam?.subjects[0] ?? ''))
    if (!imported.length) return
    setDraft((current) => ({ ...current, questions: [...current.questions, ...imported] }))
    setBulkText('')
  }

  const saveDraft = () => {
    if (!draft.title.trim()) return
    const nextDraft = { ...draft, slug: draft.slug || slugify(draft.title), createdAt: new Date().toISOString() }
    const nextDrafts = [nextDraft, ...drafts.filter((item) => item.id !== nextDraft.id)]
    window.localStorage.setItem(storageKey, JSON.stringify(nextDrafts))
    setDrafts(nextDrafts)
    setDraft(makeInitialDraft(exams[0]?.slug ?? ''))
    setQuestionDraft(emptyQuestion())
    setBulkText('')
  }

  if (loading || !selectedExam) {
    return <section className="vault-app"><div className="vault-workspace"><main className="vault-main"><p>Loading admin workspace...</p></main></div></section>
  }

  return (
    <section className="vault-app vault-app-simple admin-vault-app">
      <aside className="vault-sidebar vault-sidebar-simple">
        <Link className="vault-logo" to="/dashboard"><span>P</span><strong>PYQVault</strong></Link>
        <AdminNav />
        <button className="vault-logout" type="button" onClick={handleLogout}><LogOut size={17} /> Logout</button>
      </aside>

      <div className="vault-workspace">
        <header className="vault-topbar vault-topbar-simple">
          <label className="vault-search">
            <Search size={18} />
            <input placeholder="Search drafts, questions, exams..." />
          </label>
          <Link className="admin-top-link" to="/mock-test"><Eye size={17} /> Public mocks</Link>
          <button className="vault-icon-button" type="button"><Bell size={18} /></button>
          <button className="vault-profile" type="button">
            {user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : null}
            <span>{user?.name.split(' ')[0] ?? 'Admin'}</span>
          </button>
        </header>

        <main className="vault-main vault-main-simple admin-vault-main">
          <section className="simple-welcome admin-welcome" id="overview">
            <div>
              <span>Admin workspace</span>
              <h1>Build mock tests, SEO pages, and question sets from one place.</h1>
              <p>Publishing is still draft-based in the UI, but routing, auth, and catalog counts now come from the backend.</p>
            </div>
            <button type="button" onClick={saveDraft} disabled={!draft.title.trim()}><Save size={17} /> Save mock draft</button>
          </section>

          <section className="admin-lite-stats">
            <article><ClipboardList size={19} /><strong>{(summary?.mockCount ?? 0) + drafts.length}</strong><span>Mock pages</span></article>
            <article><ListChecks size={19} /><strong>{draft.questions.length}</strong><span>Questions in draft</span></article>
            <article><UploadCloud size={19} /><strong>{summary?.paperCount ?? 0}</strong><span>PYQ papers</span></article>
            <article><BarChart3 size={19} /><strong>{seoScore}%</strong><span>SEO readiness</span></article>
          </section>

          <section className="admin-builder-grid" id="builder">
            <article className="simple-card admin-builder-card">
              <div className="simple-panel-head">
                <div>
                  <span><ClipboardList size={15} /> Mock setup</span>
                  <h2>Publisher details</h2>
                </div>
              </div>

              <div className="admin-form-grid clean">
                <label>Mock title<input value={draft.title} onChange={(event) => updateDraft('title', event.target.value)} placeholder="UPSC Prelims GS Mini Mock 2026" /></label>
                <label>SEO slug<input value={draft.slug} onChange={(event) => updateDraft('slug', slugify(event.target.value))} placeholder="upsc-prelims-gs-mini-mock-2026" /></label>
                <label>Exam<select value={draft.examSlug} onChange={(event) => updateDraft('examSlug', event.target.value)}>{exams.map((exam) => <option value={exam.slug} key={exam.slug}>{exam.shortName}</option>)}</select></label>
                <label>Difficulty<select value={draft.difficulty} onChange={(event) => updateDraft('difficulty', event.target.value)}><option>Beginner</option><option>Moderate</option><option>Advanced</option></select></label>
                <label>Duration minutes<input value={draft.durationMinutes} onChange={(event) => updateDraft('durationMinutes', event.target.value)} inputMode="numeric" /></label>
                <label>Question count<input value={String(draft.questions.length)} readOnly /></label>
                <label className="wide">SEO description<textarea value={draft.description} onChange={(event) => updateDraft('description', event.target.value)} placeholder="Mention exam name, year, subjects, mock benefit, answers, and explanations." /></label>
              </div>
            </article>

            <aside className="simple-card admin-seo-card" id="seo">
              <div className="simple-panel-head compact">
                <div>
                  <span><Globe2 size={15} /> SEO</span>
                  <h2>{seoScore}% ready</h2>
                </div>
              </div>
              <div className="admin-seo-preview">
                <small>pyqvault.in{publicUrl}</small>
                <strong>{draft.title || 'Your mock title will appear here'}</strong>
                <p>{draft.description || 'Write a clear public description for Google search results.'}</p>
              </div>
              <ul className="admin-checklist compact">
                <li className={draft.title.length >= 35 ? 'done' : ''}><CheckCircle2 size={15} /> Title length</li>
                <li className={draft.description.length >= 120 ? 'done' : ''}><CheckCircle2 size={15} /> Description depth</li>
                <li className={draft.slug.length >= 12 ? 'done' : ''}><CheckCircle2 size={15} /> Clean slug</li>
                <li className={draft.questions.length >= 10 ? 'done' : ''}><CheckCircle2 size={15} /> 10+ questions</li>
              </ul>
              <Link className="admin-preview-link" to={publicUrl}><Link2 size={15} /> Preview public URL</Link>
            </aside>
          </section>

          <section className="admin-builder-grid" id="questions">
            <article className="simple-card admin-builder-card">
              <div className="simple-panel-head">
                <div>
                  <span><ListChecks size={15} /> Question builder</span>
                  <h2>Add questions one by one</h2>
                </div>
                <button className="admin-inline-action" type="button" onClick={addQuestion}><Plus size={15} /> Add question</button>
              </div>

              <div className="admin-form-grid clean question-form-grid">
                <label className="wide">Question<textarea value={questionDraft.question} onChange={(event) => updateQuestion('question', event.target.value)} placeholder="Type the question here..." /></label>
                <label>Option A<input value={questionDraft.optionA} onChange={(event) => updateQuestion('optionA', event.target.value)} /></label>
                <label>Option B<input value={questionDraft.optionB} onChange={(event) => updateQuestion('optionB', event.target.value)} /></label>
                <label>Option C<input value={questionDraft.optionC} onChange={(event) => updateQuestion('optionC', event.target.value)} /></label>
                <label>Option D<input value={questionDraft.optionD} onChange={(event) => updateQuestion('optionD', event.target.value)} /></label>
                <label>Answer<select value={questionDraft.answerKey} onChange={(event) => updateQuestion('answerKey', event.target.value)}><option>A</option><option>B</option><option>C</option><option>D</option></select></label>
                <label>Subject<input value={questionDraft.subject} onChange={(event) => updateQuestion('subject', event.target.value)} placeholder={selectedExam.subjects[0]} /></label>
                <label className="wide">Explanation<textarea value={questionDraft.explanation} onChange={(event) => updateQuestion('explanation', event.target.value)} placeholder="Explain why the answer is correct and why traps are wrong." /></label>
              </div>
            </article>

            <aside className="simple-card admin-import-card">
              <div className="simple-panel-head compact">
                <div>
                  <span><Import size={15} /> Bulk import</span>
                  <h2>Paste rows</h2>
                </div>
              </div>
              <p>Format: question | option A | option B | option C | option D | answer | explanation</p>
              <textarea value={bulkText} onChange={(event) => setBulkText(event.target.value)} placeholder="Which river...? | Beas | Chenab | Sutlej | Ravi | B | Explanation..." />
              <button type="button" onClick={importBulk}><UploadCloud size={15} /> Import questions</button>
            </aside>
          </section>

          <section className="admin-builder-grid" id="drafts">
            <article className="simple-card admin-builder-card">
              <div className="simple-panel-head">
                <div>
                  <span>Current draft</span>
                  <h2>{draft.questions.length} questions added</h2>
                </div>
              </div>
              <div className="admin-question-queue">
                {draft.questions.length ? draft.questions.map((question, index) => (
                  <div key={question.id}>
                    <span>Q{index + 1}</span>
                    <div><strong>{question.question}</strong><small>{question.subject || 'No subject'} · Answer {question.answerKey}</small></div>
                    <button type="button" onClick={() => removeQuestion(question.id)}><Trash2 size={15} /></button>
                  </div>
                )) : <p>No questions added yet.</p>}
              </div>
            </article>

            <aside className="simple-card admin-import-card">
              <div className="simple-panel-head compact">
                <div>
                  <span>Saved drafts</span>
                  <h2>{drafts.length}</h2>
                </div>
              </div>
              <div className="admin-draft-list compact">
                {drafts.length ? drafts.map((item) => (
                  <button type="button" key={item.id} onClick={() => setDraft(item)}>
                    <strong>{item.title}</strong>
                    <small>/{item.slug} · {item.questions.length} questions</small>
                  </button>
                )) : <p>No drafts yet.</p>}
              </div>
            </aside>
          </section>
        </main>
      </div>
    </section>
  )
}
