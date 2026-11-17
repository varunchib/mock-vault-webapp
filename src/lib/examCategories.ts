import type { Exam } from './api'

export const categoryOrder = [
  'Central',
  'Banking',
  'States',
  'Railways',
  'Teaching',
  'Engineering',
]

export const categoryIcons: Record<string, string> = {
  central: '🏛️',
  banking: '🏦',
  states: '📍',
  railways: '🚂',
  teaching: '📚',
  engineering: '⚙️',
}

export const categoryFullLabels: Record<string, string> = {
  central: 'Central Government',
  banking: 'Banking & Finance',
  states: 'State Government',
  railways: 'Railways',
  teaching: 'Teaching',
  engineering: 'Engineering',
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

export type ExamCategoryGroup = { label: string; exams: Exam[] }

export function groupExamsByCategory(exams: Exam[]): ExamCategoryGroup[] {
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
      exams: items.sort((a, b) => a.shortName.localeCompare(b.shortName)),
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
