import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import Link from 'next/link'

// One card in the /blog and /projects grids: image, a small meta line (date
// and/or byline), title, excerpt, and chips (tags or categories). A link to
// another site (the projects page's empty-dataset fallback) opens in a new tab.
const ContentCard = ({
  href,
  imageUrl,
  imageAlt,
  meta,
  title,
  excerpt,
  chips = [],
  onClick,
}) => {
  const external = /^https?:\/\//.test(href)
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ textDecoration: 'none' }}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'box-shadow 0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        {imageUrl && (
          <CardMedia
            component="img"
            image={imageUrl}
            alt={imageAlt || title || ''}
            sx={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          {meta && (
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              gutterBottom
            >
              {meta}
            </Typography>
          )}
          <Typography variant="h6" component="h2" gutterBottom>
            {title}
          </Typography>
          {excerpt && (
            <Typography variant="body2" color="text.secondary">
              {excerpt}
            </Typography>
          )}
          {chips.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ mt: 2 }}
            >
              {chips.map((chip) => (
                <Chip key={chip} label={chip} size="small" />
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default ContentCard
