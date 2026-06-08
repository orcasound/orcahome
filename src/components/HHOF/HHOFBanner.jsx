/*
 * Author: Stephen Aranda
 * File  : HHOFBanner.jsx
 * Desc  : Banner and thank you message component for the Hacker Hall of Fame page
 *
 *  */
import { Box, Container, Typography } from '@mui/material'
import Head from 'next/head'

import HackerBanner from '../../../public/images/Hacker_HOF.webp'
import TopBanner from '../../components/TopBanner'

const HOFBanner = () => {
  return (
    <div className="hof-banner-container">
      {/* title of the page Hacker Hall of Fame */}
      <Head>
        <title>Orcasound | Hacker Hall of Fame</title>
      </Head>

      {/* Banner and Banner Text */}
      <Box
        sx={{
          whiteSpace: 'pre-wrap',
          display: 'flex',
        }}
      >
        <TopBanner
          bannerImg={HackerBanner}
          pageTitle={`Hacker\n Hall of Fame`}
          scrollToId={'scroll-link'}
        />
      </Box>

      {/* Container for Thank you Message for contributors */}
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            minHeight: '5em',
            width: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#111184',
            color: 'white',
          }}
        >
          <Typography
            variant="h3"
            sx={(theme) => ({
              [theme.breakpoints.between('phone', 'sm')]: {
                fontSize: 'medium',
              },

              [theme.breakpoints.between('tablet', 'lg')]: {
                fontSize: 'large',
              },
            })}
          >
            Thank you, Orcasound App Hackers!
          </Typography>
        </Box>
      </Container>
    </div>
  )
}

export default HOFBanner
