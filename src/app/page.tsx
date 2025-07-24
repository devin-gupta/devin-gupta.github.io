import Navbar from './pages/navbar';
import Hero from './pages/hero';
import Footer from './pages/footer';
import { PageTransition } from '@/components/ui/loading';

export default function Home() {
  return (
    <PageTransition>
      <div id="hero" className='max-w-2xl mx-5 md:m-auto'>
        {/* hey! thanks for checking out my site. i built it myself with next.js, tailwindcss, and typescript, but it's mostly just html. send me an email, we should chat!   */}
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </PageTransition>
  );
}