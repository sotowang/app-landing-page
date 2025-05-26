/**
 * Paddle产品和价格API服务
 */
import { appConfig } from '../config/appConfig';

// 缓存机制
let productsCache: PaddleProductsResponse | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 10 * 1000; // 缓存有效期：10秒，减少缓存时间以获取最新数据
let isFetching: boolean = false; // 添加标志，防止并发请求

// 价格类型定义
export interface PaddlePrice {
  id: string;
  product_id: string;
  description: string;
  unit_price: {
    amount: string;
    currency: string;
  };
  billing_cycle: {
    interval: string;
    frequency: number;
  };
  trial_period: {
    interval: string;
    frequency: number;
  };
  status: string;
  custom_data: any;
  created_at: string;
  updated_at: string;
}

// 产品类型定义
export interface PaddleProduct {
  id: string;
  name: string;
  description: string;
  type: string;
  tax_category: string;
  custom_data: {
    plan_type: string;
    service: string;
  };
  status: string;
  import_meta: any;
  created_at: string;
  updated_at: string;
  prices: PaddlePrice[];
}

// API响应类型
export interface PaddleProductsResponse {
  data: PaddleProduct[];
  meta: {
    request_id: string;
    pagination: {
      per_page: number;
      has_more: boolean;
      estimated_total: number;
    };
  };
}

// 分类后的产品类型
export interface CategorizedProducts {
  monthly: {
    basic: PaddleProduct[];
    pro: PaddleProduct[];
  };
  yearly: {
    basic: PaddleProduct[];
    pro: PaddleProduct[];
  };
}

/**
 * 获取所有Paddle产品和价格
 * @param forceRefresh 是否强制刷新缓存
 */
export async function fetchPaddleProducts(forceRefresh: boolean = false): Promise<PaddleProductsResponse> {
  // 检查缓存是否有效
  const now = Date.now();
  if (!forceRefresh && productsCache && (now - lastFetchTime < CACHE_DURATION)) {
    console.log('使用缓存的产品数据，缓存时间:', new Date(lastFetchTime).toLocaleTimeString());
    return productsCache;
  }

  // 如果已经有请求在进行中，等待该请求完成并返回缓存
  if (isFetching && productsCache) {
    console.log('已有请求在进行中，使用缓存数据');
    return productsCache;
  }

  // 标记开始请求
  isFetching = true;
  console.log('开始获取Paddle产品数据...');

  try {
    // 使用Next.js API路由 - 注意路径必须与API路由文件路径匹配
    // app/api/paddle/products/route.ts 对应的路径是 /api/paddle/products
    const apiUrl = '/api/paddle/products';
    console.log('API URL:', apiUrl);
    console.log('当前环境配置:', {
      apiBaseUrl: appConfig.api.baseUrl,
      paddleClientToken: appConfig.paddle.clientToken,
      paddleSandbox: appConfig.paddle.sandbox
    });

    // 添加时间戳和随机数，确保不使用缓存
    const timestamp = Date.now();
    const randomParam = Math.random().toString(36).substring(2, 15);
    const noCacheUrl = `${apiUrl}?_t=${timestamp}&_r=${randomParam}`;

    console.log('使用无缓存URL:', noCacheUrl);

    const response = await fetch(noCacheUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      // 添加缓存控制
      cache: 'no-store',
    });

    console.log('API响应状态:', response.status);

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    console.log('成功获取产品数据:', data.data.length, '个产品');

    // 更新缓存
    productsCache = data;
    lastFetchTime = now;

    return data;
  } catch (error) {
    console.error('获取Paddle产品失败:', error);
    // 如果有缓存，在出错时返回缓存的数据
    if (productsCache) {
      console.log('API请求失败，使用缓存数据');
      return productsCache;
    }
    // 返回空数据结构
    return { data: [], meta: { request_id: '', pagination: { per_page: 0, has_more: false, estimated_total: 0 } } };
  } finally {
    // 无论成功还是失败，都标记请求结束
    isFetching = false;
  }
}

/**
 * 对产品进行分类（月度/年度，基础/pro）
 */
export function categorizeProducts(products: PaddleProduct[]): CategorizedProducts {
  const categorized: CategorizedProducts = {
    monthly: {
      basic: [],
      pro: []
    },
    yearly: {
      basic: [],
      pro: []
    }
  };

  products.forEach(product => {
    console.log('处理产品:', product.name, 'custom_data:', product.custom_data);

    // 检查产品是否有价格
    if (product.prices && product.prices.length > 0) {
      // 使用第一个价格的计费周期来确定是月度还是年度
      const billingInterval = product.prices[0].billing_cycle.interval;
      const planType = product.custom_data?.plan_type || 'basic';

      console.log('产品:', product.name, '计费周期:', billingInterval, '计划类型:', planType);

      if (billingInterval === 'month') {
        if (planType === 'basic') {
          categorized.monthly.basic.push(product);
          console.log('添加到 monthly.basic:', product.name);
        } else if (planType === 'pro') {
          categorized.monthly.pro.push(product);
          console.log('添加到 monthly.pro:', product.name);
        }
      } else if (billingInterval === 'year') {
        if (planType === 'basic') {
          categorized.yearly.basic.push(product);
          console.log('添加到 yearly.basic:', product.name);
        } else if (planType === 'pro') {
          categorized.yearly.pro.push(product);
          console.log('添加到 yearly.pro:', product.name);
        }
      }
    } else {
      console.log('产品没有价格:', product.name);
    }
  });

  return categorized;
}

/**
 * 格式化价格显示
 * @param amount 价格金额（字符串，单位为分）
 * @param currency 货币代码
 */
export function formatPrice(amount: string, currency: string = 'USD'): string {
  const numericAmount = parseInt(amount, 10) / 100; // 转换为元

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(numericAmount);
}
