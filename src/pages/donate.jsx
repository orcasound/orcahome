import { Box, Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'

import donateOrcasoundImage from '../../public/images/donateOrcasound/orcasound.jpg'
import donateVolunteersImage from '../../public/images/donateOrcasound/volunteers.jpg'
import topbanner from '../../public/images/srkw2-17.jpg'
import DonateOrcasound from '../components/Donate/DonateOrcasound'
import DonatePartners from '../components/Donate/DonatePartners'
import TopBanner from '../components/TopBanner'

export const Donate = () => {
  return (
    <>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={topbanner}
        pageTitle={`Support`}
        pageDesc={`Help protect marine life like the Southern Resident Killer whales by donating today`}
        scrollToId={`donate`}
        imageFilter="brightness(0.8)"
      />
      <br />
      <Container maxWidth="lg">
        <Box
          id="donate"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 'max(3vw, 15px)',
            paddingTop: '0',
          }}
        >
          <DonateOrcasound
            donateOrcasoundImage={donateOrcasoundImage}
            donateOrcasoundTitle="Support Orcasound"
            donateOrcasoundMessage="Help us build and maintain the technology to listen to orcas in the world."
            donateVolunteersImage={donateVolunteersImage}
            donateVolunteersTitle="Support Volunteers"
            donateVolunteersMessage="Support those who keep the orcasound website and hydrophone nodes running."
          />
          <br />
          <DonatePartners />
        </Box>
      </Container>
    </>
  )
}

export default Donate
