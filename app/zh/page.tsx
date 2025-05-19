import React from 'react';
import Link from 'next/link';
import PaddleButton from '../../src/components/PaddleButton';
import paddleConfig from '../../src/config/paddle';

export default function Home() {
  return (
    <main>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/zh" className="text-xl font-bold">
              语音转文本
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">将您的声音转化为文字</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">以说话的速度写作 — 我们的AI驱动语音识别技术可在任何应用程序中无缝工作</p>
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
            <h2 className="text-3xl font-bold mb-4">简单易用的语音识别</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              我们先进的语音转文本解决方案帮助您更快工作、更好沟通、更轻松创作内容。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">使用场景</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">撰写专业电子邮件</span>
                    <p className="text-gray-600">口述格式完善的电子邮件。我们的工具自动将您的口述内容结构化为专业通信。</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">即时消息交流</span>
                    <p className="text-gray-600">口述您的想法用于聊天对话。无需打字即可发送有深度的回复。</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">记录会议笔记</span>
                    <p className="text-gray-600">实时记录想法，保持专注。在会议中将口述思想转化为有条理的笔记。</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">快速创建内容</span>
                    <p className="text-gray-600">通过自然说话起草社交帖子、文章或博客。通过将口述想法转换为格式化内容来克服写作障碍。</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">主要优势</h3>
              <p className="text-gray-600 mb-6">
                我们的语音转文本解决方案相比传统打字具有诸多优势：
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  速度比打字快3-5倍
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  适用于任何应用程序
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  基于上下文的智能格式化
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  支持多种语言
                </li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-blue-800 font-medium">体验我们的演示：<a href="https://demo.voicetotext.com" className="underline">demo.voicetotext.com</a></p>
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
            <p className="text-gray-600 max-w-2xl mx-auto">为注重效率和准确性的专业人士设计</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">多种转录模式</h3>
              <p className="text-gray-600">简洁模式、邮件模式、笔记模式和消息模式适用于不同场景</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">自定义词汇</h3>
              <p className="text-gray-600">添加专业术语、名称和行业用语以提高准确性</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">隐私与安全</h3>
              <p className="text-gray-600">使用您自己的API密钥实现完全的数据隐私和控制</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">选择适合您的套餐</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              我们提供灵活的价格选项，以满足您的需求和预算
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">免费版</h3>
                <div className="text-gray-600 mb-6">适合尝试使用</div>
                <div className="text-4xl font-bold mb-6">$0<span className="text-base font-normal text-gray-600">/月</span></div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>每月10分钟转录时间</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>标准转录质量</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>支持2种语言</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    <span>无文件导出功能</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link
                  href="/payment"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-center py-3 rounded-md font-medium transition"
                >
                  免费开始
                </Link>
              </div>
            </div>
            
            {/* Standard Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 transform scale-105">
              <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                最受欢迎
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">标准版</h3>
                <div className="text-gray-600 mb-6">适合个人用户</div>
                <div className="text-4xl font-bold mb-6">$9<span className="text-base font-normal text-gray-600">/月</span></div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>每月5小时转录时间</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>高质量转录</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>支持10种语言</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>多种格式导出</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <a
                  href="https://checkout.paddle.com/product/12345"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-md font-medium transition"
                >
                  立即购买
                </a>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">专业版</h3>
                <div className="text-gray-600 mb-6">适合专业团队</div>
                <div className="text-4xl font-bold mb-6">$29<span className="text-base font-normal text-gray-600">/月</span></div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>无限转录时间</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>超高质量转录</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>支持30+种语言</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>专属API访问权限</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <a
                  href="https://checkout.paddle.com/product/67890"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-md font-medium transition"
                >
                  立即购买
                </a>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">企业版</h3>
                <div className="text-gray-600 mb-6">定制解决方案</div>
                <div className="text-4xl font-bold mb-6">定制<span className="text-base font-normal text-gray-600"> 价格</span></div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>专属API访问与更高调用限制</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>定制化语音识别模型训练</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>企业专属词汇库管理</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>多用户管理与团队协作</span>
                  </li>
                </ul>
              </div>
              <div className="px-8 pb-8">
                <a
                  href="mailto:support@superspeech.com?subject=企业版计划咨询"
                  className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-3 rounded-md font-medium transition"
                >
                  联系我们
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10 text-gray-600">
            <p>所有套餐均提供7天无条件退款保证。如有任何疑问，请<a href="#contact" className="text-blue-600 hover:underline">联系我们</a>。</p>
          </div>
        </div>
      </section>
      
      {/* Download Section */}
      <section id="download" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">下载SuperSpeech应用</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              将您的语音转为文本，适用于所有主流操作系统，提高工作效率
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
            <a
              href="https://checkout.paddle.com/product/123456" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg flex items-center hover:bg-blue-700 transition shadow-md w-full md:w-auto justify-center"
            >
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>下载 Windows 版本</span>
            </a>
            
            <a 
              href="https://checkout.paddle.com/product/123457"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg flex items-center hover:bg-blue-700 transition shadow-md w-full md:w-auto justify-center"
            >
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>下载 macOS 版本</span>
            </a>
            
            <a 
              href="https://checkout.paddle.com/product/123458"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg flex items-center hover:bg-blue-700 transition shadow-md w-full md:w-auto justify-center"
            >
              <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>下载 Linux 版本</span>
            </a>
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">
            支付由 Paddle 安全处理
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SuperSpeech</h3>
              <p className="text-gray-400">© 2023 SuperSpeech科技. 保留所有权利.</p>
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
                  电子邮件: support@superspeech.com
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
