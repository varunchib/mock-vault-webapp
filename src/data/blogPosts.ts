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
  title: 'IBPS PO 2026: Notification, Dates, Vacancy & Salary',
  h1: 'IBPS PO 2026: Notification, Eligibility, Salary & Preparation Strategy',
  description:
    'IBPS PO 2026 explained — notification timeline, eligibility, vacancy, salary and job profile, and a stage-by-stage preparation strategy. For the full section-wise syllabus and weightage analysis, see the linked IBPS PO guide.',
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

    { t: 'h2', text: 'IBPS PO Syllabus 2026 — At a Glance' },
    { t: 'p', text: 'The syllabus spans four areas — **Quantitative Aptitude, Reasoning Ability & Computer Aptitude, English Language, and General / Banking Awareness**. Prelims tests the first three; Mains adds Banking & General Awareness plus a Descriptive (letter and essay) paper.' },
    { t: 'p', text: 'For the **complete section-wise topic list — and a weightage analysis showing exactly which sections and topics carry the most marks** — use the **[IBPS PO Syllabus, Pattern & Weightage Analysis guide](/guide/ibps-po)**. It is the definitive reference and stays in sync with the official pattern, so this post keeps to the overview and links there for the detail.' },

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

const sscCgl: BlogPost = {
  slug: 'ssc-cgl-exam',
  title: 'SSC CGL 2026: Notification, Exam Dates, Vacancy & Salary',
  h1: 'SSC CGL 2026: Notification, Exam Dates, Vacancy, Salary & How to Prepare',
  description:
    'SSC CGL 2026 explained — 12,256 vacancies, Tier 1 & Tier 2 exam dates, eligibility, salary by post, and a stage-by-stage preparation strategy. Full syllabus and weightage in the linked SSC CGL guide.',
  excerpt:
    'The Staff Selection Commission has released the SSC CGL 2026 notification for 12,256 Group B and Group C vacancies. Here is the complete picture — dates, eligibility, the new sectional-timing pattern, salary, posts, and a realistic preparation plan built on previous year papers.',
  category: 'SSC Exams',
  tags: ['SSC CGL', 'SSC', 'Combined Graduate Level', 'Government Jobs', 'SSC CGL 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-07-27',
  readMinutes: 11,
  blocks: [
    { t: 'p', text: 'The **SSC CGL (Combined Graduate Level)** examination is the largest gateway to Group B and Group C posts in central government ministries and departments. Every year lakhs of graduates compete for roles like **Income Tax Inspector, Assistant Section Officer, Auditor and Sub-Inspector** — jobs prized for their **stability, respectable pay and central-government posting**. This guide covers everything about **SSC CGL 2026**: the notification, exam dates, vacancies, eligibility, the revised exam pattern, salary and a preparation strategy you can actually follow.' },

    { t: 'h2', text: 'What is SSC CGL?' },
    { t: 'p', text: 'SSC CGL is a national-level exam conducted by the **Staff Selection Commission** to recruit graduates into Group B and Group C posts across central government organisations. A single exam feeds dozens of posts spread over four departments and ministries, and the post you get depends on your rank and post preference. Selection runs through **Tier 1 (Prelims)** and **Tier 2 (Mains)** computer-based tests.' },

    { t: 'h2', text: 'SSC CGL 2026 Notification & Important Dates' },
    { t: 'p', text: 'The **SSC CGL 2026 notification** was released on **21 May 2026** on the official website **[ssc.gov.in](https://ssc.gov.in)**. The Tier 1 exam is scheduled for the August–September 2026 window, with Tier 2 following in December 2026. Always confirm the exact dates against the official notification and your admit card.' },
    { t: 'table', caption: 'SSC CGL 2026 schedule (per the official notification — confirm on ssc.gov.in)', headers: ['Event', 'Date'], rows: [
      ['Notification released', '21 May 2026'],
      ['Online application window', '21 May – 22 June 2026'],
      ['Application correction window', '29 June – 01 July 2026'],
      ['Tier 1 (Prelims) exam', 'August – September 2026'],
      ['Tier 2 (Mains) exam', 'December 2026'],
    ] },
    { t: 'callout', title: 'New in 2026', text: 'SSC has introduced sectional timing in both Tier 1 and Tier 2 — you can no longer pour all your time into one section. Practise each section against the clock so the new format does not cost you attempts.' },

    { t: 'h2', text: 'SSC CGL 2026 Vacancies' },
    { t: 'p', text: 'The 2026 cycle was notified for **12,256 vacancies** across Group B and Group C posts, distributed among participating ministries and reserved categories (SC, ST, OBC, EWS, PwBD) as per government norms. Vacancies are sometimes revised upward later in the cycle.' },

    { t: 'h2', text: 'SSC CGL Eligibility 2026' },
    { t: 'h3', text: 'Age Limit' },
    { t: 'p', text: 'The age band is generally **18 to 32 years**, but it varies by post — some posts cap at 27 or 30. Category-wise upper-age relaxation applies (SC/ST +5, OBC +3, PwBD +10, and more as specified in the notification). Check the exact age window for the post you are targeting.' },
    { t: 'h3', text: 'Educational Qualification' },
    { t: 'p', text: 'A **Bachelor\'s degree** in any discipline from a recognised university is the baseline. A few posts have specific requirements — for example, Junior Statistical Officer needs a certain level of Mathematics, and some accounts posts favour a Commerce background.' },

    { t: 'h2', text: 'SSC CGL Selection Process' },
    { t: 'ol', items: [
      '**Tier 1 (Prelims)** — a 100-question objective test (200 marks) that screens candidates for Tier 2. It is qualifying in nature but speed and accuracy here decide who moves on comfortably.',
      '**Tier 2 (Mains)** — the scoring stage, now with multiple papers (including a paper for JSO/AAO posts) and sectional timing. Your Tier 2 marks essentially decide your final rank and post.',
      '**Document Verification & Medical** — as applicable to the allotted post.',
    ] },

    { t: 'h2', text: 'SSC CGL Exam Pattern 2026 (Tier 1)' },
    { t: 'table', caption: 'SSC CGL Tier 1 — 100 questions, 200 marks, 60 minutes', headers: ['Section', 'Questions', 'Marks'], rows: [
      ['General Intelligence & Reasoning', '25', '50'],
      ['General Awareness', '25', '50'],
      ['Quantitative Aptitude', '25', '50'],
      ['English Comprehension', '25', '50'],
      ['Total', '100', '200'],
    ] },
    { t: 'p', text: 'There is **negative marking of 0.50 marks** per wrong answer in Tier 1. For the **full section-wise syllabus and a weightage analysis of where the marks come from**, use the **[SSC CGL Syllabus, Pattern & Weightage Analysis guide](/guide/ssc-cgl)**.' },

    { t: 'h2', text: 'SSC CGL Salary 2026 & Posts' },
    { t: 'p', text: 'Depending on the post and pay level, the **in-hand salary ranges from roughly ₹25,500 to ₹1,51,100 per month** (basic pay across Pay Levels 4–8, plus DA, HRA and allowances). The most sought-after posts — **Income Tax Inspector, Assistant Section Officer (CSS), and Inspector (CBIC/CBI)** — sit at the higher pay levels with strong career growth.' },

    { t: 'h2', text: 'SSC CGL Preparation Strategy 2026' },
    { t: 'ul', items: [
      '**Tier 1 is a speed test.** Aim for ~90 seconds per question. Reasoning and English are the fastest sections — bank marks there so you can spend more time on Quant and GA.',
      '**General Awareness is the highest return-per-hour section** in Tier 1 — it needs no calculation. Build static GK plus the last 6 months of current affairs.',
      '**Tier 2 decides your rank**, so once you clear Tier 1, shift to advanced Quant and English and full-length Tier 2 mocks with sectional timing.',
      '**Previous year papers are non-negotiable** — they reveal the exact difficulty and repeated question patterns.',
    ] },

    { t: 'h2', text: 'Practise with SSC CGL Previous Year Papers' },
    { t: 'p', text: 'The fastest way to convert study into marks is to attempt the **real exam**. On Ministry of Papers you can solve **[SSC CGL previous year papers](/exam/ssc-cgl)** — every question with the correct answer and a detailed explanation, free. Start with the **[SSC CGL 2025 Tier 1 solved paper](/pyq/ssc-cgl-2025-sep12-shift1)** to feel the real difficulty, then use the **[SSC CGL guide](/guide/ssc-cgl)** for the complete syllabus and weightage.' },
  ],
  faqs: [
    { q: 'When is the SSC CGL 2026 exam?', a: 'The SSC CGL 2026 notification (released 21 May 2026) schedules Tier 1 for the August–September 2026 window and Tier 2 in December 2026. Confirm exact dates on ssc.gov.in and your admit card.' },
    { q: 'How many vacancies are there in SSC CGL 2026?', a: 'The 2026 cycle was notified for 12,256 Group B and Group C vacancies, subject to later revision.' },
    { q: 'What is the SSC CGL eligibility?', a: 'A Bachelor\'s degree in any discipline from a recognised university, with an age generally between 18 and 32 years (varying by post, with category relaxations).' },
    { q: 'Is there negative marking in SSC CGL?', a: 'Yes — 0.50 marks are deducted per wrong answer in Tier 1, and 0.25 or 0.50 in Tier 2 papers depending on the paper.' },
    { q: 'What is the salary after SSC CGL?', a: 'Depending on the post and pay level, the salary ranges from roughly ₹25,500 to ₹1,51,100 per month including allowances. Top posts like Income Tax Inspector and Assistant Section Officer are at higher levels.' },
    { q: 'What has changed in the SSC CGL 2026 pattern?', a: 'The biggest change is sectional timing in both Tier 1 and Tier 2, so time cannot be shifted between sections — making time management per section critical.' },
  ],
  related: [
    { label: 'SSC CGL Exam Hub — Solved PYQs', href: '/exam/ssc-cgl' },
    { label: 'SSC CGL Syllabus, Pattern & Weightage Analysis Guide', href: '/guide/ssc-cgl' },
    { label: 'SSC CGL 2025 Tier 1 — Solved Paper', href: '/pyq/ssc-cgl-2025-sep12-shift1' },
  ],
}

const upscCse: BlogPost = {
  slug: 'upsc-cse-exam',
  title: 'UPSC CSE 2026: Notification, Exam Dates & Vacancy',
  h1: 'UPSC CSE 2026: Notification, Exam Dates, Eligibility & How to Prepare',
  description:
    'UPSC Civil Services 2026 explained — 933 vacancies, Prelims on 24 May and Mains from 21 August, eligibility, attempts, the three-stage pattern, and a realistic preparation strategy. Full syllabus in the linked UPSC guide.',
  excerpt:
    'The UPSC Civil Services Examination 2026 notification is out with 933 vacancies for IAS, IPS, IFS and allied services. Here is the complete picture — Prelims and Mains dates, eligibility and attempts, the three-stage pattern, and how to build a preparation plan around previous year papers.',
  category: 'UPSC & State PSC',
  tags: ['UPSC CSE', 'UPSC', 'Civil Services', 'IAS', 'IPS', 'UPSC 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-07-27',
  readMinutes: 12,
  blocks: [
    { t: 'p', text: 'The **UPSC Civil Services Examination (CSE)** is India\'s most competitive exam — the route to the **IAS, IPS, IFS** and other Group A and Group B central services. Lakhs apply each year for a few hundred posts, drawn by the responsibility, reach and prestige of a career in the civil services. This guide covers **UPSC CSE 2026** end to end: the notification, Prelims and Mains dates, eligibility and attempts, the three-stage pattern, and a preparation strategy grounded in previous year papers.' },

    { t: 'h2', text: 'What is the UPSC Civil Services Exam?' },
    { t: 'p', text: 'The **Union Public Service Commission (UPSC)** conducts the CSE annually to recruit officers for around two dozen services. The selection is a **three-stage process** — a screening **Preliminary** test, a written **Mains**, and a **Personality Test (Interview)** — spread across nearly a year. The same exam feeds every service; your service and cadre depend on your final rank and preferences.' },

    { t: 'h2', text: 'UPSC CSE 2026 Notification & Important Dates' },
    { t: 'p', text: 'The **UPSC CSE 2026 notification** was released on **14 January 2026**, with applications opening in early February. The **Prelims is on 24 May 2026** and the **Mains begins on 21 August 2026** (spanning 21, 22, 23, 29 and 30 August). Verify all dates on the official site **[upsc.gov.in](https://upsc.gov.in)**.' },
    { t: 'table', caption: 'UPSC CSE 2026 schedule (per the official notification — confirm on upsc.gov.in)', headers: ['Event', 'Date'], rows: [
      ['Notification released', '14 January 2026'],
      ['Application window', 'February 2026'],
      ['Preliminary Examination', '24 May 2026'],
      ['Mains Examination', '21, 22, 23, 29 & 30 August 2026'],
      ['Personality Test (Interview)', 'Early 2027'],
    ] },

    { t: 'h2', text: 'UPSC CSE 2026 Vacancy' },
    { t: 'p', text: 'The 2026 notification announced **933 vacancies** across the participating services, including reserved-category and PwBD posts as per norms. The final number is confirmed in the notification and occasionally revised.' },

    { t: 'h2', text: 'UPSC CSE Eligibility & Attempts' },
    { t: 'h3', text: 'Age Limit' },
    { t: 'p', text: 'A candidate must be **21 to 32 years** as on 1 August of the exam year, with upper-age relaxation for reserved categories (OBC +3, SC/ST +5, PwBD +10, and more as specified).' },
    { t: 'h3', text: 'Educational Qualification & Attempts' },
    { t: 'p', text: 'A **graduate degree** in any discipline from a recognised university is required. Number of attempts is capped by category — **6 for General, 9 for OBC, and unlimited (up to the age limit) for SC/ST** — with additional relaxations for PwBD candidates.' },

    { t: 'h2', text: 'UPSC CSE Exam Pattern' },
    { t: 'p', text: 'Prelims has two objective papers on the same day: **GS Paper I** (merit-deciding) and **CSAT Paper II** (qualifying, minimum 33%). Mains has nine descriptive papers, of which seven count for merit. There is **negative marking of one-third** in the Prelims objective papers.' },
    { t: 'table', caption: 'UPSC CSE Prelims pattern', headers: ['Paper', 'Questions', 'Marks', 'Nature'], rows: [
      ['GS Paper I', '100', '200', 'Merit-ranking'],
      ['CSAT Paper II', '80', '200', 'Qualifying (33%)'],
    ] },
    { t: 'p', text: 'For the **complete Prelims and Mains syllabus, GS and CSAT breakdown, and a weightage analysis**, use the **[UPSC CSE Syllabus, Pattern & Weightage Analysis guide](/guide/upsc-cse)**.' },

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
  title: 'NEET UG 2026: Exam Date, Eligibility & How to Prepare',
  h1: 'NEET UG 2026: Exam Date, Eligibility, Pattern & How to Prepare',
  description:
    'NEET UG 2026 explained — exam on 3 May 2026, 720 marks over 180 questions, eligibility, marking scheme, counselling and a subject-wise preparation strategy. Full syllabus in the linked NEET guide.',
  excerpt:
    'NEET UG 2026, conducted by the NTA, is the single entrance test for MBBS, BDS, AYUSH and allied medical courses across India. Here is the complete picture — exam date, eligibility, the 720-mark pattern, marking scheme, and a subject-wise preparation plan built on previous year papers.',
  category: 'Medical Entrance',
  tags: ['NEET UG', 'NEET', 'Medical Entrance', 'MBBS', 'NTA', 'NEET 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-07-27',
  readMinutes: 10,
  blocks: [
    { t: 'p', text: 'The **NEET UG (National Eligibility cum Entrance Test — Undergraduate)** is the single national entrance exam for admission to **MBBS, BDS, BAMS, BHMS and allied medical courses** across India. Conducted by the **National Testing Agency (NTA)**, it is one of the most-taken exams in the country, with over 20 lakh candidates competing for medical seats each year. This guide covers **NEET UG 2026** completely — exam date, eligibility, the marking pattern, and a subject-wise preparation strategy.' },

    { t: 'h2', text: 'What is NEET UG?' },
    { t: 'p', text: 'NEET UG is a **pen-and-paper (OMR) medical entrance test** that decides admission to nearly all MBBS and BDS seats in government and private colleges, plus AYUSH and veterinary courses. A single score is used for **All India Quota and State Quota counselling**, so one exam determines your college and course based on rank, category and preferences.' },

    { t: 'h2', text: 'NEET UG 2026 Exam Date & Important Dates' },
    { t: 'p', text: 'NEET UG 2026 is scheduled for **3 May 2026, from 2:00 PM to 5:00 PM**. The application window ran from **8 February to 11 March 2026**. Confirm all dates and download your admit card from the official site **[neet.nta.nic.in](https://neet.nta.nic.in)**.' },
    { t: 'table', caption: 'NEET UG 2026 schedule (per NTA — confirm on neet.nta.nic.in)', headers: ['Event', 'Date'], rows: [
      ['Application window', '8 February – 11 March 2026'],
      ['Admit card', 'Late April 2026'],
      ['NEET UG 2026 exam', '3 May 2026 (2:00–5:00 PM)'],
      ['Result & counselling', 'June 2026 onward'],
    ] },

    { t: 'h2', text: 'NEET UG 2026 Eligibility' },
    { t: 'ul', items: [
      '**Age:** minimum 17 years as on 31 December 2026.',
      '**Qualification:** Class 12 (or appearing) with **Physics, Chemistry, Biology/Biotechnology and English**.',
      '**Minimum marks in PCB:** 50% for General, 40% for OBC/SC/ST, and 45% for General-PwD (as per norms).',
      '**Nationality:** Indian nationals, NRIs, OCIs, PIOs and foreign nationals are eligible per the prescribed rules.',
    ] },

    { t: 'h2', text: 'NEET UG Exam Pattern & Marking' },
    { t: 'p', text: 'The paper has **180 questions to be answered out of 200**, split across Physics, Chemistry and Biology (Botany + Zoology). Each correct answer earns **+4** and each wrong answer **−1**, for a total of **720 marks** in **3 hours**.' },
    { t: 'table', caption: 'NEET UG pattern — 720 marks, 3 hours', headers: ['Subject', 'Questions (answer)', 'Marks'], rows: [
      ['Physics', '45', '180'],
      ['Chemistry', '45', '180'],
      ['Biology (Botany + Zoology)', '90', '360'],
      ['Total', '180', '720'],
    ] },
    { t: 'p', text: 'For the **complete chapter-wise syllabus and a weightage analysis of high-yield topics**, use the **[NEET UG Syllabus, Pattern & Weightage Analysis guide](/guide/neet-ug)**.' },

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
  title: 'BPSC 2026: 71st & 72nd CCE Notification, Dates & Vacancy',
  h1: 'BPSC CCE 2026: Notification, Exam Dates, Eligibility, Salary & Preparation',
  description:
    'BPSC CCE 2026 explained — 71st CCE Mains in April and 72nd CCE with Prelims in July 2026, vacancies, eligibility, the three-stage pattern, salary and a preparation strategy. Full syllabus in the linked BPSC guide.',
  excerpt:
    'The Bihar Public Service Commission conducts the Combined Competitive Examination (CCE) for prestigious state posts like SDM, DSP and BDO. Here is the complete picture of the current 71st and 72nd CCE cycles — dates, vacancies, eligibility, the exam pattern, salary and how to prepare with previous year papers.',
  category: 'UPSC & State PSC',
  tags: ['BPSC', 'Bihar PSC', 'BPSC CCE', 'State PSC', 'BPSC 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-07-27',
  readMinutes: 11,
  blocks: [
    { t: 'p', text: 'The **BPSC Combined Competitive Examination (CCE)** is the Bihar Public Service Commission\'s flagship exam for **Group A and Group B state services** — coveted posts like **SDM (Deputy Collector), DSP, and Block Development Officer (BDO)**. It draws lakhs of aspirants across Bihar for its authority, reach and job security. This guide covers the current **71st and 72nd CCE** cycles: notifications, exam dates, vacancies, eligibility, the three-stage pattern, salary and a preparation plan.' },

    { t: 'h2', text: 'What is the BPSC CCE?' },
    { t: 'p', text: 'The **BPSC CCE** recruits officers for the Bihar state civil services through a **three-stage process** — a screening **Preliminary** exam, a written **Mains**, and an **Interview**. A single exam feeds many posts; the service you get depends on your final rank and post preferences. BPSC runs the exam in numbered cycles (e.g., 70th, 71st, 72nd CCE).' },

    { t: 'h2', text: 'BPSC 71st & 72nd CCE 2026 — Important Dates' },
    { t: 'p', text: 'Two cycles are active in 2026. The **71st CCE Mains** is scheduled for **25–30 April 2026** (for candidates who cleared the 71st Prelims). The **72nd CCE** notification has released for **1,186 vacancies**, with its **Preliminary exam on 26 July 2026**. Always confirm dates on the official site **[bpsc.bihar.gov.in](https://bpsc.bihar.gov.in)**.' },
    { t: 'table', caption: 'BPSC CCE 2026 schedule (confirm on bpsc.bihar.gov.in)', headers: ['Cycle / Event', 'Date'], rows: [
      ['71st CCE — Mains Examination', '25–30 April 2026'],
      ['72nd CCE — Notification', 'Released (1,186 vacancies)'],
      ['72nd CCE — Preliminary Exam', '26 July 2026'],
      ['72nd CCE — Mains & Interview', 'Later in the cycle'],
    ] },

    { t: 'h2', text: 'BPSC Vacancy 2026' },
    { t: 'p', text: 'The **72nd CCE** was notified for around **1,186 vacancies** across posts, while the earlier **71st CCE** carried well over 1,200 posts. Vacancies span roles such as SDM, DSP, Block Cooperative Officer, and various departmental officers, distributed across categories per Bihar reservation norms.' },

    { t: 'h2', text: 'BPSC Eligibility' },
    { t: 'h3', text: 'Age Limit' },
    { t: 'p', text: 'The minimum age is generally **20–22 years** (post-dependent) and the upper limit is **37 years for General male candidates**, with relaxations: General female and BC/EBC **+3 years (40)**, and SC/ST **+5 years (42)**. Exact limits vary by post.' },
    { t: 'h3', text: 'Educational Qualification' },
    { t: 'p', text: 'A **Bachelor\'s degree** in any discipline from a recognised university is required. Final-year students can generally apply subject to producing proof of qualification at the Mains stage.' },

    { t: 'h2', text: 'BPSC Exam Pattern' },
    { t: 'p', text: 'The **Prelims** is a single objective paper — **General Studies, 150 questions, 150 marks, 2 hours** — and is qualifying. The **Mains** is descriptive (General Hindi qualifying, plus General Studies papers and an optional/essay component depending on the cycle), followed by the **Interview**. From recent cycles, BPSC applies **negative marking of one-third (0.33)** in the Prelims.' },
    { t: 'table', caption: 'BPSC Prelims pattern', headers: ['Paper', 'Questions', 'Marks', 'Duration'], rows: [
      ['General Studies (Objective)', '150', '150', '2 hours'],
    ] },
    { t: 'p', text: 'For the **complete Prelims and Mains syllabus and a weightage analysis**, use the **[BPSC Syllabus, Pattern & Weightage Analysis guide](/guide/bpsc)**.' },

    { t: 'h2', text: 'BPSC Salary & Posts' },
    { t: 'p', text: 'Most BPSC CCE posts fall in **Pay Level 9–10 (7th CPC)** with a pay range of roughly **₹56,100 to ₹1,77,500**, plus DA and allowances. Flagship posts like **SDM and DSP** carry the highest starting pay and the fastest career progression in the state administration.' },

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
  title: 'JKPSC JKCCE 2026: Notification, Eligibility & Vacancy',
  h1: 'JKPSC Combined Competitive Exam (JKCCE): Notification, Pattern & How to Prepare',
  description:
    'JKPSC JKCCE explained — the J&K Combined Competitive Examination for KAS and allied services: three-stage pattern, eligibility, syllabus overview and preparation strategy, with links to solved previous year papers.',
  excerpt:
    'The J&K Public Service Commission conducts the Combined Competitive Examination (JKCCE) for the Kashmir Administrative Service and allied posts. Here is the complete picture — the three-stage pattern, eligibility, syllabus overview and a preparation plan built on previous year papers.',
  category: 'UPSC & State PSC',
  tags: ['JKPSC', 'JKCCE', 'KAS', 'Jammu Kashmir PSC', 'State PSC'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-07-27',
  readMinutes: 9,
  blocks: [
    { t: 'p', text: 'The **JKPSC Combined Competitive Examination (JKCCE)** is the J&K Public Service Commission\'s premier exam for the **Kashmir Administrative Service (KAS)** and allied gazetted posts — the state\'s equivalent of the civil services. This guide covers the JKCCE end to end: the notification, three-stage pattern, eligibility, syllabus overview and a preparation strategy grounded in previous year papers.' },

    { t: 'h2', text: 'What is the JKPSC JKCCE?' },
    { t: 'p', text: 'The **JKCCE** recruits officers for the J&K administrative and allied services through a **three-stage process** — a screening **Preliminary** examination, a written **Mains**, and a **Viva-voce (Interview)**. A single exam feeds several services; the post you get depends on your final rank and preferences. It is conducted by the **Jammu & Kashmir Public Service Commission (JKPSC)**.' },

    { t: 'h2', text: 'JKCCE Notification & Important Dates' },
    { t: 'p', text: 'JKPSC releases the JKCCE notification on its official website **[jkpsc.nic.in](https://jkpsc.nic.in)**, followed by the Preliminary exam, then Mains and the Interview. Because the JKCCE cycle timing varies year to year, always confirm the current notification and dates on the official site.' },

    { t: 'h2', text: 'JKCCE Eligibility' },
    { t: 'ul', items: [
      '**Education:** a **Bachelor\'s degree** in any discipline from a recognised university.',
      '**Age:** generally **21 to 32 years** for the general category, with upper-age relaxation for reserved categories as per J&K rules.',
      '**Domicile:** J&K domicile requirements apply as specified in the notification.',
    ] },

    { t: 'h2', text: 'JKCCE Exam Pattern' },
    { t: 'p', text: 'The **Preliminary** exam is objective (General Studies) and qualifying — it screens candidates for the Mains. The **Mains** is descriptive with General Studies papers and an optional subject, followed by the **Interview**. For the **complete stage-wise syllabus and a weightage analysis**, use the **[JKCCE Syllabus, Pattern & Weightage Analysis guide](/guide/jkpsc)**.' },

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
  title: 'Rajasthan Patwari 2026: Notification, Vacancy & Salary',
  h1: 'Rajasthan Patwari (RSSB) 2026: Notification, Pattern, Salary & How to Prepare',
  description:
    'RSSB Rajasthan Patwari explained — the 2025 cycle (3,705 posts) results and the awaited 2026 notification, eligibility, exam pattern, salary and a preparation strategy, with links to solved previous year papers.',
  excerpt:
    'The Rajasthan Staff Selection Board (RSSB) recruits Patwaris — a coveted revenue-department post. The 2025 cycle filled 3,705 posts; a 2026 notification is awaited. Here is the complete picture — eligibility, exam pattern, salary and how to prepare with previous year papers.',
  category: 'State Government Jobs',
  tags: ['RSSB Patwari', 'Rajasthan Patwari', 'RSMSSB', 'Rajasthan', 'Patwari'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-07-27',
  readMinutes: 9,
  blocks: [
    { t: 'p', text: 'The **Rajasthan Patwari** exam, conducted by the **Rajasthan Staff Selection Board (RSSB, formerly RSMSSB)**, is one of the state\'s most popular recruitment tests — a stable revenue-department post with strong local demand. This guide covers the **RSSB Patwari** exam end to end: the recruitment cycle, eligibility, exam pattern, salary and a preparation strategy built on previous year papers.' },

    { t: 'h2', text: 'RSSB Patwari Recruitment — Latest Cycle & Dates' },
    { t: 'p', text: 'In the **2025 cycle**, RSSB recruited for **3,705 Patwari posts**; the written exam was held on **17 August 2025** across 38 districts for over 6.7 lakh registered candidates, and the **final result was declared on 31 December 2025**. A fresh **2026 notification** is awaited — track it on the official site **[rssb.rajasthan.gov.in](https://rssb.rajasthan.gov.in)**.' },
    { t: 'callout', title: 'Preparing for 2026', text: 'With the 2025 cycle complete, now is the time to prepare for the next notification. The syllabus and pattern rarely change, so the 2025 paper is your best possible practice material.' },

    { t: 'h2', text: 'RSSB Patwari Eligibility' },
    { t: 'ul', items: [
      '**Education:** a **Bachelor\'s degree** in any discipline from a recognised university, plus a basic computer qualification (O-level / COPA / RS-CIT or equivalent) as specified.',
      '**Age:** generally **18 to 40 years**, with category-wise relaxation as per Rajasthan rules.',
    ] },

    { t: 'h2', text: 'RSSB Patwari Exam Pattern' },
    { t: 'p', text: 'The Patwari exam is a single objective paper of **150 questions and 300 marks** (2 marks per question) in **3 hours**, covering General Science & Reasoning, Geography/History/Culture of Rajasthan, Hindi & English, and Basic Computer, with **negative marking of one-third**. For the **complete section-wise syllabus and a weightage analysis**, use the **[RSSB Patwari Syllabus, Pattern & Weightage Analysis guide](/guide/rssb)**.' },

    { t: 'h2', text: 'RSSB Patwari Salary' },
    { t: 'p', text: 'A Rajasthan Patwari is appointed in **Pay Matrix Level 5**, with a starting basic pay around **₹20,800** plus DA, HRA and other allowances — an in-hand salary of roughly **₹28,000–₹35,000 per month** depending on the posting, with a fixed lower pay during the probation period.' },

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
  title: 'JKSSB Sub Inspector 2026: Notification & Vacancy',
  h1: 'JKSSB Sub Inspector 2026: Notification, Pattern, Syllabus & How to Prepare',
  description:
    'JKSSB Sub Inspector explained — the latest recruitment, eligibility, the 100-question exam pattern, syllabus overview and a preparation strategy, with links to solved previous year papers.',
  excerpt:
    'JKSSB recruits Sub Inspectors (Executive) for the J&K Police under the Home Department. Here is the complete picture of the latest recruitment — eligibility, the revised exam pattern, syllabus overview and how to prepare with previous year papers.',
  category: 'State Government Jobs',
  tags: ['JKSSB', 'Sub Inspector', 'JKPSI', 'J&K Police', 'Jammu Kashmir'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-07-27',
  readMinutes: 9,
  blocks: [
    { t: 'p', text: 'The **JKSSB Sub Inspector (Executive)** exam recruits officers for the **Jammu & Kashmir Police** under the Home Department — a uniformed, authority-carrying post that draws heavy competition across J&K. This guide covers the exam end to end: the latest recruitment, eligibility, the revised exam pattern, syllabus overview and a preparation strategy built on previous year papers.' },

    { t: 'h2', text: 'JKSSB Sub Inspector Recruitment & Dates' },
    { t: 'p', text: 'The latest **JKSSB Sub Inspector recruitment (2026)** was notified for **104 posts**, with the application window open from **4 February to 12 March 2026**. An earlier cycle under Advertisement 02/2024 carried a larger number of vacancies. Because dates and vacancy counts change per notification, always confirm on the official site **[jkssb.nic.in](https://jkssb.nic.in)**.' },

    { t: 'h2', text: 'JKSSB Sub Inspector Eligibility' },
    { t: 'ul', items: [
      '**Education:** a **Bachelor\'s degree** in any discipline from a recognised university.',
      '**Age:** as specified in the notification (with category-wise relaxations per J&K rules).',
      '**Physical standards:** height, chest and physical endurance/efficiency test requirements apply, as detailed in the notification.',
    ] },

    { t: 'h2', text: 'JKSSB Sub Inspector Exam Pattern' },
    { t: 'p', text: 'The written examination consists of **100 objective MCQs for 200 marks** (2 marks each) in **120 minutes**, with **negative marking of 0.5** per wrong answer. The 2024 syllabus revision replaced the earlier Law section with **Computer Proficiency** and a dedicated **Mathematical Abilities** section, alongside Reasoning, General Awareness, Quantitative Aptitude and English. For the **complete section-wise syllabus and a weightage analysis**, use the **[JKSSB Sub Inspector Syllabus, Pattern & Weightage Analysis guide](/guide/jkpsi)**.' },

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
  title: 'JKSSB Patwari 2026: Notification, Eligibility & Vacancy',
  h1: 'JKSSB Patwari 2026: Notification, Pattern, Syllabus & How to Prepare',
  description:
    'JKSSB Patwari explained — eligibility, the exam pattern, syllabus overview and a preparation strategy for the J&K revenue-department post, with links to solved previous year papers.',
  excerpt:
    'JKSSB recruits Patwaris for the J&K revenue department — a stable, locally-posted government job. Here is the complete picture — eligibility, the exam pattern, syllabus overview and how to prepare with previous year papers.',
  category: 'State Government Jobs',
  tags: ['JKSSB', 'JKSSB Patwari', 'Patwari', 'Jammu Kashmir', 'Revenue Department'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-07-27',
  readMinutes: 8,
  blocks: [
    { t: 'p', text: 'The **JKSSB Patwari** exam recruits Patwaris for the **Jammu & Kashmir revenue department** — a stable, locally-posted government job in high demand across the union territory. This guide covers eligibility, the exam pattern, syllabus overview and a preparation strategy built on previous year papers.' },

    { t: 'h2', text: 'JKSSB Patwari Recruitment & Dates' },
    { t: 'p', text: 'JKSSB conducts Patwari recruitment as vacancies arise, listed on its annual exam calendar. As per the **2026 calendar**, the Patwari exam is scheduled but specific dates are confirmed closer to the exam — always check the official site **[jkssb.nic.in](https://jkssb.nic.in)** for the current notification.' },

    { t: 'h2', text: 'JKSSB Patwari Eligibility' },
    { t: 'ul', items: [
      '**Education:** a **Bachelor\'s degree** from a recognised university, with a basic computer qualification as specified.',
      '**Age & Domicile:** as per the notification and J&K domicile rules, with category-wise age relaxations.',
    ] },

    { t: 'h2', text: 'JKSSB Patwari Exam Pattern' },
    { t: 'p', text: 'The written exam is objective (OMR), typically **120 questions**, covering General Knowledge (with J&K focus), General Science, Mathematics, Reasoning, English, and Basic Computer, with negative marking as specified. For the **complete section-wise syllabus and a weightage analysis**, use the **[JKSSB Patwari Syllabus, Pattern & Weightage Analysis guide](/guide/jkssb-patwari)**.' },

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
  title: 'JKSSB Junior Assistant 2026: 343 Vacancies & Exam Date',
  h1: 'JKSSB Junior Assistant 2026: Vacancy, Exam Date, Pattern & How to Prepare',
  description:
    'JKSSB Junior Assistant 2026 explained — 343 vacancies, written exam on 19 April 2026 and skill test on 7 July, eligibility, exam pattern and a preparation strategy, with links to solved previous year papers.',
  excerpt:
    'JKSSB recruits Junior Assistants — a clerical J&K government post with a written exam plus a typing skill test. The 2026 cycle carries 343 vacancies with the written exam on 19 April 2026. Here is the complete picture — eligibility, pattern and how to prepare with previous year papers.',
  category: 'State Government Jobs',
  tags: ['JKSSB', 'Junior Assistant', 'Jammu Kashmir', 'Clerical Jobs', 'JKSSB 2026'],
  author: 'Ministry of Papers',
  publishedAt: '2026-07-27',
  updatedAt: '2026-07-27',
  readMinutes: 8,
  blocks: [
    { t: 'p', text: 'The **JKSSB Junior Assistant** exam recruits clerical staff across Jammu & Kashmir government departments — a stable entry-level post that pairs a written exam with a **typing/skill test**. This guide covers the **2026 cycle** end to end: vacancies, exam date, eligibility, pattern and a preparation strategy built on previous year papers.' },

    { t: 'h2', text: 'JKSSB Junior Assistant 2026 — Vacancy & Dates' },
    { t: 'p', text: 'The **2026 recruitment** carries **343 Junior Assistant vacancies**. The **written (OMR) exam is scheduled for 19 April 2026** (revised from an earlier April date), and the **skill test is set for 7 July 2026**. Confirm all dates on the official site **[jkssb.nic.in](https://jkssb.nic.in)**.' },
    { t: 'table', caption: 'JKSSB Junior Assistant 2026 schedule (confirm on jkssb.nic.in)', headers: ['Event', 'Date'], rows: [
      ['Vacancies', '343'],
      ['Written (OMR) exam', '19 April 2026'],
      ['Skill (typing) test', '7 July 2026'],
    ] },

    { t: 'h2', text: 'JKSSB Junior Assistant Eligibility' },
    { t: 'ul', items: [
      '**Education:** a **Bachelor\'s degree** from a recognised university, with the computer/typing qualification specified in the notification.',
      '**Age & Domicile:** as per the notification and J&K domicile rules, with category-wise age relaxations.',
    ] },

    { t: 'h2', text: 'JKSSB Junior Assistant Exam Pattern' },
    { t: 'p', text: 'Selection has two stages: an **objective (OMR) written test** covering General Knowledge (J&K focus), General Science, Mathematics, Reasoning, English and Basic Computer, followed by a qualifying **typing/skill test**. For the **complete section-wise syllabus and a weightage analysis**, use the **[JKSSB Junior Assistant Syllabus, Pattern & Weightage Analysis guide](/guide/jkssb-junior-assistant)**.' },

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
