'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import CtaButton from '@/components/ui/cta-button';
import { siteConfig } from '@/config/site';

export default function FeatureSection() {
  // 複数の要素を個別に監視するための参照を作成
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // アニメーションを繰り返し実行できるように変更
  });

  // 各ボタン・カードのアニメーション状態を管理
  const [animatedElements, setAnimatedElements] = useState({
    button1: false,
    button2: false,
    button3: false,
    card1: false,
    card2: false,
    card3: false,
    cta: false
  });

  // スクロール方向検出用の状態
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);

  // スクロール位置を監視するためのステート
  const [scrollY, setScrollY] = useState(0);

  // スクロールイベントリスナー
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    // スクロールイベントを監視（パフォーマンス最適化のためpassive: trueを設定）
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // 要素が表示されたらタイミングをずらして順番にアニメーション状態を更新
  useEffect(() => {
    if (sectionInView) {
      // 下からスクロールしてきた場合（上方向スクロール時）は即時表示
      if (!scrollingDown) {
        setAnimatedElements({
          button1: true,
          button2: true,
          button3: true,
          card1: true,
          card2: true,
          card3: true,
          cta: true
        });
      } else {
        // 上からスクロールしてきた場合は通常のアニメーション（遅延あり）
        const animationTimers = [
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, button1: true })), 100),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, button2: true })), 300),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, button3: true })), 500),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, card1: true })), 700),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, card2: true })), 900),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, card3: true })), 1100),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, cta: true })), 1100),
        ];

        // クリーンアップ関数
        return () => {
          animationTimers.forEach(timer => clearTimeout(timer));
        };
      }
    } else {
      // 要素が画面外に出たときにアニメーション状態をリセット
      setAnimatedElements({
        button1: false,
        button2: false,
        button3: false,
        card1: false,
        card2: false,
        card3: false,
        cta: false
      });
    }
  }, [sectionInView, scrollingDown]);
  
  return (
    <section 
      id="content"
      ref={sectionRef}
      className="relative py-4 px-4 overflow-hidden text-white"
      style={{ backgroundColor: 'transparent' }} // 背景色を透明に
    >
      {/* 固定背景カバー（ページ全体に広がる黒の半透明オーバーレイ） */}
      <div className="fixed inset-0 bg-black bg-opacity-90 -z-10"></div>
      
      {/* パララックス背景画像 */}
      <div 
        className="fixed inset-0 -z-5 opacity-30 pointer-events-none"
        style={{ 
          transform: `translateY(calc(-50vh + ${scrollY * 0.5}px))`,
          height: '150vh'  // 高さを大きめに設定して、スクロール時も表示されるように
        }}
      >
        <div className="relative w-full h-full">
          <Image 
            src="/images/IMG_8060.jpeg" 
            alt="RELiC MOBILE Background" 
            fill
            className="object-cover"
            style={{ objectPosition: 'center center' }}
          />
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">

        {/* Button Menu - 立体的なボタン */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-16">
          <Link
            href="#feature"
            className={`bg-blue-500 text-white px-6 py-3 rounded-full inline-flex items-center justify-center text-lg font-semibold border-b-4 border-blue-700 hover:bg-blue-600 hover:border-blue-800 hover:transform hover:-translate-y-1 active:translate-y-0 active:border-b-0 active:border-t-4 active:border-blue-800 transition-all duration-300 ${animatedElements.button1 ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span>レリモバってなに？</span>
          </Link>
          
          <Link
            href="#plans"
            className={`bg-green-500 text-white px-6 py-3 rounded-full inline-flex items-center justify-center text-lg font-semibold border-b-4 border-green-700 hover:bg-green-600 hover:border-green-800 hover:transform hover:-translate-y-1 active:translate-y-0 active:border-b-0 active:border-t-4 active:border-green-800 transition-all duration-300 ${animatedElements.button2 ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>プランをチェック</span>
          </Link>
          
          <Link
            href="#faq"
            className={`bg-purple-500 text-white px-6 py-3 rounded-full inline-flex items-center justify-center text-lg font-semibold border-b-4 border-purple-700 hover:bg-purple-600 hover:border-purple-800 hover:transform hover:-translate-y-1 active:translate-y-0 active:border-b-0 active:border-t-4 active:border-purple-800 transition-all duration-300 ${animatedElements.button3 ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>よくある質問</span>
          </Link>
        </div>
        
        {/* Feature Cards - モバイルでのみ横並びに */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Token Return */}
          <Link
            href="#token_return"
            className={`relative group overflow-hidden bg-black bg-opacity-70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 ${animatedElements.card1 ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <div className="p-4 flex flex-row md:flex-col items-center">
              <div className="relative w-2/5 md:w-full h-32 md:h-60 md:mb-4 mr-4 md:mr-0 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                <Image 
                  src="/images/reward.jpg" 
                  alt="トークン還元" 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="w-1/2 md:w-full text-left md:text-center">
                <h3 className="text-lg md:text-3xl font-bold mb-2 text-white">「トークン」を還元</h3>
              </div>
            </div>
          </Link>
          
          {/* Card 2: Service Details */}
          {/* <Link
            href="#benefit"
            className={`relative group overflow-hidden bg-black bg-opacity-70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 ${animatedElements.card2 ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <div className="p-6 flex flex-row md:flex-col items-center">
            <div className="relative w-2/5 md:w-full h-32 md:h-60 md:mb-4 mr-4 md:mr-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                <Image 
                  src="/images/IMG_8027.jpeg" 
                  alt="レりモバの特徴" 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="w-1/2 md:w-full text-left md:text-center">
                <h3 className="text-xl md:text-3xl font-bold mb-2 text-white">高品質な</h3>
                <h3 className="text-xl md:text-3xl font-bold text-white">サービス</h3>
              </div>
            </div>
          </Link> */}
          
          {/* Card 3: Campaign */}
          <Link
            href="#bonus"
            className={`relative group overflow-hidden bg-black bg-opacity-70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 ${animatedElements.card3 ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <div className="p-6 flex flex-row md:flex-col items-center">
            <div className="relative w-2/5 md:w-full h-32 md:h-60 md:mb-4 mr-4 md:mr-0 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                <Image 
                  src="/images/IMG_8029.jpeg" 
                  alt="特典・キャンペーン" 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="w-1/2 md:w-full text-left md:text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">いまだけ！</h3>
                <h3 className="text-xl md:text-2xl font-bold text-white">特典・キャンペーン</h3>
              </div>
            </div>
          </Link>
        </div>
        
        {/* CTA Button - site.tsのURLを使用し、CtaButtonコンポーネントを使用 */}
        <div className="mt-16 mb-16 text-center">
          <CtaButton
            href={siteConfig.cta.signup}
            variant="cta"
            size="lg"
            animation="bounce"
            external={true}
            className={`text-xl font-bold ${animatedElements.cta ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            今すぐお申し込み！
          </CtaButton>
        </div>
      </div>
      
      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
          animation-delay: 0.8s; /* フェードイン後に開始 */
        }
      `}</style>
    </section>
  );
}