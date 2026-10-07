// The path the site is served under, e.g. '/orcahome' on GitHub Pages. Empty
// when the site is served from a domain root (local dev, Vercel).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Prefix a root-relative URL with BASE_PATH. next/link, next/router and static
// image imports add the base path themselves; anything else that points into
// public/ or at a page (plain <a href>, <img src> strings, audio URLs, CSS
// url()) has to go through this. Absolute and relative URLs pass through.
export function withBasePath(url) {
  if (typeof url !== 'string' || !url.startsWith('/') || url.startsWith('//')) {
    return url
  }
  return `${BASE_PATH}${url}`
}
