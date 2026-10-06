// URL allowlists for values that come from Sanity and end up in an href.
// Shared by the MOA content resolver and the Portable Text link mark so both
// apply the same rules. Studio validation is not trusted here, because drafts,
// older documents, or API writes can bypass it.

// Mirror the browser URL parser: it ignores leading/trailing C0 controls and
// spaces, and drops tabs and newlines anywhere. Checking the cleaned value
// stops inputs like " java\tscript:" or "/\n/host" from slipping through.
const cleanHref = (v) =>
  v.replace(/^[\u0000-\u0020]+|[\u0000-\u0020]+$/g, '').replace(/[\t\n\r]/g, '')

// Keep only absolute http(s) URLs so a `javascript:` (or otherwise invalid)
// value never reaches an href.
export const safeHttpUrl = (v) => {
  if (typeof v !== 'string' || !v.trim()) return undefined
  try {
    const u = new URL(v.trim())
    return u.protocol === 'http:' || u.protocol === 'https:'
      ? u.href
      : undefined
  } catch {
    return undefined
  }
}

// Allow http(s) and mailto: URLs, same-site paths (`/path`, but not the
// protocol-relative `//host` or `/\host`), and in-page anchors (`#id`).
// Returns the href to render, or undefined when the link should be dropped.
export const safeLinkHref = (v) => {
  if (typeof v !== 'string') return undefined
  const href = cleanHref(v)
  if (!href) return undefined
  if (href.startsWith('#')) return href
  if (href.startsWith('/')) {
    return href[1] === '/' || href[1] === '\\' ? undefined : href
  }
  try {
    const u = new URL(href)
    return ['http:', 'https:', 'mailto:'].includes(u.protocol)
      ? u.href
      : undefined
  } catch {
    return undefined
  }
}
