/*
 * File : contributors.jsx
 * Desc : Page for the Hacker Hall of Fame contributors page.
 *  */

import { Box, Container, Link, Typography } from '@mui/material'
import Head from 'next/head'

import HackerBanner from '../../public/images/Hacker_HOF.webp'
import TopBanner from '../components/TopBanner'
import { pushToDataLayer } from '../utils/gtm'
import useIsMobile from '../utils/useIsMobile'

const contributors = () => {
  return (
    <>
      {/* title of the page Hacker Hall of Fame */}
      <Head>
        <title>Orcasound | Hacker Hall of Fame</title>
      </Head>

      {/* Banner and Banner Text */}
      <div style={{ whiteSpace: 'pre-wrap' }}>
        <TopBanner
          bannerImg={HackerBanner}
          pageTitle={`    Hacker\nHall of Fame`}
          scrollToId={'contributors'}
        />
      </div>

      {/* Container for Thank you Message for contributors */}
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            height: '5em',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'blue',
            color: 'white',
          }}
        >
          <Typography variant="h3">
            Thank you, Orcasound App Hackers!
          </Typography>
        </Box>
      </Container>

      {/* First Section for this page- top */}
      <Container maxWidth="md">
        <Box
          sx={{
            height: '10em',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'black',
          }}
        >
          <Typography variant="body2">
            We would like to acknowledge the tremendous contributions of time,
            technology, and code that have been made to our open source project.
            Beginning in the fall of 2018, we began participating in hackathons
            in Seattle and at the University of Washington. In summer, 2019, we
            partnered with Microsoft through their amazing hackathon community.
            In 2020, Orcasound became a host organization for Google Summer of
            Code (GSoC).
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default contributors
