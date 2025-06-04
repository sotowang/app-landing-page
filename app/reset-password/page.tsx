"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { enTranslations } from '../../src/translations';
import authService from '../../src/services/authService';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = enTranslations.auth.resetPassword || {
    title: 'Reset Password',
    subtitle: 'Enter your email address and we\'ll send you instructions to reset your password',
    email: 'Email address',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    verificationCode: 'Verification Code',
    getCode: 'Get Code',
    submit: 'Reset Password',
    backToLogin: 'Back to Login',
    success: 'Your password has been reset successfully. You can now log in with your new password.',
    error: 'Failed to reset password. Please try again.',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'New password is required',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordsDoNotMatch: 'Passwords do not match',
    confirmPasswordRequired: 'Please confirm your password',
    verificationCodeRequired: 'Verification code is required',
    codeSent: 'Verification code has been sent to your email',
    codeSendError: 'Failed to send verification code'
  };

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [codeCountdown, setCodeCountdown] = useState(0);
  const [step, setStep] = useState(1); // 1: 输入邮箱, 2: 输入验证码和新密码

  // 表单验证状态
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

  // 验证邮箱格式
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = re.test(email);
    setEmailError(isValid ? '' : t.emailInvalid);
    return isValid;
  };

  // 验证密码
  const validatePassword = (password: string): boolean => {
    const isValid = password.length >= 6;
    setPasswordError(isValid ? '' : 'Password must be at least 6 characters');
    return isValid;
  };

  // 验证确认密码
  const validateConfirmPassword = (confirmPwd: string): boolean => {
    const isValid = confirmPwd === newPassword;
    setConfirmPasswordError(isValid ? '' : 'Passwords do not match');
    return isValid;
  };

  // 验证验证码
  const validateVerificationCode = (code: string): boolean => {
    const isValid = code.length > 0;
    setVerificationCodeError(isValid ? '' : 'Verification code is required');
    return isValid;
  };

  // 验证第一步表单（邮箱）
  const validateStep1Form = (): boolean => {
    let isValid = true;

    if (!email) {
      setEmailError(t.emailRequired);
      isValid = false;
    } else if (!validateEmail(email)) {
      isValid = false;
    }

    return isValid;
  };

  // 验证第二步表单（验证码和新密码）
  const validateStep2Form = (): boolean => {
    let isValid = true;

    if (!verificationCode) {
      setVerificationCodeError('Verification code is required');
      isValid = false;
    } else if (!validateVerificationCode(verificationCode)) {
      isValid = false;
    }

    if (!newPassword) {
      setPasswordError('New password is required');
      isValid = false;
    } else if (!validatePassword(newPassword)) {
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (!validateConfirmPassword(confirmPassword)) {
      isValid = false;
    }

    return isValid;
  };

  // 处理获取验证码
  const handleGetCode = async () => {
    if (!validateStep1Form()) {
      return;
    }

    setCodeLoading(true);
    setError('');

    try {
      await authService.getVerificationCode(email, 'reset_password');
      setCodeSent(true);
      setSuccess(t.codeSent);
      setStep(2); // 进入第二步

      // 设置倒计时
      setCodeCountdown(60);
      const timer = setInterval(() => {
        setCodeCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setError(err.message || t.codeSendError);
    } finally {
      setCodeLoading(false);
    }
  };

  // 处理重置密码请求
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (validateStep1Form()) {
        handleGetCode();
      }
      return;
    }

    if (!validateStep2Form()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 调用重置密码API
      await authService.resetPassword(email, newPassword, verificationCode);

      setSuccess(t.success);

      // 清空表单
      setEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setVerificationCode('');
      setCodeSent(false);
      setStep(1); // 重置回第一步

      // 重置成功后，延迟一段时间后重定向到登录页面，携带原始URL参数
      setTimeout(() => {
        const loginUrl = `/login${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
        router.push(loginUrl);
      }, 3000);
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
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {t.title}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {t.title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Enter your email address and we'll send you instructions to reset your password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error ? (
            <div className="mb-4 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="mb-4 bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded">
              {success}
            </div>
          ) : null}

          <form className="space-y-6" onSubmit={handleResetPassword}>
            {/* 第一步：输入邮箱 */}
            {step === 1 && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
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
                      emailError ? 'border-red-300' : 'border-gray-600'
                    } rounded-md shadow-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {emailError ? (
                    <p className="mt-2 text-sm text-red-600">{emailError}</p>
                  ) : null}
                </div>
              </div>
            )}

            {/* 第二步：输入验证码和新密码 */}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-200">
                    {t.verificationCode}
                  </label>
                  <div className="mt-1 flex">
                    <div className="flex-grow mr-2">
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
                          verificationCodeError ? 'border-red-300' : 'border-gray-600'
                        } rounded-md shadow-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                      {verificationCodeError ? (
                        <p className="mt-2 text-sm text-red-600">{verificationCodeError}</p>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={handleGetCode}
                      disabled={codeLoading || codeCountdown > 0}
                      className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        (codeLoading || codeCountdown > 0) ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {codeLoading ? 'Sending...' : codeCountdown > 0 ? `${codeCountdown}s` : t.getCode}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-200">
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
                        passwordError ? 'border-red-300' : 'border-gray-600'
                      } rounded-md shadow-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {passwordError ? (
                      <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
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
                        confirmPasswordError ? 'border-red-300' : 'border-gray-600'
                      } rounded-md shadow-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    />
                    {confirmPasswordError ? (
                      <p className="mt-2 text-sm text-red-600">{confirmPasswordError}</p>
                    ) : null}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : step === 1 ? 'Next' : t.submit}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href={`/login${searchParams.toString() ? `?${searchParams.toString()}` : ''}`}
              className="text-sm font-medium text-blue-400 hover:text-blue-300"
            >
              {t.backToLogin}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
