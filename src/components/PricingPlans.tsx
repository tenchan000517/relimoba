// components/PricingPlans.tsx
'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Wifi } from 'lucide-react';
import CtaButton from '@/components/ui/cta-button';
import { siteConfig } from '@/config/site';

export default function PricingPlans() {
  // スクロール方向の検出用の状態
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);

  // スクロール位置を監視するためのイベントリスナー
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > lastScrollY);
      setLastScrollY(currentScrollY);
    };

    // スクロールイベントを監視
    window.addEventListener('scroll', handleScroll, { passive: true });

    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // より寛容なしきい値と、アニメーション設定
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // State to manage the animation sequence for each element
  const [animatedElements, setAnimatedElements] = useState({
    title: false,
    subtitle: false,
    plans: false,
    cta: false
  });

  // Effect to trigger the animation sequence when the section comes into view
  useEffect(() => {
    if (inView) {
      // 下からスクロールしてきた場合（scrollingDown = false）は即時表示
      if (!scrollingDown) {
        setAnimatedElements({
          title: true,
          subtitle: true,
          plans: true,
          cta: true
        });
      } else {
        // 上からスクロールしてきた場合は通常のアニメーション
        const timers = [
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, title: true })), 50),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, subtitle: true })), 100),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, plans: true })), 300),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, cta: true })), 500),
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
        plans: false,
        cta: false
      });
    }
  }, [inView, scrollingDown]);

  return (
    <section
      ref={ref}
      id="plans" // このIDにリンクします
      className="py-12 px-4 bg-gradient-to-b from-blue-100 to-white text-black relative overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${animatedElements.title ? 'opacity-100' : 'opacity-0'}`}>
            料金プラン
          </h2>
          <p className={`text-lg text-gray-700 max-w-3xl mx-auto transition-all duration-1000 ${animatedElements.subtitle ? 'opacity-100' : 'opacity-0'}`}>
            用途に合わせて選べるSIMタイプ・Wi-Fiタイプの２プランをご提供
          </p>
        </div>

        {/* SIM Plan */}
        <div className={`mb-4 transition-all duration-1000 ${animatedElements.plans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="bg-black text-white rounded-t-lg p-6">
            <div className="flex justify-center items-center mb-2">
              <span className="text-xl font-bold mr-2">トークン＋</span>
              <span className="bg-white text-black px-2 py-0.5 rounded text-sm font-bold">モバイル</span>
            </div>
            <div className="flex justify-center items-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                <path d="M17 2H7C5.9 2 5 2.9 5 4V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V4C19 2.9 18.1 2 17 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM16 10H8V8H16V10Z" fill="white" />
              </svg>
              <Image
                src="/images/img/logo.png"
                alt="RELiC Logo"
                width={150}
                height={40}
                className="mr-3"
              />
              <span className="text-4xl font-bold">SIM</span>
            </div>
          </div>

          <div className="bg-white rounded-b-lg shadow-md p-6">
            <div className="mb-6">
              <div className="rounded-full bg-gray-100 flex items-center p-2 px-6 shadow-md w-fit mx-auto md:mx-0">
                <span className="text-xl font-medium mr-4">対応通信エリア</span>
                <Image
                  src="/images/image2.gif"
                  alt="NTT docomo"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex justify-between items-center">
                <span className="text-4xl font-bold">3<span className="text-lg">GB</span></span>
                <span className="text-4xl font-bold">980<span className="text-lg">円</span></span>
                <span className="text-gray-500 text-sm">税込1,078円</span>
              </div>
              <div className="h-px bg-gray-200 w-full"></div>

              <div className="flex justify-between items-center">
                <span className="text-4xl font-bold">5<span className="text-lg">GB</span></span>
                <span className="text-4xl font-bold">1,180<span className="text-lg">円</span></span>
                <span className="text-gray-500 text-sm">税込1,298円</span>
              </div>
              <div className="h-px bg-gray-200 w-full"></div>

              <div className="flex justify-between items-center">
                <span className="text-4xl font-bold">10<span className="text-lg">GB</span></span>
                <span className="text-4xl font-bold">1,580<span className="text-lg">円</span></span>
                <span className="text-gray-500 text-sm">税込1,738円</span>
              </div>
              <div className="h-px bg-gray-200 w-full"></div>

              <div className="flex justify-between items-center">
                <span className="text-4xl font-bold">20<span className="text-lg">GB</span></span>
                <span className="text-4xl font-bold">1,980<span className="text-lg">円</span></span>
                <span className="text-gray-500 text-sm">税込2,178円</span>
              </div>
              <div className="h-px bg-gray-200 w-full"></div>

              <div className="flex justify-between items-center">
                <span className="text-4xl font-bold">50<span className="text-lg">GB</span></span>
                <span className="text-4xl font-bold">3,480<span className="text-lg">円</span></span>
                <span className="text-gray-500 text-sm">税込3,828円</span>
              </div>
            </div>
          </div>

          {/* Token Return Banner */}
          <div className="bg-pink-500 text-white rounded-lg p-4 mt-1 mb-6 flex justify-center">
            <div className="container max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="text-2xl md:text-3xl font-bold mb-1 antialiased text-center md:text-left">すべてのプラン</div>
                <div className="flex flex-wrap items-end justify-center md:justify-start md:ml-4">
                  <span className="text-6xl md:text-7xl font-bold leading-none antialiased">10%</span>
                  <div className="ml-2 flex flex-col">
                    <div className="text-lg md:text-xl antialiased">（税抜料金より）</div>
                    <div className="text-2xl md:text-3xl font-bold antialiased">トークン還元</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WiFi Plan */}
        <div className={`mb-4 transition-all duration-1000 delay-300 ${animatedElements.plans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="bg-black text-white rounded-t-lg p-6">
            <div className="flex justify-center items-center mb-2">
              <span className="text-xl font-bold mr-2">トークン＋</span>
              <span className="bg-white text-black px-2 py-0.5 rounded text-sm font-bold">モバイル</span>
            </div>
            <div className="flex justify-center items-center">
              <Wifi size={32} color="white" strokeWidth={2.5} className="mr-3" />
              <Image
                src="/images/img/logo.png"
                alt="RELiC Logo"
                width={150}
                height={40}
                className="mr-3"
              />
              <span className="text-4xl font-bold">Wi-Fi</span>
            </div>
          </div>

          {/* Stecker Image */}
          <div className="flex justify-center bg-white pt-0 md:pt-6">
            <Image
              src="/images/img/stecker.jpg"
              alt="Stecker"
              width={400}
              height={200}
              className="w-full max-w-md md:max-w-2xl h-auto object-cover rounded-b-lg md:rounded-lg"
            />
          </div>

          <div className="bg-white shadow-md">
            <div className="px-4 py-8 md:px-12">
              <div className="rounded-4xl bg-gray-100 flex flex-col p-2 px-6 shadow-md mx-auto md:mx-0 md:max-w-none">
                <span className="text-xl font-bold text-center w-full mb-4">対応通信エリア</span>

                <div className="flex justify-center space-x-4 md:space-x-8">
                  <div className="flex flex-col items-center">
                    <span className="text-red-600 font-medium">docomo</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L3 11C5.5 8.5 8.5 7 12 7C15.5 7 18.5 8.5 21 11L23 9C20 6 16.3 4 12 4C7.7 4 4 6 1 9Z" fill="#E53E3E" />
                      <path d="M5 13L7 15C8.5 13.5 10.2 12.5 12 12.5C13.8 12.5 15.5 13.5 17 15L19 13C16.8 10.8 14.5 9.5 12 9.5C9.5 9.5 7.2 10.8 5 13Z" fill="#E53E3E" />
                      <path d="M9 17L12 20L15 17C13.9 15.9 13 15.5 12 15.5C11 15.5 10.1 15.9 9 17Z" fill="#E53E3E" />
                      <circle cx="12" cy="19.5" r="1.5" fill="#E53E3E" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-400 font-medium">softbank</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L3 11C5.5 8.5 8.5 7 12 7C15.5 7 18.5 8.5 21 11L23 9C20 6 16.3 4 12 4C7.7 4 4 6 1 9Z" fill="#A0AEC0" />
                      <path d="M5 13L7 15C8.5 13.5 10.2 12.5 12 12.5C13.8 12.5 15.5 13.5 17 15L19 13C16.8 10.8 14.5 9.5 12 9.5C9.5 9.5 7.2 10.8 5 13Z" fill="#A0AEC0" />
                      <path d="M9 17L12 20L15 17C13.9 15.9 13 15.5 12 15.5C11 15.5 10.1 15.9 9 17Z" fill="#A0AEC0" />
                      <circle cx="12" cy="19.5" r="1.5" fill="#A0AEC0" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-orange-500 font-medium">au</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L3 11C5.5 8.5 8.5 7 12 7C15.5 7 18.5 8.5 21 11L23 9C20 6 16.3 4 12 4C7.7 4 4 6 1 9Z" fill="#ED8936" />
                      <path d="M5 13L7 15C8.5 13.5 10.2 12.5 12 12.5C13.8 12.5 15.5 13.5 17 15L19 13C16.8 10.8 14.5 9.5 12 9.5C9.5 9.5 7.2 10.8 5 13Z" fill="#ED8936" />
                      <path d="M9 17L12 20L15 17C13.9 15.9 13 15.5 12 15.5C11 15.5 10.1 15.9 9 17Z" fill="#ED8936" />
                      <circle cx="12" cy="19.5" r="1.5" fill="#ED8936" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-pink-600 font-medium">Rakuten</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 9L3 11C5.5 8.5 8.5 7 12 7C15.5 7 18.5 8.5 21 11L23 9C20 6 16.3 4 12 4C7.7 4 4 6 1 9Z" fill="#D53F8C" />
                      <path d="M5 13L7 15C8.5 13.5 10.2 12.5 12 12.5C13.8 12.5 15.5 13.5 17 15L19 13C16.8 10.8 14.5 9.5 12 9.5C9.5 9.5 7.2 10.8 5 13Z" fill="#D53F8C" />
                      <path d="M9 17L12 20L15 17C13.9 15.9 13 15.5 12 15.5C11 15.5 10.1 15.9 9 17Z" fill="#D53F8C" />
                      <circle cx="12" cy="19.5" r="1.5" fill="#D53F8C" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center pb-8">

              {/* 海外対応エリアリンク */}
              <div className="mb-4">
                <a
                  href="https://support.xmobile.ne.jp/hc/ja/articles/23739339223961-%E6%B5%B7%E5%A4%96%E3%81%AE%E3%81%94%E5%88%A9%E7%94%A8%E5%8F%AF%E8%83%BD%E3%82%A8%E3%83%AA%E3%82%A2%E3%81%A8%E6%96%99%E9%87%91%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6-NA01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline text-lg font-medium transition-colors duration-200"
                >
                  海外の対応エリア
                </a>
              </div>

              <h3 className="text-4xl font-black my-6">UNLIMITED</h3>

              <div className="mb-4">
                <p className="text-5xl font-black">3,800<span className="text-2xl">円/月</span></p>
                <p className="text-xl my-1">税込4,180円</p>
              </div>

              <div className="my-6">
                <h4 className="text-2xl font-black mb-2">Wi-Fi端末レンタル料 <span className="text-6xl">0</span>円</h4>
                <p className="text-gray-600">※海外利用時は別途料金が掛かります。</p>
              </div>

            </div>
          </div>

          {/* Token Return Banner */}
          <div className="bg-pink-500 text-white rounded-lg p-4 mt-1 mb-6 flex justify-center">
            <div className="container max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="text-2xl md:text-3xl font-bold mb-1 antialiased text-center md:text-left">すべてのプラン</div>
                <div className="flex flex-wrap items-end justify-center md:justify-start md:ml-4">
                  <span className="text-6xl md:text-7xl font-bold leading-none antialiased">10%</span>
                  <div className="ml-2 flex flex-col">
                    <div className="text-lg md:text-xl antialiased">（税抜料金より）</div>
                    <div className="text-2xl md:text-3xl font-bold antialiased">トークン還元</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Additional Info Section */}
        <div className={`mb-12 transition-all duration-1000 ${animatedElements.plans ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '600ms' }}>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="text-center py-8">
              {/* Token Info */}
              <div className="bg-gray-100 mx-6 p-5 text-left mb-6">
                <h3 className="font-bold mb-3">[トークン還元について]</h3>
                <p className="text-sm text-gray-600 mb-3">
                  ※お支払いいただいた料金に応じて「RELiCトークン」が購入できる、限定FiNANCiEポイントが付与されます（要FiNANCiEアカウント）。
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  ※限定FiNANCiEポイントは、受取から180日で失効します。お早めにポイントをご利用ください。
                </p>
                <p className="text-sm text-gray-600">
                  ※FiNANCiEでのトークン購入・売却、日本円の出金時には、所定の手数料が発生します。
                </p>
              </div>

              {/* Call Options */}
              <div className="bg-gray-100 mx-6 p-5 text-left mb-6">
                <h3 className="font-bold mb-3">[通話料金・オプション]</h3>
                <p className="text-sm text-gray-600 mb-3">
                  国内通話料金は30秒19.9円（税込21.89円）の通話料金が発生いたします。
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  かけ放題オプションは以下の3種類をご用意しております。
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  ・かけ放題ミニ：5分間/何度でもかけ放題（税込550円/月）
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  ・かけ放題ライト：10分間/何度でもかけ放題（税込935円/月）
                </p>
                <p className="text-sm text-gray-600">
                  ・かけ放題フル：無制限/何度でもかけ放題（税込1,650円/月）
                </p>
              </div>

              {/* WiFi Info */}
              <div className="bg-gray-100 mx-6 p-5 text-left">
                <h3 className="font-bold mb-3">[レリモバWi-Fi]</h3>
                <p className="text-sm text-gray-600 mb-3">
                  ※1日33GB以上利用すると速度が128kbpsに制限されます。
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  ※他のお客様に影響が出る大容量通信をされた場合、違法ダウンロード、不正利用等の疑いがある場合、該当のお客様に対し通信速度を制限する場合があります。
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  ※端末はレンタルとなります。解約後は返却いただきます。
                </p>
                <p className="text-sm text-gray-600">
                  ※24ヵ月以内にご解約の場合、解約事務手数料3,800円（税込4,180円）が発生いたします。
                </p>
              </div>
            </div>
          </div>
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

      {/* Animation styles */}
      <style jsx>{`
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