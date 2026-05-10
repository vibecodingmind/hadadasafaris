import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Use "standalone" for dev server; change to "export" for cPanel static build
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  trailingSlash: true,
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-icons',
      'date-fns',
    ],
  },
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
