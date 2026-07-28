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

/**
 * Home page (Phase 2). Text + hero image + the CTA buttons + the hydrophone
 * map ID. The hero image is rendered with `fill`, so only the URL is needed
 * (no dimensions). `mapEmbedId` is the Google My Maps `mid`; the page builds
 * the full embed URL in code.
 */
export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  "heroImageUrl": heroImage.asset->url,
  heroCtaLabel,
  heroCtaHref,
  whatIsHeading,
  whatIsParagraphs,
  hydrophoneHeading,
  hydrophoneIntro,
  hydrophoneReportText,
  mapEmbedId,
  listenLiveLabel,
  listenLiveHref,
  getInvolvedLabel,
  getInvolvedHref
}`

export interface HomePageContent {
  heroImageUrl?: string
  heroCtaLabel?: string
  heroCtaHref?: string
  whatIsHeading?: string
  whatIsParagraphs?: string[]
  hydrophoneHeading?: string
  hydrophoneIntro?: string
  hydrophoneReportText?: string
  mapEmbedId?: string
  listenLiveLabel?: string
  listenLiveHref?: string
  getInvolvedLabel?: string
  getInvolvedHref?: string
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

/**
 * Hacker Hall of Fame page (Phase 2). Editable copy + the contributor lists.
 * Layout, styling, decorative images, and the link-heavy intro paragraphs stay
 * in the React component (per-field fallback to the hard-coded content).
 */
export const HHOF_PAGE_QUERY = `*[_type == "hackerHallOfFamePage"][0]{
  heroTitle,
  "heroImageUrl": heroImage.asset->url,
  thankYouMessage,
  "hackathonImageUrl": hackathonImage.asset->url,
  "hackathonImageWidth": hackathonImage.asset->metadata.dimensions.width,
  "hackathonImageHeight": hackathonImage.asset->metadata.dimensions.height,
  hackathonCaption,
  introParagraph,
  foundersTitle,
  foundersSubtitle,
  founders[]{name, country, roles, link},
  influencersTitle,
  influencersSubtitle,
  influencerGroups[]{title, contributors[]{name, country, roles, link}},
  podcastTitle,
  podcastSubtitle,
  podcastNames,
  orcaHelloTitle,
  orcaHelloCaption,
  orcaHelloContributors[]{name, country, roles, link},
  individualTitle,
  individualContributors[]{name, country, roles, link},
  supportersTitle,
  supporters[]{name, country, roles, link},
  lowerImages[]{
    "url": image.asset->url,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    caption
  }
}`

export interface Contributor {
  name?: string
  country?: string
  roles?: string[]
  link?: string
}

export interface InfluencerGroup {
  title?: string
  contributors?: Contributor[]
}

export interface HHOFLowerImage {
  url?: string
  width?: number
  height?: number
  caption?: string
}

export interface HHOFPageContent {
  heroTitle?: string
  heroImageUrl?: string
  thankYouMessage?: string
  hackathonImageUrl?: string
  hackathonImageWidth?: number
  hackathonImageHeight?: number
  hackathonCaption?: string
  introParagraph?: string
  foundersTitle?: string
  foundersSubtitle?: string
  founders?: Contributor[]
  influencersTitle?: string
  influencersSubtitle?: string
  influencerGroups?: InfluencerGroup[]
  podcastTitle?: string
  podcastSubtitle?: string
  podcastNames?: string[]
  orcaHelloTitle?: string
  orcaHelloCaption?: string
  orcaHelloContributors?: Contributor[]
  individualTitle?: string
  individualContributors?: Contributor[]
  supportersTitle?: string
  supporters?: Contributor[]
  lowerImages?: HHOFLowerImage[]
}

/**
 * Call Catalog page (Phase 2 — page copy only). The 46-call SRKW dataset stays
 * in `callsData.js`; only the hero, section title/description, and image credit
 * are editable here.
 */
export const CATALOG_PAGE_QUERY = `*[_type == "catalogPage"][0]{
  heroTitle,
  heroDescription,
  "heroImageUrl": heroImage.asset->url,
  sectionTitle,
  sectionDescription,
  imageCredit
}`

export interface CatalogPageContent {
  heroTitle?: string
  heroDescription?: string
  heroImageUrl?: string
  sectionTitle?: string
  sectionDescription?: string
  imageCredit?: string
}

/**
 * Donate / Support page (Phase 2 — V1 only). Hero + the two support cards. The
 * card images are rendered non-`fill` in the card and `fill` in the dialog, so
 * we resolve their asset dimensions for `next/image`. Partner cards stay in
 * `donatePartners.json`.
 */
export const DONATE_PAGE_QUERY = `*[_type == "donatePage"][0]{
  heroTitle,
  heroDescription,
  "heroImageUrl": heroImage.asset->url,
  orcasoundTitle,
  orcasoundMessage,
  "orcasoundImageUrl": orcasoundImage.asset->url,
  "orcasoundImageWidth": orcasoundImage.asset->metadata.dimensions.width,
  "orcasoundImageHeight": orcasoundImage.asset->metadata.dimensions.height,
  volunteersTitle,
  volunteersMessage,
  "volunteersImageUrl": volunteersImage.asset->url,
  "volunteersImageWidth": volunteersImage.asset->metadata.dimensions.width,
  "volunteersImageHeight": volunteersImage.asset->metadata.dimensions.height,
  volunteersButtonHref,
  dialogTitle,
  dialogSubtitle,
  dialogHeading,
  donationOptions[]{ title, description, href, usesCardImage },
  partnersTitle,
  partnersDescription,
  partners[]{
    name,
    "iconUrl": logo.asset->url,
    description,
    linkTo
  }
}`

export interface DonationOption {
  title?: string
  description?: string
  href?: string
  usesCardImage?: 'orcasound' | 'volunteers'
}

export interface DonatePageContent {
  heroTitle?: string
  heroDescription?: string
  heroImageUrl?: string
  orcasoundTitle?: string
  orcasoundMessage?: string
  orcasoundImageUrl?: string
  orcasoundImageWidth?: number
  orcasoundImageHeight?: number
  volunteersTitle?: string
  volunteersMessage?: string
  volunteersImageUrl?: string
  volunteersImageWidth?: number
  volunteersImageHeight?: number
  volunteersButtonHref?: string
  dialogTitle?: string
  dialogSubtitle?: string
  dialogHeading?: string
  donationOptions?: DonationOption[]
  partnersTitle?: string
  partnersDescription?: string
  partners?: DonatePartner[]
}

export interface DonatePartner {
  name?: string
  iconUrl?: string
  description?: string
  linkTo?: string
}
