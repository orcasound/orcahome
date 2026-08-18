import {
  Box,
  Chip,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material'
import { PortableText } from '@portabletext/react'
import Head from 'next/head'
import Image from 'next/image'

import TopBanner from '../../components/TopBanner'
import { getClient } from '../../sanity/client'
import { BLOG_POST_QUERY, BLOG_SLUGS_QUERY } from '../../sanity/queries'

const POST_BODY_ID = 'post-body'

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

// Render Portable Text with the site's typography, matching the other Sanity
// pages. Supports headings, lists, links, and inline images.
const portableComponents = {
  block: {
    normal: ({ children }) => (
      <Typography variant="body1" paragraph>
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h4" component="h2" sx={{ mt: 5, mb: 2 }}>
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 2 }}>
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          pl: 2,
          my: 3,
          color: 'text.secondary',
          fontStyle: 'italic',
        }}
      >
        {children}
      </Box>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        {children}
      </Box>
    ),
    number: ({ children }) => (
      <Box component="ol" sx={{ pl: 3, mb: 2 }}>
        {children}
      </Box>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <Typography component="li" variant="body1">
        {children}
      </Typography>
    ),
    number: ({ children }) => (
      <Typography component="li" variant="body1">
        {children}
      </Typography>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const external = /^https?:\/\//.test(href)
      return (
        <MuiLink
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </MuiLink>
      )
    },
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <Box sx={{ my: 4 }}>
          <Image
            src={value.url}
            alt={value.alt || ''}
            width={1200}
            height={800}
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
          />
        </Box>
      ) : null,
  },
}

export default function BlogPost({ post }) {
  const dateLabel = formatDate(post.publishedAt)

  return (
    <>
      <Head>
        <title>{post.title} | Orcasound Blog</title>
        {post.excerpt && <meta name="description" content={post.excerpt} />}
      </Head>

      {post.featuredImageUrl ? (
        <TopBanner
          bannerImg={post.featuredImageUrl}
          pageTitle={post.title}
          pageDesc={dateLabel}
          scrollToId={POST_BODY_ID}
        />
      ) : (
        <Container maxWidth="md" sx={{ pt: { xs: 6, md: 8 } }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dateLabel}
          </Typography>
        </Container>
      )}

      <Container
        maxWidth="md"
        id={POST_BODY_ID}
        sx={{ py: { xs: 6, md: 8 }, scrollMarginTop: '80px' }}
      >
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ mb: 4 }}
          >
            {post.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
        )}

        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={portableComponents} />
        )}

        <Box sx={{ mt: 6 }}>
          <MuiLink href="/blog">&larr; Back to all posts</MuiLink>
        </Box>
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
  let post = null
  try {
    post = await getClient(false).fetch(BLOG_POST_QUERY, { slug: params.slug })
  } catch {
    post = null
  }

  if (!post) {
    return { notFound: true, revalidate: 60 }
  }

  return { props: { post }, revalidate: 60 }
}
