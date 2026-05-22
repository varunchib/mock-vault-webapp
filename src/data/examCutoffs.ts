export type CutoffEntry = { category: string; marks: number }

export type ExamCutoff = {
  examName: string
  stage: string
  totalMarks: number
  year: string
  cutoffs: CutoffEntry[]
  avgScore: number  // typical average, same scale as totalMarks
  stdDev: number
}

export const examCutoffs: Record<string, ExamCutoff> = {
  'ibps-po': {
    examName: 'IBPS PO', stage: 'Prelims', totalMarks: 100, year: '2024',
    cutoffs: [
      { category: 'General', marks: 61.75 },
      { category: 'OBC',     marks: 58.75 },
      { category: 'SC',      marks: 51.75 },
      { category: 'ST',      marks: 42.75 },
    ],
    avgScore: 48, stdDev: 12,
  },
  'sbi-po': {
    examName: 'SBI PO', stage: 'Prelims', totalMarks: 100, year: '2024-25',
    cutoffs: [
      { category: 'General', marks: 65.0 },
      { category: 'OBC',     marks: 62.0 },
      { category: 'SC',      marks: 55.0 },
      { category: 'ST',      marks: 48.0 },
    ],
    avgScore: 50, stdDev: 12,
  },
  'ibps-clerk': {
    examName: 'IBPS Clerk', stage: 'Prelims', totalMarks: 100, year: '2023-24',
    cutoffs: [
      { category: 'General', marks: 74.5 },
      { category: 'OBC',     marks: 71.5 },
      { category: 'SC',      marks: 64.0 },
      { category: 'ST',      marks: 54.0 },
    ],
    avgScore: 55, stdDev: 13,
  },
  'sbi-clerk': {
    examName: 'SBI Clerk', stage: 'Prelims', totalMarks: 100, year: '2023-24',
    cutoffs: [
      { category: 'General', marks: 72.0 },
      { category: 'OBC',     marks: 69.25 },
      { category: 'SC',      marks: 59.0 },
      { category: 'ST',      marks: 53.0 },
    ],
    avgScore: 55, stdDev: 12,
  },
  'ssc-cgl': {
    examName: 'SSC CGL', stage: 'Tier I', totalMarks: 200, year: '2023-24',
    cutoffs: [
      { category: 'General', marks: 148.0 },
      { category: 'OBC',     marks: 144.5 },
      { category: 'SC',      marks: 127.0 },
      { category: 'ST',      marks: 116.0 },
    ],
    avgScore: 118, stdDev: 24,
  },
  'ssc-chsl': {
    examName: 'SSC CHSL', stage: 'Tier I', totalMarks: 200, year: '2023-24',
    cutoffs: [
      { category: 'General', marks: 143.5 },
      { category: 'OBC',     marks: 139.25 },
      { category: 'SC',      marks: 120.75 },
      { category: 'ST',      marks: 110.5 },
    ],
    avgScore: 112, stdDev: 22,
  },
  'upsc-cse': {
    examName: 'UPSC CSE', stage: 'Prelims (GS Paper I)', totalMarks: 200, year: '2024',
    cutoffs: [
      { category: 'General', marks: 105.34 },
      { category: 'OBC',     marks: 105.34 },
      { category: 'SC',      marks: 93.51 },
      { category: 'ST',      marks: 89.41 },
    ],
    avgScore: 88, stdDev: 20,
  },
  'rrb-ntpc': {
    examName: 'RRB NTPC', stage: 'CBT 1', totalMarks: 100, year: '2024',
    cutoffs: [
      { category: 'General', marks: 69.84 },
      { category: 'OBC',     marks: 66.62 },
      { category: 'SC',      marks: 60.0 },
      { category: 'ST',      marks: 55.0 },
    ],
    avgScore: 55, stdDev: 12,
  },
  'neet-ug': {
    examName: 'NEET UG', stage: 'Cut-off (General)', totalMarks: 720, year: '2024',
    cutoffs: [
      { category: 'General', marks: 164 },
      { category: 'OBC/SC/ST', marks: 129 },
    ],
    avgScore: 300, stdDev: 100,
  },
}

// ── Percentile estimation (Abramowitz & Stegun approximation) ─────────────

function erfc(x: number): number {
  const t = 1 / (1 + 0.5 * Math.abs(x))
  const p = -0.82215223 + t * 0.17087294
  const q = 1.48851587 + t * p
  const r = -1.13520398 + t * q
  const s = 0.27886807 + t * r
  const u = -0.18628806 + t * s
  const v = 0.09678418 + t * u
  const w = 0.37409196 + t * v
  const y = 1.00002368 + t * w
  const tau = t * Math.exp(-x * x - 1.26551223 + t * y)
  return x >= 0 ? tau : 2 - tau
}

export function estimatePercentile(score: number, totalQuestions: number, examSlug: string): number {
  const cut = examCutoffs[examSlug]
  if (!cut) return -1

  // Normalise score to the exam's native scale
  const scaled = (score / totalQuestions) * cut.totalMarks
  const z = (scaled - cut.avgScore) / cut.stdDev
  const p = Math.round((1 - 0.5 * erfc(z / Math.SQRT2)) * 100)
  return Math.max(1, Math.min(99, p))
}

export function getCutoffComparison(score: number, totalQuestions: number, examSlug: string) {
  const cut = examCutoffs[examSlug]
  if (!cut) return null
  const scaled = (score / totalQuestions) * cut.totalMarks
  const generalCutoff = cut.cutoffs.find((c) => c.category === 'General')?.marks ?? cut.cutoffs[0].marks
  return {
    examName: cut.examName,
    stage: cut.stage,
    year: cut.year,
    userScore: Math.round(scaled * 10) / 10,
    cutoff: generalCutoff,
    totalMarks: cut.totalMarks,
    cleared: scaled >= generalCutoff,
    allCutoffs: cut.cutoffs,
  }
}
