"use client";

import paddleConfig from "../config/paddle";

/**
 * Paddle支付服务
 */

interface PaddleConfig {
  token: string;
  sandbox?: boolean;
}

interface PaddleCheckoutOptions {
  items: Array<{
    priceId: string;
    quantity: number;
  }>;
  settings?: {
    displayMode?: "overlay" | "inline";
    theme?: "light" | "dark";
    locale?: string;
    frameTarget?: string;
    frameInitialHeight?: string;
    frameStyle?: string;
    variant?: "one-page" | "multi-page";
    [key: string]: any;
  };
  customer?: {
    email?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

class PaddleService {
  private isInitialized = false;
  private isLoaded = false;
  private config: PaddleConfig;
  private loadCallbacks: Array<() => void> = [];

  constructor(config: PaddleConfig) {
    this.config = config;
    if (typeof window !== 'undefined') {
      this.loadScript();
    }
  }

  /**
   * 加载Paddle脚本
   */
  private loadScript(): void {
    if (document.querySelector('script[src="https://cdn.paddle.com/paddle/paddle.js"]')) {
      this.onScriptLoaded();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/paddle.js';
    script.async = true;
    script.onload = () => this.onScriptLoaded();
    document.head.appendChild(script);
  }

  /**
   * 脚本加载完成回调
   */
  private onScriptLoaded(): void {
    this.isLoaded = true;
    this.initializePaddle();
    this.loadCallbacks.forEach(callback => callback());
    this.loadCallbacks = [];
  }

  /**
   * 初始化Paddle
   */
  private initializePaddle(): void {
    if (!this.isLoaded || this.isInitialized || typeof window === 'undefined') {
      return;
    }

    try {
      if (this.config.sandbox) {
        window.Paddle.Environment.set('sandbox');
      }

      window.Paddle.Initialize({
        token: this.config.token,
        eventCallback: (data: any) => {
          console.log('Paddle事件:', data);
        }
      });

      this.isInitialized = true;
    } catch (error) {
      console.error('初始化Paddle失败:', error);
    }
  }

  /**
   * 确保Paddle已加载并初始化
   */
  ensureInitialized(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isInitialized) {
        resolve();
      } else if (this.isLoaded) {
        this.initializePaddle();
        resolve();
      } else {
        this.loadCallbacks.push(resolve);
      }
    });
  }

  /**
   * 打开结账界面
   */
  async openCheckout(options: PaddleCheckoutOptions): Promise<void> {
    await this.ensureInitialized();
    
    if (typeof window !== 'undefined' && window.Paddle) {
      window.Paddle.Checkout.open(options);
    } else {
      console.error('Paddle未初始化');
    }
  }

  /**
   * 关闭结账界面
   */
  async closeCheckout(): Promise<void> {
    await this.ensureInitialized();
    
    if (typeof window !== 'undefined' && window.Paddle) {
      window.Paddle.Checkout.close();
    }
  }
}

// 导出Paddle服务实例
export const paddleService = new PaddleService({
  token: paddleConfig.clientToken,
  sandbox: paddleConfig.sandbox
});

export default paddleService; 