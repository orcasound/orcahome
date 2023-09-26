import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import { Box, Button, Grid, IconButton } from '@mui/material'
import Image from 'next/image'
import React from 'react'

import OrcaSound from '../../../public/images/learn/orcasound.png'

const CallCatalogGrid = () => {
  return (
    <div>
      <Box
        sx={{
          borderRadius: '33px',
          bgcolor: '#ffff',
          my: '50px',
          py: '50px',
          px: '90px',
          textAlign: 'center',
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 12 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={index}
              sx={{
                position: 'relative',
              }}
            >
              <Image src={OrcaSound} alt="OrcaCall" style={{ width: '100%' }} />
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 85,
                  bottom: 45,
                  color: '#c4c4c4',
                }}
              >
                <PlayCircleIcon
                  sx={{
                    fontSize: 100,
                  }}
                />
              </IconButton>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{
            borderRadius: '30px',
            mt: 10,
            py: 2,
            px: 5,
          }}
        >
          Access Call Catalog
        </Button>
      </Box>
    </div>
  )
}

export default CallCatalogGrid
