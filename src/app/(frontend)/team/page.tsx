'use client'

import Image from 'next/image'
import Heading from '@/components/Heading'
import Link from 'next/link'
import { FaEnvelope, FaLinkedin, FaGlobe } from 'react-icons/fa'
import { teamData } from '@/static/team'
import { pageSettingsData } from '@/static/pageSettings'
import { motion } from 'framer-motion'

const textColor = '#2f2f2f'
const secondaryTextColor = '#7f7f7f'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

// Helper to fix media URLs from Payload
const transformImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null
  const fixed = url.startsWith('/api/media/file/')
    ? url.replace('/api/media/file/', '/uploads/')
    : url
  return fixed.startsWith(BASE_PATH) ? fixed : `${BASE_PATH}${fixed}`
}

const TeamPage = () => {
  const pageTitle = pageSettingsData.find((p) => p.page === 'team')?.title || 'Our Team'

  if (!teamData || teamData.length === 0) {
    return <p>No team data available.</p>
  }

  return (
    <div className="mb-12 mx-auto">
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
            Team
          </li>
        </ul>
      </div>

      <Heading text={pageTitle} />

      <div className="mt-10 space-y-10">
        {teamData
          .slice()
          .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999))
          .map((member) => {
            const linkedInDisplay = member.linkedin
              ? member.linkedin.replace(/^https?:\/\/(www\.)?/i, '')
              : null

            const imageUrl: any = member.image?.url
              ? transformImageUrl(member.image.url)
              : `${BASE_PATH}/uploads/unknown.png`

            return (
              <div
                key={member.email}
                className="flex flex-row items-start gap-4 sm:gap-6 text-sm sm:text-base"
                style={{ alignItems: 'center' }}
              >
                {/* Profile Image */}
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 relative rounded-full overflow-hidden flex-shrink-0"
                  style={{
                    border: '0.25rem solid var(--secondary)',
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={member.name}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Info Box */}
                <div className="flex-1 border border-[#F2EAE2] bg-[#FFFBF8] p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#2f2f2f] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[0.85rem] font-medium text-[#7f7f7f] mb-2">{member.title}</p>
                  <p className="text-[0.85rem] text-[#4a4a4a] mb-4">{member.description}</p>

                  <div className="w-full border-t border-[#e5e5e5] my-2" />

                  <div className="flex flex-wrap items-center gap-8 text-[0.85rem]">
                    {/* Email */}
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 hover:underline text-[#7f7f7f]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaEnvelope /> {member.email}
                    </a>

                    {/* LinkedIn */}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="inline-flex items-center gap-2 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="text-[#8CC5F0]" />
                        {linkedInDisplay}
                      </a>
                    )}

                    {/* Website */}
                    {member.website && (
                      <a
                        href={member.website}
                        className="inline-flex items-center gap-2 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGlobe className="text-[#9FCB9F]" />
                        {member.website}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default TeamPage
