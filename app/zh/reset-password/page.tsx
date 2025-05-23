"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import authService from '../../../src/services/authService';
import { zhTranslations } from '../../../src/translations';

export default function ResetPasswordPage() {
  const router = useRouter();
  const t = zhTranslations.auth.resetPassword;

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 表单验证状态
  const [emailError, setEmailError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

  // 验证邮箱格式
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);
    setEmailError(isValid ? '' : t.emailInvalid);
    return isValid;
  };

  // 验证密码强度
  const validatePassword = (password: string): boolean => {
    const isValid = password.length >= 8;
    setNewPasswordError(isValid ? '' : t.passwordTooShort);
    return isValid;
  };

  // 验证确认密码
  const validateConfirmPassword = (confirmPassword: string): boolean => {
    const isValid = confirmPassword === newPassword;
    setConfirmPasswordError(isValid ? '' : t.passwordsDoNotMatch);
    return isValid;
  };

  // 验证验证码
  const validateVerificationCode = (code: string): boolean => {
    const isValid = code.length > 0;
    setVerificationCodeError(isValid ? '' : t.verificationCodeRequired);
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

    if (!newPassword) {
      setNewPasswordError(t.passwordRequired);
      isValid = false;
    } else if (!validatePassword(newPassword)) {
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError(t.confirmPasswordRequired);
      isValid = false;
    } else if (!validateConfirmPassword(confirmPassword)) {
      isValid = false;
    }

    if (!verificationCode) {
      setVerificationCodeError(t.verificationCodeRequired);
      isValid = false;
    } else if (!validateVerificationCode(verificationCode)) {
      isValid = false;
    }

    return isValid;
  };

  // 处理获取验证码
  const handleGetVerificationCode = async () => {
    if (!email) {
      setEmailError(t.emailRequired);
      return;
    }

    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.getVerificationCode(email, 'reset');
      setCodeSent(true);
      setCountdown(60);
      setSuccess(t.verificationCodeSent);
    } catch (err: any) {
      setError(err.message || t.verificationCodeError);
    } finally {
      setLoading(false);
    }
  };

  // 处理重置密码
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.resetPassword(email, newPassword, verificationCode);
      setSuccess(t.success);
      
      // 重置密码成功后延迟跳转到登录页
      setTimeout(() => {
        router.push('/zh/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || t.error);
    } finally {
      setLoading(false);
    }
  };

  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

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
        <p className="mt-2 text-center text-sm text-gray-600">
          {t.rememberPassword}{' '}
          <Link href="/zh/login" className="font-medium text-blue-600 hover:text-blue-500">
            {t.login}
          </Link>
        </p>
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

          <form className="space-y-6" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t.email}
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
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
              </div>
              {emailError ? (
                <p className="mt-2 text-sm text-red-600">{emailError}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                {t.newPassword}
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (e.target.value) validatePassword(e.target.value);
                    if (confirmPassword) validateConfirmPassword(confirmPassword);
                  }}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    newPasswordError ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {newPasswordError ? (
                  <p className="mt-2 text-sm text-red-600">{newPasswordError}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {t.confirmPassword}
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (e.target.value) validateConfirmPassword(e.target.value);
                  }}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    confirmPasswordError ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {confirmPasswordError ? (
                  <p className="mt-2 text-sm text-red-600">{confirmPasswordError}</p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                {t.verificationCode}
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                    if (e.target.value) validateVerificationCode(e.target.value);
                  }}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    verificationCodeError ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-r-none`}
                />
                <button
                  type="button"
                  onClick={handleGetVerificationCode}
                  disabled={loading || countdown > 0}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white ${
                    loading || countdown > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {countdown > 0 ? `${countdown}秒` : t.getVerificationCode}
                </button>
              </div>
              {verificationCodeError ? (
                <p className="mt-2 text-sm text-red-600">{verificationCodeError}</p>
              ) : null}
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
        </div>
      </div>
    </div>
  );
}
