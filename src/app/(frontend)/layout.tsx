import './globals.css'
import { Playfair_Display, Inter, Lora, Source_Sans_3, EB_Garamond } from 'next/font/google'
import LayoutWrapper from '@/components/LayoutWrapper'
// import { ThemeProvider } from "next-themes";

// Load Fonts
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
})

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans-3',
})

import { websiteSettingsData } from '@/static/websiteSettings'

export async function generateMetadata() {
  const site = websiteSettingsData[0]
  const siteTitle = site?.siteName || 'Website'
  return {
    title: siteTitle,
    description: siteTitle,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSans3.variable} ${ebGaramond.variable}`}>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
