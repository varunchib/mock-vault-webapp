import type { Exam } from './api'

export const categoryOrder = [
  'SSC Exams',
  'State Exams (J&K — JKSSB & JKPSC)',
  'State PSC & State Exams',
  'UPSC & Civil Services',
  'Railways (RRB)',
  'Banking & Insurance',
  'Central',
  'States',
  'Railways',
  'Banking',
  'Teaching',
  'Engineering',
]

export const categoryIcons: Record<string, string> = {
  'ssc exams': '📋',
  'state exams (j&k — jkssb & jkpsc)': '🏔️',
  'state psc & state exams': '📍',
  'upsc & civil services': '🏛️',
  'railways (rrb)': '🚂',
  'banking & insurance': '🏦',
  central: '🏛️',
  banking: '🏦',
  states: '📍',
  railways: '🚂',
  teaching: '📚',
  engineering: '⚙️',
}

export const categoryFullLabels: Record<string, string> = {
  'ssc exams': 'Staff Selection Commission (SSC)',
  'state exams (j&k — jkssb & jkpsc)': 'Jammu & Kashmir State Exams (JKSSB, JKPSC & University)',
  'state psc & state exams': 'State Public Service Commissions & State Boards',
  'upsc & civil services': 'Union Public Service Commission (UPSC)',
  'railways (rrb)': 'Railway Recruitment Board (RRB)',
  'banking & insurance': 'Banking & Financial Services (IBPS)',
  central: 'Central Government',
  banking: 'Banking & Finance',
  states: 'State Government',
  railways: 'Railways',
  teaching: 'Teaching',
  engineering: 'Engineering',
}

export function getExamSectionCategory(exam: Pick<Exam, 'slug' | 'name' | 'shortName' | 'category'> & { boardSlug?: string }): string {
  const s = `${exam.slug} ${exam.boardSlug ?? ''} ${exam.shortName} ${exam.name} ${exam.category}`.toLowerCase()
  if (/\bssc\b/.test(s)) return 'SSC Exams'
  if (/\bupsc\b/.test(s)) return 'UPSC & Civil Services'
  if (/\b(?:jkssb|jkpsc|jkpsi|jkcce|kashmir-university|j&k|jammu)\b/.test(s)) {
    return 'State Exams (J&K — JKSSB & JKPSC)'
  }
  if (/\b(?:rrb|ntpc|railway|rail)\b/.test(s)) return 'Railways (RRB)'
  if (/\b(?:ibps|bank|rbi|sbi|nabard)\b/.test(s)) return 'Banking & Insurance'
  return 'State PSC & State Exams'
}

export function normalizeExamCategory(category: string): string {
  const n = category.trim().toLowerCase()
  if (n.includes('bank') || n.includes('ibps') || n.includes('rbi') || n.includes('nabard')) return 'Banking'
  if (n.includes('rail') || n.includes('rrb') || n.includes('ntpc')) return 'Railways'
  if (n.includes('teach') || n.includes('ctet') || n.includes(' tet') || n.startsWith('tet')) return 'Teaching'
  if (n.includes('engineer') || n.includes('jee') || n.includes('gate')) return 'Engineering'
  if (
    n.includes('central') || n.includes('ssc') || n.includes('upsc') ||
    n.includes('defence') || n.includes('defense') || n.includes('nda') || n.includes('cds')
  ) return 'Central'
  const stateMarkers = [
    'state', 'psc', 'pcs', 'j&k', 'jammu', 'kashmir', 'jkssb', 'jkpsc',
    'kerala', 'karnataka', 'maharashtra', 'mpsc', 'tnpsc', 'appsc', 'tspsc',
    'rajasthan', 'haryana', 'punjab', 'gujarat', 'himachal', 'hp psc',
    'uttarakhand', 'bihar', 'bpsc', 'jharkhand', 'odisha', 'opsc',
    'bengal', 'wbpsc', 'assam', 'manipur', 'meghalaya', 'nagaland',
    'tripura', 'sikkim', 'goa', 'chhattisgarh', 'cgpsc', 'uppsc', 'mppsc',
    'andhra', 'telangana', 'tamilnadu', 'tamil',
  ]
  if (stateMarkers.some((m) => n.includes(m))) return 'States'
  return category
}

export type ExamCategoryGroup = { label: string; subtitle: string; icon: string; exams: Exam[] }

/**
 * Filters out redundant 1-child parent wrapper boards (e.g. `ssc` when `ssc-cgl`
 * is present, `bpsc` when `bpsc-cce` is present) while keeping multi-exam hubs
 * like `jkssb` alongside all individual post exams, then groups them into
 * ExamSide-style category sections.
 */
export function groupExamsBySection(allExams: Exam[]): ExamCategoryGroup[] {
  const childrenCount = new Map<string, number>()
  for (const e of allExams) {
    if (e.boardSlug) {
      childrenCount.set(e.boardSlug, (childrenCount.get(e.boardSlug) ?? 0) + 1)
    }
  }

  const displayExams = allExams.filter((e) => {
    const kids = childrenCount.get(e.slug) ?? 0
    // If a board only wraps 1 child exam, show the specific child exam directly
    if (kids === 1) return false
    return true
  })

  const grouped = new Map<string, Exam[]>()
  for (const exam of displayExams) {
    const label = getExamSectionCategory(exam)
    const list = grouped.get(label) ?? []
    list.push(exam)
    grouped.set(label, list)
  }

  return [...grouped.entries()]
    .map(([label, items]) => ({
      label,
      subtitle: categoryFullLabels[label.toLowerCase()] ?? label,
      icon: categoryIcons[label.toLowerCase()] ?? '📋',
      exams: items.sort((a, b) => {
        // Put the main board hub (like JKSSB) first, then sort by paper count desc, then name
        const aIsHub = !a.boardSlug ? 1 : 0
        const bIsHub = !b.boardSlug ? 1 : 0
        if (aIsHub !== bIsHub) return bIsHub - aIsHub
        if ((b.papers ?? 0) !== (a.papers ?? 0)) return (b.papers ?? 0) - (a.papers ?? 0)
        return a.shortName.localeCompare(b.shortName)
      }),
    }))
    .sort((a, b) => {
      const aRank = categoryOrder.indexOf(a.label)
      const bRank = categoryOrder.indexOf(b.label)
      if (aRank === -1 && bRank === -1) return a.label.localeCompare(b.label)
      if (aRank === -1) return 1
      if (bRank === -1) return -1
      return aRank - bRank
    })
}

export function groupExamsByCategory(exams: Exam[]): ExamCategoryGroup[] {
  return groupExamsBySection(exams)
}
