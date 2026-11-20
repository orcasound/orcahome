import { HIDDEN_TAGS, MIN_TAG_COUNT } from '../../../components/Blog/blogFormat'
import BlogListing from '../../../components/Blog/BlogListing'
import { getClient } from '../../../sanity/client'
import { BLOG_POSTS_QUERY } from '../../../sanity/queries'
import { getSiteChrome } from '../../../sanity/siteChrome'
import { fromSlug, toSlug } from '../../../utils/taxonomySlug'

// /blog/tag/[slug]: the blog listing for one tag (e.g.
// /blog/tag/google-summer-of-code), built already filtered so a link to it
// shows the right posts straight away. It replaces the WordPress category and
// tag pages (#466).
export default function BlogTag({ posts, tag }) {
  return <BlogListing posts={posts} fixedTag={tag} />
}

const fetchPosts = async () => {
  try {
    return (await getClient(false).fetch(BLOG_POSTS_QUERY)) || []
  } catch {
    return []
  }
}

// Every visible tag with how many posts carry it.
const tagCounts = (posts) => {
  const counts = new Map()
  for (const post of posts) {
    for (const tag of post.tags || []) {
      if (tag && !HIDDEN_TAGS.has(tag)) {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      }
    }
  }
  return counts
}

export async function getStaticPaths() {
  // Prebuild the tags offered in the Topic dropdown; rarer tags (and tags
  // added later in Sanity) are built on their first visit.
  const counts = tagCounts(await fetchPosts())
  const paths = [...counts.entries()]
    .filter(([, n]) => n >= MIN_TAG_COUNT)
    .map(([tag]) => ({ params: { slug: toSlug(tag) } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const siteChrome = getSiteChrome()
  const posts = await fetchPosts()
  const tag = fromSlug(params.slug, [...tagCounts(posts).keys()])
  if (!tag) return { notFound: true, revalidate: 60 }
  return { props: { posts, tag, siteChrome: await siteChrome }, revalidate: 60 }
}
