import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Static export → outputs to out/ for Cloudflare Worker (worker.ts serves it).
  // Dynamic routes use empty generateStaticParams — the worker's SPA fallback
  // (not_found_handling: single-page-application) handles client-side routing,
  // and the worker's bot-detection injects per-page metadata for crawlers.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
