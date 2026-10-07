// Set by the GitHub Pages workflow, which serves the site under /<repo>.
// Empty everywhere else (local dev, Vercel), so URLs stay root-relative.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Emit plain HTML/JS/CSS into out/ that any static host can serve.
  output: 'export',
  basePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}
