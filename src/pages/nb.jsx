import HydrophoneArchivePage from '../components/HydrophoneArchive/HydrophoneArchivePage'
import { HYDROPHONE_ARCHIVES } from '../data/hydrophoneArchives'
import { getSiteChrome } from '../sanity/siteChrome'

// The old orcasound.net/nb page: the Neah Bay hydrophone and its recordings
// (#466 group 4).
export default function NeahBay() {
  return <HydrophoneArchivePage id="nb" archive={HYDROPHONE_ARCHIVES.nb} />
}

export async function getStaticProps() {
  return { props: { siteChrome: await getSiteChrome() }, revalidate: 60 }
}
