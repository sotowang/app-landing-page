import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 支持的语言列表（移除了en，只保留zh）
  locales: ['zh'],
  // 默认语言
  defaultLocale: 'zh',
});

export const config = {
  // 匹配所有页面路径
  matcher: ['/((?!api|_next|.*\\..*).*)']
};