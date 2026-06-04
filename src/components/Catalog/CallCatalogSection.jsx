import { Typography } from '@mui/material'
import { useState } from 'react'

import { CALLS } from './callsData'
import CatalogCallList from './CatalogCallList'
import PodFilter from './PodFilter'

export default function CallCatalogSection() {
  const [activePod, setActivePod] = useState('All Calls')

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
        browse {CALLS.length} Ford call entries and variants recorded throughout
        the habitat of J, K, and L pod, with available audio, generated waveform
        images, color spectrograms, and Ford catalog spectrograms.
      </Typography>

      {/* Pod filter tabs */}
      <PodFilter activePod={activePod} onSelect={setActivePod} />

      {/* Call list */}
      <CatalogCallList key={activePod} activePod={activePod} />
    </>
  )
}
