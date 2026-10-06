import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * MOA (Memorandum of Agreement) for the "Join the network" section on the Get
 * Involved page (issue #451).
 *
 * Holds the agreement text (shown as expand/collapse panels) and the current
 * member list. The website falls back to `src/data/moaContent.json` per field
 * until this document is published. The section intro stays on the Get
 * Involved page document (`moaHeading` / `moaBody`).
 *
 * Singleton: there is only ever one MOA document.
 */
export const moaContent = defineType({
  name: 'moaContent',
  title: 'MOA (Memorandum of Agreement)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'MOA title',
      type: 'string',
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: 'subtitle',
      title: 'MOA subtitle / term',
      description: 'e.g. "For Member Organizations & Individuals (1/2021-12/2025)"',
      type: 'string',
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'sourceDocUrl',
      title: 'Link to the signed MOA document',
      type: 'url',
      validation: (r) => r.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'sections',
      title: 'MOA sections (shown as expand/collapse panels)',
      type: 'array',
      validation: (r) => r.min(1),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'moaSection',
          fields: [
            defineField({
              name: 'heading',
              title: 'Panel heading',
              type: 'string',
              validation: (r) => r.required().max(80),
            }),
            defineField({
              name: 'paragraphs',
              title: 'Paragraphs',
              type: 'array',
              of: [defineArrayMember({type: 'text', rows: 4})],
            }),
            defineField({
              name: 'items',
              title: 'Bulleted list items',
              type: 'array',
              of: [defineArrayMember({type: 'text', rows: 2})],
            }),
          ],
          preview: {select: {title: 'heading'}},
        }),
      ],
    }),
    defineField({
      name: 'agreementStatement',
      title: 'Agreement statement',
      description:
        'Shown as the last panel and used word-for-word as the required checkbox on the join form.',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(400),
    }),
    defineField({
      name: 'members',
      title: 'Current members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'moaMember',
          fields: [
            defineField({
              name: 'organization',
              title: 'Organization',
              type: 'string',
              validation: (r) => r.required().max(150),
            }),
            defineField({
              name: 'nodeAndRole',
              title: 'Node(s) and/or role(s)',
              type: 'text',
              rows: 3,
              description: 'Line breaks are kept.',
              validation: (r) => r.max(300),
            }),
            defineField({
              name: 'dateJoined',
              title: 'Date joined (date agreed to the MOA)',
              type: 'date',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'Website',
              type: 'url',
              validation: (r) => r.uri({scheme: ['http', 'https']}),
            }),
            defineField({
              name: 'logo',
              title: 'Logo (optional)',
              type: 'image',
            }),
          ],
          preview: {
            select: {title: 'organization', subtitle: 'dateJoined', media: 'logo'},
          },
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'MOA (Memorandum of Agreement)'})},
})
