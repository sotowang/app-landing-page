'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common');
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">App Showcase</h3>
            <p className="text-gray-400">© 2025 App Showcase. All rights reserved.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-gray-400 hover:text-white transition">
                  {t('features')}
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-gray-400 hover:text-white transition">
                  {t('pricing')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Download</h3>
            <div className="flex flex-col space-y-2">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                App Store
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                Google Play
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}