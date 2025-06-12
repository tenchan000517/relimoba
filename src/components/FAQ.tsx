'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { HelpCircle, CheckCircle } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string | React.ReactNode;
};

export default function FAQ() {
  // スクロール方向の検出用の状態
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
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
  
  const faqItems: FAQItem[] = [
    {
      question: "いま使っている電話番号はそのまま使えますか？",
      answer: "ご利用可能です。\n現在ご契約中の携帯電話会社でMNP予約番号を取得後、有効期限が10日以上残っている状態で、 レリモバへお申し込み下さい。"
    },
    {
      question: "通話料金について教えてください",
      answer: "[通話料金・オプション]\n国内通話料金は30秒19.9円（税込21.89円）の通話料金が発生いたします。\nかけ放題オプションは以下の3種類をご用意しております。\n\n・かけ放題ミニ：5分間/何度でもかけ放題（税込550円/月）\n・かけ放題ライト：10分間/何度でもかけ放題（税込935円/月）\n・かけ放題フル：無制限/何度でもかけ放題（税込1,650円/月"
    },
    {
      question: "利用できるクレジットカードは何がありますか？",
      answer: "VISA、Master Card、JCB、Diners、AmericanExpressがご利用いただけます。\nなお、海外発行のクレジットカード（上記ブランドを含む）や、Discover・銀聯などの上記にないブランド、デビットカード・プリペイドカードはご利用いただけません。"
    },
    {
      question: "データ容量を追加で購入できますか？",
      answer: "1GBを550円（税込）〈税別500円〉で購入可能です。"
    },
    {
      question: "データ容量の確認がしたい",
      answer: "お客様マイページ内の「データご利用状況」よりご確認いただけます。"
    },
    {
      question: "5G通信は使えますか？",
      answer: "ご利用可能です。\nお客様マイページ内の「データご利用状況」から5G通信をONにしてください。"
    },
    {
      question: "格安SIMの余ったデータは繰越されますか？",
      answer: "繰り越しされます。お客様マイページよりご確認ください。"
    },
    {
      question: "初月の利用料は日割りされますか？",
      answer: "はい。レリモバSIM、レリモバWi-Fiともに、基本利用料は日割りにてご請求いたします。\nなお、レリモバSIMについては、高速データの通信量も日割りをおこなった容量での提供となります。"
    },
    {
      question: "初期契約解除制度について",
      answer: <p>詳しくは<a href="https://support.xmobile.ne.jp/hc/ja/articles/900003482426-%E5%88%9D%E6%9C%9F%E5%A5%91%E7%B4%84%E8%A7%A3%E9%99%A4%E5%88%B6%E5%BA%A6%E3%81%A8%E3%81%8A%E6%89%8B%E7%B6%9A%E3%81%8D%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6" target="_blank" rel="noopener" className="text-blue-600 underline">こちら</a>をご確認ください。</p>
    },
    {
      question: "解約事務手数料はかかりますか？",
      answer: "ご解約事務手数料は発生しません"
    },
    {
      question: "解約方法について教えてください。",
      answer: "ご解約、MNP予約番号発行はマイページよりお手続き可能です。"
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const animationClass = inView 
    ? (!scrollingDown ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0 animate-fade-in')
    : 'opacity-0';
  
  return (
    <section
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* 背景の動くエフェクト */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white transform motion-background"></div>
      
      {/* Vertical text for larger screens */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 text-gray-300 text-6xl font-bold rotate-90 opacity-20 hidden lg:block animate-slide-in-left">
        Q&amp;A
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${animationClass}`}>
            よくあるご質問
          </h2>
          <div className="lg:hidden">
            <h2 className={`text-xl text-gray-600 uppercase mb-6 transition-all duration-1000 ${animationClass}`} style={{ transitionDelay: '100ms' }}>
              Q &amp; A
            </h2>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`border-b border-gray-100 transition-all duration-500 ${
                inView ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                className="w-full py-4 px-6 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3 flex-shrink-0">
                    <HelpCircle size={20} />
                  </span>
                  <span className="font-medium text-gray-900">{item.question}</span>
                </div>
                <span className="text-blue-600 ml-2 flex-shrink-0 transform transition-transform duration-300" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ 
                  maxHeight: openIndex === index ? '1000px' : '0',
                  opacity: openIndex === index ? 1 : 0,
                  visibility: openIndex === index ? 'visible' : 'hidden'
                }}
              >
                <div className="p-6 bg-gray-50">
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1 mr-4">
                      <div className="h-6 w-6 flex items-center justify-center text-blue-500">
                        <CheckCircle size={20} />
                      </div>
                    </div>
                    <div className="text-gray-700 whitespace-pre-line">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* カスタムアニメーションスタイル */}
      <style jsx>{`
        .motion-background {
          transition: transform 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-100px) rotate(90deg);
          }
          to { 
            opacity: 0.2;
            transform: translateX(-20px) translateY(-50%) rotate(90deg);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 1s ease forwards;
        }
      `}</style>
    </section>
  );
}