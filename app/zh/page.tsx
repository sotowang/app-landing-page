import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/zh" className="text-xl font-bold">
              智能家居展示
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/zh" className="hover:text-blue-600">首页</Link>
              <Link href="/zh#features" className="hover:text-blue-600">功能特点</Link>
              <Link href="/zh#pricing" className="hover:text-blue-600">价格方案</Link>
              <Link href="/zh/terms" className="hover:text-blue-600">服务条款</Link>
              <Link href="/zh/privacy" className="hover:text-blue-600">隐私政策</Link>
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">智能家居自动化套件</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">全面的智能家居管理解决方案，包含多个集成应用程序，提供安全、节能和便捷的智能家居体验</p>
          <Link 
            href="#download" 
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            立即开始
          </Link>
        </div>
      </section>
      
      {/* Product Description Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">我们的智能家居解决方案</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              通过我们集成的应用套件，让您的生活空间变得更智能、更安全、更高效。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">订阅包含的内容</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">家庭安全应用</span>
                    <p className="text-gray-600">先进的监控系统，支持实时警报和远程访问。</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">能源管理应用</span>
                    <p className="text-gray-600">通过智能分析和自动控制来监控和优化家庭能源消耗。</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">智能照明控制</span>
                    <p className="text-gray-600">自动化和定制您的家庭照明，提供舒适、便捷和节能的体验。</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">气候控制系统</span>
                    <p className="text-gray-600">根据您的偏好和日程安排自动调节温度的智能系统。</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">集成与兼容性</h3>
              <p className="text-gray-600 mb-6">
                我们的系统可以无缝集成流行的智能家居设备和平台，包括：
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  兼容Amazon Alexa和Google Home
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  支持Philips Hue、Ring、Nest等设备
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  支持IFTTT自定义自动化
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  开放API供开发者扩展
                </li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-blue-800 font-medium">体验我们的演示：<a href="https://demo.smarthomedemo.com" className="underline">demo.smarthomedemo.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">核心功能</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">让我们的解决方案脱颖而出的先进功能</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">统一控制</h3>
              <p className="text-gray-600">在一个控制面板上管理所有智能家居设备</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI智能自动化</h3>
              <p className="text-gray-600">根据您的习惯和偏好自动调整的智能程序</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">银行级安全</h3>
              <p className="text-gray-600">端到端加密和高级身份验证</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">订阅计划</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">选择最适合您智能家居需求的方案</p>
            
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
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">基础版</h3>
              <div className="text-3xl font-bold mb-4">¥69.99<span className="text-sm text-gray-500">/月</span></div>
              <p className="text-gray-600 mb-6">适合小型公寓和初学者</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  家庭安全应用（基础版）
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  能源管理（有限功能）
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  电子邮件支持
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  最多5台设备
                </li>
              </ul>
              
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                立即订阅
              </button>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-blue-500 relative">
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                最受欢迎
              </div>
              <h3 className="text-xl font-semibold mb-2">专业版</h3>
              <div className="text-3xl font-bold mb-4">¥139.99<span className="text-sm text-gray-500">/月</span></div>
              <p className="text-gray-600 mb-6">适合中型家庭</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  所有基础应用（完整功能）
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  智能照明控制
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  优先支持
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  最多15台设备
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  高级自动化
                </li>
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
                立即订阅
              </button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">企业版</h3>
              <div className="text-3xl font-bold mb-4">¥349.99<span className="text-sm text-gray-500">/月</span></div>
              <p className="text-gray-600 mb-6">适合大型住宅和企业</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  所有专业版功能
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  气候控制系统
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  24/7全天候优质支持
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  无限设备
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  定制解决方案*
                </li>
              </ul>
              
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                联系销售
              </button>
              
              <p className="text-sm text-gray-500 mt-4">*定制解决方案包括：专属客户经理、与现有系统的定制集成、个性化自动化工作流程、定制安全协议，以及满足特定业务或大型物业需求的定制硬件配置。</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Download Section */}
      <section id="download" className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">下载我们的智能家居应用</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">可在iOS和Android设备上使用</p>
          
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link 
              href="https://apps.apple.com/us/app/smart-home-control" 
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
              href="https://play.google.com/store/apps/details?id=com.smartcontrol.home" 
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
              <h3 className="text-xl font-bold mb-4">智能家居套件</h3>
              <p className="text-gray-400">© 2023 智能家居科技. 保留所有权利.</p>
              <p className="text-gray-400 mt-2">安全支付由 <a href="https://paddle.com" className="underline">Paddle</a> 提供</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">链接</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/zh" className="text-gray-400 hover:text-white transition">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/zh#features" className="text-gray-400 hover:text-white transition">
                    功能特点
                  </Link>
                </li>
                <li>
                  <Link href="/zh#pricing" className="text-gray-400 hover:text-white transition">
                    价格方案
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">法律</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/zh/terms" className="text-gray-400 hover:text-white transition">
                    服务条款
                  </Link>
                </li>
                <li>
                  <Link href="/zh/privacy" className="text-gray-400 hover:text-white transition">
                    隐私政策
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">联系我们</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  电子邮件: support@smarthomesuite.com
                </li>
                <li className="text-gray-400">
                  电话: +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
