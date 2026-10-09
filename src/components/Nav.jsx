import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import orcasoundlogo from '../../public/images/logo-white.svg'
import { pushToDataLayer } from '../utils/gtm'
import Link from './Link'

const DEFAULT_NAV_LINKS = [
  {
    label: 'Get Involved',
    url: '/getinvolved',
  },
  {
    label: 'Learn',
    url: '/learn',
  },
  {
    label: 'About Us',
    url: '/about',
  },

  {
    label: 'Listen',
    url: 'https://live.orcasound.net/',
  },
  {
    label: 'Blog',
    url: '/blog',
  },
  {
    label: 'Send Feedback',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScsBwU_ZX0W2GUrxJ5JKb3PfR-NmloHxm7zetkyOBC5RM2ajA/viewform',
  },
]

const isExternal = (url) => /^(https?:|mailto:)/i.test(url)

const Nav = ({ nav }) => {
  const navLinks = (nav?.links?.length ? nav.links : DEFAULT_NAV_LINKS).map(
    (item) => ({ ...item, external: isExternal(item.url) })
  )
  const notifyLabel = nav?.notifyLabel || 'Notify Me'
  const notifyUrl = nav?.notifyUrl || 'https://www.orcasound.net/subscribe/'
  const supportLabel = nav?.supportLabel || 'Support'
  const supportUrl = nav?.supportUrl || '/donate'
  const content = { navLinks, notifyLabel, notifyUrl, supportLabel, supportUrl }
  const theme = useTheme()

  // Mobile vs desktop is switched with CSS breakpoints (not a JS/media-query
  // hook) so the server and the first client render are identical. A JS switch
  // renders the mobile nav on the server (media queries can't be evaluated
  // there) and then swaps to desktop on hydration, which makes the logo visibly
  // jump. Rendering both and toggling `display` avoids that layout shift.
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          position: { xs: 'sticky', lg: 'relative' },
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: { xs: 0, sm: 0.5 },
                display: 'flex',
                justifyContent: { xs: 'flex-start', sm: 'center' },
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: {
                    xs: 'absolute',
                    sm: 'absolute',
                    md: 'absolute',
                    lg: 'static',
                  },
                  left: { xs: '15px', sm: '15px', md: '15px', lg: '0px' },
                }}
              >
                <Link href="/">
                  <Image
                    style={{ width: '40px', height: 'auto', display: 'block' }}
                    src={orcasoundlogo}
                    alt="Orcasound"
                    priority
                  />
                </Link>
              </Box>
            </Box>
            {/* Desktop nav (lg and up) */}
            <Box
              sx={{
                display: { xs: 'none', lg: 'flex' },
                flexGrow: 0.6,
                alignItems: 'center',
              }}
            >
              <Desktop {...content} />
            </Box>
            {/* Mobile nav (below lg) */}
            <Box
              sx={{ display: { xs: 'flex', lg: 'none' }, marginLeft: 'auto' }}
            >
              <Mobile {...content} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
export default Nav

function Mobile({
  navLinks,
  notifyLabel,
  notifyUrl,
  supportLabel,
  supportUrl,
}) {
  const [menuIsOpen, setMenuOpen] = useState(false)
  const handleMenuToggle = () => {
    setMenuOpen(!menuIsOpen)
  }

  const list = (
    <Box
      sx={{ backgroundColor: 'black' }}
      onClick={handleMenuToggle}
      onKeyDown={handleMenuToggle}
    >
      <List
        sx={{
          color: 'white',
          backgroundColor: 'black',
        }}
      >
        {navLinks.map((navLink) =>
          navLink.external ? (
            <ListItem
              key={navLink.label}
              button
              component={Link}
              noLinkStyle
              href={navLink.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderBottom: '1px solid white' }}
              onClick={() =>
                pushToDataLayer('nav_click', {
                  link_text: navLink.label,
                  page_location:
                    typeof window !== 'undefined'
                      ? window.location.pathname
                      : '',
                })
              }
            >
              <ListItemText primary={navLink.label} />
            </ListItem>
          ) : (
            <Link key={navLink.label} href={navLink.url}>
              <ListItem
                button
                sx={{ borderBottom: '1px solid white', color: 'white' }}
                onClick={() =>
                  pushToDataLayer('nav_click', {
                    link_text: navLink.label,
                    page_location:
                      typeof window !== 'undefined'
                        ? window.location.pathname
                        : '',
                  })
                }
              >
                <ListItemText primary={navLink.label} />
              </ListItem>
            </Link>
          )
        )}
        <ListItem
          button
          component={Link}
          noLinkStyle
          href={notifyUrl}
          target={isExternal(notifyUrl) ? '_blank' : undefined}
          rel={isExternal(notifyUrl) ? 'noopener noreferrer' : undefined}
          sx={{ borderBottom: '1px solid white' }}
        >
          <ListItemText primary={notifyLabel} />
        </ListItem>
        {/* Support/donate — desktop has this as a button; mirror it here so
            mobile/tablet users can still reach /donate from the menu. */}
        <Link
          href={supportUrl}
          target={isExternal(supportUrl) ? '_blank' : undefined}
          rel={isExternal(supportUrl) ? 'noopener noreferrer' : undefined}
        >
          <ListItem
            button
            sx={{ color: 'white' }}
            onClick={() =>
              pushToDataLayer('nav_click', {
                link_text: supportLabel,
                page_location:
                  typeof window !== 'undefined' ? window.location.pathname : '',
              })
            }
          >
            <ListItemText primary={supportLabel} />
          </ListItem>
        </Link>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: { xs: 'flex', sm: 'flex' } }}>
      <IconButton
        size="large"
        aria-label={
          menuIsOpen ? 'Close main navigation' : 'Open main navigation'
        }
        aria-controls="mobile-nav-drawer"
        aria-expanded={menuIsOpen}
        aria-haspopup="true"
        onClick={handleMenuToggle}
        color="inherit"
      >
        {menuIsOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
        id="mobile-nav-drawer"
        anchor="top"
        open={menuIsOpen}
        onClose={handleMenuToggle}
        sx={{
          display: { xs: 'flex', sm: 'flex' },
          '& .MuiDrawer-paper': {
            backgroundColor: 'black',
          },
        }}
      >
        <Toolbar sx={{ height: '80px', backgroundColor: 'black' }} />
        {list}
      </Drawer>
    </Box>
  )
}

function Desktop({
  navLinks,
  notifyLabel,
  notifyUrl,
  supportLabel,
  supportUrl,
}) {
  const router = useRouter()

  return (
    <React.Fragment>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 0.5 }}>
        {navLinks.map((navLink) => {
          const isActive = router.pathname === navLink.url
          return (
            <Box
              key={navLink.label}
              sx={{
                position: 'relative',
                margin: 3,
              }}
            >
              {navLink.external ? (
                <Button
                  component={Link}
                  noLinkStyle
                  href={navLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    display: 'block',
                    textTransform: 'none',
                    '&:hover': {
                      textDecoration: '3px rgba(0, 139, 223, 1) wavy underline',
                      textUnderlineOffset: '7px',
                    },
                  }}
                  onClick={() =>
                    pushToDataLayer('nav_click', {
                      link_text: navLink.label,
                      page_location: router.pathname,
                    })
                  }
                >
                  {navLink.label}
                </Button>
              ) : (
                <Link href={navLink.url}>
                  <Button
                    sx={{
                      color: 'white',
                      display: 'block',
                      textTransform: 'none',
                      ...(isActive && {
                        textDecoration:
                          '3px rgba(0, 139, 223, 1) wavy underline',
                        textUnderlineOffset: '7px',
                      }),
                      '&:hover': {
                        textDecoration:
                          '3px rgba(0, 139, 223, 1) wavy underline',
                        textUnderlineOffset: '7px',
                      },
                    }}
                    onClick={() =>
                      pushToDataLayer('nav_click', {
                        link_text: navLink.label,
                        page_location: router.pathname,
                      })
                    }
                  >
                    {navLink.label}
                  </Button>
                </Link>
              )}
            </Box>
          )
        })}
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 0.1 }}>
        <Button
          variant="outlined"
          component={Link}
          noLinkStyle
          href={notifyUrl}
          target={isExternal(notifyUrl) ? '_blank' : undefined}
          rel={isExternal(notifyUrl) ? 'noopener noreferrer' : undefined}
          sx={{
            m: 2,
            color: 'white',
            borderColor: 'white',
            borderStyle: 'solid',
            borderRadius: '100px',
            textTransform: 'none',
            maxwidth: 150,
          }}
          startIcon={
            <NotificationsIcon
              sx={{
                color: 'white',
              }}
            />
          }
        >
          {notifyLabel}
        </Button>
        <Link
          href={supportUrl}
          target={isExternal(supportUrl) ? '_blank' : undefined}
          rel={isExternal(supportUrl) ? 'noopener noreferrer' : undefined}
        >
          <Button
            variant="outlined"
            sx={{
              m: 2,
              color: 'white',
              borderColor: 'white',
              borderStyle: 'solid',
              borderRadius: '100px',
              textTransform: 'none',
              maxwidth: 150,
            }}
            startIcon={
              <VolunteerActivismIcon
                sx={{
                  color: 'white',
                }}
              />
            }
          >
            {supportLabel}
          </Button>
        </Link>
      </Box>
    </React.Fragment>
  )
}
