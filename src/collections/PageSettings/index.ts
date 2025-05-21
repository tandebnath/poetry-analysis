import writeStaticData from '@/app/(payload)/hooks/writeStaticData'
import type { CollectionConfig } from 'payload'

export const PageSettings: CollectionConfig = {
  slug: 'page-settings',
  labels: {
    singular: 'Page Setting',
    plural: 'Page Settings',
  },
  access: {
    read: () => true, // Publicly readable
    create: () => true, // Allow creation
    update: () => true, // Allow updates
    delete: () => false, // Prevent accidental deletion
  },
  admin: {
    useAsTitle: 'page',
    defaultColumns: ['page', 'title'],
  },
  hooks: {
    afterChange: [(args: any) => writeStaticData(args)],
    afterDelete: [(args: any) => writeStaticData(args)],
  },
  fields: [
    {
      name: 'page',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Blog', value: 'blog' },
        { label: 'Publications', value: 'publications' },
        { label: 'Team', value: 'team' },
      ],
      admin: {
        description: 'Select the page this title belongs to.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of the page.',
      },
    },
  ],
}