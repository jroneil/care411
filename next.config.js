/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TypeScript errors during build
  },
  images: { 
    unoptimized: true 
  },
  swcMinify: true,
};

module.exports = nextConfig;
