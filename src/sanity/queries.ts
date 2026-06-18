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

/**
 * About page (Phase 2). Text fields only for now — projects and images
 * still come from the existing code/db.json until a follow-up slice.
 */
export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  heroTitle,
  heroDescription,
  intro,
  projectsHeading,
  participationHeading,
  participationParagraphs,
  ctaLabel,
  ctaHref
}`

export interface AboutPageContent {
  heroTitle?: string
  heroDescription?: string
  intro?: string
  projectsHeading?: string
  participationHeading?: string
  participationParagraphs?: string[]
  ctaLabel?: string
  ctaHref?: string
}
