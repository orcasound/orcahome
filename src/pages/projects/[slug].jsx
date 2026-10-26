import {
  Chip,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material'
import Head from 'next/head'

import PostBody, { ARTICLE_MAX_WIDTH } from '../../components/Blog/PostBody'
import { getClient } from '../../sanity/client'
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from '../../sanity/queries'
import { getSiteChrome } from '../../sanity/siteChrome'

export default function Project({ project }) {
  const authors = (project.authors || []).filter((a) => a && a.name)

  return (
    <>
      <Head>
        <title>{`${project.title} | Orcasound`}</title>
        {project.excerpt && (
          <meta name="description" content={project.excerpt} />
        )}
      </Head>

      {/* Same article frame as blog posts (shared column width + float handling). */}
      <Container
        component="article"
        maxWidth={false}
        // flow-root keeps floated body images inside the article.
        sx={{
          py: { xs: 5, md: 8 },
          display: 'flow-root',
          maxWidth: ARTICLE_MAX_WIDTH,
        }}
      >
        <MuiLink
          href="/projects"
          variant="body2"
          sx={{ display: 'inline-block', mb: 3 }}
        >
          &larr; All projects
        </MuiLink>

        <Typography variant="h3" component="h1" gutterBottom>
          {project.title}
        </Typography>

        {authors.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            By{' '}
            {authors.map((a, i) => (
              <span key={a.slug || a.name}>
                {i > 0 && (i === authors.length - 1 ? ' & ' : ', ')}
                {a.slug ? (
                  <MuiLink href={`/blog/author/${a.slug}`}>{a.name}</MuiLink>
                ) : (
                  a.name
                )}
              </span>
            ))}
          </Typography>
        )}

        {project.categories?.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ mb: 4 }}
          >
            {project.categories.map((category) => (
              <Chip key={category} label={category} size="small" />
            ))}
          </Stack>
        )}

        {/* No featured image here, like the old WordPress portfolio pages: it
            is only the card image on /projects. Many bodies start with the
            same photo, so showing it here would repeat it. */}
        {Array.isArray(project.body) && <PostBody blocks={project.body} />}
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  let slugs = []
  try {
    slugs = (await getClient(false).fetch(PROJECT_SLUGS_QUERY)) || []
  } catch {
    slugs = []
  }
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    // 'blocking' so projects added in Sanity after build render without a rebuild.
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const siteChrome = getSiteChrome()
  let project = null
  try {
    project = await getClient(false).fetch(PROJECT_QUERY, {
      slug: params.slug,
    })
  } catch {
    project = null
  }
  if (!project) return { notFound: true, revalidate: 60 }
  return { props: { project, siteChrome: await siteChrome }, revalidate: 60 }
}
