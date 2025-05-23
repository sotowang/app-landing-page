"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DownloadSection from './DownloadSection';
import authService from '../services/authService';

// 类型定义
export type Translations = {
  nav: {
    home: string;
    features: string;
    pricing: string;
    terms: string;
    privacy: string;
    download: string;
    login: string;
    account: string;
    profile: string;
    settings: string;
    logout: string;
  };
  switchLang: string;
  switchLangUrl: string;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  productDesc: {
    title: string;
    subtitle: string;
    useCases: {
      title: string;
      items: Array<{
        title: string;
        desc: string;
      }>;
    };
    benefits: {
      title: string;
      subtitle: string;
      items: string[];
      demo: string;
      demoLink: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
  };
  pricing: {
    title: string;
    subtitle: string;
    plans: {
      free: {
        name: string;
        desc: string;
        price: string;
        period: string;
        features: string[];
        notIncluded: string[];
        cta: string;
      };
      standard: {
        name: string;
        desc: string;
        price: string;
        period: string;
        popular: string;
        features: string[];
        cta: string;
      };
      pro: {
        name: string;
        desc: string;
        price: string;
        period: string;
        features: string[];
        cta: string;
      };
      enterprise: {
        name: string;
        desc: string;
        price: string;
        period: string;
        features: string[];
        cta: string;
        ctaEmail: string;
      };
    };
    guarantee: string;
    contact: string;
  };
  download: {
    title: string;
    subtitle: string;
    windows: string;
    macos: string;
    linux: string;
    payment: string;
  };
  footer: {
    copyright: string;
    paymentBy: string;
    paddle: string;
    providedBy: string;
    links: string;
    legal: string;
    contact: string;
    email: string;
    phone: string;
  };
};

interface HomePageProps {
  translations: Translations;
  langPath: string;  // 语言路径，如 "/zh" 或 "/en"
}

export default function HomePage({ translations, langPath }: HomePageProps) {
  const t = translations;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // 检查用户是否已登录
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        setUser(authService.getUser());
      } else {
        setUser(null);
      }

      // 记录当前登录状态，用于调试
      console.log('HomePage - Current login state:', {
        isLoggedIn: loggedIn,
        hasToken: !!authService.getToken(),
        hasUser: !!authService.getUser(),
        token: authService.getToken()?.substring(0, 10) + '...'
      });
    };

    // 初始检查
    checkAuth();

    // 监听存储变化
    const handleStorageChange = () => {
      console.log('Storage event detected');
      checkAuth();
    };

    // 监听自定义登录状态变化事件
    const handleLoginStateChanged = () => {
      console.log('Login state change event detected');
      checkAuth();
    };

    // 添加事件监听器
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('loginStateChanged', handleLoginStateChanged);

    return () => {
      // 移除事件监听器
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('loginStateChanged', handleLoginStateChanged);
    };
  }, []);

  // 点击外部关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showUserMenu && !target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // 处理登出
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
    setShowUserMenu(false);

    // 触发存储事件，以便其他页面也能更新
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <main className="dark:bg-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href={langPath} className="text-xl font-bold dark:text-white">
              MeetingGPT
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link href={langPath} className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{t.nav.home}</Link>
              <Link href={`${langPath}#features`} className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{t.nav.features}</Link>
              <Link href={`${langPath}/meeting/pricing`} className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{t.nav.pricing}</Link>
              <Link href={`${langPath}/terms`} className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{t.nav.terms}</Link>
              <Link href={`${langPath}/privacy`} className="hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">{t.nav.privacy}</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href={t.switchLangUrl} className="text-sm hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition">{t.switchLang}</Link>

              {isLoggedIn && user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="text-sm hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="max-w-[120px] truncate">{user.email}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10">
                      <Link
                        href={`${langPath}/profile`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {t.nav.profile}
                      </Link>
                      <Link
                        href={`${langPath}/settings`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {t.nav.settings}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        {t.nav.logout}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={`${langPath}/login`}
                  className="text-sm hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {t.nav.login}
                </Link>
              )}

              <Link
                href="#download"
                className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {t.nav.download}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.hero.title}</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t.hero.subtitle}</p>
          <Link
            href="#download"
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
          >
            {t.hero.cta}
          </Link>
        </div>
      </section>

      {/* Product Description Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{t.productDesc.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t.productDesc.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">{t.productDesc.useCases.title}</h3>
              <ul className="space-y-4">
                {t.productDesc.useCases.items.map((item, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium dark:text-white">{item.title}</span>
                      <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">{t.productDesc.benefits.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t.productDesc.benefits.subtitle}
              </p>
              <ul className="space-y-2 mb-8">
                {t.productDesc.benefits.items.map((item, index) => (
                  <li key={index} className="flex items-center dark:text-gray-300">
                    <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  {t.productDesc.benefits.demo}
                  <a href={`https://${t.productDesc.benefits.demoLink}`} className="underline">
                    {t.productDesc.benefits.demoLink}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">{t.features.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section removed - now available as a separate page */}

      {/* Download Section */}
      <DownloadSection translations={t} />

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MeetingGPT</h3>
              <p className="text-gray-400">{t.footer.copyright}</p>
              <p className="text-gray-400 mt-2">
                {t.footer.paymentBy}
                <a href="https://paddle.com" className="underline"> {t.footer.paddle}</a>
                {t.footer.providedBy}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.links}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={langPath} className="text-gray-400 hover:text-white transition">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href={`${langPath}#features`} className="text-gray-400 hover:text-white transition">
                    {t.nav.features}
                  </Link>
                </li>
                <li>
                  <Link href={`${langPath}/meeting/pricing`} className="text-gray-400 hover:text-white transition">
                    {t.nav.pricing}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.legal}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`${langPath}/terms`} className="text-gray-400 hover:text-white transition">
                    {t.nav.terms}
                  </Link>
                </li>
                <li>
                  <Link href={`${langPath}/privacy`} className="text-gray-400 hover:text-white transition">
                    {t.nav.privacy}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.contact}</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  {t.footer.email}
                </li>
                <li className="text-gray-400">
                  {t.footer.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}