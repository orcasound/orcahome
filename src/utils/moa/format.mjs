const ISO_DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/

// Formatted in UTC so server and client render the same text (no hydration
// mismatch, no off-by-one day in western time zones).
const FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

/**
 * 'YYYY-MM-DD' -> 'Mar 4, 2016'. Returns '' for missing, malformed, or
 * impossible dates (e.g. 2023-02-30).
 */
export function formatMoaDate(iso) {
  if (typeof iso !== 'string') return ''
  const match = ISO_DATE_RE.exec(iso)
  if (!match) return ''
  const [y, m, d] = match.slice(1).map(Number)
  const date = new Date(Date.UTC(y, m - 1, d))
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCDate() !== d
  ) {
    return ''
  }
  return FORMATTER.format(date)
}
