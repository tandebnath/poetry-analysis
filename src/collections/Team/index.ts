import type { CollectionConfig } from 'payload'
import writeStaticData from '@/app/(payload)/hooks/writeStaticData'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Team Member',
    plural: 'Team Members',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'email', 'sortOrder'],
  },
  hooks: {
    afterChange: [(args: any) => writeStaticData(args)],
    afterDelete: [(args: any) => writeStaticData(args)],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the team member.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: false,
      defaultValue: 999,
      admin: {
        description: 'Controls the display order of team members.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Professional title or role.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short bio or description of the team member.',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Work or contact email address.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional profile image.',
      },
    },
    {
      name: 'linkedin',
      type: 'text',
      required: false,
      admin: {
        description: 'Full LinkedIn URL (optional).',
      },
    },
    {
      name: 'website',
      type: 'text',
      required: false,
      admin: {
        description: 'Personal or academic website URL (optional).',
      },
    },
  ],
}
