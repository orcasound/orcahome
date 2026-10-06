import { Link, Typography } from '@mui/material'

import { pushToDataLayer } from '../../utils/gtm'
import { safeLinkHref } from '../../utils/moa/safeUrl.mjs'

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
      // Sanity hrefs are untrusted: drop the anchor (keep the text) unless
      // the value is http(s), mailto:, a same-site path, or an in-page anchor.
      const href = safeLinkHref(value?.href)
      if (!href) return <>{children}</>
      const isInternal = href.startsWith('/') || href.startsWith('#')

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
