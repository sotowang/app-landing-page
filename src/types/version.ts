/**
 * 版本信息相关类型定义
 */

// 下载链接类型
export interface DownloadUrls {
  macos: string;
  windows: string;
}

// 版本信息响应类型
export interface VersionInfo {
  version: string;
  version_code: number;
  release_date: string;
  download_urls: DownloadUrls;
  update_log: string;
  force_update: boolean;
  min_version: string;
}

// API响应类型
export interface VersionResponse {
  data?: VersionInfo;
  error?: string;
}
