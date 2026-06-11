import { NextRequest, NextResponse } from 'next/server'

import {
  DONATE_AB_COOKIE_NAME,
  DONATE_AB_TEST_ENABLED,
} from './utils/donateExperiment'

const VARIANTS = ['v1', 'v2'] as const

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // `/donate-v2` is only ever meant to be the internal rewrite target of the
  // A/B test, never a directly reachable, indexable URL. Redirect external /
  // direct hits to the canonical `/donate` so the variant can't be crawled,
  // shared, or used to bypass bucketing (#292). The proxy does not re-run on
  // its own internal rewrite, so this never interferes with the bucketed
  // `/donate` → `/donate-v2` path when the test is enabled.
  if (pathname === '/donate-v2') {
    const url = req.nextUrl.clone()
    url.pathname = '/donate'
    return NextResponse.redirect(url)
  }

  if (pathname !== '/donate') {
    return NextResponse.next()
  }

  // Experiment paused: serve V1 to everyone, no bucketing, no cookie (#299).
  if (!DONATE_AB_TEST_ENABLED) {
    return NextResponse.next()
  }

  const existingVariant = req.cookies.get(DONATE_AB_COOKIE_NAME)?.value
  const variant = VARIANTS.includes(existingVariant as typeof VARIANTS[number])
    ? existingVariant
    : Math.random() < 0.5
    ? 'v1'
    : 'v2'

  const url = req.nextUrl.clone()
  url.pathname = variant === 'v2' ? '/donate-v2' : '/donate'

  const response = NextResponse.rewrite(url)

  if (!existingVariant) {
    response.cookies.set(DONATE_AB_COOKIE_NAME, variant as string, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  }

  return response
}
