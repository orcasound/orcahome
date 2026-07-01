/** @jsxImportSource react */

/**
 * Root layout for the App Router tree (Phase 1 Sanity preview — #317).
 *
 * The rest of the site uses the Pages Router (`src/pages`). This minimal App
 * Router layout exists only so the Sanity preview routes can use the modern
 * `draftMode()` API. The two routers coexist; this layout does not affect any
 * existing page.
 */
export const metadata = {
  title: 'Orcahome — Sanity preview',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  )
}
