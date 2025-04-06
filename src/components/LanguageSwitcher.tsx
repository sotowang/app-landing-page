'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');
  const targetLocale = isEnglish ? 'zh' : 'en';
  const targetPath = isEnglish ? pathname.replace(/^\/en/, '') : pathname.replace(/^\/zh/, '');

  return (
    <Link 
      href={`/${targetLocale}${targetPath || ''}`} 
      className="text-sm hover:text-blue-600 transition"
    >
      {isEnglish ? '中文' : 'English'}
    </Link>
  );
} 