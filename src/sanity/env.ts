/**
 * Sanity environment config (Phase 1 — #317).
 *
 * Values come from env vars (see `.env.example`). These are read at module load
 * but intentionally do NOT throw when missing — otherwise the production build
 * fails on any environment without the vars set (e.g. a fresh Netlify deploy).
 * Validation happens lazily in `client.ts` when a Sanity request is actually
 * made.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || ''

// Use a fixed API date so query behaviour is stable over time.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Server-only token used to read draft (unpublished) content in draft mode.
export const readToken = process.env.SANITY_API_READ_TOKEN || ''
