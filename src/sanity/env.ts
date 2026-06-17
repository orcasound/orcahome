/**
 * Sanity environment config (Phase 1 — #317).
 *
 * Values are pulled from env vars so we never hard-code the project across
 * environments. See `.env.example` for the keys you need locally.
 */

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`)
  }
  return value
}

export const projectId = required(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const dataset = required(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'NEXT_PUBLIC_SANITY_DATASET'
)

// Use a fixed API date so query behaviour is stable over time.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Server-only token used to read draft (unpublished) content in draft mode.
export const readToken = process.env.SANITY_API_READ_TOKEN || ''
