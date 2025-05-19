"use client";

import PaddlePayment from "@/src/components/PaddlePayment";
import PaddleButton from "@/src/components/PaddleButton";
import { useState } from "react";
import paddleConfig from "@/src/config/paddle";

export default function PaymentPage() {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<"overlay" | "inline">("overlay");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "pro" | "enterprise">("standard");
  const [buttonStyle, setButtonStyle] = useState<"paddlePayment" | "paddleButton">("paddleButton");
  const [buttonVariant, setButtonVariant] = useState<"default" | "primary" | "success" | "info">("primary");
  const [showIcon, setShowIcon] = useState<boolean>(true);

  const handlePaymentSuccess = () => {
    setPaymentStatus("支付成功！交易已完成。");
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus(`支付失败：${error.message || "未知错误"}`);
  };

  // 获取所选计划的价格ID
  const getPriceId = () => {
    return paddleConfig.priceIds[selectedPlan];
  };
  
  // 获取所选计划的Paddle结账URL
  const getPaddleCheckoutUrl = () => {
    const productIds = {
      standard: "12345",
      pro: "67890",
      enterprise: "custom123"
    };
    
    return `https://checkout.paddle.com/product/${productIds[selectedPlan]}`;
  };

  // 获取所选计划的价格
  const getPlanPrice = () => {
    switch(selectedPlan) {
      case "standard":
        return "$9/月";
      case "pro":
        return "$29/月";
      case "enterprise":
        return "自定义价格";
      default:
        return "$9/月";
    }
  };

  // 获取所选计划的名称
  const getPlanName = () => {
    switch(selectedPlan) {
      case "standard":
        return "标准版";
      case "pro":
        return "专业版";
      case "enterprise":
        return "企业版";
      default:
        return "标准版";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Paddle支付集成演示</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">支付方式设置</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">显示模式</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="overlay" 
                value="overlay" 
                name="displayMode"
                checked={displayMode === "overlay"}
                onChange={() => setDisplayMode("overlay")}
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor="overlay" className="ml-2 text-sm text-gray-700">弹出窗口</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="inline" 
                value="inline" 
                name="displayMode"
                checked={displayMode === "inline"}
                onChange={() => setDisplayMode("inline")}
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor="inline" className="ml-2 text-sm text-gray-700">内嵌页面</label>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            按钮类型
          </label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="paddlePaymentBtn"
                value="paddlePayment"
                name="buttonStyle"
                checked={buttonStyle === "paddlePayment"}
                onChange={() => setButtonStyle("paddlePayment")}
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor="paddlePaymentBtn" className="ml-2 text-sm text-gray-700">基本按钮</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="paddleButtonBtn"
                value="paddleButton"
                name="buttonStyle"
                checked={buttonStyle === "paddleButton"}
                onChange={() => setButtonStyle("paddleButton")}
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              <label htmlFor="paddleButtonBtn" className="ml-2 text-sm text-gray-700">Paddle按钮</label>
            </div>
          </div>
        </div>

        {buttonStyle === "paddleButton" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              按钮风格
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button 
                className={`py-2 px-4 rounded-md ${buttonVariant === "default" ? "ring-2 ring-blue-500" : ""} bg-gray-200 hover:bg-gray-300 text-gray-800`}
                onClick={() => setButtonVariant("default")}
              >
                默认
              </button>
              <button 
                className={`py-2 px-4 rounded-md ${buttonVariant === "primary" ? "ring-2 ring-blue-500" : ""} bg-blue-600 hover:bg-blue-700 text-white`}
                onClick={() => setButtonVariant("primary")}
              >
                主要
              </button>
              <button 
                className={`py-2 px-4 rounded-md ${buttonVariant === "success" ? "ring-2 ring-blue-500" : ""} bg-green-600 hover:bg-green-700 text-white`}
                onClick={() => setButtonVariant("success")}
              >
                成功
              </button>
              <button 
                className={`py-2 px-4 rounded-md ${buttonVariant === "info" ? "ring-2 ring-blue-500" : ""} bg-cyan-600 hover:bg-cyan-700 text-white`}
                onClick={() => setButtonVariant("info")}
              >
                信息
              </button>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择套餐
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div 
              className={`border p-4 rounded-md cursor-pointer ${selectedPlan === "standard" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => setSelectedPlan("standard")}
            >
              <div className="font-semibold">标准版</div>
              <div className="text-gray-600">¥39/月</div>
            </div>
            <div 
              className={`border p-4 rounded-md cursor-pointer ${selectedPlan === "pro" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => setSelectedPlan("pro")}
            >
              <div className="font-semibold">专业版</div>
              <div className="text-gray-600">¥99/月</div>
            </div>
            <div 
              className={`border p-4 rounded-md cursor-pointer ${selectedPlan === "enterprise" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => setSelectedPlan("enterprise")}
            >
              <div className="font-semibold">企业版</div>
              <div className="text-gray-600">自定义价格</div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            客户电子邮件（可选）
          </label>
          <input
            type="email"
            id="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold">产品：{getPlanName()}</h2>
            <p className="text-gray-600 mt-1">获取完整功能访问权限和优先客户支持</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{getPlanPrice()}</p>
            <p className="text-gray-500 text-sm">免费试用14天</p>
          </div>
        </div>
        
        <hr className="my-6" />
        
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
            <span>完整功能解锁</span>
          </div>
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
            <span>高级技术支持</span>
          </div>
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
            <span>每月内容更新</span>
          </div>
        </div>
        
        <div className="mt-8">
          {buttonStyle === "paddlePayment" ? (
            <PaddlePayment 
              productId={getPriceId()}
              customerEmail={customerEmail || undefined}
              displayMode={displayMode}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              buttonText="开始订阅"
            />
          ) : (
            <div className="flex flex-col items-center">
              <PaddleButton
                productId={getPriceId()}
                text="开始订阅"
                variant={buttonVariant}
                size="large"
                className="w-full sm:w-64"
                showIcon={showIcon}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
              <div className="text-xs text-gray-500 mt-2">
                安全支付由 <span className="text-blue-600">Paddle</span> 提供
              </div>
              <p className="text-sm mt-4 text-center text-blue-700 font-medium">
                点击按钮将在页面内打开Paddle结账窗口，无需离开本站
              </p>
            </div>
          )}
        </div>
        
        {paymentStatus && (
          <div className={`mt-4 p-3 rounded ${
            paymentStatus.includes("成功") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {paymentStatus}
          </div>
        )}
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-md text-sm text-blue-800">
        <p className="font-medium">这是一个演示页面，使用Paddle Sandbox环境</p>
        <p className="mt-1">• Sandbox环境不会产生实际费用</p>
        <p className="mt-1">• 可以使用任何有效的测试信用卡号码</p>
        <p className="mt-1">• Token: {paddleConfig.clientToken}</p>
        <p className="mt-1">• 价格ID: {getPriceId()}</p>
      </div>
    </div>
  );
} 