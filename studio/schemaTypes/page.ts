import {defineField, defineType} from 'sanity'

/**
 * Phase 1 minimal page schema (#317).
 *
 * Just enough to prove the end-to-end flow: a hero block + a paragraph block.
 * Full content modelling for all Orcahome surfaces is Phase 2.
 */
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for this page (used in the Studio list).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path segment used to fetch this page from the website.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subheading',
          title: 'Subheading',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'paragraph',
      title: 'Paragraph',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
