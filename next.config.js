/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Emit plain HTML/JS/CSS into out/ that any static host can serve.
  output: 'export',
  // TODO(static-export): pages export as `about.html`, but S3 behind CloudFront
  // won't serve that for `/about`. Either add a CloudFront Function that maps
  // extensionless paths to `.html`, or set `trailingSlash: true` (exports
  // `about/index.html`, but changes every URL to end in `/`) and map `/` to
  // `/index.html` instead.
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
