// Auto-generated empirical exam intelligence: Master High-Yield Topics, Official Category-Wise Cutoffs,
// and Year-Wise Paper Topic X-Rays derived from solved questions and official result notifications.

export type MasterTopicRow = {
  subject: string
  topic: string
  totalQuestions: number
  yearBreakdown: string
  priority: 'Must-Study' | 'High-Yield' | 'Moderate'
  whatIsAsked: string
}

export type GuideCutoffRow = {
  category: string
  marks: string
  pct: number
  safeTarget?: string
  note?: string
}

export type GuideCutoffSet = {
  year: string
  label: string
  maxMarks: number
  vacancies?: string
  appeared?: string
  topperScore?: string
  meanScore?: string
  sourceNote: string
  rows: GuideCutoffRow[]
}

export type ShadedTopic = {
  name: string
  count: number
  tier?: 'high' | 'mid' | 'low'
}

export type MasterSectionRow = {
  subject: string
  totalQuestions: number
  topics: ShadedTopic[]
}

export type PaperSectionXray = {
  subject: string
  questionCount: number
  sharePct: number
  topics: ShadedTopic[]
}

export type PaperXray = {
  paperSlug: string
  paperTitle: string
  year: string
  heldOn: string
  totalQuestions: number
  maxMarks: number
  sections: PaperSectionXray[]
}

export type ScoreDistBar = {
  range: string
  candidates: number
  pct: number
}

export type ScoreDistribution = {
  label: string
  appeared: number
  registered: number
  topScore: string
  meanScore: string
  medianScore: string
  sourceNote: string
  bars: ScoreDistBar[]
}

export type GuideIntelligence = {
  examSlug: string
  totalPapersAnalyzed: number
  totalQuestionsAnalyzed: number
  masterSections: MasterSectionRow[]
  masterTopics: MasterTopicRow[]
  cutoffSets: GuideCutoffSet[]
  scoreDistributions: ScoreDistribution[]
  paperXrays: PaperXray[]
}

export const GUIDE_INTELLIGENCE: Record<string, GuideIntelligence> = {
  "jkssb-faa": {
    "examSlug": "jkssb-faa",
    "totalPapersAnalyzed": 3,
    "totalQuestionsAnalyzed": 360,
    "masterSections": [
      {
        "subject": "Accountancy and Book Keeping",
        "totalQuestions": 90,
        "topics": [
          {
            "name": "Accounting Concepts & Standards (GAAP/IFRS)",
            "count": 36,
            "tier": "high"
          },
          {
            "name": "Financial & Social Audit / Vouchers",
            "count": 10,
            "tier": "mid"
          },
          {
            "name": "Taxation & GST Laws",
            "count": 9,
            "tier": "mid"
          },
          {
            "name": "Cost Accounting & Budgetary Control",
            "count": 8,
            "tier": "mid"
          },
          {
            "name": "Ledger & Trial Balance",
            "count": 8,
            "tier": "mid"
          },
          {
            "name": "Final Accounts & Balance Sheet",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Bank Reconciliation Statement (BRS)",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Partnership Accounts",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Public Financial Management (PFMS)",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Double Entry, Journal & Accounting Equation",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 79,
        "topics": [
          {
            "name": "J&K History, Heritage, Culture & Tourism",
            "count": 22,
            "tier": "high"
          },
          {
            "name": "National & International Current Affairs",
            "count": 21,
            "tier": "high"
          },
          {
            "name": "Indian Geography, Rivers, Lakes & Transport",
            "count": 13,
            "tier": "high"
          },
          {
            "name": "J&K Geography, Rivers, Lakes & Flora/Fauna",
            "count": 8,
            "tier": "mid"
          },
          {
            "name": "Environment, Ecology & Biodiversity",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Census & Demography of India",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Indian Culture, Heritage & Freedom Struggle",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "J&K Reorganisation Act, 2019",
            "count": 3,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "General Science",
        "totalQuestions": 40,
        "topics": [
          {
            "name": "Biology (Nutrition, Respiration & Plant Transport)",
            "count": 18,
            "tier": "high"
          },
          {
            "name": "Physics (Newton's Laws, Motion & Electricity)",
            "count": 9,
            "tier": "mid"
          },
          {
            "name": "Chemistry (Chemical Equations, Metals & Non-Metals)",
            "count": 6,
            "tier": "mid"
          },
          {
            "name": "Vitamins, Deficiency & Communicable Diseases",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Ecosystem, Ozone/Greenhouse & Energy Sources",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Statistics",
        "totalQuestions": 31,
        "topics": [
          {
            "name": "Primary/Secondary Data, Questionnaires & Tabulation",
            "count": 13,
            "tier": "high"
          },
          {
            "name": "Vital Statistics, Fertility & Demography",
            "count": 6,
            "tier": "mid"
          },
          {
            "name": "Probability & Theory of Attributes",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Measures of Central Tendency",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Index Numbers (WPI, CPI & Fisher)",
            "count": 3,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 30,
        "topics": [
          {
            "name": "Computer Hardware, CPU, Memory & Storage",
            "count": 10,
            "tier": "high"
          },
          {
            "name": "Input & Output Devices",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "MS Office (Word, Excel, PowerPoint & Access)",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Computer Virus, Anti-Virus & Security",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Internet, E-Mail Protocols & IT in Governance",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Operating Systems & Open Source Technologies",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Economy",
        "totalQuestions": 30,
        "topics": [
          {
            "name": "Economic Reforms, Planning & Developing Economy",
            "count": 11,
            "tier": "high"
          },
          {
            "name": "Consumer Demand & Indifference Curve Analysis",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Fiscal & Monetary Policy & Role of RBI",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Pricing Under Various Forms of Market",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "National Income (GDP/GNP) & Economic Growth",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Factors of Production, Laws & Factor Pricing",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 30,
        "topics": [
          {
            "name": "Tenses & Subject-Verb Agreement",
            "count": 11,
            "tier": "high"
          },
          {
            "name": "Articles, Prepositions & Modals",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Synonyms, Antonyms & Homophones",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Idioms & Phrases",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Active & Passive Voice",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Clauses & Sentence Structure",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Direct & Indirect Narration",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Mathematics",
        "totalQuestions": 30,
        "topics": [
          {
            "name": "Linear Equations in Two Variables",
            "count": 12,
            "tier": "high"
          },
          {
            "name": "Set Theory, Relations & Functions",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Simple & Compound Interest",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Permutations, Combinations & Binomial Theorem",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Vectors, Coordinate & 3D Geometry",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Limits & Derivatives (Calculus)",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Matrices & Determinants",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Probability",
            "count": 1,
            "tier": "low"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Accountancy and Book Keeping",
        "topic": "Accounting Concepts & Standards (GAAP/IFRS)",
        "totalQuestions": 36,
        "yearBreakdown": "2026: 11 Qs · 2024: 11 Qs · 2022: 14 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Accounting Equation (Assets = Liabilities + Capital), Going Concern, Accrual, Conservatism, AS & Ind-AS / IFRS standards, Capital vs Revenue expenditure."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "J&K History, Heritage, Culture & Tourism",
        "totalQuestions": 22,
        "yearBreakdown": "2026: 4 Qs · 2024: 5 Qs · 2022: 13 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Dogra Dynasty (Treaty of Amritsar 1846), Rajatarangini, Karkota/Utpala/Lohara dynasties, Sufi shrines, folk dances (Rouf, Kud), GI-tagged handicrafts & tourist circuits."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "National & International Current Affairs",
        "totalQuestions": 21,
        "yearBreakdown": "2026: 10 Qs · 2024: 6 Qs · 2022: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "National flagship schemes, Union Budget highlights, sports awards, space missions (ISRO), international summits (G20, BRICS, SCO) & bilateral exercises."
      },
      {
        "subject": "General Science",
        "topic": "Biology (Nutrition, Respiration & Plant Transport)",
        "totalQuestions": 18,
        "yearBreakdown": "2026: 3 Qs · 2024: 10 Qs · 2022: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Autotrophic vs Heterotrophic nutrition, aerobic vs anaerobic respiration, xylem (water/minerals) vs phloem (translocation of food), human digestive & circulatory systems."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Geography, Rivers, Lakes & Transport",
        "totalQuestions": 13,
        "yearBreakdown": "2026: 8 Qs · 2024: 2 Qs · 2022: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Himalayan vs Peninsular river systems, major dams & lakes, monsoon mechanism, National Highways, ports, railway zones & cropping seasons."
      },
      {
        "subject": "Statistics",
        "topic": "Primary/Secondary Data, Questionnaires & Tabulation",
        "totalQuestions": 13,
        "yearBreakdown": "2026: 4 Qs · 2024: 5 Qs · 2022: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Direct personal vs indirect oral investigation, qualities of a good questionnaire, chronological/spatial/quantitative classification & parts of a statistical table."
      },
      {
        "subject": "Mathematics",
        "topic": "Linear Equations in Two Variables",
        "totalQuestions": 12,
        "yearBreakdown": "2026: 4 Qs · 2024: 3 Qs · 2022: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Consistency of $a_1x+b_1y+c_1=0$ and $a_2x+b_2y+c_2=0$ (unique solution, infinitely many solutions, no solution / parallel lines) & word problems."
      },
      {
        "subject": "Economy",
        "topic": "Economic Reforms, Planning & Developing Economy",
        "totalQuestions": 11,
        "yearBreakdown": "2026: 2 Qs · 2024: 6 Qs · 2022: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "1991 LPG reforms, Five-Year Plans (Mahalanobis model, Gadgil formula), NITI Aayog, characteristics of developing economies, poverty & unemployment."
      },
      {
        "subject": "General English",
        "topic": "Tenses & Subject-Verb Agreement",
        "totalQuestions": 11,
        "yearBreakdown": "2026: 5 Qs · 2024: 3 Qs · 2022: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Present perfect vs simple past, past perfect sequence of tenses, conditional clauses (If-clauses) & subject-verb agreement with collective nouns."
      },
      {
        "subject": "Accountancy and Book Keeping",
        "topic": "Financial & Social Audit / Vouchers",
        "totalQuestions": 10,
        "yearBreakdown": "2026: 4 Qs · 2024: 2 Qs · 2022: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Vouching of cash transactions, primary vs collateral vouchers, internal check vs statutory audit, Social Accounting & Social Audit concepts."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Hardware, CPU, Memory & Storage",
        "totalQuestions": 10,
        "yearBreakdown": "2026: 4 Qs · 2024: 4 Qs · 2022: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "ALU & Control Unit, registers, Cache, RAM (SRAM vs DRAM), ROM (PROM, EPROM, EEPROM), secondary storage (SSD vs HDD) & memory hierarchy."
      },
      {
        "subject": "Accountancy and Book Keeping",
        "topic": "Taxation & GST Laws",
        "totalQuestions": 9,
        "yearBreakdown": "2026: 2 Qs · 2024: 4 Qs · 2022: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Direct vs Indirect taxes, GST structure (CGST, SGST, IGST), GST Council (Article 279A), input tax credit, Income Tax slabs & deductions."
      },
      {
        "subject": "General Science",
        "topic": "Physics (Newton's Laws, Motion & Electricity)",
        "totalQuestions": 9,
        "yearBreakdown": "2026: 3 Qs · 2024: 4 Qs · 2022: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Newton's 1st/2nd/3rd laws, conservation of momentum, equations of motion, Ohm's law ($V=IR$), series/parallel resistors, electric power ($P=VI=I^2R$) & commercial kWh."
      },
      {
        "subject": "Accountancy and Book Keeping",
        "topic": "Cost Accounting & Budgetary Control",
        "totalQuestions": 8,
        "yearBreakdown": "2026: 5 Qs · 2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Prime Cost, Factory Overhead, Cost of Production, Marginal Costing, Break-Even Point (BEP), P/V Ratio, Zero-Based & Flexible Budgeting."
      },
      {
        "subject": "Accountancy and Book Keeping",
        "topic": "Ledger & Trial Balance",
        "totalQuestions": 8,
        "yearBreakdown": "2026: 2 Qs · 2024: 2 Qs · 2022: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Posting from Journal to Ledger, balancing of accounts, Suspense Account, one-sided vs two-sided errors, errors not disclosed by Trial Balance."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "J&K Geography, Rivers, Lakes & Flora/Fauna",
        "totalQuestions": 8,
        "yearBreakdown": "2026: 2 Qs · 2024: 3 Qs · 2022: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Indus, Jhelum, Chenab, Ravi & Tawi basins, Wular/Dal/Mansar lakes, mountain passes (Zoji La, Banihal, Sinthan), Karewa soils, saffron & Dachigam/Hemis fauna."
      },
      {
        "subject": "General Science",
        "topic": "Chemistry (Chemical Equations, Metals & Non-Metals)",
        "totalQuestions": 6,
        "yearBreakdown": "2026: 3 Qs · 2024: 2 Qs · 2022: 1 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "Combination, Decomposition, Displacement & Redox reactions, reactivity series, amphoteric oxides ($\\text{Al}_2\\text{O}_3, \\text{ZnO}$), ores, alloys & corrosion."
      },
      {
        "subject": "Statistics",
        "topic": "Vital Statistics, Fertility & Demography",
        "totalQuestions": 6,
        "yearBreakdown": "2026: 3 Qs · 2024: 2 Qs · 2022: 1 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "Crude Birth Rate (CBR), General/Age-Specific Fertility Rate, Total Fertility Rate (TFR), Gross & Net Reproduction Rate (GRR & NRR), Infant Mortality Rate (IMR)."
      }
    ],
    "cutoffSets": [
      {
        "year": "2026",
        "label": "2026 Expected Cutoff & Safe Score (15 Nov 2026 · Advt. 10/2025)",
        "maxMarks": 120,
        "vacancies": "600 Posts (UT Cadre)",
        "appeared": "~1.15+ Lakh Appeared",
        "topperScore": "108+ / 120 (Projected)",
        "meanScore": "51.0 / 120 (Est.)",
        "sourceNote": "Projected from Set C difficulty analysis (moderate-to-analytical Accountancy & Statistics) and 600 UT-cadre vacancies under Advt. 10 of 2025.",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "89.00 – 93.00",
            "pct": 76,
            "safeTarget": "94+ Marks",
            "note": "300 OM posts; high competition in top bracket"
          },
          {
            "category": "RBA (Resident of Backward Area)",
            "marks": "84.00 – 87.00",
            "pct": 71,
            "safeTarget": "88+ Marks",
            "note": "10% vertical reservation (60 posts)"
          },
          {
            "category": "EWS (Economically Weaker Section)",
            "marks": "81.00 – 84.50",
            "pct": 69,
            "safeTarget": "85+ Marks",
            "note": "10% reservation (60 posts)"
          },
          {
            "category": "OBC (Other Backward Classes)",
            "marks": "80.00 – 83.50",
            "pct": 68,
            "safeTarget": "84+ Marks",
            "note": "8% reservation under revised J&K rules"
          },
          {
            "category": "ALC / IB",
            "marks": "79.00 – 82.50",
            "pct": 67,
            "safeTarget": "83+ Marks",
            "note": "4% reservation (Actual Line of Control / IB)"
          },
          {
            "category": "SC (Scheduled Caste)",
            "marks": "75.00 – 78.50",
            "pct": 64,
            "safeTarget": "80+ Marks",
            "note": "8% reservation (48 posts)"
          },
          {
            "category": "ST-1 & ST-2 (Scheduled Tribes)",
            "marks": "70.00 – 75.00",
            "pct": 60,
            "safeTarget": "76+ Marks",
            "note": "20% combined ST-1 (10%) & ST-2 (10%) quota"
          }
        ]
      },
      {
        "year": "2024",
        "label": "2024 Official Selection Cutoff (28 Jan 2024 · Advt. 04/2020)",
        "maxMarks": 120,
        "vacancies": "972 Posts (OM: 486, RBA: 97, ST: 97, EWS: 97, SC: 78, OSC/ALC/PSP: 39 each)",
        "appeared": "~1.26 Lakh Appeared",
        "topperScore": "109.50 / 120",
        "meanScore": "52.40 / 120",
        "sourceNote": "Based on JKSSB Scoresheet (09.02.2024) & Final Selection List (Notification No. 15-Selection of 2024) for 972 UT-cadre posts.",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "93.75 / 120",
            "pct": 78,
            "safeTarget": "486 Posts",
            "note": "Official closing merit in General category"
          },
          {
            "category": "RBA (Resident of Backward Area)",
            "marks": "88.50 / 120",
            "pct": 74,
            "safeTarget": "97 Posts",
            "note": "Closed ~5.25 marks below Open Merit"
          },
          {
            "category": "EWS (Economically Weaker Section)",
            "marks": "86.25 / 120",
            "pct": 72,
            "safeTarget": "97 Posts",
            "note": "Closed ~7.50 marks below Open Merit"
          },
          {
            "category": "PSP (Pahari Speaking People)",
            "marks": "85.75 / 120",
            "pct": 71,
            "safeTarget": "39 Posts",
            "note": "4% reservation under 2020 advertisement"
          },
          {
            "category": "OSC (Other Social Castes)",
            "marks": "85.25 / 120",
            "pct": 71,
            "safeTarget": "39 Posts",
            "note": "4% reservation under 2020 advertisement"
          },
          {
            "category": "ALC / IB",
            "marks": "84.00 / 120",
            "pct": 70,
            "safeTarget": "39 Posts",
            "note": "4% reservation"
          },
          {
            "category": "SC (Scheduled Caste)",
            "marks": "81.50 / 120",
            "pct": 68,
            "safeTarget": "78 Posts",
            "note": "8% vertical reservation"
          },
          {
            "category": "ST (Scheduled Tribe)",
            "marks": "76.75 / 120",
            "pct": 64,
            "safeTarget": "97 Posts",
            "note": "10% vertical reservation"
          }
        ]
      },
      {
        "year": "2022",
        "label": "2022 Written Exam Cutoff Benchmark (6 Mar 2022 Sitting)",
        "maxMarks": 120,
        "vacancies": "972 Posts (Advt. 04/2020 Initial Sitting)",
        "appeared": "~1.36 Lakh Appeared",
        "topperScore": "107.25 / 120",
        "meanScore": "49.80 / 120",
        "sourceNote": "Merit benchmark from the 6 March 2022 OMR sitting (120 marks, 0.25 negative marking).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "91.25 / 120",
            "pct": 76,
            "safeTarget": "486 Posts",
            "note": "Open Merit merit threshold"
          },
          {
            "category": "RBA",
            "marks": "85.50 / 120",
            "pct": 71,
            "safeTarget": "97 Posts",
            "note": "Resident of Backward Area"
          },
          {
            "category": "EWS",
            "marks": "80.75 / 120",
            "pct": 67,
            "safeTarget": "97 Posts",
            "note": "Economically Weaker Section"
          },
          {
            "category": "PSP / ALC-IB / OSC",
            "marks": "78.50 / 120",
            "pct": 65,
            "safeTarget": "117 Posts",
            "note": "Combined 4% sub-categories"
          },
          {
            "category": "SC",
            "marks": "76.25 / 120",
            "pct": 64,
            "safeTarget": "78 Posts",
            "note": "Scheduled Caste"
          },
          {
            "category": "ST",
            "marks": "73.00 / 120",
            "pct": 61,
            "safeTarget": "97 Posts",
            "note": "Scheduled Tribe"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkssb-accounts-assistant-finance-2026",
        "paperTitle": "JKSSB Finance Accounts Assistant Question Paper 2026",
        "year": "2026",
        "heldOn": "2026-11-15",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "Accountancy and Book Keeping",
            "questionCount": 30,
            "sharePct": 25,
            "topics": [
              {
                "name": "Accounting Concepts & Standards (GAAP/IFRS)",
                "count": 11,
                "tier": "high"
              },
              {
                "name": "Cost Accounting & Budgetary Control",
                "count": 5,
                "tier": "mid"
              },
              {
                "name": "Financial & Social Audit / Vouchers",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Final Accounts & Balance Sheet",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Ledger & Trial Balance",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Taxation & GST Laws",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Bank Reconciliation Statement (BRS)",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Double Entry, Journal & Accounting Equation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Public Financial Management (PFMS)",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 29,
            "sharePct": 24,
            "topics": [
              {
                "name": "National & International Current Affairs",
                "count": 10,
                "tier": "high"
              },
              {
                "name": "Indian Geography, Rivers, Lakes & Transport",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "J&K History, Heritage, Culture & Tourism",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Census & Demography of India",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Environment, Ecology & Biodiversity",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "J&K Geography, Rivers, Lakes & Flora/Fauna",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian Culture, Heritage & Freedom Struggle",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Statistics",
            "questionCount": 11,
            "sharePct": 9,
            "topics": [
              {
                "name": "Primary/Secondary Data, Questionnaires & Tabulation",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Vital Statistics, Fertility & Demography",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Probability & Theory of Attributes",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Index Numbers (WPI, CPI & Fisher)",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Measures of Central Tendency",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Computer Hardware, CPU, Memory & Storage",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Internet, E-Mail Protocols & IT in Governance",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "MS Office (Word, Excel, PowerPoint & Access)",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Virus, Anti-Virus & Security",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Operating Systems & Open Source Technologies",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Consumer Demand & Indifference Curve Analysis",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Economic Reforms, Planning & Developing Economy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Fiscal & Monetary Policy & Role of RBI",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Pricing Under Various Forms of Market",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "National Income (GDP/GNP) & Economic Growth",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Tenses & Subject-Verb Agreement",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Synonyms, Antonyms & Homophones",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Active & Passive Voice",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Clauses & Sentence Structure",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Science",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Biology (Nutrition, Respiration & Plant Transport)",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Chemistry (Chemical Equations, Metals & Non-Metals)",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Physics (Newton's Laws, Motion & Electricity)",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Vitamins, Deficiency & Communicable Diseases",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Linear Equations in Two Variables",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Permutations, Combinations & Binomial Theorem",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Set Theory, Relations & Functions",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vectors, Coordinate & 3D Geometry",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "jkssb-finance-accounts-2024-paper",
        "paperTitle": "JKSSB Finance Accounts Assistant Question Paper 2024",
        "year": "2024",
        "heldOn": "2024-01-28",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "Accountancy and Book Keeping",
            "questionCount": 30,
            "sharePct": 25,
            "topics": [
              {
                "name": "Accounting Concepts & Standards (GAAP/IFRS)",
                "count": 11,
                "tier": "high"
              },
              {
                "name": "Taxation & GST Laws",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Cost Accounting & Budgetary Control",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Partnership Accounts",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Bank Reconciliation Statement (BRS)",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Financial & Social Audit / Vouchers",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Ledger & Trial Balance",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Public Financial Management (PFMS)",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Final Accounts & Balance Sheet",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 20,
            "sharePct": 17,
            "topics": [
              {
                "name": "National & International Current Affairs",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "J&K History, Heritage, Culture & Tourism",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "J&K Geography, Rivers, Lakes & Flora/Fauna",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Environment, Ecology & Biodiversity",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian Geography, Rivers, Lakes & Transport",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian Culture, Heritage & Freedom Struggle",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "J&K Reorganisation Act, 2019",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Science",
            "questionCount": 20,
            "sharePct": 17,
            "topics": [
              {
                "name": "Biology (Nutrition, Respiration & Plant Transport)",
                "count": 10,
                "tier": "high"
              },
              {
                "name": "Physics (Newton's Laws, Motion & Electricity)",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Vitamins, Deficiency & Communicable Diseases",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Chemistry (Chemical Equations, Metals & Non-Metals)",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Ecosystem, Ozone/Greenhouse & Energy Sources",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Computer Hardware, CPU, Memory & Storage",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Computer Virus, Anti-Virus & Security",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Input & Output Devices",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Internet, E-Mail Protocols & IT in Governance",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "MS Office (Word, Excel, PowerPoint & Access)",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Economic Reforms, Planning & Developing Economy",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Consumer Demand & Indifference Curve Analysis",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Factors of Production, Laws & Factor Pricing",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Fiscal & Monetary Policy & Role of RBI",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Pricing Under Various Forms of Market",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Tenses & Subject-Verb Agreement",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Articles, Prepositions & Modals",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Synonyms, Antonyms & Homophones",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Clauses & Sentence Structure",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direct & Indirect Narration",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Linear Equations in Two Variables",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Permutations, Combinations & Binomial Theorem",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Set Theory, Relations & Functions",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Limits & Derivatives (Calculus)",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Matrices & Determinants",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vectors, Coordinate & 3D Geometry",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Statistics",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Primary/Secondary Data, Questionnaires & Tabulation",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Vital Statistics, Fertility & Demography",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Index Numbers (WPI, CPI & Fisher)",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Measures of Central Tendency",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Probability & Theory of Attributes",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "jkssb-accounts-assistant-finance-2022",
        "paperTitle": "JKSSB Finance Accounts Assistant Question Paper 2022",
        "year": "2022",
        "heldOn": "2022-03-06",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "Accountancy and Book Keeping",
            "questionCount": 30,
            "sharePct": 25,
            "topics": [
              {
                "name": "Accounting Concepts & Standards (GAAP/IFRS)",
                "count": 14,
                "tier": "high"
              },
              {
                "name": "Financial & Social Audit / Vouchers",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Ledger & Trial Balance",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Taxation & GST Laws",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Bank Reconciliation Statement (BRS)",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Double Entry, Journal & Accounting Equation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Final Accounts & Balance Sheet",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Partnership Accounts",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Public Financial Management (PFMS)",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 30,
            "sharePct": 25,
            "topics": [
              {
                "name": "J&K History, Heritage, Culture & Tourism",
                "count": 13,
                "tier": "high"
              },
              {
                "name": "National & International Current Affairs",
                "count": 5,
                "tier": "mid"
              },
              {
                "name": "Indian Geography, Rivers, Lakes & Transport",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "J&K Geography, Rivers, Lakes & Flora/Fauna",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Census & Demography of India",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "J&K Reorganisation Act, 2019",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Environment, Ecology & Biodiversity",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Culture, Heritage & Freedom Struggle",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Input & Output Devices",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Computer Hardware, CPU, Memory & Storage",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "MS Office (Word, Excel, PowerPoint & Access)",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Virus, Anti-Virus & Security",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Internet, E-Mail Protocols & IT in Governance",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Operating Systems & Open Source Technologies",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Economic Reforms, Planning & Developing Economy",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Fiscal & Monetary Policy & Role of RBI",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "National Income (GDP/GNP) & Economic Growth",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Consumer Demand & Indifference Curve Analysis",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Factors of Production, Laws & Factor Pricing",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Pricing Under Various Forms of Market",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Articles, Prepositions & Modals",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Tenses & Subject-Verb Agreement",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Active & Passive Voice",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direct & Indirect Narration",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms, Antonyms & Homophones",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Science",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Biology (Nutrition, Respiration & Plant Transport)",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Physics (Newton's Laws, Motion & Electricity)",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Chemistry (Chemical Equations, Metals & Non-Metals)",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ecosystem, Ozone/Greenhouse & Energy Sources",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vitamins, Deficiency & Communicable Diseases",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Linear Equations in Two Variables",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Limits & Derivatives (Calculus)",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Probability",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Set Theory, Relations & Functions",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vectors, Coordinate & 3D Geometry",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Statistics",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Primary/Secondary Data, Questionnaires & Tabulation",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Measures of Central Tendency",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Probability & Theory of Attributes",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Index Numbers (WPI, CPI & Fisher)",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vital Statistics, Fertility & Demography",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkssb-wildlife-guard": {
    "examSlug": "jkssb-wildlife-guard",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 120,
    "masterSections": [
      {
        "subject": "General English",
        "totalQuestions": 25,
        "topics": [
          {
            "name": "Articles",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Determiners",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Prepositions",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Reading Comprehension",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Synonyms",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Antonyms",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Spelling",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Verbs",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Error Spotting",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Idioms & Phrases",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Para Jumbles",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Tenses",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Mathematics",
        "totalQuestions": 25,
        "topics": [
          {
            "name": "Ratio & Proportion",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Averages",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Probability",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Percentage",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Linear Equations",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Number System",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Time & Work",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Arithmetic",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Mensuration",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Quadratic Equations",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 25,
        "topics": [
          {
            "name": "Number Series",
            "count": 7,
            "tier": "high"
          },
          {
            "name": "Coding-Decoding",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Blood Relations",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Direction Sense",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Analogy",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Syllogism",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Forest & Wildlife",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Forest & Wildlife Core Concepts",
            "count": 11,
            "tier": "high"
          },
          {
            "name": "Environment & Ecology",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Biodiversity & Conservation",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Indian Geography",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Indian Polity",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 16,
        "topics": [
          {
            "name": "Indian Geography",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Modern History",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Ancient History",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Sports",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Biology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Chemistry",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Environment & Ecology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Indian Polity",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Physics",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Static GK",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "J&K General Knowledge",
        "totalQuestions": 9,
        "topics": [
          {
            "name": "J&K History",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "J&K Geography",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "J&K General Knowledge Core Concepts",
            "count": 2,
            "tier": "mid"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Forest & Wildlife",
        "topic": "Forest & Wildlife Core Concepts",
        "totalQuestions": 11,
        "yearBreakdown": "2026: 11 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Forest & Wildlife questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Number Series",
        "totalQuestions": 7,
        "yearBreakdown": "2026: 7 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "Forest & Wildlife",
        "topic": "Environment & Ecology",
        "totalQuestions": 6,
        "yearBreakdown": "2026: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Forest & Wildlife questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Coding-Decoding",
        "totalQuestions": 6,
        "yearBreakdown": "2026: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Ratio & Proportion",
        "totalQuestions": 5,
        "yearBreakdown": "2026: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "J&K General Knowledge",
        "topic": "J&K History",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Averages",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Probability",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Blood Relations",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Direction Sense",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "General English",
        "topic": "Articles",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "General English",
        "topic": "Determiners",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "General English",
        "topic": "Prepositions",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "General English",
        "topic": "Reading Comprehension",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "General English",
        "topic": "Synonyms",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Geography",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Modern History",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-WILDLIFE-GUARD papers."
      },
      {
        "subject": "J&K General Knowledge",
        "topic": "J&K Geography",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKSSB-WILDLIFE-GUARD papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2026-DV",
        "label": "2026 Official Document Verification (DV) Category-Wise Cutoff (Notification dated 29.10.2026)",
        "maxMarks": 120,
        "vacancies": "Advt. 03/2021 & 04/2022 · Item Nos. 189, 190, 605, 606",
        "appeared": "31,486 Appeared · 605 Shortlisted for DV (after PET/PST)",
        "topperScore": "93.00 / 120 (RBA) · 90.75 / 120 (OM)",
        "meanScore": "23.42 / 120 (Overall Mean)",
        "sourceNote": "Exact minimum & maximum marks per category extracted from Official JKSSB Document Verification Notification No. JKSSB-COE0EXAM(UT)/3/2026 (7909564) dated 29.10.2026 (Annexure A — Wild Life Guard).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "65.00 / 120",
            "pct": 54,
            "safeTarget": "167 Shortlisted",
            "note": "Highest OM score in DV list: 90.75 / 120"
          },
          {
            "category": "RBA (Resident of Backward Area)",
            "marks": "60.00 / 120",
            "pct": 50,
            "safeTarget": "152 Shortlisted",
            "note": "Highest RBA score in DV list: 93.00 / 120"
          },
          {
            "category": "ALC / IB",
            "marks": "55.75 / 120",
            "pct": 46,
            "safeTarget": "30 Shortlisted",
            "note": "Highest ALC/IB score in DV list: 82.75 / 120"
          },
          {
            "category": "PSP (Pahari Speaking People)",
            "marks": "55.75 / 120",
            "pct": 46,
            "safeTarget": "29 Shortlisted",
            "note": "Highest PSP score in DV list: 74.00 / 120"
          },
          {
            "category": "SC (Scheduled Caste)",
            "marks": "52.00 / 120",
            "pct": 43,
            "safeTarget": "72 Shortlisted",
            "note": "Highest SC score in DV list: 79.75 / 120"
          },
          {
            "category": "ST (Scheduled Tribe)",
            "marks": "50.25 / 120",
            "pct": 42,
            "safeTarget": "73 Shortlisted",
            "note": "Highest ST score in DV list: 77.75 / 120"
          },
          {
            "category": "EWS (Economically Weaker Section)",
            "marks": "47.75 / 120",
            "pct": 40,
            "safeTarget": "55 Shortlisted",
            "note": "Highest EWS score in DV list: 84.75 / 120"
          },
          {
            "category": "ESM (Ex-Servicemen)",
            "marks": "18.00 / 120",
            "pct": 15,
            "safeTarget": "27 Shortlisted",
            "note": "Horizontal reservation · Highest ESM: 46.75 / 120"
          }
        ]
      }
    ],
    "scoreDistributions": [
      {
        "label": "2026 Official Score Distribution (08.03.2026 · 31,486 Appeared)",
        "appeared": 31486,
        "registered": 108083,
        "topScore": "93.00 / 120",
        "meanScore": "23.42 / 120",
        "medianScore": "20.25 / 120",
        "sourceNote": "Derived from Official JKSSB Result Notification No. JKSSB-COE0EXAM(UT)/14/2026-03 (7842028) dated 28.04.2026 (Annexure A — Wild Life Guard).",
        "bars": [
          {
            "range": "85 – 120",
            "candidates": 3,
            "pct": 0.01
          },
          {
            "range": "75 – 84.75",
            "candidates": 86,
            "pct": 0.3
          },
          {
            "range": "65 – 74.75",
            "candidates": 338,
            "pct": 1.1
          },
          {
            "range": "55 – 64.75",
            "candidates": 862,
            "pct": 2.7
          },
          {
            "range": "45 – 54.75",
            "candidates": 1770,
            "pct": 5.6
          },
          {
            "range": "35 – 44.75",
            "candidates": 3154,
            "pct": 10.0
          },
          {
            "range": "Below 35",
            "candidates": 25273,
            "pct": 80.3
          }
        ]
      }
    ],
    "paperXrays": [
      {
        "paperSlug": "jkssb-wildlife-guard-2026-may-10",
        "paperTitle": "JKSSB Wildlife Guard Question Paper 2026",
        "year": "2026",
        "heldOn": "2026-03-08",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 21,
            "topics": [
              {
                "name": "Articles",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Determiners",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Prepositions",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Reading Comprehension",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Synonyms",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Antonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Spelling",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Verbs",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Error Spotting",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Para Jumbles",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Tenses",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 25,
            "sharePct": 21,
            "topics": [
              {
                "name": "Ratio & Proportion",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Averages",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Probability",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Linear Equations",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Number System",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Time & Work",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Arithmetic",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Mensuration",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Quadratic Equations",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 25,
            "sharePct": 21,
            "topics": [
              {
                "name": "Number Series",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "Coding-Decoding",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Blood Relations",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Direction Sense",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Analogy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Syllogism",
                "count": 2,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "Forest & Wildlife",
            "questionCount": 20,
            "sharePct": 17,
            "topics": [
              {
                "name": "Forest & Wildlife Core Concepts",
                "count": 11,
                "tier": "high"
              },
              {
                "name": "Environment & Ecology",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Biodiversity & Conservation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Geography",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Polity",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 16,
            "sharePct": 13,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Modern History",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Ancient History",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sports",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Biology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Chemistry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Polity",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Physics",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Static GK",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "J&K General Knowledge",
            "questionCount": 9,
            "sharePct": 8,
            "topics": [
              {
                "name": "J&K History",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "J&K Geography",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 2,
                "tier": "mid"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkssb-social-forestry-worker": {
    "examSlug": "jkssb-social-forestry-worker",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 120,
    "masterSections": [
      {
        "subject": "General English",
        "totalQuestions": 32,
        "topics": [
          {
            "name": "Antonyms",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Articles",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Prepositions",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Reading Comprehension",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Clauses",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Determiners",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Spelling",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Synonyms",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Modals",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Error Spotting",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Verbs",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Mathematics",
        "totalQuestions": 32,
        "topics": [
          {
            "name": "Averages",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Mensuration",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Number System",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Probability",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Ratio & Proportion",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Linear Equations",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Percentage",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Time & Work",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Algebra",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Arithmetic",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Discount",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Profit & Loss",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Quadratic Equations",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 32,
        "topics": [
          {
            "name": "Direction Sense",
            "count": 7,
            "tier": "high"
          },
          {
            "name": "Blood Relations",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Coding-Decoding",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Number Series",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Odd One Out",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Venn Diagrams",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Analogy",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Analogies",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Seating Arrangement",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 18,
        "topics": [
          {
            "name": "J&K General Knowledge",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Indian Geography",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Indian Polity",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Static GK",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Art & Culture",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Economy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Government Schemes",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Modern History",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General Science",
        "totalQuestions": 6,
        "topics": [
          {
            "name": "Biology",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "General Science Core Concepts",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Chemistry",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Light & Optics",
            "count": 1,
            "tier": "low"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Reasoning",
        "topic": "Direction Sense",
        "totalQuestions": 7,
        "yearBreakdown": "2026: 7 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "J&K General Knowledge",
        "totalQuestions": 6,
        "yearBreakdown": "2026: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Averages",
        "totalQuestions": 5,
        "yearBreakdown": "2026: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "General English",
        "topic": "Antonyms",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "General English",
        "topic": "Articles",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "General English",
        "topic": "Prepositions",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "General English",
        "topic": "Reading Comprehension",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Geography",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Mensuration",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Number System",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Probability",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Ratio & Proportion",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Blood Relations",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Coding-Decoding",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Number Series",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Odd One Out",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Venn Diagrams",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      },
      {
        "subject": "General English",
        "topic": "Clauses",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-SOCIAL-FORESTRY-WORKER papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2026-DV",
        "label": "2026 Official Document Verification (DV) Category-Wise Cutoff (Notification dated 29.10.2026)",
        "maxMarks": 120,
        "sourceNote": "Exact minimum & maximum marks per category extracted from Official JKSSB Document Verification Notification No. JKSSB-COE0EXAM(UT)/3/2026 (7909564) dated 29.10.2026 (Annexure B — Social Forestry Worker).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "47.50 / 120",
            "pct": 40,
            "safeTarget": "46 Shortlisted",
            "note": "Highest OM score in DV list: 71.75 / 120"
          },
          {
            "category": "RBA (Resident of Backward Area)",
            "marks": "44.00 / 120",
            "pct": 37,
            "safeTarget": "52 Shortlisted",
            "note": "Highest RBA score in DV list: 66.25 / 120"
          },
          {
            "category": "PSP (Pahari Speaking People)",
            "marks": "37.00 / 120",
            "pct": 31,
            "safeTarget": "13 Shortlisted",
            "note": "Highest PSP score in DV list: 54.75 / 120"
          },
          {
            "category": "ALC / IB",
            "marks": "36.75 / 120",
            "pct": 31,
            "safeTarget": "11 Shortlisted",
            "note": "Highest ALC/IB score in DV list: 51.25 / 120"
          },
          {
            "category": "SC (Scheduled Caste)",
            "marks": "31.50 / 120",
            "pct": 26,
            "safeTarget": "18 Shortlisted",
            "note": "Highest SC score in DV list: 53.75 / 120"
          },
          {
            "category": "EWS (Economically Weaker Section)",
            "marks": "29.50 / 120",
            "pct": 25,
            "safeTarget": "18 Shortlisted",
            "note": "Highest EWS score in DV list: 59.25 / 120"
          },
          {
            "category": "ST (Scheduled Tribe)",
            "marks": "28.00 / 120",
            "pct": 23,
            "safeTarget": "18 Shortlisted",
            "note": "Highest ST score in DV list: 52.75 / 120"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkssb-social-forestry-worker-2026",
        "paperTitle": "JKSSB Social Forestry Worker Question Paper 2026",
        "year": "2026",
        "heldOn": "2026-03-15",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "General English",
            "questionCount": 32,
            "sharePct": 27,
            "topics": [
              {
                "name": "Antonyms",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Articles",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Prepositions",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Reading Comprehension",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Clauses",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Determiners",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Spelling",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Synonyms",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Modals",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Error Spotting",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Verbs",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 32,
            "sharePct": 27,
            "topics": [
              {
                "name": "Averages",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Mensuration",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Number System",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Probability",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Ratio & Proportion",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Linear Equations",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Percentage",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Time & Work",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Arithmetic",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Discount",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Profit & Loss",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Quadratic Equations",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 32,
            "sharePct": 27,
            "topics": [
              {
                "name": "Direction Sense",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "Blood Relations",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Coding-Decoding",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Number Series",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Odd One Out",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Venn Diagrams",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Analogy",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Analogies",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Seating Arrangement",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 18,
            "sharePct": 15,
            "topics": [
              {
                "name": "J&K General Knowledge",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Indian Geography",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Indian Polity",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Static GK",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Art & Culture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Economy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Modern History",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Science",
            "questionCount": 6,
            "sharePct": 5,
            "topics": [
              {
                "name": "Biology",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "General Science Core Concepts",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Chemistry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Light & Optics",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkssb-inspector-forest": {
    "examSlug": "jkssb-inspector-forest",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 120,
    "masterSections": [
      {
        "subject": "General Science",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Biology",
            "count": 9,
            "tier": "high"
          },
          {
            "name": "Chemistry",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Environment & Ecology",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Physics",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "General Science Core Concepts",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Mathematics",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Mensuration",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Profit & Loss",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Probability",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Simplification",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Coordinate Geometry",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Simple & Compound Interest",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Linear Equations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Percentage",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Environment & Ecology",
        "totalQuestions": 12,
        "topics": [
          {
            "name": "Environment & Ecology Core Concepts",
            "count": 8,
            "tier": "high"
          },
          {
            "name": "J&K General Knowledge",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Climate Change",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Government Schemes",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "MS Office",
            "count": 10,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Articles",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Idioms & Phrases",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Para Jumbles",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Prepositions",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Synonyms",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "J&K General Knowledge",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Economy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Environment & Ecology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "International Organisations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Science & Technology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Static GK",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "History",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Modern History",
            "count": 10,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "Indian Polity",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Indian Polity Core Concepts",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Constitutional Amendments",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Directive Principles",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Fundamental Rights",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "International Organisations",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Coding-Decoding",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Blood Relations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Boats & Streams",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Direction Sense",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Letter Series",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Number Series",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Ratio & Proportion",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Syllogism",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Time & Work",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Geography",
        "totalQuestions": 8,
        "topics": [
          {
            "name": "Indian Geography",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Environment & Ecology",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "J&K General Knowledge",
            "count": 1,
            "tier": "low"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Computer Knowledge",
        "topic": "MS Office",
        "totalQuestions": 10,
        "yearBreakdown": "2026: 10 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "History",
        "topic": "Modern History",
        "totalQuestions": 10,
        "yearBreakdown": "2026: 10 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency History questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "General Science",
        "topic": "Biology",
        "totalQuestions": 9,
        "yearBreakdown": "2026: 9 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Science questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "Environment & Ecology",
        "topic": "Environment & Ecology Core Concepts",
        "totalQuestions": 8,
        "yearBreakdown": "2026: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environment & Ecology questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "Indian Polity",
        "topic": "Indian Polity Core Concepts",
        "totalQuestions": 6,
        "yearBreakdown": "2026: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Indian Polity questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "J&K General Knowledge",
        "totalQuestions": 5,
        "yearBreakdown": "2026: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "Geography",
        "topic": "Indian Geography",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Geography questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Mensuration",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Profit & Loss",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "General Science",
        "topic": "Chemistry",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Science questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "General Science",
        "topic": "Environment & Ecology",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Science questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "General Science",
        "topic": "Physics",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Science questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "Geography",
        "topic": "Environment & Ecology",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Geography questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Probability",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Simplification",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "Environment & Ecology",
        "topic": "J&K General Knowledge",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Environment & Ecology questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "General English",
        "topic": "Articles",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-INSPECTOR-FOREST papers."
      },
      {
        "subject": "General English",
        "topic": "Idioms & Phrases",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "Contextual meaning of classic English idioms and phrasal verbs tested in JKSSB & SSC exams."
      }
    ],
    "cutoffSets": [
      {
        "year": "2026-DV",
        "label": "2026 Official Document Verification (DV) Category-Wise Cutoff (Notification dated 29.10.2026)",
        "maxMarks": 120,
        "sourceNote": "Exact minimum & maximum marks per category extracted from Official JKSSB Document Verification Notification No. JKSSB-COE0EXAM(UT)/3/2026 (7909564) dated 29.10.2026 (Annexure D — Inspector).",
        "rows": [
          {
            "category": "RBA (Resident of Backward Area)",
            "marks": "71.00 / 120",
            "pct": 59,
            "safeTarget": "54 Shortlisted",
            "note": "Highest RBA score in DV list: 98.75 / 120"
          },
          {
            "category": "PSP (Pahari Speaking People)",
            "marks": "68.50 / 120",
            "pct": 57,
            "safeTarget": "10 Shortlisted",
            "note": "Highest PSP score in DV list: 78.50 / 120"
          },
          {
            "category": "ALC / IB",
            "marks": "68.00 / 120",
            "pct": 57,
            "safeTarget": "13 Shortlisted",
            "note": "Highest ALC/IB score in DV list: 80.25 / 120"
          },
          {
            "category": "SC (Scheduled Caste)",
            "marks": "64.00 / 120",
            "pct": 53,
            "safeTarget": "28 Shortlisted",
            "note": "Highest SC score in DV list: 81.25 / 120"
          },
          {
            "category": "ST (Scheduled Tribe)",
            "marks": "60.75 / 120",
            "pct": 51,
            "safeTarget": "31 Shortlisted",
            "note": "Highest ST score in DV list: 85.75 / 120"
          },
          {
            "category": "EWS (Economically Weaker Section)",
            "marks": "60.00 / 120",
            "pct": 50,
            "safeTarget": "25 Shortlisted",
            "note": "Highest EWS score in DV list: 78.25 / 120"
          },
          {
            "category": "OM (incl. ESM horizontal)",
            "marks": "57.25 / 120",
            "pct": 48,
            "safeTarget": "83 Shortlisted",
            "note": "Highest OM score in DV list: 95.25 / 120"
          }
        ]
      }
    ],
    "scoreDistributions": [
      {
        "label": "2026 Official Score Distribution (15.03.2026 · 8,356 Appeared)",
        "appeared": 8356,
        "registered": 25167,
        "topScore": "98.75 / 120",
        "meanScore": "44.04 / 120",
        "medianScore": "44.25 / 120",
        "sourceNote": "Derived from Official JKSSB Result Notification No. JKSSB-COE0EXAM(UT)/14/2026-03 (7842028) dated 28.04.2026 (Annexure B — Inspector).",
        "bars": [
          {
            "range": "85 – 120",
            "candidates": 28,
            "pct": 0.3
          },
          {
            "range": "75 – 84.75",
            "candidates": 192,
            "pct": 2.3
          },
          {
            "range": "65 – 74.75",
            "candidates": 642,
            "pct": 7.7
          },
          {
            "range": "55 – 64.75",
            "candidates": 1396,
            "pct": 16.7
          },
          {
            "range": "45 – 54.75",
            "candidates": 1774,
            "pct": 21.2
          },
          {
            "range": "35 – 44.75",
            "candidates": 1793,
            "pct": 21.5
          },
          {
            "range": "Below 35",
            "candidates": 2531,
            "pct": 30.3
          }
        ]
      }
    ],
    "paperXrays": [
      {
        "paperSlug": "jkssb-inspector-forest-2026-mar-15",
        "paperTitle": "JKSSB Inspector (Forest, Ecology & Environment) Question Paper 2026",
        "year": "2026",
        "heldOn": "2026-03-15",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "General Science",
            "questionCount": 20,
            "sharePct": 17,
            "topics": [
              {
                "name": "Biology",
                "count": 9,
                "tier": "high"
              },
              {
                "name": "Chemistry",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Environment & Ecology",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Physics",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "General Science Core Concepts",
                "count": 2,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 20,
            "sharePct": 17,
            "topics": [
              {
                "name": "Mensuration",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Profit & Loss",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Probability",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Simplification",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Coordinate Geometry",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Linear Equations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Percentage",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Environment & Ecology",
            "questionCount": 12,
            "sharePct": 10,
            "topics": [
              {
                "name": "Environment & Ecology Core Concepts",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "J&K General Knowledge",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Climate Change",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "MS Office",
                "count": 10,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Articles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Idioms & Phrases",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Prepositions",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Synonyms",
                "count": 2,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "J&K General Knowledge",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Economy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Science & Technology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Static GK",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "History",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Modern History",
                "count": 10,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Indian Polity",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Constitutional Amendments",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Directive Principles",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Fundamental Rights",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Coding-Decoding",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Boats & Streams",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Letter Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Number Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Syllogism",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 8,
            "sharePct": 7,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Environment & Ecology",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "J&K General Knowledge",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkssb-field-assistant": {
    "examSlug": "jkssb-field-assistant",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 120,
    "masterSections": [
      {
        "subject": "Water & Waste Water Engineering",
        "totalQuestions": 43,
        "topics": [
          {
            "name": "Water Engineering",
            "count": 43,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "Environmental Impact Assessment",
        "totalQuestions": 21,
        "topics": [
          {
            "name": "Environmental Impact Assessment Core Concepts",
            "count": 17,
            "tier": "high"
          },
          {
            "name": "Environmental Legislation",
            "count": 4,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Environment & Ecology",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Environment & Ecology Core Concepts",
            "count": 17,
            "tier": "high"
          },
          {
            "name": "Environmental Legislation",
            "count": 3,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Environmental Audit & Safety Audit",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Environmental Audit",
            "count": 20,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "Environmental Legislation in India",
        "totalQuestions": 16,
        "topics": [
          {
            "name": "Environmental Legislation",
            "count": 16,
            "tier": "high"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Water & Waste Water Engineering",
        "topic": "Water Engineering",
        "totalQuestions": 43,
        "yearBreakdown": "2026: 43 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Water & Waste Water Engineering questions tested in official JKSSB-FIELD-ASSISTANT papers."
      },
      {
        "subject": "Environmental Audit & Safety Audit",
        "topic": "Environmental Audit",
        "totalQuestions": 20,
        "yearBreakdown": "2026: 20 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environmental Audit & Safety Audit questions tested in official JKSSB-FIELD-ASSISTANT papers."
      },
      {
        "subject": "Environment & Ecology",
        "topic": "Environment & Ecology Core Concepts",
        "totalQuestions": 17,
        "yearBreakdown": "2026: 17 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environment & Ecology questions tested in official JKSSB-FIELD-ASSISTANT papers."
      },
      {
        "subject": "Environmental Impact Assessment",
        "topic": "Environmental Impact Assessment Core Concepts",
        "totalQuestions": 17,
        "yearBreakdown": "2026: 17 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environmental Impact Assessment questions tested in official JKSSB-FIELD-ASSISTANT papers."
      },
      {
        "subject": "Environmental Legislation in India",
        "topic": "Environmental Legislation",
        "totalQuestions": 16,
        "yearBreakdown": "2026: 16 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environmental Legislation in India questions tested in official JKSSB-FIELD-ASSISTANT papers."
      },
      {
        "subject": "Environmental Impact Assessment",
        "topic": "Environmental Legislation",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environmental Impact Assessment questions tested in official JKSSB-FIELD-ASSISTANT papers."
      },
      {
        "subject": "Environment & Ecology",
        "topic": "Environmental Legislation",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Environment & Ecology questions tested in official JKSSB-FIELD-ASSISTANT papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2026-DV",
        "label": "2026 Official Document Verification (DV) Category-Wise Cutoff (Notification dated 29.10.2026)",
        "maxMarks": 120,
        "sourceNote": "Exact minimum & maximum marks per category extracted from Official JKSSB Document Verification Notification No. JKSSB-COE0EXAM(UT)/3/2026 (7909564) dated 29.10.2026 (Annexure E — Field Assistant).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "107.50 / 120",
            "pct": 90,
            "safeTarget": "16 Shortlisted",
            "note": "Highest OM score in DV list: 116.25 / 120"
          },
          {
            "category": "RBA (Resident of Backward Area)",
            "marks": "105.25 / 120",
            "pct": 88,
            "safeTarget": "13 Shortlisted",
            "note": "Highest RBA score in DV list: 113.75 / 120"
          },
          {
            "category": "ST (Scheduled Tribe)",
            "marks": "85.50 / 120",
            "pct": 71,
            "safeTarget": "6 Shortlisted",
            "note": "Highest ST score in DV list: 92.25 / 120"
          },
          {
            "category": "EWS (Economically Weaker Section)",
            "marks": "80.00 / 120",
            "pct": 67,
            "safeTarget": "6 Shortlisted",
            "note": "Highest EWS score in DV list: 115.25 / 120"
          },
          {
            "category": "SC (Scheduled Caste)",
            "marks": "78.75 / 120",
            "pct": 66,
            "safeTarget": "6 Shortlisted",
            "note": "Highest SC score in DV list: 91.25 / 120"
          },
          {
            "category": "ALC / IB",
            "marks": "67.50 / 120",
            "pct": 56,
            "safeTarget": "5 Shortlisted",
            "note": "Highest ALC/IB score in DV list: 95.50 / 120"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkssb-field-assistant-2026-may-20",
        "paperTitle": "JKSSB Field Assistant Question Paper 2026",
        "year": "2026",
        "heldOn": "2026-05-20",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "Water & Waste Water Engineering",
            "questionCount": 43,
            "sharePct": 36,
            "topics": [
              {
                "name": "Water Engineering",
                "count": 43,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Environmental Impact Assessment",
            "questionCount": 21,
            "sharePct": 18,
            "topics": [
              {
                "name": "Environmental Impact Assessment Core Concepts",
                "count": 17,
                "tier": "high"
              },
              {
                "name": "Environmental Legislation",
                "count": 4,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "Environment & Ecology",
            "questionCount": 20,
            "sharePct": 17,
            "topics": [
              {
                "name": "Environment & Ecology Core Concepts",
                "count": 17,
                "tier": "high"
              },
              {
                "name": "Environmental Legislation",
                "count": 3,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "Environmental Audit & Safety Audit",
            "questionCount": 20,
            "sharePct": 17,
            "topics": [
              {
                "name": "Environmental Audit",
                "count": 20,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Environmental Legislation in India",
            "questionCount": 16,
            "sharePct": 13,
            "topics": [
              {
                "name": "Environmental Legislation",
                "count": 16,
                "tier": "high"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkssb-veterinary-pharmacist": {
    "examSlug": "jkssb-veterinary-pharmacist",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 120,
    "masterSections": [
      {
        "subject": "Zoology & Animal Kingdom",
        "totalQuestions": 30,
        "topics": [
          {
            "name": "Zoology",
            "count": 26,
            "tier": "high"
          },
          {
            "name": "Match the Following",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Odd One Out",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Indian Polity",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Indian Geography",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "J&K General Knowledge",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Static GK",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Art & Culture",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Current Affairs",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Freedom Struggle",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Government Schemes",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Indian History",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 15,
        "topics": [
          {
            "name": "Idioms & Phrases",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Antonyms",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Analogies",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Articles",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Clauses",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Determiners",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Homonyms",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Homophones",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Prepositions",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Punctuation",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Synonyms",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Tenses",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 15,
        "topics": [
          {
            "name": "Logical Deduction",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Percentage",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Analogy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Blood Relations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Coding-Decoding",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Direction Sense",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Match the Following",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Number Series",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Probability",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Statement & Assumption",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Statement & Conclusion",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Trains",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Computer Fundamentals",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Computer Hardware",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Input & Output Devices",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Operating Systems",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Computer Memory",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Computer Networks",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Evolution",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Evolution Core Concepts",
            "count": 9,
            "tier": "high"
          },
          {
            "name": "Match the Following",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Human Physiology",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Human Physiology Core Concepts",
            "count": 10,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "Immunology",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Immunology Core Concepts",
            "count": 8,
            "tier": "high"
          },
          {
            "name": "Match the Following",
            "count": 2,
            "tier": "mid"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Zoology & Animal Kingdom",
        "topic": "Zoology",
        "totalQuestions": 26,
        "yearBreakdown": "2025: 26 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Zoology & Animal Kingdom questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Human Physiology",
        "topic": "Human Physiology Core Concepts",
        "totalQuestions": 10,
        "yearBreakdown": "2025: 10 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Human Physiology questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Evolution",
        "topic": "Evolution Core Concepts",
        "totalQuestions": 9,
        "yearBreakdown": "2025: 9 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Evolution questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Immunology",
        "topic": "Immunology Core Concepts",
        "totalQuestions": 8,
        "yearBreakdown": "2025: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Immunology questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Polity",
        "totalQuestions": 6,
        "yearBreakdown": "2025: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "General English",
        "topic": "Idioms & Phrases",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Contextual meaning of classic English idioms and phrasal verbs tested in JKSSB & SSC exams."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Geography",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "J&K General Knowledge",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Static GK",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Logical Deduction",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Zoology & Animal Kingdom",
        "topic": "Match the Following",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Zoology & Animal Kingdom questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Fundamentals",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Hardware",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Input & Output Devices",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "Pointing devices, MICR, OCR, OMR, barcode readers, impact vs non-impact printers (Laser, Inkjet, Dot Matrix, Thermal) & plotters."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Operating Systems",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "General English",
        "topic": "Antonyms",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Immunology",
        "topic": "Match the Following",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Immunology questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Percentage",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-VETERINARY-PHARMACIST papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2025",
        "label": "2025 Veterinary Pharmacist Cutoff Benchmark (2 Mar 2025 · 120 Marks)",
        "maxMarks": 120,
        "vacancies": "194 Posts (Animal & Sheep Husbandry Dept.)",
        "appeared": "~28,000+ Appeared",
        "topperScore": "101.25 / 120",
        "meanScore": "46.50 / 120",
        "sourceNote": "Based on 2 March 2025 Set A paper (60 marks Zoology/Biology + 60 marks General sections).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "84.50 – 88.00 / 120",
            "pct": 72,
            "safeTarget": "89+ Marks",
            "note": "High weightage on 60-mark Zoology section"
          },
          {
            "category": "RBA / EWS",
            "marks": "79.00 – 82.50 / 120",
            "pct": 67,
            "safeTarget": "84+ Marks",
            "note": "10% RBA & 10% EWS quota"
          },
          {
            "category": "SC / ST / OBC",
            "marks": "71.00 – 76.50 / 120",
            "pct": 61,
            "safeTarget": "78+ Marks",
            "note": "Reserved categories"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkssb-veterinary-pharmacist-2025",
        "paperTitle": "JKSSB Veterinary Pharmacist Question Paper 2025",
        "year": "2025",
        "heldOn": "2025-03-02",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "Zoology & Animal Kingdom",
            "questionCount": 30,
            "sharePct": 25,
            "topics": [
              {
                "name": "Zoology",
                "count": 26,
                "tier": "high"
              },
              {
                "name": "Match the Following",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Odd One Out",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 20,
            "sharePct": 17,
            "topics": [
              {
                "name": "Indian Polity",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Indian Geography",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "J&K General Knowledge",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Static GK",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Art & Culture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Freedom Struggle",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian History",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 15,
            "sharePct": 12,
            "topics": [
              {
                "name": "Idioms & Phrases",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Antonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Analogies",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Articles",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Clauses",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Determiners",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homophones",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Prepositions",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Punctuation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Tenses",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 15,
            "sharePct": 12,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Analogy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Coding-Decoding",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Match the Following",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Number Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Probability",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Statement & Assumption",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Statement & Conclusion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Trains",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Computer Fundamentals",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Hardware",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Input & Output Devices",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Operating Systems",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Memory",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Computer Networks",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Evolution",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Evolution Core Concepts",
                "count": 9,
                "tier": "high"
              },
              {
                "name": "Match the Following",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Human Physiology",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Human Physiology Core Concepts",
                "count": 10,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Immunology",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "Immunology Core Concepts",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Match the Following",
                "count": 2,
                "tier": "mid"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkssb-patwari": {
    "examSlug": "jkssb-patwari",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 120,
    "masterSections": [
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 30,
        "topics": [
          {
            "name": "Indian Geography",
            "count": 8,
            "tier": "high"
          },
          {
            "name": "Environment & Ecology",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Current Affairs",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Modern History",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Art & Culture",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Static GK",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Biology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Chemistry",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Economy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Indian Polity",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "International Organisations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "J&K Geography",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Space & Defense",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "J&K General Knowledge",
        "totalQuestions": 30,
        "topics": [
          {
            "name": "J&K General Knowledge Core Concepts",
            "count": 10,
            "tier": "high"
          },
          {
            "name": "J&K Geography",
            "count": 9,
            "tier": "high"
          },
          {
            "name": "Indian Geography",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Current Affairs",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "J&K History",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Botany",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Indian Polity",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "International Organisations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "J&K Polity",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 24,
        "topics": [
          {
            "name": "Direct & Indirect Speech",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Articles",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Clauses",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Fill in the Blanks",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Idioms & Phrases",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Modals",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Para Jumbles",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Prepositions",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Reading Comprehension",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Active & Passive Voice",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Antonyms",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Error Spotting",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Homophones",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Synonyms",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 18,
        "topics": [
          {
            "name": "MS PowerPoint",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "MS Word",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Computer Fundamentals",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Computer Networks",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Input & Output Devices",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Computer Memory",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Cyber Security",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "MS Excel",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "MS Office",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Operating Systems",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 18,
        "topics": [
          {
            "name": "Analogy",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Blood Relations",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Coding-Decoding",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Direction Sense",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Letter Series",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Number Series",
            "count": 3,
            "tier": "high"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "J&K General Knowledge",
        "topic": "J&K General Knowledge Core Concepts",
        "totalQuestions": 10,
        "yearBreakdown": "2024: 10 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "J&K General Knowledge",
        "topic": "J&K Geography",
        "totalQuestions": 9,
        "yearBreakdown": "2024: 9 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Geography",
        "totalQuestions": 8,
        "yearBreakdown": "2024: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Environment & Ecology",
        "totalQuestions": 5,
        "yearBreakdown": "2024: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "MS PowerPoint",
        "totalQuestions": 4,
        "yearBreakdown": "2024: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "MS Word",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "General English",
        "topic": "Direct & Indirect Speech",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Current Affairs",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Modern History",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "J&K General Knowledge",
        "topic": "Indian Geography",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Analogy",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Blood Relations",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Coding-Decoding",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Direction Sense",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Letter Series",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Number Series",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Fundamentals",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-PATWARI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Networks",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-PATWARI papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2024",
        "label": "2024 Official Cutoff Benchmarks (1 Sep 2024 · Advt. 02/2021)",
        "maxMarks": 120,
        "vacancies": "142 Posts (Revenue Department)",
        "appeared": "~48,000+ Appeared",
        "topperScore": "104.50 / 120",
        "meanScore": "48.60 / 120",
        "sourceNote": "Written exam merit (out of 120 marks, 0.25 negative marking) following qualifying Urdu test.",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "88.50 – 92.25",
            "pct": 75,
            "safeTarget": "92+ Marks",
            "note": "District/UT cadre closing range"
          },
          {
            "category": "RBA",
            "marks": "84.00 – 87.50",
            "pct": 71,
            "safeTarget": "88+ Marks",
            "note": "Resident of Backward Area"
          },
          {
            "category": "EWS",
            "marks": "81.25 – 84.50",
            "pct": 69,
            "safeTarget": "85+ Marks",
            "note": "Economically Weaker Section"
          },
          {
            "category": "SC",
            "marks": "78.00 – 81.50",
            "pct": 66,
            "safeTarget": "82+ Marks",
            "note": "Scheduled Caste"
          },
          {
            "category": "ST",
            "marks": "74.50 – 78.25",
            "pct": 63,
            "safeTarget": "79+ Marks",
            "note": "Scheduled Tribe"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkssb-patwari-2024-sep1-set-a",
        "paperTitle": "JKSSB Patwari Question Paper 2024",
        "year": "2024",
        "heldOn": "2024-09-01",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 30,
            "sharePct": 25,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Environment & Ecology",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Current Affairs",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Modern History",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Art & Culture",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Static GK",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Biology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Chemistry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Economy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Polity",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "J&K Geography",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Space & Defense",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "J&K General Knowledge",
            "questionCount": 30,
            "sharePct": 25,
            "topics": [
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 10,
                "tier": "high"
              },
              {
                "name": "J&K Geography",
                "count": 9,
                "tier": "high"
              },
              {
                "name": "Indian Geography",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Current Affairs",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "J&K History",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Botany",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Polity",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "J&K Polity",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 24,
            "sharePct": 20,
            "topics": [
              {
                "name": "Direct & Indirect Speech",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Articles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Clauses",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Fill in the Blanks",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Idioms & Phrases",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Modals",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Prepositions",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Reading Comprehension",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Active & Passive Voice",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Antonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Error Spotting",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homophones",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 18,
            "sharePct": 15,
            "topics": [
              {
                "name": "MS PowerPoint",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "MS Word",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Computer Fundamentals",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Networks",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Input & Output Devices",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Memory",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Cyber Security",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "MS Excel",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "MS Office",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Operating Systems",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 18,
            "sharePct": 15,
            "topics": [
              {
                "name": "Analogy",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Blood Relations",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Coding-Decoding",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Direction Sense",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Letter Series",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Number Series",
                "count": 3,
                "tier": "high"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkssb-junior-assistant": {
    "examSlug": "jkssb-junior-assistant",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 80,
    "masterSections": [
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Computer Networks",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "MS Office",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Computer Fundamentals",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Computer Hardware",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "MS Excel",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "MS Word",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Operating Systems",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Internet & Email",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "MS PowerPoint",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Antonyms",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Idioms & Phrases",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Para Jumbles",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Pronouns",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Synonyms",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Active & Passive Voice",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Articles",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Clauses",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Direct & Indirect Speech",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Error Spotting",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Homonyms",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Homophones",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Modals",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Prepositions",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Punctuation",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Indian Geography",
            "count": 7,
            "tier": "high"
          },
          {
            "name": "J&K General Knowledge",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "J&K Geography",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Static GK",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Current Affairs",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Environment & Ecology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "World Geography",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Mathematics",
        "totalQuestions": 11,
        "topics": [
          {
            "name": "Averages",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Profit & Loss",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Ratio & Proportion",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Time & Work",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Speed, Time & Distance",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 9,
        "topics": [
          {
            "name": "Blood Relations",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Statement & Conclusion",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Coding-Decoding",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Direction Sense",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Syllogism",
            "count": 1,
            "tier": "low"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Geography",
        "totalQuestions": 7,
        "yearBreakdown": "2026: 7 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Networks",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "MS Office",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "J&K General Knowledge",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Blood Relations",
        "totalQuestions": 4,
        "yearBreakdown": "2026: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "J&K Geography",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Static GK",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Averages",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Profit & Loss",
        "totalQuestions": 3,
        "yearBreakdown": "2026: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Fundamentals",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Hardware",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "MS Excel",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "MS Word",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Operating Systems",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "General English",
        "topic": "Antonyms",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "General English",
        "topic": "Idioms & Phrases",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "Contextual meaning of classic English idioms and phrasal verbs tested in JKSSB & SSC exams."
      },
      {
        "subject": "General English",
        "topic": "Para Jumbles",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      },
      {
        "subject": "General English",
        "topic": "Pronouns",
        "totalQuestions": 2,
        "yearBreakdown": "2026: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-JUNIOR-ASSISTANT papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2026",
        "label": "2026 Junior Assistant Written Cutoff Benchmark (19 Apr 2026 · 80 Marks)",
        "maxMarks": 80,
        "vacancies": "Multiple UT & Divisional Cadre Posts",
        "appeared": "~65,000+ Appeared",
        "topperScore": "74.50 / 80",
        "meanScore": "41.20 / 80",
        "sourceNote": "Written exam carries 80 marks (scaled with 20-mark Type Test of min 35 WPM speed).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "61.50 – 65.00 / 80",
            "pct": 79,
            "safeTarget": "66+ / 80",
            "note": "Combined with 35+ WPM typing score"
          },
          {
            "category": "RBA / EWS",
            "marks": "57.00 – 60.50 / 80",
            "pct": 73,
            "safeTarget": "61+ / 80",
            "note": "Reserved categories"
          },
          {
            "category": "SC / ST / OBC",
            "marks": "51.50 – 56.00 / 80",
            "pct": 67,
            "safeTarget": "57+ / 80",
            "note": "SC, ST-1/ST-2 & OBC"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkssb-junior-assistant-pyq",
        "paperTitle": "JKSSB Junior Assistant Question Paper 2026",
        "year": "2026",
        "heldOn": "2026-04-19",
        "totalQuestions": 80,
        "maxMarks": 80,
        "sections": [
          {
            "subject": "Computer Knowledge",
            "questionCount": 20,
            "sharePct": 25,
            "topics": [
              {
                "name": "Computer Networks",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "MS Office",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Computer Fundamentals",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Hardware",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "MS Excel",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "MS Word",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Operating Systems",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Internet & Email",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "MS PowerPoint",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 20,
            "sharePct": 25,
            "topics": [
              {
                "name": "Antonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Idioms & Phrases",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Pronouns",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Synonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Active & Passive Voice",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Articles",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Clauses",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Error Spotting",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homophones",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Modals",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Prepositions",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Punctuation",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 20,
            "sharePct": 25,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "J&K General Knowledge",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "J&K Geography",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Static GK",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "World Geography",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 11,
            "sharePct": 14,
            "topics": [
              {
                "name": "Averages",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Profit & Loss",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Ratio & Proportion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Time & Work",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 9,
            "sharePct": 11,
            "topics": [
              {
                "name": "Blood Relations",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Statement & Conclusion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Coding-Decoding",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Syllogism",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkssb-constable": {
    "examSlug": "jkssb-constable",
    "totalPapersAnalyzed": 3,
    "totalQuestionsAnalyzed": 300,
    "masterSections": [
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 115,
        "topics": [
          {
            "name": "Static GK",
            "count": 18,
            "tier": "high"
          },
          {
            "name": "Biology",
            "count": 13,
            "tier": "high"
          },
          {
            "name": "Modern History",
            "count": 13,
            "tier": "high"
          },
          {
            "name": "Indian Geography",
            "count": 11,
            "tier": "high"
          },
          {
            "name": "Indian Polity",
            "count": 11,
            "tier": "high"
          },
          {
            "name": "Physics",
            "count": 8,
            "tier": "mid"
          },
          {
            "name": "Chemistry",
            "count": 7,
            "tier": "mid"
          },
          {
            "name": "Sports",
            "count": 7,
            "tier": "mid"
          },
          {
            "name": "Economy",
            "count": 6,
            "tier": "mid"
          },
          {
            "name": "Current Affairs",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "International Organisations",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Awards & Honours",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Environment & Ecology",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "World Geography",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Art & Culture",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Government Schemes",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "J&K General Knowledge",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Judiciary",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Medieval History",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 55,
        "topics": [
          {
            "name": "Antonyms",
            "count": 7,
            "tier": "high"
          },
          {
            "name": "Spelling",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Articles",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Phrasal Verbs",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Prepositions",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Synonyms",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Homophones",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Idioms & Phrases",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "One Word Substitution",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Analogies",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Clauses",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Error Spotting",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Nouns",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Pronouns",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Punctuation",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Vocabulary",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Active & Passive Voice",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Homonyms",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Tenses",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "J&K General Knowledge",
        "totalQuestions": 45,
        "topics": [
          {
            "name": "J&K General Knowledge Core Concepts",
            "count": 31,
            "tier": "high"
          },
          {
            "name": "Current Affairs",
            "count": 6,
            "tier": "mid"
          },
          {
            "name": "Indian Polity",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "J&K History",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Art & Culture",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "J&K Geography",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Sports",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Mathematics",
        "totalQuestions": 43,
        "topics": [
          {
            "name": "Averages",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Geometry",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Mensuration",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Arithmetic",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Number System",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Percentage",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Ratio & Proportion",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Algebra",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "HCF & LCM",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Linear Equations",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Probability",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Simple & Compound Interest",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Trigonometry",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Partnership",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Profit & Loss",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Quadratic Equations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Speed, Time & Distance",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Time & Work",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 27,
        "topics": [
          {
            "name": "Number Series",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Odd One Out",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Logical Deduction",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Blood Relations",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Coding-Decoding",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Direction Sense",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Letter Series",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Order & Ranking",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Analogies",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Analogy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Calendar & Clock",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 15,
        "topics": [
          {
            "name": "Internet & Email",
            "count": 8,
            "tier": "high"
          },
          {
            "name": "Computer Fundamentals",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Computer Hardware",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Computer Memory",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Cyber Security",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "MS Excel",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Operating Systems",
            "count": 1,
            "tier": "low"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "J&K General Knowledge",
        "topic": "J&K General Knowledge Core Concepts",
        "totalQuestions": 31,
        "yearBreakdown": "2024: 5 Qs · 2017: 22 Qs · 2016: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Static GK",
        "totalQuestions": 18,
        "yearBreakdown": "2024: 4 Qs · 2017: 10 Qs · 2016: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Biology",
        "totalQuestions": 13,
        "yearBreakdown": "2017: 8 Qs · 2016: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Modern History",
        "totalQuestions": 13,
        "yearBreakdown": "2024: 1 Qs · 2017: 3 Qs · 2016: 9 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Geography",
        "totalQuestions": 11,
        "yearBreakdown": "2024: 6 Qs · 2016: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Polity",
        "totalQuestions": 11,
        "yearBreakdown": "2024: 5 Qs · 2016: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Internet & Email",
        "totalQuestions": 8,
        "yearBreakdown": "2024: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Physics",
        "totalQuestions": 8,
        "yearBreakdown": "2017: 5 Qs · 2016: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General English",
        "topic": "Antonyms",
        "totalQuestions": 7,
        "yearBreakdown": "2024: 2 Qs · 2017: 4 Qs · 2016: 1 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Chemistry",
        "totalQuestions": 7,
        "yearBreakdown": "2017: 4 Qs · 2016: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Sports",
        "totalQuestions": 7,
        "yearBreakdown": "2024: 2 Qs · 2017: 1 Qs · 2016: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General English",
        "topic": "Spelling",
        "totalQuestions": 6,
        "yearBreakdown": "2017: 4 Qs · 2016: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Economy",
        "totalQuestions": 6,
        "yearBreakdown": "2024: 1 Qs · 2017: 2 Qs · 2016: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "J&K General Knowledge",
        "topic": "Current Affairs",
        "totalQuestions": 6,
        "yearBreakdown": "2024: 2 Qs · 2017: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Number Series",
        "totalQuestions": 6,
        "yearBreakdown": "2024: 2 Qs · 2017: 2 Qs · 2016: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Averages",
        "totalQuestions": 5,
        "yearBreakdown": "2024: 4 Qs · 2017: 1 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Geometry",
        "totalQuestions": 5,
        "yearBreakdown": "2017: 3 Qs · 2016: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKSSB-CONSTABLE papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Odd One Out",
        "totalQuestions": 5,
        "yearBreakdown": "2024: 2 Qs · 2017: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-CONSTABLE papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2024",
        "label": "2024 J&K Police Constable (Executive/Armed/IRP/SDRF) Cutoff (1 Dec 2024)",
        "maxMarks": 100,
        "vacancies": "4,002 Posts (Advt. 01 of 2024)",
        "appeared": "~1.65+ Lakh Appeared",
        "topperScore": "91.25 / 100",
        "meanScore": "36.80 / 100",
        "sourceNote": "Derived from JKSSB Constable Written Test Scoresheet & PET/PST Shortlist (Advt. 01 of 2024).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "62.75 – 65.50",
            "pct": 64,
            "safeTarget": "68+ Marks",
            "note": "Written cutoff before NCC bonus marks"
          },
          {
            "category": "RBA",
            "marks": "60.50 – 62.00",
            "pct": 61,
            "safeTarget": "64+ Marks",
            "note": "10% vertical reservation"
          },
          {
            "category": "ALC / IB",
            "marks": "52.20 – 55.00",
            "pct": 53,
            "safeTarget": "56+ Marks",
            "note": "4% reservation"
          },
          {
            "category": "SC",
            "marks": "47.50 – 51.25",
            "pct": 49,
            "safeTarget": "53+ Marks",
            "note": "8% reservation"
          },
          {
            "category": "OBC",
            "marks": "46.25 – 49.00",
            "pct": 48,
            "safeTarget": "51+ Marks",
            "note": "8% reservation"
          },
          {
            "category": "ST-1 & ST-2",
            "marks": "43.75 – 49.25",
            "pct": 46,
            "safeTarget": "50+ Marks",
            "note": "ST-1 & ST-2 combined reservation"
          },
          {
            "category": "EWS",
            "marks": "32.00 – 42.50",
            "pct": 37,
            "safeTarget": "45+ Marks",
            "note": "10% EWS quota"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkssb-constable-2024-set-a",
        "paperTitle": "JKSSB J&K Police Constable Question Paper 2024",
        "year": "2024",
        "heldOn": "2024-12-01",
        "totalQuestions": 100,
        "maxMarks": 100,
        "sections": [
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Analogies",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Antonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Articles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Clauses",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Error Spotting",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Homophones",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Idioms & Phrases",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Phrasal Verbs",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Prepositions",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Pronouns",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Punctuation",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Synonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Indian Polity",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Static GK",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "International Organisations",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sports",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Awards & Honours",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Economy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "J&K General Knowledge",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Modern History",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 16,
            "sharePct": 16,
            "topics": [
              {
                "name": "Averages",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "HCF & LCM",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Ratio & Proportion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Linear Equations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Mensuration",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Partnership",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Profit & Loss",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 15,
            "sharePct": 15,
            "topics": [
              {
                "name": "Internet & Email",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Computer Fundamentals",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Hardware",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Computer Memory",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Cyber Security",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "MS Excel",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Operating Systems",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "J&K General Knowledge",
            "questionCount": 10,
            "sharePct": 10,
            "topics": [
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Current Affairs",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "J&K History",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "J&K Geography",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 9,
            "sharePct": 9,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Number Series",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Odd One Out",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Analogies",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Coding-Decoding",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "jkp-constable-2017-oct08",
        "paperTitle": "JKSSB J&K Police Constable Question Paper 2017",
        "year": "2017",
        "heldOn": "2017-10-08",
        "totalQuestions": 100,
        "maxMarks": 100,
        "sections": [
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 37,
            "sharePct": 37,
            "topics": [
              {
                "name": "Static GK",
                "count": 10,
                "tier": "high"
              },
              {
                "name": "Biology",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Physics",
                "count": 5,
                "tier": "mid"
              },
              {
                "name": "Chemistry",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Modern History",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Economy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Environment & Ecology",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Medieval History",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Sports",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "J&K General Knowledge",
            "questionCount": 29,
            "sharePct": 29,
            "topics": [
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 22,
                "tier": "high"
              },
              {
                "name": "Current Affairs",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Indian Polity",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sports",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 19,
            "sharePct": 19,
            "topics": [
              {
                "name": "Antonyms",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Spelling",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "One Word Substitution",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Active & Passive Voice",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Articles",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homophones",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Nouns",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Phrasal Verbs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Prepositions",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vocabulary",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 10,
            "sharePct": 10,
            "topics": [
              {
                "name": "Geometry",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Arithmetic",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Averages",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Linear Equations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Mensuration",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Trigonometry",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 5,
            "sharePct": 5,
            "topics": [
              {
                "name": "Odd One Out",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Number Series",
                "count": 2,
                "tier": "mid"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "jkp-constable-2016-mar20-set-a",
        "paperTitle": "JKSSB J&K Police Constable Question Paper 2016",
        "year": "2016",
        "heldOn": "2016-03-20",
        "totalQuestions": 100,
        "maxMarks": 100,
        "sections": [
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 53,
            "sharePct": 53,
            "topics": [
              {
                "name": "Modern History",
                "count": 9,
                "tier": "high"
              },
              {
                "name": "Indian Polity",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Biology",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Indian Geography",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Sports",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Static GK",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Chemistry",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Current Affairs",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Economy",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Physics",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Awards & Honours",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "World Geography",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Art & Culture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Judiciary",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 17,
            "sharePct": 17,
            "topics": [
              {
                "name": "Number System",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Arithmetic",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Geometry",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Mensuration",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Probability",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Quadratic Equations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Trigonometry",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 13,
            "sharePct": 13,
            "topics": [
              {
                "name": "Direction Sense",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Letter Series",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Number Series",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Order & Ranking",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Analogy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Calendar & Clock",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Coding-Decoding",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Logical Deduction",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 11,
            "sharePct": 11,
            "topics": [
              {
                "name": "Spelling",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Antonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Articles",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Nouns",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "One Word Substitution",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Phrasal Verbs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Prepositions",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Tenses",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vocabulary",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "J&K General Knowledge",
            "questionCount": 6,
            "sharePct": 6,
            "topics": [
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Art & Culture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Polity",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkssb-constable-telecom": {
    "examSlug": "jkssb-constable-telecom",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 100,
    "masterSections": [
      {
        "subject": "Telecommunication Engineering",
        "totalQuestions": 40,
        "topics": [
          {
            "name": "Telecommunication Engineering Core Concepts",
            "count": 40,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 16,
        "topics": [
          {
            "name": "Current Affairs",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Indian Geography",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "International Organisations",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Modern History",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Sports",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Static GK",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Awards & Honours",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Indian Polity",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Rivers & Lakes",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "World Geography",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 15,
        "topics": [
          {
            "name": "Idioms & Phrases",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "One Word Substitution",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Error Spotting",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Antonyms",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Fill in the Blanks",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Modals",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Prepositions",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Sentence Improvement",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Spelling",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Synonyms",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Computer Fundamentals",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Input & Output Devices",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Internet & Email",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "MS Office",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Operating Systems",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Storage Devices",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 8,
        "topics": [
          {
            "name": "Odd One Out",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Assertion & Reason",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Blood Relations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Coding-Decoding",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Letter Series",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Number Series",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Syllogism",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Mathematics",
        "totalQuestions": 7,
        "topics": [
          {
            "name": "Arithmetic",
            "count": 1,
            "tier": "mid"
          },
          {
            "name": "Averages",
            "count": 1,
            "tier": "mid"
          },
          {
            "name": "Geometry",
            "count": 1,
            "tier": "mid"
          },
          {
            "name": "Percentage",
            "count": 1,
            "tier": "mid"
          },
          {
            "name": "Ratio & Proportion",
            "count": 1,
            "tier": "mid"
          },
          {
            "name": "Simple & Compound Interest",
            "count": 1,
            "tier": "mid"
          },
          {
            "name": "Speed, Time & Distance",
            "count": 1,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "J&K General Knowledge",
        "totalQuestions": 4,
        "topics": [
          {
            "name": "J&K General Knowledge Core Concepts",
            "count": 4,
            "tier": "high"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Telecommunication Engineering",
        "topic": "Telecommunication Engineering Core Concepts",
        "totalQuestions": 40,
        "yearBreakdown": "2024: 40 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Telecommunication Engineering questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "J&K General Knowledge",
        "topic": "J&K General Knowledge Core Concepts",
        "totalQuestions": 4,
        "yearBreakdown": "2024: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "General English",
        "topic": "Idioms & Phrases",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Contextual meaning of classic English idioms and phrasal verbs tested in JKSSB & SSC exams."
      },
      {
        "subject": "General English",
        "topic": "One Word Substitution",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Fundamentals",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Input & Output Devices",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "Pointing devices, MICR, OCR, OMR, barcode readers, impact vs non-impact printers (Laser, Inkjet, Dot Matrix, Thermal) & plotters."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Internet & Email",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "MS Office",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "General English",
        "topic": "Error Spotting",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General English questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Current Affairs",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Indian Geography",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "International Organisations",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Modern History",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Sports",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Static GK",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Odd One Out",
        "totalQuestions": 2,
        "yearBreakdown": "2024: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Operating Systems",
        "totalQuestions": 1,
        "yearBreakdown": "2024: 1 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Storage Devices",
        "totalQuestions": 1,
        "yearBreakdown": "2024: 1 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKSSB-CONSTABLE-TELECOM papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2024",
        "label": "2024 J&K Police Constable (Telecommunication) Cutoff (8 Dec 2024)",
        "maxMarks": 100,
        "vacancies": "502 Posts (Advt. 01 of 2024)",
        "appeared": "~42,000+ Appeared",
        "topperScore": "88.50 / 100",
        "meanScore": "39.40 / 100",
        "sourceNote": "Based on 8 December 2024 Telecommunication Constable OMR examination (100 marks, 0.25 negative marking).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "66.50 – 70.00",
            "pct": 68,
            "safeTarget": "72+ Marks",
            "note": "Open Merit technical wing cutoff"
          },
          {
            "category": "RBA",
            "marks": "62.00 – 65.00",
            "pct": 63,
            "safeTarget": "66+ Marks",
            "note": "10% vertical reservation"
          },
          {
            "category": "EWS / OBC",
            "marks": "55.00 – 59.50",
            "pct": 57,
            "safeTarget": "61+ Marks",
            "note": "Reserved categories"
          },
          {
            "category": "SC / ST",
            "marks": "50.00 – 55.50",
            "pct": 53,
            "safeTarget": "57+ Marks",
            "note": "SC & ST-1/ST-2 categories"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkssb-constable-telecom-2024-set-a",
        "paperTitle": "JKSSB Constable (Telecommunication) Question Paper 2024",
        "year": "2024",
        "heldOn": "2024-12-08",
        "totalQuestions": 100,
        "maxMarks": 100,
        "sections": [
          {
            "subject": "Telecommunication Engineering",
            "questionCount": 40,
            "sharePct": 40,
            "topics": [
              {
                "name": "Telecommunication Engineering Core Concepts",
                "count": 40,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 16,
            "sharePct": 16,
            "topics": [
              {
                "name": "Current Affairs",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian Geography",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "International Organisations",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Modern History",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sports",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Static GK",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Awards & Honours",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Polity",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Rivers & Lakes",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "World Geography",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 15,
            "sharePct": 15,
            "topics": [
              {
                "name": "Idioms & Phrases",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "One Word Substitution",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Error Spotting",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Antonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Fill in the Blanks",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Modals",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Prepositions",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Sentence Improvement",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Spelling",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 10,
            "sharePct": 10,
            "topics": [
              {
                "name": "Computer Fundamentals",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Input & Output Devices",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Internet & Email",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "MS Office",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Operating Systems",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Storage Devices",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 8,
            "sharePct": 8,
            "topics": [
              {
                "name": "Odd One Out",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Assertion & Reason",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Coding-Decoding",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Letter Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Number Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Syllogism",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 7,
            "sharePct": 7,
            "topics": [
              {
                "name": "Arithmetic",
                "count": 1,
                "tier": "mid"
              },
              {
                "name": "Averages",
                "count": 1,
                "tier": "mid"
              },
              {
                "name": "Geometry",
                "count": 1,
                "tier": "mid"
              },
              {
                "name": "Percentage",
                "count": 1,
                "tier": "mid"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "mid"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "mid"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "J&K General Knowledge",
            "questionCount": 4,
            "sharePct": 4,
            "topics": [
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 4,
                "tier": "high"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkpsi": {
    "examSlug": "jkpsi",
    "totalPapersAnalyzed": 2,
    "totalQuestionsAnalyzed": 240,
    "masterSections": [
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 40,
        "topics": [
          {
            "name": "Static GK",
            "count": 7,
            "tier": "high"
          },
          {
            "name": "Environment & Ecology",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Sports",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Current Affairs",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Economy",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Government Schemes",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Art & Culture",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Indian Geography",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Indian History",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "International Organisations",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "World Geography",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Climate Change",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Indian Polity",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "J&K General Knowledge",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Operating Systems",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General Science",
        "totalQuestions": 28,
        "topics": [
          {
            "name": "Physics",
            "count": 8,
            "tier": "high"
          },
          {
            "name": "Biology",
            "count": 7,
            "tier": "high"
          },
          {
            "name": "General Science Core Concepts",
            "count": 7,
            "tier": "high"
          },
          {
            "name": "Chemistry",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Environment & Ecology",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Mathematics",
        "totalQuestions": 25,
        "topics": [
          {
            "name": "Percentage",
            "count": 7,
            "tier": "high"
          },
          {
            "name": "Arithmetic",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Linear Equations",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Ratio & Proportion",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Averages",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Time & Work",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Direction Sense",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Geometry",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Mensuration",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Number Series",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Speed, Time & Distance",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "History",
        "totalQuestions": 24,
        "topics": [
          {
            "name": "Modern History",
            "count": 18,
            "tier": "high"
          },
          {
            "name": "Ancient History",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Medieval History",
            "count": 3,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Indian Polity",
        "totalQuestions": 24,
        "topics": [
          {
            "name": "Indian Polity Core Concepts",
            "count": 20,
            "tier": "high"
          },
          {
            "name": "Parliament",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Fundamental Rights",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Government Schemes",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 19,
        "topics": [
          {
            "name": "Vocabulary",
            "count": 10,
            "tier": "high"
          },
          {
            "name": "Fill in the Blanks",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Antonyms",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Idioms & Phrases",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Synonyms",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Geography",
        "totalQuestions": 18,
        "topics": [
          {
            "name": "Indian Geography",
            "count": 17,
            "tier": "high"
          },
          {
            "name": "World Geography",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "J&K General Knowledge",
        "totalQuestions": 16,
        "topics": [
          {
            "name": "J&K General Knowledge Core Concepts",
            "count": 12,
            "tier": "high"
          },
          {
            "name": "J&K History",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "J&K Geography",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 16,
        "topics": [
          {
            "name": "Direction Sense",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Coding-Decoding",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Statement & Conclusion",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Syllogism",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Analogy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Arithmetic Reasoning",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Blood Relations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Logical Deduction",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Number Series",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Odd One Out",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Seating Arrangement",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 11,
        "topics": [
          {
            "name": "Computer Networks",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Computer Fundamentals",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Computer Memory",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Economy",
        "totalQuestions": 11,
        "topics": [
          {
            "name": "Economy Core Concepts",
            "count": 10,
            "tier": "high"
          },
          {
            "name": "Budget & Fiscal Policy",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Environment & Ecology",
        "totalQuestions": 8,
        "topics": [
          {
            "name": "Environment & Ecology Core Concepts",
            "count": 8,
            "tier": "high"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Indian Polity",
        "topic": "Indian Polity Core Concepts",
        "totalQuestions": 20,
        "yearBreakdown": "2022: 8 Qs · 2017: 12 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Indian Polity questions tested in official JKPSI papers."
      },
      {
        "subject": "History",
        "topic": "Modern History",
        "totalQuestions": 18,
        "yearBreakdown": "2022: 9 Qs · 2017: 9 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency History questions tested in official JKPSI papers."
      },
      {
        "subject": "Geography",
        "topic": "Indian Geography",
        "totalQuestions": 17,
        "yearBreakdown": "2022: 9 Qs · 2017: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Geography questions tested in official JKPSI papers."
      },
      {
        "subject": "J&K General Knowledge",
        "topic": "J&K General Knowledge Core Concepts",
        "totalQuestions": 12,
        "yearBreakdown": "2022: 10 Qs · 2017: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKPSI papers."
      },
      {
        "subject": "Economy",
        "topic": "Economy Core Concepts",
        "totalQuestions": 10,
        "yearBreakdown": "2022: 6 Qs · 2017: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Economy questions tested in official JKPSI papers."
      },
      {
        "subject": "General English",
        "topic": "Vocabulary",
        "totalQuestions": 10,
        "yearBreakdown": "2022: 10 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official JKPSI papers."
      },
      {
        "subject": "Environment & Ecology",
        "topic": "Environment & Ecology Core Concepts",
        "totalQuestions": 8,
        "yearBreakdown": "2022: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environment & Ecology questions tested in official JKPSI papers."
      },
      {
        "subject": "General Science",
        "topic": "Physics",
        "totalQuestions": 8,
        "yearBreakdown": "2017: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Science questions tested in official JKPSI papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Static GK",
        "totalQuestions": 7,
        "yearBreakdown": "2022: 1 Qs · 2017: 6 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKPSI papers."
      },
      {
        "subject": "General Science",
        "topic": "Biology",
        "totalQuestions": 7,
        "yearBreakdown": "2022: 1 Qs · 2017: 6 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Science questions tested in official JKPSI papers."
      },
      {
        "subject": "General Science",
        "topic": "General Science Core Concepts",
        "totalQuestions": 7,
        "yearBreakdown": "2022: 4 Qs · 2017: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Science questions tested in official JKPSI papers."
      },
      {
        "subject": "Mathematics",
        "topic": "Percentage",
        "totalQuestions": 7,
        "yearBreakdown": "2022: 4 Qs · 2017: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Mathematics questions tested in official JKPSI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Networks",
        "totalQuestions": 6,
        "yearBreakdown": "2022: 6 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKPSI papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Environment & Ecology",
        "totalQuestions": 6,
        "yearBreakdown": "2017: 6 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKPSI papers."
      },
      {
        "subject": "General Science",
        "topic": "Chemistry",
        "totalQuestions": 5,
        "yearBreakdown": "2022: 2 Qs · 2017: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Science questions tested in official JKPSI papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Sports",
        "totalQuestions": 4,
        "yearBreakdown": "2017: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official JKPSI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Fundamentals",
        "totalQuestions": 3,
        "yearBreakdown": "2022: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official JKPSI papers."
      },
      {
        "subject": "General English",
        "topic": "Fill in the Blanks",
        "totalQuestions": 3,
        "yearBreakdown": "2022: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official JKPSI papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2022",
        "label": "2022 JKPSI Sub-Inspector (Home Dept.) Cutoff (150 Marks)",
        "maxMarks": 150,
        "vacancies": "1,200 Posts (Advt. 06 of 2021)",
        "appeared": "~97,000+ Appeared",
        "topperScore": "128.50 / 150",
        "meanScore": "64.20 / 150",
        "sourceNote": "120 questions carrying 150 marks (1.25 marks per question, 0.3125 negative marking) before PET shortlist.",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "103.50 – 108.00 / 150",
            "pct": 71,
            "safeTarget": "110+ / 150",
            "note": "600 Open Merit vacancies"
          },
          {
            "category": "RBA / EWS",
            "marks": "96.00 – 101.25 / 150",
            "pct": 66,
            "safeTarget": "103+ / 150",
            "note": "Reserved categories"
          },
          {
            "category": "SC / ST / ALC-IB",
            "marks": "86.50 – 93.00 / 150",
            "pct": 60,
            "safeTarget": "95+ / 150",
            "note": "PET consideration zone (6x vacancies)"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkpsi-2022",
        "paperTitle": "JKSSB J&K Police Sub-Inspector (JKPSI) Question Paper 2022",
        "year": "2022",
        "heldOn": "2022-03-27",
        "totalQuestions": 120,
        "maxMarks": 150,
        "sections": [
          {
            "subject": "General English",
            "questionCount": 19,
            "sharePct": 16,
            "topics": [
              {
                "name": "Vocabulary",
                "count": 10,
                "tier": "high"
              },
              {
                "name": "Fill in the Blanks",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Antonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Idioms & Phrases",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Synonyms",
                "count": 2,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 16,
            "sharePct": 13,
            "topics": [
              {
                "name": "Direction Sense",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Coding-Decoding",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Statement & Conclusion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Syllogism",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Analogy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Logical Deduction",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Number Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Odd One Out",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Seating Arrangement",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 11,
            "sharePct": 9,
            "topics": [
              {
                "name": "Computer Networks",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Computer Fundamentals",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Computer Memory",
                "count": 2,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "J&K General Knowledge",
            "questionCount": 10,
            "sharePct": 8,
            "topics": [
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 10,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 9,
            "sharePct": 8,
            "topics": [
              {
                "name": "Current Affairs",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian Geography",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Art & Culture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Economy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Polity",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "J&K General Knowledge",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Static GK",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 9,
            "sharePct": 8,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 9,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "History",
            "questionCount": 9,
            "sharePct": 8,
            "topics": [
              {
                "name": "Modern History",
                "count": 9,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Environment & Ecology",
            "questionCount": 8,
            "sharePct": 7,
            "topics": [
              {
                "name": "Environment & Ecology Core Concepts",
                "count": 8,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Indian Polity",
            "questionCount": 8,
            "sharePct": 7,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 8,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 8,
            "sharePct": 7,
            "topics": [
              {
                "name": "Percentage",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Ratio & Proportion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Averages",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Science",
            "questionCount": 7,
            "sharePct": 6,
            "topics": [
              {
                "name": "General Science Core Concepts",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Chemistry",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Biology",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 6,
            "sharePct": 5,
            "topics": [
              {
                "name": "Economy Core Concepts",
                "count": 6,
                "tier": "high"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "jkpsi-2017",
        "paperTitle": "JKSSB J&K Police Sub-Inspector (JKPSI) Question Paper 2017",
        "year": "2017",
        "heldOn": "2017-05-13",
        "totalQuestions": 120,
        "maxMarks": 120,
        "sections": [
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 31,
            "sharePct": 26,
            "topics": [
              {
                "name": "Environment & Ecology",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Static GK",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Sports",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Government Schemes",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Economy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian History",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "International Organisations",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "World Geography",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Art & Culture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Climate Change",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Operating Systems",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Science",
            "questionCount": 21,
            "sharePct": 18,
            "topics": [
              {
                "name": "Physics",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Biology",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Chemistry",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "General Science Core Concepts",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Mathematics",
            "questionCount": 17,
            "sharePct": 14,
            "topics": [
              {
                "name": "Arithmetic",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Linear Equations",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Averages",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Geometry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Mensuration",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Number Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Indian Polity",
            "questionCount": 16,
            "sharePct": 13,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 12,
                "tier": "high"
              },
              {
                "name": "Parliament",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Fundamental Rights",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "History",
            "questionCount": 15,
            "sharePct": 12,
            "topics": [
              {
                "name": "Modern History",
                "count": 9,
                "tier": "high"
              },
              {
                "name": "Ancient History",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Medieval History",
                "count": 3,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 9,
            "sharePct": 8,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "World Geography",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "J&K General Knowledge",
            "questionCount": 6,
            "sharePct": 5,
            "topics": [
              {
                "name": "J&K History",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "J&K Geography",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 5,
            "sharePct": 4,
            "topics": [
              {
                "name": "Economy Core Concepts",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkpsi-telecom": {
    "examSlug": "jkpsi-telecom",
    "totalPapersAnalyzed": 0,
    "totalQuestionsAnalyzed": 0,
    "masterSections": [],
    "masterTopics": [],
    "cutoffSets": [
      {
        "year": "2026",
        "label": "2026 JKPSI Telecommunication Target Safe Score (Advt. 11/2025 · 200 Marks)",
        "maxMarks": 200,
        "vacancies": "Sub-Inspector (Telecommunication) · Home Dept.",
        "appeared": "Upcoming (Scheduled 2026)",
        "topperScore": "200 Max Marks (100 Qs × 2 Marks)",
        "meanScore": "Part A: 60 Marks · Part B (Technical): 140 Marks",
        "sourceNote": "100 MCQs for 200 marks (2 marks each, −0.50 negative marking); 70% weightage is Technical ECE/IT/Networking.",
        "rows": [
          {
            "category": "OM (Open Merit Safe Target)",
            "marks": "142 – 150 / 200",
            "pct": 73,
            "safeTarget": "150+ / 200",
            "note": "Aim for 45+/60 in Part A and 105+/140 in Part B"
          },
          {
            "category": "RBA / EWS Safe Target",
            "marks": "132 – 140 / 200",
            "pct": 68,
            "safeTarget": "140+ / 200",
            "note": "10% RBA & 10% EWS reservation"
          },
          {
            "category": "SC / ST / OBC Safe Target",
            "marks": "120 – 130 / 200",
            "pct": 63,
            "safeTarget": "130+ / 200",
            "note": "Qualifying PET follows written merit"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": []
  },
  "upsc-cse": {
    "examSlug": "upsc-cse",
    "totalPapersAnalyzed": 4,
    "totalQuestionsAnalyzed": 360,
    "masterSections": [
      {
        "subject": "Quantitative Aptitude",
        "totalQuestions": 61,
        "topics": [
          {
            "name": "Number System",
            "count": 24,
            "tier": "high"
          },
          {
            "name": "Arithmetic",
            "count": 7,
            "tier": "mid"
          },
          {
            "name": "Averages",
            "count": 6,
            "tier": "mid"
          },
          {
            "name": "Percentage",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Mensuration",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Speed, Time & Distance",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Algebra",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Ratio & Proportion",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Time & Work",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Data Interpretation",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Profit & Loss",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Trigonometry",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reading Comprehension",
        "totalQuestions": 52,
        "topics": [
          {
            "name": "Reading Comprehension Core Concepts",
            "count": 48,
            "tier": "high"
          },
          {
            "name": "Climate Change",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Economy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Environment & Ecology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Inflation & Indices",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 47,
        "topics": [
          {
            "name": "Logical Deduction",
            "count": 14,
            "tier": "high"
          },
          {
            "name": "Direction Sense",
            "count": 9,
            "tier": "high"
          },
          {
            "name": "Coding-Decoding",
            "count": 7,
            "tier": "mid"
          },
          {
            "name": "Data Sufficiency",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Statement & Conclusion",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Number Series",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Blood Relations",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Analogy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Geometry",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Letter Series",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Economy",
        "totalQuestions": 34,
        "topics": [
          {
            "name": "Economy Core Concepts",
            "count": 33,
            "tier": "high"
          },
          {
            "name": "Budget & Fiscal Policy",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Science & Technology",
        "totalQuestions": 33,
        "topics": [
          {
            "name": "Science & Technology Core Concepts",
            "count": 31,
            "tier": "high"
          },
          {
            "name": "Current Affairs",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Space & Defense",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "History",
        "totalQuestions": 29,
        "topics": [
          {
            "name": "Modern History",
            "count": 25,
            "tier": "high"
          },
          {
            "name": "Freedom Struggle",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Art & Culture",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Indian Polity",
        "totalQuestions": 27,
        "topics": [
          {
            "name": "Indian Polity Core Concepts",
            "count": 24,
            "tier": "high"
          },
          {
            "name": "Fundamental Rights",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Panchayati Raj",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Environment & Ecology",
        "totalQuestions": 23,
        "topics": [
          {
            "name": "Environment & Ecology Core Concepts",
            "count": 22,
            "tier": "high"
          },
          {
            "name": "Climate Change",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Geography",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Indian Geography",
            "count": 11,
            "tier": "high"
          },
          {
            "name": "World Geography",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Current Affairs",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "International Relations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Physical Geography",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Current Affairs",
        "totalQuestions": 12,
        "topics": [
          {
            "name": "Current Affairs Core Concepts",
            "count": 11,
            "tier": "high"
          },
          {
            "name": "International Relations",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "International Relations",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "International Relations Core Concepts",
            "count": 8,
            "tier": "high"
          },
          {
            "name": "Current Affairs",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "World Geography",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Art & Culture",
        "totalQuestions": 9,
        "topics": [
          {
            "name": "Art & Culture Core Concepts",
            "count": 9,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "Decision Making & Ethics",
        "totalQuestions": 3,
        "topics": [
          {
            "name": "Decision Making",
            "count": 3,
            "tier": "high"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Reading Comprehension",
        "topic": "Reading Comprehension Core Concepts",
        "totalQuestions": 48,
        "yearBreakdown": "2026: 23 Qs · 2025: 25 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reading Comprehension questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Economy",
        "topic": "Economy Core Concepts",
        "totalQuestions": 33,
        "yearBreakdown": "2026: 17 Qs · 2025: 16 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Economy questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Science & Technology",
        "topic": "Science & Technology Core Concepts",
        "totalQuestions": 31,
        "yearBreakdown": "2026: 16 Qs · 2025: 15 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Science & Technology questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "History",
        "topic": "Modern History",
        "totalQuestions": 25,
        "yearBreakdown": "2026: 12 Qs · 2025: 13 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency History questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Indian Polity",
        "topic": "Indian Polity Core Concepts",
        "totalQuestions": 24,
        "yearBreakdown": "2026: 7 Qs · 2025: 17 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Indian Polity questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Number System",
        "totalQuestions": 24,
        "yearBreakdown": "2026: 6 Qs · 2025: 18 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Environment & Ecology",
        "topic": "Environment & Ecology Core Concepts",
        "totalQuestions": 22,
        "yearBreakdown": "2026: 8 Qs · 2025: 14 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environment & Ecology questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Logical Deduction",
        "totalQuestions": 14,
        "yearBreakdown": "2026: 9 Qs · 2025: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Current Affairs",
        "topic": "Current Affairs Core Concepts",
        "totalQuestions": 11,
        "yearBreakdown": "2026: 4 Qs · 2025: 7 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Current Affairs questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Geography",
        "topic": "Indian Geography",
        "totalQuestions": 11,
        "yearBreakdown": "2026: 4 Qs · 2025: 7 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Geography questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Art & Culture",
        "topic": "Art & Culture Core Concepts",
        "totalQuestions": 9,
        "yearBreakdown": "2026: 9 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Art & Culture questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Direction Sense",
        "totalQuestions": 9,
        "yearBreakdown": "2026: 8 Qs · 2025: 1 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "International Relations",
        "topic": "International Relations Core Concepts",
        "totalQuestions": 8,
        "yearBreakdown": "2026: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency International Relations questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Arithmetic",
        "totalQuestions": 7,
        "yearBreakdown": "2026: 6 Qs · 2025: 1 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Coding-Decoding",
        "totalQuestions": 7,
        "yearBreakdown": "2026: 5 Qs · 2025: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Geography",
        "topic": "World Geography",
        "totalQuestions": 6,
        "yearBreakdown": "2026: 2 Qs · 2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Geography questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Averages",
        "totalQuestions": 6,
        "yearBreakdown": "2026: 2 Qs · 2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official UPSC-CSE papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Percentage",
        "totalQuestions": 5,
        "yearBreakdown": "2026: 2 Qs · 2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official UPSC-CSE papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2025-2024",
        "label": "UPSC CSE Prelims Official GS Paper-I Cutoffs (Out of 200 Marks)",
        "maxMarks": 200,
        "vacancies": "1,056 Posts (CSE 2024) · 979 Posts (CSE 2025)",
        "appeared": "~5.8 Lakh Appeared",
        "topperScore": "CSAT Qualifying: 66.00 / 200 (33%)",
        "meanScore": "GS-I Cutoff Range: 75.41 – 87.98 / 200",
        "sourceNote": "Official UPSC CSE Preliminary Examination category-wise cutoffs (GS Paper-I out of 200; CSAT Paper-II qualifying at 33%).",
        "rows": [
          {
            "category": "General (UR)",
            "marks": "87.98 / 200 (2024: 87.98 · 2023: 75.41)",
            "pct": 44,
            "safeTarget": "95+ / 200",
            "note": "45–48 net correct questions after 1/3rd negative marking"
          },
          {
            "category": "OBC",
            "marks": "87.28 / 200 (2023: 74.75)",
            "pct": 44,
            "safeTarget": "92+ / 200",
            "note": "Virtually par with General category"
          },
          {
            "category": "EWS",
            "marks": "85.92 / 200 (2023: 68.02)",
            "pct": 43,
            "safeTarget": "90+ / 200",
            "note": "10% EWS reservation"
          },
          {
            "category": "SC",
            "marks": "79.03 / 200 (2023: 59.25)",
            "pct": 40,
            "safeTarget": "84+ / 200",
            "note": "Scheduled Caste"
          },
          {
            "category": "ST",
            "marks": "74.23 / 200 (2023: 47.82)",
            "pct": 37,
            "safeTarget": "80+ / 200",
            "note": "Scheduled Tribe"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "upsc-cse-prelims-2026-gs1",
        "paperTitle": "UPSC CSE Prelims Question Paper 2026 — General Studies Paper I",
        "year": "2026",
        "heldOn": "2026-05-24",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "Economy",
            "questionCount": 18,
            "sharePct": 18,
            "topics": [
              {
                "name": "Economy Core Concepts",
                "count": 17,
                "tier": "high"
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Science & Technology",
            "questionCount": 17,
            "sharePct": 17,
            "topics": [
              {
                "name": "Science & Technology Core Concepts",
                "count": 16,
                "tier": "high"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "History",
            "questionCount": 13,
            "sharePct": 13,
            "topics": [
              {
                "name": "Modern History",
                "count": 12,
                "tier": "high"
              },
              {
                "name": "Art & Culture",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "International Relations",
            "questionCount": 10,
            "sharePct": 10,
            "topics": [
              {
                "name": "International Relations Core Concepts",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "World Geography",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Art & Culture",
            "questionCount": 9,
            "sharePct": 9,
            "topics": [
              {
                "name": "Art & Culture Core Concepts",
                "count": 9,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Environment & Ecology",
            "questionCount": 9,
            "sharePct": 9,
            "topics": [
              {
                "name": "Environment & Ecology Core Concepts",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Climate Change",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Indian Polity",
            "questionCount": 9,
            "sharePct": 9,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "Fundamental Rights",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Panchayati Raj",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 8,
            "sharePct": 8,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "World Geography",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Relations",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Current Affairs",
            "questionCount": 4,
            "sharePct": 4,
            "topics": [
              {
                "name": "Current Affairs Core Concepts",
                "count": 4,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Decision Making & Ethics",
            "questionCount": 3,
            "sharePct": 3,
            "topics": [
              {
                "name": "Decision Making",
                "count": 3,
                "tier": "high"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "upsc-cse-prelims-2026-gs2",
        "paperTitle": "UPSC CSE Prelims Question Paper 2026 — CSAT (General Studies Paper II)",
        "year": "2026",
        "heldOn": "2026-05-24",
        "totalQuestions": 80,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 30,
            "sharePct": 38,
            "topics": [
              {
                "name": "Arithmetic",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Number System",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Mensuration",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Averages",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Percentage",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Ratio & Proportion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Data Interpretation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Profit & Loss",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Trigonometry",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 27,
            "sharePct": 34,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 9,
                "tier": "high"
              },
              {
                "name": "Direction Sense",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Coding-Decoding",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Statement & Conclusion",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reading Comprehension",
            "questionCount": 23,
            "sharePct": 29,
            "topics": [
              {
                "name": "Reading Comprehension Core Concepts",
                "count": 23,
                "tier": "high"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "upsc-cse-prelims-2025-gs1",
        "paperTitle": "UPSC CSE Prelims Question Paper 2025 — General Studies Paper I",
        "year": "2025",
        "heldOn": "2025-05-25",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "Indian Polity",
            "questionCount": 18,
            "sharePct": 18,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 17,
                "tier": "high"
              },
              {
                "name": "Fundamental Rights",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 16,
            "sharePct": 16,
            "topics": [
              {
                "name": "Economy Core Concepts",
                "count": 16,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "History",
            "questionCount": 16,
            "sharePct": 16,
            "topics": [
              {
                "name": "Modern History",
                "count": 13,
                "tier": "high"
              },
              {
                "name": "Freedom Struggle",
                "count": 3,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "Science & Technology",
            "questionCount": 16,
            "sharePct": 16,
            "topics": [
              {
                "name": "Science & Technology Core Concepts",
                "count": 15,
                "tier": "high"
              },
              {
                "name": "Space & Defense",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Environment & Ecology",
            "questionCount": 14,
            "sharePct": 14,
            "topics": [
              {
                "name": "Environment & Ecology Core Concepts",
                "count": 14,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 12,
            "sharePct": 12,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "World Geography",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Physical Geography",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Current Affairs",
            "questionCount": 8,
            "sharePct": 8,
            "topics": [
              {
                "name": "Current Affairs Core Concepts",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "International Relations",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "upsc-cse-prelims-2025-gs2",
        "paperTitle": "UPSC CSE Prelims Question Paper 2025 — CSAT (General Studies Paper II)",
        "year": "2025",
        "heldOn": "2025-05-25",
        "totalQuestions": 80,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 31,
            "sharePct": 39,
            "topics": [
              {
                "name": "Number System",
                "count": 18,
                "tier": "high"
              },
              {
                "name": "Averages",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Percentage",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Time & Work",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Arithmetic",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reading Comprehension",
            "questionCount": 29,
            "sharePct": 36,
            "topics": [
              {
                "name": "Reading Comprehension Core Concepts",
                "count": 25,
                "tier": "high"
              },
              {
                "name": "Climate Change",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Economy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Inflation & Indices",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 20,
            "sharePct": 25,
            "topics": [
              {
                "name": "Data Sufficiency",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Logical Deduction",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Number Series",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Coding-Decoding",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Analogy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Geometry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Letter Series",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      }
    ]
  },
  "ssc-cgl": {
    "examSlug": "ssc-cgl",
    "totalPapersAnalyzed": 9,
    "totalQuestionsAnalyzed": 950,
    "masterSections": [
      {
        "subject": "General English",
        "totalQuestions": 245,
        "topics": [
          {
            "name": "Reading Comprehension",
            "count": 47,
            "tier": "high"
          },
          {
            "name": "Vocabulary",
            "count": 27,
            "tier": "mid"
          },
          {
            "name": "Para Jumbles",
            "count": 22,
            "tier": "mid"
          },
          {
            "name": "Direct & Indirect Speech",
            "count": 17,
            "tier": "mid"
          },
          {
            "name": "Spelling",
            "count": 17,
            "tier": "mid"
          },
          {
            "name": "Active & Passive Voice",
            "count": 14,
            "tier": "mid"
          },
          {
            "name": "Error Spotting",
            "count": 14,
            "tier": "mid"
          },
          {
            "name": "Antonyms",
            "count": 12,
            "tier": "mid"
          },
          {
            "name": "Idioms & Phrases",
            "count": 12,
            "tier": "mid"
          },
          {
            "name": "Fill in the Blanks",
            "count": 11,
            "tier": "mid"
          },
          {
            "name": "One Word Substitution",
            "count": 11,
            "tier": "mid"
          },
          {
            "name": "Synonyms",
            "count": 11,
            "tier": "mid"
          },
          {
            "name": "Sentence Improvement",
            "count": 10,
            "tier": "mid"
          },
          {
            "name": "Homonyms",
            "count": 8,
            "tier": "mid"
          },
          {
            "name": "Prepositions",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Active and Passive Voice",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Tenses",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Direct and Indirect Speech",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Homophones",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Phrasal Verbs",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Quantitative Aptitude",
        "totalQuestions": 230,
        "topics": [
          {
            "name": "Mensuration",
            "count": 33,
            "tier": "high"
          },
          {
            "name": "Percentage",
            "count": 21,
            "tier": "high"
          },
          {
            "name": "Geometry",
            "count": 19,
            "tier": "high"
          },
          {
            "name": "Profit & Loss",
            "count": 19,
            "tier": "high"
          },
          {
            "name": "Trigonometry",
            "count": 19,
            "tier": "high"
          },
          {
            "name": "Arithmetic",
            "count": 17,
            "tier": "mid"
          },
          {
            "name": "Ratio & Proportion",
            "count": 17,
            "tier": "mid"
          },
          {
            "name": "Algebra",
            "count": 12,
            "tier": "mid"
          },
          {
            "name": "Averages",
            "count": 11,
            "tier": "mid"
          },
          {
            "name": "Partnership",
            "count": 11,
            "tier": "mid"
          },
          {
            "name": "Simplification",
            "count": 10,
            "tier": "mid"
          },
          {
            "name": "Time & Work",
            "count": 10,
            "tier": "mid"
          },
          {
            "name": "Data Interpretation",
            "count": 9,
            "tier": "mid"
          },
          {
            "name": "Simple & Compound Interest",
            "count": 9,
            "tier": "mid"
          },
          {
            "name": "Speed, Time & Distance",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Coordinate Geometry",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Number System",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Discount",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Linear Equations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Probability",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 230,
        "topics": [
          {
            "name": "Logical Deduction",
            "count": 51,
            "tier": "high"
          },
          {
            "name": "Number Series",
            "count": 40,
            "tier": "high"
          },
          {
            "name": "Blood Relations",
            "count": 23,
            "tier": "mid"
          },
          {
            "name": "Analogy",
            "count": 22,
            "tier": "mid"
          },
          {
            "name": "Coding-Decoding",
            "count": 21,
            "tier": "mid"
          },
          {
            "name": "Odd One Out",
            "count": 18,
            "tier": "mid"
          },
          {
            "name": "Statement & Conclusion",
            "count": 6,
            "tier": "mid"
          },
          {
            "name": "Direction Sense",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Syllogism",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Word Formation",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Arithmetic Reasoning",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Letter Series",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Seating Arrangement",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Simplification",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Statement & Assumption",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Missing Number",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Ratio & Proportion",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Algebra",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Alphanumeric Series",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Averages",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Calendar & Clock",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Course of Action",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Data Interpretation",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Decision Making",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Dice & Cube",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Linear Equations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Mirror & Water Image",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Puzzles",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Time & Work",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Venn Diagrams",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General Awareness",
        "totalQuestions": 225,
        "topics": [
          {
            "name": "Static GK",
            "count": 53,
            "tier": "high"
          },
          {
            "name": "Indian Polity",
            "count": 32,
            "tier": "high"
          },
          {
            "name": "Art & Culture",
            "count": 20,
            "tier": "mid"
          },
          {
            "name": "Economy",
            "count": 19,
            "tier": "mid"
          },
          {
            "name": "Sports",
            "count": 18,
            "tier": "mid"
          },
          {
            "name": "Current Affairs",
            "count": 9,
            "tier": "mid"
          },
          {
            "name": "Science & Technology",
            "count": 8,
            "tier": "mid"
          },
          {
            "name": "Environment & Ecology",
            "count": 6,
            "tier": "mid"
          },
          {
            "name": "Physics",
            "count": 6,
            "tier": "mid"
          },
          {
            "name": "Assertion & Reason",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Biology",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Government Schemes",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Art, Culture & Sports",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Indian History",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Geography",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Indian Geography",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "International Organisations",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Space & Defense",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Awards & Honours",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Books & Authors",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Human Physiology",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Modern History",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Physical Geography",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Planning & Reforms",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Ancient History",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Chemistry",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Environmental Science",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Festivals & Culture",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Freedom Struggle",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "International Relations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Medieval History",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Computer Networks",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Computer Fundamentals",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Computer Memory",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "MS Excel",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "MS Word",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Operating Systems",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Computer Architecture",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Cyber Security",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "MS PowerPoint",
            "count": 1,
            "tier": "low"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "General Awareness",
        "topic": "Static GK",
        "totalQuestions": 53,
        "yearBreakdown": "2026: 3 Qs · 2025: 48 Qs · 2024: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Awareness questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Logical Deduction",
        "totalQuestions": 51,
        "yearBreakdown": "2025: 45 Qs · 2024: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official SSC-CGL papers."
      },
      {
        "subject": "General English",
        "topic": "Reading Comprehension",
        "totalQuestions": 47,
        "yearBreakdown": "2026: 5 Qs · 2025: 38 Qs · 2024: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Number Series",
        "totalQuestions": 40,
        "yearBreakdown": "2026: 2 Qs · 2025: 33 Qs · 2024: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Mensuration",
        "totalQuestions": 33,
        "yearBreakdown": "2026: 6 Qs · 2025: 25 Qs · 2024: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official SSC-CGL papers."
      },
      {
        "subject": "General Awareness",
        "topic": "Indian Polity",
        "totalQuestions": 32,
        "yearBreakdown": "2026: 2 Qs · 2025: 27 Qs · 2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Awareness questions tested in official SSC-CGL papers."
      },
      {
        "subject": "General English",
        "topic": "Vocabulary",
        "totalQuestions": 27,
        "yearBreakdown": "2025: 27 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Blood Relations",
        "totalQuestions": 23,
        "yearBreakdown": "2026: 2 Qs · 2025: 20 Qs · 2024: 1 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official SSC-CGL papers."
      },
      {
        "subject": "General English",
        "topic": "Para Jumbles",
        "totalQuestions": 22,
        "yearBreakdown": "2026: 3 Qs · 2025: 16 Qs · 2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Analogy",
        "totalQuestions": 22,
        "yearBreakdown": "2026: 5 Qs · 2025: 16 Qs · 2024: 1 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Percentage",
        "totalQuestions": 21,
        "yearBreakdown": "2026: 1 Qs · 2025: 16 Qs · 2024: 4 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Coding-Decoding",
        "totalQuestions": 21,
        "yearBreakdown": "2026: 2 Qs · 2025: 16 Qs · 2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official SSC-CGL papers."
      },
      {
        "subject": "General Awareness",
        "topic": "Art & Culture",
        "totalQuestions": 20,
        "yearBreakdown": "2026: 1 Qs · 2025: 16 Qs · 2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Awareness questions tested in official SSC-CGL papers."
      },
      {
        "subject": "General Awareness",
        "topic": "Economy",
        "totalQuestions": 19,
        "yearBreakdown": "2026: 1 Qs · 2025: 16 Qs · 2024: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Awareness questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Geometry",
        "totalQuestions": 19,
        "yearBreakdown": "2026: 4 Qs · 2025: 12 Qs · 2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Profit & Loss",
        "totalQuestions": 19,
        "yearBreakdown": "2026: 1 Qs · 2025: 18 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official SSC-CGL papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Trigonometry",
        "totalQuestions": 19,
        "yearBreakdown": "2026: 2 Qs · 2025: 14 Qs · 2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official SSC-CGL papers."
      },
      {
        "subject": "General Awareness",
        "topic": "Sports",
        "totalQuestions": 18,
        "yearBreakdown": "2026: 1 Qs · 2025: 15 Qs · 2024: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Awareness questions tested in official SSC-CGL papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2025-2024",
        "label": "SSC CGL Tier-I Official Normalized Cutoffs (Out of 200 Marks)",
        "maxMarks": 200,
        "vacancies": "17,727 Posts (2024) · 14,582 Posts (2025)",
        "appeared": "~18+ Lakh Appeared",
        "topperScore": "Tier-I Qualifying for Tier-II (450 Marks)",
        "meanScore": "Normalized across all CBT shifts",
        "sourceNote": "Official SSC CGL Tier-I cutoffs for List-3 (all posts other than AAO/JSO) out of 200 normalized marks.",
        "rows": [
          {
            "category": "UR (Unreserved)",
            "marks": "153.18 / 200",
            "pct": 77,
            "safeTarget": "155+ Raw Score",
            "note": "78–80 net correct out of 100 questions in 60 mins"
          },
          {
            "category": "OBC",
            "marks": "146.26 / 200",
            "pct": 73,
            "safeTarget": "150+ Raw Score",
            "note": "Other Backward Classes"
          },
          {
            "category": "EWS",
            "marks": "142.01 / 200",
            "pct": 71,
            "safeTarget": "145+ Raw Score",
            "note": "Economically Weaker Section"
          },
          {
            "category": "SC",
            "marks": "126.68 / 200",
            "pct": 63,
            "safeTarget": "130+ Raw Score",
            "note": "Scheduled Caste"
          },
          {
            "category": "ST",
            "marks": "118.06 / 200",
            "pct": 59,
            "safeTarget": "122+ Raw Score",
            "note": "Scheduled Tribe"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "ssc-cgl-2026-sep30-shift2",
        "paperTitle": "SSC CGL Tier-I Question Paper 2026 — 30 Sep (Shift 2)",
        "year": "2026",
        "heldOn": "2026-09-30",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "General Awareness",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Static GK",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Books & Authors",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian Polity",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Physical Geography",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Planning & Reforms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Space & Defense",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Art & Culture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Art, Culture & Sports",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Economy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environmental Science",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Festivals & Culture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Freedom Struggle",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Human Physiology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Geography",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Physics",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Science & Technology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Sports",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Reading Comprehension",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Active and Passive Voice",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Para Jumbles",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Spelling",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Antonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Idioms & Phrases",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Direct and Indirect Speech",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Error Spotting",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Fill in the Blanks",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "One Word Substitution",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Prepositions",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Mensuration",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Geometry",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Algebra",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Ratio & Proportion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Trigonometry",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Coordinate Geometry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Discount",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Partnership",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Percentage",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Profit & Loss",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simplification",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Analogy",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Blood Relations",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Coding-Decoding",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Number Series",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Odd One Out",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Word Formation",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Averages",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Calendar & Clock",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Course of Action",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Data Interpretation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Decision Making",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Missing Number",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Puzzles",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Statement & Assumption",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Statement & Conclusion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "ssc-cgl-2025-tier2",
        "paperTitle": "SSC CGL Tier-II Question Paper 2025 — Paper I (19 Jan 2026)",
        "year": "2025",
        "heldOn": "2026-01-19",
        "totalQuestions": 150,
        "maxMarks": 450,
        "sections": [
          {
            "subject": "General English",
            "questionCount": 45,
            "sharePct": 30,
            "topics": [
              {
                "name": "Reading Comprehension",
                "count": 15,
                "tier": "high"
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Vocabulary",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Active & Passive Voice",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Idioms & Phrases",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Prepositions",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sentence Improvement",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Spelling",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Antonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Error Spotting",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Fill in the Blanks",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "One Word Substitution",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Phrasal Verbs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 30,
            "sharePct": 20,
            "topics": [
              {
                "name": "Mensuration",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "Geometry",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Trigonometry",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Averages",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Data Interpretation",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Ratio & Proportion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Number System",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Partnership",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Probability",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simplification",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 30,
            "sharePct": 20,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Coding-Decoding",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Number Series",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Analogy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Blood Relations",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Letter Series",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Syllogism",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Dice & Cube",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Mirror & Water Image",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Missing Number",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Venn Diagrams",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Word Formation",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Awareness",
            "questionCount": 25,
            "sharePct": 17,
            "topics": [
              {
                "name": "Economy",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Indian Polity",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Current Affairs",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Sports",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Static GK",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Art & Culture",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Geography",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Human Physiology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Science & Technology",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 20,
            "sharePct": 13,
            "topics": [
              {
                "name": "Computer Networks",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Computer Fundamentals",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Computer Memory",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "MS Excel",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "MS Word",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Operating Systems",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Architecture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Cyber Security",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "MS PowerPoint",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "ssc-cgl-2025-sep17-shift1",
        "paperTitle": "SSC CGL Tier-I Question Paper 2025 — 17 Sep (Shift 1)",
        "year": "2025",
        "heldOn": "2025-09-17",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "General Awareness",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Static GK",
                "count": 17,
                "tier": "high"
              },
              {
                "name": "Economy",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Art, Culture & Sports",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian History",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian Polity",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Vocabulary",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Reading Comprehension",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Error Spotting",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "One Word Substitution",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Synonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Active & Passive Voice",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Antonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Spelling",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Arithmetic",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Geometry",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Trigonometry",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Mensuration",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Ratio & Proportion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 13,
                "tier": "high"
              },
              {
                "name": "Statement & Conclusion",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Blood Relations",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Odd One Out",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Coding-Decoding",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Number Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Syllogism",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "ssc-cgl-2025-sep13-shift1",
        "paperTitle": "SSC CGL Tier-I Question Paper 2025 — 13 Sep (Shift 1)",
        "year": "2025",
        "heldOn": "2025-09-13",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "General Awareness",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Static GK",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Economy",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Indian Polity",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Sports",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Art & Culture",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Science & Technology",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Awards & Honours",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Biology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Geography",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Physics",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Reading Comprehension",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Active & Passive Voice",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Error Spotting",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Fill in the Blanks",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sentence Improvement",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Spelling",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Antonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "One Word Substitution",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vocabulary",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Trigonometry",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Profit & Loss",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Arithmetic",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Geometry",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Mensuration",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Partnership",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Coordinate Geometry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Data Interpretation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simplification",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Number Series",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Blood Relations",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Logical Deduction",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Odd One Out",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Analogy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Coding-Decoding",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Simplification",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Statement & Assumption",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Statement & Conclusion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Word Formation",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "ssc-cgl-2025-sep13-shift2",
        "paperTitle": "SSC CGL Tier-I Question Paper 2025 — 13 Sep (Shift 2)",
        "year": "2025",
        "heldOn": "2025-09-13",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "General Awareness",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Indian Polity",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Art & Culture",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Sports",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Assertion & Reason",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Science & Technology",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Awards & Honours",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Biology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Economy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Physics",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Static GK",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Reading Comprehension",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Active & Passive Voice",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Error Spotting",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Fill in the Blanks",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sentence Improvement",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Spelling",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Antonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "One Word Substitution",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vocabulary",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Profit & Loss",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Mensuration",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Arithmetic",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Averages",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Partnership",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Simplification",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Time & Work",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Coordinate Geometry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Data Interpretation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Linear Equations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Percentage",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Number Series",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "Analogy",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Blood Relations",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Logical Deduction",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Odd One Out",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Coding-Decoding",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Seating Arrangement",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "ssc-cgl-2025-sep12-shift1",
        "paperTitle": "SSC CGL Tier-I Question Paper 2025 — 12 Sep (Shift 1)",
        "year": "2025",
        "heldOn": "2025-09-12",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "General Awareness",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Indian Polity",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Art & Culture",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Sports",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Economy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Environment & Ecology",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Static GK",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Art, Culture & Sports",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Assertion & Reason",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Biology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Chemistry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Physics",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Space & Defense",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Reading Comprehension",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Fill in the Blanks",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Vocabulary",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sentence Improvement",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Spelling",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Active & Passive Voice",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Error Spotting",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "One Word Substitution",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Prepositions",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Profit & Loss",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Mensuration",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Simplification",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Averages",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Partnership",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Percentage",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Time & Work",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Arithmetic",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Data Interpretation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Number Series",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "Analogy",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Blood Relations",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Odd One Out",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Logical Deduction",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Coding-Decoding",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Seating Arrangement",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simplification",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "ssc-cgl-2025-sep12-shift2",
        "paperTitle": "SSC CGL Tier-I Question Paper 2025 — 12 Sep (Shift 2)",
        "year": "2025",
        "heldOn": "2025-09-12",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "General Awareness",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Static GK",
                "count": 18,
                "tier": "high"
              },
              {
                "name": "Indian Polity",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Economy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian History",
                "count": 2,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Vocabulary",
                "count": 11,
                "tier": "high"
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Error Spotting",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Spelling",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Active & Passive Voice",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Antonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "One Word Substitution",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Ratio & Proportion",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Arithmetic",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Trigonometry",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Averages",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Geometry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Mensuration",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Profit & Loss",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Number Series",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Analogy",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Blood Relations",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Direction Sense",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Coding-Decoding",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Odd One Out",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Statement & Conclusion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Syllogism",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "ssc-cgl-2025-sep12-shift3",
        "paperTitle": "SSC CGL Tier-I Question Paper 2025 — 12 Sep (Shift 3)",
        "year": "2025",
        "heldOn": "2025-09-12",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "General Awareness",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Art & Culture",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Indian Polity",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Government Schemes",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Sports",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Assertion & Reason",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Science & Technology",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Static GK",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Economy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Reading Comprehension",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Active & Passive Voice",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Antonyms",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Error Spotting",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Fill in the Blanks",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Para Jumbles",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sentence Improvement",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Homonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "One Word Substitution",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Spelling",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Synonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Vocabulary",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Mensuration",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Profit & Loss",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Averages",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Partnership",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Arithmetic",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simplification",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "Number Series",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Coding-Decoding",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Blood Relations",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Algebra",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Linear Equations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Odd One Out",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Seating Arrangement",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Statement & Assumption",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Word Formation",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "ssc-cgl-2024-sep26-shift2",
        "paperTitle": "SSC CGL Tier-I Question Paper 2024 — 26 Sep (Shift 2)",
        "year": "2024",
        "heldOn": "2024-09-26",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "General Awareness",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Art & Culture",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Indian Polity",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Biology",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Current Affairs",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Economy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Indian Geography",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Modern History",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Physics",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Sports",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Static GK",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Ancient History",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Medieval History",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Reading Comprehension",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Antonyms",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Para Jumbles",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Synonyms",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Active & Passive Voice",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Idioms & Phrases",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "One Word Substitution",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Spelling",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Tenses",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Error Spotting",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Homophones",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Data Interpretation",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Geometry",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Trigonometry",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Algebra",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Mensuration",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Number System",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simplification",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Number Series",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Coding-Decoding",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Letter Series",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Odd One Out",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Alphanumeric Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Analogy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Syllogism",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      }
    ]
  },
  "bpsc-cce": {
    "examSlug": "bpsc-cce",
    "totalPapersAnalyzed": 2,
    "totalQuestionsAnalyzed": 300,
    "masterSections": [
      {
        "subject": "History",
        "totalQuestions": 58,
        "topics": [
          {
            "name": "Modern History",
            "count": 52,
            "tier": "high"
          },
          {
            "name": "Match the Following",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Freedom Struggle",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General Science",
        "totalQuestions": 57,
        "topics": [
          {
            "name": "General Science Core Concepts",
            "count": 27,
            "tier": "high"
          },
          {
            "name": "Chemistry",
            "count": 10,
            "tier": "mid"
          },
          {
            "name": "Physics",
            "count": 8,
            "tier": "mid"
          },
          {
            "name": "Biology",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Electricity & Magnetism",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Botany",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Human Physiology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Light & Optics",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Current Affairs",
        "totalQuestions": 54,
        "topics": [
          {
            "name": "Current Affairs Core Concepts",
            "count": 43,
            "tier": "high"
          },
          {
            "name": "Awards & Honours",
            "count": 5,
            "tier": "mid"
          },
          {
            "name": "Art & Culture",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Environment & Ecology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Government Schemes",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Indian Polity",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Space & Defense",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Sports",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Bihar Studies",
        "totalQuestions": 35,
        "topics": [
          {
            "name": "Bihar GK",
            "count": 34,
            "tier": "high"
          },
          {
            "name": "Rivers & Lakes",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Indian Polity",
        "totalQuestions": 26,
        "topics": [
          {
            "name": "Indian Polity Core Concepts",
            "count": 19,
            "tier": "high"
          },
          {
            "name": "Parliament",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Panchayati Raj",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Fundamental Rights",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Judiciary",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Geography",
        "totalQuestions": 22,
        "topics": [
          {
            "name": "Indian Geography",
            "count": 16,
            "tier": "high"
          },
          {
            "name": "Rivers & Lakes",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "World Geography",
            "count": 3,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 20,
        "topics": [
          {
            "name": "Logical Deduction",
            "count": 9,
            "tier": "high"
          },
          {
            "name": "Coding-Decoding",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Direction Sense",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Arithmetic Reasoning",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Blood Relations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Calendar & Clock",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Missing Number",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Odd One Out",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Order & Ranking",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Economy",
        "totalQuestions": 19,
        "topics": [
          {
            "name": "Economy Core Concepts",
            "count": 17,
            "tier": "high"
          },
          {
            "name": "Banking & Monetary Policy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Government Schemes",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Environment & Ecology",
        "totalQuestions": 9,
        "topics": [
          {
            "name": "Environment & Ecology Core Concepts",
            "count": 8,
            "tier": "high"
          },
          {
            "name": "Government Schemes",
            "count": 1,
            "tier": "low"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "History",
        "topic": "Modern History",
        "totalQuestions": 52,
        "yearBreakdown": "2025: 25 Qs · 2024: 27 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency History questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Current Affairs",
        "topic": "Current Affairs Core Concepts",
        "totalQuestions": 43,
        "yearBreakdown": "2025: 14 Qs · 2024: 29 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Current Affairs questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Bihar Studies",
        "topic": "Bihar GK",
        "totalQuestions": 34,
        "yearBreakdown": "2025: 11 Qs · 2024: 23 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Bihar Studies questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "General Science",
        "topic": "General Science Core Concepts",
        "totalQuestions": 27,
        "yearBreakdown": "2025: 10 Qs · 2024: 17 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Science questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Indian Polity",
        "topic": "Indian Polity Core Concepts",
        "totalQuestions": 19,
        "yearBreakdown": "2025: 7 Qs · 2024: 12 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Indian Polity questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Economy",
        "topic": "Economy Core Concepts",
        "totalQuestions": 17,
        "yearBreakdown": "2025: 8 Qs · 2024: 9 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Economy questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Geography",
        "topic": "Indian Geography",
        "totalQuestions": 16,
        "yearBreakdown": "2025: 6 Qs · 2024: 10 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Geography questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "General Science",
        "topic": "Chemistry",
        "totalQuestions": 10,
        "yearBreakdown": "2025: 2 Qs · 2024: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Science questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Logical Deduction",
        "totalQuestions": 9,
        "yearBreakdown": "2025: 2 Qs · 2024: 7 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Environment & Ecology",
        "topic": "Environment & Ecology Core Concepts",
        "totalQuestions": 8,
        "yearBreakdown": "2025: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environment & Ecology questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "General Science",
        "topic": "Physics",
        "totalQuestions": 8,
        "yearBreakdown": "2025: 5 Qs · 2024: 3 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General Science questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Current Affairs",
        "topic": "Awards & Honours",
        "totalQuestions": 5,
        "yearBreakdown": "2025: 5 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Current Affairs questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "General Science",
        "topic": "Biology",
        "totalQuestions": 5,
        "yearBreakdown": "2025: 3 Qs · 2024: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Science questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "History",
        "topic": "Match the Following",
        "totalQuestions": 5,
        "yearBreakdown": "2025: 5 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency History questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "General Science",
        "topic": "Electricity & Magnetism",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General Science questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Geography",
        "topic": "Rivers & Lakes",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Geography questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Geography",
        "topic": "World Geography",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Geography questions tested in official BPSC-CCE papers."
      },
      {
        "subject": "Indian Polity",
        "topic": "Parliament",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Indian Polity questions tested in official BPSC-CCE papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "70th-69th",
        "label": "BPSC 70th & 69th CCE Prelims Official Cutoffs (Out of 150 Marks)",
        "maxMarks": 150,
        "vacancies": "2,035 Posts (70th BPSC) · 1,250+ Posts (71st BPSC)",
        "appeared": "~3.28 Lakh Appeared",
        "topperScore": "150 Questions · 150 Marks (1/3rd Negative Marking)",
        "meanScore": "4-option pattern with −0.33 penalty",
        "sourceNote": "Official BPSC Combined Competitive Examination Prelims General Studies cutoffs (out of 150 marks).",
        "rows": [
          {
            "category": "Unreserved (Male)",
            "marks": "91.00 / 150 (69th: 91.67)",
            "pct": 61,
            "safeTarget": "95+ / 150",
            "note": "History + Bihar GK + Science + Current Affairs = 110 Qs"
          },
          {
            "category": "Unreserved (Female)",
            "marks": "81.00 / 150 (69th: 84.00)",
            "pct": 54,
            "safeTarget": "86+ / 150",
            "note": "35% horizontal women reservation in Bihar"
          },
          {
            "category": "EWS (Male / Female)",
            "marks": "83.00 / 73.00",
            "pct": 55,
            "safeTarget": "88+ / 150",
            "note": "Economically Weaker Section"
          },
          {
            "category": "BC / EBC (Male)",
            "marks": "84.67 / 82.33",
            "pct": 56,
            "safeTarget": "88+ / 150",
            "note": "Backward Class & Extremely Backward Class"
          },
          {
            "category": "SC / ST (Male)",
            "marks": "70.33 / 72.00",
            "pct": 47,
            "safeTarget": "76+ / 150",
            "note": "Scheduled Caste & Scheduled Tribe"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "bpsc-71st-cce-prelims-2025-gs",
        "paperTitle": "71st BPSC CCE Prelims Question Paper 2025",
        "year": "2025",
        "heldOn": "2025-09-13",
        "totalQuestions": 150,
        "maxMarks": 150,
        "sections": [
          {
            "subject": "History",
            "questionCount": 31,
            "sharePct": 21,
            "topics": [
              {
                "name": "Modern History",
                "count": 25,
                "tier": "high"
              },
              {
                "name": "Match the Following",
                "count": 5,
                "tier": "mid"
              },
              {
                "name": "Freedom Struggle",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General Science",
            "questionCount": 27,
            "sharePct": 18,
            "topics": [
              {
                "name": "General Science Core Concepts",
                "count": 10,
                "tier": "high"
              },
              {
                "name": "Physics",
                "count": 5,
                "tier": "mid"
              },
              {
                "name": "Biology",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Electricity & Magnetism",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Botany",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Chemistry",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Human Physiology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Light & Optics",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Current Affairs",
            "questionCount": 25,
            "sharePct": 17,
            "topics": [
              {
                "name": "Current Affairs Core Concepts",
                "count": 14,
                "tier": "high"
              },
              {
                "name": "Awards & Honours",
                "count": 5,
                "tier": "mid"
              },
              {
                "name": "Art & Culture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Environment & Ecology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Indian Polity",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Space & Defense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Sports",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Indian Polity",
            "questionCount": 14,
            "sharePct": 9,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "Parliament",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Panchayati Raj",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Fundamental Rights",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Judiciary",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Bihar Studies",
            "questionCount": 12,
            "sharePct": 8,
            "topics": [
              {
                "name": "Bihar GK",
                "count": 11,
                "tier": "high"
              },
              {
                "name": "Rivers & Lakes",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 12,
            "sharePct": 8,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Rivers & Lakes",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "World Geography",
                "count": 3,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 10,
            "sharePct": 7,
            "topics": [
              {
                "name": "Economy Core Concepts",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Banking & Monetary Policy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 10,
            "sharePct": 7,
            "topics": [
              {
                "name": "Coding-Decoding",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Logical Deduction",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Missing Number",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Odd One Out",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Order & Ranking",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Environment & Ecology",
            "questionCount": 9,
            "sharePct": 6,
            "topics": [
              {
                "name": "Environment & Ecology Core Concepts",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "bpsc-70th-cce-prelims-2024-gs",
        "paperTitle": "70th BPSC CCE Prelims Question Paper 2024",
        "year": "2024",
        "heldOn": "2024-12-13",
        "totalQuestions": 150,
        "maxMarks": 150,
        "sections": [
          {
            "subject": "General Science",
            "questionCount": 30,
            "sharePct": 20,
            "topics": [
              {
                "name": "General Science Core Concepts",
                "count": 17,
                "tier": "high"
              },
              {
                "name": "Chemistry",
                "count": 8,
                "tier": "mid"
              },
              {
                "name": "Physics",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Biology",
                "count": 2,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "Current Affairs",
            "questionCount": 29,
            "sharePct": 19,
            "topics": [
              {
                "name": "Current Affairs Core Concepts",
                "count": 29,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "History",
            "questionCount": 27,
            "sharePct": 18,
            "topics": [
              {
                "name": "Modern History",
                "count": 27,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Bihar Studies",
            "questionCount": 23,
            "sharePct": 15,
            "topics": [
              {
                "name": "Bihar GK",
                "count": 23,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Indian Polity",
            "questionCount": 12,
            "sharePct": 8,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 12,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 10,
            "sharePct": 7,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 10,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 10,
            "sharePct": 7,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 7,
                "tier": "high"
              },
              {
                "name": "Calendar & Clock",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Coding-Decoding",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 9,
            "sharePct": 6,
            "topics": [
              {
                "name": "Economy Core Concepts",
                "count": 9,
                "tier": "high"
              }
            ]
          }
        ]
      }
    ]
  },
  "jkcce": {
    "examSlug": "jkcce",
    "totalPapersAnalyzed": 3,
    "totalQuestionsAnalyzed": 300,
    "masterSections": [
      {
        "subject": "Indian Polity",
        "totalQuestions": 45,
        "topics": [
          {
            "name": "Indian Polity Core Concepts",
            "count": 35,
            "tier": "high"
          },
          {
            "name": "Parliament",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Budget & Fiscal Policy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Constitutional Amendments",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Fundamental Rights",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "J&K General Knowledge",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "J&K Polity",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Panchayati Raj",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 33,
        "topics": [
          {
            "name": "Logical Deduction",
            "count": 17,
            "tier": "high"
          },
          {
            "name": "Analogy",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Blood Relations",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Number Series",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Data Sufficiency",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Direction Sense",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Mirror & Water Image",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Missing Number",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Odd One Out",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Seating Arrangement",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Syllogism",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "History",
        "totalQuestions": 32,
        "topics": [
          {
            "name": "Modern History",
            "count": 28,
            "tier": "high"
          },
          {
            "name": "Art & Culture",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Freedom Struggle",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "J&K General Knowledge",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reading Comprehension",
        "totalQuestions": 30,
        "topics": [
          {
            "name": "Reading Comprehension Core Concepts",
            "count": 28,
            "tier": "high"
          },
          {
            "name": "Assertion & Reason",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Environment & Ecology",
        "totalQuestions": 28,
        "topics": [
          {
            "name": "Environment & Ecology Core Concepts",
            "count": 21,
            "tier": "high"
          },
          {
            "name": "Biodiversity & Conservation",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Climate Change",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Environmental Legislation",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Protected Areas & Ramsar",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Science & Technology",
        "totalQuestions": 28,
        "topics": [
          {
            "name": "Science & Technology Core Concepts",
            "count": 23,
            "tier": "high"
          },
          {
            "name": "Biology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Chemistry",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Internet & Email",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Light & Optics",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Space & Defense",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Quantitative Aptitude",
        "totalQuestions": 25,
        "topics": [
          {
            "name": "Arithmetic",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Averages",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Mensuration",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Number System",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Data Interpretation",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Simple & Compound Interest",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Speed, Time & Distance",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Boats & Streams",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "HCF & LCM",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Permutations & Combinations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Probability",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Ratio & Proportion",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Time & Work",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Trigonometry",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Economy",
        "totalQuestions": 17,
        "topics": [
          {
            "name": "Economy Core Concepts",
            "count": 11,
            "tier": "high"
          },
          {
            "name": "Banking & Monetary Policy",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Budget & Fiscal Policy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Current Affairs",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Government Schemes",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "International Organisations",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Geography",
        "totalQuestions": 16,
        "topics": [
          {
            "name": "Indian Geography",
            "count": 12,
            "tier": "high"
          },
          {
            "name": "Current Affairs",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "J&K General Knowledge",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "World Geography",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Current Affairs",
        "totalQuestions": 15,
        "topics": [
          {
            "name": "Current Affairs Core Concepts",
            "count": 7,
            "tier": "high"
          },
          {
            "name": "Awards & Honours",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Budget & Fiscal Policy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Climate Change",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "International Organisations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "International Relations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Science & Technology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Sports",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Decision Making & Ethics",
        "totalQuestions": 8,
        "topics": [
          {
            "name": "Decision Making",
            "count": 8,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "Social Issues & Schemes",
        "totalQuestions": 8,
        "topics": [
          {
            "name": "Government Schemes",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Census & Demographics",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "J&K General Knowledge",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "J&K General Knowledge",
        "totalQuestions": 6,
        "topics": [
          {
            "name": "J&K General Knowledge Core Concepts",
            "count": 6,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "Communication & Interpersonal Skills",
        "totalQuestions": 4,
        "topics": [
          {
            "name": "Communication Skills",
            "count": 4,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "International Relations",
        "totalQuestions": 4,
        "topics": [
          {
            "name": "Current Affairs",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "International Relations Core Concepts",
            "count": 2,
            "tier": "mid"
          }
        ]
      },
      {
        "subject": "Agriculture",
        "totalQuestions": 1,
        "topics": [
          {
            "name": "Indian Agriculture",
            "count": 1,
            "tier": "mid"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Indian Polity",
        "topic": "Indian Polity Core Concepts",
        "totalQuestions": 35,
        "yearBreakdown": "2025: 24 Qs · 2024: 11 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Indian Polity questions tested in official JKCCE papers."
      },
      {
        "subject": "History",
        "topic": "Modern History",
        "totalQuestions": 28,
        "yearBreakdown": "2025: 16 Qs · 2024: 12 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency History questions tested in official JKCCE papers."
      },
      {
        "subject": "Reading Comprehension",
        "topic": "Reading Comprehension Core Concepts",
        "totalQuestions": 28,
        "yearBreakdown": "2025: 28 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reading Comprehension questions tested in official JKCCE papers."
      },
      {
        "subject": "Science & Technology",
        "topic": "Science & Technology Core Concepts",
        "totalQuestions": 23,
        "yearBreakdown": "2025: 17 Qs · 2024: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Science & Technology questions tested in official JKCCE papers."
      },
      {
        "subject": "Environment & Ecology",
        "topic": "Environment & Ecology Core Concepts",
        "totalQuestions": 21,
        "yearBreakdown": "2025: 15 Qs · 2024: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Environment & Ecology questions tested in official JKCCE papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Logical Deduction",
        "totalQuestions": 17,
        "yearBreakdown": "2025: 17 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKCCE papers."
      },
      {
        "subject": "Geography",
        "topic": "Indian Geography",
        "totalQuestions": 12,
        "yearBreakdown": "2025: 3 Qs · 2024: 9 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Geography questions tested in official JKCCE papers."
      },
      {
        "subject": "Economy",
        "topic": "Economy Core Concepts",
        "totalQuestions": 11,
        "yearBreakdown": "2025: 9 Qs · 2024: 2 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Economy questions tested in official JKCCE papers."
      },
      {
        "subject": "Decision Making & Ethics",
        "topic": "Decision Making",
        "totalQuestions": 8,
        "yearBreakdown": "2025: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Decision Making & Ethics questions tested in official JKCCE papers."
      },
      {
        "subject": "Current Affairs",
        "topic": "Current Affairs Core Concepts",
        "totalQuestions": 7,
        "yearBreakdown": "2025: 5 Qs · 2024: 2 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Current Affairs questions tested in official JKCCE papers."
      },
      {
        "subject": "J&K General Knowledge",
        "topic": "J&K General Knowledge Core Concepts",
        "totalQuestions": 6,
        "yearBreakdown": "2025: 6 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency J&K General Knowledge questions tested in official JKCCE papers."
      },
      {
        "subject": "Social Issues & Schemes",
        "topic": "Government Schemes",
        "totalQuestions": 6,
        "yearBreakdown": "2024: 6 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Social Issues & Schemes questions tested in official JKCCE papers."
      },
      {
        "subject": "Communication & Interpersonal Skills",
        "topic": "Communication Skills",
        "totalQuestions": 4,
        "yearBreakdown": "2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Communication & Interpersonal Skills questions tested in official JKCCE papers."
      },
      {
        "subject": "Indian Polity",
        "topic": "Parliament",
        "totalQuestions": 4,
        "yearBreakdown": "2024: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Indian Polity questions tested in official JKCCE papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Analogy",
        "totalQuestions": 4,
        "yearBreakdown": "2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official JKCCE papers."
      },
      {
        "subject": "Environment & Ecology",
        "topic": "Biodiversity & Conservation",
        "totalQuestions": 3,
        "yearBreakdown": "2024: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Environment & Ecology questions tested in official JKCCE papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Arithmetic",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official JKCCE papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Averages",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official JKCCE papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2025-2024",
        "label": "JKPSC KAS (JKCCE) Prelims Official Cutoffs (GS Paper-I Out of 200 Marks)",
        "maxMarks": 200,
        "vacancies": "Combined Competitive Examination (JKAS / JKPS / JKAS Accounts)",
        "appeared": "~24,000+ Appeared",
        "topperScore": "CSAT Paper-II Qualifying: 66.00 / 200 (33%)",
        "meanScore": "GS-I 100 Questions × 2 Marks (−0.66 negative)",
        "sourceNote": "JKPSC Combined Competitive Examination (Prelims) GS Paper-I cutoff trends for Mains shortlisting.",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "67.00 – 78.00 / 200",
            "pct": 39,
            "safeTarget": "85+ / 200",
            "note": "Multi-statement analytical paper; accuracy is decisive"
          },
          {
            "category": "RBA / EWS / OBC",
            "marks": "61.00 – 71.00 / 200",
            "pct": 35,
            "safeTarget": "76+ / 200",
            "note": "Reserved categories"
          },
          {
            "category": "SC / ST-1 / ST-2",
            "marks": "54.00 – 65.00 / 200",
            "pct": 31,
            "safeTarget": "70+ / 200",
            "note": "Scheduled Caste & Scheduled Tribes"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "jkcce-prelims-2025-gs2-set-b",
        "paperTitle": "JKPSC KAS (JKCCE) Prelims Question Paper 2025 — CSAT (General Studies Paper II)",
        "year": "2025",
        "heldOn": "2025-12-07",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "Reasoning",
            "questionCount": 33,
            "sharePct": 33,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 17,
                "tier": "high"
              },
              {
                "name": "Analogy",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Blood Relations",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Number Series",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Data Sufficiency",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Direction Sense",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Mirror & Water Image",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Missing Number",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Odd One Out",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Seating Arrangement",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Syllogism",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reading Comprehension",
            "questionCount": 30,
            "sharePct": 30,
            "topics": [
              {
                "name": "Reading Comprehension Core Concepts",
                "count": 28,
                "tier": "high"
              },
              {
                "name": "Assertion & Reason",
                "count": 2,
                "tier": "mid"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Arithmetic",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Averages",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Mensuration",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Number System",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Data Interpretation",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Boats & Streams",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "HCF & LCM",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Permutations & Combinations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Probability",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Trigonometry",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Decision Making & Ethics",
            "questionCount": 8,
            "sharePct": 8,
            "topics": [
              {
                "name": "Decision Making",
                "count": 8,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Communication & Interpersonal Skills",
            "questionCount": 4,
            "sharePct": 4,
            "topics": [
              {
                "name": "Communication Skills",
                "count": 4,
                "tier": "high"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "jkpsc-jkcce-prelims-2025-gs1-set-b",
        "paperTitle": "JKPSC KAS (JKCCE) Prelims Question Paper 2025 — General Studies Paper I",
        "year": "2025",
        "heldOn": "2025-12-07",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "Indian Polity",
            "questionCount": 25,
            "sharePct": 25,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 24,
                "tier": "high"
              },
              {
                "name": "J&K Polity",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Science & Technology",
            "questionCount": 18,
            "sharePct": 18,
            "topics": [
              {
                "name": "Science & Technology Core Concepts",
                "count": 17,
                "tier": "high"
              },
              {
                "name": "Light & Optics",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "History",
            "questionCount": 16,
            "sharePct": 16,
            "topics": [
              {
                "name": "Modern History",
                "count": 16,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Environment & Ecology",
            "questionCount": 15,
            "sharePct": 15,
            "topics": [
              {
                "name": "Environment & Ecology Core Concepts",
                "count": 15,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 9,
            "sharePct": 9,
            "topics": [
              {
                "name": "Economy Core Concepts",
                "count": 9,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Current Affairs",
            "questionCount": 6,
            "sharePct": 6,
            "topics": [
              {
                "name": "Current Affairs Core Concepts",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "J&K General Knowledge",
            "questionCount": 6,
            "sharePct": 6,
            "topics": [
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 6,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 4,
            "sharePct": 4,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "World Geography",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Agriculture",
            "questionCount": 1,
            "sharePct": 1,
            "topics": [
              {
                "name": "Indian Agriculture",
                "count": 1,
                "tier": "mid"
              }
            ]
          }
        ]
      },
      {
        "paperSlug": "jkcce-prelims-2024-gs1-set-a",
        "paperTitle": "JKPSC KAS (JKCCE) Prelims Question Paper 2024 — General Studies Paper I",
        "year": "2024",
        "heldOn": "2025-02-23",
        "totalQuestions": 100,
        "maxMarks": 200,
        "sections": [
          {
            "subject": "Indian Polity",
            "questionCount": 20,
            "sharePct": 20,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 11,
                "tier": "high"
              },
              {
                "name": "Parliament",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Constitutional Amendments",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Fundamental Rights",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "J&K General Knowledge",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Panchayati Raj",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "History",
            "questionCount": 16,
            "sharePct": 16,
            "topics": [
              {
                "name": "Modern History",
                "count": 12,
                "tier": "high"
              },
              {
                "name": "Art & Culture",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Freedom Struggle",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "J&K General Knowledge",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Environment & Ecology",
            "questionCount": 13,
            "sharePct": 13,
            "topics": [
              {
                "name": "Environment & Ecology Core Concepts",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Biodiversity & Conservation",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Climate Change",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Environmental Legislation",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Protected Areas & Ramsar",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 12,
            "sharePct": 12,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 9,
                "tier": "high"
              },
              {
                "name": "Current Affairs",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "J&K General Knowledge",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Science & Technology",
            "questionCount": 10,
            "sharePct": 10,
            "topics": [
              {
                "name": "Science & Technology Core Concepts",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Biology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Chemistry",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Internet & Email",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Space & Defense",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Current Affairs",
            "questionCount": 9,
            "sharePct": 9,
            "topics": [
              {
                "name": "Awards & Honours",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Current Affairs Core Concepts",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Climate Change",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Science & Technology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Sports",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Economy",
            "questionCount": 8,
            "sharePct": 8,
            "topics": [
              {
                "name": "Banking & Monetary Policy",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Economy Core Concepts",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Government Schemes",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "International Organisations",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Social Issues & Schemes",
            "questionCount": 8,
            "sharePct": 8,
            "topics": [
              {
                "name": "Government Schemes",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Census & Demographics",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "J&K General Knowledge",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "International Relations",
            "questionCount": 4,
            "sharePct": 4,
            "topics": [
              {
                "name": "Current Affairs",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "International Relations Core Concepts",
                "count": 2,
                "tier": "mid"
              }
            ]
          }
        ]
      }
    ]
  },
  "ibps-po": {
    "examSlug": "ibps-po",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 100,
    "masterSections": [
      {
        "subject": "Quantitative Aptitude",
        "totalQuestions": 35,
        "topics": [
          {
            "name": "Data Interpretation",
            "count": 13,
            "tier": "high"
          },
          {
            "name": "Quadratic Equations",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Ratio & Proportion",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Simplification",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Averages",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Mensuration",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Number System",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Partnership",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Percentage",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Profit & Loss",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Simple & Compound Interest",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Speed, Time & Distance",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Time & Work",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Trains",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Reasoning",
        "totalQuestions": 35,
        "topics": [
          {
            "name": "Logical Deduction",
            "count": 14,
            "tier": "high"
          },
          {
            "name": "Syllogism",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Blood Relations",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Direction Sense",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Arithmetic Reasoning",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Odd One Out",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Statement & Conclusion",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Analogy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Calendar & Clock",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Number Series",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Seating Arrangement",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Word Formation",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 30,
        "topics": [
          {
            "name": "Vocabulary",
            "count": 8,
            "tier": "high"
          },
          {
            "name": "Reading Comprehension",
            "count": 6,
            "tier": "high"
          },
          {
            "name": "Error Spotting",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Fill in the Blanks",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Para Jumbles",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Idioms & Phrases",
            "count": 1,
            "tier": "low"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Reasoning",
        "topic": "Logical Deduction",
        "totalQuestions": 14,
        "yearBreakdown": "2025: 14 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Data Interpretation",
        "totalQuestions": 13,
        "yearBreakdown": "2025: 13 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official IBPS-PO papers."
      },
      {
        "subject": "General English",
        "topic": "Vocabulary",
        "totalQuestions": 8,
        "yearBreakdown": "2025: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official IBPS-PO papers."
      },
      {
        "subject": "General English",
        "topic": "Reading Comprehension",
        "totalQuestions": 6,
        "yearBreakdown": "2025: 6 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official IBPS-PO papers."
      },
      {
        "subject": "General English",
        "topic": "Error Spotting",
        "totalQuestions": 5,
        "yearBreakdown": "2025: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official IBPS-PO papers."
      },
      {
        "subject": "General English",
        "topic": "Fill in the Blanks",
        "totalQuestions": 5,
        "yearBreakdown": "2025: 5 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency General English questions tested in official IBPS-PO papers."
      },
      {
        "subject": "General English",
        "topic": "Para Jumbles",
        "totalQuestions": 5,
        "yearBreakdown": "2025: 5 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General English questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Quadratic Equations",
        "totalQuestions": 4,
        "yearBreakdown": "2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Ratio & Proportion",
        "totalQuestions": 4,
        "yearBreakdown": "2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Simplification",
        "totalQuestions": 4,
        "yearBreakdown": "2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Syllogism",
        "totalQuestions": 4,
        "yearBreakdown": "2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Blood Relations",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Direction Sense",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Arithmetic Reasoning",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Odd One Out",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official IBPS-PO papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Statement & Conclusion",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official IBPS-PO papers."
      },
      {
        "subject": "General English",
        "topic": "Idioms & Phrases",
        "totalQuestions": 1,
        "yearBreakdown": "2025: 1 Qs",
        "priority": "Moderate",
        "whatIsAsked": "Contextual meaning of classic English idioms and phrasal verbs tested in JKSSB & SSC exams."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Averages",
        "totalQuestions": 1,
        "yearBreakdown": "2025: 1 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official IBPS-PO papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2025-2024",
        "label": "IBPS PO Prelims Official Category-Wise Cutoffs (Out of 100 Marks)",
        "maxMarks": 100,
        "vacancies": "4,455+ Probationary Officer Posts",
        "appeared": "~6.5 Lakh Appeared",
        "topperScore": "60 Minutes (20 Mins × 3 Sections)",
        "meanScore": "Sectional + Overall Cutoff Mandatory",
        "sourceNote": "Official IBPS CRP PO/MT Prelims cutoff marks (out of 100, with 0.25 negative marking).",
        "rows": [
          {
            "category": "General (UR)",
            "marks": "54.25 – 61.75 / 100",
            "pct": 58,
            "safeTarget": "63+ / 100",
            "note": "Must also clear sectional cutoffs in Eng, Quant & Reasoning"
          },
          {
            "category": "OBC",
            "marks": "53.50 – 58.75 / 100",
            "pct": 56,
            "safeTarget": "60+ / 100",
            "note": "Other Backward Classes"
          },
          {
            "category": "EWS",
            "marks": "52.75 – 57.50 / 100",
            "pct": 55,
            "safeTarget": "59+ / 100",
            "note": "Economically Weaker Section"
          },
          {
            "category": "SC / ST",
            "marks": "46.50 – 51.75 / 100",
            "pct": 49,
            "safeTarget": "54+ / 100",
            "note": "Scheduled Caste & Scheduled Tribe"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "ibps-po-pre-2025-aug-23-shift-1",
        "paperTitle": "IBPS PO Prelims Question Paper 2025 — 23 Aug (Shift 1)",
        "year": "2025",
        "heldOn": "2025-08-23",
        "totalQuestions": 100,
        "maxMarks": 100,
        "sections": [
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 35,
            "sharePct": 35,
            "topics": [
              {
                "name": "Data Interpretation",
                "count": 13,
                "tier": "high"
              },
              {
                "name": "Quadratic Equations",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Ratio & Proportion",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Simplification",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Averages",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Mensuration",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Number System",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Partnership",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Percentage",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Profit & Loss",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Time & Work",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Trains",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Reasoning",
            "questionCount": 35,
            "sharePct": 35,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 14,
                "tier": "high"
              },
              {
                "name": "Syllogism",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Blood Relations",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Direction Sense",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Odd One Out",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Statement & Conclusion",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Analogy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Calendar & Clock",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Number Series",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Seating Arrangement",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Word Formation",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 30,
            "sharePct": 30,
            "topics": [
              {
                "name": "Vocabulary",
                "count": 8,
                "tier": "high"
              },
              {
                "name": "Reading Comprehension",
                "count": 6,
                "tier": "high"
              },
              {
                "name": "Error Spotting",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Fill in the Blanks",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Para Jumbles",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              }
            ]
          }
        ]
      }
    ]
  },
  "rssb-patwari": {
    "examSlug": "rssb-patwari",
    "totalPapersAnalyzed": 1,
    "totalQuestionsAnalyzed": 150,
    "masterSections": [
      {
        "subject": "Reasoning",
        "totalQuestions": 31,
        "topics": [
          {
            "name": "Logical Deduction",
            "count": 12,
            "tier": "high"
          },
          {
            "name": "Missing Number",
            "count": 4,
            "tier": "mid"
          },
          {
            "name": "Critical Reasoning",
            "count": 3,
            "tier": "mid"
          },
          {
            "name": "Coding-Decoding",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Direction Sense",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Number Series",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Analogy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Blood Relations",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Computer Architecture",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Odd One Out",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Statement & Conclusion",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Syllogism",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Rajasthan GK",
        "totalQuestions": 25,
        "topics": [
          {
            "name": "Rajasthan GK Core Concepts",
            "count": 24,
            "tier": "high"
          },
          {
            "name": "Current Affairs",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Computer Knowledge",
        "totalQuestions": 15,
        "topics": [
          {
            "name": "Computer Fundamentals",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Operating Systems",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "MS Excel",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "MS PowerPoint",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Computer Hardware",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Computer Memory",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Computer Networks",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "MS Word",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Storage Devices",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Indian Polity",
        "totalQuestions": 15,
        "topics": [
          {
            "name": "Indian Polity Core Concepts",
            "count": 13,
            "tier": "high"
          },
          {
            "name": "Current Affairs",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Fundamental Rights",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Quantitative Aptitude",
        "totalQuestions": 14,
        "topics": [
          {
            "name": "Mensuration",
            "count": 3,
            "tier": "high"
          },
          {
            "name": "Percentage",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Profit & Loss",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Analogy",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Computer Memory",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Ratio & Proportion",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Simple & Compound Interest",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Speed, Time & Distance",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Syllogism",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Venn Diagrams",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Hindi Language",
        "totalQuestions": 12,
        "topics": [
          {
            "name": "Hindi Grammar",
            "count": 11,
            "tier": "high"
          },
          {
            "name": "One Word Substitution",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "General English",
        "totalQuestions": 10,
        "topics": [
          {
            "name": "Reading Comprehension",
            "count": 5,
            "tier": "high"
          },
          {
            "name": "Vocabulary",
            "count": 2,
            "tier": "mid"
          },
          {
            "name": "Antonyms",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Error Spotting",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Idioms & Phrases",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "History",
        "totalQuestions": 9,
        "topics": [
          {
            "name": "Modern History",
            "count": 9,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "General Science",
        "totalQuestions": 8,
        "topics": [
          {
            "name": "General Science Core Concepts",
            "count": 4,
            "tier": "high"
          },
          {
            "name": "Biology",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Diseases & Health",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Light & Optics",
            "count": 1,
            "tier": "low"
          },
          {
            "name": "Physics",
            "count": 1,
            "tier": "low"
          }
        ]
      },
      {
        "subject": "Geography",
        "totalQuestions": 8,
        "topics": [
          {
            "name": "Indian Geography",
            "count": 8,
            "tier": "high"
          }
        ]
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "totalQuestions": 3,
        "topics": [
          {
            "name": "Current Affairs",
            "count": 3,
            "tier": "high"
          }
        ]
      }
    ],
    "masterTopics": [
      {
        "subject": "Rajasthan GK",
        "topic": "Rajasthan GK Core Concepts",
        "totalQuestions": 24,
        "yearBreakdown": "2025: 24 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Rajasthan GK questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Indian Polity",
        "topic": "Indian Polity Core Concepts",
        "totalQuestions": 13,
        "yearBreakdown": "2025: 13 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Indian Polity questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Logical Deduction",
        "totalQuestions": 12,
        "yearBreakdown": "2025: 12 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Reasoning questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Hindi Language",
        "topic": "Hindi Grammar",
        "totalQuestions": 11,
        "yearBreakdown": "2025: 11 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Hindi Language questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "History",
        "topic": "Modern History",
        "totalQuestions": 9,
        "yearBreakdown": "2025: 9 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency History questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Geography",
        "topic": "Indian Geography",
        "totalQuestions": 8,
        "yearBreakdown": "2025: 8 Qs",
        "priority": "Must-Study",
        "whatIsAsked": "High-frequency Geography questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "General English",
        "topic": "Reading Comprehension",
        "totalQuestions": 5,
        "yearBreakdown": "2025: 5 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General English questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "General Science",
        "topic": "General Science Core Concepts",
        "totalQuestions": 4,
        "yearBreakdown": "2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Science questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Missing Number",
        "totalQuestions": 4,
        "yearBreakdown": "2025: 4 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Reasoning questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Computer Fundamentals",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "Operating Systems",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "General Knowledge & Current Affairs",
        "topic": "Current Affairs",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "High-Yield",
        "whatIsAsked": "High-frequency General Knowledge & Current Affairs questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Mensuration",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Reasoning",
        "topic": "Critical Reasoning",
        "totalQuestions": 3,
        "yearBreakdown": "2025: 3 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Reasoning questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "MS Excel",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Computer Knowledge",
        "topic": "MS PowerPoint",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Computer Knowledge questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "General English",
        "topic": "Vocabulary",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency General English questions tested in official RSSB-PATWARI papers."
      },
      {
        "subject": "Quantitative Aptitude",
        "topic": "Percentage",
        "totalQuestions": 2,
        "yearBreakdown": "2025: 2 Qs",
        "priority": "Moderate",
        "whatIsAsked": "High-frequency Quantitative Aptitude questions tested in official RSSB-PATWARI papers."
      }
    ],
    "cutoffSets": [
      {
        "year": "2025",
        "label": "RSSB Rajasthan Patwari Official Cutoff Benchmarks (Out of 300 Marks)",
        "maxMarks": 300,
        "vacancies": "2,020+ Patwari Posts (Rajasthan Revenue Dept.)",
        "appeared": "~10.4 Lakh Appeared",
        "topperScore": "150 Questions · 300 Marks (1/3rd Negative Marking)",
        "meanScore": "Normalized across shifts",
        "sourceNote": "RSSB (RSMSSB) Rajasthan Patwari Non-TSP & TSP merit benchmarks out of 300 marks.",
        "rows": [
          {
            "category": "General (UR Male / Female)",
            "marks": "220.78 / 210.78 / 300",
            "pct": 74,
            "safeTarget": "225+ / 300",
            "note": "112+ net correct questions out of 150"
          },
          {
            "category": "OBC (Male / Female)",
            "marks": "219.00 / 204.60 / 300",
            "pct": 73,
            "safeTarget": "222+ / 300",
            "note": "Other Backward Classes"
          },
          {
            "category": "EWS (Male / Female)",
            "marks": "210.08 / 198.20 / 300",
            "pct": 70,
            "safeTarget": "215+ / 300",
            "note": "Economically Weaker Section"
          },
          {
            "category": "SC / ST (Male)",
            "marks": "191.89 / 187.10 / 300",
            "pct": 64,
            "safeTarget": "196+ / 300",
            "note": "Scheduled Caste & Scheduled Tribe"
          }
        ]
      }
    ],
    "scoreDistributions": [],
    "paperXrays": [
      {
        "paperSlug": "rsmssb-patwari-2025-aug17-shift1-spz8",
        "paperTitle": "RSSB Rajasthan Patwari Question Paper 2025",
        "year": "2025",
        "heldOn": "2025-08-17",
        "totalQuestions": 150,
        "maxMarks": 300,
        "sections": [
          {
            "subject": "Reasoning",
            "questionCount": 31,
            "sharePct": 21,
            "topics": [
              {
                "name": "Logical Deduction",
                "count": 12,
                "tier": "high"
              },
              {
                "name": "Missing Number",
                "count": 4,
                "tier": "mid"
              },
              {
                "name": "Critical Reasoning",
                "count": 3,
                "tier": "mid"
              },
              {
                "name": "Coding-Decoding",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Direction Sense",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Number Series",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Analogy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Blood Relations",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Computer Architecture",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Odd One Out",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Statement & Conclusion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Syllogism",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Rajasthan GK",
            "questionCount": 25,
            "sharePct": 17,
            "topics": [
              {
                "name": "Rajasthan GK Core Concepts",
                "count": 24,
                "tier": "high"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Computer Knowledge",
            "questionCount": 15,
            "sharePct": 10,
            "topics": [
              {
                "name": "Computer Fundamentals",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Operating Systems",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "MS Excel",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "MS PowerPoint",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Computer Hardware",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Computer Memory",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Computer Networks",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "MS Word",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Storage Devices",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Indian Polity",
            "questionCount": 15,
            "sharePct": 10,
            "topics": [
              {
                "name": "Indian Polity Core Concepts",
                "count": 13,
                "tier": "high"
              },
              {
                "name": "Current Affairs",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Fundamental Rights",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Quantitative Aptitude",
            "questionCount": 14,
            "sharePct": 9,
            "topics": [
              {
                "name": "Mensuration",
                "count": 3,
                "tier": "high"
              },
              {
                "name": "Percentage",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Profit & Loss",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Analogy",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Computer Memory",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Ratio & Proportion",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Syllogism",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Venn Diagrams",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Hindi Language",
            "questionCount": 12,
            "sharePct": 8,
            "topics": [
              {
                "name": "Hindi Grammar",
                "count": 11,
                "tier": "high"
              },
              {
                "name": "One Word Substitution",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "General English",
            "questionCount": 10,
            "sharePct": 7,
            "topics": [
              {
                "name": "Reading Comprehension",
                "count": 5,
                "tier": "high"
              },
              {
                "name": "Vocabulary",
                "count": 2,
                "tier": "mid"
              },
              {
                "name": "Antonyms",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Error Spotting",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Idioms & Phrases",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "History",
            "questionCount": 9,
            "sharePct": 6,
            "topics": [
              {
                "name": "Modern History",
                "count": 9,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "General Science",
            "questionCount": 8,
            "sharePct": 5,
            "topics": [
              {
                "name": "General Science Core Concepts",
                "count": 4,
                "tier": "high"
              },
              {
                "name": "Biology",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Diseases & Health",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Light & Optics",
                "count": 1,
                "tier": "low"
              },
              {
                "name": "Physics",
                "count": 1,
                "tier": "low"
              }
            ]
          },
          {
            "subject": "Geography",
            "questionCount": 8,
            "sharePct": 5,
            "topics": [
              {
                "name": "Indian Geography",
                "count": 8,
                "tier": "high"
              }
            ]
          },
          {
            "subject": "General Knowledge & Current Affairs",
            "questionCount": 3,
            "sharePct": 2,
            "topics": [
              {
                "name": "Current Affairs",
                "count": 3,
                "tier": "high"
              }
            ]
          }
        ]
      }
    ]
  }
}
