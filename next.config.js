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
        protocol: "https",
        hostname: "fdocizdzprkfeigbnlxy.supabase.co",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

module.exports = nextConfig;
