"use client";

import { useState, useEffect } from 'react';
import { fetchVersionInfo, checkForUpdate, checkForceUpdate } from '../services/versionService';
import { VersionInfo } from '../types/version';

interface UseVersionCheckOptions {
  currentVersion: string;
  autoCheck?: boolean;
  checkInterval?: number; // 检查间隔（毫秒）
}

interface UseVersionCheckReturn {
  versionInfo: VersionInfo | null;
  loading: boolean;
  error: string | null;
  hasUpdate: boolean;
  forceUpdate: boolean;
  checkNow: () => Promise<void>;
  clearError: () => void;
}

/**
 * 版本检查Hook
 */
export function useVersionCheck({
  currentVersion,
  autoCheck = true,
  checkInterval = 30 * 60 * 1000 // 默认30分钟检查一次
}: UseVersionCheckOptions): UseVersionCheckReturn {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);
  const [forceUpdate, setForceUpdate] = useState<boolean>(false);

  const checkVersion = async () => {
    try {
      setLoading(true);
      setError(null);

      // 获取版本信息
      const info = await fetchVersionInfo();
      if (info) {
        setVersionInfo(info);

        // 检查是否有更新
        const hasNewVersion = await checkForUpdate(currentVersion);
        setHasUpdate(hasNewVersion);

        // 检查是否需要强制更新
        const needsForceUpdate = await checkForceUpdate(currentVersion);
        setForceUpdate(needsForceUpdate);

        console.log('版本检查完成:', {
          currentVersion,
          latestVersion: info.version,
          hasUpdate: hasNewVersion,
          forceUpdate: needsForceUpdate
        });
      } else {
        setError('无法获取版本信息');
      }
    } catch (err) {
      console.error('版本检查失败:', err);
      setError(err instanceof Error ? err.message : '版本检查失败');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  // 初始检查
  useEffect(() => {
    if (autoCheck) {
      checkVersion();
    }
  }, [currentVersion, autoCheck]);

  // 定期检查
  useEffect(() => {
    if (!autoCheck || checkInterval <= 0) {
      return;
    }

    const interval = setInterval(() => {
      checkVersion();
    }, checkInterval);

    return () => clearInterval(interval);
  }, [autoCheck, checkInterval]);

  return {
    versionInfo,
    loading,
    error,
    hasUpdate,
    forceUpdate,
    checkNow: checkVersion,
    clearError
  };
}
