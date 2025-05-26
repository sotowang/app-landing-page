declare interface Window {
  Paddle: {
    // v2版本API
    Initialize(options: {
      token: string;
      [key: string]: any;
    }): void;
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
          frameInitialHeight?: number;
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
    PricePreview(options: {
      items: Array<{
        priceId: string;
        quantity: number;
      }>;
      customerIpAddress?: string;
      address?: {
        countryCode?: string;
        postalCode?: string;
      };
      currencyCode?: string;
      discountId?: string;
      [key: string]: any;
    }): Promise<{
      data: {
        details?: {
          lineItems?: Array<{
            price?: {
              id?: string;
              productId?: string;
              currency?: string;
              [key: string]: any;
            };
            formattedTotals?: {
              subtotal?: string;
              discount?: string;
              tax?: string;
              total?: string;
            };
            formattedUnitTotals?: {
              subtotal?: string;
              discount?: string;
              tax?: string;
              total?: string;
            };
            [key: string]: any;
          }>;
          currencyCode?: string;
          address?: {
            countryCode?: string;
            [key: string]: any;
          };
          [key: string]: any;
        };
        currencyCode?: string;
        address?: {
          countryCode?: string;
          [key: string]: any;
        };
        [key: string]: any;
      };
      [key: string]: any;
    }>;
    Environment: {
      set(environment: "sandbox" | "production"): void;
    };
    Update(options: any): void;
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

    // 旧版API，标记为可选
    Setup?(options: any): void;
  };
}