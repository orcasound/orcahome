import { Box, Button, Container, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

import heroImg from '../../public/images/callcatalog.png'
import TopBanner from '../components/TopBanner'

// CatalogCallList uses use-sound (client-only), load without SSR
const CatalogCallList = dynamic(
  () => import('../components/Catalog/CatalogCallList'),
  { ssr: false }
)

const POD_FILTERS = ['All Calls', 'J Pod', 'K Pod', 'L Pod']

export default function Catalog() {
  return (
    <div>
      <Head>
        <title>Orcasound | Call Catalog</title>
      </Head>

      {/* Hero — swap heroImg for catalog-hero.jpg once the asset is ready */}
      <TopBanner
        bannerImg={heroImg}
        pageTitle="Call Catalog"
        scrollToId="catalog"
      />

      <div id="catalog" />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Section title */}
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Montserrat',
            fontWeight: 500,
            fontSize: { xs: '24px', md: '38px' },
            textAlign: 'center',
            mb: 3,
          }}
        >
          Southern Resident Killer Whales Call Catalog
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontFamily: 'Mukta',
            fontWeight: 400,
            fontSize: '17px',
            lineHeight: '28px',
            maxWidth: '939px',
            mx: 'auto',
            mb: 5,
          }}
        >
          Orcasound maintains an online catalog of the SRKW calls (built by Val
          Veirs and his students at Colorado College, based on the Osborne-Ford
          tape, March 1981, and the call classification of Ford, 1987). You can
          select from over 46 whale calls that have been recorded throughout the
          habitat of J, K, and L pod. The next goal is to add a fourth column,
          or additional labels in the first column, to indicate common human
          names that have been given by the community to the sounds, in part to
          help discuss and remember them. For now, select labels (favored by
          Scott Veirs!) have been hard-coded in by hand. Other name ideas, and a
          standardized nomenclature, are getting organized.
        </Typography>

        {/* Pod filter tabs */}
        <Box
          sx={{
            display: 'flex',
            gap: 8,
            mb: 5,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {POD_FILTERS.map((filter) => (
            <Button
              key={filter}
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 400,
                fontSize: '20px',
                textTransform: 'none',
                padding: '13px 22px',
                height: '59px',
                width: '144px',
                borderRadius: '10px',
                bgcolor: '#1B2B7B',
                color: '#FFFFFF',
                '&:hover': { bgcolor: '#2d3ea3' },
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>

        {/* Call list — client-only (audio playback) */}
        <CatalogCallList />

        {/* TODO: add large FO-S03 spectrogram comparison images here once assets are ready */}

        {/* Image credit */}
        <Typography
          sx={{
            fontFamily: 'Mukta',
            fontWeight: 400,
            fontSize: '15px',
            textAlign: 'center',
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
