import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import FooterStyles from '../styles/Footer.module.css'
import Link from 'next/link'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import NotificationsIcon from '@mui/icons-material/Notifications'
import FacebookIcon from '@mui/icons-material/Facebook'
import RedditIcon from '@mui/icons-material/Reddit'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={FooterStyles.appbar}>
        <Toolbar>
          <div className={FooterStyles.div}></div>
          <Link href="/">
            <Typography
              variant="h6"
              component="a"
              className={FooterStyles.typo}
            >
              Send Feedback
            </Typography>
          </Link>
          <Link href="/">
            <Typography
              variant="h6"
              component="a"
              // sx={{ color: 'white' }}
              className={FooterStyles.typo}
            >
              Blog
            </Typography>
          </Link>
          <div className={FooterStyles.iconContainer}>
            <a
              href="https://www.facebook.com/OrcasoundApp/"
              className={FooterStyles.icon}
            >
              <FacebookIcon fontSize="large" />
            </a>
            <a href="/">
              <RedditIcon fontSize="large" className={FooterStyles.icon} />
            </a>
            <a
              href="https://www.linkedin.com/company/75491849/admin/"
              className={FooterStyles.icon}
            >
              <LinkedInIcon fontSize="large" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC7b3tOVQg8_fzaZBj4NoAEg"
              className={FooterStyles.icon}
            >
              <YouTubeIcon fontSize="large" />
            </a>
            <a
              href="https://twitter.com/OrcasoundApp"
              className={FooterStyles.icon}
            >
              <TwitterIcon fontSize="large" />
            </a>
            <a
              href="https://www.instagram.com/orcasoundapp/"
              className={FooterStyles.icon}
            >
              <InstagramIcon fontSize="large" />
            </a>
          </div>
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
