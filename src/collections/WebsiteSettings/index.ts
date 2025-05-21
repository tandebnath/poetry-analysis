import writeStaticData from '@/app/(payload)/hooks/writeStaticData'
import { CollectionConfig } from 'payload'

const WebsiteSettings: CollectionConfig = {
  slug: 'website-settings',
  admin: {
    useAsTitle: 'siteName',
    description: 'Configure your website settings here!',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [(args: any) => writeStaticData(args)],
    afterDelete: [(args: any) => writeStaticData(args)],
  },
  fields: [
    {
      name: 'siteName',
      label: 'Website Name',
      type: 'text',
      required: true,
    },
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional site-wide background image (e.g., SVG or JPG)',
      },
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
  timestamps: true,
}
export default WebsiteSettings
