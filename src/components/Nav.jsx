import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
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
import { ThemeProvider,useTheme } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import orcasoundlogo from '../../public/images/orcasoundlogo.png'

const navLinks = [
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
    name: 'Learn',
    url: '/learn',
    icon: '',
  },
  {
    name: 'Get Involved',
    url: '/getinvolved',
    icon: '',
  },
]

const Nav = () => {
  const theme = useTheme()
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
          <Link key={navLink.name} href={navLink.url}>
            <ListItem button sx={{ borderBottom: '1px solid white' }}>
              <ListItemText primary={navLink.name} />
            </ListItem>
          </Link>
        ))}
        <Link href="/">
          <ListItem button>
            <ListItemText primary="Notify Me" />
          </ListItem>
        </Link>
      </List>
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  width: '69px',
                  height: '66px',
                  margin: '10px',
                  borderRadius: '100px',
                }}
              >
                <Link href="/">
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
                    <Image src={orcasoundlogo} width={90} height={70} />
                  </Box>
                </Link>
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>
              {navLinks.map((navLink) => (
                <Button
                  key={navLink.name}
                  onClick={handleMenuToggle}
                  sx={{
                    m: 2,
                    color: 'white',
                    display: 'block',
                    textTransform: 'none',
                  }}
                >
                  <Link href={navLink.url}>
                    <Typography
                      variant="h6"
                      component="a"
                      sx={{
                        color: 'white',
                        '&:hover': {
                          textDecoration: 'none',
                          color: 'white',
                        },
                      }}
                    >
                      {navLink.name}
                    </Typography>
                  </Link>
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="top" open={menuIsOpen} onClose={handleMenuToggle}>
                {list}
              </Drawer>
            </Box>

            <Button
              variant="contained"
              sx={{
                color: 'black',
                backgroundColor: 'white',
                borderRadius: '100px',
                '&:hover': { color: 'black', backgroundColor: 'white' },
                display: { xs: 'none', md: 'flex' },
              }}
              startIcon={
                <NotificationsIcon
                  sx={{ color: `${theme.palette.secondary.main}` }}
                />
              }
            >
              Notify Me
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}
export default Nav
