import {defineArrayMember, defineField, defineType} from 'sanity'

import {linkListField, urlField} from './siteLink'

const GUIDE_URL =
  'https://github.com/orcasound/orcahome/blob/main/docs/editing-navigation-footer.md'

const guideLink = (
  <>
    📖 New to editing this?{' '}
    <a href={GUIDE_URL} target="_blank" rel="noreferrer">
      Read the step-by-step guide
    </a>
    .
  </>
)

// Must match the icon map in `src/components/Footer.jsx`.
const SOCIAL_PLATFORMS = [
  {title: 'Instagram', value: 'instagram'},
  {title: 'X (Twitter)', value: 'x'},
  {title: 'Facebook', value: 'facebook'},
  {title: 'YouTube', value: 'youtube'},
  {title: 'GitHub', value: 'github'},
  {title: 'LinkedIn', value: 'linkedin'},
]

/**
 * Footer on every page: two link columns, each with a heading, and a row of
 * social icons. The logo, icons, and the copyright line stay in code
 * (`src/components/Footer.jsx`). Any field left empty falls back to the
 * footer that is hard-coded in Footer.jsx.
 *
 * Singleton: there is only ever one footer document.
 */
export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'leftHeading',
      title: 'Left column · heading',
      description: guideLink,
      type: 'string',
    }),
    linkListField('leftLinks', 'Left column · links', 'Drag to reorder.'),
    defineField({name: 'rightHeading', title: 'Right column · heading', type: 'string'}),
    linkListField('rightLinks', 'Right column · links', 'Drag to reorder.'),
    defineField({
      name: 'socialLinks',
      title: 'Social media icons',
      description: 'Shown left to right. Drag to reorder.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {list: SOCIAL_PLATFORMS},
              validation: (rule) => rule.required(),
            }),
            urlField('url', 'Link'),
          ],
          preview: {
            select: {platform: 'platform', url: 'url'},
            prepare: ({platform, url}) => ({
              title: SOCIAL_PLATFORMS.find((p) => p.value === platform)?.title ?? platform,
              subtitle: url,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Footer'})},
})
