import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@/components/seo/GoogleAnalytics';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Devin Gupta',
  description: 'Stanford Undergrad \'26',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/images/favicon.ico" sizes="any" />
      <GoogleAnalytics />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
