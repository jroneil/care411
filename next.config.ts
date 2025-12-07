import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  output: process.env.NEXT_OUTPUT_MODE as 'standalone' | 'export' | undefined,
  outputFileTracingRoot: path.join(__dirname, '../'),

  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
};

export default nextConfig;
