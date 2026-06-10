/*
 * File : hacker-hall-of-fame.jsx
 * Desc : Page for the Hacker Hall of Fame contributors page.
 *  */

import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material'

import ContributorSection from '../components/HHOF/ContributorSection'
import HackathonImage from '../components/HHOF/HackathonImage'
import HHOFBanner from '../components/HHOF/HHOFBanner'
import {
  foundersHeader,
  influencersHeader,
  podcastHeader,
} from '../components/HHOF/hhofSectionHeaders'
import IntroParagraph from '../components/HHOF/Intro'
import LowerImages from '../components/HHOF/LowerImages'
import SectionHeader from '../components/HHOF/SectionHeader'
import {
  arcatiaContributors,
  contributors,
  googleContributors,
  individualContributors,
  liveContributors,
  orcaContributors,
  projectManagementContributors,
} from '../data/hackerHallOfFameContributors'

const contributorRail = {
  listWidth: '80%',
  listMaxWidth: 800,
}

const HackerHallOfFame = () => {
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

  // Influencer-tier sub-sections rendered between the Influencers and PodCast
  // headers. They share the same contributor rail as the other lists so the
  // name and role columns keep a consistent visual anchor.
  const influencerSubSections = [
    {
      title: 'Google Summer of Code (GSoc) Participants',
      people: googleContributors,
    },
    {
      title: 'Live Listening App UI & Development Team',
      people: liveContributors,
    },
    { title: 'Arcatia.io Data Cooperative', people: arcatiaContributors },
    { title: 'Project Management Team', people: projectManagementContributors },
  ]

  return (
    <div className="hhof-container">
      {/* Banner for the page */}
      <HHOFBanner />

      {/* First Section for this page- top */}
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Stack spacing={2}>
          {/* first paragraph */}
          <IntroParagraph text={firstParagraph} />

          {/*Second paragraph */}
          <IntroParagraph text={secondParagraph} />

          {/*Hackathon image */}
          <Box sx={{ pt: 2.5, mb: -1 }}>
            <HackathonImage />
          </Box>

          {/*Third paragraph after first image */}
          <IntroParagraph text={thirdParagraph} />
        </Stack>

        {/*Founders Box */}
        <SectionHeader {...foundersHeader} />
      </Container>
      {/*Founders list */}
      <ContributorSection title="" people={contributors} {...contributorRail} />
      {/*End of founder contributors list */}

      {/* Beginning of the influencers list */}

      {/* Influencer's box */}
      <SectionHeader {...influencersHeader} />

      {/* Influencer-tier sub-sections (each themed team) */}
      {influencerSubSections.map((section) => (
        <ContributorSection
          key={section.title}
          {...section}
          {...contributorRail}
        />
      ))}

      {/*Podcast header */}
      <SectionHeader {...podcastHeader} />

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
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
            },
            [theme.breakpoints.between('sm', 'lg')]: {
              flexDirection: 'row',
            },

            alignItems: {
              xs: 'center',
              sm: 'flex-start',
            },
          },

          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
          [theme.breakpoints.between('sm', 'lg')]: {
            flexDirection: 'row',
          },
        })}
        separator={
          <Typography
            sx={(theme) => ({
              [theme.breakpoints.down('sm')]: {
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

      {/*OrcaHello header */}
      <ContributorSection
        title="OrcaHello"
        caption=" (Real-Time Inference System Leads)"
        people={orcaContributors}
        {...contributorRail}
      />

      {/*Individual contributors small header */}
      <ContributorSection
        title="Individual Contributors"
        people={individualContributors}
        compactTitle
        titleVariant="h6"
        {...contributorRail}
      />

      {/*final pictures above footer */}
      <LowerImages></LowerImages>
    </div>
  )
}

export default HackerHallOfFame
