'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Dropdown from 'rc-dropdown'
import 'rc-dropdown/assets/index.css'
import { FaBars, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { websiteSettingsData } from '@/static/websiteSettings'

interface SubMenuItem {
  name: string
  href: string
}

interface MenuItemBase {
  name: string
}

interface MenuItemWithLink extends MenuItemBase {
  href: string
  hasSubMenu?: false
}

interface MenuItemWithSubMenu extends MenuItemBase {
  hasSubMenu: true
  subItems: SubMenuItem[]
}

type MenuItem = MenuItemWithLink | MenuItemWithSubMenu

interface LayoutWrapperProps {
  children: ReactNode
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const isActive = (path: string) => {
    const cleanCurrent = pathname.replace(/\/+$/, '') // remove trailing slash
    const cleanTarget = path.replace(/\/+$/, '')
    return cleanCurrent === cleanTarget
  }

  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

  const getImagePath = (url: string | null) => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    return url.startsWith(BASE_PATH) ? url : `${BASE_PATH}${url}`
  }

  const transformImageUrl = (url: string | null | undefined) => {
    if (!url) return null
    return url.startsWith('/api/media/file/') ? url.replace('/api/media/file/', '/uploads/') : url
  }

  const siteData = websiteSettingsData[0]
  const logoUrl = transformImageUrl(siteData?.logo?.url)
  const siteName = siteData?.siteName || 'Website'

  // Split site name into two lines if needed
  const nameWords = siteName.split(' ')
  const mid = Math.ceil(nameWords.length / 2)
  const line1 = nameWords.slice(0, mid).join(' ')
  const line2 = nameWords.slice(mid).join(' ')

  const menuItems: MenuItem[] = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Data', href: '/data' },
    { name: 'Publications', href: '/publications' },
    { name: 'Team', href: '/team' },
  ]

  return (
    <div
      className="min-h-screen px-5 py-0"
      style={{
        // backgroundColor: 'var(--background)',
        color: 'var(--text)',
        backgroundImage: 'url("/background1.svg")',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Header */}
      <header className="w-full flex justify-between items-center px-4 py-4 md:justify-start">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            {logoUrl && (
              <Image
                src={getImagePath(logoUrl)}
                alt={siteData?.logo?.alt || 'Logo'}
                width={80}
                height={80}
                className="cursor-pointer"
              />
            )}
            <div
              className="ml-4 text-xl"
              style={{ fontFamily: 'var(--font-lora)', color: 'var(--primary)' }}
            >
              {/* <p className="font-bold leading-tight">Unbiased AI for</p>
              <p className="font-bold leading-tight">Poetry Analysis</p> */}
              {/* <p className="font-bold leading-tight">{line1}</p>
              {line2 && <p className="font-bold leading-tight">{line2}</p>} */}
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex space-x-16 mx-auto items-center"
          style={{ fontFamily: 'var(--font-source-sans-3)' }}
        >
          {menuItems.map((item: any) => {
            const active = isActive(item.href)

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-2xl transition-transform duration-150 ease-out hover:scale-110 ${
                  active ? 'text-[var(--accent)] cursor-default font-semibold' : 'text-text cursor-pointer font-medium '
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="flex flex-col items-start md:hidden py-4 space-y-2">
          {menuItems.map((item) =>
            'hasSubMenu' in item && item.hasSubMenu ? (
              <div key={item.name} className="space-y-1">
                <span className="text-xl font-bold">{item.name}</span>
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={`block px-4 py-2 transition-colors duration-200 ${
                      isActive(subItem.href) ? 'bg-gray-200 text-primary' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xl font-bold transition-transform duration-150 ease-out ${
                  isActive(item.href) ? 'text-primary cursor-default' : 'text-text cursor-pointer'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ),
          )}
        </nav>
      )}

      {/* Main Content */}
      <main className="px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 pt-[2.5%] pb-[5%]">{children}</main>
    </div>
  )
}

export default LayoutWrapper
