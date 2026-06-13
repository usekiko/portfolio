/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    unoptimized: true,
  },

  // Disable source maps in production
  productionBrowserSourceMaps: false,

  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

export default nextConfig;
