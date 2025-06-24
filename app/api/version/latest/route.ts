import { NextResponse } from 'next/server';

// 直接定义API URL，避免导入错误
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8082';
const VERSION_API_URL = `${API_BASE_URL}/api/v1/version/latest`;

export async function GET() {
  try {
    console.log('版本API路由环境变量:', {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL
    });
    console.log('获取版本信息从:', VERSION_API_URL);

    // 添加时间戳和随机数，确保不使用缓存
    const timestamp = Date.now();
    const randomParam = Math.random().toString(36).substring(2, 15);
    const noCacheUrl = `${VERSION_API_URL}?_t=${timestamp}&_r=${randomParam}`;

    console.log('使用无缓存URL:', noCacheUrl);

    const response = await fetch(noCacheUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      // 确保不使用缓存
      cache: 'no-store'
    });

    console.log('版本API响应状态:', response.status);

    if (!response.ok) {
      const errorText = await response.text().catch(() => '无法获取错误详情');
      console.error('版本API响应错误:', errorText);
      throw new Error(`版本API请求失败: ${response.status}, ${errorText}`);
    }

    const data = await response.json();
    console.log('成功获取版本信息:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('获取版本信息失败:', error);
    return NextResponse.json(
      {
        error: (error as Error).message,
        data: null
      },
      { status: 500 }
    );
  }
}
