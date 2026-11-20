import Head from 'next/head'

import KioskFrame from '../../../components/SaKiosk/KioskFrame'
import KioskPanel from '../../../components/SaKiosk/KioskPanel'
import KioskRecordings from '../../../components/SaKiosk/KioskRecordings'
import { getKioskLocation, KIOSK_LOCATIONS } from '../../../data/saKiosk'
import { getSiteChrome } from '../../../sanity/siteChrome'

// One listening site of the old kiosk. The site used to play its live stream
// here; those streams have ended, so the page keeps the text and recordings.
export default function SaKioskLocation({ locationId }) {
  const location = getKioskLocation(locationId)

  return (
    <>
      <Head>
        <title>{`${location.name} | Seattle Aquarium listening kiosk | Orcasound`}</title>
        <meta name="description" content={location.paragraphs.join(' ')} />
      </Head>

      <KioskFrame activeLocation={location.id}>
        <KioskPanel
          image={location.image}
          imageAlt={location.imageAlt}
          status="LIVE STREAM ENDED"
          paragraphs={location.paragraphs}
        />
        <KioskRecordings locationId={location.id} />
      </KioskFrame>
    </>
  )
}

export function getStaticPaths() {
  return {
    paths: KIOSK_LOCATIONS.map((location) => ({
      params: { id: location.id },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: { locationId: params.id, siteChrome: await getSiteChrome() },
    revalidate: 60,
  }
}
