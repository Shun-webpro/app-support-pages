import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的エクスポートが必要な場合は以下を有効化
  // output: "export",
  async redirects() {
    return [
      {
        source: "/support/privacy",
        destination: "/support/todoo/privacy",
        permanent: true,
      },
      {
        source: "/kantan/privacy",
        destination: "/support/kantan/privacy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
