'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { useInView } from 'react-intersection-observer';
import AnimatedCharacters from '@/components/ui/AnimatedCharacters';

export default function Hero() {
  const { isPageLoaded } = useAppContext();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Add inView functionality for the headings
  const { ref: headingRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // スクロール位置を監視するためのイベントリスナー
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // スクロールイベントを監視
    window.addEventListener('scroll', handleScroll);

    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // スクロールボタンの透明度を計算
  const calculateOpacity = () => {
    if (scrollY < 10) return 1; // スクロールがほとんどない場合は完全に表示
    if (scrollY > 100) return 0; // 100px以上スクロールしたら完全に透明に

    // 10pxから100pxの間は線形に透明度を減少
    return 1 - (scrollY - 10) / 90;
  };

  const buttonOpacity = calculateOpacity();

  return (
    <section id="hero" className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center">
      {/* Title at the top */}
      {/* <div 
        ref={titleRef}
        className="absolute top-24 md:top-24 left-1/2 transform -translate-x-1/2 w-full text-center z-20"
      >
        <h1 className={`text-5xl md:text-6xl font-bold text-white transition-all duration-1000 ${
          titleInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
        }`}>
          RELiC MOBILE
        </h1>
      </div>
       */}

      <AnimatedCharacters />

      {/* Mobile-optimized image container */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* For mobile - centered vertically and horizontally */}
        <div className="md:hidden flex justify-center items-center h-full">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/mainlogo.jpeg"
              alt="RELiC MOBILE"
              fill
              className={`object-cover transition-opacity duration-1000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
              priority
              sizes="100vw"
              style={{ objectPosition: 'center center' }}
            />
          </div>
        </div>

        {/* For tablets and desktop - centered vertically and horizontally */}
        <div className="hidden md:flex justify-center items-center h-full">
          <div className="relative w-full h-full">
            <Image
              src="/images/mainlogo.jpeg"
              alt="RELiC MOBILE"
              fill
              className={`object-contain transition-opacity duration-1000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsImageLoaded(true)}
              priority
              sizes="100vw"
              style={{ objectPosition: 'center center' }}
            />
          </div>
        </div>
      </div>

      {/* Feature heading moved to hero section */}
      <div
        ref={headingRef}
        className="absolute bottom-24 md:bottom-32 left-1/2 transform -translate-x-1/2 w-full text-center z-30" // z-30を追加
      >
        <h2 className={`text-3xl md:text-5xl font-bold text-white transition-all duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
          「トークン」がもらえる<br />格安モバイル
        </h2>
      </div>

      {/* Scroll down button - fade out smoothly when scrolled */}
      <div
        className={`absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${isPageLoaded && isImageLoaded ? 'translate-y-0' : 'translate-y-10'
          }`}
        style={{
          opacity: buttonOpacity,
          visibility: buttonOpacity === 0 ? 'hidden' : 'visible',
          pointerEvents: buttonOpacity === 0 ? 'none' : 'auto'
        }}
      >
        <Link
          href="#content"
          className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center font-semibold hover:bg-opacity-90 transition-all duration-300 animate-bounce-slow text-sm md:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          SCROLL
        </Link>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
        
        @keyframes slideInFromLeft {
          from { 
            opacity: 0;
            transform: translateX(-50px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideInFromLeft 1s ease forwards;
        }
      `}</style>
    </section>
  );
}