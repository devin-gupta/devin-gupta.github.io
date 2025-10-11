'use client';

import { useState } from 'react';
import Navbar from './pages/navbar';
import Hero from './pages/hero';
import Footer from './pages/footer';
import { PageTransition } from '@/components/ui/loading';
import ChatBox from '@/components/chat/ChatBox';
import ChatToggle from '@/components/chat/ChatToggle';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setIsChatMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  return (
    <PageTransition>
      <div id="hero" className='max-w-2xl mx-5 md:m-auto'>
        {/* hey! thanks for checking out my site. i built it myself with next.js, tailwindcss, and typescript, but it's mostly just html. send me an email, we should chat!   */}
        <Navbar />
        <Hero />
        <Footer />
        
        {/* Chat Components */}
        <ChatToggle onClick={toggleChat} isOpen={isChatOpen} />
        <ChatBox 
          isOpen={isChatOpen} 
          onToggle={toggleChat}
          isMinimized={isChatMinimized}
          onMinimize={toggleMinimize}
        />
      </div>
    </PageTransition>
  );
}