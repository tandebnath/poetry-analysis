'use client'
import { homeData } from '@/static/home'
import { blogData } from '@/static/blog'
import { richTextToHtml } from '@/utils/richTextParser'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaUser, FaClock } from 'react-icons/fa'
import { RiQuillPenLine } from 'react-icons/ri'
import { GiFeather } from 'react-icons/gi'
import { IoPersonCircleSharp } from 'react-icons/io5'
import BlogCard from '@/components/BlogCard'

// Colors
const cardBackground = '#FFFBF8' // slightly lighter than #FFF8F0
const cardBorder = '#F2EAE2'
const textColor = '#2f2f2f'
const secondaryTextColor = '#7f7f7f'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

const transformImageUrl = (url: string | null | undefined) => {
  if (!url) return null
  return url.startsWith('/api/media/file/') ? url.replace('/api/media/file/', '/uploads/') : url
}

const Home = () => {
  const homeEntry = homeData[0]
  const homeTitle = homeEntry?.title || 'Unbiased AI for Poetry Analysis'
  const homeContent = homeEntry?.content
    ? richTextToHtml(homeEntry.content as any, {
        underlineColor: '#0055aa',
        underlineThickness: '0.25rem',
        underlineOffset: '0.25rem',
      })
    : ''

  // const maxUpdates = homeEntry?.maxUpdates || 4;
  const maxUpdates = typeof homeEntry?.maxUpdates === 'number' ? homeEntry.maxUpdates : 3

  const formattedBlogPosts = blogData
    .slice()
    .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
    .slice(0, maxUpdates)
    .map((post) => ({
      ...post,
      shortDescription: post.shortDescription ? richTextToHtml(post.shortDescription as any) : '',
      readTime: post.readTime ? `${post.readTime} min read` : '',
    }))

  const supporters = (homeEntry?.supporters || [])
    .slice()
    .sort((a: any, b: any) => (a.sortOrder || 999) - (b.sortOrder || 999))
    .map((supporter: any) => ({
      logoUrl: supporter.logo?.url ? transformImageUrl(supporter.logo.url) : null,
      website: supporter.website || '#',
    }))

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: 'easeOut' },
    }),
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      // style={{
      //   backgroundImage: 'url("/background1.svg")',
      //   backgroundAttachment: "fixed",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      // }}
    >
      {/* Title */}
      <motion.h1
        variants={fadeInVariants}
        className="text-3xl sm:text-4xl font-serif font-semibold text-center mt-4 mb-6"
        style={{ color: textColor }}
      >
        {homeTitle}
      </motion.h1>
      {/* Homepage Intro */}
      <motion.section
        className="mx-auto mb-12 text-[1.1rem] leading-relaxed font-sans"
        style={{ color: textColor }}
        variants={fadeInVariants}
        dangerouslySetInnerHTML={{ __html: homeContent }}
      />

      {/* Divider */}
      <motion.div
        variants={fadeInVariants}
        className="mx-auto my-10 flex w-4/5 items-center justify-center"
      >
        <div className="border-t flex-grow mr-3" style={{ borderColor: '#d5c9bd' }} />
        <span className="mx-2" style={{ color: 'var(--accent)' }}>
          <GiFeather size={24} />
        </span>
        <div className="border-t flex-grow ml-3" style={{ borderColor: '#d5c9bd' }} />
      </motion.div>

      {/* Latest Updates */}
      <motion.section className="mx-auto" variants={fadeInVariants}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#3a3a3a] tracking-tight">Latest Updates</h2>
          <Link href="/blog" className="text-base font-medium" style={{ color: 'var(--accent)' }}>
            View All Updates
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {formattedBlogPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              id={post.id}
              slug={post.slug}
              title={post.title}
              datePosted={post.datePosted}
              shortDescription={post.shortDescription}
              author={post.author}
              readTime={post.readTime}
              index={index}
              variants={cardVariants}
            />
          ))}
        </div>
      </motion.section>

      {/* Bottom Divider */}
      <motion.div
        variants={fadeInVariants}
        className="mx-auto my-12 flex w-4/5 items-center justify-center"
      >
        <div className="border-t flex-grow mr-3" style={{ borderColor: '#d5c9bd' }} />
        <span className="mx-2" style={{ color: 'var(--accent)' }}>
          <GiFeather size={24} />
        </span>
        <div className="border-t flex-grow ml-3" style={{ borderColor: '#d5c9bd' }} />
      </motion.div>

      {/* Acknowledgment Section with Logos */}
      {supporters.length > 0 && (
        <motion.section className="mx-auto text-center mt-6" variants={fadeInVariants}>
          <p className="text-sm text-[#7f7f7f] mb-3">With support from:</p>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            {supporters.map(
              (s, idx) =>
                s.logoUrl && (
                  <a key={idx} href={s.website} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`${BASE_PATH}${s.logoUrl}`}
                      alt={`Supporter ${idx}`}
                      className="h-12 sm:h-14 object-contain"
                    />
                  </a>
                ),
            )}
          </div>
        </motion.section>
      )}
    </motion.div>
  )
}

export default Home
