# Orcasound Young Explorers

A child-friendly Orcasound concept for elementary and middle-school students,
organized around **Hear, Meet, and Protect**.

## Why these files are in `docs/young-explorers`

This folder keeps the hackathon prototype, product specification, and printable
teacher materials together for review. It is not the recommended production
architecture. If Orcasound adopts the concept, the student experience should
be implemented as a dedicated application route such as `/young-explorers` or
`/explore`, reusing Orcahome components and reviewed content.

## Prototype scope

The standalone prototype:

- offers Ocean Explorer (grades 3-5) and Junior Bioacoustician (grades 6-8)
  question sets;
- uses reviewed Southern Resident discrete-call recordings and matching S01-S05
  spectrograms;
- introduces representative J, K, and L pod calls;
- lets students investigate with audio, visual spectrogram evidence, or both;
- explains evidence limits and the role of Orcasound volunteer moderators;
- includes three conservation actions and a locally generated certificate;
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

- `Orcasound Young Explorers Mockup.html` - interactive standalone prototype
- `Orcasound Kids Experience Spec and UI Audit.md` - product specification,
  science guardrails, and beta UI audit
- `Orcasound Teacher Activity Guide.html` - printable teacher packet source
- `Orcasound Teacher Activity Guide.pdf` - eight-page printable packet

Open the mockup HTML in a browser. Keep the teacher HTML and PDF in the same
folder so its relative teacher-resource links continue to work.
