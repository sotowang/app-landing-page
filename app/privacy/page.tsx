import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
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
              <Link href="/privacy" className="hover:text-blue-600 text-blue-600 font-semibold">隐私政策</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/en/privacy" className="text-sm hover:text-blue-600 transition">English</Link>
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
      
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">隐私政策</h1>
          <p className="text-gray-600 mb-8">最后更新：2023年5月</p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">我们收集什么信息</h2>
            <p className="mb-4">我们可能收集、存储和使用以下类型的个人信息：</p>
            <ul className="list-disc pl-8 mb-4">
              <li>有关您的计算机的信息，包括您的IP地址、地理位置、浏览器类型和版本以及操作系统；</li>
              <li>有关您访问和使用本网站的信息，包括引荐来源、访问时长、页面浏览量和网站导航路径；</li>
              <li>在注册我们的电子邮件通知和/或通讯时您提供的信息，例如您的电子邮件地址；</li>
              <li>在使用我们网站上的服务时您提供的信息，包括您的姓名、个人资料图片、性别、出生日期、关系状态、兴趣爱好、教育和就业细节；</li>
              <li>在与我们通信时您提供的信息，包括通信内容和元数据；</li>
              <li>您通过我们的网站发送的任何其他个人信息。</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">使用个人信息</h2>
            <p className="mb-4">通过我们网站提交给我们的个人信息将用于本政策中指定的目的。我们可能会将您的个人信息用于以下目的：</p>
            <ul className="list-disc pl-8 mb-4">
              <li>管理我们的网站和业务；</li>
              <li>个性化我们的网站供您使用；</li>
              <li>使您能够使用我们网站上的服务；</li>
              <li>向您发送非营销商业通信；</li>
              <li>向您发送我们认为可能对您特别感兴趣的电子邮件通知；</li>
              <li>向您发送我们的电子邮件通讯（如果您已请求接收）；</li>
              <li>向您发送营销通信（如果您已同意接收）；</li>
              <li>处理有关我们网站服务的查询和投诉；</li>
              <li>保持我们网站的安全并防止欺诈；</li>
              <li>验证对我们网站安全区域的访问的合规性。</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">披露个人信息</h2>
            <p className="mb-4">我们可能会在以下情况下向我们任何员工、高管、承包商、代理人、供应商或分包商披露您的个人信息，只要这对于实现本政策中规定的目的是合理必要的。</p>
            <p className="mb-4">我们还可能在以下情况下披露您的个人信息：</p>
            <ul className="list-disc pl-8 mb-4">
              <li>在法律要求的范围内；</li>
              <li>与任何正在进行或即将进行的法律程序有关；</li>
              <li>为了建立、行使或捍卫我们的法律权利（包括向他人提供信息以防止欺诈）；</li>
              <li>对于我们可能出售或计划出售的任何业务或资产的购买者（或潜在购买者）；</li>
              <li>如果我们合理认为披露对于保护我们或任何第三方的权利、财产或个人安全是必要或适当的。</li>
            </ul>
            
            <h2 className="text-2xl font-bold mb-4">国际数据传输</h2>
            <p className="mb-4">我们收集的信息可能会被存储、处理并在我们开展业务的任何国家之间传输，以便我们能够按照本隐私政策使用信息。</p>
            <p className="mb-4">您明确同意将信息传输到这些海外实体，以实现我们的政策目标。</p>
            
            <h2 className="text-2xl font-bold mb-4">保留个人信息</h2>
            <p className="mb-4">本节规定了我们的数据保留政策，旨在确保我们遵守对个人数据保留的法律义务。</p>
            <p className="mb-4">出于任何目的或多个目的处理的个人信息不会被保留超过该目的或这些目的所需的时间。</p>
            
            <h2 className="text-2xl font-bold mb-4">您的权利</h2>
            <p className="mb-4">您可以指示我们随时向您提供我们持有的任何关于您的个人信息；提供此类信息的条件是：提供适当的身份证明。</p>
            <p className="mb-4">我们可能会在法律允许的情况下扣留您要求的个人信息。您可以随时指示我们不要为营销目的处理您的个人信息。</p>
            
            <h2 className="text-2xl font-bold mb-4">Cookie</h2>
            <p className="mb-4">我们的网站使用cookie。Cookie是包含标识符（由字母和数字组成的字符串）的文件，由网络服务器发送给网络浏览器并由浏览器存储。然后，标识符被发送回服务器，每次浏览器请求来自服务器的页面时。</p>
            <p className="mb-4">Cookie不包含任何可以直接识别您个人身份的信息，但我们存储的关于您的个人信息可能会链接到存储在cookie中的信息。</p>
            
            <h2 className="text-2xl font-bold mb-4">隐私政策的修订</h2>
            <p className="mb-4">我们可能会不时更新此政策，方法是在我们的网站上发布新版本。您应该定期查看此网页，以确保您了解对此政策所做的任何更改。</p>
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