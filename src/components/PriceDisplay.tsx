"use client";

import React, { useEffect, useState } from "react";
import { getPaddleConfig } from "../config/appConfig";

/**
 * Price Display Component - Shows localized pricing for user's region
 *
 * @param priceId - Paddle price ID
 * @param className - Custom CSS class name
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
    // Load Paddle.js v2 script
    const paddleScript = document.createElement("script");
    paddleScript.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    paddleScript.async = true;
    paddleScript.onload = () => {
      if (typeof window !== 'undefined' && window.Paddle) {
        try {
          // Get dynamic configuration
          const paddleConfig = getPaddleConfig();

          // Set environment (sandbox or production)
          if (paddleConfig.sandbox) {
            console.log('Setting Paddle environment to sandbox');
            window.Paddle.Environment.set('sandbox');
          }

          // Debug: Log configuration
          console.log('PriceDisplay - Paddle configuration:', {
            token: paddleConfig.clientToken,
            sandbox: paddleConfig.sandbox,
            vendorId: paddleConfig.vendorId,
            tokenLength: paddleConfig.clientToken?.length,
            tokenPrefix: paddleConfig.clientToken?.substring(0, 10) + '...',
            env: process.env.NEXT_PUBLIC_APP_ENV,
            nodeEnv: process.env.NODE_ENV
          });

          // Initialize Paddle
          window.Paddle.Initialize({
            token: paddleConfig.clientToken
          });

          setIsReady(true);
          console.log("Paddle initialized successfully");

          // Get localized price
          getLocalizedPrice();
        } catch (error) {
          console.error("Paddle initialization failed:", error);
          setError("Initialization failed");
          setLoading(false);
        }
      }
    };

    paddleScript.onerror = () => {
      console.error("Paddle script loading failed");
      setError("Script loading failed");
      setLoading(false);
    };

    document.body.appendChild(paddleScript);

    return () => {
      if (document.body.contains(paddleScript)) {
        document.body.removeChild(paddleScript);
      }
    };
  }, []);

  // Re-fetch price when priceId changes
  useEffect(() => {
    if (isReady && priceId) {
      setLoading(true);
      setError("");
      getLocalizedPrice();
    }
  }, [priceId, isReady]);

  // Get localized price
  const getLocalizedPrice = async () => {
    if (!window.Paddle || !priceId) {
      setLoading(false);
      return;
    }

    try {
      console.log("Getting localized price, priceId:", priceId);

      const request = {
        items: [{
          quantity: 1,
          priceId: priceId
        }]
      };

      const result = await window.Paddle.PricePreview(request);
      console.log("Price preview result:", result);

      if (result && result.data && result.data.details && result.data.details.lineItems && result.data.details.lineItems.length > 0) {
        const lineItem = result.data.details.lineItems[0];

        // Prioritize total price with tax, fallback to price without tax
        const formattedPrice = lineItem.formattedTotals?.total ||
                              lineItem.formattedUnitTotals?.total ||
                              lineItem.formattedTotals?.subtotal ||
                              lineItem.formattedUnitTotals?.subtotal;

        // Try to get currency code from different locations
        const currencyCode = result.data.details.currencyCode ||
                           result.data.currencyCode ||
                           lineItem.price?.currency ||
                           "USD";

        // Try to get country code
        const detectedCountry = result.data.details.address?.countryCode ||
                              result.data.address?.countryCode ||
                              "";

        console.log("PriceDisplay - Price info:", {
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
          console.log("PriceDisplay - Set localized price (with tax):", formattedPrice, "Currency:", currencyCode, "Country:", detectedCountry);
        } else {
          setError("Unable to get price information");
        }
      } else {
        setError("Price data format error");
      }
    } catch (error) {
      console.error("Failed to get localized price:", error);
      setError("Failed to get price");
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
        <div className="text-lg font-semibold">Price Loading Failed</div>
        <div className="text-sm">{error}</div>
      </div>
    );
  }

  if (!localizedPrice) {
    return (
      <div className={`text-center text-gray-500 ${className}`}>
        <div className="text-lg font-semibold">Price Unavailable</div>
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
