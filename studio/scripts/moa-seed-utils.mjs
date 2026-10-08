/**
 * Pure mapping from `src/data/moaContent.json` to a Sanity `moaContent`
 * document. Imports nothing so `npm run test` can cover it
 * without Studio dependencies or network.
 *
 * `_key`/`_type` go on object-array items only (sections, members). Paragraphs
 * and items stay plain string arrays. Logos are uploaded in the Studio, so
 * `logoUrl` is not copied.
 */
const key = (prefix, i) => `${prefix}-${String(i + 1).padStart(2, '0')}`

export function buildMoaDocument(json) {
  const doc = {
    _id: 'moaContent',
    _type: 'moaContent',
    title: json.title,
    subtitle: json.subtitle,
    sourceDocUrl: json.sourceDocUrl,
    sections: (json.sections || []).map((s, i) => ({
      _key: key('section', i),
      _type: 'moaSection',
      heading: s.heading,
      paragraphs: [...(s.paragraphs || [])],
      items: [...(s.items || [])],
    })),
    agreementStatement: json.agreementStatement,
    members: (json.members || []).map((m, i) => {
      const member = {
        _key: key('member', i),
        _type: 'moaMember',
        organization: m.organization,
        dateJoined: m.dateJoined,
      }
      if (m.nodeAndRole) member.nodeAndRole = m.nodeAndRole
      if (m.url) member.url = m.url
      return member
    }),
  }
  return doc
}
