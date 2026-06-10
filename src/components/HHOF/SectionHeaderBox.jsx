/*
 * File : SectionHeaderBox.jsx
 * Desc : The navy header card used by the Founders / Influencers sections.
 *        Holds the shared "chrome" (navy background, rounded corners, shadow,
 *        centered white text); each caller passes its own content as children
 *        and any size/width tweaks via the `sx` prop.
 */
import { Box } from '@mui/material'

const SectionHeaderBox = ({ id, children, sx }) => (
  <Box
    id={id}
    sx={(theme) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4, // breathing room so text isn't flush against the card edges
      color: 'white',
      backgroundColor: theme.palette.hhofNavy.main,
      borderRadius: '20px',
      boxSizing: 'border-box',
      boxShadow: '10px 10px 5px 2px rgba(0,0,0,0.23)',
      ...(typeof sx === 'function' ? sx(theme) : sx),
    })}
  >
    {children}
  </Box>
)

export default SectionHeaderBox
