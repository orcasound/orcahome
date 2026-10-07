import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { POSTS_PER_PAGE } from '../../../components/Blog/BlogListing'
import { getClient } from '../../../sanity/client'
import { BLOG_POSTS_QUERY } from '../../../sanity/queries'

// Legacy paginated route. Pagination now lives on /blog via a ?page= query, so
// redirect /blog/page/N → /blog?page=N to keep any existing links working.
// A static export has no server to answer with a 301, so each page that existed
// at build time redirects from the browser instead.
// TODO(static-export): replace with a host-level permanent redirect, which
// covers every N and keeps the 301 for search engines.
export default function BlogPageRedirect({ destination }) {
  const router = useRouter()

  useEffect(() => {
    router.replace(destination)
  }, [router, destination])

  return null
}

export async function getStaticPaths() {
  let posts = []
  try {
    posts = (await getClient(false).fetch(BLOG_POSTS_QUERY)) || []
  } catch {
    posts = []
  }
  const pageCount = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))
  return {
    paths: Array.from({ length: pageCount }, (_, i) => ({
      params: { page: String(i + 1) },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const page = Number.parseInt(params.page, 10)
  const destination =
    Number.isInteger(page) && page > 1 ? `/blog?page=${page}` : '/blog'
  return { props: { destination } }
}
