import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/zh" className="text-xl font-bold">
              SuperSpeech
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link href="/zh" className="hover:text-blue-600">首页</Link>
              <Link href="/zh#features" className="hover:text-blue-600">功能特点</Link>
              <Link href="/zh/meeting/pricing" className="hover:text-blue-600">价格方案</Link>
              <Link href="/zh/terms" className="hover:text-blue-600 text-blue-600 font-semibold">服务条款</Link>
              <Link href="/zh/privacy" className="hover:text-blue-600">隐私政策</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/en/terms" className="text-sm hover:text-blue-600 transition">English</Link>
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
          <h1 className="text-3xl font-bold mb-6">服务条款</h1>
          <p className="text-gray-600 mb-8">最后更新：2025年5月</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">退款政策</h2>
            <p className="mb-4">我们为所有方案提供14天无理由退款保证。如果您对我们的服务不满意，可以在购买后14天内申请全额退款，无需任何解释。</p>

            <h2 className="text-2xl font-bold mb-4">1. 简介</h2>
            <p className="mb-4">本网页上的网站标准条款和条件将管理您对我们网站的使用，可通过superspeech.com访问。</p>
            <p className="mb-4">这些条款将完全适用并影响您对本网站的使用。使用本网站即表示您同意接受此处的所有条款和条件。如果您不同意任何这些网站标准条款和条件，则不得使用本网站。</p>

            <h2 className="text-2xl font-bold mb-4">2. 知识产权</h2>
            <p className="mb-4">除了您拥有的内容外，根据这些条款，我们公司和/或其许可方拥有本网站中包含的所有知识产权和材料。</p>
            <p className="mb-4">您仅被授予有限的许可，仅用于查看本网站中包含的材料。</p>

            <h2 className="text-2xl font-bold mb-4">3. 限制</h2>
            <p className="mb-4">您被特别限制进行以下所有活动：</p>
            <ul className="list-disc pl-8 mb-4">
              <li>在任何其他媒体上发布任何网站材料；</li>
              <li>销售、再许可和/或以其他方式商业化任何网站材料；</li>
              <li>公开表演和/或展示任何网站材料；</li>
              <li>以可能对本网站造成损害的方式使用本网站；</li>
              <li>以影响用户访问本网站的方式使用本网站；</li>
              <li>以违反适用法律法规的方式使用本网站，或以可能对网站、任何人或商业实体造成伤害的方式使用本网站；</li>
              <li>从事与本网站相关的任何数据挖掘、数据收集、数据提取或任何其他类似活动；</li>
              <li>使用本网站进行任何广告或营销。</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4">4. 订阅和支付</h2>
            <p className="mb-4">通过我们的网站购买订阅即表示您同意支付订阅费用。订阅费用将按照您选择的订阅计划定期收取。</p>
            <p className="mb-4">您负责在您账户下产生的所有费用，包括任何适用的税费。</p>
            <p className="mb-4">我们使用 Paddle 作为我们的支付处理商，所有支付将通过其安全平台进行处理。</p>

            <h2 className="text-2xl font-bold mb-4">5. 退款政策</h2>
            <p className="mb-4">我们为所有订阅计划提供14天退款保证。如果您对我们的服务不满意，可以在购买后14天内申请全额退款。</p>
            <p className="mb-4">要申请退款，请联系我们的支持团队。退款将处理到原始付款方式。</p>

            <h2 className="text-2xl font-bold mb-4">6. 责任限制</h2>
            <p className="mb-4">在任何情况下，我们均不对因使用或无法使用我们网站上的材料而导致的任何损害（包括但不限于数据或利润损失，或因业务中断）承担责任，即使我们或授权代表已口头或书面通知可能发生此类损害的可能性。</p>

            <h2 className="text-2xl font-bold mb-4">7. 管辖法律</h2>
            <p className="mb-4">这些条款将受您居住国家/地区适用法律的管辖和解释，而不考虑其法律冲突条款。</p>
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
                  <Link href="/zh/meeting/pricing" className="text-gray-400 hover:text-white transition">
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