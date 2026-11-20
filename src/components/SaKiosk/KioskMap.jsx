import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import NextLink from 'next/link'

import { IMAGE_BASE_PATH, KIOSK_LOCATIONS } from '../../data/saKiosk'

// The bottom of every kiosk screen: the map of the five listening sites, with
// one button per site in a row under it, as on the old kiosk page. The
// current site's button is filled in and is not a link.
export default function KioskMap({ activeLocation }) {
  return (
    <Box component="nav" aria-label="Listening sites" sx={{ mt: 5 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Click a label to visit a listening site.
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 500,
          mx: 'auto',
          mt: 2,
        }}
      >
        <Image
          src={`${IMAGE_BASE_PATH}map_home.jpg`}
          alt="Map of the Salish Sea with red dots at the five listening sites"
          width={478}
          height={508}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />

        {/* Each red dot is also a link to its site (not on the old kiosk,
            where only the buttons worked). The buttons below stay the
            keyboard and screen-reader path, so the dots are skipped there. */}
        {KIOSK_LOCATIONS.filter(
          (location) => location.id !== activeLocation
        ).map((location) => (
          <Box
            key={location.id}
            component={NextLink}
            href={`/sakiosk/node/${location.id}`}
            title={location.label}
            aria-hidden="true"
            tabIndex={-1}
            sx={{
              position: 'absolute',
              left: `${location.dotLeft}%`,
              top: `${location.dotTop}%`,
              width: 22,
              height: 22,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        {KIOSK_LOCATIONS.map((location) =>
          location.id === activeLocation ? (
            <Button
              key={location.id}
              variant="contained"
              size="small"
              aria-current="page"
              disableElevation
              sx={{ textTransform: 'none', pointerEvents: 'none' }}
            >
              {location.label}
            </Button>
          ) : (
            <Button
              key={location.id}
              component={NextLink}
              href={`/sakiosk/node/${location.id}`}
              variant="outlined"
              size="small"
              sx={{ textTransform: 'none' }}
            >
              {location.label}
            </Button>
          )
        )}
      </Box>
    </Box>
  )
}
