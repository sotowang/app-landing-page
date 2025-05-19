"use client";

import paddleConfig from "../config/paddle";

/**
 * Paddle支付服务
 * 使用官方推荐的方法调用Paddle API
 */

interface PaddleServiceConfig {
  token: string;
  sandbox?: boolean;
  vendorId: number;
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
  private config: PaddleServiceConfig;
  private loadCallbacks: Array<() => void> = [];
  private scriptElement: HTMLScriptElement | null = null;

  constructor(config: PaddleServiceConfig) {
    this.config = config;
    if (typeof window !== 'undefined') {
      this.loadScript();
    }
  }

  /**
   * 加载Paddle脚本
   */
  private loadScript(): void {
    // 检查脚本是否已经加载
    if (document.querySelector('script[src="https://cdn.paddle.com/paddle/paddle.js"]')) {
      this.onScriptLoaded();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/paddle.js';
    script.async = true;
    script.onload = () => this.onScriptLoaded();
    script.onerror = (err) => {
      console.error("加载Paddle脚本失败:", err);
      this.loadCallbacks.forEach(callback => callback());
      this.loadCallbacks = [];
    };
    
    this.scriptElement = script;
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
    if (!this.isLoaded || this.isInitialized || typeof window === 'undefined' || !window.Paddle) {
      return;
    }

    try {
      // 设置环境（沙盒或生产）
      if (this.config.sandbox) {
        window.Paddle.Environment.set('sandbox');
      }

      // 使用Paddle.Initialize初始化（替换Paddle.Setup）
      window.Paddle.Initialize({
        token: this.config.token,
        vendorId: this.config.vendorId,
        eventCallback: (data: any) => {
          console.log('Paddle事件:', data);
        }
      });

      this.isInitialized = true;
      console.log('Paddle初始化成功');
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
      try {
        window.Paddle.Checkout.open(options);
        console.log('成功打开Paddle结账窗口');
      } catch (error) {
        console.error('打开Paddle结账窗口失败:', error);
        throw error;
      }
    } else {
      console.error('Paddle未初始化');
      throw new Error('Paddle未初始化');
    }
  }

  /**
   * 关闭结账界面
   */
  async closeCheckout(): Promise<void> {
    await this.ensureInitialized();
    
    if (typeof window !== 'undefined' && window.Paddle && window.Paddle.Checkout) {
      window.Paddle.Checkout.close();
    }
  }

  /**
   * 清理资源
   */
  cleanup(): void {
    if (this.scriptElement && document.head.contains(this.scriptElement)) {
      document.head.removeChild(this.scriptElement);
    }
    
    this.isLoaded = false;
    this.isInitialized = false;
    this.loadCallbacks = [];
    this.scriptElement = null;
  }
}

// 导出Paddle服务实例
export const paddleService = new PaddleService({
  token: paddleConfig.clientToken,
  sandbox: paddleConfig.sandbox,
  vendorId: paddleConfig.vendorId
});

export default paddleService; 