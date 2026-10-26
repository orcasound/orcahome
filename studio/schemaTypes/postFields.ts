import {defineArrayMember, defineField, defineType} from 'sanity'

import {imageLayoutFields, imageLayoutPreview} from './imageLayout'

/**
 * Fields shared by blog posts and project pages, so both get the same body
 * features and the same comment archive. Add a new body block type here once
 * and it is available in both.
 */

const altField = defineField({name: 'alt', title: 'Alt text', type: 'string'})

/** A photo grid: two or three images per row, each with an optional caption. */
export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      description: 'Drag to reorder.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            altField,
            defineField({name: 'caption', title: 'Caption (optional)', type: 'string'}),
          ],
        }),
      ],
      validation: (rule) => rule.min(2),
    }),
    defineField({
      name: 'columns',
      title: 'Images per row',
      description: 'On phones the grid always uses fewer columns.',
      type: 'number',
      options: {list: [2, 3], layout: 'radio', direction: 'horizontal'},
      initialValue: 2,
    }),
  ],
  preview: {
    select: {images: 'images', columns: 'columns', media: 'images.0.asset'},
    prepare: ({images, columns, media}) => ({
      title: `Gallery: ${images?.length || 0} images`,
      subtitle: `${columns || 2} per row`,
      media,
    }),
  },
})

/** Text that is hidden until the reader clicks its title (e.g. a reference list). */
export const collapsible = defineType({
  name: 'collapsible',
  title: 'Collapsible section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Always visible; readers click it to show or hide the content.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({type: 'image', options: {hotspot: true}, fields: [altField]}),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: `▸ ${title || 'Collapsible section'}`}),
  },
})

/** The rich-text body of a blog post or project page. */
export const postBodyField = defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({type: 'block'}),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [altField, ...imageLayoutFields],
      preview: imageLayoutPreview,
    }),
    defineArrayMember({type: 'gallery'}),
    defineArrayMember({type: 'dataTable'}),
    defineArrayMember({type: 'collapsible'}),
  ],
})

/** Read-only archive of the WordPress comment threads (#428). */
export const archivedCommentsField = defineField({
  name: 'comments',
  title: 'Comments (archived from WordPress)',
  description:
    'Read-only archive of the original WordPress comment threads (#428). The site does not accept new comments; this is kept as a historical record.',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      name: 'comment',
      fields: [
        defineField({name: 'author', title: 'Author', type: 'string'}),
        defineField({name: 'date', title: 'Date', type: 'datetime'}),
        defineField({name: 'body', title: 'Comment', type: 'text'}),
        defineField({name: 'depth', title: 'Reply depth (1 = top level)', type: 'number'}),
        defineField({name: 'avatar', title: 'Avatar URL', type: 'url'}),
      ],
      preview: {select: {title: 'author', subtitle: 'date'}},
    }),
  ],
})
