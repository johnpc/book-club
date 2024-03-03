/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    UNIQUE_NOTIFICATION_TOPIC: process.env.UNIQUE_NOTIFICATION_TOPIC,
    ADMIN_API_KEY: process.env.ADMIN_API_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "http",
        hostname: "books.google.com",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "books.google.com",
        port: "",
        pathname: "**/*",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "**/*",
      },
    ],
  },
};

module.exports = nextConfig;
