import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Get Involved page (Phase 2 — second real-page content model).
 *
 * Mirrors the editable content currently hard-coded in
 * `src/pages/getinvolved.jsx`. Layout, styling, the roadmap zoom/pan
 * interaction, analytics, and the link-heavy prose (the DemocracyLab
 * paragraph + the Memorandum of Agreement paragraphs, which carry inline
 * links and per-link analytics) stay in the React component — only the plain
 * editorial content lives here.
 *
 * Every image field also stores Sanity's asset dimensions, which the website
 * reads back so `next/image` gets a width/height for remote URLs (see
 * `queries.ts`).
 *
 * Singleton: there is only ever one Get Involved page document.
 */
export const getInvolvedPage = defineType({
  name: 'getInvolvedPage',
  title: 'Get Involved Page',
  type: 'document',
  initialValue: {
    heroTitle: 'Get Involved',
  },
  fields: [
    // —— Hero / top banner ——
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
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

    // —— Volunteer section ——
    defineField({
      name: 'citizenScientistHeading',
      title: 'Volunteer · "Citizen Scientist" heading',
      type: 'string',
    }),
    defineField({
      name: 'citizenScientistText',
      title: 'Volunteer · Citizen Scientist paragraph',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'inPersonHeading',
      title: 'Volunteer · "In Person" heading',
      type: 'string',
    }),
    defineField({
      name: 'inPersonText',
      title: 'Volunteer · In Person paragraph',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'volunteerImages',
      title: 'Volunteer photos (up to 4)',
      description:
        'The four photos in the Volunteer grid. Leave empty to keep the built-in photos.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'alt', title: 'Alt text', type: 'string'}),
          ],
          preview: {select: {title: 'alt', media: 'image'}},
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'volunteerClosingText',
      title: 'Volunteer · closing paragraph',
      type: 'text',
      rows: 5,
    }),

    // —— Developers section ——
    defineField({
      name: 'developersIntro',
      title: 'Developers · intro paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'webAppHeading',
      title: 'Developers · "Orcasound Web App" heading',
      type: 'string',
    }),
    defineField({
      name: 'hackathonImage',
      title: 'Developers · hackathon photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'hackathonCaption',
      title: 'Developers · hackathon photo caption',
      type: 'string',
    }),
    defineField({
      name: 'crownJewelText',
      title: 'Developers · "crowning jewel" paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'techStack',
      title: 'Developers · tech stack list',
      description: 'Each item can have a nested list of sub-items.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Item',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subItems',
              title: 'Sub-items',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
          ],
          preview: {select: {title: 'text'}},
        }),
      ],
    }),
    defineField({
      name: 'roadmapHeading',
      title: 'Developers · roadmap heading',
      type: 'string',
    }),
    defineField({
      name: 'roadmapImage',
      title: 'Developers · roadmap image',
      type: 'image',
    }),
    defineField({
      name: 'roadmapCaption',
      title: 'Developers · roadmap caption',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'democracyLabParagraph',
      title: 'Developers · DemocracyLab paragraph',
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

    // —— Memorandum of Agreement ——
    defineField({
      name: 'moaHeading',
      title: 'MOA · heading',
      type: 'string',
    }),
    defineField({
      name: 'moaBody',
      title: 'MOA · paragraphs',
      description: 'Use normal paragraphs and select text to add links.',
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

    // —— Support section ——
    defineField({
      name: 'supportParagraphs',
      title: 'Support · paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text'})],
    }),
    defineField({
      name: 'supportCtaLabel',
      title: 'Support · button label',
      type: 'string',
    }),
    defineField({
      name: 'supportCtaHref',
      title: 'Support · button link',
      type: 'string',
    }),
    defineField({
      name: 'partners',
      title: 'Support · partner logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Partner name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Donate / info link',
              type: 'url',
            }),
          ],
          preview: {select: {title: 'name', media: 'logo'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heroTitle'},
    prepare: ({title}) => ({title: title || 'Get Involved Page'}),
  },
})
