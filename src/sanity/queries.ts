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
 * Get Involved page (Phase 2). Mirrors the editable content in
 * `src/pages/getinvolved.jsx`. For non-`fill` images (volunteer photos,
 * hackathon, roadmap) we also resolve `asset->metadata.dimensions` so the
 * page can hand `next/image` a width/height for the remote CDN URL — without
 * that, remote `<Image>`s throw (the Next 16 image gotcha, #295/#296).
 * `fill` images (hero banner, partner logos) only need the URL.
 */
export const GET_INVOLVED_PAGE_QUERY = `*[_type == "getInvolvedPage"][0]{
  heroTitle,
  heroDescription,
  "heroImageUrl": heroImage.asset->url,
  citizenScientistHeading,
  citizenScientistText,
  inPersonHeading,
  inPersonText,
  volunteerImages[]{
    "url": image.asset->url,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    alt
  },
  volunteerClosingText,
  developersIntro,
  webAppHeading,
  "hackathonImageUrl": hackathonImage.asset->url,
  "hackathonImageWidth": hackathonImage.asset->metadata.dimensions.width,
  "hackathonImageHeight": hackathonImage.asset->metadata.dimensions.height,
  hackathonCaption,
  crownJewelText,
  techStack[]{ text, subItems },
  roadmapHeading,
  "roadmapImageUrl": roadmapImage.asset->url,
  "roadmapImageWidth": roadmapImage.asset->metadata.dimensions.width,
  "roadmapImageHeight": roadmapImage.asset->metadata.dimensions.height,
  roadmapCaption,
  democracyLabParagraph,
  moaHeading,
  moaBody,
  supportParagraphs,
  supportCtaLabel,
  supportCtaHref,
  partners[]{
    name,
    "logoUrl": logo.asset->url,
    url,
    caption
  }
}`

export interface SanityImageWithDimensions {
  url?: string
  width?: number
  height?: number
  alt?: string
}

export interface TechStackItem {
  text?: string
  subItems?: string[]
}

export interface GetInvolvedPartner {
  name?: string
  logoUrl?: string
  url?: string
  caption?: string
}

export interface GetInvolvedPageContent {
  heroTitle?: string
  heroDescription?: string
  heroImageUrl?: string
  citizenScientistHeading?: string
  citizenScientistText?: string
  inPersonHeading?: string
  inPersonText?: string
  volunteerImages?: SanityImageWithDimensions[]
  volunteerClosingText?: string
  developersIntro?: string
  webAppHeading?: string
  hackathonImageUrl?: string
  hackathonImageWidth?: number
  hackathonImageHeight?: number
  hackathonCaption?: string
  crownJewelText?: string
  techStack?: TechStackItem[]
  roadmapHeading?: string
  roadmapImageUrl?: string
  roadmapImageWidth?: number
  roadmapImageHeight?: number
  roadmapCaption?: string
  democracyLabParagraph?: Array<Record<string, unknown>>
  moaHeading?: string
  moaBody?: Array<Record<string, unknown>>
  supportParagraphs?: string[]
  supportCtaLabel?: string
  supportCtaHref?: string
  partners?: GetInvolvedPartner[]
}
