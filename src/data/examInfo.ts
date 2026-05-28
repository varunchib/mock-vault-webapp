export type LatestUpdate = {
  date: string
  text: string
  link?: string
}

export type RecruitmentRow = {
  post: string
  vacancies: string
  payScale: string
  status: string
}

export type PatternSection = {
  subject: string
  questions: string | number
  marks: string | number
  negativeMarking?: string
  isTotal?: boolean
}

export type EligibilityData = {
  age?: string
  education?: string
  nationality?: string
  other?: { label: string; value: string }[]
}

export type SalaryRow = {
  post: string
  payLevel: string
  payScale: string
}

export type ImportantLink = {
  label: string
  url: string
  internal?: boolean
}

export type ExamInfoData = {
  about: string
  officialWebsite: string
  conductingBody: string
  examLevel: string
  examMode: string
  latestUpdates?: LatestUpdate[]
  recruitmentOverview?: RecruitmentRow[]
  examPattern?: PatternSection[]
  examPatternNote?: string
  eligibility?: EligibilityData
  selectionProcess?: string[]
  salary?: SalaryRow[]
  importantLinks?: ImportantLink[]
}

export const examInfo: Record<string, ExamInfoData> = {
  jkssb: {
    about:
      'JKSSB (Jammu & Kashmir Services Selection Board) conducts written examinations and selects candidates for Group C posts across departments of the Union Territory of Jammu & Kashmir. All exams follow an OMR-based written test pattern with objective-type MCQs.',
    officialWebsite: 'https://jkssb.nic.in',
    conductingBody: 'J&K Services Selection Board (JKSSB)',
    examLevel: 'UT Level (Jammu & Kashmir)',
    examMode: 'OMR-based Written Test',

    latestUpdates: [
      { date: 'Mar 2025', text: 'JKSSB releases final answer key for Finance Account Assistant (FAA) 2024 examination.', link: 'https://jkssb.nic.in/AnswerKey.aspx' },
      { date: 'Dec 2024', text: 'JKSSB Patwari 2024 result declared. Selected candidates called for document verification.', link: 'https://jkssb.nic.in/Results.aspx' },
      { date: 'Oct 2024', text: 'JKSSB releases notification for 1,200 Patwari posts across J&K UT.', link: 'https://jkssb.nic.in/Notifications.aspx' },
      { date: 'Aug 2024', text: 'Finance Account Assistant 2024 exam conducted across 10 districts of J&K.' },
      { date: 'May 2024', text: 'JKSSB issues revised exam calendar for 2024–25 recruitment cycle.' },
    ],

    recruitmentOverview: [
      { post: 'Junior Assistant', vacancies: '1,048', payScale: '₹25,500–₹81,100 (Level 4)', status: '2023 — Result Declared' },
      { post: 'Patwari', vacancies: '1,200', payScale: '₹25,500–₹81,100 (Level 4)', status: '2024 — Result Declared' },
      { post: 'Finance Account Asst.', vacancies: '637', payScale: '₹25,500–₹81,100 (Level 4)', status: '2024 — Result Declared' },
      { post: 'Wildlife Guard', vacancies: '250', payScale: '₹19,900–₹63,200 (Level 2)', status: '2022 — Completed' },
    ],

    examPattern: [
      { subject: 'General Knowledge & Current Affairs', questions: '30–40', marks: '30–40', negativeMarking: '−0.25' },
      { subject: 'Quantitative Aptitude & Reasoning', questions: '20–30', marks: '20–30', negativeMarking: '−0.25' },
      { subject: 'English Language', questions: '20–30', marks: '20–30', negativeMarking: '−0.25' },
      { subject: 'Post-Specific Topics', questions: '20–40', marks: '20–40', negativeMarking: '−0.25' },
      { subject: 'Total', questions: '120', marks: '120', isTotal: true },
    ],
    examPatternNote: 'Duration: 2 hours. Negative marking: −0.25 per wrong answer.',

    eligibility: {
      age: '18–40 years. Relaxation: SC/ST +5 years, OBC +3 years, PwD +10 years.',
      education: 'Graduation from a recognized university. Post-specific qualifications may apply.',
      nationality: 'Valid Permanent Resident Certificate (PRC) / Domicile Certificate of J&K UT is mandatory.',
    },

    selectionProcess: [
      'Written Examination — 120 objective MCQ questions, 2 hours',
      'Document Verification — Educational certificates, PRC/Domicile, category certificates',
      'Final Merit List — Based on written exam marks (no interview for Group C posts)',
    ],

    salary: [
      { post: 'Group C — Junior Asst., Patwari, FAA', payLevel: 'Level 4', payScale: '₹25,500 – ₹81,100' },
      { post: 'Group D — Wildlife Guard', payLevel: 'Level 2', payScale: '₹19,900 – ₹63,200' },
    ],

    importantLinks: [
      { label: 'Official JKSSB Website', url: 'https://jkssb.nic.in' },
      { label: 'Apply Online (SSBJK Portal)', url: 'https://ssbjk.nic.in' },
      { label: 'Latest Notifications', url: 'https://jkssb.nic.in/Notifications.aspx' },
      { label: 'Results', url: 'https://jkssb.nic.in/Results.aspx' },
      { label: 'Answer Keys', url: 'https://jkssb.nic.in/AnswerKey.aspx' },
      { label: 'Admit Card', url: 'https://jkssb.nic.in/AdmitCard.aspx' },
      { label: 'JKSSB Previous Year Papers', url: '/exam/jkssb', internal: true },
    ],
  },
}
