[![Zulip](https://img.shields.io/badge/zulip-%23orcahome-blue.svg?logo=zulip)](https://orcasound.zulipchat.com/#narrow/channel/437063-orcahome)
[![License](https://img.shields.io/github/license/orcasound/orcahome)](https://github.com/orcasound/orcahome/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/orcasound/orcahome/blob/master/CONTRIBUTING.md)
[![CI](https://github.com/orcasound/orcahome/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/orcasound/orcahome/actions/workflows/ci.yml)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Developed initially as a Google Summer of Code project in 2021 by [Isabella Macchiavello](https://www.linkedin.com/in/isabella-macchiavello-223338205/), the code is deployed via Vercel.

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

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Donate page data

The canonical list of Orcasound network partners shown on the Donate page lives at [`src/data/donatePartners.json`](src/data/donatePartners.json). Each partner has four fields:

- `icon`: relative path to the partner logo asset under `public/`
- `name`: partner organization name as displayed on the page
- `description`: short copy displayed under the name
- `linkTo`: destination URL when the user clicks Learn more

The display component at [`src/components/Donate/DonatePartners.jsx`](src/components/Donate/DonatePartners.jsx) imports this data and renders mobile and desktop card variants. To add, remove, reorder, or update a partner, edit the JSON file and open a PR. The component does not need to change.

For any Donate page change, use the [Donate page change issue template](.github/ISSUE_TEMPLATE/donate-page-change.yml) when filing the issue.

The Orcasound support flow (Open Collective plus GitHub Sponsors links shown in the Support modal) currently lives inline at [`src/components/Donate/DonateOrcasound.tsx`](src/components/Donate/DonateOrcasound.tsx) and is tracked for a similar data extraction in a follow-up issue.

# Contributing

``
