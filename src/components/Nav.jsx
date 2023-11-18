import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
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
  Typography,
} from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import orcasoundlogo from '../../public/images/orcasoundlogo_2.png'
import useIsMobile from '../utils/useIsMobile'

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
    url: '/listen',
    icon: '',
  },
  {
    name: 'Blog',
    url: '/blog',
    icon: '',
  },
  {
    name: 'Send Feedback',
    url: '/',
    icon: '',
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
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: '69px',
                  height: '66px',
                  margin: '10px',
                  borderRadius: '100px',
                }}
              >
                <Link href="/" passHref>
                  <Box
                    component="a"
                    sx={{
                      width: '60px',
                      height: '44px',
                      top: '20px',
                      left: '15px',
                      borderRadius: '100px',
                      position: 'absolute',
                    }}
                  >
                    <Image src={orcasoundlogo} alt="Orcasound" />
                  </Box>
                </Link>
              </Box>
            </Box>
            {isMobile ? <Mobile /> : <Desktop />}
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
        {navLinks.map((navLink) => (
          <Link key={navLink.name} href={navLink.url} passHref>
            <ListItem button sx={{ borderBottom: '1px solid white' }}>
              <ListItemText primary={navLink.name} />
            </ListItem>
          </Link>
        ))}
        <Link href="/" passHref>
          <ListItem button>
            <ListItemText primary="Notify Me" />
          </ListItem>
        </Link>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
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
        sx={{ display: { xs: 'flex', sm: 'none' } }}
      >
        <Toolbar sx={{ height: '80px' }} />
        {list}
      </Drawer>
    </Box>
  )
}

function Desktop() {
  const theme = useTheme()

  return (
    <React.Fragment>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 0.5 }}>
        {navLinks.map((navLink) => (
          <Box
            key={navLink.name}
            sx={{
              position: 'relative',
              margin: 3,
              '&:hover .MuiButtonBase-root .MuiTypography-root': {
                //color: 'grey',
              },
              '&:hover .MuiBox-root': {
                opacity: 1,
              },
            }}
          >
            <Button
              key={navLink.name}
              sx={{
                color: 'white',
                display: 'block',
                textTransform: 'none',
                '&:hover': {
                  textDecoration: '3px rgba(0, 139, 223, 1) wavy underline',
                  textUnderlineOffset: '7px',
                },
              }}
            >
              <Link href={navLink.url} passHref>
                <Typography
                  component="a"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  {navLink.name}
                </Typography>
              </Link>
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 0.1 }}>
        <Button
          variant="outlined"
          sx={{
            m: 2,
            color: 'white',
            borderColor: 'white',
            borderStyle: 'solid',
            borderRadius: '100px',
            display: { xs: 'none', sm: 'flex' },
            textTransform: 'none',
            width: 150,
            '&:hover': { color: 'black', backgroundColor: 'white' },
          }}
          startIcon={
            <NotificationsIcon
              sx={{
                color: 'white',
                '&:hover': { color: `${theme.palette.secondary.main}` },
              }}
            />
          }
        >
          Notify Me
        </Button>
        <Link href="/donate" passHref>
          <Button
            variant="outlined"
            sx={{
              m: 2,
              color: 'white',
              borderColor: 'white',
              borderStyle: 'solid',
              borderRadius: '100px',
              display: { xs: 'none', sm: 'flex' },
              textTransform: 'none',
              width: 150,
              '&:hover': { color: 'black', backgroundColor: 'white' },
              '&:hover .MuiSvgIcon-root': { color: 'black' },
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
