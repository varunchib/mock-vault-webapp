export type ExamNotification = {
  title: string
  date: string        // ISO date string
  type: 'notification' | 'result' | 'answer-key' | 'admit-card' | 'cutoff'
  link?: string
}

export type ExamPattern = {
  post: string
  totalQuestions: number
  totalMarks: number
  negativeMarking: number | null   // marks deducted per wrong answer, null = no negative marking
  durationMinutes: number
  subjects: { name: string; questions?: number }[]
}

export type SyllabusSection = {
  subject: string
  topics: string[]
}

export type CutoffRow = {
  year: string
  post: string
  category: string
  marks: number
  totalMarks: number
}

export type ExamInfoData = {
  about: string
  officialWebsite: string
  conductingBody: string
  examLevel: string
  examMode: string
  patterns: ExamPattern[]
  syllabus: { post: string; sections: SyllabusSection[] }[]
  cutoffs: CutoffRow[]
  notifications: ExamNotification[]
}

export const examInfo: Record<string, ExamInfoData> = {
  jkssb: {
    about:
      'JKSSB (Jammu & Kashmir Services Selection Board) is a statutory body constituted under the J&K Services Selection Board Act, 2012. It conducts written examinations and selects candidates for Group C (non-gazetted) and other posts across departments of the Union Territory of Jammu & Kashmir. All JKSSB exams follow an OMR-based written test pattern with objective-type questions.',
    officialWebsite: 'https://jkssb.nic.in',
    conductingBody: 'J&K Services Selection Board (JKSSB)',
    examLevel: 'UT Level (Jammu & Kashmir)',
    examMode: 'OMR-based Written Test',

    patterns: [
      {
        post: 'Patwari',
        totalQuestions: 120,
        totalMarks: 120,
        negativeMarking: 0.25,
        durationMinutes: 120,
        subjects: [
          { name: 'General Knowledge & Current Affairs', questions: 40 },
          { name: 'Arithmetic & Mental Ability',         questions: 30 },
          { name: 'Logical Reasoning',                   questions: 20 },
          { name: 'English Language',                    questions: 15 },
          { name: 'Revenue Laws & Procedures',           questions: 15 },
        ],
      },
      {
        post: 'Finance Accounts Assistant',
        totalQuestions: 120,
        totalMarks: 120,
        negativeMarking: 0.25,
        durationMinutes: 120,
        subjects: [
          { name: 'General Knowledge & Current Affairs', questions: 25 },
          { name: 'Accounts & Finance',                  questions: 35 },
          { name: 'Mathematics & Statistics',            questions: 25 },
          { name: 'English Language',                    questions: 20 },
          { name: 'Computers & IT',                      questions: 15 },
        ],
      },
      {
        post: 'Wildlife Guard',
        totalQuestions: 120,
        totalMarks: 120,
        negativeMarking: 0.25,
        durationMinutes: 120,
        subjects: [
          { name: 'Arithmetic & Reasoning',              questions: 50 },
          { name: 'English Language',                    questions: 25 },
          { name: 'General Knowledge & Current Affairs', questions: 25 },
          { name: 'Wildlife & Environment',              questions: 20 },
        ],
      },
      {
        post: 'Junior Assistant',
        totalQuestions: 120,
        totalMarks: 120,
        negativeMarking: 0.25,
        durationMinutes: 120,
        subjects: [
          { name: 'General Knowledge & Current Affairs', questions: 40 },
          { name: 'Arithmetic & Mental Ability',         questions: 30 },
          { name: 'English Language',                    questions: 30 },
          { name: 'Computer Fundamentals',               questions: 20 },
        ],
      },
    ],

    syllabus: [
      {
        post: 'Patwari',
        sections: [
          {
            subject: 'General Knowledge & Current Affairs',
            topics: [
              'History of India & J&K',
              'Geography of India & J&K',
              'Indian Constitution & Polity',
              'Economy & Five Year Plans',
              'Science & Technology',
              'Current Events – National & International',
              'Sports & Awards',
              'J&K Culture, Art & Literature',
            ],
          },
          {
            subject: 'Arithmetic & Mental Ability',
            topics: [
              'Number System & HCF/LCM',
              'Percentages & Profit/Loss',
              'Ratio, Proportion & Partnership',
              'Time, Speed & Distance',
              'Simple & Compound Interest',
              'Average & Age Problems',
              'Work & Time',
              'Mensuration & Geometry',
            ],
          },
          {
            subject: 'Logical Reasoning',
            topics: [
              'Series Completion',
              'Coding & Decoding',
              'Blood Relations',
              'Direction & Distance',
              'Syllogisms',
              'Statement & Conclusions',
              'Analogies & Classification',
            ],
          },
          {
            subject: 'Revenue Laws & Procedures',
            topics: [
              'J&K Land Revenue Act',
              'Jamabandi & Girdawari',
              'Land Records Maintenance',
              'Mutation Procedures',
              'J&K Tenancy Act',
              'Survey & Settlement Operations',
            ],
          },
        ],
      },
      {
        post: 'Finance Accounts Assistant',
        sections: [
          {
            subject: 'Accounts & Finance',
            topics: [
              'Accounting Principles & Concepts',
              'Double Entry Book-keeping',
              'Bank Reconciliation Statement',
              'Partnership Accounts',
              'Government Accounting (PFMS)',
              'Taxation – Income Tax & GST',
              'Financial Statements & Ratios',
              'Cost Accounting Basics',
            ],
          },
          {
            subject: 'Mathematics & Statistics',
            topics: [
              'Calculus & Limits',
              'Matrices & Determinants',
              'Probability & Statistics',
              'Mean, Median, Mode',
              'Index Numbers',
              'Measures of Dispersion',
            ],
          },
          {
            subject: 'Computers & IT',
            topics: [
              'Computer Fundamentals & OS',
              'MS Office (Word, Excel, PowerPoint)',
              'Internet & Networking Basics',
              'Cyber Security & IT Act 2000',
              'Database Management Basics',
              'e-Governance & Digital India',
            ],
          },
        ],
      },
      {
        post: 'Wildlife Guard',
        sections: [
          {
            subject: 'Wildlife & Environment',
            topics: [
              'Wildlife Protection Act 1972',
              'Forest Conservation Act 1980',
              'Biodiversity & Ecosystems',
              'National Parks & Wildlife Sanctuaries',
              'IUCN Red List & CITES',
              'J&K Flora & Fauna',
              'Environmental Laws & Policy',
              'Climate Change & Conservation',
            ],
          },
          {
            subject: 'General Knowledge',
            topics: [
              'History & Geography of J&K',
              'Indian Constitution & Polity',
              'Science & Technology',
              'Current Affairs',
            ],
          },
        ],
      },
    ],

    cutoffs: [
      { year: '2024', post: 'Patwari (Set A)',            category: 'OM',  marks: 74,  totalMarks: 120 },
      { year: '2024', post: 'Patwari (Set A)',            category: 'RBA', marks: 68,  totalMarks: 120 },
      { year: '2024', post: 'Patwari (Set A)',            category: 'SC',  marks: 60,  totalMarks: 120 },
      { year: '2024', post: 'Patwari (Set A)',            category: 'ST',  marks: 55,  totalMarks: 120 },
      { year: '2022', post: 'Junior Assistant',           category: 'OM',  marks: 79,  totalMarks: 120 },
      { year: '2022', post: 'Junior Assistant',           category: 'RBA', marks: 72,  totalMarks: 120 },
      { year: '2022', post: 'Junior Assistant',           category: 'SC',  marks: 63,  totalMarks: 120 },
    ],

    notifications: [
      {
        title: 'JKSSB Wildlife Guard Written Test held on 10 May 2026',
        date: '2026-05-10',
        type: 'notification',
      },
      {
        title: 'JKSSB Finance Accounts Assistant 2024 – Written Test Conducted',
        date: '2024-10-15',
        type: 'notification',
      },
      {
        title: 'JKSSB Patwari 2024 – Official Provisional Answer Key Released',
        date: '2024-09-20',
        type: 'answer-key',
        link: 'https://jkssb.nic.in',
      },
      {
        title: 'JKSSB Patwari 2024 (Set A) – Written Exam held on 01 Sep 2024',
        date: '2024-09-01',
        type: 'notification',
      },
      {
        title: 'JKSSB Junior Assistant 2022 – Final Result Declared',
        date: '2023-06-10',
        type: 'result',
        link: 'https://jkssb.nic.in',
      },
    ],
  },
}
