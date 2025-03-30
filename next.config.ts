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
};

export default nextConfig;
