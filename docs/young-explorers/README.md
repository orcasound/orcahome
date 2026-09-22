# Orcasound Young Explorers

A child-friendly Orcasound concept for elementary and middle-school students,
organized around **Hear, Meet, and Protect**.

## Where these files live

The prototype pages and their media are served as static files from
`public/young-explorers/`, so they can be opened directly on the site:

- `/young-explorers/mockup.html` - interactive standalone prototype
- `/young-explorers/option-b.html` - guided elementary alternative
- `/young-explorers/kiosk.html` - touch-friendly kiosk variant
- `/young-explorers/teacher-guide.html` and `/young-explorers/teacher-guide.pdf`

This README and the product specification stay in `docs/young-explorers/`.

These static pages are a prototype for review, not the recommended production
architecture. If Orcasound adopts the concept, the student experience should
be implemented as a dedicated application route such as `/young-explorers` or
`/explore`, reusing Orcahome components and reviewed content.

## Prototype scope

The standalone prototype:

- offers three short, listen-first Ocean Explorer activities for grades 3-5
  and five detailed Junior Bioacoustician evidence questions for grades 6-8;
- uses shorter instructions and simpler vocabulary throughout the Ocean
  Explorer pod game, conservation cards, progress panel, and next-step links,
  while retaining detailed science wording in Junior Bioacoustician mode;
- uses reviewed Southern Resident discrete-call recordings and matching S01-S05
  spectrograms;
- serves local three-second classroom editions of S01-S05, S16, and S19 from
  `audio/`; shorter source calls use neutral padding rather than repeating or
  fabricating whale sounds, while S03 uses a three-second excerpt;
- turns S03, S16, and S19 into a repertoire-mapping activity; students hear a
  call and submit one documented pod match, with K or L accepted for shared call
  S16, L for S19, and J for S03;
- adds a tick to a Call Passport badge only after a valid submitted match;
- uses Orcahome observation photographs to teach that pods are family groups,
  not visually different orca types, and that a photo alone does not prove pod
  membership;
- lets students investigate with audio, visual spectrogram evidence, or both;
- loads spectrograms and observation photographs from the app's repository-local
  `/images` route backed by `public/images`, so the visual activities do not
  depend on beta or raw GitHub URLs;
- explains evidence limits and the role of Orcasound volunteer moderators;
- includes three conservation actions and short simulations about underwater
  noise, the salmon journey through the food web, and clean water; the
  videos include captions and clearly labeled simulation audio, and the
  clean-water story uses a locally generated female voice-over;
- requires no student account, upload, analytics, or personal-data collection.

Bigg's killer whales, echolocation clicks, buzzes, and non-orca control sounds
are outside the current prototype. They should be added only as a separately
curated and subject-matter-reviewed content tier.

## Progress and shared devices

Progress and certificate text exist only in the current page session and clear
when the page is refreshed or closed. This is appropriate for a static review
prototype, not durable student tracking. A production classroom or kiosk
experience should provide an explicit **Start over** control and automatically
clear prior visitor data.

## Files

In `public/young-explorers/`:

- `mockup.html` - interactive standalone prototype
- `kiosk.html` - touch-friendly Option A variant with a tap-to-begin screen,
  fullscreen and confirmed start-over controls, blocked external navigation,
  and an automatic reset warning after four and a half minutes without
  activity
- `option-b.html` - guided elementary alternative with an illustrated title
  page; it shows Listen, Match Pods, Help Orcas, and Certificate one at a time
  and includes tap-friendly Word Help
- `teacher-guide.html` - printable teacher packet source
- `teacher-guide.pdf` - eight-page printable packet
- `audio/` - seven three-second WAV clips derived from the corresponding
  Orcasound call recordings
- `videos/` - three MP4 conservation simulations, poster images, and caption
  files

In `docs/young-explorers/`:

- `spec-and-ui-audit.md` - product specification, science guardrails, and beta
  UI audit
- `README.md` - this file

The pages use relative links for audio, video, and the teacher guide, and
root-relative `/images/...` links for photographs and spectrograms from
`public/images`. Keep the files together in `public/young-explorers/` so those
links keep working.
