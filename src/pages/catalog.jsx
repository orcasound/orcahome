import { Container, Typography } from '@mui/material'
import Head from 'next/head'

import heroImg from '../../public/images/callcatalog.png'
import CallCatalogSection from '../components/Catalog/CallCatalogSection'
import TopBanner from '../components/TopBanner'

export default function Catalog() {
  return (
    <div>
      <Head>
        <title>Orcasound | Call Catalog</title>
      </Head>

      <TopBanner
        bannerImg={heroImg}
        pageTitle="Call Catalog"
        scrollToId="catalog"
      />

      <div id="catalog" />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <CallCatalogSection />

        {/* Image credit */}
        <Typography
          sx={{
            fontFamily: 'Mukta',
            fontWeight: 400,
            fontSize: '15px',
            textAlign: 'left',
            mt: 6,
            color: '#000',
          }}
        >
          Image Credit: John Ford, 1987 catalog from which the B&W images were
          taken.
        </Typography>
      </Container>
    </div>
  )
}
