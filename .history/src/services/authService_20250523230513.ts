"use client";

import { appConfig } from "../config/appConfig";

// 用户类型定义
export interface User {
  email: string;
  created_at: string;
}

// 登录响应类型
export interface LoginResponse {
  token: string;
  user: User;
}

// 错误响应类型
export interface ErrorResponse {
  error: string;
}

// 成功响应类型
export interface SuccessResponse {
  message: string;
}

// 认证服务类
class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = appConfig.api.baseUrl;
  }

  /**
   * 用户登录
   * @param email 邮箱
   * @param password 密码
   * @returns 登录响应
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '登录失败');
      }

      return await response.json();
    } catch (error) {
      console.error('登录失败:', error);
      throw error;
    }
  }

  /**
   * 获取验证码
   * @param email 邮箱
   * @param type 验证码类型 (register | reset)
   * @returns 成功或错误响应
   */
  async getVerificationCode(email: string, type: 'register' | 'reset'): Promise<SuccessResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/verification-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '获取验证码失败');
      }

      return await response.json();
    } catch (error) {
      console.error('获取验证码失败:', error);
      throw error;
    }
  }

  /**
   * 用户注册
   * @param email 邮箱
   * @param password 密码
   * @param verificationCode 验证码
   * @returns 成功或错误响应
   */
  async register(email: string, password: string, verificationCode: string): Promise<SuccessResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, verification_code: verificationCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '注册失败');
      }

      return await response.json();
    } catch (error) {
      console.error('注册失败:', error);
      throw error;
    }
  }

  /**
   * 重置密码
   * @param email 邮箱
   * @param newPassword 新密码
   * @param verificationCode 验证码
   * @param token 可选的认证令牌
   * @returns 成功或错误响应
   */
  async resetPassword(
    email: string,
    newPassword: string,
    verificationCode: string,
    token?: string
  ): Promise<SuccessResponse> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseUrl}/api/v1/user/change-password`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          email,
          new_password: newPassword,
          verification_code: verificationCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '密码重置失败');
      }

      return await response.json();
    } catch (error) {
      console.error('密码重置失败:', error);
      throw error;
    }
  }

  /**
   * 保存令牌到本地存储
   * @param token JWT令牌
   */
  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('auth_token', token);
        console.log('Token saved to localStorage');

        // 验证token是否正确保存
        const savedToken = localStorage.getItem('auth_token');
        if (savedToken !== token) {
          console.warn('Token verification failed: saved token does not match original token');
        }
      } catch (e) {
        console.error('Error saving token to localStorage:', e);
      }
    }
  }

  /**
   * 保存用户信息到本地存储
   * @param user 用户信息
   */
  saveUser(user: User): void {
    if (typeof window !== 'undefined') {
      try {
        const userStr = JSON.stringify(user);
        localStorage.setItem('auth_user', userStr);
        console.log('User info saved to localStorage');

        // 验证用户信息是否正确保存
        const savedUserStr = localStorage.getItem('auth_user');
        if (savedUserStr !== userStr) {
          console.warn('User verification failed: saved user does not match original user');
        }
      } catch (e) {
        console.error('Error saving user to localStorage:', e);
      }
    }
  }

  /**
   * 从本地存储获取令牌
   * @returns JWT令牌或null
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  /**
   * 从本地存储获取用户信息
   * @returns 用户信息或null
   */
  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('auth_user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          console.error('解析用户信息失败:', e);
          return null;
        }
      }
    }
    return null;
  }

  /**
   * 从本地存储清除认证信息
   */
  clearAuth(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  }

  /**
   * 检查用户是否已登录
   * @returns 是否已登录
   */
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  /**
   * 用户登出
   */
  logout(): void {
    this.clearAuth();
    // 如果需要，可以在这里添加重定向到登录页面的逻辑
  }
}

// 导出单例实例
const authService = new AuthService();
export default authService;
