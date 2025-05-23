"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import authService from '../../src/services/authService';
import SimplePaddleButton from '../../src/components/SimplePaddleButton';
import { paddleConfig } from '../../src/config/appConfig';

export default function SubscribePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priceId, setPriceId] = useState<string>('');

  // 检查用户是否已登录
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        setUser(authService.getUser());
      } else {
        // 如果未登录，重定向到登录页面
        router.replace(`/login?plan=${plan}`);
      }
    };

    checkAuth();
  }, [plan, router]);

  // 获取产品价格ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${paddleConfig.apiBaseUrl}/api/v1/paddle/products?include_prices=true`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        const products = data.data;

        // 根据计划类型找到对应的价格ID
        if (plan === 'basic') {
          // 查找基础月度计划
          const basicMonthly = products.find((p: any) =>
            p.name.toLowerCase().includes('basic') &&
            p.prices.some((price: any) => price.billing_cycle === 'month')
          );

          if (basicMonthly) {
            const price = basicMonthly.prices.find((p: any) => p.billing_cycle === 'month');
            if (price) {
              setPriceId(price.id);
            }
          }
        } else if (plan === 'pro') {
          // 查找专业月度计划
          const proMonthly = products.find((p: any) =>
            p.name.toLowerCase().includes('pro') &&
            p.prices.some((price: any) => price.billing_cycle === 'month')
          );

          if (proMonthly) {
            const price = proMonthly.prices.find((p: any) => p.billing_cycle === 'month');
            if (price) {
              setPriceId(price.id);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load product information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [plan]);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Processing...</h1>
          <p>Please wait while we prepare your checkout.</p>
          <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
        <div className="text-center max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-red-500">Error</h1>
          <p className="mb-6">{error}</p>
          <Link
            href="/meeting/pricing"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Back to Pricing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
      <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Complete Your Purchase</h1>

        <div className="mb-6">
          <p className="mb-2">Plan: <span className="font-semibold capitalize">{plan}</span></p>
          {user && <p className="mb-2">Email: <span className="font-semibold">{user.email}</span></p>}
        </div>

        <div className="mb-6 bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Subscription Details:</h2>
          <ul className="space-y-2">
            {plan === 'basic' && (
              <>
                <li>• Basic plan features</li>
                <li>• Monthly billing</li>
                <li>• Cancel anytime</li>
              </>
            )}
            {plan === 'pro' && (
              <>
                <li>• Pro plan features</li>
                <li>• Monthly billing</li>
                <li>• Priority support</li>
                <li>• Cancel anytime</li>
              </>
            )}
          </ul>
        </div>

        <div className="flex space-x-4">
          {priceId ? (
            <div className="w-full">
              <SimplePaddleButton
                productId={priceId}
                text="Proceed to Checkout"
                email={user?.email || ''}
              />
            </div>
          ) : (
            <div className="w-full text-center text-red-500">
              Product price information not available
            </div>
          )}
        </div>

        <div className="mt-4">
          <Link
            href="/meeting/pricing"
            className="block w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition text-center"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
