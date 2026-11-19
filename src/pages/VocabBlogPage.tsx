import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import {
  JKSSB_VOCAB_PYQS,
  SSC_CGL_VOCAB_PYQS,
  type VocabPyqItem,
} from '../data/vocabPyqData'
import {
  JKSSB_VOCAB_CONFIG,
  SSC_CGL_VOCAB_CONFIG,
  VOCAB_BLOG_MODIFIED,
  type VocabArticleConfig,
} from './vocabBlogArticleMeta'

type VocabCat = 'all' | 'synonym' | 'antonym' | 'idiom' | 'one-word'

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  })

const CAT_ORDER: Array<{ key: VocabPyqItem['category']; heading: string; answerCol: string; termCol: string }> = [
  { key: 'synonym', heading: 'Synonyms', answerCol: 'Synonym (Answer)', termCol: 'Word' },
  { key: 'antonym', heading: 'Antonyms', answerCol: 'Antonym (Answer)', termCol: 'Word' },
  { key: 'idiom', heading: 'Idioms & Phrases', answerCol: 'Meaning (Answer)', termCol: 'Idiom / Phrase' },
  { key: 'one-word', heading: 'One-Word Substitutions', answerCol: 'Definition / Meaning', termCol: 'One-Word Substitute' },
]

function VocabBlogArticle({
  config,
  pyqItems,
}: {
  config: VocabArticleConfig
  pyqItems: VocabPyqItem[]
}) {
  usePageMeta({
    title: config.title,
    description: config.description,
    canonicalPath: config.path,
    ogType: 'article',
    jsonLd: config.jsonLd,
  })

  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedCat, setSelectedCat] = useState<VocabCat>('all')
  const [onlyRepeated, setOnlyRepeated] = useState(false)
  const [query, setQuery] = useState('')
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const years = useMemo(() => {
    const counts = new Map<string, number>()
    for (const item of pyqItems) {
      counts.set(item.year, (counts.get(item.year) ?? 0) + 1)
    }
    return Array.from(counts.entries()).sort((a, b) => Number(b[0]) - Number(a[0]))
  }, [pyqItems])

  const catCounts = useMemo(() => {
    const counts: Record<VocabCat, number> = {
      all: pyqItems.length,
      synonym: 0,
      antonym: 0,
      idiom: 0,
      'one-word': 0,
    }
    for (const item of pyqItems) {
      counts[item.category] += 1
    }
    return counts
  }, [pyqItems])

  const repeatedTotal = useMemo(
    () => pyqItems.filter((x) => x.repeatCount > 1).length,
    [pyqItems],
  )

  const q = query.trim().toLowerCase()

  const filteredItems = useMemo(
    () =>
      pyqItems.filter((item) => {
        if (selectedYear !== 'all' && item.year !== selectedYear) return false
        if (selectedCat !== 'all' && item.category !== selectedCat) return false
        if (onlyRepeated && item.repeatCount <= 1) return false
        if (!q) return true
        return (
          item.word.toLowerCase().includes(q) ||
          item.meaning.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q) ||
          item.paperTitle.toLowerCase().includes(q)
        )
      }),
    [pyqItems, selectedYear, selectedCat, onlyRepeated, q],
  )

  const groupedByYear = useMemo(() => {
    const map = new Map<string, VocabPyqItem[]>()
    for (const item of filteredItems) {
      const list = map.get(item.year) ?? []
      list.push(item)
      map.set(item.year, list)
    }
    return Array.from(map.entries()).sort((a, b) => Number(b[0]) - Number(a[0]))
  }, [filteredItems])

  const siblingHref = config.id === 'jkssb' ? SSC_CGL_VOCAB_CONFIG.path : JKSSB_VOCAB_CONFIG.path
  const siblingLabel =
    config.id === 'jkssb'
      ? 'SSC CGL Most Repeated Synonyms & Antonyms'
      : 'JKSSB Most Repeated Synonyms & Antonyms'

  const examShort = config.id === 'jkssb' ? 'JKSSB' : 'SSC CGL'

  return (
    <section className="public-page river-article-page">
      <main className="public-shell river-article-shell" style={{ overflowX: 'clip' }}>
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/blog">Blog</Link>
          <span aria-hidden="true">›</span>
          <span>{config.breadcrumbLabel}</span>
        </nav>

        <article className="river-guide-article" style={{ maxWidth: '100%', overflowX: 'clip' }}>
          <header className="river-guide-header" style={{ marginBottom: '22px' }}>
            <p className="public-kicker" style={{ marginBottom: '8px' }}>{config.kicker}</p>
            <h1>{config.headline}</h1>
            <p className="river-guide-deck" style={{ margin: '0 0 12px' }}>{config.deck}</p>
            <p className="river-guide-byline" style={{ margin: 0 }}>
              By <Link to="/about" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 600 }}>Ministry of Papers Editorial Team</Link>{' '}
              <span aria-hidden="true">·</span> Updated{' '}
              <time dateTime={VOCAB_BLOG_MODIFIED}>{fmtDate(VOCAB_BLOG_MODIFIED)}</time>{' '}
              <span aria-hidden="true">·</span> {pyqItems.length} Official PYQs ({years[years.length - 1]?.[0]}–{years[0]?.[0]})
            </p>
          </header>

          <section className="river-guide-answer" aria-labelledby="vocab-quick-answer" style={{ marginBottom: '20px' }}>
            <h2 id="vocab-quick-answer">Key takeaway</h2>
            <p style={{ marginBottom: 0 }}>{config.quickAnswer}</p>
          </section>

          <section aria-labelledby="about-this-guide" style={{ marginBottom: '22px' }}>
            <h2 id="about-this-guide" style={{ fontSize: '19px', marginBottom: '8px' }}>What is in this {examShort} vocabulary guide</h2>
            <p style={{ marginBottom: 0 }}>{config.aboutPage}</p>
          </section>

          {/* Clean Editorial Year & Type Controls */}
          <div
            id="vocab-filters"
            aria-label="Filter vocabulary PYQs by year and type"
            style={{
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
              padding: '14px 0',
              marginBottom: '28px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 14px', marginBottom: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink2)' }}>Year:</span>
              <button
                type="button"
                onClick={() => setSelectedYear('all')}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: selectedYear === 'all' ? '2px solid var(--brand)' : '2px solid transparent',
                  padding: '3px 2px',
                  fontSize: '14px',
                  fontWeight: selectedYear === 'all' ? 700 : 500,
                  color: selectedYear === 'all' ? 'var(--brand)' : 'var(--ink2)',
                  cursor: 'pointer',
                }}
              >
                All ({pyqItems.length})
              </button>
              {years.map(([yr, cnt]) => {
                const active = selectedYear === yr
                return (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    style={{
                      background: 'none',
                      border: 'none',
                      borderBottom: active ? '2px solid var(--brand)' : '2px solid transparent',
                      padding: '3px 2px',
                      fontSize: '14px',
                      fontWeight: active ? 700 : 500,
                      color: active ? 'var(--brand)' : 'var(--ink2)',
                      cursor: 'pointer',
                    }}
                  >
                    {yr} ({cnt})
                  </button>
                )
              })}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink2)' }}>Type:</span>
                {(
                  [
                    ['all', `All (${catCounts.all})`],
                    ['synonym', `Synonyms (${catCounts.synonym})`],
                    ['antonym', `Antonyms (${catCounts.antonym})`],
                    ['idiom', `Idioms (${catCounts.idiom})`],
                    ['one-word', `One-Word (${catCounts['one-word']})`],
                  ] as Array<[VocabCat, string]>
                ).map(([cat, label]) => {
                  const active = selectedCat === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCat(cat)}
                      style={{
                        background: 'none',
                        border: 'none',
                        borderBottom: active ? '2px solid var(--ink)' : '2px solid transparent',
                        padding: '2px 2px',
                        fontSize: '13.5px',
                        fontWeight: active ? 700 : 500,
                        color: active ? 'var(--ink)' : 'var(--ink2)',
                        cursor: 'pointer',
                      }}
                    >
                      {label}
                    </button>
                  )
                })}

                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 600, color: 'var(--hl-dark)', cursor: 'pointer', marginLeft: '4px' }}>
                  <input
                    type="checkbox"
                    checked={onlyRepeated}
                    onChange={(e) => setOnlyRepeated(e.target.checked)}
                  />
                  Repeated only ({repeatedTotal})
                </label>
              </div>

              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search word or meaning..."
                aria-label="Search vocabulary PYQs"
                style={{
                  minWidth: '180px',
                  flex: '1 1 180px',
                  maxWidth: '250px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--line)',
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                  fontSize: '13.5px',
                }}
              />
            </div>
          </div>

          {/* Year-wise -> Separate Table per Category (Synonyms, Antonyms, Idioms, One-Word) */}
          <section aria-label="Year-wise vocabulary tables" style={{ marginBottom: '36px' }}>
            {groupedByYear.length === 0 ? (
              <p style={{ padding: '20px 0', color: 'var(--ink2)' }}>
                No matching vocabulary entries found for this filter.
              </p>
            ) : (
              groupedByYear.map(([yr, yearItems]) => (
                <section key={yr} id={`year-${yr}`} style={{ marginBottom: '42px' }}>
                  <h2 style={{ marginBottom: '16px', paddingBottom: '6px', borderBottom: '2px solid var(--line)' }}>
                    {examShort} {yr} Vocabulary Questions ({yearItems.length})
                  </h2>

                  {CAT_ORDER.map((catSpec) => {
                    const catItems = yearItems.filter((it) => it.category === catSpec.key)
                    if (catItems.length === 0) return null

                    return (
                      <div key={`${yr}-${catSpec.key}`} id={`year-${yr}-${catSpec.key}`} style={{ marginBottom: '26px' }}>
                        <h3 style={{ marginBottom: '10px', fontSize: '17px' }}>
                          {examShort} {yr} {catSpec.heading} ({catItems.length})
                        </h3>

                        <div
                          className="river-guide-table-wrap"
                          role="region"
                          aria-label={`${examShort} ${yr} ${catSpec.heading}`}
                          tabIndex={0}
                          style={{ maxWidth: '100%', overflowX: 'auto' }}
                        >
                          <table
                            className="river-guide-table"
                            style={{ width: '100%', tableLayout: 'auto', overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                          >
                            <thead>
                              <tr>
                                <th style={{ width: '24%' }}>{catSpec.termCol}</th>
                                <th style={{ width: '24%' }}>{catSpec.answerCol}</th>
                                <th style={{ width: '52%' }}>Meaning &amp; Exam Paper</th>
                              </tr>
                            </thead>
                            <tbody>
                              {catItems.map((item, idx) => {
                                const isRepeated = item.repeatCount > 1
                                const rowKey = `${yr}-${catSpec.key}-${item.paperSlug}-${idx}`
                                const tooltipText = isRepeated
                                  ? `Repeated ${item.repeatCount}× across: ${item.repeatSources.join(' | ')}`
                                  : ''

                                return (
                                  <tr
                                    key={rowKey}
                                    onMouseEnter={() => isRepeated && setHoveredKey(rowKey)}
                                    onMouseLeave={() => hoveredKey === rowKey && setHoveredKey(null)}
                                    style={isRepeated ? { background: 'var(--hl-bg)' } : undefined}
                                  >
                                    <td>
                                      <strong style={{ wordBreak: 'break-word' }}>{item.word}</strong>
                                      {isRepeated && (
                                        <div style={{ marginTop: '4px', position: 'relative' }}>
                                          <button
                                            type="button"
                                            title={tooltipText}
                                            onClick={() => setHoveredKey(hoveredKey === rowKey ? null : rowKey)}
                                            aria-expanded={hoveredKey === rowKey}
                                            style={{
                                              background: 'none',
                                              border: 'none',
                                              borderBottom: '1px dashed #d97706',
                                              padding: 0,
                                              display: 'inline-block',
                                              fontSize: '11.5px',
                                              fontWeight: 700,
                                              color: '#92400e',
                                              cursor: 'pointer',
                                            }}
                                          >
                                            Repeated {item.repeatCount}×
                                          </button>
                                          {hoveredKey === rowKey && (
                                            <span
                                              role="tooltip"
                                              style={{
                                                position: 'absolute',
                                                left: 0,
                                                top: 'calc(100% + 4px)',
                                                zIndex: 20,
                                                width: 'min(260px, 72vw)',
                                                padding: '8px 10px',
                                                borderRadius: '6px',
                                                background: '#111827',
                                                color: '#f9fafb',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                lineHeight: 1.45,
                                                boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                                                whiteSpace: 'normal',
                                              }}
                                            >
                                              <strong>Repeated {item.repeatCount} times:</strong>
                                              <br />
                                              {item.repeatSources.join(' · ')}
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </td>

                                    <td>
                                      <strong style={{ color: 'var(--green)' }}>{item.answer}</strong>
                                      {item.questionHref && (
                                        <div style={{ marginTop: '3px' }}>
                                          <Link to={item.questionHref} style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--brand)', textDecoration: 'none' }}>
                                            PYQ →
                                          </Link>
                                        </div>
                                      )}
                                    </td>

                                    <td>
                                      <div style={{ color: 'var(--ink)', lineHeight: 1.5 }}>{item.meaning}</div>
                                      <div style={{ fontSize: '12px', color: 'var(--ink2)', marginTop: '4px' }}>
                                        <Link to={`/pyq/${item.paperSlug}`} style={{ color: 'var(--ink2)', textDecoration: 'none' }}>
                                          {item.paperTitle}
                                        </Link>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  })}
                  <div style={{ textAlign: 'right', marginTop: '-10px' }}>
                    <a
                      href="#vocab-filters"
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--brand)',
                        textDecoration: 'none',
                      }}
                    >
                      ↑ Back to top
                    </a>
                  </div>
                </section>
              ))
            )}
          </section>

          <section id="confusion-pairs" style={{ marginBottom: '36px' }}>
            <h2>{config.trapsHeading.replace(/^\d+\.\s*/, '')}</h2>
            <ul style={{ paddingLeft: '20px', lineHeight: 1.75 }}>
              {config.confusionPairs.map(([title, detail]) => (
                <li key={title} style={{ marginBottom: '8px' }}>
                  <strong>{title}:</strong> {detail}
                </li>
              ))}
            </ul>
          </section>

          <section id="pyq-practice" style={{ marginBottom: '36px' }}>
            <h2>Related {examShort} Links</h2>
            <p>
              Browse full papers in our <Link to={config.examHubHref}>{config.examHubLabel}</Link>, check official cutoffs in{' '}
              <Link to={config.guideHref}>{config.guideLabel}</Link>, or read{' '}
              <Link to={siblingHref}>{siblingLabel}</Link>.
            </p>
          </section>

          <section id="vocab-faqs" className="river-guide-faqs">
            <h2>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {config.faqs.map(([question, answer]) => (
                <details
                  key={question}
                  className="river-guide-faq"
                  style={{
                    borderBottom: '1px solid var(--line)',
                    paddingBottom: '10px',
                  }}
                >
                  <summary style={{ cursor: 'pointer', fontWeight: 700, padding: '6px 0', color: 'var(--ink)' }}>
                    {question}
                  </summary>
                  <p style={{ margin: '6px 0 4px', color: 'var(--ink2)' }}>{answer}</p>
                </details>
              ))}
            </div>
          </section>
        </article>
      </main>
    </section>
  )
}

export function JkssbVocabBlogPage() {
  return <VocabBlogArticle config={JKSSB_VOCAB_CONFIG} pyqItems={JKSSB_VOCAB_PYQS} />
}

export function SscCglVocabBlogPage() {
  return <VocabBlogArticle config={SSC_CGL_VOCAB_CONFIG} pyqItems={SSC_CGL_VOCAB_PYQS} />
}
