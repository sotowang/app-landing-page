/**
 * 版本信息API服务
 */
import { appConfig } from '../config/appConfig';
import { VersionInfo, VersionResponse } from '../types/version';

// 缓存机制
let versionCache: VersionInfo | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 缓存有效期：5分钟
let isFetching: boolean = false; // 添加标志，防止并发请求

/**
 * 获取最新版本信息
 * @param forceRefresh 是否强制刷新缓存
 */
export async function fetchVersionInfo(forceRefresh: boolean = false): Promise<VersionInfo | null> {
  // 检查缓存是否有效
  const now = Date.now();
  if (!forceRefresh && versionCache && (now - lastFetchTime < CACHE_DURATION)) {
    console.log('使用缓存的版本数据，缓存时间:', new Date(lastFetchTime).toLocaleTimeString());
    return versionCache;
  }

  // 如果已经有请求在进行中，等待该请求完成并返回缓存
  if (isFetching && versionCache) {
    console.log('已有版本请求在进行中，使用缓存数据');
    return versionCache;
  }

  // 标记开始请求
  isFetching = true;
  console.log('开始获取版本信息...');

  try {
    // 使用Next.js API路由
    const apiUrl = '/api/version/latest';
    console.log('版本API URL:', apiUrl);
    console.log('当前环境配置:', {
      apiBaseUrl: appConfig.api.baseUrl
    });

    // 添加时间戳和随机数，确保不使用缓存
    const timestamp = Date.now();
    const randomParam = Math.random().toString(36).substring(2, 15);
    const noCacheUrl = `${apiUrl}?_t=${timestamp}&_r=${randomParam}`;

    console.log('使用无缓存URL:', noCacheUrl);

    const response = await fetch(noCacheUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      // 添加缓存控制
      cache: 'no-store',
    });

    console.log('版本API响应状态:', response.status);

    if (!response.ok) {
      throw new Error(`版本API请求失败: ${response.status}`);
    }

    const data = await response.json();
    console.log('成功获取版本信息:', data);

    // API直接返回版本信息对象，不是包装在data字段中
    if (data && data.version) {
      // 更新缓存
      versionCache = data;
      lastFetchTime = now;
      return data;
    } else {
      console.error('版本API返回数据为空');
      return null;
    }
  } catch (error) {
    console.error('获取版本信息失败:', error);
    // 如果有缓存，在出错时返回缓存的数据
    if (versionCache) {
      console.log('版本API请求失败，使用缓存数据');
      return versionCache;
    }
    return null;
  } finally {
    // 无论成功还是失败，都标记请求结束
    isFetching = false;
  }
}

/**
 * 检查是否需要强制更新
 * @param currentVersion 当前应用版本
 */
export async function checkForceUpdate(currentVersion: string): Promise<boolean> {
  try {
    const versionInfo = await fetchVersionInfo();
    if (!versionInfo) {
      return false;
    }

    // 如果设置了强制更新标志，并且当前版本小于最小版本要求
    if (versionInfo.force_update && compareVersions(currentVersion, versionInfo.min_version) < 0) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('检查强制更新失败:', error);
    return false;
  }
}

/**
 * 检查是否有新版本可用
 * @param currentVersion 当前应用版本
 */
export async function checkForUpdate(currentVersion: string): Promise<boolean> {
  try {
    const versionInfo = await fetchVersionInfo();
    if (!versionInfo) {
      return false;
    }

    // 比较版本号
    return compareVersions(currentVersion, versionInfo.version) < 0;
  } catch (error) {
    console.error('检查更新失败:', error);
    return false;
  }
}

/**
 * 比较版本号
 * @param version1 版本1
 * @param version2 版本2
 * @returns -1: version1 < version2, 0: version1 = version2, 1: version1 > version2
 */
export function compareVersions(version1: string, version2: string): number {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);
  
  const maxLength = Math.max(v1Parts.length, v2Parts.length);
  
  for (let i = 0; i < maxLength; i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;
    
    if (v1Part < v2Part) return -1;
    if (v1Part > v2Part) return 1;
  }
  
  return 0;
}

/**
 * 清除版本信息缓存
 */
export function clearVersionCache(): void {
  versionCache = null;
  lastFetchTime = 0;
  console.log('版本信息缓存已清除');
}
