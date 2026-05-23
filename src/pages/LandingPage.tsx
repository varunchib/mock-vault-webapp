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
    title: 'Ministry of Papers — Every Exam Paper. Solved & Free.',
    description: 'Search previous year questions from UPSC, SSC, State PSCs, NEET, JEE and 200+ exams. Every answer solved, explained, and free — no login needed.',
    canonicalPath: '/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Ministry of Papers',
        url: 'https://ministryofpapers.com',
        description: '12 lakh+ solved PYQs. 240+ exams. No login. No paywall.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://ministryofpapers.com/exams?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ministry of Papers',
        url: 'https://ministryofpapers.com',
        logo: 'https://ministryofpapers.com/favicon.svg',
        description: 'Free previous year question papers and mock tests for UPSC, SSC, IBPS, NEET, JEE and 240+ Indian competitive exams.',
        sameAs: ['https://x.com/ministryofpapers'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are all previous year question papers free on Ministry of Papers?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes, all previous year question papers (PYQs) on Ministry of Papers are completely free. You can browse and read questions without creating an account or logging in.' },
          },
          {
            '@type': 'Question',
            name: 'Which exams are covered on Ministry of Papers?',
            acceptedAnswer: { '@type': 'Answer', text: 'Ministry of Papers covers 240+ exams including UPSC CSE, SSC CGL, SSC CHSL, IBPS PO, IBPS Clerk, NEET UG, JEE Main, JKSSB, Bihar PSC, UP Police, RRB NTPC, Rajasthan Patwari, and all major state PSC exams across India.' },
          },
          {
            '@type': 'Question',
            name: 'How do I take a mock test on Ministry of Papers?',
            acceptedAnswer: { '@type': 'Answer', text: 'Sign in with your Google account, enroll in your target exam from the Exams page, then go to Tests to access free full-length mock tests with automatic scoring and performance analysis.' },
          },
          {
            '@type': 'Question',
            name: 'Are the answers on Ministry of Papers verified?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. All answers on Ministry of Papers are verified against official answer keys. Every question includes a detailed explanation so you understand the concept, not just the correct option.' },
          },
          {
            '@type': 'Question',
            name: 'Do I need to download an app to use Ministry of Papers?',
            acceptedAnswer: { '@type': 'Answer', text: 'No app needed. Ministry of Papers is a fully web-based platform that works on any browser on mobile or desktop. Just open ministryofpapers.com and start practising.' },
          },
          {
            '@type': 'Question',
            name: 'Can I practise JKSSB and JKPSC previous year questions on Ministry of Papers?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. Ministry of Papers has a dedicated section for Jammu & Kashmir exams including JKSSB Finance Accounts Assistant, Junior Assistant, JKPSC KAS (CCE), JKPSC JE, Wildlife Guard, and other J&K government recruitment exams.' },
          },
          {
            '@type': 'Question',
            name: 'How does the scoring work in mock tests?',
            acceptedAnswer: { '@type': 'Answer', text: 'Mock tests on Ministry of Papers follow the exact pattern of the real exam including negative marking. After submission you get a detailed scorecard showing your marks, accuracy, subject-wise breakdown, and comparison with cutoff scores.' },
          },
          {
            '@type': 'Question',
            name: 'Is Ministry of Papers useful for UPSC CSE preparation?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. Ministry of Papers has all UPSC Civil Services Preliminary and Mains previous year question papers with subject-tagged, fully solved questions. You can filter by year, subject, or paper and practise in mock exam mode.' },
          },
        ],
      },
    ] as unknown as Record<string, unknown>,
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
