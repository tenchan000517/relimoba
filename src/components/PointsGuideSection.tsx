'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Gift, Calendar, Info, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PointsGuideSection() {
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
            id="points-guide"
            className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden"
        >
            {/* 背景エフェクト */}
            <div className="absolute inset-0 bg-pattern opacity-5"></div>
            
            {/* スクロールアニメーション用の装飾要素 */}
            <div className="absolute -right-20 top-1/4 w-80 h-80 bg-blue-500 rounded-full filter blur-[120px] opacity-20 animate-pulse-slow"></div>
            <div className="absolute -left-20 bottom-1/4 w-80 h-80 bg-purple-500 rounded-full filter blur-[120px] opacity-15 animate-pulse-slow animation-delay-2000"></div>

            {/* メインコンテンツ */}
            <div className="container mx-auto px-4 relative z-10">
                <div className={`text-center mb-12 transition-all duration-1000 ${animationClass}`}>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        FiNANCiE <span className="text-blue-400">限定ポイント</span>
                    </h2>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-300">
                        付与条件および受取方法
                    </h3>
                </div>

                <div className="max-w-4xl mx-auto mb-12">
                    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 transition-all duration-1000 ${animationClass}`} style={{ transitionDelay: '100ms' }}>
                        <p className="text-gray-300 mb-4">
                            <Link href="https://note.com/financie/n/nd04398775393" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">こちらの記事</Link>で詳しく解説をしております。ご参照いただければ幸いです。
                        </p>
                    </div>

                    {/* ポイント付与条件 */}
                    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 transition-all duration-1000 ${animationClass}`} style={{ transitionDelay: '200ms' }}>
                        <div className="flex items-center mb-4">
                            <Info className="text-blue-400 mr-3" size={24} />
                            <h3 className="text-xl font-bold text-white">ポイント付与条件</h3>
                        </div>
                        
                        <p className="mb-4 text-gray-300">
                            FiNANCiE限定ポイントの受取は、以下の条件を満たしている場合に限り付与されます。
                            それ以外の場合は、ポイントが付与されないこともありますので、あらかじめご了承ください。
                        </p>
                        
                        <ul className="space-y-2 pl-6 mb-6">
                            {[
                                'レリモバpowered by X-mobile （以下レリモバ）特設サイトにて申し込みを行い回線の開通が完了していること',
                                'ポイント付与時点においてFiNANCiE会員登録を継続しており、いかなる理由であれ退会していないこと',
                                'レリモバマイページにログインし、FiNANCiE会員との接続を完了していること（未完了の場合は、レリモバのマイページにログインして接続状況をご確認ください）',
                                'レリモバの契約を継続しており、料金の支払いに遅延がないこと'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="text-green-400 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span className="text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                        
                        <p className="mb-4 text-gray-300">
                            また限定ポイント付与の対象となる費用は、以下のとおりです。
                        </p>
                        
                        <ul className="space-y-2 pl-6">
                            {[
                                '基本料金',
                                '高速データ容量',
                                'かけたい放題オプション',
                                'その他オプション（iフィルターを除く）',
                                '高速データチャージ'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="text-green-400 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span className="text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ポイント付与日程 */}
                    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 transition-all duration-1000 ${animationClass}`} style={{ transitionDelay: '300ms' }}>
                        <div className="flex items-center mb-4">
                            <Calendar className="text-blue-400 mr-3" size={24} />
                            <h3 className="text-xl font-bold text-white">ポイント付与日程</h3>
                        </div>
                        
                        <p className="text-gray-300">
                            毎月の料金支払いが完了した月の翌月末をメドに、FiNANCiE限定ポイントが付与されます。
                            月末が土日や祝日の場合は、数日間遅延するケースもあります。
                        </p>
                    </div>

                    {/* ポイント受取方法 */}
                    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 transition-all duration-1000 ${animationClass}`} style={{ transitionDelay: '400ms' }}>
                        <div className="flex items-center mb-4">
                            <Gift className="text-blue-400 mr-3" size={24} />
                            <h3 className="text-xl font-bold text-white">ポイント受取方法</h3>
                        </div>
                        
                        <ul className="space-y-4 pl-6 mb-4">
                            <li className="flex items-start">
                                <CheckCircle className="text-green-400 mr-2 flex-shrink-0 mt-1" size={18} />
                                <span className="text-gray-300">
                                    上記の条件を満たしている場合、弊社からのポイント付与日以降にFiNANCiEログイン後のギフトボックスにポイント受取通知が届きます。通知内の「受取ボタン」を押すことで、ポイントの受取が完了します。
                                </span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle className="text-green-400 mr-2 flex-shrink-0 mt-1" size={18} />
                                <span className="text-gray-300">
                                    ポイント獲得と受け取りについて不明な点がある場合は、
                                    <Link href="https://support.financie.jp/hc/ja/requests/new" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline mx-1">
                                        問い合わせフォーム
                                    </Link>
                                    までご連絡ください。
                                </span>
                            </li>
                        </ul>
                        
                        <div className="pl-6 text-gray-300">
                            <p>受付時間: 営業日 10:00～17:00</p>
                            <p>回答までの期間: 数日間かかる場合があります。</p>
                        </div>
                    </div>

                    {/* ポイントの受け取り期限 */}
                    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 transition-all duration-1000 ${animationClass}`} style={{ transitionDelay: '500ms' }}>
                        <div className="flex items-center mb-4">
                            <AlertCircle className="text-orange-400 mr-3" size={24} />
                            <h3 className="text-xl font-bold text-white">ポイントの受け取り期限</h3>
                        </div>
                        
                        <ul className="space-y-2 pl-6">
                            {[
                                'ギフトボックスに届いたFiNANCiE限定ポイントは、180日間の受け取り期限があります。',
                                '受け取り期限を過ぎた場合は無効となり、受け取りができなくなります。',
                                'また、受け取り後のFiNANCiE限定ポイントは、受け取りから180日以内にCTの購入に使用されなかった場合は消失します。',
                                '一度失効したポイントの復旧はできませんので、期限内での受け取りと使用をお願いいたします。'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="text-orange-400 mr-2 flex-shrink-0 mt-1" size={18} />
                                    <span className="text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* カスタムアニメーションスタイル */}
            <style jsx>{`
                .bg-pattern {
                    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fadeIn 1s ease forwards;
                }
                
                @keyframes pulse-slow {
                    0% { opacity: 0.15; }
                    50% { opacity: 0.25; }
                    100% { opacity: 0.15; }
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </section>
    );
}