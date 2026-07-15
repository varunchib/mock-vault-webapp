// Shared FAQ builder for PYQ paper pages.
//
// Imported by BOTH the React page (visible FAQ + JSON-LD) and worker.ts (the
// bot-rendered HTML + JSON-LD), deliberately: Google requires FAQPage structured
// data to correspond to content actually visible on the page, so the schema and
// the rendered FAQ must come from one source of truth.

export type PaperFaq = { q: string; a: string }

export type PaperFaqInput = {
  title: string
  examName: string
  year?: string
  questions?: number
  heldOn?: string
  negativeMarking?: number
  sourceUrl?: string
  attemptable?: boolean
}

export function formatHeldOn(heldOn?: string): string {
  if (!heldOn) return ''
  const d = new Date(heldOn)
  if (Number.isNaN(d.getTime())) return heldOn
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function buildPaperFaqs(p: PaperFaqInput): PaperFaq[] {
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
