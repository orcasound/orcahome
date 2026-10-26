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

Every part of the site has its own guide. The **Where in the Studio** column
matches the groups in the Studio's left sidebar.

| Part of the site                 | Where in the Studio                                                                                         | What it is                                                                 | Guide                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------- |
| **Blog**                         | Blog → Blog Post                                                                                            | News posts at /blog. A collection: add as many as you like.                | [Blog guide](blog.md)                               |
| **Projects**                     | Projects → Projects                                                                                         | Hydrophones, research, call catalogs, outreach at /projects. A collection. | [Projects guide](projects.md)                       |
| Home                             | Pages → Home Page                                                                                           | One page                                                                   | [Home guide](home.md)                               |
| About                            | Pages → About Page                                                                                          | One page, including the "Our Projects" cards                               | [About guide](about.md)                             |
| Get Involved                     | Pages → Get Involved Page, and Pages → MOA (Memorandum of Agreement) for the agreement text and member list | One page                                                                   | [Get Involved guide](get-involved.md)               |
| Learn                            | Pages → Learn Page                                                                                          | One page                                                                   | [Learn guide](learn.md)                             |
| Call Catalog                     | Pages → Call Catalog Page                                                                                   | The page text around the call list                                         | [Call Catalog guide](call-catalog.md)               |
| Hacker Hall of Fame              | Pages → Hacker Hall of Fame Page                                                                            | One page, including the contributor lists                                  | [Hacker Hall of Fame guide](hacker-hall-of-fame.md) |
| Donate / Support                 | Pages → Donate / Support Page                                                                               | One page                                                                   | [Donate / Support guide](donate.md)                 |
| Top menu and footer (every page) | Navigation → Top Menu, Footer                                                                               | Links and social icons shown on every page                                 | [Top menu & footer guide](navigation-footer.md)     |

**Collections vs. pages:** Blog and Projects are collections. You create a new
document for each post or project. Everything under **Pages** is a single
document per page that you edit; you don't create new ones.

**Authors** (Blog → Author) are shared by blog posts and projects. Add a person
once, then pick them on any post or project.

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
