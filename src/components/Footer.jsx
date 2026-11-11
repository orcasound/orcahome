import { AppBar, Box, styled, Typography } from '@mui/material'
import Image from 'next/image'

import facebooklogo from '../../public/images/facebook.png'
import githublogo from '../../public/images/github_invert.png'
import instagramlogo from '../../public/images/instagram.png'
import linkedinlogo from '../../public/images/linkedin.png'
import orcasoundlogo from '../../public/images/logo-white.svg'
import xlogo from '../../public/images/x_invert.png'
import youtubelogo from '../../public/images/youtube.png'
import { ORCASOUND_YOUTUBE_URL } from '../constants/links'
import { pushToDataLayer } from '../utils/gtm'
import Link from './Link'

const currentYear = new Date().getFullYear()

const feedbackFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScsBwU_ZX0W2GUrxJ5JKb3PfR-NmloHxm7zetkyOBC5RM2ajA/viewform'

const StyledTypography = styled(Typography)({
  color: 'white',
  marginRight: '32px',
  '&:hover': {
    textDecoration: 'none',
    color: 'white',
    cursor: 'pointer',
  },
})

const DEFAULT_LEFT_LINKS = [
  {
    label: 'Get Involved',
    url: '/getinvolved',
  },
  {
    label: 'Send Feedback',
    url: feedbackFormUrl,
  },
  {
    label: 'Support',
    url: '/donate',
  },
]

const DEFAULT_RIGHT_LINKS = [
  {
    label: 'About Us',
    url: '/about',
  },

  {
    label: 'Learn',
    url: '/learn',
  },
  {
    label: 'Listen',
    url: 'https://live.orcasound.net/',
  },
  {
    label: 'Blog',
    url: '/blog',
  },
]

const DEFAULT_SOCIAL_LINKS = [
  {
    url: 'https://www.instagram.com/orcasoundapp/',
    platform: 'instagram',
  },
  {
    url: 'https://twitter.com/OrcasoundApp',
    platform: 'x',
  },
  {
    url: 'https://www.facebook.com/OrcasoundApp/',
    platform: 'facebook',
  },
  {
    url: ORCASOUND_YOUTUBE_URL,
    platform: 'youtube',
  },
  {
    url: 'https://github.com/orcasound',
    platform: 'github',
  },
  {
    url: 'https://www.linkedin.com/company/75491849/admin/',
    platform: 'linkedin',
  },
]

const SOCIAL_ICONS = {
  instagram: { icon: instagramlogo, name: 'Instagram' },
  x: { icon: xlogo, name: 'X' },
  facebook: { icon: facebooklogo, name: 'Facebook' },
  youtube: { icon: youtubelogo, name: 'Youtube' },
  github: { icon: githublogo, name: 'Github' },
  linkedin: { icon: linkedinlogo, name: 'Linkedin' },
}

const isExternal = (url) => /^(https?:|mailto:)/i.test(url)
const resolveLinks = (links, defaults) =>
  (links?.length ? links : defaults).map((item) => ({
    ...item,
    external: isExternal(item.url),
  }))

export default function Footer({ footer }) {
  const content = {
    leftHeading: footer?.leftHeading || 'Support Us',
    rightHeading: footer?.rightHeading || 'Learn More',
    navLinksLeftCol: resolveLinks(footer?.leftLinks, DEFAULT_LEFT_LINKS),
    navLinksRightCol: resolveLinks(footer?.rightLinks, DEFAULT_RIGHT_LINKS),
    iconLinks: (footer?.socialLinks?.length
      ? footer.socialLinks
      : DEFAULT_SOCIAL_LINKS
    )
      .filter((item) => Object.hasOwn(SOCIAL_ICONS, item.platform))
      .map((item) => ({ ...item, ...SOCIAL_ICONS[item.platform] })),
  }

  return (
    <Box component="footer">
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        <Mobile {...content} />
      </Box>
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Desktop {...content} />
      </Box>
    </Box>
  )
}

function Mobile({
  leftHeading,
  rightHeading,
  navLinksLeftCol,
  navLinksRightCol,
  iconLinks,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ padding: '20px' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 2,
          }}
        >
          {[
            { heading: leftHeading, links: navLinksLeftCol },
            { heading: rightHeading, links: navLinksRightCol },
          ].map(({ heading, links }, index) => (
            <Box key={index} sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {heading}
              </Typography>
              {links.map((item, linkIndex) => (
                <Link
                  key={`${item.url}-${linkIndex}`}
                  href={item.url}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  sx={{ display: 'block', color: 'white', py: 0.5 }}
                  onClick={() =>
                    pushToDataLayer('footer_nav_click', {
                      link_text: item.label,
                    })
                  }
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
          {iconLinks.map((item, index) => (
            <Link
              key={`${item.platform}-${index}`}
              href={item.url}
              target={isExternal(item.url) ? '_blank' : undefined}
              rel={isExternal(item.url) ? 'noopener noreferrer' : undefined}
              sx={{ display: 'flex', flexShrink: 0 }}
              onClick={() =>
                pushToDataLayer('social_click', { platform: item.name })
              }
            >
              <Image src={item.icon} alt={item.name} width={48} height={48} />
            </Link>
          ))}
        </Box>
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="body2" color="white">
            &copy; {currentYear} Orcasound. All rights reserved.
          </Typography>
        </Box>
      </AppBar>
    </Box>
  )
}

function Desktop({
  leftHeading,
  rightHeading,
  navLinksLeftCol,
  navLinksRightCol,
  iconLinks,
}) {
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
              <Box sx={{ cursor: 'pointer' }}>
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
              <StyledTypography
                variant="h6"
                sx={{ '&:hover': { cursor: 'default' } }}
              >
                {leftHeading}
              </StyledTypography>
            </Box>

            {navLinksLeftCol.map((navLink) => (
              <Box
                key={navLink.label}
                display="flex"
                sx={{
                  margin: '3px',
                  height: '30px',
                }}
              >
                {navLink.external ? (
                  <StyledTypography
                    component={Link}
                    noLinkStyle
                    href={navLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      pushToDataLayer('footer_nav_click', {
                        link_text: navLink.label,
                      })
                    }
                  >
                    {navLink.label}
                  </StyledTypography>
                ) : (
                  <Link href={navLink.url}>
                    <StyledTypography
                      onClick={() =>
                        pushToDataLayer('footer_nav_click', {
                          link_text: navLink.label,
                        })
                      }
                    >
                      {navLink.label}
                    </StyledTypography>
                  </Link>
                )}
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
              <StyledTypography
                variant="h6"
                sx={{ '&:hover': { cursor: 'default' } }}
              >
                {rightHeading}
              </StyledTypography>
            </Box>

            {navLinksRightCol.map((navLink) => (
              <Box
                key={navLink.label}
                display="flex"
                sx={{
                  margin: '3px',
                  height: '30px',
                }}
              >
                {navLink.external ? (
                  <StyledTypography
                    component={Link}
                    noLinkStyle
                    href={navLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      pushToDataLayer('footer_nav_click', {
                        link_text: navLink.label,
                      })
                    }
                  >
                    {navLink.label}
                  </StyledTypography>
                ) : (
                  <Link href={navLink.url}>
                    <StyledTypography
                      onClick={() =>
                        pushToDataLayer('footer_nav_click', {
                          link_text: navLink.label,
                        })
                      }
                    >
                      {navLink.label}
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
                component={Link}
                noLinkStyle
                href={iconLink.url}
                target={isExternal(iconLink.url) ? '_blank' : undefined}
                rel={
                  isExternal(iconLink.url) ? 'noopener noreferrer' : undefined
                }
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
