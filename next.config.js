/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用国际化
  i18n: {
    // 默认语言
    defaultLocale: 'zh',
    // 支持的语言列表
    locales: ['zh', 'en'],
  },
  // 启用严格模式
  reactStrictMode: true,
  // 启用 SWC 压缩
  swcMinify: true,
}

module.exports = nextConfig 