"use client";

import React from 'react';
import { paddleConfig, appConfig } from '../../src/config/appConfig';

export default function DebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Debug Configuration</h1>
      
      <div className="grid gap-6">
        {/* Environment Variables */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>NEXT_PUBLIC_APP_ENV:</strong> {process.env.NEXT_PUBLIC_APP_ENV || 'undefined'}
            </div>
            <div>
              <strong>NODE_ENV:</strong> {process.env.NODE_ENV || 'undefined'}
            </div>
            <div>
              <strong>NEXT_PUBLIC_API_BASE_URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'undefined'}
            </div>
            <div>
              <strong>NEXT_PUBLIC_PADDLE_CLIENT_TOKEN:</strong> {
                process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN 
                  ? `${process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN.substring(0, 10)}...` 
                  : 'undefined'
              }
            </div>
            <div>
              <strong>NEXT_PUBLIC_PADDLE_SANDBOX:</strong> {process.env.NEXT_PUBLIC_PADDLE_SANDBOX || 'undefined'}
            </div>
            <div>
              <strong>NEXT_PUBLIC_PADDLE_VENDOR_ID:</strong> {process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || 'undefined'}
            </div>
          </div>
        </div>

        {/* Paddle Config */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Paddle Configuration</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>clientToken:</strong> {
                paddleConfig.clientToken 
                  ? `${paddleConfig.clientToken.substring(0, 10)}...` 
                  : 'undefined'
              }
            </div>
            <div>
              <strong>sandbox:</strong> {paddleConfig.sandbox ? 'true' : 'false'}
            </div>
            <div>
              <strong>vendorId:</strong> {paddleConfig.vendorId}
            </div>
            <div>
              <strong>Token Length:</strong> {paddleConfig.clientToken?.length || 0}
            </div>
            <div>
              <strong>Token Type:</strong> {
                paddleConfig.clientToken?.startsWith('live_') ? 'Live' :
                paddleConfig.clientToken?.startsWith('test_') ? 'Test' : 'Unknown'
              }
            </div>
          </div>
        </div>

        {/* App Config */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">App Configuration</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>API Base URL:</strong> {appConfig.api.baseUrl}
            </div>
            <div>
              <strong>Paddle Products Endpoint:</strong> {appConfig.api.endpoints.paddleProducts}
            </div>
          </div>
        </div>

        {/* Runtime Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Runtime Information</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>Window Object:</strong> {typeof window !== 'undefined' ? 'Available' : 'Not Available'}
            </div>
            <div>
              <strong>User Agent:</strong> {typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'}
            </div>
            <div>
              <strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}
            </div>
          </div>
        </div>

        {/* Test Paddle Initialization */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Paddle Test</h2>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') {
                console.log('Testing Paddle initialization...');
                console.log('Token:', paddleConfig.clientToken);
                console.log('Sandbox:', paddleConfig.sandbox);
                
                // Load Paddle script
                const script = document.createElement('script');
                script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
                script.async = true;
                script.onload = () => {
                  console.log('Paddle script loaded');
                  if (window.Paddle) {
                    try {
                      if (paddleConfig.sandbox) {
                        window.Paddle.Environment.set('sandbox');
                      }
                      window.Paddle.Initialize({
                        token: paddleConfig.clientToken
                      });
                      console.log('Paddle initialized successfully');
                      alert('Paddle initialized successfully!');
                    } catch (error) {
                      console.error('Paddle initialization failed:', error);
                      alert(`Paddle initialization failed: ${error}`);
                    }
                  }
                };
                script.onerror = () => {
                  console.error('Failed to load Paddle script');
                  alert('Failed to load Paddle script');
                };
                document.head.appendChild(script);
              }
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Test Paddle Initialization
          </button>
        </div>
      </div>
    </div>
  );
}
