import {defineArrayMember, defineField} from 'sanity'

/**
 * A label + URL pair, shared by the top menu (`navigation`) and the `footer`.
 * URLs starting with http(s):// open in a new tab on the site; paths starting
 * with / stay on orcasound.tech.
 */

// Pages that exist on orcasound.tech (one per file in `src/pages/`). Keep in
// sync when a page is added or removed: a path not listed here only gets a
// warning in Studio, not an error.
const SITE_PAGES = [
  '/',
  '/getinvolved',
  '/learn',
  '/about',
  '/blog',
  '/donate',
  '/catalog',
  '/hacker-hall-of-fame',
  '/privacy',
  '/research-opt-in-form',
]
// Paths under these prefixes are generated per item (blog posts, authors).
const SITE_PAGE_PREFIXES = ['/blog/']

export const URL_DESCRIPTION =
  'A page on this site: / (Home), /getinvolved, /learn, /about, /blog, /donate, /catalog, /hacker-hall-of-fame. ' +
  'Another website: paste its full address, for example https://live.orcasound.net/ (opens in a new tab).'

const clean = (url?: string) => (url ?? '').trim()

export const validateUrl = (url?: string) => {
  const v = clean(url)
  if (!v) return true
  if (v.startsWith('/')) {
    return /^\/[/\\]/.test(v) ? 'Start with a single / (for example /learn).' : true
  }
  if (/^(https?:\/\/|mailto:)/i.test(v)) return true
  if (/^(www\.|[a-z0-9-]+\.[a-z]{2,})/i.test(v)) {
    return 'Add https:// to the front of a website address (for example https://www.example.org).'
  }
  return 'Start with / for a page on this site, or https:// for another website.'
}

// Warning only: a typo like /lern still publishes but leads to a 404 page.
export const warnUnknownPage = (url?: string) => {
  const v = clean(url)
  if (!v.startsWith('/') || v.startsWith('//')) return true
  const path = v.split(/[?#]/)[0].replace(/(.)\/$/, '$1')
  if (SITE_PAGES.includes(path) || SITE_PAGE_PREFIXES.some((p) => path.startsWith(p))) {
    return true
  }
  return `There's no ${path} page on this site, so this link would show a "page not found" error. Check the spelling against the list above.`
}

export const urlField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'string',
    description: URL_DESCRIPTION,
    validation: (rule) => [
      rule.required().custom(validateUrl),
      rule.custom(warnUnknownPage).warning(),
    ],
  })

export const linkListField = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'siteLink',
        fields: [
          defineField({
            name: 'label',
            title: 'Text',
            description: 'The words visitors see, for example "Learn".',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          urlField('url', 'Link'),
        ],
        preview: {select: {title: 'label', subtitle: 'url'}},
      }),
    ],
  })
