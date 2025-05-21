'use client'

import { useState, useMemo } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaUniversity } from 'react-icons/fa'
import { GiFeather } from 'react-icons/gi'
import { motion } from 'framer-motion'
import Heading from '@/components/Heading'
import Dropdown from 'rc-dropdown'
import 'rc-dropdown/assets/index.css'
import { FaSort } from 'react-icons/fa'
import Link from 'next/link'
import { publicationsData } from '@/static/publications'
import { pageSettingsData } from '@/static/pageSettings'

const textColor = "#2f2f2f";
const secondaryTextColor = "#7f7f7f";

const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
}

const sortOptions = ['Latest First', 'Oldest First']

const PublicationsPage = () => {
  const [sortOrder, setSortOrder] = useState('Latest First')
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const pageTitle = pageSettingsData.find((p) => p.page === 'publications')?.title || 'Publications'

  const filteredPublications = useMemo(() => {
    let filtered = [...publicationsData]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter((pub) =>
        [pub.title, pub.venue, pub.proceedings, pub.authors.map((a: any) => a.name).join(' '), pub.location]
          .join(' ') 
          .toLowerCase()
          .includes(q),
      )
    }

    filtered.sort((a, b) => (sortOrder === 'Latest First' ? b.year - a.year : a.year - b.year))

    return filtered
  }, [sortOrder, searchQuery])

  const sortDropdownContent = (
    <div
      className="min-w-[10rem] p-2 border shadow-md border-[#F2EAE2]"
      style={{ backgroundColor: '#FFFBF8', color: '#2f2f2f' }}
      onClick={(e) => e.stopPropagation()}
    >
      {sortOptions.map((option) => (
        <div
          key={option}
          className={`px-3 py-2 cursor-pointer text-base hover:bg-[#f2ece7] ${
            sortOrder === option ? 'font-semibold text-[var(--accent)]' : ''
          }`}
          onClick={() => {
            setSortOrder(option)
            setDropdownVisible(false)
          }}
        >
          {option}
        </div>
      ))}
    </div>
  )

  return (
    <div className="mx-auto">
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-base mb-4" style={{ color: secondaryTextColor }}>
        <ul className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline" style={{ color: secondaryTextColor }}>
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="font-semibold" style={{ color: textColor }}>
            Publications
          </li>
        </ul>
      </div>

      <Heading text={pageTitle} />

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4 mb-16">
        {/* Search */}
        <div className="relative w-full md:w-[60%]">
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, author, venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-[#F2EAE2] bg-[#FFFBF8] text-base rounded-none focus:outline-none"
          />
        </div>

        {/* Sort Dropdown Button */}
        <Dropdown
          trigger={['click']}
          overlay={sortDropdownContent}
          animation="slide-up"
          placement="bottomRight"
          visible={dropdownVisible}
          onVisibleChange={setDropdownVisible}
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2 border shadow-sm hover:shadow-md transition-shadow text-base rounded-none"
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
      </div>

      {/* Publications List */}
      <div className="space-y-10">
        {filteredPublications.map((pub, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            <p className="text-lg font-medium text-[#2f2f2f] mb-1 flex flex-wrap gap-4 items-center">
              <span className="inline-flex items-center gap-1">
                <FaUniversity className="text-[var(--accent)]" />
                <span className="font-bold">{pub.venue}</span>
              </span>
              {pub.year && (
                <span className="inline-flex items-center gap-1">
                  <FaCalendarAlt className="text-[var(--accent)]" />
                  {pub.year}
                </span>
              )}
              {pub.location && (
                <span className="inline-flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[var(--accent)]" />
                  {pub.location}
                </span>
              )}
            </p>
            <h3 className="text-3xl font-semibold text-[#2f2f2f] mt-1">{pub.title}</h3>
            {pub.proceedings && (
              <p className="italic text-lg text-[#4a4a4a] mt-1">{pub.proceedings}</p>
            )}
            <p className="text-lg text-[#4a4a4a] mt-2">{pub.authors.map((a: any) => a.name).join(', ')}</p>
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-4 py-1.5 text-base text-white hover:scale-105 transform transition-transform duration-200"
              style={{ backgroundColor: 'var(--secondary)' }}
            >
              View Publication
            </a>
            {index !== filteredPublications.length - 1 && (
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
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default PublicationsPage
