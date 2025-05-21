'use client'

import { motion } from 'framer-motion'
import { FaUser, FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

interface BlogPostContentProps {
  title: string
  author: string
  datePosted: string
  readTime: number
  longDescriptionHtml: string
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({
  title,
  author,
  datePosted,
  readTime,
  longDescriptionHtml,
}) => {
  const router = useRouter()

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" className="mx-auto">
      {/* Back Button */}
      {/* <motion.button
        onClick={() => router.push('/blog')}
        className="group mb-6 text-sm font-medium px-4 py-2 border border-[var(--accent)] text-[var(--accent)] inline-flex items-center gap-2 hover:gap-3 transition-all duration-200"
      >
        <FaArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
        Back to Blog Posts
      </motion.button> */}

      {/* Title */}
      <motion.h1 className="mb-4" variants={fadeInVariants}>
        {title}
      </motion.h1>

      {/* Meta Info */}
      <motion.div
        className="flex flex-wrap items-center text-base mb-8 gap-4"
        variants={fadeInVariants}
      >
        <div className="flex items-center gap-1">
          <IoPersonCircleSharp size={18} style={{ color: 'var(--secondary)' }} />
          <span style={{ color: '#7f7f7f' }}>{author}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaCalendarAlt size={14} style={{ color: 'var(--text-secondary)' }} />
          <span style={{ color: '#7f7f7f' }}>
            {new Date(datePosted).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FaClock size={14} style={{ color: 'var(--accent)' }} />
          <span style={{ color: '#7f7f7f' }}>{readTime} min read</span>
        </div>
      </motion.div>

      {/* Post Body */}
      <motion.div
        className="prose max-w-none text-[1.05rem] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: longDescriptionHtml }}
        variants={fadeInVariants}
      />
    </motion.div>
  )
}

export default BlogPostContent
