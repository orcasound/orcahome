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

const mobileSmall = (theme) => ({
  [theme.breakpoints.down('sm')]: { fontSize: 'small' },
})

const contributorGrid = {
  columns: 'minmax(220px, 0.38fr) minmax(360px, 0.62fr)',
  tabletColumns: 'minmax(190px, 0.38fr) minmax(300px, 0.62fr)',
  columnGap: { sm: 4, md: 6 },
}

const ContributorName = ({ person }) => {
  const sx = (theme) => ({ ...contributorText, ...mobileSmall(theme) })

  if (person.link === '') {
    return <Typography sx={sx}>{person.name}</Typography>
  }

  return (
    <Typography sx={sx}>
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

// One row per contributor: a name column (with an optional country line; only
// GSoC contributors have one) and a roles column. CSS grid gives every row the
// same text rails without hard-coded left margins.
const ContributorRow = ({ person }) => (
  <Box
    sx={(theme) => ({
      display: 'grid',
      gridTemplateColumns: contributorGrid.columns,
      columnGap: contributorGrid.columnGap,
      alignItems: 'start',
      width: '100%',
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        justifyItems: 'center',
        textAlign: 'center',
        rowGap: 0,
      },
      [theme.breakpoints.between('sm', 'md')]: {
        gridTemplateColumns: contributorGrid.tabletColumns,
      },
    })}
  >
    <Box
      sx={(theme) => ({
        minWidth: 0,
        [theme.breakpoints.down('sm')]: { width: '100%' },
      })}
    >
      <ContributorName person={person} />
      {person.country && (
        <Typography
          sx={(theme) => ({ ...contributorText, ...mobileSmall(theme) })}
        >
          {person.country}
        </Typography>
      )}
    </Box>

    <Box
      sx={(theme) => ({
        minWidth: 0,
        [theme.breakpoints.down('sm')]: { width: '100%' },
      })}
    >
      {person.roles.map((role) => (
        <Typography
          key={`${person.name}-${role}`}
          sx={(theme) => ({ ...contributorText, ...mobileSmall(theme) })}
        >
          {role}
        </Typography>
      ))}
    </Box>
  </Box>
)

const ContributorCard = ({ contributors }) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '35px',
        mx: 'auto',
      }}
    >
      {contributors.map((person) => (
        <ContributorRow
          key={`${person.name}-${person.country || 'no-country'}`}
          person={person}
        />
      ))}
    </Box>
  )
}

export default ContributorCard
