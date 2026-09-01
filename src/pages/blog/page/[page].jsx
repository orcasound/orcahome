import BlogListing from '../../../components/Blog/BlogListing'
import { getClient } from '../../../sanity/client'
import {
  BLOG_POSTS_COUNT_QUERY,
  BLOG_POSTS_PAGE_QUERY,
  BLOG_POSTS_PER_PAGE,
} from '../../../sanity/queries'

export default function BlogPage({ posts, page, totalPages }) {
  return <BlogListing posts={posts} page={page} totalPages={totalPages} />
}

export async function getStaticPaths() {
  let total = 0
  try {
    total = (await getClient(false).fetch(BLOG_POSTS_COUNT_QUERY)) || 0
  } catch {
    total = 0
  }
  const totalPages = Math.ceil(total / BLOG_POSTS_PER_PAGE)
  // Page 1 lives at /blog, so only generate 2..totalPages here.
  const paths = []
  for (let p = 2; p <= totalPages; p += 1) {
    paths.push({ params: { page: String(p) } })
  }
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const page = Number.parseInt(params.page, 10)

  // Guard against invalid or page-1 URLs (page 1 canonically lives at /blog).
  if (!Number.isInteger(page) || page < 2) {
    return { notFound: true, revalidate: 60 }
  }

  let posts = []
  let total = 0
  try {
    const client = getClient(false)
    total = (await client.fetch(BLOG_POSTS_COUNT_QUERY)) || 0
    posts =
      (await client.fetch(BLOG_POSTS_PAGE_QUERY, {
        start: (page - 1) * BLOG_POSTS_PER_PAGE,
        end: page * BLOG_POSTS_PER_PAGE,
      })) || []
  } catch {
    posts = []
    total = 0
  }

  const totalPages = Math.max(1, Math.ceil(total / BLOG_POSTS_PER_PAGE))

  // A page number past the end (e.g. after posts were deleted) → 404.
  if (page > totalPages) {
    return { notFound: true, revalidate: 60 }
  }

  return { props: { posts, page, totalPages }, revalidate: 60 }
}
