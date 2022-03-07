import { Box } from '@mui/material'
import Head from 'next/head'

import ListenBanner from '../../public/images/orca2.png'
import TopBanner from '../components/TopBanner'

export const listen = () => {
  return (
    <Box>
      <Head>
        <title>Orcasound</title>
      </Head>
      <TopBanner
        bannerImg={ListenBanner}
        pageTitle={`Listen`}
        pageDesc={`You’ll hear a lot of different sounds on the hydrophones. Select the jump links below or scroll down to learn about the marine acoustic landscape. `}
        scrollToID={`listen`}
      />
      <Box id="listen">
        <h1>Listen</h1>
        <h2>orcasound</h2>
      </Box>
    </Box>
  )
}

export default listen
