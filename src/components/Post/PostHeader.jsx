import { Chip, Link as MuiLink, Stack, Typography } from '@mui/material'

// Top of a blog post or project page: back link, title, date and byline, and
// chips (tags or categories). Authors link to their blog archive.
const PostHeader = ({
  backHref,
  backLabel,
  title,
  date,
  authors = [],
  chips = [],
}) => {
  const people = authors.filter((a) => a && a.name)
  const showMeta = Boolean(date) || people.length > 0
  return (
    <>
      <MuiLink
        href={backHref}
        variant="body2"
        sx={{ display: 'inline-block', mb: 3 }}
      >
        &larr; {backLabel}
      </MuiLink>

      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>

      {showMeta && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {date}
          {people.length > 0 && (date ? ' · By ' : 'By ')}
          {people.map((a, i) => (
            <span key={a.slug || a.name}>
              {i > 0 && (i === people.length - 1 ? ' & ' : ', ')}
              {a.slug ? (
                <MuiLink href={`/blog/author/${a.slug}`}>{a.name}</MuiLink>
              ) : (
                a.name
              )}
            </span>
          ))}
        </Typography>
      )}

      {chips.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ mb: 4 }}
        >
          {chips.map((chip) => (
            <Chip key={chip} label={chip} size="small" />
          ))}
        </Stack>
      )}
    </>
  )
}

export default PostHeader
