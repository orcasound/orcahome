import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import NotificationsIcon from '@mui/icons-material/Notifications'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { AppBar, Box, Button, styled, Toolbar, Typography } from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import Link from 'next/link'

import useIsMobile from '../utils/useIsMobile'

const StyledTypography = styled(Typography)({
  color: 'white',
  marginRight: '32px',
  '&:hover': {
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
  },
})

const IconLink = styled('a')({
  marginRight: '4px',
  color: 'white',
  '&:hover': {
    cursor: 'pointer',
    color: 'white',
  },
})

const iconContainer = (
  <Box sx={{ marginRight: '32px' }}>
    <IconLink href="https://www.facebook.com/OrcasoundApp/">
      <FacebookIcon fontSize="large" />
    </IconLink>
    <IconLink href="https://www.linkedin.com/company/75491849/admin/">
      <LinkedInIcon fontSize="large" />
    </IconLink>
    <IconLink href="https://www.youtube.com/channel/UC7b3tOVQg8_fzaZBj4NoAEg">
      <YouTubeIcon fontSize="large" />
    </IconLink>
    <IconLink href="https://twitter.com/OrcasoundApp">
      <TwitterIcon fontSize="large" />
    </IconLink>
    <IconLink href="https://www.instagram.com/orcasoundapp/">
      <InstagramIcon fontSize="large" />
    </IconLink>
  </Box>
)

const sendFeedbackLink = (
  <Link href="/" passHref>
    <StyledTypography variant="h6" component="a">
      Send Feedback
    </StyledTypography>
  </Link>
)

const blogLink = (
  <Link href="/blog" passHref>
    <StyledTypography variant="h6" component="a">
      Blog
    </StyledTypography>
  </Link>
)

export default function Footer() {
  const isMobile = useIsMobile()

  return <Box>{isMobile ? <Mobile /> : <Desktop />}</Box>
}

function Mobile() {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ padding: '20px' }}>
          <div>{sendFeedbackLink}</div>
          <div>{blogLink}</div>
          <div>
            <Link href="/" passHref>
              <StyledTypography variant="h6" component="a">
                Donate
              </StyledTypography>
            </Link>
          </div>
          {iconContainer}
        </AppBar>
      </Box>
    </ThemeProvider>
  )
}

function Desktop() {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}></Box>
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
              startIcon={
                <NotificationsIcon
                  sx={{ color: `${theme.palette.secondary.main}` }}
                />
              }
            >
              Donate
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  )
}
