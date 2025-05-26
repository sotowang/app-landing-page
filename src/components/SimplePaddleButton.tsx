"use client";

import React, { useEffect, useState } from "react";
import { paddleConfig } from "../config/appConfig";
import authService from "../services/authService";

/**
 * Simple Paddle button component - using Paddle.js v2
 *
 * @param productId - Paddle product ID
 * @param text - Button display text, defaults to "Buy Now"
 * @param email - User's email address, automatically retrieved from logged-in user if not provided
 */
export default function SimplePaddleButton({
  productId,
  text = "Buy Now",
  email
}: {
  productId: string,
  text?: string,
  email?: string
}) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  // Get user email
  useEffect(() => {
    const getUserEmail = () => {
      if (email) {
        // If email parameter is provided, use it directly
        setUserEmail(email);
      } else {
        // Otherwise get from logged-in user
        const user = authService.getUser();
        if (user && user.email) {
          setUserEmail(user.email);
          console.log("Retrieved email from logged-in user:", user.email);
        } else {
          console.warn("User email not found, please ensure user is logged in");
          setUserEmail(""); // Set to empty string
        }
      }
    };

    getUserEmail();

    // Listen for login state changes
    const handleLoginStateChanged = () => {
      console.log("Login state changed, retrieving user email again");
      getUserEmail();
    };

    window.addEventListener('loginStateChanged', handleLoginStateChanged);
    window.addEventListener('storage', handleLoginStateChanged);

    return () => {
      window.removeEventListener('loginStateChanged', handleLoginStateChanged);
      window.removeEventListener('storage', handleLoginStateChanged);
    };
  }, [email]);

  useEffect(() => {
    // Load Paddle.js v2 script
    const paddleScript = document.createElement("script");
    paddleScript.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    paddleScript.async = true;
    paddleScript.onload = () => {
      if (typeof window !== 'undefined' && window.Paddle) {
        try {
          // Set environment (sandbox or production)
          if (paddleConfig.sandbox) {
            console.log('Setting Paddle environment to sandbox');
            window.Paddle.Environment.set('sandbox');
          }
          console.log('Current token:', paddleConfig.clientToken);

          // Initialize Paddle
          window.Paddle.Initialize({
            token: paddleConfig.clientToken
          });

          setIsReady(true);
          console.log("Paddle initialized successfully");
        } catch (error) {
          console.error("Paddle initialization failed:", error);
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

  // Price display is now handled by PriceDisplay component

  const handleClick = () => {
    if (!isReady || !window.Paddle) {
      console.error("Paddle is not ready yet");
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
          allowedPaymentMethods:['alipay','apple_pay','card','google_pay','ideal','paypal'],
        }
      };

      // Add customer information using retrieved user email
      if (userEmail) {
        checkoutOptions.customer = {
          email: userEmail
        };

        // Also add email information in customData for backend access
        checkoutOptions.customData = {
          user_email: userEmail
        };

        console.log("Using user email:", userEmail);
      } else {
        console.warn("User email not found, will not pass user information to Paddle");
      }

      window.Paddle.Checkout.open(checkoutOptions);
      console.log("Successfully opened Paddle checkout");
    } catch (error) {
      console.error("Failed to open checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isReady || loading}
      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg disabled:opacity-50 font-medium w-full"
    >
      {loading ? "Processing..." : !isReady ? "Loading..." : text}
    </button>
  );
}