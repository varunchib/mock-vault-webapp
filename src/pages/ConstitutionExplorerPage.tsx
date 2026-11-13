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
  ScrollText,
  Scale,
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

export const KEY_AMENDMENTS: ConstitutionalAmendment[] = [
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

export const SCHEDULES_DATABASE: ConstitutionalSchedule[] = [
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

export const CONSTITUTION_EXPLORER_FAQS = [
  {
    examTag: 'UPSC CSE Prelims 2020 / JKPSC CCE',
    q: 'The Preamble to the Constitution of India is: (a) a part of the Constitution; but has no legal effect (b) not a part of the Constitution and has no legal effect either (c) a part of the Constitution and has the same legal effect as any other part (d) a part of the Constitution, but has no legal effect independently of other parts',
    a: 'Option (d) is correct. The Supreme Court in Kesavananda Bharati (1973) and LIC of India (1995) definitively established that the Preamble IS an integral part of the Constitution of India. However, the Preamble is non-justiciable and non-enforceable on its own in any court of law; it cannot create substantive enforceable rights or powers by itself independently of other operational articles of the Constitution.',
    takeaway: 'Kesavananda Bharati established: Preamble is an integral part of the Constitution, but has no legal effect independently of other provisions.',
  },
  {
    examTag: 'UPSC CSE Prelims 2020',
    q: 'A "Constitutional Government" by definition is: (a) government by popular representative (b) multi-party government (c) limited government (d) government by legislature',
    a: 'Option (c) is correct. Constitutionalism by definition denotes a "Limited Government"—a political system where the powers of government are defined, circumscribed, and limited by constitutional law and fundamental rights to prevent tyranny, majoritarian excess, and arbitrary executive actions.',
    takeaway: 'Core conceptual definition: Constitutional Government = Limited Government (safeguarded by fundamental rights and judicial review).',
  },
  {
    examTag: 'UPSC CSE Prelims 2021',
    q: 'Under the Indian Constitution, concentration of wealth violates which of the following provisions?',
    a: 'Under Article 39(c) in Part IV (Directive Principles of State Policy), the State is mandated to direct its policy towards securing that the operation of the economic system does not result in the concentration of wealth and means of production to the common detriment. Hence, concentration of wealth directly violates the Directive Principles of State Policy (DPSP).',
    takeaway: 'Article 39(c) mandates prevention of concentration of wealth; Article 39(b) mandates equitable distribution of material resources.',
  },
  {
    examTag: 'UPSC CSE Prelims 2017 / JKCCE',
    q: 'Which of the following are envisaged by the "Right against Exploitation" in the Constitution of India? (1) Prohibition of traffic in human beings and forced labour (2) Abolition of untouchability (3) Protection of the interests of minorities (4) Prohibition of employment of children in factories and mines',
    a: 'Statements (1) and (4) only. The "Right against Exploitation" is guaranteed under Articles 23 and 24: Article 23 prohibits human trafficking and begar (forced labour), while Article 24 prohibits the employment of children below 14 years in factories, mines, and hazardous occupations. In contrast, Abolition of Untouchability is under Article 17 (Right to Equality), and Protection of Minority Interests is under Article 29 (Cultural and Educational Rights).',
    takeaway: 'Right against Exploitation consists strictly of Articles 23 (human trafficking & begar) and 24 (child labour).',
  },
  {
    examTag: 'UPSC CSE Prelims 2018 / BPSC CCE',
    q: 'The Right to Privacy is protected as an intrinsic part of the Right to Life and Personal Liberty under which Article of the Constitution of India?',
    a: 'The Right to Privacy is an intrinsic fundamental right protected under Article 21 and the freedoms guaranteed in Part III. In the landmark nine-judge Constitution Bench ruling in Justice K.S. Puttaswamy (Retd.) v. Union of India (2017), the Supreme Court unanimously declared Privacy to be a fundamental right inherent in dignity, autonomy, and personal liberty.',
    takeaway: 'K.S. Puttaswamy (2017) unanimously elevated Right to Privacy into Article 21 (Right to Life & Personal Liberty).',
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
    title: 'Constitution of India: Articles 1–395, Preamble & Schedules | Ministry of Papers',
    description: 'Master the Constitution of India: Authentic Preamble, all 395+ articles across 25 parts, student teaching notes, and landmark Supreme Court rulings for UPSC, JKPSC CCE, and State PSCs.',
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
        '@type': 'LearningResource',
        name: 'Interactive Constitution of India Explorer: Preamble, Articles 1–395 & Exam Frequency',
        description: 'Comprehensive pedagogical directory of the Constitution of India: full text of Preamble, all 395+ articles across 25 parts, student teaching notes, PYQ appearance rankings, and Supreme Court jurisprudence.',
        url: 'https://ministryofpapers.com/constitution-of-india',
        educationalLevel: 'Competitive Exams (UPSC, State PSC, SSC)',
        learningResourceType: 'Study guide and primary legal reference',
        isAccessibleForFree: true,
        inLanguage: 'en-IN',
        provider: {
          '@type': 'Organization',
          name: 'Ministry of Papers',
          url: 'https://ministryofpapers.com',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
            { '@type': 'ListItem', position: 2, name: 'Study Tools', item: 'https://ministryofpapers.com/exams' },
            { '@type': 'ListItem', position: 3, name: 'Constitution of India Explorer', item: 'https://ministryofpapers.com/constitution-of-india' },
          ],
        },
      },
      {
        '@type': 'Article',
        headline: 'Constitution of India: Articles 1–395, Preamble, Parts & Exam Frequency Rankings',
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
        mainEntity: CONSTITUTION_EXPLORER_FAQS.map((faq) => ({
          '@type': 'Question',
          name: `[${faq.examTag}] ${faq.q}`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${faq.a} Key Takeaway: ${faq.takeaway}`,
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
          <Link to="/study-material">Study Material</Link>
          <span aria-hidden="true">›</span>
          <span>Constitution of India Explorer</span>
        </nav>

        {/* Master Header */}
        <header style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="public-kicker" style={{ margin: 0 }}>Interactive Polity Study Suite</span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'var(--brand-soft)', color: 'var(--brand)', border: '1px solid var(--brand-line)' }}>
              Preamble + Articles 1–395 · 25 Parts · All 12 Schedules
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading, "Fraunces", serif)',
              fontSize: 'clamp(28px, 4vw, 40px)',
              margin: '0 0 10px',
              color: 'var(--ink)',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
            }}
          >
            Constitution of India: Preamble, Articles 1–395 &amp; Schedules
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink2)', maxWidth: '820px', lineHeight: '1.6', margin: 0 }}>
            Read and master every article of the Indian Constitution line by line. Explore the foundational Preamble, seamlessly navigate all 25 Parts, discover the most frequently asked articles in competitive exams, and understand core legal principles with student-friendly explanations.
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
            <div style={{ background: 'var(--card-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BookOpen size={18} color="var(--brand)" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>395</div>
                <div style={{ fontSize: '11px', color: 'var(--ink3)', fontWeight: 600 }}>Articles (406 with 21A, 51A...)</div>
              </div>
            </div>

            <div style={{ background: 'var(--red-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--red-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={18} color="var(--red)" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--red)' }}>{frequencyCounts.top}</div>
                <div style={{ fontSize: '11px', color: 'var(--red)', fontWeight: 600 }}>Top Tested (15+ PYQs)</div>
              </div>
            </div>

            <div style={{ background: 'var(--hl-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--hl-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} color="var(--hl-dark)" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--hl-dark)' }}>{CONSTITUTION_PARTS.length}</div>
                <div style={{ fontSize: '11px', color: 'var(--hl-dark)', fontWeight: 600 }}>Constitutional Parts</div>
              </div>
            </div>

            <div style={{ background: 'var(--blue-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--blue-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} color="var(--blue)" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--blue)' }}>{KEY_AMENDMENTS.length}</div>
                <div style={{ fontSize: '11px', color: 'var(--blue)', fontWeight: 600 }}>Landmark Amendments</div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Tab Switcher */}
        <div
          role="tablist"
          className="custom-tab-scroller"
          style={{
            display: 'flex',
            gap: '6px',
            borderBottom: '2px solid var(--line)',
            marginBottom: '20px',
            overflowX: 'auto',
            paddingBottom: '6px',
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
              borderBottom: activeTab === 'articles' ? '3px solid var(--brand)' : '3px solid transparent',
              color: activeTab === 'articles' ? 'var(--brand)' : 'var(--ink2)',
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
              borderBottom: activeTab === 'most-asked' ? '3px solid var(--red)' : '3px solid transparent',
              color: activeTab === 'most-asked' ? 'var(--red)' : 'var(--ink2)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <Flame size={15} color={activeTab === 'most-asked' ? 'var(--red)' : 'var(--ink2)'} />
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
              borderBottom: activeTab === 'parts' ? '3px solid var(--brand)' : '3px solid transparent',
              color: activeTab === 'parts' ? 'var(--brand)' : 'var(--ink2)',
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
              borderBottom: activeTab === 'amendments' ? '3px solid var(--brand)' : '3px solid transparent',
              color: activeTab === 'amendments' ? 'var(--brand)' : 'var(--ink2)',
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
              borderBottom: activeTab === 'schedules' ? '3px solid var(--brand)' : '3px solid transparent',
              color: activeTab === 'schedules' ? 'var(--brand)' : 'var(--ink2)',
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
              borderBottom: activeTab === 'faq' ? '3px solid var(--brand)' : '3px solid transparent',
              color: activeTab === 'faq' ? 'var(--brand)' : 'var(--ink2)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
            }}
          >
            Exam FAQs ({CONSTITUTION_EXPLORER_FAQS.length})
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
                background: 'var(--card-bg)',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid var(--line)',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ flex: '1 1 280px', position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink3)' }} />
                  <input
                    type="text"
                    className="study-control-input"
                    placeholder="Search by article number (e.g. 1, 21), keyword, or doctrine..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 36px',
                      fontSize: '14px',
                    }}
                  />
                </div>

                {/* Part Switcher Dropdown (Part I selected by default) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={15} color="var(--ink3)" />
                  <select
                    value={partFilter}
                    className="study-control-select"
                    onChange={(e) => setPartFilter(e.target.value)}
                    style={{
                      padding: '9px 12px',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    <option value="all">All 25 Parts (Show All 395+ Articles)</option>
                    <option value="Preamble">📜 Preamble of the Constitution of India</option>
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
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink2)' }}>
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
                    background: frequencyFilter === 'all' ? 'var(--brand)' : 'transparent',
                    color: frequencyFilter === 'all' ? '#ffffff' : 'var(--ink2)',
                    borderColor: frequencyFilter === 'all' ? 'var(--brand)' : 'var(--line)',
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
                    background: frequencyFilter === 'Top Tested' ? 'var(--red)' : 'var(--red-bg)',
                    color: frequencyFilter === 'Top Tested' ? '#ffffff' : 'var(--red)',
                    borderColor: frequencyFilter === 'Top Tested' ? 'var(--red)' : 'var(--red-border)',
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
                    background: frequencyFilter === 'Frequently Tested' ? 'var(--hl-dark)' : 'var(--hl-bg)',
                    color: frequencyFilter === 'Frequently Tested' ? '#ffffff' : 'var(--hl-dark)',
                    borderColor: frequencyFilter === 'Frequently Tested' ? 'var(--hl-dark)' : 'var(--hl-border)',
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
                    background: frequencyFilter === 'Moderately Tested' ? 'var(--blue)' : 'var(--blue-bg)',
                    color: frequencyFilter === 'Moderately Tested' ? '#ffffff' : 'var(--blue)',
                    borderColor: frequencyFilter === 'Moderately Tested' ? 'var(--blue)' : 'var(--blue-border)',
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
                    background: frequencyFilter === 'Foundational' ? 'var(--brand)' : 'var(--card-bg-subtle)',
                    color: frequencyFilter === 'Foundational' ? '#ffffff' : 'var(--ink2)',
                    borderColor: frequencyFilter === 'Foundational' ? 'var(--brand)' : 'var(--line)',
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
                      color: 'var(--brand)',
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

            {/* Preamble Content when selected in Part Dropdown */}
            {partFilter === 'Preamble' ? (
              <div style={{ maxWidth: '860px', margin: '0 auto 30px' }}>
                {/* Authentic Ornate Preamble Plaque */}
                <div className="study-preamble-plaque">
                  <span className="preamble-kicker">
                    The Constitution of India
                  </span>
                  <h2 className="preamble-heading">
                    PREAMBLE
                  </h2>

                  <div
                    style={{
                      fontSize: '16px',
                      lineHeight: '2.1',
                      textAlign: 'justify',
                      maxWidth: '720px',
                      margin: '0 auto',
                      fontFamily: 'Georgia, "Times New Roman", serif',
                    }}
                  >
                    <p style={{ margin: '0 0 16px' }}>
                      <strong>WE, THE PEOPLE OF INDIA</strong>, having solemnly resolved to constitute India into a{' '}
                      <strong style={{ color: 'var(--hl-dark)', textDecoration: 'underline' }}>SOVEREIGN</strong>{' '}
                      <strong style={{ color: 'var(--hl-dark)', textDecoration: 'underline' }}>SOCIALIST</strong>{' '}
                      <strong style={{ color: 'var(--hl-dark)', textDecoration: 'underline' }}>SECULAR</strong>{' '}
                      <strong style={{ color: 'var(--hl-dark)', textDecoration: 'underline' }}>DEMOCRATIC</strong>{' '}
                      <strong style={{ color: 'var(--hl-dark)', textDecoration: 'underline' }}>REPUBLIC</strong> and to secure to all its citizens:
                    </p>

                    <p style={{ margin: '0 0 12px', paddingLeft: '20px' }}>
                      <strong>JUSTICE</strong>, social, economic and political;
                    </p>

                    <p style={{ margin: '0 0 12px', paddingLeft: '20px' }}>
                      <strong>LIBERTY</strong> of thought, expression, belief, faith and worship;
                    </p>

                    <p style={{ margin: '0 0 12px', paddingLeft: '20px' }}>
                      <strong>EQUALITY</strong> of status and of opportunity; and to promote among them all;
                    </p>

                    <p style={{ margin: '0 0 20px', paddingLeft: '20px' }}>
                      <strong>FRATERNITY</strong> assuring the dignity of the individual and the{' '}
                      <strong style={{ color: 'var(--hl-dark)', textDecoration: 'underline' }}>unity and integrity of the Nation</strong>;
                    </p>

                    <p style={{ margin: 0, fontStyle: 'italic', fontWeight: 600 }}>
                      <strong>IN OUR CONSTITUENT ASSEMBLY</strong> this twenty-sixth day of November, 1949, do{' '}
                      <strong>HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION</strong>.
                    </p>
                  </div>

                  <div className="preamble-footer">
                    Adopted by the Constituent Assembly on 26 November 1949 · Enacted on 26 January 1950 · Amended once via 42nd Amendment Act 1976
                  </div>
                </div>

                {/* 4 Core Ingredients Breakdown */}
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '22px', color: 'var(--ink)', margin: '0 0 14px' }}>
                    4 Core Ingredients of the Preamble
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                    <div style={{ background: 'var(--card-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <strong style={{ color: 'var(--brand)', fontSize: '13px', display: 'block', marginBottom: '4px' }}>1. Source of Authority</strong>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.5' }}>
                        Derives its authority directly from the people of India (<em>&ldquo;We, the People&rdquo;</em>). Sovereignty resides with the citizens, not with any external power or hereditary ruler.
                      </p>
                    </div>

                    <div style={{ background: 'var(--card-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <strong style={{ color: 'var(--brand)', fontSize: '13px', display: 'block', marginBottom: '4px' }}>2. Nature of the Indian State</strong>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.5' }}>
                        Declares India to be a Sovereign, Socialist, Secular, Democratic, and Republican polity.
                      </p>
                    </div>

                    <div style={{ background: 'var(--card-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <strong style={{ color: 'var(--brand)', fontSize: '13px', display: 'block', marginBottom: '4px' }}>3. Statement of Objectives</strong>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.5' }}>
                        Specifies Justice (social, economic, political), Liberty, Equality, and Fraternity as the grand constitutional objectives to be secured for all citizens.
                      </p>
                    </div>

                    <div style={{ background: 'var(--card-bg)', padding: '16px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <strong style={{ color: 'var(--brand)', fontSize: '13px', display: 'block', marginBottom: '4px' }}>4. Date of Adoption</strong>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.5' }}>
                        Adopted on November 26, 1949 (celebrated nationwide as <em>Constitution Day / Samvidhan Diwas</em>). Came into full force on January 26, 1950 (Republic Day).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Keyword Semantic Analysis */}
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '22px', color: 'var(--ink)', margin: '0 0 14px' }}>
                    Key Constitutional Terms Explained
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ background: 'var(--card-bg)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <h4 style={{ fontSize: '16px', color: 'var(--brand)', margin: '0 0 6px' }}>Sovereign</h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.6' }}>
                        India is completely independent, supreme internally, and free from any external control. India can acquire foreign territory or cede a part of its territory in accordance with constitutional procedures (Article 1 to 4).
                      </p>
                    </div>

                    <div style={{ background: 'var(--card-bg)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <h4 style={{ fontSize: '16px', color: 'var(--brand)', margin: '0 0 6px' }}>
                        Socialist <span style={{ fontSize: '11px', background: 'var(--hl-bg)', color: 'var(--hl-dark)', border: '1px solid var(--hl-border)', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>Added by 42nd Amendment 1976</span>
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.6' }}>
                        India adheres to <strong>Democratic Socialism</strong> (a mixed economy where public and private sectors co-exist), not Communist state socialism. Its goal is the elimination of poverty, disease, and inequality of opportunity through welfare policies.
                      </p>
                    </div>

                    <div style={{ background: 'var(--card-bg)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <h4 style={{ fontSize: '16px', color: 'var(--brand)', margin: '0 0 6px' }}>
                        Secular <span style={{ fontSize: '11px', background: 'var(--hl-bg)', color: 'var(--hl-dark)', border: '1px solid var(--hl-border)', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>Added by 42nd Amendment 1976</span>
                      </h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.6' }}>
                        Follows the <strong>positive concept of secularism</strong> (<em>Sarva Dharma Sambhava</em>): all religions in India enjoy equal status, protection, and respect from the State, operationalized via Articles 25 to 28.
                      </p>
                    </div>

                    <div style={{ background: 'var(--card-bg)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <h4 style={{ fontSize: '16px', color: 'var(--brand)', margin: '0 0 6px' }}>Democratic &amp; Republic</h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.6' }}>
                        <strong>Democratic:</strong> Established on representative parliamentary democracy, regular periodic elections, universal adult suffrage (Article 326), and judicial review.
                        <br />
                        <strong>Republic:</strong> The head of the State (President of India) is elected indirectly by the people for a fixed term of 5 years (not hereditary like the British Crown). All public offices are open to all citizens without discrimination.
                      </p>
                    </div>

                    <div style={{ background: 'var(--card-bg)', padding: '16px 20px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                      <h4 style={{ fontSize: '16px', color: 'var(--brand)', margin: '0 0 6px' }}>Justice, Liberty, Equality &amp; Fraternity</h4>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.6' }}>
                        <strong>Justice:</strong> Social, Economic, and Political (borrowed from the 1917 Russian Revolution).
                        <br />
                        <strong>Liberty, Equality &amp; Fraternity:</strong> Ideals borrowed from the 1789 French Revolution. The word <strong>&ldquo;Integrity&rdquo;</strong> was inserted into Fraternity by the 42nd Constitutional Amendment Act, 1976.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Landmark Judicial Doctrine on Preamble */}
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '22px', color: 'var(--ink)', margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Scale size={20} color="var(--brand)" />
                    Landmark Supreme Court Jurisprudence on the Preamble
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ background: 'var(--red-bg)', border: '1px solid var(--red-border)', borderRadius: '10px', padding: '16px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '15px', color: 'var(--red)' }}>In re Berubari Union Case (1960)</strong>
                        <span style={{ fontSize: '11.5px', background: 'var(--card-bg)', color: 'var(--red)', border: '1px solid var(--red-border)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>8-Judge Bench</span>
                      </div>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.5' }}>
                        The Supreme Court opined that the Preamble is a key to open the mind of the constitution makers, but held that <strong>the Preamble is NOT a part of the Constitution</strong>.
                      </p>
                    </div>

                    <div style={{ background: 'var(--green-bg)', border: '1px solid var(--green-border)', borderRadius: '10px', padding: '16px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '15px', color: 'var(--green)' }}>Kesavananda Bharati v. State of Kerala (1973)</strong>
                        <span style={{ fontSize: '11.5px', background: 'var(--card-bg)', color: 'var(--green)', border: '1px solid var(--green-border)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Historic 13-Judge Bench</span>
                      </div>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: '0 0 6px', lineHeight: '1.5' }}>
                        Overruled the Berubari opinion and established three core constitutional doctrines:
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--ink2)', lineHeight: '1.5' }}>
                        <li>The Preamble <strong>IS an integral part of the Constitution</strong>.</li>
                        <li>The Preamble <strong>can be amended</strong> under Article 368.</li>
                        <li>Amendments to the Preamble cannot damage or destroy the <strong>Basic Structure</strong>.</li>
                      </ul>
                    </div>

                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '15px', color: 'var(--ink)' }}>LIC of India Case (1995)</strong>
                        <span style={{ fontSize: '11.5px', background: 'var(--surface-2)', color: 'var(--ink2)', border: '1px solid var(--line)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>Reaffirmation</span>
                      </div>
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.5' }}>
                        Supreme Court once again reaffirmed that the Preamble is an integral part of the Constitution. However, it confirmed that the Preamble is <strong>non-justiciable</strong> (its provisions are not enforceable in courts of law).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Continue to Part 1 Button */}
                <div style={{ textAlign: 'center', margin: '24px 0' }}>
                  <button
                    onClick={() => loadNextPart('Part I')}
                    style={{
                      padding: '12px 28px',
                      fontSize: '14px',
                      fontWeight: 700,
                      borderRadius: '8px',
                      background: 'var(--brand)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(15, 118, 110, 0.25)',
                    }}
                  >
                    Continue to Part I: The Union and its Territory (Articles 1–4)
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : null}

            {/* Preamble Callout Card when on Part I */}
            {partFilter === 'Part I' && (
              <div className="study-banner-amber">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ScrollText size={22} color="var(--hl-dark)" />
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--hl-dark)', display: 'block' }}>
                      Preceding Part I: The Preamble of the Constitution of India
                    </strong>
                    <span style={{ fontSize: '12.5px', color: 'var(--ink2)' }}>
                      &ldquo;We, the People of India, having solemnly resolved to constitute India into a Sovereign Socialist Secular Democratic Republic...&rdquo;
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setPartFilter('Preamble')}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    background: 'var(--hl-dark)',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Read Full Preamble Breakdown →
                </button>
              </div>
            )}

            {/* Current Part Banner */}
            {currentPartInfo && partFilter !== 'all' && (
              <div className="study-banner-part">
                <div>
                  <span className="part-kicker">
                    Currently Reading: {currentPartInfo.part}
                  </span>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', margin: '2px 0 4px', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                    {currentPartInfo.name} ({currentPartInfo.articlesRange})
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--ink2)', margin: 0, lineHeight: '1.5' }}>
                    {currentPartInfo.description}
                  </p>
                </div>
                <div className="part-count-badge">
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

                const badgeBg = isTopTested ? 'var(--red-bg)' : isFreqTested ? 'var(--hl-bg)' : isModTested ? 'var(--blue-bg)' : 'var(--card-bg-subtle)'
                const badgeColor = isTopTested ? 'var(--red)' : isFreqTested ? 'var(--hl-dark)' : isModTested ? 'var(--blue)' : 'var(--ink2)'
                const badgeBorder = isTopTested ? 'var(--red-border)' : isFreqTested ? 'var(--hl-border)' : isModTested ? 'var(--blue-border)' : 'var(--line)'

                return (
                  <article
                    key={art.id}
                    id={art.id}
                    style={{
                      padding: '20px 24px',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--line)',
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
                            color: 'var(--brand)',
                            fontFamily: 'var(--font-heading, "Fraunces", serif)',
                          }}
                        >
                          {art.article}
                        </span>
                        <h2
                          style={{
                            fontSize: '17px',
                            fontWeight: 700,
                            color: 'var(--ink)',
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
                    <p style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: '1.6', margin: '0 0 12px' }}>
                      {art.summary}
                    </p>

                    {/* Teaching Breakdown: In Simple Words */}
                    <div className="study-card-note">
                      <strong
                        style={{
                          fontSize: '11.5px',
                          textTransform: 'uppercase',
                          color: 'var(--brand)',
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
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', lineHeight: '1.55', margin: 0 }}>
                        {art.simpleExplanation}
                      </p>
                    </div>

                    {/* Landmark Judicial Precedent if available */}
                    {art.landmarkCase && (
                      <div className="study-badge-precedent">
                        <strong style={{ color: 'var(--ink)' }}>⚖️ Landmark Precedent:</strong> {art.landmarkCase}
                      </div>
                    )}

                    {/* Linewise Bottom Navigation & Practice Link */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '10px',
                        borderTop: '1px solid var(--line)',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <Link
                        to={`/exam/upsc-cse?tab=subjects&subject=Indian%20Polity`}
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: 'var(--brand)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Solve Indian Polity PYQs on {art.article}
                        <ChevronRight size={13} />
                      </Link>

                      <span style={{ fontSize: '12px', color: 'var(--ink3)', fontWeight: 600 }}>
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
                  className="study-btn-secondary"
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
                  background: 'var(--card-bg)',
                  border: '1.5px dashed var(--brand)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink3)', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '6px' }}>
                  Finished reading {currentPartInfo?.part} ({currentPartInfo?.name})
                </span>
                <h3 style={{ fontSize: '19px', fontFamily: 'var(--font-heading, "Fraunces", serif)', margin: '0 0 12px', color: 'var(--ink)' }}>
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
                        background: 'var(--surface-2)',
                        color: 'var(--ink)',
                        border: '1px solid var(--line)',
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
                background: 'var(--red-bg)',
                border: '1px solid var(--red-border)',
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
                <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--red)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={14} />
                  Historical Examination PYQ Ranking
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)', margin: '4px 0 6px', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                  Most Asked Articles in Indian Competitive Exams
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--ink2)', margin: 0, lineHeight: '1.5', maxWidth: '640px' }}>
                  Articles ranked in strict descending order of how frequently they appear in UPSC CSE Prelims, JKPSC CCE, SSC CGL, and State PSCs.
                </p>
              </div>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--red-border)', padding: '8px 16px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--red)' }}>{mostAskedArticles.length}</div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--red)' }}>Ranked Articles</div>
              </div>
            </div>

            {/* Search Box in Most Asked */}
            <div style={{ position: 'relative', marginBottom: '18px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink3)' }} />
              <input
                type="text"
                className="study-control-input"
                placeholder="Search ranked articles by number, title, or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  fontSize: '14px',
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
                      background: 'var(--card-bg)',
                      border: isTop5 ? '1.5px solid var(--red)' : '1px solid var(--line)',
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
                            background: isTop5 ? 'var(--red)' : isTop15 ? 'var(--hl-dark)' : 'var(--blue)',
                            color: '#ffffff',
                          }}
                        >
                          #{rank} Most Asked
                        </span>

                        <span
                          style={{
                            fontSize: '20px',
                            fontWeight: 800,
                            color: 'var(--brand)',
                            fontFamily: 'var(--font-heading, "Fraunces", serif)',
                          }}
                        >
                          {art.article}
                        </span>

                        <h2
                          style={{
                            fontSize: '17px',
                            fontWeight: 700,
                            color: 'var(--ink)',
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
                          background: 'var(--red-bg)',
                          color: 'var(--red)',
                          border: '1px solid var(--red-border)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Flame size={13} color="var(--red)" />
                        {art.pyqCount} Historical PYQs
                      </span>
                    </div>

                    <p style={{ fontSize: '14px', color: 'var(--ink)', lineHeight: '1.6', margin: '0 0 12px' }}>
                      {art.summary}
                    </p>

                    <div className="study-card-note">
                      <strong
                        style={{
                          fontSize: '11.5px',
                          textTransform: 'uppercase',
                          color: 'var(--brand)',
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
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2)', lineHeight: '1.55', margin: 0 }}>
                        {art.simpleExplanation}
                      </p>
                    </div>

                    {art.landmarkCase && (
                      <div className="study-badge-precedent">
                        <strong style={{ color: 'var(--ink)' }}>⚖️ Landmark Precedent:</strong> {art.landmarkCase}
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '10px',
                        borderTop: '1px solid var(--line)',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <Link
                        to={`/exam/upsc-cse?tab=subjects&subject=Indian%20Polity`}
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: 'var(--brand)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Practice Solved PYQs for {art.article}
                        <ChevronRight size={13} />
                      </Link>

                      <span style={{ fontSize: '12px', color: 'var(--ink3)', fontWeight: 600 }}>
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
                  className="study-btn-secondary"
                >
                  Load Next Ranked Articles ({mostAskedArticles.length - displayedMostAsked.length} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: PARTS OF THE CONSTITUTION (25 PARTS) */}
        {activeTab === 'parts' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {CONSTITUTION_PARTS.map((p) => (
              <div
                key={p.part}
                style={{
                  background: 'var(--card-bg)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid var(--line)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--brand)' }}>{p.part}</span>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', background: 'var(--surface-2)', color: 'var(--ink2)', border: '1px solid var(--line)' }}>
                      {p.articlesRange}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', margin: '0 0 8px', color: 'var(--ink)' }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink2)', lineHeight: '1.6', margin: 0 }}>
                    {p.description}
                  </p>
                </div>
                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <button
                    onClick={() => {
                      setPartFilter(p.part)
                      setActiveTab('articles')
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--brand)',
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

        {/* Tab 5: LANDMARK AMENDMENTS (15) */}
        {activeTab === 'amendments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredAmendments.map((am) => (
              <article
                key={am.amendment}
                style={{
                  padding: '20px 24px',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--brand)' }}>
                      {am.amendment}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink3)' }}>
                      ({am.year})
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', background: 'var(--blue-bg)', color: 'var(--blue)', border: '1px solid var(--blue-border)' }}>
                    Constitutional Amendment
                  </span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px' }}>
                  {am.title}
                </h3>
                <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--ink2)', margin: '0 0 10px' }}>
                  {am.significance}
                </p>
                <div style={{ background: 'var(--hl-bg)', border: '1px solid var(--hl-border)', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: 'var(--hl-dark)' }}>
                  <strong>💡 Exam Takeaway:</strong> {am.examNote}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Tab 6: ALL 12 SCHEDULES */}
        {activeTab === 'schedules' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredSchedules.map((sch) => (
              <article
                key={sch.schedule}
                style={{
                  padding: '20px 24px',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <h3 style={{ fontSize: '17px', margin: 0, color: 'var(--brand)', fontWeight: 800 }}>{sch.schedule}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--ink3)', fontWeight: 600 }}>{sch.articles}</span>
                </div>
                <h4 style={{ fontSize: '15px', color: 'var(--ink)', margin: '0 0 8px' }}>{sch.subject}</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink2)', lineHeight: '1.6', margin: 0 }}>
                  {sch.details}
                </p>
              </article>
            ))}
          </div>
        )}

        {/* Tab 7: EXAM FAQS (5) */}
        {activeTab === 'faq' && (
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '24px', margin: '0 0 16px', color: 'var(--ink)' }}>
              Frequently Asked Questions on the Constitution of India
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CONSTITUTION_EXPLORER_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--line)',
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
                        alignItems: 'flex-start',
                        gap: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--ink)',
                      }}
                    >
                      <div>
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: 'var(--blue-bg)',
                            color: 'var(--blue)',
                            border: '1px solid var(--blue-border)',
                            marginBottom: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.4px',
                          }}
                        >
                          {faq.examTag}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <HelpCircle size={17} color="var(--brand)" style={{ flexShrink: 0 }} />
                          <span>{faq.q}</span>
                        </div>
                      </div>
                      <ChevronRight
                        size={18}
                        color="var(--ink2)"
                        style={{
                          transform: isOpen ? 'rotate(90deg)' : 'none',
                          transition: 'transform 0.2s',
                          flexShrink: 0,
                          marginTop: '4px',
                        }}
                      />
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: '0 20px 16px',
                          fontSize: '14px',
                          color: 'var(--ink2)',
                          lineHeight: '1.65',
                          borderTop: '1px solid var(--line)',
                          paddingTop: '14px',
                        }}
                      >
                        <p style={{ margin: '0 0 10px' }}>{faq.a}</p>
                        <div style={{ background: 'var(--surface-2)', borderLeft: '3px solid var(--brand)', padding: '8px 12px', borderRadius: '0 6px 6px 0', fontSize: '12.5px', color: 'var(--brand)' }}>
                          <strong>Exam Takeaway:</strong> {faq.takeaway}
                        </div>
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
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--brand)', display: 'block', marginBottom: '6px' }}>
            Zero Paywall Question Bank
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '22px', margin: '0 0 8px', color: 'var(--ink)' }}>
            Practice Solved Indian Polity Previous Year Questions
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--ink2)', maxWidth: '640px', margin: '0 auto 18px', lineHeight: '1.6' }}>
            Test your understanding of the Preamble, Fundamental Rights, DPSP, Parliament, Executive, and Constitutional Amendments against real exam questions from UPSC Prelims, JKPSC CCE, SSC CGL, and CDS.
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
                background: 'var(--brand)',
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
                color: 'var(--ink)',
                background: 'var(--card-bg-subtle)',
                border: '1px solid var(--line)',
                padding: '10px 22px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              JKPSC CCE Polity PYQs →
            </Link>
          </div>
        </div>

        {/* SSR-Crawlable Complete Constitution Index (Parts I–XXV, Schedules & Amendments) */}
        <details className="study-ssr-index" style={{ marginTop: '28px' }}>
          <summary>
            Complete Constitution Reference Index — All 25 Parts, 395+ Articles, 12 Schedules &amp; 15 Landmark Amendments
          </summary>
          <div className="study-ssr-index-body">
            <h3>Parts &amp; Articles Directory</h3>
            <div className="study-ssr-parts-grid">
              {CONSTITUTION_PARTS.map((p) => {
                const partArts = ALL_CONSTITUTION_ARTICLES.filter((a) => a.part === p.part)
                return (
                  <div key={p.part} className="study-ssr-part-block">
                    <button
                      type="button"
                      className="study-ssr-part-link"
                      onClick={() => {
                        setActiveTab('articles')
                        setSelectedPart(p.part)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                    >
                      {p.part}: {p.name} ({p.articlesRange})
                    </button>
                    <p>{p.description}</p>
                    <ul>
                      {partArts.map((a) => (
                        <li key={a.article}>
                          <strong>{a.article}:</strong> {a.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            <h3>All 12 Schedules</h3>
            <ul>
              {SCHEDULES_DATABASE.map((s) => (
                <li key={s.schedule}>
                  <strong>{s.schedule} ({s.articles}):</strong> {s.subject} — {s.details}
                </li>
              ))}
            </ul>

            <h3>Landmark Constitutional Amendments</h3>
            <ul>
              {KEY_AMENDMENTS.map((am) => (
                <li key={am.amendment}>
                  <strong>{am.amendment} ({am.year}):</strong> {am.title} — {am.significance}
                </li>
              ))}
            </ul>
          </div>
        </details>

        {/* Cross-Link Ecosystem: Related Study Suites */}
        <section
          style={{
            marginTop: '36px',
            padding: '24px',
            background: 'var(--card-bg)',
            borderRadius: '14px',
            border: '1px solid var(--line)',
          }}
          aria-labelledby="polity-related-suites-heading"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--brand)' }}>
                Visual Learning Ecosystem
              </span>
              <h3 id="polity-related-suites-heading" style={{ margin: '3px 0 0', fontSize: '19px', fontWeight: 800, color: 'var(--ink)' }}>
                Explore Related Study Suites
              </h3>
            </div>
            <Link
              to="/study-material"
              style={{
                fontSize: '12.5px',
                fontWeight: 700,
                color: 'var(--brand)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 12px',
                borderRadius: '8px',
                background: 'var(--brand-soft)',
                border: '1px solid var(--brand-line)',
              }}
            >
              <span>All Study Materials</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
            <Link
              to="/modern-indian-history-timeline"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: '16px',
                borderRadius: '10px',
                background: 'var(--card-bg-subtle)',
                border: '1px solid var(--line)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>⏳</span>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--hl-dark)' }}>History</span>
              </div>
              <strong style={{ fontSize: '14.5px', color: 'var(--ink)' }}>Modern History Timeline (1757–1947)</strong>
              <span style={{ fontSize: '12.5px', color: 'var(--ink2)', lineHeight: '1.45' }}>
                Complete chronological Spectrum coverage, 35 Governor-Generals &amp; Viceroys, and British Acts.
              </span>
            </Link>

            <Link
              to="/ramsar-wetlands-and-national-parks"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: '16px',
                borderRadius: '10px',
                background: 'var(--card-bg-subtle)',
                border: '1px solid var(--line)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🌿</span>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--green)' }}>Environment</span>
              </div>
              <strong style={{ fontSize: '14.5px', color: 'var(--ink)' }}>Ramsar Wetlands Timeline (1981–2026)</strong>
              <span style={{ fontSize: '12.5px', color: 'var(--ink2)', lineHeight: '1.45' }}>
                All 103 Ramsar sites in chronological order, Montreux Record registry, and river basin links.
              </span>
            </Link>

            <Link
              to="/india-physical-geography-map"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                padding: '16px',
                borderRadius: '10px',
                background: 'var(--card-bg-subtle)',
                border: '1px solid var(--line)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>🗺️</span>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--blue)' }}>Geography</span>
              </div>
              <strong style={{ fontSize: '14.5px', color: 'var(--ink)' }}>India Physical Geography Map</strong>
              <span style={{ fontSize: '12.5px', color: 'var(--ink2)', lineHeight: '1.45' }}>
                Interactive map of 13 major river basins, tributaries by bank, lakes, and reservoirs.
              </span>
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}
