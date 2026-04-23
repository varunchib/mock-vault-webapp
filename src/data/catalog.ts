export type ExamCatalogItem = {
  slug: string
  name: string
  shortName: string
  category: string
  icon: string
  totalQuestions: string
  papers: string
  mocks: string
  description: string
  popularYears: string[]
  subjects: string[]
}

export type QuestionCatalogItem = {
  slug: string
  examSlug: string
  examName: string
  year: string
  paper: string
  subject: string
  questionNo: string
  question: string
  options: Array<{ key: string; text: string }>
  answerKey: string
  answer: string
  explanation: string
  tags: string[]
}

export const examCatalog: ExamCatalogItem[] = [
  {
    slug: 'upsc-cse',
    name: 'UPSC Civil Services Examination',
    shortName: 'UPSC CSE',
    category: 'Central',
    icon: '🏛️',
    totalQuestions: '18,000+',
    papers: '120+',
    mocks: '85',
    description: 'Solved UPSC Prelims and Mains previous year questions with explanations, answer keys, topic filters, and free practice mocks.',
    popularYears: ['2024', '2023', '2022', '2021'],
    subjects: ['Polity', 'History', 'Geography', 'Economy', 'Environment', 'CSAT'],
  },
  {
    slug: 'ssc-cgl',
    name: 'SSC CGL',
    shortName: 'SSC CGL',
    category: 'Central',
    icon: '📋',
    totalQuestions: '24,000+',
    papers: '180+',
    mocks: '120',
    description: 'SSC CGL tier-wise PYQs, all shifts, solved answers, reasoning, quant, English, and GK practice sets.',
    popularYears: ['2024', '2023', '2022', '2021'],
    subjects: ['Quant', 'Reasoning', 'English', 'General Awareness'],
  },
  {
    slug: 'jkssb',
    name: 'JKSSB Exams',
    shortName: 'JKSSB',
    category: 'J&K',
    icon: '📜',
    totalQuestions: '8,000+',
    papers: '70+',
    mocks: '45',
    description: 'JKSSB previous year papers for Finance, Accounts, VLW, Patwari, and other posts with explanations and answer keys.',
    popularYears: ['2024', '2023', '2022', '2021'],
    subjects: ['Finance', 'Accounts', 'JK GK', 'Reasoning', 'Maths'],
  },
  {
    slug: 'neet-ug',
    name: 'NEET UG',
    shortName: 'NEET UG',
    category: 'Medical',
    icon: '🧬',
    totalQuestions: '12,000+',
    papers: '90+',
    mocks: '100',
    description: 'NEET UG biology, physics, and chemistry previous year questions with chapter-wise explanations and free practice.',
    popularYears: ['2024', '2023', '2022', '2021'],
    subjects: ['Biology', 'Physics', 'Chemistry'],
  },
]

export const questionCatalog: QuestionCatalogItem[] = [
  {
    slug: 'upsc-prelims-2023-river-origin-question',
    examSlug: 'upsc-cse',
    examName: 'UPSC CSE',
    year: '2023',
    paper: 'Prelims GS Paper 1',
    subject: 'Geography',
    questionNo: '47',
    question: "Which of the following rivers does not originate within India's territory?",
    options: [
      { key: 'A', text: 'Beas' },
      { key: 'B', text: 'Chenab' },
      { key: 'C', text: 'Sutlej' },
      { key: 'D', text: 'Ravi' },
    ],
    answerKey: 'B',
    answer: 'Chenab',
    explanation: 'Chenab is commonly tested with Himalayan river origin traps. In PYQ practice, always revise the source, route, and first major region each river flows through. Beas and Ravi originate in Himachal Pradesh, while Sutlej is associated with Tibet near Mansarovar before entering India.',
    tags: ['River systems', 'Indian geography', 'UPSC Prelims'],
  },
  {
    slug: 'ssc-cgl-2023-percentage-profit-loss-question',
    examSlug: 'ssc-cgl',
    examName: 'SSC CGL',
    year: '2023',
    paper: 'Tier 1 Quantitative Aptitude',
    subject: 'Quant',
    questionNo: '18',
    question: 'A shopkeeper marks an article 25% above cost price and allows a discount of 10%. What is the profit percentage?',
    options: [
      { key: 'A', text: '10%' },
      { key: 'B', text: '12.5%' },
      { key: 'C', text: '15%' },
      { key: 'D', text: '20%' },
    ],
    answerKey: 'B',
    answer: '12.5%',
    explanation: 'Assume cost price is 100. Marked price becomes 125. After 10% discount, selling price is 112.5. Profit is 12.5 on cost price 100, so profit percentage is 12.5%.',
    tags: ['Percentage', 'Profit and loss', 'SSC CGL'],
  },
  {
    slug: 'jkssb-finance-2024-budget-question',
    examSlug: 'jkssb',
    examName: 'JKSSB',
    year: '2024',
    paper: 'Finance Accounts Paper',
    subject: 'Finance',
    questionNo: '32',
    question: 'Which document presents the estimated receipts and expenditure of the government for a financial year?',
    options: [
      { key: 'A', text: 'Appropriation Bill' },
      { key: 'B', text: 'Finance Bill' },
      { key: 'C', text: 'Annual Financial Statement' },
      { key: 'D', text: 'Vote on Account' },
    ],
    answerKey: 'C',
    answer: 'Annual Financial Statement',
    explanation: 'The Annual Financial Statement is the constitutional name for the budget document that shows estimated receipts and expenditure of the government for a financial year.',
    tags: ['Budget', 'Public finance', 'JKSSB'],
  },
]

export function findExamBySlug(slug: string | undefined) {
  return examCatalog.find((exam) => exam.slug === slug)
}

export function findQuestionBySlug(slug: string | undefined) {
  return questionCatalog.find((question) => question.slug === slug)
}

export function questionsForExam(examSlug: string) {
  return questionCatalog.filter((question) => question.examSlug === examSlug)
}

export type MockCatalogItem = {
  slug: string
  examSlug: string
  examName: string
  title: string
  description: string
  questions: number
  durationMinutes: number
  difficulty: 'Beginner' | 'Moderate' | 'Advanced'
  isFree: boolean
  subjects: string[]
}

export type PaperCatalogItem = {
  slug: string
  examSlug: string
  examName: string
  title: string
  year: string
  shift: string
  description: string
  questions: number
  subjects: string[]
}

export const mockCatalog: MockCatalogItem[] = [
  {
    slug: 'upsc-prelims-gs-mini-mock-2026',
    examSlug: 'upsc-cse',
    examName: 'UPSC CSE',
    title: 'UPSC Prelims GS Mini Mock 2026',
    description: 'A focused UPSC Prelims mini mock covering polity, geography, history, economy, and environment with instant review.',
    questions: 25,
    durationMinutes: 30,
    difficulty: 'Moderate',
    isFree: true,
    subjects: ['Polity', 'Geography', 'History', 'Environment'],
  },
  {
    slug: 'ssc-cgl-tier-1-reasoning-sprint',
    examSlug: 'ssc-cgl',
    examName: 'SSC CGL',
    title: 'SSC CGL Tier 1 Reasoning Sprint',
    description: 'Timed reasoning practice for SSC CGL Tier 1 with previous-year style questions and score analysis.',
    questions: 30,
    durationMinutes: 20,
    difficulty: 'Beginner',
    isFree: true,
    subjects: ['Reasoning', 'Quant', 'General Awareness'],
  },
  {
    slug: 'jkssb-finance-accounts-full-mock',
    examSlug: 'jkssb',
    examName: 'JKSSB',
    title: 'JKSSB Finance Accounts Full Mock',
    description: 'Full-length JKSSB finance and accounts mock with public finance, accounting, reasoning, and JK GK coverage.',
    questions: 100,
    durationMinutes: 120,
    difficulty: 'Advanced',
    isFree: false,
    subjects: ['Finance', 'Accounts', 'Reasoning', 'JK GK'],
  },
]

export const paperCatalog: PaperCatalogItem[] = [
  {
    slug: 'upsc-prelims-2023-gs-paper-1',
    examSlug: 'upsc-cse',
    examName: 'UPSC CSE',
    title: 'UPSC Prelims 2023 GS Paper 1 Solved',
    year: '2023',
    shift: 'General Studies Paper 1',
    description: 'UPSC Prelims 2023 GS Paper 1 with solved answers, topic tags, explanations, and free question-wise practice.',
    questions: 100,
    subjects: ['Polity', 'Geography', 'Economy', 'Environment', 'History'],
  },
  {
    slug: 'ssc-cgl-2023-tier-1-all-shifts',
    examSlug: 'ssc-cgl',
    examName: 'SSC CGL',
    title: 'SSC CGL 2023 Tier 1 All Shifts Solved',
    year: '2023',
    shift: 'Tier 1 All Shifts',
    description: 'SSC CGL 2023 Tier 1 solved previous year papers with shift-wise questions and explanations.',
    questions: 900,
    subjects: ['Quant', 'Reasoning', 'English', 'General Awareness'],
  },
  {
    slug: 'jkssb-finance-accounts-2024-paper',
    examSlug: 'jkssb',
    examName: 'JKSSB',
    title: 'JKSSB Finance Accounts 2024 Solved Paper',
    year: '2024',
    shift: 'Finance Accounts Paper',
    description: 'JKSSB Finance Accounts 2024 paper with solved answers, explanations, and exam-wise practice links.',
    questions: 150,
    subjects: ['Finance', 'Accounts', 'Budget', 'Reasoning'],
  },
]

export function findMockBySlug(slug: string | undefined) {
  return mockCatalog.find((mock) => mock.slug === slug)
}

export function findPaperBySlug(slug: string | undefined) {
  return paperCatalog.find((paper) => paper.slug === slug)
}

export function mocksForExam(examSlug: string) {
  return mockCatalog.filter((mock) => mock.examSlug === examSlug)
}

export function papersForExam(examSlug: string) {
  return paperCatalog.filter((paper) => paper.examSlug === examSlug)
}
