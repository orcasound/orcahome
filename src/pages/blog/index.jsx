import BlogListing from '../../components/Blog/BlogListing'
import { getClient } from '../../sanity/client'
import { BLOG_POSTS_QUERY } from '../../sanity/queries'
import { getSiteChrome } from '../../sanity/siteChrome'

export default function Blog({ posts }) {
  return <BlogListing posts={posts} />
}

export async function getStaticProps() {
  const siteChrome = getSiteChrome()
  // Fetch all posts' lightweight metadata (no body). Filtering (tag / year /
  // month) and pagination happen client-side in BlogListing via URL query, so
  // there's a single canonical listing route (/blog).
  let posts = []
  try {
    posts = (await getClient(false).fetch(BLOG_POSTS_QUERY)) || []
  } catch {
    posts = []
  }
  return { props: { posts, siteChrome: await siteChrome }, revalidate: 60 }
}
