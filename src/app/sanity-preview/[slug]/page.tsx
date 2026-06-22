/** @jsxImportSource react */
import { draftMode } from 'next/headers'

import { getClient } from '../../../sanity/client'
import { PAGE_BY_SLUG_QUERY, SanityPage } from '../../../sanity/queries'

// Always render on request so draft edits show up immediately.
export const dynamic = 'force-dynamic'

export default async function SanityPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { isEnabled } = await draftMode()

  const page = await getClient(isEnabled).fetch<SanityPage | null>(
    PAGE_BY_SLUG_QUERY,
    { slug }
  )

  if (!page) {
    return (
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <DraftBanner isEnabled={isEnabled} />
        <h1>Page not found</h1>
        <p>
          No published page with slug <code>{slug}</code>.
          {!isEnabled &&
            ' If it only exists as a draft, enable draft mode to preview it.'}
        </p>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.5rem' }}>
      <DraftBanner isEnabled={isEnabled} />

      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.25rem' }}>{page.hero?.heading}</h1>
        {page.hero?.subheading && (
          <p style={{ fontSize: '1.25rem', color: '#555', margin: 0 }}>
            {page.hero.subheading}
          </p>
        )}
      </header>

      {page.paragraph && (
        <p style={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
          {page.paragraph}
        </p>
      )}
    </main>
  )
}

function DraftBanner({ isEnabled }: { isEnabled: boolean }) {
  if (!isEnabled) return null
  return (
    <div
      style={{
        background: '#0a6',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: 6,
        marginBottom: '1.5rem',
        fontSize: '0.9rem',
      }}
    >
      Draft mode is on — showing unpublished edits.{' '}
      <a href="/api/draft-mode/disable" style={{ color: '#fff' }}>
        Exit draft mode
      </a>
    </div>
  )
}
