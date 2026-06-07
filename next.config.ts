import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: false,
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3233',
        pathname: '/uploads/avatars/**',
      },
      // Для продакшена добавьте ваш боевой домен:
      // {
      //   protocol: 'https',
      //   hostname: 'ваш-домен.com',
      //   pathname: '/uploads/avatars/**',
      // },
    ]
  }
};

export default nextConfig;
