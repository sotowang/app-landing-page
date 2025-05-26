import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default function LoginRedirect() {
  // 获取URL参数
  const headersList = headers();
  const url = new URL(headersList.get('referer') || '', 'http://localhost');
  const params = url.searchParams.toString();

  // 记录重定向信息（仅在开发环境中）
  console.log('重定向参数:', params);

  // 直接重定向到根目录下的登录页面（不再使用语言路径）
  redirect(`/login${params ? `?${params}` : ''}`);
}
