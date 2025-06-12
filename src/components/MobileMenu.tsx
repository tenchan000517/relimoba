'use client';

import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import CtaButton from '@/components/ui/cta-button';
import { siteConfig } from '@/config/site';

export default function MobileMenu() {
  const { isMenuOpen, closeMenu, scrollToSection } = useAppContext();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-toggle')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen, closeMenu]);

  // Press escape to close menu
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (isMenuOpen && e.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {/* オーバーレイ部分 - isMenuOpenに応じて表示/非表示 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"></div>
      )}

      {/* メニュー部分 - 常に存在するが、位置でスライド */}
      <div
        className="fixed right-0 top-0 h-screen w-4/5 max-w-sm bg-white text-gray-700 shadow-xl transform transition-transform duration-300 ease-in-out z-50 mobile-menu md:hidden"
        style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex justify-end items-center p-4">
          <button
            onClick={closeMenu}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-0 flex justify-center">
          <ul className="space-y-5 text-center">
            <MenuLink
              href="#hero"
              label="トップ"
              onClick={() => scrollToSection('hero')}
            />
            <MenuLink
              href="#feature"
              label="レリモバについて"
              onClick={() => scrollToSection('feature')}
            />
            <MenuLink
              href="#token"
              label="特典・キャンペーン"
              onClick={() => scrollToSection('token')}
            />
            <MenuLink
              href="#plans"
              label="プランと料金"
              onClick={() => scrollToSection('plans')}
            />
            <MenuLink
              href="#faq"
              label="よくある質問"
              onClick={() => scrollToSection('faq')}
            />
            <MenuLink
              href="#about"
              label="RELiCについて"
              onClick={() => scrollToSection('about')}
            />

            {/* CTAButton コンポーネントを使用 */}
            <li className="pt-6">
              <CtaButton
                href={siteConfig.cta.signup}
                variant="cta"
                size="md"
                external={true}
                fullWidth={true}
                onClick={closeMenu}
              >
                今すぐお申し込み！
              </CtaButton>
            </li>

            {/* Character image - リストの一部として追加 */}
            <li className="h-40 flex justify-end items-center pt-4">
              <Image
                src="/images/alien.png"
                alt="Character"
                width={150}
                height={200}
                priority
                className="object-contain"
              />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

// Menu Link Component
function MenuLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <li>
      <Link
        href={href}
        className="block text-gray-700 hover:text-blue-500 transition-colors duration-300 text-lg font-medium py-1"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {label}
      </Link>
    </li>
  );
}