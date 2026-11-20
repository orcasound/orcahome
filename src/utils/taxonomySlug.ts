// URL slug for a blog tag or project category: "Education & outreach" ->
// "education-and-outreach". Used by /blog/tag/[slug] and
// /projects/category/[slug], and by the chips that link to them.
export const toSlug = (name: string): string =>
  String(name || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // drop accents
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// The tag or category name whose slug matches, or null.
export const fromSlug = (slug: string, names: string[]): string | null =>
  names.find((name) => toSlug(name) === slug) || null
