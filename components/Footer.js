import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import NotificationsIcon from '@mui/icons-material/Notifications'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import useCheckMobileScreen from '../utils/useCheckMobileScreen'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  footer_mobile: {
    backgroundColor: '#080d26',
    padding: '20px',
  },
  typo: {
    color: 'white',
    marginRight: '32px',
    '&:hover': {
      textDecoration: 'none',
      color: 'white',
      cursor: 'pointer',
    },
  },
  div: {
    flexGrow: 1,
  },
  icon: {
    marginRight: '4px',
    color: 'white',
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
    },
  },
  iconContainer: {
    marginRight: '32px',
  },
  footer: {
    backgroundColor: '#080d26',
  },
})

export default function Footer() {
  const classes = useStyles()
  const isMobile = useCheckMobileScreen()

  const iconContainer = (
    <div className={classes.iconContainer}>
      <a href="https://www.facebook.com/OrcasoundApp/" className={classes.icon}>
        <FacebookIcon fontSize="large" />
      </a>
      <a
        href="https://www.linkedin.com/company/75491849/admin/"
        className={classes.icon}
      >
        <LinkedInIcon fontSize="large" />
      </a>
      <a
        href="https://www.youtube.com/channel/UC7b3tOVQg8_fzaZBj4NoAEg"
        className={classes.icon}
      >
        <YouTubeIcon fontSize="large" />
      </a>
      <a href="https://twitter.com/OrcasoundApp" className={classes.icon}>
        <TwitterIcon fontSize="large" />
      </a>
      <a
        href="https://www.instagram.com/orcasoundapp/"
        className={classes.icon}
      >
        <InstagramIcon fontSize="large" />
      </a>
    </div>
  )

  const sendFeedbackLink = (
    <Link href="/">
      <Typography variant="h6" component="a" className={classes.typo}>
        Send Feedback
      </Typography>
    </Link>
  )

  const blogLink = (
    <Link href="/">
      <Typography variant="h6" component="a" className={classes.typo}>
        Blog
      </Typography>
    </Link>
  )

  if (isMobile)
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={classes.footer_mobile}>
          <div>{sendFeedbackLink}</div>
          <div>{blogLink}</div>
          <div>
            <Link href="/">
              <Typography variant="h6" component="a" className={classes.typo}>
                Donate
              </Typography>
            </Link>
          </div>
          {iconContainer}
        </AppBar>
      </Box>
    )
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.footer}>
        <Toolbar>
          <div className={classes.div}></div>
          {sendFeedbackLink}
          {blogLink}
          {iconContainer}
          <Button
            variant="contained"
            sx={{
              color: 'black',
              backgroundColor: 'white',
              borderRadius: '100px',
              '&:hover': { color: 'black', backgroundColor: 'white' },
            }}
            startIcon={<NotificationsIcon sx={{ color: '#F79234' }} />}
          >
            Donate
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
