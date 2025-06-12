// utils/scroll.ts

// Smooth scroll to element by ID
export function scrollToElement(id: string, offset = 0) {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(id);
      
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
  
  // Setup smooth scroll for all anchor links
  export function setupSmoothScroll(offset = 80) {
    if (typeof window !== 'undefined') {
      const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
      
      const handleClick = (e: Event) => {
        const link = e.currentTarget as HTMLAnchorElement;
        const targetId = link.getAttribute('href')?.substring(1);
        
        if (targetId) {
          e.preventDefault();
          scrollToElement(targetId, offset);
        }
      };
      
      anchorLinks.forEach((link) => {
        link.addEventListener('click', handleClick);
      });
      
      return () => {
        anchorLinks.forEach((link) => {
          link.removeEventListener('click', handleClick);
        });
      };
    }
    
    return () => {};
  }
  
  // Get current scroll position
  export function getScrollPosition() {
    if (typeof window !== 'undefined') {
      return {
        x: window.scrollX || window.pageXOffset,
        y: window.scrollY || window.pageYOffset
      };
    }
    
    return { x: 0, y: 0 };
  }
  
  // Check if element is in viewport
  export function isInViewport(element: HTMLElement, offset = 0) {
    if (typeof window !== 'undefined') {
      const rect = element.getBoundingClientRect();
      
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= offset &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
        rect.right >= offset
      );
    }
    
    return false;
  }