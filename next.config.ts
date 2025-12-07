import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Remove distDir customization - let Next.js use default '.next'
  // distDir: '.next', // This is the default, no need to specify
  
  typescript: {
    ignoreBuildErrors: false,
  },
  
  images: { 
    unoptimized: true 
  },
};

export default nextConfig;