"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import appConfig from '../../../src/config/appConfig';
import authService from '../../../src/services/authService';
import SimplePaddleButton from '../../../src/components/SimplePaddleButton';
import PriceDisplay from '../../../src/components/PriceDisplay';

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

  // 计费周期切换状态
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

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
    console.log('Categorizing products:', products);

    products.forEach(product => {
      if (!product.prices || product.prices.length === 0) return;

      const planType = product.custom_data?.plan_type || '';
      const billingCycle = product.prices[0].billing_cycle.interval;

      console.log(`Product: ${product.name}, Plan Type: ${planType}, Billing: ${billingCycle}, Price: ${product.prices[0].unit_price.amount}`);

      // 严格按照API数据的plan_type和billing_cycle进行分类
      if (planType === 'basic') {
        if (billingCycle === 'month') {
          console.log('Setting basicMonthly:', product.name);
          setBasicMonthly(product);
        } else if (billingCycle === 'year') {
          console.log('Setting basicAnnual:', product.name);
          setBasicAnnual(product);
        }
      } else if (planType === 'pro') {
        if (billingCycle === 'month') {
          console.log('Setting proMonthly:', product.name);
          setProMonthly(product);
        } else if (billingCycle === 'year') {
          console.log('Setting proAnnual:', product.name);
          setProAnnual(product);
        }
      }
    });
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
                href="/#download"
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

          {/* 计费周期切换 */}
          <div className="mt-8 flex justify-center">
            <div className="bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'annually'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Annually
                <span className="ml-1 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
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
                  href="/#download"
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
                <p className="mt-4 text-gray-300">
                  {billingCycle === 'monthly'
                    ? (basicMonthly?.description?.split('\n')[0] || 'Essential features for professionals')
                    : (basicAnnual?.description?.split('\n')[0] || 'Essential features for professionals')
                  }
                </p>
                <div className="mt-8">
                  {(() => {
                    const currentPlan = billingCycle === 'monthly' ? basicMonthly : basicAnnual;
                    return currentPlan?.prices && currentPlan.prices.length > 0 ? (
                      <PriceDisplay
                        priceId={currentPlan.prices[0].id}
                        className=""
                      />
                    ) : (
                      <p>
                        <span className="text-4xl font-extrabold text-white">N/A</span>
                        <span className="text-base font-medium text-gray-300">
                          {billingCycle === 'monthly' ? '/mo' : '/year'}
                        </span>
                      </p>
                    );
                  })()}
                </div>
                {billingCycle === 'annually' && basicAnnual && (
                  <p className="text-sm text-green-400 mt-2">
                    Save 20% compared to monthly billing
                  </p>
                )}
                {isLoggedIn ? (
                  <div className="mt-8">
                    {(() => {
                      const currentPlan = billingCycle === 'monthly' ? basicMonthly : basicAnnual;

                      // 添加调试信息
                      console.log('Basic Plan Debug Info:', {
                        billingCycle,
                        currentPlan: currentPlan?.name,
                        priceId: currentPlan?.prices?.[0]?.id,
                        priceAmount: currentPlan?.prices?.[0]?.unit_price?.amount,
                        planType: currentPlan?.custom_data?.plan_type,
                        billingInterval: currentPlan?.prices?.[0]?.billing_cycle?.interval
                      });

                      return currentPlan?.prices && currentPlan.prices.length > 0 ? (
                        <SimplePaddleButton
                          productId={currentPlan.prices[0].id}
                          text="Subscribe"
                        />
                      ) : (
                        <button
                          className="w-full bg-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700 opacity-50 cursor-not-allowed"
                          disabled
                        >
                          Subscribe
                        </button>
                      );
                    })()}
                  </div>
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
                  {(billingCycle === 'monthly' ? basicMonthly : basicAnnual) ? (
                    extractFeatures((billingCycle === 'monthly' ? basicMonthly : basicAnnual)!.description).map((feature, index) => (
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
                <p className="mt-4 text-gray-300">
                  {billingCycle === 'monthly'
                    ? (proMonthly?.description?.split('\n')[0] || 'Advanced features for teams')
                    : (proAnnual?.description?.split('\n')[0] || 'Advanced features for teams')
                  }
                </p>
                <div className="mt-8">
                  {(() => {
                    const currentPlan = billingCycle === 'monthly' ? proMonthly : proAnnual;
                    return currentPlan?.prices && currentPlan.prices.length > 0 ? (
                      <PriceDisplay
                        priceId={currentPlan.prices[0].id}
                        className=""
                      />
                    ) : (
                      <p>
                        <span className="text-4xl font-extrabold text-white">N/A</span>
                        <span className="text-base font-medium text-gray-300">
                          {billingCycle === 'monthly' ? '/mo' : '/year'}
                        </span>
                      </p>
                    );
                  })()}
                </div>
                {billingCycle === 'annually' && proAnnual && (
                  <p className="text-sm text-green-400 mt-2">
                    Save 20% compared to monthly billing
                  </p>
                )}
                {billingCycle === 'annually' && !proAnnual && (
                  <p className="text-sm text-gray-400 mt-2">
                    Annual plan not available
                  </p>
                )}
                {isLoggedIn ? (
                  <div className="mt-8">
                    {(() => {
                      const currentPlan = billingCycle === 'monthly' ? proMonthly : proAnnual;
                      return currentPlan?.prices && currentPlan.prices.length > 0 ? (
                        <SimplePaddleButton
                          productId={currentPlan.prices[0].id}
                          text="Subscribe"
                        />
                      ) : (
                        <button
                          className="w-full bg-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700 opacity-50 cursor-not-allowed"
                          disabled
                        >
                          Subscribe
                        </button>
                      );
                    })()}
                  </div>
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
                  {(billingCycle === 'monthly' ? proMonthly : proAnnual) ? (
                    extractFeatures((billingCycle === 'monthly' ? proMonthly : proAnnual)!.description).map((feature, index) => (
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
