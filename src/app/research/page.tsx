import type { Metadata } from 'next'
import Navbar from '../pages/navbar'
import Research from '../pages/research'
import Footer from '../pages/footer'
import { PageTransition } from '@/components/ui/loading'
import Breadcrumb from '@/components/ui/breadcrumb'

export const metadata: Metadata = {
  title: 'Research - Devin Gupta',
  description: 'Research in AI and robotics at Stanford SAIL (imitation learning), computational social science at CDDRL, and Internet Observatory misinformation studies.',
  keywords: 'devin gupta research stanford ai robotics imitation learning SAIL CDDRL internet observatory computational social science misinformation',
  openGraph: {
    title: 'Research - Devin Gupta',
    description: 'Research in AI and robotics at Stanford SAIL (imitation learning), computational social science at CDDRL, and Internet Observatory misinformation studies.',
    url: 'https://devin-gupta.github.io/research',
    type: 'website',
    siteName: 'Devin Gupta',
  },
  twitter: {
    card: 'summary',
    title: 'Research - Devin Gupta',
    description: 'AI, robotics, and computational social science research at Stanford',
  },
}

export default function ResearchPage() {
  return (
    <PageTransition>
      <div className='max-w-2xl mx-5 md:m-auto'>
        <Navbar />
        <Breadcrumb />
        <Research />
        <Footer />
      </div>
    </PageTransition>
  )
}