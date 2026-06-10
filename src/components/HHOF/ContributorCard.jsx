/*
 * Author: Stephen Aranda
 * File  : ContributorCard.jsx
 * Desc  : Component that renders all the contributors and their respective roles.
 *  */
import { Box, Link, Typography } from '@mui/material'

import { pushToDataLayer } from '../../utils/gtm'

const contributorText = {
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '140%',
}

const ContributorName = ({ person, sx }) => {
  const textSx = (theme) => ({
    ...contributorText,
    ml: 10,
    width: '80%',
    [theme.breakpoints.down('sm')]: {
      ml: 0,
      width: '100%',
      fontSize: 'small',
      textAlign: 'center',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      ml: 1,
    },
    ...(typeof sx === 'function' ? sx(theme) : sx),
  })

  if (person.link === '') {
    return <Typography sx={textSx}>{person.name}</Typography>
  }

  return (
    <Typography sx={textSx}>
      <Link
        href={person.link}
        sx={{ color: 'primary.main', textDecoration: 'underline' }}
        onClick={() =>
          pushToDataLayer('external_link_click', {
            link_text: person.name,
            destination: person.link,
          })
        }
      >
        {person.name}
      </Link>
    </Typography>
  )
}

// One row for every contributor in every section. The name column optionally
// renders a country line beneath the name (only GSoC contributors have one),
// so all sections share the same column layout and the names line up.
const ContributorRow = ({ person, relaxedNameWidth = false }) => (
  <Box
    sx={(theme) => ({
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        textAlign: 'center',
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        textAlign: 'left',
      },
    })}
  >
    <Box
      sx={(theme) => ({
        width: '20%',
        m: 'auto',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          textAlign: 'center',
        },
        [theme.breakpoints.between('sm', 'lg')]: {
          width: '30%',
          ml: 0,
        },
      })}
    >
      <ContributorName
        person={person}
        sx={
          relaxedNameWidth
            ? (theme) => ({
                width: 'max-content',
                maxWidth: '260px',
                // Restore the base mobile centering this block would otherwise
                // overwrite (ml:0 / textAlign:center), so names don't shift right.
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                  maxWidth: '100%',
                  ml: 0,
                  textAlign: 'center',
                },
              })
            : undefined
        }
      />
      {person.country && (
        <Typography
          sx={(theme) => ({
            ...contributorText,
            ml: 10,
            [theme.breakpoints.down('sm')]: {
              ml: 0,
              textAlign: 'center',
              fontSize: 'small',
            },
            [theme.breakpoints.between('sm', 'lg')]: {
              ml: 1,
            },
          })}
        >
          {person.country}
        </Typography>
      )}
    </Box>

    <Box
      sx={(theme) => ({
        width: '60%',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          textAlign: 'center',
        },
      })}
    >
      {person.roles.map((role) => (
        <Typography
          key={`${person.name}-${role}`}
          sx={(theme) => ({
            ...contributorText,
            ml: 20,
            [theme.breakpoints.down('sm')]: {
              fontSize: 'small',
              mx: 'auto',
              ml: 0,
            },
            [theme.breakpoints.between('sm', 'lg')]: {
              textAlign: 'left',
              mx: 'auto',
              width: '100%',
            },
          })}
        >
          {role}
        </Typography>
      ))}
    </Box>
  </Box>
)

const ContributorCard = ({ contributors, variant = 'standard' }) => {
  return (
    <Box
      className="contributor-card-container"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 3,
        m: 'auto',
      }}
    >
      {contributors.map((person) => (
        <ContributorRow
          key={`${person.name}-${person.country || 'no-country'}`}
          person={person}
          relaxedNameWidth={variant === 'individual'}
        />
      ))}
    </Box>
  )
}

export default ContributorCard
