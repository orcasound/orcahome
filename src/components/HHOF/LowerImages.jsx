/*
 * Author: Stephen Aranda
 * File  : LowerImages.jsx
 * Desc  : Component that renders the lower images above the footer.
 *  */

import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'

import hackCollab from '../../../public/images/hackerHallOfFame/Hacker_Collab.png'
import hackVal from '../../../public/images/hackerHallOfFame/Hacker_Val.png'
const LowerImages = () => {
  return (
    <div className="lower-images-container">
      {/*final pictures above footer */}
      <Container
        maxWidth={false}
        disableGutters
        sx={(theme) => ({
          width: '70%',
          mb: 4, // breathing room between the photos and the footer

          [theme.breakpoints.down('sm')]: {
            width: '100%',
            flexDirection: 'column',
          },
          [theme.breakpoints.between('sm', 'lg')]: {
            m: 'auto',
            width: '97%',
          },
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
                width: '90%',
              },
              [theme.breakpoints.between('sm', 'lg')]: {
                width: '45%',
              },
            })}
          >
            <Image
              src={hackCollab}
              alt="Erika facilitating an early discussion of machine learning and the orca data repository"
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
                width: '80%',
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
                [theme.breakpoints.between('sm', 'lg')]: {
                  width: '100%',
                },
              })}
            >
              Erika facilitating an early discussion of machine learning and the
              Orcadata repository.
            </Typography>
          </Box>

          <Box
            sx={(theme) => ({
              display: 'grid',
              gridTemplateColumns: '100%',

              width: '45%',

              [theme.breakpoints.down('sm')]: {
                width: '90%',
              },
              [theme.breakpoints.between('sm', 'lg')]: {
                width: '45%',
              },
            })}
          >
            <Image
              src={hackVal}
              alt="Val working on the Orcanode software and hardware."
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '20px',
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Val working on the Orcanode software and hardware.
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default LowerImages
