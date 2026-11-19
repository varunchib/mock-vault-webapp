import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import {
  JKSSB_VOCAB_CONFIG,
  SSC_CGL_VOCAB_CONFIG,
  VOCAB_BLOG_MODIFIED,
  VOCAB_BLOG_PUBLISHED,
  type VocabArticleConfig,
} from './vocabBlogArticleMeta'

type VocabTab = 'all' | 'antonyms' | 'synonyms' | 'idioms' | 'one-word'

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  })

function VocabBlogArticle({ config }: { config: VocabArticleConfig }) {
  usePageMeta({
    title: config.title,
    description: config.description,
    canonicalPath: config.path,
    ogType: 'article',
    jsonLd: config.jsonLd,
  })

  const [activeTab, setActiveTab] = useState<VocabTab>('all')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const filteredAntonyms = useMemo(
    () =>
      config.antonyms.filter(
        (w) =>
          !q ||
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q) ||
          w.primaryAnswer.toLowerCase().includes(q) ||
          w.alsoPair.toLowerCase().includes(q),
      ),
    [config.antonyms, q],
  )

  const filteredSynonyms = useMemo(
    () =>
      config.synonyms.filter(
        (w) =>
          !q ||
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q) ||
          w.primaryAnswer.toLowerCase().includes(q) ||
          w.alsoPair.toLowerCase().includes(q),
      ),
    [config.synonyms, q],
  )

  const filteredIdioms = useMemo(
    () =>
      config.idioms.filter(
        (i) =>
          !q ||
          i.idiom.toLowerCase().includes(q) ||
          i.meaning.toLowerCase().includes(q) ||
          i.example.toLowerCase().includes(q),
      ),
    [config.idioms, q],
  )

  const filteredOneWords = useMemo(
    () =>
      config.oneWords.filter(
        (o) =>
          !q ||
          o.phrase.toLowerCase().includes(q) ||
          o.substitute.toLowerCase().includes(q) ||
          o.rootNote.toLowerCase().includes(q),
      ),
    [config.oneWords, q],
  )

  const totalCount =
    config.antonyms.length + config.synonyms.length + config.idioms.length + config.oneWords.length

  const showAntonyms = activeTab === 'all' || activeTab === 'antonyms'
  const showSynonyms = activeTab === 'all' || activeTab === 'synonyms'
  const showIdioms = activeTab === 'all' || activeTab === 'idioms'
  const showOneWords = activeTab === 'all' || activeTab === 'one-word'

  const siblingHref = config.id === 'jkssb' ? SSC_CGL_VOCAB_CONFIG.path : JKSSB_VOCAB_CONFIG.path
  const siblingLabel =
    config.id === 'jkssb'
      ? 'SSC CGL Most Repeated Synonyms & Antonyms →'
      : 'JKSSB Most Repeated Synonyms & Antonyms →'

  return (
    <section className="public-page river-article-page">
      <main className="public-shell river-article-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/blog">Blog</Link>
          <span aria-hidden="true">›</span>
          <span>{config.breadcrumbLabel}</span>
        </nav>

        <article className="river-guide-article">
          <header className="river-guide-header" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="public-kicker" style={{ margin: 0 }}>{config.kicker}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'var(--blue-bg)', color: 'var(--blue)', border: '1px solid var(--blue-border)' }}>
                {config.badge}
              </span>
            </div>

            <h1>{config.headline}</h1>

            <p className="river-guide-deck" style={{ margin: '0 0 14px' }}>{config.deck}</p>

            <p className="river-guide-byline" style={{ margin: '0 0 18px' }}>
              By <Link to="/about" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 600 }}>Ministry of Papers Editorial Team</Link>{' '}
              <span aria-hidden="true">·</span> Published{' '}
              <time dateTime={VOCAB_BLOG_PUBLISHED}>{fmtDate(VOCAB_BLOG_PUBLISHED)}</time>{' '}
              <span aria-hidden="true">·</span> Updated{' '}
              <time dateTime={VOCAB_BLOG_MODIFIED}>{fmtDate(VOCAB_BLOG_MODIFIED)}</time>{' '}
              <span aria-hidden="true">·</span> 12 min read
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div style={{ background: 'var(--card-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🔁</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink)' }}>{totalCount}</div>
                  <div style={{ fontSize: '11px', color: 'var(--ink2)', fontWeight: 600 }}>High-Frequency Entries</div>
                </div>
              </div>

              <div style={{ background: 'var(--blue-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--blue-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>⚖️</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--blue)' }}>{config.antonyms.length + config.synonyms.length}</div>
                  <div style={{ fontSize: '11px', color: 'var(--blue)', fontWeight: 600 }}>Antonym &amp; Synonym Sets</div>
                </div>
              </div>

              <div style={{ background: 'var(--green-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--green-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>💬</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--green)' }}>{config.idioms.length + config.oneWords.length}</div>
                  <div style={{ fontSize: '11px', color: 'var(--green)', fontWeight: 600 }}>Idioms &amp; One-Word Sets</div>
                </div>
              </div>

              <div style={{ background: 'var(--hl-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--hl-border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>🎯</span>
                <div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--hl-dark)' }}>100%</div>
                  <div style={{ fontSize: '11px', color: 'var(--hl-dark)', fontWeight: 600 }}>PYQ-Backed</div>
                </div>
              </div>
            </div>
          </header>

          <section className="river-guide-answer" aria-labelledby="vocab-quick-answer">
            <h2 id="vocab-quick-answer">Quick revision strategy</h2>
            <p>{config.quickAnswer}</p>
          </section>

          <nav className="river-guide-toc" aria-label="Contents">
            <h2>In this guide</h2>
            <ol>
              <li><a href="#antonyms-section">{config.antonymsHeading.replace(/^\d+\.\s*/, '')}</a></li>
              <li><a href="#synonyms-section">{config.synonymsHeading.replace(/^\d+\.\s*/, '')}</a></li>
              <li><a href="#idioms-section">High-yield idioms &amp; phrases</a></li>
              <li><a href="#one-word-section">Important one-word substitutions</a></li>
              <li><a href="#confusion-pairs">{config.trapsHeading.replace(/^\d+\.\s*/, '')}</a></li>
              <li><a href="#pyq-practice">Solve real vocabulary PYQs</a></li>
              <li><a href="#vocab-faqs">Frequently asked questions</a></li>
            </ol>
          </nav>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px',
              borderRadius: '12px',
              background: 'var(--card-bg)',
              border: '1px solid var(--line)',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} role="tablist" aria-label="Filter vocabulary sections">
              {(
                [
                  ['all', `All (${totalCount})`],
                  ['antonyms', `Antonyms (${filteredAntonyms.length})`],
                  ['synonyms', `Synonyms (${filteredSynonyms.length})`],
                  ['idioms', `Idioms (${filteredIdioms.length})`],
                  ['one-word', `One-Word (${filteredOneWords.length})`],
                ] as Array<[VocabTab, string]>
              ).map(([tab, label]) => {
                const active = activeTab === tab
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '999px',
                      border: active ? '1px solid var(--brand)' : '1px solid var(--line)',
                      background: active ? 'var(--brand)' : 'transparent',
                      color: active ? '#fff' : 'var(--ink)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search word, meaning, or idiom..."
              aria-label="Search vocabulary list"
              style={{
                minWidth: '220px',
                flex: '1 1 220px',
                maxWidth: '320px',
                padding: '7px 12px',
                borderRadius: '8px',
                border: '1px solid var(--line)',
                background: 'var(--bg)',
                color: 'var(--ink)',
                fontSize: '13px',
              }}
            />
          </div>

          {showAntonyms && (
            <section id="antonyms-section" style={{ marginBottom: '36px' }}>
              <h2>{config.antonymsHeading}</h2>
              <div className="river-table-wrap">
                <table className="river-table">
                  <thead>
                    <tr>
                      <th>Word</th>
                      <th>Meaning</th>
                      <th>Top Antonyms</th>
                      <th>Memory Hook &amp; Synonyms</th>
                      <th>PYQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAntonyms.map((item) => (
                      <tr key={item.word}>
                        <td>
                          <strong>{item.word}</strong>
                          <div style={{ fontSize: '11px', color: 'var(--ink2)' }}>{item.pos}</div>
                        </td>
                        <td>{item.meaning}</td>
                        <td><strong>{item.primaryAnswer}</strong></td>
                        <td>
                          <div>{item.hook}</div>
                          <div style={{ fontSize: '12px', color: 'var(--ink2)', marginTop: '4px' }}>{item.alsoPair}</div>
                        </td>
                        <td>
                          {item.pyqHref ? (
                            <Link to={item.pyqHref} style={{ fontWeight: 600, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
                              Solve PYQ →
                            </Link>
                          ) : (
                            <span style={{ color: 'var(--ink2)', fontSize: '12px' }}>Core PYQ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {showSynonyms && (
            <section id="synonyms-section" style={{ marginBottom: '36px' }}>
              <h2>{config.synonymsHeading}</h2>
              <div className="river-table-wrap">
                <table className="river-table">
                  <thead>
                    <tr>
                      <th>Word</th>
                      <th>Meaning</th>
                      <th>Top Synonyms</th>
                      <th>Memory Hook &amp; Antonyms</th>
                      <th>PYQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSynonyms.map((item) => (
                      <tr key={item.word}>
                        <td>
                          <strong>{item.word}</strong>
                          <div style={{ fontSize: '11px', color: 'var(--ink2)' }}>{item.pos}</div>
                        </td>
                        <td>{item.meaning}</td>
                        <td><strong>{item.primaryAnswer}</strong></td>
                        <td>
                          <div>{item.hook}</div>
                          <div style={{ fontSize: '12px', color: 'var(--ink2)', marginTop: '4px' }}>{item.alsoPair}</div>
                        </td>
                        <td>
                          {item.pyqHref ? (
                            <Link to={item.pyqHref} style={{ fontWeight: 600, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
                              Solve PYQ →
                            </Link>
                          ) : (
                            <span style={{ color: 'var(--ink2)', fontSize: '12px' }}>Core PYQ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {showIdioms && (
            <section id="idioms-section" style={{ marginBottom: '36px' }}>
              <h2>3. High-Yield Idioms &amp; Phrases</h2>
              <div className="river-table-wrap">
                <table className="river-table">
                  <thead>
                    <tr>
                      <th>Idiom / Phrase</th>
                      <th>Exact Exam Meaning</th>
                      <th>Usage Example</th>
                      <th>PYQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIdioms.map((item) => (
                      <tr key={item.idiom}>
                        <td><strong>{item.idiom}</strong></td>
                        <td>{item.meaning}</td>
                        <td>{item.example}</td>
                        <td>
                          {item.pyqHref ? (
                            <Link to={item.pyqHref} style={{ fontWeight: 600, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
                              Solve PYQ →
                            </Link>
                          ) : (
                            <span style={{ color: 'var(--ink2)', fontSize: '12px' }}>Core PYQ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {showOneWords && (
            <section id="one-word-section" style={{ marginBottom: '36px' }}>
              <h2>4. Important One-Word Substitutions</h2>
              <div className="river-table-wrap">
                <table className="river-table">
                  <thead>
                    <tr>
                      <th>Definition / Phrase</th>
                      <th>One-Word Substitute</th>
                      <th>Root Clue</th>
                      <th>PYQ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOneWords.map((item) => (
                      <tr key={item.substitute}>
                        <td>{item.phrase}</td>
                        <td><strong>{item.substitute}</strong></td>
                        <td>{item.rootNote}</td>
                        <td>
                          {item.pyqHref ? (
                            <Link to={item.pyqHref} style={{ fontWeight: 600, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
                              Solve PYQ →
                            </Link>
                          ) : (
                            <span style={{ color: 'var(--ink2)', fontSize: '12px' }}>Core PYQ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          <section id="confusion-pairs" style={{ marginBottom: '36px' }}>
            <h2>{config.trapsHeading}</h2>
            <div className="river-guide-mistakes">
              {config.confusionPairs.map(([title, detail]) => (
                <div key={title} className="river-mistake-card">
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="pyq-practice" style={{ marginBottom: '36px' }}>
            <h2>6. Solve Real Vocabulary PYQs</h2>
            <p>
              Practice these words in official exam format, then explore our{' '}
              <Link to={config.examHubHref}>{config.examHubLabel}</Link>,{' '}
              <Link to={config.guideHref}>{config.guideLabel}</Link>, or{' '}
              <Link to={siblingHref}>{siblingLabel}</Link>
            </p>
            <ul className="river-pyq-list">
              {config.directPyqs.map((qItem) => (
                <li key={qItem.href}>
                  <Link to={qItem.href}>{qItem.label}</Link>
                  <span className="river-pyq-exam">{qItem.tag}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="vocab-faqs" className="river-guide-faqs">
            <h2>7. Frequently Asked Questions</h2>
            <dl>
              {config.faqs.map(([question, answer]) => (
                <div key={question} className="river-faq-item">
                  <dt>{question}</dt>
                  <dd>{answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </main>
    </section>
  )
}

export function JkssbVocabBlogPage() {
  return <VocabBlogArticle config={JKSSB_VOCAB_CONFIG} />
}

export function SscCglVocabBlogPage() {
  return <VocabBlogArticle config={SSC_CGL_VOCAB_CONFIG} />
}
