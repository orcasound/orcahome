import {defineArrayMember, defineField, defineType} from 'sanity'

import {archivedCommentsField, postBodyField} from './postFields'
import {guideUrl} from '../siteUrl'

/**
 * One Orcasound project page (a hydrophone location, a research project, a
 * call catalog, ...), migrated from the WordPress "portfolio" pages at
 * orcasound.net/portfolio/<slug>. Shown at /projects/<slug> and listed on
 * /projects. Same shape as a blog post (title, slug, featured image, authors,
 * Portable Text body) plus a category list for grouping.
 */
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: (
        <>
          📖 New to editing projects?{' '}
          <a href={guideUrl('projects')} target="_blank" rel="noreferrer">
            Read the step-by-step guide
          </a>
          .
        </>
      ),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'The URL path segment, e.g. /projects/<slug>. Migrated pages keep their WordPress slug so old links can be redirected.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      description: 'Used to order the Projects page, newest first.',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      description: 'For example "Hydrophone locations", "Research", "Education & outreach".',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'author'}]})],
    }),
    defineField({
      name: 'excerpt',
      title: 'Short description',
      description: 'Shown on the Projects page card and used as the page meta description.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      description:
        'The card image on the Projects page. It is not shown on the project page itself (same as the old WordPress portfolio), so put any photo you want on the page in the Body.',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt text', type: 'string'})],
    }),
    postBodyField,
    archivedCommentsField,
  ],
  orderings: [
    {
      title: 'Published date, newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current', media: 'featuredImage'},
  },
})
