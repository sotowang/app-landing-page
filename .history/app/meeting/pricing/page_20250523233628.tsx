"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import appConfig from '../../../src/config/appConfig';
import authService from '../../../src/services/authService';
import SimplePaddleButton from '../../../src/components/SimplePaddleButton';

// 定义产品和价格类型
interface Price {
  id: string;
  product_id: string;
  description: string;
  unit_price: {
    amount: string;
    currency: string;
  };
  billing_cycle: {
    interval: string;
    frequency: number;
  };
  status: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  type: string;
  custom_data: {
    plan_type: string;
    service: string;
  };
  status: string;
  prices: Price[];
}

interface ApiResponse {
  data: Product[];
  meta: {
    pagination: {
      per_page: number;
      has_more: boolean;
      estimated_total: number;
    };
  };
}

export default function PricingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 按计划类型和计费周期对产品进行分类
  const [basicMonthly, setBasicMonthly] = useState<Product | null>(null);
  const [basicAnnual, setBasicAnnual] = useState<Product | null>(null);
  const [proMonthly, setProMonthly] = useState<Product | null>(null);
  const [proAnnual, setProAnnual] = useState<Product | null>(null);

  // 登录状态
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
      console.log('Pricing page - Current login state:', {
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

  // 处理登出
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
    setShowUserMenu(false);

    console.log('User logged out, login state cleared');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${appConfig.api.baseUrl}/api/v1/paddle/products?include_prices=true`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: ApiResponse = await response.json();
        setProducts(data.data);

        // 对产品进行分类
        categorizeProducts(data.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load pricing information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 对产品进行分类的函数
  const categorizeProducts = (products: Product[]) => {
    products.forEach(product => {
      if (!product.prices || product.prices.length === 0) return;

      const planType = product.custom_data?.plan_type || '';
      const billingCycle = product.prices[0].billing_cycle.interval;

      if (planType === 'basic') {
        if (billingCycle === 'month') {
          setBasicMonthly(product);
        } else if (billingCycle === 'year') {
          setBasicAnnual(product);
        }
      } else if (planType === 'pro') {
        if (billingCycle === 'month') {
          setProMonthly(product);
        } else if (billingCycle === 'year') {
          setProAnnual(product);
        }
      }
    });
  };

  // 格式化价格显示
  const formatPrice = (amount: string, currency: string = 'USD') => {
    const numericAmount = parseInt(amount, 10) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(numericAmount);
  };

  // 从描述中提取功能列表
  const extractFeatures = (description: string): string[] => {
    if (!description) return [];
    return description.split('\n').filter(item => item.trim() !== '');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-white">
              MeetingGPT
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-blue-400">Home</Link>
              <Link href="/#features" className="text-gray-300 hover:text-blue-400">Features</Link>
              <Link href="/meeting/pricing" className="text-blue-400 font-semibold">Pricing</Link>
              <Link href="/terms" className="text-gray-300 hover:text-blue-400">Terms</Link>
              <Link href="/privacy" className="text-gray-300 hover:text-blue-400">Privacy Policy</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {isLoggedIn && user ? (
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="text-gray-300 hover:text-blue-400 flex items-center"
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
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-10">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-blue-400"
                >
                  Login
                </Link>
              )}
              <Link
                href="#download"
                className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Download
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
            Choose the plan that's right for you
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center mt-10 p-4 bg-red-900 text-white rounded-lg">
            {error}
          </div>
        ) : (
          <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
            {/* Free Plan */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-medium text-white">Free</h3>
                <p className="mt-4 text-gray-300">Basic features for personal use</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-base font-medium text-gray-300">/mo</span>
                </p>
                <Link
                  href="#"
                  className="mt-8 block w-full bg-gray-700 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-600"
                >
                  Download
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-white tracking-wide">What's included:</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">30 minutes free usage</span>
                  </li>
                  <li className="flex space-x-3">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">Basic prompt settings</span>
                  </li>
                  <li className="flex space-x-3">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-300">Channel selection</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Basic Plan */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-blue-500">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-medium text-white">Basic</h3>
                <p className="mt-4 text-gray-300">{basicMonthly?.description?.split('\n')[0] || 'Essential features for professionals'}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">
                    {basicMonthly?.prices[0] ? formatPrice(basicMonthly.prices[0].unit_price.amount) : '$9.99'}
                  </span>
                  <span className="text-base font-medium text-gray-300">/mo</span>
                </p>
                {isLoggedIn ? (
                  <Link
                    href="/subscribe?plan=basic"
                    className="mt-8 block w-full bg-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                  >
                    Subscribe
                  </Link>
                ) : (
                  <Link
                    href="/login?plan=basic"
                    className="mt-8 block w-full bg-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                  >
                    Subscribe
                  </Link>
                )}
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-white tracking-wide">What's included:</h4>
                <ul className="mt-6 space-y-4">
                  {basicMonthly ? (
                    extractFeatures(basicMonthly.description).map((feature, index) => (
                      <li key={index} className="flex space-x-3">
                        <svg className="flex-shrink-0 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex space-x-3">
                        <svg className="flex-shrink-0 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-300">Loading features...</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-medium text-white">Pro</h3>
                <p className="mt-4 text-gray-300">{proMonthly?.description?.split('\n')[0] || 'Advanced features for teams'}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">
                    {proMonthly?.prices[0] ? formatPrice(proMonthly.prices[0].unit_price.amount) : '$19.99'}
                  </span>
                  <span className="text-base font-medium text-gray-300">/mo</span>
                </p>
                {isLoggedIn ? (
                  <Link
                    href="/subscribe?plan=pro"
                    className="mt-8 block w-full bg-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                  >
                    Subscribe
                  </Link>
                ) : (
                  <Link
                    href="/login?plan=pro"
                    className="mt-8 block w-full bg-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                  >
                    Subscribe
                  </Link>
                )}
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-white tracking-wide">What's included:</h4>
                <ul className="mt-6 space-y-4">
                  {proMonthly ? (
                    extractFeatures(proMonthly.description).map((feature, index) => (
                      <li key={index} className="flex space-x-3">
                        <svg className="flex-shrink-0 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex space-x-3">
                        <svg className="flex-shrink-0 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-300">Loading features...</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
