export type PaperSeoOverride = {
  apiSlug: string
  canonicalSlug: string
  title: string
  h1: string
  description: string
  review: string
}

export const PAPER_SEO_OVERRIDES: Record<string, PaperSeoOverride> = {
  'jkssb-junior-assistant-pyq': {
    apiSlug: 'jkssb-junior-assistant-pyq',
    canonicalSlug: 'jkssb-junior-assistant-question-paper-2026',
    title: 'Fully Solved JKSSB Junior Assistant Question Paper 2026 - Answer Key',
    h1: 'Fully Solved JKSSB Junior Assistant Question Paper 2026',
    description:
      'Fully solved JKSSB Junior Assistant question paper held on 19 April 2026 with 80 questions, answer key, section-wise subjects and detailed explanations.',
    review:
      'The JKSSB Junior Assistant exam held on 19 April 2026 tested English, Computer Awareness, Mathematics, Reasoning, General Knowledge and J&K GK. Use this solved paper to review the real difficulty level, check the answer key and practise every question from the exam.',
  },
  'jkssb-lab-attendant-2026-may-10': {
    apiSlug: 'jkssb-lab-attendant-2026-may-10',
    canonicalSlug: 'jkssb-laboratory-attendant-question-paper-2026',
    title: 'Fully Solved JKSSB Laboratory Attendant Question Paper 2026 - Answer Key',
    h1: 'Fully Solved JKSSB Laboratory Attendant Question Paper 2026',
    description:
      'Fully solved JKSSB Laboratory Attendant question paper held on 10 May 2026 with answer key, subjects and detailed explanations.',
    review:
      'The JKSSB Laboratory Attendant paper held on 10 May 2026 covered Quantitative Aptitude, Reasoning, General Knowledge, Current Affairs, General Science, Computer Knowledge and English. This solved paper helps candidates revise the actual question pattern and answer key.',
  },
  'jkssb-wildlife-guard-2026-may-10': {
    apiSlug: 'jkssb-wildlife-guard-2026-may-10',
    canonicalSlug: 'jkssb-wildlife-guard-question-paper-2026',
    title: 'Fully Solved JKSSB Wildlife Guard Question Paper 2026 - Answer Key',
    h1: 'Fully Solved JKSSB Wildlife Guard Question Paper 2026',
    description:
      'Fully solved JKSSB Wildlife Guard question paper held on 10 May 2026 with answer key, subjects and detailed explanations.',
    review:
      'The JKSSB Wildlife Guard paper held on 10 May 2026 is useful for understanding the latest JKSSB question style, subject mix and difficulty level. Practise the full solved paper with answers and explanations.',
  },
  'jkssb-patwari-2024-sep1-set-a': {
    apiSlug: 'jkssb-patwari-2024-sep1-set-a',
    canonicalSlug: 'jkssb-patwari-question-paper-2024',
    title: 'Fully Solved JKSSB Patwari Question Paper 2024 - Answer Key',
    h1: 'Fully Solved JKSSB Patwari Question Paper 2024',
    description:
      'Fully solved JKSSB Patwari 2024 question paper with answer key, subject-wise questions and detailed explanations.',
    review:
      'This JKSSB Patwari paper helps candidates practise the actual exam pattern, revise Revenue Laws and compare their preparation against a real previous year question paper.',
  },
  'jkssb-veterinary-pharmacist-2025': {
    apiSlug: 'jkssb-veterinary-pharmacist-2025',
    canonicalSlug: 'jkssb-veterinary-pharmacist-question-paper-2025',
    title: 'Fully Solved JKSSB Veterinary Pharmacist Question Paper 2025 - Answer Key',
    h1: 'Fully Solved JKSSB Veterinary Pharmacist Question Paper 2025',
    description:
      'Fully solved JKSSB Veterinary Pharmacist 2025 question paper with answer key, subjects and detailed explanations.',
    review:
      'This JKSSB Veterinary Pharmacist solved paper covers the real question style, technical subject mix and answer key for candidates preparing for JKSSB veterinary posts.',
  },
  'jkssb-finance-accounts-2024-paper': {
    apiSlug: 'jkssb-finance-accounts-2024-paper',
    canonicalSlug: 'jkssb-finance-accounts-assistant-question-paper-2024',
    title: 'Fully Solved JKSSB Finance Accounts Assistant Question Paper 2024',
    h1: 'Fully Solved JKSSB Finance Accounts Assistant Question Paper 2024',
    description:
      'Fully solved JKSSB Finance Accounts Assistant 2024 question paper with answer key, subjects and detailed explanations.',
    review:
      'This JKSSB Finance Accounts Assistant paper is useful for revising the real FAA exam pattern, important accounting topics, general awareness and reasoning questions.',
  },
}

const API_SLUG_BY_CANONICAL = Object.fromEntries(
  Object.values(PAPER_SEO_OVERRIDES).map((entry) => [entry.canonicalSlug, entry.apiSlug]),
)

export function apiPaperSlug(slug: string | undefined): string {
  if (!slug) return ''
  return API_SLUG_BY_CANONICAL[slug] ?? slug
}

export function canonicalPaperSlug(slug: string | undefined): string {
  if (!slug) return ''
  return PAPER_SEO_OVERRIDES[slug]?.canonicalSlug ?? slug
}

export function paperPath(slug: string | undefined): string {
  return `/pyq/${canonicalPaperSlug(slug)}`
}

export function paperSeoOverride(slug: string | undefined): PaperSeoOverride | undefined {
  if (!slug) return undefined
  return PAPER_SEO_OVERRIDES[apiPaperSlug(slug)]
}
