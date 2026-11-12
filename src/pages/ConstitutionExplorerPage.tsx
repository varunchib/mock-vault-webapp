import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import {
  Search,
  Flame,
  Zap,
  Bookmark,
  BookOpen,
  Filter,
  HelpCircle,
  Sparkles,
  ChevronRight,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Award,
} from 'lucide-react'
import {
  ALL_CONSTITUTION_ARTICLES,
  CONSTITUTION_PARTS,
  type ConstitutionArticleData,
  type ExamFrequency,
} from '../data/constitutionArticles'

export type ConstitutionalAmendment = {
  amendment: string
  year: number
  title: string
  significance: string
  examNote: string
}

export type ConstitutionalSchedule = {
  schedule: string
  subject: string
  details: string
  articles: string
}

const KEY_AMENDMENTS: ConstitutionalAmendment[] = [
  {
    amendment: '1st Amendment Act, 1951',
    year: 1951,
    title: 'Land Reforms & Ninth Schedule',
    significance: 'Added the Ninth Schedule and Article 31B to protect land reform laws from judicial review on Fundamental Rights grounds. Placed reasonable restrictions on free speech under Article 19(2).',
    examNote: 'Enacted under provisional Parliament before the first Lok Sabha elections. Landmark judgment: Shankari Prasad (1951).',
  },
  {
    amendment: '7th Amendment Act, 1956',
    year: 1956,
    title: 'States Reorganisation Act Implementation',
    significance: 'Abolished the four-fold classification of States (Part A, B, C, D) and reorganized India into 14 States and 6 Union Territories. Introduced common High Courts for two or more states.',
    examNote: 'Based on the recommendations of the Fazal Ali Commission (State Reorganisation Commission 1953).',
  },
  {
    amendment: '42nd Amendment Act, 1976',
    year: 1976,
    title: 'The "Mini-Constitution"',
    significance: 'Added words "Socialist, Secular, Integrity" to Preamble. Added Part IVA (Fundamental Duties, Art 51A). Added Part XIVA (Tribunals). Transferred 5 subjects from State List to Concurrent List (Education, Forests, Weights & Measures, Protection of Wild Animals/Birds, Administration of Justice).',
    examNote: 'Enacted during Internal Emergency under Indira Gandhi on recommendations of the Swaran Singh Committee. Most heavily tested amendment across UPSC & State PSCs.',
  },
  {
    amendment: '44th Amendment Act, 1978',
    year: 1978,
    title: 'Restoration of Democratic Safeguards',
    significance: 'Replaced "internal disturbance" with "armed rebellion" in Art 352. Removed Right to Property (Art 19(1)(f) and Art 31) from Fundamental Rights and made it a constitutional legal right under Art 300A. Mandated that Articles 20 and 21 cannot be suspended during National Emergency.',
    examNote: 'Enacted by Janata Party government under Morarji Desai to prevent executive abuse.',
  },
  {
    amendment: '52nd Amendment Act, 1985',
    year: 1985,
    title: 'Anti-Defection Law (10th Schedule)',
    significance: 'Added the 10th Schedule to disqualify MPs and MLAs on grounds of defection from their political party. Presiding Officer (Speaker/Chairman) given final decision-making power.',
    examNote: 'Subject to judicial review post Kihoto Hollohan case (1992). Originally permitted split if 1/3 members defected; split exception deleted by 91st Amendment (2003).',
  },
  {
    amendment: '61st Amendment Act, 1988',
    year: 1988,
    title: 'Lowering Voting Age from 21 to 18 Years',
    significance: 'Amended Article 326 of the Constitution to lower the minimum voting age for Lok Sabha and State Legislative Assembly elections from 21 years to 18 years.',
    examNote: 'Came into force in March 1989. Led to the expansion of Election Commission of India into a multi-member body.',
  },
  {
    amendment: '73rd & 74th Amendment Acts, 1992',
    year: 1992,
    title: 'Panchayati Raj & Municipalities',
    significance: 'Gave constitutional status to rural (73rd) and urban (74th) local self-governments. Added Part IX & 11th Schedule (29 subjects), and Part IXA & 12th Schedule (18 subjects). Mandated 33% reservation for women and set up State Finance Commissions & State Election Commissions.',
    examNote: 'Landmark step for democratic decentralization; 24th April celebrated as National Panchayati Raj Day.',
  },
  {
    amendment: '86th Amendment Act, 2002',
    year: 2002,
    title: 'Right to Education as Fundamental Right',
    significance: 'Inserted Article 21A (free & compulsory education for children 6-14). Substituted DPSP Article 45 (early childhood care). Added 11th Fundamental Duty Article 51A(k).',
    examNote: 'Operated through the Right to Education (RTE) Act, 2009. Top-tier favorite of UPSC & SSC examiners.',
  },
  {
    amendment: '91st Amendment Act, 2003',
    year: 2003,
    title: 'Limitation on Council of Ministers & Anti-Defection',
    significance: 'Capped the size of the Union and State Council of Ministers to a maximum of 15% of the total strength of Lok Sabha or State Assembly (minimum 12 ministers for States). Removed "split" defense from 10th Schedule.',
    examNote: 'Delhi is an exception: Delhi Council of Ministers is capped at 10% under Article 239AA.',
  },
  {
    amendment: '101st Amendment Act, 2016',
    year: 2016,
    title: 'Goods and Services Tax (GST)',
    significance: 'Introduced nationwide unified indirect tax (GST). Inserted Article 246A (concurrent power to levy GST) and Article 279A (GST Council headed by Union Finance Minister).',
    examNote: 'Required Special Majority + 50% State ratification under Article 368.',
  },
  {
    amendment: '102nd Amendment Act, 2018',
    year: 2018,
    title: 'Constitutional Status to NCBC',
    significance: 'Gave constitutional status to the National Commission for Backward Classes (NCBC) by inserting Article 338B and Article 342A, on par with NCSC (Art 338) and NCST (Art 338A).',
    examNote: 'Relieved the Statutory NCBC Act 1993 and transferred jurisdiction to a constitutional body.',
  },
  {
    amendment: '103rd Amendment Act, 2019',
    year: 2019,
    title: '10% EWS Reservation',
    significance: 'Provided up to 10% reservation for Economically Weaker Sections (EWS) of citizens in educational institutions and public employment by amending Articles 15(6) and 16(6).',
    examNote: 'Upheld as constitutional and not violating Basic Structure by Supreme Court in Janhit Abhiyan v. Union of India (2022).',
  },
  {
    amendment: '104th Amendment Act, 2019',
    year: 2019,
    title: 'SC/ST Seats Extension & Discontinuation of Anglo-Indian Nomination',
    significance: 'Extended reservation of seats for SCs and STs in Lok Sabha and State Assemblies for another 10 years (until 2030) under Article 334. Discontinued the nomination of 2 Anglo-Indian members to Lok Sabha and State Assemblies.',
    examNote: 'Articles 331 and 333 effectively ceased to operate for Anglo-Indian nominations.',
  },
  {
    amendment: '105th Amendment Act, 2021',
    year: 2021,
    title: 'Restoration of States’ Power to Specify SEBCs',
    significance: 'Restored the power of State Governments and Union Territories to identify and notify their own Socially and Educationally Backward Classes (SEBCs/OBCs).',
    examNote: 'Clarified the scope of Article 342A following the Supreme Court judgment in the Maratha Reservation case (Jaishri Laxmanrao Patil).',
  },
  {
    amendment: '106th Amendment Act, 2023',
    year: 2023,
    title: 'Nari Shakti Vandan Adhiniyam (Women Reservation)',
    significance: 'Provides 33% (one-third) reservation for women in Lok Sabha, State Legislative Assemblies, and National Capital Territory of Delhi Assembly for 15 years.',
    examNote: 'Inserted Articles 330A, 332A, and 334A. Reservation will take effect after delimitation following the first census conducted after the enactment.',
  },
]

const SCHEDULES_DATABASE: ConstitutionalSchedule[] = [
  { schedule: '1st Schedule', subject: 'States and Union Territories', details: 'Names of the 28 States and 8 Union Territories along with their territorial jurisdictions and boundary extents.', articles: 'Articles 1 and 4' },
  { schedule: '2nd Schedule', subject: 'Salaries, Allowances & Emoluments', details: 'Provisions relating to the President, Governors, Speaker/Deputy Speaker of Lok Sabha & Chairman/Deputy Chairman of Rajya Sabha, Judges of Supreme Court & High Courts, and CAG.', articles: 'Articles 59(3), 65(3), 75(6), 97, 125, 148(3), 158(3), 164(5), 186, 221' },
  { schedule: '3rd Schedule', subject: 'Forms of Oaths and Affirmations', details: 'Oaths of office and secrecy for Union Ministers, MPs, Judges of Supreme Court, CAG, State Ministers, MLAs/MLCs, and Judges of High Courts. (Note: President, Vice-President, and Governor oaths are under Articles 60, 69, and 159 respectively, NOT the 3rd Schedule).', articles: 'Articles 75(4), 84(a), 99, 124(6), 148(2), 164(3), 173(a), 188, 219' },
  { schedule: '4th Schedule', subject: 'Allocation of Seats in Rajya Sabha', details: 'Allocation of seats in the Council of States (Rajya Sabha) to States and Union Territories based on their proportional population figures.', articles: 'Articles 4(1) and 80(2)' },
  { schedule: '5th Schedule', subject: 'Scheduled Areas and Scheduled Tribes', details: 'Provisions as to the Administration and Control of Scheduled Areas and Scheduled Tribes in states other than Assam, Meghalaya, Tripura, and Mizoram. Establishes Tribes Advisory Councils (TAC).', articles: 'Article 244(1)' },
  { schedule: '6th Schedule', subject: 'Tribal Areas in Northeast (AMTM)', details: 'Administration of tribal areas in the four northeastern states: Assam, Meghalaya, Tripura, and Mizoram through Autonomous District Councils (ADCs) with legislative and judicial powers.', articles: 'Articles 244(2) and 275(1)' },
  { schedule: '7th Schedule', subject: 'Division of Powers (Three Legislative Lists)', details: 'Division of subjects between Union and States: List I (Union List: 100 items), List II (State List: 61 items), and List III (Concurrent List: 52 items). Residuary powers vest in Parliament under Art 248.', articles: 'Article 246' },
  { schedule: '8th Schedule', subject: 'Official Languages of India', details: 'Recognises 22 official languages (originally 14; Sindhi added by 21st Amend 1967; Konkani, Manipuri, Nepali added by 71st Amend 1992; Bodo, Dogri, Maithili, Santhali added by 92nd Amend 2003). English is NOT in the 8th Schedule.', articles: 'Articles 344(1) and 351' },
  { schedule: '9th Schedule', subject: 'Validation of Certain Acts and Regulations', details: 'Added by 1st Amendment (1951) to protect agrarian land reform and abolition of Zamindari laws from judicial challenge. In I.R. Coelho (2007), Supreme Court ruled that laws added post April 24, 1973 are open to judicial review if they violate Basic Structure.', articles: 'Article 31B' },
  { schedule: '10th Schedule', subject: 'Anti-Defection Law', details: 'Added by 52nd Amendment (1985). Disqualification of legislators on grounds of voluntary giving up party membership or voting contrary to party whip. Presiding officer decides; subject to judicial review (Kihoto Hollohan 1992).', articles: 'Articles 102(2) and 191(2)' },
  { schedule: '11th Schedule', subject: 'Panchayats (Rural Local Government)', details: 'Added by 73rd Amendment (1992). Contains 29 functional matters of Panchayats (agriculture, rural housing, drinking water, roads, poverty alleviation, primary education, etc.).', articles: 'Article 243G' },
  { schedule: '12th Schedule', subject: 'Municipalities (Urban Local Government)', details: 'Added by 74th Amendment (1992). Contains 18 functional matters of Municipalities (urban planning, regulation of land use, roads, bridges, public health, fire services, solid waste management).', articles: 'Article 243W' },
]

const POLITY_FAQS = [
  {
    q: 'How many articles are there in the Constitution of India?',
    a: 'Originally, the Constitution of India had 395 articles divided into 22 parts and 8 schedules (adopted on 26 November 1949 and enacted on 26 January 1950). Due to numerous amendments, there are now 25 parts and 12 schedules, with over 448 articles. The sequential numbering still ends at Article 395, with newer articles inserted with letter suffixes such as 21A, 39A, 51A, 243A-ZG, 300A, 338B, and 371A-J.',
  },
  {
    q: 'Which articles of the Indian Constitution are the most frequently asked in UPSC and State PSC exams?',
    a: 'The highest-yield articles tested repeatedly in competitive exams include: Article 14 (Equality before law), Article 19 (6 Freedoms), Article 21 (Life and Personal Liberty), Article 21A (Right to Education), Article 32 (Constitutional Remedies & 5 Writs), Article 44 (Uniform Civil Code), Article 51A (Fundamental Duties), Article 72 (Presidential Pardons), Article 110 (Money Bills), Article 123 (Presidential Ordinances), Article 148 (CAG), Article 280 (Finance Commission), Article 324 (Election Commission), Article 352/356/360 (Emergency Provisions), and Article 368 (Constitutional Amendments).',
  },
  {
    q: 'What is the difference between Article 2 and Article 3 of the Constitution?',
    a: 'Article 2 empowers Parliament to admit into the Union or establish new States that were NOT previously part of the territory of India (external territory admission, such as Sikkim). Article 3 empowers Parliament to reorganize, form new states, alter boundaries, or change names of existing Indian states by simple majority (internal reorganization).',
  },
  {
    q: 'Why can Articles 20 and 21 not be suspended during a National Emergency?',
    a: 'Following the abuses of the 1975–1977 Emergency, the 44th Constitutional Amendment Act, 1978 amended Article 359 to explicitly mandate that the right to protection in respect of conviction for offences (Article 20) and the right to life and personal liberty (Article 21) cannot be suspended by Presidential order even during a National Emergency.',
  },
  {
    q: 'What is the distinction between "Equality Before Law" and "Equal Protection of the Laws" in Article 14?',
    a: '"Equality before the law" is a British negative concept implying the absence of any special privileges in favor of any individual and the equal subjection of all classes to ordinary law. "Equal protection of the laws" is an American positive concept implying equality of treatment under equal circumstances, allowing the State to make reasonable classifications for affirmative action.',
  },
]

export function ConstitutionExplorerPage() {
  const [search, setSearch] = React.useState('')
  const [activeTab, setActiveTab] = React.useState<'articles' | 'most-asked' | 'parts' | 'amendments' | 'schedules' | 'faq'>('articles')
  // On coming to this page, Part I is automatically selected as requested
  const [partFilter, setPartFilter] = React.useState<string>('Part I')
  const [frequencyFilter, setFrequencyFilter] = React.useState<'all' | ExamFrequency>('all')
  const [visibleCount, setVisibleCount] = React.useState(35)
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null)
  const articlesTopRef = React.useRef<HTMLDivElement>(null)

  usePageMeta({
    title: 'Constitution of India: Articles 1–395, Exam Frequency & Teaching Guide | Ministry of Papers',
    description: 'Master every article of the Indian Constitution with linewise student explanations, verified past examination frequency rankings (UPSC, JKPSC, SSC, State PSCs), and landmark Supreme Court rulings.',
    canonicalPath: '/constitution-of-india',
  })

  // Current selected part metadata and next part calculation
  const currentPartIndex = React.useMemo(() => {
    return CONSTITUTION_PARTS.findIndex((p) => p.part === partFilter)
  }, [partFilter])

  const currentPartInfo = currentPartIndex >= 0 ? CONSTITUTION_PARTS[currentPartIndex] : null
  const nextPartInfo = currentPartIndex >= 0 && currentPartIndex < CONSTITUTION_PARTS.length - 1
    ? CONSTITUTION_PARTS[currentPartIndex + 1]
    : null
  const prevPartInfo = currentPartIndex > 0 ? CONSTITUTION_PARTS[currentPartIndex - 1] : null

  // Filtered Articles for "All Articles (395+)" Tab
  const filteredArticles = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    return ALL_CONSTITUTION_ARTICLES.filter((art) => {
      // Part match (Part I default)
      if (partFilter !== 'all' && art.part !== partFilter) {
        return false
      }

      // Frequency match
      if (frequencyFilter !== 'all' && art.frequency !== frequencyFilter) {
        return false
      }

      // Search match
      if (!q) return true

      return (
        art.article.toLowerCase().includes(q) ||
        art.title.toLowerCase().includes(q) ||
        art.part.toLowerCase().includes(q) ||
        art.partName.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.simpleExplanation.toLowerCase().includes(q) ||
        (art.landmarkCase && art.landmarkCase.toLowerCase().includes(q))
      )
    })
  }, [search, partFilter, frequencyFilter])

  // "Most Asked Articles in Exams" Tab: Sorted strictly descending by pyqCount (highest on top)
  const mostAskedArticles = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    const sorted = [...ALL_CONSTITUTION_ARTICLES].sort((a, b) => b.pyqCount - a.pyqCount)

    return sorted.filter((art) => {
      if (!q) return true
      return (
        art.article.toLowerCase().includes(q) ||
        art.title.toLowerCase().includes(q) ||
        art.part.toLowerCase().includes(q) ||
        art.partName.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.simpleExplanation.toLowerCase().includes(q) ||
        (art.landmarkCase && art.landmarkCase.toLowerCase().includes(q))
      )
    })
  }, [search])

  // Reset visible count when filters change
  React.useEffect(() => {
    setVisibleCount(35)
  }, [search, partFilter, frequencyFilter, activeTab])

  // Frequency count badges across total articles
  const frequencyCounts = React.useMemo(() => {
    let top = 0
    let freq = 0
    let mod = 0
    let found = 0
    for (const a of ALL_CONSTITUTION_ARTICLES) {
      if (a.frequency === 'Top Tested') top++
      else if (a.frequency === 'Frequently Tested') freq++
      else if (a.frequency === 'Moderately Tested') mod++
      else if (a.frequency === 'Foundational') found++
    }
    return { top, freq, mod, found, total: ALL_CONSTITUTION_ARTICLES.length }
  }, [])

  const filteredAmendments = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    return KEY_AMENDMENTS.filter((am) => {
      if (!q) return true
      return (
        am.amendment.toLowerCase().includes(q) ||
        am.title.toLowerCase().includes(q) ||
        am.significance.toLowerCase().includes(q) ||
        am.examNote.toLowerCase().includes(q) ||
        am.year.toString().includes(q)
      )
    })
  }, [search])

  const filteredSchedules = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    return SCHEDULES_DATABASE.filter((sch) => {
      if (!q) return true
      return (
        sch.schedule.toLowerCase().includes(q) ||
        sch.subject.toLowerCase().includes(q) ||
        sch.details.toLowerCase().includes(q) ||
        sch.articles.toLowerCase().includes(q)
      )
    })
  }, [search])

  const displayedArticles = React.useMemo(() => {
    return filteredArticles.slice(0, visibleCount)
  }, [filteredArticles, visibleCount])

  const displayedMostAsked = React.useMemo(() => {
    return mostAskedArticles.slice(0, visibleCount)
  }, [mostAskedArticles, visibleCount])

  // Handler to smoothly advance to the next constitutional part
  const loadNextPart = (nextPart: string) => {
    setPartFilter(nextPart)
    setVisibleCount(35)
    if (articlesTopRef.current) {
      articlesTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Constitution of India: Linewise Articles 1–395 and Exam Frequency',
        description: 'Complete directory of Indian Constitution articles with linewise student explanations, exam frequency rankings, and landmark Supreme Court rulings for UPSC and State PSC exams.',
        author: {
          '@type': 'Organization',
          name: 'Ministry of Papers Editorial Board',
          url: 'https://ministryofpapers.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Ministry of Papers',
          url: 'https://ministryofpapers.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://ministryofpapers.com/favicon.svg',
          },
        },
        datePublished: '2026-03-01T00:00:00Z',
        dateModified: '2026-11-12T00:00:00Z',
        mainEntityOfPage: 'https://ministryofpapers.com/constitution-of-india',
      },
      {
        '@type': 'FAQPage',
        mainEntity: POLITY_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  }

  return (
    <section className="public-page" style={{ paddingBottom: '60px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="public-shell">
        {/* Breadcrumb Navigation */}
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/exams">Study Tools</Link>
          <span aria-hidden="true">›</span>
          <span>Constitution of India Explorer</span>
        </nav>

        {/* Master Header */}
        <header style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="public-kicker" style={{ margin: 0 }}>Interactive Polity Study Suite</span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}>
              All 395 Articles · 25 Parts · Verified PYQs
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading, "Fraunces", serif)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              margin: '0 0 10px',
              color: 'var(--ink, #0f172a)',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
            }}
          >
            Constitution of India: Articles, Parts &amp; Exam Rankings
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink2, #475569)', maxWidth: '820px', lineHeight: '1.6', margin: 0 }}>
            Read and learn every article of the Indian Constitution line by line. Easily switch through all 25 Parts, discover the most frequently asked articles in competitive exams, and understand foundational principles with student-friendly explanations.
          </p>

          {/* Quick Metrics Ribbon */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
              marginTop: '18px',
            }}
          >
            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line, #e2e8f0)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={18} color="var(--brand, #0f766e)" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink, #0f172a)' }}>{frequencyCounts.total}</div>
                <div style={{ fontSize: '11px', color: 'var(--ink2, #64748b)', fontWeight: 600 }}>Articles (1–395+)</div>
              </div>
            </div>

            <div style={{ background: '#fef2f2', padding: '12px 14px', borderRadius: '10px', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={18} color="#dc2626" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#991b1b' }}>{frequencyCounts.top}</div>
                <div style={{ fontSize: '11px', color: '#b91c1c', fontWeight: 600 }}>Top Tested (15+ PYQs)</div>
              </div>
            </div>

            <div style={{ background: '#fffbeb', padding: '12px 14px', borderRadius: '10px', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} color="#d97706" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#92400e' }}>{CONSTITUTION_PARTS.length}</div>
                <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600 }}>Constitutional Parts</div>
              </div>
            </div>

            <div style={{ background: '#eff6ff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} color="#2563eb" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#1e40af' }}>{KEY_AMENDMENTS.length}</div>
                <div style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 600 }}>Landmark Amendments</div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            borderBottom: '2px solid var(--line, #e2e8f0)',
            marginBottom: '20px',
            overflowX: 'auto',
            paddingBottom: '2px',
          }}
        >
          <button
            onClick={() => setActiveTab('articles')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'articles' ? '3px solid var(--brand, #0f766e)' : '3px solid transparent',
              color: activeTab === 'articles' ? 'var(--brand, #0f766e)' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
            }}
          >
            All Articles (395+)
          </button>

          <button
            onClick={() => setActiveTab('most-asked')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'most-asked' ? '3px solid #dc2626' : '3px solid transparent',
              color: activeTab === 'most-asked' ? '#dc2626' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Flame size={15} color={activeTab === 'most-asked' ? '#dc2626' : 'var(--ink2, #64748b)'} />
            Most Asked Articles in Exams
          </button>

          <button
            onClick={() => setActiveTab('parts')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'parts' ? '3px solid var(--brand, #0f766e)' : '3px solid transparent',
              color: activeTab === 'parts' ? 'var(--brand, #0f766e)' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
            }}
          >
            Parts of Constitution ({CONSTITUTION_PARTS.length})
          </button>

          <button
            onClick={() => setActiveTab('amendments')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'amendments' ? '3px solid var(--brand, #0f766e)' : '3px solid transparent',
              color: activeTab === 'amendments' ? 'var(--brand, #0f766e)' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
            }}
          >
            Landmark Amendments ({KEY_AMENDMENTS.length})
          </button>

          <button
            onClick={() => setActiveTab('schedules')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'schedules' ? '3px solid var(--brand, #0f766e)' : '3px solid transparent',
              color: activeTab === 'schedules' ? 'var(--brand, #0f766e)' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
            }}
          >
            All 12 Schedules
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'faq' ? '3px solid var(--brand, #0f766e)' : '3px solid transparent',
              color: activeTab === 'faq' ? 'var(--brand, #0f766e)' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
            }}
          >
            Exam FAQs ({POLITY_FAQS.length})
          </button>
        </div>

        {/* Anchor for smooth scrolling when switching parts */}
        <div ref={articlesTopRef} />

        {/* Tab 1: ALL ARTICLES (LINEWISE, PART I DEFAULT, LOAD NEXT PART AT BOTTOM) */}
        {activeTab === 'articles' && (
          <div>
            {/* Filter Bar with Part Selector & Search */}
            <div
              style={{
                background: 'var(--card-bg, #ffffff)',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid var(--line, #e2e8f0)',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ flex: '1 1 280px', position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink2, #64748b)' }} />
                  <input
                    type="text"
                    placeholder="Search by article number (e.g. 1, 21), keyword, or doctrine..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 36px',
                      borderRadius: '8px',
                      border: '1px solid var(--line, #cbd5e1)',
                      fontSize: '14px',
                      outline: 'none',
                      background: 'var(--bg, #f8fafc)',
                      color: 'var(--ink, #0f172a)',
                    }}
                  />
                </div>

                {/* Part Switcher Dropdown (Part I selected by default) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={15} color="var(--ink2, #64748b)" />
                  <select
                    value={partFilter}
                    onChange={(e) => setPartFilter(e.target.value)}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--line, #cbd5e1)',
                      fontSize: '13.5px',
                      background: 'var(--bg, #f8fafc)',
                      color: 'var(--ink, #0f172a)',
                      outline: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    <option value="all">All 25 Parts (Show All 395+ Articles)</option>
                    {CONSTITUTION_PARTS.map((p) => (
                      <option key={p.part} value={p.part}>
                        {p.part}: {p.name} ({p.articlesRange})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Frequency Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink2, #64748b)' }}>
                  Filter by PYQ Frequency:
                </span>

                <button
                  onClick={() => setFrequencyFilter('all')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    background: frequencyFilter === 'all' ? 'var(--ink, #0f172a)' : 'transparent',
                    color: frequencyFilter === 'all' ? '#ffffff' : 'var(--ink2, #475569)',
                    borderColor: frequencyFilter === 'all' ? 'var(--ink, #0f172a)' : 'var(--line, #cbd5e1)',
                  }}
                >
                  All
                </button>

                <button
                  onClick={() => setFrequencyFilter('Top Tested')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: frequencyFilter === 'Top Tested' ? '#dc2626' : '#fef2f2',
                    color: frequencyFilter === 'Top Tested' ? '#ffffff' : '#991b1b',
                    borderColor: frequencyFilter === 'Top Tested' ? '#dc2626' : '#fecaca',
                  }}
                >
                  <Flame size={12} />
                  Top Tested ({frequencyCounts.top})
                </button>

                <button
                  onClick={() => setFrequencyFilter('Frequently Tested')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: frequencyFilter === 'Frequently Tested' ? '#d97706' : '#fffbeb',
                    color: frequencyFilter === 'Frequently Tested' ? '#ffffff' : '#92400e',
                    borderColor: frequencyFilter === 'Frequently Tested' ? '#d97706' : '#fde68a',
                  }}
                >
                  <Zap size={12} />
                  Frequently Tested ({frequencyCounts.freq})
                </button>

                <button
                  onClick={() => setFrequencyFilter('Moderately Tested')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: frequencyFilter === 'Moderately Tested' ? '#2563eb' : '#eff6ff',
                    color: frequencyFilter === 'Moderately Tested' ? '#ffffff' : '#1e40af',
                    borderColor: frequencyFilter === 'Moderately Tested' ? '#2563eb' : '#bfdbfe',
                  }}
                >
                  <Bookmark size={12} />
                  Moderately Tested ({frequencyCounts.mod})
                </button>

                <button
                  onClick={() => setFrequencyFilter('Foundational')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: '1px solid',
                    background: frequencyFilter === 'Foundational' ? '#475569' : '#f8fafc',
                    color: frequencyFilter === 'Foundational' ? '#ffffff' : '#64748b',
                    borderColor: frequencyFilter === 'Foundational' ? '#475569' : '#e2e8f0',
                  }}
                >
                  Foundational ({frequencyCounts.found})
                </button>

                {(search || partFilter !== 'Part I' || frequencyFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearch('')
                      setPartFilter('Part I')
                      setFrequencyFilter('all')
                    }}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--brand, #0f766e)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginLeft: 'auto',
                    }}
                  >
                    <RotateCcw size={11} />
                    Reset to Part I
                  </button>
                )}
              </div>
            </div>

            {/* Current Part Banner */}
            {currentPartInfo && partFilter !== 'all' && (
              <div
                style={{
                  background: 'linear-gradient(to right, #f0fdf4, #f8fafc)',
                  border: '1px solid #bbf7d0',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#15803d' }}>
                    Currently Reading: {currentPartInfo.part}
                  </span>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink, #0f172a)', margin: '2px 0 4px', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                    {currentPartInfo.name} ({currentPartInfo.articlesRange})
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--ink2, #475569)', margin: 0, lineHeight: '1.5' }}>
                    {currentPartInfo.description}
                  </p>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#ffffff', padding: '6px 12px', borderRadius: '8px', border: '1px solid #86efac' }}>
                  {filteredArticles.length} Articles in this Part
                </div>
              </div>
            )}

            {/* LINEWISE VERTICAL LIST OF ARTICLES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {displayedArticles.map((art: ConstitutionArticleData) => {
                const isTopTested = art.frequency === 'Top Tested'
                const isFreqTested = art.frequency === 'Frequently Tested'
                const isModTested = art.frequency === 'Moderately Tested'

                const badgeBg = isTopTested ? '#fef2f2' : isFreqTested ? '#fffbeb' : isModTested ? '#eff6ff' : '#f8fafc'
                const badgeColor = isTopTested ? '#991b1b' : isFreqTested ? '#92400e' : isModTested ? '#1e40af' : '#475569'
                const badgeBorder = isTopTested ? '#fecaca' : isFreqTested ? '#fde68a' : isModTested ? '#bfdbfe' : '#e2e8f0'

                return (
                  <article
                    key={art.id}
                    id={art.id}
                    style={{
                      padding: '20px 24px',
                      background: 'var(--card-bg, #ffffff)',
                      border: '1px solid var(--line, #e2e8f0)',
                      borderRadius: '12px',
                      boxShadow: isTopTested ? '0 1px 4px rgba(220, 38, 38, 0.05)' : '0 1px 2px rgba(0,0,0,0.02)',
                    }}
                  >
                    {/* Linewise Top Header: Article Number, Title, and Frequency Tag */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '20px',
                            fontWeight: 800,
                            color: 'var(--brand, #0f766e)',
                            fontFamily: 'var(--font-heading, "Fraunces", serif)',
                          }}
                        >
                          {art.article}
                        </span>
                        <h2
                          style={{
                            fontSize: '17px',
                            fontWeight: 700,
                            color: 'var(--ink, #0f172a)',
                            margin: 0,
                            lineHeight: '1.3',
                          }}
                        >
                          {art.title}
                        </h2>
                      </div>

                      {/* Exam Frequency Pill */}
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          background: badgeBg,
                          color: badgeColor,
                          border: `1px solid ${badgeBorder}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {isTopTested && <Flame size={12} />}
                        {isFreqTested && <Zap size={12} />}
                        {art.frequency} ({art.pyqCount} PYQs)
                      </span>
                    </div>

                    {/* Official Constitutional Text / Summary */}
                    <p style={{ fontSize: '14px', color: 'var(--ink, #334155)', lineHeight: '1.6', margin: '0 0 12px' }}>
                      {art.summary}
                    </p>

                    {/* Teaching Breakdown: In Simple Words (Examiner trap removed as requested) */}
                    <div
                      style={{
                        background: 'var(--bg, #f8fafc)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        borderLeft: '3px solid var(--brand, #0f766e)',
                        marginBottom: '12px',
                      }}
                    >
                      <strong
                        style={{
                          fontSize: '11.5px',
                          textTransform: 'uppercase',
                          color: 'var(--brand, #0f766e)',
                          letterSpacing: '0.4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          marginBottom: '4px',
                        }}
                      >
                        <BookOpen size={13} />
                        In Simple Words (Student Teaching Note)
                      </strong>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2, #334155)', lineHeight: '1.55', margin: 0 }}>
                        {art.simpleExplanation}
                      </p>
                    </div>

                    {/* Landmark Judicial Precedent if available */}
                    {art.landmarkCase && (
                      <div
                        style={{
                          fontSize: '13px',
                          color: 'var(--ink2, #475569)',
                          background: '#f1f5f9',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          marginBottom: '12px',
                        }}
                      >
                        <strong style={{ color: 'var(--ink, #1e293b)' }}>⚖️ Landmark Precedent:</strong> {art.landmarkCase}
                      </div>
                    )}

                    {/* Linewise Bottom Navigation & Practice Link */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '10px',
                        borderTop: '1px solid var(--line, #f1f5f9)',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <Link
                        to={`/exam/upsc-cse?tab=subjects&subject=Indian%20Polity`}
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: 'var(--brand, #0f766e)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Solve Indian Polity PYQs on {art.article}
                        <ChevronRight size={13} />
                      </Link>

                      <span style={{ fontSize: '12px', color: 'var(--ink2, #94a3b8)', fontWeight: 600 }}>
                        {art.part} · {art.partName}
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Pagination / Load Next Part Controls */}
            {displayedArticles.length < filteredArticles.length && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + 35)}
                  style={{
                    padding: '10px 24px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    background: '#f1f5f9',
                    color: 'var(--ink, #0f172a)',
                    border: '1px solid var(--line, #cbd5e1)',
                    cursor: 'pointer',
                  }}
                >
                  Load More Articles in this Part ({filteredArticles.length - displayedArticles.length} remaining)
                </button>
              </div>
            )}

            {/* "LOAD NEXT PART" BUTTON AT THE BOTTOM OF THE CURRENT PART */}
            {partFilter !== 'all' && nextPartInfo && displayedArticles.length >= filteredArticles.length && (
              <div
                style={{
                  marginTop: '36px',
                  padding: '24px 20px',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1.5px dashed var(--brand, #0f766e)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink2, #64748b)', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '6px' }}>
                  Finished reading {currentPartInfo?.part} ({currentPartInfo?.name})
                </span>
                <h3 style={{ fontSize: '19px', fontFamily: 'var(--font-heading, "Fraunces", serif)', margin: '0 0 12px', color: 'var(--ink, #0f172a)' }}>
                  Continue Reading {nextPartInfo.part}: {nextPartInfo.name}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--ink2, #475569)', maxWidth: '560px', margin: '0 auto 16px', lineHeight: '1.5' }}>
                  {nextPartInfo.description} ({nextPartInfo.articlesRange})
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {prevPartInfo && (
                    <button
                      onClick={() => loadNextPart(prevPartInfo.part)}
                      style={{
                        padding: '10px 18px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        borderRadius: '8px',
                        background: '#f8fafc',
                        color: 'var(--ink, #0f172a)',
                        border: '1px solid var(--line, #cbd5e1)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <ArrowLeft size={15} />
                      Previous: {prevPartInfo.part}
                    </button>
                  )}
                  <button
                    onClick={() => loadNextPart(nextPartInfo.part)}
                    style={{
                      padding: '11px 26px',
                      fontSize: '14px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      background: 'var(--brand, #0f766e)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(15, 118, 110, 0.25)',
                    }}
                  >
                    Load {nextPartInfo.part}: {nextPartInfo.name} ({nextPartInfo.articlesRange})
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 🔥 MOST ASKED ARTICLES IN EXAMS (ORDERED BY MOST ASKED ON TOP) */}
        {activeTab === 'most-asked' && (
          <div>
            {/* Banner */}
            <div
              style={{
                background: 'linear-gradient(to right, #fef2f2, #fffbeb)',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                padding: '18px 22px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={14} />
                  Historical Examination PYQ Ranking
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#991b1b', margin: '4px 0 6px', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                  Most Asked Articles in Indian Competitive Exams
                </h2>
                <p style={{ fontSize: '13.5px', color: '#7f1d1d', margin: 0, lineHeight: '1.5', maxWidth: '640px' }}>
                  Articles ranked in strict descending order of how frequently they appear in UPSC CSE Prelims, JKPSC CCE, SSC CGL, and State PSCs.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #fca5a5', padding: '8px 16px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#dc2626' }}>{mostAskedArticles.length}</div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#991b1b' }}>Ranked Articles</div>
              </div>
            </div>

            {/* Search Box in Most Asked */}
            <div style={{ position: 'relative', marginBottom: '18px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink2, #64748b)' }} />
              <input
                type="text"
                placeholder="Search ranked articles by number, title, or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--line, #cbd5e1)',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'var(--card-bg, #ffffff)',
                  color: 'var(--ink, #0f172a)',
                }}
              />
            </div>

            {/* Linewise Vertical List Ranked by Frequency */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {displayedMostAsked.map((art: ConstitutionArticleData, idx: number) => {
                const rank = idx + 1
                const isTop5 = rank <= 5
                const isTop15 = rank <= 15

                return (
                  <article
                    key={art.id}
                    id={art.id}
                    style={{
                      padding: '20px 24px',
                      background: 'var(--card-bg, #ffffff)',
                      border: isTop5 ? '1.5px solid #f87171' : '1px solid var(--line, #e2e8f0)',
                      borderRadius: '12px',
                      boxShadow: isTop5 ? '0 2px 8px rgba(220, 38, 38, 0.08)' : '0 1px 2px rgba(0,0,0,0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        {/* Rank Badge */}
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: isTop5 ? '#dc2626' : isTop15 ? '#d97706' : '#2563eb',
                            color: '#ffffff',
                          }}
                        >
                          #{rank} Most Asked
                        </span>

                        <span
                          style={{
                            fontSize: '20px',
                            fontWeight: 800,
                            color: 'var(--brand, #0f766e)',
                            fontFamily: 'var(--font-heading, "Fraunces", serif)',
                          }}
                        >
                          {art.article}
                        </span>

                        <h2
                          style={{
                            fontSize: '17px',
                            fontWeight: 700,
                            color: 'var(--ink, #0f172a)',
                            margin: 0,
                            lineHeight: '1.3',
                          }}
                        >
                          {art.title}
                        </h2>
                      </div>

                      {/* Appearance Pill */}
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          background: '#fef2f2',
                          color: '#991b1b',
                          border: '1px solid #fecaca',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Flame size={13} color="#dc2626" />
                        {art.pyqCount} Historical PYQs
                      </span>
                    </div>

                    <p style={{ fontSize: '14px', color: 'var(--ink, #334155)', lineHeight: '1.6', margin: '0 0 12px' }}>
                      {art.summary}
                    </p>

                    <div
                      style={{
                        background: 'var(--bg, #f8fafc)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        borderLeft: '3px solid var(--brand, #0f766e)',
                        marginBottom: '12px',
                      }}
                    >
                      <strong
                        style={{
                          fontSize: '11.5px',
                          textTransform: 'uppercase',
                          color: 'var(--brand, #0f766e)',
                          letterSpacing: '0.4px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          marginBottom: '4px',
                        }}
                      >
                        <BookOpen size={13} />
                        In Simple Words (Student Teaching Note)
                      </strong>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2, #334155)', lineHeight: '1.55', margin: 0 }}>
                        {art.simpleExplanation}
                      </p>
                    </div>

                    {art.landmarkCase && (
                      <div
                        style={{
                          fontSize: '13px',
                          color: 'var(--ink2, #475569)',
                          background: '#f1f5f9',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          marginBottom: '12px',
                        }}
                      >
                        <strong style={{ color: 'var(--ink, #1e293b)' }}>⚖️ Landmark Precedent:</strong> {art.landmarkCase}
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '10px',
                        borderTop: '1px solid var(--line, #f1f5f9)',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <Link
                        to={`/exam/upsc-cse?tab=subjects&subject=Indian%20Polity`}
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: 'var(--brand, #0f766e)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Practice Solved PYQs for {art.article}
                        <ChevronRight size={13} />
                      </Link>

                      <span style={{ fontSize: '12px', color: 'var(--ink2, #94a3b8)', fontWeight: 600 }}>
                        {art.part} · {art.partName}
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>

            {displayedMostAsked.length < mostAskedArticles.length && (
              <div style={{ textAlign: 'center', marginTop: '28px' }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + 35)}
                  style={{
                    padding: '11px 26px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    background: 'var(--brand, #0f766e)',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Load Next Ranked Articles ({mostAskedArticles.length - displayedMostAsked.length} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: PARTS OF THE CONSTITUTION (25 PARTS) */}
        {activeTab === 'parts' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {CONSTITUTION_PARTS.map((p) => (
              <div
                key={p.part}
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid var(--line, #e2e8f0)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--brand, #0f766e)' }}>{p.part}</span>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', background: 'var(--bg, #f1f5f9)', color: 'var(--ink2, #475569)' }}>
                      {p.articlesRange}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', margin: '0 0 8px', color: 'var(--ink, #0f172a)' }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink2, #475569)', lineHeight: '1.6', margin: 0 }}>
                    {p.description}
                  </p>
                </div>
                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--line, #e2e8f0)' }}>
                  <button
                    onClick={() => {
                      setPartFilter(p.part)
                      setActiveTab('articles')
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--brand, #0f766e)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Read All Articles in {p.part} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: LANDMARK AMENDMENTS (15) */}
        {activeTab === 'amendments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredAmendments.map((am) => (
              <article
                key={am.amendment}
                style={{
                  padding: '20px 24px',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--line, #e2e8f0)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--brand, #0f766e)' }}>
                      {am.amendment}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink2, #64748b)' }}>
                      ({am.year})
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', background: '#eff6ff', color: '#1d4ed8' }}>
                    Constitutional Amendment
                  </span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink, #0f172a)', margin: '0 0 8px' }}>
                  {am.title}
                </h3>
                <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--ink, #334155)', margin: '0 0 10px' }}>
                  {am.significance}
                </p>
                <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#854d0e' }}>
                  <strong>💡 Exam Takeaway:</strong> {am.examNote}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Tab 5: ALL 12 SCHEDULES */}
        {activeTab === 'schedules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredSchedules.map((sch) => (
              <article
                key={sch.schedule}
                style={{
                  padding: '20px 24px',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--line, #e2e8f0)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontSize: '17px', margin: 0, color: 'var(--brand, #0f766e)', fontWeight: 800 }}>{sch.schedule}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--ink2, #64748b)', fontWeight: 600 }}>{sch.articles}</span>
                </div>
                <h4 style={{ fontSize: '15px', color: 'var(--ink, #0f172a)', margin: '0 0 8px' }}>{sch.subject}</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink2, #475569)', lineHeight: '1.6', margin: 0 }}>
                  {sch.details}
                </p>
              </article>
            ))}
          </div>
        )}

        {/* Tab 6: EXAM FAQS (5) */}
        {activeTab === 'faq' && (
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '24px', margin: '0 0 16px', color: 'var(--ink, #0f172a)' }}>
              Frequently Asked Questions on the Constitution of India
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {POLITY_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--card-bg, #ffffff)',
                      border: '1px solid var(--line, #e2e8f0)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--ink, #0f172a)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HelpCircle size={17} color="var(--brand, #0f766e)" />
                        {faq.q}
                      </span>
                      <ChevronRight
                        size={18}
                        color="var(--ink2, #64748b)"
                        style={{
                          transform: isOpen ? 'rotate(90deg)' : 'none',
                          transition: 'transform 0.2s',
                          flexShrink: 0,
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: '0 20px 16px',
                          fontSize: '14px',
                          color: 'var(--ink2, #475569)',
                          lineHeight: '1.65',
                          borderTop: '1px solid var(--line, #f1f5f9)',
                          paddingTop: '14px',
                        }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Bottom Practice Banner */}
        <div
          style={{
            marginTop: '44px',
            textAlign: 'center',
            padding: '28px 24px',
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--line, #e2e8f0)',
            borderRadius: '14px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--brand, #0f766e)', display: 'block', marginBottom: '6px' }}>
            Zero Paywall Question Bank
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '22px', margin: '0 0 8px', color: 'var(--ink, #0f172a)' }}>
            Practice Solved Indian Polity Previous Year Questions
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--ink2, #475569)', maxWidth: '640px', margin: '0 auto 18px', lineHeight: '1.6' }}>
            Test your understanding of Fundamental Rights, DPSP, Parliament, Executive, and Constitutional Amendments against real exam questions from UPSC Prelims, JKPSC CCE, SSC CGL, and CDS.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/exam/upsc-cse?tab=subjects&subject=Indian%20Polity"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '13.5px',
                color: '#ffffff',
                background: 'var(--brand, #0f766e)',
                padding: '10px 22px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Solve UPSC Polity PYQs Free →
            </Link>
            <Link
              to="/exam/jkpsc-cce?tab=subjects&subject=Indian%20Polity"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '13.5px',
                color: 'var(--ink, #0f172a)',
                background: 'var(--bg, #f1f5f9)',
                border: '1px solid var(--line, #cbd5e1)',
                padding: '10px 22px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              JKPSC CCE Polity PYQs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
