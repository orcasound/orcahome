import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Disables Next.js draft mode and returns to a normal (published) view.
 * Phase 1 — #317.
 */
export async function GET() {
  ;(await draftMode()).disable()
  redirect('/')
}
