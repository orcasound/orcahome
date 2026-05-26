import MenuIcon from '@mui/icons-material/Menu'
import {
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'

import useIsMobile from '../utils/useIsMobile'

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
  '&:hover': {
    backgroundColor: '#1d4ed8',
  },
  '&.active': {
    backgroundColor: '#2563eb',
  },
}))

const StickyNav = ({ navLinks }) => {
  const isMobile = useIsMobile()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* The Sticky Tab Container */}
      <div
        style={{
          position: 'sticky',
          top: '0',
          zIndex: '11',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '10px 0',
        }}
      >
        <Container maxWidth="lg">
          {isMobile ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
              }}
            >
              <Typography variant="body1" fontWeight="600" color="#1e3a8a">
                Jump to Section
              </Typography>
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: '#1e3a8a' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box sx={{ width: 280, p: 3 }} role="presentation">
                  <Typography
                    variant="h6"
                    sx={{ mb: 3, fontWeight: 700, color: '#1e3a8a' }}
                  >
                    Sections
                  </Typography>
                  <List component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                    {navLinks.map((link) => (
                      <ListItem key={link.id} sx={{ mb: 2, p: 0 }}>
                        <NavLink
                          to={link.id}
                          smooth={true}
                          spy={true}
                          offset={-150}
                          activeClass="active"
                          onClick={() => setDrawerOpen(false)}
                          style={{ width: '100%' }}
                        >
                          {link.name}
                        </NavLink>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </Box>
          ) : (
            <Box
              component="ul"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
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
                  >
                    {link.name}
                  </NavLink>
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </div>
    </>
  )
}

export default StickyNav
