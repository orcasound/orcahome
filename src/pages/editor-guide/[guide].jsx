import Head from 'next/head'

import GuideLayout from '../../components/EditorGuide/GuideLayout'
import GuideMarkdown from '../../components/EditorGuide/GuideMarkdown'
import { guideSlugs, readGuide } from '../../lib/editorGuide'
import { getSiteChrome } from '../../sanity/siteChrome'

// One editor guide, e.g. /editor-guide/blog from docs/editor-guide/blog.md.
export default function EditorGuide({ markdown, title }) {
  return (
    <>
      <Head>
        <title>{`${title} | Orcasound`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <GuideLayout backToHome>
        <GuideMarkdown markdown={markdown} />
      </GuideLayout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: guideSlugs().map((guide) => ({ params: { guide } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: { ...readGuide(params.guide), siteChrome: await getSiteChrome() },
  }
}
