import {defineField, defineType} from 'sanity'

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

/**
 * Top menu (the nav bar on every page). Editors can rename, reorder, add, or
 * remove menu links and change the two buttons on the right. The logo, icons,
 * and styling stay in code (`src/components/Nav.jsx`). Any field left empty
 * falls back to the menu that is hard-coded in Nav.jsx.
 *
 * Singleton: there is only ever one navigation document.
 */
export const navigation = defineType({
  name: 'navigation',
  title: 'Top Menu',
  type: 'document',
  fields: [
    {
      ...linkListField(
        'links',
        'Menu links',
        'Shown left to right on desktop, top to bottom in the mobile menu. Drag to reorder.',
      ),
      description: (
        <>
          Shown left to right on desktop, top to bottom in the mobile menu. Drag to reorder.{' '}
          {guideLink}
        </>
      ),
    },
    defineField({
      name: 'notifyLabel',
      title: 'Bell button · text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    urlField('notifyUrl', 'Bell button · link'),
    defineField({
      name: 'supportLabel',
      title: 'Heart button · text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    urlField('supportUrl', 'Heart button · link'),
  ],
  preview: {prepare: () => ({title: 'Top Menu'})},
})
