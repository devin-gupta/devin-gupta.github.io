import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
};

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-in fade-in duration-300">
      {children}
    </div>
  );
};