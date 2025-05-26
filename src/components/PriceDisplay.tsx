"use client";

import React, { useEffect, useState } from "react";
import { paddleConfig } from "../config/appConfig";

/**
 * 价格显示组件 - 显示用户所在地区的本地化价格
 *
 * @param priceId - Paddle价格ID
 * @param className - 自定义CSS类名
 */
export default function PriceDisplay({
  priceId,
  className = ""
}: {
  priceId: string;
  className?: string;
}) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [localizedPrice, setLocalizedPrice] = useState<string>("");
  const [error, setError] = useState<string>("");

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

          // 初始化Paddle
          window.Paddle.Initialize({
            token: paddleConfig.clientToken
          });

          setIsReady(true);
          console.log("Paddle初始化成功");

          // 获取本地化价格
          getLocalizedPrice();
        } catch (error) {
          console.error("Paddle初始化失败:", error);
          setError("初始化失败");
          setLoading(false);
        }
      }
    };

    paddleScript.onerror = () => {
      console.error("Paddle脚本加载失败");
      setError("脚本加载失败");
      setLoading(false);
    };

    document.body.appendChild(paddleScript);

    return () => {
      if (document.body.contains(paddleScript)) {
        document.body.removeChild(paddleScript);
      }
    };
  }, []);

  // 当priceId改变时重新获取价格
  useEffect(() => {
    if (isReady && priceId) {
      setLoading(true);
      setError("");
      getLocalizedPrice();
    }
  }, [priceId, isReady]);

  // 获取本地化价格
  const getLocalizedPrice = async () => {
    if (!window.Paddle || !priceId) {
      setLoading(false);
      return;
    }

    try {
      console.log("获取本地化价格，priceId:", priceId);

      const request = {
        items: [{
          quantity: 1,
          priceId: priceId
        }]
      };

      const result = await window.Paddle.PricePreview(request);
      console.log("价格预览结果:", result);

      if (result && result.data && result.data.details && result.data.details.lineItems && result.data.details.lineItems.length > 0) {
        const lineItem = result.data.details.lineItems[0];

        // 优先使用含税的总价格，如果没有则使用不含税价格
        const formattedPrice = lineItem.formattedTotals?.total ||
                              lineItem.formattedUnitTotals?.total ||
                              lineItem.formattedTotals?.subtotal ||
                              lineItem.formattedUnitTotals?.subtotal;

        // 尝试从不同位置获取货币代码
        const currencyCode = result.data.details.currencyCode ||
                           result.data.currencyCode ||
                           lineItem.price?.currency ||
                           "USD";

        // 尝试获取国家代码
        const detectedCountry = result.data.details.address?.countryCode ||
                              result.data.address?.countryCode ||
                              "";

        console.log("PriceDisplay - 价格信息:", {
          formattedPrice,
          subtotal: lineItem.formattedTotals?.subtotal,
          total: lineItem.formattedTotals?.total,
          tax: lineItem.formattedTotals?.tax,
          currencyCode,
          detectedCountry,
          isUS: detectedCountry === 'US'
        });

        if (formattedPrice) {
          setLocalizedPrice(formattedPrice);
          console.log("PriceDisplay - 设置本地化价格（含税）:", formattedPrice, "货币:", currencyCode, "国家:", detectedCountry);
        } else {
          setError("无法获取价格信息");
        }
      } else {
        setError("价格数据格式错误");
      }
    } catch (error) {
      console.error("获取本地化价格失败:", error);
      setError("获取价格失败");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`text-center ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-24 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center text-red-500 ${className}`}>
        <div className="text-lg font-semibold">价格加载失败</div>
        <div className="text-sm">{error}</div>
      </div>
    );
  }

  if (!localizedPrice) {
    return (
      <div className={`text-center text-gray-500 ${className}`}>
        <div className="text-lg font-semibold">价格不可用</div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="text-4xl font-extrabold text-gray-900 dark:text-white">
        {localizedPrice}
      </div>
    </div>
  );
}
