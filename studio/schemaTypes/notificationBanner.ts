import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'notificationBanner',
  title: 'Notification Banner',
  type: 'document',

  fields: [
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'text',
      title: 'Text',
      type: 'object',
      fields: [
        defineField({
          name: 'es',
          title: 'Español',
          type: 'string',
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
        }),
        defineField({
          name: 'fr',
          title: 'Français',
          type: 'string',
        }),
        defineField({
          name: 'pt',
          title: 'Português',
          type: 'string',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),

    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'datetime',
    }),

    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'datetime',
    }),
  ],
})
