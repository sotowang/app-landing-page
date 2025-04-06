'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            App Showcase
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/" 
              className={`hover:text-blue-600 ${pathname === '/' ? 'text-blue-600 font-semibold' : ''}`}
            >
              {t('home')}
            </Link>
            <Link 
              href="/#features" 
              className="hover:text-blue-600"
            >
              {t('features')}
            </Link>
            <Link 
              href="/#pricing" 
              className="hover:text-blue-600"
            >
              {t('pricing')}
            </Link>
            <Link 
              href="/terms" 
              className={`hover:text-blue-600 ${pathname === '/terms' ? 'text-blue-600 font-semibold' : ''}`}
            >
              {t('terms')}
            </Link>
            <Link 
              href="/privacy" 
              className={`hover:text-blue-600 ${pathname === '/privacy' ? 'text-blue-600 font-semibold' : ''}`}
            >
              {t('privacy')}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              href="#download" 
              className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {t('download')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 