import Head from 'next/head'

import ArchivedComments from '../../components/Post/ArchivedComments'
import PostArticle from '../../components/Post/PostArticle'
import PostBody from '../../components/Post/PostBody'
import PostHeader from '../../components/Post/PostHeader'
import { getClient } from '../../sanity/client'
import { PROJECT_QUERY, PROJECT_SLUGS_QUERY } from '../../sanity/queries'
import { getSiteChrome } from '../../sanity/siteChrome'

export default function Project({ project }) {
  return (
    <>
      <Head>
        <title>{`${project.title} | Orcasound`}</title>
        {project.excerpt && (
          <meta name="description" content={project.excerpt} />
        )}
      </Head>

      {/* Same article frame, header, body, and comments as blog posts. */}
      <PostArticle>
        <PostHeader
          backHref="/projects"
          backLabel="All projects"
          title={project.title}
          authors={project.authors || []}
          chips={project.categories || []}
        />

        {/* No featured image here, like the old WordPress portfolio pages: it
            is only the card image on /projects. Many bodies start with the
            same photo, so showing it here would repeat it. */}
        {Array.isArray(project.body) && <PostBody blocks={project.body} />}

        <ArchivedComments comments={project.comments} source="website" />
      </PostArticle>
    </>
  )
}

export async function getStaticPaths() {
  let slugs = []
  try {
    slugs = (await getClient(false).fetch(PROJECT_SLUGS_QUERY)) || []
  } catch {
    slugs = []
  }
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    // 'blocking' so projects added in Sanity after build render without a rebuild.
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const siteChrome = getSiteChrome()
  let project = null
  try {
    project = await getClient(false).fetch(PROJECT_QUERY, {
      slug: params.slug,
    })
  } catch {
    project = null
  }
  if (!project) return { notFound: true, revalidate: 60 }
  return { props: { project, siteChrome: await siteChrome }, revalidate: 60 }
}
