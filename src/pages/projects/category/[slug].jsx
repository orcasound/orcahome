import ProjectsListing from '../../../components/Projects/ProjectsListing'
import { getClient } from '../../../sanity/client'
import { PROJECTS_QUERY } from '../../../sanity/queries'
import { getSiteChrome } from '../../../sanity/siteChrome'
import { fromSlug, toSlug } from '../../../utils/taxonomySlug'

// /projects/category/[slug]: the projects in one category (e.g.
// /projects/category/hydrophone-locations), built already filtered. It replaces
// the WordPress project-type pages (#466).
export default function ProjectCategory({ projects, category }) {
  return <ProjectsListing projects={projects} category={category} />
}

const fetchProjects = async () => {
  try {
    return (await getClient(false).fetch(PROJECTS_QUERY)) || []
  } catch {
    return []
  }
}

const categoryNames = (projects) => [
  ...new Set(projects.flatMap((p) => p.categories || []).filter(Boolean)),
]

export async function getStaticPaths() {
  const names = categoryNames(await fetchProjects())
  return {
    paths: names.map((name) => ({ params: { slug: toSlug(name) } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const siteChrome = getSiteChrome()
  const projects = await fetchProjects()
  const category = fromSlug(params.slug, categoryNames(projects))
  if (!category) return { notFound: true, revalidate: 60 }
  return {
    props: { projects, category, siteChrome: await siteChrome },
    revalidate: 60,
  }
}
