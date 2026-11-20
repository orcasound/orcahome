import { Box, Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'

import topbanner from '../../public/images/srkw2-17.jpg'
import DonateOrcasound from '../components/Donate/DonateOrcasound'
import DonatePartners from '../components/Donate/DonatePartners'
import TopBanner from '../components/TopBanner'
import { getClient } from '../sanity/client'
import { DONATE_PAGE_QUERY } from '../sanity/queries'
import { getSiteChrome } from '../sanity/siteChrome'

// Current hard-coded copy, used as a per-field fallback whenever Sanity has no
// value for a field (or Sanity is unreachable). The donate cards have their own
// fallback in DonateOrcasound.
const DEFAULTS = {
  heroTitle: 'Support',
  heroDescription:
    'Help protect marine life like the Southern Resident Killer whales by donating today',
}

export const Donate = ({ donate }) => {
  const content = {
    heroTitle: donate?.heroTitle || DEFAULTS.heroTitle,
    heroDescription: donate?.heroDescription || DEFAULTS.heroDescription,
    heroImage: donate?.heroImageUrl || topbanner,
    cards: donate?.cards,
    dialogTitle: donate?.dialogTitle,
    dialogSubtitle: donate?.dialogSubtitle,
    dialogHeading: donate?.dialogHeading,
    donationOptions: donate?.donationOptions,
    partnersTitle: donate?.partnersTitle,
    partnersDescription: donate?.partnersDescription,
    partners: donate?.partners,
  }

  return (
    <>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={content.heroImage}
        pageTitle={content.heroTitle}
        pageDesc={content.heroDescription}
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
            cards={content.cards}
            dialogTitle={content.dialogTitle}
            dialogSubtitle={content.dialogSubtitle}
            dialogHeading={content.dialogHeading}
            donationOptions={content.donationOptions}
          />
          <br />
          <DonatePartners
            title={content.partnersTitle}
            description={content.partnersDescription}
            partners={content.partners}
          />
        </Box>
      </Container>
    </>
  )
}

export default Donate

// Fetch the Donate (V1) page copy from Sanity at build time (revalidated for
// ISR). Partner cards stay in donatePartners.json. If Sanity is unreachable or
// unconfigured, fall back to null and the component renders its built-in
// DEFAULTS.
export async function getStaticProps() {
  const siteChrome = getSiteChrome()
  let donate = null
  try {
    donate = await getClient(false).fetch(DONATE_PAGE_QUERY)
  } catch {
    donate = null
  }
  return { props: { donate, siteChrome: await siteChrome }, revalidate: 60 }
}
