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
  title: 'IBPS PO 2026: Notification, Exam Date, Eligibility, Syllabus, Salary & Preparation',
  h1: 'IBPS PO 2026: Complete Guide to Notification, Exam Pattern, Syllabus, Salary & Preparation',
  description:
    'IBPS PO 2026 complete guide — notification date, eligibility, vacancy, exam pattern for Prelims & Mains, full syllabus, salary, job profile and a proven preparation strategy.',
  excerpt:
    'Everything you need to crack IBPS PO 2026 in one place — the notification timeline, eligibility, exam pattern, section-wise syllabus, salary and job profile, and a stage-by-stage preparation plan built around previous year papers.',
  category: 'Banking Exams',
  tags: ['IBPS PO', 'Bank PO', 'Banking Exams', 'IBPS', 'Probationary Officer'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-22',
  updatedAt: '2026-07-22',
  readMinutes: 12,
  blocks: [
    { t: 'p', text: 'The **IBPS PO (Probationary Officer)** exam is one of the most sought-after banking recruitment tests in India, offering a direct route to an officer-cadre job in the country\'s leading public sector banks. Every year lakhs of graduates compete for a few thousand posts, drawn by the **job security, respectable salary, and fast career growth** that a bank PO role offers. This complete guide covers everything about **IBPS PO 2026** — the notification timeline, eligibility, exam pattern, detailed syllabus, salary, job profile, and a realistic preparation strategy — so you can plan your attempt with clarity.' },

    { t: 'h2', text: 'What is IBPS PO?' },
    { t: 'p', text: 'IBPS PO is a national-level recruitment examination conducted by the **Institute of Banking Personnel Selection (IBPS)** to select **Probationary Officers** (also called Management Trainees) for participating **public sector and regional banks** — that is, every major government bank **except the State Bank of India**, which recruits separately through SBI PO. The recruitment runs under the **Common Recruitment Process (CRP PO/MT)**, so a single exam feeds officer vacancies across all participating banks.' },
    { t: 'p', text: 'A Probationary Officer is an **entry-level bank officer** who, after a probation period of usually one to two years, is confirmed as an **Assistant Manager (Scale I)**. The role is a gateway to a long banking career with clear promotional milestones.' },

    { t: 'h2', text: 'IBPS PO 2026 Notification & Important Dates' },
    { t: 'p', text: 'IBPS follows a fixed annual calendar and typically releases the **IBPS PO notification around August**, with the Preliminary exam in **October–November** and the Main exam in **November–December**, followed by interviews early the next year. The exact **IBPS PO 2026 dates** are confirmed in the official notification published on **[ibps.in](https://www.ibps.in)** and the annual IBPS exam calendar. The indicative schedule below is based on the recurring cycle — always verify against the official notification.' },
    { t: 'table', caption: 'IBPS PO 2026 tentative schedule (confirm on the official notification)', headers: ['Event', 'Tentative Period'], rows: [
      ['Official notification released', 'August 2026'],
      ['Online application window', 'August–September 2026'],
      ['Prelims admit card', 'October 2026'],
      ['Preliminary exam', 'October–November 2026'],
      ['Prelims result', 'November 2026'],
      ['Main exam', 'November–December 2026'],
      ['Interview', 'January–February 2027'],
      ['Provisional allotment', 'April 2027'],
    ] },
    { t: 'callout', title: 'Set an alert', text: 'Bookmark the official IBPS website and check the annual calendar in advance. Applications are open for a short window only, so keep your documents, photo and signature scans ready before the notification drops.' },

    { t: 'h2', text: 'IBPS PO 2026 Vacancy' },
    { t: 'p', text: 'The number of **IBPS PO vacancies** is announced in the notification and varies each year with the hiring needs of participating banks — recent cycles have ranged from around **3,000 to over 6,000 posts**. Vacancies are distributed across banks and reserved categories (SC, ST, OBC, EWS, PwBD) as per government norms, and additional posts are sometimes added later in the cycle.' },

    { t: 'h2', text: 'IBPS PO Eligibility Criteria 2026' },
    { t: 'p', text: 'Before applying, make sure you meet the **age, education and nationality** requirements as on the cut-off date specified in the notification.' },
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

    { t: 'h2', text: 'IBPS PO Selection Process' },
    { t: 'p', text: 'The selection process has **three stages**, and you must clear each to move to the next:' },
    { t: 'ol', items: [
      '**Preliminary Examination** — an online objective screening test (qualifying in nature).',
      '**Main Examination** — an online objective test plus a descriptive (English) paper; marks count towards the final merit.',
      '**Interview** — conducted by the participating banks / nodal bank, carrying 100 marks.',
    ] },
    { t: 'p', text: 'The **final merit list** is prepared from the **Main exam and Interview marks combined in an 80:20 ratio** — the Prelims score is only for screening and does not count in the final selection.' },

    { t: 'h2', text: 'IBPS PO Exam Pattern 2026' },
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

    { t: 'h2', text: 'IBPS PO Syllabus 2026' },
    { t: 'p', text: 'The syllabus spans four broad areas. Here are the most important topics for each — cover these thoroughly and practise them under timed conditions.' },
    { t: 'h3', text: 'Quantitative Aptitude / Data Analysis & Interpretation' },
    { t: 'ul', items: [
      'Number Series, Simplification & Approximation, Quadratic Equations',
      'Percentage, Ratio & Proportion, Averages, Ages',
      'Profit & Loss, Simple & Compound Interest, Partnership',
      'Time, Speed & Distance; Time & Work; Pipes & Cisterns',
      'Mixtures & Alligation, Permutation, Combination & Probability',
      'Mensuration; Data Interpretation — tables, bar/line graphs, pie charts, caselets and missing DI',
    ] },
    { t: 'h3', text: 'Reasoning Ability & Computer Aptitude' },
    { t: 'ul', items: [
      'Puzzles & Seating Arrangement (linear, circular, floor, box, scheduling)',
      'Syllogism, Blood Relations, Direction Sense, Order & Ranking',
      'Coding-Decoding, Inequality, Input-Output, Data Sufficiency',
      'Logical Reasoning — statement & assumption, cause & effect, course of action',
      'Computer Aptitude — fundamentals, hardware/software, MS Office, internet, networking, security',
    ] },
    { t: 'h3', text: 'English Language' },
    { t: 'ul', items: [
      'Reading Comprehension (including inference and vocabulary in context)',
      'Cloze Test, Error Spotting, Sentence Improvement, Para Jumbles',
      'Fillers (single & double), Word Usage / Vocabulary, Sentence Connectors',
      'Descriptive: Letter Writing (formal/informal) and Essay Writing',
    ] },
    { t: 'h3', text: 'General / Economy / Banking Awareness' },
    { t: 'ul', items: [
      'Current Affairs of the last 4–6 months (national, international, awards, sports, appointments)',
      'Banking & Financial Awareness — RBI, monetary policy, banking terms, types of accounts and cards',
      'Static GK — capitals, currencies, important days, headquarters of financial organisations',
      'Indian Economy — budget, schemes, financial institutions, money market and capital market basics',
    ] },

    { t: 'h2', text: 'IBPS PO Salary 2026 & Job Profile' },
    { t: 'p', text: 'A big reason IBPS PO is so popular is the attractive pay and perks. An IBPS PO joins at the **Junior Management Grade Scale-I (Assistant Manager)** with a **basic pay of around ₹48,480** under the revised scale. Including **Dearness Allowance (DA), House Rent Allowance (HRA), City Compensatory Allowance (CCA)** and other benefits, the **gross monthly salary works out to roughly ₹57,000–₹64,000**, varying with the posting city.' },
    { t: 'p', text: 'Beyond the pay, benefits typically include **medical facilities, leased accommodation, pension/NPS, and concessional loans**. The role also offers a clear **promotion ladder**: Scale I (Assistant Manager) → Scale II (Manager) → Scale III (Senior Manager) → and further up to Chief Manager, AGM, DGM and General Manager for high performers.' },
    { t: 'p', text: 'The **day-to-day job profile** of a PO includes customer service and relationship management, processing loans and advances, handling cash and clearing, cross-selling banking products, and general branch administration. It is a **generalist officer role** that builds a strong foundation across banking operations.' },

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

export const blogPosts: Record<string, BlogPost> = {
  [ibpsPo.slug]: ibpsPo,
}
