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

import AboutItems from '../../components/About/db.json'
import { formatByline } from '../../components/Blog/blogFormat'
import ContentCard from '../../components/Post/ContentCard'
import { getClient } from '../../sanity/client'
import { PROJECTS_QUERY } from '../../sanity/queries'
import { getSiteChrome } from '../../sanity/siteChrome'
import { pushToDataLayer } from '../../utils/gtm'

const DESCRIPTION =
  'Hydrophone locations, research, and outreach from the Orcasound community.'

// With an empty dataset (or Sanity unreachable), fall back to the About page's
// built-in project cards so the page still lists something.
const FALLBACK = AboutItems.map((item) => ({
  title: item.title.trim(),
  imageUrl: item.path,
  url: item.url,
}))

export default function Projects({ projects }) {
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

  // Category filter, kept in the URL (?category=) like the blog's tag filter
  // (BlogListing.jsx), so a link such as
  // /projects?category=Hydrophone%20locations shows just those projects. The
  // options come from the data (most projects first), so a category an editor
  // adds in Sanity appears here without a code change.
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

  const category =
    typeof router.query.category === 'string' ? router.query.category : ''
  const items = category
    ? allItems.filter((item) => (item.categories || []).includes(category))
    : allItems

  const setCategory = (value) =>
    router.push(
      value
        ? { pathname: '/projects', query: { category: value } }
        : '/projects',
      undefined,
      { shallow: true, scroll: false }
    )

  return (
    <>
      <Head>
        <title>Projects | Orcasound</title>
        <meta name="description" content={DESCRIPTION} />
      </Head>

      {/* Same frame as the blog listing (BlogListing.jsx). */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {DESCRIPTION}
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
              {(category && !categoryOptions.includes(category)
                ? [category, ...categoryOptions]
                : categoryOptions
              ).map((c) => (
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

        {items.length === 0 && (
          <Typography variant="body1" sx={{ mb: 4 }}>
            No projects in this category yet.
          </Typography>
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

export async function getStaticProps() {
  const siteChrome = getSiteChrome()
  let projects = []
  try {
    projects = (await getClient(false).fetch(PROJECTS_QUERY)) || []
  } catch {
    projects = []
  }
  return { props: { projects, siteChrome: await siteChrome }, revalidate: 60 }
}
