import { Container, Typography } from '@mui/material'
import Head from 'next/head'

import heroImg from '../../public/images/callcatalog.png'
import CallCatalogSection from '../components/Catalog/CallCatalogSection'
import TopBanner from '../components/TopBanner'
import { getClient } from '../sanity/client'
import { CATALOG_PAGE_QUERY } from '../sanity/queries'

// Current hard-coded copy, used as a per-field fallback whenever Sanity has no
// value for a field (or Sanity is unreachable).
const DEFAULTS = {
  heroTitle: 'Call Catalog',
  imageCredit:
    'Image Credit: John Ford, 1987 catalog from which the B&W images were taken.',
}

export default function Catalog({ catalog }) {
  const content = {
    heroTitle: catalog?.heroTitle || DEFAULTS.heroTitle,
    heroDescription: catalog?.heroDescription || undefined,
    heroImage: catalog?.heroImageUrl || heroImg,
    sectionTitle: catalog?.sectionTitle,
    sectionDescription: catalog?.sectionDescription,
    imageCredit: catalog?.imageCredit || DEFAULTS.imageCredit,
  }

  return (
    <div>
      <Head>
        <title>Orcasound | Call Catalog</title>
      </Head>

      <TopBanner
        bannerImg={content.heroImage}
        pageTitle={content.heroTitle}
        pageDesc={content.heroDescription}
        scrollToId="catalog"
      />

      <div id="catalog" />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <CallCatalogSection
          sectionTitle={content.sectionTitle}
          sectionDescription={content.sectionDescription}
        />

        {/* Image credit */}
        <Typography
          sx={{
            fontFamily: 'Mukta',
            fontWeight: 400,
            fontSize: '16px',
            textAlign: 'left',
            mt: 6,
            color: '#000',
          }}
        >
          {content.imageCredit}
        </Typography>
      </Container>
    </div>
  )
}

// Fetch the Call Catalog page copy from Sanity at build time (revalidated for
// ISR). The 46-call dataset stays in callsData.js — only the page copy is
// fetched. If Sanity is unreachable or unconfigured, fall back to null and the
// component renders its built-in DEFAULTS.
export async function getStaticProps() {
  let catalog = null
  try {
    catalog = await getClient(false).fetch(CATALOG_PAGE_QUERY)
  } catch {
    catalog = null
  }
  return { props: { catalog }, revalidate: 60 }
}
