import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { Search, MapPin, Calendar, Compass, ShieldAlert, Award, BookOpen, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import {
  RAMSAR_SITES_CHRONOLOGICAL,
  RAMSAR_TENTATIVE_CANDIDATES,
  RAMSAR_FAQS,
  type RamsarSite,
} from '../data/ramsarSitesIndia'

type RamsarTab = 'timeline' | 'most-asked' | 'tentative' | 'montreux' | 'by-state' | 'faqs'

export function RamsarWetlandsPage() {
  const [activeTab, setActiveTab] = React.useState<RamsarTab>('timeline')
  const [search, setSearch] = React.useState('')
  const [stateFilter, setStateFilter] = React.useState('all')
  const [eraFilter, setEraFilter] = React.useState<string>('all')
  const [onlyMontreux, setOnlyMontreux] = React.useState(false)

  // Candidate tab filters
  const [candidateYearFilter, setCandidateYearFilter] = React.useState<string>('all')
  const [candidateStatusFilter, setCandidateStatusFilter] = React.useState<string>('all')

  usePageMeta({
    title: 'Ramsar Wetlands of India (103 Sites): Complete Chronological Timeline (1981–2026) | Ministry of Papers',
    description: 'Complete vertical linewise explorer of all 103 Ramsar sites of India in strict chronological sequence (1981–2026). River basins, endemic fauna, Montreux Record status, tentative candidates, and real UPSC/PSC exam questions.',
    canonicalPath: '/ramsar-wetlands-and-national-parks',
  })

  // Extract unique states sorted
  const uniqueStates = React.useMemo(() => {
    return Array.from(new Set(RAMSAR_SITES_CHRONOLOGICAL.map((s) => s.state))).sort()
  }, [])

  // Filtered timeline sites
  const filteredSites = React.useMemo(() => {
    return RAMSAR_SITES_CHRONOLOGICAL.filter((site) => {
      const q = search.toLowerCase()
      const matchSearch =
        q === '' ||
        site.name.toLowerCase().includes(q) ||
        site.state.toLowerCase().includes(q) ||
        site.riverOrBasin.toLowerCase().includes(q) ||
        site.flagshipFauna.toLowerCase().includes(q) ||
        site.examFact.toLowerCase().includes(q) ||
        site.yearDeclared.toString().includes(q)

      const matchState = stateFilter === 'all' || site.state === stateFilter

      let matchEra = true
      if (eraFilter === '1981-1990') {
        matchEra = site.yearDeclared >= 1981 && site.yearDeclared <= 1990
      } else if (eraFilter === '2002-2005') {
        matchEra = site.yearDeclared >= 2002 && site.yearDeclared <= 2005
      } else if (eraFilter === '2012-2020') {
        matchEra = site.yearDeclared >= 2012 && site.yearDeclared <= 2020
      } else if (eraFilter === '2021-2022') {
        matchEra = site.yearDeclared >= 2021 && site.yearDeclared <= 2022
      } else if (eraFilter === '2024-2025') {
        matchEra = site.yearDeclared >= 2024 && site.yearDeclared <= 2025
      } else if (eraFilter === '2026') {
        matchEra = site.yearDeclared === 2026
      }

      const matchMontreux = !onlyMontreux || site.montreuxRecord || !!site.montreuxNote

      return matchSearch && matchState && matchEra && matchMontreux
    })
  }, [search, stateFilter, eraFilter, onlyMontreux])

  // Filtered tentative candidate sites
  const filteredCandidates = React.useMemo(() => {
    return RAMSAR_TENTATIVE_CANDIDATES.filter((candidate) => {
      const matchYear = candidateYearFilter === 'all' || candidate.yearProposed.toString() === candidateYearFilter
      const matchStatus = candidateStatusFilter === 'all' || candidate.currentStatus === candidateStatusFilter
      return matchYear && matchStatus
    })
  }, [candidateYearFilter, candidateStatusFilter])

  // Most asked sites sorted by pyqCount descending
  const mostAskedSites = React.useMemo(() => {
    return [...RAMSAR_SITES_CHRONOLOGICAL].sort((a, b) => b.pyqCount - a.pyqCount)
  }, [])

  // Group sites by state
  const stateGroupings = React.useMemo(() => {
    const map = new Map<string, RamsarSite[]>()
    RAMSAR_SITES_CHRONOLOGICAL.forEach((site) => {
      const arr = map.get(site.state) || []
      arr.push(site)
      map.set(site.state, arr)
    })
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length)
  }, [])

  // JSON-LD structured data
  const jsonLdData = React.useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LearningResource',
          name: 'Ramsar Wetlands of India Complete Chronological Timeline (1981–2026)',
          description:
            'Chronological timeline and exam encyclopedia of all 103 Ramsar sites of India designated between 1981 and 2026 under the Ramsar Convention on Wetlands.',
          learningResourceType: 'Timeline & Reference Guide',
          educationalLevel: 'Competitive Exam Aspirant (UPSC CSE, State PSC, JKSSB, SSC CGL)',
          inLanguage: 'en',
          provider: {
            '@type': 'Organization',
            name: 'Ministry of Papers',
            url: 'https://ministryofpapers.com',
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: RAMSAR_FAQS.map((faq) => ({
            '@type': 'Question',
            name: `[${faq.examTag}] ${faq.question}`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    }
  }, [])

  return (
    <section className="public-page" style={{ paddingBottom: '60px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Sleek Scroller & Custom Tab Scrollbar Styles */}
      <style>{`
        .custom-tab-scroller::-webkit-scrollbar {
          height: 6px;
        }
        .custom-tab-scroller::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 6px;
        }
        .custom-tab-scroller::-webkit-scrollbar-thumb {
          background: #99f6e4;
          border-radius: 6px;
        }
        .custom-tab-scroller::-webkit-scrollbar-thumb:hover {
          background: #0f766e;
        }
      `}</style>

      <div className="public-shell" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>
        {/* Breadcrumb Navigation */}
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb" style={{ margin: '20px 0 16px', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13.5px', color: '#64748b' }}>
          <Link to="/" style={{ color: '#0f766e', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/india-physical-geography-map" style={{ color: '#0f766e', textDecoration: 'none' }}>Physical Geography</Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: '#0f172a', fontWeight: 600 }}>Ramsar Wetlands (103 Sites)</span>
        </nav>

        {/* Hero Section */}
        <header style={{ marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '16px', fontSize: '12px', fontWeight: 700, color: '#047857', letterSpacing: '0.4px', textTransform: 'uppercase', marginBottom: '12px' }}>
            <span>🌿</span>
            <span>UPSC &amp; State PSC Environment Masterclass • 103 Designated Sites (1981–2026)</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: '1.2', margin: '0 0 14px', color: 'var(--ink, #0f172a)', letterSpacing: '-0.02em' }}>
            Ramsar Wetlands of India: Complete Chronological Timeline (1981–2026)
          </h1>
          <p style={{ fontSize: '15.5px', color: 'var(--ink2, #475569)', maxWidth: '880px', lineHeight: '1.65', margin: 0 }}>
            Master all <strong>103 Ramsar Sites of India</strong> in strict chronological sequence from their inaugural designation in 1981 through the milestone 2026 additions. Explore river basin linkages, flagship endemic fauna, Montreux Record classifications, historical tentative candidates, and verified previous year exam questions.
          </p>
        </header>

        {/* High-Yield Metrics Ribbon */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--line, #e2e8f0)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '28px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '12px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px', display: 'block' }}>
              Total Ramsar Sites
            </span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#047857', marginTop: '2px' }}>103 Sites</div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>1st in Asia • 3rd Globally</span>
          </div>

          <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '12px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px', display: 'block' }}>
              Leading States
            </span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f766e', marginTop: '2px' }}>Tamil Nadu (20)</div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>2nd: Uttar Pradesh (14)</span>
          </div>

          <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '12px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px', display: 'block' }}>
              Largest &amp; Smallest
            </span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginTop: '4px' }}>Sundarban / Renuka</div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>4,230 km² vs 0.2 km² (20 ha)</span>
          </div>

          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#b91c1c', fontWeight: 700, letterSpacing: '0.5px', display: 'block' }}>
              Montreux Record
            </span>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#b91c1c', marginTop: '2px' }}>2 Active Sites</div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Keoladeo &amp; Loktak (Chilika removed)</span>
          </div>
        </div>

        {/* Tab Switcher with Beautiful Custom Scroller */}
        <div
          role="tablist"
          className="custom-tab-scroller"
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '2px solid var(--line, #e2e8f0)',
            marginBottom: '24px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'thin',
            scrollbarColor: '#99f6e4 #f1f5f9',
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'timeline'}
            onClick={() => setActiveTab('timeline')}
            style={{
              padding: '10px 18px',
              fontSize: '14.5px',
              fontWeight: activeTab === 'timeline' ? 700 : 500,
              color: activeTab === 'timeline' ? '#047857' : '#64748b',
              background: activeTab === 'timeline' ? '#ecfdf5' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'timeline' ? '3px solid #047857' : '3px solid transparent',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Calendar size={16} />
            <span>Chronological Timeline (1981–2026) [103]</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'tentative'}
            onClick={() => setActiveTab('tentative')}
            style={{
              padding: '10px 18px',
              fontSize: '14.5px',
              fontWeight: activeTab === 'tentative' ? 700 : 500,
              color: activeTab === 'tentative' ? '#0f766e' : '#64748b',
              background: activeTab === 'tentative' ? '#f0fdfa' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'tentative' ? '3px solid #0f766e' : '3px solid transparent',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Clock size={16} />
            <span>Tentative &amp; Candidate Pipeline (By Year)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'most-asked'}
            onClick={() => setActiveTab('most-asked')}
            style={{
              padding: '10px 18px',
              fontSize: '14.5px',
              fontWeight: activeTab === 'most-asked' ? 700 : 500,
              color: activeTab === 'most-asked' ? '#b45309' : '#64748b',
              background: activeTab === 'most-asked' ? '#fffbeb' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'most-asked' ? '3px solid #b45309' : '3px solid transparent',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>🔥</span>
            <span>Most Asked in Exams ({RAMSAR_SITES_CHRONOLOGICAL.filter((s) => s.pyqFrequency === 'Top Tested').length})</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'montreux'}
            onClick={() => setActiveTab('montreux')}
            style={{
              padding: '10px 18px',
              fontSize: '14.5px',
              fontWeight: activeTab === 'montreux' ? 700 : 500,
              color: activeTab === 'montreux' ? '#b91c1c' : '#64748b',
              background: activeTab === 'montreux' ? '#fef2f2' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'montreux' ? '3px solid #b91c1c' : '3px solid transparent',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ShieldAlert size={16} />
            <span>Montreux Record Explained</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'by-state'}
            onClick={() => setActiveTab('by-state')}
            style={{
              padding: '10px 18px',
              fontSize: '14.5px',
              fontWeight: activeTab === 'by-state' ? 700 : 500,
              color: activeTab === 'by-state' ? '#0f766e' : '#64748b',
              background: activeTab === 'by-state' ? '#f0fdfa' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'by-state' ? '3px solid #0f766e' : '3px solid transparent',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <MapPin size={16} />
            <span>State Directory ({uniqueStates.length} States/UTs)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'faqs'}
            onClick={() => setActiveTab('faqs')}
            style={{
              padding: '10px 18px',
              fontSize: '14.5px',
              fontWeight: activeTab === 'faqs' ? 700 : 500,
              color: activeTab === 'faqs' ? '#4338ca' : '#64748b',
              background: activeTab === 'faqs' ? '#eef2ff' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'faqs' ? '3px solid #4338ca' : '3px solid transparent',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <BookOpen size={16} />
            <span>UPSC &amp; Exam Questions (5)</span>
          </button>
        </div>

        {/* Tab 1: Chronological Timeline */}
        {activeTab === 'timeline' && (
          <div>
            {/* Filter Bar */}
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
                  <Search
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}
                  />
                  <input
                    type="text"
                    placeholder="Search by wetland name, state, river, fauna, or year (e.g. 'Glaw Lake', 'Surha Tal', 'Chhari-Dhand', 'Sukhna')..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px 9px 36px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '14px',
                      background: 'var(--bg, #f8fafc)',
                      color: 'var(--ink, #0f172a)',
                      outline: 'none',
                    }}
                  />
                </div>

                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13.5px',
                    background: 'var(--bg, #f8fafc)',
                    color: 'var(--ink, #0f172a)',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="all">All States &amp; UTs ({uniqueStates.length})</option>
                  {uniqueStates.map((st) => (
                    <option key={st} value={st}>
                      {st} ({RAMSAR_SITES_CHRONOLOGICAL.filter((s) => s.state === st).length})
                    </option>
                  ))}
                </select>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: onlyMontreux ? '#b91c1c' : '#475569',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={onlyMontreux}
                    onChange={(e) => setOnlyMontreux(e.target.checked)}
                    style={{ accentColor: '#b91c1c', cursor: 'pointer' }}
                  />
                  <span>Montreux Record Only</span>
                </label>
              </div>

              {/* Era/Decade Quick Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px', marginRight: '4px' }}>
                  Designation Wave:
                </span>
                {[
                  { id: 'all', label: `All 103 Sites (1981–2026)` },
                  { id: '1981-1990', label: '1981–1990 (First 6)' },
                  { id: '2002-2005', label: '2002–2005 (19 Sites)' },
                  { id: '2012-2020', label: '2012–2020 (17 Sites)' },
                  { id: '2021-2022', label: '2021–2022 (24 Sites)' },
                  { id: '2024-2025', label: '2024–2025 (20 Sites)' },
                  { id: '2026', label: '2026 Milestone (7 Sites)' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setEraFilter(pill.id)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '12.5px',
                      fontWeight: eraFilter === pill.id ? 700 : 500,
                      background: eraFilter === pill.id ? '#047857' : '#f1f5f9',
                      color: eraFilter === pill.id ? '#ffffff' : '#475569',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', fontSize: '13.5px', color: '#64748b' }}>
              <span>
                Showing <strong>{filteredSites.length}</strong> of <strong>103</strong> Ramsar Sites in strict chronological sequence:
              </span>
              {(search || stateFilter !== 'all' || eraFilter !== 'all' || onlyMontreux) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('')
                    setStateFilter('all')
                    setEraFilter('all')
                    setOnlyMontreux(false)
                  }}
                  style={{ background: 'none', border: 'none', color: '#0f766e', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Linewise Vertical Timeline Feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredSites.map((site) => {
                const globalIndex = RAMSAR_SITES_CHRONOLOGICAL.findIndex((s) => s.id === site.id) + 1

                return (
                  <article
                    key={site.id}
                    id={site.id}
                    style={{
                      background: 'var(--card-bg, #ffffff)',
                      border: site.montreuxRecord
                        ? '1.5px solid #fca5a5'
                        : '1px solid var(--line, #e2e8f0)',
                      borderRadius: '12px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    }}
                  >
                    {/* Header line */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: globalIndex >= 100 ? '#b45309' : '#047857',
                            color: '#ffffff',
                            fontWeight: 800,
                            fontSize: '13px',
                          }}
                          title={`Designated Site #${globalIndex} in India`}
                        >
                          #{globalIndex}
                        </span>

                        <h2
                          style={{
                            fontFamily: 'var(--font-heading, "Fraunces", serif)',
                            fontSize: 'clamp(18px, 2.5vw, 22px)',
                            color: 'var(--ink, #0f172a)',
                            margin: 0,
                            lineHeight: '1.25',
                          }}
                        >
                          {site.name}
                        </h2>

                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '12px',
                            background: '#f1f5f9',
                            color: '#0f172a',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          📍 {site.state}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '12px',
                            background: '#ecfdf5',
                            color: '#047857',
                            border: '1px solid #a7f3d0',
                          }}
                        >
                          🗓️ Added {site.yearDeclared}
                        </span>

                        {site.montreuxRecord && (
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 9px',
                              borderRadius: '12px',
                              background: '#fef2f2',
                              color: '#b91c1c',
                              border: '1px solid #fecaca',
                            }}
                          >
                            ⚠️ Montreux Record
                          </span>
                        )}

                        {site.id === 'ramsar-chilika' && (
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '3px 9px',
                              borderRadius: '12px',
                              background: '#f0fdf4',
                              color: '#15803d',
                              border: '1px solid #bbf7d0',
                            }}
                          >
                            ✅ Restored &amp; Removed from Montreux (2002)
                          </span>
                        )}

                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 700,
                            padding: '3px 9px',
                            borderRadius: '12px',
                            background:
                              site.pyqFrequency === 'Top Tested'
                                ? '#fffbeb'
                                : site.pyqFrequency === 'Frequently Tested'
                                ? '#eff6ff'
                                : '#f8fafc',
                            color:
                              site.pyqFrequency === 'Top Tested'
                                ? '#b45309'
                                : site.pyqFrequency === 'Frequently Tested'
                                ? '#1d4ed8'
                                : '#64748b',
                            border: `1px solid ${
                              site.pyqFrequency === 'Top Tested'
                                ? '#fde68a'
                                : site.pyqFrequency === 'Frequently Tested'
                                ? '#bfdbfe'
                                : '#e2e8f0'
                            }`,
                          }}
                        >
                          {site.pyqFrequency === 'Top Tested' ? '🔥 ' : '⚡ '}
                          {site.pyqFrequency} ({site.pyqCount} PYQs)
                        </span>
                      </div>
                    </div>

                    {/* Metadata Linewise: River / Basin, Area, Flagship Fauna */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '10px',
                        background: '#f8fafc',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        border: '1px solid #edf2f7',
                      }}
                    >
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>
                          🌊 River / Catchment Basin
                        </strong>
                        <span style={{ color: '#1e293b', fontWeight: 600 }}>{site.riverOrBasin}</span>
                      </div>

                      <div>
                        <strong style={{ color: '#047857', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>
                          📐 Area Covered
                        </strong>
                        <span style={{ color: '#1e293b', fontWeight: 600 }}>
                          {site.areaSqKm.toLocaleString()} sq km ({Math.round(site.areaSqKm * 100).toLocaleString()} ha)
                        </span>
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong style={{ color: '#7c3aed', display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>
                          🦅 Flagship Fauna &amp; Key Ecology
                        </strong>
                        <span style={{ color: '#334155' }}>{site.flagshipFauna}</span>
                      </div>
                    </div>

                    {/* Montreux Note if applicable */}
                    {site.montreuxNote && (
                      <div
                        style={{
                          background: site.montreuxRecord ? '#fff1f2' : '#f0fdf4',
                          borderLeft: `4px solid ${site.montreuxRecord ? '#e11d48' : '#16a34a'}`,
                          padding: '10px 14px',
                          borderRadius: '0 8px 8px 0',
                          fontSize: '13px',
                          color: site.montreuxRecord ? '#9f1239' : '#166534',
                          lineHeight: '1.5',
                        }}
                      >
                        <strong>Montreux Record Classification:</strong> {site.montreuxNote}
                      </div>
                    )}

                    {/* High-Yield Exam Notes Box */}
                    <div
                      style={{
                        background: '#fafaf9',
                        borderLeft: '4px solid #0f766e',
                        padding: '12px 14px',
                        borderRadius: '0 8px 8px 0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <Award size={14} style={{ color: '#0f766e' }} />
                        <strong style={{ fontSize: '11.5px', textTransform: 'uppercase', color: '#0f766e', letterSpacing: '0.5px' }}>
                          High-Yield Exam Significance (UPSC / State PSC)
                        </strong>
                      </div>
                      <p style={{ margin: 0, fontSize: '13.5px', color: '#334155', lineHeight: '1.55' }}>
                        {site.examFact}
                      </p>
                    </div>

                    {/* Footer Links */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f1f5f9', fontSize: '12.5px' }}>
                      <Link
                        to="/india-physical-geography-map"
                        style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <span>View on Physical Geography Map</span>
                        <ChevronRight size={14} />
                      </Link>

                      <Link
                        to="/blog/indian-rivers-and-tributaries"
                        style={{ color: '#64748b', textDecoration: 'none' }}
                      >
                        Read River &amp; Basin Notes ↗
                      </Link>
                    </div>
                  </article>
                )
              })}

              {filteredSites.length === 0 && (
                <div style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--card-bg, #ffffff)', borderRadius: '12px', border: '1px solid var(--line, #e2e8f0)' }}>
                  <Compass size={36} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '18px', color: '#0f172a', margin: '0 0 6px' }}>No Ramsar sites match your query</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', maxWidth: '420px', margin: '0 auto 16px' }}>
                    Try broadening your search keyword or clearing the state and wave filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('')
                      setStateFilter('all')
                      setEraFilter('all')
                      setOnlyMontreux(false)
                    }}
                    style={{
                      background: '#047857',
                      color: '#ffffff',
                      border: 'none',
                      padding: '8px 18px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Tentative & Candidate Pipeline (By Year) */}
        {activeTab === 'tentative' && (
          <div>
            <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Clock size={20} style={{ color: '#0f766e' }} />
                <h3 style={{ margin: 0, fontSize: '18px', color: '#115e59', fontWeight: 700 }}>
                  Tentative &amp; Candidate Wetlands Pipeline of India (Chronological Order by Year)
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#134e4a', lineHeight: '1.6' }}>
                Track what wetlands were proposed on the tentative candidate list year by year by State Wetland Authorities and the MoEFCC under the <em>Amrit Dharohar</em> initiative and National Plan for Conservation of Aquatic Ecosystems (NPCA). See what was tentative at each year and their eventual designation trajectory.
              </p>
            </div>

            {/* Filter controls for Tentative Pipeline */}
            <div
              style={{
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--line, #e2e8f0)',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '20px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  Filter by Year Proposed:
                </span>
                {['all', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setCandidateYearFilter(yr)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontWeight: candidateYearFilter === yr ? 700 : 500,
                      background: candidateYearFilter === yr ? '#0f766e' : '#f1f5f9',
                      color: candidateYearFilter === yr ? '#ffffff' : '#475569',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {yr === 'all' ? 'All Years (2019–2026)' : yr}
                  </button>
                ))}
              </div>

              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#475569' }}>Status:</span>
                <select
                  value={candidateStatusFilter}
                  onChange={(e) => setCandidateStatusFilter(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    background: '#f8fafc',
                    color: '#0f172a',
                    cursor: 'pointer',
                  }}
                >
                  <option value="all">All Candidate Statuses</option>
                  <option value="Designated">Designated as Ramsar Site</option>
                  <option value="Active Candidate">Active Candidate Pipeline</option>
                </select>
              </div>
            </div>

            {/* Candidate Linewise List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {filteredCandidates.map((candidate) => (
                <article
                  key={`${candidate.siteName}-${candidate.yearProposed}`}
                  style={{
                    background: 'var(--card-bg, #ffffff)',
                    border: candidate.currentStatus === 'Active Candidate' ? '1.5px solid #99f6e4' : '1px solid var(--line, #e2e8f0)',
                    borderRadius: '12px',
                    padding: '18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 800,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          border: '1px solid #bae6fd',
                        }}
                      >
                        Year {candidate.yearProposed}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                        {candidate.siteName}
                      </h3>
                      <span style={{ fontSize: '12.5px', color: '#64748b' }}>📍 {candidate.state}</span>
                    </div>

                    <div>
                      {candidate.currentStatus === 'Designated' ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '12px',
                            background: '#ecfdf5',
                            color: '#047857',
                            border: '1px solid #a7f3d0',
                          }}
                        >
                          <CheckCircle2 size={13} />
                          <span>Officially Designated</span>
                        </span>
                      ) : (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '12px',
                            background: '#fffbeb',
                            color: '#b45309',
                            border: '1px solid #fde68a',
                          }}
                        >
                          <AlertCircle size={13} />
                          <span>Active Tentative Pipeline</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                    <strong>Proposing Authority:</strong> {candidate.proposalAuthority}
                  </div>

                  <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: '3px solid #0f766e', fontSize: '13px', color: '#334155' }}>
                    <strong>Status at Year {candidate.yearProposed}:</strong> {candidate.statusAtYear}
                    <div style={{ marginTop: '4px', color: '#047857', fontWeight: 600 }}>
                      👉 Outcome: {candidate.designationNote}
                    </div>
                  </div>

                  <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                    <strong>Ecological Significance:</strong> {candidate.ecologicalSignificance}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Most Asked Ramsar Sites */}
        {activeTab === 'most-asked' && (
          <div>
            <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '18px' }}>🔥</span>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#92400e', fontWeight: 700 }}>
                  High-Frequency Ramsar Sites in UPSC &amp; State PSC Exams
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#78350f', lineHeight: '1.5' }}>
                The following wetlands appear most frequently in Preliminary questions (location, river basin, unique ecosystem, or Montreux status). Sorted in descending order of past question frequency.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {mostAskedSites.map((site, idx) => (
                <article
                  key={site.id}
                  style={{
                    background: 'var(--card-bg, #ffffff)',
                    border: '1px solid var(--line, #e2e8f0)',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: idx < 3 ? '#b45309' : '#0f766e',
                          color: '#ffffff',
                          fontWeight: 800,
                          fontSize: '13px',
                        }}
                      >
                        #{idx + 1}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '19px', fontFamily: 'var(--font-heading, "Fraunces", serif)', color: '#0f172a' }}>
                        {site.name}
                      </h3>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>
                        📍 {site.state}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          background: '#fffbeb',
                          color: '#b45309',
                          border: '1px solid #fde68a',
                        }}
                      >
                        🔥 {site.pyqCount} Direct PYQs Tested
                      </span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>
                        Added in {site.yearDeclared}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '13.5px', color: '#334155' }}>
                    <strong>River / Basin:</strong> {site.riverOrBasin} | <strong>Flagship Fauna:</strong> {site.flagshipFauna}
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '8px', borderLeft: '4px solid #b45309', fontSize: '13.5px', color: '#1e293b', lineHeight: '1.55' }}>
                    <strong style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#b45309', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      Why UPSC Frequently Tests This:
                    </strong>
                    {site.examFact}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Montreux Record Explained */}
        {activeTab === 'montreux' && (
          <div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <ShieldAlert size={22} style={{ color: '#b91c1c' }} />
                <h3 style={{ margin: 0, fontSize: '18px', color: '#991b1b', fontWeight: 800 }}>
                  What is the Montreux Record? (UPSC Core Concept)
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#7f1d1d', lineHeight: '1.6' }}>
                The <strong>Montreux Record</strong> is a principal register established under Article 3.2 of the Ramsar Convention listing wetland sites on the Ramsar List where ecological changes have occurred, are occurring, or are likely to occur as a result of technological developments, pollution, or other human interference.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              {/* Site 1: Keoladeo Ghana */}
              <div style={{ background: 'var(--card-bg, #ffffff)', border: '2px solid #fca5a5', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', background: '#fef2f2', color: '#b91c1c' }}>
                    ⚠️ Active on Record (Since 1990)
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Rajasthan</span>
                </div>
                <h3 style={{ margin: '4px 0 0', fontSize: '18px', color: '#0f172a', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                  Keoladeo Ghana National Park
                </h3>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                  <strong>Confluence:</strong> Gambhir &amp; Banganga Rivers (Bharatpur)
                </div>
                <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <strong>Reason for Inclusion:</strong> Listed in 1990 due to severe water shortages caused by upstream dam diversions (Panchana Dam) and uncontrolled growth of the invasive grass <em>Paspalum distichum</em>, which choked migratory waterfowl foraging grounds.
                </div>
              </div>

              {/* Site 2: Loktak Lake */}
              <div style={{ background: 'var(--card-bg, #ffffff)', border: '2px solid #fca5a5', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', background: '#fef2f2', color: '#b91c1c' }}>
                    ⚠️ Active on Record (Since 1993)
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Manipur</span>
                </div>
                <h3 style={{ margin: '4px 0 0', fontSize: '18px', color: '#0f172a', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                  Loktak Lake &amp; Keibul Lamjao
                </h3>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                  <strong>Basin:</strong> Manipur River (Chindwin / Irrawaddy basin)
                </div>
                <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <strong>Reason for Inclusion:</strong> Listed in 1993 due to severe ecological disruption caused by the Ithai Barrage for the Loktak Hydroelectric Project. The barrage converted naturally fluctuating wetland water levels into a permanent reservoir, causing thinning and drowning of floating <em>Phumdis</em> (the exclusive habitat of the endangered Sangai deer).
                </div>
              </div>

              {/* Site 3: Chilika Lake (Removed) */}
              <div style={{ background: 'var(--card-bg, #ffffff)', border: '2px solid #86efac', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '10px', background: '#f0fdf4', color: '#15803d' }}>
                    ✅ Successfully Removed (1993–2002)
                  </span>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Odisha</span>
                </div>
                <h3 style={{ margin: '4px 0 0', fontSize: '18px', color: '#0f172a', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                  Chilika Lake (Restoration Milestone)
                </h3>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                  <strong>Confluence:</strong> Daya &amp; Bhargavi Rivers (Mahanadi Delta)
                </div>
                <div style={{ fontSize: '13px', color: '#334155', lineHeight: '1.5', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                  <strong>Restoration Victory:</strong> Placed on the Montreux Record in 1993 due to heavy siltation and choking of its sea-mouth. In 2000, the Chilika Development Authority opened an artificial sea mouth at Sipakuda, successfully restoring salinity balance and fish catches. Removed from the Record in 2002; received the prestigious <strong>Ramsar Wetland Conservation Award</strong>.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: State-wise Directory */}
        {activeTab === 'by-state' && (
          <div>
            <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <MapPin size={18} style={{ color: '#0f766e' }} />
                <h3 style={{ margin: 0, fontSize: '16px', color: '#115e59', fontWeight: 700 }}>
                  State-wise Distribution of India’s 103 Ramsar Sites
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#134e4a', lineHeight: '1.5' }}>
                Tamil Nadu leads the country with <strong>20 sites</strong>, followed by Uttar Pradesh with <strong>14 sites</strong>. Explore each State and UT’s declared wetlands below.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stateGroupings.map(([stateName, sites]) => (
                <div
                  key={stateName}
                  style={{
                    background: 'var(--card-bg, #ffffff)',
                    border: '1px solid var(--line, #e2e8f0)',
                    borderRadius: '12px',
                    padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>📍</span>
                      <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a', fontFamily: 'var(--font-heading, "Fraunces", serif)' }}>
                        {stateName}
                      </h3>
                    </div>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '12px',
                        background: '#ecfdf5',
                        color: '#047857',
                        border: '1px solid #a7f3d0',
                      }}
                    >
                      {sites.length} {sites.length === 1 ? 'Site' : 'Sites'}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                    {sites.map((s) => (
                      <div
                        key={s.id}
                        style={{
                          background: '#f8fafc',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>{s.name}</strong>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>{s.yearDeclared}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#0369a1', marginBottom: '2px' }}>
                          🌊 {s.riverOrBasin}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                          📐 {s.areaSqKm.toLocaleString()} sq km
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Real Exam Questions & FAQs */}
        {activeTab === 'faqs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '16px 20px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <BookOpen size={18} style={{ color: '#4338ca' }} />
                <h3 style={{ margin: 0, fontSize: '16px', color: '#312e81', fontWeight: 700 }}>
                  Actual UPSC CSE, JKPSC CCE &amp; State PSC Exam Questions on Ramsar Sites
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '14px', color: '#3730a3', lineHeight: '1.5' }}>
                Practice real past examination questions with verified answers, examiner trap warnings, and high-yield takeaway rules.
              </p>
            </div>

            {RAMSAR_FAQS.map((faq, idx) => (
              <div
                key={faq.question}
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  border: '1px solid var(--line, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: 800,
                      padding: '3px 9px',
                      borderRadius: '6px',
                      background: '#eef2ff',
                      color: '#4338ca',
                      border: '1px solid #c7d2fe',
                      textTransform: 'uppercase',
                      letterSpacing: '0.4px',
                    }}
                  >
                    {faq.examTag}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 10px', fontSize: '16.5px', color: '#0f172a', fontFamily: 'var(--font-heading, "Fraunces", serif)', lineHeight: '1.4' }}>
                  Q{idx + 1}. {faq.question}
                </h3>
                <p style={{ margin: '0 0 12px', fontSize: '14px', color: '#334155', lineHeight: '1.65' }}>
                  {faq.answer}
                </p>
                <div style={{ background: '#f8fafc', borderLeft: '3px solid #4338ca', padding: '10px 14px', borderRadius: '0 6px 6px 0', fontSize: '13px', color: '#312e81' }}>
                  <strong>Key Takeaway Rule:</strong> {faq.examTakeaway}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '40px',
            textAlign: 'center',
            padding: '28px 24px',
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--line, #e2e8f0)',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading, "Fraunces", serif)', fontSize: '22px', margin: '0 0 8px', color: 'var(--ink, #0f172a)' }}>
            Practice UPSC &amp; State PSC Environment Questions
          </h3>
          <p style={{ fontSize: '14.5px', color: 'var(--ink2, #475569)', maxWidth: '620px', margin: '0 auto 18px', lineHeight: '1.5' }}>
            Test your knowledge of India’s 103 Ramsar sites, candidate wetlands, river networks, and biodiversity hotspots with actual previous year questions and verified explanations.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/exam/upsc-cse?tab=subjects&subject=Environment%20%26%20Ecology"
              style={{
                display: 'inline-block',
                fontWeight: 700,
                fontSize: '14px',
                color: '#ffffff',
                background: '#047857',
                padding: '10px 22px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Practice Environment PYQs (Free) →
            </Link>
            <Link
              to="/india-physical-geography-map"
              style={{
                display: 'inline-block',
                fontWeight: 600,
                fontSize: '14px',
                color: '#0f766e',
                background: '#f0fdfa',
                border: '1px solid #ccfbf1',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              Interactive Physical Map 🗺️
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
