/**
 * API路由配置
 */

// API基础URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8082';

// Paddle产品API URL
export const PADDLE_PRODUCTS_API_URL = `${API_BASE_URL}/api/v1/paddle/products?include_prices=true`;

// Paddle配置
export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_4e523c871a7228eca4b1c697774',
  sandbox: process.env.NEXT_PUBLIC_PADDLE_SANDBOX === 'false' ? false : true,
  vendorId: parseInt(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || '-1'),
};
