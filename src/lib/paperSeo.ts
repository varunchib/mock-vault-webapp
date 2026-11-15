export type ProvisionalKeyRow = {
  q: number
  a: string
  b: string
  c: string
  d: string
}

export type PaperSeoOverride = {
  apiSlug: string
  canonicalSlug: string
  title: string
  h1: string
  description: string
  review: string
  provisionalKeyTitle?: string
  provisionalKeyAllSeries?: ProvisionalKeyRow[]
}

export const PAPER_SEO_OVERRIDES: Record<string, PaperSeoOverride> = {
  "upsc-cse-prelims-2026-gs1": {
    "apiSlug": "upsc-cse-prelims-2026-gs1",
    "canonicalSlug": "upsc-cse-prelims-2026-gs1",
    "title": "UPSC Prelims 2026 GS Paper 1 (Set A) - Solved & Answer Key",
    "h1": "UPSC CSE Prelims 2026 General Studies Paper I (Set A) — All 100 Solved",
    "description": "Fully solved UPSC CSE Prelims 2026 General Studies Paper I (Set A) held on 24 May 2026 — all 100 questions with official answer key and detailed explanations.",
    "review": "The UPSC Civil Services Prelims 2026 General Studies Paper I (Set A) was held on 24 May 2026 with 100 questions for 200 marks in 2 hours and 0.67 negative marking (1/3rd) per wrong answer. The paper tested Indian Polity, Modern & Ancient History, Physical & Indian Geography, Economy, Environment & Ecology, Science & Technology, and Current Affairs. Use this fully solved paper to verify the answer key, inspect subject-wise weightage, and study detailed conceptual explanations for every question."
  },
  "upsc-cse-prelims-2026-gs2": {
    "apiSlug": "upsc-cse-prelims-2026-gs2",
    "canonicalSlug": "upsc-cse-prelims-2026-gs2",
    "title": "UPSC Prelims 2026 CSAT (GS Paper 2) - Solved & Answer Key",
    "h1": "UPSC CSE Prelims 2026 General Studies Paper II (CSAT) — All 80 Solved",
    "description": "Fully solved UPSC CSE Prelims 2026 CSAT (General Studies Paper II) held on 24 May 2026 — all 80 questions across Comprehension, Maths & Reasoning with solutions.",
    "review": "The UPSC Civil Services Prelims 2026 General Studies Paper II (CSAT) was conducted on 24 May 2026 with 80 questions carrying 200 marks (2.5 marks each) in 2 hours and 0.83 negative marking per wrong response. Qualifying CSAT requires scoring at least 33% (66 marks). Practise all 80 Reading Comprehension, Quantitative Numeracy, and Logical Reasoning questions with step-by-step worked solutions."
  },
  "upsc-cse-prelims-2025-gs1": {
    "apiSlug": "upsc-cse-prelims-2025-gs1",
    "canonicalSlug": "upsc-cse-prelims-2025-gs1",
    "title": "UPSC Prelims 2025 GS Paper 1 - Solved Questions & Answer Key",
    "h1": "UPSC CSE Prelims 2025 General Studies Paper I — All 100 Solved",
    "description": "Fully solved UPSC CSE Prelims 2025 General Studies Paper I held on 25 May 2025 — all 100 questions with the official answer key and step-by-step explanations.",
    "review": "The UPSC Civil Services Prelims 2025 General Studies Paper I was held on 25 May 2025 with 100 objective questions carrying 200 marks in 2 hours and 0.67 negative marking per wrong answer. Every question across Polity, Economy, History, Geography, Environment, and Science & Technology is solved here with the official UPSC answer key and elimination-free conceptual explanations."
  },
  "upsc-cse-prelims-2025-gs2": {
    "apiSlug": "upsc-cse-prelims-2025-gs2",
    "canonicalSlug": "upsc-cse-prelims-2025-gs2",
    "title": "UPSC Prelims 2025 CSAT (GS Paper 2) - Solved & Answer Key",
    "h1": "UPSC CSE Prelims 2025 General Studies Paper II (CSAT) — All 80 Solved",
    "description": "Fully solved UPSC CSE Prelims 2025 CSAT (GS Paper II) held on 25 May 2025 — all 80 questions in Reading Comprehension, Reasoning, and Quantitative Aptitude.",
    "review": "The UPSC Civil Services Prelims 2025 General Studies Paper II (CSAT) was held on 25 May 2025 with 80 questions for 200 marks (qualifying at 33% / 66 marks) and 0.83 negative marking for each incorrect answer. Practise every Reading Comprehension passage, Number System problem, and Analytical Reasoning puzzle with complete step-by-step derivations."
  },
  "jkssb-accounts-assistant-finance-2026": {
    "apiSlug": "jkssb-accounts-assistant-finance-2026",
    "canonicalSlug": "jkssb-accounts-assistant-finance-2026",
    "title": "JKSSB FAA Question Paper 2026 (15 Nov) - Solved & Answer Key",
    "h1": "JKSSB Accounts Assistant (Finance) Question Paper 2026 (15 Nov, Set C) — Fully Solved",
    "description": "Solved JKSSB Finance Accounts Assistant (FAA) 15 Nov 2026 Question Paper (Set C) with Official Annexure-A Provisional Answer Key (Series A, B, C, D) & explanations.",
    "review": "The JKSSB Accounts Assistant (Finance Department) written examination was held on 15 November 2026 in OMR mode with 120 questions for 120 marks in 2 hours and 0.25 negative marking per wrong answer. The Set C paper tested Accountancy and Book Keeping (30 marks), General Knowledge with special reference to J&K UT (30 marks), General English (10 marks), Statistics (10 marks), Mathematics (10 marks), Economics (10 marks), General Science (10 marks), and Computer Knowledge (10 marks). Use this complete solved paper to verify the official JKSSB Annexure-A Provisional Answer Key (for Booklet Series A, Series B, Series C, and Series D) and study the full pedagogical explanation for every question.",
    "provisionalKeyTitle": "Official JKSSB Accounts Assistant (Finance) Provisional Answer Key — 15.11.2026 (Annexure-A: Series A, B, C & D)",
    "provisionalKeyAllSeries": [
      {
        "q": 1,
        "a": "B",
        "b": "A",
        "c": "B",
        "d": "D"
      },
      {
        "q": 2,
        "a": "A",
        "b": "A",
        "c": "B",
        "d": "B"
      },
      {
        "q": 3,
        "a": "D",
        "b": "B",
        "c": "B",
        "d": "A"
      },
      {
        "q": 4,
        "a": "B",
        "b": "B",
        "c": "B",
        "d": "B"
      },
      {
        "q": 5,
        "a": "D",
        "b": "B",
        "c": "A",
        "d": "D"
      },
      {
        "q": 6,
        "a": "C",
        "b": "C",
        "c": "B",
        "d": "C"
      },
      {
        "q": 7,
        "a": "D",
        "b": "B",
        "c": "B",
        "d": "A"
      },
      {
        "q": 8,
        "a": "D",
        "b": "C",
        "c": "B",
        "d": "C"
      },
      {
        "q": 9,
        "a": "A",
        "b": "C",
        "c": "C",
        "d": "D"
      },
      {
        "q": 10,
        "a": "B",
        "b": "B",
        "c": "B",
        "d": "D"
      },
      {
        "q": 11,
        "a": "A",
        "b": "B",
        "c": "B",
        "d": "B"
      },
      {
        "q": 12,
        "a": "C",
        "b": "C",
        "c": "B",
        "d": "D"
      },
      {
        "q": 13,
        "a": "D",
        "b": "A",
        "c": "C",
        "d": "A"
      },
      {
        "q": 14,
        "a": "C",
        "b": "B",
        "c": "A",
        "d": "C"
      },
      {
        "q": 15,
        "a": "B",
        "b": "B",
        "c": "B",
        "d": "C"
      },
      {
        "q": 16,
        "a": "D",
        "b": "D",
        "c": "D",
        "d": "A"
      },
      {
        "q": 17,
        "a": "C",
        "b": "B",
        "c": "C",
        "d": "C"
      },
      {
        "q": 18,
        "a": "B",
        "b": "C",
        "c": "B",
        "d": "B"
      },
      {
        "q": 19,
        "a": "C",
        "b": "C",
        "c": "C",
        "d": "B"
      },
      {
        "q": 20,
        "a": "C",
        "b": "C",
        "c": "C",
        "d": "B"
      },
      {
        "q": 21,
        "a": "B",
        "b": "C",
        "c": "C",
        "d": "A"
      },
      {
        "q": 22,
        "a": "D",
        "b": "D",
        "c": "D",
        "d": "B"
      },
      {
        "q": 23,
        "a": "D",
        "b": "B",
        "c": "C",
        "d": "B"
      },
      {
        "q": 24,
        "a": "A",
        "b": "C",
        "c": "B",
        "d": "C"
      },
      {
        "q": 25,
        "a": "C",
        "b": "A",
        "c": "D",
        "d": "C"
      },
      {
        "q": 26,
        "a": "D",
        "b": "D",
        "c": "A",
        "d": "A"
      },
      {
        "q": 27,
        "a": "C",
        "b": "C",
        "c": "A",
        "d": "A"
      },
      {
        "q": 28,
        "a": "D",
        "b": "B",
        "c": "C",
        "d": "D"
      },
      {
        "q": 29,
        "a": "C",
        "b": "C",
        "c": "A",
        "d": "A"
      },
      {
        "q": 30,
        "a": "D",
        "b": "A",
        "c": "D",
        "d": "B"
      },
      {
        "q": 31,
        "a": "A",
        "b": "B",
        "c": "D",
        "d": "B"
      },
      {
        "q": 32,
        "a": "A",
        "b": "B",
        "c": "B",
        "d": "A"
      },
      {
        "q": 33,
        "a": "B",
        "b": "B",
        "c": "A",
        "d": "D"
      },
      {
        "q": 34,
        "a": "B",
        "b": "B",
        "c": "B",
        "d": "B"
      },
      {
        "q": 35,
        "a": "B",
        "b": "A",
        "c": "D",
        "d": "D"
      },
      {
        "q": 36,
        "a": "C",
        "b": "B",
        "c": "C",
        "d": "C"
      },
      {
        "q": 37,
        "a": "B",
        "b": "B",
        "c": "A",
        "d": "D"
      },
      {
        "q": 38,
        "a": "C",
        "b": "B",
        "c": "C",
        "d": "D"
      },
      {
        "q": 39,
        "a": "C",
        "b": "C",
        "c": "D",
        "d": "A"
      },
      {
        "q": 40,
        "a": "B",
        "b": "B",
        "c": "D",
        "d": "B"
      },
      {
        "q": 41,
        "a": "B",
        "b": "B",
        "c": "B",
        "d": "A"
      },
      {
        "q": 42,
        "a": "C",
        "b": "B",
        "c": "D",
        "d": "C"
      },
      {
        "q": 43,
        "a": "A",
        "b": "C",
        "c": "A",
        "d": "D"
      },
      {
        "q": 44,
        "a": "B",
        "b": "A",
        "c": "C",
        "d": "C"
      },
      {
        "q": 45,
        "a": "B",
        "b": "B",
        "c": "C",
        "d": "B"
      },
      {
        "q": 46,
        "a": "D",
        "b": "D",
        "c": "A",
        "d": "D"
      },
      {
        "q": 47,
        "a": "B",
        "b": "C",
        "c": "C",
        "d": "C"
      },
      {
        "q": 48,
        "a": "C",
        "b": "B",
        "c": "B",
        "d": "B"
      },
      {
        "q": 49,
        "a": "C",
        "b": "C",
        "c": "B",
        "d": "C"
      },
      {
        "q": 50,
        "a": "C",
        "b": "C",
        "c": "B",
        "d": "C"
      },
      {
        "q": 51,
        "a": "C",
        "b": "C",
        "c": "A",
        "d": "B"
      },
      {
        "q": 52,
        "a": "D",
        "b": "D",
        "c": "B",
        "d": "D"
      },
      {
        "q": 53,
        "a": "B",
        "b": "C",
        "c": "B",
        "d": "D"
      },
      {
        "q": 54,
        "a": "C",
        "b": "B",
        "c": "C",
        "d": "A"
      },
      {
        "q": 55,
        "a": "A",
        "b": "D",
        "c": "C",
        "d": "C"
      },
      {
        "q": 56,
        "a": "D",
        "b": "A",
        "c": "A",
        "d": "D"
      },
      {
        "q": 57,
        "a": "C",
        "b": "A",
        "c": "A",
        "d": "C"
      },
      {
        "q": 58,
        "a": "B",
        "b": "C",
        "c": "D",
        "d": "D"
      },
      {
        "q": 59,
        "a": "C",
        "b": "A",
        "c": "A",
        "d": "C"
      },
      {
        "q": 60,
        "a": "A",
        "b": "D",
        "c": "B",
        "d": "D"
      },
      {
        "q": 61,
        "a": "B",
        "b": "D",
        "c": "B",
        "d": "A"
      },
      {
        "q": 62,
        "a": "B",
        "b": "B",
        "c": "A",
        "d": "A"
      },
      {
        "q": 63,
        "a": "B",
        "b": "A",
        "c": "D",
        "d": "B"
      },
      {
        "q": 64,
        "a": "B",
        "b": "B",
        "c": "B",
        "d": "B"
      },
      {
        "q": 65,
        "a": "A",
        "b": "D",
        "c": "D",
        "d": "B"
      },
      {
        "q": 66,
        "a": "B",
        "b": "C",
        "c": "C",
        "d": "C"
      },
      {
        "q": 67,
        "a": "B",
        "b": "A",
        "c": "D",
        "d": "B"
      },
      {
        "q": 68,
        "a": "B",
        "b": "C",
        "c": "D",
        "d": "C"
      },
      {
        "q": 69,
        "a": "C",
        "b": "D",
        "c": "A",
        "d": "C"
      },
      {
        "q": 70,
        "a": "B",
        "b": "D",
        "c": "B",
        "d": "B"
      },
      {
        "q": 71,
        "a": "B",
        "b": "B",
        "c": "A",
        "d": "B"
      },
      {
        "q": 72,
        "a": "B",
        "b": "D",
        "c": "C",
        "d": "C"
      },
      {
        "q": 73,
        "a": "C",
        "b": "A",
        "c": "D",
        "d": "A"
      },
      {
        "q": 74,
        "a": "A",
        "b": "C",
        "c": "C",
        "d": "B"
      },
      {
        "q": 75,
        "a": "B",
        "b": "C",
        "c": "B",
        "d": "B"
      },
      {
        "q": 76,
        "a": "D",
        "b": "A",
        "c": "D",
        "d": "D"
      },
      {
        "q": 77,
        "a": "C",
        "b": "C",
        "c": "C",
        "d": "B"
      },
      {
        "q": 78,
        "a": "B",
        "b": "B",
        "c": "B",
        "d": "C"
      },
      {
        "q": 79,
        "a": "C",
        "b": "B",
        "c": "C",
        "d": "C"
      },
      {
        "q": 80,
        "a": "C",
        "b": "B",
        "c": "C",
        "d": "C"
      },
      {
        "q": 81,
        "a": "C",
        "b": "A",
        "c": "B",
        "d": "C"
      },
      {
        "q": 82,
        "a": "D",
        "b": "B",
        "c": "D",
        "d": "D"
      },
      {
        "q": 83,
        "a": "C",
        "b": "B",
        "c": "D",
        "d": "B"
      },
      {
        "q": 84,
        "a": "B",
        "b": "C",
        "c": "A",
        "d": "C"
      },
      {
        "q": 85,
        "a": "D",
        "b": "C",
        "c": "C",
        "d": "A"
      },
      {
        "q": 86,
        "a": "A",
        "b": "A",
        "c": "D",
        "d": "D"
      },
      {
        "q": 87,
        "a": "A",
        "b": "A",
        "c": "C",
        "d": "C"
      },
      {
        "q": 88,
        "a": "C",
        "b": "D",
        "c": "D",
        "d": "B"
      },
      {
        "q": 89,
        "a": "A",
        "b": "A",
        "c": "C",
        "d": "C"
      },
      {
        "q": 90,
        "a": "D",
        "b": "B",
        "c": "D",
        "d": "A"
      },
      {
        "q": 91,
        "a": "D",
        "b": "B",
        "c": "A",
        "d": "B"
      },
      {
        "q": 92,
        "a": "B",
        "b": "A",
        "c": "A",
        "d": "B"
      },
      {
        "q": 93,
        "a": "A",
        "b": "D",
        "c": "B",
        "d": "B"
      },
      {
        "q": 94,
        "a": "B",
        "b": "B",
        "c": "B",
        "d": "B"
      },
      {
        "q": 95,
        "a": "D",
        "b": "D",
        "c": "B",
        "d": "A"
      },
      {
        "q": 96,
        "a": "C",
        "b": "C",
        "c": "C",
        "d": "B"
      },
      {
        "q": 97,
        "a": "A",
        "b": "D",
        "c": "B",
        "d": "B"
      },
      {
        "q": 98,
        "a": "C",
        "b": "D",
        "c": "C",
        "d": "B"
      },
      {
        "q": 99,
        "a": "D",
        "b": "A",
        "c": "C",
        "d": "C"
      },
      {
        "q": 100,
        "a": "D",
        "b": "B",
        "c": "B",
        "d": "B"
      },
      {
        "q": 101,
        "a": "B",
        "b": "A",
        "c": "B",
        "d": "B"
      },
      {
        "q": 102,
        "a": "D",
        "b": "C",
        "c": "C",
        "d": "B"
      },
      {
        "q": 103,
        "a": "A",
        "b": "D",
        "c": "A",
        "d": "C"
      },
      {
        "q": 104,
        "a": "C",
        "b": "C",
        "c": "B",
        "d": "A"
      },
      {
        "q": 105,
        "a": "C",
        "b": "B",
        "c": "B",
        "d": "B"
      },
      {
        "q": 106,
        "a": "A",
        "b": "D",
        "c": "D",
        "d": "D"
      },
      {
        "q": 107,
        "a": "C",
        "b": "C",
        "c": "B",
        "d": "C"
      },
      {
        "q": 108,
        "a": "B",
        "b": "B",
        "c": "C",
        "d": "B"
      },
      {
        "q": 109,
        "a": "B",
        "b": "C",
        "c": "C",
        "d": "C"
      },
      {
        "q": 110,
        "a": "B",
        "b": "C",
        "c": "C",
        "d": "C"
      },
      {
        "q": 111,
        "a": "A",
        "b": "B",
        "c": "C",
        "d": "C"
      },
      {
        "q": 112,
        "a": "B",
        "b": "D",
        "c": "D",
        "d": "D"
      },
      {
        "q": 113,
        "a": "B",
        "b": "D",
        "c": "B",
        "d": "C"
      },
      {
        "q": 114,
        "a": "C",
        "b": "A",
        "c": "C",
        "d": "B"
      },
      {
        "q": 115,
        "a": "C",
        "b": "C",
        "c": "A",
        "d": "D"
      },
      {
        "q": 116,
        "a": "A",
        "b": "D",
        "c": "D",
        "d": "A"
      },
      {
        "q": 117,
        "a": "A",
        "b": "C",
        "c": "C",
        "d": "A"
      },
      {
        "q": 118,
        "a": "D",
        "b": "D",
        "c": "B",
        "d": "C"
      },
      {
        "q": 119,
        "a": "A",
        "b": "C",
        "c": "C",
        "d": "A"
      },
      {
        "q": 120,
        "a": "B",
        "b": "D",
        "c": "A",
        "d": "D"
      }
    ]
  },
  "jkssb-finance-accounts-2024-paper": {
    "apiSlug": "jkssb-finance-accounts-2024-paper",
    "canonicalSlug": "jkssb-finance-accounts-accountancy-2024-pyq",
    "title": "JKSSB Finance Accounts Assistant (FAA) Paper 2024 - Solved PYQ",
    "h1": "JKSSB Finance Accounts Assistant (FAA) Question Paper 2024 (28 Jan) — All 120 Solved",
    "description": "Fully solved JKSSB Finance Accounts Assistant (FAA) January 2024 question paper — all 120 questions across Accountancy, GK, Maths, Statistics, Economy & Computers.",
    "review": "The JKSSB Finance Accounts Assistant (FAA) examination held on 28 January 2024 carried 120 questions for 120 marks in 2 hours with 0.25 negative marking per wrong answer, covering Accountancy & Book Keeping (30 marks), General Knowledge with special reference to J&K (30 marks), Statistics, Mathematics, General Economics, General Science, Computer Knowledge, and General English (10 marks each). Review every question with the official JKSSB final answer key and worked explanations."
  },
  "jkssb-accounts-assistant-finance-2022": {
    "apiSlug": "jkssb-accounts-assistant-finance-2022",
    "canonicalSlug": "jkssb-accounts-assistant-finance-2022",
    "title": "JKSSB Finance Accounts Assistant (FAA) Paper 2022 - Solved PYQ",
    "h1": "JKSSB Accounts Assistant (Finance) Question Paper 2022 (6 Mar) — All 120 Solved",
    "description": "Fully solved JKSSB Finance Accounts Assistant (FAA) 6 March 2022 question paper — all 120 questions with official answer key and step-by-step explanations.",
    "review": "The JKSSB Accounts Assistant (Finance Department) examination held on 6 March 2022 consisted of 120 objective questions for 120 marks (0.25 negative marking) across Accountancy & Book Keeping, J&K General Knowledge, Statistics, Mathematics, Economics, General Science, Computer Applications, and General English. Compare the 2022, 2024, and 2026 JKSSB FAA papers to master recurring concepts across all eight syllabus sections."
  },
  "jkssb-junior-assistant-pyq": {
    "apiSlug": "jkssb-junior-assistant-pyq",
    "canonicalSlug": "jkssb-junior-assistant-2026-apr-19",
    "title": "JKSSB Junior Assistant Question Paper 2026 (19 Apr) - Solved PYQ",
    "h1": "JKSSB Junior Assistant Question Paper 2026 (19 April) — All 80 Solved",
    "description": "Fully solved JKSSB Junior Assistant question paper held on 19 April 2026 — all 80 questions with the official answer key and detailed explanations.",
    "review": "The JKSSB Junior Assistant written examination held on 19 April 2026 had 80 questions for 80 marks across General English, General Awareness with special reference to J&K UT, Numerical and Reasoning Ability, and Basic Concepts of Computers, with 0.25 negative marking for each wrong answer. Practise every question below with the official JKSSB answer key and detailed explanation."
  },
  "jkssb-lab-attendant-2026-may-10": {
    "apiSlug": "jkssb-lab-attendant-2026-may-10",
    "canonicalSlug": "jkssb-lab-attendant-2026-may-10",
    "title": "JKSSB Lab Attendant Question Paper 2026 (10 May) - Solved PYQ",
    "h1": "JKSSB Laboratory Attendant Question Paper 2026 (10 May) — All 120 Solved",
    "description": "Fully solved JKSSB Laboratory Attendant question paper held on 10 May 2026 — all 120 questions with the official answer key and detailed explanations.",
    "review": "The JKSSB Laboratory Attendant examination on 10 May 2026 carried 120 questions for 120 marks in 2 hours (0.25 negative marking) covering General Science, General Awareness with special reference to J&K, General English, Reasoning, Numerical Ability, and Computer Knowledge. Every question is solved here with the verified JKSSB answer key and step-by-step explanation."
  },
  "jkssb-wildlife-guard-2026-may-10": {
    "apiSlug": "jkssb-wildlife-guard-2026-may-10",
    "canonicalSlug": "jkssb-wildlife-guard-2026-mar-08",
    "title": "JKSSB Wildlife Guard Question Paper 2026 (8 Mar) - Solved PYQ",
    "h1": "JKSSB Wildlife Guard Question Paper 2026 (8 March) — All 120 Solved",
    "description": "Fully solved JKSSB Wildlife Guard question paper held on 8 March 2026 — all 120 questions with the official answer key and detailed explanations.",
    "review": "The JKSSB Wildlife Guard examination held on 8 March 2026 tested 120 objective questions for 120 marks in 2 hours (0.25 negative marking) across Basic Mathematics, Basic Reasoning, Basic English, General Awareness & Science, and Forest & Wildlife Ecology. Review all 120 solved questions with the official JKSSB answer key and full conceptual breakdowns."
  },
  "jkssb-social-forestry-worker-2026": {
    "apiSlug": "jkssb-social-forestry-worker-2026",
    "canonicalSlug": "jkssb-social-forestry-worker-2026",
    "title": "JKSSB Social Forestry Worker Paper 2026 - Solved & Answer Key",
    "h1": "JKSSB Social Forestry Worker Question Paper 2026 (15 Mar) — All 120 Solved",
    "description": "Fully solved JKSSB Social Forestry Worker 2026 question paper — all 120 questions with the official answer key, section-wise breakdown, and detailed explanations.",
    "review": "The JKSSB Social Forestry Worker (Forest, Ecology & Environment Department) written examination held on 15 March 2026 comprised 120 objective questions for 120 marks in 2 hours (0.25 negative marking) covering Basic Mathematics, Basic Reasoning, Basic English, and General Awareness & Science with special reference to J&K UT. Practise the complete solved paper with step-by-step explanations."
  },
  "jkssb-patwari-2024-sep1-set-a": {
    "apiSlug": "jkssb-patwari-2024-sep1-set-a",
    "canonicalSlug": "jkssb-patwari-2024-sep1-set-a",
    "title": "JKSSB Patwari Question Paper 2024 (1 Sep Set A) - Solved PYQ",
    "h1": "JKSSB Patwari Question Paper 2024 (1 September, Set A) — All 120 Solved",
    "description": "Fully solved JKSSB Patwari 2024 question paper (1 September 2024, Set A) — all 120 questions with the official answer key and detailed explanations.",
    "review": "The JKSSB Patwari (Revenue Department) examination held on 1 September 2024 (Set A) carried 120 objective questions for 120 marks in 2 hours with 0.25 negative marking per wrong answer, testing General Knowledge & Current Affairs, J&K General Knowledge, General English, Computer Applications, and Mental Ability & Reasoning. Study all 120 solved questions verified against the official JKSSB answer key."
  },
  "jkssb-veterinary-pharmacist-2025": {
    "apiSlug": "jkssb-veterinary-pharmacist-2025",
    "canonicalSlug": "jkssb-veterinary-pharmacist-2025-mar-02",
    "title": "JKSSB Veterinary Pharmacist Paper 2025 (2 Mar) - Solved PYQ",
    "h1": "JKSSB Veterinary Pharmacist Question Paper 2025 (2 March) — All 120 Solved",
    "description": "Fully solved JKSSB Veterinary Pharmacist question paper held on 2 March 2025 — all 120 questions with the official answer key and detailed explanations.",
    "review": "The JKSSB Veterinary Pharmacist written exam held on 2 March 2025 featured 120 objective questions for 120 marks in 2 hours (0.25 negative marking), blending domain-specific Biology, Zoology, Animal Husbandry, Human Physiology, Evolution, and Immunology with General Awareness, English, Reasoning, and Computer Knowledge. Every question is solved below with detailed explanations."
  },
  "jkssb-field-assistant-2026-may-20": {
    "apiSlug": "jkssb-field-assistant-2026-may-20",
    "canonicalSlug": "jkssb-field-assistant-2026-may-20",
    "title": "JKSSB Field Assistant Question Paper 2026 (20 May) - Solved PYQ",
    "h1": "JKSSB Field Assistant Question Paper 2026 (20 May, Set A) — All 120 Solved",
    "description": "Fully solved JKSSB Field Assistant 20 May 2026 question paper (Set A) — all 120 technical & environmental science questions with official answer key and explanations.",
    "review": "The JKSSB Field Assistant (J&K Pollution Control Committee / Forest, Ecology & Environment Department) examination held on 20 May 2026 (Set A) tested 120 specialized questions for 120 marks in 2 hours (0.25 negative marking) across Environment & Ecology, Water & Waste Water Engineering, Environmental Impact Assessment (EIA), Environmental Legislation in India, and Environmental & Safety Audit. Study the complete solved paper with in-depth technical explanations."
  },
  "jkssb-inspector-forest-2026-mar-15": {
    "apiSlug": "jkssb-inspector-forest-2026-mar-15",
    "canonicalSlug": "jkssb-inspector-forest-2026-mar-15",
    "title": "JKSSB Forester / Inspector Forest Paper 2026 (15 Mar) - Solved",
    "h1": "JKSSB Inspector (Forest, Ecology & Environment) Question Paper 2026 (15 Mar, Set A) — Solved",
    "description": "Fully solved JKSSB Inspector (Forest Ecology & Environment) 15 March 2026 question paper (Set A) — all 120 questions with official answer key and detailed explanations.",
    "review": "The JKSSB Inspector (Forest, Ecology & Environment Department) written examination held on 15 March 2026 (Set A) comprised 120 questions for 120 marks in 2 hours with 0.25 negative marking per wrong response. It covered General Science, Environment & Ecology, Indian Polity, History, Geography, General Knowledge with special reference to J&K, Mathematics, Reasoning, General English, and Computer Knowledge."
  },
  "jkssb-constable-2024-set-a": {
    "apiSlug": "jkssb-constable-2024-set-a",
    "canonicalSlug": "jkssb-constable-2024-set-a",
    "title": "JKSSB JKP Constable Question Paper 2024 (Set A) - Solved & Key",
    "h1": "JKSSB J&K Police Constable (Executive/Armed/IRP/SDRF) Paper 2024 (Set A) — Solved",
    "description": "Fully solved JKSSB J&K Police Constable (Executive, Armed, IRP, SDRF) 1 December 2024 question paper (Set A) — all 100 questions with official answer key.",
    "review": "The JKSSB J&K Police Constable (Executive, Armed, IRP, and SDRF) written examination held on 1 December 2024 (Set A) consisted of 100 objective questions for 100 marks in 2 hours with 0.25 negative marking. The paper tested General Awareness, J&K General Knowledge, Elementary Mathematics, Analytical Reasoning, General English, and Computer Knowledge. Verify the official JKSSB answer key and step-by-step solutions below."
  },
  "jkssb-constable-telecom-2024-set-a": {
    "apiSlug": "jkssb-constable-telecom-2024-set-a",
    "canonicalSlug": "jkssb-constable-telecom-2024-set-a",
    "title": "JKSSB Constable Telecommunication Paper 2024 (Set A) - Solved",
    "h1": "JKSSB J&K Police Constable (Telecommunication) Paper 2024 (8 Dec, Set A) — Solved",
    "description": "Fully solved JKSSB Constable (Telecommunication) 8 December 2024 question paper (Set A) — all 100 questions with official answer key and detailed explanations.",
    "review": "The JKSSB J&K Police Constable (Telecommunication) examination conducted on 8 December 2024 (Set A) carried 100 questions for 100 marks in 2 hours (0.25 negative marking), combining Telecommunication Engineering, Physics/Electronics, and Computer Knowledge with J&K General Knowledge, Mathematics, Reasoning, and General English. Practise all 100 solved questions with detailed technical explanations."
  },
  "jkp-constable-2017-oct08": {
    "apiSlug": "jkp-constable-2017-oct08",
    "canonicalSlug": "jkp-constable-2017-oct08",
    "title": "J&K Police (JKP) Constable Question Paper 2017 (8 Oct) - Solved",
    "h1": "J&K Police (JKP) Constable Recruitment Question Paper 2017 (8 October) — All 100 Solved",
    "description": "Fully solved J&K Police (JKP) Constable 8 October 2017 recruitment question paper — all 100 questions across J&K GK, General Awareness, Maths, Reasoning & English.",
    "review": "The J&K Police (JKP) Constable recruitment examination held on 8 October 2017 tested 100 objective questions for 100 marks in 2 hours across General Knowledge & Current Affairs, J&K History and Geography, Elementary Mathematics, Reasoning, and General English. Practise this foundational JKP Constable paper with complete worked solutions."
  },
  "jkp-constable-2016-mar20-set-a": {
    "apiSlug": "jkp-constable-2016-mar20-set-a",
    "canonicalSlug": "jkp-constable-2016-mar20-set-a",
    "title": "J&K Police (JKP) Constable Question Paper 2016 (Set A) - Solved",
    "h1": "J&K Police (JKP) Constable Question Paper 2016 (20 March, Set A) — All 100 Solved",
    "description": "Fully solved J&K Police (JKP) Constable 20 March 2016 question paper (Set A) — all 100 questions with verified answer key and step-by-step explanations.",
    "review": "The J&K Police (JKP) Constable examination held on 20 March 2016 (Set A) featured 100 questions for 100 marks in 2 hours covering J&K General Knowledge, Indian History, Geography, General Science, Elementary Mathematics, Reasoning, and English. Review all 100 solved questions to benchmark your J&K Police preparation."
  },
  "jkpsi-2022": {
    "apiSlug": "jkpsi-2022",
    "canonicalSlug": "jkpsi-2022",
    "title": "JKSSB JKP Sub Inspector (JKPSI) Paper 2022 (27 Mar) - Solved",
    "h1": "JKSSB J&K Police Sub-Inspector (JKPSI Executive) Question Paper 2022 — All 120 Solved",
    "description": "Fully solved JKSSB J&K Police Sub-Inspector (JKPSI) 27 March 2022 question paper — all 120 questions with official answer key and detailed explanations.",
    "review": "The JKSSB J&K Police Sub-Inspector (JKPSI Executive) written examination held on 27 March 2022 comprised 120 questions for 150 marks in 2 hours with 0.25 negative marking. It tested Indian Polity, J&K Reorganization Act 2019, Modern History, Geography, Economy, Environment & Ecology, General Science, Computer Knowledge, Mathematics, Reasoning, and English. Study every question with complete explanations."
  },
  "jkpsi-2017": {
    "apiSlug": "jkpsi-2017",
    "canonicalSlug": "jkpsi-2017",
    "title": "JKP Sub Inspector (JKPSI) Question Paper 2017 - Solved & Key",
    "h1": "J&K Police Sub-Inspector (JKPSI Executive) Question Paper 2017 — All 120 Solved",
    "description": "Fully solved J&K Police Sub-Inspector (JKPSI Executive) May 2017 question paper — all 120 questions across J&K GK, Polity, History, Geography, Science & Maths.",
    "review": "The J&K Police Sub-Inspector (JKPSI Executive) recruitment examination conducted in May 2017 consisted of 120 objective questions in 2 hours covering J&K General Knowledge, Indian Polity, History, Geography, Economy, General Science, and Elementary Mathematics. Use this solved 2017 paper alongside the 2022 JKPSI paper to track topic evolution."
  },
  "jkpsi-telecom-2026": {
    "apiSlug": "jkpsi-telecom-2026",
    "canonicalSlug": "jkpsi-telecom-2026",
    "title": "JKSSB Sub Inspector Telecommunication 2026 — Syllabus & Mock Test",
    "h1": "JKSSB Sub-Inspector (Telecommunication) 2026 (Advt. 11/2025) — Exam Pattern & Free Mock",
    "description": "JKSSB Sub-Inspector (Telecommunication) 2026 (Advt. 11/2025) official exam pattern (120 questions, 200 marks), syllabus breakdown, and free full-length mock test.",
    "review": "The JKSSB Sub-Inspector (Telecommunication) recruitment under Advertisement No. 11 of 2025 carries 120 questions for 200 marks in 2 hours across General Awareness, J&K GK, English, Reasoning, Numeracy, Electronic Devices, Digital Electronics, Communication Systems, Networking, Cyber Security, IoT, and AI/Data Science. Attempt our free JKPSI Telecommunication mock test while awaiting the official exam date."
  },
  "jkpsc-jkcce-prelims-2025-gs1-set-b": {
    "apiSlug": "jkpsc-jkcce-prelims-2025-gs1-set-b",
    "canonicalSlug": "jkpsc-jkcce-prelims-2025-gs1-set-b",
    "title": "JKPSC KAS (JKCCE) Prelims 2025 GS Paper 1 (Set B) - Solved Key",
    "h1": "JKPSC Combined Competitive Exam (JKCCE / KAS) Prelims 2025 GS Paper I (Set B) — Solved",
    "description": "Fully solved JKPSC JKCCE (KAS) Prelims 2025 General Studies Paper I (Set B) held on 7 Dec 2025 — all 100 questions with official answer key and explanations.",
    "review": "The JKPSC Combined Competitive Examination (JKCCE / KAS) Prelims 2025 General Studies Paper I (Set B) was conducted on 7 December 2025 with 100 questions for 200 marks in 2 hours and 0.67 (1/3rd) negative marking. The paper featured multi-statement analytical questions across Indian Polity, Economy, Modern & Ancient History, Physical & Indian Geography, J&K General Knowledge, Environment, Agriculture, and Science & Technology."
  },
  "jkcce-prelims-2025-gs2-set-b": {
    "apiSlug": "jkcce-prelims-2025-gs2-set-b",
    "canonicalSlug": "jkcce-prelims-2025-gs2-set-b",
    "title": "JKPSC KAS (JKCCE) Prelims 2025 CSAT (GS Paper 2) - Solved Key",
    "h1": "JKPSC Combined Competitive Exam (JKCCE) Prelims 2025 GS Paper II (CSAT, Set B) — Solved",
    "description": "Fully solved JKPSC JKCCE (KAS) Prelims 2025 General Studies Paper II (CSAT, Set B) held on 7 Dec 2025 — all 100 questions with official key and worked solutions.",
    "review": "The JKPSC Combined Competitive Examination (JKCCE / KAS) Prelims 2025 General Studies Paper II (CSAT, Set B) was held on 7 December 2025 with 100 questions for 200 marks in 2 hours (qualifying at 33% / 66 marks). It tested Reading Comprehension, Quantitative Aptitude, Logical & Analytical Reasoning, Decision Making, and Communication & Interpersonal Skills."
  },
  "jkcce-prelims-2024-gs1-set-a": {
    "apiSlug": "jkcce-prelims-2024-gs1-set-a",
    "canonicalSlug": "jkcce-prelims-2024-gs1-set-a",
    "title": "JKPSC KAS (JKCCE) Prelims 2024 GS Paper 1 (Set A) - Solved Key",
    "h1": "JKPSC Combined Competitive Exam (JKCCE / KAS) Prelims 2024 GS Paper I (Set A) — Solved",
    "description": "Fully solved JKPSC JKCCE (KAS) Prelims 2024 General Studies Paper I (Set A) held on 23 Feb 2025 — all 100 questions with official answer key and explanations.",
    "review": "The JKPSC Combined Competitive Examination (JKCCE 2024) Prelims General Studies Paper I (Set A), held on 23 February 2025, consisted of 100 questions carrying 200 marks in 2 hours (0.67 negative marking). Study all 100 solved questions across Polity, History, Geography, Economy, Environment, Science & Technology, and Current Affairs with comprehensive statement-by-statement explanations."
  },
  "kashmir-university-jaa-2026-set-a": {
    "apiSlug": "kashmir-university-jaa-2026-set-a",
    "canonicalSlug": "kashmir-university-jaa-2026-set-a",
    "title": "Kashmir University Junior Accounts Assistant Paper 2026 - Solved",
    "h1": "University of Kashmir Junior Accounts Assistant Question Paper 2026 (Set A) — All 100 Solved",
    "description": "Fully solved University of Kashmir Junior Accounts Assistant (JAA) 2026 question paper (Series A) — all 100 questions verified against the official KU Answer Key.",
    "review": "The University of Kashmir Junior Accounts Assistant (JAA) 2026 recruitment examination (Series A) tested 100 objective questions for 100 marks in 2 hours (0.25 negative marking) across Accountancy & Auditing, Financial Rules, Economy, Statistics, Mathematics, General Knowledge & Current Affairs, General English, General Science, and Computer Knowledge. Every question is verified against the official University of Kashmir answer key."
  },
  "ssc-cgl-2025-tier2": {
    "apiSlug": "ssc-cgl-2025-tier2",
    "canonicalSlug": "ssc-cgl-2025-tier2",
    "title": "SSC CGL 2025 Tier 2 Question Paper (19 Jan 2026) - All 150 Solved",
    "h1": "SSC CGL Tier-II Question Paper (19 January 2026) — All 150 Solved with Answer Key",
    "description": "Fully solved SSC CGL 2025 Tier-II Paper-I held on 19 January 2026 — all 150 questions across Maths, Reasoning, English, General Awareness & Computer Knowledge.",
    "review": "The SSC CGL 2025 Tier-II (Paper-I) examination conducted on 19 January 2026 comprised 150 questions for 450 marks (3 marks per question, 1 mark negative marking) across Mathematical Abilities (30 Qs), Reasoning & General Intelligence (30 Qs), English Language & Comprehension (45 Qs), General Awareness (25 Qs), and Computer Knowledge (20 Qs). Practise all 150 solved questions with step-by-step shortcuts and explanations."
  },
  "ssc-cgl-2025-sep17-shift1": {
    "apiSlug": "ssc-cgl-2025-sep17-shift1",
    "canonicalSlug": "ssc-cgl-2025-sep17-shift1",
    "title": "SSC CGL 2025 Tier 1 Paper (17 Sep Shift 1) - Solved & Answer Key",
    "h1": "SSC CGL Tier-I 2025 Question Paper (17 September 2025, Shift 1) — All 100 Solved",
    "description": "Fully solved SSC CGL Tier-I question paper held on 17 September 2025 (Shift 1) — all 100 questions across Reasoning, GA, Quantitative Aptitude & English.",
    "review": "The SSC CGL Tier-I 2025 examination held on 17 September 2025 (Shift 1) consisted of 100 questions for 200 marks in 60 minutes (0.50 negative marking), divided equally into General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension (25 questions each). Review every question with the official SSC answer key and detailed solution."
  },
  "ssc-cgl-2025-sep13-shift1": {
    "apiSlug": "ssc-cgl-2025-sep13-shift1",
    "canonicalSlug": "ssc-cgl-2025-sep13-shift1",
    "title": "SSC CGL 2025 Tier 1 Paper (13 Sep Shift 1) - Solved & Answer Key",
    "h1": "SSC CGL Tier-I 2025 Question Paper (13 September 2025, Shift 1) — All 100 Solved",
    "description": "Fully solved SSC CGL Tier-I question paper held on 13 September 2025 (Shift 1) — all 100 questions with official SSC answer key and step-by-step explanations.",
    "review": "The SSC CGL Tier-I 2025 Shift 1 paper conducted on 13 September 2025 tested 100 objective questions for 200 marks in 60 minutes (0.50 negative marking per wrong answer) across Reasoning (25 Qs), General Awareness (25 Qs), Quantitative Aptitude (25 Qs), and English Comprehension (25 Qs). Practise the full shift paper online or study the worked explanations below."
  },
  "ssc-cgl-2025-sep13-shift2": {
    "apiSlug": "ssc-cgl-2025-sep13-shift2",
    "canonicalSlug": "ssc-cgl-2025-sep13-shift2",
    "title": "SSC CGL 2025 Tier 1 Paper (13 Sep Shift 2) - Solved & Answer Key",
    "h1": "SSC CGL Tier-I 2025 Question Paper (13 September 2025, Shift 2) — All 100 Solved",
    "description": "Fully solved SSC CGL Tier-I question paper held on 13 September 2025 (Shift 2) — all 100 questions with official SSC answer key and detailed solutions.",
    "review": "The SSC CGL Tier-I 2025 Shift 2 examination held on 13 September 2025 carried 100 questions for 200 marks in 60 minutes (0.50 negative marking) across General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. Every question is solved here with the verified SSC answer key and exam-oriented shortcuts."
  },
  "ssc-cgl-2025-sep12-shift1": {
    "apiSlug": "ssc-cgl-2025-sep12-shift1",
    "canonicalSlug": "ssc-cgl-2025-sep12-shift1",
    "title": "SSC CGL 2025 Tier 1 Paper (12 Sep Shift 1) - Solved & Answer Key",
    "h1": "SSC CGL Tier-I 2025 Question Paper (12 September 2025, Shift 1) — All 100 Solved",
    "description": "Fully solved SSC CGL Tier-I question paper held on 12 September 2025 (Shift 1) — all 100 questions across Reasoning, General Awareness, Maths & English.",
    "review": "The SSC CGL Tier-I 2025 Shift 1 paper held on 12 September 2025 featured 100 questions for 200 marks in 60 minutes with 0.50 negative marking per wrong response. All 100 questions across General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension are solved below with step-by-step explanations."
  },
  "ssc-cgl-2025-sep12-shift2": {
    "apiSlug": "ssc-cgl-2025-sep12-shift2",
    "canonicalSlug": "ssc-cgl-2025-sep12-shift2",
    "title": "SSC CGL 2025 Tier 1 Paper (12 Sep Shift 2) - Solved & Answer Key",
    "h1": "SSC CGL Tier-I 2025 Question Paper (12 September 2025, Shift 2) — All 100 Solved",
    "description": "Fully solved SSC CGL Tier-I question paper held on 12 September 2025 (Shift 2) — all 100 questions with official answer key and step-by-step explanations.",
    "review": "The SSC CGL Tier-I 2025 Shift 2 examination on 12 September 2025 tested 100 questions for 200 marks in 60 minutes (0.50 negative marking) across Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. Use this complete solved shift to master SSC TCS pattern questions."
  },
  "ssc-cgl-2025-sep12-shift3": {
    "apiSlug": "ssc-cgl-2025-sep12-shift3",
    "canonicalSlug": "ssc-cgl-2025-sep12-shift3",
    "title": "SSC CGL 2025 Tier 1 Paper (12 Sep Shift 3) - Solved & Answer Key",
    "h1": "SSC CGL Tier-I 2025 Question Paper (12 September 2025, Shift 3) — All 100 Solved",
    "description": "Fully solved SSC CGL Tier-I question paper held on 12 September 2025 (Shift 3) — all 100 questions with official SSC answer key and detailed explanations.",
    "review": "The SSC CGL Tier-I 2025 Shift 3 examination held on 12 September 2025 carried 100 questions for 200 marks in 60 minutes (0.50 negative marking) across General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. Study all 100 solved questions with complete conceptual and mathematical derivations."
  },
  "ssc-cgl-2024-sep26-shift2": {
    "apiSlug": "ssc-cgl-2024-sep26-shift2",
    "canonicalSlug": "ssc-cgl-2024-sep26-shift2",
    "title": "SSC CGL 2024 Tier 1 Paper (26 Sep Shift 2) - Solved & Answer Key",
    "h1": "SSC CGL Tier-I 2024 Question Paper (26 September 2024, Shift 2) — All 100 Solved",
    "description": "Fully solved SSC CGL Tier-I question paper held on 26 September 2024 (Shift 2) — all 100 questions across Reasoning, GA, Quantitative Aptitude & English.",
    "review": "The SSC CGL Tier-I 2024 Shift 2 paper conducted on 26 September 2024 consisted of 100 objective questions for 200 marks in 60 minutes (0.50 negative marking) across Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension. Practise every question with the official SSC answer key and detailed solution."
  },
  "ssc-cgl-2026-sep30-shift2": {
    "apiSlug": "ssc-cgl-2026-sep30-shift2",
    "canonicalSlug": "ssc-cgl-2026-sep30-shift2",
    "title": "SSC CGL 2026 Tier 1 Question Paper (30 Sep Shift 2) - Solved & Key",
    "h1": "SSC CGL Tier-I 2026 Question Paper (30 September 2026, Shift 2) — All 100 Solved",
    "description": "Fully solved SSC CGL Tier-I question paper held on 30 September 2026 (Shift 2) — all 100 questions across Reasoning, General Awareness, Maths & English.",
    "review": "The SSC CGL Tier-I 2026 Shift 2 paper held on 30 September 2026 carried 100 questions for 200 marks in 60 minutes with 0.50 negative marking per wrong answer (25 questions each in General Intelligence & Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension). Practise the complete shift paper with verified answers and step-by-step explanations."
  },
  "bpsc-71st-cce-prelims-2025-gs": {
    "apiSlug": "bpsc-71st-cce-prelims-2025-gs",
    "canonicalSlug": "bpsc-71st-cce-prelims-2025-gs",
    "title": "71st BPSC Prelims Question Paper 2025 (13 Sep) - All 150 Solved",
    "h1": "BPSC 71st Combined Competitive Exam (CCE) Prelims 2025 GS Paper — All 150 Solved",
    "description": "Fully solved 71st BPSC Prelims 2025 General Studies question paper (13 September 2025, Series E) — all 150 questions with official answer key and explanations.",
    "review": "The 71st BPSC Combined Competitive Examination (Prelims) General Studies paper was held on 13 September 2025 (Booklet Series E) with 150 objective questions for 150 marks in 2 hours and 0.33 (1/3rd) negative marking. The paper covered Modern History, Bihar Specific GK, General Science, Current Affairs, Indian Polity, Geography, Economy, Environment, and Mental Ability. Review all 150 solved questions with detailed explanations."
  },
  "bpsc-70th-cce-prelims-2024-gs": {
    "apiSlug": "bpsc-70th-cce-prelims-2024-gs",
    "canonicalSlug": "bpsc-70th-cce-prelims-2024-gs",
    "title": "70th BPSC Prelims Question Paper 2024 (13 Dec) - All 150 Solved",
    "h1": "BPSC 70th Combined Competitive Exam (CCE) Prelims 2024 GS Paper — All 150 Solved",
    "description": "Fully solved 70th BPSC Prelims 2024 General Studies question paper (13 December 2024, Series G) — all 150 questions with official answer key and explanations.",
    "review": "The 70th BPSC Combined Competitive Examination (Prelims) General Studies paper was held on 13 December 2024 (Booklet Series G) with 150 questions for 150 marks in 2 hours and 0.33 negative marking per wrong answer. Study every question across History, Bihar Special, General Science, Polity, Geography, Economy, Current Affairs, and Reasoning with complete explanations."
  },
  "uppcs-prelims-2025-gs1": {
    "apiSlug": "uppcs-prelims-2025-gs1",
    "canonicalSlug": "uppcs-prelims-2025-gs1",
    "title": "UPPCS Prelims 2025 GS Paper 1 (12 Oct) - All 150 Solved & Key",
    "h1": "UPPCS Prelims 2025 General Studies Paper I (12 October 2025) — All 150 Solved",
    "description": "Fully solved UPPSC / UPPCS Prelims 2025 General Studies Paper I held on 12 October 2025 — all 150 questions with official answer key and detailed explanations.",
    "review": "The UPPSC Combined State / Upper Subordinate Services (UPPCS) Prelims 2025 General Studies Paper I was held on 12 October 2025 with 150 questions carrying 200 marks in 2 hours and 0.33 (1/3rd) negative marking. It tested Indian Polity, Ancient/Medieval/Modern History, Indian & World Geography, Environment & Ecology, General Science, Economy, UP Special GK, and Current Affairs. Review all 150 solved questions below."
  },
  "rsmssb-patwari-2025-aug17-shift1-spz8": {
    "apiSlug": "rsmssb-patwari-2025-aug17-shift1-spz8",
    "canonicalSlug": "rsmssb-patwari-2025-aug17-shift1-spz8",
    "title": "RSSB / RSMSSB Rajasthan Patwari Paper 2025 (17 Aug Shift 1) - Solved",
    "h1": "RSSB Rajasthan Patwari Question Paper 2025 (17 August, Shift 1) — All 150 Solved",
    "description": "Fully solved RSSB (RSMSSB) Rajasthan Patwari 17 August 2025 (Shift 1, Code SPZ8) question paper — all 150 questions with official answer key and explanations.",
    "review": "The RSSB (formerly RSMSSB) Rajasthan Patwari examination held on 17 August 2025 (Shift 1, Paper Code SPZ8) comprised 150 questions for 300 marks in 3 hours with 1/3rd negative marking. The paper covered Rajasthan History, Art, Culture & Geography, Indian Polity & History, General Science, Mental Ability & Quantitative Aptitude, Basic Computer Knowledge, General Hindi, and General English."
  },
  "rrb-ntpc-ug-2026-may-07-shift-1": {
    "apiSlug": "rrb-ntpc-ug-2026-may-07-shift-1",
    "canonicalSlug": "rrb-ntpc-ug-2026-may-07-shift-1",
    "title": "RRB NTPC UG Question Paper 2026 (7 May Shift 1) - All 100 Solved",
    "h1": "RRB NTPC Undergraduate (UG) CBT-1 Paper 2026 (7 May, Shift 1) — All 100 Solved",
    "description": "Fully solved RRB NTPC Undergraduate (UG) CBT-1 question paper held on 7 May 2026 (Shift 1) — all 100 questions across General Awareness, Maths & Reasoning.",
    "review": "The RRB NTPC Undergraduate (12th Level) CBT-1 examination held on 7 May 2026 (Shift 1) featured 100 questions for 100 marks in 90 minutes with 0.33 (1/3rd) negative marking: General Awareness (40 questions), Mathematics (30 questions), and General Intelligence & Reasoning (30 questions). Practise every question with step-by-step solutions."
  },
  "ibps-po-pre-2025-aug-23-shift-1": {
    "apiSlug": "ibps-po-pre-2025-aug-23-shift-1",
    "canonicalSlug": "ibps-po-pre-2025-aug-23-shift-1",
    "title": "IBPS PO Prelims Question Paper 2025 (23 Aug Shift 1) - Solved",
    "h1": "IBPS PO Prelims 2025 Question Paper (23 August 2025, Shift 1) — All 100 Solved",
    "description": "Fully solved IBPS PO Prelims 2025 question paper (23 August 2025, 1st Shift) — all 100 questions in English Language, Quantitative Aptitude & Reasoning Ability.",
    "review": "The IBPS PO Prelims 2025 (23 August 2025, Shift 1) examination consisted of 100 questions for 100 marks in 60 minutes (20 minutes sectional timing each for English Language: 30 Qs, Quantitative Aptitude: 35 Qs, and Reasoning Ability: 35 Qs). Practise all seating arrangements, puzzles, DI sets, arithmetic word problems, and reading comprehension questions with complete solutions."
  },
  "hp-patwari-2019": {
    "apiSlug": "hp-patwari-2019",
    "canonicalSlug": "hp-patwari-2019-nov-17",
    "title": "HP Patwari Question Paper 2019 (17 Nov) - Solved & Answer Key",
    "h1": "Himachal Pradesh (HP) Patwari Question Paper 2019 (17 November) — All 100 Solved",
    "description": "Fully solved HP Revenue Department Patwari question paper held on 17 November 2019 — all 100 questions across Hindi, English, Maths & HP GK with explanations.",
    "review": "The Himachal Pradesh Revenue Department Patwari examination held on 17 November 2019 had 100 questions for 100 marks in 90 minutes, with 25 questions each in General English, Hindi (हिन्दी), Quantitative Aptitude, and General Knowledge (including Himachal Pradesh GK), and no negative marking. Every question is solved below with the official answer key."
  }
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
