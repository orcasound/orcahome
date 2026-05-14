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
            backgroundColor: 'navy',
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
        maxWidth="sm"
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

          {/*Founders Box */}
          <Box
            sx={{
              height: '20em',
              width: '110%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              backgroundColor: 'navy',
              borderRadius: '20px',
              boxSizing: 'border-box',
              boxShadow: '10px 10px 5px 2px rgba(0,0,0,0.23)',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Founders
            </Typography>
            <Typography variant="body2">(Long-Term Contributors)</Typography>
            <Typography variant="body1" sx={{ width: '90%', marginTop: '1em' }}>
              Like Orcasound organizational members (who have their own amazing
              volunteers!), founders can raise funds under the auspices of
              Orcasound to support their own Orcasound efforts or the project in
              general. The also have shown leadership in the community and often
              have administrative access to key parts of the Orcasound
              infrastructure.
            </Typography>
            <Typography variant="body1" sx={{ width: '90%' }}>
              Founders can raise funds under the auspices of Orcasound to
              support their own Orcasound efforts or the project in general.
            </Typography>
          </Box>
        </Stack>

        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            minwidth: '65vw',
            mt: 1,
            ml: -30,
            mb: 4,
            minHeight: '120vh',
          }}
        >
          {/*Founders list */}
          <Stack
            sx={{
              display: 'flex',
              flex: 1,
              gap: 2,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              minHeight: '130vh',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '25em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Paul Cretu</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Skander Mzali</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Steve Hicks</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Brendan Thatcher</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Val Viers</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Scott Viers</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Mike Castor</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Ty Crisafulli</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Christian Sarason</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Valentina Staneva</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Prakruti Gogia</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Akash Mahajan</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Praful Mathur</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Michelle Yang</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Jesse Lopez</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography variant="body1">Liam Reese</Typography>
            </Box>
          </Stack>
          {/*Founder role list */}
          <Stack
            sx={{
              display: 'flex',
              flex: 1,
              gap: 2,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              minHeight: '125vh',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Orcasound site & player (2017+)</div>
                <div>GSoC mentor (2021)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Orcasound site (2017-2020)</div>
                <div>Admin UI (2019)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Orcanode repository (2018+)</div>
                <div>GSoC mentor (2020+)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>User research & UX team lead (2020+)</div>
                <div>GSoC mentor (2021)</div>
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Node engineering and machine learning (2017+)</div>
                <div>GSoC mentor (2020+)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Project management (2017+)</div>
                <div>GSoC mentor (2020+)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>UI v2 implementation (2019-2020)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>2017 Kickstarter and design guidance (2017+)</div>
                <div>GSoC mentor (2021)</div>
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Orcamap repository (2018+)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Microsoft AI4Earth Innovation Grant lead (2019)</div>
                <div>GSoC mentor and administrative lead (2020+)</div>
                <div>UW MS Data Science mentor (2022-23)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>OrcaHello project manager</div>
                <div>Pod.Cast creator (Microsoft hackathons, 2019-2021)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Pod.Cast creator</div>
                <div>OrcaHello ML developer (Microsoft, 2019-2020)</div>
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Experiment.com funding (2021)</div>
                <div>GSoC mentor (2022)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Microsoft hackathon project manager (2020+)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>GSoC mentor (2020-2021)</div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30em',
                height: '5em',
              }}
            >
              <Typography
                variant="body1"
                component="div"
                sx={{ width: '30em' }}
              >
                <div>Graphic design (2017+)</div>
              </Typography>
            </Box>
          </Stack>
        </Container>
        {/*End of founder contributors list */}

        {/* Beginning of the influencers list */}
        <Container maxWidth="xl">
          {/* Influencer's box */}
          <Box
            sx={{
              height: '10em',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              backgroundColor: 'navy',
              borderRadius: '20px',
              boxSizing: 'border-box',
              boxShadow: '10px 10px 5px 2px rgba(0,0,0,0.23)',
            }}
          >
            <Typography variant="h4" gutterBottom>
              Influencers
            </Typography>
            <Typography variant="body2">(Major Contributors)</Typography>
          </Box>
        </Container>
      </Container>
    </>
  )
}

export default contributors
