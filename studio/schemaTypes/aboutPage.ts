import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * About page (Phase 2 — first real-page content model).
 *
 * Mirrors the editable content currently hard-coded in
 * `src/pages/about.jsx` + `src/components/About/db.json`. Layout, styling,
 * the mobile see-more behaviour, and analytics stay in the React component —
 * only the editorial content lives here.
 *
 * Singleton: there is only ever one About page document.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // —— Hero / top banner ——
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      description:
        '📖 New to editing this page? Read the step-by-step guide: ' +
        'https://docs.google.com/document/d/1kmvkvkVbKbN5ibfVHAJ4o6dhokfEwGbJW1JS8nnbWJc/edit',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
    }),

    // —— Intro paragraph ——
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 4,
    }),

    // —— Projects ——
    defineField({
      name: 'projectsHeading',
      title: 'Projects heading',
      type: 'string',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({name: 'url', title: 'Link URL', type: 'url'}),
          ],
          preview: {select: {title: 'title', media: 'image'}},
        }),
      ],
    }),

    // —— Participation / call to action ——
    defineField({
      name: 'participationHeading',
      title: 'Participation heading',
      type: 'string',
    }),
    defineField({
      name: 'participationParagraphs',
      title: 'Participation paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text'})],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA button label',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA button link',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'heroTitle'},
    prepare: ({title}) => ({title: title || 'About Page'}),
  },
})
