# Playwright Integration for Cross-Browser Testing — Design Doc

**Status:** Draft for review (revised after reviewer feedback)
**Related:** #361 (BrowserStack), #400
**Author:** Cheryl
**Date:** August 2026
**Repo location:** `docs/playwright-integration-design-doc.md` (submitted via PR so it can be reviewed inline)

---

## 1. Background

BrowserStack was referenced in the README with no clear ownership, setup instructions, or defined testing scope. At the 8/18 biweekly Orcahome dev standup, the team agreed to replace BrowserStack with Playwright for cross-browser testing: free, no account required, and integrates with the codebase and CI.

This will be the first automated test suite in the repo. `package.json` currently has `"test": "echo 'No tests configured'"`, and `ci.yml` already has a Test job that runs `npm run test` on every push and pull request. The socket is wired and waiting.

## 2. Goals

- Automated, repeatable cross-browser testing across the three browser engines and a small set of real product breakpoints
- Tests scoped to a few high-value flows, not exhaustive page coverage
- Reports generated automatically in CI
- Documented setup so any contributor can run tests locally and understand CI results

## 3. Scope

### 3.1 Browser engines

Playwright bundles its own browser builds, tied to the installed Playwright package version. Browser versions are not tracked manually: upgrading the package updates all three engines together.

| Engine   | Represents           | Managed via                          |
| -------- | -------------------- | ------------------------------------ |
| Chromium | Chrome, Edge         | Playwright package version (bundled) |
| Firefox  | Firefox              | Playwright package version (bundled) |
| WebKit   | Safari engine family | Playwright package version (bundled) |

**Note:** Playwright's WebKit is the same engine family as Safari but a different build. A green WebKit check does not mean Safari is verified.

### 3.2 Viewports / breakpoints (proposed, pending confirmation)

OrcaHome is a responsive web app, so what varies for us is rendering engine, viewport, and input method. The breakpoints below are a **proposal**; they should be replaced with the product's real breakpoints (from the codebase's CSS/Tailwind config) once confirmed by the reviewer. Viewport widths are the same on Windows and macOS, so the table is OS-neutral.

| Name                          | Viewport (w x h) | Typical devices                       |
| ----------------------------- | ---------------- | ------------------------------------- |
| Mobile                        | 390 x 844        | Phones                                |
| Tablet                        | 768 x 1024       | Tablets                               |
| Small laptop                  | 1280 x 800       | Small laptops                         |
| Standard laptop               | 1440 x 900       | MacBook Air 13", many Windows laptops |
| Desktop / full-screen browser | 1920 x 1080      | Most common desktop monitor           |

To keep run time down: run all three engines at one viewport (1440 x 900) and run the remaining viewports on Chromium only.

These change when the product's design changes, not on a fixed calendar, so there is no periodic revisit cadence.

### 3.3 Scoped out: device / OS matrix

A device and OS version matrix (iOS/Android versions, specific phones) is **out of scope**. OrcaHome ships only a responsive web app, and OS version adoption curves apply to native apps.

**Trigger to revisit:** if a native mobile app enters the roadmap. At that point the matrix becomes relevant again, but Playwright would not be the tool for it, so it would be a separate testing decision rather than an extension of this one.

**One real exception:** iOS Safari restricts audio playback in ways the bundled desktop WebKit does not reproduce, and Playwright can bypass autoplay policies. A Listen Live test can pass in CI and still fail on a real iPhone. This is covered by an occasional manual check on a real device, not a device matrix.

### 3.4 Flows to test (Tier 1)

1. **Listen Live (first).** The hardest flow and the most important, so it goes first. See 4.2 for the audio strategy.
2. **Home screen (second).** The landing page, and stable. Before locking this in, confirm no open issues are churning the landing page.

**Deferred:** Support / donation flow. It currently has four open issues against it (#333, #288, #385, #386), and tests written against it this month would break as those land. Revisit after #385 and #386 settle.

**Tier 2 (future):** Catalog/search, Notifications signup, donation flow, once those stabilize.

## 4. Approach

### 4.1 Setup

- `npm install -D @playwright/test`, then `npx playwright install` for browser binaries
- `playwright.config.ts` defines the engine and viewport projects explicitly, serving as the versioned source of truth for what is tested
- Tests live in a dedicated folder (`/tests` or `/e2e`), separate from any future unit tests
- `codegen` can be used to record a flow quickly, then cleaned up into a maintainable test
- Add `.nvmrc` so local, VS Code, and CI use the same Node version

### 4.2 Listen Live: audio strategy

Listen Live plays live hydrophone audio. A test that depends on a real stream is flaky by construction and depends on infrastructure outside the repo. So:

- Mock the audio source, or assert on **UI state transitions** (play/pause state, controls, loading and error states) rather than actual playback
- The repo already uses wavesurfer.js, react-audio-player, and use-sound, which provide plenty of UI state to assert on without audio actually playing
- Real audio behavior (especially iOS Safari) is covered by the occasional manual check in 3.3

### 4.3 Accessibility (pulled forward from future work)

Add `@axe-core/playwright` and run automated WCAG assertions on the Tier 1 flows from the start. With #249 and several accessibility issues open, this is worth more right now than a broad browser matrix, and it is cheap once the harness exists. Audits can be scoped to specific components within a page (for example `AxeBuilder({ page }).include('#selector')`).

## 5. CI Integration

- **Trigger:** pull requests only to start. No nightly runs, since nightly failures on a volunteer team have nobody awake to triage them.
- **Merge blocking:** non-blocking for the first four weeks, then blocking for Tier 1 flows once the suite has proven it is not flaky.
- **Binary caching:** cache Playwright browser binaries in `ci.yml`, otherwise CI redownloads three engines on every run.
- **Rollout:** roll out deliberately. The first genuinely red build will land on a pull request that did not cause it.
- **Node version:** use `node-version-file: '.nvmrc'` in `actions/setup-node` so CI matches local.

## 6. Reporting

- Playwright's built-in HTML report (pass/fail per engine and viewport, with screenshots, video, and trace on failure) is the primary report
- Upload as a GitHub Actions artifact with retention **explicitly set to 30 days**
- Do not commit passing reports to the repo

## 7. Documentation and cleanup

- Update `README.md` with install, run, and CI instructions, and a link to this doc
- Remove the BrowserStack reference. It appears in exactly one file: `README.md`.
- This doc is the design record for why Playwright was chosen over BrowserStack

## 8. Decisions (previously open questions)

| Question                     | Decision                                           |
| ---------------------------- | -------------------------------------------------- |
| Real mobile device coverage? | Not in scope. Responsive web only; see 3.3         |
| CI trigger cadence?          | Pull request only to start                         |
| Merge blocking?              | Non-blocking for 4 weeks, then blocking for Tier 1 |
| Report retention?            | GitHub artifacts, 30 days, nothing committed       |

## 9. Open Questions

- **Visual regression / screenshots.** Playwright's `toHaveScreenshot()` compares against a baseline per engine and OS, so it catches changes within one browser over time, not differences between browsers. Dynamic states such as a modal require the test to trigger the state before capturing. Is this in scope for the first phase, or future work? Baselines generated on a Mac will not match CI's rendering, so they would need to be generated in CI.
- **Breakpoint values.** Final values to be confirmed against the product's real breakpoints.

## 10. Future Work

- **Storybook integration:** test component combinations and states in isolation before they reach production. Could pair with Playwright's experimental component-testing mode.
- **Sanity.io integration:** extend coverage to CMS-driven components once the integration stabilizes, and revisit the flow list at that point.
- **Visual regression**, if the open question above resolves in favor of it.
- **Donation flow tests**, after #385 and #386 settle.

## 11. Tasks

Parent story: BrowserStack Update and Support — Establish Cross-Browser Testing Process (#361 / #400). Each ticket is 1 point.

- [ ] 1. Install Playwright and wire up base config (`@playwright/test`, `playwright.config.ts` with Chromium/Firefox/WebKit)
- [ ] 2. Update this doc: replace device/OS matrix with engine + breakpoint table, add the scoped-out note
- [ ] 3. Cache Playwright browser binaries in the CI workflow
- [ ] 4. Write Listen Live test using UI state assertions (no real audio dependency)
- [ ] 5. Add Home screen as the second Tier 1 flow (confirm landing page is stable, write test, document rationale)
- [ ] 6. Add `@axe-core/playwright` and run against Listen Live
- [ ] 7. Set CI trigger to pull request only (no nightly)
- [ ] 8. Set artifact retention to 30 days; confirm nothing is committed to the repo
- [ ] 9. Remove BrowserStack reference from `README.md` and add Playwright setup instructions
- [ ] 10. Open PR with this doc at `docs/playwright-integration-design-doc.md`

## 12. Next Steps

- Confirm breakpoint values with the reviewer
- Open the PR with this doc for inline review
- Start Phase 1 (setup and Listen Live test) once the doc is updated; implementation PRs only need normal review
