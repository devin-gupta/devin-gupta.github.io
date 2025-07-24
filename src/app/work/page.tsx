import type { Metadata } from 'next'
import Navbar from '../pages/navbar'
import Work from '../pages/work'
import Footer from '../pages/footer'
import { PageTransition } from '@/components/ui/loading'
import Breadcrumb from '@/components/ui/breadcrumb'

export const metadata: Metadata = {
  title: 'Work Experience - Devin Gupta',
  description: 'Professional work experience at Balyasny Asset Management (hedge fund), Atomic Vaults (fintech startup), and Duco Experts (tech policy consulting).',
  keywords: 'devin gupta work experience internships balyasny hedge fund atomic vaults fintech duco tech policy consulting proprietary research',
  openGraph: {
    title: 'Work Experience - Devin Gupta',
    description: 'Professional work experience at Balyasny Asset Management (hedge fund), Atomic Vaults (fintech startup), and Duco Experts (tech policy consulting).',
    url: 'https://devin-gupta.github.io/work',
    type: 'website',
    siteName: 'Devin Gupta',
    images: [{
      url: '/images/nyc_bam.jpg',
      width: 800,
      height: 600,
      alt: 'NYC Balyasny internship experience',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work Experience - Devin Gupta',
    description: 'Hedge fund, fintech, and tech policy consulting experience',
  },
}

export default function WorkPage() {
  return (
    <PageTransition>
      <div className='max-w-2xl mx-5 md:m-auto'>
        <Navbar />
        <Breadcrumb />
        <Work />
        <Footer />
      </div>
    </PageTransition>
  )
}