'use client'
// LandingPage loads client-side only (ssr:false) so the pre-rendered index.html
// is a blank shell — exactly like the original Vite index.html.
// The worker serves this shell for any route that has no dedicated static file
// (dynamic slugs like /exam/upsc-cse, /question/jkssb-q1, etc.).
// React then hydrates and Next.js routes to the correct page without any flash.
import dynamic from 'next/dynamic'
const LandingPage = dynamic(
  () => import('../views/LandingPage').then(m => ({ default: m.LandingPage })),
  { ssr: false }
)
export default function Home() {
  return <LandingPage />
}
