/*
 * Author: Stephen Aranda
 * File  : HackathonImage.jsx
 * Desc  : This component is specifically for the hackathon image in the top section of HHOF page
 *
 */

import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import hackathon from '../../../public/images/getinvolved/hackathon.png'

const HackathonImage = () => {
  return (
    <Box
      className="hackathon-image-container"
      sx={{
        width: '100%',
        maxWidth: 573,
        mx: 'auto',
        textAlign: 'center',
        '& img': {
          display: 'block',
          mx: 'auto',
          width: '100%',
          height: {
            xs: 'auto',
            sm: '368px',
          },
          objectFit: 'cover',
          borderRadius: '20px',
        },
      }}
    >
      <Image
        src={hackathon}
        alt="Orcasound at a democracy lab hackathon in Seattle"
        width={573}
        height={368}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <Typography
        variant="caption"
        sx={{ color: 'text.secondary', display: 'block' }}
      >
        Orcasound at a democracy lab hackathon in Seattle (photo by Mark
        Frischmuth).
      </Typography>
    </Box>
  )
}

export default HackathonImage
