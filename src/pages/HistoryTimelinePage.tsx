import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { Search } from 'lucide-react'

export type HistoryEvent = {
  year: number
  monthYear?: string
  title: string
  era: '1757-1857' | '1858-1905' | '1905-1919' | '1919-1939' | '1939-1947'
  viceroy?: string
  significance: string
  examTakeaway: string
  category: 'Movement' | 'Act / Legislation' | 'Revolt' | 'Congress Session' | 'Commission'
}

const HISTORY_EVENTS: HistoryEvent[] = [
  {
    year: 1757,
    monthYear: '23 June 1757',
    title: 'Battle of Plassey',
    era: '1757-1857',
    viceroy: 'Robert Clive',
    significance: 'British East India Company defeated Siraj-ud-Daulah (Nawab of Bengal) with betrayal of Mir Jafar.',
    examTakeaway: 'Established British political foothold in India; Company acquired 24 Parganas district revenues.',
    category: 'Revolt',
  },
  {
    year: 1764,
    monthYear: '22 October 1764',
    title: 'Battle of Buxar',
    era: '1757-1857',
    viceroy: 'Hector Munro (Company Commander)',
    significance: 'Company defeated joint forces of Mir Qasim (Bengal), Shuja-ud-Daulah (Awadh), and Mughal Emperor Shah Alam II.',
    examTakeaway: 'Led to Treaty of Allahabad (1765) granting Diwani rights (revenue collection) of Bengal, Bihar, and Orissa to Company.',
    category: 'Revolt',
  },
  {
    year: 1773,
    title: 'Regulating Act of 1773',
    era: '1757-1857',
    viceroy: 'Warren Hastings',
    significance: 'First step by British Parliament to control and regulate East India Company administration.',
    examTakeaway: 'Designated Governor of Bengal as "Governor-General of Bengal" (Warren Hastings). Established Supreme Court at Calcutta (1774 with Sir Elijah Impey as CJ).',
    category: 'Act / Legislation',
  },
  {
    year: 1784,
    title: 'Pitt’s India Act of 1784',
    era: '1757-1857',
    viceroy: 'Warren Hastings',
    significance: 'Established dual system of control: Court of Directors managed commercial affairs; Board of Control managed political affairs.',
    examTakeaway: 'Company’s territories in India were for the first time officially called "British Possessions in India".',
    category: 'Act / Legislation',
  },
  {
    year: 1793,
    title: 'Permanent Settlement of Bengal',
    era: '1757-1857',
    viceroy: 'Lord Cornwallis',
    significance: 'Zamidari land revenue system introduced in Bengal, Bihar, and Orissa. Zamindars declared owners of land with fixed revenue (10/11th to Company, 1/11th to Zamindar).',
    examTakeaway: 'Cornwallis is also known as the "Father of Civil Services in India" and introduced the Cornwallis Code.',
    category: 'Act / Legislation',
  },
  {
    year: 1798,
    title: 'Subsidiary Alliance System',
    era: '1757-1857',
    viceroy: 'Lord Wellesley',
    significance: 'Indian rulers had to maintain British troops at their expense and surrender external foreign relations.',
    examTakeaway: 'First Indian state to accept Subsidiary Alliance: Nizam of Hyderabad (1798), followed by Mysore (1799), Tanjore (1799), Awadh (1801), and Peshwa (1802).',
    category: 'Act / Legislation',
  },
  {
    year: 1829,
    title: 'Abolition of Sati (Regulation XVII)',
    era: '1757-1857',
    viceroy: 'Lord William Bentinck',
    significance: 'Declared practice of Sati illegal and punishable by criminal courts, spurred by efforts of Raja Ram Mohan Roy.',
    examTakeaway: 'Bentinck was made the first "Governor-General of India" by Charter Act of 1833.',
    category: 'Act / Legislation',
  },
  {
    year: 1848,
    title: 'Doctrine of Lapse',
    era: '1757-1857',
    viceroy: 'Lord Dalhousie',
    significance: 'States where ruler died without natural male heir were annexed by British; adopted sons denied succession rights.',
    examTakeaway: 'Order of annexation: Satara (1848) $\\rightarrow$ Jaitpur & Sambalpur (1849) $\\rightarrow$ Baghat (1850) $\\rightarrow$ Udaipur (1852) $\\rightarrow$ Jhansi (1853) $\\rightarrow$ Nagpur (1854). Awadh annexed on grounds of "maladministration" (1856).',
    category: 'Act / Legislation',
  },
  {
    year: 1857,
    monthYear: 'May 1857',
    title: 'The Revolt of 1857 (Sepoy Mutiny / First War of Independence)',
    era: '1757-1857',
    viceroy: 'Lord Canning',
    significance: 'Widespread uprising against British rule starting in Meerut. Leaders included Bahadur Shah Zafar (Delhi), Nana Saheb & Tantia Tope (Kanpur), Rani Lakshmibai (Jhansi), Begum Hazrat Mahal (Lucknow), Kunwar Singh (Arrah/Bihar).',
    examTakeaway: 'Immediate trigger: Enfield rifle greased cartridges (cow and pig fat). Led to Government of India Act 1858.',
    category: 'Revolt',
  },
  {
    year: 1858,
    monthYear: 'November 1858',
    title: 'Government of India Act 1858 (Queen’s Proclamation)',
    era: '1858-1905',
    viceroy: 'Lord Canning',
    significance: 'Ended East India Company rule; transferred governance directly to British Crown. Abolished Board of Control and Court of Directors.',
    examTakeaway: 'Created office of Secretary of State for India. Designated Governor-General as "Viceroy of India" (Lord Canning became first Viceroy).',
    category: 'Act / Legislation',
  },
  {
    year: 1885,
    monthYear: '28 December 1885',
    title: 'Formation of Indian National Congress (INC)',
    era: '1858-1905',
    viceroy: 'Lord Dufferin',
    significance: 'Founded at Gokuldas Tejpal Sanskrit College, Bombay by Allan Octavian Hume (A.O. Hume). 72 delegates attended.',
    examTakeaway: 'First President was W.C. Bonnerjee. Early phase (1885-1905) known as Moderate Phase led by Dadabhai Naoroji, Gopal Krishna Gokhale, Pherozeshah Mehta.',
    category: 'Congress Session',
  },
  {
    year: 1905,
    monthYear: 'October 1905',
    title: 'Partition of Bengal & Swadeshi Movement',
    era: '1905-1919',
    viceroy: 'Lord Curzon',
    significance: 'Bengal partitioned on communal lines into Bengal and Eastern Bengal & Assam. Sparked mass Swadeshi and Boycott movement.',
    examTakeaway: 'Song "Amar Sonar Bangla" composed by Rabindranath Tagore. Vande Mataram became national slogan. Partition annulled in 1911 by Lord Hardinge.',
    category: 'Movement',
  },
  {
    year: 1907,
    monthYear: 'December 1907',
    title: 'Surat Split of Congress',
    era: '1905-1919',
    viceroy: 'Lord Minto II',
    significance: 'Congress split into Moderates (led by Gokhale) and Extremists (Lal-Bal-Pal: Lala Lajpat Rai, Bal Gangadhar Tilak, Bipin Chandra Pal).',
    examTakeaway: 'Surat session presided over by Rash Behari Ghosh. Reunified in Lucknow Session 1916 (presided by A.C. Majumdar).',
    category: 'Congress Session',
  },
  {
    year: 1909,
    title: 'Morley-Minto Reforms (Indian Councils Act 1909)',
    era: '1905-1919',
    viceroy: 'Lord Minto II (Sec of State: John Morley)',
    significance: 'Introduced separate communal electorates for Muslims. Satyendra Prasad Sinha became first Indian in Viceroy’s Executive Council.',
    examTakeaway: 'Lord Minto became known as the "Father of Communal Electorate".',
    category: 'Act / Legislation',
  },
  {
    year: 1916,
    title: 'Lucknow Pact & Home Rule League',
    era: '1905-1919',
    viceroy: 'Lord Chelmsford',
    significance: 'Joint session of Congress and Muslim League; Congress accepted separate electorates. Bal Gangadhar Tilak and Annie Besant launched separate Home Rule Leagues.',
    examTakeaway: 'Tilak’s slogan: "Swaraj is my birthright and I shall have it". Tilak worked in Maharashtra/Karnataka; Besant in rest of India.',
    category: 'Movement',
  },
  {
    year: 1919,
    monthYear: '13 April 1919',
    title: 'Jallianwala Bagh Massacre & Rowlatt Act',
    era: '1919-1939',
    viceroy: 'Lord Chelmsford',
    significance: 'General Dyer ordered troops to fire on unarmed gathering protesting arrest of Dr. Saifuddin Kitchlew and Dr. Satyapal in Amritsar.',
    examTakeaway: 'Rabindranath Tagore renounced his Knighthood. Gandhi returned Kaiser-i-Hind medal and launched Non-Cooperation Movement. Hunter Commission appointed to investigate.',
    category: 'Movement',
  },
  {
    year: 1920,
    monthYear: 'August 1920',
    title: 'Non-Cooperation & Khilafat Movement',
    era: '1919-1939',
    viceroy: 'Lord Chelmsford',
    significance: 'First mass movement under Mahatma Gandhi boycotting British goods, schools, courts, and honors. Aligned with Khilafat leaders (Ali Brothers).',
    examTakeaway: 'Passed at special Calcutta session and ratified at Nagpur session (1920, C. Vijayaraghavachariar). Called off after Chauri Chaura incident (Feb 1922).',
    category: 'Movement',
  },
  {
    year: 1927,
    monthYear: 'November 1927',
    title: 'Simon Commission',
    era: '1919-1939',
    viceroy: 'Lord Irwin',
    significance: 'Statutory commission appointed to review working of Government of India Act 1919. Composed of 7 British MPs with no Indian members.',
    examTakeaway: 'Boycotted with "Simon Go Back" slogan. Lala Lajpat Rai succumbed to lathi-charge injuries in Lahore protest (1928).',
    category: 'Commission',
  },
  {
    year: 1929,
    monthYear: 'December 1929',
    title: 'Lahore Session & Purna Swaraj Declaration',
    era: '1919-1939',
    viceroy: 'Lord Irwin',
    significance: 'INC passed resolution for "Purna Swaraj" (Complete Independence) under presidency of Jawaharlal Nehru on banks of Ravi.',
    examTakeaway: 'Tricolour unfurled on 31 Dec 1929; 26 January 1930 fixed as first Independence Day (which is why Republic Day was chosen on 26 Jan).',
    category: 'Congress Session',
  },
  {
    year: 1930,
    monthYear: '12 March – 6 April 1930',
    title: 'Dandi March & Civil Disobedience Movement',
    era: '1919-1939',
    viceroy: 'Lord Irwin',
    significance: 'Gandhi walked 240 miles from Sabarmati Ashram to Dandi with 78 followers to break the salt law, launching nationwide Civil Disobedience.',
    examTakeaway: 'Sarojini Naidu led Dharasana Salt Works raid. C. Rajagopalachari led Vedaranyam march in Tamil Nadu; K. Kelappan led Vaikom-Payyanur march in Malabar.',
    category: 'Movement',
  },
  {
    year: 1932,
    monthYear: 'September 1932',
    title: 'Communal Award & Poona Pact',
    era: '1919-1939',
    viceroy: 'Lord Willingdon',
    significance: 'British PM Ramsay MacDonald announced separate electorates for Depressed Classes. Gandhi fasted in Yerwada Jail.',
    examTakeaway: 'Poona Pact signed between Dr. B.R. Ambedkar and Madan Mohan Malaviya (on behalf of caste Hindus). Abandoned separate electorates in exchange for increased reserved seats in joint electorates.',
    category: 'Act / Legislation',
  },
  {
    year: 1935,
    title: 'Government of India Act 1935',
    era: '1919-1939',
    viceroy: 'Lord Willingdon',
    significance: 'Longest Act passed by British Parliament. Abolished Dyarchy in provinces and introduced Provincial Autonomy. Proposed All-India Federation.',
    examTakeaway: 'Established Reserve Bank of India (1935) and Federal Court (1937). Most significant blueprint for the 1950 Indian Constitution.',
    category: 'Act / Legislation',
  },
  {
    year: 1942,
    monthYear: '8 August 1942',
    title: 'Quit India Movement (August Kranti)',
    era: '1939-1947',
    viceroy: 'Lord Linlithgow',
    significance: 'Launched at Gowalia Tank Maidan, Bombay. Mahatma Gandhi gave the clarion call: "Do or Die" (Karo ya Maro).',
    examTakeaway: 'Top leaders arrested immediately under Operation Zero Hour. Underground radio run by Usha Mehta. Parallel governments formed in Ballia (Chittu Pandey), Tamluk (Jatiya Sarkar), and Satara (Prati Sarkar).',
    category: 'Movement',
  },
  {
    year: 1946,
    monthYear: 'March 1946',
    title: 'Cabinet Mission Plan',
    era: '1939-1947',
    viceroy: 'Lord Wavell',
    significance: 'Three-member delegation: Lord Pethick-Lawrence, Sir Stafford Cripps, and A.V. Alexander to discuss transfer of power.',
    examTakeaway: 'Rejected full Pakistan demand; proposed loose confederation and Constituent Assembly to frame the Constitution.',
    category: 'Commission',
  },
  {
    year: 1947,
    monthYear: '3 June 1947',
    title: 'Mountbatten Plan (Partition Plan) & Independence Act',
    era: '1939-1947',
    viceroy: 'Lord Mountbatten',
    significance: 'Final plan for partition of British India into India and Pakistan. Indian Independence Act 1947 passed by British Parliament on 18 July 1947.',
    examTakeaway: 'Radcliffe Boundary Commission demarcated boundaries of Punjab and Bengal. India gained independence on 15 August 1947.',
    category: 'Act / Legislation',
  },
]

export function HistoryTimelinePage() {
  const [search, setSearch] = React.useState('')
  const [selectedEra, setSelectedEra] = React.useState<string>('all')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')

  usePageMeta({
    title: 'Modern Indian History Interactive Timeline (1757–1947): Events, Viceroys & Chronology | Ministry of Papers',
    description: 'Interactive chronological timeline of Modern Indian History from Battle of Plassey (1757) to Independence (1947). Filter events by Viceroy, Act, and Movement with solved PYQs for UPSC & State PSCs.',
    canonicalPath: '/modern-indian-history-timeline',
  })

  const filteredEvents = React.useMemo(() => {
    return HISTORY_EVENTS.filter((ev) => {
      const matchSearch =
        search === '' ||
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        ev.significance.toLowerCase().includes(search.toLowerCase()) ||
        ev.examTakeaway.toLowerCase().includes(search.toLowerCase()) ||
        (ev.viceroy && ev.viceroy.toLowerCase().includes(search.toLowerCase())) ||
        String(ev.year).includes(search)

      const matchEra = selectedEra === 'all' || ev.era === selectedEra
      const matchCat = selectedCategory === 'all' || ev.category === selectedCategory
      return matchSearch && matchEra && matchCat
    })
  }, [search, selectedEra, selectedCategory])

  return (
    <section className="public-page">
      <div className="public-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/exams">Study Tools</Link>
          <span aria-hidden="true">›</span>
          <span>Modern Indian History Timeline</span>
        </nav>

        <header style={{ marginBottom: '28px' }}>
          <span className="public-kicker">Interactive History Chronology</span>
          <h1 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: 'clamp(28px, 4vw, 42px)', margin: '8px 0 10px', color: 'var(--ink, #0f172a)' }}>
            Modern Indian History Timeline (1757–1947)
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink2, #475569)', maxWidth: '780px', lineHeight: '1.6', margin: 0 }}>
            Master historical sequence, British Governor-Generals &amp; Viceroys, Charter Acts, and National Movements for UPSC, JKPSC, BPSC, and SSC exams. Solve chronological arrangement questions with clarity.
          </p>
        </header>

        {/* Filter Controls */}
        <div style={{ background: 'var(--card-bg, #ffffff)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--line, #e2e8f0)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
            {[
              { id: 'all', label: 'All Eras (1757–1947)' },
              { id: '1757-1857', label: 'Company Rule (1757–1857)' },
              { id: '1858-1905', label: 'Crown Rule & Moderates (1858–1905)' },
              { id: '1905-1919', label: 'Swadeshi & Extremists (1905–1919)' },
              { id: '1919-1939', label: 'Gandhian Mass Phase (1919–1939)' },
              { id: '1939-1947', label: 'Road to Freedom (1939–1947)' },
            ].map((era) => (
              <button
                key={era.id}
                onClick={() => setSelectedEra(era.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: '1px solid',
                  background: selectedEra === era.id ? 'var(--brand, #0f766e)' : 'transparent',
                  color: selectedEra === era.id ? '#ffffff' : 'var(--ink, #0f172a)',
                  borderColor: selectedEra === era.id ? 'var(--brand, #0f766e)' : 'var(--line, #e2e8f0)',
                }}
              >
                {era.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 280px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink2, #64748b)' }} />
              <input
                type="text"
                placeholder="Search event, Viceroy, or year (e.g. 'Dalhousie', 'Quit India', '1919', 'Cornwallis')..."
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

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              <option value="all">All Categories</option>
              <option value="Movement">National Movements</option>
              <option value="Act / Legislation">Acts &amp; British Legislation</option>
              <option value="Revolt">Revolts &amp; Battles</option>
              <option value="Congress Session">Historic Congress Sessions</option>
              <option value="Commission">Commissions &amp; Missions</option>
            </select>
          </div>
        </div>

        {/* Timeline Stream */}
        <div style={{ position: 'relative', paddingLeft: '28px', borderLeft: '2px dashed var(--line, #cbd5e1)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredEvents.map((ev) => (
            <div
              key={`${ev.year}-${ev.title}`}
              style={{
                position: 'relative',
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--line, #e2e8f0)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              {/* Bullet on timeline */}
              <div
                style={{
                  position: 'absolute',
                  left: '-37px',
                  top: '24px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--brand, #0f766e)',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 0 2px var(--brand, #0f766e)',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--brand, #0f766e)' }}>{ev.year}</span>
                  {ev.monthYear && (
                    <span style={{ fontSize: '13px', color: 'var(--ink2, #64748b)' }}>({ev.monthYear})</span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: '#f1f5f9',
                    color: '#334155',
                  }}
                >
                  {ev.category}
                </span>
              </div>

              <h3 style={{ fontSize: '19px', margin: '0 0 6px', color: 'var(--ink, #0f172a)', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                {ev.title}
              </h3>

              {ev.viceroy && (
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                  <strong>Governor-General / Viceroy:</strong> {ev.viceroy}
                </div>
              )}

              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--ink, #334155)', margin: '0 0 12px' }}>
                {ev.significance}
              </p>

              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', borderLeft: '3px solid var(--brand, #0f766e)' }}>
                <strong style={{ fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--brand, #0f766e)', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                  High-Yield Exam Takeaway
                </strong>
                <span style={{ fontSize: '13px', color: 'var(--ink2, #475569)', lineHeight: '1.5' }}>
                  {ev.examTakeaway}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '36px', textAlign: 'center', padding: '24px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '20px', margin: '0 0 8px', color: 'var(--ink, #0f172a)' }}>
            Practice Modern Indian History Solved Papers
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--ink2, #475569)', maxWidth: '600px', margin: '0 auto 16px' }}>
            Solve actual chronology, Governor-General, and freedom struggle questions from UPSC Prelims, JKPSC CCE, and SSC CGL.
          </p>
          <Link
            to="/exam/upsc-cse?tab=subjects&subject=History"
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
            Practice History PYQs →
          </Link>
        </div>
      </div>
    </section>
  )
}
