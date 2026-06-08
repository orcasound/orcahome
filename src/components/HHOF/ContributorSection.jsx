/*
 * Author: Stephen Aranda
 * File  : ContributorSection.jsx
 * Desc  : This component will render a contributor section of the hhof page
 * */
import { Box, Container, Typography } from '@mui/material'

import Contributorcard from './ContributorCard'

const ContributorSection = ({ title = ``, caption = '', people }) => {
  return (
    <div className="contributor-sec-container">
      <Container
        maxWidth="x-lg"
        sx={(theme) => ({
          [theme.breakpoints.between('phone', 'sm')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },

          [theme.breakpoints.between('tablet', 'lg')]: {
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
              minHeight: '10em',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={(theme) => ({
                [theme.breakpoints.between('phone', 'sm')]: {
                  fontSize: 'medium',
                  fontWeight: 'bold',
                },

                [theme.breakpoints.between('tablet', 'lg')]: {
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

        <Contributorcard contributors={people} />
      </Container>
    </div>
  )
}

export default ContributorSection
