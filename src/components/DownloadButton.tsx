"use client";

import React from "react";

/**
 * 下载按钮组件
 * 
 * @param text - 按钮显示文本
 * @param downloadUrl - 下载链接
 * @param className - 额外的CSS类名
 */
export default function DownloadButton({
  text = "下载",
  downloadUrl = "#",
  className = ""
}: {
  text?: string,
  downloadUrl?: string,
  className?: string
}) {
  return (
    <a
      href={downloadUrl}
      className={`bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium inline-block ${className}`}
      download
    >
      {text}
    </a>
  );
}
