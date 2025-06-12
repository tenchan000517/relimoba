// components/AboutSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import CtaButton from '@/components/ui/cta-button';
import { siteConfig } from '@/config/site';

export default function AboutSection() {
  // スクロール方向の検出用の状態
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);

  // Intersection Observerの設定 - thresholdを0.1に変更
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // スクロール位置を監視するためのイベントリスナー
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    // スクロールイベントを監視（パフォーマンス最適化のためpassive: trueを設定）
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // クリーンアップ関数
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // State to manage the animation sequence for each element
  const [animatedElements, setAnimatedElements] = useState({
    title: false,
    subtitle: false,
    image1: false,
    text1: false,
    image2: false,
    text2: false,
    platform: false,
    cta: false,
    learnMore: false // 新しいボタン用のアニメーション状態を追加
  });

  // Effect to trigger the animation sequence when the section comes into view
  useEffect(() => {
    if (inView) {
      // 下からスクロールしてきた場合（scrollingDown = false）は即時表示
      if (!scrollingDown) {
        setAnimatedElements({
          title: true,
          subtitle: true,
          image1: true,
          text1: true,
          image2: true,
          text2: true,
          platform: true,
          cta: true,
          learnMore: true // 追加
        });
      } else {
        // 上からスクロールしてきた場合は通常のアニメーション（遅延あり）
        const timers = [
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, title: true })), 100),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, subtitle: true })), 300),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, image1: true })), 500),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, text1: true })), 700),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, image2: true })), 900),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, text2: true })), 1100),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, platform: true })), 1300),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, cta: true })), 1500),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, learnMore: true })), 1300), // 追加
        ];
        
        // Cleanup function
        return () => {
          timers.forEach(timer => clearTimeout(timer));
        };
      }
    } else {
      // Reset animations when section leaves viewport
      setAnimatedElements({
        title: false,
        subtitle: false,
        image1: false,
        text1: false,
        image2: false,
        text2: false,
        platform: false,
        cta: false,
        learnMore: false // 追加
      });
    }
  }, [inView, scrollingDown]); // 依存配列にscrollingDownを追加

  return (
    <section
      ref={ref}
      id="feature" // このIDにリンクします
      className="py-12 md:py-20 px-4 bg-gradient-to-b from-indigo-100 to-white relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        {/* ヘッダーセクション */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${animatedElements.title ? 'opacity-100' : 'opacity-0'}`}>
            レリモバってなに？
          </h2>
        </div>

        {/* メインコンテンツ - 改良されたグリッドレイアウト */}
        <div className="mb-16">
          {/* サービス概要説明（全幅） */}
          <div className={`transition-all duration-1000 mb-6 md:mb-10 ${animatedElements.image1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <p className="text-gray-700 mb-6 text-xl text-center">
            レリモバは、RELiCが運営するモバイルサービスです。<br/>      利用料金に応じて『トークン』を還元致します！
            </p>

            <p className="text-gray-700 mb-6 text-xl text-center">
            RELiCでは皆様から頂戴する事業収益の一部を、個人のクリエイター様や挑戦する新規事業者様への支援に充てております。
            </p>
            <p className="text-gray-700 mb-6 text-xl text-center">
            皆様にレリモバを使用して頂くことで、ただそれだけで支援の輪が広がります。
            </p>
            <p className="text-gray-700 mb-6 text-xl text-center">
            私たちは新しい時代の道しるべとなり、皆様に分かりやすいかたちでこれからもサービスを提供し続けます！
            </p>
            
            {/* ここに「もっと詳しく！」ボタンを追加 */}
            <div className="mt-8 text-center">
              <CtaButton
                href="https://r.voicy.jp/LMKxJe4z9yo"
                variant="outline"
                size="md"
                animation="scale"
                external={true}
                className={`transition-all duration-1000 bg-transparent border-2 border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white ${animatedElements.learnMore ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                もっと詳しく！
              </CtaButton>
            </div>
          </div>

          {/* カードエリア - PCでは3つのカードを横並びに */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* カード1: トークン獲得の仕組み */}
            <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-1000 ${animatedElements.image1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="flex justify-center mb-4">
                <div className="text-sky-500">
                  <svg aria-hidden="true" className="w-16 h-16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-sm md:text-base">
                <em className="text-indigo-600 font-bold">トークン獲得の</em><br />
                <span className="text-2xl text-gray-900 md:text-3xl font-bold">仕組み</span>
              </h3>
              <div className="text-gray-700 space-y-1 text-center text-sm">
                <p>レリモバでは、お支払いしていただいた</p>
                <p>料金に対してFiNANCiE上の</p>
                <p>「限定ポイント」を定期的に付与します。</p>
                <div className="my-6"></div>
                <p>付与された限定ポイントは「RELiCトークン」の</p>
                <p>購入にのみご利用いただけます。</p>
                <div className="my-6"></div>
                <p>限定ポイントを貯めて、お好きなタイミングで</p>
                <p>トークンをご購入ください！</p>
              </div>
            </div>

            {/* カード2: 安くてもつながる */}
            <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-1000 ${animatedElements.text1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="flex justify-center mb-4">
                <div className="text-green-400">
                  <svg aria-hidden="true" className="w-16 h-16" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M216 288h-48c-8.84 0-16 7.16-16 16v192c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V304c0-8.84-7.16-16-16-16zM88 384H40c-8.84 0-16 7.16-16 16v96c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16v-96c0-8.84-7.16-16-16-16zm256-192h-48c-8.84 0-16 7.16-16 16v288c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V208c0-8.84-7.16-16-16-16zm128-96h-48c-8.84 0-16 7.16-16 16v384c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V112c0-8.84-7.16-16-16-16zM600 0h-48c-8.84 0-16 7.16-16 16v480c0 8.84 7.16 16 16 16h48c8.84 0 16-7.16 16-16V16c0-8.84-7.16-16-16-16z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                <em className="text-indigo-600 font-medium">安くても</em><br />
                <span className="text-2xl text-gray-900 md:text-3xl font-bold">つながる</span>
              </h3>
              <div className="text-gray-700 space-y-1 text-center text-sm">
                <p>レリモバの通信回線は</p>
                <p>「エックスモバイル」が提供しています。</p>
                <p>格安SIMはdocomo回線（通信エリア）に対応。</p>
                <div className="my-6"></div>
                <p>Wi-Fiはdocomo、au、Softbank、楽天の</p>
                <p>マルチキャリア対応。</p>
                <div className="my-6"></div>
                <p>安心してモバイル通信をご利用いただけます。</p>
              </div>
            </div>

            {/* カード3: 乗り換え */}
            <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all duration-1000 ${animatedElements.text2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div className="flex justify-center mb-4">
                <div className="text-orange-300">
                  <svg aria-hidden="true" className="w-16 h-16" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V128L256 0H64C28.7 0 0 28.7 0 64zm224 192h-64v-64h64v64zm96 0h-64v-64h32c17.7 0 32 14.3 32 32v32zm-64 128h64v32c0 17.7-14.3 32-32 32h-32v-64zm-96 0h64v64h-64v-64zm-96 0h64v64H96c-17.7 0-32-14.3-32-32v-32zm0-96h256v64H64v-64zm0-64c0-17.7 14.3-32 32-32h32v64H64v-32z" fill="currentColor"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                <em className="text-indigo-600 font-medium">今すぐカンタン</em><br />
                <span className="text-2xl text-gray-900 md:text-3xl font-bold">乗り換え</span>
              </h3>
              <div className="text-gray-700 space-y-1 text-center text-sm">
                <p>お申し込み後、郵送で届く</p>
                <p>「SIMカード」を差し替えるだけ！</p>
                <div className="my-6"></div>
                <p>新規の電話番号取得はもちろん、現在の</p>
                <p>電話番号を引き継いで</p>
                <p>乗り換えることも可能です。</p>
                <div className="my-6"></div>
                <p>eSIMプランの乗り換えにも対応！</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button - site.tsのURLを使用し、CtaButtonコンポーネントを使用 */}
        <div className="mt-16 mb-16 text-center">
          <CtaButton
            href={siteConfig.cta.signup}
            variant="default"
            size="lg"
            animation="bounce"
            external={true}
            className={`text-xl font-bold ${animatedElements.cta ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            今すぐお申し込み！
          </CtaButton>
        </div>
      </div>

      {/* アニメーションスタイル */}
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
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  );
}