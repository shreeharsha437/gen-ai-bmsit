import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "engineering.brindavancollege.edu.in",
      "raw.githubusercontent.com",
    ],
    // Optional: You can also use remotePatterns for more granular control
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'engineering.brindavancollege.edu.in',
    //     pathname: '/uploads/**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'avatars.githubusercontent.com',
    //     pathname: '/u/**',
    //   }
    // ],
  },
  reactStrictMode: true,
  // This configuration allows Next.js to ignore ESLint errors during build
  eslint: {
    // This will completely ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  // For Next.js 15 compatibility
  experimental: {
    // Any experimental features you want to enable
  },
};

export default nextConfig;
