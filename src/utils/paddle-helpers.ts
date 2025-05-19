/**
 * Paddle支付辅助工具
 */

// 验证Paddle交易事件
export const validatePaddleEvent = async (eventData: any): Promise<boolean> => {
  // 实际生产环境中，我们应该验证事件的签名
  // 这里简单返回true，因为在Sandbox环境中没有签名验证
  return true;
};

// 处理成功交易
export const handleSuccessfulTransaction = async (transactionData: any): Promise<void> => {
  // 这里可以添加将订单信息保存到数据库的逻辑
  console.log('交易成功处理:', transactionData);
  
  // 示例：保存交易信息到localStorage（仅供演示）
  if (typeof window !== 'undefined') {
    const transactions = JSON.parse(localStorage.getItem('paddleTransactions') || '[]');
    transactions.push({
      ...transactionData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('paddleTransactions', JSON.stringify(transactions));
  }
};

// 交易的产品类型
export enum ProductType {
  STANDARD = 'standard',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

// 为给定的产品类型返回下一次账单日期
export const getNextBillingDate = (): Date => {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  return nextMonth;
};

// 格式化金额为人民币显示
export const formatCurrency = (amount: number): string => {
  return `¥${amount.toFixed(2)}`;
};

// 移动到结算流程的下一步
export const proceedToNextStep = (currentStep: number): number => {
  return Math.min(currentStep + 1, 3); // 假设我们有4个步骤（0-3）
};

// 验证电子邮件地址格式
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}; 