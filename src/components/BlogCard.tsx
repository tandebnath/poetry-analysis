'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaClock } from 'react-icons/fa'
import { IoPersonCircleSharp } from 'react-icons/io5'

interface BlogCardProps {
  id: any
  slug: string
  title: string
  datePosted: string
  shortDescription: string
  author: string
  readTime: string
  index: number
  variants: any
  background?: string
  border?: string
  text?: string
  secondaryText?: string
  increaseHeight?: boolean
  titleSize?: string
  descriptionSize?: string
}

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  datePosted,
  shortDescription,
  author,
  readTime,
  index,
  variants,
  background = '#FFFBF8',
  border = '#F2EAE2',
  text = '#2f2f2f',
  secondaryText = '#7f7f7f',
  increaseHeight = false,
  titleSize = 'text-lg',
  descriptionSize = 'text-base',
}) => {
  return (
    <Link href={`/blog/${slug}`} className="block h-full">
      <motion.div
        custom={index}
        variants={variants}
        className="flex flex-col justify-between h-full w-full px-6 py-4 border shadow-sm hover:shadow-md transition-shadow rounded-none"
        style={{
          backgroundColor: background,
          borderColor: border,
        }}
      >
        <div>
          {/* Date */}
          <div className="text-base mb-2" style={{ color: secondaryText }}>
            {new Date(datePosted).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>

          {/* Title */}
          <h3 className={`font-semibold mb-2 hover:underline ${titleSize}`} style={{ color: text }}>
            {title}
          </h3>

          {/* Description */}
          <div
            className={`${descriptionSize} ${increaseHeight ? 'min-h-[4rem]' : ''} mb-4`}
            style={{ color: '#4a4a4a' }}
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          />
        </div>

        {/* Divider */}
        <div className="w-full border-t border-[#e5e5e5] my-3" />

        {/* Author & Time */}
        <div className="flex gap-6 items-center text-base mt-auto" style={{ color: secondaryText }}>
          <div className="flex items-center gap-1">
            <IoPersonCircleSharp size={22} title={author} color='var(--secondary)' />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock size={16} color='var(--accent)' /> {readTime}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default BlogCard