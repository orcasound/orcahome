import {
  Box,
  Divider,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import Link from '../Link'

// Renders an editor guide (docs/editor-guide/*.md) with the site's styles.
// Guides link to each other as `blog.md#section`; on the site that becomes
// `/editor-guide/blog#section`, and README.md is the guide home.

const headingId = (children) =>
  String(Array.isArray(children) ? children.join('') : children)
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .trim()
    .replace(/ /g, '-')

const textOf = (node) =>
  typeof node === 'string'
    ? node
    : Array.isArray(node)
    ? node.map(textOf).join('')
    : node?.props?.children
    ? textOf(node.props.children)
    : ''

export const guideHref = (href = '') => {
  if (/^(https?:|mailto:|#)/.test(href)) return href
  const [file, hash] = href.split('#')
  if (!file.endsWith('.md')) return href
  const slug = file.replace(/\.md$/, '')
  const path = slug === 'README' ? '/editor-guide' : `/editor-guide/${slug}`
  return hash ? `${path}#${hash}` : path
}

const Heading = (level, variant, sx) => {
  const GuideHeading = ({ children }) => (
    <Typography
      id={headingId(textOf(children))}
      component={`h${level}`}
      variant={variant}
      sx={{ scrollMarginTop: 96, ...sx }}
    >
      {children}
    </Typography>
  )
  GuideHeading.displayName = `GuideH${level}`
  return GuideHeading
}

const components = {
  h1: Heading(1, 'h3', { mb: 3 }),
  h2: Heading(2, 'h4', { mt: 6, mb: 2 }),
  h3: Heading(3, 'h5', { mt: 4, mb: 1.5 }),
  p: ({ children }) => (
    <Typography variant="body1" paragraph>
      {children}
    </Typography>
  ),
  li: ({ children }) => (
    <Typography component="li" variant="body1" sx={{ mb: 0.75 }}>
      {children}
    </Typography>
  ),
  ul: ({ children }) => (
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  a: ({ href, children }) => {
    const target = guideHref(href)
    return /^https?:/.test(target) ? (
      <MuiLink href={target} target="_blank" rel="noopener noreferrer">
        {children}
      </MuiLink>
    ) : (
      <Link href={target}>{children}</Link>
    )
  },
  img: ({ src, alt }) => (
    <Box
      component="img"
      src={src}
      alt={alt || ''}
      loading="lazy"
      sx={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        my: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    />
  ),
  blockquote: ({ children }) => (
    <Box
      component="aside"
      sx={{
        my: 3,
        px: 2.5,
        py: 1.5,
        bgcolor: 'grey.100',
        borderLeft: '4px solid',
        borderColor: 'primary.main',
        borderRadius: 1,
        '& p:last-child': { mb: 0 },
      }}
    >
      {children}
    </Box>
  ),
  hr: () => <Divider sx={{ my: 5 }} />,
  code: ({ children }) => (
    <Box
      component="code"
      sx={{
        px: 0.5,
        bgcolor: 'grey.100',
        borderRadius: 0.5,
        fontSize: '0.9em',
        overflowWrap: 'anywhere',
      }}
    >
      {children}
    </Box>
  ),
  table: ({ children }) => (
    <TableContainer sx={{ my: 3, overflowX: 'auto' }}>
      <Table size="small">{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }) => <TableHead>{children}</TableHead>,
  tbody: ({ children }) => <TableBody>{children}</TableBody>,
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  th: ({ children }) => (
    <TableCell component="th" sx={{ fontWeight: 600, verticalAlign: 'top' }}>
      {children}
    </TableCell>
  ),
  td: ({ children }) => (
    <TableCell sx={{ verticalAlign: 'top' }}>{children}</TableCell>
  ),
}

const GuideMarkdown = ({ markdown }) => (
  <Markdown remarkPlugins={[remarkGfm]} components={components}>
    {markdown}
  </Markdown>
)

export default GuideMarkdown
