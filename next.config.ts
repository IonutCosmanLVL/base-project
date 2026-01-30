import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    domains: ['images.ctfassets.net'],
  },
  output: 'export',
  distDir: 'docs',
  basePath: '/base-project',
  assetPrefix: '/base-project/',
  trailingSlash: true,
};

export default nextConfig;
