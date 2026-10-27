import { getClient } from './client'
import { SITE_CHROME_QUERY, type SiteChrome } from './queries'

export async function getSiteChrome(): Promise<SiteChrome | null> {
  try {
    return await getClient(false).fetch<SiteChrome>(SITE_CHROME_QUERY)
  } catch {
    // Missing environment variables and request errors both use shell defaults.
    return null
  }
}
