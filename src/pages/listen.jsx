import Head from 'next/head'

import ListenBanner from '../../public/images/orca2.png'
import TopBanner from '../components/TopBanner'

export const listen = () => {
  return (
    <>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={ListenBanner}
        pageTitle={`Listen`}
        pageDesc={`You’ll hear a lot of different sounds on the hydrophones. Select the jump links below or scroll down to learn about the marine acoustic landscape. `}
        scrollToId={`listen`}
      />
      <div id="listen" />
      <h1>Listen</h1>
      <h2>orcasound</h2>
    </>
  )
}

export default listen
