/*
 * Author: Stephen Aranda
 * File  : LowerImages.jsx
 * Desc  : Component that renders the lower images above the footer.
 *  */

import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  styled,
  Typography,
} from '@mui/material'
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

          [theme.breakpoints.between('phone', 'sm')]: {
            width: '100vw',
            flexDirection: 'column',
          },
          [theme.breakpoints.between('tablet', 'lg')]: {
            m: 'auto',
            width: '97vw',
          },
        })}
      >
        <Box
          sx={(theme) => ({
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 10,

            [theme.breakpoints.between('phone', 'sm')]: {
              width: '100vw',
              flexDirection: 'column',
            },
            [theme.breakpoints.between('tablet', 'lg')]: {
              gap: 7,
              width: '100vw',
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

              [theme.breakpoints.between('phone', 'sm')]: {
                width: '90%',
              },
              [theme.breakpoints.between('tablet', 'lg')]: {
                width: '45%',
              },
            })}
          >
            <Image
              src={hackCollab}
              alt="Erika facilitating an early discussion of machine learning and the orca data repository"
              style={{
                width: '100%',
                height: '20em',
                borderRadius: '20px',
              }}
            />
            <Typography
              variant="caption"
              sx={(theme) => ({
                color: 'text.secondary',
                width: '80%',
                [theme.breakpoints.between('phone', 'sm')]: {
                  width: '100%',
                },
                [theme.breakpoints.between('tablet', 'lg')]: {
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

              width: '50%',
              mb: 2.5, // This is to push up the bottom to align hack val with the hacker collab image

              [theme.breakpoints.between('phone', 'sm')]: {
                width: '90%',
              },
              [theme.breakpoints.between('tablet', 'lg')]: {
                width: '45%',
              },
            })}
          >
            <Image
              src={hackVal}
              alt="Val working on the Orcanode software and hardware."
              style={{
                width: '100%',
                height: '20em',
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
