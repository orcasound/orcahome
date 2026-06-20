// Custom Link that combines Next.js client-side navigation with MUI styling.
// Uses modern Next.js Link (no legacyBehavior) — resolves #286.

import { styled } from '@mui/material'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import clsx from 'clsx'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { forwardRef } from 'react'

const Anchor = styled('a')({})

export type LinkProps = {
  activeClassName?: string
  as?: NextLinkProps['as']
  href: NextLinkProps['href']
  linkAs?: NextLinkProps['as']
  noLinkStyle?: boolean
} & Omit<NextLinkProps, 'href'> &
  Omit<MuiLinkProps, 'href'>

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  props,
  ref
) {
  const {
    activeClassName = 'active',
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    children,
    ...other
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href && href.pathname
  const currentPath =
    (router.asPath && String(router.asPath).split('?')[0]) || router.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: currentPath === pathname,
  })

  const isExternal =
    typeof href === 'string' &&
    (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0)

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <Anchor
          className={className}
          href={href}
          ref={ref}
          {...(other as React.HTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Anchor>
      )
    }

    return (
      <MuiLink className={className} href={href} ref={ref} {...other}>
        {children}
      </MuiLink>
    )
  }

  // Internal link: use NextLink for client-side navigation.
  // Modern NextLink renders its own <a>, so we style it directly.

  if (noLinkStyle) {
    return (
      <NextLink
        href={href}
        as={linkAs}
        className={className}
        ref={ref}
        style={{ textDecoration: 'none', color: 'inherit' }}
        {...(other as Omit<
          React.AnchorHTMLAttributes<HTMLAnchorElement>,
          'href'
        >)}
      >
        {children}
      </NextLink>
    )
  }

  // Default: render MUI Link with NextLink as the underlying component.
  // This gives us MUI's styling (underline, color, typography) plus
  // Next.js client-side navigation — no nested <a> elements.
  return (
    <MuiLink
      component={NextLink}
      href={href}
      as={linkAs}
      className={className}
      ref={ref}
      {...other}
    >
      {children}
    </MuiLink>
  )
})

export default Link
