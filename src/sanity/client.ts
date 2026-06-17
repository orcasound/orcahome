import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId, readToken } from './env'

/**
 * Read-only client for published content. Public dataset → no token needed.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

/**
 * Returns a client configured to read draft (unpublished) content. Requires a
 * read token and bypasses the CDN so editors see the very latest edits.
 */
export function getClient(draft: boolean) {
  if (!draft) return client

  return client.withConfig({
    token: readToken,
    perspective: 'drafts',
    useCdn: false,
  })
}
