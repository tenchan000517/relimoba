// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import MobileMenu from './MobileMenu';
import { siteConfig } from '@/config/site';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMenuOpen, toggleMenu, closeMenu, scrollToSection } = useAppContext();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
<header 
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
  style={{ 
    backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.7)' : 'rgba(17, 24, 39, 0.6)', 
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    padding: isScrolled ? '0' : '0.5rem 0'
  }}
>
      <div className="container mx-auto py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logomv.png"
              alt="Logo"
              width={180}
              height={40}
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLinks isScrolled={isScrolled} />
        </nav>
        
        {/* CTA Button (Desktop) - サイトコンフィグからリンクを使用 */}
        <div className="hidden md:block">
          <Link 
            href={siteConfig.cta.signup} 
            target="_blank"
            className="bg-red-500 text-white px-6 py-2 rounded-full inline-flex items-center text-lg font-bold border-b-4 border-red-700 hover:bg-red-600 hover:border-red-800 transition-all duration-300 animate-bounce-slow"
          >
            <span>今すぐお申し込み！</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        {/* Animation for bounce effect */}
        <style jsx global>{`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-1px); }
          }
          
          .animate-bounce-slow {
            animation: bounce-slow 2s infinite ease-in-out;
          }
        `}</style>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden menu-toggle text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <MobileMenu />
      
      {/* Mobile Menu
      <div className={`md:hidden bg-black absolute w-full shadow-lg transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0 overflow-hidden'
      }`}>
        <nav className="flex flex-col space-y-4 px-4">
          <NavLinks mobile onClick={closeMenu} isScrolled={true} />
          <Link 
            href="#signup" 
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all text-center"
            onClick={closeMenu}
          >
            Sign Up Now
          </Link>
        </nav>
      </div> */}
    </header>
  );
}

function NavLinks({ mobile = false, onClick = () => {}, isScrolled = false }) {
  const { scrollToSection } = useAppContext();
  
  const navItems = [
    { name: 'トップ', href: '#hero', section: 'hero' },
    { name: 'レリモバについて', href: '#feature', section: 'feature' },
    { name: '特典・キャンペーン', href: '#token', section: 'token' },
    { name: 'プランと料金', href: '#plans', section: 'plans' },
    { name: 'よくある質問', href: '#faq', section: 'faq' },
    { name: 'RELiCについて', href: '#about', section: 'about' },
  ];
  
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`${
            mobile 
              ? 'block py-2 hover:bg-gray-700 px-3 rounded text-white' 
              : 'text-white hover:text-primary'
          } transition-colors duration-300`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(item.section);
            onClick();
          }}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}