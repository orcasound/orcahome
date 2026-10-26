import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {EditingGuidePane} from './components/EditingGuidePane'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Orcahome',

  projectId: 'tncpl9l7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) => {
        // One-of-a-kind documents are pinned as singletons (fixed id, opens
        // straight to the form, no "create new"), grouped under titled
        // dividers: page content, then the site-wide menu and footer.
        // Genuinely multi-doc types (blog posts, authors) keep the default list.
        const pageSingletons = [
          {id: 'aboutPage', title: 'About Page'},
          {id: 'getInvolvedPage', title: 'Get Involved Page'},
          {id: 'homePage', title: 'Home Page'},
          {id: 'learnPage', title: 'Learn Page'},
          {id: 'hackerHallOfFamePage', title: 'Hacker Hall of Fame Page'},
          {id: 'catalogPage', title: 'Call Catalog Page'},
          {id: 'donatePage', title: 'Donate / Support Page'},
          {id: 'moaContent', title: 'MOA (Memorandum of Agreement)'},
        ]
        const navigationSingletons = [
          {id: 'navigation', title: 'Top Menu'},
          {id: 'footer', title: 'Footer'},
        ]
        const singletonIds = [...pageSingletons, ...navigationSingletons].map((s) => s.id)
        const singletonItem = (s: {id: string; title: string}) =>
          S.listItem()
            .id(s.id)
            .title(s.title)
            .child(S.document().title(s.title).schemaType(s.id).documentId(s.id))
        return S.list()
          .title('Content')
          .items([
            // "Start here" help entry, pinned at the top of the list.
            S.listItem()
              .id('editingGuide')
              .title('📖 Start here')
              .child(
                S.component(EditingGuidePane)
                  .id('editingGuide')
                  .title('Editing guide'),
              ),
            S.divider().title('Pages'),
            ...pageSingletons.map(singletonItem),
            S.divider().title('Navigation'),
            ...navigationSingletons.map(singletonItem),
            S.divider().title('Projects'),
            S.documentTypeListItem('project').title('Projects'),
            S.divider().title('Blog'),
            ...S.documentTypeListItems().filter(
              (item) => ![...singletonIds, 'project'].includes(item.getId() ?? ''),
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
          template.schemaType !== 'donatePage' &&
          template.schemaType !== 'moaContent' &&
          template.schemaType !== 'navigation' &&
          template.schemaType !== 'footer',
      ),
  },
})
