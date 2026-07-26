import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Donate / Support page (Phase 2 — V1 only).
 *
 * Models the editable copy: the hero and the two support cards (title, message,
 * image). The partner cards stay in `src/data/donatePartners.json`, and the
 * "Ways to Support" dialog (Open Collective / GitHub links) stays in the React
 * component. The V2 variant is being retired (#292/#299) and is not modelled.
 *
 * Singleton: there is only ever one Donate page document.
 */
export const donatePage = defineType({
  name: 'donatePage',
  title: 'Donate / Support Page',
  type: 'document',
  fields: [
    // —— Hero / top banner ——
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      description: (
        <>
          📖 New to editing this page?{' '}
          <a
            href="https://docs.google.com/document/d/1XLQVhHI1nI8AfpfJ9E8-wf8TRVfurArTM3Fcc1Ki32w/edit"
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
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
    }),

    // —— Support Orcasound card ——
    defineField({
      name: 'orcasoundTitle',
      title: 'Support Orcasound · title',
      type: 'string',
    }),
    defineField({
      name: 'orcasoundMessage',
      title: 'Support Orcasound · message',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'orcasoundImage',
      title: 'Support Orcasound · image',
      type: 'image',
      options: {hotspot: true},
    }),

    // —— Support Volunteers card ——
    defineField({
      name: 'volunteersTitle',
      title: 'Support Volunteers · title',
      type: 'string',
    }),
    defineField({
      name: 'volunteersMessage',
      title: 'Support Volunteers · message',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'volunteersImage',
      title: 'Support Volunteers · image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'volunteersButtonHref',
      title: 'Support Volunteers · button link',
      type: 'url',
    }),

    // —— "Ways to Support" dialog ——
    defineField({
      name: 'dialogTitle',
      title: 'Dialog · title',
      type: 'string',
    }),
    defineField({
      name: 'dialogSubtitle',
      title: 'Dialog · subtitle',
      type: 'string',
    }),
    defineField({
      name: 'dialogHeading',
      title: 'Dialog · "Ways to Support" heading',
      type: 'string',
    }),
    defineField({
      name: 'donationOptions',
      title: 'Dialog · donation options',
      description: 'The clickable support methods (e.g. Open Collective, GitHub).',
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
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'href',
              title: 'Link URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'usesCardImage',
              title: 'Thumbnail',
              description:
                'Which card image to show as the thumbnail for this option.',
              type: 'string',
              options: {
                list: [
                  {title: 'Support Orcasound image', value: 'orcasound'},
                  {title: 'Support Volunteers image', value: 'volunteers'},
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'href'}},
        }),
      ],
    }),

    // —— Partners section ——
    defineField({
      name: 'partnersTitle',
      title: 'Partners section · title',
      type: 'string',
    }),
    defineField({
      name: 'partnersDescription',
      title: 'Partners section · description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'partners',
      title: 'Partner cards',
      description: 'The 501(c)3 partner cards (logo, name, description, link).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'linkTo',
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
    prepare: ({title}) => ({title: title || 'Donate / Support Page'}),
  },
})
