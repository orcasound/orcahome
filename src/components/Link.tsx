// Special component that combines nextjs and material-ui Link into one

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
    role,
    children,
    ...other
  } = props

  const router = useRouter()
  const pathname =
    typeof href === 'string' ? href : href && (href as any).pathname
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
        <Anchor className={className} href={href as any} ref={ref} {...other}>
          {children}
        </Anchor>
      )
    }

    return (
      <MuiLink className={className} href={href as any} ref={ref} {...other}>
        {children}
      </MuiLink>
    )
  }

  function hasAnchorDescendant(element?: React.ReactNode): boolean {
    if (!element) return false
    if (!React.isValidElement(element)) return false
    const el = element as React.ReactElement
    if (el.type === 'a') return true
    if (el.props && el.props.component === 'a') return true
    const kids = el.props && el.props.children
    if (!kids) return false
    if (Array.isArray(kids)) return kids.some((k) => hasAnchorDescendant(k))
    return hasAnchorDescendant(kids)
  }

  const childIsAnchor =
    React.isValidElement(children) &&
    ((children as React.ReactElement).type === 'a' ||
      ((children as React.ReactElement).props &&
        (children as React.ReactElement).props.component === 'a'))
  const childHasAnchorDescendant = hasAnchorDescendant(children)

  // If child already renders an anchor (or contains one), don't render another <a>.
  if (childIsAnchor) {
    const child = children as React.ReactElement
    const childClassName = clsx(child.props.className, className)
    return (
      <NextLink href={href} as={linkAs} legacyBehavior>
        {React.cloneElement(child, {
          className: childClassName,
          ref,
          href,
          ...other,
        })}
      </NextLink>
    )
  }

  if (childHasAnchorDescendant) {
    // attach client navigation handler to root child to avoid nested anchors
    if (React.isValidElement(children)) {
      const child = children as React.ReactElement
      const childClassName = clsx(child.props.className, className)
      const handleClick = (e: React.MouseEvent) => {
        if (child.props && typeof child.props.onClick === 'function')
          child.props.onClick(e)
        if (!e.defaultPrevented) router.push(href as any)
      }
      return React.cloneElement(child, {
        className: childClassName,
        ref,
        onClick: handleClick,
        ...other,
      })
    }
  }

  // Default: render MUI Link inside NextLink (legacyBehavior) so we control anchor element
  if (noLinkStyle) {
    return (
      <NextLink href={href} as={linkAs} legacyBehavior>
        <Anchor className={className} ref={ref} {...other}>
          {children}
        </Anchor>
      </NextLink>
    )
  }

  return (
    <NextLink href={href} as={linkAs} legacyBehavior>
      <MuiLink className={className} ref={ref} {...other}>
        {children}
      </MuiLink>
    </NextLink>
  )
})

export default Link
