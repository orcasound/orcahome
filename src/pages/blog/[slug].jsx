import {
  Avatar,
  Box,
  Chip,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'

import { HIDDEN_TAGS } from '../../components/Blog/blogFormat'
import PostBody, {
  ARTICLE_MAX_WIDTH,
  formatDate,
} from '../../components/Blog/PostBody'
import { getClient } from '../../sanity/client'
import { BLOG_POST_QUERY, BLOG_SLUGS_QUERY } from '../../sanity/queries'
import { getSiteChrome } from '../../sanity/siteChrome'

export default function BlogPost({ post }) {
  const dateLabel = formatDate(post.publishedAt)
  const authors = (post.authors || []).filter((a) => a && a.name)
  const visibleTags = (post.tags || []).filter((t) => !HIDDEN_TAGS.has(t))

  return (
    <>
      <Head>
        <title>{post.title} | Orcasound Blog</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
      </Head>

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
          href="/blog"
          variant="body2"
          sx={{ display: 'inline-block', mb: 3 }}
        >
          &larr; Back to all posts
        </MuiLink>

        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {dateLabel}
          {authors.length > 0 && ' · By '}
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

        {visibleTags.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ mb: 4 }}
          >
            {visibleTags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        )}

        {post.featuredImageUrl && (
          <Box
            sx={{
              mb: 5,
              borderRadius: 2,
              overflow: 'hidden',
              lineHeight: 0,
            }}
          >
            <Image
              src={post.featuredImageUrl}
              alt={post.featuredImageAlt || post.title || ''}
              width={1600}
              height={900}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </Box>
        )}

        {Array.isArray(post.body) && <PostBody blocks={post.body} />}

        {Array.isArray(post.comments) && post.comments.length > 0 && (
          <Box
            component="section"
            sx={{
              mt: 8,
              pt: 4,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h5" component="h2">
              Comments
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Archived from the original blog. New comments aren&apos;t accepted
              here.
            </Typography>
            <Stack spacing={3}>
              {post.comments.map((comment, index) => {
                const depth = Math.max(1, comment.depth || 1)
                return (
                  // Indent with padding on a wrapper: the parent Stack resets
                  // its children's margins, so `ml` here would be ignored.
                  <Box
                    key={index}
                    sx={{
                      pl: { xs: depth > 1 ? 2 : 0, sm: (depth - 1) * 4 },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        ...(depth > 1 && {
                          pl: 2,
                          borderLeft: '2px solid',
                          borderColor: 'divider',
                        }),
                      }}
                    >
                      <Avatar
                        src={comment.avatar || undefined}
                        alt={comment.author}
                        sx={{ width: 40, height: 40, mt: 0.5 }}
                      >
                        {(comment.author || '?').charAt(0).toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="baseline"
                          flexWrap="wrap"
                        >
                          <Typography variant="subtitle2" fontWeight={600}>
                            {comment.author}
                          </Typography>
                          {comment.date && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatDate(comment.date)}
                            </Typography>
                          )}
                        </Stack>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 0.5,
                            whiteSpace: 'pre-wrap',
                            // Old comments contain long bare URLs; let them wrap
                            // instead of widening the page on phones.
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {comment.body}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                )
              })}
            </Stack>
          </Box>
        )}
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  let slugs = []
  try {
    slugs = (await getClient(false).fetch(BLOG_SLUGS_QUERY)) || []
  } catch {
    slugs = []
  }
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    // 'blocking' so posts added in Sanity after build render without a rebuild.
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const siteChrome = getSiteChrome()
  let post = null
  try {
    post = await getClient(false).fetch(BLOG_POST_QUERY, { slug: params.slug })
  } catch {
    post = null
  }

  if (!post) {
    return { notFound: true, revalidate: 60 }
  }

  return { props: { post, siteChrome: await siteChrome }, revalidate: 60 }
}
