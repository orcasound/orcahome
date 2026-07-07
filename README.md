[![Website](https://img.shields.io/website?url=https%3A%2F%2Forcasound.tech)](https://orcasound.tech/)
[![Zulip](https://img.shields.io/badge/zulip-%23orcahome-blue.svg?logo=zulip)](https://orcasound.zulipchat.com/#narrow/channel/437063-orcahome)
[![License](https://img.shields.io/github/license/orcasound/orcahome)](https://github.com/orcasound/orcahome/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/orcasound/orcahome/blob/master/CONTRIBUTING.md)
[![CI](https://github.com/orcasound/orcahome/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/orcasound/orcahome/actions/workflows/ci.yml)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Developed initially as a Google Summer of Code project in 2021 by [Isabella Macchiavello](https://www.linkedin.com/in/isabella-macchiavello-223338205/). It powers **[orcasound.tech](https://orcasound.tech/)** and is **deployed on Vercel** (previously Netlify).

## Cross-browser testing

This project is tested with BrowserStack. BrowserStack supports Orcasound through its Open Source Program, providing free cross-browser and real-device testing including Safari on macOS and iOS.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a **Pages Router** app: each route is a file under `src/pages/` (e.g. `src/pages/index.jsx` → `/`, `src/pages/getinvolved.jsx` → `/getinvolved`). Page sections are composed from feature components under `src/components/`. Pages auto-update as you edit.

## Content editing (Sanity CMS)

Some page content is managed in **Sanity CMS** so non-developers can edit it without code changes (starting with the About page). The Studio is at **[orcahome.sanity.studio](https://orcahome.sanity.studio)**, and a step-by-step editor guide lives at [`docs/editing-about-content.md`](docs/editing-about-content.md). Pages fetch content from Sanity with a per-field fallback to the hard-coded copy, so they still render if a field (or the whole dataset) is empty. The migration is tracked in the Sanity CMS epic.

## Deployment

Deployed on **Vercel**; the production domain **[orcasound.tech](https://orcasound.tech/)** points to the Vercel deployment. (The site was previously hosted on Netlify.) CI runs build, lint, and format checks on every PR to `main`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Donate page data

The canonical list of Orcasound network partners shown on the Donate page lives at [`src/data/donatePartners.json`](src/data/donatePartners.json). Each partner has four fields:

- `icon`: relative path to the partner logo asset under `public/`
- `name`: partner organization name as displayed on the page
- `description`: short copy displayed under the name
- `linkTo`: destination URL when the user clicks Learn more

The display component at [`src/components/Donate/DonatePartners.jsx`](src/components/Donate/DonatePartners.jsx) imports this data and renders mobile and desktop card variants. To add, remove, reorder, or update a partner, edit the JSON file and open a PR. The component does not need to change.

For any Donate page change, use the [Donate page change issue template](.github/ISSUE_TEMPLATE/donate-page-change.yml) when filing the issue.

The Orcasound support flow (Open Collective plus GitHub Sponsors links shown in the Support modal) currently lives inline at [`src/components/Donate/DonateOrcasound.tsx`](src/components/Donate/DonateOrcasound.tsx) and is tracked for a similar data extraction in a follow-up issue.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). PRs are welcome — please run `npm run lint` and `npm run format` before pushing.
