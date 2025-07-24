import type { Metadata } from 'next'
import Navbar from '../pages/navbar'
import Edu from '../pages/edu'
import Footer from '../pages/footer'
import { PageTransition } from '@/components/ui/loading'
import Breadcrumb from '@/components/ui/breadcrumb'

export const metadata: Metadata = {
  title: 'Education - Devin Gupta',
  description: 'Devin Gupta\'s educational background at Stanford University. Junior studying Physics and Management Science & Engineering with coursework in CS, Math, and more.',
  keywords: 'devin gupta education stanford university physics management science engineering coursework machine learning algorithms quantum',
  openGraph: {
    title: 'Education - Devin Gupta',
    description: 'Devin Gupta\'s educational background at Stanford University. Junior studying Physics and Management Science & Engineering with coursework in CS, Math, and more.',
    url: 'https://devin-gupta.github.io/edu',
    type: 'website',
    siteName: 'Devin Gupta',
    images: [{
      url: '/images/sle_yosemite.jpg',
      width: 800,
      height: 600,
      alt: 'Stanford SLE Yosemite trip',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education - Devin Gupta',
    description: 'Stanford University student studying Physics and Management Science & Engineering',
  },
}

export default function EducationPage() {
  return (
    <PageTransition>
      <div className='max-w-2xl mx-5 md:m-auto'>
        <Navbar />
        <Breadcrumb />
        <Edu />
        <Footer />
      </div>
    </PageTransition>
  )
}