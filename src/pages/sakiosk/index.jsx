import { Box } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'

import KioskFrame from '../../components/SaKiosk/KioskFrame'
import { IMAGE_BASE_PATH } from '../../data/saKiosk'
import { getSiteChrome } from '../../sanity/siteChrome'

// Home screen of the old Seattle Aquarium listening kiosk (#466 group 4).
export default function SaKioskHome() {
  return (
    <>
      <Head>
        <title>Seattle Aquarium listening kiosk | Orcasound</title>
        <meta
          name="description"
          content="An archive of the Orcasound listening kiosk at the Seattle Aquarium: underwater recordings from five hydrophones around the Salish Sea."
        />
      </Head>

      <KioskFrame>
        <Box sx={{ maxWidth: 730, mx: 'auto' }}>
          <Image
            src={`${IMAGE_BASE_PATH}sharpened-cropped-spyhop-ship.jpg`}
            alt="Two orcas spyhopping with a cargo ship in the distance"
            width={903}
            height={657}
            style={{ display: 'block', width: '100%', height: 'auto' }}
            priority
          />
        </Box>
      </KioskFrame>
    </>
  )
}

export async function getStaticProps() {
  return { props: { siteChrome: await getSiteChrome() }, revalidate: 60 }
}
