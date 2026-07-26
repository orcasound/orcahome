import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

import partners from '../../data/donatePartners.json'
import { pushToDataLayer } from '../../utils/gtm'

const TitleContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1b2b7b',
  borderRadius: '15px',
  color: 'white',
  padding: '16px',
  marginBottom: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
  [theme.breakpoints.up('lg')]: {
    backgroundColor: '#485595',
  },
}))

const PartnerCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: '15px',
  border: '1px solid black',
  padding: '1rem 2rem',
  marginBottom: '16px',
  alignItems: 'center',
  boxShadow: '0 4px 8px #b4cede',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}))

const MobilePartnerCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '15px',
  border: '1px solid black',
  padding: '0.6rem',
  marginBottom: '16px',
  alignItems: 'center',
  boxShadow: '0 4px 8px #b4cede',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

const StyledLink = styled('a')({
  textDecoration: 'none',
  '& span': {
    textDecoration: 'underline',
  },
})

const DEFAULT_PARTNERS_TITLE = 'Support our 501(c)3 Partners'
const DEFAULT_PARTNERS_DESCRIPTION =
  'Contribute to our partners to support on-going conservation, research, and education efforts.'

const DonatePartners = ({ title, description }) => {
  return (
    <>
      <TitleContainer>
        <Typography
          sx={{
            fontSize: { xs: '24px', md: '30px' },
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: { xs: '0.5rem', md: 0 },
          }}
        >
          {title || DEFAULT_PARTNERS_TITLE}
        </Typography>
        <Typography sx={{ fontSize: { xs: '15px', md: '19px' } }}>
          {description || DEFAULT_PARTNERS_DESCRIPTION}
        </Typography>
      </TitleContainer>
      {/* Mobile */}
      <Box>
        {partners.map((partner, index) => (
          <MobilePartnerCard key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                '& img': {
                  width: '4rem',
                  height: '4rem',
                  marginRight: '1rem',
                },
              }}
            >
              <Image
                width={100}
                height={100}
                src={partner.icon}
                alt={partner.name}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
              />
              <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                {partner.name}
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '0.7rem', padding: '0.8rem 1rem' }}>
                {partner.description}
              </Typography>
              <Box
                sx={{
                  fontSize: '0.7rem',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <StyledLink
                  href={partner.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    pushToDataLayer('partner_link_click', {
                      partner_name: partner.name,
                      page: 'donate',
                    })
                  }
                >
                  <span>Learn more</span> &gt;&gt;
                </StyledLink>
              </Box>
            </Box>
          </MobilePartnerCard>
        ))}
      </Box>
      {/* Tablet & Laptop */}
      <Box>
        {partners.map((partner, index) => (
          <PartnerCard key={index}>
            <Box sx={{ marginRight: '20px', flexShrink: 0 }}>
              <Image
                width={100}
                height={100}
                src={partner.icon}
                alt={partner.name}
                style={{
                  width: 'auto',
                  height: 'auto',
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'column', lg: 'row' },
                justifyContent: { lg: 'space-between' },
                width: '100%',
              }}
            >
              <Box sx={{ width: { lg: '85%' } }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  {partner.name}
                </Typography>
                <Typography sx={{ fontSize: '1rem', padding: '0.1rem 0' }}>
                  {partner.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  fontSize: { md: '1rem', lg: '0.8rem' },
                  display: 'flex',
                  justifyContent: { md: 'flex-end' },
                  alignItems: { lg: 'flex-end' },
                }}
              >
                <StyledLink
                  href={partner.linkTo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    pushToDataLayer('partner_link_click', {
                      partner_name: partner.name,
                      page: 'donate',
                    })
                  }
                >
                  <span>Learn more</span> &gt;&gt;
                </StyledLink>
              </Box>
            </Box>
          </PartnerCard>
        ))}
      </Box>
    </>
  )
}

export default DonatePartners
