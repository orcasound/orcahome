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
      <Head>
        <title>Orcasound | Hacker Hall of Fame</title>
      </Head>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        <TopBanner
          bannerImg={HackerBanner}
          pageTitle={`    Hacker\nHall of Fame`}
          scrollToId={'contributors'}
        />
      </div>
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
    </>
  )
}

export default contributors
