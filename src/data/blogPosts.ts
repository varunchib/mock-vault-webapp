// Blog posts — top-of-funnel SEO articles that rank for broad exam queries and
// funnel readers down to the PYQ papers, guides and (later) mocks. Rendered
// identically on the client (BlogPostPage) and for bots (worker.ts) via
// renderBlogHtml(), so what Google indexes is exactly what a user sees.

export type BlogBlock =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string; id?: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { t: 'callout'; title?: string; text: string }
  | { t: 'quote'; text: string }

export type BlogFaq = { q: string; a: string }

export type BlogPost = {
  slug: string
  title: string          // <title> — keyword-first
  h1: string
  description: string    // meta description (~155 chars)
  excerpt: string
  category: string
  tags: string[]
  author: string
  publishedAt: string    // ISO date
  updatedAt: string      // ISO date
  readMinutes: number
  blocks: BlogBlock[]
  faqs: BlogFaq[]
  related: { label: string; href: string }[]
}

// ── inline formatting: **bold**, [text](href) ──────────────────────────────
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function inline(s: string): string {
  return esc(s)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => `<a href="${href}">${text}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}
function slugId(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function renderBlogHtml(post: BlogPost): string {
  const parts: string[] = []
  for (const b of post.blocks) {
    switch (b.t) {
      case 'p': parts.push(`<p>${inline(b.text)}</p>`); break
      case 'h2': parts.push(`<h2 id="${b.id ?? slugId(b.text)}">${inline(b.text)}</h2>`); break
      case 'h3': parts.push(`<h3>${inline(b.text)}</h3>`); break
      case 'ul': parts.push(`<ul>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`); break
      case 'ol': parts.push(`<ol>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</ol>`); break
      case 'callout': parts.push(`<aside class="blog-callout">${b.title ? `<strong>${inline(b.title)}</strong>` : ''}<p>${inline(b.text)}</p></aside>`); break
      case 'quote': parts.push(`<blockquote>${inline(b.text)}</blockquote>`); break
      case 'table': {
        const head = `<tr>${b.headers.map((h) => `<th>${inline(h)}</th>`).join('')}</tr>`
        const body = b.rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')
        parts.push(`<div class="blog-table-wrap"><table class="blog-table">${b.caption ? `<caption>${inline(b.caption)}</caption>` : ''}<thead>${head}</thead><tbody>${body}</tbody></table></div>`)
        break
      }
    }
  }
  return parts.join('\n')
}

// Table of contents from the h2 headings, for the article sidebar/inline nav.
export function blogToc(post: BlogPost): { id: string; text: string }[] {
  return post.blocks
    .filter((b): b is Extract<BlogBlock, { t: 'h2' }> => b.t === 'h2')
    .map((b) => ({ id: b.id ?? slugId(b.text), text: b.text }))
}

// ────────────────────────────────────────────────────────────────────────────

const ibpsPo: BlogPost = {
  slug: 'ibps-po-exam',
  title: 'How to Prepare for IBPS PO 2026: Strategy & Study Plan',
  h1: 'How to Prepare for IBPS PO 2026: Prelims to Interview',
  description:
    'An IBPS PO 2026 preparation strategy that works backwards from the interview - sectional cut-offs, a phased plan, speed drills, and how to review previous year papers.',
  excerpt:
    'Everything you need to crack IBPS PO 2026 in one place — the notification timeline, eligibility, exam pattern, section-wise syllabus, salary and job profile, and a stage-by-stage preparation plan built around previous year papers.',
  category: 'Preparation Strategy',
  tags: ['IBPS PO', 'Bank PO', 'Banking Exams', 'IBPS', 'Probationary Officer'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-22',
  updatedAt: '2026-08-03',
  readMinutes: 12,
  blocks: [
    { t: 'p', text: 'The **IBPS PO (Probationary Officer)** exam is one of the most sought-after banking recruitment tests in India, offering a direct route to an officer-cadre job in the country\'s leading public sector banks. Every year lakhs of graduates compete for a few thousand posts, drawn by the **job security, respectable salary, and fast career growth** that a bank PO role offers. This complete guide covers everything about **IBPS PO 2026** — the notification timeline, eligibility, exam pattern, detailed syllabus, salary, job profile, and a realistic preparation strategy — so you can plan your attempt with clarity.' },

    { t: 'h3', text: 'Age Limit' },
    { t: 'p', text: 'The age limit is generally **20 to 30 years** as on the notification cut-off date. Upper-age relaxation is provided as per government rules:' },
    { t: 'ul', items: [
      '**SC / ST:** 5 years',
      '**OBC (non-creamy layer):** 3 years',
      '**Persons with Benchmark Disabilities (PwBD):** 10 years',
      '**Ex-servicemen and other categories:** as specified in the notification',
    ] },
    { t: 'h3', text: 'Educational Qualification' },
    { t: 'p', text: 'A candidate must hold a **Bachelor\'s degree (graduation) in any discipline** from a university recognised by the Government of India, or an equivalent qualification, with a **valid mark sheet/degree on the day of registration**. Basic **computer literacy** (operating and working knowledge of computers) is essential, and candidates should be able to read, write and speak the official language of the state/UT they apply for.' },
    { t: 'h3', text: 'Nationality & Attempts' },
    { t: 'p', text: 'The candidate must be an **Indian citizen** (with other categories as specified in the notification). Notably, **there is no limit on the number of attempts** for IBPS PO — you can appear every year as long as you remain within the age limit.' },

    { t: 'h3', text: 'Preliminary Exam Pattern' },
    { t: 'p', text: 'The Prelims has **100 questions for 100 marks in 1 hour**, with separate (sectional) timing for each of the three sections. There is a **penalty of 0.25 marks for every wrong answer**.' },
    { t: 'table', caption: 'IBPS PO Prelims pattern', headers: ['Section', 'Questions', 'Marks', 'Time'], rows: [
      ['English Language', '30', '30', '20 min'],
      ['Quantitative Aptitude', '35', '35', '20 min'],
      ['Reasoning Ability', '35', '35', '20 min'],
      ['**Total**', '**100**', '**100**', '**60 min**'],
    ] },
    { t: 'h3', text: 'Main Exam Pattern' },
    { t: 'p', text: 'The Mains is far more demanding, with **155 objective questions for 200 marks in 3 hours**, plus a separate **Descriptive (English) paper of 25 marks in 30 minutes** (letter writing and essay). Objective sections again carry **0.25 negative marking**.' },
    { t: 'table', caption: 'IBPS PO Mains pattern (objective)', headers: ['Section', 'Questions', 'Marks', 'Time'], rows: [
      ['Reasoning & Computer Aptitude', '45', '60', '60 min'],
      ['General / Economy / Banking Awareness', '40', '40', '35 min'],
      ['English Language', '35', '40', '40 min'],
      ['Data Analysis & Interpretation', '35', '60', '45 min'],
      ['**Objective Total**', '**155**', '**200**', '**3 hours**'],
      ['Descriptive (English — Letter & Essay)', '2', '25', '30 min'],
    ] },
    { t: 'h3', text: 'Interview' },
    { t: 'p', text: 'Candidates who clear the Mains are called for an **Interview of 100 marks**. The qualifying mark is usually **40% (35% for reserved categories)**. Final selection is based on **Mains + Interview weighted 80:20**.' },

    { t: 'h2', text: 'IBPS PO Preparation Strategy 2026' },
    { t: 'p', text: 'Cracking IBPS PO is less about studying harder and more about **practising smart** — speed, accuracy and section management decide results. Here is a proven approach:' },
    { t: 'ol', items: [
      '**Master the basics first.** Build strong fundamentals in each section before moving to speed practice — shortcuts only help once concepts are clear.',
      '**Practise previous year papers.** Solving actual IBPS PO papers reveals the real difficulty level, question types and time pressure better than any book.',
      '**Take timed mock tests.** Simulate the exact pattern (sectional timing for Prelims) to build stamina and a personal question-attempt order.',
      '**Focus on accuracy, not just attempts.** With 0.25 negative marking, a high strike-rate matters more than blindly attempting more questions.',
      '**Revise current affairs daily.** Maintain a running note of banking and economic news for the last 4–6 months for the Mains GA section.',
      '**Analyse every mock.** Spend as much time reviewing mistakes as taking the test — that is where the real improvement happens.',
    ] },

    { t: 'h2', text: 'Best Books for IBPS PO' },
    { t: 'ul', items: [
      '**Quantitative Aptitude:** Quantitative Aptitude by R. S. Aggarwal; Fast Track Objective Arithmetic by Rajesh Verma',
      '**Reasoning:** A Modern Approach to Verbal & Non-Verbal Reasoning by R. S. Aggarwal; Analytical Reasoning by M. K. Pandey',
      '**English:** Objective General English by S. P. Bakshi; Word Power Made Easy by Norman Lewis',
      '**General/Banking Awareness:** Banking Awareness by Arihant; a monthly current-affairs compilation and a daily newspaper',
    ] },
    { t: 'callout', title: 'The most under-rated resource', text: 'Books teach concepts, but exams are cracked on real questions. Working through actual previous year papers — with detailed solutions — is the single highest-return activity in your preparation.' },

    { t: 'h2', text: 'Practise with IBPS PO Previous Year Papers' },
    { t: 'p', text: 'The best way to convert preparation into marks is to practise the **real exam**. On Ministry of Papers you can attempt **[IBPS PO previous year papers](/exam/ibps-po)** — every question fully solved with the correct answer and a detailed explanation, completely free. Start with the **[IBPS PO Prelims solved paper](/pyq/ibps-po-pre-2025-aug-23-shift-1)** to experience the actual difficulty level, then review the **[IBPS PO exam guide](/guide/ibps-po)** for the complete syllabus and pattern.' },
    { t: 'callout', title: 'Coming soon', text: 'Full-length IBPS PO mock tests with automatic scoring and detailed solutions are on the way — practise the complete exam in a timed, exam-like interface.' },
  ],
  faqs: [
    { q: 'When will the IBPS PO 2026 notification be released?', a: 'IBPS usually releases the IBPS PO notification around August each year, with the Preliminary exam in October–November. The exact IBPS PO 2026 dates are confirmed in the official notification on ibps.in.' },
    { q: 'What is the eligibility for IBPS PO 2026?', a: 'A candidate must be an Indian citizen aged 20–30 years (with category-wise relaxations) and hold a Bachelor\'s degree in any discipline from a recognised university, with basic computer knowledge.' },
    { q: 'How many stages are there in IBPS PO selection?', a: 'Three: Preliminary Exam (qualifying), Main Exam, and Interview. The final merit is based on the Main exam and Interview marks in an 80:20 ratio.' },
    { q: 'Is there negative marking in IBPS PO?', a: 'Yes. There is a penalty of 0.25 marks for every wrong answer in the objective tests of both Prelims and Mains.' },
    { q: 'What is the salary of an IBPS PO?', a: 'An IBPS PO starts as an Assistant Manager (Scale I) with a basic pay of around ₹48,480 and a gross monthly salary of roughly ₹57,000–₹64,000 depending on the posting city, plus allowances and benefits.' },
    { q: 'How many attempts are allowed for IBPS PO?', a: 'There is no limit on the number of attempts for IBPS PO. You can appear every year as long as you meet the age criteria.' },
    { q: 'Which banks participate in IBPS PO?', a: 'All major public sector and participating banks recruit Probationary Officers through IBPS PO, except the State Bank of India, which conducts its own SBI PO exam.' },
    { q: 'How should I start preparing for IBPS PO?', a: 'Build strong fundamentals in Quant, Reasoning and English, then practise previous year papers and take timed mock tests focusing on accuracy, and revise banking and current affairs daily.' },
  ],
  related: [
    { label: 'IBPS PO Exam Hub — Solved PYQs', href: '/exam/ibps-po' },
    { label: 'IBPS PO Syllabus & Exam Pattern Guide', href: '/guide/ibps-po' },
    { label: 'IBPS PO Prelims 2025 — Solved Paper', href: '/pyq/ibps-po-pre-2025-aug-23-shift-1' },
  ],
}

const sscCgl: BlogPost = {
  slug: 'ssc-cgl-exam',
  title: 'How to Prepare for SSC CGL 2026: Strategy & Study Plan',
  h1: 'How to Prepare for SSC CGL 2026: A Realistic Study Plan',
  description:
    'A stage-by-stage SSC CGL 2026 preparation strategy - where to start, a 6-month plan, section-wise tactics, the best books, and how to use previous year papers properly.',
  excerpt:
    'Most SSC CGL candidates read the syllabus and then guess at the rest. This is the part nobody writes down: what to study first, how long each section really takes, and how to turn previous year papers into marks instead of a reading exercise.',
  category: 'Preparation Strategy',
  tags: ['SSC CGL', 'SSC CGL Preparation', 'Study Plan', 'SSC CGL Books', 'SSC CGL 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-08-03',
  readMinutes: 10,
  blocks: [
    { t: 'p', text: 'Knowing the **SSC CGL syllabus** is the easy part - it is published, and you can read the full breakdown with section weightage in our [SSC CGL syllabus and exam pattern guide](/guide/ssc-cgl). What separates candidates who clear Tier 2 from those who stall at Tier 1 is *sequencing*: what to study first, how much time each section actually deserves, and what to do with previous year papers once you have solved them.' },

    { t: 'h2', text: 'Where to start if you are beginning from zero' },
    { t: 'p', text: 'Do not start with the syllabus. Start with **one full previous year Tier 1 paper**, solved honestly under a 60-minute clock. You will score badly and that is the point - the result tells you which of the four sections is your weakest, and that single data point decides how you allocate the next three months.' },
    { t: 'ol', items: [
      'Solve one full Tier 1 paper cold, timed, no notes.',
      'Score it section by section - Reasoning, General Awareness, Quantitative Aptitude, English.',
      'Rank the four sections worst to best. Your weakest two get 60% of your study time until they stop being the weakest.',
      'Only then open the syllabus, and only for those two sections.',
    ] },
    { t: 'callout', title: 'Why this order works', text: 'Studying the syllabus front-to-back means spending equal time on a section you are already good at and one you are failing. Diagnose first, then allocate. It is the single highest-return change most candidates can make.' },

    { t: 'h2', text: 'A realistic 6-month SSC CGL study plan' },
    { t: 'table', caption: 'Time allocation by phase - adjust the weak-section bias to your own diagnostic', headers: ['Phase', 'Duration', 'Focus'], rows: [
      ['Foundation', 'Months 1-2', 'Concepts for your two weakest sections. Arithmetic and Advanced Maths if Quant is weak; grammar rules and vocabulary if English is.'],
      ['Build', 'Months 3-4', 'All four sections in rotation. Start daily General Awareness. Begin topic-wise previous year questions.'],
      ['Speed', 'Month 5', 'Full timed papers twice a week. Sectional timing practice - this is where the 2026 pattern change bites.'],
      ['Peak', 'Month 6', 'Full mocks every other day, revision of the error log only. No new topics.'],
    ] },
    { t: 'p', text: 'If you have less than six months, compress Foundation rather than Peak. Candidates consistently under-invest in timed practice and over-invest in reading theory.' },

    { t: 'h2', text: 'Section-wise strategy' },
    { t: 'h3', text: 'Quantitative Aptitude - the rank decider' },
    { t: 'p', text: 'Quant separates ranks more than any other section because the spread of scores is widest. Arithmetic - percentage, ratio, profit and loss, time and work, time and distance - carries the bulk of Tier 1. Advanced Maths such as geometry, mensuration, trigonometry and algebra matters more in Tier 2. Learn one method per question type and drill it rather than collecting three approaches you half-remember.' },
    { t: 'h3', text: 'English - the cheapest marks on the paper' },
    { t: 'p', text: 'English is the highest marks-per-hour section for most candidates and the most neglected. Error spotting, sentence improvement, fill in the blanks and vocabulary are all pattern-driven: the same idioms and confusable word pairs recur across years. Twenty minutes a day of previous year English questions beats two hours of grammar theory.' },
    { t: 'h3', text: 'General Awareness - little and often' },
    { t: 'p', text: 'GA cannot be crammed in the final month and cannot be skipped - it is 50 marks answered in under 8 minutes, which makes it the best time-to-marks ratio on the paper. Static GK across History, Polity, Geography and Science is finite and repeats; give it 20 minutes daily from month 3 and keep current affairs to a single source.' },
    { t: 'h3', text: 'Reasoning - protect your time here' },
    { t: 'p', text: 'Reasoning is where most candidates score well but bleed minutes. The trap is the two or three puzzle-style questions that eat six minutes each. Learn to recognise and skip them on the first pass, bank the easy 20, and return only if time allows.' },

    { t: 'h2', text: 'Best books for SSC CGL' },
    { t: 'ul', items: [
      '**Quantitative Aptitude** - Rakesh Yadav Class Notes for method, Kiran chapter-wise previous year for volume.',
      '**English** - Plinth to Paramount for rules, Word Power Made Easy for vocabulary.',
      '**Reasoning** - R.S. Aggarwal for coverage, then previous year questions for calibration.',
      '**General Awareness** - Lucent General Knowledge, plus one current affairs source you actually read daily.',
    ] },
    { t: 'p', text: 'Buy fewer books than you think you need. Two books finished beats six started.' },

    { t: 'h2', text: 'How to actually use previous year papers' },
    { t: 'p', text: 'Solving a paper and checking the score is the least useful thing you can do with it. The value is in the review:' },
    { t: 'ol', items: [
      'Solve timed, in one sitting, no breaks.',
      'Before checking answers, mark every question you guessed - even the ones you got right. Guessed-and-correct is a gap, not a success.',
      'Read the full solution for every wrong answer AND every guessed one.',
      'Log the underlying concept, not the question. "Percentage - successive change" is useful; "Q47" is not.',
      'Re-solve only from your error log, weekly. This is the revision that moves your score.',
    ] },
    { t: 'callout', title: 'Sectional timing changed the game in 2026', text: 'With sectional timing you can no longer borrow minutes from English to rescue Quant. Practise every paper with the same per-section limits as the real exam, or your practice scores will flatter you.' },

    { t: 'h2', text: 'Common mistakes that cost marks' },
    { t: 'ul', items: [
      'Collecting study material instead of finishing it.',
      'Skipping General Awareness because it feels unrewarding, then losing 30 easy marks.',
      'Practising untimed - accuracy without speed does not clear Tier 1.',
      'Ignoring negative marking and guessing at random. At 0.50 per wrong answer, blind guessing is a losing bet.',
      'Never reviewing a solved paper properly, which turns practice into a reading exercise.',
    ] },

    { t: 'h2', text: 'Practise with SSC CGL previous year papers' },
    { t: 'p', text: 'Every SSC CGL paper on Ministry of Papers is fully solved with the official answer key and a worked explanation for each question, free and without a login. Start with the most recent Tier 1 papers and work backwards.' },
  ],
  faqs: [
    { q: 'How many hours a day should I study for SSC CGL?', a: 'Four to six focused hours is enough if the time is allocated by weakness rather than spread evenly. Candidates who study eight unfocused hours on their strongest section routinely score below those doing four targeted ones.' },
    { q: 'Can I clear SSC CGL in 6 months while working?', a: 'Yes, but only with a diagnostic-first approach. Working candidates cannot afford to study the syllabus front-to-back, so identify your two weakest sections in week one and concentrate there, using previous year papers as the measuring stick.' },
    { q: 'Are previous year papers enough for SSC CGL?', a: 'They are enough for pattern, difficulty calibration and revision, but not for building a concept you never learned. Use a standard book to learn the concept, then previous year questions to drill and test it.' },
    { q: 'How do I handle sectional timing in SSC CGL 2026?', a: 'Practise every mock with the same per-section limits as the real exam. Sectional timing removes the option of borrowing minutes from an easy section, so each section needs its own pacing plan rather than one plan for the whole paper.' },
  ],
  related: [
    { label: 'SSC CGL syllabus, exam pattern & weightage', href: '/guide/ssc-cgl' },
    { label: 'SSC CGL solved previous year papers', href: '/exam/ssc-cgl' },
  ],
}

const upscCse: BlogPost = {
  slug: 'upsc-cse-exam',
  title: 'How to Prepare for UPSC CSE 2026: Prelims-First Strategy',
  h1: 'How to Prepare for UPSC CSE 2026: A Prelims-First Plan',
  description:
    'A UPSC CSE 2026 preparation strategy built prelims-first - what to read, how to sequence NCERTs and standard books, answer writing, and using previous year papers as the syllabus.',
  excerpt:
    'The UPSC Civil Services Examination 2026 notification is out with 933 vacancies for IAS, IPS, IFS and allied services. Here is the complete picture — Prelims and Mains dates, eligibility and attempts, the three-stage pattern, and how to build a preparation plan around previous year papers.',
  category: 'Preparation Strategy',
  tags: ['UPSC CSE', 'UPSC', 'Civil Services', 'IAS', 'IPS', 'UPSC 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-08-03',
  readMinutes: 12,
  blocks: [
    { t: 'p', text: 'The **UPSC Civil Services Examination (CSE)** is India\'s most competitive exam — the route to the **IAS, IPS, IFS** and other Group A and Group B central services. Lakhs apply each year for a few hundred posts, drawn by the responsibility, reach and prestige of a career in the civil services. This guide covers **UPSC CSE 2026** end to end: the notification, Prelims and Mains dates, eligibility and attempts, the three-stage pattern, and a preparation strategy grounded in previous year papers.' },

    { t: 'h3', text: 'Age Limit' },
    { t: 'p', text: 'A candidate must be **21 to 32 years** as on 1 August of the exam year, with upper-age relaxation for reserved categories (OBC +3, SC/ST +5, PwBD +10, and more as specified).' },
    { t: 'h3', text: 'Educational Qualification & Attempts' },
    { t: 'p', text: 'A **graduate degree** in any discipline from a recognised university is required. Number of attempts is capped by category — **6 for General, 9 for OBC, and unlimited (up to the age limit) for SC/ST** — with additional relaxations for PwBD candidates.' },

    { t: 'h2', text: 'UPSC CSE Preparation Strategy 2026' },
    { t: 'ul', items: [
      '**Build a strong NCERT + standard-books base** across Polity, History, Geography, Economy and Environment before moving to advanced sources.',
      '**Current affairs is the spine** — follow one newspaper and one monthly compilation, and connect events back to the static syllabus.',
      '**Do not neglect CSAT** — every year candidates with strong GS miss the cutoff because they took the qualifying paper lightly.',
      '**Answer writing for Mains** must start early — Mains, not Prelims, is where rank is made. Practise structured answers under time.',
      '**Previous year Prelims papers** train you on the exact style and elimination skills UPSC rewards.',
    ] },

    { t: 'h2', text: 'Practise with UPSC Previous Year Papers' },
    { t: 'p', text: 'The best Prelims training is the real paper. On Ministry of Papers you can attempt **[UPSC CSE previous year papers](/exam/upsc-cse)** — every question solved with a detailed explanation, free. Start with the **[UPSC Prelims 2025 GS Paper I](/pyq/upsc-cse-prelims-2025-gs1)**, then use the **[UPSC guide](/guide/upsc-cse)** for the complete syllabus and pattern.' },
  ],
  faqs: [
    { q: 'When is the UPSC CSE 2026 exam?', a: 'The UPSC CSE 2026 Prelims is on 24 May 2026 and the Mains begins on 21 August 2026 (21, 22, 23, 29 and 30 August). The notification was released on 14 January 2026.' },
    { q: 'How many vacancies are there in UPSC CSE 2026?', a: 'The 2026 notification announced 933 vacancies across the participating services, subject to later revision.' },
    { q: 'What is the age limit for UPSC CSE?', a: 'A candidate must be 21 to 32 years as on 1 August of the exam year, with relaxations for reserved categories (OBC +3, SC/ST +5, PwBD +10).' },
    { q: 'How many attempts are allowed in UPSC CSE?', a: 'General category candidates get 6 attempts, OBC 9, and SC/ST unlimited up to the age limit, with additional relaxations for PwBD candidates.' },
    { q: 'Is CSAT qualifying in UPSC Prelims?', a: 'Yes. CSAT (Paper II) is qualifying — you need at least 33% to be considered — while GS Paper I decides your Prelims merit.' },
    { q: 'What degree do I need for UPSC CSE?', a: 'A Bachelor\'s degree in any discipline from a recognised university. Final-year students can also apply, subject to producing proof of passing at the Mains stage.' },
  ],
  related: [
    { label: 'UPSC CSE Exam Hub — Solved PYQs', href: '/exam/upsc-cse' },
    { label: 'UPSC CSE Syllabus, Pattern & Weightage Analysis Guide', href: '/guide/upsc-cse' },
    { label: 'UPSC Prelims 2025 — GS Paper I Solved', href: '/pyq/upsc-cse-prelims-2025-gs1' },
  ],
}

const neetUg: BlogPost = {
  slug: 'neet-ug-exam',
  title: 'How to Prepare for NEET UG 2026: NCERT-First Study Plan',
  h1: 'How to Prepare for NEET UG 2026: An NCERT-First Plan',
  description:
    'A NEET UG 2026 preparation strategy anchored on NCERT - subject-wise time split, revision cycles, error logs, and how to use previous year papers to find your weak chapters.',
  excerpt:
    'NEET UG 2026, conducted by the NTA, is the single entrance test for MBBS, BDS, AYUSH and allied medical courses across India. Here is the complete picture — exam date, eligibility, the 720-mark pattern, marking scheme, and a subject-wise preparation plan built on previous year papers.',
  category: 'Preparation Strategy',
  tags: ['NEET UG', 'NEET', 'Medical Entrance', 'MBBS', 'NTA', 'NEET 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-08-03',
  readMinutes: 10,
  blocks: [
    { t: 'p', text: 'The **NEET UG (National Eligibility cum Entrance Test — Undergraduate)** is the single national entrance exam for admission to **MBBS, BDS, BAMS, BHMS and allied medical courses** across India. Conducted by the **National Testing Agency (NTA)**, it is one of the most-taken exams in the country, with over 20 lakh candidates competing for medical seats each year. This guide covers **NEET UG 2026** completely — exam date, eligibility, the marking pattern, and a subject-wise preparation strategy.' },

    { t: 'h2', text: 'NEET UG Preparation Strategy 2026' },
    { t: 'ul', items: [
      '**Biology is 50% of the paper (360 marks)** and the most scoring — master NCERT line by line; most Biology questions map directly to it.',
      '**Chemistry rewards NCERT + formula recall.** Inorganic and Physical are quick marks; Organic needs reaction practice.',
      '**Physics is the differentiator** — it separates top rankers. Focus on concept clarity and numerical speed.',
      '**With −1 negative marking**, accuracy beats attempts. Practise identifying which questions to skip.',
      '**Full-length timed mocks and previous year papers** are essential to build the 3-hour stamina and pacing.',
    ] },

    { t: 'h2', text: 'Practise with NEET Previous Year Papers' },
    { t: 'p', text: 'The most reliable NEET training is solving real papers under time. On Ministry of Papers you can attempt **[NEET UG previous year papers](/exam/neet-ug)** with every question solved and explained, free — then use the **[NEET guide](/guide/neet-ug)** for the complete syllabus and weightage.' },
  ],
  faqs: [
    { q: 'When is the NEET UG 2026 exam?', a: 'NEET UG 2026 is scheduled for 3 May 2026, from 2:00 PM to 5:00 PM, conducted by the NTA. Confirm on neet.nta.nic.in.' },
    { q: 'What is the total marks and pattern of NEET UG?', a: 'NEET UG has 180 questions to answer (out of 200) for a total of 720 marks in 3 hours, with +4 for a correct answer and −1 for a wrong one, across Physics, Chemistry and Biology.' },
    { q: 'What is the eligibility for NEET UG 2026?', a: 'A minimum age of 17 years as on 31 December 2026 and Class 12 with Physics, Chemistry, Biology/Biotechnology and English — with at least 50% in PCB for General (40% for OBC/SC/ST).' },
    { q: 'Is there negative marking in NEET?', a: 'Yes — each wrong answer deducts 1 mark, while each correct answer earns 4 marks, so accuracy is critical.' },
    { q: 'How many attempts are allowed for NEET UG?', a: 'There is currently no limit on the number of NEET UG attempts, provided you meet the age and qualification criteria.' },
    { q: 'Which subject carries the most marks in NEET?', a: 'Biology (Botany + Zoology) carries 360 of the 720 marks — half the paper — making it the most important and most scoring section.' },
  ],
  related: [
    { label: 'NEET UG Exam Hub — Solved PYQs', href: '/exam/neet-ug' },
    { label: 'NEET UG Syllabus, Pattern & Weightage Analysis Guide', href: '/guide/neet-ug' },
  ],
}

const bpsc: BlogPost = {
  slug: 'bpsc-exam',
  title: 'How to Prepare for BPSC CCE: Strategy & Bihar GK Plan',
  h1: 'How to Prepare for BPSC CCE: Strategy and Bihar-Specific GK',
  description:
    'A BPSC CCE preparation strategy covering the Bihar-specific General Knowledge that decides the paper, a phased study plan, and how to review solved previous year papers.',
  excerpt:
    'The Bihar Public Service Commission conducts the Combined Competitive Examination (CCE) for prestigious state posts like SDM, DSP and BDO. Here is the complete picture of the current 71st and 72nd CCE cycles — dates, vacancies, eligibility, the exam pattern, salary and how to prepare with previous year papers.',
  category: 'Preparation Strategy',
  tags: ['BPSC', 'Bihar PSC', 'BPSC CCE', 'State PSC', 'BPSC 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-08-03',
  readMinutes: 11,
  blocks: [
    { t: 'p', text: 'The **BPSC Combined Competitive Examination (CCE)** is the Bihar Public Service Commission\'s flagship exam for **Group A and Group B state services** — coveted posts like **SDM (Deputy Collector), DSP, and Block Development Officer (BDO)**. It draws lakhs of aspirants across Bihar for its authority, reach and job security. This guide covers the current **71st and 72nd CCE** cycles: notifications, exam dates, vacancies, eligibility, the three-stage pattern, salary and a preparation plan.' },

    { t: 'h3', text: 'Age Limit' },
    { t: 'p', text: 'The minimum age is generally **20–22 years** (post-dependent) and the upper limit is **37 years for General male candidates**, with relaxations: General female and BC/EBC **+3 years (40)**, and SC/ST **+5 years (42)**. Exact limits vary by post.' },
    { t: 'h3', text: 'Educational Qualification' },
    { t: 'p', text: 'A **Bachelor\'s degree** in any discipline from a recognised university is required. Final-year students can generally apply subject to producing proof of qualification at the Mains stage.' },

    { t: 'h2', text: 'BPSC Preparation Strategy 2026' },
    { t: 'ul', items: [
      '**Bihar-specific GK is a scoring edge** — history, geography, economy and current affairs of Bihar appear reliably every year.',
      '**Prelims is qualifying but decisive** — a strong screening score frees you to focus fully on Mains answer writing.',
      '**Start Mains answer writing early** — BPSC Mains rewards structured, point-wise answers in the state context.',
      '**Previous year papers reveal BPSC\'s repeat patterns** in both Bihar GK and general studies.',
    ] },

    { t: 'h2', text: 'Practise with BPSC Previous Year Papers' },
    { t: 'p', text: 'The most efficient BPSC prep is solving real papers. On Ministry of Papers you can attempt **[BPSC previous year papers](/exam/bpsc)** — every question solved and explained, free. Start with the **[BPSC 70th CCE Prelims 2024 GS paper](/pyq/bpsc-70th-cce-prelims-2024-gs)**, then use the **[BPSC guide](/guide/bpsc)** for the full syllabus and weightage.' },
  ],
  faqs: [
    { q: 'When is the BPSC 72nd CCE Prelims 2026?', a: 'The BPSC 72nd CCE Preliminary exam is scheduled for 26 July 2026. The 71st CCE Mains is scheduled for 25–30 April 2026. Confirm on bpsc.bihar.gov.in.' },
    { q: 'How many vacancies are in BPSC 72nd CCE?', a: 'The 72nd CCE was notified for around 1,186 vacancies across various state-service posts, subject to revision.' },
    { q: 'What is the eligibility for BPSC CCE?', a: 'A Bachelor\'s degree in any discipline, with age generally from 20–22 years up to 37 for General male candidates (with category relaxations up to 40 or 42).' },
    { q: 'Is there negative marking in BPSC Prelims?', a: 'Yes — recent BPSC cycles apply negative marking of one-third (0.33) per wrong answer in the Prelims objective paper.' },
    { q: 'What is the salary of a BPSC officer?', a: 'Most posts are in Pay Level 9–10 with a range of about ₹56,100 to ₹1,77,500 plus allowances. SDM and DSP posts have the highest starting pay.' },
    { q: 'What are the stages of BPSC CCE selection?', a: 'Three stages: a qualifying Preliminary exam, a descriptive Mains examination, and an Interview, with the final merit based on Mains and Interview.' },
  ],
  related: [
    { label: 'BPSC Exam Hub — Solved PYQs', href: '/exam/bpsc' },
    { label: 'BPSC Syllabus, Pattern & Weightage Analysis Guide', href: '/guide/bpsc' },
    { label: 'BPSC 70th CCE Prelims 2024 — Solved Paper', href: '/pyq/bpsc-70th-cce-prelims-2024-gs' },
  ],
}

const jkpscJkcce: BlogPost = {
  slug: 'jkpsc-jkcce-exam',
  title: 'How to Prepare for JKPSC JKCCE: Strategy & J&K GK Plan',
  h1: 'How to Prepare for JKPSC JKCCE: Strategy and J&K GK',
  description:
    'A JKPSC JKCCE preparation strategy focused on the J&K General Knowledge that carries the paper, plus a phased plan and how to review solved previous year papers.',
  excerpt:
    'The J&K Public Service Commission conducts the Combined Competitive Examination (JKCCE) for the Kashmir Administrative Service and allied posts. Here is the complete picture — the three-stage pattern, eligibility, syllabus overview and a preparation plan built on previous year papers.',
  category: 'Preparation Strategy',
  tags: ['JKPSC', 'JKCCE', 'KAS', 'Jammu Kashmir PSC', 'State PSC'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-08-03',
  readMinutes: 9,
  blocks: [
    { t: 'p', text: 'The **JKPSC Combined Competitive Examination (JKCCE)** is the J&K Public Service Commission\'s premier exam for the **Kashmir Administrative Service (KAS)** and allied gazetted posts — the state\'s equivalent of the civil services. This guide covers the JKCCE end to end: the notification, three-stage pattern, eligibility, syllabus overview and a preparation strategy grounded in previous year papers.' },

    { t: 'h2', text: 'JKCCE Preparation Strategy' },
    { t: 'ul', items: [
      '**J&K-specific GK is decisive** — the history, geography, economy, polity and current affairs of Jammu & Kashmir appear reliably and are your scoring edge over general aspirants.',
      '**Build a strong NCERT + standard-books base** for the general studies portion, the same foundation UPSC aspirants use.',
      '**Start Mains answer writing early** and practise in the J&K administrative context.',
      '**Previous year JKCCE papers** reveal the exact style and the recurring J&K-focused questions.',
    ] },

    { t: 'h2', text: 'Practise with JKCCE Previous Year Papers' },
    { t: 'p', text: 'On Ministry of Papers you can attempt **[JKPSC JKCCE previous year papers](/exam/jkpsc)** — every question solved with a detailed explanation, free. Start with the **[JKCCE Prelims 2025 GS Paper I (Set B)](/pyq/jkpsc-jkcce-prelims-2025-gs1-set-b)**, then use the **[JKCCE guide](/guide/jkpsc)** for the full syllabus.' },
  ],
  faqs: [
    { q: 'What is the JKPSC JKCCE exam?', a: 'The JKCCE (Combined Competitive Examination) is conducted by the J&K Public Service Commission to recruit officers for the Kashmir Administrative Service and allied posts, through Prelims, Mains and an Interview.' },
    { q: 'What is the eligibility for JKCCE?', a: 'A Bachelor\'s degree in any discipline, with age generally 21 to 32 years for the general category and J&K domicile as specified in the notification.' },
    { q: 'How many stages are in JKCCE selection?', a: 'Three: a qualifying Preliminary examination, a descriptive Mains, and a Viva-voce (Interview), with final merit based on Mains and Interview.' },
    { q: 'Where can I practise JKCCE previous year papers?', a: 'You can attempt solved JKCCE previous year papers free on Ministry of Papers, including the JKCCE Prelims 2025 GS Paper I, with detailed explanations.' },
  ],
  related: [
    { label: 'JKPSC JKCCE Exam Hub — Solved PYQs', href: '/exam/jkpsc' },
    { label: 'JKCCE Syllabus, Pattern & Weightage Analysis Guide', href: '/guide/jkpsc' },
    { label: 'JKCCE Prelims 2025 — GS Paper I (Set B)', href: '/pyq/jkpsc-jkcce-prelims-2025-gs1-set-b' },
  ],
}

const rssbPatwari: BlogPost = {
  slug: 'rssb-patwari-exam',
  title: 'How to Prepare for Rajasthan Patwari: Strategy & Books',
  h1: 'How to Prepare for Rajasthan Patwari: Strategy and Books',
  description:
    'A Rajasthan Patwari (RSSB) preparation strategy - Rajasthan GK, computer knowledge, reasoning and maths, the books worth buying, and how to use solved previous year papers.',
  excerpt:
    'The Rajasthan Staff Selection Board (RSSB) recruits Patwaris — a coveted revenue-department post. The 2025 cycle filled 3,705 posts; a 2026 notification is awaited. Here is the complete picture — eligibility, exam pattern, salary and how to prepare with previous year papers.',
  category: 'Preparation Strategy',
  tags: ['RSSB Patwari', 'Rajasthan Patwari', 'RSMSSB', 'Rajasthan', 'Patwari'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-08-03',
  readMinutes: 9,
  blocks: [
    { t: 'p', text: 'The **Rajasthan Patwari** exam, conducted by the **Rajasthan Staff Selection Board (RSSB, formerly RSMSSB)**, is one of the state\'s most popular recruitment tests — a stable revenue-department post with strong local demand. This guide covers the **RSSB Patwari** exam end to end: the recruitment cycle, eligibility, exam pattern, salary and a preparation strategy built on previous year papers.' },

    { t: 'h2', text: 'RSSB Patwari Preparation Strategy' },
    { t: 'ul', items: [
      '**Rajasthan GK is the deciding section** — geography, history, art and culture of Rajasthan carry heavy weight and reward focused study.',
      '**Reasoning and Maths are speed-scoring** — daily timed practice builds the accuracy the cutoff demands.',
      '**Do not skip Basic Computer** — it is easy marks that many candidates neglect.',
      '**The 2025 previous year paper** is the single best resource to gauge the real difficulty and question style.',
    ] },

    { t: 'h2', text: 'Practise with Rajasthan Patwari Previous Year Papers' },
    { t: 'p', text: 'On Ministry of Papers you can attempt the **[Rajasthan Patwari previous year papers](/exam/rssb)** — solved with detailed explanations, free. Start with the **[RSSB Patwari 2025 (17 Aug, Shift 1) solved paper](/pyq/rsmssb-patwari-2025-aug17-shift1-spz8)**, then use the **[RSSB Patwari guide](/guide/rssb)** for the full syllabus.' },
  ],
  faqs: [
    { q: 'Is there a Rajasthan Patwari 2026 notification?', a: 'The 2025 cycle (3,705 posts, exam on 17 August 2025) concluded with results on 31 December 2025. A fresh 2026 notification is awaited — track rssb.rajasthan.gov.in.' },
    { q: 'What is the eligibility for RSSB Patwari?', a: 'A Bachelor\'s degree in any discipline plus a basic computer qualification, with age generally 18 to 40 years (with category relaxations).' },
    { q: 'What is the Rajasthan Patwari exam pattern?', a: 'A single objective paper of 150 questions and 300 marks in 3 hours, with negative marking of one-third, covering GK/Science, Reasoning & Maths, Rajasthan GK, language and basic computer.' },
    { q: 'What is the salary of a Rajasthan Patwari?', a: 'A Patwari is appointed at Pay Matrix Level 5 with a starting basic of about ₹20,800, giving an in-hand salary of roughly ₹28,000–₹35,000 per month plus allowances after probation.' },
  ],
  related: [
    { label: 'Rajasthan Patwari Exam Hub — Solved PYQs', href: '/exam/rssb' },
    { label: 'RSSB Patwari Syllabus, Pattern & Weightage Analysis Guide', href: '/guide/rssb' },
    { label: 'RSSB Patwari 2025 (17 Aug, Shift 1) — Solved Paper', href: '/pyq/rsmssb-patwari-2025-aug17-shift1-spz8' },
  ],
}

const jkssbSi: BlogPost = {
  slug: 'jkssb-sub-inspector-exam',
  title: 'How to Prepare for JKSSB Sub Inspector: Strategy & PET',
  h1: 'How to Prepare for JKSSB Sub Inspector: Written and Physical',
  description:
    'A JKSSB Sub Inspector preparation strategy covering both halves - the written paper section by section, and building for the physical test alongside it.',
  excerpt:
    'JKSSB recruits Sub Inspectors (Executive) for the J&K Police under the Home Department. Here is the complete picture of the latest recruitment — eligibility, the revised exam pattern, syllabus overview and how to prepare with previous year papers.',
  category: 'Preparation Strategy',
  tags: ['JKSSB', 'Sub Inspector', 'JKPSI', 'J&K Police', 'Jammu Kashmir'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-08-03',
  readMinutes: 9,
  blocks: [
    { t: 'p', text: 'The **JKSSB Sub Inspector (Executive)** exam recruits officers for the **Jammu & Kashmir Police** under the Home Department — a uniformed, authority-carrying post that draws heavy competition across J&K. This guide covers the exam end to end: the latest recruitment, eligibility, the revised exam pattern, syllabus overview and a preparation strategy built on previous year papers.' },

    { t: 'h2', text: 'JKSSB Sub Inspector Preparation Strategy' },
    { t: 'ul', items: [
      '**J&K General Awareness is your edge** — study the geography, history and current affairs of Jammu & Kashmir thoroughly.',
      '**Note the syllabus change** — Law questions no longer appear; prepare Computer Proficiency and Mathematical Abilities instead.',
      '**Reasoning and Quant are speed sections** — daily timed practice is essential given the 0.5 negative marking.',
      '**The 2017 and 2022 JKPSI papers** remain excellent practice for Reasoning, GK and English despite the pattern update.',
    ] },

    { t: 'h2', text: 'Practise with JKSSB Sub Inspector Previous Year Papers' },
    { t: 'p', text: 'On Ministry of Papers you can attempt **[JKSSB Sub Inspector previous year papers](/exam/jkssb)** — solved with detailed explanations, free. Start with the **[JKPSI 2022 solved paper](/pyq/jkpsi-2022)**, then use the **[JKSSB Sub Inspector guide](/guide/jkpsi)** for the full syllabus.' },
  ],
  faqs: [
    { q: 'How many vacancies are in the JKSSB Sub Inspector 2026 recruitment?', a: 'The latest 2026 recruitment was notified for 104 Sub Inspector posts, with applications open from 4 February to 12 March 2026. Confirm the latest on jkssb.nic.in.' },
    { q: 'What is the JKSSB Sub Inspector exam pattern?', a: '100 objective MCQs for 200 marks in 120 minutes, with 0.5 negative marking. The 2024 syllabus added Computer Proficiency and Mathematical Abilities and removed the Law section.' },
    { q: 'What is the eligibility for JKSSB Sub Inspector?', a: 'A Bachelor\'s degree in any discipline, meeting the physical standards specified in the notification and the applicable age limits with category relaxations.' },
    { q: 'Are old JKPSI papers still useful?', a: 'Yes — the 2017 and 2022 JKPSI papers remain strong practice for Reasoning, General Knowledge and English, which overlap heavily with the current syllabus.' },
  ],
  related: [
    { label: 'JKSSB Exam Hub — Solved PYQs', href: '/exam/jkssb' },
    { label: 'JKSSB Sub Inspector Syllabus, Pattern & Weightage Analysis Guide', href: '/guide/jkpsi' },
    { label: 'JKPSI 2022 — Solved Paper', href: '/pyq/jkpsi-2022' },
  ],
}

const jkssbPatwari: BlogPost = {
  slug: 'jkssb-patwari-exam',
  title: 'How to Prepare for JKSSB Patwari: Strategy & Study Plan',
  h1: 'How to Prepare for JKSSB Patwari: A Realistic Study Plan',
  description:
    'A JKSSB Patwari preparation strategy - J&K GK, computers, maths and reasoning in the right order, plus how to turn solved previous year papers into marks.',
  excerpt:
    'JKSSB recruits Patwaris for the J&K revenue department — a stable, locally-posted government job. Here is the complete picture — eligibility, the exam pattern, syllabus overview and how to prepare with previous year papers.',
  category: 'Preparation Strategy',
  tags: ['JKSSB', 'JKSSB Patwari', 'Patwari', 'Jammu Kashmir', 'Revenue Department'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-08-03',
  readMinutes: 8,
  blocks: [
    { t: 'p', text: 'The **JKSSB Patwari** exam recruits Patwaris for the **Jammu & Kashmir revenue department** — a stable, locally-posted government job in high demand across the union territory. This guide covers eligibility, the exam pattern, syllabus overview and a preparation strategy built on previous year papers.' },

    { t: 'h2', text: 'JKSSB Patwari Preparation Strategy' },
    { t: 'ul', items: [
      '**J&K General Knowledge is the scoring differentiator** — study the region\'s geography, history and current affairs in depth.',
      '**Maths and Reasoning reward daily timed practice** — accuracy under time decides the cutoff.',
      '**Basic Computer is easy, reliable marks** — do not leave it for the end.',
      '**Solve the JKSSB Patwari previous year paper** to calibrate the real difficulty and pacing.',
    ] },

    { t: 'h2', text: 'Practise with JKSSB Patwari Previous Year Papers' },
    { t: 'p', text: 'On Ministry of Papers you can attempt the **[JKSSB Patwari previous year papers](/exam/jkssb)** — solved with detailed explanations, free. Start with the **[JKSSB Patwari 2024 (Set A) solved paper](/pyq/jkssb-patwari-question-paper-2024)**, then use the **[JKSSB Patwari guide](/guide/jkssb-patwari)** for the full syllabus.' },
  ],
  faqs: [
    { q: 'When is the JKSSB Patwari 2026 exam?', a: 'The Patwari exam appears on the JKSSB 2026 exam calendar, with specific dates confirmed closer to the exam. Track jkssb.nic.in for the current notification.' },
    { q: 'What is the eligibility for JKSSB Patwari?', a: 'A Bachelor\'s degree from a recognised university with a basic computer qualification, meeting the age and J&K domicile requirements in the notification.' },
    { q: 'What is the JKSSB Patwari exam pattern?', a: 'An objective (OMR) written exam, typically 120 questions covering J&K-focused GK, General Science, Maths, Reasoning, English and Basic Computer, with negative marking as specified.' },
    { q: 'Where can I practise JKSSB Patwari papers?', a: 'You can attempt the solved JKSSB Patwari 2024 previous year paper free on Ministry of Papers, with detailed explanations for every question.' },
  ],
  related: [
    { label: 'JKSSB Exam Hub — Solved PYQs', href: '/exam/jkssb' },
    { label: 'JKSSB Patwari Syllabus, Pattern & Weightage Analysis Guide', href: '/guide/jkssb-patwari' },
    { label: 'JKSSB Patwari 2024 (Set A) — Solved Paper', href: '/pyq/jkssb-patwari-question-paper-2024' },
  ],
}

const jkssbJa: BlogPost = {
  slug: 'jkssb-junior-assistant-exam',
  title: 'How to Prepare for JKSSB Junior Assistant: Typing & Plan',
  h1: 'How to Prepare for JKSSB Junior Assistant: Written and Typing',
  description:
    'A JKSSB Junior Assistant preparation strategy covering the written paper and the typing test together, with a phased plan and how to review solved previous year papers.',
  excerpt:
    'JKSSB recruits Junior Assistants — a clerical J&K government post with a written exam plus a typing skill test. The 2026 cycle carries 343 vacancies with the written exam on 19 April 2026. Here is the complete picture — eligibility, pattern and how to prepare with previous year papers.',
  category: 'Preparation Strategy',
  tags: ['JKSSB', 'Junior Assistant', 'Jammu Kashmir', 'Clerical Jobs', 'JKSSB 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-08-03',
  readMinutes: 8,
  blocks: [
    { t: 'p', text: 'The **JKSSB Junior Assistant** exam recruits clerical staff across Jammu & Kashmir government departments — a stable entry-level post that pairs a written exam with a **typing/skill test**. This guide covers the **2026 cycle** end to end: vacancies, exam date, eligibility, pattern and a preparation strategy built on previous year papers.' },

    { t: 'h2', text: 'JKSSB Junior Assistant Preparation Strategy' },
    { t: 'ul', items: [
      '**J&K General Knowledge and Basic Computer** together form the highest-return preparation — both are direct-recall and heavily weighted.',
      '**Build typing speed in parallel** — the skill test is qualifying, and candidates who ignore it until after the written exam often struggle.',
      '**Maths and Reasoning need daily timed practice** to clear the cutoff comfortably.',
      '**Solve the previous year paper** to understand the exact difficulty and question mix.',
    ] },

    { t: 'h2', text: 'Practise with JKSSB Junior Assistant Previous Year Papers' },
    { t: 'p', text: 'On Ministry of Papers you can attempt the **[JKSSB Junior Assistant previous year paper](/pyq/jkssb-junior-assistant-question-paper-2026)** — solved with detailed explanations, free — then use the **[JKSSB Junior Assistant guide](/guide/jkssb-junior-assistant)** for the full syllabus and the **[JKSSB exam hub](/exam/jkssb)** for more papers.' },
  ],
  faqs: [
    { q: 'When is the JKSSB Junior Assistant 2026 exam?', a: 'The JKSSB Junior Assistant 2026 written (OMR) exam is scheduled for 19 April 2026, with the skill (typing) test on 7 July 2026, for 343 vacancies. Confirm on jkssb.nic.in.' },
    { q: 'How many vacancies are in JKSSB Junior Assistant 2026?', a: 'The 2026 recruitment carries 343 Junior Assistant vacancies.' },
    { q: 'What is the JKSSB Junior Assistant selection process?', a: 'An objective (OMR) written test followed by a qualifying typing/skill test. The written test covers J&K GK, General Science, Maths, Reasoning, English and Basic Computer.' },
    { q: 'What is the eligibility for JKSSB Junior Assistant?', a: 'A Bachelor\'s degree from a recognised university with the computer/typing qualification specified, meeting the age and J&K domicile requirements.' },
  ],
  related: [
    { label: 'JKSSB Exam Hub — Solved PYQs', href: '/exam/jkssb' },
    { label: 'JKSSB Junior Assistant Syllabus, Pattern & Weightage Analysis Guide', href: '/guide/jkssb-junior-assistant' },
    { label: 'JKSSB Junior Assistant — Solved Question Paper', href: '/pyq/jkssb-junior-assistant-question-paper-2026' },
  ],
}

export const blogPosts: Record<string, BlogPost> = {
  [ibpsPo.slug]: ibpsPo,
  [sscCgl.slug]: sscCgl,
  [upscCse.slug]: upscCse,
  [neetUg.slug]: neetUg,
  [bpsc.slug]: bpsc,
  [jkpscJkcce.slug]: jkpscJkcce,
  [rssbPatwari.slug]: rssbPatwari,
  [jkssbSi.slug]: jkssbSi,
  [jkssbPatwari.slug]: jkssbPatwari,
  [jkssbJa.slug]: jkssbJa,
}
