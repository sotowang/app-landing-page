"use client";

import React from 'react';
import Link from 'next/link';
import SimplePaddleButton from './SimplePaddleButton';
import paddleConfig from '../config/paddle';

// 类型定义
export type Translations = {
  nav: {
    home: string;
    features: string;
    pricing: string;
    terms: string;
    privacy: string;
    download: string;
  };
  switchLang: string;
  switchLangUrl: string;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  productDesc: {
    title: string;
    subtitle: string;
    useCases: {
      title: string;
      items: Array<{
        title: string;
        desc: string;
      }>;
    };
    benefits: {
      title: string;
      subtitle: string;
      items: string[];
      demo: string;
      demoLink: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      desc: string;
    }>;
  };
  pricing: {
    title: string;
    subtitle: string;
    plans: {
      free: {
        name: string;
        desc: string;
        price: string;
        period: string;
        features: string[];
        notIncluded: string[];
        cta: string;
      };
      standard: {
        name: string;
        desc: string;
        price: string;
        period: string;
        popular: string;
        features: string[];
        cta: string;
      };
      pro: {
        name: string;
        desc: string;
        price: string;
        period: string;
        features: string[];
        cta: string;
      };
      enterprise: {
        name: string;
        desc: string;
        price: string;
        period: string;
        features: string[];
        cta: string;
        ctaEmail: string;
      };
    };
    guarantee: string;
    contact: string;
  };
  download: {
    title: string;
    subtitle: string;
    windows: string;
    macos: string;
    linux: string;
    payment: string;
  };
  footer: {
    copyright: string;
    paymentBy: string;
    paddle: string;
    providedBy: string;
    links: string;
    legal: string;
    contact: string;
    email: string;
    phone: string;
  };
};

interface HomePageProps {
  translations: Translations;
  langPath: string;  // 语言路径，如 "/zh" 或 "/en"
}

export default function HomePage({ translations, langPath }: HomePageProps) {
  const t = translations;
  
  return (
    <main>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href={langPath} className="text-xl font-bold">
              SuperSpeech
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href={langPath} className="hover:text-blue-600">{t.nav.home}</Link>
              <Link href={`${langPath}#features`} className="hover:text-blue-600">{t.nav.features}</Link>
              <Link href={`${langPath}#pricing`} className="hover:text-blue-600">{t.nav.pricing}</Link>
              <Link href={`${langPath}/terms`} className="hover:text-blue-600">{t.nav.terms}</Link>
              <Link href={`${langPath}/privacy`} className="hover:text-blue-600">{t.nav.privacy}</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href={t.switchLangUrl} className="text-sm hover:text-blue-600 transition">{t.switchLang}</Link>
              <Link 
                href="#download" 
                className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {t.nav.download}
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.hero.title}</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t.hero.subtitle}</p>
          <Link 
            href="#download" 
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            {t.hero.cta}
          </Link>
        </div>
      </section>
      
      {/* Product Description Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.productDesc.title}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t.productDesc.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">{t.productDesc.useCases.title}</h3>
              <ul className="space-y-4">
                {t.productDesc.useCases.items.map((item, index) => (
                  <li key={index} className="flex">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-medium">{item.title}</span>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">{t.productDesc.benefits.title}</h3>
              <p className="text-gray-600 mb-6">
                {t.productDesc.benefits.subtitle}
              </p>
              <ul className="space-y-2 mb-8">
                {t.productDesc.benefits.items.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-blue-800 font-medium">
                  {t.productDesc.benefits.demo} 
                  <a href={`https://${t.productDesc.benefits.demoLink}`} className="underline">
                    {t.productDesc.benefits.demoLink}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.features.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.features.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.items.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.pricing.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.plans.free.name}</h3>
                <div className="text-gray-600 mb-6">{t.pricing.plans.free.desc}</div>
                <div className="text-4xl font-bold mb-6">
                  {t.pricing.plans.free.price}
                  <span className="text-base font-normal text-gray-600">{t.pricing.plans.free.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {t.pricing.plans.free.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {t.pricing.plans.free.notIncluded.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-400">
                      <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link
                  href="/payment"
                  className="block w-full bg-gray-100 hover:bg-gray-200 text-center py-3 rounded-md font-medium transition"
                >
                  {t.pricing.plans.free.cta}
                </Link>
              </div>
            </div>
            
            {/* Standard Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-blue-500 transform scale-105">
              <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                {t.pricing.plans.standard.popular}
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.plans.standard.name}</h3>
                <div className="text-gray-600 mb-6">{t.pricing.plans.standard.desc}</div>
                <div className="text-4xl font-bold mb-6">
                  {t.pricing.plans.standard.price}
                  <span className="text-base font-normal text-gray-600">{t.pricing.plans.standard.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {t.pricing.plans.standard.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
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
                  productId={paddleConfig.priceIds.standard}
                  text={t.pricing.plans.standard.cta}
                />
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.plans.pro.name}</h3>
                <div className="text-gray-600 mb-6">{t.pricing.plans.pro.desc}</div>
                <div className="text-4xl font-bold mb-6">
                  {t.pricing.plans.pro.price}
                  <span className="text-base font-normal text-gray-600">{t.pricing.plans.pro.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {t.pricing.plans.pro.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
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
                  productId={paddleConfig.priceIds.pro}
                  text={t.pricing.plans.pro.cta}
                />
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{t.pricing.plans.enterprise.name}</h3>
                <div className="text-gray-600 mb-6">{t.pricing.plans.enterprise.desc}</div>
                <div className="text-4xl font-bold mb-6">
                  {t.pricing.plans.enterprise.price}
                  <span className="text-base font-normal text-gray-600">{t.pricing.plans.enterprise.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {t.pricing.plans.enterprise.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 pb-8">
                <a
                  href={`mailto:${t.pricing.plans.enterprise.ctaEmail}`}
                  className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-3 rounded-md font-medium transition"
                >
                  {t.pricing.plans.enterprise.cta}
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10 text-gray-600">
            <p>
              {t.pricing.guarantee}
              <a href="#contact" className="text-blue-600 hover:underline"> {t.pricing.contact}</a>。
            </p>
          </div>
        </div>
      </section>
      
      {/* Download Section */}
      <section id="download" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.download.title}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t.download.subtitle}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
            <SimplePaddleButton
              productId={paddleConfig.priceIds.standard}
              text={t.download.windows}
            />
            
            <SimplePaddleButton
              productId={paddleConfig.priceIds.standard}
              text={t.download.macos}
            />
            
            <SimplePaddleButton
              productId={paddleConfig.priceIds.standard}
              text={t.download.linux}
            />
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">
            {t.download.payment}
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SuperSpeech</h3>
              <p className="text-gray-400">{t.footer.copyright}</p>
              <p className="text-gray-400 mt-2">
                {t.footer.paymentBy} 
                <a href="https://paddle.com" className="underline"> {t.footer.paddle}</a>
                {t.footer.providedBy}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.links}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={langPath} className="text-gray-400 hover:text-white transition">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href={`${langPath}#features`} className="text-gray-400 hover:text-white transition">
                    {t.nav.features}
                  </Link>
                </li>
                <li>
                  <Link href={`${langPath}#pricing`} className="text-gray-400 hover:text-white transition">
                    {t.nav.pricing}
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.legal}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`${langPath}/terms`} className="text-gray-400 hover:text-white transition">
                    {t.nav.terms}
                  </Link>
                </li>
                <li>
                  <Link href={`${langPath}/privacy`} className="text-gray-400 hover:text-white transition">
                    {t.nav.privacy}
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.contact}</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">
                  {t.footer.email}
                </li>
                <li className="text-gray-400">
                  {t.footer.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 