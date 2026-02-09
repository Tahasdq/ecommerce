import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode:true,
  output:"standalone",
  distDir: "build",
  images: {
    domains: ['next-ecommerce-shopco.vercel.app' , 'images.unsplash.com'],
  },
  // experimental: {
  //   serverActions: false,
  // },
};

export default nextConfig;
