import Head from 'next/head'
import React from 'react'

import topbanner from '../../public/images/srkw2-17.jpg'
import DonatePartnersV2 from '../components/Donate/DonatePartnersV2'
import SupportBanner from '../components/Donate/SupportBanner'
import SupportOrcasound from '../components/Donate/SupportOrcasound'
import TopBanner from '../components/TopBanner'
import { DONATE_AB_TEST_ENABLED } from '../utils/donateExperiment'

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

// While the A/B test is paused, the V2 variant must not render in production
// and `/donate-v2` must not be externally reachable (#299, #292). This page
// guard is the reliable backstop: it runs in the Pages Router regardless of
// whether the proxy executes. When the test is re-enabled, the page renders
// normally so the internal `/donate` → v2 rewrite keeps working.
export async function getServerSideProps() {
  if (!DONATE_AB_TEST_ENABLED) {
    return { redirect: { destination: '/donate', permanent: false } }
  }
  return { props: {} }
}

export default DonateV2
