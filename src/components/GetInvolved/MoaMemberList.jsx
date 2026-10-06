import { Box, Link, Typography } from '@mui/material'
import Image from 'next/image'

import { pushToDataLayer } from '../../utils/gtm'
import { formatMoaDate } from '../../utils/moa/format.mjs'
import { VisuallyHidden } from './moaStyles'

// Current MOA members as cards. Reuses the DonatePartners visual tokens in a
// single responsive card (DonatePartners renders each card twice).
const termSx = { fontWeight: 600, color: '#333', fontSize: '14px' }
// Roles like "Outreach/Education/Monitoring" have no break points, so allow
// wrapping anywhere to keep cards inside a 320px viewport.
const detailSx = { m: 0, mb: 1, color: '#000', overflowWrap: 'anywhere' }

const MemberCard = ({ member }) => {
  const { organization, nodeAndRole, dateJoined, url, logoUrl } = member
  const formattedDate = formatMoaDate(dateJoined)

  return (
    <Box
      component="li"
      sx={{
        borderRadius: '15px',
        border: '1px solid black',
        boxShadow: '0 4px 8px #b4cede',
        padding: '1rem 1.5rem',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        minWidth: 0,
      }}
    >
      {logoUrl ? (
        <Box sx={{ flexShrink: 0 }}>
          <Image
            src={logoUrl}
            width={100}
            height={100}
            alt=""
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: 100,
              maxHeight: 100,
            }}
          />
        </Box>
      ) : null}
      <Box sx={{ minWidth: 0 }}>
        <Typography
          component="p"
          sx={{
            fontWeight: 700,
            fontSize: '1.25rem',
            overflowWrap: 'anywhere',
          }}
        >
          {organization}
        </Typography>
        <Box component="dl" sx={{ m: 0, mt: 1 }}>
          {nodeAndRole ? (
            <>
              <Box component="dt" sx={termSx}>
                Node and role
              </Box>
              <Box component="dd" sx={{ ...detailSx, whiteSpace: 'pre-line' }}>
                {nodeAndRole}
              </Box>
            </>
          ) : null}
          <Box component="dt" sx={termSx}>
            Date joined
          </Box>
          <Box component="dd" sx={detailSx}>
            {formattedDate ? (
              <time dateTime={dateJoined}>{formattedDate}</time>
            ) : (
              'Not recorded'
            )}
          </Box>
        </Box>
        {url ? (
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'underline', color: '#1B2B7B' }}
            onClick={() =>
              pushToDataLayer('moa_member_link_click', {
                member_name: organization,
                page: 'get_involved',
              })
            }
          >
            Visit website
            <VisuallyHidden>
              : {organization} (opens in a new tab)
            </VisuallyHidden>
          </Link>
        ) : null}
      </Box>
    </Box>
  )
}

const MoaMemberList = ({ members }) => (
  // role="list" keeps list semantics in Safari/VoiceOver with list-style none.
  <Box
    component="ul"
    role="list"
    sx={{
      listStyle: 'none',
      p: 0,
      m: 0,
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
      gap: 2,
    }}
  >
    {members.map((member, index) => (
      <MemberCard key={`${member.organization}-${index}`} member={member} />
    ))}
  </Box>
)

export default MoaMemberList
