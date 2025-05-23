"use client";

import React, { useEffect, useState } from "react";
import paddleService from "../services/paddle";
import paddleConfig from "../config/paddle";

interface PaddleButtonProps {
  productId: string;
  text?: string;
  variant?: "default" | "primary" | "success" | "info";
  size?: "normal" | "large";
  className?: string;
  showIcon?: boolean;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

/**
 * Paddle官方支付按钮组件
 */
export default function PaddleButton({
  productId,
  text = "立即购买",
  variant = "primary",
  size = "large",
  className = "",
  showIcon = true,
  onSuccess,
  onError
}: PaddleButtonProps) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    // 初始化Paddle
    paddleService.ensureInitialized()
      .then(() => {
        setIsReady(true);
        
        // 添加事件监听
        if (typeof window !== 'undefined') {
          window.addEventListener('paddle:checkout.completed', function(e: any) {
            console.log('Paddle结账完成:', e);
            onSuccess && onSuccess();
          });
          
          window.addEventListener('paddle:checkout.error', function(e: any) {
            console.error('Paddle结账错误:', e);
            onError && onError(e.detail);
          });
        }
      })
      .catch(err => {
        console.error("Paddle初始化失败:", err);
        onError && onError(err);
      });
  }, [onSuccess, onError]);

  // 获取按钮样式类
  const getButtonClasses = () => {
    const baseClasses = "flex items-center justify-center font-medium rounded-md transition-all";
    
    // 尺寸
    const sizeClass = size === "large" ? "py-3 px-6 text-base" : "py-2 px-4 text-sm";
    
    // 颜色变体
    let variantClass = "bg-blue-600 hover:bg-blue-700 text-white";
    if (variant === "default") {
      variantClass = "bg-gray-200 hover:bg-gray-300 text-gray-800";
    } else if (variant === "success") {
      variantClass = "bg-green-600 hover:bg-green-700 text-white";
    } else if (variant === "info") {
      variantClass = "bg-cyan-600 hover:bg-cyan-700 text-white";
    }
    
    return `${baseClasses} ${sizeClass} ${variantClass} ${className}`;
  };

  // 处理点击购买
  const handleClick = async () => {
    if (!isReady) {
      console.log("Paddle未准备好");
      return;
    }
    
    setLoading(true);
    
    try {
      await paddleService.openCheckout({
        items: [
          {
            priceId: productId,
            quantity: 1
          }
        ],
        settings: {
          displayMode: "overlay", // 使用弹出窗口
          theme: "light"
        }
      });
      console.log("成功打开Paddle结账");
    } catch (error) {
      console.error("打开结账失败:", error);
      onError && onError(error);
    } finally {
      setLoading(false);
    }
  };

  // 渲染Paddle图标
  const renderPaddleIcon = () => {
    return (
      <svg 
        className="w-5 h-5 mr-2" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
          fill="currentColor"
        />
        <path 
          d="M9.5 16.5l7-4.5-7-4.5v9z" 
          fill="currentColor"
        />
      </svg>
    );
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isReady || loading}
      className={getButtonClasses()}
    >
      {showIcon && renderPaddleIcon()}
      {loading ? "处理中..." : !isReady ? "正在加载..." : text}
    </button>
  );
} 