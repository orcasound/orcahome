/*
 * File : SectionHeader.jsx
 * Desc : Renders a section header card from config (see hhofSectionHeaders).
 *        Navy headers use SectionHeaderBox; non-navy ones (PodCast) use the
 *        same centered layout without the navy chrome. Title, subtitle and any
 *        description paragraphs come from the config object.
 */
import { Box, Typography } from '@mui/material'

import SectionHeaderBox from './SectionHeaderBox'

const SectionHeader = ({
  id,
  navy = true,
  boxSx,
  title,
  titleSx,
  titleGutterBottom = false,
  subtitle,
  subtitleVariant = 'fontStyling',
  descriptions = [],
}) => {
  const content = (
    <>
      <Typography variant="h4" gutterBottom={titleGutterBottom} sx={titleSx}>
        {title}
      </Typography>
      {subtitle && <Typography variant="h6">{subtitle}</Typography>}
      {descriptions.map((d) => (
        <Typography key={d.key} variant={d.variant} sx={d.sx}>
          {d.node}
        </Typography>
      ))}
    </>
  )

  if (navy) {
    return (
      <SectionHeaderBox id={id} sx={boxSx}>
        {content}
      </SectionHeaderBox>
    )
  }

  return (
    <Box
      id={id}
      sx={{
        minHeight: '10em',
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...boxSx,
      }}
    >
      {content}
    </Box>
  )
}

export default SectionHeader
