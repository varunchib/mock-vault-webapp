export interface JkssbDepartment {
  id: string
  label: string
  keywords: string[]
}

export const JKSSB_DEPARTMENTS: JkssbDepartment[] = [
  { id: 'all', label: 'All Papers', keywords: [] },
  {
    id: 'police',
    label: 'Police & Home',
    keywords: ['sub inspector', 'jkpsi', 'constable', 'police', 'telecom', 'home'],
  },
  {
    id: 'revenue',
    label: 'Revenue & Admin',
    keywords: ['patwari', 'junior assistant', 'naib', 'revenue', 'vlw', 'panchayat'],
  },
  {
    id: 'finance',
    label: 'Finance & Accounts',
    keywords: ['finance', 'account', 'faa', 'treasury', 'auditor'],
  },
  {
    id: 'forest',
    label: 'Forest & Wildlife',
    keywords: ['wildlife', 'forest', 'field assistant', 'fpf', 'social forestry'],
  },
  {
    id: 'technical',
    label: 'Technical & Health',
    keywords: ['laboratory', 'lab attendant', 'veterinary', 'pharmacist', 'engineer', 'programmer', 'health'],
  },
]

export function matchJkssbDepartment(title: string, deptId: string): boolean {
  if (deptId === 'all') return true
  const dept = JKSSB_DEPARTMENTS.find((d) => d.id === deptId)
  if (!dept) return true
  const hay = title.toLowerCase()
  return dept.keywords.some((kw) => hay.includes(kw))
}

export interface JkssbGuideLink {
  slug: string
  title: string
  subtitle: string
}

export const JKSSB_GUIDES_LINKS: JkssbGuideLink[] = [
  {
    slug: 'jkssb-faa',
    title: 'JKSSB Finance Account Assistant (FAA)',
    subtitle: 'Syllabus, Accountancy & Book Keeping, J&K Financial Code & PYQs',
  },
  {
    slug: 'jkssb-patwari',
    title: 'JKSSB Patwari',
    subtitle: 'Revenue Laws, J&K Land Records, Urdu & 120-MCQ Exam Pattern',
  },
  {
    slug: 'jkssb-junior-assistant',
    title: 'JKSSB Junior Assistant',
    subtitle: 'Computer Knowledge, Typing Skill Test, GK & Reasoning Syllabus',
  },
  {
    slug: 'jkpsi',
    title: 'JKSSB Sub Inspector (JKPSI Executive)',
    subtitle: 'Advt. 02/2024 Pattern, Physical Standards & Solved PYQ Papers',
  },
  {
    slug: 'jkpsi-telecom',
    title: 'JKSSB Sub Inspector (Telecom)',
    subtitle: 'Advt. 11/2025 Electronics, Telecom & General Awareness Syllabus',
  },
  {
    slug: 'jkssb-constable',
    title: 'JKSSB Police Constable',
    subtitle: 'Executive, Armed, IRP & SDRF Syllabus, PET/PST & Written Pattern',
  },
  {
    slug: 'jkssb-constable-telecom',
    title: 'JKSSB Constable Telecommunication',
    subtitle: 'Physics, Basic Electronics, Networking & Written Exam Pattern',
  },
  {
    slug: 'jkssb-wildlife-guard',
    title: 'JKSSB Wildlife Guard',
    subtitle: 'Forest, Ecology, Wildlife Conservation & Science Syllabus',
  },
  {
    slug: 'jkssb-veterinary-pharmacist',
    title: 'JKSSB Veterinary Pharmacist',
    subtitle: 'Animal Husbandry, Livestock Management & Official Exam Pattern',
  },
]

export interface JkssbPrepSection {
  heading: string
  paragraphs: string[]
  bullets?: { label: string; text: string }[]
}

export const JKSSB_PREP_SECTIONS: JkssbPrepSection[] = [
  {
    heading: 'Why Practise Official JKSSB Previous Year Question Papers (PYQs)?',
    paragraphs: [
      'The Jammu & Kashmir Services Selection Board (JKSSB) recruits candidates for Group B, Group C, and Group D non-gazetted posts across Revenue, Finance, Home (J&K Police), Forest, Health, and Technical departments. Across almost all OMR and Computer-Based Test (CBT) examinations, JKSSB follows a strict 1/4th (0.25 marks) negative marking scheme for every incorrect response, making accuracy just as decisive as speed.',
      'Solving authentic JKSSB previous year papers helps aspirants spot recurring question themes, understand the exact difficulty of J&K-specific General Knowledge, and benchmark their score against official JKSSB final answer keys before sitting the actual exam.',
    ],
  },
  {
    heading: 'High-Weightage Subjects Across JKSSB Recruitment Exams',
    paragraphs: [
      'While post-specific sections vary by recruitment notification, analysing solved JKSSB papers from 2017 through 2026 shows five core scoring areas that appear repeatedly:',
    ],
    bullets: [
      {
        label: 'General Knowledge with Special Reference to J&K',
        text: 'History of Jammu & Kashmir, Treaty of Amritsar, J&K Reorganisation Act 2019, UT geography, rivers (Jhelum, Chenab, Tawi), lakes, wildlife sanctuaries, and current schemes.',
      },
      {
        label: 'Computer & IT Knowledge',
        text: 'MS Word, Excel, PowerPoint shortcuts, DBMS, networking topologies, OSI layers, cyber security, and operating system fundamentals — heavily weighted in Junior Assistant and FAA papers.',
      },
      {
        label: 'General English & Comprehension',
        text: 'Tenses, active-passive voice, narration, prepositions, idioms, synonyms/antonyms, and error spotting.',
      },
      {
        label: 'Quantitative Aptitude & Reasoning',
        text: 'Percentages, profit and loss, ratio, averages, time and work, data interpretation, coding-decoding, number series, and syllogisms.',
      },
      {
        label: 'Post-Specific Technical & Domain Papers',
        text: 'Accountancy, Book Keeping & Public Finance (FAA / Accounts Assistant), J&K Revenue Laws & Land Records (Patwari), Ecology & Wildlife Protection (Wildlife Guard / Forest Inspector), and Veterinary Science (Veterinary Pharmacist).',
      },
    ],
  },
  {
    heading: 'How to Use This JKSSB PYQ Archive Effectively',
    paragraphs: [
      'Start by selecting your target department or post above — such as JKSSB Patwari, Finance Account Assistant, Junior Assistant, JKPSI, Constable, or Wildlife Guard. Attempt each paper under exam-like conditions, then review the detailed explanation under every question to close conceptual gaps.',
      'For aspirants also appearing in higher-level J&K state examinations or university recruitment tests, combine JKSSB practice with our solved JKPSC JKCCE papers and the University of Kashmir Junior Accounts Assistant (2026) paper for broader Accountancy, Statistics, and Economics coverage.',
    ],
  },
]
