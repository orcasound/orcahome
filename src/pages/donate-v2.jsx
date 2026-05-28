import Head from 'next/head'
import React from 'react'

import topbanner from '../../public/images/srkw2-17.jpg'
import DonatePartnersV2 from '../components/Donate/DonatePartnersV2'
import SupportBanner from '../components/Donate/SupportBanner'
import SupportOrcasound from '../components/Donate/SupportOrcasound'
import TopBanner from '../components/TopBanner'

export const DonateV2 = () => {
  return (
    <>
      <Head>
        <title>Orcasound | Support</title>
      </Head>
      <TopBanner
        bannerImg={topbanner}
        pageTitle="Support"
        scrollToId="support-content"
        imageFilter="brightness(0.8)"
        scrollButtonBottom={{ sm: '76px' }}
      />
      <SupportBanner />
      <SupportOrcasound />
      <DonatePartnersV2 />
    </>
  )
}

export default DonateV2
