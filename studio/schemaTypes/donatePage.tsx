import {defineArrayMember, defineField, defineType} from 'sanity'
import {guideUrl} from '../siteUrl'

/**
 * Donate / Support page (Phase 2 — V1 only).
 *
 * Models the editable copy: the hero, the donate cards (a list of 1 to 3, #492),
 * the "Ways to Support" dialog and the partner cards. Layout and styling stay in
 * code. The V2 variant is being retired (#292/#299) and is not modelled.
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
          <a href={guideUrl('donate')} target="_blank" rel="noreferrer">
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

    // —— Donate cards ——
    defineField({
      name: 'cards',
      title: 'Donate cards',
      description:
        'The cards near the top of the page (1 to 3). Add, remove or reorder them here; one card is shown centered.',
      type: 'array',
      validation: (rule) => rule.min(1).max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'donateCard',
          title: 'Donate card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'message',
              title: 'Message',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'buttonLabel',
              title: 'Button label',
              description: 'Leave empty to show "Donate".',
              type: 'string',
            }),
            defineField({
              name: 'buttonAction',
              title: 'Button action',
              type: 'string',
              initialValue: 'dialog',
              options: {
                list: [
                  {title: 'Open the "Ways to Support" pop-up', value: 'dialog'},
                  {title: 'Go to a link', value: 'link'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'buttonHref',
              title: 'Button link',
              description:
                'A full URL, or a page on this site starting with / (e.g. /hacker-hall-of-fame).',
              type: 'url',
              hidden: ({parent}) => parent?.buttonAction !== 'link',
              validation: (rule) =>
                rule
                  .uri({allowRelative: true, scheme: ['http', 'https']})
                  .custom((value, context) => {
                    const parent = context.parent as {buttonAction?: string} | undefined
                    return parent?.buttonAction === 'link' && !value
                      ? 'Add a link, or set the button to open the pop-up.'
                      : true
                  }),
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'message', media: 'image'}},
        }),
      ],
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
              name: 'image',
              title: 'Thumbnail',
              description: "Leave empty to reuse the first card's image.",
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {select: {title: 'title', subtitle: 'href', media: 'image'}},
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
