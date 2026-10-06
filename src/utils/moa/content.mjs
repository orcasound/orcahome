// Resolve the MOA content shown on /getinvolved: the published Sanity
// `moaContent` document first, field by field, with the bundled JSON as the
// fallback. Pure (fallback is passed in) so it can be unit tested with
// node:test. The website does not trust Studio validation, because drafts,
// older documents, or API writes can bypass it, so invalid entries are dropped
// here.

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

const trimmed = (v) => (typeof v === 'string' ? v.trim() : '')

const pickString = (value, fallbackValue) =>
  trimmed(value) || trimmed(fallbackValue)

const cleanStrings = (list) =>
  Array.isArray(list) ? list.map(trimmed).filter(Boolean) : []

// Keep only absolute http(s) URLs so a `javascript:` (or otherwise invalid)
// value never reaches an href.
const safeHttpUrl = (v) => {
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

const cleanSections = (sections) =>
  (Array.isArray(sections) ? sections : [])
    .filter(isObject)
    .map((s) => ({
      heading: trimmed(s.heading),
      paragraphs: cleanStrings(s.paragraphs),
      items: cleanStrings(s.items),
    }))
    .filter((s) => s.heading && (s.paragraphs.length || s.items.length))

const cleanMembers = (members) =>
  (Array.isArray(members) ? members : [])
    .filter(isObject)
    .map((m) => {
      const member = { organization: trimmed(m.organization) }
      const nodeAndRole = trimmed(m.nodeAndRole)
      const dateJoined = trimmed(m.dateJoined)
      const url = safeHttpUrl(m.url)
      const logoUrl = trimmed(m.logoUrl)
      if (nodeAndRole) member.nodeAndRole = nodeAndRole
      // Passed through as-is; the card shows "Not recorded" for bad dates.
      if (dateJoined) member.dateJoined = dateJoined
      if (url) member.url = url
      if (logoUrl) member.logoUrl = logoUrl
      return member
    })
    .filter((m) => m.organization)

/**
 * @param {object | null | undefined} sanity Result of MOA_CONTENT_QUERY.
 * @param {object} fallback Contents of src/data/moaContent.json.
 * @returns {{ title: string, subtitle: string, sourceDocUrl: string,
 *   sections: { heading: string, paragraphs: string[], items: string[] }[],
 *   agreementStatement: string, members: object[] }}
 */
export function resolveMoaContent(sanity, fallback) {
  const fb = isObject(fallback) ? fallback : {}
  const src = isObject(sanity) ? sanity : {}

  const sections = cleanSections(src.sections)
  const members = cleanMembers(src.members)

  return {
    title: pickString(src.title, fb.title),
    subtitle: pickString(src.subtitle, fb.subtitle),
    sourceDocUrl:
      safeHttpUrl(src.sourceDocUrl) ?? safeHttpUrl(fb.sourceDocUrl) ?? '',
    sections: sections.length ? sections : cleanSections(fb.sections),
    agreementStatement: pickString(
      src.agreementStatement,
      fb.agreementStatement
    ),
    members: members.length ? members : cleanMembers(fb.members),
  }
}
