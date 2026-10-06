import { Link, Typography } from '@mui/material'

import { pushToDataLayer } from '../../utils/gtm'

export const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Typography variant="p" fontSize="20px" paragraph={true} align="left">
        {children}
      </Typography>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const isInternal = href.startsWith('/')

      return (
        <Link
          href={href}
          sx={{ textDecoration: 'underline', color: '#1B2B7B' }}
          onClick={(event) =>
            pushToDataLayer(
              isInternal ? 'jump_link_click' : 'external_link_click',
              {
                link_text: event.currentTarget.textContent,
                destination: href,
                page: 'get_involved',
              }
            )
          }
        >
          {children}
        </Link>
      )
    },
  },
}
