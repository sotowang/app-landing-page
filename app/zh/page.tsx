import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              App Showcase
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-blue-600">首页</Link>
              <Link href="/#features" className="hover:text-blue-600">功能特点</Link>
              <Link href="/#pricing" className="hover:text-blue-600">价格方案</Link>
              <Link href="/terms" className="hover:text-blue-600">条款和条件</Link>
              <Link href="/privacy" className="hover:text-blue-600">隐私政策</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/en" className="text-sm hover:text-blue-600 transition">English</Link>
              <Link 
                href="#download" 
                className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                下载
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">您的一站式应用解决方案</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">发现满足您需求的完美工具</p>
          <Link 
            href="#download" 
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            立即开始
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">惊人的功能</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">是什么让我们的应用与众不同</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">简单易用</h3>
              <p className="text-gray-600">为所有用户打造的直观界面</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">强大工具</h3>
              <p className="text-gray-600">先进功能触手可及</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">安全私密</h3>
              <p className="text-gray-600">您的数据安全受到保护</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">价格方案</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">选择最适合您需求的方案</p>
            
            <div className="flex justify-center mt-8">
              <div className="flex bg-gray-200 p-1 rounded-md">
                <button className="px-4 py-2 rounded-md bg-white shadow-sm font-medium">
                  按月支付
                </button>
                <button className="px-4 py-2 rounded-md font-medium text-gray-600">
                  按年支付（节省20%）
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">基础版</h3>
              <div className="text-3xl font-bold mb-4">¥69.99</div>
              <p className="text-gray-600 mb-6">个人用户的完美选择</p>
              
              <ul className="space-y-3 mb-8">
                {["核心功能", "基础支持", "1个用户"].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                立即开始
              </button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-blue-500 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                热门选择
              </div>
              <h3 className="text-xl font-semibold mb-2">专业版</h3>
              <div className="text-3xl font-bold mb-4">¥139.99</div>
              <p className="text-gray-600 mb-6">专业人士的理想选择</p>
              
              <ul className="space-y-3 mb-8">
                {["所有基础功能", "优先支持", "高级工具", "5个用户"].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                立即开始
              </button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">企业版</h3>
              <div className="text-3xl font-bold mb-4">¥349.99</div>
              <p className="text-gray-600 mb-6">适合大型团队和企业</p>
              
              <ul className="space-y-3 mb-8">
                {["所有专业版功能", "24/7全天候支持", "定制解决方案", "无限用户"].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                立即开始
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Download Section */}
      <section id="download" className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">下载我们的应用</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">可在iOS和Android平台上使用</p>
          
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link 
              href="#" 
              className="bg-black text-white px-6 py-3 rounded-md flex items-center justify-center"
            >
              <svg className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div>
                <div className="text-xs">下载自</div>
                <div className="text-xl font-semibold">App Store</div>
              </div>
            </Link>
            
            <Link 
              href="#" 
              className="bg-black text-white px-6 py-3 rounded-md flex items-center justify-center"
            >
              <svg className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23L12 13.77l8.82 9.23H3.18M12 4l4.41 4.62L20.99 4.62 12 13.24 3.01 4.62 7.59 8.62 12 4M12 1L2.42 3.99 12 11.76l9.58-7.77L12 1z"/>
              </svg>
              <div>
                <div className="text-xs">获取</div>
                <div className="text-xl font-semibold">Google Play</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">App Showcase</h3>
              <p className="text-gray-400">© 2023 App Showcase. All rights reserved.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">链接</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="text-gray-400 hover:text-white transition">
                    功能特点
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-gray-400 hover:text-white transition">
                    价格方案
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">法律</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition">
                    条款和条件
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                    隐私政策
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">下载</h3>
              <div className="flex flex-col space-y-2">
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  App Store
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  Google Play
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
