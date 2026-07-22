import {defineField, defineType} from 'sanity'

/**
 * Call Catalog page (Phase 2 — page copy only).
 *
 * Only the editable prose lives here: the hero, the section title/description,
 * and the image credit. The 46-call SRKW dataset (Ford 1987) — call ids, pods,
 * audio, waveforms, and spectrograms — deliberately stays a structured data
 * source (`src/components/Catalog/callsData.js`), NOT Sanity documents: it's
 * generated scientific reference data, not editorial content.
 *
 * Singleton: there is only ever one Call Catalog page document.
 */
export const catalogPage = defineType({
  name: 'catalogPage',
  title: 'Call Catalog Page',
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
            href="https://docs.google.com/document/d/1UbX_1g0zRFfNikefapHU5ECvm1kJmfa0Mu2IMrXPG-I/edit"
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
      title: 'Hero description (optional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
    }),

    // —— Section copy ——
    defineField({
      name: 'sectionTitle',
      title: 'Section title',
      type: 'string',
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section description',
      description:
        'Use {count} where the number of call entries should appear — it is filled in automatically from the dataset.',
      type: 'text',
      rows: 5,
    }),

    // —— Footer credit ——
    defineField({
      name: 'imageCredit',
      title: 'Image credit line',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'heroTitle'},
    prepare: ({title}) => ({title: title || 'Call Catalog Page'}),
  },
})
