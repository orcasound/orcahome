import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import topbanner from '../../public/images/srkw2-17.jpg'
import DonatePartnersV2 from '../components/Donate/DonatePartnersV2'
import SupportBanner from '../components/Donate/SupportBanner'
import SupportOrcasound from '../components/Donate/SupportOrcasound'
import TopBanner from '../components/TopBanner'
import { DONATE_AB_TEST_ENABLED } from '../utils/donateExperiment'

export const DonateV2 = () => {
  const router = useRouter()

  // While the A/B test is paused, the V2 variant must not render and
  // `/donate-v2` must not be reachable (#299, #292). A static export has no
  // server to redirect, so send visitors to `/donate` from the browser and
  // render nothing meanwhile.
  // TODO(static-export): replace with a host-level redirect, or delete this
  // page while the test is paused. Re-enabling the test needs either a server
  // or bucketing in the browser, since `src/proxy.ts` is gone.
  useEffect(() => {
    if (!DONATE_AB_TEST_ENABLED) router.replace('/donate')
  }, [router])

  if (!DONATE_AB_TEST_ENABLED) return null

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
