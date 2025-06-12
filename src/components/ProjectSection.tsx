'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Globe, MessageCircle, MessageSquareText } from 'lucide-react';

export default function ProjectSection() {
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollingDown, setScrollingDown] = useState(true);

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

        // スクロールイベントを監視
        window.addEventListener('scroll', handleScroll, { passive: true });

        // クリーンアップ関数
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const animationClass = inView
        ? (!scrollingDown ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0 animate-fade-in')
        : 'opacity-0';

    return (
        <section
            ref={ref}
            id="about"
            className="relative py-24 overflow-hidden"
        >
            {/* 背景レイヤー */}
            <div className="background-container">
                {/* レイヤー1: 背景画像 */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/images/project.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        zIndex: 1
                    }}
                ></div>

                {/* レイヤー2: 背景オーバーレイ - インラインスタイルで透明度を設定 */}
                {/* <div 
                    className="absolute inset-0" 
                    style={{ 
                        backgroundColor: 'rgba(74, 74, 74, 0.25)',
                        zIndex: 2 
                    }}
                ></div> */}
            </div>

            {/* メインコンテンツ */}
            <div className="container mx-auto px-4 relative z-10">
                <div className={`text-center mb-16 transition-all duration-1000 ${animationClass}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        RELiC <span className="text-blue-600">について</span>
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className={`relative transition-all duration-1000 ${animationClass}`} style={{ transitionDelay: '300ms' }}>
                        <div className="flex flex-col items-center gap-6">
                            {/* 公式サイトボタン */}
                            <a
                                href="https://linktr.ee/relic758"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]"
                            >
                                <div className="absolute -inset-1 rounded-lg opacity-30 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-3xl" style={{ background: 'linear-gradient(90deg, #60a5fa, #3b82f6, #1d4ed8)' }}></div>
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Globe size={28} className="text-white" />
                                        <span className="text-xl md:text-2xl font-bold text-white">RELiC 公式サイト</span>
                                    </div>
                                    <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </a>

                            {/* Discordボタン */}
                            <a
                                href="https://financie.jp/users/RELiC"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02]"
                            >
                                <div className="absolute -inset-1 rounded-lg opacity-30 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-3xl" style={{ background: 'linear-gradient(90deg, #818cf8, #6366f1, #4f46e5)' }}></div>
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <MessageCircle size={28} className="text-white" />
                                        <span className="text-xl md:text-2xl font-bold text-white">
                                            <span className="md:hidden">RELiCコミュニティ<br />＠FiNANCiE</span>
                                            <span className="hidden md:inline">RELiCコミュニティ ＠FiNANCiE</span>
                                        </span>                                    </div>
                                    <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </a>

                            {/* お問い合わせ(LINE)ボタンを追加 */}
                            <a
                                href="https://line.me/R/ti/p/@511vjcrn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-green-700 px-8 py-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:scale-[1.02]"
                            >
                                <div className="absolute -inset-1 rounded-lg opacity-30 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:blur-3xl" style={{ background: 'linear-gradient(90deg, #10b981, #059669, #047857)' }}></div>
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <MessageSquareText size={28} className="text-white" />
                                        <span className="text-xl md:text-2xl font-bold text-white">お問い合わせ</span>
                                    </div>
                                    <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* カスタムアニメーションスタイル */}
            <style jsx>{`
            .background-container {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 0;
            }
            
            .motion-background {
              transition: transform 0.3s ease-out;
            }
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .animate-fade-in {
              animation: fadeIn 1s ease forwards;
            }
          `}</style>
        </section>
    );
}