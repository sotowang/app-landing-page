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
  priceIds: PaddlePriceIds;
}

export const PADDLE_SANDBOX_CONFIG: PaddleConfig = {
  clientToken: 'test_4e523c871a7228eca4b1c697774', // Sandbox环境token
  sandbox: true,
  priceIds: {
    standard: 'pro_01jvk7h218k7bede3q7m6q0crf', // 这里使用测试价格ID
    pro: 'pro_01jvksene06a15359191v3tykr',
    enterprise: 'pri_01h0000000000sandbox3'
  }
};

export const PADDLE_PRODUCTION_CONFIG: PaddleConfig = {
  clientToken: '', // 这里需要填入生产环境token
  sandbox: false,
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