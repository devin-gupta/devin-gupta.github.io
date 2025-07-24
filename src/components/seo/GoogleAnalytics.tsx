import React from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=G-JMCNDPDJBB`}
      />

      <Script id='google-analytics' strategy='lazyOnload'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JMCNDPDJBB', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `}
      </Script>
    </>
  );
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-JMCNDPDJBB', {
      page_path: url,
      page_title: title,
    });
  }
};

export default GoogleAnalytics;