import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'encrypted-tbn0.gstatic.com',
      'elearningindustry.com',
      'thumbs.dreamstime.com',
      'elearningindustry.com',
      'quotefancy.com',
      'img.freepik.com',
      'c8.alamy.com',
      'as1.ftcdn.net',
      'as2.ftcdn.net',
      // Add other domains you need here
    ],
    // Optional: You can add more image optimization settings
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
    ],
  },
  // ... rest of your config
}

export default nextConfig