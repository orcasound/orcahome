import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * A simple data table inside a Portable Text body (#467): rows of plain-text
 * cells, with an optional header row. A cell that is just a web address is
 * shown as a link on the site. No merged cells or per-cell formatting; none of
 * the migrated WordPress tables use them.
 */
export const dataTable = defineType({
  name: 'dataTable',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'headerRow',
      title: 'First row is a header',
      description: 'Shows the first row in bold as column titles.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      description: 'Each row is a list of cells, left to right. Keep the same number of cells in every row.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tableRow',
          title: 'Row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
          ],
          preview: {
            select: {cells: 'cells'},
            prepare: ({cells}) => ({title: (cells || []).join(' | ') || 'Empty row'}),
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {rows: 'rows'},
    prepare: ({rows}) => {
      const first = rows?.[0]?.cells || []
      return {
        title: `Table: ${first.join(' | ') || 'empty'}`,
        subtitle: `${rows?.length || 0} rows × ${first.length} columns`,
      }
    },
  },
})
