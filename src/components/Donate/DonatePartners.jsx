import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

const partners = [
  {
    icon: '/images/donatePartners/center for whale research 1.svg',
    name: 'The Center for Whale Research',
    description:
      "The Center for Whale Research helps the U.S. and Canadian governments with conservation and share whales'stories with the public.",
    linkTo: 'https://www.whaleresearch.com/supportcwr',
  },
  {
    icon: '/images/donatePartners/DeepGreenWildernes.svg',
    name: 'Deep Green Wilderness',
    description:
      'Deep Green Wilderness provides public educational experiences to create ambassadors for marine animals and ecosystems.',
    linkTo: 'https://www.deepgreenwilderness.com/donate',
  },
  {
    icon: '/images/donatePartners/FOLKS-Orange.svg',
    name: 'F.O.L.K.S',
    description:
      "F.O.L.K.S. provides visitors with education on the Salish Sea's diverse marine ecosystem.",
    linkTo: 'https://folkssji.org/donate/',
  },
  {
    icon: '/images/donatePartners/orca-behavior-institute-logo-white.svg',
    name: 'Orca Behaviour Institute',
    description:
      'Orca Behavior Institute conducts non-invasive research on orcas and helps others learn how to protect these animals.',
    linkTo: 'https://orcabehaviorinstitute.org/',
  },
  {
    icon: '/images/donatePartners/OrcaConservancy.svg',
    name: 'Orca Conservancy',
    description:
      'Orca Conservancy aims to preserve and protect Southern Resident killer whales.',
    linkTo: 'https://www.orcaconservancy.org/donate',
  },
  {
    icon: '/images/donatePartners/Orca-Network-Logo.svg',
    name: 'Orca Network',
    description:
      'Orca Network provides education and a sighting report system on whales. You can volunteer and learn more at their Langley Whale Center.',
    linkTo: 'https://www.orcanetwork.org/donate',
  },
  {
    icon: '/images/donatePartners/port townsend marine research center.svg',
    name: 'Port Townsend Marine Science Center',
    description:
      'Port Townsend Marine Science Center offers education, science, and volunteer opportunities on the Salish Sea.',
    linkTo: 'https://ptmsc.org/get-involved/donate',
  },
  {
    icon: '/images/donatePartners/Rectangle 887.svg',
    name: 'Project SeaWolf',
    description:
      'Project SeaWolf works to promote and protect the biodiversity of the Pacific Northwest.',
    linkTo: 'https://www.projectseawolf.org/How_to_Help.html',
  },
  {
    icon: '/images/donatePartners/Sounds Action.svg',
    name: 'Sound Action',
    description:
      'Sound Action is a watchdog group that ensures new developments in Washington state that may affect orcas and their habitats adhere to science and state law.',
    linkTo:
      'https://crm.bloomerang.co/HostedDonation?ApiKey=pub_d0480152-d37a-11ea-b90d-0a908e1cc508&WidgetId=808960',
  },
  {
    icon: '/images/donatePartners/vashonNatureCenterLogo.svg',
    name: 'Vashon Nature Center',
    description:
      'Vashon Nature Center helps volunteers conduct research on the plants and animals of the Vashon-Maury Islands and the Salish Sea.',
    linkTo: 'https://vashonnaturecenter.org/donate/',
  },
  {
    icon: '/images/donatePartners/TheWhaleTrail-LogoSpyhop_RGB.svg',
    name: 'The Whale Trail ',
    description:
      'The Whale Trail identifies orca migration paths along the Salish Sea and Pacific Coast.',
    linkTo: 'https://thewhaletrail.org/connect/donate/',
  },
]

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

const DonatePartners = () => {
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
          Donate to our 501(c)3 Partners
        </Typography>
        <Typography sx={{ fontSize: { xs: '15px', md: '19px' } }}>
          Contribute to our partners to support on-going conservation, research,
          and education efforts.
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
