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

export type PaperSectionXray = {
  subject: string
  questionCount: number
  sharePct: number
  topics: { name: string; count: number }[]
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
                "count": 11
              },
              {
                "name": "Cost Accounting & Budgetary Control",
                "count": 5
              },
              {
                "name": "Financial & Social Audit / Vouchers",
                "count": 4
              },
              {
                "name": "Final Accounts & Balance Sheet",
                "count": 3
              },
              {
                "name": "Ledger & Trial Balance",
                "count": 2
              },
              {
                "name": "Taxation & GST Laws",
                "count": 2
              },
              {
                "name": "Bank Reconciliation Statement (BRS)",
                "count": 1
              },
              {
                "name": "Double Entry, Journal & Accounting Equation",
                "count": 1
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
                "count": 10
              },
              {
                "name": "Indian Geography, Rivers, Lakes & Transport",
                "count": 8
              },
              {
                "name": "J&K History, Heritage, Culture & Tourism",
                "count": 4
              },
              {
                "name": "Census & Demography of India",
                "count": 2
              },
              {
                "name": "Environment, Ecology & Biodiversity",
                "count": 2
              },
              {
                "name": "J&K Geography, Rivers, Lakes & Flora/Fauna",
                "count": 2
              },
              {
                "name": "Indian Culture, Heritage & Freedom Struggle",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Vital Statistics, Fertility & Demography",
                "count": 3
              },
              {
                "name": "Probability & Theory of Attributes",
                "count": 2
              },
              {
                "name": "Index Numbers (WPI, CPI & Fisher)",
                "count": 1
              },
              {
                "name": "Measures of Central Tendency",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Internet, E-Mail Protocols & IT in Governance",
                "count": 2
              },
              {
                "name": "MS Office (Word, Excel, PowerPoint & Access)",
                "count": 2
              },
              {
                "name": "Computer Virus, Anti-Virus & Security",
                "count": 1
              },
              {
                "name": "Operating Systems & Open Source Technologies",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Economic Reforms, Planning & Developing Economy",
                "count": 2
              },
              {
                "name": "Fiscal & Monetary Policy & Role of RBI",
                "count": 2
              },
              {
                "name": "Pricing Under Various Forms of Market",
                "count": 2
              },
              {
                "name": "National Income (GDP/GNP) & Economic Growth",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Synonyms, Antonyms & Homophones",
                "count": 2
              },
              {
                "name": "Active & Passive Voice",
                "count": 1
              },
              {
                "name": "Clauses & Sentence Structure",
                "count": 1
              },
              {
                "name": "Idioms & Phrases",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Chemistry (Chemical Equations, Metals & Non-Metals)",
                "count": 3
              },
              {
                "name": "Physics (Newton's Laws, Motion & Electricity)",
                "count": 3
              },
              {
                "name": "Vitamins, Deficiency & Communicable Diseases",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Simple & Compound Interest",
                "count": 3
              },
              {
                "name": "Permutations, Combinations & Binomial Theorem",
                "count": 1
              },
              {
                "name": "Set Theory, Relations & Functions",
                "count": 1
              },
              {
                "name": "Vectors, Coordinate & 3D Geometry",
                "count": 1
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
                "count": 11
              },
              {
                "name": "Taxation & GST Laws",
                "count": 4
              },
              {
                "name": "Cost Accounting & Budgetary Control",
                "count": 3
              },
              {
                "name": "Partnership Accounts",
                "count": 3
              },
              {
                "name": "Bank Reconciliation Statement (BRS)",
                "count": 2
              },
              {
                "name": "Financial & Social Audit / Vouchers",
                "count": 2
              },
              {
                "name": "Ledger & Trial Balance",
                "count": 2
              },
              {
                "name": "Public Financial Management (PFMS)",
                "count": 2
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
                "count": 6
              },
              {
                "name": "J&K History, Heritage, Culture & Tourism",
                "count": 5
              },
              {
                "name": "J&K Geography, Rivers, Lakes & Flora/Fauna",
                "count": 3
              },
              {
                "name": "Environment, Ecology & Biodiversity",
                "count": 2
              },
              {
                "name": "Indian Geography, Rivers, Lakes & Transport",
                "count": 2
              },
              {
                "name": "Indian Culture, Heritage & Freedom Struggle",
                "count": 1
              },
              {
                "name": "J&K Reorganisation Act, 2019",
                "count": 1
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
                "count": 10
              },
              {
                "name": "Physics (Newton's Laws, Motion & Electricity)",
                "count": 4
              },
              {
                "name": "Vitamins, Deficiency & Communicable Diseases",
                "count": 3
              },
              {
                "name": "Chemistry (Chemical Equations, Metals & Non-Metals)",
                "count": 2
              },
              {
                "name": "Ecosystem, Ozone/Greenhouse & Energy Sources",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Computer Virus, Anti-Virus & Security",
                "count": 2
              },
              {
                "name": "Input & Output Devices",
                "count": 2
              },
              {
                "name": "Internet, E-Mail Protocols & IT in Governance",
                "count": 1
              },
              {
                "name": "MS Office (Word, Excel, PowerPoint & Access)",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Consumer Demand & Indifference Curve Analysis",
                "count": 1
              },
              {
                "name": "Factors of Production, Laws & Factor Pricing",
                "count": 1
              },
              {
                "name": "Fiscal & Monetary Policy & Role of RBI",
                "count": 1
              },
              {
                "name": "Pricing Under Various Forms of Market",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Articles, Prepositions & Modals",
                "count": 2
              },
              {
                "name": "Synonyms, Antonyms & Homophones",
                "count": 2
              },
              {
                "name": "Clauses & Sentence Structure",
                "count": 1
              },
              {
                "name": "Direct & Indirect Narration",
                "count": 1
              },
              {
                "name": "Idioms & Phrases",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Permutations, Combinations & Binomial Theorem",
                "count": 2
              },
              {
                "name": "Set Theory, Relations & Functions",
                "count": 2
              },
              {
                "name": "Limits & Derivatives (Calculus)",
                "count": 1
              },
              {
                "name": "Matrices & Determinants",
                "count": 1
              },
              {
                "name": "Vectors, Coordinate & 3D Geometry",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Vital Statistics, Fertility & Demography",
                "count": 2
              },
              {
                "name": "Index Numbers (WPI, CPI & Fisher)",
                "count": 1
              },
              {
                "name": "Measures of Central Tendency",
                "count": 1
              },
              {
                "name": "Probability & Theory of Attributes",
                "count": 1
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
                "count": 14
              },
              {
                "name": "Financial & Social Audit / Vouchers",
                "count": 4
              },
              {
                "name": "Ledger & Trial Balance",
                "count": 4
              },
              {
                "name": "Taxation & GST Laws",
                "count": 3
              },
              {
                "name": "Bank Reconciliation Statement (BRS)",
                "count": 1
              },
              {
                "name": "Double Entry, Journal & Accounting Equation",
                "count": 1
              },
              {
                "name": "Final Accounts & Balance Sheet",
                "count": 1
              },
              {
                "name": "Partnership Accounts",
                "count": 1
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
                "count": 13
              },
              {
                "name": "National & International Current Affairs",
                "count": 5
              },
              {
                "name": "Indian Geography, Rivers, Lakes & Transport",
                "count": 3
              },
              {
                "name": "J&K Geography, Rivers, Lakes & Flora/Fauna",
                "count": 3
              },
              {
                "name": "Census & Demography of India",
                "count": 2
              },
              {
                "name": "J&K Reorganisation Act, 2019",
                "count": 2
              },
              {
                "name": "Environment, Ecology & Biodiversity",
                "count": 1
              },
              {
                "name": "Indian Culture, Heritage & Freedom Struggle",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Computer Hardware, CPU, Memory & Storage",
                "count": 2
              },
              {
                "name": "MS Office (Word, Excel, PowerPoint & Access)",
                "count": 2
              },
              {
                "name": "Computer Virus, Anti-Virus & Security",
                "count": 1
              },
              {
                "name": "Internet, E-Mail Protocols & IT in Governance",
                "count": 1
              },
              {
                "name": "Operating Systems & Open Source Technologies",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Fiscal & Monetary Policy & Role of RBI",
                "count": 2
              },
              {
                "name": "National Income (GDP/GNP) & Economic Growth",
                "count": 2
              },
              {
                "name": "Consumer Demand & Indifference Curve Analysis",
                "count": 1
              },
              {
                "name": "Factors of Production, Laws & Factor Pricing",
                "count": 1
              },
              {
                "name": "Pricing Under Various Forms of Market",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Tenses & Subject-Verb Agreement",
                "count": 3
              },
              {
                "name": "Active & Passive Voice",
                "count": 1
              },
              {
                "name": "Direct & Indirect Narration",
                "count": 1
              },
              {
                "name": "Idioms & Phrases",
                "count": 1
              },
              {
                "name": "Synonyms, Antonyms & Homophones",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Physics (Newton's Laws, Motion & Electricity)",
                "count": 2
              },
              {
                "name": "Chemistry (Chemical Equations, Metals & Non-Metals)",
                "count": 1
              },
              {
                "name": "Ecosystem, Ozone/Greenhouse & Energy Sources",
                "count": 1
              },
              {
                "name": "Vitamins, Deficiency & Communicable Diseases",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Limits & Derivatives (Calculus)",
                "count": 1
              },
              {
                "name": "Probability",
                "count": 1
              },
              {
                "name": "Set Theory, Relations & Functions",
                "count": 1
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1
              },
              {
                "name": "Vectors, Coordinate & 3D Geometry",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Measures of Central Tendency",
                "count": 2
              },
              {
                "name": "Probability & Theory of Attributes",
                "count": 2
              },
              {
                "name": "Index Numbers (WPI, CPI & Fisher)",
                "count": 1
              },
              {
                "name": "Vital Statistics, Fertility & Demography",
                "count": 1
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
      },
      {
        "year": "Social Forestry",
        "label": "Social Forestry Worker Official DV Cutoff (Annexure B · 29.10.2026)",
        "maxMarks": 120,
        "vacancies": "Advt. 03/2021 & 04/2022 · Item Nos. 185, 186, 592, 593",
        "appeared": "176 Shortlisted for DV",
        "topperScore": "71.75 / 120",
        "meanScore": "OM Cutoff: 47.50 / 120",
        "sourceNote": "Exact category-wise DV cutoff extracted from Official JKSSB Notification dated 29.10.2026 (Annexure B — Social Forestry Worker).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "47.50 / 120",
            "pct": 40,
            "safeTarget": "46 Shortlisted",
            "note": "Highest OM: 71.75 / 120"
          },
          {
            "category": "RBA",
            "marks": "44.00 / 120",
            "pct": 37,
            "safeTarget": "52 Shortlisted",
            "note": "Highest RBA: 66.25 / 120"
          },
          {
            "category": "PSP",
            "marks": "37.00 / 120",
            "pct": 31,
            "safeTarget": "13 Shortlisted",
            "note": "Highest PSP: 54.75 / 120"
          },
          {
            "category": "ALC / IB",
            "marks": "36.75 / 120",
            "pct": 31,
            "safeTarget": "11 Shortlisted",
            "note": "Highest ALC/IB: 51.25 / 120"
          },
          {
            "category": "SC",
            "marks": "31.50 / 120",
            "pct": 26,
            "safeTarget": "18 Shortlisted",
            "note": "Highest SC: 53.75 / 120"
          },
          {
            "category": "EWS",
            "marks": "29.50 / 120",
            "pct": 25,
            "safeTarget": "18 Shortlisted",
            "note": "Highest EWS: 59.25 / 120"
          },
          {
            "category": "ST",
            "marks": "28.00 / 120",
            "pct": 23,
            "safeTarget": "18 Shortlisted",
            "note": "Highest ST: 52.75 / 120"
          }
        ]
      },
      {
        "year": "FPF Guard",
        "label": "FPF Guard Official DV Cutoff (Annexure C · 29.10.2026)",
        "maxMarks": 120,
        "vacancies": "Advt. 04/2022 · Item Nos. 86–92",
        "appeared": "3,553 Appeared · 241 Shortlisted for DV",
        "topperScore": "89.50 / 120",
        "meanScore": "OM Cutoff: 69.50 / 120",
        "sourceNote": "Exact category-wise DV cutoff extracted from Official JKSSB Notification dated 29.10.2026 (Annexure C — FPF Guard).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "69.50 / 120",
            "pct": 58,
            "safeTarget": "66 Shortlisted",
            "note": "Highest OM: 89.50 / 120"
          },
          {
            "category": "PSP",
            "marks": "65.75 / 120",
            "pct": 55,
            "safeTarget": "10 Shortlisted",
            "note": "Highest PSP: 80.00 / 120"
          },
          {
            "category": "RBA",
            "marks": "63.00 / 120",
            "pct": 53,
            "safeTarget": "77 Shortlisted",
            "note": "Highest RBA: 84.75 / 120"
          },
          {
            "category": "ALC / IB",
            "marks": "61.25 / 120",
            "pct": 51,
            "safeTarget": "16 Shortlisted",
            "note": "Highest ALC/IB: 80.00 / 120"
          },
          {
            "category": "EWS",
            "marks": "56.25 / 120",
            "pct": 47,
            "safeTarget": "7 Shortlisted",
            "note": "Highest EWS: 80.75 / 120"
          },
          {
            "category": "SC",
            "marks": "51.50 / 120",
            "pct": 43,
            "safeTarget": "37 Shortlisted",
            "note": "Highest SC: 82.25 / 120"
          },
          {
            "category": "ST",
            "marks": "47.00 / 120",
            "pct": 39,
            "safeTarget": "27 Shortlisted",
            "note": "Highest ST: 72.50 / 120"
          }
        ]
      },
      {
        "year": "Inspector FPF",
        "label": "Inspector (Forest) Official DV Cutoff (Annexure D · 29.10.2026)",
        "maxMarks": 120,
        "vacancies": "Advt. 04/2022 · Item Nos. 84, 85",
        "appeared": "8,356 Appeared · 253 Shortlisted for DV",
        "topperScore": "98.75 / 120",
        "meanScore": "RBA Cutoff: 71.00 · OM: 57.25*",
        "sourceNote": "Exact category-wise DV marks extracted from Official JKSSB Notification dated 29.10.2026 (Annexure D — Inspector).",
        "rows": [
          {
            "category": "RBA",
            "marks": "71.00 / 120",
            "pct": 59,
            "safeTarget": "54 Shortlisted",
            "note": "Highest RBA: 98.75 / 120"
          },
          {
            "category": "PSP",
            "marks": "68.50 / 120",
            "pct": 57,
            "safeTarget": "10 Shortlisted",
            "note": "Highest PSP: 78.50 / 120"
          },
          {
            "category": "ALC / IB",
            "marks": "68.00 / 120",
            "pct": 57,
            "safeTarget": "13 Shortlisted",
            "note": "Highest ALC/IB: 80.25 / 120"
          },
          {
            "category": "SC",
            "marks": "64.00 / 120",
            "pct": 53,
            "safeTarget": "28 Shortlisted",
            "note": "Highest SC: 81.25 / 120"
          },
          {
            "category": "ST",
            "marks": "60.75 / 120",
            "pct": 51,
            "safeTarget": "31 Shortlisted",
            "note": "Highest ST: 85.75 / 120"
          },
          {
            "category": "EWS",
            "marks": "60.00 / 120",
            "pct": 50,
            "safeTarget": "25 Shortlisted",
            "note": "Highest EWS: 78.25 / 120"
          },
          {
            "category": "OM (incl. horizontal/ESM)",
            "marks": "57.25 / 120",
            "pct": 48,
            "safeTarget": "83 Shortlisted",
            "note": "Highest OM: 95.25 / 120"
          }
        ]
      },
      {
        "year": "Field Assistant",
        "label": "Field Assistant Official DV Cutoff (Annexure E · 29.10.2026)",
        "maxMarks": 120,
        "vacancies": "Advt. 03/2021 · Item No. 594",
        "appeared": "52 Shortlisted for DV",
        "topperScore": "116.25 / 120",
        "meanScore": "OM Cutoff: 107.50 / 120",
        "sourceNote": "Exact category-wise DV cutoff extracted from Official JKSSB Notification dated 29.10.2026 (Annexure E — Field Assistant).",
        "rows": [
          {
            "category": "OM (Open Merit)",
            "marks": "107.50 / 120",
            "pct": 90,
            "safeTarget": "16 Shortlisted",
            "note": "Highest OM: 116.25 / 120"
          },
          {
            "category": "RBA",
            "marks": "105.25 / 120",
            "pct": 88,
            "safeTarget": "13 Shortlisted",
            "note": "Highest RBA: 113.75 / 120"
          },
          {
            "category": "ST",
            "marks": "85.50 / 120",
            "pct": 71,
            "safeTarget": "6 Shortlisted",
            "note": "Highest ST: 92.25 / 120"
          },
          {
            "category": "EWS",
            "marks": "80.00 / 120",
            "pct": 67,
            "safeTarget": "6 Shortlisted",
            "note": "Highest EWS: 115.25 / 120"
          },
          {
            "category": "SC",
            "marks": "78.75 / 120",
            "pct": 66,
            "safeTarget": "6 Shortlisted",
            "note": "Highest SC: 91.25 / 120"
          },
          {
            "category": "ALC / IB",
            "marks": "67.50 / 120",
            "pct": 56,
            "safeTarget": "5 Shortlisted",
            "note": "Highest ALC/IB: 95.50 / 120"
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
                "count": 3
              },
              {
                "name": "Determiners",
                "count": 3
              },
              {
                "name": "Prepositions",
                "count": 3
              },
              {
                "name": "Reading Comprehension",
                "count": 3
              },
              {
                "name": "Synonyms",
                "count": 3
              },
              {
                "name": "Antonyms",
                "count": 2
              },
              {
                "name": "Spelling",
                "count": 2
              },
              {
                "name": "Verbs",
                "count": 2
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
                "count": 5
              },
              {
                "name": "Averages",
                "count": 4
              },
              {
                "name": "Probability",
                "count": 4
              },
              {
                "name": "Percentage",
                "count": 3
              },
              {
                "name": "Linear Equations",
                "count": 2
              },
              {
                "name": "Number System",
                "count": 2
              },
              {
                "name": "Time & Work",
                "count": 2
              },
              {
                "name": "Arithmetic",
                "count": 1
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
                "count": 7
              },
              {
                "name": "Coding-Decoding",
                "count": 6
              },
              {
                "name": "Blood Relations",
                "count": 4
              },
              {
                "name": "Direction Sense",
                "count": 4
              },
              {
                "name": "Analogy",
                "count": 2
              },
              {
                "name": "Syllogism",
                "count": 2
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
                "count": 11
              },
              {
                "name": "Environment & Ecology",
                "count": 6
              },
              {
                "name": "Biodiversity & Conservation",
                "count": 1
              },
              {
                "name": "Indian Geography",
                "count": 1
              },
              {
                "name": "Indian Polity",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Modern History",
                "count": 3
              },
              {
                "name": "Ancient History",
                "count": 2
              },
              {
                "name": "Sports",
                "count": 2
              },
              {
                "name": "Biology",
                "count": 1
              },
              {
                "name": "Chemistry",
                "count": 1
              },
              {
                "name": "Environment & Ecology",
                "count": 1
              },
              {
                "name": "Indian Polity",
                "count": 1
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
                "count": 4
              },
              {
                "name": "J&K Geography",
                "count": 3
              },
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 2
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
                "count": 26
              },
              {
                "name": "Match the Following",
                "count": 3
              },
              {
                "name": "Odd One Out",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Indian Geography",
                "count": 3
              },
              {
                "name": "J&K General Knowledge",
                "count": 3
              },
              {
                "name": "Static GK",
                "count": 3
              },
              {
                "name": "Art & Culture",
                "count": 1
              },
              {
                "name": "Current Affairs",
                "count": 1
              },
              {
                "name": "Freedom Struggle",
                "count": 1
              },
              {
                "name": "Government Schemes",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Antonyms",
                "count": 2
              },
              {
                "name": "Analogies",
                "count": 1
              },
              {
                "name": "Articles",
                "count": 1
              },
              {
                "name": "Clauses",
                "count": 1
              },
              {
                "name": "Determiners",
                "count": 1
              },
              {
                "name": "Homonyms",
                "count": 1
              },
              {
                "name": "Homophones",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Percentage",
                "count": 2
              },
              {
                "name": "Analogy",
                "count": 1
              },
              {
                "name": "Blood Relations",
                "count": 1
              },
              {
                "name": "Coding-Decoding",
                "count": 1
              },
              {
                "name": "Direction Sense",
                "count": 1
              },
              {
                "name": "Match the Following",
                "count": 1
              },
              {
                "name": "Number Series",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Computer Hardware",
                "count": 2
              },
              {
                "name": "Input & Output Devices",
                "count": 2
              },
              {
                "name": "Operating Systems",
                "count": 2
              },
              {
                "name": "Computer Memory",
                "count": 1
              },
              {
                "name": "Computer Networks",
                "count": 1
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
                "count": 9
              },
              {
                "name": "Match the Following",
                "count": 1
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
                "count": 10
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
                "count": 8
              },
              {
                "name": "Match the Following",
                "count": 2
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
                "count": 8
              },
              {
                "name": "Environment & Ecology",
                "count": 5
              },
              {
                "name": "Current Affairs",
                "count": 3
              },
              {
                "name": "Modern History",
                "count": 3
              },
              {
                "name": "Art & Culture",
                "count": 2
              },
              {
                "name": "Static GK",
                "count": 2
              },
              {
                "name": "Biology",
                "count": 1
              },
              {
                "name": "Chemistry",
                "count": 1
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
                "count": 10
              },
              {
                "name": "J&K Geography",
                "count": 9
              },
              {
                "name": "Indian Geography",
                "count": 3
              },
              {
                "name": "Current Affairs",
                "count": 2
              },
              {
                "name": "J&K History",
                "count": 2
              },
              {
                "name": "Botany",
                "count": 1
              },
              {
                "name": "Indian Polity",
                "count": 1
              },
              {
                "name": "International Organisations",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Articles",
                "count": 2
              },
              {
                "name": "Clauses",
                "count": 2
              },
              {
                "name": "Fill in the Blanks",
                "count": 2
              },
              {
                "name": "Idioms & Phrases",
                "count": 2
              },
              {
                "name": "Modals",
                "count": 2
              },
              {
                "name": "Para Jumbles",
                "count": 2
              },
              {
                "name": "Prepositions",
                "count": 2
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
                "count": 4
              },
              {
                "name": "MS Word",
                "count": 3
              },
              {
                "name": "Computer Fundamentals",
                "count": 2
              },
              {
                "name": "Computer Networks",
                "count": 2
              },
              {
                "name": "Input & Output Devices",
                "count": 2
              },
              {
                "name": "Computer Memory",
                "count": 1
              },
              {
                "name": "Cyber Security",
                "count": 1
              },
              {
                "name": "MS Excel",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Blood Relations",
                "count": 3
              },
              {
                "name": "Coding-Decoding",
                "count": 3
              },
              {
                "name": "Direction Sense",
                "count": 3
              },
              {
                "name": "Letter Series",
                "count": 3
              },
              {
                "name": "Number Series",
                "count": 3
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
                "count": 4
              },
              {
                "name": "MS Office",
                "count": 4
              },
              {
                "name": "Computer Fundamentals",
                "count": 2
              },
              {
                "name": "Computer Hardware",
                "count": 2
              },
              {
                "name": "MS Excel",
                "count": 2
              },
              {
                "name": "MS Word",
                "count": 2
              },
              {
                "name": "Operating Systems",
                "count": 2
              },
              {
                "name": "Internet & Email",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Idioms & Phrases",
                "count": 2
              },
              {
                "name": "Para Jumbles",
                "count": 2
              },
              {
                "name": "Pronouns",
                "count": 2
              },
              {
                "name": "Synonyms",
                "count": 2
              },
              {
                "name": "Active & Passive Voice",
                "count": 1
              },
              {
                "name": "Articles",
                "count": 1
              },
              {
                "name": "Clauses",
                "count": 1
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
                "count": 7
              },
              {
                "name": "J&K General Knowledge",
                "count": 4
              },
              {
                "name": "J&K Geography",
                "count": 3
              },
              {
                "name": "Static GK",
                "count": 3
              },
              {
                "name": "Current Affairs",
                "count": 1
              },
              {
                "name": "Environment & Ecology",
                "count": 1
              },
              {
                "name": "World Geography",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Profit & Loss",
                "count": 3
              },
              {
                "name": "Ratio & Proportion",
                "count": 2
              },
              {
                "name": "Time & Work",
                "count": 2
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Statement & Conclusion",
                "count": 2
              },
              {
                "name": "Coding-Decoding",
                "count": 1
              },
              {
                "name": "Direction Sense",
                "count": 1
              },
              {
                "name": "Syllogism",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Antonyms",
                "count": 2
              },
              {
                "name": "Articles",
                "count": 2
              },
              {
                "name": "Clauses",
                "count": 2
              },
              {
                "name": "Error Spotting",
                "count": 2
              },
              {
                "name": "Homophones",
                "count": 2
              },
              {
                "name": "Idioms & Phrases",
                "count": 2
              },
              {
                "name": "Phrasal Verbs",
                "count": 2
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
                "count": 6
              },
              {
                "name": "Indian Polity",
                "count": 5
              },
              {
                "name": "Static GK",
                "count": 4
              },
              {
                "name": "International Organisations",
                "count": 2
              },
              {
                "name": "Sports",
                "count": 2
              },
              {
                "name": "Awards & Honours",
                "count": 1
              },
              {
                "name": "Current Affairs",
                "count": 1
              },
              {
                "name": "Economy",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Percentage",
                "count": 3
              },
              {
                "name": "HCF & LCM",
                "count": 2
              },
              {
                "name": "Ratio & Proportion",
                "count": 2
              },
              {
                "name": "Linear Equations",
                "count": 1
              },
              {
                "name": "Mensuration",
                "count": 1
              },
              {
                "name": "Partnership",
                "count": 1
              },
              {
                "name": "Profit & Loss",
                "count": 1
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
                "count": 8
              },
              {
                "name": "Computer Fundamentals",
                "count": 2
              },
              {
                "name": "Computer Hardware",
                "count": 1
              },
              {
                "name": "Computer Memory",
                "count": 1
              },
              {
                "name": "Cyber Security",
                "count": 1
              },
              {
                "name": "MS Excel",
                "count": 1
              },
              {
                "name": "Operating Systems",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Current Affairs",
                "count": 2
              },
              {
                "name": "J&K History",
                "count": 2
              },
              {
                "name": "J&K Geography",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Number Series",
                "count": 2
              },
              {
                "name": "Odd One Out",
                "count": 2
              },
              {
                "name": "Analogies",
                "count": 1
              },
              {
                "name": "Blood Relations",
                "count": 1
              },
              {
                "name": "Coding-Decoding",
                "count": 1
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
                "count": 10
              },
              {
                "name": "Biology",
                "count": 8
              },
              {
                "name": "Physics",
                "count": 5
              },
              {
                "name": "Chemistry",
                "count": 4
              },
              {
                "name": "Modern History",
                "count": 3
              },
              {
                "name": "Economy",
                "count": 2
              },
              {
                "name": "Environment & Ecology",
                "count": 2
              },
              {
                "name": "International Organisations",
                "count": 1
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
                "count": 22
              },
              {
                "name": "Current Affairs",
                "count": 4
              },
              {
                "name": "Indian Polity",
                "count": 2
              },
              {
                "name": "Sports",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Spelling",
                "count": 4
              },
              {
                "name": "One Word Substitution",
                "count": 2
              },
              {
                "name": "Active & Passive Voice",
                "count": 1
              },
              {
                "name": "Articles",
                "count": 1
              },
              {
                "name": "Homophones",
                "count": 1
              },
              {
                "name": "Idioms & Phrases",
                "count": 1
              },
              {
                "name": "Nouns",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Algebra",
                "count": 1
              },
              {
                "name": "Arithmetic",
                "count": 1
              },
              {
                "name": "Averages",
                "count": 1
              },
              {
                "name": "Linear Equations",
                "count": 1
              },
              {
                "name": "Mensuration",
                "count": 1
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1
              },
              {
                "name": "Trigonometry",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Number Series",
                "count": 2
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
                "count": 9
              },
              {
                "name": "Indian Polity",
                "count": 6
              },
              {
                "name": "Biology",
                "count": 5
              },
              {
                "name": "Indian Geography",
                "count": 5
              },
              {
                "name": "Sports",
                "count": 4
              },
              {
                "name": "Static GK",
                "count": 4
              },
              {
                "name": "Chemistry",
                "count": 3
              },
              {
                "name": "Current Affairs",
                "count": 3
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
                "count": 3
              },
              {
                "name": "Arithmetic",
                "count": 2
              },
              {
                "name": "Geometry",
                "count": 2
              },
              {
                "name": "Mensuration",
                "count": 2
              },
              {
                "name": "Probability",
                "count": 2
              },
              {
                "name": "Algebra",
                "count": 1
              },
              {
                "name": "Quadratic Equations",
                "count": 1
              },
              {
                "name": "Ratio & Proportion",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Letter Series",
                "count": 2
              },
              {
                "name": "Number Series",
                "count": 2
              },
              {
                "name": "Order & Ranking",
                "count": 2
              },
              {
                "name": "Analogy",
                "count": 1
              },
              {
                "name": "Blood Relations",
                "count": 1
              },
              {
                "name": "Calendar & Clock",
                "count": 1
              },
              {
                "name": "Coding-Decoding",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Antonyms",
                "count": 1
              },
              {
                "name": "Articles",
                "count": 1
              },
              {
                "name": "Nouns",
                "count": 1
              },
              {
                "name": "One Word Substitution",
                "count": 1
              },
              {
                "name": "Phrasal Verbs",
                "count": 1
              },
              {
                "name": "Prepositions",
                "count": 1
              },
              {
                "name": "Synonyms",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Art & Culture",
                "count": 1
              },
              {
                "name": "Indian Polity",
                "count": 1
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
                "count": 40
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
                "count": 2
              },
              {
                "name": "Indian Geography",
                "count": 2
              },
              {
                "name": "International Organisations",
                "count": 2
              },
              {
                "name": "Modern History",
                "count": 2
              },
              {
                "name": "Sports",
                "count": 2
              },
              {
                "name": "Static GK",
                "count": 2
              },
              {
                "name": "Awards & Honours",
                "count": 1
              },
              {
                "name": "Indian Polity",
                "count": 1
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
                "count": 3
              },
              {
                "name": "One Word Substitution",
                "count": 3
              },
              {
                "name": "Error Spotting",
                "count": 2
              },
              {
                "name": "Antonyms",
                "count": 1
              },
              {
                "name": "Fill in the Blanks",
                "count": 1
              },
              {
                "name": "Modals",
                "count": 1
              },
              {
                "name": "Prepositions",
                "count": 1
              },
              {
                "name": "Sentence Improvement",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Input & Output Devices",
                "count": 2
              },
              {
                "name": "Internet & Email",
                "count": 2
              },
              {
                "name": "MS Office",
                "count": 2
              },
              {
                "name": "Operating Systems",
                "count": 1
              },
              {
                "name": "Storage Devices",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Assertion & Reason",
                "count": 1
              },
              {
                "name": "Blood Relations",
                "count": 1
              },
              {
                "name": "Coding-Decoding",
                "count": 1
              },
              {
                "name": "Letter Series",
                "count": 1
              },
              {
                "name": "Number Series",
                "count": 1
              },
              {
                "name": "Syllogism",
                "count": 1
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
                "count": 1
              },
              {
                "name": "Averages",
                "count": 1
              },
              {
                "name": "Geometry",
                "count": 1
              },
              {
                "name": "Percentage",
                "count": 1
              },
              {
                "name": "Ratio & Proportion",
                "count": 1
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1
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
                "count": 4
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
                "count": 10
              },
              {
                "name": "Fill in the Blanks",
                "count": 3
              },
              {
                "name": "Antonyms",
                "count": 2
              },
              {
                "name": "Idioms & Phrases",
                "count": 2
              },
              {
                "name": "Synonyms",
                "count": 2
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
                "count": 3
              },
              {
                "name": "Coding-Decoding",
                "count": 2
              },
              {
                "name": "Statement & Conclusion",
                "count": 2
              },
              {
                "name": "Syllogism",
                "count": 2
              },
              {
                "name": "Analogy",
                "count": 1
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 1
              },
              {
                "name": "Blood Relations",
                "count": 1
              },
              {
                "name": "Logical Deduction",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Computer Fundamentals",
                "count": 3
              },
              {
                "name": "Computer Memory",
                "count": 2
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
                "count": 10
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
                "count": 2
              },
              {
                "name": "Indian Geography",
                "count": 2
              },
              {
                "name": "Art & Culture",
                "count": 1
              },
              {
                "name": "Economy",
                "count": 1
              },
              {
                "name": "Indian Polity",
                "count": 1
              },
              {
                "name": "J&K General Knowledge",
                "count": 1
              },
              {
                "name": "Static GK",
                "count": 1
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
                "count": 9
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
                "count": 9
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
                "count": 8
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
                "count": 8
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
                "count": 4
              },
              {
                "name": "Ratio & Proportion",
                "count": 2
              },
              {
                "name": "Averages",
                "count": 1
              },
              {
                "name": "Time & Work",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Chemistry",
                "count": 2
              },
              {
                "name": "Biology",
                "count": 1
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
                "count": 6
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
                "count": 6
              },
              {
                "name": "Static GK",
                "count": 6
              },
              {
                "name": "Sports",
                "count": 4
              },
              {
                "name": "Government Schemes",
                "count": 3
              },
              {
                "name": "Economy",
                "count": 2
              },
              {
                "name": "Indian History",
                "count": 2
              },
              {
                "name": "International Organisations",
                "count": 2
              },
              {
                "name": "World Geography",
                "count": 2
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
                "count": 8
              },
              {
                "name": "Biology",
                "count": 6
              },
              {
                "name": "Chemistry",
                "count": 3
              },
              {
                "name": "General Science Core Concepts",
                "count": 3
              },
              {
                "name": "Environment & Ecology",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Linear Equations",
                "count": 3
              },
              {
                "name": "Percentage",
                "count": 3
              },
              {
                "name": "Averages",
                "count": 1
              },
              {
                "name": "Direction Sense",
                "count": 1
              },
              {
                "name": "Geometry",
                "count": 1
              },
              {
                "name": "Mensuration",
                "count": 1
              },
              {
                "name": "Number Series",
                "count": 1
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
                "count": 12
              },
              {
                "name": "Parliament",
                "count": 2
              },
              {
                "name": "Fundamental Rights",
                "count": 1
              },
              {
                "name": "Government Schemes",
                "count": 1
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
                "count": 9
              },
              {
                "name": "Ancient History",
                "count": 3
              },
              {
                "name": "Medieval History",
                "count": 3
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
                "count": 8
              },
              {
                "name": "World Geography",
                "count": 1
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
                "count": 3
              },
              {
                "name": "J&K General Knowledge Core Concepts",
                "count": 2
              },
              {
                "name": "J&K Geography",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1
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
                "count": 17
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1
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
                "count": 16
              },
              {
                "name": "Current Affairs",
                "count": 1
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
                "count": 12
              },
              {
                "name": "Art & Culture",
                "count": 1
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
                "count": 8
              },
              {
                "name": "Current Affairs",
                "count": 1
              },
              {
                "name": "World Geography",
                "count": 1
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
                "count": 9
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
                "count": 8
              },
              {
                "name": "Climate Change",
                "count": 1
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
                "count": 7
              },
              {
                "name": "Fundamental Rights",
                "count": 1
              },
              {
                "name": "Panchayati Raj",
                "count": 1
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
                "count": 4
              },
              {
                "name": "World Geography",
                "count": 2
              },
              {
                "name": "Current Affairs",
                "count": 1
              },
              {
                "name": "International Relations",
                "count": 1
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
                "count": 4
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
                "count": 3
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
                "count": 6
              },
              {
                "name": "Number System",
                "count": 6
              },
              {
                "name": "Mensuration",
                "count": 4
              },
              {
                "name": "Speed, Time & Distance",
                "count": 4
              },
              {
                "name": "Averages",
                "count": 2
              },
              {
                "name": "Percentage",
                "count": 2
              },
              {
                "name": "Ratio & Proportion",
                "count": 2
              },
              {
                "name": "Algebra",
                "count": 1
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
                "count": 9
              },
              {
                "name": "Direction Sense",
                "count": 8
              },
              {
                "name": "Coding-Decoding",
                "count": 5
              },
              {
                "name": "Statement & Conclusion",
                "count": 4
              },
              {
                "name": "Blood Relations",
                "count": 1
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
                "count": 23
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
                "count": 17
              },
              {
                "name": "Fundamental Rights",
                "count": 1
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
                "count": 16
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
                "count": 13
              },
              {
                "name": "Freedom Struggle",
                "count": 3
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
                "count": 15
              },
              {
                "name": "Space & Defense",
                "count": 1
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
                "count": 14
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
                "count": 7
              },
              {
                "name": "World Geography",
                "count": 4
              },
              {
                "name": "Physical Geography",
                "count": 1
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
                "count": 7
              },
              {
                "name": "International Relations",
                "count": 1
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
                "count": 18
              },
              {
                "name": "Averages",
                "count": 4
              },
              {
                "name": "Percentage",
                "count": 3
              },
              {
                "name": "Algebra",
                "count": 2
              },
              {
                "name": "Time & Work",
                "count": 2
              },
              {
                "name": "Arithmetic",
                "count": 1
              },
              {
                "name": "Ratio & Proportion",
                "count": 1
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
                "count": 25
              },
              {
                "name": "Climate Change",
                "count": 1
              },
              {
                "name": "Economy",
                "count": 1
              },
              {
                "name": "Environment & Ecology",
                "count": 1
              },
              {
                "name": "Inflation & Indices",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Logical Deduction",
                "count": 5
              },
              {
                "name": "Number Series",
                "count": 3
              },
              {
                "name": "Coding-Decoding",
                "count": 2
              },
              {
                "name": "Analogy",
                "count": 1
              },
              {
                "name": "Blood Relations",
                "count": 1
              },
              {
                "name": "Direction Sense",
                "count": 1
              },
              {
                "name": "Geometry",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Books & Authors",
                "count": 2
              },
              {
                "name": "Indian Polity",
                "count": 2
              },
              {
                "name": "Physical Geography",
                "count": 2
              },
              {
                "name": "Planning & Reforms",
                "count": 2
              },
              {
                "name": "Space & Defense",
                "count": 2
              },
              {
                "name": "Art & Culture",
                "count": 1
              },
              {
                "name": "Art, Culture & Sports",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Active and Passive Voice",
                "count": 3
              },
              {
                "name": "Para Jumbles",
                "count": 3
              },
              {
                "name": "Spelling",
                "count": 3
              },
              {
                "name": "Antonyms",
                "count": 2
              },
              {
                "name": "Idioms & Phrases",
                "count": 2
              },
              {
                "name": "Direct and Indirect Speech",
                "count": 1
              },
              {
                "name": "Error Spotting",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Geometry",
                "count": 4
              },
              {
                "name": "Algebra",
                "count": 3
              },
              {
                "name": "Ratio & Proportion",
                "count": 2
              },
              {
                "name": "Trigonometry",
                "count": 2
              },
              {
                "name": "Coordinate Geometry",
                "count": 1
              },
              {
                "name": "Discount",
                "count": 1
              },
              {
                "name": "Partnership",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Blood Relations",
                "count": 2
              },
              {
                "name": "Coding-Decoding",
                "count": 2
              },
              {
                "name": "Number Series",
                "count": 2
              },
              {
                "name": "Odd One Out",
                "count": 2
              },
              {
                "name": "Word Formation",
                "count": 2
              },
              {
                "name": "Averages",
                "count": 1
              },
              {
                "name": "Calendar & Clock",
                "count": 1
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
                "count": 15
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 4
              },
              {
                "name": "Para Jumbles",
                "count": 4
              },
              {
                "name": "Vocabulary",
                "count": 4
              },
              {
                "name": "Active & Passive Voice",
                "count": 3
              },
              {
                "name": "Idioms & Phrases",
                "count": 2
              },
              {
                "name": "Prepositions",
                "count": 2
              },
              {
                "name": "Sentence Improvement",
                "count": 2
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
                "count": 7
              },
              {
                "name": "Geometry",
                "count": 4
              },
              {
                "name": "Trigonometry",
                "count": 4
              },
              {
                "name": "Averages",
                "count": 3
              },
              {
                "name": "Algebra",
                "count": 2
              },
              {
                "name": "Data Interpretation",
                "count": 2
              },
              {
                "name": "Ratio & Proportion",
                "count": 2
              },
              {
                "name": "Number System",
                "count": 1
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
                "count": 8
              },
              {
                "name": "Coding-Decoding",
                "count": 5
              },
              {
                "name": "Number Series",
                "count": 3
              },
              {
                "name": "Analogy",
                "count": 2
              },
              {
                "name": "Blood Relations",
                "count": 2
              },
              {
                "name": "Letter Series",
                "count": 2
              },
              {
                "name": "Syllogism",
                "count": 2
              },
              {
                "name": "Dice & Cube",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Indian Polity",
                "count": 4
              },
              {
                "name": "Current Affairs",
                "count": 3
              },
              {
                "name": "Sports",
                "count": 3
              },
              {
                "name": "Static GK",
                "count": 3
              },
              {
                "name": "Art & Culture",
                "count": 2
              },
              {
                "name": "Geography",
                "count": 2
              },
              {
                "name": "Environment & Ecology",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Computer Fundamentals",
                "count": 3
              },
              {
                "name": "Computer Memory",
                "count": 3
              },
              {
                "name": "MS Excel",
                "count": 3
              },
              {
                "name": "MS Word",
                "count": 2
              },
              {
                "name": "Operating Systems",
                "count": 2
              },
              {
                "name": "Computer Architecture",
                "count": 1
              },
              {
                "name": "Cyber Security",
                "count": 1
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
                "count": 17
              },
              {
                "name": "Economy",
                "count": 3
              },
              {
                "name": "Art, Culture & Sports",
                "count": 2
              },
              {
                "name": "Indian History",
                "count": 2
              },
              {
                "name": "Indian Polity",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 3
              },
              {
                "name": "Reading Comprehension",
                "count": 3
              },
              {
                "name": "Error Spotting",
                "count": 2
              },
              {
                "name": "One Word Substitution",
                "count": 2
              },
              {
                "name": "Para Jumbles",
                "count": 2
              },
              {
                "name": "Synonyms",
                "count": 2
              },
              {
                "name": "Active & Passive Voice",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Geometry",
                "count": 5
              },
              {
                "name": "Trigonometry",
                "count": 4
              },
              {
                "name": "Mensuration",
                "count": 3
              },
              {
                "name": "Percentage",
                "count": 2
              },
              {
                "name": "Ratio & Proportion",
                "count": 2
              },
              {
                "name": "Algebra",
                "count": 1
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1
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
                "count": 13
              },
              {
                "name": "Statement & Conclusion",
                "count": 3
              },
              {
                "name": "Blood Relations",
                "count": 2
              },
              {
                "name": "Odd One Out",
                "count": 2
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 1
              },
              {
                "name": "Coding-Decoding",
                "count": 1
              },
              {
                "name": "Direction Sense",
                "count": 1
              },
              {
                "name": "Number Series",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Economy",
                "count": 3
              },
              {
                "name": "Indian Polity",
                "count": 3
              },
              {
                "name": "Sports",
                "count": 3
              },
              {
                "name": "Art & Culture",
                "count": 2
              },
              {
                "name": "Science & Technology",
                "count": 2
              },
              {
                "name": "Awards & Honours",
                "count": 1
              },
              {
                "name": "Biology",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Active & Passive Voice",
                "count": 2
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2
              },
              {
                "name": "Error Spotting",
                "count": 2
              },
              {
                "name": "Fill in the Blanks",
                "count": 2
              },
              {
                "name": "Para Jumbles",
                "count": 2
              },
              {
                "name": "Sentence Improvement",
                "count": 2
              },
              {
                "name": "Spelling",
                "count": 2
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
                "count": 4
              },
              {
                "name": "Percentage",
                "count": 3
              },
              {
                "name": "Profit & Loss",
                "count": 3
              },
              {
                "name": "Arithmetic",
                "count": 2
              },
              {
                "name": "Geometry",
                "count": 2
              },
              {
                "name": "Mensuration",
                "count": 2
              },
              {
                "name": "Partnership",
                "count": 2
              },
              {
                "name": "Algebra",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Blood Relations",
                "count": 3
              },
              {
                "name": "Logical Deduction",
                "count": 3
              },
              {
                "name": "Odd One Out",
                "count": 3
              },
              {
                "name": "Analogy",
                "count": 2
              },
              {
                "name": "Coding-Decoding",
                "count": 2
              },
              {
                "name": "Simplification",
                "count": 2
              },
              {
                "name": "Ratio & Proportion",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Art & Culture",
                "count": 4
              },
              {
                "name": "Sports",
                "count": 3
              },
              {
                "name": "Assertion & Reason",
                "count": 2
              },
              {
                "name": "Science & Technology",
                "count": 2
              },
              {
                "name": "Awards & Honours",
                "count": 1
              },
              {
                "name": "Biology",
                "count": 1
              },
              {
                "name": "Current Affairs",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Active & Passive Voice",
                "count": 2
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2
              },
              {
                "name": "Error Spotting",
                "count": 2
              },
              {
                "name": "Fill in the Blanks",
                "count": 2
              },
              {
                "name": "Para Jumbles",
                "count": 2
              },
              {
                "name": "Sentence Improvement",
                "count": 2
              },
              {
                "name": "Spelling",
                "count": 2
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
                "count": 4
              },
              {
                "name": "Mensuration",
                "count": 3
              },
              {
                "name": "Arithmetic",
                "count": 2
              },
              {
                "name": "Averages",
                "count": 2
              },
              {
                "name": "Partnership",
                "count": 2
              },
              {
                "name": "Simple & Compound Interest",
                "count": 2
              },
              {
                "name": "Simplification",
                "count": 2
              },
              {
                "name": "Time & Work",
                "count": 2
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
                "count": 7
              },
              {
                "name": "Analogy",
                "count": 4
              },
              {
                "name": "Blood Relations",
                "count": 4
              },
              {
                "name": "Logical Deduction",
                "count": 4
              },
              {
                "name": "Odd One Out",
                "count": 3
              },
              {
                "name": "Coding-Decoding",
                "count": 2
              },
              {
                "name": "Seating Arrangement",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Art & Culture",
                "count": 3
              },
              {
                "name": "Sports",
                "count": 3
              },
              {
                "name": "Economy",
                "count": 2
              },
              {
                "name": "Environment & Ecology",
                "count": 2
              },
              {
                "name": "Static GK",
                "count": 2
              },
              {
                "name": "Art, Culture & Sports",
                "count": 1
              },
              {
                "name": "Assertion & Reason",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Fill in the Blanks",
                "count": 3
              },
              {
                "name": "Vocabulary",
                "count": 3
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2
              },
              {
                "name": "Para Jumbles",
                "count": 2
              },
              {
                "name": "Sentence Improvement",
                "count": 2
              },
              {
                "name": "Spelling",
                "count": 2
              },
              {
                "name": "Active & Passive Voice",
                "count": 1
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
                "count": 4
              },
              {
                "name": "Mensuration",
                "count": 3
              },
              {
                "name": "Simplification",
                "count": 3
              },
              {
                "name": "Averages",
                "count": 2
              },
              {
                "name": "Partnership",
                "count": 2
              },
              {
                "name": "Percentage",
                "count": 2
              },
              {
                "name": "Simple & Compound Interest",
                "count": 2
              },
              {
                "name": "Time & Work",
                "count": 2
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
                "count": 7
              },
              {
                "name": "Analogy",
                "count": 5
              },
              {
                "name": "Blood Relations",
                "count": 4
              },
              {
                "name": "Odd One Out",
                "count": 4
              },
              {
                "name": "Logical Deduction",
                "count": 2
              },
              {
                "name": "Coding-Decoding",
                "count": 1
              },
              {
                "name": "Seating Arrangement",
                "count": 1
              },
              {
                "name": "Simplification",
                "count": 1
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
                "count": 18
              },
              {
                "name": "Indian Polity",
                "count": 3
              },
              {
                "name": "Economy",
                "count": 2
              },
              {
                "name": "Indian History",
                "count": 2
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
                "count": 11
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2
              },
              {
                "name": "Error Spotting",
                "count": 2
              },
              {
                "name": "Para Jumbles",
                "count": 2
              },
              {
                "name": "Spelling",
                "count": 2
              },
              {
                "name": "Active & Passive Voice",
                "count": 1
              },
              {
                "name": "Antonyms",
                "count": 1
              },
              {
                "name": "Homonyms",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Arithmetic",
                "count": 5
              },
              {
                "name": "Percentage",
                "count": 5
              },
              {
                "name": "Trigonometry",
                "count": 2
              },
              {
                "name": "Algebra",
                "count": 1
              },
              {
                "name": "Averages",
                "count": 1
              },
              {
                "name": "Geometry",
                "count": 1
              },
              {
                "name": "Mensuration",
                "count": 1
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
                "count": 8
              },
              {
                "name": "Number Series",
                "count": 4
              },
              {
                "name": "Analogy",
                "count": 3
              },
              {
                "name": "Blood Relations",
                "count": 3
              },
              {
                "name": "Direction Sense",
                "count": 2
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 1
              },
              {
                "name": "Coding-Decoding",
                "count": 1
              },
              {
                "name": "Odd One Out",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Indian Polity",
                "count": 4
              },
              {
                "name": "Government Schemes",
                "count": 3
              },
              {
                "name": "Sports",
                "count": 3
              },
              {
                "name": "Assertion & Reason",
                "count": 2
              },
              {
                "name": "Science & Technology",
                "count": 2
              },
              {
                "name": "Static GK",
                "count": 2
              },
              {
                "name": "Current Affairs",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Active & Passive Voice",
                "count": 2
              },
              {
                "name": "Antonyms",
                "count": 2
              },
              {
                "name": "Direct & Indirect Speech",
                "count": 2
              },
              {
                "name": "Error Spotting",
                "count": 2
              },
              {
                "name": "Fill in the Blanks",
                "count": 2
              },
              {
                "name": "Para Jumbles",
                "count": 2
              },
              {
                "name": "Sentence Improvement",
                "count": 2
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
                "count": 6
              },
              {
                "name": "Profit & Loss",
                "count": 6
              },
              {
                "name": "Averages",
                "count": 3
              },
              {
                "name": "Partnership",
                "count": 3
              },
              {
                "name": "Percentage",
                "count": 3
              },
              {
                "name": "Arithmetic",
                "count": 1
              },
              {
                "name": "Ratio & Proportion",
                "count": 1
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1
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
                "count": 7
              },
              {
                "name": "Number Series",
                "count": 5
              },
              {
                "name": "Coding-Decoding",
                "count": 4
              },
              {
                "name": "Blood Relations",
                "count": 2
              },
              {
                "name": "Algebra",
                "count": 1
              },
              {
                "name": "Linear Equations",
                "count": 1
              },
              {
                "name": "Odd One Out",
                "count": 1
              },
              {
                "name": "Ratio & Proportion",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Indian Polity",
                "count": 3
              },
              {
                "name": "Biology",
                "count": 2
              },
              {
                "name": "Current Affairs",
                "count": 2
              },
              {
                "name": "Economy",
                "count": 2
              },
              {
                "name": "Indian Geography",
                "count": 2
              },
              {
                "name": "Modern History",
                "count": 2
              },
              {
                "name": "Physics",
                "count": 2
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
                "count": 4
              },
              {
                "name": "Antonyms",
                "count": 3
              },
              {
                "name": "Para Jumbles",
                "count": 3
              },
              {
                "name": "Synonyms",
                "count": 3
              },
              {
                "name": "Active & Passive Voice",
                "count": 2
              },
              {
                "name": "Idioms & Phrases",
                "count": 2
              },
              {
                "name": "One Word Substitution",
                "count": 2
              },
              {
                "name": "Spelling",
                "count": 2
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
                "count": 4
              },
              {
                "name": "Percentage",
                "count": 4
              },
              {
                "name": "Geometry",
                "count": 3
              },
              {
                "name": "Trigonometry",
                "count": 3
              },
              {
                "name": "Algebra",
                "count": 2
              },
              {
                "name": "Mensuration",
                "count": 2
              },
              {
                "name": "Number System",
                "count": 2
              },
              {
                "name": "Ratio & Proportion",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Number Series",
                "count": 5
              },
              {
                "name": "Coding-Decoding",
                "count": 3
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 2
              },
              {
                "name": "Letter Series",
                "count": 2
              },
              {
                "name": "Odd One Out",
                "count": 2
              },
              {
                "name": "Alphanumeric Series",
                "count": 1
              },
              {
                "name": "Analogy",
                "count": 1
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
                "count": 25
              },
              {
                "name": "Match the Following",
                "count": 5
              },
              {
                "name": "Freedom Struggle",
                "count": 1
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
                "count": 10
              },
              {
                "name": "Physics",
                "count": 5
              },
              {
                "name": "Biology",
                "count": 3
              },
              {
                "name": "Electricity & Magnetism",
                "count": 3
              },
              {
                "name": "Botany",
                "count": 2
              },
              {
                "name": "Chemistry",
                "count": 2
              },
              {
                "name": "Human Physiology",
                "count": 1
              },
              {
                "name": "Light & Optics",
                "count": 1
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
                "count": 14
              },
              {
                "name": "Awards & Honours",
                "count": 5
              },
              {
                "name": "Art & Culture",
                "count": 1
              },
              {
                "name": "Environment & Ecology",
                "count": 1
              },
              {
                "name": "Government Schemes",
                "count": 1
              },
              {
                "name": "Indian Polity",
                "count": 1
              },
              {
                "name": "Space & Defense",
                "count": 1
              },
              {
                "name": "Sports",
                "count": 1
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
                "count": 7
              },
              {
                "name": "Parliament",
                "count": 3
              },
              {
                "name": "Panchayati Raj",
                "count": 2
              },
              {
                "name": "Fundamental Rights",
                "count": 1
              },
              {
                "name": "Judiciary",
                "count": 1
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
                "count": 11
              },
              {
                "name": "Rivers & Lakes",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Rivers & Lakes",
                "count": 3
              },
              {
                "name": "World Geography",
                "count": 3
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
                "count": 8
              },
              {
                "name": "Banking & Monetary Policy",
                "count": 1
              },
              {
                "name": "Government Schemes",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Logical Deduction",
                "count": 2
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 1
              },
              {
                "name": "Blood Relations",
                "count": 1
              },
              {
                "name": "Direction Sense",
                "count": 1
              },
              {
                "name": "Missing Number",
                "count": 1
              },
              {
                "name": "Odd One Out",
                "count": 1
              },
              {
                "name": "Order & Ranking",
                "count": 1
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
                "count": 8
              },
              {
                "name": "Government Schemes",
                "count": 1
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
                "count": 17
              },
              {
                "name": "Chemistry",
                "count": 8
              },
              {
                "name": "Physics",
                "count": 3
              },
              {
                "name": "Biology",
                "count": 2
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
                "count": 29
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
                "count": 27
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
                "count": 23
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
                "count": 12
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
                "count": 10
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
                "count": 7
              },
              {
                "name": "Calendar & Clock",
                "count": 1
              },
              {
                "name": "Coding-Decoding",
                "count": 1
              },
              {
                "name": "Direction Sense",
                "count": 1
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
                "count": 9
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
                "count": 17
              },
              {
                "name": "Analogy",
                "count": 4
              },
              {
                "name": "Blood Relations",
                "count": 3
              },
              {
                "name": "Number Series",
                "count": 2
              },
              {
                "name": "Data Sufficiency",
                "count": 1
              },
              {
                "name": "Direction Sense",
                "count": 1
              },
              {
                "name": "Mirror & Water Image",
                "count": 1
              },
              {
                "name": "Missing Number",
                "count": 1
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
                "count": 28
              },
              {
                "name": "Assertion & Reason",
                "count": 2
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
                "count": 3
              },
              {
                "name": "Averages",
                "count": 3
              },
              {
                "name": "Mensuration",
                "count": 3
              },
              {
                "name": "Number System",
                "count": 3
              },
              {
                "name": "Data Interpretation",
                "count": 2
              },
              {
                "name": "Simple & Compound Interest",
                "count": 2
              },
              {
                "name": "Speed, Time & Distance",
                "count": 2
              },
              {
                "name": "Boats & Streams",
                "count": 1
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
                "count": 8
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
                "count": 4
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
                "count": 24
              },
              {
                "name": "J&K Polity",
                "count": 1
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
                "count": 17
              },
              {
                "name": "Light & Optics",
                "count": 1
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
                "count": 16
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
                "count": 15
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
                "count": 9
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
                "count": 5
              },
              {
                "name": "International Organisations",
                "count": 1
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
                "count": 6
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
                "count": 3
              },
              {
                "name": "World Geography",
                "count": 1
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
                "count": 1
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
                "count": 11
              },
              {
                "name": "Parliament",
                "count": 4
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1
              },
              {
                "name": "Constitutional Amendments",
                "count": 1
              },
              {
                "name": "Fundamental Rights",
                "count": 1
              },
              {
                "name": "J&K General Knowledge",
                "count": 1
              },
              {
                "name": "Panchayati Raj",
                "count": 1
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
                "count": 12
              },
              {
                "name": "Art & Culture",
                "count": 2
              },
              {
                "name": "Freedom Struggle",
                "count": 1
              },
              {
                "name": "J&K General Knowledge",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Biodiversity & Conservation",
                "count": 3
              },
              {
                "name": "Climate Change",
                "count": 2
              },
              {
                "name": "Environmental Legislation",
                "count": 1
              },
              {
                "name": "Protected Areas & Ramsar",
                "count": 1
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
                "count": 9
              },
              {
                "name": "Current Affairs",
                "count": 2
              },
              {
                "name": "J&K General Knowledge",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Biology",
                "count": 1
              },
              {
                "name": "Chemistry",
                "count": 1
              },
              {
                "name": "Internet & Email",
                "count": 1
              },
              {
                "name": "Space & Defense",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Current Affairs Core Concepts",
                "count": 2
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1
              },
              {
                "name": "Climate Change",
                "count": 1
              },
              {
                "name": "International Relations",
                "count": 1
              },
              {
                "name": "Science & Technology",
                "count": 1
              },
              {
                "name": "Sports",
                "count": 1
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
                "count": 2
              },
              {
                "name": "Economy Core Concepts",
                "count": 2
              },
              {
                "name": "Budget & Fiscal Policy",
                "count": 1
              },
              {
                "name": "Current Affairs",
                "count": 1
              },
              {
                "name": "Government Schemes",
                "count": 1
              },
              {
                "name": "International Organisations",
                "count": 1
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
                "count": 6
              },
              {
                "name": "Census & Demographics",
                "count": 1
              },
              {
                "name": "J&K General Knowledge",
                "count": 1
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
                "count": 2
              },
              {
                "name": "International Relations Core Concepts",
                "count": 2
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
                "count": 13
              },
              {
                "name": "Quadratic Equations",
                "count": 4
              },
              {
                "name": "Ratio & Proportion",
                "count": 4
              },
              {
                "name": "Simplification",
                "count": 4
              },
              {
                "name": "Averages",
                "count": 1
              },
              {
                "name": "Mensuration",
                "count": 1
              },
              {
                "name": "Number System",
                "count": 1
              },
              {
                "name": "Partnership",
                "count": 1
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
                "count": 14
              },
              {
                "name": "Syllogism",
                "count": 4
              },
              {
                "name": "Blood Relations",
                "count": 3
              },
              {
                "name": "Direction Sense",
                "count": 3
              },
              {
                "name": "Arithmetic Reasoning",
                "count": 2
              },
              {
                "name": "Odd One Out",
                "count": 2
              },
              {
                "name": "Statement & Conclusion",
                "count": 2
              },
              {
                "name": "Analogy",
                "count": 1
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
                "count": 8
              },
              {
                "name": "Reading Comprehension",
                "count": 6
              },
              {
                "name": "Error Spotting",
                "count": 5
              },
              {
                "name": "Fill in the Blanks",
                "count": 5
              },
              {
                "name": "Para Jumbles",
                "count": 5
              },
              {
                "name": "Idioms & Phrases",
                "count": 1
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
                "count": 12
              },
              {
                "name": "Missing Number",
                "count": 4
              },
              {
                "name": "Critical Reasoning",
                "count": 3
              },
              {
                "name": "Coding-Decoding",
                "count": 2
              },
              {
                "name": "Direction Sense",
                "count": 2
              },
              {
                "name": "Number Series",
                "count": 2
              },
              {
                "name": "Analogy",
                "count": 1
              },
              {
                "name": "Blood Relations",
                "count": 1
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
                "count": 24
              },
              {
                "name": "Current Affairs",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Operating Systems",
                "count": 3
              },
              {
                "name": "MS Excel",
                "count": 2
              },
              {
                "name": "MS PowerPoint",
                "count": 2
              },
              {
                "name": "Computer Hardware",
                "count": 1
              },
              {
                "name": "Computer Memory",
                "count": 1
              },
              {
                "name": "Computer Networks",
                "count": 1
              },
              {
                "name": "MS Word",
                "count": 1
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
                "count": 13
              },
              {
                "name": "Current Affairs",
                "count": 1
              },
              {
                "name": "Fundamental Rights",
                "count": 1
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
                "count": 3
              },
              {
                "name": "Percentage",
                "count": 2
              },
              {
                "name": "Profit & Loss",
                "count": 2
              },
              {
                "name": "Analogy",
                "count": 1
              },
              {
                "name": "Computer Memory",
                "count": 1
              },
              {
                "name": "Ratio & Proportion",
                "count": 1
              },
              {
                "name": "Simple & Compound Interest",
                "count": 1
              },
              {
                "name": "Speed, Time & Distance",
                "count": 1
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
                "count": 11
              },
              {
                "name": "One Word Substitution",
                "count": 1
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
                "count": 5
              },
              {
                "name": "Vocabulary",
                "count": 2
              },
              {
                "name": "Antonyms",
                "count": 1
              },
              {
                "name": "Error Spotting",
                "count": 1
              },
              {
                "name": "Idioms & Phrases",
                "count": 1
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
                "count": 9
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
                "count": 4
              },
              {
                "name": "Biology",
                "count": 1
              },
              {
                "name": "Diseases & Health",
                "count": 1
              },
              {
                "name": "Light & Optics",
                "count": 1
              },
              {
                "name": "Physics",
                "count": 1
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
                "count": 8
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
                "count": 3
              }
            ]
          }
        ]
      }
    ]
  }
}
