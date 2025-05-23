"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import authService from '../../../src/services/authService';
import { zhTranslations } from '../../../src/translations';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = zhTranslations.auth.login;

  // 获取URL参数
  const redirectUri = searchParams.get('redirect_uri');
  const clientId = searchParams.get('client_id');
  const state = searchParams.get('state');
  const responseType = searchParams.get('response_type');

  // 是否是桌面应用登录
  const isDesktopLogin = redirectUri && redirectUri.startsWith('meetinggpt://');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 表单验证状态
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 验证邮箱格式
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);
    setEmailError(isValid ? '' : t.emailInvalid);
    return isValid;
  };

  // 验证表单
  const validateForm = (): boolean => {
    let isValid = true;

    if (!email) {
      setEmailError(t.emailRequired);
      isValid = false;
    } else if (!validateEmail(email)) {
      isValid = false;
    }

    if (!password) {
      setPasswordError(t.passwordRequired);
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  // 处理登录
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authService.login(email, password);

      // 保存令牌和用户信息
      authService.saveToken(response.token);
      authService.saveUser(response.user);

      setSuccess(t.success);

      // 如果是桌面应用登录，重定向回应用
      if (isDesktopLogin && redirectUri) {
        // 使用完整的登录token作为授权码
        // 桌面应用将使用此token进行后续API调用
        const authCode = response.token;

        // 构建重定向URL，包含所有必要参数
        let redirectUrl = `${redirectUri}?code=${authCode}`;

        // 添加原始请求中的参数
        if (state) {
          redirectUrl += `&state=${state}`;
        }
        if (responseType) {
          redirectUrl += `&response_type=${responseType}`;
        }
        if (clientId) {
          redirectUrl += `&client_id=${clientId}`;
        }

        // 在页面上显示重定向URL（仅用于调试）
        const debugElement = document.createElement('div');
        debugElement.className = 'mt-4 p-3 bg-gray-100 rounded text-xs overflow-auto';
        debugElement.style.maxWidth = '100%';
        debugElement.style.wordBreak = 'break-all';
        debugElement.innerHTML = `<strong>重定向URL:</strong> ${redirectUrl}`;

        // 将调试信息添加到页面
        const successElement = document.querySelector('.bg-green-50');
        if (successElement && successElement.parentNode) {
          successElement.parentNode.insertBefore(debugElement, successElement.nextSibling);
        }

        // 添加一个按钮，让用户可以手动点击重定向
        const redirectButton = document.createElement('button');
        redirectButton.className = 'mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500';
        redirectButton.innerHTML = '点击跳转到桌面应用';
        redirectButton.onclick = function() {
          window.location.href = redirectUrl;
        };

        if (successElement && successElement.parentNode) {
          successElement.parentNode.insertBefore(redirectButton, debugElement.nextSibling);
        }

        // 在控制台打印重定向URL
        console.log('重定向到桌面应用:', redirectUrl);
        console.log('原始参数:', {
          redirectUri,
          clientId,
          state,
          responseType
        });

        // 确保登录状态已保存
        // 1. 再次确认token和用户信息已保存到localStorage
        authService.saveToken(response.token);
        authService.saveUser(response.user);

        // 2. 触发一个自定义事件，通知其他页面登录状态已更改
        if (typeof window !== 'undefined') {
          try {
            const loginEvent = new Event('loginStateChanged');
            window.dispatchEvent(loginEvent);

            // 记录当前登录状态，用于调试
            console.log('重定向前的登录状态:', {
              isLoggedIn: authService.isLoggedIn(),
              hasToken: !!authService.getToken(),
              hasUser: !!authService.getUser(),
              token: authService.getToken()?.substring(0, 10) + '...'
            });
          } catch (e) {
            console.error('触发登录事件时出错:', e);
          }
        }

        // 延迟2秒后重定向，给localStorage更多时间完成写入
        setTimeout(() => {
          console.log('正在执行重定向...');
          // 再次检查登录状态
          console.log('最终登录状态检查:', {
            isLoggedIn: authService.isLoggedIn(),
            hasToken: !!authService.getToken(),
            hasUser: !!authService.getUser()
          });
          window.location.href = redirectUrl;
          console.log('重定向已执行');
        }, 2000);
      } else {
        // 普通Web登录，重定向到首页
        setTimeout(() => {
          router.push('/zh');
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  // 添加一个状态来确保只在客户端渲染
  const [mounted, setMounted] = useState(false);

  // 在组件挂载后设置状态
  useEffect(() => {
    setMounted(true);
  }, []);

  // 如果组件尚未挂载，返回一个简单的加载状态
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t.title}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t.title}
        </h2>
        {isDesktopLogin ? (
          <p className="mt-2 text-center text-sm text-gray-600">
            登录以连接到 MeetingGPT 桌面应用
          </p>
        ) : null}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error ? (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          ) : null}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.email}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value) validateEmail(e.target.value);
                  }}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    emailError ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {emailError ? (
                  <p className="mt-2 text-sm text-red-600">{emailError}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.password}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    passwordError ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {passwordError ? (
                  <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href="/zh/reset-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                {t.forgotPassword}
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? '处理中...' : t.submit}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t.noAccount}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/zh/register"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t.register}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
