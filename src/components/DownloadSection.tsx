"use client";

import React from 'react';
import DownloadButton from './DownloadButton';

interface DownloadSectionProps {
  translations: any;
}

export default function DownloadSection({ translations }: DownloadSectionProps) {
  const t = translations.download;

  // 定义下载链接 - 这里使用示例链接，实际项目中应替换为真实下载链接
  const downloadLinks = {
    windows: "/downloads/meetinggpt-windows.exe",
    macos: "/downloads/meetinggpt-macos.dmg",
    linux: "/downloads/meetinggpt-linux.deb"
  };

  return (
    <section id="download" className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{t.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
          <DownloadButton
            text={t.windows}
            downloadUrl={downloadLinks.windows}
          />

          <DownloadButton
            text={t.macos}
            downloadUrl={downloadLinks.macos}
          />

          <DownloadButton
            text={t.linux}
            downloadUrl={downloadLinks.linux}
          />
        </div>

        <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          {t.payment}
        </div>
      </div>
    </section>
  );
}
