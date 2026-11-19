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
  VOCAB_BLOG_PUBLISHED,
  type VocabArticleConfig,
} from './vocabBlogArticleMeta'

type VocabCat = 'all' | 'synonym' | 'antonym' | 'idiom' | 'one-word'

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata',
  })

const CAT_META: Record<VocabPyqItem['category'], { label: string; bg: string; fg: string; border: string }> = {
  synonym: { label: 'Synonym', bg: 'var(--blue-bg)', fg: 'var(--blue)', border: 'var(--blue-border)' },
  antonym: { label: 'Antonym', bg: 'var(--hl-bg)', fg: 'var(--hl-dark)', border: 'var(--hl-border)' },
  idiom: { label: 'Idiom & Phrase', bg: 'var(--green-bg)', fg: 'var(--green)', border: 'var(--green-border)' },
  'one-word': { label: 'One-Word', bg: 'var(--card-bg)', fg: 'var(--ink)', border: 'var(--line)' },
}

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
          item.term.toLowerCase().includes(q) ||
          item.question.toLowerCase().includes(q) ||
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
      ? 'SSC CGL Most Repeated Synonyms & Antonyms →'
      : 'JKSSB Most Repeated Synonyms & Antonyms →'

  const examShort = config.id === 'jkssb' ? 'JKSSB' : 'SSC CGL'

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
          <header className="river-guide-header" style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span className="public-kicker" style={{ margin: 0 }}>{config.kicker}</span>
              <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', background: 'var(--blue-bg)', color: 'var(--blue)', border: '1px solid var(--blue-border)' }}>
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
              <span aria-hidden="true">·</span> {pyqItems.length} Official PYQs
            </p>

            {/* Summary KPI Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px',
                marginBottom: '18px',
              }}
            >
              <div style={{ background: 'var(--card-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink)' }}>{pyqItems.length}</div>
                <div style={{ fontSize: '12px', color: 'var(--ink2)', fontWeight: 600 }}>Official {examShort} Vocab PYQs</div>
              </div>
              <div style={{ background: 'var(--blue-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--blue-border)' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--blue)' }}>{catCounts.synonym + catCounts.antonym}</div>
                <div style={{ fontSize: '12px', color: 'var(--blue)', fontWeight: 600 }}>Synonyms &amp; Antonyms</div>
              </div>
              <div style={{ background: 'var(--green-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--green-border)' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--green)' }}>{catCounts.idiom + catCounts['one-word']}</div>
                <div style={{ fontSize: '12px', color: 'var(--green)', fontWeight: 600 }}>Idioms &amp; One-Word</div>
              </div>
              <div style={{ background: 'var(--hl-bg)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--hl-border)' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--hl-dark)' }}>{repeatedTotal}</div>
                <div style={{ fontSize: '12px', color: 'var(--hl-dark)', fontWeight: 600 }}>Highlighted Repeats</div>
              </div>
            </div>
          </header>

          <section className="river-guide-answer" aria-labelledby="vocab-quick-answer">
            <h2 id="vocab-quick-answer">Quick revision strategy</h2>
            <p>{config.quickAnswer}</p>
          </section>

          {/* Year-Wise Filter + Category Filter Bar at Top */}
          <section
            aria-label="Filter vocabulary PYQs by year and category"
            style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'var(--card-bg)',
              border: '1px solid var(--line)',
              marginBottom: '26px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ink2)', marginBottom: '8px' }}>
              Filter by Exam Year
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
              <button
                type="button"
                onClick={() => setSelectedYear('all')}
                style={{
                  padding: '6px 13px',
                  borderRadius: '999px',
                  border: selectedYear === 'all' ? '1px solid var(--brand)' : '1px solid var(--line)',
                  background: selectedYear === 'all' ? 'var(--brand)' : 'transparent',
                  color: selectedYear === 'all' ? '#fff' : 'var(--ink)',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                All Years ({pyqItems.length})
              </button>
              {years.map(([yr, cnt]) => {
                const active = selectedYear === yr
                return (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYear(yr)}
                    style={{
                      padding: '6px 13px',
                      borderRadius: '999px',
                      border: active ? '1px solid var(--brand)' : '1px solid var(--line)',
                      background: active ? 'var(--brand)' : 'transparent',
                      color: active ? '#fff' : 'var(--ink)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {yr} ({cnt})
                  </button>
                )
              })}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {(
                  [
                    ['all', `All Types (${catCounts.all})`],
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
                        padding: '5px 11px',
                        borderRadius: '8px',
                        border: active ? '1px solid var(--ink)' : '1px solid var(--line)',
                        background: active ? 'var(--ink)' : 'transparent',
                        color: active ? 'var(--bg)' : 'var(--ink2)',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {label}
                    </button>
                  )
                })}

                <button
                  type="button"
                  onClick={() => setOnlyRepeated((v) => !v)}
                  style={{
                    padding: '5px 11px',
                    borderRadius: '8px',
                    border: onlyRepeated ? '1px solid var(--hl-dark)' : '1px solid var(--hl-border)',
                    background: onlyRepeated ? 'var(--hl-bg)' : 'transparent',
                    color: 'var(--hl-dark)',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  🔥 Repeated Only ({repeatedTotal})
                </button>
              </div>

              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search word, answer, or paper..."
                aria-label="Search vocabulary PYQs"
                style={{
                  minWidth: '210px',
                  flex: '1 1 210px',
                  maxWidth: '290px',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--line)',
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                  fontSize: '13.5px',
                }}
              />
            </div>
          </section>

          {/* Year-by-Year Full List of Official PYQs */}
          <section aria-label="Year-wise vocabulary PYQ list" style={{ marginBottom: '36px' }}>
            {groupedByYear.length === 0 ? (
              <p style={{ padding: '24px', borderRadius: '10px', border: '1px solid var(--line)', textAlign: 'center' }}>
                No matching vocabulary questions found for this filter.
              </p>
            ) : (
              groupedByYear.map(([yr, items]) => (
                <div key={yr} id={`year-${yr}`} style={{ marginBottom: '34px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      borderBottom: '2px solid var(--line)',
                      paddingBottom: '8px',
                      marginBottom: '14px',
                    }}
                  >
                    <h2 style={{ margin: 0 }}>{examShort} {yr} Vocabulary PYQs</h2>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink2)' }}>
                      {items.length} Questions
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {items.map((item, idx) => {
                      const cmeta = CAT_META[item.category]
                      const isRepeated = item.repeatCount > 1
                      const cardKey = `${yr}-${item.paperSlug}-${idx}`
                      const tooltipText = isRepeated
                        ? `Repeated ${item.repeatCount}× across: ${item.repeatSources.join(' | ')}`
                        : ''

                      return (
                        <article
                          key={cardKey}
                          onMouseEnter={() => isRepeated && setHoveredKey(cardKey)}
                          onMouseLeave={() => hoveredKey === cardKey && setHoveredKey(null)}
                          style={{
                            position: 'relative',
                            padding: '15px 16px',
                            borderRadius: '12px',
                            border: isRepeated ? '1.5px solid var(--hl-border)' : '1px solid var(--line)',
                            background: isRepeated ? 'var(--hl-bg)' : 'var(--card-bg)',
                          }}
                        >
                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                              <span
                                style={{
                                  fontSize: '11.5px',
                                  fontWeight: 700,
                                  padding: '2px 9px',
                                  borderRadius: '999px',
                                  background: cmeta.bg,
                                  color: cmeta.fg,
                                  border: `1px solid ${cmeta.border}`,
                                }}
                              >
                                {cmeta.label}
                              </span>

                              {item.term && (
                                <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>
                                  {item.term}
                                </strong>
                              )}

                              {isRepeated && (
                                <span
                                  title={tooltipText}
                                  style={{
                                    position: 'relative',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '11.5px',
                                    fontWeight: 800,
                                    padding: '2px 9px',
                                    borderRadius: '999px',
                                    background: '#fef3c7',
                                    color: '#92400e',
                                    border: '1px solid #f59e0b',
                                    cursor: 'help',
                                  }}
                                >
                                  🔥 Repeated {item.repeatCount}×
                                  {hoveredKey === cardKey && (
                                    <span
                                      role="tooltip"
                                      style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 'calc(100% + 6px)',
                                        zIndex: 20,
                                        minWidth: '250px',
                                        maxWidth: '340px',
                                        padding: '8px 10px',
                                        borderRadius: '8px',
                                        background: '#111827',
                                        color: '#f9fafb',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        lineHeight: 1.45,
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.22)',
                                        whiteSpace: 'normal',
                                      }}
                                    >
                                      <strong>Repeated {item.repeatCount} times:</strong>
                                      <br />
                                      {item.repeatSources.join(' · ')}
                                    </span>
                                  )}
                                </span>
                              )}
                            </div>

                            <Link
                              to={`/pyq/${item.paperSlug}`}
                              style={{ fontSize: '12px', color: 'var(--ink2)', textDecoration: 'none', fontWeight: 600 }}
                            >
                              {item.paperTitle}
                            </Link>
                          </div>

                          <p style={{ margin: '0 0 8px', fontSize: '15.5px', lineHeight: 1.6, color: 'var(--ink)' }}>
                            {item.question}
                          </p>

                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                            <div style={{ fontSize: '14.5px', color: 'var(--green)', fontWeight: 700 }}>
                              Answer: {item.answer}
                            </div>

                            {item.questionHref && (
                              <Link
                                to={item.questionHref}
                                style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand)', textDecoration: 'none' }}
                              >
                                View Full Solution →
                              </Link>
                            )}
                          </div>

                          {item.explanation && (
                            <p style={{ margin: '8px 0 0', fontSize: '13.5px', lineHeight: 1.55, color: 'var(--ink2)' }}>
                              {item.explanation}
                            </p>
                          )}
                        </article>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </section>

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
            <h2>Explore More {examShort} Resources</h2>
            <p>
              Practice full papers on our{' '}
              <Link to={config.examHubHref}>{config.examHubLabel}</Link>, check official cutoffs in{' '}
              <Link to={config.guideHref}>{config.guideLabel}</Link>, or read{' '}
              <Link to={siblingHref}>{siblingLabel}</Link>
            </p>
          </section>

          <section id="vocab-faqs" className="river-guide-faqs">
            <h2>Frequently Asked Questions</h2>
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
  return <VocabBlogArticle config={JKSSB_VOCAB_CONFIG} pyqItems={JKSSB_VOCAB_PYQS} />
}

export function SscCglVocabBlogPage() {
  return <VocabBlogArticle config={SSC_CGL_VOCAB_CONFIG} pyqItems={SSC_CGL_VOCAB_PYQS} />
}
