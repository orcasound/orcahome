/**
 * GROQ queries (Phase 1 — #317). Minimal page: hero + paragraph.
 */
export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  hero,
  paragraph
}`

export interface SanityPage {
  title?: string
  slug?: string
  hero?: {
    heading?: string
    subheading?: string
  }
  paragraph?: string
}
