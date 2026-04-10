/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];

const nextConfig = {
  turbopack: {},
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  distDir: 'build',
  // assetPrefix: '.',
  reactStrictMode: true,

  async rewrites() {
    return [{ source: '/llms.txt', destination: '/api/llms' }];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
