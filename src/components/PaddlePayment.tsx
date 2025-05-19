"use client";

import { useEffect, useState } from "react";
import paddleService from "../services/paddle";

interface PaddlePaymentProps {
  productId?: string;
  quantity?: number;
  customerEmail?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
  buttonText?: string;
  displayMode?: "overlay" | "inline";
  theme?: "light" | "dark";
  locale?: string;
}

export default function PaddlePayment({
  productId,
  quantity = 1,
  customerEmail,
  onSuccess,
  onError,
  buttonText = "立即支付",
  displayMode = "overlay",
  theme = "light",
  locale = "zh"
}: PaddlePaymentProps) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 初始化Paddle
    paddleService.ensureInitialized()
      .then(() => {
        setIsReady(true);
        
        // 添加事件监听
        const handleEvent = (event: any) => {
          if (event.name === "checkout.completed") {
            onSuccess && onSuccess();
          } else if (event.name === "checkout.error") {
            onError && onError(event);
          }
        };
        
        // 重写eventCallback以添加我们自己的处理
        // 注意：这是一个简单实现方式，实际中可能需要更复杂的事件处理系统
        const originalCallback = window.Paddle.Initialize as any;
        window.Paddle.Initialize = function(options: any) {
          const originalEventCallback = options.eventCallback;
          options.eventCallback = (data: any) => {
            handleEvent(data);
            if (originalEventCallback) {
              originalEventCallback(data);
            }
          };
          return originalCallback.call(this, options);
        };
      })
      .catch(err => {
        console.error("Paddle初始化失败:", err);
        onError && onError(err);
      });
  }, [onSuccess, onError]);

  const handlePayment = async () => {
    if (!productId) {
      onError && onError({ message: "未提供产品ID" });
      return;
    }
    
    setLoading(true);
    
    try {
      await paddleService.openCheckout({
        items: [
          {
            priceId: productId,
            quantity: quantity
          }
        ],
        customer: customerEmail ? { email: customerEmail } : undefined,
        settings: {
          displayMode,
          theme,
          locale,
          frameTarget: displayMode === "inline" ? "paddle-checkout" : undefined
        }
      });
    } catch (error) {
      console.error("打开结账失败:", error);
      onError && onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {displayMode === "inline" && (
        <div id="paddle-checkout" style={{ width: "100%", minHeight: "450px", marginBottom: "20px" }}></div>
      )}
      
      <button
        onClick={handlePayment}
        disabled={!isReady || loading}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {loading ? "处理中..." : !isReady ? "正在加载..." : buttonText}
      </button>
    </div>
  );
} 