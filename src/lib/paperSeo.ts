export type PaperSeoOverride = {
  apiSlug: string
  canonicalSlug: string
  title: string
  h1: string
  description: string
  review: string
}

export const PAPER_SEO_OVERRIDES: Record<string, PaperSeoOverride> = {
  // UPSC papers: the official DB titles ("Civil Services (Preliminary) Examination …")
  // are long and omit the key search term "UPSC", so the rendered <title> truncated
  // without it. canonicalSlug === apiSlug here, so URLs are unchanged (no redirects).
  'upsc-cse-prelims-2026-gs1': {
    apiSlug: 'upsc-cse-prelims-2026-gs1',
    canonicalSlug: 'upsc-cse-prelims-2026-gs1',
    title: 'UPSC Prelims 2026 GS Paper 1 (Set A) - Solved, Answer Key',
    h1: 'UPSC CSE Prelims 2026 General Studies Paper I (Set A)',
    description:
      'Fully solved UPSC CSE Prelims 2026 General Studies Paper I (Set A) held on 24 May 2026 - all 100 questions with the official answer key and detailed explanations, free.',
    review:
      'The UPSC Civil Services Prelims 2026 General Studies Paper I (Set A) was held on 24 May 2026 with 100 questions for 200 marks in 2 hours, with a penalty of one-third for each wrong answer. Use this fully solved paper to check the official answer key, review the actual difficulty level across History, Polity, Geography, Economy and Environment, and practise every question with a detailed explanation.',
  },
  'upsc-cse-prelims-2025-gs1': {
    apiSlug: 'upsc-cse-prelims-2025-gs1',
    canonicalSlug: 'upsc-cse-prelims-2025-gs1',
    title: 'UPSC Prelims 2025 GS Paper 1 - Solved, Answer Key',
    h1: 'UPSC CSE Prelims 2025 General Studies Paper I',
    description:
      'Fully solved UPSC CSE Prelims 2025 General Studies Paper I - all 100 questions with the official answer key, subject-wise breakdown and detailed explanations, free.',
    review:
      'The UPSC Civil Services Prelims 2025 General Studies Paper I carried 100 questions for 200 marks in 2 hours, with negative marking of one-third per wrong answer. This solved paper lets you verify the official answer key and revise every question with a full explanation.',
  },
  'upsc-cse-prelims-2025-gs2': {
    apiSlug: 'upsc-cse-prelims-2025-gs2',
    canonicalSlug: 'upsc-cse-prelims-2025-gs2',
    title: 'UPSC Prelims 2025 CSAT Paper 2 - Solved, Answer Key',
    h1: 'UPSC CSE Prelims 2025 CSAT (General Studies Paper II)',
    description:
      'Fully solved UPSC CSE Prelims 2025 CSAT (General Studies Paper II) - all 80 questions with the answer key and detailed explanations. Qualifying paper: 33% required.',
    review:
      'The UPSC Prelims 2025 CSAT (General Studies Paper II) is a qualifying paper requiring a minimum of 33%, with 80 questions for 200 marks covering Reading Comprehension, Logical Reasoning and Quantitative Aptitude. Practise the full solved paper with answers and explanations.',
  },
  'jkssb-junior-assistant-pyq': {
    apiSlug: 'jkssb-junior-assistant-pyq',
    canonicalSlug: 'jkssb-junior-assistant-question-paper-2026',
    title: 'JKSSB Junior Assistant Question Paper 2026 - Solved, Answer Key',
    h1: 'JKSSB Junior Assistant Question Paper 2026',
    description:
      'Fully solved JKSSB Junior Assistant question paper held on 19 April 2026 with 80 questions, answer key, section-wise subjects and detailed explanations.',
    review:
      'The JKSSB Junior Assistant exam held on 19 April 2026 tested English, Computer Awareness, Mathematics, Reasoning, General Knowledge and J&K GK. Use this solved paper to review the real difficulty level, check the answer key and practise every question from the exam.',
  },
  'jkssb-lab-attendant-2026-may-10': {
    apiSlug: 'jkssb-lab-attendant-2026-may-10',
    canonicalSlug: 'jkssb-laboratory-attendant-question-paper-2026',
    title: 'JKSSB Laboratory Attendant Question Paper 2026 - Solved, Answer Key',
    h1: 'JKSSB Laboratory Attendant Question Paper 2026',
    description:
      'Fully solved JKSSB Laboratory Attendant question paper 2026, held on 10 May 2026 — every question with the official answer key, subject-wise breakdown and detailed explanations, free.',
    review:
      'The JKSSB Laboratory Attendant paper held on 10 May 2026 covered Quantitative Aptitude, Reasoning, General Knowledge, Current Affairs, General Science, Computer Knowledge and English. This solved paper helps candidates revise the actual question pattern and answer key.',
  },
  'jkssb-wildlife-guard-2026-may-10': {
    apiSlug: 'jkssb-wildlife-guard-2026-may-10',
    canonicalSlug: 'jkssb-wildlife-guard-question-paper-2026',
    title: 'JKSSB Wildlife Guard Question Paper 2026 - All 120 Solved, Answer Key',
    h1: 'JKSSB Wildlife Guard Question Paper 2026 (8 March) — Fully Solved',
    description:
      'Fully solved JKSSB Wildlife Guard question paper held on 8 March 2026 - all 120 questions with the answer key, subject-wise breakdown and detailed explanations, free.',
    review:
      'The JKSSB Wildlife Guard written exam was held on 8 March 2026 in OMR mode with 120 questions for 120 marks in 2 hours, with negative marking of 0.25 per wrong answer. The paper covered Mathematics, Reasoning, English, General Knowledge, J&K Studies and Wildlife & Ecology. Use this fully solved previous year paper to check the answer key for every question, study the exam analysis and difficulty level, and attempt the complete paper online in a timed, exam-like interface.',
  },
  'jkssb-patwari-2024-sep1-set-a': {
    apiSlug: 'jkssb-patwari-2024-sep1-set-a',
    canonicalSlug: 'jkssb-patwari-question-paper-2024',
    title: 'JKSSB Patwari Question Paper 2024 - Solved, Answer Key',
    h1: 'JKSSB Patwari Question Paper 2024',
    description:
      'Fully solved JKSSB Patwari 2024 question paper with answer key, subject-wise questions and detailed explanations.',
    review:
      'This JKSSB Patwari paper helps candidates practise the actual exam pattern, revise Revenue Laws and compare their preparation against a real previous year question paper.',
  },
  'jkssb-veterinary-pharmacist-2025': {
    apiSlug: 'jkssb-veterinary-pharmacist-2025',
    canonicalSlug: 'jkssb-veterinary-pharmacist-question-paper-2025',
    title: 'JKSSB Veterinary Pharmacist Question Paper 2025 - Solved, Answer Key',
    h1: 'JKSSB Veterinary Pharmacist Question Paper 2025',
    description:
      'Fully solved JKSSB Veterinary Pharmacist 2025 question paper with answer key, subjects and detailed explanations.',
    review:
      'This JKSSB Veterinary Pharmacist solved paper covers the real question style, technical subject mix and answer key for candidates preparing for JKSSB veterinary posts.',
  },
  'jkssb-finance-accounts-2024-paper': {
    apiSlug: 'jkssb-finance-accounts-2024-paper',
    canonicalSlug: 'jkssb-finance-accounts-assistant-question-paper-2024',
    title: 'JKSSB Finance Accounts Assistant 2024 - Solved, Answer Key',
    h1: 'JKSSB Finance Accounts Assistant Question Paper 2024',
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
