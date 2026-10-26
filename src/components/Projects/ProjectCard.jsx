import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import Link from 'next/link'

import { formatByline } from '../Blog/blogFormat'

// One card on /projects, styled like the blog listing cards: image, byline,
// title, short description, categories. Projects aren't dated news, so the
// caption line shows only the authors. The empty-dataset fallback links to the
// old WordPress pages, which open in a new tab.
const ProjectCard = ({ project, onClick }) => {
  const external = /^https?:\/\//.test(project.url)
  const byline = formatByline(project.authors)
  return (
    <Link
      href={project.url}
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
        {project.imageUrl && (
          <CardMedia
            component="img"
            image={project.imageUrl}
            alt={project.imageAlt || project.title || ''}
            sx={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
          />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          {byline && (
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              gutterBottom
            >
              By {byline}
            </Typography>
          )}
          <Typography variant="h6" component="h2" gutterBottom>
            {project.title}
          </Typography>
          {project.excerpt && (
            <Typography variant="body2" color="text.secondary">
              {project.excerpt}
            </Typography>
          )}
          {project.categories?.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ mt: 2 }}
            >
              {project.categories.map((category) => (
                <Chip key={category} label={category} size="small" />
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProjectCard
