import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // Static export only for production builds (Cloudflare Workers deployment).
  // Dev mode skips it so `npm run dev` works with dynamic routes normally.
  ...(isProd ? { output: 'export', trailingSlash: true } : {}),
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
