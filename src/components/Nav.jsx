import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
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
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#080d26' }}>
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
                  <Image
                    src={orcasoundlogo}
                    alt="Orcasound"
                    width={90}
                    height={70}
                  />
                </Box>
              </Link>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 0.1 }}>
            {navLinks.map((navLink) => (
              <Button
                key={navLink.name}
                onClick={handleCloseNavMenu}
                sx={{
                  m: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'none',
                }}
              >
                <Link href={navLink.url} passHref>
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
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navLinks.map((navLink) => (
                <MenuItem key={navLink.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{navLink.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
            startIcon={<NotificationsIcon sx={{ color: '#F79234' }} />}
          >
            Notify Me
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Nav
