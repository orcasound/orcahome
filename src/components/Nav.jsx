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
import useIsMobile from '../utils/useIsMobile'
import Link from './Link'

const navLinks = [
  {
    name: 'Get Involved',
    url: '/getinvolved',
    icon: '',
  },
  {
    name: 'Learn',
    url: '/learn',
    icon: '',
  },
  {
    name: 'About Us',
    url: '/about',
    icon: '',
  },

  {
    name: 'Listen',
    url: 'https://live.orcasound.net/',
    icon: '',
    external: true,
  },
  {
    name: 'Blog',
    url: 'https://www.orcasound.net/blog/',
    icon: '',
    external: true,
  },
  {
    name: 'Send Feedback',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLScsBwU_ZX0W2GUrxJ5JKb3PfR-NmloHxm7zetkyOBC5RM2ajA/viewform',
    icon: '',
    external: true,
  },
]

const Nav = () => {
  const theme = useTheme()
  const isMobile = useIsMobile()

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
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
              <Box display="flex" justifyContent="center">
                <Link href="/">
                  <Image
                    style={{ width: '60px', height: 'auto' }}
                    src={orcasoundlogo}
                    alt="Orcasound"
                  />
                </Link>
              </Box>
            </Box>
            {isMobile ? (
              <Box sx={{ marginLeft: 'auto' }}>
                <Mobile />
              </Box>
            ) : (
              <Desktop />
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
export default Nav

function Mobile() {
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
              key={navLink.name}
              button
              component="a"
              href={navLink.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ borderBottom: '1px solid white' }}
              onClick={() =>
                pushToDataLayer('nav_click', {
                  link_text: navLink.name,
                  page_location:
                    typeof window !== 'undefined'
                      ? window.location.pathname
                      : '',
                })
              }
            >
              <ListItemText primary={navLink.name} />
            </ListItem>
          ) : (
            <Link key={navLink.name} href={navLink.url}>
              <ListItem
                button
                sx={{ borderBottom: '1px solid white' }}
                onClick={() =>
                  pushToDataLayer('nav_click', {
                    link_text: navLink.name,
                    page_location:
                      typeof window !== 'undefined'
                        ? window.location.pathname
                        : '',
                  })
                }
              >
                <ListItemText primary={navLink.name} />
              </ListItem>
            </Link>
          )
        )}
        <ListItem
          button
          component="a"
          href="https://www.orcasound.net/subscribe/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ListItemText primary="Notify Me" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: { xs: 'flex', sm: 'flex' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuToggle}
        color="inherit"
      >
        {menuIsOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <Drawer
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

function Desktop() {
  const router = useRouter()

  return (
    <React.Fragment>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 0.5 }}>
        {navLinks.map((navLink) => {
          const isActive = router.pathname === navLink.url
          return (
            <Box
              key={navLink.name}
              sx={{
                position: 'relative',
                margin: 3,
              }}
            >
              {navLink.external ? (
                <Button
                  component="a"
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
                      link_text: navLink.name,
                      page_location: router.pathname,
                    })
                  }
                >
                  {navLink.name}
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
                        link_text: navLink.name,
                        page_location: router.pathname,
                      })
                    }
                  >
                    {navLink.name}
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
          component="a"
          href="https://www.orcasound.net/subscribe/"
          target="_blank"
          rel="noopener noreferrer"
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
          Notify Me
        </Button>
        <Link href="/donate">
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
            Support
          </Button>
        </Link>
      </Box>
    </React.Fragment>
  )
}
