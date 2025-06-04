/**
 * 应用全局配置
 * 集中管理所有环境相关的配置，包括API端点、Paddle配置等
 */

// Paddle配置类型
interface PaddleConfig {
  clientToken: string;
  sandbox: boolean;
  vendorId: number;
}

// API配置类型
interface ApiConfig {
  baseUrl: string;
  endpoints: {
    paddleProducts: string;
  };
}

// 应用配置类型
interface AppConfig {
  paddle: PaddleConfig;
  api: ApiConfig;
}

// 注意：配置现在动态生成，确保在运行时读取环境变量

// 根据环境变量选择配置 - 改为动态函数
function getConfig(): AppConfig {
  const env = process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV || 'development';

  // 动态创建配置，确保在运行时读取环境变量
  if (env === 'production') {
    return {
      paddle: {
        clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '', // 生产环境token
        sandbox: process.env.NEXT_PUBLIC_PADDLE_SANDBOX === 'true', // 默认为false
        vendorId: parseInt(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || '223419'), // 生产环境的vendorId
      },
      api: {
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://meeting.20280101.xyz', // 生产环境API基础URL
        endpoints: {
          paddleProducts: '/api/v1/paddle/products'
        }
      }
    };
  } else {
    return {
      paddle: {
        clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_4e523c871a7228eca4b1c697774', // Sandbox环境token
        sandbox: process.env.NEXT_PUBLIC_PADDLE_SANDBOX === 'false' ? false : true,
        vendorId: parseInt(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || '31639'), // Sandbox环境的vendorId
      },
      api: {
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8082',
        endpoints: {
          paddleProducts: '/api/v1/paddle/products'
        }
      }
    };
  }
}

// 导出动态获取配置的函数
export function getAppConfig(): AppConfig {
  return getConfig();
}

// 导出当前环境的配置 - 改为 getter 函数
export const appConfig = getConfig();

// 导出Paddle配置（向后兼容） - 改为 getter 函数
export function getPaddleConfig() {
  return getConfig().paddle;
}

// 保持向后兼容
export const paddleConfig = getPaddleConfig();

// 辅助函数：获取完整的API URL
export function getApiUrl(endpoint: keyof AppConfig['api']['endpoints']): string {
  const { baseUrl, endpoints } = appConfig.api;
  return `${baseUrl}${endpoints[endpoint]}`;
}

// 辅助函数：获取Paddle产品API URL
export function getPaddleProductsApiUrl(includePrice: boolean = true): string {
  return `${getApiUrl('paddleProducts')}${includePrice ? '?include_prices=true' : ''}`;
}

export default appConfig;
