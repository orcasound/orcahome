/**
 * Run from studio (dry-run by default):
 * npx sanity exec scripts/seed-site-chrome.mjs --with-user-token -- [--commit]
 * Existing documents are never overwritten.
 */
import console from 'node:console'
import process from 'node:process'
import {getCliClient} from 'sanity/cli'
import {ORCASOUND_YOUTUBE_URL} from '../../src/constants/links.ts'

const args = process.argv.slice(2)
if (args.some((arg) => arg !== '--commit')) throw new Error('Usage: [--commit]')
const commit = args.includes('--commit')
const documents = [
  {
    _id: 'navigation',
    _type: 'navigation',
    links: [
      {
        _key: 'default_nav_links-1',
        _type: 'siteLink',
        label: 'Get Involved',
        url: '/getinvolved',
      },
      {
        _key: 'default_nav_links-2',
        _type: 'siteLink',
        label: 'Learn',
        url: '/learn',
      },
      {
        _key: 'default_nav_links-3',
        _type: 'siteLink',
        label: 'About Us',
        url: '/about',
      },
      {
        _key: 'default_nav_links-4',
        _type: 'siteLink',
        label: 'Listen',
        url: 'https://live.orcasound.net/',
      },
      {
        _key: 'default_nav_links-5',
        _type: 'siteLink',
        label: 'Blog',
        url: '/blog',
      },
      {
        _key: 'default_nav_links-6',
        _type: 'siteLink',
        label: 'Send Feedback',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLScsBwU_ZX0W2GUrxJ5JKb3PfR-NmloHxm7zetkyOBC5RM2ajA/viewform',
      },
    ],
    notifyLabel: 'Notify Me',
    notifyUrl: 'https://www.orcasound.net/subscribe/',
    supportLabel: 'Support',
    supportUrl: '/donate',
  },
  {
    _id: 'footer',
    _type: 'footer',
    leftHeading: 'Support Us',
    leftLinks: [
      {
        _key: 'default_left_links-1',
        _type: 'siteLink',
        label: 'Get Involved',
        url: '/getinvolved',
      },
      {
        _key: 'default_left_links-2',
        _type: 'siteLink',
        label: 'Send Feedback',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLScsBwU_ZX0W2GUrxJ5JKb3PfR-NmloHxm7zetkyOBC5RM2ajA/viewform',
      },
      {
        _key: 'default_left_links-3',
        _type: 'siteLink',
        label: 'Support',
        url: '/donate',
      },
    ],
    rightHeading: 'Learn More',
    rightLinks: [
      {
        _key: 'default_right_links-1',
        _type: 'siteLink',
        label: 'About Us',
        url: '/about',
      },
      {
        _key: 'default_right_links-2',
        _type: 'siteLink',
        label: 'Learn',
        url: '/learn',
      },
      {
        _key: 'default_right_links-3',
        _type: 'siteLink',
        label: 'Listen',
        url: 'https://live.orcasound.net/',
      },
      {
        _key: 'default_right_links-4',
        _type: 'siteLink',
        label: 'Blog',
        url: '/blog',
      },
    ],
    socialLinks: [
      {
        _key: 'default_social_links-1',
        _type: 'socialLink',
        url: 'https://www.instagram.com/orcasoundapp/',
        platform: 'instagram',
      },
      {
        _key: 'default_social_links-2',
        _type: 'socialLink',
        url: 'https://twitter.com/OrcasoundApp',
        platform: 'x',
      },
      {
        _key: 'default_social_links-3',
        _type: 'socialLink',
        url: 'https://www.facebook.com/OrcasoundApp/',
        platform: 'facebook',
      },
      {
        _key: 'default_social_links-4',
        _type: 'socialLink',
        platform: 'youtube',
        url: ORCASOUND_YOUTUBE_URL,
      },
      {
        _key: 'default_social_links-5',
        _type: 'socialLink',
        url: 'https://github.com/orcasound',
        platform: 'github',
      },
      {
        _key: 'default_social_links-6',
        _type: 'socialLink',
        url: 'https://www.linkedin.com/company/75491849/admin/',
        platform: 'linkedin',
      },
    ],
  },
]

console.log(JSON.stringify(documents, null, 2))
if (commit) {
  const client = getCliClient({apiVersion: '2023-01-01'}).withConfig({useCdn: false})
  const {projectId, dataset} = client.config()
  if (projectId !== 'tncpl9l7' || dataset !== 'production')
    throw new Error('Expected tncpl9l7/production')
  for (const document of documents) {
    await client.createIfNotExists(document)
    console.log(`Ensured ${document._id} exists (existing content preserved).`)
  }
} else {
  console.log('DRY RUN: 2 documents. No writes (pass --commit to seed missing documents).')
}
