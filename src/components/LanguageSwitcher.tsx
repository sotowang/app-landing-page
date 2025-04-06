'use client';

import React, { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');
  const [isPending, startTransition] = useTransition();
  
  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };
  
  return (
    <button
      className="text-sm hover:text-blue-600 transition"
      onClick={switchLocale}
      disabled={isPending}
    >
      {t('languageSwitcher')}
    </button>
  );
} 