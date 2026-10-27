import { Box } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'

import { HIDDEN_TAGS } from '../../components/Blog/blogFormat'
import ArchivedComments from '../../components/Post/ArchivedComments'
import PostArticle from '../../components/Post/PostArticle'
import PostBody, { formatDate } from '../../components/Post/PostBody'
import PostHeader from '../../components/Post/PostHeader'
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

      <PostArticle>
        <PostHeader
          backHref="/blog"
          backLabel="Back to all posts"
          title={post.title}
          date={dateLabel}
          authors={authors}
          chips={visibleTags}
        />

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

        <ArchivedComments comments={post.comments} />
      </PostArticle>
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
