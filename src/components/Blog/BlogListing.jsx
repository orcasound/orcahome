import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'

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

// Shared blog listing: the post grid plus numbered pagination (1 2 3 4). Used by
// the /blog landing (page 1) and /blog/page/[page] (pages 2+). The final visual
// design is pending UX handoff (#397); this is a simple, functional layout.
export default function BlogListing({ posts, page, totalPages }) {
  return (
    <>
      <Head>
        <title>
          {page > 1 ? `Blog (page ${page}) | Orcasound` : 'Blog | Orcasound'}
        </title>
        <meta
          name="description"
          content="News, updates, and stories from the Orcasound community."
        />
      </Head>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Blog
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
          News, updates, and stories from the Orcasound community.
        </Typography>

        {posts.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No posts yet. Check back soon.
          </Typography>
        ) : (
          <>
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
                      {Array.isArray(post.tags) && post.tags.length > 0 && (
                        <Stack
                          direction="row"
                          spacing={1}
                          useFlexGap
                          flexWrap="wrap"
                          sx={{ mt: 2 }}
                        >
                          {post.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                          ))}
                        </Stack>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </Box>

            {totalPages > 1 && (
              <Stack alignItems="center" sx={{ mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  color="primary"
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      href={
                        item.page === 1 ? '/blog' : `/blog/page/${item.page}`
                      }
                      {...item}
                    />
                  )}
                />
              </Stack>
            )}
          </>
        )}
      </Container>
    </>
  )
}
