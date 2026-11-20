import HydrophoneArchivePage from '../components/HydrophoneArchive/HydrophoneArchivePage'
import { HYDROPHONE_ARCHIVES } from '../data/hydrophoneArchives'
import { getSiteChrome } from '../sanity/siteChrome'

// The old orcasound.net/lk page: the Lime Kiln hydrophone and its recordings
// (#466 group 4).
export default function LimeKiln() {
  return <HydrophoneArchivePage id="lk" archive={HYDROPHONE_ARCHIVES.lk} />
}

export async function getStaticProps() {
  return { props: { siteChrome: await getSiteChrome() }, revalidate: 60 }
}
