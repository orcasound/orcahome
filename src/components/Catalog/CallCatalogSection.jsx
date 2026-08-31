import InfoIcon from '@mui/icons-material/Info'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { CALLS } from './callsData'
import CatalogCallList from './CatalogCallList'
import { TOOLTIPS } from './constants'
import PodFilter from './PodFilter'

// Hard-coded copy, used as a fallback whenever Sanity has no value. The
// {count} token in the description is replaced with the live dataset size.
const DEFAULT_SECTION_TITLE = 'Southern Resident Killer Whales Call Catalog'
const DEFAULT_SECTION_DESCRIPTION =
  'Orcasound maintains an online catalog of the SRKW calls (built by Val Veirs and his students at Colorado College, based on the Osborne-Ford tape, March 1981, and the call classification of Ford, 1987). You can browse {count} Ford call entries and variants recorded throughout the habitat of J, K, and L pod, with available audio, generated waveform images, color spectrograms, and Ford catalog spectrograms.'

export default function CallCatalogSection({
  sectionTitle,
  sectionDescription,
}) {
  const [activePod, setActivePod] = useState('All Calls')

  const title = sectionTitle || DEFAULT_SECTION_TITLE
  const description = (
    sectionDescription || DEFAULT_SECTION_DESCRIPTION
  ).replace('{count}', CALLS.length)

  return (
    <>
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
        {title}
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
        {description}
      </Typography>

      {/* Pod filter tabs */}
      <PodFilter activePod={activePod} onSelect={setActivePod} />

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: 'action.hover',
            padding: '8px 16px',
            borderRadius: '8px',
          }}
        >
          <InfoIcon color="primary" fontSize="small" />
          {TOOLTIPS.SPECTROGRAM}
        </Typography>
      </Box>

      {/* Call list */}
      <CatalogCallList key={activePod} activePod={activePod} />
    </>
  )
}
