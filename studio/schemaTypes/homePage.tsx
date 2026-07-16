import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Home page (Phase 2 — third real-page content model).
 *
 * Mirrors the editable content hard-coded in `src/pages/index.jsx`. Layout,
 * styling, the scroll arrow, and analytics stay in the React component — only
 * the editorial content lives here.
 *
 * The hydrophone map is a Google My Maps embed; only its map ID (`mid`) is
 * editable here — the site builds the full embed URL in code so the iframe
 * host is always google.com/maps (an editor can't point it elsewhere). The
 * map's pins are curated in Google My Maps, not Sanity.
 *
 * Singleton: there is only ever one Home page document.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // —— Hero ——
    defineField({
      name: 'heroImage',
      title: 'Hero background image',
      type: 'image',
      options: {hotspot: true},
      description: (
        <>
          📖 New to editing this page?{' '}
          <a
            href="https://docs.google.com/document/d/1tERlrFaHef7tG0mWLI6iaHl-jnPdBUp2I1ltyCc3FA0/edit"
            target="_blank"
            rel="noreferrer"
          >
            Read the step-by-step guide
          </a>
          .
        </>
      ),
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero button label',
      type: 'string',
    }),
    defineField({
      name: 'heroCtaHref',
      title: 'Hero button link',
      type: 'string',
    }),

    // —— What is Orcasound ——
    defineField({
      name: 'whatIsHeading',
      title: '"What is Orcasound" heading',
      type: 'string',
    }),
    defineField({
      name: 'whatIsParagraphs',
      title: '"What is Orcasound" paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text'})],
    }),

    // —— Hydrophone Locations ——
    defineField({
      name: 'hydrophoneHeading',
      title: '"Hydrophone Locations" heading',
      type: 'string',
    }),
    defineField({
      name: 'hydrophoneIntro',
      title: 'Hydrophone Locations · intro paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'hydrophoneReportText',
      title: 'Hydrophone Locations · second paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mapEmbedId',
      title: 'Hydrophone map ID',
      description:
        'The Google My Maps "mid" — the part after mid= in the map\'s share/embed URL. The pins are edited in Google My Maps, not here.',
      type: 'string',
    }),
    defineField({
      name: 'listenLiveLabel',
      title: 'Listen Live button label',
      type: 'string',
    }),
    defineField({
      name: 'listenLiveHref',
      title: 'Listen Live button link',
      type: 'string',
    }),
    defineField({
      name: 'getInvolvedLabel',
      title: 'Get Involved button label',
      type: 'string',
    }),
    defineField({
      name: 'getInvolvedHref',
      title: 'Get Involved button link',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'whatIsHeading'},
    prepare: ({title}) => ({title: title || 'Home Page'}),
  },
})
