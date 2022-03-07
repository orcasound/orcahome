import { Box } from '@mui/material'
import Head from 'next/head'

import DonateBanner from '../../public/images/donate.jpg'
import TopBanner from '../components/TopBanner'

export const listen = () => {
  return (
    <Box>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={DonateBanner}
        pageTitle={`Donate`}
        pageDesc={`There are many ways to help in the recovering of marine life, especially for the Souther Resident Killer Whales that call the Salish Sea home. Check out the ways you can help below!`}
        scrollToID={`donate`}
      />
      <Box id="donate">
        <h1>Donate</h1>
        <h2>orcasound</h2>
      </Box>
    </Box>
  )
}

export default listen
