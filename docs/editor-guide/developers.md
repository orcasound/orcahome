# Notes for developers

Not published on the site; for people changing the code. The editor guides in
this folder are written for non-developers.

## The editor guides

- **Where they live:** one Markdown file per part of the site in
  `docs/editor-guide/`, with `README.md` as the home page. This is the only
  copy; the old Google Docs are no longer maintained.
- **Where editors read them:** on the site at **/editor-guide** (home) and
  **/editor-guide/<file name>** (e.g. `/editor-guide/blog`), built from these
  files by `src/pages/editor-guide/` at build time. The pages aren't in the nav
  and are marked `noindex`. Each Studio form links to its guide there.
- **Screenshots:** `public/editor-guide/images/<guide>/`, referenced as
  `/editor-guide/images/<guide>/<file>.png`.
- **Links from Studio to the guides** are full URLs built from `SITE_URL` in
  `studio/siteUrl.ts` (Studio runs on its own domain, so a bare path like
  `/editor-guide` would open on orcahome.sanity.studio). **When the site moves
  to another domain, change `SITE_URL` and run `npx sanity deploy`.**
- **Links between guides:** write them as `blog.md#section`; the site turns
  them into `/editor-guide/blog#section`.
- **This file** (`developers.md`) and anything else listed in
  `src/lib/editorGuide.js` is not published.
- **Keeping them current:** when a change affects what editors see or do,
  update the matching guide in the same PR. Write for non-developers: tasks
  first ("Write a new post"), exact button names in bold, no code words.
  It's live once merged and deployed.

## Sanity and the site

- **Content vs. code:** Sanity holds the editable content. Layout, styling, and
  behavior stay in the React code (`src/`). Blog posts and project pages share
  their components (`src/components/Post/`) and their body and comments fields
  (`studio/schemaTypes/postFields.ts`), so a new body block type is added once.
- **Schema changes need a Studio deploy.** The fields editors see are defined
  in `studio/schemaTypes/`. After merging a schema change, run
  `npx sanity deploy` from `studio/`. Editing content never needs a deploy.
- **How pages read Sanity:** each page fetches its document in `getStaticProps`
  via `getClient` (`src/sanity/`), with per-field fallback to built-in content,
  so a page renders even with an empty dataset. Every page's `getStaticProps`
  also returns `siteChrome` (`src/sanity/siteChrome.ts`) for the Top Menu and
  Footer; a new page needs that too, or it shows the built-in menu.
- **Environment variables** (set in Vercel production; **not** in Vercel
  Preview, so PR previews show the fallback content):
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION` (optional, defaults to `2024-01-01`)
  - `SANITY_API_READ_TOKEN` (server-only; for previewing drafts)

---

_Questions or something looks broken? ping @Vicky on Zulip._
