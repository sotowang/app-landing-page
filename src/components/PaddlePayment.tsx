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
  buttonStyle?: "paddle" | "custom";
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
  locale = "zh",
  buttonStyle = "custom"
}: PaddlePaymentProps) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paddleButtonId, setPaddleButtonId] = useState<string>(`paddle-button-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    // 初始化Paddle
    paddleService.ensureInitialized()
      .then(() => {
        setIsReady(true);
        
        // 添加事件监听
        const handleEvent = (event: any) => {
          console.log("Paddle事件:", event);
          if (event.name === "checkout.completed") {
            onSuccess && onSuccess();
          } else if (event.name === "checkout.error") {
            onError && onError(event);
          }
        };
        
        // 添加全局事件监听
        if (typeof window !== 'undefined') {
          window.addEventListener('paddle:checkout.completed', function(e: any) {
            onSuccess && onSuccess();
          });
          
          window.addEventListener('paddle:checkout.error', function(e: any) {
            onError && onError(e.detail);
          });
        }

        // 如果是Paddle官方按钮，初始化按钮
        if (buttonStyle === 'paddle' && productId) {
          try {
            initPaddleButton();
          } catch (error) {
            console.error("Paddle按钮初始化失败:", error);
          }
        }
      })
      .catch(err => {
        console.error("Paddle初始化失败:", err);
        onError && onError(err);
      });
  }, [onSuccess, onError, buttonStyle, productId]);

  // 初始化Paddle官方按钮
  const initPaddleButton = () => {
    if (!window.Paddle || !productId) return;

    // 创建Paddle按钮的容器
    const buttonContainer = document.getElementById(paddleButtonId);
    if (buttonContainer) {
      // 清除容器内容
      buttonContainer.innerHTML = '';

      // 创建按钮元素
      const buttonElement = document.createElement('a');
      buttonElement.href = '#';
      buttonElement.className = 'paddle_button';
      buttonElement.dataset.productId = productId;
      buttonElement.dataset.theme = theme;
      buttonElement.dataset.locale = locale;
      buttonElement.textContent = buttonText;

      // 添加到容器
      buttonContainer.appendChild(buttonElement);

      // Paddle v2 不需要手动初始化按钮
      // 按钮会自动渲染
    }
  };

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
      
      {buttonStyle === 'paddle' ? (
        // Paddle官方按钮
        <div 
          id={paddleButtonId} 
          className="paddle-button-container"
          style={{ marginBottom: "20px" }}
        >
          {/* Paddle按钮将在这里渲染 */}
          {!isReady && <div className="text-gray-500">正在加载Paddle按钮...</div>}
        </div>
      ) : (
        // 自定义按钮
        <button
          onClick={handlePayment}
          disabled={!isReady || loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg disabled:opacity-50 font-medium w-full sm:w-auto"
        >
          {loading ? "处理中..." : !isReady ? "正在加载..." : buttonText}
        </button>
      )}
      
      {/* 显示Paddle品牌认证 */}
      <div className="text-xs text-gray-500 mt-2 text-center">
        安全支付由 <span className="text-blue-600">Paddle</span> 提供
      </div>
    </div>
  );
}