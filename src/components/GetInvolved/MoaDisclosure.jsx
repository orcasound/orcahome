import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Typography } from '@mui/material'

import { pushToDataLayer } from '../../utils/gtm'

// One expand/collapse panel of the MOA text. A real <button> inside a real
// heading (MUI Accordion renders a div role="button" and keeps collapsed
// content in the DOM). Collapsed panels use `hidden`, so they are out of the
// tab and reading order.
const MoaDisclosure = ({
  index,
  heading,
  paragraphs = [],
  items = [],
  isOpen,
  onToggle,
}) => {
  const toggleId = `moa-toggle-${index}`
  const panelId = `moa-panel-${index}`

  const handleClick = () => {
    pushToDataLayer('moa_section_toggle', {
      section: heading,
      action: isOpen ? 'collapse' : 'expand',
      page: 'get_involved',
    })
    onToggle()
  }

  return (
    <Box>
      <Typography component="h6" sx={{ m: 0 }}>
        <Box
          component="button"
          type="button"
          id={toggleId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={handleClick}
          sx={{
            all: 'unset',
            boxSizing: 'border-box',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
            py: 1.5,
            borderBottom: '1px solid #000',
            font: 'inherit',
            fontWeight: 600,
            fontSize: '20px',
            '&:focus-visible': {
              outline: '3px solid #1B2B7B',
              outlineOffset: '2px',
            },
          }}
        >
          <span>{heading}</span>
          {/* State is announced through aria-expanded; this label is visual. */}
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: '#1B2B7B',
              fontSize: '16px',
            }}
          >
            {isOpen ? 'Hide' : 'Show'}
            <ExpandMoreIcon
              sx={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
            />
          </Box>
        </Box>
      </Typography>
      {/* Never set `display` here outside print: an author display value
          overrides the hidden attribute and would expose collapsed content. */}
      <Box
        id={panelId}
        role="region"
        aria-labelledby={toggleId}
        hidden={!isOpen}
        sx={{ py: 2, '@media print': { display: 'block !important' } }}
      >
        {paragraphs.map((paragraph, i) => (
          <Typography
            key={i}
            component="p"
            fontSize="18px"
            lineHeight="28px"
            sx={{ mb: 2 }}
          >
            {paragraph}
          </Typography>
        ))}
        {items.length > 0 && (
          <Box component="ul" sx={{ pl: 3, my: 0 }}>
            {items.map((item, i) => (
              <Typography
                key={i}
                component="li"
                fontSize="18px"
                lineHeight="28px"
                sx={{ mb: 1 }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default MoaDisclosure
