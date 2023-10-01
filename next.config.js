/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  images: {
    domains: ["blush.design", "external-content.duckduckgo.com"],
  },
};

module.exports = nextConfig;
