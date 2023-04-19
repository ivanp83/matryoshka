/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: ["localhost", "static.matreshka39.ru"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
