import { Box, Button } from '@mui/material'
import Head from 'next/head'
import React from 'react'

import topbanner from '../../public/images/srkw2-17.jpg'
import TopBanner from '../components/TopBanner'

export const Donate = () => {
  return (
    <>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={topbanner}
        pageTitle={`Donate`}
        pageDesc={`There are many ways to help in the recovering of marine life, 
        especially for the Souther Resident Killer Whales that call the Salish Sea home. 
        Check out the ways you can help below!`}
      />
      <br />
      <Box
        id="scroll-link"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'max(3vw, 15px)',
        }}
      >
        <Box>
          {`The only way you can donate to Orcasound is through our parner-organizations. 
            Help us and our Orcasound network members by making a charitable contribution to our partners, many of whom are 501(c)3 organizations. 
            Check out the links below to help strengthen and grow our network, while supporting our on-going conservation, research, and educational efforts.`}
        </Box>
        <br />
        <br />
        <Box>
          {`You can also directly support the many dedicated volunteers who help make Orcasound keep running and improve over time. 
           Take a look at our “Hacker Hall of Fame” and/or our Github repositories and consider sponsoring the work of our most-dedicated contributors.`}
        </Box>
        <br />
        <br />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1B2B7B',
            borderRadius: '20px',
            width: 'fit-content',
          }}
        >
          {' '}
          Donate Now
        </Button>
        <br />
      </Box>
    </>
  )
}

export default Donate
