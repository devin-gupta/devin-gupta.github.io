'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackEvent } from './GoogleAnalytics';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when route changes
    const trackPageVisit = () => {
      const title = document.title;
      trackPageView(pathname, title);
      
      // Track specific section visits for better analytics
      const sectionName = pathname === '/' ? 'home' : pathname.replace('/', '');
      trackEvent('page_visit', 'navigation', sectionName);
    };

    // Small delay to ensure document.title is updated
    const timeoutId = setTimeout(trackPageVisit, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null; // This component doesn't render anything
}