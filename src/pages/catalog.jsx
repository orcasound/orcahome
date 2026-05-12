import { Box, Button, Container, Typography } from '@mui/material'
import Head from 'next/head'
import React, { useState } from 'react'

import heroImg from '../../public/images/callcatalog.png'
import { CALLS } from '../components/Catalog/callsData'
import CatalogCallList from '../components/Catalog/CatalogCallList'
import { POD_FILTERS } from '../components/Catalog/constants'
import TopBanner from '../components/TopBanner'

export default function Catalog() {
  const [activePod, setActivePod] = useState('All Calls')

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
          browse {CALLS.length} Ford call entries and variants recorded
          throughout the habitat of J, K, and L pod, with available audio,
          generated waveform images, color spectrograms, and Ford catalog
          spectrograms.
        </Typography>

        {/* Pod filter tabs */}
        <Box
          role="group"
          aria-label="Filter calls by pod"
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
              onClick={() => setActivePod(filter)}
              aria-pressed={activePod === filter}
              sx={{
                fontFamily: 'Montserrat',
                fontWeight: 400,
                fontSize: '20px',
                textTransform: 'none',
                padding: '13px 22px',
                height: '59px',
                width: '144px',
                borderRadius: '10px',
                bgcolor: activePod === filter ? '#0f1a4d' : '#1B2B7B',
                color: '#FFFFFF',
                '&:hover': {
                  bgcolor: activePod === filter ? '#0f1a4d' : '#2d3ea3',
                },
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>

        {/* Call list */}
        <CatalogCallList activePod={activePod} />

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
