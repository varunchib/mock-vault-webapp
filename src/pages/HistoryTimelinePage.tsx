import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import {
  Search,
  Flame,
  Zap,
  BookOpen,
  Calendar,
  Filter,
  HelpCircle,
  Sparkles,
  ChevronRight,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Award,
  UserCheck,
} from 'lucide-react'
import {
  ALL_MODERN_HISTORY_EVENTS,
  MODERN_HISTORY_ERAS,
  type ModernHistoryEvent,
} from '../data/modernHistoryEvents'

export const HISTORY_TIMELINE_FAQS = [
  {
    q: 'What is the exact chronological timeline of Modern Indian History for competitive exams?',
    a: 'For UPSC, State PSCs, and SSC exams, Modern Indian History spans 1757 to 1947 and is studied across five distinct eras: (1) 1757–1857: British Expansion & Company Rule (Plassey, Buxar, Subsidiary Alliance, Doctrine of Lapse, 1857 Revolt); (2) 1858–1905: Direct Crown Rule & Moderate Phase (GOI Act 1858, Ripon’s Local Self-Government, 1885 INC founding, Drain of Wealth); (3) 1905–1919: Swadeshi Movement, Extremist Phase & Home Rule (1905 Bengal Partition, 1909 Morley-Minto, 1916 Lucknow Pact, 1917 Champaran); (4) 1919–1939: Gandhian Mass Movements (Non-Cooperation 1920, Civil Disobedience 1930, 1935 GOI Act); and (5) 1939–1947: Quit India Movement, Cabinet Mission, Partition & Independence.',
  },
  {
    q: 'Which events of Modern Indian History have the highest PYQ appearance in UPSC and State PSCs?',
    a: 'The highest-yield events tested repeatedly include: Government of India Act 1935 (Provincial Autonomy & Federal Court), Quit India Movement 1942 (Operation Zero Hour & Parallel Governments), Dandi March & Civil Disobedience 1930, Swadeshi Movement & 1905 Bengal Partition, Non-Cooperation Movement 1920, Morley-Minto Reforms 1909 (Separate Electorates), Revolt of 1857, Doctrine of Lapse (Dalhousie’s chronological annexation order), Subsidiary Alliance (Wellesley’s treaties), and the Cabinet Mission Plan 1946.',
  },
  {
    q: 'What is the chronological sequence of states annexed under Dalhousie’s Doctrine of Lapse?',
    a: 'The strict chronological order of states annexed under Lord Dalhousie’s Doctrine of Lapse is: Satara (1848) → Jaitpur and Sambalpur (1849) → Baghat (1850) → Udaipur (1852) → Jhansi (1853) → Nagpur (1854). Note: Awadh was annexed in 1856 on the grounds of "maladministration" (based on the Outram Report), NOT under the Doctrine of Lapse.',
  },
  {
    q: 'What were the key differences between the Moderates and Extremists in the Indian National Congress?',
    a: 'The Moderates (1885–1905), led by Dadabhai Naoroji, Gopal Krishna Gokhale, and Pherozeshah Mehta, believed in constitutional agitation through petitions, prayers, and memorandums (the "3 Ps") within the British framework. The Extremists (1905–1919), led by the Lal-Bal-Pal trio (Lala Lajpat Rai, Bal Gangadhar Tilak, Bipin Chandra Pal) and Aurobindo Ghosh, demanded "Swaraj" as a fundamental right through mass mobilization, passive resistance, boycott of British goods/institutions, and national education.',
  },
  {
    q: 'How did the Government of India Act 1935 shape the modern Constitution of India?',
    a: 'The Government of India Act 1935 provided the structural blueprint for over 250 provisions in the 1950 Indian Constitution. It established Provincial Autonomy (abolishing dyarchy in provinces), divided legislative powers into Three Lists (Federal, Provincial, Concurrent), created the Federal Court of India (forerunner to the Supreme Court), provided for the Reserve Bank of India, and established Public Service Commissions at central and provincial levels.',
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

  usePageMeta({
    title: 'Modern Indian History Interactive Timeline (1757–1947): Events, Acts & PYQ Rankings | Ministry of Papers',
    description: 'Master Modern Indian History (1757–1947) with an interactive UPSC-level timeline. Discover historical significance, exam frequency rankings, Governor-Generals, and landmark British Acts.',
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
  const prevEraInfo = currentEraIndex > 0 ? MODERN_HISTORY_ERAS[currentEraIndex - 1] : null

  // Filtered Events for Timeline Tab
  const filteredEvents = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    return ALL_MODERN_HISTORY_EVENTS.filter((ev) => {
      // Era match (1757-1857 default)
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
        ev.simpleExplanation.toLowerCase().includes(q) ||
        ev.examTakeaway.toLowerCase().includes(q) ||
        ev.category.toLowerCase().includes(q) ||
        ev.keyPersonalities.some((p) => p.toLowerCase().includes(q))
      )
    })
  }, [search, eraFilter, frequencyFilter])

  // "Most Asked Events in Exams" Tab: Sorted strictly descending by pyqCount
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
        ev.simpleExplanation.toLowerCase().includes(q) ||
        ev.examTakeaway.toLowerCase().includes(q) ||
        ev.keyPersonalities.some((p) => p.toLowerCase().includes(q))
      )
    })
  }, [search])

  // Filtered Acts & Legislation
  const legislativeActs = React.useMemo(() => {
    return ALL_MODERN_HISTORY_EVENTS.filter((ev) => ev.category === 'Act / Legislation')
  }, [])

  // Unique Viceroys / Governor-Generals
  const viceroyList = React.useMemo(() => {
    const map = new Map<string, ModernHistoryEvent[]>()
    for (const ev of ALL_MODERN_HISTORY_EVENTS) {
      const v = ev.viceroyOrGovGen
      if (!map.has(v)) {
        map.set(v, [])
      }
      map.get(v)!.push(ev)
    }
    return Array.from(map.entries())
  }, [])

  // Reset pagination on filter change
  React.useEffect(() => {
    setVisibleCount(35)
  }, [search, eraFilter, frequencyFilter, activeTab])

  // Frequency count badges
  const frequencyCounts = React.useMemo(() => {
    let top = 0
    let freq = 0
    let mod = 0
    for (const a of ALL_MODERN_HISTORY_EVENTS) {
      if (a.frequency === 'Top Tested') top++
      else if (a.frequency === 'Frequently Tested') freq++
      else if (a.frequency === 'Moderately Tested') mod++
    }
    return { top, freq, mod, total: ALL_MODERN_HISTORY_EVENTS.length }
  }, [])

  const displayedEvents = React.useMemo(() => {
    return filteredEvents.slice(0, visibleCount)
  }, [filteredEvents, visibleCount])

  const displayedMostAsked = React.useMemo(() => {
    return mostAskedEvents.slice(0, visibleCount)
  }, [mostAskedEvents, visibleCount])

  // Smooth advancement to next era
  const loadNextEra = (nextEra: string) => {
    setEraFilter(nextEra)
    setVisibleCount(35)
    if (timelineTopRef.current) {
      timelineTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: 'Modern Indian History Interactive Timeline (1757–1947)',
        description: 'Chronological timeline of Modern Indian History from the Battle of Plassey to Independence, with exam appearance frequency rankings for UPSC, JKPSC CCE, and State PSCs.',
        url: 'https://ministryofpapers.com/modern-indian-history-timeline',
        educationalLevel: 'Competitive Exams (UPSC, State PSC, SSC)',
        learningResourceType: 'Timeline, study guide, and historical reference',
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
            { '@type': 'ListItem', position: 3, name: 'Modern Indian History Timeline', item: 'https://ministryofpapers.com/modern-indian-history-timeline' },
          ],
        },
      },
      {
        '@type': 'Article',
        headline: 'Modern Indian History Timeline (1757–1947): Comprehensive Events & Exam Rankings',
        description: 'Complete chronological guide to Modern Indian History for UPSC and State PSCs with student teaching breakdowns, Governor-Generals, and exam frequency tags.',
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
        mainEntityOfPage: 'https://ministryofpapers.com/modern-indian-history-timeline',
      },
      {
        '@type': 'FAQPage',
        mainEntity: HISTORY_TIMELINE_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
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
          <Link to="/exams">Study Tools</Link>
          <span aria-hidden="true">›</span>
          <span>Modern Indian History Timeline</span>
        </nav>

        {/* Master Header */}
        <header style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="public-kicker" style={{ margin: 0 }}>Interactive History Study Suite</span>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}>
              1757 – 1947 · 5 Eras · UPSC &amp; PSC PYQ Rankings
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
            Modern Indian History Timeline (1757–1947): Events &amp; PYQ Rankings
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink2, #475569)', maxWidth: '820px', lineHeight: '1.6', margin: 0 }}>
            Master the complete chronological arc of Modern Indian History from the Battle of Plassey (1757) to Independence (1947). Learn line-by-line with verified past examination appearance tags, student-friendly teaching notes, Governor-Generals, and landmark British Acts.
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
                <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--ink, #0f172a)' }}>{frequencyCounts.total}</div>
                <div style={{ fontSize: '11px', color: 'var(--ink2, #64748b)', fontWeight: 600 }}>Milestones (1757–1947)</div>
              </div>
            </div>

            <div style={{ background: '#fef2f2', padding: '12px 14px', borderRadius: '10px', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={18} color="#dc2626" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#991b1b' }}>{frequencyCounts.top}</div>
                <div style={{ fontSize: '11px', color: '#b91c1c', fontWeight: 600 }}>Top Tested (15+ PYQs)</div>
              </div>
            </div>

            <div style={{ background: '#fffbeb', padding: '12px 14px', borderRadius: '10px', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={18} color="#d97706" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#92400e' }}>5</div>
                <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 600 }}>Historical Eras</div>
              </div>
            </div>

            <div style={{ background: '#eff6ff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} color="#2563eb" />
              <div>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#1e40af' }}>{legislativeActs.length}</div>
                <div style={{ fontSize: '11px', color: '#1d4ed8', fontWeight: 600 }}>Landmark Acts &amp; Reforms</div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Tab Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            borderBottom: '2px solid var(--line, #e2e8f0)',
            marginBottom: '20px',
            overflowX: 'auto',
            paddingBottom: '2px',
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
            }}
          >
            Governor-Generals &amp; Viceroys
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
            History FAQs ({HISTORY_TIMELINE_FAQS.length})
          </button>
        </div>

        {/* Anchor for smooth scrolling */}
        <div ref={timelineTopRef} />

        {/* Tab 1: CHRONOLOGICAL TIMELINE (LINEWISE, ERA 1 DEFAULT, LOAD NEXT ERA AT BOTTOM) */}
        {activeTab === 'timeline' && (
          <div>
            {/* Filter Bar with Era Selector & Search */}
            <div
              style={{
                background: 'var(--card-bg, #ffffff)',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid var(--line, #e2e8f0)',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ flex: '1 1 280px', position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink2, #64748b)' }} />
                  <input
                    type="text"
                    placeholder="Search events by year (e.g. 1857, 1942), movement, viceroy, or act..."
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

                {/* Era Switcher Dropdown (Era 1 selected by default) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={15} color="var(--ink2, #64748b)" />
                  <select
                    value={eraFilter}
                    onChange={(e) => setEraFilter(e.target.value)}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--line, #cbd5e1)',
                      fontSize: '13.5px',
                      background: 'var(--bg, #f8fafc)',
                      color: 'var(--ink, #0f172a)',
                      outline: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    <option value="all">All 5 Eras (Show Full 1757–1947 Timeline)</option>
                    {MODERN_HISTORY_ERAS.map((e) => (
                      <option key={e.era} value={e.era}>
                        {e.years}: {e.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Frequency Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink2, #64748b)' }}>
                  Filter by Exam Frequency:
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
                    background: frequencyFilter === 'all' ? 'var(--ink, #0f172a)' : 'transparent',
                    color: frequencyFilter === 'all' ? '#ffffff' : 'var(--ink2, #475569)',
                    borderColor: frequencyFilter === 'all' ? 'var(--ink, #0f172a)' : 'var(--line, #cbd5e1)',
                  }}
                >
                  All ({frequencyCounts.total})
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
                    background: frequencyFilter === 'Top Tested' ? '#dc2626' : '#fef2f2',
                    color: frequencyFilter === 'Top Tested' ? '#ffffff' : '#991b1b',
                    borderColor: frequencyFilter === 'Top Tested' ? '#dc2626' : '#fecaca',
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
                    background: frequencyFilter === 'Frequently Tested' ? '#d97706' : '#fffbeb',
                    color: frequencyFilter === 'Frequently Tested' ? '#ffffff' : '#92400e',
                    borderColor: frequencyFilter === 'Frequently Tested' ? '#d97706' : '#fde68a',
                  }}
                >
                  <Zap size={12} />
                  Frequently Tested ({frequencyCounts.freq})
                </button>

                {(search || eraFilter !== '1757-1857' || frequencyFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setSearch('')
                      setEraFilter('1757-1857')
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
                      color: 'var(--brand, #0f766e)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginLeft: 'auto',
                    }}
                  >
                    <RotateCcw size={11} />
                    Reset to Era 1 (1757–1857)
                  </button>
                )}
              </div>
            </div>

            {/* Current Era Banner */}
            {currentEraInfo && eraFilter !== 'all' && (
              <div
                style={{
                  background: 'linear-gradient(to right, #f0fdf4, #f8fafc)',
                  border: '1px solid #bbf7d0',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  marginBottom: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div>
                  <span style={{ fontSize: '11.5px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#15803d' }}>
                    Currently Reading: {currentEraInfo.years}
                  </span>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink, #0f172a)', margin: '2px 0 4px', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                    {currentEraInfo.name}
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--ink2, #475569)', margin: 0, lineHeight: '1.5' }}>
                    {currentEraInfo.description}
                  </p>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#ffffff', padding: '6px 12px', borderRadius: '8px', border: '1px solid #86efac' }}>
                  {filteredEvents.length} Key Milestones in this Era
                </div>
              </div>
            )}

            {/* LINEWISE VERTICAL LIST OF EVENTS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {displayedEvents.map((ev: ModernHistoryEvent) => {
                const isTopTested = ev.frequency === 'Top Tested'
                const isFreqTested = ev.frequency === 'Frequently Tested'

                const badgeBg = isTopTested ? '#fef2f2' : isFreqTested ? '#fffbeb' : '#eff6ff'
                const badgeColor = isTopTested ? '#991b1b' : isFreqTested ? '#92400e' : '#1e40af'
                const badgeBorder = isTopTested ? '#fecaca' : isFreqTested ? '#fde68a' : '#bfdbfe'

                return (
                  <article
                    key={ev.id}
                    id={ev.id}
                    style={{
                      padding: '20px 24px',
                      background: 'var(--card-bg, #ffffff)',
                      border: '1px solid var(--line, #e2e8f0)',
                      borderRadius: '12px',
                      boxShadow: isTopTested ? '0 1px 4px rgba(220, 38, 38, 0.05)' : '0 1px 2px rgba(0,0,0,0.02)',
                    }}
                  >
                    {/* Linewise Top Header: Year, Title, and Frequency Tag */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '22px',
                            fontWeight: 800,
                            color: 'var(--brand, #0f766e)',
                            fontFamily: 'var(--font-heading, "Fraunces", serif)',
                          }}
                        >
                          {ev.year}
                        </span>
                        {ev.dateOrMonth && (
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink2, #64748b)', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                            {ev.dateOrMonth}
                          </span>
                        )}
                        <h2
                          style={{
                            fontSize: '17px',
                            fontWeight: 700,
                            color: 'var(--ink, #0f172a)',
                            margin: 0,
                            lineHeight: '1.3',
                          }}
                        >
                          {ev.title}
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
                        {ev.frequency} ({ev.pyqCount} PYQs)
                      </span>
                    </div>

                    {/* Meta Sub-row: Viceroy & Category */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px', fontSize: '12.5px', color: 'var(--ink2, #64748b)' }}>
                      <span>
                        <strong style={{ color: 'var(--ink, #1e293b)' }}>Viceroy / Governor-General:</strong> {ev.viceroyOrGovGen}
                      </span>
                      <span>·</span>
                      <span style={{ fontWeight: 600, color: 'var(--brand, #0f766e)' }}>{ev.category}</span>
                      {ev.keyPersonalities && ev.keyPersonalities.length > 0 && (
                        <>
                          <span>·</span>
                          <span>
                            <strong style={{ color: 'var(--ink, #1e293b)' }}>Key Figures:</strong> {ev.keyPersonalities.slice(0, 3).join(', ')}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Historical Summary */}
                    <p style={{ fontSize: '14px', color: 'var(--ink, #334155)', lineHeight: '1.6', margin: '0 0 12px' }}>
                      {ev.summary}
                    </p>

                    {/* Student Teaching Note: In Simple Words */}
                    <div
                      style={{
                        background: 'var(--bg, #f8fafc)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        borderLeft: '3px solid var(--brand, #0f766e)',
                        marginBottom: '10px',
                      }}
                    >
                      <strong
                        style={{
                          fontSize: '11.5px',
                          textTransform: 'uppercase',
                          color: 'var(--brand, #0f766e)',
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
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2, #334155)', lineHeight: '1.55', margin: 0 }}>
                        {ev.simpleExplanation}
                      </p>
                    </div>

                    {/* High-Yield Exam Takeaway */}
                    <div
                      style={{
                        background: '#fefce8',
                        border: '1px solid #fef08a',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#854d0e',
                        marginBottom: '12px',
                        lineHeight: '1.5',
                      }}
                    >
                      <strong>💡 High-Yield Exam Takeaway:</strong> {ev.examTakeaway}
                    </div>

                    {/* Linewise Bottom Navigation & Practice Link */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '10px',
                        borderTop: '1px solid var(--line, #f1f5f9)',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <Link
                        to="/exam/upsc-cse?tab=subjects&subject=History"
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: 'var(--brand, #0f766e)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Practice Modern History PYQs on this Milestone
                        <ChevronRight size={13} />
                      </Link>

                      <span style={{ fontSize: '12px', color: 'var(--ink2, #94a3b8)', fontWeight: 600 }}>
                        {ev.eraLabel}
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Pagination Controls */}
            {displayedEvents.length < filteredEvents.length && (
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + 35)}
                  style={{
                    padding: '10px 24px',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    background: '#f1f5f9',
                    color: 'var(--ink, #0f172a)',
                    border: '1px solid var(--line, #cbd5e1)',
                    cursor: 'pointer',
                  }}
                >
                  Load More Events in this Era ({filteredEvents.length - displayedEvents.length} remaining)
                </button>
              </div>
            )}

            {/* "LOAD NEXT ERA" BUTTON AT THE BOTTOM OF THE CURRENT ERA */}
            {eraFilter !== 'all' && nextEraInfo && displayedEvents.length >= filteredEvents.length && (
              <div
                style={{
                  marginTop: '36px',
                  padding: '24px 20px',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1.5px dashed var(--brand, #0f766e)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink2, #64748b)', textTransform: 'uppercase', letterSpacing: '0.4px', display: 'block', marginBottom: '6px' }}>
                  Finished reading {currentEraInfo?.years} ({currentEraInfo?.name})
                </span>
                <h3 style={{ fontSize: '19px', fontFamily: 'var(--font-heading, "Fraunces", serif)', margin: '0 0 12px', color: 'var(--ink, #0f172a)' }}>
                  Continue to Next Era: {nextEraInfo.years} ({nextEraInfo.name})
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--ink2, #475569)', maxWidth: '560px', margin: '0 auto 16px', lineHeight: '1.5' }}>
                  {nextEraInfo.description}
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {prevEraInfo && (
                    <button
                      onClick={() => loadNextEra(prevEraInfo.era)}
                      style={{
                        padding: '10px 18px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        borderRadius: '8px',
                        background: '#f8fafc',
                        color: 'var(--ink, #0f172a)',
                        border: '1px solid var(--line, #cbd5e1)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <ArrowLeft size={15} />
                      Previous: {prevEraInfo.years}
                    </button>
                  )}
                  <button
                    onClick={() => loadNextEra(nextEraInfo.era)}
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
                    Load Era: {nextEraInfo.years}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 🔥 MOST ASKED EVENTS IN EXAMS (ORDERED BY MOST ASKED ON TOP) */}
        {activeTab === 'most-asked' && (
          <div>
            {/* Banner */}
            <div
              style={{
                background: 'linear-gradient(to right, #fef2f2, #fffbeb)',
                border: '1px solid #fecaca',
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
                  Historical Examination PYQ Ranking
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#991b1b', margin: '4px 0 6px', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                  Most Asked Modern Indian History Events in Competitive Exams
                </h2>
                <p style={{ fontSize: '13.5px', color: '#7f1d1d', margin: 0, lineHeight: '1.5', maxWidth: '640px' }}>
                  Events ranked in strict descending order of how frequently they appear in UPSC CSE Prelims, JKPSC CCE, SSC CGL, and State PSCs.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #fca5a5', padding: '8px 16px', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#dc2626' }}>{mostAskedEvents.length}</div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#991b1b' }}>Ranked Events</div>
              </div>
            </div>

            {/* Search Box in Most Asked */}
            <div style={{ position: 'relative', marginBottom: '18px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink2, #64748b)' }} />
              <input
                type="text"
                placeholder="Search ranked events by title, year, or personality..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '8px',
                  border: '1px solid var(--line, #cbd5e1)',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'var(--card-bg, #ffffff)',
                  color: 'var(--ink, #0f172a)',
                }}
              />
            </div>

            {/* Linewise Vertical List Ranked by Frequency */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {displayedMostAsked.map((ev: ModernHistoryEvent, idx: number) => {
                const rank = idx + 1
                const isTop5 = rank <= 5
                const isTop15 = rank <= 15

                return (
                  <article
                    key={ev.id}
                    id={ev.id}
                    style={{
                      padding: '20px 24px',
                      background: 'var(--card-bg, #ffffff)',
                      border: isTop5 ? '1.5px solid #f87171' : '1px solid var(--line, #e2e8f0)',
                      borderRadius: '12px',
                      boxShadow: isTop5 ? '0 2px 8px rgba(220, 38, 38, 0.08)' : '0 1px 2px rgba(0,0,0,0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: isTop5 ? '#dc2626' : isTop15 ? '#d97706' : '#2563eb',
                            color: '#ffffff',
                          }}
                        >
                          #{rank} Most Asked
                        </span>

                        <span
                          style={{
                            fontSize: '22px',
                            fontWeight: 800,
                            color: 'var(--brand, #0f766e)',
                            fontFamily: 'var(--font-heading, "Fraunces", serif)',
                          }}
                        >
                          {ev.year}
                        </span>

                        <h2
                          style={{
                            fontSize: '17px',
                            fontWeight: 700,
                            color: 'var(--ink, #0f172a)',
                            margin: 0,
                            lineHeight: '1.3',
                          }}
                        >
                          {ev.title}
                        </h2>
                      </div>

                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          background: '#fef2f2',
                          color: '#991b1b',
                          border: '1px solid #fecaca',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Flame size={13} color="#dc2626" />
                        {ev.pyqCount} Historical PYQs
                      </span>
                    </div>

                    <p style={{ fontSize: '14px', color: 'var(--ink, #334155)', lineHeight: '1.6', margin: '0 0 10px' }}>
                      {ev.summary}
                    </p>

                    <div
                      style={{
                        background: 'var(--bg, #f8fafc)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        borderLeft: '3px solid var(--brand, #0f766e)',
                        marginBottom: '10px',
                      }}
                    >
                      <strong
                        style={{
                          fontSize: '11.5px',
                          textTransform: 'uppercase',
                          color: 'var(--brand, #0f766e)',
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
                      <p style={{ fontSize: '13.5px', color: 'var(--ink2, #334155)', lineHeight: '1.55', margin: 0 }}>
                        {ev.simpleExplanation}
                      </p>
                    </div>

                    <div
                      style={{
                        background: '#fefce8',
                        border: '1px solid #fef08a',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#854d0e',
                        marginBottom: '12px',
                      }}
                    >
                      <strong>💡 Exam Takeaway:</strong> {ev.examTakeaway}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '10px',
                        borderTop: '1px solid var(--line, #f1f5f9)',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <Link
                        to="/exam/upsc-cse?tab=subjects&subject=History"
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 700,
                          color: 'var(--brand, #0f766e)',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        Practice Solved PYQs on {ev.year}: {ev.title}
                        <ChevronRight size={13} />
                      </Link>

                      <span style={{ fontSize: '12px', color: 'var(--ink2, #94a3b8)', fontWeight: 600 }}>
                        {ev.viceroyOrGovGen}
                      </span>
                    </div>
                  </article>
                )
              })}
            </div>

            {displayedMostAsked.length < mostAskedEvents.length && (
              <div style={{ textAlign: 'center', marginTop: '28px' }}>
                <button
                  onClick={() => setVisibleCount((prev) => prev + 35)}
                  style={{
                    padding: '11px 26px',
                    fontSize: '14px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    background: 'var(--brand, #0f766e)',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Load Next Ranked Events ({mostAskedEvents.length - displayedMostAsked.length} remaining)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: HISTORICAL ERAS (5) */}
        {activeTab === 'eras' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {MODERN_HISTORY_ERAS.map((e) => (
              <div
                key={e.era}
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid var(--line, #e2e8f0)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--brand, #0f766e)' }}>{e.years}</span>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', background: 'var(--bg, #f1f5f9)', color: 'var(--ink2, #475569)' }}>
                      Era {e.era}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '17px', margin: '0 0 8px', color: 'var(--ink, #0f172a)' }}>
                    {e.name}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: 'var(--ink2, #475569)', lineHeight: '1.6', margin: 0 }}>
                    {e.description}
                  </p>
                </div>
                <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--line, #e2e8f0)' }}>
                  <button
                    onClick={() => {
                      setEraFilter(e.era)
                      setActiveTab('timeline')
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--brand, #0f766e)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    Read All Events in this Era ({e.years}) →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: LANDMARK BRITISH ACTS & LEGISLATION */}
        {activeTab === 'acts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {legislativeActs.map((act) => (
              <article
                key={act.id}
                style={{
                  padding: '20px 24px',
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--line, #e2e8f0)',
                  borderRadius: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--brand, #0f766e)', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                      {act.year}
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink, #0f172a)' }}>
                      {act.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '10px', background: '#eff6ff', color: '#1d4ed8' }}>
                    Act / Legislation
                  </span>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--ink2, #64748b)', marginBottom: '8px' }}>
                  <strong>Viceroy / Governor-General:</strong> {act.viceroyOrGovGen}
                </div>
                <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: 'var(--ink, #334155)', margin: '0 0 10px' }}>
                  {act.summary}
                </p>
                <div style={{ background: '#fefce8', border: '1px solid #fef08a', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#854d0e' }}>
                  <strong>💡 Constitutional Exam Takeaway:</strong> {act.examTakeaway}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Tab 5: GOVERNOR-GENERALS & VICEROYS */}
        {activeTab === 'viceroys' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {viceroyList.map(([name, events]) => (
              <div
                key={name}
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid var(--line, #e2e8f0)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <UserCheck size={18} color="var(--brand, #0f766e)" />
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink, #0f172a)', margin: 0 }}>
                    {name}
                  </h3>
                </div>
                <strong style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--ink2, #64748b)', display: 'block', marginBottom: '8px' }}>
                  Key Events &amp; Reforms During Tenure:
                </strong>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--ink2, #475569)', lineHeight: '1.6' }}>
                  {events.map((ev) => (
                    <li key={ev.id}>
                      <strong>{ev.year}:</strong> {ev.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: EXAM FAQS (5) */}
        {activeTab === 'faq' && (
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '24px', margin: '0 0 16px', color: 'var(--ink, #0f172a)' }}>
              Frequently Asked Questions on Modern Indian History
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
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: 'var(--ink, #0f172a)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HelpCircle size={17} color="var(--brand, #0f766e)" />
                        {faq.q}
                      </span>
                      <ChevronRight
                        size={18}
                        color="var(--ink2, #64748b)"
                        style={{
                          transform: isOpen ? 'rotate(90deg)' : 'none',
                          transition: 'transform 0.2s',
                          flexShrink: 0,
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
                        {faq.a}
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
            borderRadius: '14px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--brand, #0f766e)', display: 'block', marginBottom: '6px' }}>
            Zero Paywall Question Bank
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '22px', margin: '0 0 8px', color: 'var(--ink, #0f172a)' }}>
            Practice Solved Modern Indian History Previous Year Questions
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--ink2, #475569)', maxWidth: '640px', margin: '0 auto 18px', lineHeight: '1.6' }}>
            Solve hundreds of authentic questions on British Land Revenue Systems, Governor-Generals, 1857 Revolt, Gandhian Movements, and Constitutional Acts from UPSC Prelims, JKPSC CCE, SSC CGL, and CDS.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/exam/upsc-cse?tab=subjects&subject=History"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '13.5px',
                color: '#ffffff',
                background: 'var(--brand, #0f766e)',
                padding: '10px 22px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Solve UPSC Modern History PYQs Free →
            </Link>
            <Link
              to="/exam/jkpsc-cce?tab=subjects&subject=History"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 700,
                fontSize: '13.5px',
                color: 'var(--ink, #0f172a)',
                background: 'var(--bg, #f1f5f9)',
                border: '1px solid var(--line, #cbd5e1)',
                padding: '10px 22px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              JKPSC CCE History PYQs →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
