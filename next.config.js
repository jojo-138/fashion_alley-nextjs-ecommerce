/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // buildExcludes: [/chunks\/pages\/profile.+\.js$/],
  runtimeCaching: [
    {
      urlPattern: /\/api\/address(?:\.js)?$/,
      handler: 'NetworkOnly',
      options: {
        cacheName: 'address-api',
      },
    },
    {
      urlPattern: /\/api\/cart(?:\.js)?$/,
      handler: 'NetworkOnly',
      options: {
        cacheName: 'cart-api',
      },
    },
    {
      urlPattern: /\/api\/user(?:\.js)?$/,
      handler: 'NetworkOnly',
      options: {
        cacheName: 'user-api',
      },
    },
    {
      urlPattern: /\/_next\/data\/.+\/profile(.+)?\.json$/,
      handler: 'NetworkOnly',
      options: {
        cacheName: 'profile-json',
      },
    },
    {
      urlPattern: /\/_next\/data\/.+$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'next-data',
        expiration: {
          maxAgeSeconds: 24 * 60 * 60,
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    deviceSizes: [640, 750, 828, 1165],
    imageSizes: [150, 270, 540],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.ltwebstatic.com',
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
