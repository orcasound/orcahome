import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { pushToDataLayer } from '../../utils/gtm'
import { toSlug } from '../../utils/taxonomySlug'
import AboutItems from '../About/db.json'
import { formatByline } from '../Blog/blogFormat'
import ContentCard from '../Post/ContentCard'

const DESCRIPTION =
  'Hydrophone locations, research, and outreach from the Orcasound community.'

// With an empty dataset (or Sanity unreachable), fall back to the About page's
// built-in project cards so the page still lists something.
const FALLBACK = AboutItems.map((item) => ({
  title: item.title.trim(),
  imageUrl: item.path,
  url: item.url,
}))

// Shared by /projects and /projects/category/[slug]. A category page passes
// `category`; it is built already filtered, so a link to it (e.g.
// /projects/category/hydrophone-locations) shows the right projects straight
// away. The dropdown options come from the data (most projects first), so a
// category an editor adds in Sanity appears without a code change.
export default function ProjectsListing({ projects, category = '' }) {
  const router = useRouter()
  const allItems = useMemo(
    () =>
      projects.length
        ? projects.map((project) => ({
            ...project,
            imageUrl: project.featuredImageUrl,
            imageAlt: project.featuredImageAlt,
            url: `/projects/${project.slug}`,
          }))
        : FALLBACK,
    [projects]
  )

  const categoryOptions = useMemo(() => {
    const counts = new Map()
    for (const item of allItems) {
      for (const c of item.categories || []) {
        counts.set(c, (counts.get(c) || 0) + 1)
      }
    }
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([c]) => c)
  }, [allItems])

  const items = category
    ? allItems.filter((item) => (item.categories || []).includes(category))
    : allItems

  // Picking a category opens its page; "All categories" goes back to /projects.
  const setCategory = (value) =>
    router.push(
      value ? `/projects/category/${toSlug(value)}` : '/projects',
      undefined,
      { scroll: false }
    )

  return (
    <>
      <Head>
        <title>{`${category || 'Projects'} | Orcasound`}</title>
        <meta
          name="description"
          content={category ? `Orcasound projects: ${category}.` : DESCRIPTION}
        />
      </Head>

      {/* Same frame as the blog listing (BlogListing.jsx). */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {category || 'Projects'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {category ? `Projects in “${category}”.` : DESCRIPTION}
        </Typography>

        {categoryOptions.length > 0 && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ mb: 4 }}
            alignItems={{ sm: 'center' }}
          >
            <TextField
              select
              size="small"
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ minWidth: 220 }}
            >
              <MenuItem value="">All categories</MenuItem>
              {categoryOptions.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
            {category && (
              <Button size="small" onClick={() => setCategory('')}>
                Clear filter
              </Button>
            )}
          </Stack>
        )}

        <Box
          sx={{
            display: 'grid',
            gap: 4,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {items.map((project) => (
            <ContentCard
              key={project.url}
              href={project.url}
              imageUrl={project.imageUrl}
              imageAlt={project.imageAlt}
              // Projects aren't dated news, so the meta line is the byline only.
              meta={
                formatByline(project.authors) &&
                `By ${formatByline(project.authors)}`
              }
              title={project.title}
              excerpt={project.excerpt}
              chips={project.categories || []}
              onClick={() =>
                pushToDataLayer('project_card_click', {
                  card_title: project.title,
                })
              }
            />
          ))}
        </Box>
      </Container>
    </>
  )
}
