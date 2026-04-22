export const EXAMS = [
  { icon: '🏛️', name: 'UPSC CSE',       count: '18,000+ Qs', tag: 'Central',     slug: 'upsc-cse' },
  { icon: '📋', name: 'SSC CGL',         count: '24,000+ Qs', tag: 'Central',     slug: 'ssc-cgl' },
  { icon: '🏦', name: 'IBPS PO / Clerk', count: '15,000+ Qs', tag: 'Banking',     slug: 'ibps-po' },
  { icon: '🧬', name: 'NEET UG',         count: '12,000+ Qs', tag: 'Medical',     slug: 'neet-ug' },
  { icon: '⚗️', name: 'JEE Main',        count: '20,000+ Qs', tag: 'Engineering', slug: 'jee-main' },
  { icon: '📜', name: 'JKSSB',           count: '8,000+ Qs',  tag: 'J&K',         slug: 'jkssb' },
  { icon: '🌾', name: 'Raj. Patwari',    count: '3,000+ Qs',  tag: 'Rajasthan',   slug: 'raj-patwari' },
  { icon: '🚂', name: 'RRB NTPC',        count: '18,000+ Qs', tag: 'Railway',     slug: 'rrb-ntpc' },
  { icon: '🏫', name: 'UP TGT / PGT',   count: '7,000+ Qs',  tag: 'Teaching',    slug: 'up-tgt' },
  { icon: '⚖️', name: 'Bihar PSC',       count: '9,000+ Qs',  tag: 'Bihar',       slug: 'bihar-psc' },
  { icon: '🔒', name: 'UP Police',       count: '6,000+ Qs',  tag: 'UP',          slug: 'up-police' },
  { icon: '🏔️', name: 'HPSC / HPPSC',   count: '5,000+ Qs',  tag: 'HP',          slug: 'hpsc' },
]

export const TICKER_ITEMS = [
  '🔥 UPSC 2024 uploaded',
  '📄 SSC CGL 2024 all shifts live',
  '⚡ JKSSB 2024 answer key out',
  '🎯 NEET 2024 all shifts solved',
  '📝 Bihar PSC 2024 paper added',
  '🔒 UP Police 2024 uploaded',
  '🚂 RRB NTPC 2024 GK questions live',
]

export const STATS = [
  { value: 12,  suffix: 'L+',     label: 'Questions solved' },
  { value: 240, suffix: '+',      label: 'Exams covered' },
  { value: 28,  suffix: ' states',label: 'Across India' },
  { value: 8,   suffix: 'L+',     label: 'Students preparing' },
]

export const SEO_LINKS = [
  { text: 'UPSC Prelims 2023 GS Paper 1 with Answers',   count: '1,200 Qs' },
  { text: 'SSC CGL 2023 Tier-1 All Shifts Solved',        count: '900 Qs' },
  { text: 'JKSSB Finance Accounts 2024 Paper',            count: '150 Qs' },
  { text: 'IBPS PO 2023 Reasoning Section PDF',           count: '400 Qs' },
  { text: 'NEET 2023 Biology Chapter-wise PYQs',          count: '2,100 Qs' },
  { text: 'RRB NTPC 2022 GK with Explanations',           count: '1,800 Qs' },
  { text: 'Rajasthan Patwari 2023 Morning Shift',         count: '150 Qs' },
  { text: 'Bihar PSC 2022 Prelims Solved Paper',          count: '500 Qs' },
  { text: 'SSC CHSL 2023 English Questions',              count: '600 Qs' },
  { text: 'UPSC CDS 2023 Maths Fully Solved',             count: '400 Qs' },
  { text: 'UP Police Constable 2024 Paper',               count: '300 Qs' },
  { text: 'HPSC HAS 2023 Prelims Solved',                 count: '200 Qs' },
]

export const TESTIMONIALS = [
  {
    initials: 'RK',
    name: 'Rahul Kapoor',
    exam: 'JKSSB Finance 2023',
    highlight: 'JKSSB 2023 paper',
    quote: 'I just Googled {hl} and this was the first result. Found all 150 questions with explanations. Cleared the exam.',
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    exam: 'UPSC CSE Aspirant',
    highlight: 'select an option and see the explanation',
    quote: 'Every other platform hides answers behind login. Here I just {hl}. No nonsense. This is what we needed.',
  },
  {
    initials: 'AM',
    name: 'Aditya Mehta',
    exam: 'SSC CGL 2023',
    highlight: 'explanations are better than any book',
    quote: 'My whole WhatsApp group uses this. We share questions daily. The {hl} I\'ve bought.',
  },
]

export const PRICING_PLANS = [
  {
    id: 'explorer',
    name: 'Explorer',
    price: '0',
    period: 'Free forever · No card',
    popular: false,
    features: [
      { text: 'All PYQs with full solutions',    included: true },
      { text: '5 full mock tests per month',      included: true },
      { text: 'Basic score & review',             included: true },
      { text: 'Question sharing',                 included: true },
      { text: 'Unlimited mock tests',             included: false },
      { text: 'Analytics & weak area tracking',   included: false },
      { text: 'PDF downloads',                    included: false },
    ],
    cta: 'Get started free',
    ctaStyle: 'ghost',
  },
  {
    id: 'aspirant',
    name: 'Aspirant',
    price: '149',
    period: 'per month · cancel anytime',
    popular: true,
    features: [
      { text: 'Everything in Explorer',           included: true },
      { text: 'Unlimited mock tests',             included: true },
      { text: 'AI weak area analysis',            included: true },
      { text: 'PDF downloads',                    included: true },
      { text: 'State leaderboard',                included: true },
      { text: 'No ads',                           included: true },
    ],
    cta: 'Get Aspirant',
    ctaStyle: 'primary',
  },
  {
    id: 'pro',
    name: 'Pro Scholar',
    price: '299',
    period: 'per month · best for mains',
    popular: false,
    features: [
      { text: 'Everything in Aspirant',           included: true },
      { text: 'AI Doubt Solver',                  included: true },
      { text: 'Group mock challenges',             included: true },
      { text: '30 / 60 / 90-day planner',         included: true },
      { text: 'Early paper access',               included: true },
    ],
    cta: 'Get Pro Scholar',
    ctaStyle: 'ghost',
  },
]
