import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // All pages are CSR — server output works fine for Cloudflare Workers
  // (via @cloudflare/next-on-pages) or Vercel. Use `output: 'export'` only
  // if you can supply generateStaticParams for every dynamic route.
  images: { unoptimized: true },

  // Strict react-hooks lint rules flag pre-existing patterns (setState in effects,
  // ref access in render). Run lint separately; don't block builds on it.
  eslint: { ignoreDuringBuilds: true },

  // Allow Google OAuth popup to postMessage back to the page.
  // Next.js sets COEP: same-origin by default which blocks it.
  async headers() {
    return [{
      source: '/(.*)',
      headers: [{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' }],
    }]
  },
}

export default nextConfig
