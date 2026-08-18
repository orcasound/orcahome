import BlogListing from '../../components/Blog/BlogListing'
import { getClient } from '../../sanity/client'
import {
  BLOG_POSTS_COUNT_QUERY,
  BLOG_POSTS_PAGE_QUERY,
  BLOG_POSTS_PER_PAGE,
} from '../../sanity/queries'

export default function Blog({ posts, page, totalPages }) {
  return <BlogListing posts={posts} page={page} totalPages={totalPages} />
}

export async function getStaticProps() {
  let posts = []
  let total = 0
  try {
    const client = getClient(false)
    total = (await client.fetch(BLOG_POSTS_COUNT_QUERY)) || 0
    posts =
      (await client.fetch(BLOG_POSTS_PAGE_QUERY, {
        start: 0,
        end: BLOG_POSTS_PER_PAGE,
      })) || []
  } catch {
    posts = []
    total = 0
  }
  const totalPages = Math.max(1, Math.ceil(total / BLOG_POSTS_PER_PAGE))
  return { props: { posts, page: 1, totalPages }, revalidate: 60 }
}
