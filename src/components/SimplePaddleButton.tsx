"use client";

import React, { useEffect, useState } from "react";
import paddleConfig from "../config/paddle";

/**
 * 简单的Paddle按钮组件 - 直接加载Paddle.js并执行Setup
 */
export default function SimplePaddleButton({ 
  productId,
  text = "立即购买" 
}: { 
  productId: string,
  text?: string 
}) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 加载Paddle.js
    const paddleScript = document.createElement("script");
    paddleScript.src = "https://cdn.paddle.com/paddle/paddle.js";
    paddleScript.async = true;
    paddleScript.onload = () => {
      if (typeof window !== 'undefined' && window.Paddle) {
        try {
          // 设置环境
          window.Paddle.Environment.set('sandbox');
          
          // 初始化Paddle
          window.Paddle.Setup({ 
            token: paddleConfig.clientToken 
          });
          
          setIsReady(true);
          console.log("Paddle初始化成功");
        } catch (error) {
          console.error("Paddle初始化失败:", error);
        }
      }
    };
    
    document.body.appendChild(paddleScript);
    
    return () => {
      document.body.removeChild(paddleScript);
    };
  }, []);

  const handleClick = () => {
    if (!isReady || !window.Paddle) {
      console.error("Paddle尚未准备好");
      return;
    }
    
    setLoading(true);
    
    try {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: productId,
            quantity: 1
          }
        ],
        settings: {
          displayMode: "overlay",
          theme: "light",
          locale: "zh"
        }
      });
      console.log("成功打开Paddle结账");
    } catch (error) {
      console.error("打开结账失败:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isReady || loading}
      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg disabled:opacity-50 font-medium"
    >
      {loading ? "处理中..." : !isReady ? "正在加载..." : text}
    </button>
  );
} 