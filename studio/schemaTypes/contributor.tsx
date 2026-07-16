import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * A single Hacker Hall of Fame contributor: a name, one or more roles, and an
 * optional profile link. Reused by every contributor list on the HHOF page.
 */
export const contributor = defineType({
  name: 'contributor',
  title: 'Contributor',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'link',
      title: 'Profile link',
      type: 'url',
    }),
  ],
  preview: {
    select: {title: 'name', roles: 'roles'},
    prepare: ({title, roles}) => ({
      title,
      subtitle: Array.isArray(roles) ? roles.join(', ') : '',
    }),
  },
})
