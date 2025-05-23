/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用严格模式，避免开发环境下重复调用API
  reactStrictMode: false,
  // 启用 SWC 压缩
  swcMinify: true,
}

module.exports = nextConfig