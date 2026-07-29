import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Hacker Hall of Fame page (Phase 2).
 *
 * Models the editable copy (intro, section titles/subtitles) and the
 * contributor lists. Layout, the bespoke responsive styling, the decorative
 * images, and the two link-heavy intro paragraphs + the Founders description
 * (which carry inline links) stay in the React component — the page reads
 * these fields with per-field fallback to the current hard-coded content.
 *
 * Singleton: there is only ever one HHOF page document.
 */
export const hackerHallOfFamePage = defineType({
  name: 'hackerHallOfFamePage',
  title: 'Hacker Hall of Fame Page',
  type: 'document',
  fields: [
    // —— Hero / banner ——
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      description: (
        <>
          📖 New to editing this page?{' '}
          <a
            href="https://docs.google.com/document/d/1dBQYL_Xf2XYLTDZYOU3_bJZNAyEyvUKMdOq-LuhI3yw/edit"
            target="_blank"
            rel="noreferrer"
          >
            Read the step-by-step guide
          </a>
          .
        </>
      ),
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / banner image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'thankYouMessage',
      title: 'Thank-you banner message',
      type: 'string',
    }),
    defineField({
      name: 'hackathonImage',
      title: 'Hackathon photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'hackathonCaption',
      title: 'Hackathon photo caption',
      type: 'string',
    }),

    // —— Intro copy ——
    defineField({
      name: 'introParagraph',
      title: 'Intro paragraph',
      type: 'text',
      rows: 5,
    }),

    // —— Founders ——
    defineField({
      name: 'foundersTitle',
      title: 'Founders · title',
      type: 'string',
    }),
    defineField({
      name: 'foundersSubtitle',
      title: 'Founders · subtitle',
      type: 'string',
    }),
    defineField({
      name: 'founders',
      title: 'Founders · contributors',
      type: 'array',
      of: [defineArrayMember({type: 'contributor'})],
    }),

    // —— Influencers ——
    defineField({
      name: 'influencersTitle',
      title: 'Influencers · title',
      type: 'string',
    }),
    defineField({
      name: 'influencersSubtitle',
      title: 'Influencers · subtitle',
      type: 'string',
    }),
    defineField({
      name: 'influencerGroups',
      title: 'Influencers · sub-groups',
      description:
        'Each themed team (GSoC, Live app, Arcatia, Project Management, …).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Group title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'contributors',
              title: 'Contributors',
              type: 'array',
              of: [defineArrayMember({type: 'contributor'})],
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),

    // —— Podcast ——
    defineField({
      name: 'podcastTitle',
      title: 'Podcast · title',
      type: 'string',
    }),
    defineField({
      name: 'podcastSubtitle',
      title: 'Podcast · subtitle',
      type: 'string',
    }),
    defineField({
      name: 'podcastNames',
      title: 'Podcast · names',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),

    // —— OrcaHello ——
    defineField({
      name: 'orcaHelloTitle',
      title: 'OrcaHello · title',
      type: 'string',
    }),
    defineField({
      name: 'orcaHelloCaption',
      title: 'OrcaHello · caption',
      type: 'string',
    }),
    defineField({
      name: 'orcaHelloContributors',
      title: 'OrcaHello · contributors',
      type: 'array',
      of: [defineArrayMember({type: 'contributor'})],
    }),

    // —— Individual Contributors ——
    defineField({
      name: 'individualTitle',
      title: 'Individual Contributors · title',
      type: 'string',
    }),
    defineField({
      name: 'individualContributors',
      title: 'Individual Contributors · list',
      type: 'array',
      of: [defineArrayMember({type: 'contributor'})],
    }),

    // —— Supporters ——
    defineField({
      name: 'supportersTitle',
      title: 'Supporters · title',
      type: 'string',
    }),
    defineField({
      name: 'supporters',
      title: 'Supporters · list',
      type: 'array',
      of: [defineArrayMember({type: 'contributor'})],
    }),

    // —— Lower photos (above footer) ——
    defineField({
      name: 'lowerImages',
      title: 'Lower photos (above footer)',
      description: 'The two photos above the footer, each with a caption.',
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
            defineField({name: 'caption', title: 'Caption', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'caption', media: 'image'}},
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Hacker Hall of Fame Page'}),
  },
})
