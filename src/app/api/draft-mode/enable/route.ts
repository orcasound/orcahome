import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

/**
 * Enables Next.js draft mode, then redirects into the preview route so the
 * editor sees unpublished content. Phase 1 — #317.
 *
 * Example: /api/draft-mode/enable?slug=test-page
 *
 * If SANITY_PREVIEW_SECRET is set, it must be passed as &secret=... — this
 * keeps draft mode from being toggled by anyone who guesses the URL.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const secret = searchParams.get('secret')

  const expectedSecret = process.env.SANITY_PREVIEW_SECRET
  if (expectedSecret && secret !== expectedSecret) {
    return new Response('Invalid preview secret', { status: 401 })
  }

  ;(await draftMode()).enable()

  redirect(slug ? `/sanity-preview/${slug}` : '/sanity-preview/')
}
