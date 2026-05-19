import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { AppBar, Box, styled, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import facebooklogo from '../../public/images/facebook.png'
import githublogo from '../../public/images/github_invert.png'
import instagramlogo from '../../public/images/instagram.png'
import linkedinlogo from '../../public/images/linkedin.png'
import orcasoundlogo from '../../public/images/logo-white.svg'
import xlogo from '../../public/images/x_invert.png'
import youtubelogo from '../../public/images/youtube.png'
import { pushToDataLayer } from '../utils/gtm'
import useIsMobile from '../utils/useIsMobile'

const currentYear = new Date().getFullYear()

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
    <IconLink
      href="https://www.facebook.com/OrcasoundApp/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FacebookIcon fontSize="large" />
    </IconLink>
    <IconLink
      href="https://www.linkedin.com/company/75491849/admin/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkedInIcon fontSize="large" />
    </IconLink>
    <IconLink
      href="https://www.youtube.com/channel/UC7b3tOVQg8_fzaZBj4NoAEg"
      target="_blank"
      rel="noopener noreferrer"
    >
      <YouTubeIcon fontSize="large" />
    </IconLink>
    <IconLink
      href="https://twitter.com/OrcasoundApp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <TwitterIcon fontSize="large" />
    </IconLink>
    <IconLink
      href="https://www.instagram.com/orcasoundapp/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <InstagramIcon fontSize="large" />
    </IconLink>
  </Box>
)

const sendFeedbackLink = (
  <Link href="/">
    <StyledTypography variant="h6" component="a">
      Send Feedback
    </StyledTypography>
  </Link>
)

const blogLink = (
  <StyledTypography
    variant="h6"
    component="a"
    href="https://www.orcasound.net/blog/"
    target="_blank"
    rel="noopener noreferrer"
  >
    Blog
  </StyledTypography>
)

const supportUsLink = (
  <Link href="">
    <StyledTypography variant="h6" component="a">
      Support Us
    </StyledTypography>
  </Link>
)

const learnMoreLink = (
  <Link href="">
    <StyledTypography variant="h6" component="a">
      Learn More
    </StyledTypography>
  </Link>
)

const navLinksLeftCol = [
  {
    name: 'Get Involved',
    url: '/getinvolved',
    icon: '',
  },
  {
    name: 'Send Feedback',
    url: '/',
    icon: '',
  },
  {
    name: 'Support',
    url: '/donate',
    icon: '',
  },
]

const navLinksRightCol = [
  {
    name: 'About Us',
    url: '/about',
    icon: '',
  },
  {
    name: 'Learn',
    url: '/learn',
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
]

const iconLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/orcasoundapp/',
    icon: instagramlogo,
  },
  {
    name: 'X',
    url: 'https://twitter.com/OrcasoundApp',
    icon: xlogo,
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/OrcasoundApp/',
    icon: facebooklogo,
  },
  {
    name: 'Youtube',
    url: 'https://www.youtube.com/channel/UC7b3tOVQg8_fzaZBj4NoAEg',
    icon: youtubelogo,
  },
  {
    name: 'Github',
    url: 'https://github.com/orcasound',
    icon: githublogo,
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/company/75491849/admin/',
    icon: linkedinlogo,
  },
]

export default function Footer() {
  const isMobile = useIsMobile()

  return <Box>{isMobile ? <Mobile /> : <Desktop />}</Box>
}

function Mobile() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ padding: '20px' }}>
        <div>{sendFeedbackLink}</div>
        <div>{blogLink}</div>
        <div>
          <Link href="/donate">
            <StyledTypography variant="h6" component="a">
              Support
            </StyledTypography>
          </Link>
        </div>
        {iconContainer}
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="body2" color="white">
            &copy; {currentYear} Orcasound. All rights reserved.
          </Typography>
        </Box>
      </AppBar>
    </Box>
  )
}

function Desktop() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Box display="flex" sx={{ position: 'relative', height: '400px' }}>
          <Box
            sx={{
              flexGrow: 0.5,
              position: 'relative',
              top: '70px',
              left: '50px',
              width: '250px',
              height: '180px',
              margin: '10px',
            }}
          >
            <Link href="/">
              <Box component="a" sx={{ cursor: 'pointer' }}>
                <Image
                  src={orcasoundlogo}
                  alt="Orcasound"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                ></Image>
              </Box>
            </Link>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            sx={{
              position: 'relative',
              top: '70px',
              margin: '10px',
            }}
          >
            <Box
              display="flex"
              sx={{
                height: '50px',
                margin: '3px',
              }}
            >
              {supportUsLink}
            </Box>

            {navLinksLeftCol.map((navLink) => (
              <Box
                key={navLink.name}
                display="flex"
                sx={{
                  margin: '3px',
                  height: '30px',
                }}
              >
                <Link href={navLink.url}>
                  <StyledTypography
                    component="a"
                    onClick={() =>
                      pushToDataLayer('footer_nav_click', {
                        link_text: navLink.name,
                      })
                    }
                  >
                    {navLink.name}
                  </StyledTypography>
                </Link>
              </Box>
            ))}
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            sx={{
              position: 'relative',
              top: '70px',
              left: '40px',
              margin: '10px',
            }}
          >
            <Box
              display="flex"
              sx={{
                height: '50px',
                margin: '3px',
              }}
            >
              {learnMoreLink}
            </Box>

            {navLinksRightCol.map((navLink) => (
              <Box
                key={navLink.name}
                display="flex"
                sx={{
                  margin: '3px',
                  height: '30px',
                }}
              >
                {navLink.external ? (
                  <StyledTypography
                    component="a"
                    href={navLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      pushToDataLayer('footer_nav_click', {
                        link_text: navLink.name,
                      })
                    }
                  >
                    {navLink.name}
                  </StyledTypography>
                ) : (
                  <Link href={navLink.url}>
                    <StyledTypography
                      component="a"
                      onClick={() =>
                        pushToDataLayer('footer_nav_click', {
                          link_text: navLink.name,
                        })
                      }
                    >
                      {navLink.name}
                    </StyledTypography>
                  </Link>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          display="flex"
          sx={{ position: 'relative', flexDirection: 'column' }}
        >
          <Box
            display="flex"
            sx={{
              flexGrow: 0.95,
              width: '360px',
              height: '60px',
              position: 'relative',
              top: '160%',
              bottom: '30px',
              left: '50px',
            }}
          >
            {iconLinks.map((iconLink) => (
              <Box
                key={iconLink.name}
                component="a"
                href={iconLink.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  margin: '10px',
                }}
                onClick={() =>
                  pushToDataLayer('social_click', { platform: iconLink.name })
                }
              >
                <Image
                  src={iconLink.icon}
                  alt={iconLink.name}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                ></Image>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              textAlign: 'center',
              paddingBottom: '20px',
              marginTop: '20px',
            }}
          >
            <Typography variant="body2" color="white">
              &copy; {currentYear} Orcasound. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </AppBar>
    </Box>
  )
}
