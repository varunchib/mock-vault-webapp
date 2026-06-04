export type FaqItem = { q: string; a: string }

export const examFaqs: Record<string, FaqItem[]> = {
  'ssc-cgl': [
    { q: 'What is SSC CGL?', a: 'SSC CGL (Combined Graduate Level) is a national-level exam conducted by the Staff Selection Commission to recruit officers and assistants for Group B and C posts across central government ministries, departments, and organisations including Income Tax, CBI, CAG, MEA, and others.' },
    { q: 'What is the SSC CGL exam pattern?', a: 'SSC CGL Tier I has 100 MCQ questions (200 marks) in 60 minutes covering General Intelligence & Reasoning (25), General Awareness (25), Quantitative Aptitude (25), and English Comprehension (25). There is −0.50 negative marking per wrong answer.' },
    { q: 'What is the eligibility for SSC CGL?', a: 'Candidates must hold a bachelor\'s degree from a recognised university. Age limit is 18–32 years for most posts (relaxation for SC/ST/OBC/PwD as per central government rules). Some posts have additional eligibility conditions like specific educational backgrounds.' },
    { q: 'What is the SSC CGL salary?', a: 'SSC CGL posts carry pay levels 4–8 depending on the post. An Income Tax Inspector earns ₹44,900–₹1,42,400 (Pay Level 7), an Assistant Section Officer earns ₹47,600–₹1,51,100 (Pay Level 8). Most posts offer HRA, DA, and other central government allowances.' },
    { q: 'Are SSC CGL previous year papers free on Ministry of Papers?', a: 'Yes. All SSC CGL PYQ papers on Ministry of Papers are free with full answer keys and subject-wise explanations. You can also attempt the paper in timed mode to simulate the real exam.' },
    { q: 'How many years of SSC CGL papers should I practice?', a: 'Practising the last 5 years of SSC CGL Tier I papers is strongly recommended. Questions repeat across years in topics like analogies, profit & loss, reading comprehension, and current affairs. The 2023, 2024, and 2025 papers reflect the latest pattern most accurately.' },
  ],
  'upsc-cse': [
    { q: 'What is UPSC CSE?', a: 'UPSC Civil Services Examination (CSE) is India\'s most prestigious competitive exam conducted annually by the Union Public Service Commission. It selects candidates for the Indian Administrative Service (IAS), Indian Foreign Service (IFS), Indian Police Service (IPS), and over 20 other central services.' },
    { q: 'What is the UPSC Prelims exam pattern?', a: 'UPSC Prelims has two papers: GS Paper 1 (100 MCQs, 200 marks, 2 hours) and CSAT Paper 2 (80 MCQs, 200 marks, 2 hours). GS Paper 1 covers History, Geography, Polity, Economy, Science, and Current Affairs. CSAT is qualifying with 33% minimum. Negative marking is −0.66 per wrong answer.' },
    { q: 'What is the eligibility for UPSC CSE?', a: 'Candidates must hold a bachelor\'s degree from a recognised university (final-year students can apply). Age limit: 21–32 years (General), up to 35 years (OBC), up to 37 years (SC/ST). Maximum 6 attempts for General category, 9 for OBC, unlimited for SC/ST up to the age limit.' },
    { q: 'Are UPSC previous year papers available free on Ministry of Papers?', a: 'Yes. All UPSC CSE Prelims GS Paper 1 and CSAT Paper 2 PYQs from recent years are available free with official answer keys and detailed explanations covering every topic.' },
    { q: 'Which subjects are most important for UPSC Prelims GS?', a: 'Based on past year paper analysis, History (Art & Culture, Modern India) typically contributes 15–20 questions, Geography 10–15, Polity & Governance 10–12, Economy 8–10, Environment & Ecology 10–12, and Current Affairs 15–20 questions per paper.' },
  ],
  'ibps-po': [
    { q: 'What is IBPS PO?', a: 'IBPS PO (Probationary Officer) exam is conducted by the Institute of Banking Personnel Selection to recruit Probationary Officers in public sector banks including Bank of Baroda, Canara Bank, Punjab National Bank, Union Bank, and other participating banks.' },
    { q: 'What is the IBPS PO Prelims exam pattern?', a: 'IBPS PO Prelims has 100 questions (100 marks) in 60 minutes: English Language (30 questions, 20 min), Quantitative Aptitude (35 questions, 20 min), Reasoning Ability (35 questions, 20 min). There is sectional timing and −0.25 negative marking per wrong answer.' },
    { q: 'What is the eligibility for IBPS PO?', a: 'Candidates must be graduates (any discipline) from a recognised university. Age limit is 20–30 years (relaxation for SC/ST/OBC/PwD). Proficiency in the official language of the state is preferred for some banks.' },
    { q: 'What is the IBPS PO salary?', a: 'A newly joined IBPS PO earns approximately ₹41,960 per month as basic pay under JMG Scale I, with additional allowances (DA, HRA, CCA, Medical) taking the gross monthly CTC to approximately ₹52,000–₹65,000 depending on the city of posting.' },
    { q: 'Are IBPS PO previous year papers free on Ministry of Papers?', a: 'Yes. IBPS PO Prelims PYQ papers with complete answer keys and explanations are free on Ministry of Papers. Each paper is available in timed mode to simulate real exam conditions.' },
  ],
  bpsc: [
    { q: 'What is BPSC?', a: 'BPSC (Bihar Public Service Commission) conducts the Combined Competitive Examination (CCE) to recruit officers for various Group A and B posts in Bihar state government including BAS (Bihar Administrative Service), BPS (Bihar Police Service), Deputy Superintendent of Police, and others.' },
    { q: 'What is the BPSC CCE Prelims pattern?', a: 'BPSC Prelims (PT) has 150 MCQ questions worth 150 marks in 2 hours. The paper covers General Science, Current Affairs, Indian History, Indian Geography, Indian Polity, Economy, Mental Ability, and Bihar-specific topics. There is no negative marking in BPSC Prelims.' },
    { q: 'What is the age limit for BPSC?', a: 'General category: 20–37 years. SC/ST candidates from Bihar: 20–42 years. Women candidates from Bihar (unreserved): 20–40 years. Women from SC/ST Bihar: 20–42 years. PWD candidates get additional relaxation as per Bihar government rules.' },
    { q: 'What is the eligibility for BPSC CCE?', a: 'Candidates must hold a bachelor\'s degree from a UGC-recognised university. There is no specific stream requirement — graduates from any discipline can apply for most BPSC posts.' },
    { q: 'Are BPSC previous year papers free on Ministry of Papers?', a: 'Yes. BPSC 70th CCE and other recent BPSC PYQ papers are free on Ministry of Papers with complete answer keys, subject-wise breakdowns, and detailed explanations including Bihar-specific GK questions.' },
  ],
  rssb: [
    { q: 'What is RSSB?', a: 'RSSB (Rajasthan Staff Selection Board), officially known as RSMSSB (Rajasthan Subordinate and Ministerial Services Selection Board), conducts recruitment exams for various Group C and D posts in Rajasthan state government including Patwari, LDC, Tax Assistant, Junior Accountant, and Informatics Assistant.' },
    { q: 'What is the RSSB Patwari exam pattern?', a: 'RSSB Patwari exam has 150 questions (300 marks) in 3 hours. Paper covers Rajasthan GK (45%), Geography, History, Culture, Polity, Economy, General Science, Reasoning & Mental Ability, and Basic Computer Knowledge. Negative marking of −1/3 mark applies.' },
    { q: 'What subjects are important for RSSB exams?', a: 'Rajasthan GK is the most critical section in RSSB exams, covering Rajasthan History, Art & Culture, Geography, Economy, and Current Affairs. This typically accounts for 40–50% of the paper. General Hindi, Reasoning, and Mathematics/Quantitative Aptitude are also key sections.' },
    { q: 'Are RSSB previous year papers free on Ministry of Papers?', a: 'Yes. RSSB Patwari 2025 and other RSSB PYQ papers are available free on Ministry of Papers with official answer keys, Rajasthan-specific GK explanations, and subject-wise practice.' },
  ],
  jkpsc: [
    { q: 'What is JKPSC?', a: 'JKPSC (Jammu & Kashmir Public Service Commission) conducts the J&K Combined Competitive Examination (JKCCE) for recruitment to Group A and B gazetted services in the Union Territory of J&K including J&K Administrative Service, J&K Police Service, J&K Finance Service, and other Group A gazetted posts.' },
    { q: 'What is the JKPSC JKCCE Prelims pattern?', a: 'JKPSC Prelims (Screening Test) has 150 MCQ questions (150 marks) in 2 hours. Paper covers General Studies including History, Geography, Polity, Economy, Science & Technology, Environment, and J&K-specific topics. There is no negative marking in the screening test.' },
    { q: 'What is the age limit for JKPSC JKCCE?', a: 'The age limit for JKPSC JKCCE is 21–40 years for open merit candidates. Age relaxation is provided for SC/ST/OBC/PwD candidates as per J&K government orders. Domicile Certificate of J&K UT is mandatory for all posts.' },
    { q: 'Are JKPSC previous year papers free on Ministry of Papers?', a: 'Yes. JKPSC JKCCE Prelims PYQ papers are free on Ministry of Papers with complete answer keys and explanations specifically covering J&K GK, history, geography, and governance questions that are unique to the J&K civil services exam.' },
  ],
  jkpsi: [
    { q: 'What is JKPSI?', a: 'JKPSI (Jammu & Kashmir Police Sub Inspector) exam is conducted by JKSSB for recruitment to the post of Sub Inspector in the J&K Police. It is one of the most competitive posts in J&K with syllabus covering General Knowledge, Reasoning, English, and J&K-specific current affairs.' },
    { q: 'Are JKPSI previous year papers available on Ministry of Papers?', a: 'Yes. JKPSI 2017 previous year paper is available free on Ministry of Papers with complete answer key and explanations for all questions.' },
  ],
  jkssb: [
    {
      q: 'What is JKSSB?',
      a: 'JKSSB (Jammu & Kashmir Services Selection Board) is the statutory body that recruits candidates for Group C (non-gazetted) and Group D posts across departments of the Union Territory of Jammu & Kashmir. It was constituted under the J&K Services Selection Board Act, 2012.',
    },
    {
      q: 'What posts does JKSSB recruit for?',
      a: 'JKSSB recruits for a wide range of posts including Junior Assistant, Patwari, Finance Account Assistant, Wildlife Guard, Sub Inspector (Police), VLW (Village Level Worker), Accounts Assistant, and many other non-gazetted posts across various J&K UT departments.',
    },
    {
      q: 'What is the exam pattern for JKSSB exams?',
      a: 'JKSSB exams typically consist of 120 objective-type MCQ questions worth 1 mark each, with a duration of 2 hours. There is negative marking of −0.25 marks per wrong answer. The paper covers General Knowledge & Current Affairs, Quantitative Aptitude, Reasoning Ability, English Language, and post-specific topics.',
    },
    {
      q: 'Is Permanent Resident Certificate (PRC) mandatory for JKSSB?',
      a: 'Yes. A valid PRC (Permanent Resident Certificate) or Domicile Certificate of J&K UT is mandatory for all JKSSB posts. Candidates without a valid PRC/Domicile Certificate are ineligible to apply regardless of other qualifications.',
    },
    {
      q: 'What is the age limit for JKSSB exams?',
      a: 'The general age limit for most JKSSB posts is 18–40 years. Age relaxation is provided: SC/ST candidates get +5 years, OBC candidates get +3 years, PwD candidates get +10 years, and Ex-Servicemen get relaxation as per J&K Government rules.',
    },
    {
      q: 'What is the educational qualification required for JKSSB?',
      a: 'Most JKSSB Group C posts require graduation from a recognized university. Post-specific qualifications apply — for example, Patwari candidates need knowledge of Revenue Laws, Finance Account Assistant candidates typically require a Commerce background, and Wildlife Guard requires science-related qualifications.',
    },
    {
      q: 'What is the salary for JKSSB posts?',
      a: 'JKSSB Group C posts (Junior Assistant, Patwari, Finance Account Assistant) carry Pay Level 4 with a salary range of ₹25,500–₹81,100 per month. Group D posts like Wildlife Guard carry Pay Level 2 (₹19,900–₹63,200). Sub Inspector (Police) carries Pay Level 6 (₹35,400–₹1,12,400).',
    },
    {
      q: 'Are JKSSB previous year papers free to practice?',
      a: 'Yes. All JKSSB previous year papers on Ministry of Papers are completely free. Every question includes the official answer key and a detailed explanation so you can understand the concept behind each answer.',
    },
    {
      q: 'What subjects are covered in JKSSB exams?',
      a: 'JKSSB exams cover General Knowledge & J&K Current Affairs, Quantitative Aptitude, Reasoning Ability, English Language, and post-specific topics. Post-specific topics include Revenue Laws (Patwari), Public Finance & Accounting (Finance Account Assistant), Wildlife Science (Wildlife Guard), and Police Duties (Sub Inspector).',
    },
    {
      q: 'Where can I check the official JKSSB answer key?',
      a: 'JKSSB releases provisional and final answer keys on jkssb.nic.in under the Answer Key section. On Ministry of Papers, all previous year papers are updated with the official answer key and subject-wise explanations for every question.',
    },
  ],
}
