import ProjectsListing from '../../components/Projects/ProjectsListing'
import { getClient } from '../../sanity/client'
import { PROJECTS_QUERY } from '../../sanity/queries'
import { getSiteChrome } from '../../sanity/siteChrome'

export default function Projects({ projects }) {
  return <ProjectsListing projects={projects} />
}

export async function getStaticProps() {
  const siteChrome = getSiteChrome()
  let projects = []
  try {
    projects = (await getClient(false).fetch(PROJECTS_QUERY)) || []
  } catch {
    projects = []
  }
  return { props: { projects, siteChrome: await siteChrome }, revalidate: 60 }
}
