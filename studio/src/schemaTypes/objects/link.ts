import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'URL', value: 'url'},
          {title: 'Page', value: 'page'},
          {title: 'Post', value: 'post'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'url',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'url' && !value) {
            return 'URL is required when Link Type is URL'
          }
          return true
        }),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'page',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'page' && !value) {
            return 'Page reference is required when Link Type is Page'
          }
          return true
        }),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      hidden: ({parent}) => parent?.linkType !== 'post',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'post' && !value) {
            return 'Post reference is required when Link Type is Post'
          }
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
