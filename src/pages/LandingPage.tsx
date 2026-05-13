import { AccessModel } from '../components/sections/AccessModel'
import { CTA } from '../components/sections/CTA'
import { Exams } from '../components/sections/Exams'
import { Hero } from '../components/sections/Hero'
import { HowItWorks } from '../components/sections/HowItWorks'
import { Pricing } from '../components/sections/Pricing'
import { QuestionDemo } from '../components/sections/QuestionDemo'
import { SeoLinks } from '../components/sections/SeoLinks'
import { StatsStrip } from '../components/sections/StatsStrip'
import { Testimonials } from '../components/sections/Testimonials'
import { Ticker } from '../components/sections/Ticker'
import { ValueProps } from '../components/sections/ValueProps'
import { usePageMeta } from '../lib/usePageMeta'

export function LandingPage() {
  usePageMeta({
    title: 'PYQVault — Every Exam Paper. Solved & Free.',
    description: 'Search previous year questions from UPSC, SSC, State PSCs, NEET, JEE and 200+ exams. Every answer solved, explained, and free — no login needed.',
    canonicalPath: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'PYQVault',
      url: 'https://pyqvault.in',
      description: '12 lakh+ solved PYQs. 240+ exams. No login. No paywall.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://pyqvault.in/exam?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  })

  return (
    <>
      <Hero />
      <Ticker />
      <StatsStrip />
      <ValueProps />
      <QuestionDemo />
      <Exams />
      <AccessModel />
      <HowItWorks />
      <Pricing />
      <SeoLinks />
      <Testimonials />
      <CTA />
    </>
  )
}
