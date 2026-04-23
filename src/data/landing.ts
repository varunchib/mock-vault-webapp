export type Exam = {
  icon: string
  name: string
  questions: string
  badge: string
}

export type SeoLink = {
  title: string
  count: string
}

export type Testimonial = {
  initials: string
  name: string
  exam: string
  quoteStart: string
  highlight: string
  quoteEnd: string
}

export const quickTags = [
  { label: 'UPSC 2023', query: 'UPSC Prelims 2023 solved' },
  { label: 'SSC CGL', query: 'SSC CGL 2023 all shifts' },
  { label: 'JKSSB', query: 'JKSSB Finance 2024' },
  { label: 'NEET', query: 'NEET 2023 biology' },
  { label: 'RRB NTPC', query: 'RRB NTPC 2022 GK' },
  { label: 'Raj. Patwari', query: 'Rajasthan Patwari 2023' },
] as const

export const tickerItems = [
  '🔥 UPSC 2024 uploaded',
  '📄 SSC CGL 2024 all shifts live',
  '⚡ JKSSB 2024 answer key out',
  '🎯 NEET 2024 solved',
  '📝 Bihar PSC 2024 paper added',
  '🔒 UP Police 2024 uploaded',
] as const

export const stats = [
  { target: 12, suffix: 'L+', label: 'Questions solved' },
  { target: 240, suffix: '+', label: 'Exams covered' },
  { target: 28, suffix: ' states', label: 'Across India' },
  { target: 8, suffix: 'L+', label: 'Students preparing' },
] as const

export const valueProps = [
  {
    icon: '📄',
    title: 'Every PYQ, fully solved',
    description:
      'Not just the question — every answer comes with a detailed explanation, common traps, and related concepts. No paywalls.',
    tag: 'Free always',
  },
  {
    icon: '🔍',
    title: 'Google finds us first',
    description:
      "Each question has its own page — just Google any PYQ and we're the first result. Share directly to your study group.",
    tag: 'No login needed',
  },
  {
    icon: '🗂️',
    title: 'Organised by year, shift & subject',
    description:
      'Filter by exam → year → shift → topic. Drill into exactly the paper you want in 3 clicks. 200+ exams covered.',
    tag: '240+ exams',
  },
] as const

export const exams: Exam[] = [
  { icon: '🏛️', name: 'UPSC CSE', questions: '18,000+ questions', badge: 'Central' },
  { icon: '📋', name: 'SSC CGL', questions: '24,000+ questions', badge: 'Central' },
  { icon: '🏦', name: 'IBPS PO / Clerk', questions: '15,000+ questions', badge: 'Banking' },
  { icon: '🧬', name: 'NEET UG', questions: '12,000+ questions', badge: 'Medical' },
  { icon: '⚗️', name: 'JEE Main', questions: '20,000+ questions', badge: 'Engineering' },
  { icon: '📜', name: 'JKSSB', questions: '8,000+ questions', badge: 'J&K' },
  { icon: '🌾', name: 'Raj. Patwari', questions: '3,000+ questions', badge: 'Rajasthan' },
  { icon: '🚂', name: 'RRB NTPC', questions: '18,000+ questions', badge: 'Railway' },
  { icon: '🏫', name: 'UP TGT / PGT', questions: '7,000+ questions', badge: 'Teaching' },
  { icon: '⚖️', name: 'Bihar PSC', questions: '9,000+ questions', badge: 'Bihar' },
  { icon: '🔒', name: 'UP Police', questions: '6,000+ questions', badge: 'UP' },
  { icon: '🏔️', name: 'HPSC / HPPSC', questions: '5,000+ questions', badge: 'HP' },
]

export const howSteps = [
  {
    title: 'Search or Google it',
    description: 'Type your exam name here — or just Google "SSC CGL 2023 PYQ" and we show up first.',
  },
  {
    title: 'Pick year & subject',
    description: 'Filter to the exact paper — year, shift, topic. No scrolling through irrelevant content.',
  },
  {
    title: 'Attempt & understand',
    description: 'Select your answer. See the correct one. Read the explanation. No login required.',
  },
  {
    title: 'Track & improve',
    description: 'Take full mocks. Review mistakes. See your weak areas. Upgrade to premium when serious.',
  },
] as const

export const seoLinks: SeoLink[] = [
  { title: 'UPSC Prelims 2023 GS Paper 1 with Answers', count: '1,200 Qs' },
  { title: 'SSC CGL 2023 Tier-1 All Shifts Solved', count: '900 Qs' },
  { title: 'JKSSB Finance Accounts 2024 Paper', count: '150 Qs' },
  { title: 'IBPS PO 2023 Reasoning Section PDF', count: '400 Qs' },
  { title: 'NEET 2023 Biology Chapter-wise PYQs', count: '2,100 Qs' },
  { title: 'RRB NTPC 2022 GK with Explanations', count: '1,800 Qs' },
  { title: 'Rajasthan Patwari 2023 Morning Shift', count: '150 Qs' },
  { title: 'Bihar PSC 2022 Prelims Solved Paper', count: '500 Qs' },
  { title: 'SSC CHSL 2023 English Questions', count: '600 Qs' },
  { title: 'UPSC CDS 2023 Maths Fully Solved', count: '400 Qs' },
  { title: 'UP Police Constable 2024 Paper', count: '300 Qs' },
  { title: 'HPSC HAS 2023 Prelims Solved', count: '200 Qs' },
]

export const testimonials: Testimonial[] = [
  {
    initials: 'RK',
    name: 'Rahul Kapoor',
    exam: 'JKSSB Finance 2023',
    quoteStart: 'I just Googled ',
    highlight: 'JKSSB 2023 paper',
    quoteEnd: ' and this site was the first result. Found all 150 questions with explanations. Cleared the exam.',
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    exam: 'UPSC CSE Aspirant',
    quoteStart: 'Every other platform hides answers behind login. Here I just ',
    highlight: 'select an option and see the explanation.',
    quoteEnd: ' No nonsense. This is what we needed.',
  },
  {
    initials: 'AM',
    name: 'Aditya Mehta',
    exam: 'SSC CGL 2023',
    quoteStart: 'My whole WhatsApp study group uses this now. We share questions daily. The ',
    highlight: 'explanations are better than any book',
    quoteEnd: " I've bought.",
  },
]

export const footerColumns = [
  { title: 'Exams', links: ['UPSC CSE', 'SSC CGL / CHSL', 'IBPS PO / Clerk', 'NEET UG', 'JEE Main', 'State PSCs'] },
  { title: 'Platform', links: ['Mock Tests', 'PYQ Search', 'Answer Keys', 'Study Planner', 'Leaderboard'] },
  { title: 'Company', links: ['About', 'Blog', 'For Institutes', 'Privacy Policy', 'Contact Us'] },
] as const
