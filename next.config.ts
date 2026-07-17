import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/b00kmakor/:path*", destination: "/bookmaker", permanent: true },
      { source: "/i-am-ai/sample", destination: "/i-am-ai#read", permanent: true },
      { source: "/i-am-ai/listen", destination: "/i-am-ai#listen", permanent: true }
    ];
  }
};

export default nextConfig;
