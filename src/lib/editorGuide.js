import fs from 'node:fs'
import path from 'node:path'

// The editor guides are the Markdown files in docs/editor-guide/. They are
// read at build time (only from getStaticProps / getStaticPaths), so editing a
// guide and merging it is all it takes to update /editor-guide.
const DIR = path.join(process.cwd(), 'docs', 'editor-guide')

// Notes for developers stay in the repo and are not published on the site.
const NOT_PUBLISHED = new Set(['README', 'developers'])

export const guideSlugs = () =>
  fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .filter((slug) => !NOT_PUBLISHED.has(slug))

export const readGuide = (slug) => {
  const markdown = fs.readFileSync(path.join(DIR, `${slug}.md`), 'utf8')
  const title = markdown.match(/^# (.+)$/m)?.[1] || 'Editor guide'
  return { markdown, title }
}
