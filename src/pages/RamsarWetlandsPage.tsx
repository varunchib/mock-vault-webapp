import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { Search } from 'lucide-react'

export type ProtectedSite = {
  name: string
  state: string
  category: 'Ramsar Wetland' | 'National Park' | 'Tiger Reserve' | 'Biosphere Reserve'
  riverConnection?: string
  flagshipFauna: string
  examFact: string
  declaredYear?: number
}

const PROTECTED_SITES_DATABASE: ProtectedSite[] = [
  {
    name: 'Wular Lake',
    state: 'Jammu & Kashmir',
    category: 'Ramsar Wetland',
    riverConnection: 'Jhelum River',
    flagshipFauna: 'Common Carp, Waterfowl, Migratory Ducks',
    examFact: 'Largest freshwater lake in India. Formed by tectonic activity; fed by Jhelum. Declared Ramsar site in 1990.',
  },
  {
    name: 'Hokersar Wetland',
    state: 'Jammu & Kashmir',
    category: 'Ramsar Wetland',
    riverConnection: 'Doodhganga / Jhelum basin',
    flagshipFauna: 'Garganey, Mallard, Northern Pintail',
    examFact: 'Known as the "Queen Wetland of Kashmir", critical wintering ground for trans-Himalayan migratory birds. Declared Ramsar site in 2005.',
  },
  {
    name: 'Dachigam National Park',
    state: 'Jammu & Kashmir',
    category: 'National Park',
    riverConnection: 'Dagwan River / Dal Lake catchment',
    flagshipFauna: 'Hangul (Kashmir Stag - Critically Endangered)',
    examFact: 'The last viable natural habitat of the Hangul (subspecies of red deer). Located in Zabarwan range.',
  },
  {
    name: 'Hemis National Park',
    state: 'Ladakh',
    category: 'National Park',
    riverConnection: 'Indus River',
    flagshipFauna: 'Snow Leopard, Tibetan Wolf, Bharal (Blue Sheep)',
    examFact: 'Largest National Park in India (4,400 sq km) and highest in elevation. Highest density of Snow Leopards globally.',
  },
  {
    name: 'Tso Kar Wetland Complex',
    state: 'Ladakh',
    category: 'Ramsar Wetland',
    riverConnection: 'Endorheic basin (Changthang plateau)',
    flagshipFauna: 'Black-necked Crane (State bird of Ladakh)',
    examFact: 'High-altitude wetland complex comprising hypersaline Startsapuk Tso and freshwater Tso Kar. India’s 42nd Ramsar site (2020).',
  },
  {
    name: 'Kaziranga National Park',
    state: 'Assam',
    category: 'National Park',
    riverConnection: 'Brahmaputra, Diphlu, Mora Diphlu',
    flagshipFauna: 'Great Indian One-Horned Rhinoceros, Tiger, Elephant, Wild Water Buffalo, Swamp Deer ("Big Five")',
    examFact: 'UNESCO World Heritage Site. Hosts two-thirds of the world’s great one-horned rhinoceros population.',
  },
  {
    name: 'Manas National Park',
    state: 'Assam',
    category: 'Tiger Reserve',
    riverConnection: 'Manas River (tributary of Brahmaputra)',
    flagshipFauna: 'Pygmy Hog, Golden Langur, Hispid Hare, Bengal Florican',
    examFact: 'UNESCO World Heritage Site, Biosphere Reserve, Elephant Reserve, and Tiger Reserve contiguous with Royal Manas in Bhutan.',
  },
  {
    name: 'Keibul Lamjao National Park & Loktak Lake',
    state: 'Manipur',
    category: 'Ramsar Wetland',
    riverConnection: 'Manipur River',
    flagshipFauna: 'Sangai (Brow-antlered deer / "Dancing deer")',
    examFact: 'Only floating national park in the world, characterized by floating decomposed vegetative masses called "Phumdis". Included in Montreux Record.',
  },
  {
    name: 'Chilika Lake',
    state: 'Odisha',
    category: 'Ramsar Wetland',
    riverConnection: 'Daya River, Bhargavi River (Mahanadi delta)',
    flagshipFauna: 'Irrawaddy Dolphin, Flamingos, White-bellied sea eagle',
    examFact: 'First Indian wetland designated under Ramsar Convention (1981 alongside Keoladeo). Largest coastal lagoon in India and second largest in the world. Nalaban Bird Sanctuary is inside it.',
  },
  {
    name: 'Bhitarkanika National Park & Mangroves',
    state: 'Odisha',
    category: 'Ramsar Wetland',
    riverConnection: 'Brahmani, Baitarani, Dhamra rivers',
    flagshipFauna: 'Saltwater Crocodile (Estuarine), Olive Ridley Sea Turtles, White Crocodile',
    examFact: 'Gahirmatha Marine Sanctuary adjoining Bhitarkanika is the world’s largest rookery (mass nesting) for Olive Ridley turtles.',
  },
  {
    name: 'Sundarbans National Park',
    state: 'West Bengal',
    category: 'Biosphere Reserve',
    riverConnection: 'Ganga-Brahmaputra-Meghna delta',
    flagshipFauna: 'Royal Bengal Tiger (famous swimming tigers), Estuarine Crocodile, Fishing Cat',
    examFact: 'World’s largest mangrove forest. UNESCO World Heritage Site and Ramsar wetland. Characterized by pneumatophores (breathing roots) and halophyte Sundari trees (Heritiera fomes).',
  },
  {
    name: 'Keoladeo Ghana National Park',
    state: 'Rajasthan',
    category: 'Ramsar Wetland',
    riverConnection: 'Gambhir & Banganga confluence',
    flagshipFauna: 'Siberian Crane (historical wintering ground), Painted Storks, Spoonbills',
    examFact: 'Man-made, man-managed wetland created by Maharaja of Bharatpur. UNESCO World Heritage Site and on Montreux Record.',
  },
  {
    name: 'Silent Valley National Park',
    state: 'Kerala',
    category: 'National Park',
    riverConnection: 'Kunthipuzha River (tributary of Bharathapuzha)',
    flagshipFauna: 'Lion-Tailed Macaque (Endangered), Nilgiri Tahr, Great Indian Hornbill',
    examFact: 'One of the last undisturbed tracts of South Western Ghats montane rain forests. Center of famous "Save Silent Valley" ecological movement (1970s).',
  },
  {
    name: 'Vembanad-Kol Wetland',
    state: 'Kerala',
    category: 'Ramsar Wetland',
    riverConnection: 'Periyar, Pamba, Meenachil, Manimala, Achenkovil',
    flagshipFauna: 'Spot-billed Pelican, Migratory Teal, Clam and finfish fisheries',
    examFact: 'Longest lake in India (96.5 km) and largest wetland system in South India. Famous for Nehru Trophy Boat Race and Kuttanad farming below sea level.',
  },
  {
    name: 'Jim Corbett National Park',
    state: 'Uttarakhand',
    category: 'Tiger Reserve',
    riverConnection: 'Ramganga River (tributary of Ganga)',
    flagshipFauna: 'Bengal Tiger, Asian Elephant, Spotted Deer',
    examFact: 'First National Park of India (established in 1936 as Hailey National Park). First park selected for launching Project Tiger in 1973.',
  },
  {
    name: 'Kanha National Park',
    state: 'Madhya Pradesh',
    category: 'Tiger Reserve',
    riverConnection: 'Sulcum and Banjar (Narmada basin)',
    flagshipFauna: 'Hard-ground Barasingha (Swamp Deer - "Bhoorsingh the Barasingha")',
    examFact: 'Inspiration for Rudyard Kipling’s "The Jungle Book". First tiger reserve in India to officially introduce a mascot ("Bhoorsingh").',
  },
]

export function RamsarWetlandsPage() {
  const [search, setSearch] = React.useState('')
  const [stateFilter, setStateFilter] = React.useState('all')
  const [categoryFilter, setCategoryFilter] = React.useState('all')

  usePageMeta({
    title: 'India Ramsar Wetlands & National Parks: Interactive Exam Explorer | Ministry of Papers',
    description: 'Explore India’s Ramsar wetlands, National Parks, and Tiger Reserves interactively. Filter by State, River Basin, and Endemic Fauna with verified PYQs for UPSC & State PSCs.',
    canonicalPath: '/ramsar-wetlands-and-national-parks',
  })

  const uniqueStates = React.useMemo(() => {
    return Array.from(new Set(PROTECTED_SITES_DATABASE.map((s) => s.state))).sort()
  }, [])

  const filteredSites = React.useMemo(() => {
    return PROTECTED_SITES_DATABASE.filter((site) => {
      const matchSearch =
        search === '' ||
        site.name.toLowerCase().includes(search.toLowerCase()) ||
        site.state.toLowerCase().includes(search.toLowerCase()) ||
        site.flagshipFauna.toLowerCase().includes(search.toLowerCase()) ||
        site.examFact.toLowerCase().includes(search.toLowerCase()) ||
        (site.riverConnection && site.riverConnection.toLowerCase().includes(search.toLowerCase()))

      const matchState = stateFilter === 'all' || site.state === stateFilter
      const matchCategory = categoryFilter === 'all' || site.category === categoryFilter
      return matchSearch && matchState && matchCategory
    })
  }, [search, stateFilter, categoryFilter])

  return (
    <section className="public-page">
      <div className="public-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '16px' }}>
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/india-physical-geography-map">Physical Geography</Link>
          <span aria-hidden="true">›</span>
          <span>Ramsar Wetlands &amp; National Parks</span>
        </nav>

        <header style={{ marginBottom: '28px' }}>
          <span className="public-kicker">Interactive Ecology &amp; Geography</span>
          <h1 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: 'clamp(28px, 4vw, 42px)', margin: '8px 0 10px', color: 'var(--ink, #0f172a)' }}>
            Ramsar Wetlands &amp; National Parks Explorer
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink2, #475569)', maxWidth: '780px', lineHeight: '1.6', margin: 0 }}>
            Master India’s Ramsar sites, National Parks, Tiger Reserves, and associated river basins. Essential high-yield reference for UPSC, JKPSC, JKSSB, and State PSC environment sections.
          </p>
        </header>

        {/* Filter Controls */}
        <div style={{ background: 'var(--card-bg, #ffffff)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--line, #e2e8f0)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1 1 280px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink2, #64748b)' }} />
              <input
                type="text"
                placeholder="Search wetland, park, fauna, or river (e.g. 'Loktak', 'Hangul', 'Jhelum', 'Kaziranga')..."
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
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
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
              <option value="all">All Protected Categories</option>
              <option value="Ramsar Wetland">Ramsar Wetlands</option>
              <option value="National Park">National Parks</option>
              <option value="Tiger Reserve">Tiger Reserves</option>
              <option value="Biosphere Reserve">Biosphere Reserves</option>
            </select>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
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
              <option value="all">All States &amp; UTs</option>
              {uniqueStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sites Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredSites.map((site) => (
            <article
              key={site.name}
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
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand, #0f766e)' }}>{site.state}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: site.category === 'Ramsar Wetland' ? '#eff6ff' : '#f0fdf4',
                      color: site.category === 'Ramsar Wetland' ? '#1d4ed8' : '#15803d',
                      border: `1px solid ${site.category === 'Ramsar Wetland' ? '#bfdbfe' : '#bbf7d0'}`,
                    }}
                  >
                    {site.category}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', margin: '0 0 6px', color: 'var(--ink, #0f172a)', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                  {site.name}
                </h3>

                {site.riverConnection && (
                  <div style={{ fontSize: '13px', color: '#0369a1', marginBottom: '8px' }}>
                    <strong>River / Basin:</strong> {site.riverConnection}
                  </div>
                )}

                <div style={{ fontSize: '13px', color: 'var(--ink, #334155)', marginBottom: '10px' }}>
                  <strong>Key Fauna:</strong> {site.flagshipFauna}
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--brand, #0f766e)' }}>
                  <strong style={{ fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--brand, #0f766e)', letterSpacing: '0.4px', display: 'block', marginBottom: '4px' }}>
                    Exam Significance
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--ink2, #475569)', lineHeight: '1.5' }}>
                    {site.examFact}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--line, #e2e8f0)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                  to={`/india-physical-geography-map`}
                  style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--brand, #0f766e)', textDecoration: 'none' }}
                >
                  View on Physical Map →
                </Link>
                <Link
                  to="/blog/indian-rivers-and-tributaries"
                  style={{ fontSize: '12px', color: 'var(--ink2, #64748b)', textDecoration: 'none' }}
                >
                  River Notes ↗
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: '36px', textAlign: 'center', padding: '24px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '12px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '20px', margin: '0 0 8px', color: 'var(--ink, #0f172a)' }}>
            Practice Environment &amp; Ecology Previous Year Questions
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--ink2, #475569)', maxWidth: '600px', margin: '0 auto 16px' }}>
            Solve actual UPSC, JKPSC, and State PSC questions on Ramsar sites, wildlife sanctuaries, and river basins with verified explanations.
          </p>
          <Link
            to="/exam/upsc-cse?tab=subjects&subject=Environment%20%26%20Ecology"
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
            Practice Environment PYQs (Free) →
          </Link>
        </div>
      </div>
    </section>
  )
}
