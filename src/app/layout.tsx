import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@/components/seo/GoogleAnalytics'
import PageTracker from '@/components/seo/PageTracker';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Devin Gupta',
  description: 'Stanford Undergrad \'26',
  keywords: 'devin gupta stanford cupertino monta vista balyasny 26',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devin-gupta.github.io',
    siteName: 'Devin Gupta',
    title: 'Devin Gupta',
    description: 'Stanford Undergrad \'26',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <meta name="google-site-verification" content="_ToCD-7eR7PIWnJYeer0CVpFacav4PdpclPaO-6UONw" />
        <GoogleAnalytics />

        {/* open graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Devin Gupta" />
        <meta property="og:title" content="Devin Gupta" />
        <meta property="og:description" content="Stanford Undergrad '26" />
        <meta property="og:url" content="https://devin-gupta.github.io" />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:image:alt" content="Devin Gupta Portfolio" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className={inter.className}>
        <PageTracker />
        {children}
      </body>
    </html>
  )
}
