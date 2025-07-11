"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import authService from '../src/services/authService';
import { fetchVersionInfo } from '../src/services/versionService';
import { VersionInfo } from '../src/types/version';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

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
      console.log('Home page - Current login state:', {
        isLoggedIn: loggedIn,
        hasToken: !!authService.getToken(),
        hasUser: !!authService.getUser(),
        token: authService.getToken()?.substring(0, 10) + '...'
      });
    };

    // 初始检查
    checkAuth();

    // 获取版本信息
    loadVersionInfo();

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

  // 加载版本信息
  const loadVersionInfo = async () => {
    try {
      const info = await fetchVersionInfo();
      setVersionInfo(info);
    } catch (error) {
      console.error('获取版本信息失败:', error);
    }
  };

  // 处理下载
  const handleDownload = (platform: 'macos' | 'windows') => {
    const downloadUrl = versionInfo?.download_urls[platform];
    if (downloadUrl && downloadUrl.trim() !== '') {
      window.open(downloadUrl, '_blank');
    }
  };

  // 格式化日期为本机时间
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // 处理登出
  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUser(null);
    setShowUserMenu(false);

    console.log('User logged out, login state cleared');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-white">
              MeetingGPT
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-blue-400">Home</Link>
              <Link href="/pricing" className="text-gray-300 hover:text-blue-400">Pricing</Link>
              <div className="relative group">
                <span className="text-gray-300 hover:text-blue-400 cursor-pointer">About</span>
                <div className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/terms" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Terms</Link>
                  <Link href="/privacy" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Privacy Policy</Link>
                </div>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Login and Download buttons */}
            <div className="hidden md:flex items-center space-x-4">
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
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Download
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-3">
                <Link href="/" className="text-gray-300 hover:text-blue-400">Home</Link>
                <Link href="/pricing" className="text-gray-300 hover:text-blue-400">Pricing</Link>
                <span className="text-gray-400 text-sm font-medium">About</span>
                <Link href="/terms" className="text-gray-300 hover:text-blue-400 pl-4">Terms</Link>
                <Link href="/privacy" className="text-gray-300 hover:text-blue-400 pl-4">Privacy Policy</Link>

                {isLoggedIn && user ? (
                  <>
                    <div className="text-gray-300 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="max-w-[200px] truncate">{user.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-blue-400 text-left pl-6"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="text-gray-300 hover:text-blue-400">Login</Link>
                )}

                <Link
                  href="#download"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition inline-block w-fit"
                >
                  Download
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
            🎙️ MeetingGPT: Real-time AI Responses to Your Meeting Audio
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            MeetingGPT is an innovative desktop application that listens to your meeting or video audio in real-time and provides intelligent responses based on your custom prompts. Whether it's translation, summarization, or simulated conversation, MeetingGPT is here to help.
          </p>
          <div className="mt-10 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="#download"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Download Now
              </Link>
            </div>
            <div className="ml-3 inline-flex">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">🔧 Key Features</h2>
            <p className="mt-4 text-xl text-gray-300">Powerful tools to enhance your meeting experience</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Custom Prompt Responses</h3>
              <p className="text-gray-300 mb-4">
                Based on your settings, MeetingGPT can translate audio content into specified languages, generate meeting summaries, or simulate specific roles for dialogue.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Example: Set prompt to "You are a translator, please translate the content to English" for real-time translation.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Example: Set prompt to "You are an interviewer, please answer my interview questions" to simulate interview conversations.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Selective Audio Channel Monitoring</h3>
              <p className="text-gray-300 mb-4">
                Support for selectively monitoring specific audio channels, such as only listening to other participants in meetings, avoiding interference from your own voice.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time audio processing using advanced speech recognition technology.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-400 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Multi-language support for translation and processing to meet global users' needs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">🚀 Use Cases</h2>
            <p className="mt-4 text-xl text-gray-300">MeetingGPT adapts to various scenarios</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">International Meetings</h3>
              <p className="text-gray-300">Real-time translation of meeting content, facilitating cross-language communication.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Interview Preparation</h3>
              <p className="text-gray-300">Simulate interview Q&A, improve response capabilities.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Content Creation</h3>
              <p className="text-gray-300">Generate summaries or extract key points from audio content, assisting content creation.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Language Learning</h3>
              <p className="text-gray-300">Through real-time translation and transcription, assist language learning and practice.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">🔒 Data Privacy & Security</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              MeetingGPT values your privacy and data security. All audio processing is completed locally, ensuring your data is not uploaded or leaked.
            </p>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">📥 Experience MeetingGPT Now</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Download MeetingGPT now and start experiencing the intelligent meeting assistant!
            </p>

            {/* 版本信息 */}
            {versionInfo && (
              <div className="mb-8 p-4 bg-gray-800 rounded-lg max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Version:</span>
                    <span className="ml-2 text-white font-medium">{versionInfo.version}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Released:</span>
                    <span className="ml-2 text-white font-medium">{formatDate(versionInfo.release_date)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Update Log:</span>
                    <span className="ml-2 text-white font-medium">{versionInfo.update_log}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleDownload('windows')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download for Windows
              </button>
              <button
                onClick={() => handleDownload('macos')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download for macOS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MeetingGPT</h3>
              <p className="text-gray-400">© 2025 MeetingGPT. All rights reserved.</p>
              <p className="text-gray-400 mt-2">Secure payments by <a href="https://paddle.com" className="underline">Paddle</a></p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  Email: hi@20280101.xyz
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}