/*
 * File : hacker-hall-of-fame.jsx
 * Desc : Page for the Hacker Hall of Fame contributors page.
 *  */

import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Image from 'next/image'

import hackathon from '../../public/images/getinvolved/hackathon.png'
import ContributorSection from '../components/HHOF/ContributorSection'
import HackathonImage from '../components/HHOF/HackathonImage'
import HHOFBanner from '../components/HHOF/HHOFBanner'
import IntroParagraph from '../components/HHOF/Intro'
import LowerImages from '../components/HHOF/LowerImages'
import {
  arcatiaContributors,
  contributors,
  googleContributors,
  individualContributors,
  liveContributors,
  orcaContributors,
  projectManagementContributors,
} from '../data/hackerHallOfFameContributors'

const HackerHallOfFame = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        phone: 375,
        sm: 500,
        tablet: 768,
        md: 1000,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      primary: {
        main: '#111184', // Dark Navy Blue
        contrastText: '#ffffff',
      },
    },
    typography: {
      fontStyling: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '140%',
      },
    },
  })
  const firstParagraph = `We would like to acknowledge the tremendous contributions of time,
            technology, and code that have been made to our open source project.
            Beginning in the fall of 2018, we began participating in hackathons
            in Seattle and at the University of Washington. In summer, 2019, we
            partnered with Microsoft through their amazing hackathon community.
            In 2020, Orcasound became a host organization for Google Summer of
            Code (GSoC).`

  const secondParagraph = (
    <>
      In combination with our{' '}
      <Link href="https://github.com/orcasound" target="_blank" rel="noopener">
        Github repositories{' '}
      </Link>
      , these events have brought many talented programmers, designers,
      engineers, researchers, and “geeks for good” to the project. They have
      made it possible to rapidly develop and refine the{' '}
      <Link
        href="https://www.orcasound.net/portfolio/orcasound-app/"
        target="_blank"
        rel="noopener"
      >
        Orcasound app
      </Link>{' '}
      — a new way to{' '}
      <Link href="https://live.orcasound.net/" target="_blank" rel="noopener">
        listen for whales
      </Link>{' '}
      — based on a{' '}
      <Link
        href="https://www.orcasound.net/2018/04/27/orcasounds-new-live-audio-solution-from-hydrophone-to-headphone-with-a-raspberry-pi-computer-and-hls-dash-streaming-software/"
        target="_blank"
        rel="noopener"
      >
        cutting-edge suite of inexpensive and open source hardware and software
        for live streaming audio data.
      </Link>
    </>
  )

  const thirdParagraph = (
    <>
      So, let’s have a virtual round of applause for the following stand-out
      members of the Orcasound open source community. If you’re inspired by
      their contributions to our{' '}
      <Link href="https://github.com/orcasound" target="_blank" rel="noopener">
        Github repositories{' '}
      </Link>
      or{' '}
      <Link
        href="https://www.democracylab.org/projects/81"
        target="_blank"
        rel="noopener"
      >
        Democracy Lab hackathons
      </Link>
      , don’t hesitate to support the Founders and Influencers directly! Sing
      their praises on social media and networks; join them in hacking for orca
      conservation; reinforce their volunteerism financially.
    </>
  )

  return (
    <div className="hhof-container">
      {/* Banner for the page */}
      <ThemeProvider theme={theme}>
        <HHOFBanner />
      </ThemeProvider>

      {/* First Section for this page- top */}
      <Container maxWidth="md">
        <Stack spacing={2}>
          {/* first paragraph */}
          <IntroParagraph text={firstParagraph} />

          {/*Second paragraph */}
          <IntroParagraph text={secondParagraph} />

          {/*Hackathon image */}
          <HackathonImage />

          {/*Third paragraph after first image */}
          <IntroParagraph text={thirdParagraph} />
        </Stack>

        {/*Founders Box */}

        <ThemeProvider theme={theme}>
          <Box
            id="scroll-link"
            sx={(theme) => ({
              minHeight: '20em',
              widthWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              gap: 1,
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: '20px',
              boxSizing: 'border-box',
              boxShadow: '10px 10px 5px 2px rgba(0,0,0,0.23)',

              [theme.breakpoints.between('phone', 'sm')]: {
                width: '100%',
                height: '80%',
              },
              [theme.breakpoints.between('tablet', 'lg')]: {
                fontSize: 'x-large',
                height: '80%',
                width: '100%',
              },
            })}
          >
            <Typography
              variant="h4"
              sx={(theme) => ({
                [theme.breakpoints.between('tablet', 'lg')]: {
                  fontSize: 'x-large',
                },
              })}
            >
              Founders
            </Typography>
            <Typography variant="fontStyling">
              (Long-Term Contributors)
            </Typography>
            <Typography
              sx={(theme) => ({
                width: '90%',

                [theme.breakpoints.between('tablet', 'lg')]: {
                  fontSize: 'x-large',
                },
              })}
            >
              Like{' '}
              <Link
                sx={{ color: 'white', textDecoration: 'underline' }}
                href="https://www.orcasound.net/join/"
                target="_blank"
                rel="noopener"
              >
                Orcasound organizational members
              </Link>
              (who have their own amazing volunteers!), founders can raise funds
              under the auspices of Orcasound to support their own Orcasound
              efforts or the project in general. The also have shown leadership
              in the community and often have administrative access to key parts
              of the Orcasound infrastructure.
            </Typography>
            <Typography
              variant="fontStyling"
              sx={(theme) => ({
                display: {
                  xs: 'none',
                  sm: 'block',
                },

                width: '90%',
                height: '5em',
                [theme.breakpoints.between('phone', 'sm')]: {
                  width: '100vw',
                  flexDirection: 'column',
                },
                [theme.breakpoints.between('tablet', 'lg')]: {
                  fontSize: 'x-large',
                  display: 'block',
                },
              })}
            >
              Founders can raise funds under the auspices of Orcasound to
              support their own Orcasound efforts or the project in general.
            </Typography>
          </Box>
        </ThemeProvider>
      </Container>
      {/*Founders list */}
      <ThemeProvider theme={theme}>
        <ContributorSection title="" people={contributors} />
      </ThemeProvider>
      {/*End of founder contributors list */}

      {/* Beginning of the influencers list */}

      {/* Influencer's box */}

      <ThemeProvider theme={theme}>
        <Box
          sx={(theme) => ({
            minHeight: '10em',

            width: {
              phone: '95%',
              tablet: '95%',
              lg: '45%',
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backgroundColor: (theme) => theme.palette.primary.main,
            borderRadius: '20px',
            boxSizing: 'border-box',
            boxShadow: '10px 10px 5px 2px rgba(0,0,0,0.23)',
            mx: 'auto',
          })}
        >
          <Typography variant="h4" gutterBottom>
            Influencers
          </Typography>
          <Typography variant="body2">(Major Contributors)</Typography>
          <Typography
            variant="body1"
            sx={(theme) => ({
              textAlign: 'center',
              display: {
                xs: 'block',
                sm: 'none',
              },
              [theme.breakpoints.between('phone', 'sm')]: {
                fontSize: 'small',
              },
              [theme.breakpoints.between('tablet', 'lg')]: {
                display: 'none',
              },
            })}
          >
            Founders can raise funds under the auspices of Orcasound to support
            their own Orcasound efforts or the project in general.
          </Typography>
        </Box>
      </ThemeProvider>

      {/* google participant header */}
      {/* google contributors */}

      <ThemeProvider theme={theme}>
        <ContributorSection
          title="Google Summer of Code (GSoc) Participants"
          people={googleContributors}
        ></ContributorSection>
      </ThemeProvider>

      {/* End of google contributors */}

      {/* Live Listening app & UI team header */}
      {/* Live Listening List */}
      <ThemeProvider theme={theme}>
        <ContributorSection
          title="Live Listening App UI & Development Team"
          people={liveContributors}
        ></ContributorSection>
      </ThemeProvider>

      {/*Arcatia.io Data Cooperative header */}
      {/*Arcatia.io Data Cooperative contributors */}

      <ThemeProvider theme={theme}>
        <ContributorSection
          title="Arcatia.io Data Cooperative"
          people={arcatiaContributors}
        ></ContributorSection>
      </ThemeProvider>

      {/*Project Management Team Header and list*/}
      <ThemeProvider theme={theme}>
        <ContributorSection
          title="Project Management Team"
          people={projectManagementContributors}
        ></ContributorSection>
      </ThemeProvider>

      {/*Podcast header */}

      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: '10em',
            minWidth: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',

              [theme.breakpoints.between('phone', 'sm')]: {
                fontSize: 'medium',
                textAlign: 'center',
                fontWeight: 'bold',
              },
              [theme.breakpoints.between('tablet', 'lg')]: {
                fontSize: 'x-large',
                textAlign: 'center',
                fontWeight: 'bold',
              },
            })}
          >
            PodCast
          </Typography>
          <Typography variant="caption">
            (ML-Assisted Annotation Tool)
          </Typography>
        </Box>
      </ThemeProvider>

      <ThemeProvider theme={theme}>
        <Breadcrumbs
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: '500',
            lineHeight: '140%',

            textAlign: {
              xs: 'center',
              sm: 'center',
            },

            '& .MuiBreadcrumbs-ol': {
              [theme.breakpoints.between('phone', 'sm')]: {
                flexDirection: 'column',
              },
              [theme.breakpoints.between('tablet', 'lg')]: {
                flexDirection: 'row',
              },

              alignItems: {
                xs: 'center',
                sm: 'flex-start',
              },
            },

            [theme.breakpoints.between('phone', 'sm')]: {
              flexDirection: 'column',
            },
            [theme.breakpoints.between('tablet', 'lg')]: {
              flexDirection: 'row',
            },
          })}
          separator={
            <Typography
              sx={(theme) => ({
                [theme.breakpoints.between('phone', 'sm')]: {
                  display: 'none',
                },
              })}
            >
              ●
            </Typography>
          }
          aria-label="breadcrumb"
        >
          <Typography color="text.primary">Prakruti Gogia</Typography>
          <Typography color="text.primary">Akash Mahajan</Typography>
          <Typography color="text.primary">Nithya Govindarajan</Typography>
        </Breadcrumbs>
      </ThemeProvider>

      {/*OrcaHello header */}
      <ThemeProvider theme={theme}>
        <ContributorSection
          title="OrcaHello"
          caption=" (Real-Time Inference System Leads)"
          people={orcaContributors}
        ></ContributorSection>
      </ThemeProvider>

      {/*Individual contributors small header */}
      <ThemeProvider theme={theme}>
        <ContributorSection
          title="Individual Contributors"
          people={individualContributors}
        ></ContributorSection>
      </ThemeProvider>

      {/*final pictures above footer */}
      <ThemeProvider theme={theme}>
        <LowerImages></LowerImages>
      </ThemeProvider>
    </div>
  )
}

export default HackerHallOfFame
