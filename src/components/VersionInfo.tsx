"use client";

import React, { useEffect, useState } from "react";
import { fetchVersionInfo, checkForUpdate, checkForceUpdate } from "../services/versionService";
import { VersionInfo as VersionInfoType } from "../types/version";

interface VersionInfoProps {
  currentVersion?: string;
  showUpdateCheck?: boolean;
  className?: string;
}

/**
 * 版本信息显示组件
 */
export default function VersionInfo({
  currentVersion = "1.0.0",
  showUpdateCheck = true,
  className = ""
}: VersionInfoProps) {
  const [versionInfo, setVersionInfo] = useState<VersionInfoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [hasUpdate, setHasUpdate] = useState<boolean>(false);
  const [forceUpdate, setForceUpdate] = useState<boolean>(false);

  useEffect(() => {
    loadVersionInfo();
  }, []);

  const loadVersionInfo = async () => {
    try {
      setLoading(true);
      setError("");

      const info = await fetchVersionInfo();
      if (info) {
        setVersionInfo(info);

        if (showUpdateCheck) {
          // 检查是否有更新
          const hasNewVersion = await checkForUpdate(currentVersion);
          setHasUpdate(hasNewVersion);

          // 检查是否需要强制更新
          const needsForceUpdate = await checkForceUpdate(currentVersion);
          setForceUpdate(needsForceUpdate);
        }
      } else {
        setError("无法获取版本信息");
      }
    } catch (err) {
      console.error("加载版本信息失败:", err);
      setError("加载版本信息失败");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (platform: 'macos' | 'windows') => {
    const downloadUrl = versionInfo?.download_urls[platform];
    if (downloadUrl && downloadUrl.trim() !== '') {
      window.open(downloadUrl, '_blank');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 text-red-500 ${className}`}>
        <div className="text-sm">{error}</div>
        <button
          onClick={loadVersionInfo}
          className="mt-2 text-blue-500 hover:text-blue-700 text-sm underline"
        >
          重试
        </button>
      </div>
    );
  }

  if (!versionInfo) {
    return (
      <div className={`p-4 text-gray-500 ${className}`}>
        <div className="text-sm">暂无版本信息</div>
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      {/* 版本信息标题 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">版本信息</h3>
        {showUpdateCheck && (
          <div className="flex items-center space-x-2">
            {forceUpdate && (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                强制更新
              </span>
            )}
            {hasUpdate && !forceUpdate && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                有新版本
              </span>
            )}
          </div>
        )}
      </div>

      {/* 版本详情 */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">最新版本:</span>
          <span className="font-medium">{versionInfo.version}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">版本代码:</span>
          <span className="font-medium">{versionInfo.version_code}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">发布日期:</span>
          <span className="font-medium">{formatDate(versionInfo.release_date)}</span>
        </div>

        {showUpdateCheck && (
          <div className="flex justify-between">
            <span className="text-gray-600">当前版本:</span>
            <span className="font-medium">{currentVersion}</span>
          </div>
        )}

        {versionInfo.update_log && (
          <div>
            <span className="text-gray-600 block mb-1">更新日志:</span>
            <div className="text-sm bg-gray-50 p-2 rounded">
              {versionInfo.update_log}
            </div>
          </div>
        )}

        {/* 下载链接 */}
        {(versionInfo.download_urls.macos?.trim() || versionInfo.download_urls.windows?.trim()) && (
          <div>
            <span className="text-gray-600 block mb-2">下载链接:</span>
            <div className="flex space-x-2">
              {versionInfo.download_urls.macos?.trim() && (
                <button
                  onClick={() => handleDownload('macos')}
                  className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition"
                >
                  macOS
                </button>
              )}
              {versionInfo.download_urls.windows?.trim() && (
                <button
                  onClick={() => handleDownload('windows')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  Windows
                </button>
              )}
            </div>
          </div>
        )}

        {/* 强制更新提示 */}
        {forceUpdate && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <div className="text-red-800 text-sm">
              <strong>重要提示:</strong> 检测到您的版本过低，需要立即更新到最新版本才能继续使用。
            </div>
          </div>
        )}
      </div>

      {/* 刷新按钮 */}
      <div className="mt-4 pt-3 border-t">
        <button
          onClick={loadVersionInfo}
          className="text-blue-500 hover:text-blue-700 text-sm underline"
        >
          刷新版本信息
        </button>
      </div>
    </div>
  );
}
