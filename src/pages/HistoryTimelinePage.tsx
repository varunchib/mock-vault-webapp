import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import {
  Search,
  Flame,
  Calendar,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Award,
  UserCheck,
} from 'lucide-react'
import {
  ALL_MODERN_HISTORY_EVENTS,
  MODERN_HISTORY_ERAS,
  GOVERNOR_GENERALS_TIMELINE,
} from '../data/modernHistoryEvents'

export const HISTORY_TIMELINE_FAQS = [
  {
    examTag: 'UPSC CSE Prelims 2021',
    q: 'With reference to 8th August 1942 in Indian freedom struggle, which one of the following statements is correct?',
    a: 'On 8 August 1942, the All India Congress Committee (AICC) met at Gowalia Tank (August Kranti Maidan) in Bombay and ratified the historic "Quit India Resolution", where Mahatma Gandhi gave the famous mantra "Do or Die" (Karo ya Maro). In the early hours of 9 August 1942, the British colonial administration launched "Operation Zero Hour", arresting all major Congress leaders (Gandhi, Nehru, Patel, Azad).',
    takeaway: 'Operation Zero Hour occurred immediately following the 8 August 1942 Quit India resolution; Aruna Asaf Ali hoisted the tricolor at Gowalia Tank.',
  },
  {
    examTag: 'UPSC CSE Prelims 2020',
    q: 'Indigo cultivation in India declined by the beginning of the 20th century primarily because of which reason?',
    a: 'Indigo cultivation declined sharply by the start of the 20th century due to its unprofitability in the world market following the German invention and commercial synthesis of synthetic chemical dyes (aniline dyes). The synthetic dyes made natural blue indigo economically unviable, leading European planters in Champaran and Bengal to force ryots to pay heavy illegal cesses (Tinkathia system compensation) to release them from contracts.',
    takeaway: 'Decline was triggered by German synthetic dyes, not peasant resistance or British government prohibition.',
  },
  {
    examTag: 'UPSC CSE Prelims 2019 / JKPSC CCE',
    q: 'With reference to the Swadeshi Movement (1905), which of the following statements is/are correct regarding national education and indigenous industry?',
    a: 'Both statements frequently tested are correct: (1) The Swadeshi Movement gave a massive impetus to indigenous industries, reviving national textile mills, soap and match factories, national banks, and insurance companies; (2) In August 1906, the National Council of Education was formally established to organize an autonomous system of education (literary, scientific, and technical) on national lines, along with the Bengal National College headed by Sri Aurobindo.',
    takeaway: 'National Council of Education (1906) & Bengal Chemicals (P.C. Ray) were direct institutional fruits of the Swadeshi Movement.',
  },
  {
    examTag: 'UPSC CSE Prelims 2022',
    q: 'In the Government of India Act 1919 (Montagu-Chelmsford Reforms), provincial subjects were divided into "Reserved" and "Transferred" subjects. Which were treated as Reserved subjects?',
    a: 'Under the 1919 Act’s provincial "Dyarchy", subjects were bifurcated: (1) Reserved subjects (administered by the Governor and his Executive Council without responsibility to the provincial legislature) included Police, Land Revenue, Administration of Justice, Irrigation, and Finance; (2) Transferred subjects (administered by the Governor on the advice of Indian ministers responsible to the legislative council) included Local Self-Government, Education, Public Health, and Agriculture.',
    takeaway: 'Key trap: Local Self-Government and Education were "Transferred", while Police, Justice, and Land Revenue were strictly "Reserved".',
  },
  {
    examTag: 'UPSC CSE Prelims 2018 / BPSC CCE',
    q: 'Which was the very first act enacted by the British Parliament to control and regulate the affairs of the East India Company in India?',
    a: 'The Regulating Act of 1773 was the first landmark statute passed by the British Parliament to supervise and regulate the commercial and administrative affairs of the East India Company. It elevated the Governor of Bengal to "Governor-General of Bengal" (Lord Warren Hastings), established an Executive Council of four members, and provided for the establishment of the Supreme Court of Judicature at Calcutta (1774) with Sir Elijah Impey as the first Chief Justice.',
    takeaway: '1773 Regulating Act = First parliamentary control + Governor-General of Bengal + 1774 Supreme Court at Calcutta.',
  },
]

export function HistoryTimelinePage() {
  const [search, setSearch] = React.useState('')
  const [activeTab, setActiveTab] = React.useState<'timeline' | 'most-asked' | 'eras' | 'viceroys' | 'acts' | 'faq'>('timeline')
  const [eraFilter, setEraFilter] = React.useState<string>('1757-1857')
  const [frequencyFilter, setFrequencyFilter] = React.useState<'all' | 'Top Tested' | 'Frequently Tested' | 'Moderately Tested'>('all')
  const [visibleCount, setVisibleCount] = React.useState(35)
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null)
  const timelineTopRef = React.useRef<HTMLDivElement>(null)

  // Governor Generals search
  const [govSearch, setGovSearch] = React.useState('')

  usePageMeta({
    title: 'Modern Indian History: Chronological Timeline (1757–1947) | Ministry of Papers',
    description: 'Master Modern Indian History (1757–1947) in strict chronological sequence. Concise Magbook-style points, Governor-Generals & Viceroys timeline, and landmark British Acts for UPSC & State PSCs.',
    canonicalPath: '/modern-indian-history-timeline',
  })

  // Current era metadata & progression calculation
  const currentEraIndex = React.useMemo(() => {
    return MODERN_HISTORY_ERAS.findIndex((e) => e.era === eraFilter)
  }, [eraFilter])

  const currentEraInfo = currentEraIndex >= 0 ? MODERN_HISTORY_ERAS[currentEraIndex] : null
  const nextEraInfo = currentEraIndex >= 0 && currentEraIndex < MODERN_HISTORY_ERAS.length - 1
    ? MODERN_HISTORY_ERAS[currentEraIndex + 1]
    : null

  // Filtered Events for Timeline Tab
  const filteredEvents = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    return ALL_MODERN_HISTORY_EVENTS.filter((ev) => {
      // Era match
      if (eraFilter !== 'all' && ev.era !== eraFilter) {
        return false
      }

      // Frequency match
      if (frequencyFilter !== 'all' && ev.frequency !== frequencyFilter) {
        return false
      }

      if (!q) return true

      return (
        ev.title.toLowerCase().includes(q) ||
        ev.year.toString().includes(q) ||
        ev.viceroyOrGovGen.toLowerCase().includes(q) ||
        ev.summary.toLowerCase().includes(q) ||
        ev.points.some((p) => p.toLowerCase().includes(q)) ||
        ev.category.toLowerCase().includes(q) ||
        ev.keyPersonalities.some((p) => p.toLowerCase().includes(q))
      )
    })
  }, [search, eraFilter, frequencyFilter])

  // "Most Asked Events in Exams" Tab
  const mostAskedEvents = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    const sorted = [...ALL_MODERN_HISTORY_EVENTS].sort((a, b) => b.pyqCount - a.pyqCount)

    return sorted.filter((ev) => {
      if (!q) return true
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.year.toString().includes(q) ||
        ev.viceroyOrGovGen.toLowerCase().includes(q) ||
        ev.summary.toLowerCase().includes(q) ||
        ev.points.some((p) => p.toLowerCase().includes(q)) ||
        ev.keyPersonalities.some((p) => p.toLowerCase().includes(q))
      )
    })
  }, [search])

  // Filtered Governor-Generals Timeline
  const filteredGovGenerals = React.useMemo(() => {
    const q = govSearch.trim().toLowerCase()
    if (!q) return GOVERNOR_GENERALS_TIMELINE
    return GOVERNOR_GENERALS_TIMELINE.filter((gov) => {
      return (
        gov.name.toLowerCase().includes(q) ||
        gov.title.toLowerCase().includes(q) ||
        gov.tenure.toLowerCase().includes(q) ||
        gov.startYear.toString().includes(q) ||
        gov.endYear.toString().includes(q) ||
        gov.keyFacts.some((f) => f.toLowerCase().includes(q))
      )
    })
  }, [govSearch])

  // Legislative Acts subset
  const legislativeActs = React.useMemo(() => {
    return ALL_MODERN_HISTORY_EVENTS.filter((ev) => ev.category === 'Act / Legislation')
  }, [])

  // Pagination for main timeline
  const displayedTimeline = React.useMemo(() => {
    return filteredEvents.slice(0, visibleCount)
  }, [filteredEvents, visibleCount])

  // Pagination for most asked
  const displayedMostAsked = React.useMemo(() => {
    return mostAskedEvents.slice(0, visibleCount)
  }, [mostAskedEvents, visibleCount])

  // Handlers for Era switching
  const handleSelectEra = (eraId: string) => {
    setEraFilter(eraId)
    setVisibleCount(35)
    timelineTopRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Schema.org structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: 'Modern Indian History: Chronological Timeline (1757–1947)',
        description:
          'Comprehensive chronological timeline of Modern Indian History from the Battle of Plassey to Independence. Detailed Spectrum-level points, Governor-Generals timeline, and landmark British Acts.',
        learningResourceType: 'Timeline, study guide, and historical reference',
        educationalLevel: 'Competitive Exams (UPSC CSE, State PSC, SSC CGL)',
        isAccessibleForFree: true,
        inLanguage: 'en-IN',
        provider: {
          '@type': 'Organization',
          name: 'Ministry of Papers',
          url: 'https://ministryofpapers.com',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: HISTORY_TIMELINE_FAQS.map((faq) => ({
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

      {/* Slim, Modern & Black Tab Scroller with Dark Mode support */}
      <style>{`
        .custom-tab-scroller::-webkit-scrollbar {
          height: 4px;
        }
        .custom-tab-scroller::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-tab-scroller::-webkit-scrollbar-thumb {
          background: #0f172a;
          border-radius: 4px;
        }
        .custom-tab-scroller::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
        :root[data-theme='dark'] .custom-tab-scroller::-webkit-scrollbar-thumb,
        .dark .custom-tab-scroller::-webkit-scrollbar-thumb {
          background: #475569;
        }
        :root[data-theme='dark'] .custom-tab-scroller::-webkit-scrollbar-thumb:hover,
        .dark .custom-tab-scroller::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <div className="public-shell" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
        {/* Breadcrumb Navigation */}
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb" style={{ margin: '20px 0 16px', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13.5px', color: 'var(--ink2, #64748b)' }}>
          <Link to="/" style={{ color: 'var(--brand, #0f766e)', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/exams" style={{ color: 'var(--brand, #0f766e)', textDecoration: 'none' }}>Study Tools</Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink, #0f172a)', fontWeight: 600 }}>Modern History Timeline (1757–1947)</span>
        </nav>

        {/* Master Header */}
        <header style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="public-kicker" style={{ margin: 0 }}>Interactive History Study Suite</span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'var(--brand-soft, #ecfdf5)', color: '#047857', border: '1px solid var(--brand-line, #a7f3d0)' }}>
              1757 – 1947 · 5 Eras · Complete Chronological Timeline
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
            Modern Indian History: Chronological Timeline (1757–1947)
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink2, #475569)', maxWidth: '840px', lineHeight: '1.6', margin: 0 }}>
            Master the complete chronological arc of Modern Indian History from the Battle of Plassey (1757) to Independence (1947). Learn line-by-line with concise Magbook-style bullet points, Governor-Generals &amp; Viceroys chronology, and landmark British Acts.
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
              <Calendar size={18} color="var(--brand, #0f766e)" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink, #0f172a)' }}>1757 – 1947</div>
                <div style={{ fontSize: '11px', color: 'var(--ink2, #64748b)', fontWeight: 600 }}>190 Years Covered</div>
              </div>
            </div>

            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line, #e2e8f0)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UserCheck size={18} color="#0f766e" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink, #0f172a)' }}>{GOVERNOR_GENERALS_TIMELINE.length}</div>
                <div style={{ fontSize: '11px', color: 'var(--ink2, #64748b)', fontWeight: 600 }}>Gov-Generals &amp; Viceroys</div>
              </div>
            </div>

            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line, #e2e8f0)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={18} color="#dc2626" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#dc2626' }}>{ALL_MODERN_HISTORY_EVENTS.length}</div>
                <div style={{ fontSize: '11px', color: 'var(--ink2, #64748b)', fontWeight: 600 }}>Total Milestone Events</div>
              </div>
            </div>

            <div style={{ background: 'var(--card-bg, #ffffff)', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--line, #e2e8f0)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} color="#2563eb" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#2563eb' }}>{legislativeActs.length}</div>
                <div style={{ fontSize: '11px', color: 'var(--ink2, #64748b)', fontWeight: 600 }}>Landmark Acts &amp; Reforms</div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Tab Switcher with Slim Modern Black Scroller */}
        <div
          role="tablist"
          className="custom-tab-scroller"
          style={{
            display: 'flex',
            gap: '6px',
            borderBottom: '2px solid var(--line, #e2e8f0)',
            marginBottom: '20px',
            overflowX: 'auto',
            paddingBottom: '6px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#0f172a transparent',
          }}
        >
          <button
            onClick={() => setActiveTab('timeline')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'timeline' ? '3px solid var(--brand, #0f766e)' : '3px solid transparent',
              color: activeTab === 'timeline' ? 'var(--brand, #0f766e)' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
            }}
          >
            Chronological Timeline
          </button>

          <button
            onClick={() => setActiveTab('viceroys')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'viceroys' ? '3px solid var(--brand, #0f766e)' : '3px solid transparent',
              color: activeTab === 'viceroys' ? 'var(--brand, #0f766e)' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <UserCheck size={15} />
            Governor-Generals &amp; Viceroys Timeline ({GOVERNOR_GENERALS_TIMELINE.length})
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
            Most Asked Events in Exams
          </button>

          <button
            onClick={() => setActiveTab('eras')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'eras' ? '3px solid var(--brand, #0f766e)' : '3px solid transparent',
              color: activeTab === 'eras' ? 'var(--brand, #0f766e)' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
            }}
          >
            By Historical Era (5)
          </button>

          <button
            onClick={() => setActiveTab('acts')}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'acts' ? '3px solid var(--brand, #0f766e)' : '3px solid transparent',
              color: activeTab === 'acts' ? 'var(--brand, #0f766e)' : 'var(--ink2, #64748b)',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
            }}
          >
            Landmark British Acts ({legislativeActs.length})
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
            Exam FAQs ({HISTORY_TIMELINE_FAQS.length})
          </button>
        </div>

        {/* Tab 1: CHRONOLOGICAL TIMELINE (SPECTRUM STYLE) */}
        {activeTab === 'timeline' && (
          <div ref={timelineTopRef}>
            {/* Filter Controls Bar */}
            <div
              style={{
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--line, #e2e8f0)',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ flex: '1 1 280px', position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink2, #64748b)' }} />
                  <input
                    type="text"
                    placeholder="Search events, treaties, acts, leaders (e.g., 'Plassey', 'Permanent Settlement', 'Dandi', 'Quit India')..."
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
                  value={eraFilter}
                  onChange={(e) => {
                    setEraFilter(e.target.value)
                    setVisibleCount(35)
                  }}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--line, #cbd5e1)',
                    fontSize: '13.5px',
                    background: 'var(--bg, #f8fafc)',
                    color: 'var(--ink, #0f172a)',
                    outline: 'none',
                    cursor: 'pointer',
                    maxWidth: '280px',
                  }}
                >
                  <option value="all">All 5 Historical Eras (1757–1947)</option>
                  {MODERN_HISTORY_ERAS.map((era) => (
                    <option key={era.era} value={era.era}>
                      {era.years}: {era.name}
                    </option>
                  ))}
                </select>

                <select
                  value={frequencyFilter}
                  onChange={(e) => setFrequencyFilter(e.target.value as any)}
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
                  <option value="all">All Exam Frequencies</option>
                  <option value="Top Tested">🔥 Top Tested (Highest PYQs)</option>
                  <option value="Frequently Tested">⚡ Frequently Tested</option>
                  <option value="Moderately Tested">Foundational Milestones</option>
                </select>
              </div>

              {/* Current Era Callout Card */}
              {currentEraInfo && eraFilter !== 'all' && (
                <div
                  style={{
                    padding: '12px 16px',
                    background: 'var(--bg, #f8fafc)',
                    borderLeft: '4px solid var(--brand, #0f766e)',
                    borderRadius: '0 8px 8px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--ink, #0f172a)', display: 'block' }}>
                      Current Section: {currentEraInfo.years} — {currentEraInfo.name}
                    </strong>
                    <span style={{ fontSize: '12.5px', color: 'var(--ink2, #475569)' }}>
                      {currentEraInfo.description}
                    </span>
                  </div>

                  <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', background: 'var(--brand-soft, #ecfdf5)', color: '#047857' }}>
                    {filteredEvents.length} Milestones
                  </span>
                </div>
              )}
            </div>

            {/* Linewise Vertical Timeline Stream (Simple Magbook/Spectrum Points) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {displayedTimeline.map((ev) => (
                <article
                  key={ev.id}
                  id={ev.id}
                  style={{
                    padding: '18px 20px',
                    background: 'var(--card-bg, #ffffff)',
                    border: '1px solid var(--line, #e2e8f0)',
                    borderRadius: '10px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                  }}
                >
                  {/* Event Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '22px',
                          fontWeight: 800,
                          color: 'var(--brand, #0f766e)',
                          fontFamily: 'var(--font-heading, "Fraunces", serif)',
                          minWidth: '55px',
                        }}
                      >
                        {ev.year}
                      </span>
                      <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink, #0f172a)', margin: 0, lineHeight: '1.3' }}>
                        {ev.title}
                      </h2>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      {ev.dateOrMonth && (
                        <span style={{ fontSize: '11px', color: 'var(--ink2, #64748b)', padding: '2px 8px', borderRadius: '6px', background: 'var(--bg, #f1f5f9)' }}>
                          {ev.dateOrMonth}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: ev.frequency === 'Top Tested' ? '#fffbeb' : '#f8fafc',
                          color: ev.frequency === 'Top Tested' ? '#b45309' : 'var(--ink2, #64748b)',
                          border: `1px solid ${ev.frequency === 'Top Tested' ? '#fde68a' : 'var(--line, #e2e8f0)'}`,
                        }}
                      >
                        {ev.frequency === 'Top Tested' ? '🔥 ' : ''}{ev.frequency} ({ev.pyqCount} PYQs)
                      </span>
                    </div>
                  </div>

                  {/* Viceroy & Category metadata line */}
                  <div style={{ fontSize: '12.5px', color: 'var(--ink2, #64748b)', marginBottom: '10px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <span><strong>Governor / Viceroy:</strong> {ev.viceroyOrGovGen}</span>
                    <span>•</span>
                    <span><strong>Category:</strong> {ev.category}</span>
                  </div>

                  {/* Summary */}
                  <p style={{ fontSize: '14px', color: 'var(--ink, #334155)', lineHeight: '1.55', margin: '0 0 10px' }}>
                    {ev.summary}
                  </p>

                  {/* Concise Magbook Points */}
                  {ev.points && ev.points.length > 0 && (
                    <div style={{ background: 'var(--bg, #f8fafc)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid var(--brand, #0f766e)' }}>
                      <strong style={{ fontSize: '11.5px', textTransform: 'uppercase', color: 'var(--brand, #0f766e)', letterSpacing: '0.4px', display: 'block', marginBottom: '6px' }}>
                        Key Points &amp; Exam Facts:
                      </strong>
                      <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--ink, #334155)', lineHeight: '1.6' }}>
                        {ev.points.map((pt, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Personalities footer */}
                  {ev.keyPersonalities && ev.keyPersonalities.length > 0 && (
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '11.5px' }}>
                      <span style={{ color: 'var(--ink2, #64748b)', fontWeight: 600 }}>Key Figures:</span>
                      {ev.keyPersonalities.map((person) => (
                        <span
                          key={person}
                          style={{
                            padding: '1px 7px',
                            background: 'var(--bg, #f1f5f9)',
                            color: 'var(--ink, #334155)',
                            borderRadius: '4px',
                            border: '1px solid var(--line, #e2e8f0)',
                          }}
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}

              {filteredEvents.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--card-bg, #ffffff)', borderRadius: '12px', border: '1px solid var(--line, #e2e8f0)' }}>
                  <h3 style={{ fontSize: '18px', color: 'var(--ink, #0f172a)', margin: '0 0 6px' }}>No historical events match your search</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink2, #64748b)', margin: 0 }}>
                    Try searching another keyword or switch to "All Eras".
                  </p>
                </div>
              )}
            </div>

            {/* Load Next Era or More Events */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              {displayedTimeline.length < filteredEvents.length && (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 35)}
                  style={{
                    padding: '10px 24px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: '1px solid var(--line, #cbd5e1)',
                    background: 'var(--card-bg, #ffffff)',
                    color: 'var(--brand, #0f766e)',
                    cursor: 'pointer',
                  }}
                >
                  Load More Events in this Era ({filteredEvents.length - displayedTimeline.length} remaining)
                </button>
              )}

              {/* Sequential Era Navigator */}
              {nextEraInfo && eraFilter !== 'all' && (
                <div style={{ width: '100%', marginTop: '16px', padding: '16px 20px', background: 'var(--card-bg, #ffffff)', border: '1px solid var(--line, #e2e8f0)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ink2, #64748b)', fontWeight: 700, letterSpacing: '0.4px', display: 'block' }}>
                      Completed this section?
                    </span>
                    <strong style={{ fontSize: '14.5px', color: 'var(--ink, #0f172a)' }}>
                      Continue Chronology: {nextEraInfo.years} ({nextEraInfo.name})
                    </strong>
                  </div>

                  <button
                    onClick={() => handleSelectEra(nextEraInfo.era)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '9px 18px',
                      background: 'var(--brand, #0f766e)',
                      color: '#ffffff',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Load {nextEraInfo.years}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: GOVERNOR-GENERALS & VICEROYS TIMELINE (SIMPLE, CLEAN, CHRONOLOGICAL) */}
        {activeTab === 'viceroys' && (
          <div>
            <div
              style={{
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--line, #e2e8f0)',
                borderRadius: '12px',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--brand, #0f766e)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <UserCheck size={14} />
                  Chronological Registry (1773 – 1950)
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink, #0f172a)', margin: '4px 0 4px', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                  Governor-Generals and Viceroys of India
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--ink2, #475569)', margin: 0, lineHeight: '1.5', maxWidth: '680px' }}>
                  Complete chronological timeline from Warren Hastings (1773) to C. Rajagopalachari (1948–1950). All key reforms, wars, acts, and commissions during their tenures in concise points.
                </p>
              </div>

              <div style={{ position: 'relative', minWidth: '260px' }}>
                <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink2, #64748b)' }} />
                <input
                  type="text"
                  placeholder="Search Governor-General or policy..."
                  value={govSearch}
                  onChange={(e) => setGovSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 32px',
                    borderRadius: '8px',
                    border: '1px solid var(--line, #cbd5e1)',
                    fontSize: '13px',
                    outline: 'none',
                    background: 'var(--bg, #f8fafc)',
                    color: 'var(--ink, #0f172a)',
                  }}
                />
              </div>
            </div>

            {/* Vertical Chronological Timeline of Governor-Generals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredGovGenerals.map((gov, idx) => (
                <article
                  key={gov.id}
                  style={{
                    padding: '18px 20px',
                    background: 'var(--card-bg, #ffffff)',
                    border: '1px solid var(--line, #e2e8f0)',
                    borderRadius: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: 'var(--brand, #0f766e)',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '12px',
                        }}
                      >
                        #{idx + 1}
                      </span>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink, #0f172a)', margin: 0, fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                        {gov.name}
                      </h3>
                      <span style={{ fontSize: '12px', color: 'var(--ink2, #64748b)' }}>
                        ({gov.title})
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '12px',
                        background: 'var(--bg, #f1f5f9)',
                        color: 'var(--ink, #0f172a)',
                        border: '1px solid var(--line, #e2e8f0)',
                      }}
                    >
                      🗓️ {gov.tenure}
                    </span>
                  </div>

                  {/* Bullet points of facts */}
                  <div style={{ background: 'var(--bg, #f8fafc)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid var(--brand, #0f766e)', marginTop: '8px' }}>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--ink, #334155)', lineHeight: '1.6' }}>
                      {gov.keyFacts.map((fact, fIdx) => (
                        <li key={fIdx} style={{ marginBottom: '4px' }}>{fact}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}

              {filteredGovGenerals.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', background: 'var(--card-bg, #ffffff)', borderRadius: '12px', border: '1px solid var(--line, #e2e8f0)' }}>
                  <p style={{ fontSize: '14px', color: 'var(--ink2, #64748b)', margin: 0 }}>
                    No Governor-General matches "{govSearch}".
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: MOST ASKED EVENTS IN EXAMS */}
        {activeTab === 'most-asked' && (
          <div>
            <div
              style={{
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--line, #e2e8f0)',
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
                  Examination Frequency Ranking
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ink, #0f172a)', margin: '4px 0 6px', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                  Most Asked Modern Indian History Events
                </h2>
                <p style={{ fontSize: '13.5px', color: 'var(--ink2, #475569)', margin: 0, lineHeight: '1.5', maxWidth: '640px' }}>
                  Events ranked in descending order of how frequently they appear in UPSC CSE, State PSCs, and SSC exams.
                </p>
              </div>

              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '8px 16px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#b45309' }}>{mostAskedEvents.length}</div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#92400e' }}>Ranked Events</div>
              </div>
            </div>

            {/* Linewise Vertical List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {displayedMostAsked.map((ev, idx) => {
                const rank = idx + 1
                return (
                  <article
                    key={ev.id}
                    id={ev.id}
                    style={{
                      padding: '18px 20px',
                      background: 'var(--card-bg, #ffffff)',
                      border: '1px solid var(--line, #e2e8f0)',
                      borderRadius: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 800,
                            padding: '2px 7px',
                            borderRadius: '4px',
                            background: rank <= 5 ? '#dc2626' : rank <= 15 ? '#d97706' : 'var(--brand, #0f766e)',
                            color: '#ffffff',
                          }}
                        >
                          #{rank}
                        </span>
                        <span
                          style={{
                            fontSize: '20px',
                            fontWeight: 800,
                            color: 'var(--brand, #0f766e)',
                            fontFamily: 'var(--font-heading, "Fraunces", serif)',
                          }}
                        >
                          {ev.year}
                        </span>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--ink, #0f172a)', margin: 0 }}>
                          {ev.title}
                        </h3>
                      </div>

                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: '#fffbeb',
                          color: '#b45309',
                          border: '1px solid #fde68a',
                        }}
                      >
                        🔥 {ev.pyqCount} Direct PYQs Tested
                      </span>
                    </div>

                    <p style={{ fontSize: '13.5px', color: 'var(--ink, #334155)', lineHeight: '1.55', margin: '0 0 10px' }}>
                      {ev.summary}
                    </p>

                    {/* Points */}
                    {ev.points && ev.points.length > 0 && (
                      <div style={{ background: 'var(--bg, #f8fafc)', padding: '10px 14px', borderRadius: '6px', borderLeft: '3px solid #b45309' }}>
                        <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--ink, #334155)', lineHeight: '1.55' }}>
                          {ev.points.map((pt, pIdx) => (
                            <li key={pIdx} style={{ marginBottom: '3px' }}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        )}

        {/* Tab 4: BY HISTORICAL ERA */}
        {activeTab === 'eras' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {MODERN_HISTORY_ERAS.map((era) => (
              <div
                key={era.era}
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--line, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--brand, #0f766e)', display: 'block', marginBottom: '4px' }}>
                    {era.years}
                  </span>
                  <h3 style={{ fontSize: '17px', margin: '0 0 8px', color: 'var(--ink, #0f172a)', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                    {era.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--ink2, #475569)', lineHeight: '1.6', margin: 0 }}>
                    {era.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('timeline')
                    handleSelectEra(era.era)
                  }}
                  style={{
                    marginTop: '16px',
                    padding: '8px 14px',
                    background: 'var(--bg, #f1f5f9)',
                    border: '1px solid var(--line, #cbd5e1)',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: 'var(--brand, #0f766e)',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  Explore this Era’s Timeline →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: LANDMARK BRITISH ACTS */}
        {activeTab === 'acts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {legislativeActs.map((act) => (
              <article
                key={act.id}
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--line, #e2e8f0)',
                  borderRadius: '10px',
                  padding: '18px 20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--ink, #0f172a)', margin: 0, fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                    {act.title}
                  </h3>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--brand, #0f766e)' }}>
                    {act.year}
                  </span>
                </div>

                <div style={{ fontSize: '12.5px', color: 'var(--ink2, #64748b)', marginBottom: '8px' }}>
                  <strong>Governor-General:</strong> {act.viceroyOrGovGen}
                </div>

                <p style={{ fontSize: '13.5px', color: 'var(--ink, #334155)', lineHeight: '1.55', margin: '0 0 10px' }}>
                  {act.summary}
                </p>

                {act.points && act.points.length > 0 && (
                  <div style={{ background: 'var(--bg, #f8fafc)', padding: '10px 14px', borderRadius: '6px', borderLeft: '3px solid #2563eb' }}>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--ink, #334155)', lineHeight: '1.55' }}>
                      {act.points.map((pt, pIdx) => (
                        <li key={pIdx} style={{ marginBottom: '3px' }}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {/* Tab 6: EXAM FAQS (5) */}
        {activeTab === 'faq' && (
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '24px', margin: '0 0 16px', color: 'var(--ink, #0f172a)' }}>
              Actual UPSC &amp; State PSC Questions on Modern Indian History
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {HISTORY_TIMELINE_FAQS.map((faq, idx) => {
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
                        alignItems: 'flex-start',
                        gap: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--ink, #0f172a)',
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
                            background: '#eff6ff',
                            color: '#1d4ed8',
                            border: '1px solid #bfdbfe',
                            marginBottom: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.4px',
                          }}
                        >
                          {faq.examTag}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <HelpCircle size={17} color="var(--brand, #0f766e)" style={{ flexShrink: 0 }} />
                          <span>{faq.q}</span>
                        </div>
                      </div>
                      <ChevronRight
                        size={18}
                        color="var(--ink2, #64748b)"
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
                          color: 'var(--ink2, #475569)',
                          lineHeight: '1.65',
                          borderTop: '1px solid var(--line, #f1f5f9)',
                          paddingTop: '14px',
                        }}
                      >
                        <p style={{ margin: '0 0 10px' }}>{faq.a}</p>
                        <div style={{ background: 'var(--bg, #f8fafc)', borderLeft: '3px solid var(--brand, #0f766e)', padding: '8px 12px', borderRadius: '0 6px 6px 0', fontSize: '12.5px', color: '#0f766e' }}>
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
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--line, #e2e8f0)',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '22px', margin: '0 0 8px', color: 'var(--ink, #0f172a)' }}>
            Practice Modern Indian History Previous Year Questions
          </h3>
          <p style={{ fontSize: '14.5px', color: 'var(--ink2, #475569)', maxWidth: '620px', margin: '0 auto 18px', lineHeight: '1.5' }}>
            Solve actual UPSC CSE, JKPSC CCE, and State PSC questions on British acts, mass movements, and freedom fighters with verified explanations.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/exam/upsc-cse?tab=subjects&subject=Modern%20Indian%20History"
              style={{
                display: 'inline-block',
                fontWeight: 700,
                fontSize: '14px',
                color: '#ffffff',
                background: 'var(--brand, #0f766e)',
                padding: '10px 22px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Practice Modern History PYQs (Free) →
            </Link>
            <Link
              to="/constitution-of-india"
              style={{
                display: 'inline-block',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--brand, #0f766e)',
                background: 'var(--brand-soft, #f0fdfa)',
                border: '1px solid var(--brand-line, #ccfbf1)',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Constitution of India Explorer 📜
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
