import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Orcahome',

  projectId: 'tncpl9l7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) => {
        // One-of-a-kind pages are pinned as singletons (fixed id, opens
        // straight to the form, no "create new"). Genuinely multi-doc types
        // (e.g. `page`) keep the default list.
        const singletons = [
          {id: 'aboutPage', title: 'About Page'},
          {id: 'getInvolvedPage', title: 'Get Involved Page'},
          {id: 'homePage', title: 'Home Page'},
          {id: 'learnPage', title: 'Learn Page'},
          {id: 'hackerHallOfFamePage', title: 'Hacker Hall of Fame Page'},
          {id: 'catalogPage', title: 'Call Catalog Page'},
          {id: 'donatePage', title: 'Donate / Support Page'},
        ]
        const singletonIds = singletons.map((s) => s.id)
        return S.list()
          .title('Content')
          .items([
            ...singletons.map((s) =>
              S.listItem()
                .id(s.id)
                .title(s.title)
                .child(
                  S.document().title(s.title).schemaType(s.id).documentId(s.id),
                ),
            ),
            ...S.documentTypeListItems().filter(
              (item) => !singletonIds.includes(item.getId() ?? ''),
            ),
          ])
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        (template) =>
          template.schemaType !== 'aboutPage' &&
          template.schemaType !== 'getInvolvedPage' &&
          template.schemaType !== 'homePage' &&
          template.schemaType !== 'learnPage' &&
          template.schemaType !== 'hackerHallOfFamePage' &&
          template.schemaType !== 'catalogPage' &&
          template.schemaType !== 'donatePage',
      ),
  },
})
