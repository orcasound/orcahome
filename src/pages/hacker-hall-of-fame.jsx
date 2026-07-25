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
  supporterContributors,
} from '../data/hackerHallOfFameContributors'
import { getClient } from '../sanity/client'
import { HHOF_PAGE_QUERY } from '../sanity/queries'

const contributorRail = {
  listWidth: '100%',
  listMaxWidth: 800,
}

const HackerHallOfFame = ({ hhof }) => {
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

  // Per-field fallback: Sanity value when present, otherwise the hard-coded
  // copy / contributor arrays above. Layout, styling, the decorative images,
  // and the link-heavy paragraphs (second/third + the Founders description)
  // stay in code.
  const content = {
    introParagraph: hhof?.introParagraph || firstParagraph,
    foundersTitle: hhof?.foundersTitle || 'Founders',
    foundersSubtitle: hhof?.foundersSubtitle || '(Long-Term Contributors)',
    founders: hhof?.founders?.length ? hhof.founders : contributors,
    influencersTitle: hhof?.influencersTitle || 'Influencers',
    influencersSubtitle: hhof?.influencersSubtitle || '(Major Contributors)',
    influencerGroups: hhof?.influencerGroups?.length
      ? hhof.influencerGroups.map((group) => ({
          title: group.title,
          people: group.contributors || [],
        }))
      : influencerSubSections,
    podcastTitle: hhof?.podcastTitle || 'PodCast',
    podcastSubtitle: hhof?.podcastSubtitle || '(ML-Assisted Annotation Tool)',
    podcastNames: hhof?.podcastNames?.length
      ? hhof.podcastNames
      : ['Prakruti Gogia', 'Akash Mahajan', 'Nithya Govindarajan'],
    orcaHelloTitle: hhof?.orcaHelloTitle || 'OrcaHello',
    orcaHelloCaption:
      hhof?.orcaHelloCaption || ' (Real-Time Inference System Leads)',
    orcaHelloContributors: hhof?.orcaHelloContributors?.length
      ? hhof.orcaHelloContributors
      : orcaContributors,
    individualTitle: hhof?.individualTitle || 'Individual Contributors',
    individualContributors: hhof?.individualContributors?.length
      ? hhof.individualContributors
      : individualContributors,
    supportersTitle:
      hhof?.supportersTitle || 'Supporters (key one-time contributions)',
    supporters: hhof?.supporters?.length
      ? hhof.supporters
      : supporterContributors,
  }

  return (
    <div className="hhof-container">
      {/* Banner for the page */}
      <HHOFBanner />

      {/* First Section for this page- top */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{ width: 'calc(100% - 32px)', maxWidth: 800, mx: 'auto', mt: 3 }}
      >
        <Stack spacing={2}>
          {/* first paragraph */}
          <IntroParagraph text={content.introParagraph} />

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
        <SectionHeader
          {...foundersHeader}
          title={content.foundersTitle}
          subtitle={content.foundersSubtitle}
        />
      </Container>
      {/*Founders list */}
      <ContributorSection
        title=""
        people={content.founders}
        {...contributorRail}
      />
      {/*End of founder contributors list */}

      {/* Beginning of the influencers list */}

      {/* Influencer's box */}
      <SectionHeader
        {...influencersHeader}
        title={content.influencersTitle}
        subtitle={content.influencersSubtitle}
      />

      {/* Influencer-tier sub-sections (each themed team) */}
      {content.influencerGroups.map((section) => (
        <ContributorSection
          key={section.title}
          {...section}
          titleVariant="h5"
          {...contributorRail}
        />
      ))}

      {/*Podcast header */}
      <SectionHeader
        {...podcastHeader}
        title={content.podcastTitle}
        subtitle={content.podcastSubtitle}
      />

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
        {content.podcastNames.map((name) => (
          <Typography key={name} color="text.primary">
            {name}
          </Typography>
        ))}
      </Breadcrumbs>

      {/*OrcaHello header */}
      <ContributorSection
        title={content.orcaHelloTitle}
        caption={content.orcaHelloCaption}
        people={content.orcaHelloContributors}
        {...contributorRail}
      />

      {/*Individual contributors small header */}
      <ContributorSection
        title={content.individualTitle}
        people={content.individualContributors}
        compactTitle
        titleVariant="h6"
        {...contributorRail}
      />

      {/*Supporter Header */}
      <ContributorSection
        title={content.supportersTitle}
        people={content.supporters}
        titleVariant="h5"
        {...contributorRail}
      />

      {/*final pictures above footer */}
      <LowerImages></LowerImages>
    </div>
  )
}

export default HackerHallOfFame

// Fetch the HHOF content from Sanity at build time (revalidated for ISR). If
// Sanity is unreachable or unconfigured, fall back to null and the component
// renders its built-in copy + contributor arrays.
export async function getStaticProps() {
  let hhof = null
  try {
    hhof = await getClient(false).fetch(HHOF_PAGE_QUERY)
  } catch {
    hhof = null
  }
  return { props: { hhof }, revalidate: 60 }
}
