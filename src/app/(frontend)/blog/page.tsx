'use client'

import { useState, useMemo } from 'react'
import Dropdown from 'rc-dropdown'
import 'rc-dropdown/assets/index.css'
import Link from 'next/link'
import { FaUser, FaCalendarAlt, FaClock, FaSearch, FaTimes, FaFilter, FaSort } from 'react-icons/fa'
import Heading from '@/components/Heading'
import { motion } from 'framer-motion'

import { blogData } from '@/static/blog'
import { richTextToHtml } from '@/utils/richTextParser'
import { pageSettingsData } from '@/static/pageSettings'
import BlogCard from '@/components/BlogCard'

interface BlogPost {
  id: string
  title: string
  author: string
  datePosted: string
  shortDescriptionHtml: string
  slug: string
  keywords: string[]
  readTime: number
}

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const [sortOrder, setSortOrder] = useState('Latest First')
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false)

  const postsPerPage = 4

  // Get page title
  const pageTitle = pageSettingsData.find((p: any) => p.page === 'blog')?.title || 'Blog'

  // Format the raw blog data once
  const formattedBlogData: BlogPost[] = useMemo(() => {
    return blogData.map((post: any) => ({
      id: String(post.id),
      title: post.title,
      author: post.author,
      datePosted: post.datePosted,
      shortDescriptionHtml: richTextToHtml(post.shortDescription),
      slug: post.slug,
      keywords: post.keywords.map((k: any) =>
        typeof k === 'string' ? k.toLowerCase() : k.keyword.toLowerCase(),
      ),
      readTime: post.readTime,
    }))
  }, [])

  const uniqueKeywords = useMemo(() => {
    const allKeywords = formattedBlogData.flatMap((post) => post.keywords)
    return Array.from(new Set(allKeywords))
  }, [formattedBlogData])

  const handleKeywordToggle = (keyword: string) => {
    setCurrentPage(1)
    setSelectedKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword],
    )
  }

  const clearKeywords = () => {
    setSelectedKeywords([])
    setCurrentPage(1)
  }

  const filteredPosts = useMemo(() => {
    const filtered = formattedBlogData.filter((post) => {
      if (searchQuery) {
        const combined = (post.title + ' ' + post.author).toLowerCase()
        if (!combined.includes(searchQuery.toLowerCase())) {
          return false
        }
      }
      if (selectedKeywords.length > 0) {
        const matches = selectedKeywords.some((kw) => post.keywords.includes(kw))
        if (!matches) return false
      }
      return true
    })

    // Sort logic
    filtered.sort((a, b) =>
      sortOrder === 'Latest First'
        ? new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
        : new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime(),
    )

    return filtered
  }, [searchQuery, selectedKeywords, formattedBlogData, sortOrder])

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return filteredPosts.slice(startIndex, startIndex + postsPerPage)
  }, [filteredPosts, currentPage])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2, ease: 'easeOut' },
    }),
  }

  const clearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  const dropdownContent = (
    <div
      className="w-[18rem] p-4 shadow-md border border-[#F2EAE2]"
      style={{
        backgroundColor: '#FFFBF8',
        color: '#2f2f2f',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-3">
        <div />
        <button
          type="button"
          onClick={clearKeywords}
          className="text-base font-semibold underline"
          style={{ color: 'var(--accent)' }}
        >
          Clear All
        </button>
      </div>
      {selectedKeywords.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedKeywords.map((kw) => (
            <div
              key={kw}
              className="inline-flex items-center px-2 py-1 text-base"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--white)',
                font: 'var(--font-source-sans-3',
              }}
            >
              <span className="mr-1">{kw}</span>
              <FaTimes
                className="cursor-pointer"
                style={{ color: 'var(--black)' }}
                onClick={() => handleKeywordToggle(kw)}
              />
            </div>
          ))}
        </div>
      )}
      <div className="max-h-48 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {uniqueKeywords.map((keyword) => (
          <div key={keyword} className="flex items-center space-x-2 text-base mb-2">
            <input
              type="checkbox"
              size={24}
              checked={selectedKeywords.includes(keyword)}
              onChange={() => handleKeywordToggle(keyword)}
              className="accent-[var(--accent)]"
            />
            <span>{keyword}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const sortDropdownContent = (
    <div
      className="min-w-[10rem] p-2 border shadow-md border-[#F2EAE2]"
      style={{ backgroundColor: '#FFFBF8', color: '#2f2f2f' }}
      onClick={(e) => e.stopPropagation()}
    >
      {['Latest First', 'Oldest First'].map((option) => (
        <div
          key={option}
          className={`px-3 py-2 cursor-pointer text-base hover:bg-[#f2ece7] ${
            sortOrder === option ? 'font-semibold text-[var(--accent)]' : ''
          }`}
          onClick={() => {
            setSortOrder(option)
            setSortDropdownVisible(false)
          }}
        >
          {option}
        </div>
      ))}
    </div>
  )

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden">
      <div className="breadcrumbs text-base mb-4 text-gray-500">
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-gray-700 font-semibold">Blog</li>
        </ul>
      </div>

      <Heading text={pageTitle} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-4 gap-4"
      >
        {/* Left: Search Input */}
        <div className="flex-1 min-w-0">
          <div
            className="relative w-full px-4 py-2 border shadow-sm hover:shadow-md transition-shadow rounded-none flex items-center h-[42px]"
            style={{
              backgroundColor: '#FFFBF8',
              borderColor: '#F2EAE2',
            }}
          >
            <FaSearch className="absolute left-4 text-[#7f7f7f]" />
            <input
              type="text"
              placeholder="Search by title or author..."
              className="w-full pl-10 pr-8 py-1 bg-transparent focus:outline-none text-base text-[#2f2f2f]"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
            {searchQuery && (
              <FaTimes
                className="absolute right-4 text-[#7f7f7f] cursor-pointer"
                onClick={clearSearch}
              />
            )}
          </div>
        </div>

        {/* Right: Sort & Filter Buttons */}
        <div className="flex gap-4">
          <Dropdown
            trigger={['click']}
            overlay={sortDropdownContent}
            animation="slide-up"
            placement="bottomRight"
            visible={sortDropdownVisible}
            onVisibleChange={setSortDropdownVisible}
          >
            <button
              type="button"
              className="h-[42px] inline-flex items-center gap-2 px-5 py-2 border shadow-sm hover:shadow-md transition-shadow text-base rounded-none"
              style={{
                backgroundColor: '#FFFBF8',
                borderColor: '#F2EAE2',
                color: '#2f2f2f',
              }}
            >
              <FaSort className="text-[#7f7f7f]" />
              Sort by
            </button>
          </Dropdown>

          <Dropdown
            trigger={['click']}
            overlay={dropdownContent}
            animation="slide-up"
            placement="bottomRight"
            visible={dropdownVisible}
            onVisibleChange={setDropdownVisible}
          >
            <button
              type="button"
              className="h-[42px] inline-flex items-center gap-2 px-5 py-2 border shadow-sm hover:shadow-md transition-shadow text-base rounded-none"
              style={{
                backgroundColor: '#FFFBF8',
                borderColor: '#F2EAE2',
                color: '#2f2f2f',
              }}
            >
              <FaFilter className="text-[#7f7f7f]" />
              Filter by Keywords
            </button>
          </Dropdown>
        </div>
      </motion.div>

      {/* Blog Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
      >
        {paginatedPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            id={post.id}
            slug={post.slug}
            title={post.title}
            datePosted={post.datePosted}
            shortDescription={post.shortDescriptionHtml}
            author={post.author}
            readTime={`${post.readTime} min read`}
            index={index}
            variants={fadeInVariants}
            increaseHeight
            titleSize="text-xl"
            descriptionSize="text-base"
          />
        ))}
      </motion.div>

      {/* Pagination */}
      <motion.div className="flex justify-center mt-16" initial="hidden" animate="visible">
        {Array.from({ length: totalPages }, (_, idx) => {
          const pageNum = idx + 1
          const isActive = currentPage === pageNum

          return (
            <motion.button
              key={pageNum}
              className={`px-4 py-2 mx-1 border text-lg transition-all duration-200 ${
                isActive
                  ? 'font-semibold'
                  : 'hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--accent)' : 'var(--background)',
                color: isActive ? '#ffffff' : 'var(--text)',
                borderColor: isActive ? 'var(--accent)' : 'var(--accent)',
              }}
              onClick={() => setCurrentPage(pageNum)}
              variants={fadeInVariants}
            >
              {pageNum}
            </motion.button>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default Blog
