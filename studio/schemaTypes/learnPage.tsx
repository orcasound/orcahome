import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Learn page (Phase 2 — fourth real-page content model).
 *
 * Mirrors the editable content hard-coded in `src/pages/learn.jsx`. Layout,
 * styling, the sticky jump-nav, the data-driven Call Catalog grid, and the
 * one YouTube-link closing sentence stay in the React component — only the
 * editorial content lives here.
 *
 * Non-`fill` images (soundscape, spectrograms, exhibit photos) also store the
 * asset dimensions, read back so `next/image` gets a width/height for the
 * remote CDN URL.
 *
 * Singleton: there is only ever one Learn page document.
 */
export const learnPage = defineType({
  name: 'learnPage',
  title: 'Learn Page',
  type: 'document',
  fields: [
    // —— Hero ——
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      description: (
        <>
          📖 New to editing this page?{' '}
          <a
            href="https://docs.google.com/document/d/1N_e1M6bmFrDHmyEfWXn7rzyM1hXGH9Qz7ZpXws_WkLM/edit"
            target="_blank"
            rel="noreferrer"
          >
            Read the step-by-step guide
          </a>
          .
        </>
      ),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
    }),

    // —— Sounds of the Salish Sea ——
    defineField({
      name: 'salishSeaIntro',
      title: 'Salish Sea · intro paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'salishSeaImage',
      title: 'Salish Sea · soundscape image',
      type: 'image',
    }),
    defineField({
      name: 'salishSeaLink',
      title: 'Salish Sea · image link',
      type: 'url',
    }),

    // —— 3 Common Calls ——
    defineField({
      name: 'commonCallsIntro',
      title: '3 Common Calls · intro paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'calls',
      title: '3 Common Calls · cards',
      description: 'Each card: a spectrogram image, an audio clip, and text.',
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
              name: 'spectrogram',
              title: 'Spectrogram image',
              type: 'image',
            }),
            defineField({
              name: 'audio',
              title: 'Audio clip',
              type: 'file',
              options: {accept: 'audio/*'},
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: {select: {title: 'title', media: 'spectrogram'}},
        }),
      ],
    }),
    defineField({
      name: 'commonCallsClosing',
      title: '3 Common Calls · closing sentence',
      description: 'Select text and add a link with the link toolbar button.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'string',
                    validation: (rule) => rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),

    // —— Call Catalog ——
    defineField({
      name: 'callCatalogIntro',
      title: 'Call Catalog · intro paragraph',
      type: 'text',
      rows: 4,
    }),

    // —— Exhibits ——
    defineField({
      name: 'exhibits',
      title: 'Exhibits',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: {select: {media: 'image', subtitle: 'text'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heroTitle'},
    prepare: ({title}) => ({title: title || 'Learn Page'}),
  },
})
