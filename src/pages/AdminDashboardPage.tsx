import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Code2,
  ExternalLink,
  FileQuestion,
  FileText,
  GraduationCap,
  Home,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
  UploadCloud,
  Users,
  X,
  XCircle,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import { useAuth } from '../context/useAuth'
import {
  deleteAdminExam,
  deleteAdminMock,
  deleteAdminQuestion,
  fetchAdminSummary,
  fetchMockCatalog,
  fetchMockQuestions,
  saveAdminExam,
  saveAdminMock,
  type AdminExamPayload,
  type AdminMockPayload,
  type AdminMockQuestionPayload,
  type AdminSummary,
  type MockItem,
  type Question,
  type QuestionOption,
} from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'

// ─── Types ────────────────────────────────────────────────────

type Tab = 'overview' | 'exams' | 'mocks' | 'import'

type StatusMsg = { kind: 'success' | 'error'; text: string }

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
  title: string
  slug: string
  examSlug: string
  durationMinutes: string
  difficulty: 'Beginner' | 'Moderate' | 'Advanced'
  description: string
  subjects: string
  isFree: boolean
  questions: AdminQuestionDraft[]
}

type AdminExamDraft = {
  slug: string
  name: string
  shortName: string
  category: string
  icon: string
  description: string
  subjects: string
}

type ImportedMock = {
  title?: unknown; slug?: unknown; examSlug?: unknown; durationMinutes?: unknown
  difficulty?: unknown; description?: unknown; subjects?: unknown; isFree?: unknown; questions?: unknown
}

type ImportedQuestion = {
  question?: unknown; options?: unknown; answer?: unknown
  answerKey?: unknown; correct?: unknown; explanation?: unknown; subject?: unknown
}

// ─── Helpers ──────────────────────────────────────────────────

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback
}

function asStringList(value: unknown) {
  if (Array.isArray(value)) return value.map((v) => asString(v)).filter(Boolean)
  if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean)
  return []
}

function normalizeAnswer(value: unknown) {
  const a = asString(value, 'A').toUpperCase()
  return ['A', 'B', 'C', 'D'].includes(a) ? a : 'A'
}

function normalizeDifficulty(value: unknown): AdminMockDraft['difficulty'] {
  const d = asString(value, 'Moderate')
  if (d === 'Beginner' || d === 'Moderate' || d === 'Advanced') return d
  return 'Moderate'
}

function normalizeOptions(value: unknown): QuestionOption[] {
  if (Array.isArray(value)) {
    return value
      .map((item, i) => {
        const key = String.fromCharCode(65 + i)
        if (typeof item === 'string') return { key, text: item.trim() }
        if (item && typeof item === 'object') {
          const o = item as Partial<QuestionOption>
          return { key: asString(o.key, key).toUpperCase(), text: asString(o.text) }
        }
        return { key, text: '' }
      })
      .filter((o) => o.text)
      .slice(0, 4)
  }
  if (value && typeof value === 'object') {
    const r = value as Record<string, unknown>
    return ['A', 'B', 'C', 'D'].map((k) => ({ key: k, text: asString(r[k] ?? r[k.toLowerCase()]) })).filter((o) => o.text)
  }
  return []
}

function questionPayload(q: AdminQuestionDraft): AdminMockQuestionPayload {
  return {
    question: q.question.trim(),
    options: [
      { key: 'A', text: q.optionA.trim() },
      { key: 'B', text: q.optionB.trim() },
      { key: 'C', text: q.optionC.trim() },
      { key: 'D', text: q.optionD.trim() },
    ].filter((o) => o.text),
    answerKey: q.answerKey,
    explanation: q.explanation.trim(),
    subject: q.subject.trim(),
  }
}

function payloadFromDraft(draft: AdminMockDraft): AdminMockPayload {
  return {
    slug: draft.slug || slugify(draft.title),
    examSlug: draft.examSlug,
    title: draft.title.trim(),
    description: draft.description.trim(),
    durationMinutes: Number(draft.durationMinutes),
    difficulty: draft.difficulty,
    isFree: draft.isFree,
    subjects: draft.subjects.split(',').map((s) => s.trim()).filter(Boolean),
    questions: draft.questions.map(questionPayload),
  }
}

function draftQuestionFromImport(input: ImportedQuestion, fallback: string): AdminQuestionDraft | null {
  const options = normalizeOptions(input.options)
  if (!asString(input.question) || options.length < 2) return null
  return {
    id: crypto.randomUUID(),
    question: asString(input.question),
    optionA: options[0]?.text ?? '',
    optionB: options[1]?.text ?? '',
    optionC: options[2]?.text ?? '',
    optionD: options[3]?.text ?? '',
    answerKey: normalizeAnswer(input.answerKey ?? input.answer ?? input.correct),
    explanation: asString(input.explanation),
    subject: asString(input.subject, fallback),
  }
}

function draftQuestionFromApi(q: Question): AdminQuestionDraft {
  return {
    id: crypto.randomUUID(),
    question: q.question,
    optionA: q.options[0]?.text ?? '',
    optionB: q.options[1]?.text ?? '',
    optionC: q.options[2]?.text ?? '',
    optionD: q.options[3]?.text ?? '',
    answerKey: normalizeAnswer(q.answerKey),
    explanation: q.explanation,
    subject: q.subject,
  }
}

function parseJsonDraft(raw: string, current: AdminMockDraft, defaultExamSlug: string, defaultSubject: string): AdminMockDraft {
  const parsed = JSON.parse(raw) as ImportedMock | ImportedQuestion[]
  const imported = Array.isArray(parsed) ? { questions: parsed } : parsed
  const subjects = asStringList(imported.subjects)
  const fallback = subjects[0] || defaultSubject || 'General'
  const questionItems = Array.isArray(imported.questions) ? imported.questions : []
  const questions = questionItems
    .map((item) => draftQuestionFromImport(item as ImportedQuestion, fallback))
    .filter((item): item is AdminQuestionDraft => Boolean(item))
  if (!questions.length) throw new Error('JSON must include at least one valid question with two options.')
  const title = asString(imported.title, current.title)
  return {
    title,
    slug: asString(imported.slug, current.slug || slugify(title)),
    examSlug: asString(imported.examSlug, current.examSlug || defaultExamSlug),
    durationMinutes: String(imported.durationMinutes ?? current.durationMinutes),
    difficulty: normalizeDifficulty(imported.difficulty ?? current.difficulty),
    description: asString(imported.description, current.description),
    subjects: subjects.length ? subjects.join(', ') : current.subjects,
    isFree: typeof imported.isFree === 'boolean' ? imported.isFree : current.isFree,
    questions,
  }
}

// ─── Empty drafts ─────────────────────────────────────────────

const emptyQuestion = (): AdminQuestionDraft => ({
  id: crypto.randomUUID(), question: '', optionA: '', optionB: '', optionC: '', optionD: '',
  answerKey: 'A', explanation: '', subject: '',
})

const emptyDraft = (examSlug = ''): AdminMockDraft => ({
  title: '', slug: '', examSlug, durationMinutes: '30', difficulty: 'Moderate',
  description: '', subjects: '', isFree: true, questions: [],
})

const emptyExamDraft = (): AdminExamDraft => ({
  slug: '', name: '', shortName: '', category: 'States', icon: '📋', description: '', subjects: '',
})

const SAMPLE_JSON = `{
  "title": "JKSSB Finance Accounts Full Mock",
  "slug": "jkssb-finance-accounts-full-mock",
  "examSlug": "jkssb",
  "durationMinutes": 120,
  "difficulty": "Moderate",
  "isFree": true,
  "subjects": ["Finance", "Accounts", "General Awareness"],
  "description": "Full-length JKSSB Finance Accounts mock.",
  "questions": [
    {
      "question": "Which article deals with the Consolidated Fund of India?",
      "options": ["Article 266", "Article 280", "Article 112", "Article 148"],
      "answer": "A",
      "explanation": "Article 266 defines the Consolidated Fund of India.",
      "subject": "Finance"
    }
  ]
}`

// ─── Status banner ────────────────────────────────────────────

function StatusBanner({ msg, onClose }: { msg: StatusMsg; onClose: () => void }) {
  return (
    <div className={`admin-status-banner ${msg.kind}`}>
      {msg.kind === 'success' ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
      <span>{msg.text}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss"><X size={14} /></button>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────

export function AdminDashboardPage() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  // Data
  const [summary, setSummary] = useState<AdminSummary | null>(null)
  const [mocks, setMocks] = useState<MockItem[]>([])
  const [loading, setLoading] = useState(true)

  // UI state
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [statusMsg, setStatusMsg] = useState<StatusMsg | null>(null)
  const [saving, setSaving] = useState(false)

  // Mock draft
  const [draft, setDraft] = useState<AdminMockDraft>(emptyDraft())
  const [questionDraft, setQuestionDraft] = useState<AdminQuestionDraft>(emptyQuestion)
  const [selectedMockSlug, setSelectedMockSlug] = useState('')
  const [selectedMockQuestions, setSelectedMockQuestions] = useState<Question[]>([])
  const [selectedMockLoading, setSelectedMockLoading] = useState(false)
  const [mockSearch, setMockSearch] = useState('')
  const [pendingDeleteMock, setPendingDeleteMock] = useState<string | null>(null)

  // Exam draft
  const [examDraft, setExamDraft] = useState<AdminExamDraft>(emptyExamDraft())
  const [pendingDeleteExam, setPendingDeleteExam] = useState<string | null>(null)

  // Import
  const [jsonText, setJsonText] = useState(SAMPLE_JSON)
  const [bulkText, setBulkText] = useState('')

  const exams = summary?.exams ?? []
  const selectedExam = exams.find((e) => e.slug === draft.examSlug) ?? exams[0]
  const selectedMock = mocks.find((m) => m.slug === selectedMockSlug) ?? null

  usePageMeta({ title: 'Admin | PYQVault', description: 'Admin panel.', canonicalPath: '/admin' })

  const toast = (kind: StatusMsg['kind'], text: string) => {
    setStatusMsg({ kind, text })
    setTimeout(() => setStatusMsg(null), 5000)
  }

  // ── Load data ───────────────────────────────────────────────

  const loadData = useCallback(async () => {
    const [summaryData, mockData] = await Promise.all([fetchAdminSummary(), fetchMockCatalog()])
    setSummary(summaryData)
    setMocks(mockData)
    setDraft((cur) => cur.examSlug ? cur : emptyDraft(summaryData.exams[0]?.slug ?? ''))
  }, [])

  useEffect(() => {
    let cancelled = false
    void loadData()
      .catch(() => toast('error', 'Unable to load admin data.'))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [loadData])

  // ── Mock draft handlers ──────────────────────────────────────

  const updateDraft = <K extends keyof AdminMockDraft>(key: K, value: AdminMockDraft[K]) => {
    setDraft((cur) => ({
      ...cur,
      [key]: value,
      slug: key === 'title' && !cur.slug ? slugify(String(value)) : cur.slug,
    }))
  }

  const updateQuestion = (key: keyof AdminQuestionDraft, value: string) => {
    setQuestionDraft((cur) => ({ ...cur, [key]: value }))
  }

  const addQuestion = () => {
    if (!questionDraft.question.trim()) return
    setDraft((cur) => ({ ...cur, questions: [...cur.questions, questionDraft] }))
    setQuestionDraft(emptyQuestion())
  }

  const removeDraftQuestion = (id: string) => {
    setDraft((cur) => ({ ...cur, questions: cur.questions.filter((q) => q.id !== id) }))
  }

  const clearDraft = () => {
    setDraft(emptyDraft(exams[0]?.slug ?? ''))
    setQuestionDraft(emptyQuestion())
  }

  const saveMock = async () => {
    setSaving(true)
    try {
      const payload = payloadFromDraft(draft)
      await saveAdminMock(payload)
      toast('success', `Mock "${payload.title}" saved (${payload.questions.length} questions).`)
      clearDraft()
      await loadData()
      if (selectedMockSlug === payload.slug) {
        setSelectedMockQuestions(await fetchMockQuestions(payload.slug))
      }
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to save mock.')
    } finally {
      setSaving(false)
    }
  }

  const viewMock = async (mock: MockItem) => {
    setSelectedMockSlug(mock.slug)
    setSelectedMockQuestions([])
    setSelectedMockLoading(true)
    try {
      setSelectedMockQuestions(await fetchMockQuestions(mock.slug))
    } catch {
      toast('error', 'Unable to load mock questions.')
    } finally {
      setSelectedMockLoading(false)
    }
  }

  const loadMockIntoBuilder = () => {
    if (!selectedMock) return
    setDraft({
      title: selectedMock.title,
      slug: selectedMock.slug,
      examSlug: selectedMock.examSlug,
      durationMinutes: String(selectedMock.durationMinutes),
      difficulty: selectedMock.difficulty,
      description: selectedMock.description,
      subjects: selectedMock.subjects.join(', '),
      isFree: selectedMock.isFree,
      questions: selectedMockQuestions.map(draftQuestionFromApi),
    })
    toast('success', 'Mock loaded into builder. Edit and save to update.')
  }

  const confirmDeleteMock = async (slug: string) => {
    setSaving(true)
    try {
      await deleteAdminMock(slug)
      toast('success', 'Mock deleted.')
      setPendingDeleteMock(null)
      if (selectedMockSlug === slug) { setSelectedMockSlug(''); setSelectedMockQuestions([]) }
      await loadData()
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to delete mock.')
    } finally {
      setSaving(false)
    }
  }

  const deleteQuestion = async (slug: string) => {
    try {
      await deleteAdminQuestion(slug)
      setSelectedMockQuestions((cur) => cur.filter((q) => q.slug !== slug))
      toast('success', 'Question deleted.')
      await loadData()
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to delete question.')
    }
  }

  // ── Exam draft handlers ──────────────────────────────────────

  const updateExamDraft = <K extends keyof AdminExamDraft>(key: K, value: AdminExamDraft[K]) => {
    setExamDraft((cur) => ({
      ...cur,
      [key]: value,
      slug: key === 'name' && !cur.slug ? slugify(String(value)) : cur.slug,
    }))
  }

  const saveExam = async () => {
    setSaving(true)
    try {
      const payload: AdminExamPayload = {
        slug: examDraft.slug || slugify(examDraft.name),
        name: examDraft.name.trim(),
        shortName: examDraft.shortName.trim(),
        category: examDraft.category.trim(),
        icon: examDraft.icon.trim() || '📋',
        description: examDraft.description.trim(),
        subjects: examDraft.subjects.split(',').map((s) => s.trim()).filter(Boolean),
      }
      await saveAdminExam(payload)
      toast('success', `Exam "${payload.shortName}" saved.`)
      setExamDraft(emptyExamDraft())
      await loadData()
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to save exam.')
    } finally {
      setSaving(false)
    }
  }

  const confirmDeleteExam = async (slug: string) => {
    setSaving(true)
    try {
      await deleteAdminExam(slug)
      toast('success', 'Exam deleted.')
      setPendingDeleteExam(null)
      await loadData()
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to delete exam.')
    } finally {
      setSaving(false)
    }
  }

  // ── Import handlers ──────────────────────────────────────────

  const importJson = (raw = jsonText) => {
    try {
      const imported = parseJsonDraft(raw, draft, exams[0]?.slug ?? '', selectedExam?.subjects[0] ?? 'General')
      setDraft(imported)
      setQuestionDraft(emptyQuestion())
      toast('success', `Imported ${imported.questions.length} questions. Review in Mock Builder.`)
      setActiveTab('mocks')
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Invalid JSON.')
    }
  }

  const importJsonFile = async (file: File | undefined) => {
    if (!file) return
    const text = await file.text()
    setJsonText(text)
    importJson(text)
  }

  const importBulk = () => {
    const rows = bulkText.split('\n').map((l) => l.trim()).filter(Boolean).map((line) => {
      const [question, optionA, optionB, optionC, optionD, answerKey, explanation] = line.split('|').map((p) => p?.trim() ?? '')
      return { id: crypto.randomUUID(), question, optionA, optionB, optionC, optionD,
        answerKey: ['A','B','C','D'].includes(answerKey?.toUpperCase()) ? answerKey.toUpperCase() : 'A',
        explanation: explanation ?? '', subject: questionDraft.subject || selectedExam?.subjects[0] || 'General' }
    }).filter((r) => r.question && r.optionA && r.optionB)
    if (!rows.length) { toast('error', 'No valid rows found. Format: Question | A | B | C | D | Answer | Explanation'); return }
    setDraft((cur) => ({ ...cur, questions: [...cur.questions, ...rows] }))
    setBulkText('')
    toast('success', `Added ${rows.length} questions from bulk import.`)
    setActiveTab('mocks')
  }

  // ── Filtered mocks ────────────────────────────────────────────

  const filteredMocks = useMemo(() => {
    const q = mockSearch.trim().toLowerCase()
    if (!q) return mocks
    return mocks.filter((m) =>
      m.title.toLowerCase().includes(q) || m.examName.toLowerCase().includes(q) || m.difficulty.toLowerCase().includes(q)
    )
  }, [mocks, mockSearch])

  // ── Tab labels ─────────────────────────────────────────────────

  const tabLabel: Record<Tab, string> = {
    overview: 'Overview', exams: 'Exams', mocks: 'Mock Builder', import: 'Import',
  }

  if (loading) return <HaloLoader label="Loading admin" />

  return (
    <section className="admin-workspace">

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="admin-rail">
        <Link className="vault-logo" to="/admin"><span>P</span><strong>PYQVault</strong></Link>

        <nav className="admin-rail-nav">
          {(['overview', 'exams', 'mocks', 'import'] as Tab[]).map((tab) => {
            const icons: Record<Tab, typeof Home> = {
              overview: LayoutDashboard, exams: GraduationCap, mocks: ClipboardList, import: Code2,
            }
            const Icon = icons[tab]
            return (
              <button
                key={tab}
                type="button"
                className={`admin-nav-btn${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <Icon size={17} /> {tabLabel[tab]}
              </button>
            )
          })}
          <div className="admin-rail-divider" />
          <Link className="admin-nav-btn" to="/dashboard"><Home size={17} /> App home</Link>
        </nav>

        <button className="admin-rail-logout" type="button" onClick={() => void logout().then(() => navigate('/'))}>
          <LogOut size={17} /> Logout
        </button>
      </aside>

      {/* ── Main ─────────────────────────────────────────────── */}
      <main className="admin-work-main">

        {/* Page header */}
        <header className="admin-work-head">
          <div>
            <small>Admin</small>
            <h1>{tabLabel[activeTab]}</h1>
          </div>
          {activeTab === 'mocks' && (
            <div className="admin-head-actions">
              <button type="button" className="admin-ghost-btn" onClick={clearDraft} disabled={saving}>
                Clear draft
              </button>
              <button
                type="button"
                className="admin-save-btn"
                onClick={() => void saveMock()}
                disabled={saving || !draft.title.trim() || draft.questions.length === 0}
              >
                <Save size={15} /> {saving ? 'Saving…' : `Save mock (${draft.questions.length} Qs)`}
              </button>
            </div>
          )}
          {activeTab === 'exams' && (
            <button
              type="button"
              className="admin-save-btn"
              onClick={() => void saveExam()}
              disabled={saving || !examDraft.name.trim()}
            >
              <Save size={15} /> {saving ? 'Saving…' : 'Save exam'}
            </button>
          )}
        </header>

        {/* Status banner */}
        {statusMsg && <StatusBanner msg={statusMsg} onClose={() => setStatusMsg(null)} />}

        {/* ── Overview tab ────────────────────────────────────── */}
        {activeTab === 'overview' && (
          <div className="admin-tab-body">
            <div className="admin-stat-row">
              <article>
                <span className="admin-stat-icon"><GraduationCap size={16} /></span>
                <strong>{exams.length}</strong>
                <span>Exams</span>
              </article>
              <article>
                <span className="admin-stat-icon"><ClipboardList size={16} /></span>
                <strong>{summary?.mockCount ?? 0}</strong>
                <span>Mocks</span>
              </article>
              <article>
                <span className="admin-stat-icon"><FileQuestion size={16} /></span>
                <strong>{summary?.questionCount ?? 0}</strong>
                <span>Questions</span>
              </article>
              <article>
                <span className="admin-stat-icon"><FileText size={16} /></span>
                <strong>{summary?.paperCount ?? 0}</strong>
                <span>Papers</span>
              </article>
              <article>
                <span className="admin-stat-icon"><Users size={16} /></span>
                <strong>{summary?.userCount ?? 0}</strong>
                <span>Users</span>
              </article>
            </div>

            <div className="admin-overview-grid">
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>Quick actions</small><h2>Jump to</h2></div>
                </div>
                <div className="admin-quick-actions">
                  <button type="button" className="admin-quick-btn" onClick={() => setActiveTab('exams')}>
                    <GraduationCap size={18} /><span>Add exam</span>
                  </button>
                  <button type="button" className="admin-quick-btn" onClick={() => setActiveTab('mocks')}>
                    <ClipboardList size={18} /><span>Build mock</span>
                  </button>
                  <button type="button" className="admin-quick-btn" onClick={() => setActiveTab('import')}>
                    <UploadCloud size={18} /><span>Import JSON</span>
                  </button>
                  <Link className="admin-quick-btn" to="/exam">
                    <Home size={18} /><span>View site</span>
                  </Link>
                </div>
              </div>

              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>Recent</small><h2>Published mocks</h2></div>
                  <button type="button" className="admin-text-btn" onClick={() => setActiveTab('mocks')}>
                    View all
                  </button>
                </div>
                <div className="admin-manage-list">
                  {mocks.slice(0, 6).map((mock) => (
                    <div className="admin-manage-row" key={mock.slug}>
                      <div>
                        <strong>{mock.title}</strong>
                        <small>{mock.examName} · {mock.questions}Q · {mock.difficulty}</small>
                      </div>
                      <span className={`admin-badge ${mock.isFree ? 'free' : 'premium'}`}>
                        {mock.isFree ? 'Free' : 'Premium'}
                      </span>
                    </div>
                  ))}
                  {mocks.length === 0 && <p className="admin-empty">No mocks published yet.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Exams tab ────────────────────────────────────────── */}
        {activeTab === 'exams' && (
          <div className="admin-tab-body">
            <div className="admin-two-col">
              {/* Exam form */}
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div>
                    <small>{examDraft.slug ? 'Editing exam' : 'New exam'}</small>
                    <h2>{examDraft.slug ? examDraft.shortName || 'Edit exam' : 'Add exam'}</h2>
                  </div>
                  {examDraft.slug && (
                    <button type="button" className="admin-text-btn" onClick={() => setExamDraft(emptyExamDraft())}>
                      <X size={13} /> Clear
                    </button>
                  )}
                </div>
                <div className="admin-form-stack">
                  <div className="admin-form-row">
                    <label className="admin-field">
                      Full name
                      <input value={examDraft.name} onChange={(e) => updateExamDraft('name', e.target.value)} placeholder="JKSSB Finance Accounts" />
                    </label>
                    <label className="admin-field">
                      Short name
                      <input value={examDraft.shortName} onChange={(e) => updateExamDraft('shortName', e.target.value)} placeholder="JKSSB FA" />
                    </label>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-field">
                      Slug
                      <input value={examDraft.slug} onChange={(e) => updateExamDraft('slug', slugify(e.target.value))} placeholder="jkssb-fa" />
                    </label>
                    <label className="admin-field">
                      Category
                      <select value={examDraft.category} onChange={(e) => updateExamDraft('category', e.target.value)}>
                        {['Central','Banking','States','Railways','Teaching','Medical','Engineering'].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-field" style={{ maxWidth: 120 }}>
                      Icon
                      <input value={examDraft.icon} onChange={(e) => updateExamDraft('icon', e.target.value)} placeholder="📋" />
                    </label>
                    <label className="admin-field">
                      Subjects (comma-separated)
                      <input value={examDraft.subjects} onChange={(e) => updateExamDraft('subjects', e.target.value)} placeholder="Finance, Accounts, Reasoning, GK" />
                    </label>
                  </div>
                  <label className="admin-field">
                    Description
                    <textarea value={examDraft.description} onChange={(e) => updateExamDraft('description', e.target.value)} placeholder="Short description shown on exam cards." rows={3} />
                  </label>
                </div>
              </div>

              {/* Published exams */}
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>{exams.length} published</small><h2>All exams</h2></div>
                </div>
                <div className="admin-manage-list">
                  {exams.map((exam) => (
                    <div className="admin-manage-row" key={exam.slug}>
                      <span className="admin-exam-icon">{exam.icon}</span>
                      <div>
                        <strong>{exam.shortName}</strong>
                        <small>{exam.name} · {exam.category}</small>
                      </div>
                      <div className="admin-row-actions">
                        {pendingDeleteExam === exam.slug ? (
                          <>
                            <button className="admin-row-action danger" type="button" onClick={() => void confirmDeleteExam(exam.slug)} disabled={saving}>Confirm</button>
                            <button className="admin-row-action" type="button" onClick={() => setPendingDeleteExam(null)}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button className="admin-row-action" type="button" onClick={() => {
                              setExamDraft({ slug: exam.slug, name: exam.name, shortName: exam.shortName, category: exam.category, icon: exam.icon, description: exam.description, subjects: exam.subjects.join(', ') })
                            }}><Pencil size={13} /></button>
                            <button className="admin-row-action danger" type="button" onClick={() => setPendingDeleteExam(exam.slug)}><Trash2 size={13} /></button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {exams.length === 0 && <p className="admin-empty">No exams yet. Add one above.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Mocks tab ─────────────────────────────────────────── */}
        {activeTab === 'mocks' && (
          <div className="admin-tab-body">
            <div className="admin-two-col">
              {/* Mock details form */}
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>Mock details</small><h2>Create or update mock</h2></div>
                </div>
                <div className="admin-form-stack">
                  <label className="admin-field">
                    Mock title
                    <input value={draft.title} onChange={(e) => updateDraft('title', e.target.value)} placeholder="SSC CGL Tier 1 Full Mock" />
                  </label>
                  <div className="admin-form-row">
                    <label className="admin-field">
                      Slug
                      <input value={draft.slug} onChange={(e) => updateDraft('slug', slugify(e.target.value))} placeholder="ssc-cgl-tier-1-full-mock" />
                    </label>
                    <label className="admin-field">
                      Exam
                      <select value={draft.examSlug} onChange={(e) => updateDraft('examSlug', e.target.value)}>
                        {exams.map((exam) => <option value={exam.slug} key={exam.slug}>{exam.shortName}</option>)}
                      </select>
                    </label>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-field">
                      Difficulty
                      <select value={draft.difficulty} onChange={(e) => updateDraft('difficulty', e.target.value as AdminMockDraft['difficulty'])}>
                        <option>Beginner</option><option>Moderate</option><option>Advanced</option>
                      </select>
                    </label>
                    <label className="admin-field">
                      Duration (min)
                      <input value={draft.durationMinutes} onChange={(e) => updateDraft('durationMinutes', e.target.value)} inputMode="numeric" />
                    </label>
                    <label className="admin-field">
                      Access
                      <select value={draft.isFree ? 'free' : 'premium'} onChange={(e) => updateDraft('isFree', e.target.value === 'free')}>
                        <option value="free">Free</option><option value="premium">Premium</option>
                      </select>
                    </label>
                  </div>
                  <label className="admin-field">
                    Subjects (comma-separated)
                    <input value={draft.subjects} onChange={(e) => updateDraft('subjects', e.target.value)} placeholder="Reasoning, Quant, English" />
                  </label>
                  <label className="admin-field">
                    Description
                    <textarea value={draft.description} onChange={(e) => updateDraft('description', e.target.value)} placeholder="Short public description." rows={2} />
                  </label>
                </div>
              </div>

              {/* Add question form */}
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>Manual</small><h2>Add question</h2></div>
                  <button type="button" className="admin-save-btn small" onClick={addQuestion} disabled={!questionDraft.question.trim()}>
                    <Plus size={14} /> Add
                  </button>
                </div>
                <div className="admin-form-stack">
                  <label className="admin-field">
                    Question
                    <textarea value={questionDraft.question} onChange={(e) => updateQuestion('question', e.target.value)} rows={3} placeholder="Enter question text…" />
                  </label>
                  <div className="admin-form-row">
                    <label className="admin-field"><span>A</span><input value={questionDraft.optionA} onChange={(e) => updateQuestion('optionA', e.target.value)} /></label>
                    <label className="admin-field"><span>B</span><input value={questionDraft.optionB} onChange={(e) => updateQuestion('optionB', e.target.value)} /></label>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-field"><span>C</span><input value={questionDraft.optionC} onChange={(e) => updateQuestion('optionC', e.target.value)} /></label>
                    <label className="admin-field"><span>D</span><input value={questionDraft.optionD} onChange={(e) => updateQuestion('optionD', e.target.value)} /></label>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-field">
                      Correct answer
                      <select value={questionDraft.answerKey} onChange={(e) => updateQuestion('answerKey', e.target.value)}>
                        <option>A</option><option>B</option><option>C</option><option>D</option>
                      </select>
                    </label>
                    <label className="admin-field">
                      Subject
                      <input value={questionDraft.subject} onChange={(e) => updateQuestion('subject', e.target.value)} placeholder={selectedExam?.subjects[0] ?? 'General'} />
                    </label>
                  </div>
                  <label className="admin-field">
                    Explanation
                    <textarea value={questionDraft.explanation} onChange={(e) => updateQuestion('explanation', e.target.value)} rows={2} placeholder="Why is this the correct answer?" />
                  </label>
                </div>
              </div>
            </div>

            {/* Draft queue */}
            <div className="admin-tool-panel admin-draft-panel">
              <div className="admin-panel-title">
                <div>
                  <small>Ready to save</small>
                  <h2>Draft queue — {draft.questions.length} questions</h2>
                </div>
              </div>
              <div className="admin-manage-list">
                {draft.questions.map((q, i) => (
                  <div className="admin-manage-row" key={q.id}>
                    <span className="admin-q-num">Q{i + 1}</span>
                    <div>
                      <strong>{q.question}</strong>
                      <small>{q.subject || 'No subject'} · Answer: {q.answerKey}</small>
                    </div>
                    <button type="button" className="admin-row-action danger" onClick={() => removeDraftQuestion(q.id)} aria-label="Remove">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
                {draft.questions.length === 0 && <p className="admin-empty">No questions in draft. Add manually above or import via the Import tab.</p>}
              </div>
            </div>

            {/* Published mocks */}
            <div className="admin-tool-panel">
              <div className="admin-panel-title">
                <div><small>{mocks.length} published</small><h2>All mocks</h2></div>
              </div>
              <label className="admin-search-bar">
                <Search size={14} />
                <input value={mockSearch} onChange={(e) => setMockSearch(e.target.value)} placeholder="Search by title, exam, difficulty…" />
                {mockSearch && <button type="button" onClick={() => setMockSearch('')} aria-label="Clear"><X size={13} /></button>}
              </label>
              <div className="admin-manage-list">
                {filteredMocks.map((mock) => (
                  <div
                    className={`admin-manage-row admin-mock-row${selectedMockSlug === mock.slug ? ' active' : ''}`}
                    key={mock.slug}
                    role="button"
                    tabIndex={0}
                    onClick={() => void viewMock(mock)}
                    onKeyDown={(e) => { if (e.key === 'Enter') void viewMock(mock) }}
                  >
                    <span className={`admin-badge ${mock.isFree ? 'free' : 'premium'}`}>{mock.isFree ? 'Free' : 'Paid'}</span>
                    <div>
                      <strong>{mock.title}</strong>
                      <small>{mock.examName} · {mock.questions}Q · {mock.durationMinutes}min · {mock.difficulty}</small>
                    </div>
                    <div className="admin-row-actions" onClick={(e) => e.stopPropagation()}>
                      {pendingDeleteMock === mock.slug ? (
                        <>
                          <button className="admin-row-action danger" type="button" onClick={() => void confirmDeleteMock(mock.slug)} disabled={saving}>Yes, delete</button>
                          <button className="admin-row-action" type="button" onClick={() => setPendingDeleteMock(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <Link className="admin-row-action" to={`/mock-test/${mock.examSlug}`} target="_blank"><ExternalLink size={13} /></Link>
                          <button className="admin-row-action danger" type="button" onClick={() => setPendingDeleteMock(mock.slug)}><Trash2 size={13} /></button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {filteredMocks.length === 0 && <p className="admin-empty">{mockSearch ? 'No mocks matched.' : 'No mocks published yet.'}</p>}
              </div>
            </div>

            {/* Mock preview */}
            {selectedMock && (
              <div className="admin-tool-panel admin-mock-preview">
                <div className="admin-panel-title">
                  <div><small>Preview</small><h2>{selectedMock.title}</h2></div>
                  <div className="admin-row-actions">
                    <button type="button" className="admin-row-action" onClick={loadMockIntoBuilder}>
                      <Pencil size={13} /> Load into builder
                    </button>
                    <Link className="admin-row-action" to={`/mock-test/${selectedMock.examSlug}`} target="_blank">
                      <ExternalLink size={13} /> Public page
                    </Link>
                  </div>
                </div>
                {selectedMockLoading ? <HaloLoader label="Loading questions" /> : (
                  <div className="admin-question-detail-list">
                    {selectedMockQuestions.map((q, i) => (
                      <article className="admin-question-detail" key={q.slug}>
                        <div className="admin-question-detail-head">
                          <div>
                            <span>Q{i + 1}</span>
                            <strong>{q.subject}</strong>
                          </div>
                          <button type="button" className="admin-row-action danger" onClick={() => void deleteQuestion(q.slug)}>
                            <Trash2 size={13} /> Delete
                          </button>
                        </div>
                        <p>{q.question}</p>
                        <div className="admin-option-grid">
                          {q.options.map((opt) => (
                            <div className={opt.key === q.answerKey ? 'correct' : ''} key={opt.key}>
                              <strong>{opt.key}</strong><span>{opt.text}</span>
                            </div>
                          ))}
                        </div>
                        <div className="admin-answer-box">
                          <strong>Answer: {q.answerKey} — {q.answer}</strong>
                          <p>{q.explanation || 'No explanation.'}</p>
                        </div>
                      </article>
                    ))}
                    {selectedMockQuestions.length === 0 && <p className="admin-empty">No questions linked to this mock.</p>}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Import tab ────────────────────────────────────────── */}
        {activeTab === 'import' && (
          <div className="admin-tab-body">
            <div className="admin-two-col">
              {/* JSON import */}
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>JSON import</small><h2>Upload question paper</h2></div>
                  <div className="admin-row-actions">
                    <label className="admin-file-action">
                      <UploadCloud size={14} /> Upload file
                      <input type="file" accept="application/json,.json" onChange={(e) => void importJsonFile(e.target.files?.[0])} />
                    </label>
                    <button type="button" className="admin-save-btn small" onClick={() => importJson()}>
                      <Code2 size={14} /> Import
                    </button>
                  </div>
                </div>
                <textarea className="admin-bulk-box admin-json-box" value={jsonText} onChange={(e) => setJsonText(e.target.value)} />
                <p className="admin-help-text">
                  Include mock fields + a <code>questions</code> array. Options can be a string array, A/B/C/D object, or <code>&#123;key, text&#125;</code> objects. Questions go straight to Mock Builder draft queue.
                </p>
              </div>

              {/* Bulk rows */}
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>Pipe-delimited rows</small><h2>Bulk paste</h2></div>
                  <button type="button" className="admin-save-btn small" onClick={importBulk}>
                    <UploadCloud size={14} /> Import rows
                  </button>
                </div>
                <textarea
                  className="admin-bulk-box"
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder={`Question | Option A | Option B | Option C | Option D | Answer | Explanation\nWhat is 2+2? | 3 | 4 | 5 | 6 | B | Basic arithmetic`}
                />
                <p className="admin-help-text">
                  One question per line. Pipe <code>|</code> separated. Answer is A/B/C/D. Subject defaults to first subject of selected exam.
                </p>
              </div>
            </div>

            {/* Quick tips */}
            <div className="admin-tool-panel admin-tips-panel">
              <div className="admin-panel-title">
                <div><small>Reference</small><h2>Import format tips</h2></div>
              </div>
              <div className="admin-tips-grid">
                <div className="admin-tip">
                  <BookOpen size={16} />
                  <div>
                    <strong>JSON — array shorthand</strong>
                    <code>{'[{"question":"...","options":["A","B","C","D"],"answer":"A","subject":"Math"}]'}</code>
                  </div>
                </div>
                <div className="admin-tip">
                  <Code2 size={16} />
                  <div>
                    <strong>JSON — full mock</strong>
                    <code>{'{"title":"...","examSlug":"...","questions":[...]}'}</code>
                  </div>
                </div>
                <div className="admin-tip">
                  <ListChecks size={16} />
                  <div>
                    <strong>Bulk row format</strong>
                    <code>Question text | Opt A | Opt B | Opt C | Opt D | B | Explanation</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </section>
  )
}
