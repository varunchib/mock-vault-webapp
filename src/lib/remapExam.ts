import type { CombinedResult } from './mockActivity'
import type { Exam, Paper } from './api'

/**
 * Attempts saved before the board → sub-exam split carry the old board slug
 * ("jkpsc") and full board name. Re-attribute each paper attempt to the
 * paper's CURRENT exam, and display the exam's shortName ("JKCCE") — the
 * catalogs are the source of truth, stored attempts are just a snapshot.
 */
export function remapToPaperExam(
  results: CombinedResult[],
  papers: Paper[],
  exams: Exam[],
): CombinedResult[] {
  if (papers.length === 0 && exams.length === 0) return results
  const paperBySlug = new Map(papers.map(p => [p.slug, p]))
  const examBySlug = new Map(exams.map(e => [e.slug, e]))
  return results.map(r => {
    const paper = r.type === 'paper' ? paperBySlug.get(r.slug) : undefined
    const examSlug = paper?.examSlug ?? r.examSlug
    const exam = examBySlug.get(examSlug)
    const examName = exam?.shortName || exam?.name || paper?.examName || r.examName
    if (examSlug === r.examSlug && examName === r.examName) return r
    return { ...r, examSlug, examName }
  })
}
