'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import CtaButton from '@/components/ui/cta-button';
import { siteConfig } from '@/config/site';

export default function TokenReward() {
  // スクロール方向の検出用の状態
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);

  // Intersection Observerの設定 - AboutSectionと同じthreshold値を使用
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // State to manage the animation sequence for each element
  const [animatedElements, setAnimatedElements] = useState({
    title: false,
    subtitle: false,
    card1: false,
    card2: false,
    platform: false,
    cta: false,
    tokenButton: false // ボタンのアニメーション用に追加
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

  // Apply sequential animations when section comes into view
  useEffect(() => {
    if (sectionInView) {
      // 下からスクロールしてきた場合（scrollingDown = false）は即時表示
      if (!scrollingDown) {
        setAnimatedElements({
          title: true,
          subtitle: true,
          card1: true,
          card2: true,
          platform: true,
          cta: true,
          tokenButton: true // ボタンのアニメーション
        });
      } else {
        // 上からスクロールしてきた場合は通常のアニメーション（遅延あり）
        const timers = [
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, title: true })), 100),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, subtitle: true })), 300),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, card1: true })), 500),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, card2: true })), 700),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, platform: true })), 1000),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, cta: true })), 1300),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, tokenButton: true })), 900), // ボタンアニメーション用
        ];

        // Cleanup function to clear timers
        return () => {
          timers.forEach(timer => clearTimeout(timer));
        };
      }
    } else {
      // Reset animation states when section is out of view
      setAnimatedElements({
        title: false,
        subtitle: false,
        card1: false,
        card2: false,
        platform: false,
        cta: false,
        tokenButton: false
      });
    }
  }, [sectionInView, scrollingDown]);

  return (
    <section
      ref={sectionRef}
      id="token" // このIDにリンクします
      className="py-12 md:py-20 px-4 bg-white dark:bg-white relative overflow-hidden" // ダークモードでも白背景を維持
    >
      <div className="container mx-auto max-w-6xl">
        {/* ヘッダーセクション - AboutSectionと統一 */}
        <div className="text-center mb-10 md:mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-900 transition-all duration-1000 ${animatedElements.title ? 'opacity-100' : 'opacity-0'
              }`}
          >
            トークンってなに？
          </h2>
        </div>

        {/* サービス概要説明（全幅） - AboutSectionと統一 */}
        <div className={`transition-all duration-1000 mb-6 md:mb-10 overflow-hidden ${animatedElements.subtitle ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <p className="text-gray-800 dark:text-gray-800 mb-6 text-lg text-center">
            レリモバは、毎月の利用料金に応じて「トークン」を還元する新しいモバイルサービスです！
          </p>
        </div>

        {/* カードエリア - 2つのカードを横並びに */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* カード1: トークンの特徴 */}
          <div
            className={`bg-white dark:bg-white rounded-xl p-6 md:p-8 transition-all duration-1000 ${animatedElements.card1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
          >
            <div className="flex justify-center mb-6">
              <Image
                src="/images/token.jpg"
                alt="Token Image 1"
                width={200}
                height={200}
                className="rounded-xl"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-4 text-center">
              <span className="text-2xl md:text-3xl font-bold">トークンの特徴</span>
            </h3>
            <div className="text-gray-800 dark:text-gray-800 space-y-3 text-center text-lg">
              <p>トークンには価格があり、</p>
              <div className="my-4"></div>
              <p>毎日価格は変動します！</p>
              <p>「トークン」は、株のような「値動き」があるのが特徴ですね！</p>
              <div className="my-4"></div>
              <p>レリモバは、利用料金に対して</p>
              <p>「トークン」を毎月還元する新時代の通信サービスです。</p>

              <div className="my-4"></div>
              {/* 立体的なボタンへ変更 */}
              <div className="flex justify-center mt-6">
                <a 
                  href="https://financie.jp/communities/RELiC/market" 
                  target="_blank" 
                  rel="noopener"
                  className={`bg-yellow-500 text-white px-2 py-3 rounded-full inline-flex items-center justify-center text-lg font-semibold border-b-4 border-yellow-700 hover:bg-yellow-600 hover:border-yellow-800 hover:transform hover:-translate-y-1 active:translate-y-0 active:border-b-0 active:border-t-4 active:border-yellow-800 transition-all duration-300 ${animatedElements.tokenButton ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span>レリックトークンをチェック！</span>
                </a>
              </div>
            </div>
          </div>

          {/* カード2: トークンの使い方 */}
          <div
            className={`bg-white dark:bg-white rounded-xl p-6 md:p-8 transition-all duration-1000 ${animatedElements.card2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
          >
            <div className="flex justify-center mb-6">
              <Image
                src="/images/reward.jpg"
                alt="Token Image 2"
                width={200}
                height={200}
                className="rounded-xl"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900 mb-4 text-center">
              <span className="text-2xl md:text-3xl font-bold">トークンの使い方</span>
            </h3>
            <div className="text-gray-800 dark:text-gray-800 space-y-3 text-center text-lg">
              <p>①日本円に換金できる！</p>
              <p>②保有してさまざまな特典を楽しみながら応援できる！</p>
              <p>③友達や家族へプレゼントすることもできる！</p>
              <div className="my-4"></div>
              <p>まったく新しい体験をぜひお楽しみください！</p>
            </div>
          </div>
        </div>

        {/* Token Platform Info - デザイン統一 */}
        <div
          className={`bg-white dark:bg-white rounded-xl shadow-sm p-6 md:p-8 mb-10 transition-all duration-1000 border border-gray-200 dark:border-gray-200 ${animatedElements.platform ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/images/financie2-01.png"
              alt="Platform Logo"
              width={300}
              height={84}
              className="mx-auto"
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-600 max-w-3xl mx-auto text-center">
            ※本サービスは、トークン発行プラットフォーム
            <a href="https://financie.jp/" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-600 underline mx-1">「FiNANCiE」</a>
            を利用して実現されています。
            <br className="hidden sm:block" />
            「トークン還元」を利用するためにはFiNANCiEアカウントが必要となります。
            <br className="hidden sm:block" />
            トークンの詳しい受け取り方法は
            <a href="https://note.com/financie/n/nd04398775393" target="_blank" rel="noopener" className="text-blue-600 dark:text-blue-600 underline mx-1">こちらの記事</a>
            をご参照ください。
          </p>
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

      {/* アニメーションスタイル - AboutSectionと同じ */}
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