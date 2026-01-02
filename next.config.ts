import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode:true,
  output:"standalone",
  distDir: "build",
  images: {
    domains: ['next-ecommerce-shopco.vercel.app'],
  },
};

export default nextConfig;
