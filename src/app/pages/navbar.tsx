'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { trackEvent } from '@/components/seo/GoogleAnalytics';

export default function Navbar() {
  const pathname = usePathname();

  const handleNavClick = (section: string) => {
    trackEvent('nav_click', 'navigation', section);
  };

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname === path) return true;
    return false;
  };

  return (
      <header id="navbar" className="flex items-center my-14 justify-center">
          <Link href="/">
            <Button 
              variant={isActive('/') ? "default" : "ghost"}
              onClick={() => handleNavClick('home')}
            >
              home
            </Button>
          </Link>
          <Link href="/edu">
            <Button 
              variant={isActive('/edu') ? "default" : "ghost"}
              onClick={() => handleNavClick('education')}
            >
              education
            </Button>
          </Link>
          <Link href="/work">
            <Button 
              variant={isActive('/work') ? "default" : "ghost"}
              onClick={() => handleNavClick('work')}
            >
              work
            </Button>
          </Link>
          <Link href="/research">
            <Button 
              variant={isActive('/research') ? "default" : "ghost"}
              onClick={() => handleNavClick('research')}
            >
              research
            </Button>
          </Link>
    </header>
  )
}