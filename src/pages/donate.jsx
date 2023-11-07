import { Box } from '@mui/material'
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
        pageTitle={`Donate`}
        pageDesc={`Help protect marine life like the Southern Resident Killer whales by donating today`}
        scrollToId={`donate`}
      />
      <br />
      <Box
        id="donate"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 'max(3vw, 15px)',
        }}
      >
        <DonateOrcasound
          donateOrcasoundImage={donateOrcasoundImage}
          donateOrcasoundMessage="Help us build and matain the technology to listen to orcas in the world."
          donateVolunteersImage={donateVolunteersImage}
          donateVolunteersMessage="Support those who keep the orcasound website and hydrophone nodes running."
        />
        <br />
        <DonatePartners />
      </Box>
    </>
  )
}

export default Donate
