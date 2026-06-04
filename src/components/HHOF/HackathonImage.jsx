/*
 * Author: Stephen Aranda
 * File  : HackathonImage.jsx
 * Desc  : This component is specifically for the hackathon image in the top section of HHOF page
 *
 */

import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'

import hackathon from '../../../public/images/getinvolved/hackathon.png'

const HackathonImage = () => {
  return (
    <div className="hackathon-image-container">
      <Image
        src={hackathon}
        alt="Orcasound at a democracy lab hackathon in Seattle"
        height={368}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          borderRadius: '20px',
        }}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Orcasound at a democracy lab hackathon in Seattle (photo by Mark
        Frischmuth).
      </Typography>
    </div>
  )
}

export default HackathonImage
