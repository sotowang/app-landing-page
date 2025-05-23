"use client";

import React, { useEffect, useState } from "react";
import { paddleConfig } from "../config/appConfig";

/**
 * 简单的Paddle按钮组件 - 使用新版本的Paddle.js (v2)
 *
 * @param productId - Paddle产品ID
 * @param text - 按钮显示文本，默认为"立即购买"
 * @param email - 用户的电子邮件地址，默认为"sotowang@qq.com"，将同时通过customer对象和customData传递给Paddle以便后台获取
 */
export default function SimplePaddleButton({
  productId,
  text = "立即购买",
  email = "sotowang@qq.com"
}: {
  productId: string,
  text?: string,
  email?: string
}) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 加载Paddle.js v2版本脚本
    const paddleScript = document.createElement("script");
    paddleScript.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    paddleScript.async = true;
    paddleScript.onload = () => {
      if (typeof window !== 'undefined' && window.Paddle) {
        try {
          // 设置环境（沙盒或生产）
          if (paddleConfig.sandbox) {
            console.log('设置Paddle环境为沙盒');
            window.Paddle.Environment.set('sandbox');
          }
          console.log('当前token:', paddleConfig.clientToken);

          // 初始化Paddle
          window.Paddle.Initialize({
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
      if (document.body.contains(paddleScript)) {
        document.body.removeChild(paddleScript);
      }
    };
  }, []);

  const handleClick = () => {
    if (!isReady || !window.Paddle) {
      console.error("Paddle尚未准备好");
      return;
    }

    setLoading(true);

    try {
      const checkoutOptions: any = {
        items: [
          {
            priceId: productId,
            quantity: 1
          }
        ],
        settings: {
          displayMode: "overlay",
          theme: "light"
        }
      };

      // 添加customer信息，使用提供的email
      checkoutOptions.customer = {
        email: email
      };

      // 同时在customData中添加email信息，以便后台可以获取
      checkoutOptions.customData = {
        user_email: email
      };

      console.log("使用用户email:", email);

      window.Paddle.Checkout.open(checkoutOptions);
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