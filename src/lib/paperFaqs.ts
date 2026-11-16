// Shared FAQ builder for PYQ paper pages.
//
// Imported by BOTH the React page (visible FAQ + JSON-LD) and worker.ts (the
// bot-rendered HTML + JSON-LD), deliberately: Google requires FAQPage structured
// data to correspond to content actually visible on the page, so the schema and
// the rendered FAQ must come from one source of truth.

export type PaperFaq = { q: string; a: string }

export type PaperFaqInput = {
  slug?: string
  title: string
  examName: string
  year?: string
  questions?: number
  heldOn?: string
  negativeMarking?: number
  sourceUrl?: string
  subjects?: string[]
  attemptable?: boolean
}

export function formatHeldOn(heldOn?: string): string {
  if (!heldOn) return ''
  const d = new Date(heldOn)
  if (Number.isNaN(d.getTime())) return heldOn
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function buildPaperFaqs(p: PaperFaqInput): PaperFaq[] {
  if (p.slug === 'jkssb-accounts-assistant-finance-2026') {
    return [
      {
        q: 'When was the JKSSB Accounts Assistant (Finance) 2026 exam held and what was the exam pattern?',
        a: 'The JKSSB Accounts Assistant (Finance Department) written examination was conducted on 15 November 2026 in offline OMR mode. The paper carried 120 objective multiple-choice questions for 120 marks with a duration of 2 hours (120 minutes) and 0.25 negative marking per wrong answer.',
      },
      {
        q: 'Are the answers in this JKSSB FAA 2026 solved paper verified against the official JKSSB Provisional Answer Key?',
        a: 'Yes. All 120 questions from Set C of the JKSSB Finance Accounts Assistant (FAA) 15 November 2026 paper are verified against the official JKSSB Annexure-A Provisional Answer Key and accompanied by step-by-step conceptual and mathematical explanations.',
      },
      {
        q: 'What is the subject-wise marks distribution in the JKSSB Finance Accounts Assistant (FAA) 2026 question paper?',
        a: 'The 120-mark JKSSB FAA 2026 syllabus and paper are divided into eight sections: Accountancy and Book Keeping (30 marks), General Knowledge with special reference to J&K UT (30 marks), General English (10 marks), Statistics (10 marks), Mathematics (10 marks), General Economics (10 marks), General Science (10 marks), and Computer Knowledge (10 marks).',
      },
      {
        q: 'Is there negative marking in the JKSSB Accounts Assistant (Finance) 2026 examination?',
        a: 'Yes. JKSSB deducts 0.25 marks (one-fourth of a mark) for every incorrect response in the Accounts Assistant (Finance) examination, while unattempted questions carry zero penalty.',
      },
      {
        q: 'Can I attempt the JKSSB FAA 2026 (15 November) question paper online as a free mock test?',
        a: 'Yes. Click "Attempt Online" at the top of this page to take the full 120-question JKSSB FAA 2026 paper in a timed CBT interface with instant score calculation, accuracy analysis, and detailed solutions.',
      },
    ]
  }

  const faqs: PaperFaq[] = []
  const yr = p.year ? ` ${p.year}` : ''
  const n = p.questions ?? 0

  if (n > 0) {
    faqs.push({
      q: `How many questions are there in the ${p.title}?`,
      a: `The ${p.title} has ${n} questions. Every question is solved here with the correct answer and a detailed explanation.`,
    })
  }

  const held = formatHeldOn(p.heldOn)
  if (held) {
    faqs.push({
      q: `When was the ${p.title} held?`,
      a: `The ${p.title} was held on ${held}.`,
    })
  }

  if (p.subjects && p.subjects.length > 0) {
    faqs.push({
      q: `Which subjects are covered in the ${p.title}?`,
      a: `The ${p.title} covers ${p.subjects.join(', ')}. You can filter questions by subject on this page or practise each question with its verified solution.`,
    })
  }

  if ((p.negativeMarking ?? 0) > 0) {
    faqs.push({
      q: `Is there negative marking in ${p.examName}${yr}?`,
      a: `Yes. ${p.examName} deducts ${p.negativeMarking} marks for every wrong answer, so accuracy matters as much as attempting more questions.`,
    })
  }

  faqs.push({
    q: `Is the ${p.examName}${yr} answer key with explanations available for free?`,
    a: `Yes. Every question in this paper includes the correct answer and a detailed, step-by-step explanation, free of cost and without login.`,
  })

  if (p.attemptable) {
    faqs.push({
      q: `Can I attempt the ${p.title} online?`,
      a: `Yes. You can attempt the full paper online in a timed, exam-like interface, and get your score with solutions immediately after submitting.`,
    })
  }

  if (p.sourceUrl) {
    faqs.push({
      q: `Where can I download the official ${p.examName}${yr} question paper PDF?`,
      a: `The official question paper PDF is linked on this page from the conducting body's website. Every question from it is also solved here with explanations.`,
    })
  }

  return faqs
}

export function paperFaqJsonLd(faqs: PaperFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
