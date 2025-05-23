import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 不再进行语言重定向，直接返回
  return NextResponse.next()
}

export const config = {
  matcher: [
    // 匹配所有路径，但排除以下路径
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}