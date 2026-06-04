// Static guide pages for specific exam posts.
// These pages target post-specific search queries ("JKPSI syllabus", "JKSSB Patwari exam pattern")
// and require no DB connection — all content is hardcoded here.
// To add a new guide: add an entry to postGuides and a route in AppRoutes.tsx.

export type GuideSyllabus = {
  subject: string
  topics: string[]
}

export type GuidePatternRow = {
  section: string
  questions: number | string
  marks: number | string
  note?: string
  isTotal?: boolean
}

export type GuidePaperLink = {
  slug: string
  title: string
  year: string
  questions: number
}

export type QuickFact = {
  label: string
  value: string
}

export type PostGuideData = {
  // Identity
  title: string
  shortName: string
  tagline: string
  patternNotification?: string  // e.g. "Based on 2017 notification. Updated when new notification releases."
  quickFacts?: QuickFact[]      // shown in sidebar — only put stable/current facts here

  // Which exam in the DB this belongs to, and optional search keyword to pre-filter papers
  examSlug: string
  paperSearchTerm?: string  // pre-fills the paper search on /exam/:examSlug

  // Direct paper links shown in sidebar
  papers: GuidePaperLink[]

  // Metadata
  conductingBody: string
  officialWebsite: string
  examLevel: string
  examMode: string

  // Content sections
  about: string[]       // 2-3 paragraphs
  syllabus: GuideSyllabus[]
  examPattern: GuidePatternRow[]
  examPatternNote?: string
  eligibility: {
    age: string
    education: string
    domicile: string
    attempts?: string
  }
  selectionProcess: string[]
  salary: { post: string; payScale: string; level: string }[]
  preparationTips: string[]
}

// Reverse lookup: paper slug → guide slug
// Used by PyqPaperPage to show a "Exam Guide" link in the sidebar
export const paperGuideMap: Record<string, string> = {
  'jkpsi-2017':                        'jkpsi',
  'bpsc-70th-cce-prelims-2024-gs':     'bpsc',
  'ibps-po-pre-2025-aug-23-shift-1':   'ibps-po',
  'jkpsc-jkcce-prelims-2025-gs1-set-b':'jkpsc',
  'jkssb-patwari-2024-sep1-set-a':     'jkssb-patwari',
  'jkssb-junior-assistant-pyq':        'jkssb-junior-assistant',
  'jkssb-finance-accounts-2024-paper': 'jkssb-faa',
  'jkssb-wildlife-guard-2026-may-10':  'jkssb-wildlife-guard',
  'jkssb-veterinary-pharmacist-2025':  'jkssb-veterinary-pharmacist',
  'rsmssb-patwari-2025-aug17-shift1-spz8': 'rssb',
  'ssc-cgl-2023-tier-1-all-shifts':    'ssc-cgl',
  'upsc-cse-prelims-2026-gs1':         'upsc-cse',
  'upsc-cse-prelims-2025-gs1':         'upsc-cse',
  'upsc-cse-prelims-2025-gs2':         'upsc-cse',
  'upsc-prelims-2023-gs-paper-1':      'upsc-cse',
}

export const postGuides: Record<string, PostGuideData> = {

  // ─── JKPSI — JKSSB Sub Inspector of Police ────────────────────────────────
  // Source: JKSSB Syllabus Notice No. JKSSB-COE0EXAM(UT)/47/2023-03 dated 26.12.2024
  // Advertisement Notification 02 of 2024 dated 22.11.2024
  jkpsi: {
    title: 'JKSSB Sub Inspector of Police (PSI) — Official Syllabus & Exam Pattern 2024',
    shortName: 'JKPSI',
    tagline: 'Official syllabus for JKSSB Sub Inspector (J&K Police) — Adv. 02/2024. 100 questions, 200 marks, 6 sections. Solved previous year papers included.',

    examSlug: 'jkssb',
    paperSearchTerm: 'psi',

    papers: [
      { slug: 'jkpsi-2017', title: 'JKSSB Sub Inspector of Police — 2017', year: '2017', questions: 120 },
    ],

    conductingBody: 'J&K Services Selection Board (JKSSB)',
    officialWebsite: 'https://jkssb.nic.in',
    examLevel: 'UT Level (Jammu & Kashmir)',
    examMode: 'OMR-based Written Test + Physical Test',

    about: [
      'The JKSSB Sub Inspector of Police (PSI) examination recruits officers for the J&K Police force under the Home Department of J&K UT. Advertisement Notification 02 of 2024 (dated 22 November 2024) announced the current round of JKPSI recruitment. Sub Inspectors serve as frontline supervisory officers in law enforcement, investigation, traffic, and public order management across all districts of Jammu and Kashmir.',
      'The written examination per the 2024 notification consists of 100 objective-type MCQ questions, each carrying 2 marks, for a total of 200 marks. Duration is 120 minutes. Negative marking of 0.5 marks applies per wrong answer. The six sections are: General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, English Comprehension, Mathematical Abilities, and Computer Proficiency.',
      'A key change from earlier JKPSI exams: the 2024 syllabus removes the Law/Legal Knowledge section (IPC, CrPC, Evidence Act) and replaces it with Computer Proficiency (15 questions) and a dedicated Mathematical Abilities section. Candidates who prepared using the 2017 paper should note that Law questions will not appear. The 2017 paper (120 questions, −0.25 marking) remains available on Ministry of Papers as a practice resource for Reasoning, GK, and English sections.',
    ],

    patternNotification: 'Official syllabus per JKSSB Notice dated 26.12.2024 (Advertisement Notification 02/2024). Exam dates not yet announced as of this update.',

    quickFacts: [
      { label: 'Advertisement', value: 'Notification 02/2024' },
      { label: 'Questions', value: '100 MCQs' },
      { label: 'Total Marks', value: '200 (2 per question)' },
      { label: 'Duration', value: '120 minutes' },
      { label: 'Neg. Marking', value: '−0.5 per wrong answer' },
      { label: 'Sections', value: '6 (Reasoning, GK, Quant, English, Maths, Computer)' },
      { label: 'Qualification', value: 'Graduation' },
    ],

    syllabus: [
      {
        subject: 'A. General Intelligence & Reasoning (20 Qs · Graduation level)',
        topics: [
          'Analogies — Semantic, Symbolic/Number, Figural',
          'Classifications — Semantic, Symbolic/Number, Figural',
          'Series — Semantic, Number, Figural',
          'Problem solving, Word building, Coding & Decoding',
          'Numerical Operations, Symbolic Operations, Trends',
          'Space Orientation & Space Visualization',
          'Venn Diagrams, Drawing inferences',
          'Punched hole/pattern folding & unfolding, Figural pattern folding and completion',
          'Indexing, Address matching, Date & city matching',
          'Classification of centre codes/roll numbers',
          'Embedded Figures, Critical thinking, Emotional Intelligence, Social Intelligence',
        ],
      },
      {
        subject: 'B. General Awareness (20 Qs · Graduation level)',
        topics: [
          'History, Culture, Geography — India with special reference to J&K',
          'Indian Economy & General Policy (India and J&K)',
          'Current Affairs — National, International, and J&K-specific',
          'Science & Scientific Research',
          'Sports, Awards & Appointments',
          'People in News',
          'Everyday observations and scientific aspects of environment',
        ],
      },
      {
        subject: 'C. Quantitative Aptitude (15 Qs · 10th standard level)',
        topics: [
          'Whole numbers, Decimals, Fractions, Number sense',
          'Percentage, Ratio & Proportion',
          'Square roots, Averages',
          'Interest — Simple & Compound',
          'Profit and Loss, Discount',
          'Partnership Business, Mixture and Alligation',
          'Time and Distance, Time & Work',
        ],
      },
      {
        subject: 'D. English Comprehension (15 Qs · Graduation level)',
        topics: [
          'Vocabulary — Synonyms, Antonyms, Homonyms, Idioms & Phrases',
          'Grammar — Spot the Error, Fill in the Blanks, Sentence Improvement',
          'Active/Passive Voice, Direct/Indirect Narration',
          'Shuffling of sentence parts, Shuffling of sentences in a passage',
          'Spellings/Detecting mis-spelt words, One-word substitution',
          'Cloze Passage',
          'Comprehension Passages (3+ paragraphs — one simple, others on current affairs)',
        ],
      },
      {
        subject: 'E. Mathematical Abilities (15 Qs · 10th standard level)',
        topics: [
          'Algebra — Basic algebraic identities, Elementary surds, Graphs of Linear Equations',
          'Geometry — Triangles (centres, congruence, similarity), Circles',
          'Mensuration — Triangle, Quadrilaterals, Regular Polygons, Circle, Prism, Cone, Cylinder, Sphere, Hemisphere',
          'Trigonometry — Ratios, Complementary angles, Height & Distances (simple problems)',
          'Statistics & Probability — Histogram, Frequency polygon, Bar-diagram, Pie-chart',
          'Measures of central tendency — Mean, Median, Mode, Standard Deviation',
          'Simple Probability calculations',
        ],
      },
      {
        subject: 'F. Computer Proficiency (15 Qs · 10th standard level)',
        topics: [
          'Computer Basics — CPU, Input/Output devices, Memory organization, Backup devices, PORTs',
          'Windows Explorer, Keyboard shortcuts',
          'Software — Windows OS, MS Word, MS Excel, MS PowerPoint basics',
          'Internet & Email — Web browsing, Downloading/Uploading, Managing email accounts, e-Banking',
          'Networking basics — Devices and protocols',
          'Cyber security — Hacking, Virus, Worms, Trojan, Preventive measures',
        ],
      },
    ],

    examPattern: [
      { section: 'A — General Intelligence & Reasoning', questions: 20, marks: 40, note: '−0.5 per wrong' },
      { section: 'B — General Awareness', questions: 20, marks: 40, note: '−0.5 per wrong' },
      { section: 'C — Quantitative Aptitude', questions: 15, marks: 30, note: '−0.5 per wrong' },
      { section: 'D — English Comprehension', questions: 15, marks: 30, note: '−0.5 per wrong' },
      { section: 'E — Mathematical Abilities', questions: 15, marks: 30, note: '−0.5 per wrong' },
      { section: 'F — Computer Proficiency', questions: 15, marks: 30, note: '−0.5 per wrong' },
      { section: 'Total', questions: 100, marks: 200, isTotal: true },
    ],
    examPatternNote: '2 marks per correct answer. −0.5 per wrong answer. Duration: 120 minutes. Parts A, B, D = Graduation level. Parts C, E, F = 10th standard level.',

    eligibility: {
      age: 'As per Advertisement Notification 02/2024. Age relaxations for SC/ST, OBC, Ex-Servicemen as per J&K Government rules.',
      education: 'Graduation from a recognized university.',
      domicile: 'Valid Domicile Certificate of J&K UT is mandatory.',
    },

    selectionProcess: [
      'Written Examination — 100 MCQs, 200 marks, 120 minutes, OMR-based',
      'Physical Efficiency Test (PET) — Gender-specific standards for running, long jump, high jump',
      'Medical Examination — Eyesight, height, weight, and fitness standards',
      'Document Verification — Educational, Domicile, category certificates',
      'Final Merit List — Based on written exam marks (PET/Medical are qualifying only)',
    ],

    salary: [
      { post: 'Sub Inspector of Police (J&K Police)', level: 'Level 6', payScale: '₹35,400 – ₹1,12,400' },
    ],

    preparationTips: [
      'The 2024 syllabus removes Law/Legal Knowledge (IPC, CrPC) entirely — do not waste time on those topics. Focus instead on Computer Proficiency and Mathematical Abilities which are new additions.',
      'Computer Proficiency (15 Qs, 30 marks) is now a full section. Study MS Office basics, Windows OS, internet/email operations, and cyber security threats — all at Class 10 level, so the questions are direct and factual.',
      'Mathematical Abilities is separate from Quantitative Aptitude. It covers Geometry, Trigonometry, and Statistics (Class 10 level). Revise NCERT Class 9–10 Maths chapters on triangles, circles, trigonometry, and statistics.',
      'General Awareness (20 Qs, 40 marks) is the highest-weight section alongside Reasoning. Cover J&K History, Geography, and current J&K government events for the 6 months before the exam.',
      'Practice using the JKPSI 2017 paper for Reasoning, GK, and English — though the pattern and marks have changed, those sections overlap significantly with the 2024 syllabus and will train your speed and accuracy.',
    ],
  },

  // ─── UPSC CSE ────────────────────────────────────────────────────────────────
  'upsc-cse': {
    title: 'UPSC Civil Services Examination (CSE) — Complete Syllabus & Exam Pattern',
    shortName: 'UPSC CSE',
    tagline: 'UPSC IAS/IPS/IFS exam — Prelims syllabus, GS Paper I & CSAT pattern, Mains overview, and previous year solved papers.',

    examSlug: 'upsc-cse',

    papers: [
      { slug: 'upsc-cse-prelims-2026-gs1',     title: 'UPSC CSE Prelims 2026 — GS Paper I',    year: '2026', questions: 100 },
      { slug: 'upsc-cse-prelims-2025-gs1',     title: 'UPSC CSE Prelims 2025 — GS Paper I',    year: '2025', questions: 100 },
      { slug: 'upsc-cse-prelims-2025-gs2',     title: 'UPSC CSE Prelims 2025 — CSAT Paper II', year: '2025', questions: 80  },
      { slug: 'upsc-prelims-2023-gs-paper-1',  title: 'UPSC Prelims 2023 — GS Paper I',        year: '2023', questions: 100 },
    ],

    conductingBody: 'Union Public Service Commission (UPSC)',
    officialWebsite: 'https://upsc.gov.in',
    examLevel: 'National Level — All India Services',
    examMode: 'Prelims (OMR) + Mains (Descriptive) + Personality Test',

    about: [
      'The UPSC Civil Services Examination (CSE) is India\'s most competitive recruitment exam, conducted annually to select officers for the Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), and approximately 24 other Group A & B Central Services. Roughly 10–14 lakh candidates apply each year for approximately 900–1,100 vacancies.',
      'The exam has three stages: Preliminary Examination (objective, screening), Main Examination (descriptive, 9 papers), and Personality Test (Interview, 275 marks). The Prelims GS Paper I carries 200 marks across 100 questions and determines shortlisting for Mains. CSAT (Paper II) is qualifying at 33% — its marks are not counted for merit.',
      'Previous year Prelims papers are the single best preparation resource. UPSC repeats question patterns on History, Geography, Environment, Economy, and Polity across years. Solved papers from 2023, 2025, and 2026 are available on Ministry of Papers with detailed answer explanations.',
    ],

    quickFacts: [
      { label: 'Prelims GS I', value: '100 Qs · 200 marks · 2 hours' },
      { label: 'CSAT (Paper II)', value: '80 Qs · 200 marks · Qualifying (33%)' },
      { label: 'Neg. Marking', value: '−0.67 per wrong (1/3 of 2)' },
      { label: 'Mains Papers', value: '9 (GS I–IV + Essay + Optional × 2 + Languages)' },
      { label: 'Interview', value: '275 marks' },
      { label: 'Attempts', value: 'General: 6 (till 32), OBC: 9, SC/ST: unlimited till 37' },
      { label: 'Vacancies', value: '~900–1,100 per year' },
    ],

    syllabus: [
      {
        subject: 'History (Ancient, Medieval, Modern & World)',
        topics: [
          'Indus Valley, Vedic Age, Mauryas, Guptas, Medieval Sultanate & Mughal empires',
          'Bhakti & Sufi movements, regional kingdoms',
          'British rule — 1857 Revolt, Indian National Movement, Gandhi era, Partition',
          'World History — French Revolution, World Wars, Cold War, decolonisation',
          'Post-independence India — States reorganisation, Five-Year Plans, major events',
        ],
      },
      {
        subject: 'Indian & World Geography',
        topics: [
          'Physical Geography — Rocks, volcanoes, earthquakes, ocean currents, climate types',
          'India — Rivers, mountain ranges, plateaus, soils, natural vegetation',
          'Agriculture — Cropping seasons, major crops, irrigation systems',
          'Economic Geography — Minerals, industries, transport, ports',
          'Population & Human Geography',
        ],
      },
      {
        subject: 'Indian Polity & Constitution',
        topics: [
          'Constitution — Framing, Preamble, Fundamental Rights, Duties, DPSP',
          'Parliament — Structure, functions, legislative process',
          'Executive — President, PM, Cabinet, State Governors',
          'Judiciary — Supreme Court, High Courts, judicial review',
          'Local self-government, Constitutional and statutory bodies',
          'Elections — ECI, delimitation, model code of conduct',
        ],
      },
      {
        subject: 'Indian Economy',
        topics: [
          'Planning — Five-Year Plans, NITI Aayog, economic reforms 1991',
          'Macro indicators — GDP, GNP, inflation, fiscal deficit, CAD',
          'Budget — Revenue/Capital receipts, Union Budget components',
          'Banking — RBI functions, monetary policy, NBFC, financial inclusion',
          'Agriculture — MSP, crop insurance, PM-KISAN, food security',
          'International trade, WTO, FTAs, Balance of Payments',
        ],
      },
      {
        subject: 'Environment & Ecology',
        topics: [
          'Biodiversity — Hotspots, endemic species, IUCN Red List categories',
          'Protected Areas — National Parks, Wildlife Sanctuaries, Biosphere Reserves',
          'Climate Change — IPCC, Paris Agreement, NDCs, carbon credits',
          'Environmental laws — Environment Protection Act, Forest Conservation Act, Wildlife Act',
          'Conventions — CBD, CITES, Ramsar, UNFCCC',
          'Pollution types, solid waste management, e-waste',
        ],
      },
      {
        subject: 'General Science & Technology',
        topics: [
          'Physics — Basic optics, nuclear energy, space technology, ISRO missions',
          'Chemistry — Elements, compounds, acids/bases at Class 10 level',
          'Biology — Cell, genetics, human diseases, vaccines, biotechnology',
          'IT & Computers — AI/ML basics, cybersecurity, blockchain overview',
          'Defence — Missiles, warships, fighter jets in Indian context',
        ],
      },
      {
        subject: 'Current Affairs',
        topics: [
          'National — Government schemes, Cabinet decisions, appointments',
          'International — Bilateral relations, UN resolutions, summits (G20, SCO, BRICS)',
          'Economy — RBI policy, Union Budget highlights',
          'Awards — Nobel, Padma, Bharat Ratna, Sangeet Natak Akademi',
          'Sports — Olympics, Asian Games, ICC events',
          'Science & Technology — Space missions, defence tests, health discoveries',
        ],
      },
    ],

    examPattern: [
      { section: 'GS Paper I — History, Geography, Polity, Economy, Environment, Science, Current Affairs', questions: 100, marks: 200, note: '−0.67 per wrong' },
      { section: 'CSAT Paper II — Comprehension, Reasoning, Arithmetic (Qualifying)', questions: 80, marks: 200, note: '−0.83 per wrong (qualifying at 33%)' },
    ],
    examPatternNote: 'Duration: 2 hours each. Each question: 2 marks. CSAT is qualifying — Paper I marks alone determine Prelims shortlisting.',

    eligibility: {
      age: 'General: 21–32 years (6 attempts). OBC: up to 35 (9 attempts). SC/ST: up to 37 (unlimited attempts).',
      education: 'Graduation (any discipline) from a recognised university. Final year students can also apply.',
      domicile: 'Indian citizen. No domicile restriction.',
    },

    selectionProcess: [
      'Preliminary Examination — 2 papers (GS I + CSAT), screening only',
      'Main Examination — 9 descriptive papers over 5 days',
      'Personality Test (Interview) — 275 marks, at UPSC Bhavan, New Delhi',
      'Final Merit List — Mains + Interview marks combined',
      'Service & Cadre Allocation — Based on merit and preference',
    ],

    salary: [
      { post: 'IAS/IPS/IFS — Junior Time Scale (Entry)', level: 'Level 10', payScale: '₹56,100 – ₹1,32,000 + allowances' },
      { post: 'IAS — Senior Time Scale', level: 'Level 13', payScale: '₹1,23,100 – ₹2,15,900' },
    ],

    preparationTips: [
      'Solve previous year Prelims papers first — UPSC repeats conceptual question types. The 2023, 2025, and 2026 GS Paper I papers on Ministry of Papers show the exact difficulty and topic mix.',
      'History and Environment together account for 30–40 questions in Prelims. Prioritise these before Polity and Economy.',
      'CSAT is qualifying at 33% — roughly 27 correct out of 80. Most graduates clear it with 2–3 weeks of practice. Don\'t over-invest time here.',
      'Current affairs questions in UPSC are context-heavy, not just headline-based. Read the Hindu or Indian Express daily and link news to static topics (e.g., a new conservation project → biodiversity → Convention on Biological Diversity).',
      'For Mains, start writing answers in 150/250-word formats from day one of preparation. UPSC rewards structured, evidence-backed answers over memorised content.',
    ],
  },

  // ─── SSC CGL ─────────────────────────────────────────────────────────────────
  'ssc-cgl': {
    title: 'SSC CGL — Complete Syllabus, Exam Pattern & Previous Year Papers',
    shortName: 'SSC CGL',
    tagline: 'SSC Combined Graduate Level — Tier I & II syllabus, section-wise exam pattern, previous year papers with solutions.',

    examSlug: 'ssc-cgl',

    papers: [
      { slug: 'ssc-cgl-2023-tier-1-all-shifts', title: 'SSC CGL 2023 Tier I — All Shifts Combined', year: '2023', questions: 100 },
    ],

    conductingBody: 'Staff Selection Commission (SSC)',
    officialWebsite: 'https://ssc.gov.in',
    examLevel: 'National Level — Central Government Posts',
    examMode: 'Computer Based Test (CBT) — Tier I + Tier II',

    about: [
      'The SSC Combined Graduate Level (CGL) Examination is conducted by the Staff Selection Commission for recruitment to Group B and Group C posts in Central Government departments including CBDT (Income Tax), CBIC (Customs & Excise), CAG (Audit), CBI, Ministry of External Affairs, and several others. Over 30 lakh candidates apply annually making it one of India\'s most attempted exams.',
      'SSC CGL has two tiers. Tier I is the qualifying-cum-merit stage — 100 questions, 200 marks, 60 minutes — covering Reasoning, General Awareness, Quantitative Aptitude, and English. Tier II is the main examination for final merit, with Paper I (Math + Reasoning, 390 marks) being compulsory for all posts.',
      'Key posts through SSC CGL include Income Tax Inspector (most preferred), Central Excise Inspector, Preventive Officer (Customs), Sub-Inspector CBI, Assistant Audit Officer, Statistical Investigator Grade II, and Tax Assistant. The 2023 CGL Tier I paper across all shifts is solved and available on Ministry of Papers.',
    ],

    quickFacts: [
      { label: 'Tier I', value: '100 Qs · 200 marks · 60 minutes' },
      { label: 'Neg. Marking (Tier I)', value: '−0.5 per wrong answer' },
      { label: 'Tier II Paper I', value: '3 modules · 390 marks · 2.5 hours' },
      { label: 'Neg. Marking (Tier II)', value: '−1 per wrong (Math/Reasoning), −0.25 (English)' },
      { label: 'Top Post', value: 'Income Tax Inspector, CBI Sub-Inspector' },
      { label: 'Attempts', value: 'No limit (subject to age: 18–27 for most posts)' },
    ],

    syllabus: [
      {
        subject: 'General Intelligence & Reasoning (Tier I: 25 Qs)',
        topics: [
          'Analogies — Verbal, Non-Verbal, Figural',
          'Series — Number, Letter, Mixed, Figural',
          'Classification, Coding-Decoding, Blood Relations',
          'Direction & Distance, Ranking, Arrangement',
          'Syllogism, Statement-Conclusion, Input-Output',
          'Mirror/Water Images, Paper Folding, Embedded Figures, Venn Diagrams',
          'Matrix, Word Formation, Cube & Dice',
        ],
      },
      {
        subject: 'General Awareness (Tier I: 25 Qs)',
        topics: [
          'History — Ancient/Medieval/Modern India, Freedom Movement',
          'Geography — Physical, Economic, Political (India & World)',
          'Polity — Constitution, Parliament, Judiciary, Schemes',
          'Economy — Budget, RBI, Banking, GDP, Inflation',
          'Science — Physics, Chemistry, Biology (Class 10 level)',
          'Current Affairs — Last 6 months, National & International',
          'Sports, Awards, Books & Authors, Important Days',
          'Static GK — HQs of organisations, national symbols, capitals',
        ],
      },
      {
        subject: 'Quantitative Aptitude (Tier I: 25 Qs)',
        topics: [
          'Number System — LCM/HCF, Simplification, Surds & Indices',
          'Arithmetic — Percentage, Profit & Loss, Discount, SI & CI',
          'Ratio & Proportion, Mixture & Alligation, Partnership',
          'Time-Speed-Distance, Time & Work, Pipes & Cisterns',
          'Mensuration — 2D & 3D figures (area, volume, surface area)',
          'Data Interpretation — Tables, Bar graphs, Pie charts, Line graphs',
          'Algebra — Basic equations, Polynomial',
          'Geometry & Trigonometry — Triangle properties, Circle, Heights & Distances',
        ],
      },
      {
        subject: 'English Comprehension (Tier I: 25 Qs)',
        topics: [
          'Reading Comprehension passages (2–3 per paper)',
          'Cloze Test, Fill in the Blanks',
          'Synonyms, Antonyms, One-Word Substitution',
          'Idioms & Phrases, Phrasal Verbs',
          'Sentence Correction, Spotting Errors',
          'Active/Passive Voice, Direct/Indirect Narration',
          'Para Jumbles, Sentence Completion',
        ],
      },
      {
        subject: 'Tier II — Paper I: Mathematical Abilities + Reasoning (290 Qs · 290 marks)',
        topics: [
          'Module I: Mathematical Abilities — advanced Arithmetic, Algebra, Geometry, Mensuration, Trigonometry, Statistics',
          'Module II: Reasoning & General Intelligence — advanced puzzles, critical thinking, data sufficiency',
          'Module III: English Language (compulsory for JSO/AAO posts) — Grammar, Vocabulary, Comprehension',
        ],
      },
    ],

    examPattern: [
      { section: 'Tier I — Reasoning & General Intelligence', questions: 25, marks: 50, note: '−0.5 per wrong' },
      { section: 'Tier I — General Awareness', questions: 25, marks: 50, note: '−0.5 per wrong' },
      { section: 'Tier I — Quantitative Aptitude', questions: 25, marks: 50, note: '−0.5 per wrong' },
      { section: 'Tier I — English Language', questions: 25, marks: 50, note: '−0.5 per wrong' },
      { section: 'Tier I Total', questions: 100, marks: 200, isTotal: true },
    ],
    examPatternNote: 'Tier I: 60 minutes. Tier II Paper I: 3 modules, 390 marks, 2.5 hours (−1 per wrong in Maths, −0.25 in English).',

    eligibility: {
      age: '18–27 years for most posts (Inspector posts: 18–30). Relaxations: OBC +3, SC/ST +5, PwD +10, Ex-SM +3.',
      education: 'Graduation from a recognised university. BCom/Statistics preferred for Accounts/Statistical Investigator posts.',
      domicile: 'Indian citizen.',
    },

    selectionProcess: [
      'Tier I — 100 MCQs, 60 minutes, screening + partial merit',
      'Tier II — Computer Based Test, multiple modules, 390+ marks',
      'Computer Proficiency Test / Skill Test — for specific posts (DEO, Data Entry)',
      'Document Verification',
      'Final Merit List — Tier I + Tier II combined',
    ],

    salary: [
      { post: 'Income Tax Inspector / Central Excise Inspector', level: 'Level 7', payScale: '₹44,900 – ₹1,42,400' },
      { post: 'Sub-Inspector CBI / Preventive Officer', level: 'Level 7', payScale: '₹44,900 – ₹1,42,400' },
      { post: 'Tax Assistant / Auditor', level: 'Level 5–6', payScale: '₹29,200 – ₹92,300' },
    ],

    preparationTips: [
      'Tier I is won or lost on speed. Aim for 90 seconds per question across all four sections. Reasoning and English are the fastest sections — target 20+ correct in each.',
      'General Awareness is pure memory and current affairs. Revise static GK (HQs, appointments, national symbols) and cover the last 6 months of current events before the exam.',
      'Quantitative Aptitude for Tier I is only 25 questions — focus on Arithmetic (Percentage, Profit & Loss, SI/CI, Time-Work) since these are the most frequent. Skip advanced Geometry for Tier I.',
      'The SSC CGL 2023 Tier I paper on Ministry of Papers contains questions from all actual shifts. Use it as a timed mock to benchmark your speed and accuracy.',
      'For Tier II, the Maths module is the differentiator. Start Tier II prep with Algebra, Geometry (triangles, circles), and Data Interpretation since these carry the most weight.',
    ],
  },

  // ─── BPSC CCE ────────────────────────────────────────────────────────────────
  bpsc: {
    title: 'BPSC Combined Competitive Examination (CCE) — Syllabus & Exam Pattern',
    shortName: 'BPSC CCE',
    tagline: 'Bihar Public Service Commission CCE — Prelims syllabus, 150 GS questions, no negative marking. Previous year papers with solutions.',

    examSlug: 'bpsc',

    papers: [
      { slug: 'bpsc-70th-cce-prelims-2024-gs', title: 'BPSC 70th CCE Prelims 2024 — General Studies', year: '2024', questions: 150 },
    ],

    conductingBody: 'Bihar Public Service Commission (BPSC)',
    officialWebsite: 'https://bpsc.bih.nic.in',
    examLevel: 'State Level — Bihar State Services',
    examMode: 'Prelims (OMR/CBT) + Mains (Descriptive) + Interview',

    about: [
      'The BPSC Combined Competitive Examination (CCE) recruits officers for Bihar state services including the Bihar Administrative Service (BAS), Bihar Police Service (BPS), Bihar Finance Service, Bihar Education Service, and several other Group A, B, and C cadres. It is Bihar\'s equivalent of the UPSC Civil Services and is conducted in three stages.',
      'The BPSC Prelims is an objective-type test of 150 General Studies questions with no negative marking — a significant advantage over UPSC and SSC. Questions cover History with strong emphasis on Bihar\'s history, Indian Geography, Polity, Economy, General Science, and Current Affairs including Bihar-specific events.',
      'The 70th BPSC CCE Prelims (2024) had 150 questions with notable emphasis on Bihar History (Nalanda, Vikramshila, Champaran Satyagraha), Indian Independence Movement, and recent Bihar government initiatives. The full solved paper is on Ministry of Papers.',
    ],

    quickFacts: [
      { label: 'Prelims', value: '150 Qs · 150 marks · 2 hours' },
      { label: 'Neg. Marking', value: 'None in Prelims' },
      { label: 'Mains', value: 'Descriptive — GS I, II, III + Optional + Hindi' },
      { label: 'Interview', value: '120 marks' },
      { label: 'Age', value: '20–37 years (General); relaxations for SC/ST/OBC/Women' },
      { label: 'Vacancies', value: '200–600 per CCE cycle' },
    ],

    syllabus: [
      {
        subject: 'History — Indian & Bihar',
        topics: [
          'Ancient Bihar — Magadha Empire, Pataliputra, Nalanda, Vikramshila, Bodh Gaya',
          'Medieval Bihar — Bhakti Movement (Kabir, Guru Nanak), Mughals in Bihar',
          'Modern India — 1857, British policy, Economic drain, Partition of Bengal',
          'Freedom Movement — Champaran Satyagraha (1917), Non-Cooperation, Quit India',
          'Bihar-specific leaders — Rajendra Prasad, JP Narayan, Loknayak Jai Prakash',
          'Post-independence — States reorganisation, Emergency (1975), Bihar floods',
        ],
      },
      {
        subject: 'Indian & Bihar Geography',
        topics: [
          'Physical Geography — Himalayan ranges, Indo-Gangetic Plain, Deccan Plateau',
          'Bihar Geography — Rivers (Ganga, Son, Kosi, Gandak), districts, flood-prone areas',
          'Climate, soils, natural vegetation of Bihar',
          'Agriculture — Major crops of Bihar (paddy, wheat, maize, litchi)',
          'Minerals and industries in Bihar & Jharkhand',
        ],
      },
      {
        subject: 'Indian Polity & Constitution',
        topics: [
          'Constitution — Preamble, Fundamental Rights, Directive Principles',
          'Parliament and State Legislature',
          'Federalism, Centre-State relations, Governor role in Bihar',
          'Panchayati Raj and Urban Local Bodies in Bihar',
          'Important constitutional amendments',
        ],
      },
      {
        subject: 'Indian Economy & Bihar Development',
        topics: [
          'National income, GDP, Five-Year Plans, NITI Aayog',
          'Bihar Economy — Agriculture, MSMEs, infrastructure projects (NH, bridges)',
          'Bihar government schemes — Mukhyamantri Bal Sahayata Yojana, Har Ghar Bijli',
          'Banking and financial inclusion in Bihar',
          'Poverty, MGNREGS, Jan Dhan, Direct Benefit Transfer',
        ],
      },
      {
        subject: 'General Science',
        topics: [
          'Physics — Motion, Force, Optics, Electricity (Class 10 level)',
          'Chemistry — Acids, Bases, Salts, Metals & Non-metals, Carbon compounds',
          'Biology — Cell, Life processes, Reproduction, Heredity, Human diseases',
          'Science & Technology — ISRO missions, nuclear energy, health technology',
        ],
      },
      {
        subject: 'Current Affairs (Bihar, National, International)',
        topics: [
          'Bihar — State Cabinet decisions, new schemes, appointments, Bihar Budget',
          'National — Union Budget, government flagship schemes, science missions',
          'International — Bilateral relations, UN, major summits, conflict zones',
          'Sports, awards, important days, personality in news',
        ],
      },
    ],

    examPattern: [
      { section: 'General Studies — History, Geography, Polity, Economy, Science, Current Affairs', questions: 150, marks: 150, note: 'No negative marking' },
    ],
    examPatternNote: 'Duration: 2 hours. No negative marking in Prelims. Mains is descriptive (GS I–III + Optional + Hindi qualifying paper). Interview: 120 marks.',

    eligibility: {
      age: 'General: 20–37 years. Female (General/BC/EBC): up to 40. SC/ST (Male): up to 42. SC/ST (Female) & PwD: up to 47.',
      education: 'Graduation from a recognised university.',
      domicile: 'Domicile of Bihar is generally required.',
    },

    selectionProcess: [
      'Preliminary Examination — 150 objective questions, no negative marking',
      'Main Examination — Descriptive papers (Hindi qualifying + GS I–III + Optional)',
      'Personality Test (Interview) — 120 marks',
      'Final Merit — Mains + Interview combined',
    ],

    salary: [
      { post: 'Bihar Administrative Service (BAS) — Grade I', level: 'Level 10+', payScale: '₹53,100 – ₹1,67,800' },
      { post: 'Bihar Police Service / Finance Service', level: 'Level 9–10', payScale: '₹44,900 – ₹1,42,400' },
    ],

    preparationTips: [
      'No negative marking means you should attempt all 150 questions — never leave a question blank. Intelligent guessing on Bihar-related questions you partially know can add 5–10 marks.',
      'Bihar History, Culture, and Geography together account for 20–30 questions every year. Focus on Nalanda, Champaran, JP Movement, Kosi-Ganga river system, and Bihar\'s tribal communities.',
      'Use the BPSC 70th CCE 2024 paper on Ministry of Papers as a model — it shows exactly how many questions come from each topic area in a recent exam.',
      'Current Affairs for BPSC requires Bihar-specific awareness. Follow Dainik Jagran or Hindustan (Bihar edition) for state-level news alongside national publications.',
      'Start Mains preparation from the beginning even while doing Prelims — the overlap is high, and descriptive writing practice improves your Prelims GS comprehension too.',
    ],
  },

  // ─── IBPS PO ─────────────────────────────────────────────────────────────────
  'ibps-po': {
    title: 'IBPS PO — Complete Syllabus & Exam Pattern 2025',
    shortName: 'IBPS PO',
    tagline: 'IBPS Probationary Officer exam — Prelims & Mains syllabus, section-wise pattern, Banking Awareness topics, previous year papers.',

    examSlug: 'ibps-po',

    papers: [
      { slug: 'ibps-po-pre-2025-aug-23-shift-1', title: 'IBPS PO Pre 2025 — Memory Based (23 Aug, Shift 1)', year: '2025', questions: 100 },
    ],

    conductingBody: 'Institute of Banking Personnel Selection (IBPS)',
    officialWebsite: 'https://ibps.in',
    examLevel: 'National Level — Public Sector Banks',
    examMode: 'Computer Based Test — Prelims + Mains + Interview',

    about: [
      'The IBPS Probationary Officer (PO) / Management Trainee examination recruits Probationary Officers for 11 participating Public Sector Banks including Punjab National Bank, Bank of Baroda, Canara Bank, Union Bank of India, Bank of India, and others. It is one of the most sought-after exams for commerce and non-commerce graduates alike.',
      'IBPS PO has two examination stages plus an interview. Prelims (100 questions, 100 marks, 60 minutes) covers English Language, Quantitative Aptitude, and Reasoning Ability. Each section has a sectional time limit of 20 minutes. Mains (155 objective + 2 descriptive, 225 marks total) adds Data Analysis & Interpretation and Banking/Economy Awareness.',
      'The final selection uses 80:20 weightage between Mains and Interview. IBPS PO 2025 Prelims memory-based paper (23rd August, Shift 1) with complete solutions is available on Ministry of Papers.',
    ],

    quickFacts: [
      { label: 'Prelims', value: '100 Qs · 100 marks · 60 min (20 min/section)' },
      { label: 'Prelims Neg. Marking', value: '−0.25 per wrong' },
      { label: 'Mains Objective', value: '155 Qs · 200 marks · 3 hours' },
      { label: 'Mains Descriptive', value: 'Letter + Essay · 25 marks · 30 min' },
      { label: 'Interview', value: '100 marks (final: 80% Mains + 20% Interview)' },
      { label: 'Starting Salary', value: '~₹52,000–₹55,000/month (CTC ₹7–8 LPA)' },
      { label: 'Age', value: '20–30 years (OBC +3, SC/ST +5)' },
    ],

    syllabus: [
      {
        subject: 'English Language (Prelims: 30 Qs · Mains: 35 Qs)',
        topics: [
          'Reading Comprehension — 2–3 passages, 10–15 questions total',
          'Cloze Test — 5–10 blanks in a paragraph',
          'Error Detection / Sentence Correction',
          'Fill in the Blanks — Vocabulary-based',
          'Para Jumbles — Rearranging sentences',
          'Sentence Connectors, Column Matching, Odd Sentence Out',
          'Mains only: Descriptive — Formal Letter Writing, Essay (250 words)',
        ],
      },
      {
        subject: 'Quantitative Aptitude (Prelims: 35 Qs)',
        topics: [
          'Number Series — Find missing/wrong term',
          'Simplification & Approximation',
          'Data Interpretation — Table, Bar, Line, Pie, Radar (5 Qs per set)',
          'Quadratic Equations',
          'Arithmetic — Percentage, Profit & Loss, SI/CI, Ratio, Ages, Partnership',
          'Time-Speed-Distance, Time & Work, Pipes & Cisterns',
          'Probability, Permutation & Combination (advanced Mains level)',
        ],
      },
      {
        subject: 'Reasoning Ability (Prelims: 35 Qs)',
        topics: [
          'Puzzles — Circular/Linear Seating Arrangement (10–15 Qs per sitting)',
          'Directions & Distances, Blood Relations',
          'Coding-Decoding (new pattern — sentence-based)',
          'Syllogisms, Inequalities',
          'Data Sufficiency, Input-Output',
          'Order-Ranking, Alphanumeric Series',
          'Mains: Critical Reasoning, Logical Reasoning additions',
        ],
      },
      {
        subject: 'Data Analysis & Interpretation (Mains: 35 Qs · 60 marks)',
        topics: [
          'Advanced DI — Caselet, Mixed graphs, Missing data tables',
          'Quantity I vs Quantity II comparison',
          'Data Sufficiency (quantitative)',
          'Advanced Arithmetic problems with DI context',
        ],
      },
      {
        subject: 'General/Economy/Banking Awareness (Mains: 40 Qs · 40 marks)',
        topics: [
          'Banking System — RBI, functions, monetary policy tools (Repo, Reverse Repo, CRR, SLR)',
          'Financial Institutions — SEBI, IRDAI, NABARD, SIDBI, NHB',
          'Government Schemes — PM Jan Dhan, Mudra, Atal Pension, PMSBY, PMJJBY',
          'International Banking — IMF, World Bank, ADB, NDB, Basel norms',
          'Indian Economy — GDP, Inflation, Union Budget headlines, 5-year plan legacy',
          'Current Affairs — Last 6 months appointments, mergers, national/international',
          'Static Banking GK — Taglines, HQs, founding years of major banks',
        ],
      },
    ],

    examPattern: [
      { section: 'Prelims — English Language', questions: 30, marks: 30, note: '−0.25 · 20 min' },
      { section: 'Prelims — Quantitative Aptitude', questions: 35, marks: 35, note: '−0.25 · 20 min' },
      { section: 'Prelims — Reasoning Ability', questions: 35, marks: 35, note: '−0.25 · 20 min' },
      { section: 'Prelims Total', questions: 100, marks: 100, isTotal: true },
    ],
    examPatternNote: 'Prelims: 60 min total, 20 min per section. Mains: 155 MCQs (200 marks, 3 hr) + 2 Descriptive (25 marks, 30 min). Interview: 100 marks.',

    eligibility: {
      age: '20–30 years. OBC: +3 years. SC/ST: +5 years. PwD: +10 years. Ex-Servicemen: +5 years.',
      education: 'Graduation (any discipline) from a recognised university.',
      domicile: 'Indian citizen.',
    },

    selectionProcess: [
      'Preliminary Examination — 100 MCQs, 60 min, sectional time limits',
      'Main Examination — 155 objective + 2 descriptive questions',
      'Interview — 100 marks, conducted at bank-specific centres',
      'Final Merit List — 80% Mains + 20% Interview',
      'Bank & Centre Allotment — Provisional allotment based on preference and merit',
    ],

    salary: [
      { post: 'Probationary Officer / Management Trainee (JMGS I)', level: 'JMGS I', payScale: '₹36,000 – ₹63,840 basic + DA + HRA + allowances (~₹52,000–₹55,000 gross/month)' },
    ],

    preparationTips: [
      'Puzzles and Seating Arrangements alone account for 15–20 questions in Prelims Reasoning. Practice 5 puzzles daily — they are the single biggest differentiator between candidates who clear cutoffs and those who don\'t.',
      'For Quantitative Aptitude, DI (Data Interpretation) is the highest-weight topic in both Prelims and Mains. Solve one DI set daily — the calculation speed and pattern recognition this builds is crucial.',
      'Banking Awareness in Mains is mostly static + last 6 months current affairs. Memorise taglines and HQs of all PSBs, RBI key rates, and the last 3 months of banking news. This section separates toppers.',
      'Use the IBPS PO 2025 memory-based Prelims paper on Ministry of Papers as a timed mock. Compare your section-wise performance against the typical cutoffs (English ~7–8, QA ~8–9, Reasoning ~10–11).',
      'The descriptive paper in Mains (Letter + Essay) is often ignored but can swing 5–8 marks. Practice writing a formal letter and 250-word essay weekly from Month 2 of your preparation.',
    ],
  },

  // ─── JKPSC ───────────────────────────────────────────────────────────────────
  jkpsc: {
    title: 'JKPSC JKCCE — Official Syllabus, Exam Pattern & Previous Year Papers',
    shortName: 'JKPSC',
    tagline: 'JKPSC Combined Competitive Examination (JKCCE) — GS Paper I & CSAT syllabus, Prelims pattern, and solved papers for J&K Gazetted Officer recruitment.',

    examSlug: 'jkpsc',

    papers: [
      { slug: 'jkpsc-jkcce-prelims-2025-gs1-set-b', title: 'JKCCE Prelims 2025 — GS Paper I (Set B)', year: '2025', questions: 100 },
    ],

    conductingBody: 'Jammu & Kashmir Public Service Commission (JKPSC)',
    officialWebsite: 'https://jkpsc.nic.in',
    examLevel: 'UT Level — J&K Gazetted Officers (Group A & B)',
    examMode: 'Prelims (OMR) + Mains (Descriptive) + Personality Test',

    about: [
      'The JKPSC Combined Competitive Examination (JKCCE) is J&K UT\'s premier exam for recruitment to Gazetted Officer posts — J&K Administrative Service (JKAS), J&K Police Service (JKPS), J&K Finance Service, J&K Forest Service, J&K Accounts Service, and others. It is widely regarded as the J&K equivalent of the UPSC Civil Services Examination.',
      'The Prelims consists of two objective papers: GS Paper I (100 questions, 200 marks) and CSAT Paper II (80 questions, 200 marks). Both have −0.67 negative marking. CSAT is qualifying at 33% — only GS Paper I marks determine who advances to Mains. The 2025 Prelims was held on 11 May 2025.',
      'GS Paper I has strong J&K-specific emphasis — J&K History (Dogra rule, 1947 accession, reorganisation as UT), J&K Geography, J&K Administration, J&K Economy, and J&K current affairs consistently account for 25–35 questions alongside standard national GS topics. The 2025 Set B paper (100 questions, solved) is on Ministry of Papers.',
    ],

    quickFacts: [
      { label: 'GS Paper I', value: '100 Qs · 200 marks · 2 hours' },
      { label: 'CSAT Paper II', value: '80 Qs · 200 marks · Qualifying (33%)' },
      { label: 'Neg. Marking', value: '−0.67 per wrong (in both papers)' },
      { label: 'Typical Prelims Cutoff', value: '~90–110 marks out of 200 (General)' },
      { label: 'Mains Papers', value: 'Language (qualifying) + Essay + GS I–III + Optional' },
      { label: 'Interview', value: '200 marks' },
      { label: 'Domicile', value: 'J&K Domicile Certificate mandatory' },
    ],

    syllabus: [
      {
        subject: 'J&K History, Culture & Society',
        topics: [
          'Ancient J&K — Karkota, Utpala, and Lohara dynasties; Kashmir Shaivism; Buddhist heritage',
          'Medieval J&K — Shahmir Sultanate, Chak rulers, Mughal suzerainty',
          'Modern J&K — Dogra rule under Gulab Singh, Maharaja Hari Singh, 1947 Instrument of Accession',
          'Post-1947 — Article 370, J&K State, 2019 reorganisation as UT, Ladakh as separate UT',
          'Culture — Kashmiri cuisine, handicrafts (Pashmina, Kani shawl, walnut wood carving), festivals',
          'Notable personalities — Sheikh Abdullah, Bakshi Ghulam Mohammad, Mufti Mohammad Sayeed',
        ],
      },
      {
        subject: 'J&K Geography & Environment',
        topics: [
          'Physical features — Himalayas (Pir Panjal, Zanskar ranges), Kashmir Valley, Jammu plains, Ladakh plateau',
          'Rivers — Jhelum, Chenab, Tawi, Ravi, Indus and their tributaries',
          'Passes — Banihal, Zoji La, Rohtang, Sinthan Top, Peer Ki Gali',
          'Lakes — Dal, Wular, Manasbal, Pangong Tso, Tsomoriri',
          'Districts — All 20 districts of J&K UT, divisional headquarters',
          'Wildlife — Dachigam NP (Hangul), Kishtwar NP, Salim Ali NP, Overa-Aru WLS',
          'Major projects — Baglihar Dam, Uri project, NHPC projects',
        ],
      },
      {
        subject: 'Indian History, Polity & Constitution',
        topics: [
          'Freedom Movement — 1857 to Independence, major events and leaders',
          'Constitution — Fundamental Rights, DPSP, Preamble, Emergency provisions',
          'Parliament, Executive, Judiciary structure and functions',
          'J&K-specific Polity — Lt. Governor office, J&K Legislative Assembly, J&K courts',
          'Panchayati Raj in J&K',
        ],
      },
      {
        subject: 'Indian & J&K Economy',
        topics: [
          'Indian Economy basics — GDP, inflation, fiscal policy, RBI, banking',
          'J&K Economy — Horticulture (apple, saffron, walnut), tourism, handicrafts',
          'Central schemes in J&K — PM Awas, PM Gram Sadak, JKRERA, PMDP',
          'J&K Industrial Policy, IT Policy, investment summits',
        ],
      },
      {
        subject: 'General Science, Environment & Current Affairs',
        topics: [
          'Physics, Chemistry, Biology at graduation level conceptual questions',
          'Environmental issues — J&K-specific (Dal Lake pollution, deforestation, glacial retreat)',
          'Science & Technology — Space missions (ISRO), defence, health',
          'National & International Current Affairs — last 12 months',
          'J&K Current Affairs — appointments, orders, schemes, judgements',
        ],
      },
      {
        subject: 'CSAT Paper II (Qualifying — 33% needed)',
        topics: [
          'Reading Comprehension — 2–3 passages, 20–25 questions',
          'Logical Reasoning & Analytical Ability',
          'Decision Making & Problem Solving',
          'Basic Arithmetic — Percentage, Ratio, Time-Work (Class 10 level)',
          'Data Interpretation — Tables and graphs',
          'English Language Comprehension',
        ],
      },
    ],

    examPattern: [
      { section: 'GS Paper I — J&K GK, History, Geography, Polity, Economy, Science, Current Affairs', questions: 100, marks: 200, note: '−0.67 per wrong' },
      { section: 'CSAT Paper II — Comprehension, Reasoning, Arithmetic (Qualifying at 33%)', questions: 80, marks: 200, note: '−0.67 per wrong' },
    ],
    examPatternNote: '2 marks per question. Duration: 2 hours each. Only GS Paper I marks count for Prelims merit list. CSAT qualifying at 33% = 66 marks out of 200.',

    eligibility: {
      age: '21–40 years (General). Relaxations for SC/ST, OBC, PwD, Ex-Servicemen per J&K Government rules.',
      education: 'Graduation (any discipline) from a recognised university.',
      domicile: 'Domicile Certificate of J&K UT is mandatory for all posts.',
    },

    selectionProcess: [
      'Preliminary Examination — GS Paper I (merit) + CSAT Paper II (qualifying)',
      'Main Examination — Language paper (qualifying) + Essay + GS Papers I–III + Optional Subject',
      'Personality Test — 200 marks, JKPSC Headquarters',
      'Final Merit List — Mains + Interview marks combined',
    ],

    salary: [
      { post: 'J&K Administrative Service (JKAS)', level: 'Level 10–14', payScale: '₹56,100 – ₹1,77,500' },
      { post: 'J&K Police Service / Forest Service', level: 'Level 10', payScale: '₹56,100 – ₹1,32,000' },
    ],

    preparationTips: [
      'J&K-specific GK is the biggest differentiator in JKCCE. Aspirants from outside J&K often score poorly here. Study J&K History thoroughly — especially the 1947 Accession, 1953 Sheikh Abdullah dismissal, 1987 elections, and 2019 reorganisation.',
      'Solve the 2025 JKCCE Prelims Paper I (Set B) on Ministry of Papers under timed conditions. Note which topics you\'re weak on — J&K Geography (passes, rivers) and J&K current affairs are commonly underestimated.',
      'CSAT needs only 33% (66 marks out of 200). Most graduates can clear this with 2–3 weeks of targeted practice on comprehension and basic arithmetic. Don\'t ignore it — a 33% fail is instant disqualification.',
      'For Mains, the Optional Subject paper carries significant weight. Choose an optional you\'ve studied at graduation level — it saves 3–4 months of new learning.',
      'Current Affairs for JKPSC requires both national and J&K-specific awareness. Follow daily J&K news alongside national publications for at least 3 months before the exam.',
    ],
  },

  // ─── RSSB (Rajasthan Patwari) ────────────────────────────────────────────────
  rssb: {
    title: 'RSSB Patwari — Official Syllabus & Exam Pattern 2025',
    shortName: 'RSSB Patwari',
    tagline: 'Rajasthan Staff Selection Board Patwari exam — 150 questions, 300 marks, −0.67 negative marking. Official syllabus, Rajasthan GK topics, and solved 2025 paper.',

    examSlug: 'rssb',

    papers: [
      { slug: 'rsmssb-patwari-2025-aug17-shift1-spz8', title: 'RSSB Patwari 2025 (17 Aug, Shift 1 — SPZ8)', year: '2025', questions: 150 },
    ],

    conductingBody: 'Rajasthan Staff Selection Board (RSSB / RSMSSB)',
    officialWebsite: 'https://rssb.rajasthan.gov.in',
    examLevel: 'State Level — Rajasthan Revenue Department',
    examMode: 'OMR-based Written Test',

    about: [
      'The Rajasthan Staff Selection Board (RSSB), formerly known as RSMSSB, conducts the Patwari examination to recruit village-level revenue officers in the Revenue Department of Rajasthan. Patwaris maintain land records, process mutations, assist in land acquisition, and conduct Girdawari (crop inspection) in their assigned villages.',
      'The 2025 RSSB Patwari examination consisted of 150 objective MCQ questions carrying 2 marks each (300 total marks) with −0.67 negative marking per wrong answer, completed in 3 hours. The syllabus covers Rajasthan History, Culture, Geography, Rajasthan Revenue Laws, General Knowledge, Arithmetic, Reasoning, and Hindi Language.',
      'Rajasthan-specific GK dominates the paper — typically 40–50 questions on Rajasthan\'s forts, festivals, art forms, wildlife, rivers, tribal communities, and state government schemes. The 2025 Patwari Shift 1 (SPZ8) paper with full solutions is on Ministry of Papers.',
    ],

    quickFacts: [
      { label: 'Questions', value: '150 MCQs' },
      { label: 'Total Marks', value: '300 (2 marks each)' },
      { label: 'Duration', value: '3 hours (180 minutes)' },
      { label: 'Neg. Marking', value: '−0.67 per wrong answer' },
      { label: 'Age', value: '18–40 years (with relaxations)' },
      { label: 'Qualification', value: 'Graduation' },
    ],

    syllabus: [
      {
        subject: 'Rajasthan History, Culture & Art (40–50 Qs)',
        topics: [
          'Ancient Rajasthan — Kalibangan, Ahar, Bairath cultures; Mauryan influence',
          'Medieval Rajasthan — Rajput kingdoms (Mewar, Marwar, Amber, Jaipur), battles of Haldighati, Khanwa',
          'Bhakti Movement — Mirabai, Dadu Dayal, Kabir influence in Rajasthan',
          'Modern Rajasthan — Praja Mandal Movement, merger of princely states, formation of Rajasthan state',
          'Art & Architecture — Forts (Amber, Mehrangarh, Chittorgarh, Kumbhalgarh, Jaisalmer), step-wells (Chand Baori)',
          'Folk Art — Phad painting, Blue Pottery (Jaipur), Thewa art (Pratapgarh), Molela clay craft, Gond art',
          'Folk Music & Dance — Maand, Padharo Mhare Des (Mand), Ghoomar, Kalbelia (UNESCO), Chari dance',
          'Festivals — Pushkar Fair, Teej, Gangaur, Desert Festival (Jaisalmer), Elephant Festival',
          'Languages — Rajasthani dialects (Marwari, Mewari, Dhundhari, Hadoti)',
        ],
      },
      {
        subject: 'Rajasthan Geography',
        topics: [
          'Physiographic regions — Aravalli Range (highest peak: Guru Shikhar), Thar Desert, Eastern Plains, Hadoti Plateau',
          'Rivers — Luni, Banas, Chambal, Mahi, Ghaggar; perennial vs seasonal',
          'Lakes — Sambhar (salt lake), Pushkar, Nakki, Siliserh, Fateh Sagar, Pichola',
          'Wildlife — Ranthambore NP (Tigers), Sariska NP, Keoladeo (Bharatpur), Tal Chhapar (Blackbuck), Desert NP (Great Indian Bustard)',
          'Districts & Divisional Headquarters — all 33/50 districts (post-2023 reorganisation)',
          'Agriculture — Bajra, Jowar, Wheat, Mustard; irrigation projects (Indira Gandhi Canal)',
          'Minerals — Marble (Makrana), Zinc (Zawar), Copper (Khetri), Lignite, Gypsum',
        ],
      },
      {
        subject: 'Rajasthan Revenue Laws',
        topics: [
          'Rajasthan Land Revenue Act, 1956 — Key provisions, revenue hierarchy',
          'Rajasthan Tenancy Act, 1955 — Khatedari rights, tenancy classes',
          'Rajasthan Colonisation Act, 1954 — Colonised land allocation',
          'Land records — Khasra, Khatauni, Khatoni, Girdawari, Jamabandi',
          'Mutation (Nakal/Intkal) process — types and procedures',
          'Role of Patwari — daily register, crop inspection, boundary disputes',
          'Revenue hierarchy — Patwari → Girdawar → Tehsildar → SDO → Collector',
        ],
      },
      {
        subject: 'General Knowledge & Current Affairs',
        topics: [
          'National GK — Indian History, Polity, Economy, Science basics',
          'Rajasthan Current Affairs — State Cabinet decisions, new schemes, appointments',
          'National Current Affairs — last 6 months',
          'Central & State Government Schemes — PM Awas, Mukhyamantri Chiranjeevi, Jan Aadhar',
        ],
      },
      {
        subject: 'Arithmetic & Reasoning',
        topics: [
          'Number System, Percentage, Profit & Loss, SI & CI, Ratio & Proportion',
          'Time-Speed-Distance, Time & Work',
          'Mensuration — Area, Volume of basic shapes',
          'Reasoning — Series, Analogy, Coding-Decoding, Direction Sense, Blood Relations',
        ],
      },
      {
        subject: 'Hindi Language',
        topics: [
          'Rajasthani & Hindi grammar — Sandhi, Samas, Ling, Vachan',
          'Vocabulary — Synonyms (Paryayvachi), Antonyms (Vilom), Muhavare',
          'Sentence correction, Fill in the blanks',
          'One-word substitution, passage reading',
        ],
      },
    ],

    examPattern: [
      { section: 'Rajasthan History, Culture, Art & Geography', questions: '40–50', marks: '80–100', note: '−0.67 per wrong' },
      { section: 'Rajasthan Revenue Laws', questions: '20–25', marks: '40–50', note: '−0.67 per wrong' },
      { section: 'General Knowledge & Current Affairs', questions: '20–25', marks: '40–50', note: '−0.67 per wrong' },
      { section: 'Arithmetic & Reasoning', questions: '30–35', marks: '60–70', note: '−0.67 per wrong' },
      { section: 'Hindi Language', questions: '15–20', marks: '30–40', note: '−0.67 per wrong' },
      { section: 'Total', questions: 150, marks: 300, isTotal: true },
    ],
    examPatternNote: '2 marks per correct answer. −0.67 per wrong. Duration: 3 hours.',

    eligibility: {
      age: '18–40 years. Relaxations for SC/ST, OBC, PwD, Ex-Servicemen, Widow/Divorcee as per Rajasthan Government rules.',
      education: 'Graduation from a recognised university.',
      domicile: 'Domicile of Rajasthan required.',
    },

    selectionProcess: [
      'Written Examination — 150 MCQs, 300 marks, 3 hours, OMR-based',
      'Document Verification',
      'Final Merit List — Written exam marks only (no interview)',
    ],

    salary: [
      { post: 'Patwari (Rajasthan Revenue Department)', level: 'Level 5', payScale: '₹29,200 – ₹92,300' },
    ],

    preparationTips: [
      'Rajasthan GK (History + Geography + Culture) accounts for 40–50% of the paper. This section alone can secure your selection — invest 50% of your preparation time here.',
      'Revenue Laws is post-specific and tested in every Patwari exam. Study the Rajasthan Land Revenue Act, Tenancy Act, and the Patwari\'s daily register duties. These 20–25 questions are predictable and scoreable.',
      'The 2025 RSSB Patwari paper (Shift 1, SPZ8) on Ministry of Papers reflects the latest pattern — use it to check how many Rajasthan-specific vs general questions appeared and calibrate your preparation.',
      'With −0.67 negative marking and 2 marks per correct answer, the risk-reward ratio is harsh. Only attempt questions you know with 70%+ confidence. Blind guessing loses more marks than it gains.',
      'For Rajasthan current affairs, follow Rajasthan Patrika or Dainik Bhaskar (Rajasthan edition) for state-level news. Focus on new schemes, district-level appointments, and the Rajasthan Budget.',
    ],
  },

  // ─── JKSSB (Board overview) ───────────────────────────────────────────────────
  jkssb: {
    title: 'JKSSB — All Exam Syllabus, Posts & Previous Year Papers',
    shortName: 'JKSSB',
    tagline: 'J&K Services Selection Board — Patwari, Junior Assistant, Finance Account Assistant, Wildlife Guard, Sub Inspector exam syllabus and solved papers.',

    examSlug: 'jkssb',

    papers: [
      { slug: 'jkssb-patwari-2024-sep1-set-a',     title: 'JKSSB Patwari — 1 Sep 2024 (Set A)',      year: '2024', questions: 120 },
      { slug: 'jkssb-junior-assistant-pyq',         title: 'JKSSB Junior Assistant — 19 Apr 2026',   year: '2026', questions: 80  },
      { slug: 'jkssb-finance-accounts-2024-paper',  title: 'JKSSB Finance Account Asst. — Jan 2024', year: '2024', questions: 120 },
      { slug: 'jkssb-wildlife-guard-2026-may-10',   title: 'JKSSB Wildlife Guard — 10 May 2026',     year: '2026', questions: 120 },
      { slug: 'jkpsi-2017',                         title: 'JKSSB Sub Inspector (PSI) — 2017',       year: '2017', questions: 120 },
    ],

    conductingBody: 'J&K Services Selection Board (JKSSB)',
    officialWebsite: 'https://jkssb.nic.in',
    examLevel: 'UT Level (Jammu & Kashmir)',
    examMode: 'OMR-based Written Test',

    about: [
      'The J&K Services Selection Board (JKSSB) is the statutory body responsible for recruiting candidates to Group C and Group D non-gazetted posts across all departments of J&K UT. Established under the J&K Services Selection Board Act, 2012 and strengthened post the 2019 UT reorganisation, JKSSB is the primary employment gateway for J&K domicile candidates.',
      'Major posts recruited by JKSSB include Patwari (Revenue Department), Junior Assistant (various departments), Finance Account Assistant (Finance/Treasury), Sub Inspector of Police (Home Department), Village Level Worker, Wildlife Guard, and many others. Every exam is an OMR-based objective test with negative marking.',
      'A J&K Domicile Certificate is mandatory for all JKSSB posts — no exceptions. Most Group C posts require graduation with an age limit of 18–40 years. There is no interview for Group C posts — selection is purely based on written examination merit.',
    ],

    quickFacts: [
      { label: 'Typical Pattern', value: '120 MCQs · 120 marks · 2 hours' },
      { label: 'Neg. Marking', value: '−0.25 per wrong (most posts)' },
      { label: 'PSI Exception', value: '100 Qs · 200 marks · −0.5 (Adv. 02/2024)' },
      { label: 'Age Limit', value: '18–40 years (relaxations for SC/ST, OBC)' },
      { label: 'Interview', value: 'None for Group C posts' },
      { label: 'Domicile', value: 'J&K Domicile Certificate mandatory' },
    ],

    syllabus: [
      {
        subject: 'General Knowledge & J&K Current Affairs (all posts)',
        topics: [
          'J&K History — Ancient, Medieval, Modern, Dogra rule, 1947 Accession, Article 370, 2019 UT status',
          'J&K Geography — Rivers, lakes, passes, protected areas, 20 districts',
          'J&K Administration — Lt. Governor office, District administration, departments',
          'National Current Affairs — Government schemes, science, sports',
          'J&K Current Affairs — State orders, appointments, local news',
          'Indian History, Polity, Constitution basics',
        ],
      },
      {
        subject: 'Reasoning Ability (all posts)',
        topics: [
          'Analogy, Series, Classification, Coding-Decoding',
          'Blood Relations, Direction Sense, Ranking',
          'Syllogisms, Statement-Conclusion',
          'Non-Verbal — Mirror images, embedded figures',
        ],
      },
      {
        subject: 'English Language (all posts)',
        topics: [
          'Grammar — Tenses, Subject-Verb Agreement, Articles, Prepositions',
          'Vocabulary — Synonyms, Antonyms, Idioms, One-Word Substitution',
          'Reading Comprehension, Sentence Correction',
          'Fill in the Blanks',
        ],
      },
      {
        subject: 'Arithmetic / Quantitative Aptitude (all posts)',
        topics: [
          'Number System, Percentage, Profit & Loss, SI & CI',
          'Ratio & Proportion, Time-Work, Time-Speed-Distance',
          'Basic Mensuration — Area and Volume',
        ],
      },
      {
        subject: 'Post-Specific Subjects',
        topics: [
          'Patwari — J&K Revenue Laws (Land Revenue Act, Agrarian Reforms Act, Girdawari, Jamabandi)',
          'Junior Assistant — Computer Knowledge (MS Office, Windows, internet, e-governance)',
          'Finance Account Assistant — J&K Financial Code, Treasury Code, Government Accounting',
          'Wildlife Guard — Wildlife Science, J&K protected areas, Wildlife Protection Act, ecology',
          'Sub Inspector (PSI) — New 2024 pattern: Reasoning, GK, Quantitative Aptitude, English, Maths, Computer (see JKPSI guide)',
        ],
      },
    ],

    examPattern: [
      { section: 'General Knowledge & J&K Current Affairs', questions: '30–40', marks: '30–40', note: '−0.25 per wrong' },
      { section: 'Reasoning Ability', questions: '20–30', marks: '20–30', note: '−0.25 per wrong' },
      { section: 'English Language', questions: '20–30', marks: '20–30', note: '−0.25 per wrong' },
      { section: 'Arithmetic / Quantitative Aptitude', questions: '15–20', marks: '15–20', note: '−0.25 per wrong' },
      { section: 'Post-Specific Subject', questions: '20–40', marks: '20–40', note: '−0.25 per wrong' },
      { section: 'Total (typical Group C post)', questions: 120, marks: 120, isTotal: true },
    ],
    examPatternNote: 'Duration: 2 hours. Note: JKSSB Sub Inspector (PSI) has a different pattern — 100 Qs, 200 marks, −0.5 per wrong. See the JKPSI guide for full details.',

    eligibility: {
      age: '18–40 years (General). SC/ST: +5 years. OBC: +3 years. PwD: +10 years.',
      education: 'Graduation from a recognised university. Matriculation (10th pass) for Group D posts like Wildlife Guard.',
      domicile: 'Valid J&K Domicile Certificate is mandatory for all posts.',
    },

    selectionProcess: [
      'Written Examination — 80–120 MCQs (varies by post), OMR-based',
      'Document Verification — Domicile, educational, category certificates',
      'Final Merit List — Written exam marks only (no interview for Group C/D)',
    ],

    salary: [
      { post: 'Group C (Patwari, Junior Asst., FAA)', level: 'Level 4', payScale: '₹25,500 – ₹81,100' },
      { post: 'Group D (Wildlife Guard)', level: 'Level 2', payScale: '₹19,900 – ₹63,200' },
      { post: 'Sub Inspector (J&K Police)', level: 'Level 6', payScale: '₹35,400 – ₹1,12,400' },
    ],

    preparationTips: [
      'J&K General Knowledge is tested in every single JKSSB exam. Study J&K history (especially post-1947 events), all 20 districts, J&K rivers and passes, and J&K government structure thoroughly.',
      'The post-specific subject is where candidates differentiate themselves. For Patwari: Revenue Laws; for JA: Computer Knowledge; for FAA: Financial Code. Study this section for at least 30% of your time.',
      'Practise previous year papers from the same post category — Patwari papers for Patwari prep, JA papers for JA prep. The difficulty and topic distribution repeat across years.',
      'With −0.25 negative marking, the break-even point is 4 wrong answers per mark gained. Attempt only those questions you are confident about; skip genuinely unknown questions.',
      'J&K current affairs for JKSSB means local news — J&K LG orders, departmental recruitments, infrastructure projects, and UT government schemes. Follow Greater Kashmir or Rising Kashmir for 3 months before the exam.',
    ],
  },

  // ─── NEET UG ─────────────────────────────────────────────────────────────────
  'neet-ug': {
    title: 'NEET UG — Complete Syllabus & Exam Pattern 2025',
    shortName: 'NEET UG',
    tagline: 'NEET UG medical entrance — official syllabus for Physics, Chemistry, Biology. 180 questions, 720 marks, −1 negative marking. NTA-conducted.',

    examSlug: 'neet-ug',
    papers: [],

    conductingBody: 'National Testing Agency (NTA)',
    officialWebsite: 'https://nta.ac.in/neet',
    examLevel: 'National Level — Medical Undergraduate Entrance',
    examMode: 'Offline OMR (Pen & Paper Test)',

    about: [
      'NEET UG is India\'s single national entrance examination for admission to MBBS, BDS, BAMS, BHMS, BUMS, and other undergraduate health science courses across government and private colleges. Conducted by the National Testing Agency (NTA), NEET UG is mandatory for AIIMS, JIPMER, and all central, state, and private medical colleges. Over 24 lakh candidates appear annually.',
      'The exam consists of 200 questions (candidates attempt 180) across Physics (45), Chemistry (45), Botany (45), and Zoology (45). Each correct answer: +4 marks. Each wrong answer: −1 mark. Maximum marks: 720. Duration: 3 hours 20 minutes. Each section has two parts: Section A (35 questions, all compulsory) and Section B (15 questions, attempt any 10).',
      'NEET UG covers the NCERT Class 11 and 12 syllabus exclusively. The cutoff for MBBS admission in government colleges (General category) typically ranges from 550–620 out of 720. AIIMS New Delhi requires approximately 680+ marks.',
    ],

    quickFacts: [
      { label: 'Questions', value: '200 total, attempt 180' },
      { label: 'Total Marks', value: '720' },
      { label: 'Marking', value: '+4 correct · −1 wrong' },
      { label: 'Duration', value: '3 hours 20 minutes' },
      { label: 'Mode', value: 'Offline OMR (Pen & Paper)' },
      { label: 'MBBS Seats', value: '~1,08,940 government + private' },
      { label: 'General Cutoff', value: '~164/720 (NEET 2024); MBBS Govt. ~550+' },
      { label: 'Attempts', value: 'Unlimited (no cap, as per Supreme Court 2023)' },
    ],

    syllabus: [
      {
        subject: 'Physics — Class 11 Topics',
        topics: [
          'Physical World & Measurement, Motion in a Straight Line, Motion in a Plane',
          'Laws of Motion, Work Energy Power, System of Particles & Rotational Motion',
          'Gravitation, Properties of Bulk Matter (Elasticity, Fluid Mechanics, Surface Tension)',
          'Thermodynamics, Behaviour of Perfect Gas & Kinetic Theory',
          'Oscillations, Waves',
        ],
      },
      {
        subject: 'Physics — Class 12 Topics',
        topics: [
          'Electrostatics — Charges, Fields, Potential, Capacitors',
          'Current Electricity — Ohm\'s Law, Kirchhoff\'s Laws, Wheatstone Bridge',
          'Magnetic Effects of Current, Magnetism & Matter',
          'Electromagnetic Induction, Alternating Currents',
          'Electromagnetic Waves, Ray Optics, Wave Optics',
          'Dual Nature of Radiation, Atoms & Nuclei',
          'Electronic Devices — Semiconductors, Logic Gates',
        ],
      },
      {
        subject: 'Chemistry — Class 11 Topics',
        topics: [
          'Basic Concepts, Structure of Atom, Classification of Elements (Periodic Table)',
          'Chemical Bonding & Molecular Structure',
          'States of Matter, Thermodynamics, Equilibrium',
          'Redox Reactions, Hydrogen, s-block, p-block Elements (partial)',
          'Organic Chemistry Basics — Alkanes, Alkenes, Alkynes, Environmental Chemistry',
        ],
      },
      {
        subject: 'Chemistry — Class 12 Topics',
        topics: [
          'Solid State, Solutions, Electrochemistry',
          'Chemical Kinetics, Surface Chemistry',
          'd & f Block Elements, Coordination Compounds',
          'Haloalkanes, Haloarenes, Alcohols, Phenols, Ethers',
          'Aldehydes, Ketones, Carboxylic Acids, Amines',
          'Biomolecules, Polymers, Chemistry in Everyday Life',
        ],
      },
      {
        subject: 'Biology — Botany (Class 11 & 12)',
        topics: [
          'Diversity in Living World — Kingdoms, Classification',
          'Structural Organisation in Plants — Morphology, Anatomy',
          'Cell Structure & Function — Cell theory, Organelles, Cell Division',
          'Plant Physiology — Transport, Mineral Nutrition, Photosynthesis, Respiration, Growth',
          'Reproduction in Plants — Vegetative, Sexual, Seeds',
          'Genetics — Mendel\'s laws, Chromosomal theory, DNA, Biotechnology',
          'Ecology & Environment — Organisms & environment, Ecosystems, Biodiversity, Environmental issues',
        ],
      },
      {
        subject: 'Biology — Zoology (Class 11 & 12)',
        topics: [
          'Structural Organisation in Animals — Animal tissues, Cockroach, Earthworm, Frog anatomy',
          'Human Physiology — Digestion, Breathing & Gas Exchange, Body Fluids & Circulation',
          'Excretory Products & Elimination, Locomotion & Movement, Neural Control',
          'Chemical Coordination — Endocrine System, Hormones',
          'Reproduction — Human reproduction, Reproductive Health',
          'Genetics — Heredity, Molecular Basis of Inheritance, Evolution',
          'Biology in Human Welfare — Human health & diseases, Strategies for enhancement in food production',
          'Biotechnology & its Applications',
        ],
      },
    ],

    examPattern: [
      { section: 'Physics — Sec A (35 Qs compulsory) + Sec B (attempt 10 of 15)', questions: '45 (of 50)', marks: 180, note: '+4/−1' },
      { section: 'Chemistry — Sec A (35 Qs compulsory) + Sec B (attempt 10 of 15)', questions: '45 (of 50)', marks: 180, note: '+4/−1' },
      { section: 'Botany — Sec A (35 Qs compulsory) + Sec B (attempt 10 of 15)', questions: '45 (of 50)', marks: 180, note: '+4/−1' },
      { section: 'Zoology — Sec A (35 Qs compulsory) + Sec B (attempt 10 of 15)', questions: '45 (of 50)', marks: 180, note: '+4/−1' },
      { section: 'Total', questions: '180 (of 200)', marks: 720, isTotal: true },
    ],
    examPatternNote: '+4 marks correct, −1 wrong, 0 for unattempted. Duration: 3 hours 20 minutes. Section B: attempt any 10 of 15 questions.',

    eligibility: {
      age: 'Minimum 17 years as on 31 December of the admission year. No upper age limit (Supreme Court ruling 2023).',
      education: 'Class 12 (or equivalent) with Physics, Chemistry, Biology/Biotechnology and English. Minimum 50% marks (General), 40% (SC/ST/OBC/PwD).',
      domicile: 'Indian citizen. NRIs and OCI/PIO also eligible.',
    },

    selectionProcess: [
      'NEET UG Examination — Single paper, 3 hours 20 minutes, pen & paper OMR',
      'Result & Score Card — Declared by NTA; merit list prepared',
      'Counselling (All India Quota) — MCC conducts for 15% seats in government colleges + all central/deemed universities',
      'State Quota Counselling — 85% government seats filled by respective state counselling authorities',
    ],

    salary: [],

    preparationTips: [
      'NEET UG is 100% NCERT-based. Read NCERT Class 11 and 12 Physics, Chemistry, and Biology line by line before solving any reference book. Most direct questions are from NCERT text itself.',
      'Biology (Botany + Zoology) accounts for 360 marks — half the paper. Students who score 300+ in Biology alone can clear the cutoff. Prioritise Biology over Physics.',
      'Organic Chemistry (Aldehydes, Ketones, Carboxylic Acids, Amines) and Genetics together account for ~60–70 marks. These two chapters repay the most time per mark.',
      'Physics is the hardest section for most NEET candidates. Focus on Electrostatics, Current Electricity, Modern Physics, and Optics — these 4 topics carry ~50% of Physics marks.',
      'Solve at least 10 years of NEET previous year papers under timed conditions. NEET repeats similar concepts and even specific NCERT lines as questions — pattern recognition from PYQs is invaluable.',
    ],
  },

  // ─── JKSSB Patwari ───────────────────────────────────────────────────────────
  'jkssb-patwari': {
    title: 'JKSSB Patwari — Syllabus, Revenue Laws & Exam Pattern',
    shortName: 'JKSSB Patwari',
    tagline: 'JKSSB Patwari exam — Revenue Laws syllabus, J&K Land Records, 120 MCQs, −0.25 negative marking. 2024 solved paper included.',

    examSlug: 'jkssb',
    paperSearchTerm: 'patwari',

    papers: [
      { slug: 'jkssb-patwari-2024-sep1-set-a', title: 'JKSSB Patwari — 1 Sep 2024 (Set A)', year: '2024', questions: 120 },
    ],

    conductingBody: 'J&K Services Selection Board (JKSSB)',
    officialWebsite: 'https://jkssb.nic.in',
    examLevel: 'UT Level (Jammu & Kashmir) — Revenue Department',
    examMode: 'OMR-based Written Test',

    about: [
      'The JKSSB Patwari is a Group C post in the J&K Revenue Department. Patwaris are the first point of contact for land-related matters at the village level — they maintain Khasra and Khatauni land records, register mutations (transfers and inheritances), conduct Girdawari (crop inspection) twice a year, assist in land acquisition proceedings, and prepare revenue reports for Tehsildars. With 1,200 vacancies in the 2024 batch, it is one of JKSSB\'s most recruited posts.',
      'The written examination has 120 objective-type questions, 120 marks, 2-hour duration, and −0.25 negative marking per wrong answer. The paper is split across General Knowledge & J&K Current Affairs, Revenue Laws & Land Records (the post-specific section), Arithmetic, Reasoning, and English. Revenue Laws is the distinguishing section — candidates who prepare this thoroughly have a significant scoring advantage over others.',
      'The 2024 JKSSB Patwari exam was held on 1 September 2024. Set A of the paper, with all 120 questions solved and explained, is available on Ministry of Papers. The revenue law questions in the 2024 paper heavily tested the J&K Land Revenue Act, mutation procedures, and Girdawari registers.',
    ],

    patternNotification: 'Based on the 2024 JKSSB Patwari examination (1 September 2024, 1,200 vacancies). Pattern may vary in future notifications.',

    quickFacts: [
      { label: 'Questions', value: '120 MCQs' },
      { label: 'Total Marks', value: '120 (1 mark each)' },
      { label: 'Duration', value: '2 hours' },
      { label: 'Neg. Marking', value: '−0.25 per wrong answer' },
      { label: 'Key Subject', value: 'Revenue Laws & Land Records' },
      { label: 'Vacancies (2024)', value: '1,200 posts' },
      { label: 'Qualification', value: 'Graduation' },
      { label: 'Domicile', value: 'J&K Domicile mandatory' },
    ],

    syllabus: [
      {
        subject: 'Revenue Laws & Land Records (25–30 Qs) — Post-specific',
        topics: [
          'J&K Land Revenue Act, 1954 — Revenue hierarchy (Patwari → Girdawar → Naib Tehsildar → Tehsildar → SDO → DM), powers and duties',
          'J&K Agrarian Reforms Act, 1976 — Ceiling on landholding, vesting of surplus land',
          'Alienation of Land Act — Restrictions on transfer of agricultural land',
          'J&K Consolidation of Holdings Act — Purpose, process, Consolidation Officer powers',
          'Girdawari (crop inspection) — Procedure, Rabi and Kharif seasons, Girdawari register entries',
          'Jamabandi — Annual record of rights, preparation, attestation',
          'Khasra — Field register, field numbers, area measurement, crop entries',
          'Khatauni — Holder-wise compilation of Khasra entries',
          'Mutation (Nakal/Intkal) — Types (inheritance, sale, gift, mortgage), process, Fard entries',
          'Land measurement units — Kanal, Marla, Gunta, Bigha in J&K context',
          'Revenue courts — Jurisdiction of Tehsildar, Collector in land disputes',
          'Nazul land, Shamilat Deh, Khud Kasht vs Sir land definitions',
        ],
      },
      {
        subject: 'General Knowledge & J&K Current Affairs (30–35 Qs)',
        topics: [
          'J&K History — Dogra rule, 1947 Accession, Article 370 abrogation, UT status',
          'J&K Geography — Rivers (Jhelum, Chenab, Tawi, Ravi), passes, lakes, 20 districts',
          'J&K Administration — Lt. Governor, Divisional Commissioners, District administration',
          'J&K Current Affairs — State government orders, schemes, appointments (last 12 months)',
          'National GK — Indian History, Polity, Economy, Science basics',
          'National Current Affairs — Major events, awards, sports (last 6 months)',
        ],
      },
      {
        subject: 'Arithmetic & Quantitative Aptitude (20–25 Qs)',
        topics: [
          'Number System, Simplification, HCF & LCM',
          'Percentage, Profit & Loss, Discount',
          'Simple & Compound Interest',
          'Ratio & Proportion, Mixture & Alligation',
          'Time-Speed-Distance, Time & Work',
          'Area & Perimeter of basic shapes (relevant to land measurement)',
        ],
      },
      {
        subject: 'Reasoning Ability (15–20 Qs)',
        topics: [
          'Analogy, Series (Number, Letter, Mixed)',
          'Coding-Decoding, Direction Sense',
          'Blood Relations, Ranking & Arrangement',
          'Syllogisms, Statement-Conclusion',
          'Non-Verbal — Mirror Images, Embedded Figures',
        ],
      },
      {
        subject: 'English Language (10–15 Qs)',
        topics: [
          'Grammar — Tenses, Subject-Verb Agreement, Articles, Prepositions',
          'Vocabulary — Synonyms, Antonyms, One-Word Substitution, Idioms',
          'Sentence Correction, Error Detection',
          'Fill in the Blanks',
        ],
      },
    ],

    examPattern: [
      { section: 'Revenue Laws & Land Records', questions: '25–30', marks: '25–30', note: '−0.25 per wrong' },
      { section: 'General Knowledge & J&K Current Affairs', questions: '30–35', marks: '30–35', note: '−0.25 per wrong' },
      { section: 'Arithmetic & Quantitative Aptitude', questions: '20–25', marks: '20–25', note: '−0.25 per wrong' },
      { section: 'Reasoning Ability', questions: '15–20', marks: '15–20', note: '−0.25 per wrong' },
      { section: 'English Language', questions: '10–15', marks: '10–15', note: '−0.25 per wrong' },
      { section: 'Total', questions: 120, marks: 120, isTotal: true },
    ],
    examPatternNote: 'Duration: 2 hours. 1 mark per question. −0.25 per wrong answer.',

    eligibility: {
      age: '18–40 years (General). SC/ST: +5 years. OBC: +3 years. PwD: +10 years.',
      education: 'Graduation from a recognised university. Knowledge of local revenue laws preferred.',
      domicile: 'Valid J&K Domicile Certificate mandatory.',
    },

    selectionProcess: [
      'Written Examination — 120 MCQs, 2 hours, OMR-based',
      'Document Verification — Domicile, educational, category certificates',
      'Final Merit List — Written exam marks only (no interview)',
    ],

    salary: [
      { post: 'Patwari (Group C, Revenue Department)', level: 'Level 4', payScale: '₹25,500 – ₹81,100' },
    ],

    preparationTips: [
      'Revenue Laws is the post-specific section that most candidates underestimate. Study the J&K Land Revenue Act chapter by chapter — know the hierarchy of revenue officers, the process for mutation recording, and Girdawari procedures. 25–30 questions from this section alone can be secured with focused preparation.',
      'Land measurement units are frequently asked: 1 Kanal = 20 Marla = 506.7 sq. yards in J&K. Know the relationship between Kanal, Marla, Bigha, and Acre. Also study the difference between Khud Kasht and Sir land.',
      'The 2024 Patwari paper (Set A) on Ministry of Papers shows the exact difficulty and topic split. Solve it under timed conditions to identify your weak areas in Revenue Laws.',
      'J&K current affairs questions in Patwari exams focus on local events — district-level news, JKSSB notifications, J&K government orders. Follow local newspapers like Greater Kashmir or Daily Excelsior.',
      'Arithmetic in the Patwari exam is straightforward Class 8–10 level. Invest minimum time here but ensure you get 15+ correct out of 20–25. Time saved on Arithmetic can be used for Revenue Law questions.',
    ],
  },

  // ─── JKSSB Junior Assistant ───────────────────────────────────────────────────
  'jkssb-junior-assistant': {
    title: 'JKSSB Junior Assistant — Syllabus, Computer Knowledge & Exam Pattern',
    shortName: 'JKSSB Junior Assistant',
    tagline: 'JKSSB Junior Assistant exam — Computer Knowledge syllabus, GK, Reasoning, English. 80 questions, −0.25 negative marking. 2026 solved paper.',

    examSlug: 'jkssb',
    paperSearchTerm: 'junior assistant',

    papers: [
      { slug: 'jkssb-junior-assistant-pyq', title: 'JKSSB Junior Assistant — 19 Apr 2026', year: '2026', questions: 80 },
    ],

    conductingBody: 'J&K Services Selection Board (JKSSB)',
    officialWebsite: 'https://jkssb.nic.in',
    examLevel: 'UT Level (Jammu & Kashmir) — Various Government Departments',
    examMode: 'OMR-based Written Test',

    about: [
      'The JKSSB Junior Assistant is a Group C clerical post across various departments of J&K UT including Finance, General Administration, Revenue, Health, Education, and other directorates. Junior Assistants handle office correspondence, file management, data entry, dispatch, record maintenance, and coordination between sections. With 1,048 posts in the 2023–24 batch, it is one of the most applied-for JKSSB posts due to its office-based nature and permanent government employment.',
      'The 2026 JKSSB Junior Assistant exam had 80 objective-type MCQ questions with −0.25 negative marking, completed in 2 hours. The paper covered General Knowledge & J&K Current Affairs, Reasoning Ability, English Language, Quantitative Aptitude, and Computer & IT Knowledge. Computer Knowledge is the post-specific distinguishing section — candidates must demonstrate proficiency in MS Office, Windows, internet operations, and basic networking concepts.',
      'The April 2026 Junior Assistant paper (80 questions, fully solved) is available on Ministry of Papers. The Computer section in this paper tested practical MS Office knowledge, keyboard shortcuts, and e-governance tools used in J&K government offices.',
    ],

    patternNotification: 'Based on the JKSSB Junior Assistant examination held on 19 April 2026. Exam pattern observed from the actual paper.',

    quickFacts: [
      { label: 'Questions', value: '80 MCQs' },
      { label: 'Total Marks', value: '80 (1 mark each)' },
      { label: 'Duration', value: '2 hours' },
      { label: 'Neg. Marking', value: '−0.25 per wrong answer' },
      { label: 'Key Subject', value: 'Computer & IT Knowledge' },
      { label: 'Vacancies (2023–24)', value: '1,048 posts' },
      { label: 'Qualification', value: 'Graduation' },
      { label: 'Domicile', value: 'J&K Domicile mandatory' },
    ],

    syllabus: [
      {
        subject: 'Computer & IT Knowledge (15–20 Qs) — Post-specific',
        topics: [
          'Computer Basics — CPU components (ALU, CU, registers), Input devices (keyboard, mouse, scanner), Output devices (monitor, printer)',
          'Memory — RAM, ROM, Cache, Hard Disk, SSD; primary vs secondary storage; units (KB, MB, GB, TB)',
          'Operating System — Windows 10/11 basics, Desktop, Taskbar, File Explorer, Control Panel settings',
          'MS Word — Creating and formatting documents, Tables, Mail Merge, Track Changes, Headers & Footers, Page Setup',
          'MS Excel — Formulas (SUM, AVERAGE, COUNT, IF, VLOOKUP), Cell references, Charts, Sorting & Filtering, Pivot Tables basics',
          'MS PowerPoint — Creating slides, Slide layouts, Animations, Transitions, Presenter View',
          'Internet & Email — Web browsers, URL structure, Search engines, Downloading/Uploading files, Creating and managing Gmail/official email, e-Banking',
          'E-Governance tools — UMANG app, DigiLocker, NIC services, J&K government portals (JK eServices, Jan Sampark)',
          'Networking basics — LAN, WAN, Router, Modem, IP address concept, Wi-Fi vs wired',
          'Cyber Security — Phishing, Virus, Malware, Ransomware, Strong password practices, Two-Factor Authentication',
          'Keyboard shortcuts — Ctrl+C/V/X/Z/S/A/P, Windows key shortcuts, Alt+Tab, function keys (F1–F12)',
        ],
      },
      {
        subject: 'General Knowledge & J&K Current Affairs (20–25 Qs)',
        topics: [
          'J&K History — Dogra rule, 1947 Accession, post-2019 UT reorganisation',
          'J&K Geography — Rivers, passes, lakes, all 20 districts, divisional HQs',
          'J&K Administration — LG office, Divisional Commissioners, departmental structure',
          'J&K Schemes — PMGSY roads in J&K, Back to Village programme, Mission Youth, Khelo India in J&K',
          'J&K Current Affairs — New appointments, government orders, infrastructure launches (last 12 months)',
          'National Current Affairs — Major government initiatives, awards, sports, science & technology',
          'Indian Polity — Constitution basics, Parliament, Fundamental Rights',
        ],
      },
      {
        subject: 'Reasoning Ability (15–20 Qs)',
        topics: [
          'Analogy, Classification, Series (Number, Letter, Mixed)',
          'Coding-Decoding, Direction Sense, Blood Relations',
          'Ranking & Arrangement, Input-Output',
          'Syllogisms, Statement-Conclusion',
          'Puzzles — Seating Arrangement (simple), Scheduling',
          'Non-Verbal — Mirror Images, Water Images, Embedded Figures',
        ],
      },
      {
        subject: 'English Language (15–20 Qs)',
        topics: [
          'Reading Comprehension (1 short passage)',
          'Grammar — Tenses, Articles, Prepositions, Conjunctions, Subject-Verb Agreement',
          'Vocabulary — Synonyms, Antonyms, Idioms & Phrases, One-Word Substitution',
          'Sentence Correction, Error Spotting',
          'Fill in the Blanks, Para Jumbles',
        ],
      },
      {
        subject: 'Quantitative Aptitude (10–15 Qs)',
        topics: [
          'Number System, Simplification, BODMAS',
          'Percentage, Profit & Loss, Discount',
          'Ratio & Proportion, Simple & Compound Interest',
          'Time-Work, Time-Speed-Distance',
          'Basic Mensuration — Area & Perimeter',
        ],
      },
    ],

    examPattern: [
      { section: 'Computer & IT Knowledge', questions: '15–20', marks: '15–20', note: '−0.25 per wrong' },
      { section: 'General Knowledge & J&K Current Affairs', questions: '20–25', marks: '20–25', note: '−0.25 per wrong' },
      { section: 'Reasoning Ability', questions: '15–20', marks: '15–20', note: '−0.25 per wrong' },
      { section: 'English Language', questions: '15–20', marks: '15–20', note: '−0.25 per wrong' },
      { section: 'Quantitative Aptitude', questions: '10–15', marks: '10–15', note: '−0.25 per wrong' },
      { section: 'Total', questions: 80, marks: 80, isTotal: true },
    ],
    examPatternNote: 'Duration: 2 hours. 1 mark per question. −0.25 per wrong answer. Total: 80 questions (as per 2026 exam).',

    eligibility: {
      age: '18–40 years (General). SC/ST: +5 years. OBC: +3 years. PwD: +10 years.',
      education: 'Graduation from a recognised university. Basic computer literacy expected.',
      domicile: 'Valid J&K Domicile Certificate mandatory.',
    },

    selectionProcess: [
      'Written Examination — 80 MCQs, 2 hours, OMR-based',
      'Document Verification — Domicile, educational, category certificates',
      'Final Merit List — Written exam marks only (no interview)',
    ],

    salary: [
      { post: 'Junior Assistant (Group C)', level: 'Level 4', payScale: '₹25,500 – ₹81,100' },
    ],

    preparationTips: [
      'Computer Knowledge is the section most candidates skip or underprepare — and it\'s the post-specific differentiator with 15–20 questions. Spend at least 30% of your preparation time here. Focus especially on MS Office (Word, Excel), keyboard shortcuts, and e-governance tools.',
      'MS Excel formulas (SUM, AVERAGE, IF, VLOOKUP) and MS Word features (Mail Merge, Track Changes, Tables) are the most frequently asked computer topics. Practice these on an actual computer, not just by reading.',
      'Keyboard shortcuts are easy marks — 3–5 questions typically come from shortcuts. Memorise the most common: Ctrl+C (copy), Ctrl+V (paste), Ctrl+Z (undo), Ctrl+S (save), Ctrl+P (print), Ctrl+A (select all), Alt+Tab (switch windows), Windows+E (File Explorer).',
      'The 2026 JA paper (80 questions) on Ministry of Papers reflects the current difficulty level. Solve it timed and check your Computer section performance specifically — most candidates who fail the JA exam lose marks here.',
      'J&K current affairs for the JA exam focus on departmental news, J&K government e-governance launches, and local appointments. The J&K government has been actively pushing digital initiatives — know the major portals and mobile apps in use.',
    ],
  },

  // ─── JKSSB Finance Account Assistant ─────────────────────────────────────────
  'jkssb-faa': {
    title: 'JKSSB Finance Account Assistant (FAA) — Syllabus & Exam Pattern',
    shortName: 'JKSSB FAA',
    tagline: 'JKSSB Finance Account Assistant exam — J&K Financial Code, Treasury Code, Government Accounting. 120 MCQs, −0.25 negative marking. 2024 solved paper.',

    examSlug: 'jkssb',
    paperSearchTerm: 'finance',

    papers: [
      { slug: 'jkssb-finance-accounts-2024-paper', title: 'JKSSB Finance Account Assistant — Jan 2024', year: '2024', questions: 120 },
    ],

    conductingBody: 'J&K Services Selection Board (JKSSB)',
    officialWebsite: 'https://jkssb.nic.in',
    examLevel: 'UT Level (Jammu & Kashmir) — Finance Department & Treasury Offices',
    examMode: 'OMR-based Written Test',

    about: [
      'The JKSSB Finance Account Assistant (FAA) is a Group C post under the Finance Department and District Treasury Offices of J&K UT. FAAs process government bills and vouchers, maintain treasury accounts, record daily financial transactions in cash books, check pay and allowance claims of government employees, maintain GPF accounts, and assist in the preparation of budget estimates. With 637 posts in the 2024 batch and result declared in 2025, it is a sought-after post for candidates with commerce or accounts backgrounds.',
      'The 2024 FAA exam had 120 objective-type MCQ questions, 120 marks, 2-hour duration, and −0.25 negative marking. The paper covered Finance & Accounts (the core post-specific section testing J&K Financial Code, Treasury Code, and accounting principles), Financial Rules & Procedures, General Knowledge & Current Affairs, Reasoning, and English. The Finance & Accounts section distinguishes serious FAA aspirants from general JKSSB candidates.',
      'The 2024 FAA paper (January 2024, 120 questions, fully solved) is on Ministry of Papers. The Finance section questions that year heavily tested the J&K Financial Code volumes, contingency expenditure rules, and government accounting classification (Major Head, Minor Head, Sub-head structure).',
    ],

    patternNotification: 'Based on JKSSB Finance Account Assistant examination, January 2024 (637 vacancies). Result declared 2025.',

    quickFacts: [
      { label: 'Questions', value: '120 MCQs' },
      { label: 'Total Marks', value: '120 (1 mark each)' },
      { label: 'Duration', value: '2 hours' },
      { label: 'Neg. Marking', value: '−0.25 per wrong answer' },
      { label: 'Key Subject', value: 'J&K Financial Code & Government Accounting' },
      { label: 'Vacancies (2024)', value: '637 posts' },
      { label: 'Qualification', value: 'Graduation (Commerce preferred)' },
      { label: 'Domicile', value: 'J&K Domicile mandatory' },
    ],

    syllabus: [
      {
        subject: 'Finance & Government Accounting (25–30 Qs) — Post-specific',
        topics: [
          'J&K Financial Code Volume I — General principles, definition of public money, custody of public moneys, appropriation of grants',
          'J&K Financial Code Volume II — Departmental regulations, expenditure procedure, contingency expenditure',
          'J&K Treasury Code — Treasury functions, cheque payments, treasury receipts, pension payments',
          'Government Accounting — Double-entry principles, debit/credit, capital vs revenue expenditure',
          'Classification of accounts — Consolidated Fund of India, Contingency Fund, Public Account (J&K)',
          'Major Head, Minor Head, Sub-head, Detailed Head, Object Head structure',
          'Pay & Allowances — Basic pay, DA (Dearness Allowance), HRA (House Rent Allowance), CCA, TA/DA rules',
          'General Provident Fund (GPF) — Subscription, advance rules, final withdrawal, nomination',
          'Pension — Types (superannuation, invalid, family pension), calculation basis, commutation',
          'Appropriation Accounts — Surrender of savings, re-appropriation, excess over grants',
          'Internal Audit — Objectives, types, inspection notes, audit objections',
          'Bank Reconciliation Statement — Reconciling treasury balance with bank statement',
        ],
      },
      {
        subject: 'Financial Rules & Procedures (20–25 Qs)',
        topics: [
          'J&K Budget Manual — Budget cycle, demands for grants, vote on account',
          'Contract procedures — Tenders, Limited Tender Enquiry (LTE), Single Tender',
          'Store purchase rules — Purchase Committee, GeM (Government e-Marketplace) in J&K',
          'Advance procedures — Travelling Advance, House Building Advance, Vehicle Advance',
          'Contingency expenditure — Drawing & Disbursing Officer (DDO) responsibilities',
          'Bill preparation — Establishment bills, contingency bills, works bills',
          'Treasury Single Account — Concept, operation in J&K',
        ],
      },
      {
        subject: 'General Knowledge & J&K Current Affairs (25–30 Qs)',
        topics: [
          'J&K Finance — J&K Budget highlights, GSDP, major revenue sources',
          'J&K History, Geography, Administration',
          'Indian Economy — Union Budget highlights, RBI, banking basics',
          'National & J&K Current Affairs',
        ],
      },
      {
        subject: 'Reasoning Ability (15–20 Qs)',
        topics: [
          'Analogy, Series, Classification',
          'Coding-Decoding, Blood Relations, Direction Sense',
          'Syllogisms, Arrangement Puzzles',
          'Non-Verbal Reasoning',
        ],
      },
      {
        subject: 'English Language (10–15 Qs)',
        topics: [
          'Grammar, Vocabulary, Sentence Correction',
          'Comprehension, Fill in the Blanks',
          'One-Word Substitution, Idioms & Phrases',
        ],
      },
    ],

    examPattern: [
      { section: 'Finance & Government Accounting', questions: '25–30', marks: '25–30', note: '−0.25 per wrong' },
      { section: 'Financial Rules & Procedures', questions: '20–25', marks: '20–25', note: '−0.25 per wrong' },
      { section: 'General Knowledge & J&K Current Affairs', questions: '25–30', marks: '25–30', note: '−0.25 per wrong' },
      { section: 'Reasoning Ability', questions: '15–20', marks: '15–20', note: '−0.25 per wrong' },
      { section: 'English Language', questions: '10–15', marks: '10–15', note: '−0.25 per wrong' },
      { section: 'Total', questions: 120, marks: 120, isTotal: true },
    ],
    examPatternNote: 'Duration: 2 hours. 1 mark per question. −0.25 per wrong. A Commerce background gives significant advantage in Finance & Accounting sections.',

    eligibility: {
      age: '18–40 years (General). SC/ST: +5 years. OBC: +3 years. PwD: +10 years.',
      education: 'Graduation from a recognised university. BCom or equivalent commerce background is strongly advantageous.',
      domicile: 'Valid J&K Domicile Certificate mandatory.',
    },

    selectionProcess: [
      'Written Examination — 120 MCQs, 2 hours, OMR-based',
      'Document Verification',
      'Final Merit List — Written exam marks only (no interview)',
    ],

    salary: [
      { post: 'Finance Account Assistant (Group C)', level: 'Level 4', payScale: '₹25,500 – ₹81,100' },
    ],

    preparationTips: [
      'The J&K Financial Code (Vol I & II) is the backbone of the FAA exam — study it cover to cover. Focus specifically on the definitions of public money, how contingency expenditure works, appropriation procedure, and the DDO (Drawing & Disbursing Officer) role and responsibilities.',
      'Government Accounting classification (Major Head → Minor Head → Sub-Head → Detailed Head) is tested almost every year. Know how expenditure is classified and the difference between Consolidated Fund, Contingency Fund, and Public Account.',
      'Pay & Allowances questions recur heavily — especially DA calculation basis, GPF subscription limits, and TA/DA rules for J&K government employees. These are direct factual questions that reward careful reading.',
      'The 2024 FAA paper on Ministry of Papers is the most current reference available. Study which J&K Financial Code sections were tested and mark those chapters for deeper revision.',
      'Non-commerce graduates should spend 2–3 extra weeks on the accounting basics (debit/credit, bank reconciliation) before tackling the Financial Code. Commerce background candidates should directly go to the J&K-specific rules.',
    ],
  },

  // ─── JKSSB Wildlife Guard ─────────────────────────────────────────────────────
  // Source: JKSSB Syllabus Notice No. JKSSB-COEOEXAM(UT)/47/2023-03 dated 09.04.2025
  // Advertisements 03/2021 and 04/2022 — Forest, Ecology & Environment Department
  'jkssb-wildlife-guard': {
    title: 'JKSSB Wildlife Guard — Official Syllabus & Exam Pattern (Forest Dept.)',
    shortName: 'JKSSB Wildlife Guard',
    tagline: 'Official syllabus for JKSSB Wildlife Guard (Forest, Ecology & Environment) — 4 sections, 120 marks. Mathematics, Reasoning, English, General Awareness + Forest & Wildlife. 2026 solved paper.',

    examSlug: 'jkssb',
    paperSearchTerm: 'wildlife',

    papers: [
      { slug: 'jkssb-wildlife-guard-2026-may-10', title: 'JKSSB Wildlife Guard — 10 May 2026', year: '2026', questions: 120 },
    ],

    conductingBody: 'J&K Services Selection Board (JKSSB)',
    officialWebsite: 'https://jkssb.nic.in',
    examLevel: 'UT Level (J&K) — Forest, Ecology & Environment Department',
    examMode: 'OMR-based Written Test + Physical Efficiency Test',

    about: [
      'The JKSSB Wildlife Guard is a Group D field post in the Department of Forest, Ecology & Environment, J&K UT. Wildlife Guards patrol national parks, wildlife sanctuaries, and reserved forests, assist in anti-poaching operations, conduct wildlife census support, maintain forest fire lines, and help in habitat monitoring and eco-restoration work. It is a physically demanding outdoor post requiring both academic preparation and physical fitness.',
      'Per the official JKSSB syllabus notice (dated 09.04.2025 for Advertisements 03/2021 and 04/2022), the written examination comprises 120 marks across four sections: Mathematics (25 marks), Basic Reasoning (25 marks), English (25 marks), and General Awareness including Science, Geography, and Forest & Wildlife (45 marks split across Part A and Part B). The Forest & Wildlife section carries 20 marks within the General Awareness section.',
      'The 10 May 2026 Wildlife Guard paper (120 questions, fully solved) is available on Ministry of Papers. After clearing the written exam, shortlisted candidates appear for a Physical Efficiency Test (PET) — the PET is qualifying, not merit-based.',
    ],

    patternNotification: 'Official syllabus per JKSSB Notice dated 09.04.2025 (Advertisements Notification 03/2021 and 04/2022, Forest, Ecology & Environment Department).',

    quickFacts: [
      { label: 'Total Marks', value: '120' },
      { label: 'Mathematics', value: '25 marks' },
      { label: 'Basic Reasoning', value: '25 marks' },
      { label: 'English', value: '25 marks' },
      { label: 'General Awareness + Forest & Wildlife', value: '45 marks (25 + 20)' },
      { label: 'After written', value: 'Physical Efficiency Test (PET)' },
      { label: 'Qualification', value: 'Matriculation (10th pass)' },
      { label: 'Domicile', value: 'J&K Domicile mandatory' },
    ],

    syllabus: [
      {
        subject: 'Section 1 — Mathematics (25 marks)',
        topics: [
          'Percentage — finding X% of Y, percentage increase/decrease, percentage composition',
          'Average — simple average, weighted average, average speed',
          'Time, Work & Distance — work done in N days, pipes & cisterns, speed-distance-time',
          'Ratio and Proportions — simplifying ratios, direct/inverse proportion',
          'Problems of Ages — age-based equations',
          'Probability — simple probability of single events',
          'LCM & HCF — finding LCM and HCF by prime factorisation and division method',
          'Mensuration — Area & Perimeter of rectangle, square, triangle, circle; Volume of cube and cuboid',
        ],
      },
      {
        subject: 'Section 2 — Basic Reasoning (25 marks)',
        topics: [
          'Analogies — Word analogy, Number analogy',
          'Relationship concepts — Family tree / Blood relations',
          'Figure odd one out — Visual classification, find the different figure',
          'Direction Sense — Cardinal directions, turns, final position/distance',
          'Figure Series completion — Identify the next figure in a visual sequence',
          'Venn Diagram — Relationship between groups, find elements in given regions',
          'Number Series — Find the missing or wrong term in a number pattern',
          'Coding-Decoding — Letter/number-based code patterns',
        ],
      },
      {
        subject: 'Section 3 — English (25 marks)',
        topics: [
          'Articles — A, An, The — usage rules and omission',
          'Synonyms — Words with similar meaning',
          'Antonyms — Words with opposite meaning',
          'Preposition — In, on, at, by, with, for, since, until — correct usage',
          'Verbs — Tense forms, subject-verb agreement, auxiliary verbs',
          'Reading Comprehension — Short passage with 3–5 questions',
          'Determiners — This, that, these, those, some, any, each, every',
          'Spellings — Identify correctly/incorrectly spelt words',
          'Sentences — Sentence correction, sentence completion, sentence rearrangement',
        ],
      },
      {
        subject: 'Section 4A — General Awareness: India & J&K (25 marks)',
        topics: [
          'General current events — National level news, major events (last 6–12 months)',
          'Sports — Olympic medallists, national/international tournaments, J&K sports personalities',
          'India culture — Classical dance forms, UNESCO Heritage Sites in India, major religions, festivals',
          'India history — Ancient, Medieval, Modern India; Freedom Movement milestones',
          'Indian geography — Major rivers, mountains, states & capitals, climate zones',
          'Capital/State — State capitals, new Union Territories, country capitals (world GK)',
          'General Science — Basic Physics, Chemistry, Biology concepts (Class 8–10 level)',
          'Health, Hygiene and Sanitation — Common diseases, vaccination, clean India mission, nutrition basics',
          'Geography of Jammu and Kashmir — Rivers (Jhelum, Chenab, Tawi, Indus), Passes (Banihal, Zoji La), Districts, Regions (Kashmir Valley, Jammu, Ladakh)',
          'Culture of Jammu and Kashmir — Kashmiri Pashmina, Kani shawl, Khatamband, Sozni embroidery, folk dances (Rouf, Bhand Pather, Dogri dances), festivals',
          'History of Jammu and Kashmir — Dogra rule, 1947 Accession, Article 370, 2019 reorganisation',
        ],
      },
      {
        subject: 'Section 4B — Forest & Wildlife (20 marks)',
        topics: [
          'Types and distribution of forests — Tropical Evergreen, Tropical Deciduous, Temperate, Alpine; forest distribution in India and J&K specifically',
          'Wildlife resources — Major wildlife zones of India; J&K key species (Hangul/Kashmir Stag, Snow Leopard, Markhor, Himalayan Brown Bear, Musk Deer)',
          'Biodiversity / Biological Diversity — Definition, levels (genetic, species, ecosystem), hot spots, India\'s biodiversity (Western Ghats, Eastern Himalayas)',
          'Endangered species of Animals and Plants — IUCN Red List categories (Critically Endangered, Endangered, Vulnerable); examples from India and J&K',
          'Conservation of Forests and Wildlife in India — Wildlife (Protection) Act 1972, Forest Conservation Act 1980, National Parks vs Wildlife Sanctuaries vs Biosphere Reserves',
          'Project Tiger — Launch year (1973), current status, tiger reserves in India, success story',
          'Community Conservation — Joint Forest Management (JFM), Eco-development Committees, community reserves concept',
          'Impact of deforestation — Soil erosion, loss of biodiversity, climate change, disruption of water cycle, impact on tribal communities',
        ],
      },
    ],

    examPattern: [
      { section: 'Mathematics', questions: 25, marks: 25 },
      { section: 'Basic Reasoning', questions: 25, marks: 25 },
      { section: 'English', questions: 25, marks: 25 },
      { section: 'General Awareness — India & J&K (Part A)', questions: 25, marks: 25 },
      { section: 'Forest & Wildlife (Part B)', questions: 20, marks: 20 },
      { section: 'Total', questions: 120, marks: 120, isTotal: true },
    ],
    examPatternNote: 'Source: JKSSB Official Syllabus Notice dated 09.04.2025. Negative marking per JKSSB standard (−0.25 per wrong — verify with official notification). Physical Efficiency Test follows written round.',

    eligibility: {
      age: '18–40 years (General). SC/ST: +5 years. OBC: +3 years. PwD: +10 years.',
      education: 'Matriculation (10th pass) from a recognised Board. No graduation required.',
      domicile: 'Valid J&K Domicile Certificate mandatory.',
    },

    selectionProcess: [
      'Written Examination — 120 questions, 120 marks, OMR-based',
      'Physical Efficiency Test (PET) — Qualifying round with running/physical standards',
      'Medical Examination — General fitness, eyesight, height/weight standards',
      'Document Verification — Domicile, education, category certificates',
      'Final Merit List — Based on written exam marks (PET/Medical are qualifying only)',
    ],

    salary: [
      { post: 'Wildlife Guard (Group D)', level: 'Level 2', payScale: '₹19,900 – ₹63,200' },
    ],

    preparationTips: [
      'Mathematics is 25 marks — do not skip it. The topics (Percentage, Time-Work-Distance, Mensuration, LCM/HCF) are all Class 8–10 level. With 2–3 weeks of practice, you can secure 20+ marks here.',
      'Forest & Wildlife carries only 20 marks out of 120 — important but not dominant. Focus on Project Tiger (1973), Biodiversity hotspots, IUCN Red List categories, and the key J&K wildlife species. These are direct factual questions.',
      'The General Awareness Part A (25 marks) covers J&K History, Geography, and Culture plus national current affairs. J&K-specific topics (geography of passes/rivers, Kashmiri handicrafts, history of accession) frequently appear and are your home advantage as a J&K candidate.',
      'Basic Reasoning questions are at Class 10 difficulty — Analogy, Number Series, Coding-Decoding, Venn Diagrams. These are fully scoreable with 3–4 weeks of daily practice. Aim for 20+/25.',
      'Physical preparation is non-negotiable. Start training for the PET (running/long jump) from day one alongside your written preparation. Many candidates clear the written exam and fail the PET — don\'t be one of them.',
    ],
  },

  // ─── JKSSB Veterinary Pharmacist ─────────────────────────────────────────────
  // Source: JKSSB Advertisement Notification 03 of 2026; exam held 02-03-2025
  'jkssb-veterinary-pharmacist': {
    title: 'JKSSB Veterinary Pharmacist — Official Syllabus & Exam Pattern 2025',
    shortName: 'JKSSB Veterinary Pharmacist',
    tagline: 'Official syllabus for JKSSB Veterinary Pharmacist — 120 questions, 120 marks, 2 hours. English, GK, Reasoning, Computer + 60 marks of Zoology, Physiology, Evolution & Immunology. Solved 2025 paper with answer key.',

    examSlug: 'jkssb',
    paperSearchTerm: 'veterinary pharmacist',

    papers: [
      { slug: 'jkssb-veterinary-pharmacist-2025', title: 'JKSSB Veterinary Pharmacist — 2 March 2025', year: '2025', questions: 120 },
    ],

    conductingBody: 'J&K Services Selection Board (JKSSB)',
    officialWebsite: 'https://jkssb.nic.in',
    examLevel: 'UT Level (Jammu & Kashmir) — Animal Husbandry Department',
    examMode: 'OMR-based Written Test only (No Interview)',

    about: [
      'The JKSSB Veterinary Pharmacist is a Group C post under the Animal Husbandry Department of J&K UT. Veterinary Pharmacists are responsible for dispensing medicines, maintaining drug inventories, assisting veterinary officers in treatment of livestock and animals, and managing pharmaceutical records at veterinary hospitals and dispensaries across Jammu and Kashmir.',
      'The written examination consists of 120 objective-type MCQ questions carrying 1 mark each, with a duration of 2 hours. Negative marking of −0.25 marks applies per wrong answer. The paper has a strong subject-specific component — approximately 60 out of 120 marks are from Zoology, Animal Physiology, Evolution, and Immunology, making it one of the most science-heavy JKSSB exams. The remaining 60 marks cover English, General Knowledge & Current Affairs (including J&K-specific topics), Reasoning & Mental Ability, and Computer Knowledge.',
      'JKSSB Advertisement Notification 03 of 2026 announced 194 vacancies for Veterinary Pharmacist. The exam held on 2 March 2025 (Set A) is fully solved and available on Ministry of Papers. Selection is made purely on written exam merit — there is no interview stage. Document verification follows shortlisting.',
    ],

    patternNotification: 'Based on JKSSB Advertisement Notification 03/2026. Exam held 02-03-2025. Pattern derived from official question paper (Set A, Booklet No. 849273).',

    quickFacts: [
      { label: 'Vacancies', value: '194 posts' },
      { label: 'Total Marks', value: '120' },
      { label: 'Duration', value: '2 Hours' },
      { label: 'Negative Marking', value: '−0.25 per wrong answer' },
      { label: 'English', value: '~15 marks' },
      { label: 'General Knowledge & J&K', value: '~20 marks' },
      { label: 'Reasoning', value: '~15 marks' },
      { label: 'Computer Knowledge', value: '~10 marks' },
      { label: 'Zoology / Biology (subject-specific)', value: '~60 marks' },
      { label: 'Qualification', value: 'B.Sc with Zoology' },
      { label: 'Pay Level', value: 'Level 4 — ₹25,500 to ₹81,100' },
      { label: 'Interview', value: 'None — merit-based written exam only' },
    ],

    syllabus: [
      {
        subject: 'Section 1 — English Language (~15 marks)',
        topics: [
          'Synonyms and Antonyms — vocabulary-based word meaning questions',
          'Idioms and Phrases — meaning of common English idioms (skeleton in the cupboard, kick the bucket)',
          'One Word Substitution — single word for a definition',
          'Analogies — word pairs with same relationship (DIVA : OPERA)',
          'Articles — correct use of A, An, The with proper nouns and specific objects',
          'Prepositions — correct preposition after adjectives and verbs',
          'Grammar — tenses, subject-verb agreement, active/passive voice',
          'Clauses — identify noun clause, adjective clause, adverbial clause, relative clause',
          'Narration — direct to indirect speech and vice versa',
          'Error Spotting — identify grammatical error in a sentence segment',
          'Sentence Improvement — select correct alternative for underlined part',
          'Fill in the Blanks — vocabulary and grammar based',
          'Spelling — identify correctly/incorrectly spelt word',
          'Reading Comprehension — short passage with 2–3 questions',
          'Pronouns — reflexive, demonstrative, possessive pronouns',
        ],
      },
      {
        subject: 'Section 2 — General Knowledge & Current Affairs (~20 marks)',
        topics: [
          'Indian History — Civil Disobedience Movement (1930), Quit India (1942), Jallianwala Bagh (1919), Indus Valley Civilisation',
          'Indian Polity — Fundamental Duties (Article 51A), Preamble amendments, Attorney General, Preamble features',
          'Indian Geography — Dakshin Ganga (Godavari), shifting cultivation (Jhum), climate',
          'International Affairs — SAARC founding members, UNSC composition (Article 23), military exercises (Yudh Abhyaas, Zapad, Mitra-Shakti)',
          'Science & Technology — ITER nuclear fusion, SPaDeX mission, India\'s three-stage nuclear programme, Chang\'e-6 lunar mission',
          'Awards & Honours — Nobel Prize 2025, Kalinga Award (popularisation of science)',
          'Economy — Economic Survey 2025–26, Mission Atmanirbharta in Pulses, major ports (Kamarajar, Vizhinjam)',
          'Government Schemes — MNREGA, Mid-Day Meals, National Old Age Pension, Indira Awas Yojana',
          'J&K — RTI Act applicability (2019), Article 370, Dogri script, climate of Jammu, first legislature of J&K',
          'J&K Wetlands & Geography — Hokersar (Srinagar), Mansar (Samba), Wular (Bandipora), Hygam (Baramulla)',
          'J&K Schemes — MUMKIN Livelihood Generation Scheme (18–35 years, ₹80,000 subsidy)',
          'J&K ODOP — One District One Product matches (Baramulla-Apples, Udhampur-Pickles, Samba-Mushroom, Ramban-Honey)',
          'Current Affairs — Newspaper slogans (Indian Express = "Journalism of Courage", State Times = "Bold Voice of J&K")',
          'Computer Numbers — Decimal vs Hexadecimal, binary fractions',
        ],
      },
      {
        subject: 'Section 3 — Reasoning & Mental Ability (~15 marks)',
        topics: [
          'Number Series — arithmetic progressions, difference patterns (22, 33, 46, 61, 78, ?)',
          'Letter Series — position-based shifts, alternating pattern series (Z,X,U,Q,L,? ; AZ,BY,CX,DW,?)',
          'Coding-Decoding — letter shift codes (+2, +3 Caesar cipher type)',
          'Blood Relations — multi-step family tree problems',
          'Direction Sense — net displacement after multiple turns',
          'Analogies — letter pair relationships (AST:BRU :: NQV:?)',
          'Assertion & Reason — logical sufficiency of reasons',
          'Percentage — price increase/decrease to maintain same expenditure',
          'Trains — time to cross driver of opposing train',
          'Statement & Assumptions — what is implicit in a statement',
          'Figure Counting — counting triangles in a figure (medians of triangle = 18)',
          'Pattern Completion — visual figure sequence completion',
          'Mathematical Concepts Matching — formulas for CI, SI, Trigonometry, P&L',
          'Gambler\'s Fallacy type — probability assertion-reason questions',
        ],
      },
      {
        subject: 'Section 4 — Computer Knowledge (~10 marks)',
        topics: [
          'Basics — HTML (web pages), ASCII (American Standard Code for Information Interchange)',
          'Operating Systems — types (Batch, Time-Sharing, Distributed, Network), Windows as multitasking OS',
          'Internet — search engines (Bing = Microsoft), email protocols (SMTP for sending), DNS + HTTP/HTTPS',
          'Hardware — input devices (Trackball, Graphics tablet, Joystick), output devices (Printer), device drivers',
          'Memory — Cache vs RAM speed, SSDs faster than HDDs, virtual memory, DRAM is volatile',
          'Software — ICT vs IT distinction, software license vs copyright, BIOS function during boot',
          'MS Office — Slide Master (PowerPoint), section breaks for different page numbering (Word), Excel IF formula syntax, Database management',
          'Networking — LAN vs Internet, Gmail needs internet access, cloud storage integration for large email attachments',
          'File Systems — OS role in mapping file names to physical storage locations',
          'Cybersecurity — Linux preferred OS for network testing and pentesting',
        ],
      },
      {
        subject: 'Section 5 — Zoology & Animal Kingdom (~30 marks)',
        topics: [
          'Five Kingdom Classification — Whittaker\'s classification; Monera vs Protista similarities',
          'Porifera — Classes (Calcarea, Hexactinellida, Demospongiae, Sclerospongiae) and their features; intracellular digestion; water flow (ostia → osculum)',
          'Cnidaria — Gastrovascular cavity (digestive + circulatory); no separate circulatory system; diffusion-based transport',
          'Platyhelminthes — Acoelomate; triploblastic; bilaterally symmetrical; flame cells for excretion; Taenia solium (humans = definitive host, pig = intermediate)',
          'Nematoda — Renette cells for excretion in Ascaris (NOT flame cells)',
          'Arthropoda — Complete metamorphosis (Mosquito = holometabolous); Johnston\'s organ in mosquito antennae; pleuron connects tergum and sternum; cockroach head',
          'Mollusca — Classes (Gastropoda-snail, Bivalvia-oyster, Cephalopoda-octopus, Polyplacophora-chiton); torsion in gastropods (defence mechanism); enzymes in Pila (Protease in resorptive cells)',
          'Echinodermata — Tube feet (locomotion + feeding), Madreporite (water entry), Pedicellariae (defence + cleaning), Radial canal (water distribution); 5 eye spots in sea star',
          'Protozoa — Kinetodesmata (coordinate cilia); Groups: Amoeboid (Amoeba proteus), Ciliates (Paramecium), Flagellates (Euglena), Sporozoans (Plasmodium), Dinoflagellates (Gonyaulax), Slime moulds (Physarum)',
          'Chordata — Cephalochordates (notochord retained throughout life; Amphioxus); Urochordates (endostyle = filter feeding, mucus trapping, homologous to thyroid gland)',
          'Pisces — Chondrichthyes (Scoliodon), Cypriniformes (Labeo-Rohu), Siluriformes (Clarias)',
          'Amphibia — Indian Bull Frog = Rana tigrina; parental care: males guard eggs, Darwin\'s frog = vocal sac for tadpoles',
          'Reptilia — Squamata includes lizards and snakes',
          'Aves — Passeriformes (Sparrow), Accipitriformes (Eagle), Columbiformes (Pigeon); uropygial gland makes feathers waterproof',
          'Mammalia — Metatheria (marsupials): poorly developed placenta, scrotum in front of penis, corpus callosum small/absent',
        ],
      },
      {
        subject: 'Section 6 — Human Physiology (~10 marks)',
        topics: [
          'Digestion — Gastrin stimulates HCl secretion from parietal cells; Cholecystokinin (CCK) stimulates trypsin and lipase (NOT pepsin)',
          'Respiration — Partial pressure of O₂ in alveolar air ≈ 104 mm Hg; Respiratory Quotient (high RQ = aerobic carbohydrate respiration)',
          'Excretion — Loop of Henle: concentration gradient; without loop → dilute urine; Marine teleosts excrete ammonia; hyposmotic to seawater (drink seawater)',
          'Nervous System — Nerve impulse sequence: depolarisation → action potential → repolarisation → Na+/K+ pump; Resting membrane potential −70 mV; more permeable to K+ at rest',
          'Brain — Cerebrum (memory/thinking), Cerebellum (voluntary movement coordination), Medulla oblongata (heartbeat/breathing), Hypothalamus (temperature/hunger)',
          'Eye — Rods (dim light/B&W), Cones (bright light/colour), Fovea (highest cone density, sharp vision), Optic nerve (transmits signals to brain)',
          'Osmoregulation — Marine fish: hypoosmotic; drink seawater; excrete salt via gill chloride cells; Freshwater fish: hyperosmotic; produce dilute urine',
        ],
      },
      {
        subject: 'Section 7 — Evolution (~10 marks)',
        topics: [
          'Theories — Lamarck: inheritance of acquired characters; Darwin: natural selection; Ernst Mayr: Biological Species Concept; Dobzhansky: Modern Synthetic Theory (Neo-Darwinism)',
          'Natural Selection Types — Stabilizing selection: favours INTERMEDIATE phenotypes, reduces diversity (NOT extreme); Industrial melanism: Peppered moth (Biston betularia)',
          'Horse Evolution — Eohippus (dawn horse, 4 toes) → Mesohippus (3 toes, forest) → Merychippus (grazing, plains) → Equus (modern, 1 toe)',
          'Palaeontology — Java Man: Eugène Dubois, 1891, banks of Solo River, Eastern Java',
          'Speciation — Allopatric speciation sequence: Geographical isolation → Ecological isolation → Pre-mating reproductive isolation → Selection completed',
          'Sibling Species — morphologically similar, sympatric, reproductively isolated, NOT genetically identical',
          'Origin of Life — Stromatolites formed by photosynthetic prokaryotes (cyanobacteria)',
          'Population genetics — Unit of evolution = POPULATION (not individual)',
          'Genetic Variation — Arises from both sexual reproduction AND mutations (not sexual reproduction alone)',
        ],
      },
      {
        subject: 'Section 8 — Immunology (~10 marks)',
        topics: [
          'Innate Immunity — Toll-like receptors (TLRs); scavenger receptors; pattern recognition receptors (PAMPs); MHC is NOT part of innate immunity',
          'MHC / HLA — MHC Class I: recognised by CD8+ cytotoxic T cells; MHC Class II: recognised by CD4+ helper T cells; In humans MHC = HLA (Human Leukocyte Antigens)',
          'Antigen Processing — Endogenous pathway: proteasome → peptides transported to ER (TAP) → bind MHC Class I → surface presentation',
          'T Cells — Regulatory T cells (Tregs): suppress immune responses, prevent autoimmunity',
          'B Cells — Undergo mitosis (clonal expansion) and transcription (antibody production); do NOT phagocytose bacteria',
          'Antibodies — IgA (mucosal secretions: saliva, tears, breast milk); IgG (blood and extracellular fluid); IgD (surface of naive B cells); IgE (basophils and mast cells). Structure = H₂L₂ (2 heavy + 2 light chains)',
          'Cytokines — IL-1 (inflammation, fever, T-cell activation); IL-2 (T-cell growth, adaptive immunity); IFN-γ (macrophage activation); TNF-α (inflammation, apoptosis)',
          'Complement System — C5a: strongly chemotactic for neutrophils; C3b: opsonin; C5b: initiates membrane attack complex (MAC)',
        ],
      },
    ],

    examPattern: [
      { section: 'English Language', questions: 15, marks: 15 },
      { section: 'General Knowledge & Current Affairs (India + J&K)', questions: 20, marks: 20 },
      { section: 'Reasoning & Mental Ability', questions: 15, marks: 15 },
      { section: 'Computer Knowledge', questions: 10, marks: 10 },
      { section: 'Zoology & Animal Kingdom', questions: 30, marks: 30 },
      { section: 'Human Physiology', questions: 10, marks: 10 },
      { section: 'Evolution', questions: 10, marks: 10 },
      { section: 'Immunology', questions: 10, marks: 10 },
      { section: 'Total', questions: 120, marks: 120, isTotal: true },
    ],
    examPatternNote: 'Distribution derived from official 2025 paper (Set A, held 02-03-2025). Approximately 50% of the paper is subject-specific (Zoology, Physiology, Evolution, Immunology). Negative marking: −0.25 per wrong answer.',

    eligibility: {
      age: '18–40 years (General). SC/ST/RBA/ALC/IB/EWS/OBC: up to 43 years. PwD: up to 42 years. Ex-Servicemen: up to 48 years. Age as on 01 January 2026.',
      education: 'B.Sc from a recognised university with Zoology as one of the subjects. Zoology is mandatory — a B.Sc without Zoology does not qualify.',
      domicile: 'Valid J&K UT Domicile Certificate mandatory. Certificate must be issued before the last date of application submission.',
    },

    selectionProcess: [
      'Written / OMR Examination — 120 MCQ questions, 120 marks, 2 hours',
      'Document Verification — Shortlisted candidates submit original certificates (Domicile, B.Sc marksheets, category certificate)',
      'Final Merit List — Based purely on marks in written examination. No interview.',
    ],

    salary: [
      { post: 'Veterinary Pharmacist (Group C)', level: 'Level 4', payScale: '₹25,500 – ₹81,100' },
    ],

    preparationTips: [
      'Zoology and Biology account for ~60 marks out of 120 — this is the section that will make or break your rank. Cover all 8 biology topics: Animal Kingdom (Porifera to Mammalia), Physiology, Evolution, and Immunology. Use your B.Sc Zoology notes alongside NCERT Biology Class 11–12.',
      'Immunology (10 marks) is the most specialised topic. Focus on: MHC Class I vs II, CD4 vs CD8 roles, antibody structure (H₂L₂), immunoglobulin types (IgA/IgG/IgD/IgE locations), complement C5a, and cytokines (IL-1, IL-2, IFN-γ). These are direct factual questions.',
      'General Knowledge & Current Affairs (20 marks) has a strong J&K component. Expect questions on J&K wetlands, ODOP scheme, J&K reorganisation (Article 370, RTI Act), J&K history (first legislature, Dogri script), and JKSSB schemes like MUMKIN.',
      'English (15 marks) is the most predictable section. Practise idioms, synonyms/antonyms, direct-indirect speech, clause identification, and grammar rules. The 2025 paper had no reading comprehension — vocabulary and grammar dominated.',
      'Computer Knowledge (10 marks) is entirely from Class 10–12 level IT concepts — HTML, ASCII, OS types, input/output devices, memory types, MS Office features. Do not skip this section; it is the easiest 10 marks available.',
      'Reasoning (15 marks) is moderate difficulty — Number Series, Letter Series, Coding-Decoding, Blood Relations, Direction Sense. Practise these daily for 2–3 weeks to secure 12+/15.',
    ],
  },

}
