import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { RIVERS, RIVER_STUDY_DETAILS, type River } from './RiversOfIndiaPage'
import {
  INDIAN_RIVERS_ARTICLE_HEADLINE,
  INDIAN_RIVERS_ARTICLE_META,
  INDIAN_RIVERS_ARTICLE_PATH,
  INDIAN_RIVERS_MODIFIED,
  INDIAN_RIVERS_PUBLISHED,
} from './indianRiversArticleMeta'
import { RIVER_GUIDE_EXPLANATIONS } from './riverGuideExplanations'

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  })

const COMPARISON_ROWS: Array<[string, string, string]> = [
  ['Water supply', 'Perennial: fed by glacier and snow melt plus monsoon rain', 'Seasonal: depend almost entirely on monsoon rain'],
  ['Valley shape', 'Deep V-shaped gorges and canyons in the mountains; wide meanders and floodplains on the plains', 'Broad, shallow valleys with a mostly graded profile and fixed courses'],
  ['Drainage history', 'Several are antecedent: the Indus, Sutlej and Brahmaputra were older than the Himalaya and cut through the rising range', 'Older, mature rivers on an ancient plateau; many follow rift valleys or the plateau slope'],
  ['Mouth', 'Large deltas (Ganga–Brahmaputra, Indus)', 'East-flowing rivers form deltas; the west-flowing Narmada and Tapti form estuaries'],
  ['Navigation and irrigation', 'Navigable for long stretches; canal irrigation on the plains', 'Limited navigation; dams, tanks and reservoirs are central to irrigation'],
  ['Examples', 'Indus, Sutlej, Yamuna, Ganga, Brahmaputra', 'Narmada, Tapti, Mahanadi, Godavari, Krishna, Kaveri, Mahi, Brahmani'],
]

const GANGA_BANKS = {
  left: ['Ramganga', 'Gomti', 'Ghaghara', 'Gandak', 'Burhi Gandak', 'Kosi', 'Mahananda'],
  right: ['Yamuna', 'Son'],
}

const PYQ_LINKS: Array<{ href: string; text: string; exam: string }> = [
  { href: '/question/tsang-po-and-jamuna-are-other-names-of-which-river--3471dbf7d9', text: 'Tsang Po and Jamuna are other names of which river?', exam: 'SSC CGL' },
  { href: '/question/which-river-flows-in-a-rift-valley--f435f96b89', text: 'Which river flows in a rift valley?', exam: 'RSSB Patwari' },
  { href: '/question/how-many-of-the-following-are-tributaries-of-the-river-krishna-i--d47311cb89', text: 'How many of the following are tributaries of the River Krishna?', exam: 'JKSSB Wildlife Guard' },
  { href: '/question/identify-the-river-of-the-indian-sub-continent-on-the-basis-of--d13a757570', text: 'Identify the river of the Indian sub-continent on the basis of the following information (antecedent drainage)', exam: 'UPSC Civil Services' },
  { href: '/question/which-of-the-following-rivers-fall-into-the-arabian-sea-1-periyar--7fccaa2dc5', text: 'Which of the following rivers fall into the Arabian Sea? Periyar, Pennar, Palar', exam: 'UPPCS' },
  { href: '/question/river-godavari-originates-from-which-of-the-following-states-in-india--eb89b65996', text: 'River Godavari originates from which of the following states in India?', exam: 'JKSSB Sub Inspector' },
  { href: '/question/which-of-the-following-rivers-are-tributaries-of-the-river-chenab-i--9008fce665', text: 'Which of the following rivers are tributaries of the river Chenab?', exam: 'JKSSB Junior Assistant' },
  { href: '/question/which-of-the-following-is-not-a-tributary-of-jhelum-river--13d86c9eaf', text: 'Which of the following is NOT a tributary of Jhelum River?', exam: 'JKSSB Finance Account Assistant' },
  { href: '/question/which-of-the-following-rivers-are-allocated-to-india-for-exclusive-use--c24850daca', text: 'Which rivers are allocated to India for exclusive use under the Indus Water Treaty?', exam: 'JKSSB Constable' },
  { href: '/question/consider-the-following-assertion-in-the-pleistocene-period-either-the-yamuna-onc--06f9218d69', text: 'In the Pleistocene period either the Yamuna once flowed into the Indus, or the Sutlej flowed into the Yamuna', exam: 'UPSC Civil Services' },
]

const COMMON_MISTAKES: Array<[string, string]> = [
  ['Calling every river in a basin a “tributary”', 'The Banas is part of the Yamuna basin, but it joins the Chambal, which then joins the Yamuna. It is a tributary of the Chambal, not a direct Yamuna tributary. Exam options often hide this trap.'],
  ['Mixing up left and right banks', 'Banks are named facing downstream, toward the mouth. Reading the map upstream flips your answer.'],
  ['Using total length for the length in India', 'The Indus, Sutlej and Brahmaputra rise outside India. Questions that ask “length in India” need the Indian stretch only.'],
  ['Assuming every Peninsular river flows east', 'The Narmada, Tapti and Mahi flow west to the Arabian Sea, as do the Sabarmati and the short Western Ghats rivers such as the Periyar.'],
  ['Treating the Ganga’s source as Gangotri alone', 'The Bhagirathi rises at Gaumukh (Gangotri glacier), but the river is called the Ganga only from Devprayag, where it meets the Alaknanda.'],
]

const FAQS: Array<[string, string]> = [
  ['What is the difference between Himalayan and Peninsular rivers?', 'Himalayan rivers are perennial because glaciers and monsoon rain both feed them, and they carve deep gorges before building large plains and deltas. Peninsular rivers depend on monsoon rain, so flow is seasonal. They run in broad, older valleys with mostly fixed courses.'],
  ['Which Indian rivers flow west into the Arabian Sea?', 'The Narmada and Tapti flow west through rift valleys, along with the Mahi, the Sabarmati and many short Western Ghats rivers. Most other large Peninsular rivers, including the Mahanadi, Godavari, Krishna and Kaveri, flow east to the Bay of Bengal.'],
  ['What are the main tributaries of the Ganga?', 'On the left (north) bank: Ramganga, Gomti, Ghaghara, Gandak, Burhi Gandak, Kosi and Mahananda. On the right (south) bank: Yamuna and Son. The Alaknanda and Bhagirathi are the headstreams that form the Ganga at Devprayag.'],
  ['Which is the longest river in India?', 'The Ganga is generally treated as the longest river within India, at about 2,525 km. The Godavari is the longest Peninsular river. The Indus and Brahmaputra are longer overall but a large part of their course lies outside India.'],
  ['What is the difference between a drainage basin and a tributary?', 'A drainage basin is the whole area that sends water to a river system. A direct tributary meets the main river itself. A river can belong to a basin without being a direct tributary if it joins through another tributary.'],
  ['Are these river facts enough for UPSC, SSC and State PSC exams?', 'They cover the standard facts that questions are built on: source, course, banks, tributaries, mouth and notable projects. Pair them with the map and with solved previous year questions, which show how each fact is actually tested.'],
]

const riverSystems = [
  { key: 'H' as const, id: 'himalayan-rivers', title: 'Himalayan rivers' },
  { key: 'P' as const, id: 'peninsular-rivers', title: 'Peninsular rivers' },
]

function riverId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const RIVER_HIGHLIGHTS: Record<string, { label: string; text: string }> = {
  Indus: {
    label: 'Indus Waters Treaty & Panjnad Confluence',
    text: 'Under the 1960 Indus Waters Treaty, the Eastern Rivers (Ravi, Beas, Sutlej) were allocated to India for exclusive use, while the Western Rivers (Indus, Jhelum, Chenab) are allocated to Pakistan with specified permissible uses for India. The 5 Punjab rivers do not join the Indus individually — they meet at the Panjnad before entering the main Indus channel.',
  },
  Ganga: {
    label: 'Devprayag & The Panch Prayag System',
    text: 'The river is called the Ganga only from Devprayag, where the Alaknanda (from Satopanth glacier) joins the Bhagirathi (from Gaumukh/Gangotri). Upstream, the Alaknanda forms Vishnuprayag (with Dhauliganga), Nandprayag (with Nandakini), Karnaprayag (with Pindar), and Rudraprayag (with Mandakini). Only Yamuna and Son join from the right (south) bank.',
  },
  Brahmaputra: {
    label: 'Antecedent Course & Name Changes',
    text: 'An antecedent river older than the Himalayas, the river is called the Yarlung Tsangpo in Tibet, cuts a dramatic gorge around Namcha Barwa, enters Arunachal Pradesh as the Siang/Dihang, becomes the Brahmaputra in Assam after receiving the Dibang and Lohit, and flows as the Jamuna in Bangladesh before meeting the Padma.',
  },
  Godavari: {
    label: 'Dakshin Ganga & Indravati/Pranhita Basin',
    text: 'Longest peninsular river in India (1,465 km). Often called "Dakshin Ganga" or "Vridha Ganga". The Pranhita is its largest tributary by volume, combining the Wardha and Wainganga rivers. Indravati and Sabari are critical left-bank contributors from the Dandakaranya plateau.',
  },
  Narmada: {
    label: 'Rift Valley & Estuary (West Flowing)',
    text: 'Rises at Amarkantak and flows strictly west through a linear fault/rift valley between the Vindhya and Satpura ranges. Unlike east-flowing peninsular rivers, it builds an estuary at the Gulf of Khambhat rather than a delta.',
  },
}

function RiverFacts({ river }: { river: River }) {
  const details = RIVER_STUDY_DETAILS[river.name]
  const hasBankLists = Boolean(details?.leftBank.length || details?.rightBank.length)

  return (
    <div className="river-guide-facts" aria-label={`${river.name} river facts`}>
      <div className="river-quick-chips">
        <div className="river-quick-chip">
          <span className="river-chip-label">Origin / Source</span>
          <span className="river-chip-val">{river.source}</span>
        </div>
        <div className="river-quick-chip">
          <span className="river-chip-label">Length</span>
          <span className="river-chip-val">{river.length}</span>
        </div>
        <div className="river-quick-chip">
          <span className="river-chip-label">States in India</span>
          <span className="river-chip-val">{river.states.join(', ')}</span>
        </div>
        <div className="river-quick-chip">
          <span className="river-chip-label">Outflow / Mouth</span>
          <span className="river-chip-val">{river.mouth}</span>
        </div>
      </div>

      <div className="river-guide-tributaries">
        <h4>Tributaries Breakdown</h4>
        {hasBankLists ? (
          <div className="river-guide-banks-grid">
            {details.leftBank.length > 0 && (
              <div className="river-bank-card river-bank-left">
                <div className="river-bank-header">
                  <span className="river-bank-badge left">Left Bank</span>
                  <span className="river-bank-count">{details.leftBank.length} tributaries</span>
                </div>
                <div className="river-pills-wrap">
                  {details.leftBank.map((trib) => (
                    <span key={trib} className="river-pill left">{trib}</span>
                  ))}
                </div>
              </div>
            )}
            {details.rightBank.length > 0 && (
              <div className="river-bank-card river-bank-right">
                <div className="river-bank-header">
                  <span className="river-bank-badge right">Right Bank</span>
                  <span className="river-bank-count">{details.rightBank.length} tributaries</span>
                </div>
                <div className="river-pills-wrap">
                  {details.rightBank.map((trib) => (
                    <span key={trib} className="river-pill right">{trib}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>{river.tributaries}</p>
        )}
        {details?.tributaryNote && (
          <p className="river-guide-note">
            <strong>Exam Note:</strong> {details.tributaryNote}
          </p>
        )}
      </div>
    </div>
  )
}

function RiverEntry({ river }: { river: River }) {
  const [routeExplanation, tributaryExplanation] = RIVER_GUIDE_EXPLANATIONS[river.name]
  const highlight = RIVER_HIGHLIGHTS[river.name]
  const riverParam = riverId(river.name)

  return (
    <article className="river-guide-entry" id={riverId(river.name)} aria-labelledby={`${riverId(river.name)}-heading`}>
      <div className="river-guide-entry-header">
        <h3 id={`${riverId(river.name)}-heading`}>
          <span className="river-dot" style={{ backgroundColor: river.color }} />
          {river.name}
        </h3>
        <Link
          to={`/india-physical-geography-map?river=${encodeURIComponent(riverParam)}`}
          className="river-entry-map-btn"
          title={`View ${river.name} and its full course on the interactive map`}
        >
          <span>Explore on Interactive Map</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <p className="river-guide-context">{river.info}</p>

      {highlight && (
        <aside className="river-entry-highlight" aria-label={`${river.name} key exam concept`}>
          <strong>{highlight.label}:</strong> {highlight.text}
        </aside>
      )}

      <p>{routeExplanation}</p>
      <p>{tributaryExplanation}</p>
      <RiverFacts river={river} />
    </article>
  )
}

export function IndianRiversBlogPage() {
  usePageMeta({
    title: INDIAN_RIVERS_ARTICLE_META.title,
    description: INDIAN_RIVERS_ARTICLE_META.description,
    canonicalPath: INDIAN_RIVERS_ARTICLE_PATH,
    ogType: 'article',
    jsonLd: INDIAN_RIVERS_ARTICLE_META.jsonLd,
  })

  return (
    <section className="public-page river-article-page">
      <main className="public-shell river-article-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/blog">Blog</Link>
          <span aria-hidden="true">›</span>
          <span>Indian rivers</span>
        </nav>

        <article className="river-guide-article">
          <header className="river-guide-header" style={{ marginBottom: '24px' }}>
            {/* Master Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="public-kicker" style={{ margin: 0 }}>Geography &amp; River Systems</span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
                13 Major River Basins · Left &amp; Right Bank Tributaries · 2026 Updated
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 800, margin: '0 0 10px', color: 'var(--ink, #0f172a)', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              {INDIAN_RIVERS_ARTICLE_HEADLINE}
            </h1>

            <p style={{ fontSize: '15px', color: 'var(--ink2, #475569)', maxWidth: '820px', lineHeight: '1.6', margin: '0 0 14px' }}>
              From the glacier-fed antecedent rivers of the Himalaya to the ancient monsoon-shaped waterways of the Deccan Plateau, master India’s river systems, tributaries by bank, and high-yield exam traps for UPSC and State PSC exams.
            </p>

            <p className="river-guide-byline" style={{ margin: '0 0 18px', fontSize: '13.5px', color: 'var(--ink2, #64748b)' }}>
              By <Link to="/about" style={{ color: 'var(--brand, #0f766e)', textDecoration: 'none', fontWeight: 600 }}>Ministry of Papers Editorial Team</Link>{' '}
              <span aria-hidden="true">·</span> Published{' '}
              <time dateTime={INDIAN_RIVERS_PUBLISHED}>{fmtDate(INDIAN_RIVERS_PUBLISHED)}</time>{' '}
              <span aria-hidden="true">·</span> Updated{' '}
              <time dateTime={INDIAN_RIVERS_MODIFIED}>{fmtDate(INDIAN_RIVERS_MODIFIED)}</time>{' '}
              <span aria-hidden="true">·</span> 12 min read
            </p>

            {/* Quick Metrics Ribbon (Matching Constitution, History, Ramsar) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ background: 'var(--card-bg, #ffffff)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line, #e2e8f0)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🏔️</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink, #0f172a)' }}>2</div>
                  <div style={{ fontSize: '11px', color: 'var(--ink2, #64748b)', fontWeight: 600 }}>Drainage Systems (Himalayan / Peninsular)</div>
                </div>
              </div>

              <div style={{ background: '#eff6ff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🌊</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#1e40af' }}>13</div>
                  <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: 600 }}>Major River Basins</div>
                </div>
              </div>

              <div style={{ background: '#f0fdf4', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🌿</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#166534' }}>70+</div>
                  <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600 }}>Tributaries by Bank</div>
                </div>
              </div>

              <div style={{ background: '#fffbeb', padding: '12px 14px', borderRadius: '10px', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🎯</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: '#92400e' }}>10+</div>
                  <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600 }}>Solved Exam PYQs</div>
                </div>
              </div>
            </div>

            {/* Interactive Map Callout Banner */}
            <div className="river-guide-map-banner">
              <div className="river-map-banner-copy">
                <span className="river-map-banner-tag">Interactive Resource</span>
                <strong>Explore India's Physical Geography Map</strong>
                <p>Zoom into all 13 river routes, filter tributaries by bank, and locate major lakes and reservoirs across Indian states.</p>
              </div>
              <Link to="/india-physical-geography-map" className="river-map-banner-btn">
                <span>Launch Interactive Map</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </header>

          <section className="river-guide-answer" aria-labelledby="river-guide-answer-heading">
            <h2 id="river-guide-answer-heading">Quick answer</h2>
            <p>
              India’s rivers fall into two systems. <strong>Himalayan rivers</strong> (Indus,
              Ganga, Brahmaputra) are perennial, glacier- and rain-fed, and build vast plains
              and deltas. <strong>Peninsular rivers</strong> (Mahanadi, Godavari, Krishna,
              Kaveri, Narmada, Tapti) are seasonal and monsoon-fed. Most Peninsular rivers
              flow east into the Bay of Bengal; the Narmada, Tapti and Mahi flow west into
              the Arabian Sea.
            </p>
            <ul>
              <li>The Ganga is formed at Devprayag, where the Alaknanda meets the Bhagirathi.</li>
              <li>Ganga right-bank tributaries: Yamuna and Son. The rest are on the left bank.</li>
              <li>The Godavari is the longest Peninsular river, also called the Dakshin Ganga.</li>
              <li>The Narmada and Tapti flow through rift valleys and form estuaries, not deltas.</li>
              <li>The Brahmaputra is the Yarlung Tsangpo in Tibet, the Siang or Dihang in Arunachal Pradesh, and the Jamuna in Bangladesh.</li>
            </ul>
          </section>

          <nav className="river-guide-index" aria-label="Article contents">
            <h2>In this article</h2>
            <ol>
              <li><a href="#river-guide-comparison-heading">Major rivers at a glance</a></li>
              <li><a href="#himalayan-vs-peninsular">Himalayan vs Peninsular rivers</a></li>
              {riverSystems.map((system) => (
                <li key={system.id}>
                  <a href={`#${system.id}`}>{system.title}</a>
                  <ol>
                    {RIVERS.filter((river) => river.type === system.key).map((river) => (
                      <li key={river.name}>
                        <a href={`#${riverId(river.name)}`}>{river.name}</a>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
              <li><a href="#exam-memory-aids">Exam memory aids</a></li>
              <li><a href="#common-mistakes">Common mistakes</a></li>
              <li><a href="#river-pyqs">Rivers in previous year questions</a></li>
              <li><a href="#river-faqs">FAQs</a></li>
              <li><a href="#further-reading">Sources and further reading</a></li>
            </ol>
          </nav>

          <p>
            Rivers are more than lines on a map. They carry water and sediment from
            uplands to plains and coasts, support farms and settlements, and change
            with the seasons. To compare India’s rivers, it helps to look first at
            their source, the shape of the land they cross and the direction in which
            they drain. Exam questions follow the same logic: they ask where a river
            rises, which way it flows, which tributaries join it and on which bank.
          </p>

          <section className="river-guide-comparison" aria-labelledby="river-guide-comparison-heading">
            <h2 id="river-guide-comparison-heading">Major Indian rivers at a glance</h2>
            <p>
              Compare the river type, source, route, drainage and approximate length.
              Transboundary rivers include separate in-India figures where available.
            </p>
            <div className="river-guide-table-wrap" role="region" aria-label="River comparison table" tabIndex={0}>
              <table className="river-guide-table">
                <thead>
                  <tr>
                    <th scope="col">River</th>
                    <th scope="col">System</th>
                    <th scope="col">Source</th>
                    <th scope="col">States / UTs in India</th>
                    <th scope="col">Drainage</th>
                    <th scope="col">Length</th>
                  </tr>
                </thead>
                <tbody>
                  {RIVERS.map((river) => (
                    <tr key={river.name}>
                      <th scope="row"><a href={`#${riverId(river.name)}`}>{river.name}</a></th>
                      <td>{river.type === 'H' ? 'Himalayan' : 'Peninsular'}</td>
                      <td>{river.source}</td>
                      <td>{river.states.join(', ')}</td>
                      <td>{river.mouth}</td>
                      <td>{river.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="river-guide-overview" aria-labelledby="river-guide-overview-heading">
            <h2 id="river-guide-overview-heading">How India’s river systems are formed</h2>
            <p>
              The Himalaya are young, high mountains that receive both snow and heavy
              monsoon rain. Rivers such as the Indus, Ganga and Brahmaputra draw on
              these sources of water and cut through mountain valleys before reaching
              the plains. Their large catchments cross political borders, and their
              flows can rise sharply during the rainy season.
            </p>
            <p>
              The Peninsular rivers drain an older plateau with broad valleys and
              seasonal rainfall. The Godavari, Krishna, Mahanadi and Kaveri generally
              travel east to the Bay of Bengal, building deltas near their mouths.
              The Narmada and Tapti are important exceptions: both flow west through
              rift valleys to the Arabian Sea.
            </p>
            <p>
              A <strong>drainage basin</strong> is the area from which water flows
              toward a river and its tributaries; a ridge or watershed separates it
              from a neighbouring basin. A <strong>direct tributary</strong> meets
              the main river itself. Smaller rivers that reach it by way of another
              tributary are part of the same basin, but are not direct tributaries.
              This distinction matters when comparing river lists and maps.
            </p>
          </section>

          <section className="river-guide-comparison" id="himalayan-vs-peninsular" aria-labelledby="himalayan-vs-peninsular-heading">
            <h2 id="himalayan-vs-peninsular-heading">Himalayan vs Peninsular rivers</h2>
            <p>
              Most river questions reduce to this contrast. Learn the pattern once and
              individual facts become easier to place.
            </p>
            <div className="river-guide-table-wrap" role="region" aria-label="Himalayan versus Peninsular rivers" tabIndex={0}>
              <table className="river-guide-table">
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    <th scope="col">Himalayan rivers</th>
                    <th scope="col">Peninsular rivers</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map(([feature, himalayan, peninsular]) => (
                    <tr key={feature}>
                      <th scope="row">{feature}</th>
                      <td>{himalayan}</td>
                      <td>{peninsular}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {riverSystems.map((system) => (
            <section className="river-guide-system" id={system.id} key={system.id}>
              <h2>{system.title}</h2>
              <p className="river-guide-system-intro">
                {system.key === 'H'
                  ? 'The northern river systems rise in or beyond the Himalaya. Their courses link high mountain catchments with broad plains, and several continue into neighbouring countries.'
                  : 'These rivers drain the plateau and central highlands. Most flow east to the Bay of Bengal; the Narmada, Tapti and Mahi are among the west-flowing rivers that reach the Arabian Sea.'}
              </p>
              {RIVERS.filter((river) => river.type === system.key).map((river) => (
                <RiverEntry river={river} key={river.name} />
              ))}
            </section>
          ))}

          <section className="river-guide-reading" aria-labelledby="river-guide-reading-heading">
            <h2 id="river-guide-reading-heading">How to read the river facts</h2>
            <div className="river-guide-reading-grid">
              <article>
                <h3>Length figures</h3>
              <p>
                  A river’s total length and the part that lies within India are not
                  the same measurement. Figures can also vary slightly between
                  references because sources use different starting points or
                  measurement methods.
              </p>
              </article>
              <article>
                <h3>Left and right banks</h3>
              <p>
                  Bank names are given while facing downstream. The states listed
                  describe the river’s Indian reach, not every state or country in
                  its larger basin.
              </p>
              </article>
              <article>
                <h3>Tributaries and basins</h3>
              <p>
                  Some profiles include a short note where a river belongs to the
                  wider basin but joins the main channel through another tributary.
                  Names and bank groupings may differ between maps and references.
              </p>
              </article>
            </div>
          </section>

          <section className="river-guide-reading" id="exam-memory-aids" aria-labelledby="exam-memory-aids-heading">
            <h2 id="exam-memory-aids-heading">Exam memory aids</h2>
            <div className="river-guide-reading-grid">
              <article>
                <h3>Ganga tributaries by bank</h3>
                <p>
                  <strong>Right bank (2):</strong> {GANGA_BANKS.right.join(', ')}.
                </p>
                <p>
                  <strong>Left bank (7):</strong> {GANGA_BANKS.left.join(', ')}.
                </p>
                <p>Only two right-bank tributaries is the easier list to memorise; everything else is left.</p>
              </article>
              <article>
                <h3>Five Prayags on the Alaknanda</h3>
                <p>
                  From upstream to downstream: Vishnuprayag, Nandprayag, Karnaprayag,
                  Rudraprayag and Devprayag, where the Alaknanda meets the Bhagirathi and
                  the Ganga is formed.
                </p>
              </article>
              <article>
                <h3>Indus Waters Treaty (1960)</h3>
                <p>
                  <strong>Eastern rivers</strong> (Ravi, Beas, Sutlej) were allocated to
                  India. <strong>Western rivers</strong> (Indus, Jhelum, Chenab) go
                  primarily to Pakistan, with limited permitted use for India.
                </p>
              </article>
              <article>
                <h3>West-flowing rivers</h3>
                <p>
                  Narmada, Tapti, Mahi and Sabarmati reach the Arabian Sea. The Luni drains
                  toward the Rann of Kutch and does not reach the sea.
                </p>
              </article>
              <article>
                <h3>Three names, one river</h3>
                <p>
                  Yarlung Tsangpo (Tibet) → Siang/Dihang (Arunachal Pradesh) →
                  Brahmaputra (Assam) → Jamuna (Bangladesh).
                </p>
              </article>
              <article>
                <h3>Peninsular, east-flowing</h3>
                <p>
                  From north to south: Brahmani, Mahanadi, Godavari, Krishna, Pennar,
                  Kaveri. Each drains into the Bay of Bengal.
                </p>
              </article>
            </div>
          </section>

          <section className="river-guide-mistakes" id="common-mistakes" aria-labelledby="common-mistakes-heading">
            <h2 id="common-mistakes-heading">Common mistakes in river questions</h2>
            <ol>
              {COMMON_MISTAKES.map(([title, body]) => (
                <li key={title}>
                  <strong>{title}.</strong> {body}
                </li>
              ))}
            </ol>
          </section>

          <section className="river-guide-pyqs" id="river-pyqs" aria-labelledby="river-pyqs-heading">
            <h2 id="river-pyqs-heading">Rivers in previous year questions</h2>
            <p>
              Each question below has the official answer and a worked explanation. Try
              answering before you open it.
            </p>
            <ul>
              {PYQ_LINKS.map((q) => (
                <li key={q.href}>
                  <Link to={q.href}>{q.text}</Link> <span className="river-guide-pyq-exam">{q.exam}</span>
                </li>
              ))}
            </ul>
            <p>
              Practise full papers on the exam hubs for{' '}
              <Link to="/exam/upsc-cse">UPSC CSE</Link>, <Link to="/exam/ssc-cgl">SSC CGL</Link> and{' '}
              <Link to="/exam/jkssb">JKSSB</Link>, or read the{' '}
              <Link to="/guide/upsc-cse">UPSC CSE guide</Link> and the{' '}
              <Link to="/guide/jkcce">JKCCE guide</Link> for syllabus and pattern.
            </p>
          </section>

          <section className="river-guide-faqs" id="river-faqs" aria-labelledby="river-faqs-heading">
            <h2 id="river-faqs-heading">Frequently asked questions</h2>
            {FAQS.map(([q, a]) => (
              <details key={q} className="river-guide-faq">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>

          <section className="river-guide-sources" id="further-reading" aria-labelledby="river-guide-sources-heading">
            <h2 id="river-guide-sources-heading">Sources and further reading</h2>
            <p>
              This guide is written by the Ministry of Papers editorial team from the
              references below, then checked against the way these facts appear in
              solved exam questions. If you spot an error, tell us through the{' '}
              <Link to="/about">About page</Link> and we will correct it and update the
              date above.
            </p>
            <p>
              For a textbook overview of drainage patterns and river systems, see
              NCERT’s chapter on drainage. India-WRIS provides national water-resources
              information and basin maps for further study.
            </p>
            <ul>
              <li>
                <a href="https://ncert.nic.in/textbook/pdf/kegy203.pdf" target="_blank" rel="noreferrer">
                  NCERT, <cite>India: Physical Environment</cite>, “Drainage System”
                </a>
              </li>
              <li>
                <a href="https://indiawris.gov.in/wris/" target="_blank" rel="noreferrer">
                  India-WRIS, India Water Resources Information System
                </a>
              </li>
            </ul>
            <p className="river-guide-source-note">
              River lengths are approximate. Basin boundaries, tributary names and
              bank classifications can vary by reference, particularly for rivers
              that cross borders or pass through distributary systems.
            </p>
          </section>

          <section className="river-guide-map-card" aria-labelledby="river-guide-map-heading">
            <div>
              <h2 id="river-guide-map-heading">Explore the river routes</h2>
              <p>Compare these river courses and their tributaries on the interactive map.</p>
            </div>
            <Link className="river-guide-map-link" to="/india-physical-geography-map">
              Open the map <span aria-hidden="true">→</span>
            </Link>
          </section>

          {/* Cross-Link Ecosystem: Related Study Suites */}
          <section
            style={{
              marginTop: '36px',
              padding: '24px',
              background: 'var(--card-bg, #ffffff)',
              borderRadius: '14px',
              border: '1px solid var(--line, #e2e8f0)',
            }}
            aria-labelledby="river-related-suites-heading"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--brand, #0f766e)' }}>
                  Visual Learning Ecosystem
                </span>
                <h3 id="river-related-suites-heading" style={{ margin: '3px 0 0', fontSize: '19px', fontWeight: 800, color: 'var(--ink, #0f172a)' }}>
                  Explore More Study Suites
                </h3>
              </div>
              <Link
                to="/study-material"
                style={{
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: 'var(--brand, #0f766e)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  background: 'var(--brand-soft, #f0fdf4)',
                  border: '1px solid var(--brand-line, #bbf7d0)',
                }}
              >
                <span>All Study Materials</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
              <Link
                to="/constitution-of-india"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'var(--card-bg-subtle, #f8fafc)',
                  border: '1px solid var(--line, #e2e8f0)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>📜</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--brand, #0f766e)' }}>Polity</span>
                </div>
                <strong style={{ fontSize: '14.5px', color: 'var(--ink, #0f172a)' }}>Constitution of India Explorer</strong>
                <span style={{ fontSize: '12.5px', color: 'var(--ink2, #64748b)', lineHeight: '1.45' }}>
                  Articles 1–395 linewise, Preamble, 25 Parts, 12 Schedules, and Supreme Court doctrines.
                </span>
              </Link>

              <Link
                to="/modern-indian-history-timeline"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'var(--card-bg-subtle, #f8fafc)',
                  border: '1px solid var(--line, #e2e8f0)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>⏳</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--hl-dark, #b45309)' }}>History</span>
                </div>
                <strong style={{ fontSize: '14.5px', color: 'var(--ink, #0f172a)' }}>Modern History Timeline (1757–1947)</strong>
                <span style={{ fontSize: '12.5px', color: 'var(--ink2, #64748b)', lineHeight: '1.45' }}>
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
                  background: 'var(--card-bg-subtle, #f8fafc)',
                  border: '1px solid var(--line, #e2e8f0)',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>🌿</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--green, #15803d)' }}>Environment</span>
                </div>
                <strong style={{ fontSize: '14.5px', color: 'var(--ink, #0f172a)' }}>Ramsar Wetlands Timeline (1981–2026)</strong>
                <span style={{ fontSize: '12.5px', color: 'var(--ink2, #64748b)', lineHeight: '1.45' }}>
                  All 103 Ramsar sites in chronological order, Montreux Record registry, and river basin links.
                </span>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </section>
  )
}
