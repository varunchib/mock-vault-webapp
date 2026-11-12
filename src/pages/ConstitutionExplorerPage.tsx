import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { Search } from 'lucide-react'

export type ConstitutionalArticle = {
  article: string
  title: string
  part: string
  partName: string
  description: string
  examTakeaway: string
  pyqFrequency: 'High' | 'Very High' | 'Medium'
  landmarkCase?: string
}

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

const ARTICLES_DATABASE: ConstitutionalArticle[] = [
  {
    article: 'Article 14',
    title: 'Equality before Law & Equal Protection of Laws',
    part: 'Part III',
    partName: 'Fundamental Rights',
    description: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
    examTakeaway: '"Equality before law" is British negative concept; "Equal protection of laws" is American positive concept. Reasonable classification is permitted (Rule of Law).',
    pyqFrequency: 'Very High',
    landmarkCase: 'State of West Bengal v. Anwar Ali Sarkar (1952)',
  },
  {
    article: 'Article 19',
    title: 'Protection of 6 Fundamental Freedoms',
    part: 'Part III',
    partName: 'Fundamental Rights',
    description: 'Guarantees 6 basic freedoms to citizens: speech & expression, peaceful assembly, forming associations/cooperatives, free movement, residence, and practicing any profession.',
    examTakeaway: 'Originally had 7 freedoms; Right to Property (19(1)(f)) was deleted by 44th Amendment 1978. Freedoms are subject to reasonable restrictions under Article 19(2)-(6).',
    pyqFrequency: 'Very High',
    landmarkCase: 'Romesh Thappar v. State of Madras (1950)',
  },
  {
    article: 'Article 21',
    title: 'Protection of Life and Personal Liberty',
    part: 'Part III',
    partName: 'Fundamental Rights',
    description: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    examTakeaway: 'Expanded through Maneka Gandhi case to mean "Due Process of Law" (just, fair, and reasonable). Cannot be suspended even during National Emergency (along with Art 20).',
    pyqFrequency: 'Very High',
    landmarkCase: 'Maneka Gandhi v. Union of India (1978); K.S. Puttaswamy (Right to Privacy 2017)',
  },
  {
    article: 'Article 21A',
    title: 'Right to Education',
    part: 'Part III',
    partName: 'Fundamental Rights',
    description: 'The State shall provide free and compulsory education to all children of the age of six to fourteen years.',
    examTakeaway: 'Inserted by 86th Constitutional Amendment Act, 2002. Enforced via RTE Act, 2009. Corresponds to Fundamental Duty Article 51A(k).',
    pyqFrequency: 'Very High',
  },
  {
    article: 'Article 32',
    title: 'Remedies for Enforcement of Fundamental Rights (Constitutional Remedies)',
    part: 'Part III',
    partName: 'Fundamental Rights',
    description: 'Right to move Supreme Court by appropriate proceedings for enforcement of Fundamental Rights. SC can issue 5 writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari.',
    examTakeaway: 'Dr. B.R. Ambedkar called it the "Heart and Soul of the Constitution". Part of Basic Structure. High Courts issue writs under Article 226 (which has wider jurisdiction).',
    pyqFrequency: 'Very High',
    landmarkCase: 'Fertilizer Corporation Kamgar Union v. UOI (1981)',
  },
  {
    article: 'Article 44',
    title: 'Uniform Civil Code for the Citizens',
    part: 'Part IV',
    partName: 'Directive Principles (DPSP)',
    description: 'The State shall endeavour to secure for the citizens a Uniform Civil Code throughout the territory of India.',
    examTakeaway: 'Non-justiciable Directive Principle. Goa is the first state with common civil law (inherited Portuguese Civil Code); Uttarakhand passed UCC Bill in 2024.',
    pyqFrequency: 'Very High',
    landmarkCase: 'Shah Bano Begum case (1985); Sarla Mudgal (1995)',
  },
  {
    article: 'Article 51A',
    title: 'Fundamental Duties',
    part: 'Part IVA',
    partName: 'Fundamental Duties',
    description: 'Lists 11 civic and patriotic duties for Indian citizens (cherishing national struggle, protecting sovereignty, promoting harmony, safeguarding public property).',
    examTakeaway: 'Recommended by Swaran Singh Committee (1976). Added by 42nd Amendment (10 duties). 11th duty (education for 6-14 years) added by 86th Amendment (2002). Non-justiciable.',
    pyqFrequency: 'Very High',
  },
  {
    article: 'Article 72',
    title: 'Pardoning Power of the President',
    part: 'Part V',
    partName: 'The Union Executive',
    description: 'Empowers President to grant pardons, reprieves, respites or remissions of punishment, or suspend, remit or commute sentences in court-martial, union laws, and death sentences.',
    examTakeaway: 'President exercises this on aid and advice of Union Council of Ministers. Governor has pardoning power under Art 161 (Governor cannot pardon death sentence or court martial).',
    pyqFrequency: 'High',
    landmarkCase: 'Kehar Singh v. Union of India (1989)',
  },
  {
    article: 'Article 110',
    title: 'Definition of Money Bills',
    part: 'Part V',
    partName: 'The Union Parliament',
    description: 'Bill containing only provisions dealing with imposition, abolition, or regulation of tax, borrowing by government, or expenditure from Consolidated Fund of India.',
    examTakeaway: 'Speaker of Lok Sabha has final authority to certify whether a bill is a Money Bill. Rajya Sabha cannot reject or amend; must return within 14 days. No joint sitting (Art 108).',
    pyqFrequency: 'Very High',
  },
  {
    article: 'Article 112',
    title: 'Annual Financial Statement (Budget)',
    part: 'Part V',
    partName: 'The Union Parliament',
    description: 'Statement of estimated receipts and expenditure of the Government of India for every financial year.',
    examTakeaway: 'The term "Budget" does not appear in the Constitution; it is officially termed "Annual Financial Statement". Distinguishes expenditure charged upon Consolidated Fund.',
    pyqFrequency: 'High',
  },
  {
    article: 'Article 123',
    title: 'Power of President to Promulgate Ordinances',
    part: 'Part V',
    partName: 'The Union Executive',
    description: 'President can issue ordinances when either House of Parliament is not in session and circumstances require immediate action.',
    examTakeaway: 'Same force and effect as an Act of Parliament. Must be laid before Parliament within 6 weeks of reassembly; maximum validity without approval is 6 months + 6 weeks.',
    pyqFrequency: 'Very High',
    landmarkCase: 'D.C. Wadhwa v. State of Bihar (1987) on ordinance repromulgation',
  },
  {
    article: 'Article 148',
    title: 'Comptroller and Auditor General of India (CAG)',
    part: 'Part V',
    partName: 'The Union',
    description: 'Provides for an independent Comptroller and Auditor General appointed by the President by warrant under his hand and seal.',
    examTakeaway: 'Guardian of the Public Purse. Tenure: 6 years or 65 years of age. Removed like a Supreme Court judge. Reports submitted to President who lays them before Parliament (PAC reviews).',
    pyqFrequency: 'High',
  },
  {
    article: 'Article 280',
    title: 'Finance Commission',
    part: 'Part XII',
    partName: 'Finance, Property, Contracts',
    description: 'President constitutes a Finance Commission every 5th year to recommend distribution of net tax proceeds between Union and States, and principles of grants-in-aid.',
    examTakeaway: 'Quasi-judicial body consisting of a Chairman + 4 other members. Recommendations are advisory in nature. 16th Finance Commission headed by Dr. Arvind Panagariya.',
    pyqFrequency: 'Very High',
  },
  {
    article: 'Article 324',
    title: 'Superintendence, Direction & Control of Elections in Election Commission',
    part: 'Part XV',
    partName: 'Elections',
    description: 'Vests superintendence, direction, and control of elections to Parliament, State Legislatures, President, and Vice-President in the Election Commission of India.',
    examTakeaway: 'Panchayat & Municipal elections are conducted by State Election Commissions (Arts 243K & 243ZA), NOT by ECI. CEC removed like an SC judge.',
    pyqFrequency: 'Very High',
    landmarkCase: 'T.N. Seshan v. Union of India (1995)',
  },
  {
    article: 'Article 352',
    title: 'Proclamation of National Emergency',
    part: 'Part XVIII',
    partName: 'Emergency Provisions',
    description: 'President can proclaim National Emergency on grounds of War, External Aggression, or Armed Rebellion.',
    examTakeaway: '"Armed Rebellion" replaced "Internal Disturbance" via 44th Amendment (1978). Written recommendation from Union Cabinet is mandatory. Approved by special majority within 1 month.',
    pyqFrequency: 'Very High',
  },
  {
    article: 'Article 356',
    title: 'President’s Rule (State Emergency)',
    part: 'Part XVIII',
    partName: 'Emergency Provisions',
    description: 'Proclamation on failure of constitutional machinery in a State, upon receipt of a report from Governor or otherwise.',
    examTakeaway: 'Approved by simple majority within 2 months. Maximum duration is 3 years with periodic renewals every 6 months. Subject to judicial review.',
    pyqFrequency: 'Very High',
    landmarkCase: 'S.R. Bommai v. Union of India (1994)',
  },
  {
    article: 'Article 368',
    title: 'Power of Parliament to Amend the Constitution',
    part: 'Part XX',
    partName: 'Amendment of the Constitution',
    description: 'Parliament may in exercise of its constituent power amend by way of addition, variation or repeal any provision of the Constitution.',
    examTakeaway: 'Two types of amendments under 368: Special Majority (2/3 present & voting + majority of total membership) AND Special Majority + Ratification by half of States. Cannot alter "Basic Structure".',
    pyqFrequency: 'Very High',
    landmarkCase: 'Kesavananda Bharati v. State of Kerala (1973)',
  },
]

const KEY_AMENDMENTS: ConstitutionalAmendment[] = [
  {
    amendment: '42nd Amendment Act, 1976',
    year: 1976,
    title: 'The "Mini-Constitution"',
    significance: 'Added words "Socialist, Secular, Integrity" to Preamble. Added Part IVA (Fundamental Duties). Added Part XIVA (Tribunals). Curtailed judicial review.',
    examNote: 'Enacted during Internal Emergency under Indira Gandhi. Many anti-democratic provisions were reversed by 44th Amendment.',
  },
  {
    amendment: '44th Amendment Act, 1978',
    year: 1978,
    title: 'Restoration of Democratic Safeguards',
    significance: 'Replaced "internal disturbance" with "armed rebellion" in Art 352. Removed Right to Property from Fundamental Rights (made legal right under 300A). Art 20 & 21 cannot be suspended in emergency.',
    examNote: 'Enacted by Janata Party government under Morarji Desai.',
  },
  {
    amendment: '73rd & 74th Amendment Acts, 1992',
    year: 1992,
    title: 'Panchayati Raj & Municipalities',
    significance: 'Gave constitutional status to rural (73rd) and urban (74th) local self-governments. Added Part IX & 11th Schedule (29 items), and Part IXA & 12th Schedule (18 items).',
    examNote: 'Mandatory 33% reservation for women in local bodies.',
  },
  {
    amendment: '86th Amendment Act, 2002',
    year: 2002,
    title: 'Right to Education as Fundamental Right',
    significance: 'Inserted Article 21A (free & compulsory education for children 6-14). Altered DPSP Article 45. Added 11th Fundamental Duty Article 51A(k).',
    examNote: 'One of the most repeatedly asked amendment questions across UPSC & State PSCs.',
  },
  {
    amendment: '101st Amendment Act, 2016',
    year: 2016,
    title: 'Goods and Services Tax (GST)',
    significance: 'Introduced nationwide unified indirect tax (GST). Inserted Article 246A (concurrent power to levy GST) and Article 279A (GST Council headed by Union Finance Minister).',
    examNote: 'Requires Special Majority + 50% State ratification.',
  },
  {
    amendment: '103rd Amendment Act, 2019',
    year: 2019,
    title: '10% EWS Reservation',
    significance: 'Provided up to 10% reservation for Economically Weaker Sections (EWS) in educational admissions and public appointments by amending Articles 15(6) and 16(6).',
    examNote: 'Upheld by Supreme Court in Janhit Abhiyan v. Union of India (2022).',
  },
  {
    amendment: '106th Amendment Act, 2023',
    year: 2023,
    title: 'Nari Shakti Vandan Adhiniyam (Women Reservation)',
    significance: 'Provides 33% reservation for women in Lok Sabha, State Legislative Assemblies, and Delhi Assembly for 15 years after delimitation.',
    examNote: 'Inserted Article 330A, 332A, and 334A.',
  },
]

const SCHEDULES_DATABASE: ConstitutionalSchedule[] = [
  { schedule: '1st Schedule', subject: 'States and Union Territories', details: 'Names of States and Union Territories and their territorial jurisdictions.', articles: 'Articles 1 and 4' },
  { schedule: '2nd Schedule', subject: 'Salaries and Emoluments', details: 'Provisions relating to President, Governors, Speaker, Judges of SC/HC, CAG.', articles: 'Articles 59, 65, 75, 97, 125, 148, 158' },
  { schedule: '3rd Schedule', subject: 'Forms of Oaths and Affirmations', details: 'Oaths for Ministers, MPs, MLAs, Judges, CAG. (President & VP oaths are under Arts 60 & 69).', articles: 'Articles 75, 84, 99, 124, 146, 173' },
  { schedule: '4th Schedule', subject: 'Allocation of Seats in Rajya Sabha', details: 'Allocation of Council of States seats to States and UTs on population basis.', articles: 'Articles 4 and 80' },
  { schedule: '5th Schedule', subject: 'Scheduled Areas and Scheduled Tribes', details: 'Administration and control of Scheduled Areas and Scheduled Tribes in states other than Assam, Meghalaya, Tripura, Mizoram.', articles: 'Article 244(1)' },
  { schedule: '6th Schedule', subject: 'Tribal Areas in Northeast (AMTM)', details: 'Administration of tribal areas in Assam, Meghalaya, Tripura, and Mizoram through Autonomous District Councils (ADCs).', articles: 'Articles 244(2) and 275(1)' },
  { schedule: '7th Schedule', subject: 'Division of Powers (Three Lists)', details: 'Union List (originally 97, now 100), State List (originally 66, now 61), Concurrent List (originally 47, now 52).', articles: 'Article 246' },
  { schedule: '8th Schedule', subject: 'Official Languages of India', details: 'Recognises 22 official languages (originally 14; Sindhi added 1967; Konkani, Manipuri, Nepali added 1992; Bodo, Dogri, Maithili, Santhali added 2003).', articles: 'Articles 344 and 351' },
  { schedule: '9th Schedule', subject: 'Validation of Certain Acts and Regulations', details: 'Added by 1st Amendment (1951) to protect land reform laws from judicial review on ground of Fundamental Rights violation. Subject to basic structure review post-1973 (I.R. Coelho).', articles: 'Article 31B' },
  { schedule: '10th Schedule', subject: 'Anti-Defection Law', details: 'Added by 52nd Amendment (1985). Disqualification of legislators on grounds of defection. Presiding officer decides disqualification.', articles: 'Articles 102(2) and 191(2)' },
  { schedule: '11th Schedule', subject: 'Panchayats (Rural Local Government)', details: 'Added by 73rd Amendment (1992). Contains 29 functional matters of Panchayats.', articles: 'Article 243G' },
  { schedule: '12th Schedule', subject: 'Municipalities (Urban Local Government)', details: 'Added by 74th Amendment (1992). Contains 18 functional matters of Municipalities.', articles: 'Article 243W' },
]

export function ConstitutionExplorerPage() {
  const [search, setSearch] = React.useState('')
  const [activeTab, setActiveTab] = React.useState<'articles' | 'amendments' | 'schedules'>('articles')
  const [partFilter, setPartFilter] = React.useState('all')

  usePageMeta({
    title: 'Interactive Constitution of India Explorer: Articles, Parts & Amendments | Ministry of Papers',
    description: 'Explore the Constitution of India interactively. Search Articles 1-395, Schedules 1-12, landmark amendments, and exam key takeaways with verified PYQs for UPSC & State PSCs.',
    canonicalPath: '/constitution-of-india',
  })

  const filteredArticles = React.useMemo(() => {
    return ARTICLES_DATABASE.filter((art) => {
      const matchSearch =
        search === '' ||
        art.article.toLowerCase().includes(search.toLowerCase()) ||
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.description.toLowerCase().includes(search.toLowerCase()) ||
        art.examTakeaway.toLowerCase().includes(search.toLowerCase())

      const matchPart = partFilter === 'all' || art.part === partFilter
      return matchSearch && matchPart
    })
  }, [search, partFilter])

  const filteredAmendments = React.useMemo(() => {
    return KEY_AMENDMENTS.filter((am) => {
      return (
        search === '' ||
        am.amendment.toLowerCase().includes(search.toLowerCase()) ||
        am.title.toLowerCase().includes(search.toLowerCase()) ||
        am.significance.toLowerCase().includes(search.toLowerCase()) ||
        am.examNote.toLowerCase().includes(search.toLowerCase())
      )
    })
  }, [search])

  const filteredSchedules = React.useMemo(() => {
    return SCHEDULES_DATABASE.filter((sch) => {
      return (
        search === '' ||
        sch.schedule.toLowerCase().includes(search.toLowerCase()) ||
        sch.subject.toLowerCase().includes(search.toLowerCase()) ||
        sch.details.toLowerCase().includes(search.toLowerCase()) ||
        sch.articles.toLowerCase().includes(search.toLowerCase())
      )
    })
  }, [search])

  return (
    <section className="public-page">
      <div className="public-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/exams">Study Tools</Link>
          <span aria-hidden="true">›</span>
          <span>Constitution of India Explorer</span>
        </nav>

        <header style={{ marginBottom: '28px' }}>
          <span className="public-kicker">Interactive Polity Study Suite</span>
          <h1 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: 'clamp(28px, 4vw, 42px)', margin: '8px 0 10px', color: 'var(--ink, #0f172a)' }}>
            Constitution of India Explorer
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink2, #475569)', maxWidth: '780px', lineHeight: '1.6', margin: 0 }}>
            Master Articles, Schedules, Landmark Amendments, and Supreme Court Doctrines for UPSC, JKPSC, JKSSB, and State PSC exams. Filter high-yield articles and test your preparation against real past questions.
          </p>
        </header>

        {/* Tab Switcher & Search Bar */}
        <div style={{ background: 'var(--card-bg, #ffffff)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--line, #e2e8f0)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button
              onClick={() => setActiveTab('articles')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                background: activeTab === 'articles' ? 'var(--brand, #0f766e)' : 'transparent',
                color: activeTab === 'articles' ? '#ffffff' : 'var(--ink, #0f172a)',
                borderColor: activeTab === 'articles' ? 'var(--brand, #0f766e)' : 'var(--line, #e2e8f0)',
              }}
            >
              Key Exam Articles ({ARTICLES_DATABASE.length})
            </button>
            <button
              onClick={() => setActiveTab('amendments')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                background: activeTab === 'amendments' ? 'var(--brand, #0f766e)' : 'transparent',
                color: activeTab === 'amendments' ? '#ffffff' : 'var(--ink, #0f172a)',
                borderColor: activeTab === 'amendments' ? 'var(--brand, #0f766e)' : 'var(--line, #e2e8f0)',
              }}
            >
              Landmark Amendments ({KEY_AMENDMENTS.length})
            </button>
            <button
              onClick={() => setActiveTab('schedules')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                border: '1px solid',
                background: activeTab === 'schedules' ? 'var(--brand, #0f766e)' : 'transparent',
                color: activeTab === 'schedules' ? '#ffffff' : 'var(--ink, #0f172a)',
                borderColor: activeTab === 'schedules' ? 'var(--brand, #0f766e)' : 'var(--line, #e2e8f0)',
              }}
            >
              All 12 Schedules ({SCHEDULES_DATABASE.length})
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 280px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink2, #64748b)' }} />
              <input
                type="text"
                placeholder={`Search ${activeTab} by number, topic, or keyword (e.g. "Article 21", "GST", "Emergency")...`}
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

            {activeTab === 'articles' && (
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
                }}
              >
                <option value="all">All Parts</option>
                <option value="Part III">Part III: Fundamental Rights</option>
                <option value="Part IV">Part IV: Directive Principles (DPSP)</option>
                <option value="Part IVA">Part IVA: Fundamental Duties</option>
                <option value="Part V">Part V: The Union (Exec &amp; Parliament)</option>
                <option value="Part XII">Part XII: Finance (Finance Commission)</option>
                <option value="Part XV">Part XV: Elections</option>
                <option value="Part XVIII">Part XVIII: Emergency Provisions</option>
                <option value="Part XX">Part XX: Amendments</option>
              </select>
            )}
          </div>
        </div>

        {/* Content View */}
        {activeTab === 'articles' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {filteredArticles.map((art) => (
              <article
                key={art.article}
                style={{
                  padding: '20px',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--line, #e2e8f0)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand, #0f766e)' }}>{art.part} · {art.partName}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: art.pyqFrequency === 'Very High' ? '#fef2f2' : '#f0fdf4',
                        color: art.pyqFrequency === 'Very High' ? '#b91c1c' : '#15803d',
                        border: `1px solid ${art.pyqFrequency === 'Very High' ? '#fecaca' : '#bbf7d0'}`,
                      }}
                    >
                      {art.pyqFrequency} PYQ Frequency
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', margin: '0 0 6px', color: 'var(--ink, #0f172a)', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                    {art.article}: {art.title}
                  </h3>

                  <p style={{ fontSize: '13.5px', color: 'var(--ink, #334155)', lineHeight: '1.6', margin: '0 0 12px' }}>
                    {art.description}
                  </p>

                  <div style={{ background: 'var(--bg, #f8fafc)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--brand, #0f766e)', marginBottom: '12px' }}>
                    <strong style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--brand, #0f766e)', letterSpacing: '0.4px', display: 'block', marginBottom: '4px' }}>
                      Key Exam Takeaway
                    </strong>
                    <span style={{ fontSize: '13px', color: 'var(--ink2, #475569)', lineHeight: '1.5' }}>
                      {art.examTakeaway}
                    </span>
                  </div>

                  {art.landmarkCase && (
                    <div style={{ fontSize: '12.5px', color: 'var(--ink2, #64748b)', marginBottom: '12px' }}>
                      <strong>Landmark Judicial Reference:</strong> {art.landmarkCase}
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--line, #e2e8f0)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link
                    to={`/exam/upsc-cse?tab=subjects&subject=Indian%20Polity`}
                    style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--brand, #0f766e)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    Solve Polity Questions on this Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'amendments' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {filteredAmendments.map((am) => (
              <article
                key={am.amendment}
                style={{
                  padding: '20px',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--line, #e2e8f0)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--brand, #0f766e)' }}>Year: {am.year}</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', background: '#eff6ff', color: '#1d4ed8' }}>
                    Constitutional Amendment
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', margin: '0 0 6px', color: 'var(--ink, #0f172a)' }}>
                  {am.amendment}
                </h3>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink2, #64748b)', margin: '0 0 10px' }}>
                  {am.title}
                </h4>
                <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--ink, #334155)', margin: '0 0 12px' }}>
                  {am.significance}
                </p>
                <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '10px 12px', borderRadius: '8px', fontSize: '12.5px', color: '#854d0e' }}>
                  <strong>Exam Tip:</strong> {am.examNote}
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'schedules' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {filteredSchedules.map((sch) => (
              <article
                key={sch.schedule}
                style={{
                  padding: '20px',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--line, #e2e8f0)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '17px', margin: 0, color: 'var(--brand, #0f766e)' }}>{sch.schedule}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--ink2, #64748b)' }}>{sch.articles}</span>
                </div>
                <h4 style={{ fontSize: '15px', color: 'var(--ink, #0f172a)', margin: '0 0 8px' }}>{sch.subject}</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--ink2, #475569)', lineHeight: '1.6', margin: 0 }}>
                  {sch.details}
                </p>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Educational Banner */}
        <div style={{ marginTop: '36px', textAlign: 'center', padding: '24px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '20px', margin: '0 0 8px', color: 'var(--ink, #0f172a)' }}>
            Practice Indian Polity Previous Year Questions
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--ink2, #475569)', maxWidth: '600px', margin: '0 auto 16px' }}>
            Put these articles and constitutional amendments into practice with hundreds of solved questions from UPSC Prelims, JKPSC CCE, and SSC CGL.
          </p>
          <Link
            to="/exam/upsc-cse?tab=subjects&subject=Indian%20Polity"
            style={{
              display: 'inline-block',
              fontWeight: 700,
              fontSize: '13.5px',
              color: '#ffffff',
              background: 'var(--brand, #0f766e)',
              padding: '9px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Solve Indian Polity PYQs (Free) →
          </Link>
        </div>
      </div>
    </section>
  )
}
