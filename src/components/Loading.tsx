// components/Loading.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';

export default function Loading() {
  const { isPageLoaded } = useAppContext();
  const [isHidden, setIsHidden] = useState(false);
  
  useEffect(() => {
    // Hide the loading screen after the fade-out animation completes
    if (isPageLoaded) {
      const timer = setTimeout(() => {
        setIsHidden(true);
      }, 1000); // 1 second for fade-out animation
      
      return () => clearTimeout(timer);
    }
  }, [isPageLoaded]);
  
  if (isHidden) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isPageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
          </div>
        </div>
        <div className="text-white text-lg">Loading your experience...</div>
      </div>
    </div>
  );
}