# Updating the website with Sanity (overview)

> **Editors:** this Markdown file is a repository reference. The authoritative,
> up-to-date guides for editors are the **Google Doc versions** in the shared
> Drive folder. If the two ever differ, the Google Docs win.

The content on orcasound.tech is managed in **Sanity**, a content management
system (CMS). You edit everything in the **Sanity Studio** (a website) and your
changes go live automatically — you do not touch code, and you do not need a
developer to deploy anything.

This page is the overview. Each page has its own step-by-step guide, linked
below.

---

## 1. Getting in

1. Go to **https://orcahome.sanity.studio**
2. Sign in with the Google account that was given access. If you can't get in,
   ask to have your account added to the Sanity project. Brendan Thatcher owns
   the project; ping @Vicky or @Brendan on Zulip.

---

## 2. Two kinds of content

### Fixed pages

Each main page is a single document in the Studio — you edit its fields (text,
images, lists). Pick the page you want to edit:

| Page                | Guide                                                            |
| ------------------- | ---------------------------------------------------------------- |
| Home                | [editing-home-content.md](editing-home-content.md)               |
| About               | [editing-about-content.md](editing-about-content.md)             |
| Learn               | [editing-learn-content.md](editing-learn-content.md)             |
| Call Catalog        | [editing-catalog-content.md](editing-catalog-content.md)         |
| Get Involved        | [editing-getinvolved-content.md](editing-getinvolved-content.md) |
| Hacker Hall of Fame | [editing-hhof-content.md](editing-hhof-content.md)               |
| Donate / Support    | [editing-donate-content.md](editing-donate-content.md)           |

### Blog

The blog is different: it's a **collection of posts** you can add, edit, and
publish yourself (not a single fixed document). See
[editing-blog-content.md](editing-blog-content.md).

---

## 3. Rules that apply everywhere

These are the same no matter which page or post you're editing:

- **You must Publish.** Nothing goes live until you click the green **Publish**
  button. If you see "Unpublished changes", your edits are not live yet — click
  Publish. Don't leave edits sitting as an unpublished draft.
- **Empty fields fall back to defaults.** If you leave a field blank, the site
  shows its built-in default text/image — nothing breaks. Fill the field in to
  override it.
- **Images:** click the image field, remove the current image, then drag in or
  upload a new one. You can drag the crop/hotspot to control framing.
- **Going live takes ~1 minute.** After you publish, refresh the page with a
  hard refresh (Cmd/Ctrl + Shift + R) to see the change.
- **Don't change existing links/slugs.** For the blog especially, changing a
  post's slug changes its web address and breaks existing links to it.

---

## 4. For developers

Most of the above is content only. A few things do need a developer:

- **Content vs. code:** Sanity holds the editable content. Page layout, styling,
  and behavior stay in the React code (`src/`). Editing content never touches
  code.
- **Schema changes need a deploy.** The _fields_ an editor sees are defined in
  `studio/schemaTypes/`. If you add/rename/remove a field (or a whole document
  type), run `npx sanity deploy` from `studio/` so the Studio picks it up.
  (Editing content values does **not** need a deploy — only schema/structure
  changes do.)
- **Environment variables** (already set in Vercel):
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`
  - `SANITY_API_READ_TOKEN` (server-only; used to preview draft content)
- **How pages read Sanity:** each page fetches its document in `getStaticProps`
  via `getClient` (`src/sanity/`), with per-field fallback to the built-in
  default, so a page still renders even if a field (or the whole dataset) is
  empty.

---

_Questions or something looks broken? ping @Vicky on Zulip._
