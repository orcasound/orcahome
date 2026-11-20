import Head from 'next/head'

import KioskAudio from '../../../components/SaKiosk/KioskAudio'
import KioskFrame from '../../../components/SaKiosk/KioskFrame'
import KioskPanel from '../../../components/SaKiosk/KioskPanel'
import KioskRecordings from '../../../components/SaKiosk/KioskRecordings'
import { AUDIO_BASE_URL, KIOSK_SOUNDS } from '../../../data/saKiosk'
import { getSiteChrome } from '../../../sanity/siteChrome'

// One recording of the old kiosk: picture, player, text, and the other
// recordings from the same site.
export default function SaKioskSound({ soundId }) {
  const sound = KIOSK_SOUNDS[soundId]

  return (
    <>
      <Head>
        <title>{`${sound.title} | Seattle Aquarium listening kiosk | Orcasound`}</title>
        <meta name="description" content={sound.paragraphs.join(' ')} />
      </Head>

      <KioskFrame>
        <KioskPanel
          image={sound.image}
          imageAlt={sound.imageAlt}
          status="RECORDED"
          paragraphs={sound.paragraphs}
        >
          <KioskAudio
            src={`${AUDIO_BASE_URL}${sound.file}`}
            soundId={soundId}
            title={sound.title}
          />
        </KioskPanel>
        <KioskRecordings locationId={sound.location} activeSound={soundId} />
      </KioskFrame>
    </>
  )
}

export function getStaticPaths() {
  return {
    paths: Object.keys(KIOSK_SOUNDS).map((id) => ({ params: { id } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: { soundId: params.id, siteChrome: await getSiteChrome() },
    revalidate: 60,
  }
}
