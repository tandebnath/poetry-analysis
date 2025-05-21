import type { CollectionConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import writeStaticData from '@/app/(payload)/hooks/writeStaticData'

export const Publications: CollectionConfig = {
slug: 'publications',
labels: {
  singular: 'Publication',
  plural: 'Publications',
},
access: {
  read: () => true,
  create: () => true,
  update: () => true,
  delete: () => true,
},
admin: {
  useAsTitle: 'title',
  defaultColumns: ['title', 'venue', 'year', 'location'],
},
hooks: {
  afterChange: [(args: any) => writeStaticData(args)],
  afterDelete: [(args: any) => writeStaticData(args)],
},
fields: [
  {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'Title of the paper or presentation.',
    },
  },
  {
    name: 'venue',
    type: 'text',
    required: true,
    admin: {
      description: 'Name of the conference or journal.',
    },
  },
  {
    name: 'year',
    type: 'number',
    required: true,
    admin: {
      description: 'Year the publication was presented or published.',
    },
  },
  {
    name: 'location',
    type: 'text',
    required: false,
    admin: {
      description: 'City or location of the event.',
    },
  },
  {
    name: 'proceedings',
    type: 'text',
    required: false,
    admin: {
      description: 'Name of the session, workshop, or proceedings.',
    },
  },
  {
    name: 'authors',
    type: 'array',
    required: true,
    minRows: 1,
    labels: {
      singular: 'Author',
      plural: 'Authors',
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        required: true,
      },
    ],
    admin: {
      description: 'List of authors for the publication.',
    },
  },
  {
    name: 'link',
    type: 'text',
    required: true,
    admin: {
      description: 'Link to the publication or hosted document.',
    },
  },
],
}