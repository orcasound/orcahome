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
 * About page (Phase 2/3). Text + hero image + the Projects list (title,
 * image, link). Image fields resolve the asset to a plain CDN URL via
 * `asset->url`; the page falls back to the bundled images / db.json when a
 * value is missing.
 */
export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  heroTitle,
  heroDescription,
  "heroImageUrl": heroImage.asset->url,
  intro,
  projectsHeading,
  projects[]{
    title,
    "imageUrl": image.asset->url,
    url
  },
  participationHeading,
  participationParagraphs,
  ctaLabel,
  ctaHref
}`

export interface AboutProject {
  title?: string
  imageUrl?: string
  url?: string
}

export interface AboutPageContent {
  heroTitle?: string
  heroDescription?: string
  heroImageUrl?: string
  intro?: string
  projectsHeading?: string
  projects?: AboutProject[]
  participationHeading?: string
  participationParagraphs?: string[]
  ctaLabel?: string
  ctaHref?: string
}
