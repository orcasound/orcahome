import {defineField, defineType} from 'sanity'

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
            href="https://docs.google.com/document/d/1XzpOD2k6Gt3H6wFABuLe8gRYXk6sZ-b8xqdz598PAuo/edit"
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
  ],
  preview: {
    select: {title: 'heroTitle'},
    prepare: ({title}) => ({title: title || 'Donate / Support Page'}),
  },
})
