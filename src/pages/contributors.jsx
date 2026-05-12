/*
 * File : contributors.jsx
 * Desc : Page for the Hacker Hall of Fame contributors page.
 *  */

import Head from 'next/head'
import { useState } from 'react'

import TopBanner from '../components/TopBanner'
import { pushToDataLayer } from '../utils/gtm'
import useIsMobile from '../utils/useIsMobile'

const contributors = () => {
  return (
    <>
      <Head>
        <title>Orcasound | Hacker Hall of Fame</title>
      </Head>
    </>
  )
}

export default contributors
