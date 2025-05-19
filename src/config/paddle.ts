/**
 * Paddle支付系统配置
 */

interface PaddlePriceIds {
  standard: string;
  pro: string;
  enterprise: string;
}

interface PaddleConfig {
  clientToken: string;
  sandbox: boolean;
  vendorId: number;
  priceIds: PaddlePriceIds;
}

export const PADDLE_SANDBOX_CONFIG: PaddleConfig = {
  clientToken: 'test_4e523c871a7228eca4b1c697774', // Sandbox环境token
  sandbox: true,
  vendorId: 31639, // Sandbox环境的vendorId
  priceIds: {
    standard: 'pri_01jvk7ngatwd4r8cwrqt82rmxb', // 这里使用测试价格ID
    pro: 'pri_01jvk7ngatwd4r8cwrqt82rmxb',
    enterprise: 'pri_01jvk7ngatwd4r8cwrqt82rmxb'
  }
};

export const PADDLE_PRODUCTION_CONFIG: PaddleConfig = {
  clientToken: '', // 这里需要填入生产环境token
  sandbox: false,
  vendorId: 223419, // 生产环境的vendorId
  priceIds: {
    standard: '', // 生产环境的价格ID
    pro: '',
    enterprise: ''
  }
};

// 使用环境变量决定使用哪个配置
const isProd = process.env.NODE_ENV === 'production';
export const paddleConfig = isProd ? PADDLE_PRODUCTION_CONFIG : PADDLE_SANDBOX_CONFIG;

export default paddleConfig; 