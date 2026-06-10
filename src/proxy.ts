import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'donate-ab-test'
const VARIANTS = ['v1', 'v2'] as const

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname !== '/donate') {
    return NextResponse.next()
  }

  const existingVariant = req.cookies.get(COOKIE_NAME)?.value
  const variant = VARIANTS.includes(existingVariant as typeof VARIANTS[number])
    ? existingVariant
    : Math.random() < 0.5
    ? 'v1'
    : 'v2'

  const url = req.nextUrl.clone()
  url.pathname = variant === 'v2' ? '/donate-v2' : '/donate'

  const response = NextResponse.rewrite(url)

  if (!existingVariant) {
    response.cookies.set(COOKIE_NAME, variant as string, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  }

  return response
}
