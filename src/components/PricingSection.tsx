"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SimplePaddleButton from './SimplePaddleButton';
import PriceDisplay from './PriceDisplay';
import {
  PaddleProduct,
  fetchPaddleProducts,
  categorizeProducts,
  CategorizedProducts
} from '../services/paddleService';

interface PricingSectionProps {
  translations: any;
  langPath: string;
}

export default function PricingSection({ translations, langPath }: PricingSectionProps) {
  const t = translations.pricing;
  const [products, setProducts] = useState<CategorizedProducts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const response = await fetchPaddleProducts();
        const categorized = categorizeProducts(response.data);
        setProducts(categorized);
        setError(null);
      } catch (err) {
        console.error('加载产品失败:', err);
        setError('无法加载产品信息，请稍后再试');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // 获取产品的第一个价格
  const getFirstPrice = (product: PaddleProduct) => {
    if (product.prices && product.prices.length > 0) {
      return product.prices[0];
    }
    return null;
  };



  // 将产品描述转换为功能列表
  const getFeaturesList = (description: string): string[] => {
    return description.split('\n').filter(item => item.trim() !== '');
  };

  // 渲染免费版本卡片
  const renderFreeCard = () => {
    return (
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2 dark:text-white">{t.plans.free.name}</h3>
          <div className="text-gray-600 dark:text-gray-300 mb-6">
            {t.plans.free.desc}
          </div>
          <div className="text-4xl font-bold mb-6 dark:text-white">
            {t.plans.free.price}
            <span className="text-base font-normal text-gray-600 dark:text-gray-300">
              {t.plans.free.period}
            </span>
          </div>

          <ul className="space-y-3 mb-8">
            {t.plans.free.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start dark:text-gray-200">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-8 pb-8">
          <Link
            href={`${langPath}#download`}
            className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium"
          >
            {t.plans.free.cta}
          </Link>
        </div>
      </div>
    );
  };

  // 渲染产品卡片
  const renderProductCard = (product: PaddleProduct, isPopular: boolean = false) => {
    const price = getFirstPrice(product);
    const priceId = price ? price.id : '';
    const features = getFeaturesList(product.description);

    return (
      <div className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden ${isPopular ? 'border-2 border-blue-500 dark:border-blue-400 transform scale-105' : ''}`}>
        {isPopular && (
          <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
            {t.plans.standard.popular}
          </div>
        )}
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2 dark:text-white">{product.name}</h3>
          <div className="text-gray-600 dark:text-gray-300 mb-6">
            {product.custom_data.plan_type === 'basic' ? t.plans.standard.desc : t.plans.pro.desc}
          </div>
          <div className="mb-6">
            <PriceDisplay
              priceId={priceId}
              className="mb-2"
            />
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start dark:text-gray-200">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-8 pb-8">
          <SimplePaddleButton
            productId={priceId}
            text={product.custom_data.plan_type === 'basic' ? t.plans.standard.cta : t.plans.pro.cta}
          />
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{t.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 计费周期切换 */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-1 inline-flex">
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === 'monthly'
                  ? 'bg-white dark:bg-gray-600 shadow'
                  : 'text-gray-500 dark:text-gray-300'
              }`}
            >
              {t.monthly}
            </button>
            <button
              onClick={() => setActiveTab('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                activeTab === 'yearly'
                  ? 'bg-white dark:bg-gray-600 shadow'
                  : 'text-gray-500 dark:text-gray-300'
              }`}
            >
              {t.yearly}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">加载产品信息...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              重试
            </button>
          </div>
        ) : products ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 免费版本卡片 - 始终显示 */}
            <div>
              {renderFreeCard()}
            </div>

            {/* 付费版本卡片 */}
            {activeTab === 'monthly' ? (
              <>
                {products.monthly.basic.map((product) => (
                  <React.Fragment key={product.id}>
                    {renderProductCard(product, true)}
                  </React.Fragment>
                ))}
                {products.monthly.pro.map((product) => (
                  <React.Fragment key={product.id}>
                    {renderProductCard(product)}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>
                {products.yearly.basic.map((product) => (
                  <React.Fragment key={product.id}>
                    {renderProductCard(product, true)}
                  </React.Fragment>
                ))}
                {products.yearly.pro.map((product) => (
                  <React.Fragment key={product.id}>
                    {renderProductCard(product)}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            暂无产品信息
          </div>
        )}

        <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
          <p>
            {t.guarantee}
            <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:underline"> {t.contact}</a>。
          </p>
        </div>
      </div>
    </section>
  );
}
