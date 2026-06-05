import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Code2,
  ExternalLink,
  FileQuestion,
  FileText,
  GraduationCap,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Send,
  Sun,
  Trash2,
  UploadCloud,
  Users,
  X,
  XCircle,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import { Logo } from '../components/ui/Logo'
import { useAuth } from '../context/useAuth'
import {
  clearAdminReports,
  deleteAdminExam,
  deleteAdminMock,
  deleteAdminPaper,
  deleteAdminQuestion,
  fetchAdminReports,
  fetchAdminSummary,
  fetchAdminActiveCount,
  fetchAdminUsers,
  fetchAdminInbox,
  adminInboxReply,
  adminInboxDelete,
  fetchMockCatalog,
  fetchMockQuestions,
  fetchPaperCatalog,
  fetchPaperQuestions,
  flushAdminCache,
  saveAdminExam,
  saveAdminMock,
  saveAdminPaper,
  updateAdminQuestion,
  updateAdminUserStatus,
  refreshAuthSession,
  APIError,
  type AdminExamPayload,
  type AdminMockPayload,
  type AdminMockQuestionPayload,
  type AdminPaperPayload,
  type AdminPaperQuestionPayload,
  type AdminSummary,
  type AdminUser,
  type InboxThread,
  type MockItem,
  type Paper,
  type Question,
  type QuestionOption,
  type QuestionReport,
} from '../lib/api'
import { usePageMeta } from '../lib/usePageMeta'

// ─── Types ────────────────────────────────────────────────────

type Tab = 'overview' | 'exams' | 'mocks' | 'papers' | 'inbox'

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
  negativeMarking: string
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

type ImportedPaper = {
  slug?: unknown; examSlug?: unknown; title?: unknown; year?: unknown; shift?: unknown
  description?: unknown; subjects?: unknown; questions?: unknown
}

type ImportedPaperQuestion = {
  questionNo?: unknown; question?: unknown; options?: unknown
  answerKey?: unknown; answer?: unknown; correct?: unknown
  explanation?: unknown; subject?: unknown; tags?: unknown
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
    negativeMarking: Number(draft.negativeMarking) || 0,
    difficulty: draft.difficulty,
    isFree: draft.isFree,
    subjects: draft.subjects.split(',').map((s) => s.trim()).filter(Boolean),
    questions: draft.questions.map(questionPayload),
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

function parsePaperJson(raw: string, defaultExamSlug: string): AdminPaperPayload {
  const parsed = JSON.parse(raw) as ImportedPaper
  const title = asString(parsed.title)
  const slug = asString(parsed.slug, slugify(title))
  const examSlug = asString(parsed.examSlug, defaultExamSlug)
  const subjects = asStringList(parsed.subjects)
  const questionItems = Array.isArray(parsed.questions) ? (parsed.questions as ImportedPaperQuestion[]) : []
  const questions: AdminPaperQuestionPayload[] = questionItems
    .filter((q) => asString(q.question))
    .map((q, i) => ({
      questionNo: asString(q.questionNo, String(i + 1)),
      question: asString(q.question),
      options: normalizeOptions(q.options),
      answerKey: normalizeAnswer(q.answerKey ?? q.answer ?? q.correct),
      explanation: asString(q.explanation),
      subject: asString(q.subject, subjects[0] ?? 'General'),
      tags: asStringList(q.tags),
    }))
    .filter((q) => q.options.length >= 2)
  if (!slug || !examSlug || !title) throw new Error('Paper JSON must include slug, examSlug, and title.')
  if (!questions.length) throw new Error('Paper JSON must include at least one valid question with two options.')
  return {
    slug, examSlug, title,
    year: asString(parsed.year),
    shift: asString(parsed.shift),
    description: asString(parsed.description),
    subjects: subjects.length ? subjects : ['General'],
    questions,
  }
}

const SAMPLE_PAPER_JSON = `{
  "slug": "jkssb-wildlife-guard-2026-may-10",
  "examSlug": "jkssb",
  "title": "JKSSB Wildlife Guard 2026 (May 10)",
  "year": "2026",
  "shift": "Morning",
  "description": "JKSSB Wildlife Guard recruitment exam held on May 10, 2026.",
  "subjects": ["Wildlife Conservation", "General Awareness", "Quantitative Aptitude"],
  "questions": [
    {
      "questionNo": "1",
      "question": "Which national park in J&K is known for the Hangul deer?",
      "options": ["Dachigam National Park", "Hemis National Park", "Kishtwar National Park", "Salim Ali National Park"],
      "answerKey": "A",
      "explanation": "Dachigam National Park near Srinagar is the primary habitat of the Kashmir stag (Hangul), an endangered deer species.",
      "subject": "Wildlife Conservation",
      "tags": ["hangul", "national parks", "J&K wildlife"]
    }
  ]
}`

// ─── Empty drafts ─────────────────────────────────────────────

const emptyQuestion = (): AdminQuestionDraft => ({
  id: crypto.randomUUID(), question: '', optionA: '', optionB: '', optionC: '', optionD: '',
  answerKey: 'A', explanation: '', subject: '',
})

const emptyDraft = (examSlug = ''): AdminMockDraft => ({
  title: '', slug: '', examSlug, durationMinutes: '30', negativeMarking: '0', difficulty: 'Moderate',
  description: '', subjects: '', isFree: true, questions: [],
})

const emptyExamDraft = (): AdminExamDraft => ({
  slug: '', name: '', shortName: '', category: 'States', icon: '📋', description: '', subjects: '',
})


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
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('admin-dark') === '1')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDark = () => setDarkMode((d) => {
    const next = !d
    localStorage.setItem('admin-dark', next ? '1' : '0')
    return next
  })

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

  // Paper state
  const [papers, setPapers] = useState<Paper[]>([])
  const [paperJsonText, setPaperJsonText] = useState(SAMPLE_PAPER_JSON)
  const [paperJsonPreview, setPaperJsonPreview] = useState<AdminPaperPayload | null>(null)
  const [paperJsonError, setPaperJsonError] = useState('')
  const [pendingDeletePaper, setPendingDeletePaper] = useState<string | null>(null)
  const [paperSearch, setPaperSearch] = useState('')

  // Questions browser state (inline in papers tab)
  const [selectedPaperSlug, setSelectedPaperSlug] = useState('')
  const [paperQuestions, setPaperQuestions] = useState<Question[]>([])
  const [paperQLoading, setPaperQLoading] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [editDraft, setEditDraft] = useState<AdminQuestionDraft>(emptyQuestion())
  const [editSaving, setEditSaving] = useState(false)

  // Reports
  const [reports, setReports] = useState<QuestionReport[]>([])
  const [reportCount, setReportCount] = useState(0)

  // Active users (real-time, polled every 30s)
  const [activeCount, setActiveCount] = useState<number | null>(null)

  // Users
  const [users, setUsers] = useState<AdminUser[]>([])
  const [usersTotal, setUsersTotal] = useState(0)
  const [usersOffset, setUsersOffset] = useState(0)
  const [usersLoading, setUsersLoading] = useState(false)
  const [userSearch, setUserSearch] = useState('')
  const [userSearchInput, setUserSearchInput] = useState('')
  const [togglingUserId, setTogglingUserId] = useState<string | null>(null)

  // Inbox
  const [inboxThreads, setInboxThreads] = useState<InboxThread[]>([])
  const [inboxLoading, setInboxLoading] = useState(false)
  const [activeInboxThread, setActiveInboxThread] = useState<InboxThread | null>(null)
  const [inboxReplyText, setInboxReplyText] = useState('')
  const [inboxReplying, setInboxReplying] = useState(false)
  const [inboxUnread, setInboxUnread] = useState(0)

  // New question (manual entry in Papers tab)
  const [newQDraft, setNewQDraft] = useState<AdminQuestionDraft>(emptyQuestion)
  const [addingQ, setAddingQ] = useState(false)

  const exams = summary?.exams ?? []
  const selectedExam = exams.find((e) => e.slug === draft.examSlug) ?? exams[0]
  const selectedMock = mocks.find((m) => m.slug === selectedMockSlug) ?? null

  usePageMeta({ title: 'Admin | Ministry of Papers', description: 'Admin panel.', canonicalPath: '/admin' })

  const toast = (kind: StatusMsg['kind'], text: string) => {
    setStatusMsg({ kind, text })
    setTimeout(() => setStatusMsg(null), 5000)
  }

  // ── Load data ───────────────────────────────────────────────

  const loadData = useCallback(async () => {
    const run = async () => {
      const [summaryData, mockData, paperData] = await Promise.all([fetchAdminSummary(), fetchMockCatalog(), fetchPaperCatalog()])
      setSummary(summaryData)
      setMocks(mockData ?? [])
      setPapers(paperData ?? [])
      setDraft((cur) => cur.examSlug ? cur : emptyDraft(summaryData.exams[0]?.slug ?? ''))
    }
    try {
      await run()
    } catch (err) {
      if (err instanceof APIError && err.status === 401) {
        await refreshAuthSession()
        await run()
      } else {
        throw err
      }
    }
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
      negativeMarking: String(selectedMock.negativeMarking ?? 0),
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

  // ── Paper handlers ───────────────────────────────────────────

  const parsePaperPreview = (raw = paperJsonText) => {
    try {
      const payload = parsePaperJson(raw, exams[0]?.slug ?? '')
      setPaperJsonPreview(payload)
      setPaperJsonError('')
    } catch (err) {
      setPaperJsonPreview(null)
      setPaperJsonError(err instanceof Error ? err.message : 'Invalid JSON.')
    }
  }

  const savePaper = async () => {
    if (!paperJsonPreview) return
    setSaving(true)
    try {
      await saveAdminPaper(paperJsonPreview)
      toast('success', `Paper "${paperJsonPreview.title}" saved (${paperJsonPreview.questions.length} questions).`)
      setPaperJsonPreview(null)
      setPaperJsonText(SAMPLE_PAPER_JSON)
      await loadData()
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to save paper.')
    } finally {
      setSaving(false)
    }
  }

  const confirmDeletePaper = async (slug: string) => {
    setSaving(true)
    try {
      await deleteAdminPaper(slug)
      toast('success', 'Paper deleted.')
      setPendingDeletePaper(null)
      await loadData()
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to delete paper.')
    } finally {
      setSaving(false)
    }
  }

  const handleFlushCache = async () => {
    setSaving(true)
    try {
      await flushAdminCache()
      toast('success', 'Cache flushed.')
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to flush cache.')
    } finally {
      setSaving(false)
    }
  }

  // ── Questions browser handlers ───────────────────────────────

  const loadPaperQuestions = async (paperSlug: string) => {
    setSelectedPaperSlug(paperSlug)
    setPaperQuestions([])
    setPaperQLoading(true)
    setEditingQuestion(null)
    try {
      const qs = await fetchPaperQuestions(paperSlug)
      setPaperQuestions(qs)
    } catch {
      toast('error', 'Unable to load paper questions.')
    } finally {
      setPaperQLoading(false)
    }
  }

  const startEditQuestion = (q: Question) => {
    setEditingQuestion(q)
    setEditDraft({
      id: crypto.randomUUID(),
      question: q.question,
      optionA: q.options[0]?.text ?? '',
      optionB: q.options[1]?.text ?? '',
      optionC: q.options[2]?.text ?? '',
      optionD: q.options[3]?.text ?? '',
      answerKey: normalizeAnswer(q.answerKey),
      explanation: q.explanation,
      subject: q.subject,
    })
  }

  const cancelEdit = () => {
    setEditingQuestion(null)
    setEditDraft(emptyQuestion())
  }

  const saveEditQuestion = async () => {
    if (!editingQuestion) return
    setEditSaving(true)
    try {
      await updateAdminQuestion(editingQuestion.slug, {
        question: editDraft.question.trim(),
        options: [
          { key: 'A', text: editDraft.optionA.trim() },
          { key: 'B', text: editDraft.optionB.trim() },
          { key: 'C', text: editDraft.optionC.trim() },
          { key: 'D', text: editDraft.optionD.trim() },
        ].filter((o) => o.text),
        answerKey: editDraft.answerKey,
        explanation: editDraft.explanation.trim(),
        subject: editDraft.subject.trim(),
        tags: editingQuestion.tags,
      })
      toast('success', 'Question updated.')
      cancelEdit()
      // Refresh whichever list is visible
      if (selectedPaperSlug) {
        const qs = await fetchPaperQuestions(selectedPaperSlug)
        setPaperQuestions(qs)
      }
      if (selectedMockSlug) {
        setSelectedMockQuestions(await fetchMockQuestions(selectedMockSlug))
      }
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to update question.')
    } finally {
      setEditSaving(false)
    }
  }

  // ── Add paper question (manual entry) ───────────────────────

  const addPaperQuestion = async () => {
    if (!selectedPaperSlug || !newQDraft.question.trim()) return
    const paper = papers.find((p) => p.slug === selectedPaperSlug)
    if (!paper) return
    setAddingQ(true)
    try {
      const newQ: AdminPaperQuestionPayload = {
        questionNo: String(paperQuestions.length + 1),
        question: newQDraft.question.trim(),
        options: [
          { key: 'A', text: newQDraft.optionA.trim() },
          { key: 'B', text: newQDraft.optionB.trim() },
          { key: 'C', text: newQDraft.optionC.trim() },
          { key: 'D', text: newQDraft.optionD.trim() },
        ].filter((o) => o.text),
        answerKey: newQDraft.answerKey,
        explanation: newQDraft.explanation.trim(),
        subject: newQDraft.subject.trim() || 'General',
        tags: [],
      }
      const payload: AdminPaperPayload = {
        slug: paper.slug,
        examSlug: paper.examSlug,
        title: paper.title,
        year: paper.year ?? '',
        shift: paper.shift ?? '',
        description: paper.description ?? '',
        subjects: paper.subjects ?? [],
        questions: [
          ...paperQuestions.map((q) => ({
            questionNo: q.questionNo,
            question: q.question,
            options: q.options,
            answerKey: q.answerKey,
            explanation: q.explanation ?? '',
            subject: q.subject,
            tags: q.tags ?? [],
          })),
          newQ,
        ],
      }
      await saveAdminPaper(payload)
      await loadPaperQuestions(selectedPaperSlug)
      setNewQDraft(emptyQuestion())
      toast('success', 'Question added.')
      await loadData()
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to add question.')
    } finally {
      setAddingQ(false)
    }
  }

  // ── Load reports ─────────────────────────────────────────────

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await fetchAdminReports()
        setReports(data.reports)
        setReportCount(data.count)
      } catch (err) {
        if (err instanceof APIError && err.status === 401) {
          try {
            await refreshAuthSession()
            const data = await fetchAdminReports()
            setReports(data.reports)
            setReportCount(data.count)
          } catch { /* silent */ }
        }
      }
    }
    void loadReports()
  }, [])

  // ── Filtered lists ────────────────────────────────────────────

  const filteredMocks = useMemo(() => {
    const q = mockSearch.trim().toLowerCase()
    if (!q) return mocks
    return mocks.filter((m) =>
      m.title.toLowerCase().includes(q) || m.examName.toLowerCase().includes(q) || m.difficulty.toLowerCase().includes(q)
    )
  }, [mocks, mockSearch])

  const filteredPapers = useMemo(() => {
    const q = paperSearch.trim().toLowerCase()
    if (!q) return papers.slice(0, 5)
    return papers.filter((p) =>
      p.title.toLowerCase().includes(q) || p.examName.toLowerCase().includes(q) || (p.year ?? '').toLowerCase().includes(q)
    )
  }, [papers, paperSearch])

  // ── Active-users polling (30s, overview tab only) ───────────────

  useEffect(() => {
    const poll = () => { void fetchAdminActiveCount().then((r) => setActiveCount(r.count)).catch(() => setActiveCount(0)) }
    poll()
    const id = setInterval(poll, 30_000)
    return () => clearInterval(id)
  }, [])

  // ── Users handlers ──────────────────────────────────────────────

  const loadUsers = async (offset = 0, q = userSearch, replace = true) => {
    setUsersLoading(true)
    try {
      const res = await fetchAdminUsers({ limit: 10, offset, q })
      setUsers((cur) => replace ? res.users : [...cur, ...res.users])
      setUsersTotal(res.total)
      setUsersOffset(offset)
    } catch {
      toast('error', 'Unable to load users.')
    } finally {
      setUsersLoading(false)
    }
  }

  const handleUserSearch = () => {
    setUserSearch(userSearchInput)
    setUsers([])
    void loadUsers(0, userSearchInput)
  }

  const handleClearUserSearch = () => {
    setUserSearchInput('')
    setUserSearch('')
    setUsers([])
    void loadUsers(0, '')
  }

  const toggleUserStatus = async (user: AdminUser) => {
    setTogglingUserId(user.id)
    try {
      await updateAdminUserStatus(user.id, !user.isActive)
      setUsers((cur) => cur.map((u) => u.id === user.id ? { ...u, isActive: !u.isActive } : u))
      toast('success', `${user.name} ${!user.isActive ? 'activated' : 'deactivated'}.`)
    } catch {
      toast('error', 'Failed to update user status.')
    } finally {
      setTogglingUserId(null)
    }
  }

  // ── Tab labels ─────────────────────────────────────────────────

  const loadInbox = async () => {
    setInboxLoading(true)
    try {
      const data = await fetchAdminInbox()
      setInboxThreads(data)
      setInboxUnread(data.filter(t => t.status === 'open').length)
      if (activeInboxThread) {
        const updated = data.find(t => t.id === activeInboxThread.id)
        if (updated) setActiveInboxThread(updated)
      }
    } catch { /* silent */ } finally {
      setInboxLoading(false)
    }
  }

  const handleInboxReply = async () => {
    if (!activeInboxThread || !inboxReplyText.trim() || inboxReplying) return
    setInboxReplying(true)
    try {
      await adminInboxReply(activeInboxThread.id, inboxReplyText.trim())
      setInboxReplyText('')
      await loadInbox()
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to reply')
    } finally {
      setInboxReplying(false)
    }
  }

  const handleInboxDelete = async (threadId: string) => {
    try {
      await adminInboxDelete(threadId)
      if (activeInboxThread?.id === threadId) setActiveInboxThread(null)
      await loadInbox()
      toast('success', 'Thread deleted.')
    } catch (err) {
      toast('error', err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  const tabLabel: Record<Tab, string> = {
    overview: 'Overview', exams: 'Exams', mocks: 'Mock Builder', papers: 'Papers', inbox: 'Inbox',
  }

  if (loading) return <HaloLoader label="Loading admin" />

  return (
    <section className={`admin-workspace${darkMode ? ' admin-dark' : ''}`}>

      {/* ── Mobile top bar ───────────────────────────────────── */}
      <div className="admin-mobile-topbar">
        <button type="button" className="admin-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <span className="admin-mobile-title">Admin · {tabLabel[activeTab]}</span>
        <div className="admin-active-pill admin-active-pill--mobile">
          <span className={`admin-active-dot${activeCount !== null && activeCount > 0 ? ' live' : ''}`} />
          <span>{activeCount ?? 0}</span>
        </div>
      </div>

      {/* ── Drawer overlay ───────────────────────────────────── */}
      {drawerOpen && (
        <div className="admin-drawer-overlay" onClick={() => setDrawerOpen(false)} />
      )}
      <aside className={`admin-rail${drawerOpen ? ' admin-rail--open' : ''}`}>
        <div className="admin-rail-header">
          <Logo />
          <button type="button" className="admin-drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="admin-rail-nav">
          {(['overview', 'exams', 'mocks', 'papers', 'inbox'] as Tab[]).map((tab) => {
            const icons: Record<Tab, typeof Home> = {
              overview: LayoutDashboard, exams: GraduationCap, mocks: ClipboardList, papers: FileText, inbox: Inbox,
            }
            const Icon = icons[tab]
            return (
              <button
                key={tab}
                type="button"
                className={`admin-nav-btn${activeTab === tab ? ' active' : ''}`}
                onClick={() => { setActiveTab(tab); if (tab === 'inbox') void loadInbox(); setDrawerOpen(false) }}
              >
                <Icon size={17} /> {tabLabel[tab]}
                {tab === 'inbox' && inboxUnread > 0 && (
                  <span className="admin-inbox-badge">{inboxUnread}</span>
                )}
              </button>
            )
          })}
          <div className="admin-rail-divider" />
          <Link className="admin-nav-btn" to="/exams" onClick={() => setDrawerOpen(false)}><Home size={17} /> App home</Link>
          <button type="button" className="admin-dark-toggle" onClick={toggleDark}>
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>
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
          {activeTab === 'papers' && (
            <div className="admin-head-actions">
              <button type="button" className="admin-ghost-btn" onClick={() => void handleFlushCache()} disabled={saving}>
                <RefreshCw size={14} /> Flush cache
              </button>
              {paperJsonPreview && (
                <button
                  type="button"
                  className="admin-save-btn"
                  onClick={() => void savePaper()}
                  disabled={saving}
                >
                  <Save size={15} /> {saving ? 'Saving…' : `Save paper (${paperJsonPreview.questions.length} Qs)`}
                </button>
              )}
            </div>
          )}

          <div className="admin-active-pill">
            <span className={`admin-active-dot${activeCount !== null && activeCount > 0 ? ' live' : ''}`} />
            <span>{activeCount ?? 0} active</span>
          </div>
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
                  <button type="button" className="admin-quick-btn" onClick={() => setActiveTab('papers')}>
                    <FileText size={18} /><span>Upload paper</span>
                  </button>
                  <button type="button" className="admin-quick-btn" onClick={() => void handleFlushCache()} disabled={saving}>
                    <RefreshCw size={18} /><span>Flush cache</span>
                  </button>
                  <Link className="admin-quick-btn" to="/exams" target="_blank" rel="noopener noreferrer">
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

            {reportCount > 0 && (
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div>
                    <small>{reportCount} pending</small>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><AlertTriangle size={15} /> Question Reports</h2>
                  </div>
                  <button type="button" className="admin-row-action danger" onClick={() => {
                    void clearAdminReports().then(() => { setReports([]); setReportCount(0); toast('success', 'Reports cleared.') })
                  }}>
                    <Trash2 size={13} /> Clear all
                  </button>
                </div>
                <div className="admin-manage-list">
                  {reports.map((r, i) => (
                    <div className="admin-manage-row" key={i}>
                      <AlertTriangle size={14} style={{ flexShrink: 0, color: 'var(--warning, #f59e0b)' }} />
                      <div>
                        <strong>Q{r.questionNo} — {r.reportType}</strong>
                        <small>{r.paperSlug} · {r.userEmail} · {new Date(r.timestamp).toLocaleDateString()}</small>
                        {r.details && <p style={{ margin: '2px 0 0', fontSize: 12 }}>{r.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Users section ────────────────────────────────── */}
            <div className="ov-users-section">
              <div className="ov-users-head">
                <h2>
                  Registered Users
                  {usersTotal > 0 && <small>{usersTotal} total</small>}
                </h2>
                <div className="ov-users-search">
                  <input
                    value={userSearchInput}
                    onChange={(e) => setUserSearchInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleUserSearch() }}
                    placeholder="Search name or email…"
                  />
                  {userSearchInput && (
                    <button type="button" onClick={handleClearUserSearch} aria-label="Clear" className="ov-search-clear"><X size={12} /></button>
                  )}
                  <button
                    type="button"
                    className="ov-search-go"
                    onClick={handleUserSearch}
                    disabled={usersLoading}
                    aria-label="Search"
                  >
                    <Search size={14} />
                  </button>
                </div>
              </div>

              {usersLoading && users.length === 0 && (
                <div className="ov-users-loading"><HaloLoader label="Fetching users" /></div>
              )}

              {users.length > 0 && (
                <>
                  <div className="ov-user-list-header">
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span>Status</span>
                    <span>Last login</span>
                    <span></span>
                  </div>
                  <div className="ov-user-list">
                    {users.map((user) => (
                      <div className="ov-user-row" key={user.id}>
                        <div className="ov-user-identity">
                          <span className="ov-user-initial">{user.name.charAt(0).toUpperCase()}</span>
                          <div>
                            <span className="ov-user-name-text">{user.name}</span>
                            {user.city && <small className="ov-user-city">{user.city}</small>}
                          </div>
                        </div>
                        <span className="ov-user-email-text">{user.email}</span>
                        <span className="ov-user-role-tag">{user.role}</span>
                        <span className={`ov-user-dot ${user.isActive ? 'active' : 'banned'}`}>
                          {user.isActive ? 'Active' : 'Banned'}
                        </span>
                        <span className="ov-user-login-text">
                          {new Date(user.lastLogin).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <button
                          type="button"
                          className={`ov-user-action-btn ${user.isActive ? 'ban' : 'activate'}`}
                          onClick={() => void toggleUserStatus(user)}
                          disabled={togglingUserId === user.id}
                        >
                          {togglingUserId === user.id ? '…' : user.isActive ? 'Ban' : 'Activate'}
                        </button>
                      </div>
                    ))}
                  </div>

                  {users.length < usersTotal && (
                    <button
                      type="button"
                      className="ov-load-more"
                      onClick={() => void loadUsers(usersOffset + 10, userSearch, false)}
                      disabled={usersLoading}
                    >
                      {usersLoading ? 'Loading…' : `Load more — ${usersTotal - users.length} remaining`}
                    </button>
                  )}
                </>
              )}

              {!usersLoading && users.length === 0 && userSearch && (
                <p className="ov-users-empty">No users matched "{userSearch}".</p>
              )}
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
                      Neg. marking
                      <input value={draft.negativeMarking} onChange={(e) => updateDraft('negativeMarking', e.target.value)} inputMode="decimal" placeholder="0.25" />
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
                          <div className="admin-row-actions">
                            <button type="button" className="admin-row-action" onClick={() => startEditQuestion(q)}>
                              <Pencil size={13} /> Edit
                            </button>
                            <button type="button" className="admin-row-action danger" onClick={() => void deleteQuestion(q.slug)}>
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
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

            {/* Inline edit form — appears when editing a mock question */}
            {editingQuestion && (
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div>
                    <small>Editing Q{editingQuestion.questionNo}</small>
                    <h2>{editingQuestion.subject}</h2>
                  </div>
                  <button type="button" className="admin-text-btn" onClick={cancelEdit}><X size={13} /> Cancel</button>
                </div>
                <div className="admin-form-stack">
                  <label className="admin-field">
                    Question text
                    <textarea value={editDraft.question} onChange={(e) => setEditDraft((d) => ({ ...d, question: e.target.value }))} rows={4} />
                  </label>
                  <div className="admin-form-row">
                    <label className="admin-field"><span>A</span><input value={editDraft.optionA} onChange={(e) => setEditDraft((d) => ({ ...d, optionA: e.target.value }))} /></label>
                    <label className="admin-field"><span>B</span><input value={editDraft.optionB} onChange={(e) => setEditDraft((d) => ({ ...d, optionB: e.target.value }))} /></label>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-field"><span>C</span><input value={editDraft.optionC} onChange={(e) => setEditDraft((d) => ({ ...d, optionC: e.target.value }))} /></label>
                    <label className="admin-field"><span>D</span><input value={editDraft.optionD} onChange={(e) => setEditDraft((d) => ({ ...d, optionD: e.target.value }))} /></label>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-field">
                      Correct answer
                      <select value={editDraft.answerKey} onChange={(e) => setEditDraft((d) => ({ ...d, answerKey: e.target.value }))}>
                        <option>A</option><option>B</option><option>C</option><option>D</option>
                      </select>
                    </label>
                    <label className="admin-field">
                      Subject
                      <input value={editDraft.subject} onChange={(e) => setEditDraft((d) => ({ ...d, subject: e.target.value }))} />
                    </label>
                  </div>
                  <label className="admin-field">
                    Explanation
                    <textarea value={editDraft.explanation} onChange={(e) => setEditDraft((d) => ({ ...d, explanation: e.target.value }))} rows={3} placeholder="Why is this the correct answer?" />
                  </label>
                  <button
                    type="button"
                    className="admin-save-btn"
                    onClick={() => void saveEditQuestion()}
                    disabled={editSaving || !editDraft.question.trim()}
                  >
                    <Save size={15} /> {editSaving ? 'Saving…' : 'Save changes'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Papers tab ───────────────────────────────────────── */}
        {activeTab === 'papers' && (
          <div className="admin-tab-body">
            <div className="admin-two-col">
              {/* JSON import */}
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>JSON upload</small><h2>Upload paper</h2></div>
                  <div className="admin-row-actions">
                    <label className="admin-file-action">
                      <UploadCloud size={14} /> Upload file
                      <input type="file" accept="application/json,.json" onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        const text = await file.text()
                        setPaperJsonText(text)
                        parsePaperPreview(text)
                      }} />
                    </label>
                    <button type="button" className="admin-save-btn small" onClick={() => parsePaperPreview()}>
                      <Code2 size={14} /> Parse
                    </button>
                  </div>
                </div>
                <textarea
                  className="admin-bulk-box admin-json-box"
                  value={paperJsonText}
                  onChange={(e) => { setPaperJsonText(e.target.value); setPaperJsonPreview(null); setPaperJsonError('') }}
                />
                {paperJsonError && <p className="admin-help-text" style={{ color: 'var(--error)' }}>{paperJsonError}</p>}
                <p className="admin-help-text">
                  Fields: <code>slug</code>, <code>examSlug</code>, <code>title</code>, <code>year</code>, <code>shift</code>, <code>description</code>, <code>subjects[]</code>, <code>questions[]</code>.
                  Each question: <code>questionNo</code>, <code>question</code>, <code>options[]</code>, <code>answerKey</code>, <code>explanation</code>, <code>subject</code>, <code>tags[]</code>.
                  Submitting overwrites the paper if slug already exists.
                </p>
              </div>

              {/* Preview */}
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>Parsed preview</small><h2>{paperJsonPreview ? paperJsonPreview.title : 'No paper parsed yet'}</h2></div>
                </div>
                {paperJsonPreview ? (
                  <div className="admin-form-stack">
                    <div className="admin-manage-row">
                      <div>
                        <strong>Slug</strong>
                        <small>{paperJsonPreview.slug}</small>
                      </div>
                    </div>
                    <div className="admin-manage-row">
                      <div>
                        <strong>Exam · Year · Shift</strong>
                        <small>{paperJsonPreview.examSlug} · {paperJsonPreview.year || '—'} · {paperJsonPreview.shift || '—'}</small>
                      </div>
                    </div>
                    <div className="admin-manage-row">
                      <div>
                        <strong>Subjects</strong>
                        <small>{paperJsonPreview.subjects.join(', ')}</small>
                      </div>
                    </div>
                    <div className="admin-manage-row">
                      <div>
                        <strong>Questions</strong>
                        <small>{paperJsonPreview.questions.length} questions parsed</small>
                      </div>
                    </div>
                    {paperJsonPreview.questions.slice(0, 3).map((q, i) => (
                      <div className="admin-manage-row" key={i}>
                        <span className="admin-q-num">Q{q.questionNo}</span>
                        <div>
                          <strong>{q.question.length > 80 ? q.question.slice(0, 80) + '…' : q.question}</strong>
                          <small>{q.subject} · Ans: {q.answerKey} · Tags: {q.tags.length ? q.tags.join(', ') : '—'}</small>
                        </div>
                      </div>
                    ))}
                    {paperJsonPreview.questions.length > 3 && (
                      <p className="admin-help-text">… and {paperJsonPreview.questions.length - 3} more questions</p>
                    )}
                  </div>
                ) : (
                  <p className="admin-empty">Click "Parse" after pasting or uploading a JSON file to preview before saving.</p>
                )}
              </div>
            </div>

            {/* Published papers */}
            <div className="admin-tool-panel">
              <div className="admin-panel-title">
                <div><small>{papers.length} published</small><h2>All papers</h2></div>
              </div>
              <label className="admin-search-bar">
                <Search size={14} />
                <input value={paperSearch} onChange={(e) => setPaperSearch(e.target.value)} placeholder="Search by title, exam or year…" />
                {paperSearch && <button type="button" onClick={() => setPaperSearch('')} aria-label="Clear"><X size={13} /></button>}
              </label>
              {!paperSearch && papers.length > 5 && (
                <p className="admin-help-text">Showing 5 most recent · search to find more</p>
              )}
              <div className="admin-manage-list">
                {filteredPapers.map((paper) => (
                  <div className={`admin-manage-row${selectedPaperSlug === paper.slug ? ' active' : ''}`} key={paper.slug}>
                    <div>
                      <strong>{paper.title}</strong>
                      <small>{paper.examName} · {paper.year}{paper.shift ? ` · ${paper.shift}` : ''} · {paper.questions}Q</small>
                    </div>
                    <div className="admin-row-actions">
                      {pendingDeletePaper === paper.slug ? (
                        <>
                          <button className="admin-row-action danger" type="button" onClick={() => void confirmDeletePaper(paper.slug)} disabled={saving}>Confirm</button>
                          <button className="admin-row-action" type="button" onClick={() => setPendingDeletePaper(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className="admin-row-action" type="button" title="Browse & edit questions" onClick={() => void loadPaperQuestions(paper.slug)}><Pencil size={13} /></button>
                          <Link className="admin-row-action" to={`/pyq/${paper.slug}`} target="_blank"><ExternalLink size={13} /></Link>
                          <button className="admin-row-action danger" type="button" onClick={() => setPendingDeletePaper(paper.slug)}><Trash2 size={13} /></button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                {filteredPapers.length === 0 && <p className="admin-empty">{paperSearch ? 'No papers matched.' : 'No papers published yet.'}</p>}
              </div>
            </div>

            {/* Add question manually */}
            {selectedPaperSlug && (
              <div className="admin-tool-panel">
                <div className="admin-panel-title">
                  <div><small>Manual entry · Q{paperQuestions.length + 1}</small><h2>Add question</h2></div>
                </div>
                <div className="admin-form-stack">
                  <label className="admin-field">
                    Question text
                    <textarea value={newQDraft.question} onChange={(e) => setNewQDraft((d) => ({ ...d, question: e.target.value }))} rows={3} placeholder="Enter the question…" />
                  </label>
                  <div className="admin-form-row">
                    <label className="admin-field"><span>A</span><input value={newQDraft.optionA} onChange={(e) => setNewQDraft((d) => ({ ...d, optionA: e.target.value }))} /></label>
                    <label className="admin-field"><span>B</span><input value={newQDraft.optionB} onChange={(e) => setNewQDraft((d) => ({ ...d, optionB: e.target.value }))} /></label>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-field"><span>C</span><input value={newQDraft.optionC} onChange={(e) => setNewQDraft((d) => ({ ...d, optionC: e.target.value }))} /></label>
                    <label className="admin-field"><span>D</span><input value={newQDraft.optionD} onChange={(e) => setNewQDraft((d) => ({ ...d, optionD: e.target.value }))} /></label>
                  </div>
                  <div className="admin-form-row">
                    <label className="admin-field">
                      Correct answer
                      <select value={newQDraft.answerKey} onChange={(e) => setNewQDraft((d) => ({ ...d, answerKey: e.target.value }))}>
                        <option>A</option><option>B</option><option>C</option><option>D</option>
                      </select>
                    </label>
                    <label className="admin-field">
                      Subject
                      <input value={newQDraft.subject} onChange={(e) => setNewQDraft((d) => ({ ...d, subject: e.target.value }))} placeholder="e.g. Mathematics" />
                    </label>
                  </div>
                  <label className="admin-field">
                    Explanation
                    <textarea value={newQDraft.explanation} onChange={(e) => setNewQDraft((d) => ({ ...d, explanation: e.target.value }))} rows={2} placeholder="Why is this the correct answer?" />
                  </label>
                  <button
                    type="button"
                    className="admin-save-btn"
                    onClick={() => void addPaperQuestion()}
                    disabled={addingQ || !newQDraft.question.trim() || !newQDraft.optionA.trim() || !newQDraft.optionB.trim()}
                  >
                    <Plus size={15} /> {addingQ ? 'Adding…' : `Add Q${paperQuestions.length + 1}`}
                  </button>
                </div>
              </div>
            )}

            {/* Inline question browser */}
            {selectedPaperSlug && (
              <div className="admin-two-col">
                {/* Edit form */}
                <div className="admin-tool-panel">
                  <div className="admin-panel-title">
                    <div>
                      <small>{editingQuestion ? `Editing Q${editingQuestion.questionNo}` : 'Edit question'}</small>
                      <h2>{editingQuestion ? editingQuestion.subject : 'Select a question to edit'}</h2>
                    </div>
                    {editingQuestion && (
                      <button type="button" className="admin-text-btn" onClick={cancelEdit}><X size={13} /> Cancel</button>
                    )}
                  </div>
                  {editingQuestion ? (
                    <div className="admin-form-stack">
                      <label className="admin-field">
                        Question text
                        <textarea value={editDraft.question} onChange={(e) => setEditDraft((d) => ({ ...d, question: e.target.value }))} rows={4} />
                      </label>
                      <div className="admin-form-row">
                        <label className="admin-field"><span>A</span><input value={editDraft.optionA} onChange={(e) => setEditDraft((d) => ({ ...d, optionA: e.target.value }))} /></label>
                        <label className="admin-field"><span>B</span><input value={editDraft.optionB} onChange={(e) => setEditDraft((d) => ({ ...d, optionB: e.target.value }))} /></label>
                      </div>
                      <div className="admin-form-row">
                        <label className="admin-field"><span>C</span><input value={editDraft.optionC} onChange={(e) => setEditDraft((d) => ({ ...d, optionC: e.target.value }))} /></label>
                        <label className="admin-field"><span>D</span><input value={editDraft.optionD} onChange={(e) => setEditDraft((d) => ({ ...d, optionD: e.target.value }))} /></label>
                      </div>
                      <div className="admin-form-row">
                        <label className="admin-field">
                          Correct answer
                          <select value={editDraft.answerKey} onChange={(e) => setEditDraft((d) => ({ ...d, answerKey: e.target.value }))}>
                            <option>A</option><option>B</option><option>C</option><option>D</option>
                          </select>
                        </label>
                        <label className="admin-field">
                          Subject
                          <input value={editDraft.subject} onChange={(e) => setEditDraft((d) => ({ ...d, subject: e.target.value }))} />
                        </label>
                      </div>
                      <label className="admin-field">
                        Explanation
                        <textarea value={editDraft.explanation} onChange={(e) => setEditDraft((d) => ({ ...d, explanation: e.target.value }))} rows={3} placeholder="Why is this the correct answer?" />
                      </label>
                      <button
                        type="button"
                        className="admin-save-btn"
                        onClick={() => void saveEditQuestion()}
                        disabled={editSaving || !editDraft.question.trim()}
                      >
                        <Save size={15} /> {editSaving ? 'Saving…' : 'Save changes'}
                      </button>
                    </div>
                  ) : (
                    <p className="admin-empty">Click the pencil icon on a question below to edit it.</p>
                  )}
                </div>

                {/* Question list */}
                <div className="admin-tool-panel admin-mock-preview">
                  <div className="admin-panel-title">
                    <div>
                      <small>{paperQuestions.length} questions</small>
                      <h2>{papers.find((p) => p.slug === selectedPaperSlug)?.title ?? selectedPaperSlug}</h2>
                    </div>
                    <button type="button" className="admin-text-btn" onClick={() => { setSelectedPaperSlug(''); setEditingQuestion(null) }}><X size={13} /> Close</button>
                  </div>
                  {paperQLoading ? <HaloLoader label="Loading questions" /> : (
                    <div className="admin-question-detail-list">
                      {paperQuestions.map((q, i) => (
                        <article className="admin-question-detail" key={q.slug}>
                          <div className="admin-question-detail-head">
                            <div>
                              <span>Q{i + 1}</span>
                              <strong>{q.subject}</strong>
                            </div>
                            <div className="admin-row-actions">
                              <button type="button" className="admin-row-action" onClick={() => startEditQuestion(q)}>
                                <Pencil size={13} /> Edit
                              </button>
                              <button type="button" className="admin-row-action danger" onClick={async () => {
                                try {
                                  await deleteAdminQuestion(q.slug)
                                  setPaperQuestions((cur) => cur.filter((x) => x.slug !== q.slug))
                                  toast('success', 'Question deleted.')
                                  await loadData()
                                } catch (err) {
                                  toast('error', err instanceof Error ? err.message : 'Failed to delete.')
                                }
                              }}>
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                          <p>{q.question.length > 120 ? q.question.slice(0, 120) + '…' : q.question}</p>
                          <div className="admin-option-grid">
                            {q.options.map((opt) => (
                              <div className={opt.key === q.answerKey ? 'correct' : ''} key={opt.key}>
                                <strong>{opt.key}</strong><span>{opt.text}</span>
                              </div>
                            ))}
                          </div>
                          {q.explanation && (
                            <div className="admin-answer-box">
                              <strong>Answer: {q.answerKey}</strong>
                              <p>{q.explanation}</p>
                            </div>
                          )}
                        </article>
                      ))}
                      {paperQuestions.length === 0 && <p className="admin-empty">No questions in this paper.</p>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Inbox tab ────────────────────────────────────────── */}
        {activeTab === 'inbox' && (
          <div className="admin-inbox-tab">
            <div className="admin-inbox-layout">

              {/* Left: thread list */}
              <div className="admin-inbox-list">
                <div className="admin-inbox-list-head">
                  <div className="admin-inbox-list-head-meta">
                    <h2>Suggestions</h2>
                    <button type="button" className="admin-inbox-refresh" onClick={() => void loadInbox()} disabled={inboxLoading} title="Refresh">
                      <RefreshCw size={13} className={inboxLoading ? 'admin-inbox-spin' : ''} />
                    </button>
                  </div>
                  <span className="admin-inbox-count">{inboxThreads.length} thread{inboxThreads.length !== 1 ? 's' : ''} · auto-delete in 2 days</span>
                </div>

                <div className="admin-inbox-thread-list">
                  {inboxThreads.length === 0 && !inboxLoading && (
                    <div className="admin-inbox-empty-list">
                      <Inbox size={28} strokeWidth={1.5} />
                      <p>No suggestions yet</p>
                    </div>
                  )}
                  {inboxThreads.map(t => (
                    <div
                      key={t.id}
                      className={`admin-inbox-row${activeInboxThread?.id === t.id ? ' active' : ''}${t.status === 'open' ? ' admin-inbox-row--open' : ''}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveInboxThread(t)}
                      onKeyDown={e => { if (e.key === 'Enter') setActiveInboxThread(t) }}
                    >
                      <div className="admin-inbox-avatar">
                        {t.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="admin-inbox-row-body">
                        <div className="admin-inbox-row-top">
                          <span className="admin-inbox-user">{t.userName}</span>
                          <span className="admin-inbox-time">
                            {new Date(t.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        {(t.examName || t.searchTerm) && (
                          <span className="admin-inbox-context-tag">📌 {t.examName || t.searchTerm}</span>
                        )}
                        <p className="admin-inbox-preview">{t.messages[t.messages.length - 1]?.text}</p>
                        <span className={`admin-inbox-status-pill ${t.status}`}>
                          {t.status === 'open' ? '● Open' : '✓ Replied'}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="admin-inbox-del"
                        onClick={e => { e.stopPropagation(); void handleInboxDelete(t.id) }}
                        aria-label="Delete thread"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: conversation */}
              <div className="admin-inbox-convo">
                {!activeInboxThread ? (
                  <div className="admin-inbox-convo-empty">
                    <Inbox size={40} strokeWidth={1.2} />
                    <p>Select a thread to read and reply</p>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="admin-inbox-convo-head">
                      <div className="admin-inbox-convo-avatar">
                        {activeInboxThread.userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="admin-inbox-convo-info">
                        <strong>{activeInboxThread.userName}</strong>
                        <small>{activeInboxThread.userEmail}</small>
                      </div>
                      {(activeInboxThread.examName || activeInboxThread.searchTerm) && (
                        <span className="admin-inbox-convo-tag">
                          Re: {activeInboxThread.examName || activeInboxThread.searchTerm}
                        </span>
                      )}
                    </div>

                    {/* Messages */}
                    <div className="admin-inbox-messages">
                      {activeInboxThread.messages.map(m => (
                        <div key={m.id} className={`admin-inbox-msg admin-inbox-msg--${m.from}`}>
                          <span className="admin-inbox-msg-who">
                            {m.from === 'admin' ? 'You' : activeInboxThread.userName}
                          </span>
                          <p className="admin-inbox-msg-text">{m.text}</p>
                          <span className="admin-inbox-msg-time">
                            {new Date(m.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Reply box */}
                    <div className="admin-inbox-reply">
                      <div className="admin-inbox-reply-inner">
                        <textarea
                          value={inboxReplyText}
                          onChange={e => setInboxReplyText(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void handleInboxReply() } }}
                          placeholder="Write a reply…"
                          maxLength={500}
                          rows={2}
                        />
                        <button
                          type="button"
                          className="admin-inbox-reply-send"
                          onClick={() => void handleInboxReply()}
                          disabled={inboxReplying || !inboxReplyText.trim()}
                          title="Send reply"
                        >
                          <Send size={15} />
                        </button>
                      </div>
                      <p className="admin-inbox-reply-hint">Enter to send · Shift+Enter for new line · max 500 chars</p>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        )}

      </main>
    </section>
  )
}
