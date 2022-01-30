import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import orcasoundlogo from '../../images/orcasoundlogo.png'

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

const useStyles = makeStyles({
  nav: {
    backgroundColor: '#080d26',
  },
  navLogoUrl: {
    width: '60px',
    height: '44px',
    top: '20px',
    left: '15px',
    borderRadius: '100px',
    position: 'absolute',
  },
  logo: { flexGrow: 1 },
  logoContainer: {
    backgroundColor: 'white',
    width: '69px',
    height: '66px',
    margin: '10px',
    borderRadius: '100px',
  },
  link: {
    color: 'white',
    '&:hover': {
      textDecoration: 'none',
      color: 'white',
    },
  },
})

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const classes = useStyles()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static" className={classes.nav}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className={classes.logo}>
            <div className={classes.logoContainer}>
              <Link href="/">
                <a className={classes.navLogoUrl}>
                  <Image src={orcasoundlogo} width={90} height={70} />
                </a>
              </Link>
            </div>
          </div>

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
                <Link href={navLink.url}>
                  <Typography
                    variant="h6"
                    component="a"
                    className={classes.link}
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
