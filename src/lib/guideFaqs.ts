import type { PostGuideData } from '../data/postGuides'

export type GuideFaq = {
  q: string
  a: string
}

export function buildGuideFaqs(guide: PostGuideData): GuideFaq[] {
  const patternSummary = guide.examPattern
    .filter(r => !r.isTotal)
    .map(r => `${r.section} (${r.questions} questions, ${r.marks} marks)`)
    .join(', ')

  const negativeRow = guide.examPattern.find(r => r.note && r.note !== '—')
  const negativeMarkingText = guide.examPatternNote
    ? guide.examPatternNote
    : negativeRow?.note
    ? `Yes, negative marking applies: ${negativeRow.note}. Candidates should review the official guidelines to avoid penalty on incorrect attempts.`
    : `Please refer to the latest notification published by ${guide.conductingBody} for the specific marking scheme.`

  const eligibilityText = `Age Limit: ${guide.eligibility.age}. Educational Qualification: ${guide.eligibility.education}. Domicile Requirement: ${guide.eligibility.domicile}.${
    guide.eligibility.attempts ? ` Allowed Attempts: ${guide.eligibility.attempts}.` : ''
  }`

  const selectionText = guide.selectionProcess && guide.selectionProcess.length > 0
    ? `The official selection procedure consists of: ${guide.selectionProcess.join(' → ')}.`
    : `The selection process is governed by the official guidelines issued by ${guide.conductingBody}.`

  const paperNames = guide.papers && guide.papers.length > 0
    ? ` (${guide.papers.map(p => p.title).join(', ')})`
    : ''

  return [
    {
      q: `What is the exam pattern for ${guide.shortName}?`,
      a: `The ${guide.shortName} examination conducted by ${guide.conductingBody} consists of ${patternSummary}. The test is administered via ${guide.examMode}.`,
    },
    {
      q: `Is there negative marking in the ${guide.shortName} exam?`,
      a: negativeMarkingText,
    },
    {
      q: `What are the eligibility criteria and age limit for ${guide.shortName}?`,
      a: eligibilityText,
    },
    {
      q: `What is the selection process for ${guide.shortName}?`,
      a: selectionText,
    },
    {
      q: `Where can I practice solved previous year question papers for ${guide.shortName}?`,
      a: `You can practice authentic, fully solved previous year question papers for ${guide.shortName}${paperNames} 100% free on Ministry of Papers with verified official answer keys and step-by-step explanations.`,
    },
  ]
}
