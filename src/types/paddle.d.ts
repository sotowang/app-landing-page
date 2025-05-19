declare interface Window {
  Paddle: {
    Setup(options: {
      token: string;
      pwCustomer?: {
        id?: string;
        [key: string]: any;
      };
      checkout?: {
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
      };
      eventCallback?: (eventData: any) => void;
      [key: string]: any;
    }): void;
    // Initialize仍然保留为向后兼容
    Initialize?(options: {
      token: string;
      pwCustomer?: {
        id?: string;
        [key: string]: any;
      };
      checkout?: {
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
      };
      eventCallback?: (eventData: any) => void;
      [key: string]: any;
    }): void;
    Update(options: {
      pwCustomer?: {
        id?: string;
        [key: string]: any;
      };
      eventCallback?: (eventData: any) => void;
      [key: string]: any;
    }): void;
    Environment: {
      set(environment: "sandbox" | "production"): void;
    };
    Checkout: {
      open(options: {
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
      }): void;
      close(): void;
      updateCheckout(options: any): void;
      updateItems(items: any): void;
    };
    PricePreview(options: any): Promise<any>;
    Retain: {
      demo(): void;
      initCancellationFlow(options: any): void;
    };
    Spinner: {
      show(): void;
      hide(): void;
    };
    Status: {
      libraryVersion: string;
    };
    TransactionPreview(options: any): Promise<any>;
  };
} 