/**
 * The public website's address. Studio runs on its own domain
 * (orcahome.sanity.studio), so links from Studio to the site must be full
 * URLs: a bare path like "/editor-guide" would open on the Studio's domain.
 *
 * When the site moves to another domain (e.g. orcasound.net), change this one
 * line and redeploy the Studio (`npx sanity deploy`).
 */
export const SITE_URL = 'https://www.orcasound.tech'

/** Link to an editor guide on the site, e.g. guideUrl('blog'); no argument = the guide home. */
export const guideUrl = (guide?: string) =>
  guide ? `${SITE_URL}/editor-guide/${guide}` : `${SITE_URL}/editor-guide`
