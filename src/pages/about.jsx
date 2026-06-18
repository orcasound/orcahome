import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Head from 'next/head'
import { useState } from 'react'

import AboutBanner from '../../public/images/about.webp'
import AboutCard from '../components/About/AboutCard'
import Items from '../components/About/db.json'
import TopBanner from '../components/TopBanner'
import { getClient } from '../sanity/client'
import { ABOUT_PAGE_QUERY } from '../sanity/queries'
import { pushToDataLayer } from '../utils/gtm'
import useIsMobile from '../utils/useIsMobile'

// Current hard-coded copy, used as a fallback whenever Sanity has no value
// for a field (or Sanity is unreachable). This keeps the page rendering its
// existing content until it's filled in the Studio.
const DEFAULTS = {
  heroTitle: 'About',
  heroDescription: `Orcasound is a software & hardware Web app to listen to whales, save orcas and advance bioacoustics (AI technology).`,
  intro: `Orcasound is a cooperative effort of many dedicated individuals and great organizations. Here are our recent projects — created by volunteers, stewards, citizen scientists, hackers, and generous funders — all working together for the orcas.`,
  projectsHeading: 'Our Projects',
  participationHeading: 'We Welcome Your Participation!',
  participationParagraphs: [
    `You can join us anytime as a volunteer to our open-source software & hardware projects.`,
    `If you'd like to host a hydrophone, do research, or incorporate Orcasound into the educational or outreach efforts of your organization, please reach out!`,
  ],
  ctaLabel: 'GET INVOLVED',
  ctaHref: '/getinvolved',
}

export default function About({ about }) {
  const mobileActive = useIsMobile()
  const [seeMore, setSeeMore] = useState(!mobileActive)

  // Per-field fallback: use the Sanity value when present, otherwise the
  // existing hard-coded copy.
  const content = {
    heroTitle: about?.heroTitle || DEFAULTS.heroTitle,
    heroDescription: about?.heroDescription || DEFAULTS.heroDescription,
    intro: about?.intro || DEFAULTS.intro,
    projectsHeading: about?.projectsHeading || DEFAULTS.projectsHeading,
    participationHeading:
      about?.participationHeading || DEFAULTS.participationHeading,
    participationParagraphs: about?.participationParagraphs?.length
      ? about.participationParagraphs
      : DEFAULTS.participationParagraphs,
    ctaLabel: about?.ctaLabel || DEFAULTS.ctaLabel,
    ctaHref: about?.ctaHref || DEFAULTS.ctaHref,
  }

  return (
    <>
      <Head>
        <title>About us - Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={AboutBanner}
        pageTitle={content.heroTitle}
        pageDesc={content.heroDescription}
        scrollToId={`about`}
      />

      <Box m={3} id="about">
        <Container>
          <Typography mt={9} align="justify" variant="body1">
            {content.intro}
          </Typography>

          <Typography
            mt={8}
            mb={5}
            variant="h4"
            sx={{
              fontFamily: 'Mukta',
              fontWeight: '600',
            }}
          >
            {content.projectsHeading}
          </Typography>

          <Box>
            <Grid
              container
              justifyContent="center"
              spacing={mobileActive ? 0 : 5}
            >
              {Items.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    {/* There are two conditions
                    1) for mobile
                      a) showing default only two projects  -> (mobileActive && index < 2)
                      b) if user wants to see more Projects -> (seeMore)
                    2) for Desktop, show all projects       -> (!mobileActive) */}
                    {((mobileActive && index < 2) ||
                      seeMore ||
                      !mobileActive) && (
                      <AboutCard
                        item={item}
                        mobileActive={mobileActive}
                        onClick={() =>
                          pushToDataLayer('about_card_click', {
                            card_title: item.title,
                          })
                        }
                      />
                    )}
                  </Grid>
                )
              })}
            </Grid>
          </Box>

          {mobileActive && <Mobile setSeeMore={setSeeMore} seeMore={seeMore} />}

          <Box my={13}>
            <Typography
              mt={1}
              mx={1}
              align="center"
              variant="h5"
              sx={{
                fontFamily: 'Mukta',
                fontWeight: '600',
              }}
            >
              {content.participationHeading}
            </Typography>

            <Box my={3}>
              {content.participationParagraphs.map((paragraph, index) => (
                <Typography
                  key={index}
                  mx={1}
                  mt={3}
                  align="left"
                  variant="body1"
                  gutterBottom
                >
                  {paragraph}
                </Typography>
              ))}
            </Box>

            <Box
              my={4}
              mx={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#002984',
                  alignContent: 'center',
                  borderRadius: '30px',
                  '&:hover': {
                    backgroundColor: '#002984',
                    color: 'white',
                  },
                }}
                href={content.ctaHref}
                onClick={() =>
                  pushToDataLayer('cta_click', {
                    cta_text: content.ctaLabel,
                    section: 'body',
                    page: 'about',
                  })
                }
              >
                {content.ctaLabel}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

function Mobile({ setSeeMore, seeMore }) {
  return (
    <Typography
      mt={1}
      gutterBottom
      onClick={() => setSeeMore(!seeMore)}
      align="center"
      sx={{
        textDecorationLine: 'underline',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      {seeMore ? 'Show less...' : 'See more...'}
    </Typography>
  )
}

// Fetch the About content from Sanity at build time (revalidated for ISR).
// If Sanity is unreachable or unconfigured, fall back to null and the
// component renders its built-in DEFAULTS.
export async function getStaticProps() {
  let about = null
  try {
    about = await getClient(false).fetch(ABOUT_PAGE_QUERY)
  } catch {
    about = null
  }
  return { props: { about }, revalidate: 60 }
}
