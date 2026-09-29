import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Link as MuiLink,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'

import { getClient } from '../../../sanity/client'
import { AUTHOR_QUERY, AUTHOR_SLUGS_QUERY } from '../../../sanity/queries'

const formatDate = (value) => {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
}

// Author archive: every blog post written by one person (#425).
export default function AuthorPage({ author }) {
  const posts = author.posts || []
  return (
    <>
      <Head>
        <title>{author.name} | Orcasound Blog</title>
        <meta
          name="description"
          content={`Blog posts by ${author.name} on Orcasound.`}
        />
      </Head>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <MuiLink
          href="/blog"
          variant="body2"
          sx={{ display: 'inline-block', mb: 3 }}
        >
          &larr; Back to all posts
        </MuiLink>

        <Typography variant="h3" component="h1" gutterBottom>
          {author.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </Typography>

        {posts.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No posts yet.
          </Typography>
        ) : (
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
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none' }}
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
                  {post.featuredImageUrl && (
                    <CardMedia
                      component="img"
                      image={post.featuredImageUrl}
                      alt={post.featuredImageAlt || post.title || ''}
                      sx={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      gutterBottom
                    >
                      {formatDate(post.publishedAt)}
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {post.title}
                    </Typography>
                    {post.excerpt && (
                      <Typography variant="body2" color="text.secondary">
                        {post.excerpt}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Box>
        )}
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  let slugs = []
  try {
    slugs = (await getClient(false).fetch(AUTHOR_SLUGS_QUERY)) || []
  } catch {
    slugs = []
  }
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  let author = null
  try {
    author = await getClient(false).fetch(AUTHOR_QUERY, { slug: params.slug })
  } catch {
    author = null
  }

  if (!author) {
    return { notFound: true, revalidate: 60 }
  }

  return { props: { author }, revalidate: 60 }
}
