import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import BackToTopButton from '@/components/BackToTopButton';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });
const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

// Base URL for absolute URLs in metadata - 必ず絶対URLを指定
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mobile.relic-v.com';

// 共通の画像URLを使用 - キャッシュバスティングはビルド時に固定値を使用
const buildTime = new Date().getTime();
const ogImageUrl = `${baseUrl}/images/og/og-default.jpg?v=${buildTime}`;

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: `${siteConfig.name} - ${siteConfig.description}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: 'レリモバは、利用料金に対して「トークン」を還元する新時代の通信サービスです。格安SIMはdocomo回線対応、Wi-Fiはマルチキャリア対応で、安心してモバイル通信をご利用いただけます。',

  // Favicon and Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/icon-192x192.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-icon.png', type: 'image/png' },
    ],
  },

  // Open Graph Metadata
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: baseUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.description}`,
    description: 'レリモバは、利用料金に対して「トークン」を還元する新時代の通信サービスです。高品質な通信サービスとトークン還元を両立した、まったく新しいモバイルサービスです。',
    images: [
      {
        url: ogImageUrl, // 共通の画像URLを使用
        width: 1200,
        height: 630,
        alt: 'レリモバ - トークンがもらえる格安モバイル',
      },
    ],
  },

  // Twitter Card Metadata
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} - ${siteConfig.description}`,
    description: 'レリモバは、利用料金に対して「トークン」を還元する新時代の通信サービスです。',
    creator: '@relic758', // TwitterのIDを統一
    site: '@relic758', // サイトのTwitterアカウントを追加
    images: [{
      url: ogImageUrl, // 同じ画像URLを使用
      width: 1200,
      height: 630,
      alt: 'レリモバ - トークンがもらえる格安モバイル',
    }],
  },

  // Robots and Indexing
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: 'https://mobile.relic-v.com',  // ← 固定値に変更
  },

  // Verification for Search Console, etc.
  verification: {
    google: 'DHLA5CpSAsvArnJACuhmHyA1YrC6sw8gw7xvbHwgtdk',
    // yandex: 'your-yandex-verification-code',
  },

  // Application Information
  applicationName: siteConfig.name,
  keywords: ['レリモバ', 'モバイル', '格安SIM', 'トークン', '通信サービス', 'RELiC MOBILE', 'モバイル通信', 'docomo回線', 'Wi-Fi', 'FiNANCiE'],
  authors: [{ name: 'レリモバ' }],
  creator: 'レリモバ',
  publisher: 'レリモバ',

  // Manifest
  manifest: `${baseUrl}/manifest.json`,

  // Theme Color
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],

  // Viewport
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },

  // Apple Web App
  appleWebApp: {
    title: siteConfig.name,
    statusBarStyle: 'black-translucent',
  },

  // Format Detection
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
    url: true,
  },
};

console.log('Styles and SEO metadata loaded', metadata);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Next.jsのmetadata APIを優先し、手動のmetaタグは削除
  return (
    <html lang="ja">
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W9GM2SF7');` }} />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.className} ${notoSansJP.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W9GM2SF7"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}

        <AppProvider>
          <Loading />
          <Header />
          {children}
          <Footer />
          <BackToTopButton />
        </AppProvider>
      </body>
    </html>
  );
}