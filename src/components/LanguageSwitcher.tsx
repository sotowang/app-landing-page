'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isChinese = pathname.startsWith('/zh');

  // 如果当前是中文页面，切换到英文（根目录）
  // 如果当前是英文页面（根目录），切换到中文
  const targetPath = isChinese ? pathname.replace(/^\/zh/, '') || '/' : `/zh${pathname}`;

  return (
    <Link
      href={targetPath}
      className="text-sm hover:text-blue-600 transition"
    >
      {isChinese ? 'English' : '中文'}
    </Link>
  );
}