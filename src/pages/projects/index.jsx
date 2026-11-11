import { Box, Container, Typography } from '@mui/material'
import Head from 'next/head'

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
  const items = projects.length
    ? projects.map((project) => ({
        ...project,
        imageUrl: project.featuredImageUrl,
        imageAlt: project.featuredImageAlt,
        url: `/projects/${project.slug}`,
      }))
    : FALLBACK

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
