import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default function LoginRedirect() {
  // 获取请求头中的语言信息
  const headersList = headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  // 检查是否优先使用中文
  const prefersChinese = acceptLanguage.includes('zh');

  // 获取URL参数
  const url = new URL(headersList.get('referer') || '', 'http://localhost');
  const params = url.searchParams.toString();

  // 记录重定向信息（仅在开发环境中）
  console.log('重定向参数:', params);

  // 根据语言偏好重定向到相应的登录页面
  if (prefersChinese) {
    // 直接重定向到中文登录页面
    redirect(`/zh/login${params ? `?${params}` : ''}`);
  } else {
    // 重定向到英文登录页面
    redirect(`/en/login${params ? `?${params}` : ''}`);
  }
}
