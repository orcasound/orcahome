import { createClient, type SanityClient } from '@sanity/client'

import { apiVersion, dataset, projectId, readToken } from './env'

let cached: SanityClient | undefined

/**
 * Lazily create the base read client. Built lazily (not at module load) so a
 * build without Sanity env vars doesn't fail; the friendly error only surfaces
 * if the preview route is actually hit while unconfigured.
 */
function baseClient(): SanityClient {
  if (!projectId || !dataset) {
    throw new Error(
      'Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.'
    )
  }
  if (!cached) {
    // useCdn:false — pages fetch via getStaticProps/ISR which already caches,
    // so skip the CDN layer to avoid stale content after an edit.
    cached = createClient({ projectId, dataset, apiVersion, useCdn: false })
  }
  return cached
}

/**
 * Returns a client for reading content. When `draft` is true it reads draft
 * (unpublished) content — requires a read token and bypasses the CDN so editors
 * see the very latest edits.
 */
export function getClient(draft: boolean): SanityClient {
  const c = baseClient()
  if (!draft) return c

  return c.withConfig({
    token: readToken,
    perspective: 'drafts',
    useCdn: false,
  })
}
