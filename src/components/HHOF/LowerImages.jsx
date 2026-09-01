/*
 * Author: Stephen Aranda
 * File  : LowerImages.jsx
 * Desc  : Component that renders the lower images above the footer.
 *  */

import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'

import hackCollab from '../../../public/images/hackerHallOfFame/Hacker_Collab.png'
import hackVal from '../../../public/images/hackerHallOfFame/Hacker_Val.png'

const DEFAULT_LOWER_IMAGES = [
  {
    src: hackCollab,
    alt: 'Erika facilitating an early discussion of machine learning and the orca data repository',
    caption:
      'Erika facilitating an early discussion of machine learning and the Orcadata repository.',
  },
  {
    src: hackVal,
    alt: 'Val working on the Orcanode software and hardware.',
    caption: 'Val working on the Orcanode software and hardware.',
  },
]

const LowerImages = ({ images }) => {
  // Use the Sanity photos when present (remote URL + dimensions), otherwise the
  // bundled photos (which carry their own intrinsic dimensions).
  const pick = (index) => {
    const sanity = images?.[index]
    if (sanity?.url) {
      return {
        src: sanity.url,
        width: sanity.width,
        height: sanity.height,
        alt: sanity.caption || DEFAULT_LOWER_IMAGES[index].alt,
        caption: sanity.caption || DEFAULT_LOWER_IMAGES[index].caption,
      }
    }
    return DEFAULT_LOWER_IMAGES[index]
  }
  const photo0 = pick(0)
  const photo1 = pick(1)

  return (
    <div className="lower-images-container">
      {/*final pictures above footer */}
      <Container
        maxWidth={false}
        disableGutters
        sx={(theme) => ({
          width: 'calc(100% - 32px)',
          maxWidth: 1000,
          mx: 'auto',
          mb: 4,
        })}
      >
        <Box
          sx={(theme) => ({
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            // Align the two photos by their TOP edge. Each child Box holds an
            // image + caption; the captions differ in length (2 lines vs 1),
            // so centering the whole boxes (alignItems: 'center') leaves the
            // images vertically offset. Align to the top so the images line up.
            alignItems: 'flex-start',
            gap: 4,

            [theme.breakpoints.down('sm')]: {
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center', // stacked on mobile: keep them centered
            },
            [theme.breakpoints.between('sm', 'lg')]: {
              gap: 7,
              width: '100%',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              width: '45%',
              justifyContent: 'center',
              alignItems: 'left',
              textAlign: 'left',

              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
              [theme.breakpoints.between('sm', 'lg')]: {
                width: '45%',
              },
            })}
          >
            <Image
              src={photo0.src}
              width={photo0.width}
              height={photo0.height}
              alt={photo0.alt}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
              }}
            />
            <Typography
              variant="caption"
              sx={(theme) => ({
                color: 'text.secondary',
                width: '100%',
                fontSize: '16px',
              })}
            >
              {photo0.caption}
            </Typography>
          </Box>

          <Box
            sx={(theme) => ({
              display: 'grid',
              gridTemplateColumns: '100%',

              width: '45%',

              [theme.breakpoints.down('sm')]: {
                width: '100%',
              },
              [theme.breakpoints.between('sm', 'lg')]: {
                width: '45%',
              },
            })}
          >
            <Image
              src={photo1.src}
              width={photo1.width}
              height={photo1.height}
              alt={photo1.alt}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontSize: '16px' }}
            >
              {photo1.caption}
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default LowerImages
