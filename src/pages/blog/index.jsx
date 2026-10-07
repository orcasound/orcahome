import BlogListing from '../../components/Blog/BlogListing'
import { getClient } from '../../sanity/client'
import { BLOG_POSTS_QUERY } from '../../sanity/queries'

export default function Blog({ posts }) {
  return <BlogListing posts={posts} />
}

export async function getStaticProps() {
  // Fetch all posts' lightweight metadata (no body). Filtering (tag / year /
  // month) and pagination happen client-side in BlogListing via URL query, so
  // there's a single canonical listing route (/blog).
  let posts = []
  try {
    posts = (await getClient(false).fetch(BLOG_POSTS_QUERY)) || []
  } catch {
    // TODO(static-export): with no server to regenerate this page, an
    // unreachable Sanity at build time publishes an empty blog until the next
    // build. Decide whether the build should fail instead.
    posts = []
  }
  return { props: { posts } }
}
