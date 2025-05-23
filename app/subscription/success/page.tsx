"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import authService from '../../../src/services/authService';

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  
  // 检查用户是否已登录
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = authService.isLoggedIn();
      
      if (!loggedIn) {
        // 如果未登录，重定向到首页
        router.replace('/');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
      <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Subscription Successful!</h1>
        <p className="mb-6">
          Thank you for subscribing to MeetingGPT. Your subscription has been processed successfully.
          You now have access to all the features included in your plan.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
