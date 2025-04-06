import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'zh']
const defaultLocale = 'zh'

// 获取请求的语言
function getLocale(request: NextRequest) {
  // 从 cookie 或 accept-language 头获取语言
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.includes(lang.substring(0, 2)))
    
    if (preferredLocale) {
      return preferredLocale.substring(0, 2)
    }
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 如果是根路径，重定向到默认语言
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }
  
  // 如果路径已经包含语言代码，不做处理
  if (locales.some(locale => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next()
  }
  
  // 获取用户首选语言
  const locale = getLocale(request)
  
  // 重定向到带有语言代码的路径
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

export const config = {
  matcher: [
    // 匹配所有路径，但排除以下路径
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 