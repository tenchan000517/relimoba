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
    button0: false, // トークンってなに？ボタン用の状態を追加
    button1: false,
    button2: false,
    button3: false,
    card2: false,
    card3: false,
    campaign: false, // キャンペーン情報用の状態を追加
    web3money: false, // WEB3 MONEY情報用の状態を追加
    sticker: false,  // ステッカー情報用の状態を追加
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
          button0: true, // 追加したボタンの状態も更新
          button1: true,
          button2: true,
          button3: true,
          card2: true,
          card3: true,
          campaign: true,
          web3money: true,
          sticker: true,
          cta: true
        });
      } else {
        // 上からスクロールしてきた場合は通常のアニメーション（遅延あり）
        const animationTimers = [
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, button0: true })), 100), // 新しいボタン
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, button1: true })), 300),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, button2: true })), 500),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, button3: true })), 700),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, card2: true })), 900),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, card3: true })), 1100),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, campaign: true })), 1300),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, web3money: true })), 1500),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, sticker: true })), 1700),
          setTimeout(() => setAnimatedElements(prev => ({ ...prev, cta: true })), 1900),
        ];

        // クリーンアップ関数
        return () => {
          animationTimers.forEach(timer => clearTimeout(timer));
        };
      }
    } else {
      // 要素が画面外に出たときにアニメーション状態をリセット
      setAnimatedElements({
        button0: false, // 追加したボタンの状態もリセット
        button1: false,
        button2: false,
        button3: false,
        card2: false,
        card3: false,
        campaign: false,
        web3money: false,
        sticker: false,
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
          {/* 新しく追加するトークンってなに？ボタン（水色） */}
          <Link
            href="#token"
            className={`bg-blue-500 text-white px-6 py-3 rounded-full inline-flex items-center justify-center text-lg font-semibold border-b-4 border-blue-700 hover:bg-blue-600 hover:border-blue-800 hover:transform hover:-translate-y-1 active:translate-y-0 active:border-b-0 active:border-t-4 active:border-blue-800 transition-all duration-300 ${animatedElements.button0 ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <span>トークンってなに？</span>
          </Link>

          {/* レリモバってなに？ボタン（黄色に変更） */}
          <Link
            href="#feature"
            className={`bg-yellow-500 text-white px-6 py-3 rounded-full inline-flex items-center justify-center text-lg font-semibold border-b-4 border-yellow-700 hover:bg-yellow-600 hover:border-yellow-800 hover:transform hover:-translate-y-1 active:translate-y-0 active:border-b-0 active:border-t-4 active:border-yellow-800 transition-all duration-300 ${animatedElements.button1 ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
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

        {/* Feature Cards - トークンって何？のカードを削除し、2カードのレイアウトに変更 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 2: reward */}
          <Link
            href="#sticker-section"
            className={`relative group overflow-hidden bg-black bg-opacity-70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 ${animatedElements.card2 ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <div className="p-4 flex flex-row md:flex-col items-center">
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
                <h3 className="text-lg md:text-2xl font-bold mb-2 text-white">いまだけ！</h3>
                <h3 className="text-lg md:text-2xl font-bold text-white">特典・キャンペーン</h3>
              </div>
            </div>
          </Link>

          {/* Card 3: Web3Money */}
          <Link
            href="#web3money"
            className={`relative group overflow-hidden backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 ${animatedElements.web3money ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <div className="p-4 flex flex-row md:flex-col items-center">
              <div className="relative w-2/5 md:w-full h-32 md:h-60 md:mb-4 mr-4 md:mr-0 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent opacity-60"></div>
                <Image
                  src="/images/web3money4.png"
                  alt="WEB3 MONEY"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="w-1/2 md:w-full text-left md:text-center">
                <h3 className="text-lg md:text-2xl font-bold mb-2 text-white">レリモバ限定オプション！</h3>
                <h4 className="text-lg md:text-2xl font-bold text-white">WEB3 MONEY</h4>
              </div>
            </div>
          </Link>
        </div>

        {/* ステッカーセクションのアンカー追加 */}
        <div id="sticker-section" className="scroll-mt-24"></div>

        {/* キャンペーン情報と限定ステッカー - PCでは横並び、モバイルでは縦並び */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* キャンペーン情報カード */}
          <div
            className={`bg-black bg-opacity-70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg p-8 ${animatedElements.campaign ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <div className="text-center">
              <p className="text-xl font-bold text-white">レリモバリリース記念！</p>
              <p className="text-xl font-bold text-white mt-1">早期ご契約で必ずもらえる！</p>

              <h4 className="text-2xl font-bold text-white mt-8 mb-8">数量限定3Dキーホルダー</h4>
              <h4 className="text-2xl font-bold text-white mt-8 mb-8">"MAOU"</h4>

              <div className="relative w-3/5 mx-auto overflow-hidden rounded-lg">
                <Image
                  src="/images/img/keyholder.jpg"
                  alt="限定キーホルダー"
                  width={500}
                  height={800}
                  className="w-full h-auto rounded-lg"
                  style={{ display: 'block' }}
                />
              </div>

              <p className="text-sm text-gray-300 mt-6">※無くなり次第終了となります。</p>
              <p className="text-sm text-gray-300">※Xmobileマイページより申請が必要となります。</p>
            </div>
          </div>

          {/* RELiC Wi-Fi ステッカーカード */}
          <div
            className={`bg-black bg-opacity-70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg p-8 ${animatedElements.sticker ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">レリモバ限定オプション</h3>
              <h3 className="text-2xl font-bold text-white">『WEB3 MONEY』</h3>
              <h3 className="text-2xl font-bold text-white">加入特典！</h3>

              <p className="text-xl font-bold text-white mt-6">オプション加入者様にもれなく！！</p>
              <h4 className="text-xl font-bold text-white mt-2 mb-6">限定ステッカーをプレゼント！</h4>
              <p className="text-md text-gray-200 mt-4">8種類+シークレット1種類のうち、ランダム3枚となります。</p>

              {/* ステッカー画像 - 1カラム */}
              <div className="my-8 max-w-sm mx-auto">
                <div className="overflow-hidden rounded-lg">
                  <Image
                    src="/images/img/stecker1.png"
                    alt="限定ステッカー1"
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-300">※Xmobileマイページより申請が必要となります。</p>
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