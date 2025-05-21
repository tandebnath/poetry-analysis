import type { CollectionConfig } from 'payload'
import { lexicalEditor, FixedToolbarFeature } from '@payloadcms/richtext-lexical'
import writeStaticData from '@/app/(payload)/hooks/writeStaticData'

export const About: CollectionConfig = {
  slug: 'about',
  labels: {
    singular: 'About Page Content',
    plural: 'About Page Content',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['id'],
  },
  hooks: {
    afterChange: [(args: any) => writeStaticData(args)],
    afterDelete: [(args: any) => writeStaticData(args)],
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          FixedToolbarFeature(),
          ...defaultFeatures,
        ],
        admin: {
          placeholder: 'Type your content here...',
        },
      }),
      admin: {
        description: 'Full content for the About page.',
      },
    },
  ],
}