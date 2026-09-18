import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link as ScrollLink } from 'react-scroll'

const NavLink = styled(ScrollLink)(() => ({
  display: 'block',
  padding: '12px 24px',
  backgroundColor: '#1e3a8a',
  color: 'white',
  borderRadius: '8px',
  fontWeight: 500,
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  textDecoration: 'none',
  '@media (max-width: 600px)': {
    position: 'sticky',
    fontSize: 'clamp(12px, 3vw, 16px)',
    padding: '8px 6px',
  },

  '&:hover': {
    backgroundColor: '#1d4ed8',
  },
  '&.active': {
    backgroundColor: '#2563eb',
  },
}))

const StickyNav = ({ navLinks, onLinkClick, id }) => {
  return (
    <Box
      component="nav"
      id={id}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 11,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        py: 1.25, // equivalent to 10px if using default 8px spacing (1.25 * 8)
      }}
    >
      {/* The Sticky Tab Container */}
      <Container>
        <Box
          component="ul"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: 1.5,
            justifyContent: 'center',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {navLinks.map((link) => (
            <Box component="li" key={link.id}>
              <NavLink
                to={link.id}
                smooth={true}
                spy={true}
                offset={-150}
                activeClass="active"
                onClick={() => onLinkClick?.(link)}
              >
                {link.name}
              </NavLink>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default StickyNav
