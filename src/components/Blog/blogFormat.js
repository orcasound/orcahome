// "Scott Veirs", "Scott Veirs & Val Veirs", "A, B & C" — the byline.
export const formatByline = (authors) => {
  const names = (authors || []).filter(Boolean)
  if (names.length === 0) return ''
  if (names.length === 1) return names[0]
  return `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}`
}

// Tags that are noise, not topics — hidden from the UI without deleting them
// from the data (#410). "Uncategorized" is a WordPress default that tells
// readers nothing.
export const HIDDEN_TAGS = new Set(['Uncategorized'])

// A tag needs at least this many posts to appear in the filter dropdown (and to
// be prebuilt as /blog/tag/[slug]; rarer tag pages are built on first visit).
// The migrated posts carry ~120 tags with a long tail of one-offs (#410); only
// the frequently-used ones make useful filters.
export const MIN_TAG_COUNT = 5
