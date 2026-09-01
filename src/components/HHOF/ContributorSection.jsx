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
  listMaxWidth = 840,
  titleVariant = 'h4',
  compactTitle = false,
}) => {
  return (
    <div className="contributor-sec-container">
      <Container
        maxWidth={false}
        disableGutters
        sx={(theme) => ({
          width: 'calc(100% - 32px)',
          maxWidth: listMaxWidth,
          mx: 'auto',
          my: { xs: 5, sm: 6 },

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
              mt: compactTitle ? 2 : 0,
              mb: 3,
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
            <Typography variant="body1">{caption}</Typography>
          </Box>
        )}

        <Box
          sx={(theme) => ({
            width: listWidth,
            maxWidth: listMaxWidth,
            mx: 'auto',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
              maxWidth: '100%',
            },
            [theme.breakpoints.between('sm', 'lg')]: {
              width: '100%',
              maxWidth: listMaxWidth,
            },
          })}
        >
          <ContributorCard contributors={people} />
        </Box>
      </Container>
    </div>
  )
}

export default ContributorSection
