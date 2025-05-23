"use client";

import React, { useEffect, useState } from 'react';
import { fetchPaddleProducts, PaddleProductsResponse, categorizeProducts } from '../../src/services/paddleService';

export default function ApiTestPage() {
  const [apiResponse, setApiResponse] = useState<PaddleProductsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testApi() {
      try {
        setLoading(true);
        console.log('开始测试API...');
        const response = await fetchPaddleProducts();
        console.log('获取到响应:', response);
        setApiResponse(response);
        setError(null);
      } catch (err: any) {
        console.error('API测试失败:', err);
        setError(err.message || '未知错误');
      } finally {
        setLoading(false);
      }
    }

    testApi();
  }, []);

  const categorized = apiResponse ? categorizeProducts(apiResponse.data) : null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API测试页面</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">API状态</h2>
        {loading ? (
          <div className="text-blue-500">加载中...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : apiResponse ? (
          <div className="text-green-500">成功获取数据</div>
        ) : (
          <div className="text-yellow-500">无数据</div>
        )}
      </div>
      
      {apiResponse && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">原始数据</h2>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        </div>
      )}
      
      {categorized && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">分类数据</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">月度计划</h3>
              
              <div className="mb-4">
                <h4 className="font-medium">基础版 ({categorized.monthly.basic.length})</h4>
                <ul className="list-disc pl-5">
                  {categorized.monthly.basic.map(product => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">专业版 ({categorized.monthly.pro.length})</h4>
                <ul className="list-disc pl-5">
                  {categorized.monthly.pro.map(product => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">年度计划</h3>
              
              <div className="mb-4">
                <h4 className="font-medium">基础版 ({categorized.yearly.basic.length})</h4>
                <ul className="list-disc pl-5">
                  {categorized.yearly.basic.map(product => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">专业版 ({categorized.yearly.pro.length})</h4>
                <ul className="list-disc pl-5">
                  {categorized.yearly.pro.map(product => (
                    <li key={product.id}>{product.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => window.location.reload()}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        刷新页面
      </button>
    </div>
  );
}
