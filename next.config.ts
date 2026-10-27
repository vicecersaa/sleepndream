import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  async rewrites() {
    const apiOrigin = (process.env.SLEEPNDREAM_API_ORIGIN || "http://127.0.0.1:5001/api/v1").replace(/\/$/, "");
    return [{ source: "/api/v1/:path*", destination: `${apiOrigin}/:path*` }];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
