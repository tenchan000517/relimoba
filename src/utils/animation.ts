// utils/animation.ts

// Parallax scroll effect for background elements
export function parallaxScroll() {
    if (typeof window !== 'undefined') {
      const parallaxElements = document.querySelectorAll<HTMLElement>('.parallax-bg');
      
      const handleScroll = () => {
        parallaxElements.forEach((element) => {
          const scrollPosition = window.scrollY;
          const speed = Number(element.dataset.speed || 0.5);
          element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
    
    return () => {};
  }
  
  // Animation when elements scroll into view
  export function setupScrollAnimations() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const elements = document.querySelectorAll<HTMLElement>('.scroll-animate');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            // Add animation classes when element is in view
            const animation = element.dataset.animation || 'fade-in';
            element.classList.add(animation);
            
            // Remove from observation once animated
            if (!element.dataset.repeat) {
              observer.unobserve(element);
            }
          } else if ((entry.target as HTMLElement).dataset.repeat) {
            // Remove animation classes if element should repeat
            const element = entry.target as HTMLElement;
            const animation = element.dataset.animation || 'fade-in';
            element.classList.remove(animation);
          }
        });
      }, {
        threshold: Number(document.documentElement.dataset.animationThreshold || 0.1),
        rootMargin: document.documentElement.dataset.animationMargin || '0px',
      });
      
      elements.forEach((element) => {
        observer.observe(element);
      });
      
      return () => observer.disconnect();
    }
    
    return () => {};
  }
  
  // Mouse parallax effect for elements
  export function setupMouseParallax() {
    if (typeof window !== 'undefined') {
      const elements = document.querySelectorAll<HTMLElement>('[data-mouse-parallax]');
      
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        elements.forEach((element) => {
          const speed = Number(element.dataset.mouseParallax || 0.1);
          const x = (clientX - centerX) * speed;
          const y = (clientY - centerY) * speed;
          
          element.style.transform = `translate(${x}px, ${y}px)`;
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
    
    return () => {};
  }
  
  // Init all animations
  export function initAnimations() {
    const cleanupParallax = parallaxScroll();
    const cleanupScroll = setupScrollAnimations();
    const cleanupMouse = setupMouseParallax();
    
    return () => {
      cleanupParallax();
      cleanupScroll();
      cleanupMouse();
    };
  }