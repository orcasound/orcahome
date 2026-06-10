/*
 * File : hhofSectionHeaders.jsx
 * Desc : Config data for the section header cards (Founders / Influencers /
 *        PodCast). Plain fields (title, subtitle, navy) are data; descriptions
 *        are JSX nodes because one embeds a link and they carry responsive sx.
 *        Rendered by <SectionHeader/>. (Eventually this content moves to Sanity.)
 */
import { Link } from '@mui/material'

export const foundersHeader = {
  id: 'scroll-link',
  navy: true,
  boxSx: (theme) => ({
    minHeight: '20em',
    minWidth: '100%',
    gap: 1,
    mt: 4.5,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      width: '100%',
      height: '80%',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      fontSize: 'x-large',
      height: '80%',
      width: '100%',
    },
  }),
  title: 'Founders',
  titleSx: (theme) => ({
    [theme.breakpoints.between('sm', 'lg')]: {
      fontSize: 'x-large',
    },
  }),
  subtitle: '(Long-Term Contributors)',
  subtitleVariant: 'fontStyling',
  descriptions: [
    {
      sx: (theme) => ({
        width: '90%',
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '140%',
        [theme.breakpoints.between('sm', 'lg')]: {
          fontSize: 'x-large',
        },
      }),
      node: (
        <>
          Like{' '}
          <Link
            sx={{ color: 'white', textDecoration: 'underline' }}
            href="https://www.orcasound.net/join/"
            target="_blank"
            rel="noopener"
          >
            Orcasound organizational members
          </Link>
          (who have their own amazing volunteers!), founders can raise funds
          under the auspices of Orcasound to support their own Orcasound efforts
          or the project in general. The also have shown leadership in the
          community and often have administrative access to key parts of the
          Orcasound infrastructure.
        </>
      ),
    },
    {
      variant: 'fontStyling',
      sx: (theme) => ({
        display: {
          xs: 'none',
          sm: 'block',
        },
        width: '90%',
        fontSize: '20px',
        fontWeight: '500',
        lineHeight: '140%',
        [theme.breakpoints.down('sm')]: {
          width: '100%',
          flexDirection: 'column',
        },
        [theme.breakpoints.between('sm', 'lg')]: {
          fontSize: 'x-large',
          display: 'block',
        },
      }),
      node: 'Founders can raise funds under the auspices of Orcasound to support their own Orcasound efforts or the project in general.',
    },
  ],
}

export const influencersHeader = {
  navy: true,
  boxSx: {
    minHeight: '10em',
    width: {
      xs: '95%',
      lg: '45%',
    },
    mx: 'auto',
  },
  title: 'Influencers',
  titleGutterBottom: true,
  subtitle: '(Major Contributors)',
  subtitleVariant: 'body2',
  descriptions: [
    {
      variant: 'body1',
      sx: (theme) => ({
        textAlign: 'center',
        display: {
          xs: 'block',
          sm: 'none',
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: 'small',
        },
        [theme.breakpoints.between('sm', 'lg')]: {
          display: 'none',
        },
      }),
      node: 'Founders can raise funds under the auspices of Orcasound to support their own Orcasound efforts or the project in general.',
    },
  ],
}

export const podcastHeader = {
  navy: false,
  title: 'PodCast',
  titleGutterBottom: true,
  titleSx: (theme) => ({
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'medium',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    [theme.breakpoints.between('sm', 'lg')]: {
      fontSize: 'x-large',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  }),
  subtitle: '(ML-Assisted Annotation Tool)',
  subtitleVariant: 'caption',
}
