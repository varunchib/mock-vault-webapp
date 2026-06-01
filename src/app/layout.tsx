import type { Metadata } from 'next'
import { Providers } from './providers'
import '../index.css'

export const metadata: Metadata = {
  title: {
    default: 'Ministry of Papers — Every Exam Paper. Solved & Free.',
    template: '%s | Ministry of Papers',
  },
  description: 'Search previous year questions from UPSC, SSC, State PSCs, NEET, JEE and 200+ exams. Every answer solved, explained, and free — no login needed.',
  keywords: ['UPSC PYQ', 'SSC CGL previous year questions', 'JKSSB paper', 'JKPSC paper', 'NEET PYQ', 'previous year question papers India'],
  openGraph: {
    siteName: 'Ministry of Papers',
    type: 'website',
    url: 'https://ministryofpapers.com',
    title: 'Ministry of Papers — Every Exam Paper. Solved & Free.',
    description: '12 lakh+ solved PYQs. 240+ exams. No login. No paywall.',
    images: [{ url: 'https://ministryofpapers.com/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ministryofpapers',
    title: 'Ministry of Papers — Every Exam Paper. Solved & Free.',
    description: '12 lakh+ solved PYQs. 240+ exams. No login. No paywall.',
    images: ['https://ministryofpapers.com/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  other: {
    'application-name': 'Ministry of Papers',
    'theme-color': '#FAFAF7',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,300;1,9..144,600&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Ministry of Papers',
            url: 'https://ministryofpapers.com',
            description: 'Free previous year question papers for UPSC, SSC, IBPS, NEET, JEE and 240+ Indian competitive exams.',
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: 'https://ministryofpapers.com/exams?q={search_term_string}' },
              'query-input': 'required name=search_term_string',
            },
          }) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
