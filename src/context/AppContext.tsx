// context/AppContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initAnimations } from '@/utils/animation';
import { setupSmoothScroll } from '@/utils/scroll';

interface AppContextProps {
  isPageLoaded: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  scrollToSection: (id: string) => void;
}

const AppContext = createContext<AppContextProps>({
  isPageLoaded: false,
  isMenuOpen: false,
  toggleMenu: () => {},
  closeMenu: () => {},
  scrollToSection: () => {},
});

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    // Initialize animations when component mounts
    const cleanupAnimations = initAnimations();
    
    // Setup smooth scroll for anchor links
    const cleanupScroll = setupSmoothScroll(80); // 80px offset for header
    
    // Set page as loaded after a short delay
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      cleanupAnimations();
      cleanupScroll();
    };
  }, []);
  
  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);
  
  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const scrollToSection = (id: string) => {
    closeMenu();
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };
  
  return (
    <AppContext.Provider value={{
      isPageLoaded,
      isMenuOpen,
      toggleMenu,
      closeMenu,
      scrollToSection,
    }}>
      {children}
    </AppContext.Provider>
  );
}