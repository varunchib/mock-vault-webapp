import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { RIVERS, RIVER_STUDY_DETAILS, type River } from './RiversOfIndiaPage'
import {
  INDIAN_RIVERS_ARTICLE_HEADLINE,
  INDIAN_RIVERS_ARTICLE_META,
  INDIAN_RIVERS_ARTICLE_PATH,
} from './indianRiversArticleMeta'
import { RIVER_GUIDE_EXPLANATIONS } from './riverGuideExplanations'

const riverSystems = [
  { key: 'H' as const, id: 'himalayan-rivers', title: 'Himalayan rivers' },
  { key: 'P' as const, id: 'peninsular-rivers', title: 'Peninsular rivers' },
]

function riverId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function RiverFacts({ river }: { river: River }) {
  const details = RIVER_STUDY_DETAILS[river.name]
  const hasBankLists = Boolean(details?.leftBank.length || details?.rightBank.length)

  return (
    <section className="river-guide-facts" aria-label={`${river.name} river facts`}>
      <dl>
        <dt>Source</dt>
        <dd>{river.source}</dd>

        <dt>States / UTs in India</dt>
        <dd>{river.states.join(', ')}</dd>

        <dt>Length</dt>
        <dd>{river.length}</dd>

        <dt>Drainage</dt>
        <dd>{river.mouth}</dd>
      </dl>

      <div className="river-guide-tributaries">
        <h4>Key tributaries and connections</h4>
        {hasBankLists ? (
          <div className="river-guide-banks">
            {details.leftBank.length > 0 && (
              <p><strong>Left bank:</strong> {details.leftBank.join(', ')}.</p>
            )}
            {details.rightBank.length > 0 && (
              <p><strong>Right bank:</strong> {details.rightBank.join(', ')}.</p>
            )}
          </div>
        ) : (
          <p>{river.tributaries}</p>
        )}
        {details?.tributaryNote && <p className="river-guide-note">{details.tributaryNote}</p>}
      </div>

    </section>
  )
}

function RiverEntry({ river }: { river: River }) {
  const [routeExplanation, tributaryExplanation] = RIVER_GUIDE_EXPLANATIONS[river.name]

  return (
    <section className="river-guide-entry" id={riverId(river.name)} aria-labelledby={`${riverId(river.name)}-heading`}>
      <h3 id={`${riverId(river.name)}-heading`}>{river.name}</h3>
      <p className="river-guide-context">{river.info}</p>
      <p>{routeExplanation}</p>
      <p>{tributaryExplanation}</p>
      <RiverFacts river={river} />
    </section>
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
          <header className="river-guide-header">
            <p className="river-guide-map-cta">
              <Link to="/india-physical-geography-map">
                View the interactive rivers map <span aria-hidden="true">→</span>
              </Link>
            </p>
            <p className="river-guide-kicker">Geography</p>
            <h1>{INDIAN_RIVERS_ARTICLE_HEADLINE}</h1>
            <p className="river-guide-deck">
              From the glacier-fed rivers of the Himalaya to the monsoon-shaped
              waterways of the Deccan, India’s river systems differ in where they
              begin, how they flow and the landscapes they create. This guide follows
              13 major rivers and explains how their tributaries fit into each basin.
            </p>
            <p className="river-guide-byline">
              Ministry of Papers <span aria-hidden="true">·</span> Geography
            </p>
          </header>

          <nav className="river-guide-index" aria-label="Article contents">
            <h2>In this article</h2>
            <ol>
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
              <li><a href="#further-reading">Further reading</a></li>
            </ol>
          </nav>

          <p>
            Rivers are more than lines on a map. They carry water and sediment from
            uplands to plains and coasts, support farms and settlements, and change
            with the seasons. To compare India’s rivers, it helps to look first at
            their source, the shape of the land they cross and the direction in which
            they drain.
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

          <section className="river-guide-sources" id="further-reading" aria-labelledby="river-guide-sources-heading">
            <h2 id="river-guide-sources-heading">Further reading</h2>
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
        </article>
      </main>
    </section>
  )
}
