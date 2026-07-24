[![Zulip](https://img.shields.io/badge/zulip-%23orcahome-blue.svg?logo=zulip)](https://orcasound.zulipchat.com/#narrow/channel/437063-orcahome)
[![License](https://img.shields.io/github/license/orcasound/orcahome)](https://github.com/orcasound/orcahome/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/orcasound/orcahome/blob/master/CONTRIBUTING.md)
[![CI](https://github.com/orcasound/orcahome/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/orcasound/orcahome/actions/workflows/ci.yml)

# Orcahome

Orcahome is the [Orcasound](https://www.orcasound.net/) Product Team's proof-of-concept web app (deployed at [orcasound.tech](https://orcasound.tech)), used to prototype and showcase features for the wider Orcasound ecosystem. It is a [Next.js](https://nextjs.org/) app, developed initially as a Google Summer of Code project in 2021 by [Isabella Macchiavello](https://linkedin.com/in/isabella-macchiavello-223338205/), and is deployed via Vercel.

## Quick links

- [Dev dashboard](https://orcasound.github.io/orcahome/dev-status.html) — setup guide, open dev issues, who is on what, and the next team sync
- [Zulip: #orcahome](https://orcasound.zulipchat.com/#narrow/channel/437063-orcahome) — team chat and where dev work is assigned
- [Open issues](https://github.com/orcasound/orcahome/issues) — the spec for each piece of work is its GitHub issue

## New contributors

New here? Start with the [Orcahome dev dashboard](https://orcasound.github.io/orcahome/dev-status.html). It walks you through setup (Zulip, GitHub, running locally), shows the open dev issues and who is on what, and lists the next team sync so you can join and get oriented before picking up an issue. Dev work is assigned by the dev lead on Zulip, not self-claimed, so say hi there first.

## Tech stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (primarily the Pages Router; the App Router is used for the Sanity preview and draft-mode API routes)
- **UI:** [React](https://react.dev/) 18, [MUI](https://mui.com/) v5, and [Emotion](https://emotion.sh/) for styling
- **Language:** TypeScript (the codebase mixes `.tsx` and legacy `.jsx` files)
- **Content:** [Sanity](https://www.sanity.io/) headless CMS via `@sanity/client`, with the Sanity Studio in [`studio/`](studio/)
- **Audio & visualization:** [wavesurfer.js](https://wavesurfer.xyz/), `react-audio-player`, `use-sound`, and `react-zoom-pan-pinch` (for spectrogram pan/zoom)
- **Tooling:** ESLint, Prettier, and Husky + lint-staged (pre-commit)
- **Runtime:** Node 20.9.0 (see [`.node-version`](.node-version))
- **Hosting & CI:** Vercel for deploys; GitHub Actions ([`ci.yml`](.github/workflows/ci.yml)) runs Build, Format, Lint, and Test on each PR

## Project structure

```
src/
  pages/        Pages Router routes (home, about, catalog, donate, etc.)
  app/          App Router routes (Sanity draft-mode API + preview)
  components/   React components, grouped by page/feature
  data/         Static JSON/JS content (e.g. donate partners, HHOF contributors)
  sanity/       Sanity client, env, and GROQ queries
  styles/       Global styles
  utils/        Shared helpers (e.g. the donate A/B experiment config)
  proxy.ts      Middleware for the /donate A/B experiment bucketing
studio/         Sanity Studio (schemas + config) for editing CMS content
docs/           Static status dashboards (dev-status.html, ux-status.html)
public/         Static assets (audio, images)
```

## Routes

| Route                     | Source                                    | Notes                                                        |
| ------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| `/`                       | `src/pages/index.jsx`                     | Home                                                         |
| `/about`                  | `src/pages/about.jsx`                     | About page (content editable via Sanity)                     |
| `/catalog`                | `src/pages/catalog.jsx`                   | Call catalog with spectrograms and audio                     |
| `/donate`                 | `src/pages/donate.jsx`                    | Donate page (A/B test entry point, bucketed in `proxy.ts`)   |
| `/donate-v2`              | `src/pages/donate-v2.jsx`                 | Internal A/B variant only; direct hits redirect to `/donate` |
| `/getinvolved`            | `src/pages/getinvolved.jsx`               | Ways to get involved                                         |
| `/hacker-hall-of-fame`    | `src/pages/hacker-hall-of-fame.jsx`       | Contributor hall of fame                                     |
| `/learn`                  | `src/pages/learn.jsx`                     | Learn/education content                                      |
| `/sanity-preview/[slug]`  | `src/app/sanity-preview/[slug]/page.tsx`  | Draft preview of Sanity content                              |
| `/api/draft-mode/enable`  | `src/app/api/draft-mode/enable/route.ts`  | Enables Next.js draft mode for Sanity previews               |
| `/api/draft-mode/disable` | `src/app/api/draft-mode/disable/route.ts` | Disables draft mode                                          |

## Getting started

### Prerequisites

- Node 20.9.0 (see [`.node-version`](.node-version); a version manager like `nvm` or `fnm` will pick this up)
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Pages live in `src/pages` and auto-update as you edit.

### Environment variables

Sanity-backed content (e.g. the About page and previews) needs environment variables. Copy the example file and fill in the values:

```bash
cp .env.example .env.local
```

`.env.local` is gitignored. The app is designed to build without these set — Sanity is created lazily, and a friendly error only surfaces if a preview route is hit while unconfigured. See [`.env.example`](.env.example) for the full list and where to get a read token.

## Available scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the development server             |
| `npm run build`        | Production build                         |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Run ESLint                               |
| `npm run lint:fix`     | Run ESLint with autofix                  |
| `npm run format`       | Format the codebase with Prettier        |
| `npm run format:check` | Check formatting without writing changes |

## Content management (Sanity)

Editable content is managed in [Sanity](https://www.sanity.io/). The Studio lives in [`studio/`](studio/) (see [`studio/README.md`](studio/README.md) for running it). The web app reads content through the client in [`src/sanity/`](src/sanity/), using Incremental Static Regeneration so published edits appear without a redeploy. Draft mode lets editors preview unpublished content via the `/api/draft-mode/*` routes and `/sanity-preview/[slug]`.

## Donate page data

The canonical list of Orcasound network partners shown on the Donate page lives at [`src/data/donatePartners.json`](src/data/donatePartners.json). Each partner has four fields:

- `icon`: relative path to the partner logo asset under `public/`
- `name`: partner organization name as displayed on the page
- `description`: short copy displayed under the name
- `linkTo`: destination URL when the user clicks Learn more

The display component at [`src/components/Donate/DonatePartners.jsx`](src/components/Donate/DonatePartners.jsx) imports this data and renders mobile and desktop card variants. To add, remove, reorder, or update a partner, edit the JSON file and open a PR. The component does not need to change.

For any Donate page change, use the [Donate page change issue template](.github/ISSUE_TEMPLATE/donate-page-change.yml) when filing the issue.

The Orcasound support flow (Open Collective plus GitHub Sponsors links shown in the Support modal) currently lives inline at [`src/components/Donate/DonateOrcasound.tsx`](src/components/Donate/DonateOrcasound.tsx) and is tracked for a similar data extraction in a follow-up issue.

## Cross-browser testing

This project is tested with BrowserStack. BrowserStack supports Orcasound through its Open Source Program, providing free cross-browser and real-device testing including Safari on macOS and iOS.

## Contributing

Contributions are welcome. Dev work is assigned by the dev lead on Zulip rather than self-claimed, so introduce yourself in the [#orcahome Zulip channel](https://orcasound.zulipchat.com/#narrow/channel/437063-orcahome) and check the [dev dashboard](https://orcasound.github.io/orcahome/dev-status.html) for open issues before starting. The spec for each task is its GitHub issue. Please open PRs against `main`; CI will run Build, Format, Lint, and Test.
