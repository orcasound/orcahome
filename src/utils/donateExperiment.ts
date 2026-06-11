// Donate A/B test (PR #289) master switch.
//
// The experiment 50/50-splits `/donate` between the V1 and V2 Support pages via
// the `donate-ab-test` cookie, internally rewriting bucketed visitors to
// `/donate-v2`. Per #299 the experiment is paused and V1 is the only version
// that should reach production, so this is `false`: every visitor gets V1,
// nobody is bucketed, and the `/donate-v2` variant URL is not externally
// reachable (#292). The V2 page and components stay in the repo so the test can
// be switched back on by flipping this flag (the V2 four-pathway redesign is
// tracked in #288).
export const DONATE_AB_TEST_ENABLED = false

export const DONATE_AB_COOKIE_NAME = 'donate-ab-test'
