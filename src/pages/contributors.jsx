/*
 * File : contributors.jsx
 * Desc : Page for the Hacker Hall of Fame contributors page.
 *  */

import { Box, Container, Link, Stack, Typography } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'

import hackathon from '../../public/images/getinvolved/hackathon.png'
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
      <Container
        maxWidth="md"
        sx={{ minHeight: '100vh', position: 'relative' }}
      >
        <Stack spacing={2} alignItems="center">
          {/* first paragraph */}
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
              technology, and code that have been made to our open source
              project. Beginning in the fall of 2018, we began participating in
              hackathons in Seattle and at the University of Washington. In
              summer, 2019, we partnered with Microsoft through their amazing
              hackathon community. In 2020, Orcasound became a host organization
              for Google Summer of Code (GSoC).
            </Typography>
          </Box>

          {/*Second paragraph */}
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
              In combination with our Github repositories, these events have
              brought many talented programmers, designers, engineers,
              researchers, and “geeks for good” to the project. They have made
              it possible to rapidly develop and refine the Orcasound app — a
              new way to listen for whales — based on a cutting-edge suite of
              inexpensive and open source hardware and software for live
              streaming audio data.
            </Typography>
          </Box>
          {/*Hackathon image */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '25em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Image
              src={hackathon}
              alt="Orcasound at a democracy lab hackathon in Seattle"
              fill
              style={{
                objectFit: 'cover',
                width: '100%',
                borderRadius: '20px',
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Orcasound at a democracy lab hackathon in Seattle (photo by Mark
              Frischmuth).
            </Typography>
          </Box>

          {/*Third paragraph after first image */}
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
              So, let’s have a virtual round of applause for the following
              stand-out members of the Orcasound open source community. If
              you’re inspired by their contributions to our Github repositories
              or Democracy Lab hackathons, don’t hesitate to support the
              Founders and Influencers directly! Sing their praises on social
              media and networks; join them in hacking for orca conservation;
              reinforce their volunteerism financially.
            </Typography>
          </Box>
        </Stack>
      </Container>
    </>
  )
}

export default contributors
