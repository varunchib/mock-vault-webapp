import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { AccessModel } from './components/sections/AccessModel'
import { CTA } from './components/sections/CTA'
import { Exams } from './components/sections/Exams'
import { Hero } from './components/sections/Hero'
import { HowItWorks } from './components/sections/HowItWorks'
import { Pricing } from './components/sections/Pricing'
import { QuestionDemo } from './components/sections/QuestionDemo'
import { SeoLinks } from './components/sections/SeoLinks'
import { StatsStrip } from './components/sections/StatsStrip'
import { Testimonials } from './components/sections/Testimonials'
import { Ticker } from './components/sections/Ticker'
import { ValueProps } from './components/sections/ValueProps'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
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
      </main>
      <Footer />
    </>
  )
}
