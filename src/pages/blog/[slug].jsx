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

import { getClient } from '../../sanity/client'
import { BLOG_POST_QUERY, BLOG_SLUGS_QUERY } from '../../sanity/queries'

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

// Migrated posts reference media as a link to the file/embed URL. Render those
// as visible players (#428): audio -> <audio>, self-hosted video -> <video>,
// YouTube/Vimeo -> an <iframe>. mp3 + ogg of one clip share one <audio>.
const mediaOf = (value) => {
  const hrefs = [
    ...new Set(
      (value?.markDefs || [])
        .filter((d) => d._type === 'link' && d.href)
        .map((d) => d.href)
    ),
  ]
  return {
    audio: hrefs.filter((h) => /\.(mp3|wav|ogg|m4a)$/i.test(h)),
    video: hrefs.filter((h) => /\.(mp4|webm|mov|m4v)$/i.test(h)),
    embeds: hrefs.filter((h) =>
      /(?:youtube(?:-nocookie)?\.com|youtu\.be|vimeo\.com|media\.king5\.com)/i.test(
        h
      )
    ),
  }
}

const hasMedia = (m) => m.audio.length + m.video.length + m.embeds.length > 0

// Normalize a YouTube/Vimeo URL to its embeddable iframe form.
const embedSrc = (href) => {
  try {
    const u = new URL(href)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be')
      return `https://www.youtube.com/embed/${
        u.pathname.split('/').filter(Boolean)[0]
      }`
    if (host.includes('youtube')) {
      const id =
        u.pathname.match(/\/embed\/([\w-]+)/)?.[1] || u.searchParams.get('v')
      const start = u.searchParams.get('start')
      return id
        ? `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ''}`
        : href
    }
    if (host.includes('vimeo'))
      return `https://player.vimeo.com/video/${u.pathname
        .split('/')
        .filter(Boolean)
        .pop()}`
  } catch {
    /* fall through to the raw href */
  }
  return href
}

const MediaPlayers = ({ media }) => (
  <>
    {media.audio.length > 0 && (
      <Box
        component="audio"
        controls
        sx={{ display: 'block', width: '100%', my: 1 }}
      >
        {media.audio.map((u) => (
          <source key={u} src={u} />
        ))}
      </Box>
    )}
    {media.video.map((u) => (
      <Box
        key={u}
        component="video"
        controls
        src={u}
        sx={{
          display: 'block',
          width: '100%',
          maxWidth: 640,
          mx: 'auto',
          my: 1,
          borderRadius: 1,
        }}
      />
    ))}
    {media.embeds.map((u) => (
      <Box key={u} sx={{ maxWidth: 640, mx: 'auto', my: 2 }}>
        {/* 16:9 responsive frame, capped so it doesn't dominate the article. */}
        <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
          <Box
            component="iframe"
            src={embedSrc(u)}
            title="Embedded video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 0,
              borderRadius: 1,
            }}
          />
        </Box>
      </Box>
    ))}
  </>
)

// Render Portable Text with the site's typography, matching the other Sanity
// pages. Supports headings, lists, links, inline images, and audio.
const portableComponents = {
  block: {
    normal: ({ children, value }) => {
      const media = mediaOf(value)
      if (!hasMedia(media)) {
        return (
          <Typography variant="body1" paragraph>
            {children}
          </Typography>
        )
      }
      // A paragraph that is just a bare media URL shows only the player; one
      // that references the clip inline in a sentence keeps the sentence.
      const text = (value.children || [])
        .map((c) => c.text || '')
        .join('')
        .trim()
      const bareOnly = [
        ...media.audio,
        ...media.video,
        ...media.embeds,
      ].includes(text)
      return (
        <Box sx={{ my: 2 }}>
          {!bareOnly && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              {children}
            </Typography>
          )}
          <MediaPlayers media={media} />
        </Box>
      )
    },
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
    bullet: ({ children, value }) => {
      const media = mediaOf(value)
      return (
        <Typography component="li" variant="body1">
          {children}
          {hasMedia(media) && <MediaPlayers media={media} />}
        </Typography>
      )
    },
    number: ({ children, value }) => {
      const media = mediaOf(value)
      return (
        <Typography component="li" variant="body1">
          {children}
          {hasMedia(media) && <MediaPlayers media={media} />}
        </Typography>
      )
    },
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

      <Container
        component="article"
        maxWidth="md"
        sx={{ py: { xs: 5, md: 8 } }}
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
        </Typography>

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

        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={portableComponents} />
        )}

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
            <Stack spacing={2}>
              {post.comments.map((comment, index) => (
                <Box
                  key={index}
                  sx={{
                    ml: {
                      xs: 0,
                      sm: (Math.max(1, comment.depth || 1) - 1) * 3,
                    },
                    p: 2,
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle2" component="p">
                    {comment.author}
                    {comment.date && (
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        {formatDate(comment.date)}
                      </Typography>
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}
                  >
                    {comment.body}
                  </Typography>
                </Box>
              ))}
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
