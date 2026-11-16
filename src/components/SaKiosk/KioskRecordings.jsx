import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import {
  getKioskLocation,
  IMAGE_BASE_PATH,
  KIOSK_SOUNDS,
} from '../../data/saKiosk'
import Link from '../Link'

// "RECORDINGS from this location": one picture per recording of a site, then
// the "More recordings | Start over" links, as on the old kiosk.
export default function KioskRecordings({ locationId, activeSound }) {
  const location = getKioskLocation(locationId)

  return (
    <Box component="section" aria-labelledby="kiosk-recordings-heading">
      <Typography
        id="kiosk-recordings-heading"
        variant="h6"
        component="h2"
        sx={{ textAlign: 'left', mb: 2 }}
      >
        Recordings from this location{' '}
        <Typography component="span" variant="body2" color="text.secondary">
          (click picture to play recording)
        </Typography>
      </Typography>

      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          p: 0,
          m: 0,
          mb: 3,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 2,
        }}
      >
        {location.recordings.map((id) => {
          const sound = KIOSK_SOUNDS[id]
          const isActive = id === activeSound
          return (
            <Box component="li" key={id}>
              <Link
                href={`/sakiosk/sounds/${id}`}
                aria-current={isActive ? 'page' : undefined}
                sx={{
                  display: 'inline-block',
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                <Image
                  src={`${IMAGE_BASE_PATH}${sound.image}`}
                  alt=""
                  width={100}
                  height={100}
                  style={{ display: 'block', margin: '0 auto 8px' }}
                />
                {sound.title}
              </Link>
            </Box>
          )
        })}
      </Box>

      <Typography variant="body1">
        <Link href={`/sakiosk/sounds/${location.more}`}>More recordings</Link>
        {' | '}
        <Link href="/sakiosk">Start over</Link>
      </Typography>
    </Box>
  )
}
