import Head from 'next/head'

import GuideLayout from '../../components/EditorGuide/GuideLayout'
import GuideMarkdown from '../../components/EditorGuide/GuideMarkdown'
import { readGuide } from '../../lib/editorGuide'
import { getSiteChrome } from '../../sanity/siteChrome'

// Home of the editor guides (docs/editor-guide/README.md). Not in the nav and
// not indexed; the Studio links here.
export default function EditorGuideHome({ markdown, title }) {
  return (
    <>
      <Head>
        <title>{`${title} | Orcasound`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <GuideLayout>
        <GuideMarkdown markdown={markdown} />
      </GuideLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { ...readGuide('README'), siteChrome: await getSiteChrome() },
  }
}
