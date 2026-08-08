import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  UserRound,
  Play,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { HaloLoader } from '../components/common/HaloLoader'
import { QuestionRenderer } from '../components/common/QuestionRenderer'
import { MathText } from '../components/common/MathText'
import { useAuth } from '../context/useAuth'
import {
  APIError,
  fetchActiveLiveAttempts,
  fetchMockBySlug,
  fetchMockQuestions,
  fetchPaperBySlug,
  fetchPaperQuestions,
  submitReport,
  refreshAuthSession,
  startLiveAttempt,
  syncLiveAttempt,
  submitLiveAttempt,
  type ActiveAttempt,
  type Paper,
  type Question,
} from '../lib/api'
import { savePaperResult, readPaperResults } from '../lib/mockActivity'
import { getLocalizedQuestion, hasHindi, type QuestionLanguage } from '../lib/questionLanguage'
import { ExplanationText } from '../components/common/ExplanationText'
import { Logo } from '../components/ui/Logo'
import { paperPath } from '../lib/paperSeo'
import { usePageMeta } from '../lib/usePageMeta'
import { paperAttemptSeoTitle } from '../lib/pageTitles'

// Question and option text render through the SHARED MathText, not a local
// copy. The local one handled only $math$ and newlines, so **bold** showed
// its asterisks and the [[fig:]] / [[water:]] tokens rendered as raw markup
// inside the exam hall. It also imported KaTeX eagerly; the shared component
// loads it on demand, only for text that actually contains math.

// ── Timer ──────────────────────────────────────────────────────

// A mock carries everything the attempt environment needs except year/shift,
// which are properties of a real sitting and simply do not apply.
async function mockAsPaper(slug: string): Promise<Paper> {
  const m = await fetchMockBySlug(slug)
  return {
    slug: m.slug,
    examSlug: m.examSlug,
    examName: m.examName,
    title: m.title,
    year: '',
    shift: '',
    description: m.description,
    questions: m.questions,
    subjects: m.subjects,
    negativeMarking: m.negativeMarking,
    sourceUrl: '',
    durationMinutes: m.durationMinutes,
    maxMarks: m.maxMarks ?? m.questions,
  }
}

// Always mm:ss — used for the per-question timer, which never runs to hours.
function formatClock(sec: number) {
  const m = Math.floor(sec / 60)
  return `${String(m).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`
}

function formatTime(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

// ── Question status ────────────────────────────────────────────

type QStatus = 'not-visited' | 'visited' | 'answered' | 'marked' | 'answered-marked'

function getStatus(
  slug: string,
  currentSlug: string,
  answers: Record<string, string>,
  marked: Record<string, boolean>,
  visited: Set<string>,
): QStatus {
  const isAnswered = Boolean(answers[slug])
  const isMarked = Boolean(marked[slug])
  if (isAnswered && isMarked) return 'answered-marked'
  if (isMarked) return 'marked'
  if (isAnswered) return 'answered'
  if (visited.has(slug) || slug === currentSlug) return 'visited'
  return 'not-visited'
}

// ── Results helpers ────────────────────────────────────────────

type SubjectScore = { subject: string; correct: number; wrong: number; skipped: number; total: number }

function computeResults(questions: Question[], answers: Record<string, string>) {
  let correct = 0, wrong = 0, skipped = 0
  const bySubject: Record<string, SubjectScore> = {}
  for (const q of questions) {
    if (q.answerKey === 'Deleted') continue
    if (!bySubject[q.subject]) bySubject[q.subject] = { subject: q.subject, correct: 0, wrong: 0, skipped: 0, total: 0 }
    bySubject[q.subject].total++
    const chosen = answers[q.slug]
    if (!chosen) { skipped++; bySubject[q.subject].skipped++ }
    else if (chosen === q.answerKey) { correct++; bySubject[q.subject].correct++ }
    else { wrong++; bySubject[q.subject].wrong++ }
  }
  return { correct, wrong, skipped, subjectScores: Object.values(bySubject) }
}

// ── Main component ─────────────────────────────────────────────

const DEFAULT_DURATION = 120 * 60

export function PaperAttemptPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const { isAuthenticated, user } = useAuth()

  const [paper, setPaper] = useState<Paper | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [examStarted, setExamStarted] = useState(false)
  // ?review=1 reopens a finished attempt: same exam layout, answers and
  // explanations revealed, no timer, no fullscreen.
  const isReview = searchParams.get('review') === '1'
  const [introStep, setIntroStep] = useState<'instructions' | 'declaration'>('instructions')
  const [declared, setDeclared] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportType, setReportType] = useState('Wrong answer key')
  const [reportDetails, setReportDetails] = useState('')
  const [reportSent, setReportSent] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  // Seconds spent on the question currently open; resets on every move, the
  // way the delivery software reports per-question time.
  const [questionSeconds, setQuestionSeconds] = useState(0)
  // On a phone the palette cannot sit beside the question, and stacking it
  // above pushed the question itself below the fold. It becomes a drawer.
  const [paletteOpen, setPaletteOpen] = useState(false)
  // Stamped by the effect below on mount and on every question change, so it
  // never has to call Date.now() during render.
  const questionStartedAtRef = useRef(0)
  const [startingExam, setStartingExam] = useState(false)

  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [resumeDetected, setResumeDetected] = useState(false)
  const [existingAttempt, setExistingAttempt] = useState<ActiveAttempt | null>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [marked, setMarked] = useState<Record<string, boolean>>({})
  const [visited, setVisited] = useState<Set<string>>(new Set())
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_DURATION)
  const [submitted, setSubmitted] = useState(false)
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [language, setLanguage] = useState<QuestionLanguage>('en')
  const [activeSubject, setActiveSubject] = useState<string | null>(null)

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [exiting, setExiting] = useState(false)

  const resultSavedRef      = useRef(false)
  const startTimeRef        = useRef(Date.now())
  const submittedRef        = useRef(false)
  const resumeFetchedAtMs   = useRef(0)
  const [, forceResumeTick] = useState(0)

  useEffect(() => { submittedRef.current = submitted }, [submitted])

  // Wall-clock based rather than a tick count: moving to another question just
  // restamps the ref, and the next tick recomputes from it. Counting ticks
  // drifted whenever the tab was backgrounded and throttled.
  useEffect(() => { questionStartedAtRef.current = Date.now() }, [currentIndex])

  useEffect(() => {
    if (!examStarted || submitted) return
    const id = window.setInterval(
      () => setQuestionSeconds(Math.floor((Date.now() - questionStartedAtRef.current) / 1000)),
      1000,
    )
    return () => window.clearInterval(id)
  }, [examStarted, submitted])

  useEffect(() => {
    if (!resumeDetected || examStarted) return
    const id = window.setInterval(() => forceResumeTick((n) => n + 1), 1000)
    return () => window.clearInterval(id)
  }, [resumeDetected, examStarted])

  usePageMeta({
    title: paper
      ? paperAttemptSeoTitle({ examName: paper.examName, year: paper.year, shift: paper.shift })
      : 'Paper Attempt | Ministry of Papers',
    description: paper
      ? `Attempting ${paper.examName}${paper.year ? ` ${paper.year}` : ''} previous year paper. ${paper.questions} questions with timer on Ministry of Papers.`
      : 'Attempt a full-length previous year question paper.',
    canonicalPath: slug ? `/paper-attempt/${slug}` : '/paper-attempt',
  })

  // ── Load the paper (or mock) + questions; detect active live attempt ──
  //
  // Mocks run in this exact environment rather than a second one of their own:
  // same intro screen, fullscreen enforcement, palette, timer, resume and
  // result screen. A mock is loaded as a Paper-shaped record — every field this
  // page reads exists on a mock too, apart from year/shift, which a mock simply
  // does not have. That also keeps the dashboard's resume link working, since
  // it points every live attempt at /paper-attempt/<slug>.
  useEffect(() => {
    if (!slug) return
    let cancelled = false
    const load = async () => {
      try {
        // Resolve what this slug IS before fetching its questions. The papers
        // endpoint answers 200 with null for an unknown slug rather than
        // erroring, so a .catch() fallback would silently load an empty exam.
        const paperData = await fetchPaperBySlug(slug).catch(() => null)
        const record = paperData ?? (await mockAsPaper(slug))
        const [qs, liveAttempts] = await Promise.all([
          paperData ? fetchPaperQuestions(slug) : fetchMockQuestions(slug),
          fetchActiveLiveAttempts().catch(() => [] as ActiveAttempt[]),
        ])
        if (cancelled) return
        setPaper(record)
        setQuestions(qs ?? [])

        // Review reopens a finished attempt: restore the responses that were
        // saved with the result and go straight in — no intro, no timer, no
        // fullscreen, nothing to submit.
        if (isReview) {
          const saved = readPaperResults().find((r) => r.paperSlug === record.slug)
          if (saved?.answers) setAnswers(saved.answers)
          setExamStarted(true)
          // The live attempt scopes the palette to one section at a time; review
          // has to do the same, or the sidebar dumps all 100 questions into one
          // grid instead of the section you are actually reading.
          const subjects = new Set((qs ?? []).map((q) => q.subject))
          if (subjects.size > 1) setActiveSubject((qs ?? [])[0]?.subject ?? null)
        }
        const existing = liveAttempts.find((a) => a.paperSlug === slug)
        if (existing) {
          resumeFetchedAtMs.current = Date.now()
          setExistingAttempt(existing)
          setResumeDetected(true)
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => { cancelled = true }
  }, [slug])

  // ── Fullscreen change listener (no auto-request on mount) ─────
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    }
  }, [])

  // ── Start exam handler ────────────────────────────────────────
  const handleStartExam = useCallback(async () => {
    if (!paper || !questions.length || startingExam) return
    setStartingExam(true)
    const durationSeconds = (paper.durationMinutes > 0 ? paper.durationMinutes : 120) * 60
    let startIdx = 0
    try {
      const liveState = await startLiveAttempt({
        paperSlug: paper.slug,
        examSlug: paper.examSlug,
        paperTitle: paper.title,
        examName: paper.examName ?? '',
        totalQuestions: questions.length,
        durationSeconds,
      })
      if (liveState?.resumed) {
        setAnswers(liveState.answers ?? {})
        setMarked(liveState.marked ?? {})
        startIdx = liveState.currentIndex ?? 0
        setCurrentIndex(startIdx)
        if (liveState?.attemptId) setAttemptId(liveState.attemptId)
        // Timer already expired while user was away — auto-submit immediately
        if (liveState.remainingSeconds <= 0) {
          startTimeRef.current = Date.now()
          setExamStarted(true)
          setSubmitted(true)
          setStartingExam(false)
          return
        }
        setRemainingSeconds(liveState.remainingSeconds)
      } else {
        setRemainingSeconds(durationSeconds)
      }
      if (liveState?.attemptId) setAttemptId(liveState.attemptId)
    } catch {
      setRemainingSeconds(durationSeconds)
    }
    // Auto-select the subject of the starting question for multi-subject exams
    const distinctSubjects = new Set(questions.map((q) => q.subject))
    if (distinctSubjects.size > 1) {
      setActiveSubject(questions[startIdx]?.subject ?? null)
    }
    startTimeRef.current = Date.now()
    document.documentElement.requestFullscreen?.()
      .then(() => setIsFullscreen(true))
      .catch(() => {})
    setExamStarted(true)
    setStartingExam(false)
  }, [paper, questions, startingExam])

  // ── Resume handler — calls startLiveAttempt to restore full state ──
  const handleResumeExam = useCallback(async () => {
    if (!paper || !questions.length || startingExam) return
    setStartingExam(true)
    const durationSeconds = (paper.durationMinutes > 0 ? paper.durationMinutes : 120) * 60
    let startIdx = 0
    try {
      const liveState = await startLiveAttempt({
        paperSlug: paper.slug,
        examSlug: paper.examSlug,
        paperTitle: paper.title,
        examName: paper.examName ?? '',
        totalQuestions: questions.length,
        durationSeconds,
      })
      if (liveState?.resumed) {
        setAnswers(liveState.answers ?? {})
        setMarked(liveState.marked ?? {})
        startIdx = liveState.currentIndex ?? 0
        setCurrentIndex(startIdx)
        if (liveState.attemptId) setAttemptId(liveState.attemptId)
        if (liveState.remainingSeconds <= 0) {
          startTimeRef.current = Date.now()
          setExamStarted(true)
          setSubmitted(true)
          setStartingExam(false)
          return
        }
        setRemainingSeconds(liveState.remainingSeconds)
      } else {
        setRemainingSeconds(durationSeconds)
      }
      if (liveState?.attemptId) setAttemptId(liveState.attemptId)
    } catch {
      setRemainingSeconds(durationSeconds)
    }
    const distinctSubjects = new Set(questions.map((q) => q.subject))
    if (distinctSubjects.size > 1) {
      setActiveSubject(questions[startIdx]?.subject ?? null)
    }
    startTimeRef.current = Date.now()
    document.documentElement.requestFullscreen?.()
      .then(() => setIsFullscreen(true))
      .catch(() => {})
    setExamStarted(true)
    setStartingExam(false)
  }, [paper, questions, startingExam])

  // ── Redis sync helpers ─────────────────────────────────────────
  const syncFnRef = useRef<() => void>(() => {})
  const buildSyncFn = useCallback(() => {
    return () => {
      if (!paper || !attemptId || submittedRef.current) return
      const payload = { paperSlug: paper.slug, answers, marked, currentIndex, remainingSeconds }
      syncLiveAttempt(payload).catch(async (err) => {
        if (err instanceof APIError && err.status === 401) {
          try {
            await refreshAuthSession()
            await syncLiveAttempt(payload)
          } catch {
            // refresh failed — state will be retried on next sync cycle
          }
        }
      })
    }
  }, [paper, attemptId, answers, marked, currentIndex, remainingSeconds])

  useEffect(() => { syncFnRef.current = buildSyncFn() }, [buildSyncFn])

  const prevIndexRef = useRef(currentIndex)
  useEffect(() => {
    if (loading || submitted || !examStarted) return
    if (currentIndex !== prevIndexRef.current) {
      prevIndexRef.current = currentIndex
      syncFnRef.current()
    }
  }, [currentIndex, loading, submitted, examStarted])

  useEffect(() => {
    if (loading || submitted || !examStarted) return
    const id = window.setInterval(() => syncFnRef.current(), 10_000)
    return () => window.clearInterval(id)
  }, [loading, submitted, examStarted])

  // ── Exit handler: sync first, then navigate ────────────────────
  const handleExit = useCallback(async () => {
    if (!paper) return
    setExiting(true)
    if (attemptId && !submittedRef.current) {
      const payload = { paperSlug: paper.slug, answers, marked, currentIndex, remainingSeconds }
      try {
        await syncLiveAttempt(payload)
      } catch (err) {
        if (err instanceof APIError && err.status === 401) {
          try { await refreshAuthSession(); await syncLiveAttempt(payload) } catch { /* silent */ }
        }
      }
    }
    navigate(paperPath(paper.slug))
  }, [paper, attemptId, answers, marked, currentIndex, remainingSeconds, navigate])

  // ── Timer countdown ────────────────────────────────────────────
  useEffect(() => {
    if (submitted || loading || !examStarted || remainingSeconds <= 0) return
    const id = window.setInterval(() => {
      setRemainingSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
          setSubmitted(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [loading, examStarted, remainingSeconds, submitted])

  // ── Sync on unmount + browser close (catches "Exit Paper" navigation) ──
  useEffect(() => {
    return () => { syncFnRef.current() }
  }, [])

  useEffect(() => {
    const onUnload = () => syncFnRef.current()
    window.addEventListener('beforeunload', onUnload)
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [])

  // ── Track visited ──────────────────────────────────────────────
  useEffect(() => {
    const q = questions[currentIndex]
    if (!q) return
    setVisited((prev) => { const next = new Set(prev); next.add(q.slug); return next })
  }, [currentIndex, questions])

  // ── Save result on submit ──────────────────────────────────────
  useEffect(() => {
    if (!submitted || !paper || resultSavedRef.current) return
    resultSavedRef.current = true

    const { correct, wrong, skipped, subjectScores } = computeResults(questions, answers)
    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000)
    const negMark = paper.negativeMarking ?? 0
    const savedMaxMarks = paper.maxMarks > 0 ? paper.maxMarks : questions.length
    const marksPerQSave = savedMaxMarks / questions.length
    const rawScore = parseFloat((correct * marksPerQSave - wrong * negMark).toFixed(2))

    if (attemptId) {
      const submitPayload = { attemptId, paperSlug: paper.slug, correct, wrong, skipped, timeTakenSeconds: timeTaken, answers }
      submitLiveAttempt(submitPayload).catch(async (err) => {
        if (err instanceof APIError && err.status === 401) {
          try { await refreshAuthSession(); await submitLiveAttempt(submitPayload) } catch { /* silent */ }
        }
      })
    }

    savePaperResult({
      paperSlug: paper.slug,
      examSlug: paper.examSlug,
      examName: paper.examName,
      paperTitle: paper.title,
      totalQuestions: questions.length,
      attemptedAt: new Date().toISOString(),
      answered: Object.keys(answers).length,
      correct,
      wrong,
      skipped,
      rawScore,
      maxMarks: paper.maxMarks > 0 ? paper.maxMarks : undefined,
      negativeMarking: negMark > 0 ? negMark : undefined,
      timeTakenSeconds: timeTaken,
      subjects: subjectScores,
      answers,
    })

    // Straight to the exam's analytics rather than the interim score card:
    // it carries the same score plus the trend across attempts, the cutoff
    // comparison and the per-question solutions. savePaperResult writes to
    // localStorage synchronously, so the result is already there to read.
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => undefined)
    }
    // replace, so Back does not land the candidate inside a finished exam.
    navigate(`/analytics/${paper.examSlug}`, { replace: true })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted])

  // ── Subject grouping memos ─────────────────────────────────────
  const subjectList = useMemo(() => {
    const map = new Map<string, { count: number; answered: number }>()
    for (const q of questions) {
      if (q.answerKey === 'Deleted') continue
      if (!map.has(q.subject)) map.set(q.subject, { count: 0, answered: 0 })
      const e = map.get(q.subject)!
      e.count++
      if (answers[q.slug]) e.answered++
    }
    return [...map.entries()].map(([name, { count, answered }]) => ({ name, count, answered }))
  }, [questions, answers])

  const filteredQuestions = useMemo(
    () => activeSubject ? questions.filter((q) => q.subject === activeSubject) : questions,
    [questions, activeSubject],
  )

  const switchSubject = useCallback((subject: string) => {
    setActiveSubject(subject)
    const first = questions.findIndex((q) => q.subject === subject)
    if (first !== -1) setCurrentIndex(first)
  }, [questions])

  const currentQuestion = questions[currentIndex]
  const localizedCurrent = currentQuestion ? getLocalizedQuestion(currentQuestion, language) : null
  const hasHindiQuestions = questions.some(hasHindi)
  const answeredCount = Object.keys(answers).length

  const filteredIndex = useMemo(
    () => currentQuestion ? filteredQuestions.findIndex((q) => q.slug === currentQuestion.slug) : -1,
    [filteredQuestions, currentQuestion],
  )

  if (!slug || !isAuthenticated) return <Navigate to="/" replace />
  if (loading) return <HaloLoader label="Loading paper" />
  if (error || !paper) return <Navigate to={paperPath(slug)} replace />

  // ── Pre-exam screen (intro for new, compact resume card for ongoing) ──
  // Quoted on the instruction screens as well as in the exam hall, so both are
  // derived before the intro screen returns early.
  //
  // Marks per question come from the paper's own total: a 200-mark,
  // 100-question paper is +2 each, not the assumed +1.
  const marksPerQuestion = questions.length > 0 && paper.maxMarks > 0
    ? Math.round((paper.maxMarks / questions.length) * 100) / 100
    : 1
  // Option count is read from the paper rather than hard-coded — banking papers
  // run to five options where most state exams use four.
  const optionCount = questions[0]?.options.length ?? 4

  if (!examStarted) {
    const durationMins = paper.durationMinutes > 0 ? paper.durationMinutes : 120
    const hasNeg = (paper.negativeMarking ?? 0) > 0

    if (resumeDetected && existingAttempt) {
      const elapsed = Math.floor((Date.now() - resumeFetchedAtMs.current) / 1000)
      const liveRemaining = Math.max(0, existingAttempt.remainingSeconds - elapsed)
      return (
        <div className="pa-intro-page">
          <div className="pa-intro-card pa-resume-card">
            <span className="pa-intro-exam-badge">{paper.examName}</span>
            <h1 className="pa-intro-title">{paper.title}</h1>

            <div className="pa-resume-progress">
              <div className="pa-resume-stat">
                <strong>{existingAttempt.answeredCount}</strong>
                <span>of {questions.length} answered</span>
              </div>
              <div className="pa-resume-divider" />
              <div className="pa-resume-stat">
                <strong>{formatTime(liveRemaining)}</strong>
                <span>remaining</span>
              </div>
            </div>

            <div className="pa-intro-fs-warn">
              <Maximize2 size={16} />
              <div>
                <strong>Continue in fullscreen</strong>
                <p>The exam will resume from where you left off.</p>
              </div>
            </div>

            <button
              type="button"
              className="pa-intro-start-btn"
              onClick={handleResumeExam}
              disabled={startingExam}
            >
              {startingExam ? 'Resuming…' : <><Play size={16} /> Continue Exam →</>}
            </button>

            <Link className="pa-intro-back-link" to={paperPath(paper.slug)}>
              ← Exit to paper
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="pa-gi">
        <header className="pa-gi-top">
          <Logo to={paperPath(paper.slug)} className="pa-gi-logo" />
          <span className="pa-gi-testname">{paper.title}</span>
        </header>

        <div className="pa-gi-body">
          <main className="pa-gi-main">
            {introStep === 'instructions' ? (
              <>
                <h1>General Instructions:</h1>
                <ol className="pa-gi-list">
                  <li>
                    The countdown timer at the top right of the screen will display the
                    time remaining for you to complete the examination. When the timer
                    reaches zero, the examination will end by itself. You need not
                    terminate the examination or submit your paper.
                  </li>
                  <li>
                    The Question Palette displayed on the right side of screen will show
                    the status of each question using one of the following symbols:
                    <ul className="pa-gi-symbols">
                      <li><i className="pa-legend-dot not-visited" />You have not visited the question yet.</li>
                      <li><i className="pa-legend-dot visited" />You have not answered the question.</li>
                      <li><i className="pa-legend-dot answered" />You have answered the question.</li>
                      <li><i className="pa-legend-dot marked" />You have NOT answered the question, but have marked the question for review.</li>
                      <li><i className="pa-legend-dot answered-marked" />You have answered the question, but marked it for review.</li>
                    </ul>
                  </li>
                </ol>

                <p className="pa-gi-para">
                  The <strong>Mark For Review</strong> status for a question simply
                  indicates that you would like to look at that question again. If a
                  question is answered, but marked for review, then the answer will be
                  considered for evaluation unless the status is modified by the candidate.
                </p>

                <h2>Navigating to a Question :</h2>
                <ol className="pa-gi-list" start={3}>
                  <li>
                    To answer a question, do the following:
                    <ol className="pa-gi-sublist">
                      <li>
                        Click on the question number in the Question Palette at the right of
                        your screen to go to that numbered question directly. Note that using
                        this option does NOT save your answer to the current question.
                      </li>
                      <li>
                        Click on <strong>Save &amp; Next</strong> to save your answer for the
                        current question and then go to the next question.
                      </li>
                      <li>
                        Click on <strong>Mark for Review &amp; Next</strong> to save your answer
                        for the current question, also mark it for review, and then go to the
                        next question.
                      </li>
                    </ol>
                  </li>
                </ol>

                <p className="pa-gi-para">
                  Note that your answer for the current question will not be saved, if you
                  navigate to another question directly by clicking on a question number
                  without saving the answer to the previous question.
                </p>

                <h2>Answering a Question :</h2>
                <ol className="pa-gi-list" start={4}>
                  <li>
                    Procedure for answering a multiple choice (MCQ) type question:
                    <ol className="pa-gi-sublist">
                      <li>
                        Choose one answer from the {optionCount} options given below the
                        question, click on the bubble placed before the chosen option.
                      </li>
                      <li>
                        To deselect your chosen answer, click on the bubble of the chosen
                        option again or click on the <strong>Clear Response</strong> button.
                      </li>
                      <li>To change your chosen answer, click on the bubble of another option.</li>
                      <li>To save your answer, you MUST click on <strong>Save &amp; Next</strong>.</li>
                    </ol>
                  </li>
                  <li>
                    To mark a question for review, click on <strong>Mark for Review &amp; Next</strong>.
                    If an answer is selected for a question that is <strong>Marked for Review</strong>,
                    that answer will be considered in the evaluation unless the status is
                    modified by the candidate.
                  </li>
                  <li>
                    To change your answer to a question that has already been answered, first
                    select that question for answering and then follow the procedure for
                    answering that type of question.
                  </li>
                  {subjectList.length > 1 && (
                    <li>
                      This paper has <strong>{subjectList.length} sections</strong>. Use the
                      section bar above the question to move between them. The Question
                      Palette always shows the section you are currently in.
                    </li>
                  )}
                </ol>
              </>
            ) : (
              <>
                <h1 className="pa-gi-testtitle">{paper.title}</h1>
                <div className="pa-gi-meta">
                  <span>Duration: <strong>{durationMins} Mins</strong></span>
                  {paper.maxMarks > 0 && (
                    <span>Maximum Marks: <strong>{paper.maxMarks}</strong></span>
                  )}
                </div>

                <h2 className="pa-gi-readhead">Read the following instructions carefully.</h2>
                <ol className="pa-gi-list">
                  <li>
                    The test {subjectList.length > 1
                      ? <>contains <strong>{subjectList.length} sections</strong> having </>
                      : <>contains </>}
                    <strong>{questions.length} questions</strong>.
                  </li>
                  <li>
                    Each question has <strong>{optionCount} options</strong> out of which
                    only one is correct.
                  </li>
                  <li>You have to finish the test in <strong>{durationMins} minutes</strong>.</li>
                  <li>
                    You will be awarded <strong>{marksPerQuestion} mark{marksPerQuestion !== 1 ? 's' : ''}</strong>{' '}
                    for each correct answer
                    {hasNeg
                      ? <> and <strong>{paper.negativeMarking}</strong> will be deducted for each wrong answer.</>
                      : <>.</>}
                  </li>
                  <li>There is no negative marking for the questions that you have not attempted.</li>
                  <li>
                    Your progress is saved as you go. If the browser closes, you can resume
                    this attempt from your Dashboard before the timer runs out.
                  </li>
                </ol>
              </>
            )}
          </main>

          <aside className="pa-gi-side">
            <div className="pa-gi-avatar"><UserRound size={52} strokeWidth={1.6} /></div>
            <strong>{user?.name ?? 'Candidate'}</strong>
          </aside>
        </div>

        {introStep === 'declaration' && (
          <div className="pa-gi-band">
            {hasHindiQuestions && (
              <>
                <div className="pa-gi-lang">
                  <label htmlFor="pa-gi-lang-select">Choose your default language:</label>
                  <select
                    id="pa-gi-lang-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as QuestionLanguage)}
                  >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                  </select>
                </div>
                <p className="pa-gi-red">
                  Please note all questions will appear in your default language. This
                  language can be changed for a particular question later on.
                </p>
              </>
            )}

            <h3 className="pa-gi-declhead">Declaration:</h3>
            <label className="pa-gi-declare">
              <input
                type="checkbox"
                checked={declared}
                onChange={(e) => setDeclared(e.target.checked)}
              />
              <span>I have understood and agree to all the instructions.</span>
            </label>
          </div>
        )}

        <footer className="pa-gi-foot">
          {introStep === 'instructions' ? (
            <>
              <Link className="pa-gi-back" to={paperPath(paper.slug)}>&larr; Go to Tests</Link>
              <span />
              <button type="button" className="pa-gi-next" onClick={() => setIntroStep('declaration')}>
                Next
              </button>
            </>
          ) : (
            <>
              <button type="button" className="pa-gi-prev" onClick={() => setIntroStep('instructions')}>
                Previous
              </button>
              <button
                type="button"
                className="pa-gi-begin"
                onClick={handleStartExam}
                disabled={!declared || startingExam || questions.length === 0}
              >
                {startingExam ? 'Starting…' : 'I am ready to begin'}
              </button>
              <span className="pa-gi-foot-spacer" />
            </>
          )}
        </footer>
      </div>
    )
  }

  // ── Action helpers (only needed once exam started) ─────────────
  const chooseOption = (key: string) => {
    if (!currentQuestion || submitted) return
    setAnswers((cur) => ({ ...cur, [currentQuestion.slug]: key }))
  }

  const toggleMarked = () => {
    if (!currentQuestion || submitted) return
    setMarked((cur) => ({ ...cur, [currentQuestion.slug]: !cur[currentQuestion.slug] }))
  }

  const goTo = (index: number) => setCurrentIndex(Math.max(0, Math.min(index, questions.length - 1)))

  const goPrev = () => {
    if (filteredIndex <= 0) return
    const prevQ = filteredQuestions[filteredIndex - 1]
    const gi = questions.findIndex((q) => q.slug === prevQ.slug)
    if (gi !== -1) setCurrentIndex(gi)
  }

  const goNext = () => {
    if (filteredIndex >= filteredQuestions.length - 1) return
    const nextQ = filteredQuestions[filteredIndex + 1]
    const gi = questions.findIndex((q) => q.slug === nextQ.slug)
    if (gi !== -1) setCurrentIndex(gi)
  }

  const doSubmit = () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    setSubmitted(true)
    setConfirmSubmit(false)
  }

  const enterFullscreen = () => {
    document.documentElement.requestFullscreen?.()
      .then(() => setIsFullscreen(true))
      .catch(() => {})
  }

  const timerWarning = remainingSeconds < 300
  const showFsWarning = !isFullscreen && !submitted && !isReview
  const hasSubjectTabs = subjectList.length > 1

  // ── Submission summary ─────────────────────────────────────────
  // The effect above navigates to analytics the moment a result is saved; this
  // stands in for the one frame between commit and route change.
  if (submitted) {
    return <HaloLoader label="Submitting — opening your analysis" />
  }

  // The interim score card and its review screen used to live here. Submitting
  // now goes straight to the exam's analytics, which carries the same score
  // plus the trend, cutoff comparison and per-question solutions — so both
  // screens were unreachable and have been removed rather than left as dead
  // code behind an `if (false)`.

  // ── Exam hall ──────────────────────────────────────────────────
  const notAttempted = questions.length - answeredCount

  // TCS iON's legend reports five mutually exclusive states that always sum to
  // the paper length. "Not Answered" means seen-and-skipped, which is why
  // visiting is tracked separately from answering.
  const markedOnlyCount = questions.filter((q) => marked[q.slug] && !answers[q.slug]).length
  const answeredMarkedCount = questions.filter((q) => marked[q.slug] && answers[q.slug]).length
  // "Answered" excludes the marked ones — they are reported on their own row.
  // answeredCount stays inclusive because scoring counts every response.
  const answeredOnlyCount = answeredCount - answeredMarkedCount
  const notAnsweredCount = questions.filter(
    (q) => !answers[q.slug] && !marked[q.slug]
      && (visited.has(q.slug) || q.slug === currentQuestion?.slug)).length
  const notVisitedCount = Math.max(
    0, questions.length - answeredOnlyCount - answeredMarkedCount
       - markedOnlyCount - notAnsweredCount)


  const clearResponse = () => {
    if (!currentQuestion) return
    setAnswers((cur) => {
      const next = { ...cur }
      delete next[currentQuestion.slug]
      return next
    })
  }

  const markForReviewAndNext = () => {
    toggleMarked()
    goNext()
  }

  // Review legend counts, over the section currently shown in the palette so
  // the numbers match the boxes beneath them.
  // Plain computation, not a useMemo: this sits after the early returns, where a
  // hook would break the rules-of-hooks ordering, and it is one pass over at
  // most a few hundred questions.
  const reviewTally = (() => {
    const scope = activeSubject ? questions.filter((q) => q.subject === activeSubject) : questions
    let correct = 0, wrong = 0, skipped = 0
    for (const q of scope) {
      const chosen = answers[q.slug]
      if (!chosen) skipped++
      else if (chosen === q.answerKey) correct++
      else wrong++
    }
    return { correct, wrong, skipped }
  })()

  // Questions visible in palette (filtered by active subject)
  const paletteEntries = activeSubject
    ? questions.map((q, i) => ({ q, i })).filter(({ q }) => q.subject === activeSubject)
    : questions.map((q, i) => ({ q, i }))

  return (
    <div
      className={`pa-attempt-page${hasSubjectTabs ? ' has-subjects' : ''}`}
      // Exam-integrity measures, scoped to a live attempt only: the solved
      // question pages elsewhere on the site stay fully copyable.
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Report a problem with this question — posts to the same endpoint the
          public question pages use, so admins see one queue. */}
      {reportOpen && currentQuestion && (
        <div className="pa-modal-overlay" role="dialog" aria-modal="true" aria-label="Report question">
          <div className="pa-modal">
            <h2>Report Question {filteredIndex + 1}</h2>
            {reportSent ? (
              <>
                <p>Thanks — this question has been flagged for review.</p>
                <div className="pa-modal-actions">
                  <button type="button" className="pa-nav-btn primary" onClick={() => { setReportOpen(false); setReportSent(false) }}>
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <label className="pa-modal-field">
                  <span>What is wrong?</span>
                  <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                    <option>Wrong answer key</option>
                    <option>Question text is unclear or incomplete</option>
                    <option>Options are wrong or duplicated</option>
                    <option>Explanation is incorrect</option>
                    <option>Image or diagram missing</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="pa-modal-field">
                  <span>Details (optional)</span>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Tell us what you noticed"
                  />
                </label>
                <div className="pa-modal-actions">
                  <button type="button" className="pa-nav-btn" onClick={() => setReportOpen(false)}>Cancel</button>
                  <button
                    type="button"
                    className="pa-nav-btn primary"
                    onClick={() => {
                      void submitReport({
                        questionSlug: currentQuestion.slug,
                        questionNo: String(filteredIndex + 1),
                        paperSlug: paper.slug,
                        reportType,
                        details: reportDetails,
                      }).catch(() => undefined)
                      setReportSent(true)
                      setReportDetails('')
                    }}
                  >
                    Submit Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Instructions, re-openable mid-exam without losing the attempt. */}
      {showInstructions && (
        <div className="pa-modal-overlay" role="dialog" aria-modal="true" aria-label="Instructions">
          <div className="pa-modal wide">
            <h2>General Instructions</h2>
            <ol className="pa-gi-list">
              <li>The countdown timer at the top shows the time remaining. When it reaches zero the test ends by itself.</li>
              <li>
                The Question Palette shows the status of every question:
                <ul className="pa-gi-symbols">
                  <li><i className="pa-legend-dot not-visited" />Not visited yet.</li>
                  <li><i className="pa-legend-dot visited" />Seen but not answered.</li>
                  <li><i className="pa-legend-dot answered" />Answered.</li>
                  <li><i className="pa-legend-dot marked" />Marked for review, not answered.</li>
                  <li><i className="pa-legend-dot answered-marked" />Answered and marked for review.</li>
                </ul>
              </li>
              <li>An answered question that is marked for review is still evaluated.</li>
              <li><strong>Save &amp; Next</strong> stores your answer and moves on; <strong>Clear Response</strong> removes it.</li>
              <li>Selecting a question from the palette does not save the answer to the question you are leaving.</li>
            </ol>
            <div className="pa-modal-actions">
              <button type="button" className="pa-nav-btn primary" onClick={() => setShowInstructions(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen warning */}
      {showFsWarning && (
        <button type="button" className="pa-fullscreen-warn" onClick={enterFullscreen}>
          <Maximize2 size={14} />
          You left fullscreen — click to return
        </button>
      )}

      {/* Confirm submit dialog */}
      {confirmSubmit && (
        <div className="pa-confirm-overlay">
          <div className="pa-confirm-dialog">
            <h2>Submit paper?</h2>
            <p>You have answered <strong>{answeredCount}</strong> of <strong>{questions.length}</strong> questions.</p>
            {notAttempted > 0 && <p className="pa-confirm-warn"><AlertTriangle size={14} /> {notAttempted} question{notAttempted !== 1 ? 's' : ''} not attempted.</p>}
            <div className="pa-confirm-actions">
              <button type="button" className="pa-confirm-submit" onClick={doSubmit}>Yes, submit</button>
              <button type="button" className="pa-confirm-cancel" onClick={() => setConfirmSubmit(false)}>Continue attempt</button>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <header className="pa-topbar">
        <div className="pa-topbar-left">
          <Logo to={paperPath(paper.slug)} className="pa-hall-logo" />
          <span className="pa-hall-testname">{paper.title}</span>
        </div>
        <div className="pa-topbar-center">
          {isReview ? (
            <span className="pa-review-flag">Reviewing your attempt</span>
          ) : (
          /* Boxed digits, as the delivery software renders the clock. */
          <div className={`pa-clock${timerWarning ? ' warning' : ''}`}>
            <span className="pa-clock-label">Time Left</span>
            {formatTime(remainingSeconds).split(':').map((part, i, all) => (
              <span key={i} className="pa-clock-part">
                <b>{part}</b>
                {i < all.length - 1 && <i>:</i>}
              </span>
            ))}
          </div>
          )}
        </div>
        <div className="pa-topbar-right">
          {isReview ? (
            <Link className="pa-ghost-btn" to={`/analytics/${paper.examSlug}`}>
              Back to analysis
            </Link>
          ) : (
            <button type="button" className="pa-ghost-btn" onClick={enterFullscreen}>
              {isFullscreen ? 'Exit Full Screen' : 'Switch Full Screen'}
            </button>
          )}
        </div>
      </header>

      {/* Subject tabs bar */}
      {hasSubjectTabs && (
        <nav className="pa-subject-tabs" aria-label="Question subjects">
          <span className="pa-sections-label">Sections</span>
          {subjectList.map((s) => (
            <button
              key={s.name}
              type="button"
              className={`pa-subject-tab${activeSubject === s.name ? ' active' : ''}`}
              onClick={() => switchSubject(s.name)}
            >
              {s.name}
              <span className="pa-subject-tab-count">{s.answered}/{s.count}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Body: question + palette */}
      <div className="pa-attempt-body">

        {/* Question panel */}
        <section className="pa-question-panel">
          <div className="pa-question-scroll">
            <div className="pa-q-header">
              <span className="pa-q-num">Question No. {filteredIndex + 1}</span>
              <div className="pa-q-tools">
                <span className="pa-q-tool">
                  <small>Marks</small>
                  <span className="pa-q-marks">
                    <em>+{marksPerQuestion}</em>
                    {paper.negativeMarking > 0 && <b>&minus;{paper.negativeMarking}</b>}
                  </span>
                </span>
                {/* Time-on-question is a live-exam measure; in review there is
                    no clock running, so showing one would be noise. */}
                {!isReview && (
                  <span className="pa-q-tool">
                    <small>Time</small>
                    <strong className="pa-q-time">{formatClock(questionSeconds)}</strong>
                  </span>
                )}
                {hasHindiQuestions && (
                  <span className="pa-q-tool inline">
                    <small>View in</small>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as QuestionLanguage)}
                      aria-label="Question language"
                    >
                      <option value="en">English</option>
                      <option value="hi">हिन्दी</option>
                    </select>
                  </span>
                )}
                <button type="button" className="pa-report-btn" onClick={() => setReportOpen(true)}>
                  <AlertTriangle size={13} /> Report
                </button>
              </div>
            </div>

            {currentQuestion ? (
              <>
                {localizedCurrent?.passage && (
                  <div className="pyq-passage">
                    <strong>{language === 'hi' ? 'अनुच्छेद' : 'Passage'}</strong>
                    <QuestionRenderer text={localizedCurrent.passage} />
                  </div>
                )}
                <div className="pa-q-text">
                  <QuestionRenderer text={localizedCurrent?.question ?? currentQuestion.question} />
                </div>

                {currentQuestion.answerKey === 'Deleted' ? (
                  <div className="pa-deleted-notice">
                    <span className="pa-deleted-badge">Deleted Question</span>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                ) : (
                  <>
                    <ol className="pa-options">
                      {(localizedCurrent?.options ?? currentQuestion.options).map((opt, oi) => {
                        const chosen = answers[currentQuestion.slug] === opt.key
                        return (
                          <li key={opt.key}>
                            <label
                              className={[
                                'pa-option',
                                chosen ? 'selected' : '',
                                // In review the key is revealed: the right option is
                                // always marked, and a wrong pick is marked too.
                                isReview && opt.key === currentQuestion.answerKey ? 'is-correct' : '',
                                isReview && chosen && opt.key !== currentQuestion.answerKey ? 'is-wrong' : '',
                              ].filter(Boolean).join(' ')}
                            >
                              <input
                                type="radio"
                                name={`q-${currentQuestion.slug}`}
                                checked={chosen}
                                disabled={isReview}
                                onChange={() => chooseOption(opt.key)}
                              />
                              <span className="pa-opt-key">{oi + 1}.</span>
                              <span className="pa-opt-text"><MathText text={opt.text} /></span>
                              {isReview && opt.key === currentQuestion.answerKey && (
                                <span className="pa-opt-tag correct">Correct</span>
                              )}
                              {isReview && chosen && opt.key !== currentQuestion.answerKey && (
                                <span className="pa-opt-tag wrong">Your answer</span>
                              )}
                            </label>
                          </li>
                        )
                      })}
                    </ol>

                    {isReview && currentQuestion.explanation && (
                      <div className="pa-review-explanation">
                        <h3>Solution</h3>
                        <ExplanationText text={currentQuestion.explanation} />
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="pa-empty-q">
                <AlertTriangle size={20} />
                <p>No questions available for this paper.</p>
              </div>
            )}
          </div>

          <footer className="pa-q-actions">
            {isReview ? (
              <>
                <div className="pa-actions-left">
                  <button
                    type="button"
                    className="pa-nav-btn pa-palette-toggle"
                    onClick={() => setPaletteOpen(true)}
                  >
                    Palette ({filteredIndex + 1}/{filteredQuestions.length})
                  </button>
                </div>
                <div className="pa-actions-right">
                  <button type="button" className="pa-nav-btn" onClick={goPrev} disabled={filteredIndex <= 0}>
                    <ChevronLeft size={15} /> Previous
                  </button>
                  <button
                    type="button"
                    className="pa-nav-btn primary"
                    onClick={goNext}
                    disabled={filteredIndex >= filteredQuestions.length - 1}
                  >
                    Next <ChevronRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <>
            <div className="pa-actions-left">
              <button
                type="button"
                className="pa-nav-btn pa-palette-toggle"
                onClick={() => setPaletteOpen(true)}
              >
                Palette ({filteredIndex + 1}/{filteredQuestions.length})
              </button>
              <button type="button" className="pa-nav-btn" onClick={markForReviewAndNext}>
                Mark for Review &amp; Next
              </button>
              <button
                type="button"
                className="pa-nav-btn"
                onClick={clearResponse}
                disabled={!currentQuestion || !answers[currentQuestion.slug]}
              >
                Clear Response
              </button>
            </div>
            <div className="pa-actions-right">
              <button type="button" className="pa-nav-btn" onClick={goPrev} disabled={filteredIndex <= 0}>
                <ChevronLeft size={15} /> Previous
              </button>
              <button type="button" className="pa-nav-btn primary" onClick={goNext}>
                Save &amp; Next <ChevronRight size={15} />
              </button>
            </div>
              </>
            )}
          </footer>
        </section>

        {/* Question palette */}
        {/* Backdrop only exists while the drawer is open on small screens. */}
        {paletteOpen && (
          <button
            type="button"
            className="pa-palette-backdrop"
            aria-label="Close question palette"
            onClick={() => setPaletteOpen(false)}
          />
        )}

        <aside className={`pa-palette-panel${paletteOpen ? ' is-open' : ''}`}>
          <button
            type="button"
            className="pa-palette-close"
            onClick={() => setPaletteOpen(false)}
            aria-label="Close question palette"
          >
            &times;
          </button>
          <div className="pa-side-user">
            <span className="pa-side-avatar"><UserRound size={18} /></span>
            <strong>{user?.name ?? 'Candidate'}</strong>
          </div>

          {isReview ? (
            <div className="pa-legend">
              <span><i className="pa-count correct">{reviewTally.correct}</i>Correct</span>
              <span><i className="pa-count wrong">{reviewTally.wrong}</i>Wrong</span>
              <span><i className="pa-count not-visited">{reviewTally.skipped}</i>Skipped</span>
            </div>
          ) : (
            <div className="pa-legend">
              <span><i className="pa-count answered">{answeredOnlyCount}</i>Answered</span>
              <span><i className="pa-count marked">{markedOnlyCount}</i>Marked</span>
              <span><i className="pa-count not-visited">{notVisitedCount}</i>Not Visited</span>
              <span><i className="pa-count answered-marked">{answeredMarkedCount}</i>Marked and answered</span>
              <span><i className="pa-count not-answered">{notAnsweredCount}</i>Not Answered</span>
            </div>
          )}

          <div className="pa-palette-section">
            SECTION : <strong>{activeSubject ?? paper.examName}</strong>
          </div>

          <div className="pa-palette-grid">
            {paletteEntries.map(({ q, i }, n) => {
              // In review the attempt statuses (answered / marked / not visited)
              // no longer tell you anything useful — what matters is whether you
              // got it right. Green for correct, red for wrong, grey for skipped.
              const status = isReview
                ? (!answers[q.slug]
                    ? 'not-visited'
                    : answers[q.slug] === q.answerKey ? 'correct' : 'wrong')
                : getStatus(q.slug, currentQuestion?.slug ?? '', answers, marked, visited)
              return (
                <button
                  key={q.slug}
                  type="button"
                  className={`pa-palette-btn ${status}${i === currentIndex ? ' current' : ''}`}
                  onClick={() => { goTo(i); setPaletteOpen(false) }}
                >
                  {/* Numbered within the section, as TCS does — the palette
                      of a 4-question section reads 1-4, not 1, 5, 9, 19. */}
                  {n + 1}
                </button>
              )
            })}
          </div>

          {!isReview && (
            <div className="pa-side-tools">
              <button type="button" className="pa-ghost-btn wide" onClick={() => setShowInstructions(true)}>
                Instructions
              </button>
            </div>
          )}

          {/* Nothing to submit in review — the attempt is already finished. */}
          {!isReview && (
            <button type="button" className="pa-submit-palette-btn" onClick={() => setConfirmSubmit(true)}>
              Submit Test
            </button>
          )}

          <button type="button" className="pa-exit-link" onClick={handleExit} disabled={exiting}>
            {exiting ? 'Saving…' : isReview ? 'Close Solutions' : 'Exit Paper'}
          </button>
        </aside>
      </div>
    </div>
  )
}
