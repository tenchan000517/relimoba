'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import CtaButton from '@/components/ui/cta-button';
import { siteConfig } from '@/config/site';

export default function Web3MoneySection() {
    // スクロール方向の検出用の状態
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollingDown, setScrollingDown] = useState(true);

    // Intersection Observerの設定 - AboutSectionと同じthreshold値を使用
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    // State to manage the animation sequence for each element
    const [animatedElements, setAnimatedElements] = useState({
        title: false,
        image1: false,
        subtitle: false,
        googleFormButton: false,
        image2: false,
        benefits: false,
        cta: false
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

    // Effect to trigger the animation sequence when the section comes into view
    useEffect(() => {
        if (inView) {
            // 下からスクロールしてきた場合（scrollingDown = false）は即時表示
            if (!scrollingDown) {
                setAnimatedElements({
                    title: true,
                    image1: true,
                    subtitle: true,
                    googleFormButton: true,
                    image2: true,
                    benefits: true,
                    cta: true
                });
            } else {
                // 上からスクロールしてきた場合は通常のアニメーション（遅延あり）
                const timers = [
                    setTimeout(() => setAnimatedElements(prev => ({ ...prev, title: true })), 100),
                    setTimeout(() => setAnimatedElements(prev => ({ ...prev, image1: true })), 300),
                    setTimeout(() => setAnimatedElements(prev => ({ ...prev, subtitle: true })), 500),
                    setTimeout(() => setAnimatedElements(prev => ({ ...prev, googleFormButton: true })), 700),
                    setTimeout(() => setAnimatedElements(prev => ({ ...prev, image2: true })), 900),
                    setTimeout(() => setAnimatedElements(prev => ({ ...prev, benefits: true })), 1100),
                    setTimeout(() => setAnimatedElements(prev => ({ ...prev, cta: true })), 1300),
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
                image1: false,
                subtitle: false,
                googleFormButton: false,
                image2: false,
                benefits: false,
                cta: false
            });
        }
    }, [inView, scrollingDown]);

    return (
        <section
            ref={ref}
            id="web3money" // このIDにリンクします
            className="py-12 md:py-20 px-4 bg-gradient-to-b from-blue-100 to-white relative overflow-hidden"
        >
            <div className="container mx-auto max-w-6xl">
                {/* ヘッダーセクション */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${animatedElements.title ? 'opacity-100' : 'opacity-0'}`}>
                        レリモバ専用オプション<br />『 WEB3 MONEY 』とは？
                    </h2>
                </div>

                {/* 動画セクション1 - アスペクト比3:2に固定、ループ再生、クリックでYouTubeリンクに飛ぶ */}
                <div className={`flex justify-center mb-6 transition-all duration-1000 ${animatedElements.image1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="relative w-full max-w-4xl rounded-xl shadow-lg">
                        <a href="https://youtube.com/@web3money_relic?si=WcPZNytZP8jv4_FP" target="_blank" rel="noopener noreferrer">
                            <div className="aspect-w-3 aspect-h-2 overflow-hidden">
                                <video
                                    src="/images/img/web3money.mov"
                                    autoPlay
                                    loop
                                    muted
                                    className="object-cover rounded-xl w-full h-full cursor-pointer"
                                    style={{ aspectRatio: "3/2", objectFit: "cover" }}
                                />
                            </div>
                        </a>
                    </div>
                </div>

                {/* 説明文 - 画像①の下に移動 */}
                <div className={`text-center mb-8 transition-all duration-1000 ${animatedElements.subtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        本オプション費用は、国内で活動するアートクリエイター様や<br className="hidden md:block" />
                        新規クリエイティブ事業のスタートアップ支援へ充てられます。
                    </p>
                </div>

                {/* Googleフォームボタン */}
                <div className={`text-center mb-12 transition-all duration-1000 ${animatedElements.googleFormButton ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfgnHpMoYGsVBTMgHP-ln6ruy5LpKuFpKFDFOmUxy0tk4kKug/viewform?usp=header"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        支援金希望者受付中！
                    </a>
                </div>

                {/* 画像セクション2 - サイズ固定なし */}
                <div className={`flex justify-center mb-12 transition-all duration-1000 ${animatedElements.image2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="relative w-full max-w-4xl rounded-xl shadow-lg">
                        <Image
                            src="/images/img/web3money1.jpeg"
                            alt="WEB3 MONEY Support"
                            width={800}
                            height={450}
                            layout="responsive"
                            className="object-contain rounded-xl"
                        />
                    </div>
                </div>

                {/* 特典セクション */}
                <div className={`bg-white rounded-xl shadow-lg p-8 mb-12 transition-all duration-1000 ${animatedElements.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">【 特典 】</h3>

                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">1</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">毎月NFTアートが届きます！</h4>
                                <p className="text-gray-700">毎月アートクリエイターから特別な一枚を描き下ろして頂きます。</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">2</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">限定ステッカープレゼント</h4>
                                <p className="text-gray-700">(全8種＋シークレット1種のうち3枚)</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">3</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">支援先選定の投票権</h4>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">4</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">YouTube企画『 WEB3 MONEY 』への出演権</h4>
                                <p className="text-gray-700">希望者多数の場合、抽選となります。</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">5</div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">支援先からの特典</h4>
                                <p className="text-gray-700">時期や詳細は未定となります！みんなで応援しよう！</p>
                            </div>
                        </div>
                    </div>
                    {/* 追加文言 */}
                    <div className="mt-8 text-center font-medium text-gray-800">
                        ご契約後、<a href="https://onlinestore.xmobile.ne.jp/c/login" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Xmobileマイページ</a>をご確認下さい。
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-16 mb-16 text-center">
                    <CtaButton
                        href={siteConfig.cta.signup}
                        variant="default"
                        size="lg"
                        animation="bounce"
                        external={true}
                        className={`text-xl font-bold transition-all duration-1000 ${animatedElements.cta ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
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