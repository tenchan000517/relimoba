// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-indigo-50 relative">
      {/* 斜めの区切り線 - 絶対配置と負のマージンで上部に配置 */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden" style={{ marginTop: '-1px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-16">
          <path 
            d="M0,0 L1000,0 L1000,100 L0,6 Z" 
            className="fill-white"
          ></path>
        </svg>
      </div>
      
      {/* メインコンテンツ - 斜め区切りのスペースを確保するためにパディングを追加 */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo and Description */}
          <div className="mb-6">
            <Image
              src="/images/footerlogo.png"
              alt="RELiC logo"
              width={1920}
              height={457}
              className="max-w-xs mx-auto"
            />
            <p className="text-gray-500 mt-4">
              「トークン」がもらえる格安モバイル
            </p>
          </div>
          
          {/* Partner Logos */}
          <div className="flex flex-row justify-center gap-6 flex-wrap mb-6">
            <Link href="https://xmobile.ne.jp/" target="_blank" className="inline-block">
              <Image
                src="/images/xmobile.png"
                alt="X Mobile"
                width={1920}
                height={401}
                className="w-32 md:w-40 transition transform hover:scale-105"
              />
            </Link>
            <Link href="https://financie.jp/" target="_blank" className="inline-block">
              <Image
                src="/images/financie2-01.png"
                alt="Financie"
                width={430}
                height={121}
                className="w-32 md:w-40 transition transform hover:scale-105"
              />
            </Link>
          </div>
          
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Link 
              href="https://xmobile.ne.jp/wp-content/uploads/2024/09/%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D%E7%AB%AF%E6%9C%AB%E4%B8%80%E8%A6%A7_20240918.pdf" 
              target="_blank" 
              rel="noopener"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              動作確認端末
            </Link>
            <Link 
              href="https://xmobile.ne.jp/privacy/" 
              target="_blank" 
              rel="noopener"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              個人情報保護方針
            </Link>
            <Link 
              href="https://xmobile.ne.jp/legal/" 
              target="_blank" 
              rel="noopener"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              利用規約
            </Link>
            <Link 
              href="https://xmobile.ne.jp/transaction/" 
              target="_blank" 
              rel="noopener"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              特定商取引法
            </Link>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>Copyright © {new Date().getFullYear()}, RELiC©</p>
        </div>
      </div>
    </footer>
  );
}