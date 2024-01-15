import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import NotificationsIcon from '@mui/icons-material/Notifications'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { AppBar, Box, Button, styled, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import facebooklogo from '../../public/images/facebook.png'
import githublogo from '../../public/images/github_invert.png'
import instagramlogo from '../../public/images/instagram.png'
import linkedinlogo from '../../public/images/linkedin.png'
import licenselogo from '../../public/images/orcasound-all-rights-reserved-2023.png'
import orcasoundlogo from '../../public/images/orcasoundlogo_3.png'
import xlogo from '../../public/images/x_invert.png'
import youtubelogo from '../../public/images/youtube.png'
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

const supportUsLink = (
  <Link href="" passHref>
    <StyledTypography variant="h6" component="a">
      Support Us
    </StyledTypography>
  </Link>
)

const learnMoreLink = (
  <Link href="" passHref>
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
    name: 'Donate',
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
    url: '/listen',
    icon: '',
  },
  {
    name: 'Blog',
    url: '/blog',
    icon: '',
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
    url: '',
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
          <Link href="/donate" passHref>
            <StyledTypography variant="h6" component="a">
              Donate
            </StyledTypography>
          </Link>
        </div>
        {iconContainer}
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
            <Image src={orcasoundlogo} alt="Orcasound"></Image>
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
                <Link href={navLink.url} passHref>
                  <StyledTypography component="a">
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
                <Link href={navLink.url} passHref>
                  <StyledTypography component="a">
                    {navLink.name}
                  </StyledTypography>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>

        <Box display="flex" sx={{ position: 'relative' }}>
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
              <Link key={iconLink.name} href={iconLink.url} passHref>
                <Box
                  component="a"
                  sx={{
                    margin: '10px',
                  }}
                >
                  <Image src={iconLink.icon} alt={iconLink.name}></Image>
                </Box>
              </Link>
            ))}
          </Box>
          <Box>
            <Image src={licenselogo} alt="License"></Image>
          </Box>
        </Box>
      </AppBar>
    </Box>
  )
}
