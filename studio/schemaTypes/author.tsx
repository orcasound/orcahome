import {defineField, defineType} from 'sanity'

/**
 * A blog post author (issue #410). Its own document type so an author is
 * defined once and referenced from every post they wrote — edit the name here
 * and it updates across the whole blog. Originally these names were imported
 * from WordPress as plain tags (scottveirs, valveirs, …); this splits them out
 * into real people with proper display names.
 */
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Display name shown in the byline, e.g. "Scott Veirs".',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Optional — the original WordPress author tag (e.g. "scottveirs"). Kept for reference; not shown to readers.',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'slug.current'},
  },
})
