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

  // ─── JKSSB (Board-level) ────────────────────────────────────────────────────
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

  // ─── JKPSC ───────────────────────────────────────────────────────────────────
  jkpsc: {
    about:
      'JKPSC (Jammu & Kashmir Public Service Commission) conducts the JKCCE for Gazetted Officer recruitment. The 2-paper Prelims (GS Paper I + CSAT) is followed by Mains and Interview for J&K Group A and B services.',
    officialWebsite: 'https://jkpsc.nic.in',
    conductingBody: 'Jammu & Kashmir Public Service Commission (JKPSC)',
    examLevel: 'UT Level (Jammu & Kashmir) — Gazetted Officers',
    examMode: 'Prelims (OMR) + Mains (Descriptive) + Interview',
    latestUpdates: [
      { date: 'May 2025', text: 'JKPSC JKCCE Prelims 2025 held on 11 May. Paper I (GS Set B) solved paper available.', link: '/pyq/jkpsc-jkcce-prelims-2025-gs1-set-b' },
      { date: '2025', text: 'JKPSC releases notification for JKCCE 2025. Applications invited for Group A & B posts.' },
    ],
    examPattern: [
      { subject: 'Paper I — General Studies', questions: '100', marks: '200', negativeMarking: '−0.67' },
      { subject: 'Paper II — CSAT (Qualifying)', questions: '80', marks: '200', negativeMarking: '−0.67' },
    ],
    examPatternNote: 'Paper II is qualifying at 33%. Only Paper I marks determine Prelims merit. Duration: 2 hours each.',
    eligibility: {
      age: '21–40 years for most posts. Age relaxations as per J&K Government rules.',
      education: 'Graduation from a recognized university (any discipline).',
      nationality: 'Indian citizen. Domicile/PRC of J&K UT required.',
    },
    selectionProcess: [
      'Preliminary Examination — GS Paper I (200 marks) + CSAT Paper II (qualifying)',
      'Main Examination — Descriptive papers (GS + Optional + Language)',
      'Personality Test (Interview) — 200 marks',
      'Final Merit List — Mains + Interview marks',
    ],
    salary: [
      { post: 'J&K Administrative Service (JKAS)', payLevel: 'Level 10–14', payScale: '₹56,100 – ₹1,77,500' },
      { post: 'J&K Police Service / Other Group A', payLevel: 'Level 10', payScale: '₹56,100 – ₹1,32,000' },
    ],
    importantLinks: [
      { label: 'JKPSC Official Website', url: 'https://jkpsc.nic.in' },
      { label: 'JKCCE 2025 GS Paper I — Solved', url: '/pyq/jkpsc-jkcce-prelims-2025-gs1-set-b', internal: true },
    ],
  },

  // ─── UPSC CSE ────────────────────────────────────────────────────────────────
  'upsc-cse': {
    about:
      'UPSC CSE is India\'s most prestigious examination, recruiting IAS, IPS, IFS, and 24+ Group A services. The three-stage process — Prelims (GS + CSAT), Mains (9 papers), and Interview — tests candidates across history, polity, economy, science, and current affairs.',
    officialWebsite: 'https://upsc.gov.in',
    conductingBody: 'Union Public Service Commission (UPSC)',
    examLevel: 'National Level — All India Services',
    examMode: 'Prelims (OMR) + Mains (Descriptive) + Personality Test',
    latestUpdates: [
      { date: 'May 2026', text: 'UPSC CSE Prelims 2026 GS Paper I held on 25 May 2026. Full solved paper available on Ministry of Papers.', link: '/pyq/upsc-cse-prelims-2026-gs1' },
      { date: 'May 2025', text: 'UPSC CSE Prelims 2025 GS Paper I and CSAT both solved and available.', link: '/pyq/upsc-cse-prelims-2025-gs1' },
    ],
    examPattern: [
      { subject: 'Prelims GS Paper I', questions: '100', marks: '200', negativeMarking: '−0.67' },
      { subject: 'Prelims CSAT / GS Paper II (Qualifying)', questions: '80', marks: '200', negativeMarking: '−0.67' },
      { subject: 'Mains — Essay', questions: '—', marks: '250' },
      { subject: 'Mains — GS Papers I–IV (×4)', questions: '—', marks: '1,000' },
      { subject: 'Mains — Optional I & II (×2)', questions: '—', marks: '500' },
      { subject: 'Personality Test (Interview)', questions: '—', marks: '275' },
    ],
    examPatternNote: 'Prelims is screening only. Final merit is based on Mains + Interview marks.',
    eligibility: {
      age: 'General: 21–32 years (6 attempts). OBC: +3 years (9 attempts). SC/ST: +5 years (unlimited attempts up to 37).',
      education: 'Graduation from a recognized university (any discipline). Final year students can also apply.',
    },
    selectionProcess: [
      'Preliminary Examination (screening) — GS Paper I + CSAT',
      'Main Examination — 9 descriptive papers',
      'Personality Test — 275 marks',
      'Final Merit and Service Allocation',
    ],
    salary: [
      { post: 'IAS / IPS / IFS — Entry (Junior Time Scale)', payLevel: 'Level 10', payScale: '₹56,100 – ₹1,32,000 + allowances' },
      { post: 'IAS — Super Time Scale', payLevel: 'Level 15', payScale: '₹1,82,200 – ₹2,24,100' },
    ],
    importantLinks: [
      { label: 'UPSC Official Website', url: 'https://upsc.gov.in' },
      { label: 'UPSC CSE 2026 Prelims GS Paper I — Solved', url: '/pyq/upsc-cse-prelims-2026-gs1', internal: true },
      { label: 'UPSC CSE 2025 Prelims GS Paper I — Solved', url: '/pyq/upsc-cse-prelims-2025-gs1', internal: true },
    ],
  },

  // ─── SSC CGL ─────────────────────────────────────────────────────────────────
  'ssc-cgl': {
    about:
      'SSC CGL recruits for Group B and C posts in Central Government through a 4-tier exam. Tier I (100 Qs, 60 min) covers Reasoning, GK, Maths, and English. Key posts include Income Tax Inspector, Auditor, and Sub-Inspector (CBI).',
    officialWebsite: 'https://ssc.gov.in',
    conductingBody: 'Staff Selection Commission (SSC)',
    examLevel: 'National Level — Central Government Posts',
    examMode: 'Computer Based Test (CBT) — 4 Tiers',
    examPattern: [
      { subject: 'Tier I — Reasoning & General Intelligence', questions: '25', marks: '50', negativeMarking: '−0.5' },
      { subject: 'Tier I — General Awareness', questions: '25', marks: '50', negativeMarking: '−0.5' },
      { subject: 'Tier I — Quantitative Aptitude', questions: '25', marks: '50', negativeMarking: '−0.5' },
      { subject: 'Tier I — English Language', questions: '25', marks: '50', negativeMarking: '−0.5' },
      { subject: 'Tier I Total', questions: '100', marks: '200', isTotal: true },
    ],
    examPatternNote: 'Tier I: 60 minutes. Tier II: 3 papers, 390 marks. Negative marking: −0.5 (Tier I), −1 (Tier II).',
    eligibility: {
      age: '18–27 years for most posts; 20–30 years for Inspector posts. Relaxations for SC/ST, OBC, PwD, Ex-SM.',
      education: 'Graduation from a recognised university (any discipline). BCom/Statistics background preferred for some posts.',
    },
    selectionProcess: [
      'Tier I — CBT, 100 MCQs, 60 min (screening)',
      'Tier II — CBT, multiple papers (main selection)',
      'Document Verification',
      'Final Merit List — Tier I + Tier II combined',
    ],
    salary: [
      { post: 'Income Tax Inspector / Central Excise Inspector', payLevel: 'Level 7', payScale: '₹44,900 – ₹1,42,400' },
      { post: 'Tax Assistant / Auditor', payLevel: 'Level 5–6', payScale: '₹29,200 – ₹92,300' },
    ],
    importantLinks: [
      { label: 'SSC Official Website', url: 'https://ssc.gov.in' },
      { label: 'SSC CGL 2023 Tier I — All Shifts Solved', url: '/pyq/ssc-cgl-2023-tier-1-all-shifts', internal: true },
    ],
  },

  // ─── BPSC ────────────────────────────────────────────────────────────────────
  bpsc: {
    about:
      'BPSC (Bihar Public Service Commission) Combined Competitive Examination recruits officers for Bihar state services including BAS, BPS, and BFS. The Prelims has 150 GS questions with no negative marking; Mains is descriptive.',
    officialWebsite: 'https://bpsc.bih.nic.in',
    conductingBody: 'Bihar Public Service Commission (BPSC)',
    examLevel: 'State Level — Bihar State Services',
    examMode: 'Prelims (OMR/CBT) + Mains (Descriptive) + Interview',
    latestUpdates: [
      { date: '2024', text: 'BPSC 70th CCE Prelims held. 150-question GS paper with full solutions available on Ministry of Papers.', link: '/pyq/bpsc-70th-cce-prelims-2024-gs' },
    ],
    examPattern: [
      { subject: 'Prelims — General Studies (No Negative Marking)', questions: '150', marks: '150' },
    ],
    examPatternNote: 'Prelims: 2 hours, no negative marking. Mains: Multiple descriptive papers. Interview: 120 marks.',
    eligibility: {
      age: 'General: 20–37 years. OBC: +3 years. SC/ST (Male): +5 years. SC/ST (Female) and PwD: +10 years.',
      education: 'Graduation from a recognized university.',
    },
    selectionProcess: [
      'Preliminary Examination — 150 MCQs, no negative marking',
      'Main Examination — Descriptive papers',
      'Interview — 120 marks',
      'Final Merit List',
    ],
    salary: [
      { post: 'Bihar Administrative Service (BAS)', payLevel: 'Level 10+', payScale: '₹53,100 onwards' },
      { post: 'Bihar Police Service / Finance Service', payLevel: 'Level 9–10', payScale: '₹44,900 – ₹1,42,400' },
    ],
    importantLinks: [
      { label: 'BPSC Official Website', url: 'https://bpsc.bih.nic.in' },
      { label: 'BPSC 70th CCE Prelims 2024 — Solved', url: '/pyq/bpsc-70th-cce-prelims-2024-gs', internal: true },
    ],
  },

  // ─── IBPS PO ─────────────────────────────────────────────────────────────────
  'ibps-po': {
    about:
      'IBPS PO recruits Probationary Officers for 11 participating public sector banks. Prelims has 100 Qs (English 30 + Reasoning 35 + Quant 35) in 60 minutes; Mains tests Data Analysis, Banking Awareness, and English. Starting CTC ~₹7–8 LPA.',
    officialWebsite: 'https://ibps.in',
    conductingBody: 'Institute of Banking Personnel Selection (IBPS)',
    examLevel: 'National Level — Public Sector Banks',
    examMode: 'Computer Based Test (CBT) — Prelims + Mains + Interview',
    latestUpdates: [
      { date: 'Aug 2025', text: 'IBPS PO Pre 2025 conducted on 23rd August. Memory-based paper with full solutions available.', link: '/pyq/ibps-po-pre-2025-aug-23-shift-1' },
      { date: '2024', text: 'IBPS PO 2024-25 Prelims cutoff: General 61.75, OBC 58.75, SC 51.75, ST 42.75 (out of 100).', },
    ],
    examPattern: [
      { subject: 'Prelims — English Language', questions: '30', marks: '30', negativeMarking: '−0.25' },
      { subject: 'Prelims — Quantitative Aptitude', questions: '35', marks: '35', negativeMarking: '−0.25' },
      { subject: 'Prelims — Reasoning Ability', questions: '35', marks: '35', negativeMarking: '−0.25' },
      { subject: 'Prelims Total', questions: '100', marks: '100', isTotal: true },
    ],
    examPatternNote: 'Prelims: 60 min. Mains: 155 Qs + 2 Descriptive (180+30 min). Interview: 100 marks.',
    eligibility: {
      age: '20–30 years. Relaxation: OBC +3 years, SC/ST +5 years, PwD +10 years.',
      education: 'Graduation from a recognised university (any discipline).',
    },
    selectionProcess: [
      'Preliminary Examination — 100 MCQs, 60 minutes',
      'Main Examination — Objective (155 Qs) + Descriptive (2 questions)',
      'Interview — 100 marks',
      'Final Merit List — Mains 80% + Interview 20%',
    ],
    salary: [
      { post: 'PO / Management Trainee', payLevel: 'JMGS I', payScale: '₹36,000 – ₹63,840 (Basic) + DA + HRA + Other allowances' },
    ],
    importantLinks: [
      { label: 'IBPS Official Website', url: 'https://ibps.in' },
      { label: 'IBPS PO Pre 2025 Paper — Solved', url: '/pyq/ibps-po-pre-2025-aug-23-shift-1', internal: true },
    ],
  },

  // ─── RSSB (Rajasthan Patwari) ────────────────────────────────────────────────
  rssb: {
    about:
      'RSSB (Rajasthan Staff Selection Board) conducts the Patwari and other Group C exams for Rajasthan. The 2025 Patwari exam had 150 questions worth 300 marks (2 marks each, −0.67 negative) covering Rajasthan GK, Revenue Laws, Arithmetic, Reasoning, and Hindi.',
    officialWebsite: 'https://rssb.rajasthan.gov.in',
    conductingBody: 'Rajasthan Staff Selection Board (RSSB / RSMSSB)',
    examLevel: 'State Level — Rajasthan State Posts',
    examMode: 'OMR-based Written Test',
    latestUpdates: [
      { date: 'Aug 2025', text: 'RSSB Patwari 2025 exam held on 17 August (Shift 1, SPZ8). Solved paper available on Ministry of Papers.', link: '/pyq/rsmssb-patwari-2025-aug17-shift1-spz8' },
    ],
    examPattern: [
      { subject: 'Rajasthan History, Culture & GK', questions: '40–50', marks: '80–100', negativeMarking: '−0.67' },
      { subject: 'Rajasthan Revenue Laws', questions: '20–30', marks: '40–60', negativeMarking: '−0.67' },
      { subject: 'General Knowledge', questions: '20–25', marks: '40–50', negativeMarking: '−0.67' },
      { subject: 'Arithmetic & Reasoning', questions: '35–40', marks: '70–80', negativeMarking: '−0.67' },
      { subject: 'Hindi Language', questions: '15–20', marks: '30–40', negativeMarking: '−0.67' },
      { subject: 'Total', questions: '150', marks: '300', isTotal: true },
    ],
    examPatternNote: '2 marks per question. Negative marking: −0.67 per wrong answer. Duration: 3 hours.',
    eligibility: {
      age: '18–40 years. Relaxations for SC/ST, OBC, PwD, Ex-Servicemen as per Rajasthan Government rules.',
      education: 'Graduation from a recognised university.',
    },
    selectionProcess: [
      'Written Examination — 150 MCQs, 3 hours, OMR-based',
      'Document Verification',
      'Final Merit List',
    ],
    salary: [
      { post: 'Patwari (Group C)', payLevel: 'Level 5', payScale: '₹29,200 – ₹92,300' },
    ],
    importantLinks: [
      { label: 'RSSB Official Website', url: 'https://rssb.rajasthan.gov.in' },
      { label: 'RSSB Patwari 2025 Paper — Solved', url: '/pyq/rsmssb-patwari-2025-aug17-shift1-spz8', internal: true },
    ],
  },

  // ─── NEET UG ─────────────────────────────────────────────────────────────────
  'neet-ug': {
    about:
      'NEET UG is India\'s single national medical entrance exam for MBBS, BDS, and AYUSH admissions, conducted by NTA. The paper has 200 questions (attempt 180) in Physics, Chemistry, and Biology. Maximum marks: 720. Cutoff for General category MBBS: typically 550+.',
    officialWebsite: 'https://nta.ac.in/neet',
    conductingBody: 'National Testing Agency (NTA)',
    examLevel: 'National Level — Medical Undergraduate Entrance',
    examMode: 'Offline OMR-based (Pen and Paper Test)',
    examPattern: [
      { subject: 'Physics (Section A + B)', questions: '50 (attempt 45)', marks: '180', negativeMarking: '−1' },
      { subject: 'Chemistry (Section A + B)', questions: '50 (attempt 45)', marks: '180', negativeMarking: '−1' },
      { subject: 'Botany (Section A + B)', questions: '50 (attempt 45)', marks: '180', negativeMarking: '−1' },
      { subject: 'Zoology (Section A + B)', questions: '50 (attempt 45)', marks: '180', negativeMarking: '−1' },
      { subject: 'Total (180 questions)', questions: '200 (attempt 180)', marks: '720', isTotal: true },
    ],
    examPatternNote: 'Duration: 3 hours 20 minutes. +4 marks per correct, −1 per wrong answer.',
    eligibility: {
      age: 'Minimum 17 years as on 31 December of admission year. No upper age limit (as per Supreme Court ruling).',
      education: 'Class 12 with Physics, Chemistry, Biology/Biotechnology and English. Minimum 50% marks (General), 40% (SC/ST/OBC/PwD).',
    },
    selectionProcess: [
      'NEET UG Examination — Single paper, 3 hours 20 minutes',
      'Merit List — Based on NEET scores (state-wise and AIQ)',
      'Centralised Counselling — MCC for AIQ; State counselling for state quota seats',
    ],
    salary: [],
    importantLinks: [
      { label: 'NTA NEET Official Website', url: 'https://nta.ac.in/neet' },
      { label: 'NEET UG 2024 Cutoffs', url: '/exam/neet-ug/overview', internal: true },
    ],
  },
}
