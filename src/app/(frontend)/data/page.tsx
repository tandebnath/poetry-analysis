'use client'

import Heading from '@/components/Heading'
import Link from 'next/link'
import { LuConstruction } from 'react-icons/lu'

const textColor = "#2f2f2f";
const secondaryTextColor = "#7f7f7f";

const DataPage = () => {
  return (
    <div className="text-center">
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
            Data
          </li>
        </ul>
      </div>
      
      <div className="mb-12">
        <Heading text="Data" />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 text-[#4a4a4a]">
        <LuConstruction size={40} className="text-[var(--accent)]" />
        <p className="text-lg">This section is currently under construction.</p>
        <p className="text-base text-[#7f7f7f]">
          We’re working hard to bring you curated datasets, tools, and visualizations soon.
        </p>
      </div>
    </div>
  )
}

export default DataPage
