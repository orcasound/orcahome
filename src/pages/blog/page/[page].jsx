// Legacy paginated route. Pagination now lives on /blog via a ?page= query, so
// redirect /blog/page/N → /blog?page=N to keep any existing links working.
export default function BlogPageRedirect() {
  return null
}

export async function getServerSideProps({ params }) {
  const page = Number.parseInt(params.page, 10)
  const destination =
    Number.isInteger(page) && page > 1 ? `/blog?page=${page}` : '/blog'
  return { redirect: { destination, permanent: true } }
}
