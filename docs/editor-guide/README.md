# Updating the website with Sanity

The content on orcasound.tech is managed in **Sanity**, a content management
system (CMS). You edit everything in the **Sanity Studio** (a website) and your
changes go live automatically. You don't touch code, and you don't need a
developer to deploy anything.

This page is the overview. Each part of the site has its own step-by-step guide
with screenshots, linked below. The same guide also opens from the
**📖 Read the step-by-step guide** link at the top of each form in the Studio.

---

## 1. Getting in

1. Go to **https://orcahome.sanity.studio**
2. Sign in with the Google account that was given access. If you can't get in,
   ask to have your account added to the Sanity project. Brendan Thatcher owns
   the project; ping @Vicky or @Brendan on Zulip.

---

## 2. What you can edit

The Studio's left sidebar is grouped the same way as this section: **📖 Start
here** (this page), then **Pages**, **Navigation**, **Projects**, and **Blog**.

### Pages

Each main page is one document in the Studio: you edit its fields (text,
images, lists).

| Page                | Guide                                               |
| ------------------- | --------------------------------------------------- |
| Home                | [Home guide](home.md)                               |
| About               | [About guide](about.md)                             |
| Get Involved (+MOA) | [Get Involved guide](get-involved.md)               |
| Learn               | [Learn guide](learn.md)                             |
| Call Catalog        | [Call Catalog guide](call-catalog.md)               |
| Hacker Hall of Fame | [Hacker Hall of Fame guide](hacker-hall-of-fame.md) |
| Donate / Support    | [Donate / Support guide](donate.md)                 |

### Navigation: Top Menu and Footer

The menu at the top and the footer at the bottom of every page. You can
rename, re-link, reorder, add, and remove links and social icons; changes show
on every page. See the [Top menu & footer guide](navigation-footer.md).

### Projects

Pages about hydrophone locations, research, call catalogs, and outreach,
listed at orcasound.tech/projects. A **collection**: add, edit, and publish as
many as you like. See the [Projects guide](projects.md).

### Blog

News posts at orcasound.tech/blog. Also a collection. See the
[Blog guide](blog.md).

**Authors** (under Blog in the sidebar) are shared by blog posts and projects.
Add a person once, then pick them on any post or project.

---

## 3. Writing a blog post or project page

Blog posts and project pages use the **same body editor**, so everything below
works in both. Details and screenshots are in the
[Blog guide, section 5](blog.md#5-writing-the-body).

| You want to…                                          | Use                                                                                                              |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Format text, add headings, lists, links               | The toolbar, like a word processor                                                                               |
| Add an image, with a caption under it                 | **Image**, then fill in **Caption**                                                                              |
| Put an image on the left or right with text beside it | Open the image: **Position** (Left / Right) and **Size** (Small / Medium)                                        |
| Show several photos side by side                      | **Gallery** (2 or 3 per row)                                                                                     |
| Hide long content until clicked (e.g. references)     | **Collapsible section**                                                                                          |
| Add a table                                           | **Table**                                                                                                        |
| Add an audio clip or a YouTube video                  | Paste its address on its own line and link it to itself ([how](blog.md#adding-an-audio-clip-or-a-youtube-video)) |

---

## 4. Rules that apply everywhere

- **You must Publish.** Nothing goes live until you click the green **Publish**
  button. "Unpublished changes" means your edits are not live yet. Don't leave
  edits sitting as an unpublished draft.
- **Going live takes about a minute.** After publishing, hard-refresh the page
  (Cmd/Ctrl + Shift + R) to see the change.
- **Empty fields fall back to defaults.** On the main pages, a blank field
  shows the site's built-in text or image. Nothing breaks.
- **Images:** click the image field, remove the current image, then drag in or
  upload a new one. Drag the crop/hotspot to control the framing.
- **Don't change an existing slug.** The slug is the web address of a blog post
  or project. Changing it breaks every link to that page, including links from
  other posts, the About page cards, and search engines.

---

## 5. For developers

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
- **Keeping these guides current:** this folder is the only copy (the old
  Google Docs are no longer maintained). When a change affects what editors see
  or do, update the matching guide in the same PR. Screenshots go in
  `images/<page>/`. Studio links to the guides on `main`, so a merged guide
  change reaches editors right away.

---

_Questions or something looks broken? ping @Vicky on Zulip._
