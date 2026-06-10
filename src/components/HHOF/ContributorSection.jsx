/*
 * Author: Stephen Aranda
 * File  : ContributorSection.jsx
 * Desc  : This component will render a contributor section of the hhof page
 * */
import { Box, Container, Typography } from '@mui/material'

import ContributorCard from './ContributorCard'

const ContributorSection = ({
  title = ``,
  caption = '',
  people,
  listWidth = '80%',
  listVariant = 'standard',
  titleVariant = 'h4',
  compactTitle = false,
}) => {
  return (
    <div className="contributor-sec-container">
      <Container
        maxWidth={false}
        sx={(theme) => ({
          // Unified vertical spacing for every section. Each list sits between
          // navy header boxes; this my gives a consistent gap on both sides
          // (box -> list -> box). Margins collapse, so adjacent sections share
          // one gap rather than stacking.
          my: 6,

          [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },

          [theme.breakpoints.between('sm', 'lg')]: {
            fontSize: 'x-large',
            fontWeight: 'bold',
          },
        })}
      >
        {title === '' ? (
          <Typography>{title}</Typography>
        ) : (
          <Box
            sx={{
              minHeight: compactTitle ? 0 : '10em',
              mt: compactTitle ? 3 : 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant={titleVariant}
              gutterBottom
              sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                  fontSize: 'medium',
                  fontWeight: 'bold',
                },

                [theme.breakpoints.between('sm', 'lg')]: {
                  fontSize: 'x-large',
                  fontWeight: 'bold',
                },
              })}
            >
              {title}
            </Typography>
            <Typography variant="caption">{caption}</Typography>
          </Box>
        )}

        <Box
          sx={(theme) => ({
            width: listWidth,
            mx: 'auto',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            },
            [theme.breakpoints.between('sm', 'lg')]: {
              width: '100%',
            },
          })}
        >
          <ContributorCard contributors={people} variant={listVariant} />
        </Box>
      </Container>
    </div>
  )
}

export default ContributorSection
