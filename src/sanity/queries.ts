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

/**
 * Learn page (Phase 2). Text + images + the 3 Common Calls cards (spectrogram
 * image, audio clip, text) + exhibits. Non-`fill` images resolve their asset
 * dimensions so `next/image` gets a width/height for the remote CDN URL.
 */
export const LEARN_PAGE_QUERY = `*[_type == "learnPage"][0]{
  heroTitle,
  heroDescription,
  "heroImageUrl": heroImage.asset->url,
  salishSeaIntro,
  "salishSeaImageUrl": salishSeaImage.asset->url,
  "salishSeaImageWidth": salishSeaImage.asset->metadata.dimensions.width,
  "salishSeaImageHeight": salishSeaImage.asset->metadata.dimensions.height,
  salishSeaLink,
  commonCallsIntro,
  calls[]{
    title,
    "spectrogramUrl": spectrogram.asset->url,
    "spectrogramWidth": spectrogram.asset->metadata.dimensions.width,
    "spectrogramHeight": spectrogram.asset->metadata.dimensions.height,
    "audioUrl": audio.asset->url,
    description
  },
  callCatalogIntro,
  exhibits[]{
    "imageUrl": image.asset->url,
    "imageWidth": image.asset->metadata.dimensions.width,
    "imageHeight": image.asset->metadata.dimensions.height,
    text
  }
}`

export interface LearnCall {
  title?: string
  spectrogramUrl?: string
  spectrogramWidth?: number
  spectrogramHeight?: number
  audioUrl?: string
  description?: string
}

export interface LearnExhibit {
  imageUrl?: string
  imageWidth?: number
  imageHeight?: number
  text?: string
}

export interface LearnPageContent {
  heroTitle?: string
  heroDescription?: string
  heroImageUrl?: string
  salishSeaIntro?: string
  salishSeaImageUrl?: string
  salishSeaImageWidth?: number
  salishSeaImageHeight?: number
  salishSeaLink?: string
  commonCallsIntro?: string
  calls?: LearnCall[]
  callCatalogIntro?: string
  exhibits?: LearnExhibit[]
}
