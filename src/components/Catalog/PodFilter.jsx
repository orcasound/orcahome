import { Box, Button } from '@mui/material'

import { POD_FILTERS } from './constants'

export default function PodFilter({ activePod, onSelect }) {
  return (
    <Box
      role="group"
      aria-label="Filter calls by pod"
      sx={{
        display: 'flex',
        gap: 8,
        mb: 5,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {POD_FILTERS.map((filter) => (
        <Button
          key={filter}
          onClick={() => onSelect(filter)}
          aria-pressed={activePod === filter}
          sx={{
            fontFamily: 'Montserrat',
            fontWeight: 400,
            fontSize: '20px',
            textTransform: 'none',
            padding: '13px 22px',
            height: '59px',
            width: '144px',
            borderRadius: '10px',
            bgcolor: activePod === filter ? '#0f1a4d' : '#1B2B7B',
            color: '#FFFFFF',
            '&:hover': {
              bgcolor: activePod === filter ? '#0f1a4d' : '#2d3ea3',
            },
          }}
        >
          {filter}
        </Button>
      ))}
    </Box>
  )
}
